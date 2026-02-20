export interface SeriesItem {
  name: string;
  value: number;
  color: string;
}

export interface ChartOptions {
  type: 'line' | 'column' | 'pie';
  title: string;
  series: SeriesItem[];
}
