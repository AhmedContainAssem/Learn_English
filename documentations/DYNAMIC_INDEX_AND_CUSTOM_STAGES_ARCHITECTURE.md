# Dynamic Index Generator & Arbitrary Stage Hierarchies Architecture

## 1. Problem Statement
Previously, the Lesson Studio Admin in `Learn_English/admin` suffered from two architectural constraints:
1. **Hardcoded Stage Restrictions**: Stages were locked to a fixed `<select id="stageSelect">` dropdown (e.g. only Prep 1-3, Grade 4-6, Course). Adding new grade levels, custom secondary years (Sec 1, Sec 2, Sec 3), Kindergarten, Phonics, or arbitrary topics was impossible without manually altering the core codebase.
2. **Missing Index File Generator**: The studio was only capable of producing individual lesson pages (`lesson-*.html` or `quiz.html`). Creating hub/index navigation pages (`index.html`) for new years, units, or courses required manual coding and was error-prone, breaking the no-code workflow for teachers.

## 2. Architectural Solution

### A. Dynamic Stage & Flexible Path Model
- **Comprehensive Stage Options with Custom Input**: The stage selector now provides structured optgroups for Preparatory, Secondary, Primary, and Foundation categories, along with an explicit `__custom__` option that unlocks a dynamic custom input field (`#customStageInput`).
- **Arbitrary File & Path Resolution**: Updated `updateTargetFilePath()` and `getRelativeAssetsPrefix()` to intelligently calculate relative path depth (`./`, `../`, `../../`) based on whether `stage` or `unit` are present. This allows creating root index files, stage indexes, unit indexes, and deep lesson files seamlessly.
- **Quick Path Chips**: Added ergonomic chips for one-click selection of common unit directories (`unit-1` to `unit-6`, `session-1`, `empty root`) and standard filenames (`index.html`, `lesson-1.html`, `quiz.html`, etc.).

### B. Index & Navigation Hub Archetype (`index_hub`)
- **New First-Class Archetype**: Introduced `index_hub` alongside `curriculum_tabs`, `flashcards_dialogue`, and `quiz_only`.
- **Visual Card Builder (CRUD)**: Teachers can dynamically create, reorder, duplicate, customize, and delete navigation cards with custom emojis/icons, titles, subtitles, target URLs, and active/locked status badges.
- **One-Click Presets**:
  - 🪄 **6 Standard Units**: Generates 6 colored unit cards with proper links (`./unit-1/index.html` to `./unit-6/index.html`).
  - 🪄 **Unit Lessons List**: Generates structured lesson links (`lesson-1-part-1.html`, `lesson-1-part-2.html`, `lesson-2.html`, `quiz.html`).
  - 🪄 **Course Levels**: Generates session modules for spoken English courses.
- **Interactive Live Preview Parity**: The simulator in `preview.js` renders index cards with full visual parity, audio feedback on clicks, locked status handling, and back button navigation.
- **Pure CSS/JS Inheritance**: The generated `index.html` uses the existing `assets/css/style.css` classes (`.units-grid`, `.unit-card`, `.lessons-list`, `.lesson-card`) and shared audio drivers.

## 3. Lessons Learned
- Decoupling directory structure assumptions from template generators ensures long-term scalability as new educational curricula are introduced.
- Dynamic relative asset prefix calculation (`./` vs `../` vs `../../`) prevents broken styles or missing assets across arbitrary directory depths.
