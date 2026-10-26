# Sec 2 Lesson 1.2 Architectural Inheritance & Mobile Engine Audit

## 1. Problem Statement & Root Cause
In `Learn_English/Sec_2/unit-1/lesson-1-part-2.html`, several architectural deviations from the Golden Reference (`Learn_English/Sec_1/unit-1/lesson-1.html` and `lesson-1-part-1.html`) caused rendering and mobile view bugs:
1. **Missing Stylesheet Inclusions**: Only `style.css` was included in the `<head>`, failing to link `curriculum.css`, `storybook.css`, and `quiz.css` directly. In webview or mobile environments where sub-imported `@import` rules could lag or fail, the curriculum layout, mobile horizontal tabs scroll, and quiz cards broke.
2. **Structural Class Discrepancy in Quiz Container**: The quiz section had deviated from `.quiz-container-card` and its child selectors (`.quiz-header-bar`, `.quiz-question-box`, `.quiz-options-grid`, `.quiz-feedback-box`, `.quiz-actions-bar`), causing `QuizEngine` element lookup to fail to bind styles.
3. **Broken Mobile Layout via Nested Data Tables**: Vocabulary cards and definitions included raw HTML tables (`<table class="data-table">`) with minimum widths, breaking the mobile viewport width and causing horizontal overflow.
4. **Storybook Engine DOM Disconnection**: The storybook markup had placeholder artwork (`placeholder.jpg`) which triggered `onerror` hiding, and lacked standard data binding for the `storyEngine` singleton.

## 2. Decision & Architectural Realignment
In accordance with **القاعدة الذهبية لإعادة الاستخدام والوراثة (Golden Rule of Reusability and Inheritance)** in `AGENTS.md`:
- **Direct Linkage**: Linked `curriculum.css`, `storybook.css`, and `quiz.css` directly alongside `style.css` in the HTML head.
- **Strict DOM Class Inheritance**:
  - Replaced ad-hoc tables with `.details-box` components for synonyms and antonyms, ensuring clean, full-width responsive wrapping.
  - Converted all 9 important vocabulary items into standard interactive `.card` components with pronunciation audio buttons (`speakText`), part-of-speech badges, and bilingual contextual examples.
  - Unified all grid layouts with dual class declarations `class="cards-grid grid-cards"`, inheriting both `curriculum.css` grid mechanics and `components.css` utilities.
- **Engine Parity**:
  - Configured `window.lessonData` with structured `storyPages` and 25 questions in the `quiz` array.
  - Aligned the DOM IDs (`#quiz-header`, `#score-display`, `#current-question-num`, `#total-questions-num`, `#question-box`, `#options-box`, `#feedback-box`, `#next-btn`, `#retry-btn`) so that `quiz-engine.js` boots smoothly via `main.js`.
  - Aligned Storybook DOM IDs (`#storyArtworkImg`, `#storyPageBadge`, `#storyCaption`, `#storyTitle`, `#storyText`, `#storyTranslation`, `#storyVocab`, `#storyPrevBtn`, `#storyNextBtn`, `#storytellerBtn`) so that `story-engine.js` runs flawlessly with auto-storyteller.

## 3. Lessons Learned
- Never write ad-hoc HTML structures or tables for vocabulary and exercises.
- Always use the Golden Reference (`Sec_1/unit-1/lesson-1.html`) as the source of truth for DOM structures and styling classes.
- Ensure that universal singleton engines (`QuizEngine`, `StoryEngine`, `tabs.js`, `audio.js`, `ui.js`) receive identical DOM targets across all secondary and preparatory stages.
