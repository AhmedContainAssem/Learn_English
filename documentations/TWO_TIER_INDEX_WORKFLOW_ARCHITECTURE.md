# Two-Tier Index Workflow Architecture & UX Simplification

## 1. Executive Summary & Problem Statement
In educational platform structures with hierarchical levels (e.g., Platform Home ➔ Grade/Stage ➔ Unit ➔ Lesson), index pages serve two fundamentally distinct pedagogical and navigational roles:
1. **The Grade/Stage Primary Index (`[Stage]/index.html`)**: Lists all 6 curriculum units (`Unit 1`, `Unit 2`...) in an engaging visual grid, linking down into subfolders (`./unit-X/index.html`), with a top/bottom back navigation leading to the platform root (`../index.html`).
2. **The Unit Lessons Index (`[Stage]/[Unit]/index.html`)**: Lists individual lesson files (`lesson-1.html`, `lesson-2.html`, `quiz.html`...) within that specific unit folder, with back navigation leading up to the stage index (`../index.html`).

Previously, teachers had to manually configure index scope and calculate path relations, which introduced cognitive friction and potential path misconfigurations.

## 2. Architectural Solution
We implemented an explicit, frictionless **Two-Tier Index Creation Workflow** in both the visual UI and the underlying state engine:

1. **Top-Level Archetype Grid Separation**:
   - **`stage_index` (🏫 فهرس المرحلة الدراسية)**: Dedicated archetype for stage hubs (e.g. `Prep_3/index.html`), automatically defaulting to `index.html` filename, stage-level pathing, 6 unit cards, and platform root return links.
   - **`unit_index` (📁 فهرس دروس الوحدة)**: Dedicated archetype for unit hubs (e.g. `Prep_3/unit-1/index.html`), automatically defaulting to `index.html` filename, unit subfolder pathing, lesson card presets, and stage return links.

2. **In-Pane Quick Mode Switcher**:
   - Inside the Index Hub configuration pane (`#pane-index_hub`), two high-contrast visual cards allow instant one-click switching between the two modes with immediate UI synchronization.

3. **Smart Destination & Generator Parity**:
   - `generateSixUnitsPreset()` and `generateLessonsPreset()` automatically synchronize `state.archetype`, `state.indexType`, `state.indexScope`, and relative path prefixes (`getRelativeAssetsPrefix()`).
   - `generators.js` produces semantic, standalone HTML with relative asset resolution (`../assets/` for stage index, `../../assets/` for unit index).

## 3. Lessons Learned & Anti-Regression Directives
- **Explicit Separation**: Presenting distinct pedagogical workflows upfront prevents user confusion better than hidden advanced dropdowns.
- **Pure Relative Referencing**: Relative asset paths must always compute dynamically based on folder depth to ensure zero broken links across preview, local static hosting, and GitHub Pages.
