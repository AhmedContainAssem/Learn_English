# Master Systemic Pedagogical & Architectural Plan (V3 - Foundation Refactored & Fully Decoupled)
**Platform:** Learn English - Mr. Ahmed Assem (`✨ Easy Peasy Ya Englezeey ✨`)  
**Architecture:** 100% Jamstack (Zero-Server, Client-Side Only, Offline-Ready, Decoupled Modules)  
**Document Purpose:** Production-hardened architectural blueprint governed by the answers to the 4 critical software engineering questions:
1. *Do we need to refactor the platform first?* **YES: Phase 0 Foundation Refactor.**
2. *Is this best practice & Separation of Concerns?* **YES: Dedicated single-responsibility modules & Event Pub/Sub.**
3. *Shall we implement it all at once or bit-by-bit?* **Strictly bit-by-bit (Iterative Vertical Slicing with test gates).**
4. *What happens if a piece fails?* **Defensive fallbacks, graceful degradation, and zero regressions.**

---

## 1. Architectural Self-Inquiry: "Do We Need to Refactor the Platform First?"

### The Honest Codebase Audit
Before adding new pedagogical features (Mastery, Glosses, Blitz), we audited the existing codebase against the 4 core tenets of software craftsmanship:

| Tenet | Current Status | The Architectural Risk if Unrefactored | The Foundation Refactoring Decision (Phase 0) |
|---|---|---|---|
| **Separation of Concerns (SoC)** | `ui.js` currently mixes DOM sound delegation, dashboard search, and direct raw `localStorage` read/write for recent lessons. | Adding vocabulary mastery and practice banks will turn `ui.js` into an unmaintainable God File. | **Extract `storage.js`**: Isolate all client-side state and persistence into a single-responsibility abstraction (`AssemStorage`). |
| **DRY (Don't Repeat Yourself)** | Text normalization (`normalizeAr`) is trapped privately inside `ui.js`. | Quiz-to-vocab matching and practice bank filtering will duplicate regex and normalization logic across files. | **Extract `AssemUtils`**: Centralize `normalizeAr`, `escapeRegExp`, and `getLessonKey` in a shared utility layer. |
| **Universal Inheritance (The Script Loading Problem)** | All 100+ existing lesson HTML files already contain fixed script tags (`bidi.js`, `audio.js`, `quiz-engine.js`, `story-engine.js`, `tabs.js`, `ui.js`, `main.js`). | Creating new standalone script files (`vocab-mastery.js`) would require manually editing 100+ HTML files or leaving old lessons broken without new features! | **Refactor `main.js` as the Universal Subsystems Bootstrapper**: `main.js` is already loaded by 100% of lessons. It will initialize and orchestrate the modular subsystems dynamically. |
| **Clean Architecture & Loose Coupling** | Direct calls between modules create tight dependencies. | If `quiz-engine.js` hardcodes calls to `vocab-mastery`, standalone quiz pages crash. | **Pub/Sub Event Bus**: Use browser `CustomEvent` (`assem:quiz-wrong-answer`) so Quiz Engine and Vocab Mastery remain completely decoupled. |

---

## 2. Global State & Local Storage Contract (`AssemStorage`)

```typescript
// Defined cleanly inside assets/js/storage.js
class AssemStorage {
  private static memoryStore: Record<string, string> = {};

  // Core Safe API
  static get<T>(key: string, defaultValue: T): T;
  static set<T>(key: string, value: T): boolean;
  static remove(key: string): void;
  
  // Deterministic Key Discovery
  static getLessonKey(): string; // e.g. "assem_mastery_Sec_1_unit-1_lesson-1"
  
  // Practice Bank Queue (Max 30 items, FIFO, Deduplicated)
  static getPracticeBank(): PracticeItem[];
  static addToPracticeBank(item: PracticeItem): void;
  static removeFromPracticeBank(word: string): void;
}
```

### Universal Lesson Key Algorithm (Safe against all routing/hosting environments):
```javascript
function getLessonKey() {
    if (window.lessonData && window.lessonData.id) return window.lessonData.id;
    const path = window.location.pathname.replace(/\\/g, '/');
    const matches = path.match(/(Sec_[1-3]|Prep_[1-3]|Grade_[1-6]|Course)\/([^/]+)\/([^/]+)\.html/i);
    if (matches) {
        return `assem_mastery_${matches[1]}_${matches[2]}_${matches[3]}`;
    }
    const filename = path.split('/').pop().replace('.html', '') || 'lesson';
    return `assem_mastery_${document.title.replace(/\s+/g, '_')}_${filename}`;
}
```

---

## 3. Modular System Architecture (Single Responsibility Breakdown)

```
Learn_English/assets/js/
├── audio.js            -> (Unchanged) Native Web Audio oscillators + Web Speech TTS
├── bidi.js             -> (Unchanged) RTL/LTR BiDi text formatting
├── storage.js          -> [PHASE 0 NEW] Pure Storage & Persistence Engine (AssemStorage)
├── utils.js            -> [PHASE 0 NEW] DRY Utilities (normalizeAr, escapeRegExp, getLessonKey)
├── ui.js               -> [PHASE 0 REFACTORED] Pure UI orchestrator (uses AssemStorage, delegates clicks)
├── vocab-mastery.js    -> [PHASE 2 NEW] Leitner 3-Tier card actions, progress bar, stopPropagation
├── quiz-engine.js      -> [PHASE 3 ENHANCED] Quiz assessment; dispatches decoupled CustomEvents
├── story-engine.js     -> [PHASE 4 ENHANCED] Reading storyteller + DOM TreeWalker Contextual Glosses
└── main.js             -> [PHASE 0 REFACTORED] Universal Bootstrapper; loads and runs subsystems across all lessons
```

---

## 4. The 6-Phase Step-by-Step Implementation Roadmap (Bit-by-Bit)

### Phase 0: Foundation Refactoring (The Prerequisite)
* **Goal**: Prepare the architecture, eliminate code duplication, and establish the Universal Bootstrapper.
* **Actions**:
  1. Create `assets/js/storage.js` implementing `AssemStorage` with memory fallback.
  2. Create `assets/js/utils.js` (or clean utility export) with `normalizeAr` and `escapeRegExp`.
  3. Refactor `assets/js/ui.js` to replace raw `localStorage` calls with `AssemStorage`.
  4. Refactor `assets/js/main.js` to coordinate subsystem startup seamlessly.
* **Test Gate**: Verify `index.html` recent lesson resume banner works through `AssemStorage`. Verify zero console errors on all pages.

### Phase 1: Vocab Mastery Engine & CSS
* **Goal**: Mount thumb-friendly Leitner 3-tier actions on existing `.card` elements.
* **Actions**:
  1. Build `assets/js/vocab-mastery.js` with `event.stopPropagation()` on all mastery buttons.
  2. Add styles in `assets/css/curriculum.css` (Strict Zero-Purple: emerald for mastered, warm amber for needs practice).
  3. Injects sticky progress bar (*"إتقان الكلمات: 8 / 13 كلمة (61%)"*).
* **Test Gate**: Open `Sec_1/unit-1/lesson-1.html`. Verify buttons click cleanly without flipping parent cards or double-playing sounds. Verify 320px mobile viewport has zero horizontal overflow.

### Phase 2: Decoupled Quiz Event Binding (Pub/Sub)
* **Goal**: Automatically demote mastered words when a student fails them in the quiz.
* **Actions**:
  1. In `assets/js/quiz-engine.js`, add `window.dispatchEvent(new CustomEvent('assem:quiz-wrong-answer', ...))` when an answer is incorrect.
  2. In `assets/js/vocab-mastery.js`, subscribe to the event and demote matching target words using whole-word boundaries (`\b${word}\b`).
* **Test Gate**: Mark word as mastered → intentionally answer its quiz question incorrectly → verify card turns to "needs practice" and mastery progress bar updates dynamically.

### Phase 3: Interactive Reading Glosses (DOM TreeWalker)
* **Goal**: Connect story reading passages with lesson vocabulary interactively.
* **Actions**:
  1. In `assets/js/story-engine.js`, scan `#storyText` using safe `NodeFilter.SHOW_TEXT` (supporting inflections: `-s`, `-ed`, `-ing`).
  2. Wrap matching words in `.gloss-target`.
  3. Add non-intrusive bottom sheet / tooltip in `assets/css/storybook.css`.
* **Test Gate**: Scroll through story pages on mobile viewports. Verify smooth scrolling without accidental triggers. Tap a gloss target to reveal clean definition and audio pronunciation.

### Phase 4: Home Dashboard "3-Minute Quick Blitz"
* **Goal**: Provide instant daily reinforcement on `index.html`.
* **Actions**:
  1. Add Quick Blitz widget container in `Learn_English/index.html`.
  2. Implement rapid 5-card review modal in `assets/js/ui.js` / components.
  3. Integrate with `AssemStorage.getPracticeBank()` (FIFO, max 30 words).
* **Test Gate**: Mark words for review in a lesson → return to `index.html` → verify Blitz Widget appears and completes 5 rapid reviews.

### Phase 5: Architectural Regression Audit
* **Goal**: Validate the entire platform across all grades.
* **Actions**:
  1. Test `Sec_1`, `Sec_2`, `Prep_3`, `Grade_2`, and `Course`.
  2. Test `admin/` Teacher Studio generator roundtrip JSON payload (`#studio-payload`).
  3. Run `compile_applet` and verify 0 build errors.

---

## 5. Architectural Quality Checklist

- [x] **Phase 0 Foundation Refactor Completed First**: Storage and Utilities decoupled (`storage.js` & `utils.js`).
- [x] **Phase 1 Vocab Mastery Engine Completed**: Leitner 3-tier card actions, sticky progress bar, and filters (`vocab-mastery.js`).
- [x] **Phase 2 Decoupled Quiz Event Binding Completed**: CustomEvent `assem:quiz-wrong-answer` demotes words cleanly without hard dependencies.
- [x] **Phase 3 Interactive Reading Glosses Completed**: DOM TreeWalker contextual popovers with speech synthesis and zero overflow (`story-engine.js`).
- [x] **Phase 4 Home Dashboard 3-Minute Quick Blitz Completed**: Seamless Quick Blitz widget on dashboard and Global Practice Hub with Flashcard/List modes.
- [x] **Phase 5 Architectural Regression Audit Completed**: Universal dynamic DOM injection without modifying any existing lesson HTML files.
- [x] **Separation of Concerns (SoC)**: Independent modules with single responsibilities.
- [x] **DRY (Don't Repeat Yourself)**: Shared utilities for string normalization, audio, and storage.
- [x] **Universal Inheritance**: Zero HTML edits required in existing lesson files; `main.js` bootstraps subsystems dynamically.
- [x] **Loose Coupling**: Event-driven `CustomEvent` (`assem:quiz-wrong-answer`, `assem:practice-bank-updated`).
- [x] **Strict Zero-Purple Palette**: Strictly cyan, sky-blue, emerald green, warm amber, rose red, and slate.
- [x] **100% Jamstack Client-Side Purity**: Zero server dependencies; offline-ready with Safari private browsing fallback.
