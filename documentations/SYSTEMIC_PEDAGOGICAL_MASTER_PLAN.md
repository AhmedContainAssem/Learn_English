# Master Systemic Pedagogical & Architectural Plan (V2 - Decoupled & Iterative)
**Platform:** Learn English - Mr. Ahmed Assem (`✨ Easy Peasy Ya Englezeey ✨`)  
**Architecture:** 100% Jamstack (Zero-Server, Client-Side Only, Offline-Ready, Decoupled Modules)  
**Document Purpose:** Production-hardened architectural blueprint adhering strictly to **Separation of Concerns (SoC)**, **DRY**, **Clean Code**, **Loose Coupling (Pub/Sub)**, and **Iterative Vertical Slicing (Bit-by-Bit Delivery)**.

---

## 1. Architectural Self-Inquiry & Rigorous Engineering Principles

### Q1: Is dumping everything into `ui.js` a Best Practice?
**Answer: NO.**
* Putting storage abstractions, Leitner mastery algorithms, quiz event listeners, and text scanners inside `ui.js` recreates the **God File Anti-Pattern** (which the project explicitly eliminated in `DECOUPLING_GOD_FILES_ARCHITECTURE.md`).
* **Architectural Decision (Separation of Concerns)**:
  - **`storage.js` (State & Persistence Concern)**: A dedicated, isolated abstraction for safe client-side persistence, namespace isolation, and private-browsing fallbacks.
  - **`vocab-mastery.js` (Pedagogical Mastery Concern)**: Encapsulates Leitner 3-tier card behaviors, progress bars, and filter toggles.
  - **`quiz-engine.js` (Assessment Concern)**: Manages question flow and evaluation. **Must remain decoupled** from vocabulary internals.
  - **`story-engine.js` (Reading Concern)**: Manages narrative flow and page rendering. Incorporates clean, read-only gloss markup.
  - **`ui.js` (Orchestration Concern)**: Retains its original focused role (global audio event delegation, stage filtering, header search).

### Q2: How do `quiz-engine.js` and `vocab-mastery.js` communicate without tight coupling?
**Answer: Event-Driven Pub/Sub via CustomEvents.**
* `quiz-engine.js` should **NOT** import or directly modify vocabulary data structures. That creates brittle circular dependencies.
* **The Clean Architecture Pattern**:
  - When a student answers incorrectly, `quiz-engine.js` simply dispatches a standard browser CustomEvent:
    ```javascript
    window.dispatchEvent(new CustomEvent('assem:quiz-wrong-answer', {
        detail: {
            questionText: currentQuestion.question,
            correctAnswer: correctOption.text,
            selectedAnswer: selectedOption.text
        }
    }));
    ```
  - `vocab-mastery.js` listens to `assem:quiz-wrong-answer`, extracts target words using strict boundaries, and handles its own state.
  - **Benefit**: If `vocab-mastery.js` is absent (e.g. in a standalone quiz page), `quiz-engine.js` continues to work with zero errors.

### Q3: Shall we implement everything at once or bit-by-bit?
**Answer: Strictly Bit-by-Bit (Iterative Vertical Slicing).**
* "Big Bang" implementations introduce cascading regressions that are difficult to isolate.
* Every module must be delivered as an independent, testable slice:
  - **Slice 1**: Storage Abstraction (`storage.js`) → Test in isolation (get/set/quota fallback).
  - **Slice 2**: Vocabulary Mastery UI (`vocab-mastery.js` + `curriculum.css`) → Test visually on `Sec_1/unit-1/lesson-1.html` (event propagation, responsive layout).
  - **Slice 3**: Pub/Sub Quiz Reverse Binding → Test with deliberate wrong answers.
  - **Slice 4**: Contextual Glossing in `story-engine.js` → Test DOM TreeWalker on reading passages.
  - **Slice 5**: Home Dashboard Quick Blitz in `index.html` → Test practice bank integration.

### Q4: What happens if a failure occurs at each layer? (Failure Mode Analysis)
1. **If `localStorage` is blocked or quota exceeded**:
   - `storage.js` falls back silently to an in-memory dictionary. The lesson interface never crashes; the student experiences the lesson smoothly during the current session.
2. **If a lesson has no vocabulary cards (e.g. Pure Grammar or Direct Quiz template)**:
   - `vocab-mastery.js` gracefully exits after finding 0 target cards (`cardCount === 0`). No phantom progress bars are mounted.
3. **If a student clicks rapidly or double-taps**:
   - `event.stopPropagation()` on mastery buttons guarantees no accidental parent card flips or audio collision.

---

## 2. Global State & Local Storage Contract (`AssemStorage`)

```typescript
// Defined cleanly inside assets/js/storage.js
class AssemStorage {
  private static memoryStore: Record<string, string> = {};

  static get<T>(key: string, defaultValue: T): T;
  static set<T>(key: string, value: T): boolean;
  static getLessonKey(): string; // Deterministic slug: e.g. "assem_mastery_Sec_1_unit-1_lesson-1"
  static addToPracticeBank(item: PracticeItem): void; // Max 30 items, FIFO
  static removeFromPracticeBank(word: string): void;
}
```

### Deterministic Key Generation Algorithm:
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

## 3. Module Specifications & Separation of Concerns

### Module 1: `assets/js/storage.js` (The Safe Persistence Engine)
* **Lines of Code**: ~100 lines.
* **Single Responsibility**: Safe get/set operations, serialization, memory fallback on error, deterministic key generation, and practice bank queue management.
* **Exports**: `window.AssemStorage`.

### Module 2: `assets/js/vocab-mastery.js` (The Leitner 3-Tier Experience)
* **Lines of Code**: ~200 lines.
* **Single Responsibility**:
  - Scans DOM for `.card` elements containing `.word-en`.
  - Attaches thumb-friendly action buttons (`[⭐ أحتاج مراجعتها]`, `[✅ أتقنتها]`).
  - **Enforces `event.stopPropagation()`** to protect parent card events.
  - Injects and updates the Sticky Progress Bar (`أتقنت 8 / 13 كلمة - 61%`).
  - Subscribes to `assem:quiz-wrong-answer` to demote words automatically.
* **Dependencies**: Uses `AssemStorage` and `audio.js`.

### Module 3: `assets/js/quiz-engine.js` (Assessment with Event Dispatch)
* **Modifications**: Add **15 lines** inside `handleOptionClick()`.
* **Single Responsibility**: When a question is answered incorrectly, dispatch `assem:quiz-wrong-answer` with details.
* **Loose Coupling**: Does NOT know about or manipulate vocabulary directly.

### Module 4: `assets/js/story-engine.js` (Reading with DOM-Safe Glosses)
* **Modifications**: Add `attachGlossToTextNode()` using standard DOM `TreeWalker`.
* **Single Responsibility**: Scans narrative text nodes in `#storyText` for target vocabulary words (including inflections `-s`, `-ed`, `-ing`).
* **UI**: Displays a floating, thumb-friendly mini bottom sheet tooltip on touch/click.

### Module 5: `index.html` + `assets/js/ui.js` (Home Dashboard Quick Blitz)
* **Single Responsibility**: Renders the "Daily 5-Word Challenge" widget if `AssemStorage.getPracticeBank()` contains words.

---

## 4. The 5-Step Iterative Implementation Roadmap (Bit-by-Bit)

| Step | Scope | Target Files | Verification & Test Gate |
|---|---|---|---|
| **Step 1** | Safe Storage Module | `assets/js/storage.js` | Unit test get/set in console + verify private mode fallback. |
| **Step 2** | Vocab Mastery Module & CSS | `assets/js/vocab-mastery.js`, `assets/css/curriculum.css` | Open `Sec_1/unit-1/lesson-1.html`. Test card button clicks, audio sounds, mobile 320px viewport, and progress bar counter. |
| **Step 3** | Decoupled Quiz Event Binding | `assets/js/quiz-engine.js`, `assets/js/vocab-mastery.js` | Mark word as mastered → answer quiz question wrong intentionally → verify word demotes to needs-practice. |
| **Step 4** | Interactive Reading Glosses | `assets/js/story-engine.js`, `assets/css/storybook.css` | Test storybook text on mobile. Verify scrolling does not trigger popups and tapping highlights word definition. |
| **Step 5** | Dashboard Quick Blitz | `index.html`, `assets/css/components.css`, `assets/js/ui.js` | Mark 3 words for review in Sec 1 → open `index.html` → verify Blitz Widget appears and functions. |

---

## 5. Architectural Quality Checklist (Enforced on Every Turn)

- [ ] **Separation of Concerns (SoC)**: No single file exceeds 400 lines; each file has one clear responsibility.
- [ ] **DRY (Don't Repeat Yourself)**: Centralized storage keys and audio helper triggers.
- [ ] **Loose Coupling**: Event-driven communication (`CustomEvent`) between Quiz and Mastery.
- [ ] **Non-Destructive Inheritance**: 0 bytes deleted from existing lesson content.
- [ ] **Zero-Purple Palette**: Strictly cyan, sky-blue, emerald green, warm amber, rose red, and slate.
- [ ] **Mobile-First & Touch Safe**: Minimum touch target 44px, `event.stopPropagation()` on nested controls.
- [ ] **Zero-Server Jamstack**: Fully operational offline in browser client.
