import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartComponent } from './chart/chart.component';
import { ChartOptions } from './chart/chart.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDarkMode = true;
  selectedType: ChartOptions['type'] = 'line';

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  readonly chartTypes: ChartOptions['type'][] = ['line', 'column', 'pie'];

  readonly chartOptionsMap: Record<ChartOptions['type'], ChartOptions> = {
    line: {
      type: 'line',
      title: 'Sales Report – Line',
      series: [
        { name: 'Jan', value: 40, color: '#e74c3c' },
        { name: 'Feb', value: 65, color: '#e74c3c' },
        { name: 'Mar', value: 50, color: '#e74c3c' },
        { name: 'Apr', value: 80, color: '#e74c3c' },
        { name: 'May', value: 72, color: '#e74c3c' },
        { name: 'Jun', value: 90, color: '#e74c3c' },
      ],
    },
    column: {
      type: 'column',
      title: 'Sales Report – Column',
      series: [
        { name: 'Offline', value: 30, color: '#3498db' },
        { name: 'Online', value: 70, color: '#2ecc71' },
        { name: 'Mobile', value: 55, color: '#9b59b6' },
        { name: 'Retail', value: 45, color: '#e67e22' },
      ],
    },
    pie: {
      type: 'pie',
      title: 'Sales Report – Pie',
      series: [
        { name: 'Offline', value: 30, color: '#e74c3c' },
        { name: 'Online', value: 70, color: '#3498db' },
        { name: 'Mobile', value: 45, color: '#2ecc71' },
        { name: 'Retail', value: 25, color: '#f39c12' },
      ],
    },
  };

  get chartOptions(): ChartOptions {
    return this.chartOptionsMap[this.selectedType];
  }
}