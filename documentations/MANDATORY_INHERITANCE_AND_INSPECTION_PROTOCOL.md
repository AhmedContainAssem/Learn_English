# Mandatory Architectural Inheritance & Pre-Implementation Protocol (Zero-Scratch Mandate)

## Context & Problem
When creating or refactoring lesson files across different educational stages (e.g., `Prep_3`, `Sec_1`, `Sec_2`), an agent might inadvertently construct pages from scratch using generic HTML/CSS instead of inheriting existing, production-hardened components. This can lead to:
1. Missing `<head>` stylesheet references (`storybook.css`, `quiz.css`, `curriculum.css`).
2. DOM structure regressions in interactive engines (e.g., `StoryEngine`, `QuizEngine`, `VocabMastery`).
3. Loss of interactive capabilities (e.g., Auto Storyteller audio playback, gloss popovers, bidi support).
4. Inconsistent styling and layout overflow.

---

## The 6-Point Golden Contract Checklist

Whenever an agent begins working on any lesson page, it **MUST perform Step 0: Inspect Before Touch** against this checklist:

### 1. Direct `<head>` CSS Inclusions
Never rely on nested `@import` rules in dynamic mobile webviews. All lesson pages must directly link:
```html
<link rel="stylesheet" href="../../assets/css/style.css">
<link rel="stylesheet" href="../../assets/css/curriculum.css">
<link rel="stylesheet" href="../../assets/css/storybook.css">
<link rel="stylesheet" href="../../assets/css/quiz.css">
```

---

### 2. StoryEngine (Reading & Listening Tab `#reading`) Contract
The `#reading` tab must implement the standard 3D interactive book DOM:
```html
<div id="reading" class="tab-content">
    <div class="section-title">...</div>
    <div class="lesson-desc-display">...</div>

    <!-- Optional Video Card -->
    <div class="video-lesson-card">
        <div class="video-header-bar">
            <div>
                <div class="video-lesson-title">🎥 فيديو القراءة والاستماع التفاعلي: ...</div>
            </div>
            <a href="..." target="_blank" rel="noopener noreferrer" class="badge badge-active video-external-link">▶️ مشاهدة على YouTube</a>
        </div>
        <div class="video-responsive-wrapper">
            <iframe src="..." title="..." allowfullscreen></iframe>
        </div>
    </div>

    <!-- 3D Storybook Container -->
    <div class="storybook-wrapper">
        <div class="storybook-book">
            <div class="book-spine-divider"></div>
            <!-- Artwork Page -->
            <div class="story-page-artwork">
                <div class="artwork-page-inner">
                    <div class="page-badge-artwork"><span id="storyPageBadge">...</span></div>
                    <div class="artwork-container">
                        <img id="storyArtworkImg" src="..." alt="..." onerror="this.classList.add('hidden');" referrerpolicy="no-referrer">
                    </div>
                    <div class="artwork-caption" id="storyCaption">...</div>
                </div>
                <div class="story-page-meta">
                    <span>...</span>
                    <span id="storyPageCounter">...</span>
                </div>
            </div>

            <!-- Content Page -->
            <div class="story-page-content">
                <div>
                    <div class="story-header">
                        <h3 class="story-page-title" id="storyTitle">...</h3>
                        <button type="button" class="audio-btn" onclick="speakCurrentStoryPage()">🔊</button>
                    </div>
                    <div class="story-paragraph" id="storyText">...</div>
                </div>
                <div>
                    <div class="story-translation-box" id="storyTranslation">...</div>
                    <div class="story-vocab-chips" id="storyVocab">...</div>
                </div>
            </div>
        </div>

        <!-- Controls Bar -->
        <div class="story-controls-bar">
            <button type="button" id="storyPrevBtn" onclick="changeStoryPage(-1)" class="action-btn secondary">⬅️ الصفحة السابقة</button>
            <button type="button" id="storytellerBtn" onclick="toggleStoryteller()" class="storyteller-btn">▶️ القارئ التلقائي (Auto Storyteller)</button>
            <div class="story-page-progress">
                <span id="storyPageProgressText">...</span>
                <div class="progress-dots" id="storyProgressDots"></div>
            </div>
            <button type="button" id="storyNextBtn" onclick="changeStoryPage(1)" class="action-btn secondary">الصفحة التالية ➔</button>
        </div>
    </div>
</div>
```

---

### 3. QuizEngine Contract (`#quiz`)
Must provide standardized IDs:
- `#current-q` and `#total-q` (Question counter)
- `#score` (Live score tally)
- `#emoji` (Dynamic emoji)
- `#question` (Question text)
- `#options` (Option buttons grid)
- `#feedback` (Instant feedback alert)
- `#next-btn` (Next question button)

---

### 4. Shared Core Scripts
All lessons must load the 8 foundational client engines at the end of `<body>`:
```html
<script src="../../assets/js/bidi.js"></script>
<script src="../../assets/js/audio.js"></script>
<script src="../../assets/js/vocab-mastery.js"></script>
<script src="../../assets/js/quiz-engine.js"></script>
<script src="../../assets/js/story-engine.js"></script>
<script src="../../assets/js/tabs.js"></script>
<script src="../../assets/js/ui.js"></script>
<script src="../../assets/js/main.js"></script>
```

---

### 5. Data Bridge Protocol
`window.lessonData` must be defined with:
- `id`, `stage`, `unit`, `lesson`, `title`, `description`
- `storyPages`: array of `{ title, imageUrl, caption, textEn, textAr, vocabNotes }`
- `quiz`: question array
- Auto-initialization on `DOMContentLoaded`:
```javascript
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('question')) loadQuestion();
    if (window.storyEngine && window.lessonData?.storyPages) {
        window.storyEngine.loadPages(window.lessonData.storyPages);
    }
});
```

---

### 6. Zero-Scratch Enforcement
- Never write bespoke CSS rules when existing utility classes (`.card`, `.details-box`, `.grid-cards`, `.pop-quiz-box`, `.badge`, `.tag-badge`) exist.
- Always consult the Golden Reference file before writing any code:
  - `Learn_English/Prep_3/unit-2/lesson-3.html`
  - `Learn_English/Sec_1/unit-1/lesson-1.html`
