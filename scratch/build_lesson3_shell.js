const fs = require('fs');

const bakContent = fs.readFileSync('Prep_3/unit-2/lesson-3.html.bak', 'utf8');
const lines = bakContent.split('\n');

// Tab 6 is line 982 to 1112 (0-indexed: 981 to 1112)
// Tab 7 is line 1116 to 1965 (0-indexed: 1115 to 1965)
const tab6Lines = lines.slice(981, 1112).join('\n');
const tab7Lines = lines.slice(1115, 1965).join('\n');

const htmlContent = `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prep 3 - Unit 2 - Lesson 3: The Silent Dinner | Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css">
    <link rel="stylesheet" href="../../assets/css/curriculum.css">
    <link rel="stylesheet" href="../../assets/css/storybook.css">
    <link rel="stylesheet" href="../../assets/css/grammar-slides.css">
    <link rel="stylesheet" href="../../assets/css/quiz.css">
</head>
<body>

    <div class="container">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb">
            <a href="../index.html" style="color: var(--accent-primary); text-decoration: none;">Prep_3</a> / 
            <a href="./index.html" style="color: var(--accent-primary); text-decoration: none;">Unit 2</a> / 
            <span>Lesson 3 (The Silent Dinner)</span>
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
                <span class="badge badge-gold">📖 SB pages 32 & 33</span>
                <span class="badge" style="background: rgba(255, 71, 126, 0.15); color: #ff477e;">⚠️ تنبيه: الدرس الرابع القصة المقررة في نهاية الكتاب</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lesson 3: The Silent Dinner</h2>
            <p id="description" class="lesson-desc-display">المفردات الرئيسية والتكميلية كاملة، تدريب Pop Quiz، تصريف الأفعال، التعريفات، المتلازمات، المرادفات والمتضادات، المقاطع واللواحق والتعبيرات، نص القراءة التفاعلي، شرح كوبري الزمن ومقارنة المضارع التام والمستمر (Present Perfect vs Progressive) بالفيديوهات والشرائح الـ 16، واختبار شامل 🎯</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('verbs', this)">⚡ تصريف الأفعال (Verbs)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">📚 التعريفات والمتلازمات</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">⚖️ المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('notes-affixes', this)">🔤 اللغويات واللواحق والتعبيرات</button>
            <button class="tab-btn" onclick="switchTab('reading', this)">📚 القراءة التفاعلية (The Silent Dinner - Storyteller)</button>
            <button class="tab-btn" onclick="switchTab('grammar-video', this)">🎥 شرح القواعد (Present Perfect vs Progressive)</button>
            <button class="tab-btn" onclick="switchTab('quiz', this)">🎯 اختبار الدرس الشامل (Quiz)</button>
        </div>

        <!-- Dynamic Curriculum Containers (Hydrated by curriculum-renderer.js) -->
        <div id="vocab" class="tab-content active"></div>
        <div id="verbs" class="tab-content"></div>
        <div id="definitions" class="tab-content"></div>
        <div id="synonyms" class="tab-content"></div>
        <div id="notes-affixes" class="tab-content"></div>

        <!-- Tab 6: Interactive Storybook (The Silent Dinner) -->
${tab6Lines}

        <!-- Tab 7: Grammar & Video (Present Perfect vs Progressive) -->
${tab7Lines}

        <!-- Tab 8: Comprehensive Quiz (Hydrated by quiz-engine.js) -->
        <div id="quiz" class="tab-content">
            <div class="score-board">
                <span>السؤال: <span id="current-q">1</span> / <span id="total-q">30</span></span>
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

        <!-- Navigation Controls Bottom -->
        <div class="nav-controls" style="margin-top: 40px;">
            <a href="./index.html" class="back-btn" data-sound-click="click">⬅️ العودة لدروس الوحدة الثانية</a>
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

    <!-- Slide Presentation Controller Script -->
    <script>
        let currentSlideIdx = 0;
        let currentSlideMode = 'presentation';

        function updateSlideView() {
            const deck = document.getElementById('presentation-deck');
            if (!deck) return;
            const slides = deck.querySelectorAll('.slide-frame');
            const indicator = document.getElementById('slide-indicator');
            const prevBtn = document.getElementById('prev-slide-btn');
            const nextBtn = document.getElementById('next-slide-btn');
            const pills = document.querySelectorAll('.slide-pill-item');

            if (currentSlideMode === 'presentation') {
                slides.forEach((slide, idx) => {
                    if (idx === currentSlideIdx) {
                        slide.classList.remove('hide-in-slide-mode');
                    } else {
                        slide.classList.add('hide-in-slide-mode');
                    }
                });
                if (prevBtn) prevBtn.disabled = (currentSlideIdx === 0);
                if (nextBtn) nextBtn.disabled = (currentSlideIdx >= slides.length - 1);
            } else {
                slides.forEach(slide => slide.classList.remove('hide-in-slide-mode'));
                if (prevBtn) prevBtn.disabled = true;
                if (nextBtn) nextBtn.disabled = true;
            }

            if (indicator) {
                indicator.textContent = currentSlideMode === 'presentation' 
                    ? \`الشريحة \${currentSlideIdx + 1} من \${slides.length}\`
                    : \`عرض جميع الشرائح (\${slides.length})\`;
            }

            pills.forEach((pill, idx) => {
                if (idx === currentSlideIdx && currentSlideMode === 'presentation') {
                    pill.classList.add('active');
                    pill.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
                } else {
                    pill.classList.remove('active');
                }
            });
        }

        function nextSlide() {
            const deck = document.getElementById('presentation-deck');
            const slides = deck ? deck.querySelectorAll('.slide-frame') : [];
            if (currentSlideIdx < slides.length - 1) {
                currentSlideIdx++;
                if (typeof playSound === 'function') playSound('click');
                updateSlideView();
            }
        }

        function prevSlide() {
            if (currentSlideIdx > 0) {
                currentSlideIdx--;
                if (typeof playSound === 'function') playSound('click');
                updateSlideView();
            }
        }

        function goToSlide(idx) {
            currentSlideIdx = idx;
            if (currentSlideMode !== 'presentation') {
                setSlideMode('presentation');
            } else {
                if (typeof playSound === 'function') playSound('click');
                updateSlideView();
            }
        }

        function setSlideMode(mode) {
            currentSlideMode = mode;
            const btnPres = document.getElementById('btn-mode-presentation');
            const btnAll = document.getElementById('btn-mode-all');
            
            if (btnPres) btnPres.classList.toggle('active', mode === 'presentation');
            if (btnAll) btnAll.classList.toggle('active', mode === 'all');
            
            if (typeof playSound === 'function') playSound('click');
            updateSlideView();
        }

        document.addEventListener('keydown', (e) => {
            const grammarTab = document.getElementById('grammar-video');
            if (grammarTab && (grammarTab.classList.contains('active') || grammarTab.style.display === 'block') && currentSlideMode === 'presentation') {
                if (e.key === 'ArrowRight' || e.key === 'PageUp') {
                    prevSlide();
                } else if (e.key === 'ArrowLeft' || e.key === 'PageDown' || e.key === ' ') {
                    nextSlide();
                }
            }
        });
    </script>

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="./lesson-3.data.js"></script>

    <!-- Universal Curriculum Dynamic Renderer -->
    <script src="../../assets/js/curriculum-renderer.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {
                window.CurriculumRenderer.init();
            }
            // Initialize slide view
            updateSlideView();
        });
    </script>
</body>
</html>
`;

fs.writeFileSync('Prep_3/unit-2/lesson-3.html', htmlContent, 'utf8');
console.log('Successfully wrote refactored Prep_3/unit-2/lesson-3.html shell.');
