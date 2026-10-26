const fs = require('fs');

const bakContent = fs.readFileSync('Prep_3/unit-2/lesson-4-5.html.bak', 'utf8');
const lines = bakContent.split('\n');

// Tab 7 (reading) is from line 1063 to 1192 (0-indexed: 1062 to 1192)
const readingLines = lines.slice(1062, 1192).join('\n');

const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prep 3 - Unit 2 - Lessons 4 & 5 (5 & 6) | Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css">
    <link rel="stylesheet" href="../../assets/css/curriculum.css">
    <link rel="stylesheet" href="../../assets/css/storybook.css">
    <link rel="stylesheet" href="../../assets/css/quiz.css">
</head>
<body>

    <div class="container">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb">
            <a href="../index.html" style="color: var(--accent-primary); text-decoration: none;">Prep_3</a> / 
            <a href="./index.html" style="color: var(--accent-primary); text-decoration: none;">Unit 2</a> / 
            <span>Lessons 4 & 5 (5 & 6)</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row" style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-top: 10px;">
                <span class="badge badge-active">Prep 3 • Unit 2</span>
                <span class="badge badge-gold">📖 SB pages 36 : 38</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lessons 4 & 5 (5 & 6): Let's Talk • Staying Close</h2>
            <p id="description" class="lesson-desc-display">المفردات الأساسية والتكميلية كاملة، تدريب Pop Quiz التفاعلي، تصريف الأفعال غير المنتظمة، دراسة المرادفات والمتضادات، المقاطع البادئة والناهية، الملاحظات اللغوية (such vs so & cause vs reason)، التعبيرات وحروف الجر الهامة، محرك القراءة والاستماع (StoryEngine)، واختبار شامل 🎯</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('verbs', this)">⚡ تصريف الأفعال (Verbs)</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">⚖️ المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('affixes', this)">🔤 اللواحق والبوادئ (Prefixes & Suffixes)</button>
            <button class="tab-btn" onclick="switchTab('notes', this)">💡 ملاحظات لغوية (Language Notes)</button>
            <button class="tab-btn" onclick="switchTab('expressions', this)">🗣️ تعبيرات وحروف جر</button>
            <button class="tab-btn" onclick="switchTab('reading', this)">📚 القراءة والاستماع (StoryEngine)</button>
            <button class="tab-btn" onclick="switchTab('quiz', this)">🎯 اختبار الدرس الشامل (Quiz)</button>
        </div>

        <!-- Dynamic Curriculum Containers (Hydrated by curriculum-renderer.js) -->
        <div id="vocab" class="tab-content active"></div>
        <div id="verbs" class="tab-content"></div>
        <div id="synonyms" class="tab-content"></div>
        <div id="affixes" class="tab-content"></div>
        <div id="notes" class="tab-content"></div>
        <div id="expressions" class="tab-content"></div>

        <!-- Tab 7: Interactive Storybook (StoryEngine) -->
${readingLines}

        <!-- Tab 8: Comprehensive Interactive Quiz (Hydrated by quiz-engine.js) -->
        <div id="quiz" class="tab-content">
            <div class="score-board">
                <span>السؤال: <span id="current-q">1</span> / <span id="total-q">25</span></span>
                <span>النقاط: <span id="score">0</span> 🌟</span>
            </div>

            <div class="question-card">
                <span class="emoji-display" id="emoji">🎯</span>
                <div class="question-text" id="question">جاري تحميل السؤال...</div>
                <div class="options-grid" id="options"></div>
                <div class="feedback" id="feedback"></div>
            </div>

            <div class="center-row">
                <button class="action-btn next-btn" id="next-btn" onclick="nextQuestion()" style="display: none;">السؤال التالي ➔</button>
            </div>
        </div>

        <!-- Navigation Controls -->
        <div class="nav-controls" style="margin-top: 40px;">
            <a href="./index.html" class="back-btn" data-sound-click="click">⬅️ العودة لقائمة دروس الوحدة الثانية</a>
            <a href="../index.html" class="back-btn" data-sound-click="click">🏫 العودة لجميع وحدات Prep 3</a>
        </div>
    </div>

    <!-- Framework & Shared Scripts -->
    <script src="../../assets/js/bidi.js"></script>
    <script src="../../assets/js/audio.js"></script>
    <script src="../../assets/js/tabs.js"></script>
    <script src="../../assets/js/quiz-engine.js"></script>
    <script src="../../assets/js/story-engine.js"></script>
    <script src="../../assets/js/ui.js"></script>
    <script src="../../assets/js/main.js"></script>

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="./lesson-4-5.data.js"></script>

    <!-- Universal Curriculum Dynamic Renderer -->
    <script src="../../assets/js/curriculum-renderer.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {
                window.CurriculumRenderer.init();
            }
        });
    </script>
</body>
</html>
`;

fs.writeFileSync('Prep_3/unit-2/lesson-4-5.html', htmlContent, 'utf8');
console.log('Successfully wrote refactored Prep_3/unit-2/lesson-4-5.html shell.');
