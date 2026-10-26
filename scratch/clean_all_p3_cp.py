import re

def clean_cp_file(html_path, data_file, title, badge, sub_title, desc, readings_config=None):
    switcher_html = ""
    if readings_config:
        buttons = []
        for idx, (icon, label) in enumerate(readings_config):
            cls = "badge badge-active story-select-btn" if idx == 0 else "badge badge-gold story-select-btn"
            op = "1" if idx == 0 else "0.85"
            buttons.append(f'''                    <button type="button" id="storyTabBtn-{idx}" class="{cls}" onclick="selectStoryDeck({idx})" style="padding: 10px 18px; font-size: 0.95rem; cursor: pointer; border-radius: 25px; opacity: {op};">
                        {icon} {label}
                    </button>''')
        btns_joined = "\n".join(buttons)
        switcher_html = f'''            <div style="text-align: center; margin-bottom: 24px;">
                <h2 style="font-size: clamp(1.2rem, 3.5vw, 1.6rem); font-weight: 900; color: #ffffff; margin: 0 0 8px 0;">
                    استوديو القراءة والقصص التفاعلية ({len(readings_config)} Interactive Readings)
                </h2>
                <div style="color: var(--text-muted); font-size: 0.95rem;">
                    تصفح نصوص القراءة المنهجية داخل الكتاب التفاعلي ثلاثي الأبعاد مع القارئ الصوتي التلقائي والترجمة 🎧
                </div>
                <div class="story-tabs-switcher" style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; margin-top: 18px;">
{btns_joined}
                </div>
            </div>'''
    else:
        switcher_html = '''            <div style="text-align: center; margin-bottom: 24px;">
                <h2 style="font-size: clamp(1.2rem, 3.5vw, 1.6rem); font-weight: 900; color: #ffffff; margin: 0 0 8px 0;">
                    استوديو القراءة والقصص التفاعلية (Interactive StoryBook)
                </h2>
                <div style="color: var(--text-muted); font-size: 0.95rem;">
                    تصفح نصوص القراءة المنهجية داخل الكتاب التفاعلي ثلاثي الأبعاد مع القارئ الصوتي التلقائي 🎧
                </div>
            </div>'''

    html = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} | Mr. Ahmed Assem</title>
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
            <a href="../index.html">Prep 3</a> / <a href="./index.html">Connect Plus</a> / <span>{sub_title}</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">{badge}</span>
                <span class="badge badge-gold">Connect Plus (G9)</span>
            </div>
            <h2 id="title" class="lesson-header-title">{sub_title}</h2>
            <p id="description" class="lesson-desc-display">{desc}</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('verbs', this)">⚡ تصريف الأفعال (Verbs)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('reading', this)">📚 القراءة التفاعلية (Readings)</button>
            <button class="tab-btn" onclick="switchTab('dialogue', this)">💬 المحادثة الناطقة (Dialogues)</button>
            <button class="tab-btn" onclick="switchTab('affixes', this)">🔤 اللواحق والمقاطع (Affixes)</button>
            <button class="tab-btn" onclick="switchTab('collocations', this)">🔗 المتلازمات والملاحظات</button>
            <button class="tab-btn" onclick="switchTab('quiz', this)">🎯 اختبار الدرس الشامل (Quiz)</button>
        </div>

        <!-- Dynamic Content Containers (Hydrated by CurriculumRenderer) -->
        <div id="vocab" class="tab-content active"></div>
        <div id="verbs" class="tab-content"></div>
        <div id="definitions" class="tab-content"></div>
        <div id="synonyms" class="tab-content"></div>
        <div id="affixes" class="tab-content"></div>
        <div id="collocations" class="tab-content"></div>

        <!-- Tab: Interactive Reading (StoryBook 3D) -->
        <div id="reading" class="tab-content">
{switcher_html}
            <div class="storybook-wrapper">
                <div class="storybook-book">
                    <div class="book-spine-divider"></div>
                    <div class="story-page-artwork">
                        <div class="artwork-page-inner">
                            <div class="page-badge-artwork"><span id="storyPageBadge">🖼️ Scene 1</span></div>
                            <div class="artwork-container">
                                <img id="storyArtworkImg" src="../../assets/images/courtyard_portrait_1789590031900.webp" alt="Scene Artwork" onerror="this.classList.add('hidden');" referrerpolicy="no-referrer">
                            </div>
                            <div class="artwork-caption" id="storyCaption">Reading Scene</div>
                        </div>
                        <div class="story-page-meta">
                            <span>📖 Book Reader</span>
                            <span id="storyPageCounter">Page 1</span>
                        </div>
                    </div>
                    <div class="story-page-content">
                        <div>
                            <div class="story-header">
                                <h3 class="story-page-title" id="storyTitle">Interactive Reading</h3>
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

        <!-- Tab: Interactive Dialogue Stream -->
        <div id="dialogue" class="tab-content">
            <div id="dialogue-banner-container" style="margin-bottom: 20px;"></div>
            <div id="dialogue-list-container" class="dialogue-list"></div>
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

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="{data_file}"></script>

    <!-- Universal Dynamic Curriculum Renderer -->
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/main.js"></script>

    <script>
        function selectStoryDeck(idx) {{
            if (window.readingDecks && window.readingDecks[idx] && window.storyEngine) {{
                for (let i = 0; i < window.readingDecks.length; i++) {{
                    const btn = document.getElementById('storyTabBtn-' + i);
                    if (btn) {{
                        btn.className = (i === idx) ? 'badge badge-active story-select-btn' : 'badge badge-gold story-select-btn';
                        btn.style.opacity = (i === idx) ? '1' : '0.85';
                    }}
                }}
                window.storyEngine.loadPages(window.readingDecks[idx].pages);
                if (typeof window.playSound === 'function') window.playSound('click');
            }}
        }}

        function changeStoryPage(dir) {{
            if (window.storyEngine && typeof window.storyEngine.changePage === 'function') {{
                window.storyEngine.changePage(dir);
            }}
        }}

        function toggleStoryteller() {{
            if (window.storyEngine && typeof window.storyEngine.toggleStoryteller === 'function') {{
                window.storyEngine.toggleStoryteller();
            }}
        }}

        function speakCurrentStoryPage(btn) {{
            if (window.storyEngine && typeof window.storyEngine.speakCurrentPage === 'function') {{
                window.storyEngine.speakCurrentPage(btn);
            }} else if (window.storyEngine && window.storyEngine.storyPages) {{
                const cur = window.storyEngine.storyPages[window.storyEngine.currentPage];
                const text = cur ? (cur.textEn || cur.text || '') : '';
                if (text && typeof speakText === 'function') speakText(text, btn);
            }}
        }}

        document.addEventListener('DOMContentLoaded', () => {{
            if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {{
                window.CurriculumRenderer.init();
            }}
            if (typeof selectStoryDeck === 'function' && window.readingDecks && window.readingDecks.length > 0) {{
                selectStoryDeck(0);
            }}
            if (typeof loadQuestion === 'function' && document.getElementById('question')) {{
                loadQuestion();
            }}
        }});
    </script>
</body>
</html>
'''
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(html)
    print(f"Cleaned {html_path}! New line count: {len(html.splitlines())}")

# 1. Clean Prep_3/unit-1/connect-plus-lesson-1.html
clean_cp_file(
    'Prep_3/unit-1/connect-plus-lesson-1.html',
    './connect-plus-lesson-1.data.js',
    'Connect Plus (G9) - Unit 1 - Lessons 1 & 2: Family & Community',
    'Prep 3 • Unit 1 • Lessons 1 & 2',
    'Lessons 1 & 2: Family, Community & Neighborhood',
    'المفردات، تصريف الأفعال، التعريفات، المرادفات والمتضادات، القصة التفاعلية 3D، المقاطع واللواحق، واختبار شامل 🎯'
)

# 2. Clean Prep_3/unit-1/connect-plus-lesson-4-5.html
clean_cp_file(
    'Prep_3/unit-1/connect-plus-lesson-4-5.html',
    './connect-plus-lesson-4-5.data.js',
    'Connect Plus (G9) - Unit 1 - Lessons 4 & 5: Unusual Communities',
    'Prep 3 • Unit 1 • Lessons 4 & 5',
    'Lessons 4 & 5: Unusual Communities & Family Heritage',
    'المفردات، استوديو القراءة والقصص التفاعلية (3 قصص)، تصريف الأفعال، التعريفات، المرادفات والمتضادات، اللواحق، واختبار شامل 🎯',
    readings_config=[
        ("🌍", "قراءة 1: مجتمعات غير عادية (Unusual Communities)"),
        ("🗺️", "قراءة 2: جذور عائلية عالمية (My Family History)"),
        ("🌳", "قراءة 3: شجرة العائلة وقصة كيتلين (Caitlin's Inspiring Story)")
    ]
)

# 3. Clean Prep_3/unit-2/connect-plus-lesson-1-2.html
clean_cp_file(
    'Prep_3/unit-2/connect-plus-lesson-1-2.html',
    './connect-plus-lesson-1-2.data.js',
    'Connect Plus (G9) - Unit 2 - Lessons 1 & 2: Changes',
    'Prep 3 • Unit 2 • Lessons 1 & 2',
    'Lessons 1 & 2: Changes • Future Predictions & Ambitions',
    'المفردات (51 كلمة)، استوديو القراءة والقصص التفاعلية (3 كتب عبر StoryEngine)، محرك المحادثات، تصريف الأفعال، واختبار شامل 35 سؤالاً 🎯',
    readings_config=[
        ("🚀", "قراءة 1: طموحات المستقبل (Future Ambitions)"),
        ("🌟", "قراءة 2: مهن غير عادية (Unusual Careers)"),
        ("📱", "قراءة 3: صناع المحتوى (Digital Influencers)")
    ]
)
