# Typography & Archetype Selector Text Wrapping Fix

## 1. Problem Identified
In the teacher's Lesson Studio (`/admin/index.html`), cards inside the **Page Archetype & Structural Template** grid were rendering with severely broken, vertically squished text labels (e.g. `Curricu lum Tabs` and `Fla shc ard s & Dia log ue`).

## 2. Root Causes
1. **Header Layout Collision**: Inside `.archetype-card`, the title `<span>📚 Curriculum Tabs</span>` and the badge `<span class="arch-badge">Curriculum Tabs</span>` were placed side-by-side in a flex space-between row. Because the badge carried `white-space: nowrap` and repeated the long label text, the title was left with only ~30–40px of container width.
2. **Aggressive Hyphenation / Word-Break**: Global CSS rules had `overflow-wrap: anywhere;` and `word-break: break-word;` which allowed the browser to chop English words letter-by-letter across lines rather than respecting word boundaries.
3. **Column Constraints**: The grid columns were constrained to `minmax(min(100%, 230px), 1fr)`, which on certain screen widths squeezed cards below the optical threshold needed for compound titles and badges.

## 3. Resolution
1. **Separated Icon, Title & Concise Badges**:
   - Replaced redundant long badge strings with clean contextual tags (e.g., `Tabs`, `Cards & Audio`, `MCQ Practice`, `Stage Hub`, `Unit Hub`, `Storyteller`).
   - Structured `.arch-header` to give the title full priority and width flex.
2. **Standardized Typography Wrapping**:
   - Replaced `overflow-wrap: anywhere;` with standard `overflow-wrap: break-word;` and `word-break: normal;` across `main.css` and `admin.css`. Words now wrap naturally at spaces.
3. **Optimized Grid Proportions**:
   - Adjusted `.archetype-selector-grid` minimum column width to `280px` (`minmax(min(100%, 280px), 1fr)`), giving cards ample horizontal room for clean, single-line display of titles and badges.
