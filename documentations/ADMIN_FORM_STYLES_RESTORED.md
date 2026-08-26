# Admin Studio Form Input Styles Restored

## 1. Problem Identified
In the teacher's Lesson Studio (`/admin/index.html`), several input fields (such as quiz option text boxes, emoji input fields, index hub destination fields, PIN code dialogs, etc.) were displaying as default white unstyled HTML rectangles with black text instead of the dark cyberpunk neon aesthetic.

## 2. Root Cause
- In `admin.css`, the rules for `.form-input`, `.form-select`, and `.form-textarea` were nested inside `.form-group` (`.form-group { & .form-input { ... } }`).
- Consequently, any `<input>` elements positioned inside flex rows, option lists, tables, or custom containers without an explicit `.form-group` parent fell back to the browser's default unstyled user-agent stylesheet (white background, square corners, standard border).

## 3. Resolution
1. **Universal Class Definition**: Promoted `.form-input`, `.form-select`, `.form-textarea`, and `.emoji-input-field` to top-level CSS classes so they apply consistently regardless of DOM depth or parent hierarchy.
2. **Container-wide Element Selectors**: Added fallback dark styling for `input[type="text"]`, `input[type="password"]`, `input[type="url"]`, `select`, and `textarea` within `.admin-container` and modal dialogs.
3. **Audio and Delete Triggers**: Added explicit top-level styling for `.audio-btn`, `.item-badge`, and `.btn-delete-item` with neon hover effects and tactile feedback.
