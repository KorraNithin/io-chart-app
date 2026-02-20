import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartOptions, SeriesItem } from './chart.model';

@Component({
  selector: 'io-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartComponent implements OnChanges, AfterViewInit {
  @Input() chartOptions!: ChartOptions;

  @ViewChild('svgCanvas') svgCanvas!: ElementRef<SVGSVGElement>;

  // ── shared state ──────────────────────────────────────────────
  hoveredIndex: number | null = null;

  // ── pie ───────────────────────────────────────────────────────
  pieSlices: PieSlice[] = [];
  readonly PIE_R = 130;
  readonly PIE_CX = 160;
  readonly PIE_CY = 160;

  // ── line ──────────────────────────────────────────────────────
  linePoints: LinePoint[] = [];
  polylinePoints = '';
  areaPath = '';
  readonly LINE_W = 560;
  readonly LINE_H = 300;
  readonly LINE_PAD = 50;

  // ── column ────────────────────────────────────────────────────
  colBars: ColBar[] = [];
  readonly COL_W = 560;
  readonly COL_H = 300;
  readonly COL_PAD = 50;

  // ── lifecycle ─────────────────────────────────────────────────
  ngAfterViewInit(): void {
    this.buildChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chartOptions']) {
      this.hoveredIndex = null;
      this.buildChart();
    }
  }

  // ── build helpers ─────────────────────────────────────────────
  private buildChart(): void {
    if (!this.chartOptions?.series?.length) return;

    switch (this.chartOptions.type) {
      case 'pie':
        this.buildPie();
        break;
      case 'line':
        this.buildLine();
        break;
      case 'column':
        this.buildColumn();
        break;
    }
  }

  get totalValue(): number {
    return this.chartOptions?.series?.reduce((s, i) => s + i.value, 0) ?? 0;
  }

  // PIE ──────────────────────────────────────────────────────────
  private buildPie(): void {
    const total = this.chartOptions.series.reduce((s, i) => s + i.value, 0);
    let startAngle = -Math.PI / 2;
    this.pieSlices = this.chartOptions.series.map((item, idx) => {
      const angle = (item.value / total) * 2 * Math.PI;
      const endAngle = startAngle + angle;
      const slice = this.makeSlice(startAngle, endAngle, item, idx, total);
      startAngle = endAngle;
      return slice;
    });
  }

  private makeSlice(
    start: number,
    end: number,
    item: SeriesItem,
    idx: number,
    total: number
  ): PieSlice {
    const r = this.PIE_R;
    const cx = this.PIE_CX;
    const cy = this.PIE_CY;
    const x1 = cx + r * Math.cos(start);
    const y1 = cy + r * Math.sin(start);
    const x2 = cx + r * Math.cos(end);
    const y2 = cy + r * Math.sin(end);
    const large = end - start > Math.PI ? 1 : 0;
    const mid = (start + end) / 2;
    const labelR = r * 0.65;
    const pct = Math.round((item.value / total) * 100);
    return {
      d: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`,
      color: item.color,
      name: item.name,
      value: item.value,
      pct,
      labelX: cx + labelR * Math.cos(mid),
      labelY: cy + labelR * Math.sin(mid),
      idx,
    };
  }

  // LINE ─────────────────────────────────────────────────────────
  private buildLine(): void {
    const series = this.chartOptions.series;
    const maxVal = Math.max(...series.map((s) => s.value));
    const w = this.LINE_W - this.LINE_PAD * 2;
    const h = this.LINE_H - this.LINE_PAD * 2;
    const step = series.length > 1 ? w / (series.length - 1) : w / 2;

    this.linePoints = series.map((item, i) => {
      const x = this.LINE_PAD + (series.length > 1 ? i * step : w / 2);
      const y = this.LINE_PAD + h - (item.value / maxVal) * h;
      return { x, y, color: item.color, name: item.name, value: item.value, idx: i };
    });

    this.polylinePoints = this.linePoints.map((p) => `${p.x},${p.y}`).join(' ');

    // Area fill path
    const first = this.linePoints[0];
    const last = this.linePoints[this.linePoints.length - 1];
    const baseline = this.LINE_PAD + (this.LINE_H - this.LINE_PAD * 2);
    this.areaPath = `M ${first.x} ${baseline} ` +
      this.linePoints.map(p => `L ${p.x} ${p.y}`).join(' ') +
      ` L ${last.x} ${baseline} Z`;
  }

  getYAxisLabels(): YLabel[] {
    const series = this.chartOptions.series;
    const maxVal = Math.max(...series.map((s) => s.value));
    const h = this.LINE_H - this.LINE_PAD * 2;
    const steps = 5;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const val = Math.round((maxVal / steps) * (steps - i));
      const y = this.LINE_PAD + (i / steps) * h;
      return { val, y };
    });
  }

  // COLUMN ───────────────────────────────────────────────────────
  private buildColumn(): void {
    const series = this.chartOptions.series;
    const maxVal = Math.max(...series.map((s) => s.value));
    const w = this.COL_W - this.COL_PAD * 2;
    const h = this.COL_H - this.COL_PAD * 2;
    const barW = Math.min(60, (w / series.length) * 0.6);
    const gap = w / series.length;

    this.colBars = series.map((item, i) => {
      const barH = (item.value / maxVal) * h;
      const x = this.COL_PAD + gap * i + (gap - barW) / 2;
      const y = this.COL_PAD + h - barH;
      return { x, y, width: barW, height: barH, color: item.color, name: item.name, value: item.value, idx: i };
    });
  }

  getColYLabels(): YLabel[] {
    const series = this.chartOptions.series;
    const maxVal = Math.max(...series.map((s) => s.value));
    const h = this.COL_H - this.COL_PAD * 2;
    const steps = 5;
    return Array.from({ length: steps + 1 }, (_, i) => {
      const val = Math.round((maxVal / steps) * (steps - i));
      const y = this.COL_PAD + (i / steps) * h;
      return { val, y };
    });
  }

  // ── hover ─────────────────────────────────────────────────────
  onHover(idx: number): void {
    this.hoveredIndex = idx;
  }

  onLeave(): void {
    this.hoveredIndex = null;
  }

  isHovered(idx: number): boolean {
    return this.hoveredIndex === idx;
  }

  // ── guard ─────────────────────────────────────────────────────
  get isValid(): boolean {
    return (
      !!this.chartOptions &&
      !!this.chartOptions.type &&
      !!this.chartOptions.title &&
      Array.isArray(this.chartOptions.series) &&
      this.chartOptions.series.length > 0
    );
  }
}

// ── local interfaces ──────────────────────────────────────────────
interface PieSlice {
  d: string;
  color: string;
  name: string;
  value: number;
  pct: number;
  labelX: number;
  labelY: number;
  idx: number;
}

interface LinePoint {
  x: number;
  y: number;
  color: string;
  name: string;
  value: number;
  idx: number;
}

interface ColBar {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  name: string;
  value: number;
  idx: number;
}

interface YLabel {
  val: number;
  y: number;
}