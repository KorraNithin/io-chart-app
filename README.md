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

## Chart Types

### Line Chart
Plots each series item as a coordinate on a Cartesian plane. A polyline connects all points. A gradient area fill is drawn beneath the line. The line animates in using SVG `stroke-dashoffset`. Points pop in with a spring-eased scale animation staggered per item.

### Column Chart
Renders each series item as a vertical bar. Bar height is proportional to value, auto-scaled against the maximum. Each bar uses a vertical gradient of its own color with a solid top cap. Bars grow upward on load with staggered animation delays.

### Pie / Donut Chart
Each slice is computed as an SVG `<path>` arc from trigonometric functions (sin/cos), starting from 12 o'clock (−90°). Renders as a donut with the total value displayed in the center hole. Percentage labels appear inside slices larger than 4%. Slices pop in with a staggered scale animation.

---

## Theming

The app supports **Dark** and **Light** mode via a fixed toggle button in the top-right corner.

Theming is implemented using **CSS custom properties**. The `.light` class is toggled on `.app-shell` from the component, and all colors cascade through CSS variables with `0.4s ease` transitions.

### Dark Mode (default)
- Background: `#0a0a0f` — deep navy black
- Card: `#16161f` — elevated surface
- Text: `#f0f0ff` — soft white
- Accent blobs: Purple + teal at low opacity

### Light Mode
- Background: `#f4f4fb` — warm off-white
- Card: `#ffffff` — pure white with purple shadow
- Text: `#0f0f1a` — near black
- Accent blobs: Same hues, reduced intensity

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


