# io-chart — Custom Angular Chart Component

A reusable Angular chart component that renders **Line**, **Column**, and **Pie** charts from a simple configuration object — built with pure HTML/SVG and Angular. **No external chart libraries used.**

---

## Tech Stack

- **Angular 17** (Standalone components)
- **TypeScript** (strict mode)
- **SCSS** (component-scoped styles)
- **SVG** (rendering engine)

---

## Project Structure

```
src/
└── app/
    ├── app.component.ts          # Demo shell with type switcher
    ├── app.component.html
    ├── app.component.scss
    ├── app.config.ts
    └── chart/
        ├── chart.component.ts    # Core chart logic
        ├── chart.component.html  # SVG rendering template
        ├── chart.component.scss  # Styles + animations
        └── chart.model.ts        # ChartOptions interface
```

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm start
# → http://localhost:4200
```

---

## Usage

```ts
import { ChartComponent } from './chart/chart.component';
import { ChartOptions } from './chart/chart.model';

// In your component:
chartOptions: ChartOptions = {
  type: 'line',           // 'line' | 'column' | 'pie'
  title: 'Sales Report',
  series: [
    { name: 'Offline', value: 30, color: 'red' },
    { name: 'Online',  value: 70, color: 'blue' },
  ],
};
```

```html
<io-chart [chartOptions]="chartOptions"></io-chart>
```

---

## ChartOptions Interface

```ts
interface ChartOptions {
  type: 'line' | 'column' | 'pie';
  title: string;
  series: {
    name: string;
    value: number;
    color: string;
  }[];
}
```

---

## Features

| Feature | Status |
|---|---|
| Line Chart | ✅ |
| Column Chart | ✅ |
| Pie Chart | ✅ |
| Hover effects | ✅ |
| Tooltips | ✅ |
| Legend | ✅ |
| Y-axis with grid lines | ✅ |
| Responsive (SVG viewBox) | ✅ |
| Input validation / error state | ✅ |
| Standalone Angular component | ✅ |
| No external chart libraries | ✅ |

---

## Design Decisions

- **SVG over Canvas** — SVG integrates naturally with Angular's template binding and is accessible via `<title>` elements.
- **Standalone components** — Uses Angular 17 standalone APIs (`imports` array, no NgModule needed).
- **OnPush change detection** — Minimises re-renders; chart rebuilds only on `chartOptions` input change.
- **Pure TypeScript math** — All pie slice paths, line coordinates, and bar dimensions are computed in the component class, not in the template.
- **SCSS variables** — Single source of truth for colors, transitions, and spacing.

---

## Screenshots

> Run `npm start` and navigate to `http://localhost:4200` to see all three chart types via the switcher buttons.

---


