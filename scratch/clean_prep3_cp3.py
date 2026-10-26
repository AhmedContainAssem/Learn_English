with open('Prep_3/unit-1/connect-plus-lesson-3.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print("Original line count:", len(lines))

# We will build the clean HTML adhering to the universal contract
clean_html = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connect Plus (G9) - Unit 1 - Lesson 3: Family Ties & Our Ancestors | Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css?v=6">
    <link rel="stylesheet" href="../../assets/css/curriculum.css">
    <link rel="stylesheet" href="../../assets/css/storybook.css">
    <link rel="stylesheet" href="../../assets/css/quiz.css">
</head>
<body>

    <div class="container">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb">
            <a href="../index.html">Prep 3</a> / <a href="./index.html">Unit 1</a> / <span>Connect Plus - Lesson 3 (Family Ties & Our Ancestors)</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Prep 3 • Connect Plus • Unit 1 • Lesson 3</span>
                <span class="badge badge-gold">📖 SB pages 12 : 14 • WB p. 6</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lesson 3: Family Ties & Our Ancestors</h2>
            <p id="description" class="lesson-desc-display">المفردات الأساسية والتكميلية، الدول والجنسيات، تصريف الأفعال، التعريفات، المرادفات والمتضادات، المقاطع واللواحق، المتلازمات والتعبيرات، نصين قراءة تفاعليين بكتاب 3D وقارئ صوتي تلقائي، محادثتين تفاعليتين ناطقتين، كوبري الزمن (المضارع التام) بالشرائح التفاعلية مع كويز 35 سؤالاً 🎯</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات والدول (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('verbs', this)">⚡ تصريف الأفعال (Verbs)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات (Synonyms & Antonyms)</button>
            <button class="tab-btn" onclick="switchTab('reading', this)">📚 القراءة التفاعلية (Readings)</button>
            <button class="tab-btn" onclick="switchTab('dialogue', this)">💬 المحادثة الناطقة (Dialogues)</button>
            <button class="tab-btn" onclick="switchTab('grammar-video', this)">🌉 كوبري الزمن (Grammar Deck)</button>
            <button class="tab-btn" onclick="switchTab('affixes', this)">🔤 اللواحق والمقاطع (Affixes)</button>
            <button class="tab-btn" onclick="switchTab('collocations', this)">🔗 المتلازمات والملاحظات (Collocations & Notes)</button>
            <button class="tab-btn" onclick="switchTab('quiz', this)">🎯 اختبار الدرس الشامل (Quiz)</button>
        </div>

        <!-- Dynamic Curriculum Containers (Hydrated by curriculum-renderer.js) -->
        <div id="vocab" class="tab-content active"></div>
        <div id="verbs" class="tab-content"></div>
        <div id="definitions" class="tab-content"></div>
        <div id="synonyms" class="tab-content"></div>
        <div id="affixes" class="tab-content"></div>
        <div id="collocations" class="tab-content"></div>

        <!-- Tab: Interactive Readings -->
        <div id="reading" class="tab-content">
            <div style="text-align: center; margin-bottom: 24px;">
                <h2 style="font-size: clamp(1.2rem, 3.5vw, 1.6rem); font-weight: 900; color: #ffffff; margin: 0 0 8px 0;">
                    استوديو القراءة والقصص التفاعلية (2 Interactive Readings)
                </h2>
                <div style="color: var(--text-muted); font-size: 0.95rem;">
                    تصفح نصوص القراءة المنهجية داخل الكتاب التفاعلي ثلاثي الأبعاد مع القارئ الصوتي التلقائي والترجمة 🎧
                </div>
                <div class="story-tabs-switcher" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 18px;">
                    <button type="button" id="storyTabBtn-0" class="badge badge-active story-select-btn" onclick="selectStoryDeck(0)" style="padding: 10px 18px; font-size: 0.95rem; cursor: pointer; border-radius: 25px;">
                        🌳 قراءة 1: شجرة عائلتك (Your Family Tree - SB p. 12)
                    </button>
                    <button type="button" id="storyTabBtn-1" class="badge badge-gold story-select-btn" onclick="selectStoryDeck(1)" style="padding: 10px 18px; font-size: 0.95rem; cursor: pointer; border-radius: 25px; opacity: 0.85;">
                        📜 قراءة 2: تاريخ العائلة والعم كريم (A Family History - WB p. 6)
                    </button>
                </div>
            </div>

            <div class="storybook-wrapper">
                <div class="storybook-book">
                    <div class="book-spine-divider"></div>
                    <div class="story-page-artwork">
                        <div class="artwork-page-inner">
                            <div class="page-badge-artwork"><span id="storyPageBadge">🖼️ Scene 1 of 3</span></div>
                            <div class="artwork-container">
                                <img id="storyArtworkImg" src="../../assets/images/family_tree_records_1790534385385.webp" alt="Scene Artwork" onerror="this.classList.add('hidden');" referrerpolicy="no-referrer">
                            </div>
                            <div class="artwork-caption" id="storyCaption">Student examining family tree parchment and records</div>
                        </div>
                        <div class="story-page-meta">
                            <span>📖 Book Reader</span>
                            <span id="storyPageCounter">Page 1 / 3</span>
                        </div>
                    </div>
                    <div class="story-page-content">
                        <div>
                            <div class="story-header">
                                <h3 class="story-page-title" id="storyTitle">Your Family Tree</h3>
                                <button type="button" class="audio-btn" onclick="speakCurrentStoryPage(this)" title="استمع للنطق">🔊</button>
                            </div>
                            <div class="story-paragraph" id="storyText">Loading reading passage...</div>
                        </div>
                        <div>
                            <div class="story-translation-box" id="storyTranslation"></div>
                            <div class="story-vocab-chips" id="storyVocab"></div>
                        </div>
                    </div>
                </div>
                <div class="story-controls-bar">
                    <button type="button" id="storyPrevBtn" onclick="changeStoryPage(-1)" class="action-btn secondary">⬅️ الصفحة السابقة</button>
                    <button type="button" id="storytellerBtn" onclick="toggleStoryteller()" class="storyteller-btn">▶️ القارئ التلقائي (Auto Storyteller)</button>
                    <button type="button" id="storyNextBtn" onclick="changeStoryPage(1)" class="action-btn secondary">الصفحة التالية ➔</button>
                </div>
            </div>
        </div>

        <!-- Tab: Interactive Dialogues -->
        <div id="dialogue" class="tab-content">
            <div id="dialogue-banner-container" style="margin-bottom: 20px;"></div>
            <div id="dialogue-list-container" class="dialogue-list"></div>
        </div>

        <!-- Tab: Grammar Video & Slides Deck -->
        <div id="grammar-video" class="tab-content">
            <!-- Dynamic Grammar Deck hydrated by LexiconRenderer -->
        </div>

        <!-- Tab: QuizEngine Contract -->
        <div id="quiz" class="tab-content">
            <div class="score-board">
                <span>السؤال: <span id="current-q">1</span> / <span id="total-q">35</span></span>
                <span>النقاط: <span id="score">0</span> 🌟</span>
            </div>

            <div class="question-card">
                <span class="emoji-display" id="emoji">🎯</span>
                <div class="question-text" id="question">جاري تحميل السؤال...</div>
                <div class="options-grid" id="options"></div>
                <div class="feedback" id="feedback"></div>
            </div>

            <div class="center-row" style="margin-top: 20px;">
                <button type="button" class="action-btn next-btn" id="next-btn" onclick="nextQuestion()" style="display: none;">السؤال التالي ➔</button>
            </div>
        </div>

        <!-- Bottom Return Controls -->
        <div class="nav-controls" style="margin-top: 36px;">
            <a href="./index.html" class="action-btn secondary" data-sound-click="click">⬅ العودة لقائمة دروس الوحدة</a>
            <a href="../index.html" class="action-btn secondary" data-sound-click="click">🏠 قائمة وحدات الصف الثالث الإعدادي</a>
        </div>
    </div>

    <!-- Framework & Data Scripts -->
    <script src="../../assets/js/bidi.js"></script>
    <script src="../../assets/js/audio.js"></script>
    <script src="../../assets/js/tabs.js"></script>
    <script src="../../assets/js/quiz-engine.js"></script>
    <script src="../../assets/js/story-engine.js"></script>
    <script src="../../assets/js/ui.js?v=6"></script>

    <!-- Modular Curriculum Sub-Renderers -->
    <script src="../../assets/js/renderers/ui-primitives.js"></script>
    <script src="../../assets/js/renderers/vocab-renderer.js"></script>
    <script src="../../assets/js/renderers/lexicon-renderer.js"></script>
    <script src="../../assets/js/renderers/dialogue-player.js"></script>
    <script src="../../assets/js/renderers/grammar-slides-engine.js"></script>

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="./connect-plus-lesson-3.data.js"></script>

    <!-- Universal Dynamic Curriculum Renderer -->
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/main.js"></script>

    <script>
        function selectStoryDeck(idx) {
            if (window.readingDecks && window.readingDecks[idx] && window.storyEngine) {
                for (let i = 0; i < window.readingDecks.length; i++) {
                    const btn = document.getElementById('storyTabBtn-' + i);
                    if (btn) {
                        btn.className = (i === idx) ? 'badge badge-active story-select-btn' : 'badge badge-gold story-select-btn';
                        btn.style.opacity = (i === idx) ? '1' : '0.7';
                    }
                }
                window.storyEngine.loadPages(window.readingDecks[idx].pages);
                if (typeof window.playSound === 'function') window.playSound('click');
            }
        }

        function changeStoryPage(direction) {
            if (window.storyEngine && typeof window.storyEngine.changePage === 'function') {
                window.storyEngine.changePage(direction);
            }
        }

        function toggleStoryteller() {
            if (window.storyEngine && typeof window.storyEngine.toggleStoryteller === 'function') {
                window.storyEngine.toggleStoryteller();
            }
        }

        function speakCurrentStoryPage(btn) {
            if (window.storyEngine && typeof window.storyEngine.speakCurrentPage === 'function') {
                window.storyEngine.speakCurrentPage(btn);
            } else if (window.storyEngine && window.storyEngine.storyPages) {
                const cur = window.storyEngine.storyPages[window.storyEngine.currentPage];
                const textToSpeak = cur ? (cur.textEn || cur.text || '') : '';
                if (textToSpeak && typeof speakText === 'function') {
                    speakText(textToSpeak, btn);
                }
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {
                window.CurriculumRenderer.init();
            }
            if (typeof selectStoryDeck === 'function' && window.readingDecks && window.readingDecks.length > 0) {
                selectStoryDeck(0);
            }
            if (typeof loadQuestion === 'function' && document.getElementById('question')) {
                loadQuestion();
            }
        });
    </script>
</body>
</html>
'''

with open('Prep_3/unit-1/connect-plus-lesson-3.html', 'w', encoding='utf-8') as f:
    f.write(clean_html)

print("Refactored Prep 3 Unit 1 connect-plus-lesson-3.html! New line count:", len(clean_html.splitlines()))
