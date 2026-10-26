# SVG Diagram Render Compatibility & Zero-Purple Hardening

## Overview
This architectural document records the design decisions and color compliance protocols applied to all vector SVG diagrams in the repository.

---

## 1. Compliance with Strict Zero-Purple Color Policy (Rule 6)
Under Rule 6 of the Project Directives:
- Under no circumstances may magenta, violet, lavender, fuchsia, or purple tones (`#e086ff`, `#a855f7`, `#9333ea`, `#c084fc`, `#7c3aed`, etc.) be used.
- All diagrams utilize the certified high-contrast palette:
  - **Primary Cyan**: `#00f3ff` (Borders, title accents, key icons)
  - **Sky Blue**: `#38bdf8` (Secondary headers, data flow pathways)
  - **Emerald Green**: `#00ff9d` / `#10b981` (Success states, audio engines, pass badges)
  - **Amber Gold**: `#ffb703` / `#f59e0b` (Teacher Studio, cautions, authoring flows)
  - **Midnight Surfaces**: `#0b0f19`, `#131b2e`, `#1c2a47` (Card backgrounds)

---

## 2. GitHub Markdown & Browser Renderer Compatibility
1. **Embedded Dimensions**: Each diagram specifies a clean `viewBox="0 0 960 ..."` with relative width/height attributes to render sharply on mobile retina displays as well as 4K desktop screens without clipping.
2. **Standard System Fonts**: Diagrams rely on native font stacks (`-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif, monospace`) to avoid web-font blocking or layout shifts.
3. **No External Network Dependencies**: All styling, gradients, and filters are fully self-contained inside each `<svg>` definition block (`<defs>`).
