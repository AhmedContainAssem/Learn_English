import os

template = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__PAGE_TITLE__</title>
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
            <a href="../index.html">Sec 1</a> / <a href="./index.html">__UNIT_LABEL__</a> / <span>__LESSON_LABEL__</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">__BADGE_UNIT__</span>
                <span class="badge badge-gold">__BADGE_TITLE__</span>
            </div>
            <h2 id="title" class="lesson-header-title">__HERO_TITLE__</h2>
            <p id="description" class="lesson-desc-display">__HERO_DESC__</p>
        </div>

        <!-- Tabs Navigation Bar (Zero Grammar) -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('collocations', this)">🔗 المتلازمات والتعبيرات</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('language-notes', this)">🧬 المشتقات والفروق (Notes)</button>
__WRITING_TAB_BTN__
            <button class="tab-btn" onclick="switchTab('storybook', this)">📚 القراءة التفاعلية (StoryBook)</button>
            <button class="tab-btn" onclick="switchTab('dialogue', this)">💬 المحادثة الناطقة (Dialogue)</button>
            <button class="tab-btn" onclick="switchTab('quiz', this)">🎯 اختبار الدرس الشامل (Quiz)</button>
        </div>

        <!-- Dynamic Content Containers (Hydrated by CurriculumRenderer) -->
        <div id="vocab" class="tab-content active"></div>
        <div id="definitions" class="tab-content"></div>
        <div id="collocations" class="tab-content"></div>
        <div id="synonyms" class="tab-content"></div>
        <div id="language-notes" class="tab-content"></div>
__WRITING_CONTAINER__

        <!-- Tab: Interactive StoryBook 3D -->
        <div id="storybook" class="tab-content">
            <div class="storybook-wrapper">
                <div class="storybook-book">
                    <div class="book-spine-divider"></div>
                    <div class="story-page-artwork">
                        <div class="artwork-page-inner">
                            <div class="page-badge-artwork"><span id="storyPageBadge">🖼️ Scene 1</span></div>
                            <div class="artwork-container">
                                <img id="storyArtworkImg" src="../../assets/images/gem_museum.webp" alt="Scene Artwork" onerror="this.classList.add('hidden');" referrerpolicy="no-referrer">
                            </div>
                            <div class="artwork-caption" id="storyCaption">Reading Scene</div>
                        </div>
                        <div class="story-page-meta">
                            <span>📖 __STORY_UNIT_LABEL__</span>
                            <span id="storyPageCounter">Page 1</span>
                        </div>
                    </div>
                    <div class="story-page-content">
                        <div>
                            <div class="story-header">
                                <h3 class="story-page-title" id="storyTitle">Loading story...</h3>
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

        <!-- Tab: Interactive Speaking Dialogue -->
        <div id="dialogue" class="tab-content">
            <div id="dialogue-banner-container" style="margin-bottom: 20px;"></div>
            <div id="dialogue-list-container" class="dialogue-list"></div>
        </div>

        <!-- Tab: QuizEngine Contract -->
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

            <div class="center-row" style="margin-top: 20px;">
                <button type="button" class="action-btn next-btn" id="next-btn" onclick="nextQuestion()" style="display: none;">السؤال التالي ➔</button>
            </div>
        </div>

__NAV_CONTROLS__
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
    <script src="../../assets/js/renderers/writing-renderer.js"></script>
    <script src="../../assets/js/renderers/dialogue-player.js"></script>

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="./__DATA_FILE__"></script>

    <!-- Universal Dynamic Curriculum Renderer -->
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/main.js"></script>

    <script>
        function changeStoryPage(dir) {
            if (window.storyEngine && typeof window.storyEngine.changePage === 'function') {
                window.storyEngine.changePage(dir);
            }
        }
        function toggleStoryteller() {
            if (window.storyEngine && typeof window.storyEngine.toggleStoryteller === 'function') {
                window.storyEngine.toggleStoryteller();
            }
        }
        function speakCurrentStoryPage(btn) {
            if (window.storyEngine && window.storyEngine.storyPages) {
                const cur = window.storyEngine.storyPages[window.storyEngine.currentPage];
                const text = cur ? (cur.textEn || cur.text || cur.narrativeEn || '') : '';
                if (text && typeof speakText === 'function') speakText(text, btn);
            }
        }
    </script>
</body>
</html>
'''

lessons_config = [
    {
        'file': 'Sec_1/unit-4/lesson-4-5.html',
        'data_file': 'lesson-4-5.data.js',
        'page_title': 'Sec 1 - Unit 4 - Lessons 4 & 5: Helping our Community & Formal Email | Mr. Ahmed Assem',
        'unit_label': 'Unit 4',
        'lesson_label': 'Lessons 4 & 5',
        'badge_unit': 'Sec 1 • Unit 4',
        'badge_title': '🤝 Helping our Community & Formal Email',
        'hero_title': 'Lessons 4 & 5: Helping our Community & Formal Email Writing',
        'hero_desc': 'المفردات الأساسية والتراكمية، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، مهارة كتابة الإيميل الرسمي (Formal Email)، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)',
        'story_unit_label': 'Community Outreach & Service',
        'has_writing': True,
        'writing_tab_label': '✉️ مهارة كتابة الإيميل الرسمي (Writing)',
        'prev_url': './lesson-3.html',
        'prev_label': 'الدرس الثالث: Small Actions',
        'hub_url': './index.html',
        'hub_label': 'فهرس الوحدة الرابعة',
        'next_url': '../index.html',
        'next_label': 'فهرس منهج أولى ثانوي'
    },
    {
        'file': 'Sec_1/unit-5/lesson-1.html',
        'data_file': 'lesson-1.data.js',
        'page_title': 'Sec 1 - Unit 5 - Lessons 1 & 2: Why Learning a Foreign Language Matters | Mr. Ahmed Assem',
        'unit_label': 'Unit 5',
        'lesson_label': 'Lessons 1 & 2',
        'badge_unit': 'Sec 1 • Unit 5',
        'badge_title': '🌐 Learning Foreign Languages',
        'hero_title': 'Lessons 1 & 2: Why Learning a Foreign Language Matters',
        'hero_desc': 'المفردات الأساسية والتراكمية، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً من كتاب المعاصر 🎯 (Zero Grammar)',
        'story_unit_label': 'Multilingual Journeys',
        'has_writing': False,
        'hub_url': './index.html',
        'hub_label': 'العودة لقائمة الوحدة',
        'next_url': './lesson-3.html',
        'next_label': 'الدرس التالي: Lesson 3'
    },
    {
        'file': 'Sec_1/unit-5/lesson-3.html',
        'data_file': 'lesson-3.data.js',
        'page_title': 'Sec 1 - Unit 5 - Lesson 3: Modern Technology & Foreign Languages | Mr. Ahmed Assem',
        'unit_label': 'Unit 5',
        'lesson_label': 'Lesson 3',
        'badge_unit': 'Sec 1 • Unit 5',
        'badge_title': '📱 Modern Technology & Language Learning',
        'hero_title': 'Lesson 3: Modern Technology and Learning Foreign Languages',
        'hero_desc': 'المفردات الأساسية والتراكمية، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)',
        'story_unit_label': 'Digital Language Learning',
        'has_writing': False,
        'prev_url': './lesson-1.html',
        'prev_label': 'الدرس الأول والثاني',
        'hub_url': './index.html',
        'hub_label': 'فهرس الوحدة الخامسة',
        'next_url': './lesson-4-5.html',
        'next_label': 'الدرس الرابع والخامس'
    },
    {
        'file': 'Sec_1/unit-5/lesson-4-5.html',
        'data_file': 'lesson-4-5.data.js',
        'page_title': 'Sec 1 - Unit 5 - Lessons 4 & 5: Ramy\'s Journey & Informal Email | Mr. Ahmed Assem',
        'unit_label': 'Unit 5',
        'lesson_label': 'Lessons 4 & 5',
        'badge_unit': 'Sec 1 • Unit 5',
        'badge_title': '✉️ Ramy\'s Journey & Informal Email',
        'hero_title': 'Lessons 4 & 5: Ramy\'s Journey with English & Informal Email Writing',
        'hero_desc': 'المفردات الأساسية والتراكمية، مهارة كتابة الإيميل الودي، التعريفات والمترادفات والمتضادات، المتلازمات والمشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)',
        'story_unit_label': 'Ramy\'s Experience in England',
        'has_writing': True,
        'writing_tab_label': '✉️ مهارة كتابة الإيميل (Writing)',
        'prev_url': './lesson-3.html',
        'prev_label': 'الدرس السابق: Lesson 3',
        'hub_url': './index.html',
        'hub_label': 'قائمة الوحدة الخامسة',
        'next_url': '../index.html',
        'next_label': 'فهرس وحدات أولى ثانوي'
    },
    {
        'file': 'Sec_1/unit-6/lesson-1.html',
        'data_file': 'lesson-1.data.js',
        'page_title': 'Sec 1 - Unit 6 - Lessons 1 & 2: The Modern Job Hunt & Job Interviews | Mr. Ahmed Assem',
        'unit_label': 'Unit 6',
        'lesson_label': 'Lessons 1 & 2',
        'badge_unit': 'Sec 1 • Unit 6',
        'badge_title': '💼 The Modern Job Hunt',
        'hero_title': 'Lessons 1 & 2: The Modern Job Hunt & Job Interviews',
        'hero_desc': 'المفردات الأساسية والتراكمية، التعريفات، المتلازمات، التعبيرات وحروف الجر، المشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً من كتاب المعاصر 🎯 (Zero Grammar)',
        'story_unit_label': 'Job Hunting in the Digital Age',
        'has_writing': False,
        'hub_url': './index.html',
        'hub_label': 'العودة لقائمة الوحدة السادسة',
        'next_url': './lesson-3.html',
        'next_label': 'الدرس التالي: Lesson 3'
    },
    {
        'file': 'Sec_1/unit-6/lesson-3.html',
        'data_file': 'lesson-3.data.js',
        'page_title': 'Sec 1 - Unit 6 - Lesson 3: Career Decisions & Exploring Opportunities | Mr. Ahmed Assem',
        'unit_label': 'Unit 6',
        'lesson_label': 'Lesson 3',
        'badge_unit': 'Sec 1 • Unit 6',
        'badge_title': '🚀 Career Decisions',
        'hero_title': 'Lesson 3: Career Decisions & Exploring Opportunities',
        'hero_desc': 'المفردات الأساسية والتراكمية، التعريفات، المتلازمات، المشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)',
        'story_unit_label': 'Exploring Opportunities',
        'has_writing': False,
        'prev_url': './lesson-1.html',
        'prev_label': 'الدرس الأول والثاني',
        'hub_url': './index.html',
        'hub_label': 'فهرس الوحدة السادسة',
        'next_url': './lesson-4-5.html',
        'next_label': 'الدرس الرابع والخامس'
    },
    {
        'file': 'Sec_1/unit-6/lesson-4-5.html',
        'data_file': 'lesson-4-5.data.js',
        'page_title': 'Sec 1 - Unit 6 - Lessons 4 & 5: My Resume [CV] & Professional Communication | Mr. Ahmed Assem',
        'unit_label': 'Unit 6',
        'lesson_label': 'Lessons 4 & 5',
        'badge_unit': 'Sec 1 • Unit 6',
        'badge_title': '📄 Resume / CV Writing',
        'hero_title': 'Lessons 4 & 5: My Resume / Curriculum Vitae [CV] & Professional Communication',
        'hero_desc': 'المفردات الأساسية والتراكمية، مهارة كتابة السيرة الذاتية (CV)، التعريفات والمترادفات والمتضادات، المتلازمات والمشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)',
        'story_unit_label': 'Crafting a Standout Resume',
        'has_writing': True,
        'writing_tab_label': '📄 مهارة كتابة السيرة الذاتية (CV Writing)',
        'prev_url': './lesson-3.html',
        'prev_label': 'الدرس الثالث: Career Decisions',
        'hub_url': './index.html',
        'hub_label': 'قائمة الوحدة السادسة',
        'next_url': '../index.html',
        'next_label': 'فهرس وحدات أولى ثانوي'
    }
]

for cfg in lessons_config:
    fpath = cfg['file']
    content = template
    content = content.replace('__PAGE_TITLE__', cfg['page_title'])
    content = content.replace('__UNIT_LABEL__', cfg['unit_label'])
    content = content.replace('__LESSON_LABEL__', cfg['lesson_label'])
    content = content.replace('__BADGE_UNIT__', cfg['badge_unit'])
    content = content.replace('__BADGE_TITLE__', cfg['badge_title'])
    content = content.replace('__HERO_TITLE__', cfg['hero_title'])
    content = content.replace('__HERO_DESC__', cfg['hero_desc'])
    content = content.replace('__STORY_UNIT_LABEL__', cfg['story_unit_label'])
    content = content.replace('__DATA_FILE__', cfg['data_file'])

    if cfg['has_writing']:
        content = content.replace('__WRITING_TAB_BTN__', f'            <button class="tab-btn" onclick="switchTab(\'writing\', this)">{cfg["writing_tab_label"]}</button>')
        content = content.replace('__WRITING_CONTAINER__', '        <div id="writing" class="tab-content"></div>')
    else:
        content = content.replace('__WRITING_TAB_BTN__\n', '')
        content = content.replace('__WRITING_CONTAINER__\n', '')

    nav_html = '        <div class="nav-controls" style="margin-top: 36px;">\n'
    if cfg.get('prev_url'):
        nav_html += f'            <a href="{cfg["prev_url"]}" class="action-btn secondary" data-sound-click="click">⬅️ {cfg["prev_label"]}</a>\n'
    nav_html += f'            <a href="{cfg.get("hub_url", "./index.html")}" class="action-btn secondary" data-sound-click="click">🏠 {cfg.get("hub_label", "قائمة دروس الوحدة")}</a>\n'
    if cfg.get('next_url'):
        nav_html += f'            <a href="{cfg["next_url"]}" class="action-btn secondary" data-sound-click="click">{cfg["next_label"]} ➔</a>\n'
    nav_html += '        </div>'

    content = content.replace('__NAV_CONTROLS__', nav_html)

    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Successfully migrated: {fpath}")

print("All 7 files updated!")
