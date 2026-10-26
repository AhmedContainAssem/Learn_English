import re
import json

# ========================================================
# 1. Migrate Sec_1/unit-1/lesson-3
# ========================================================
with open('Sec_1/unit-1/lesson-3.html', 'r', encoding='utf-8') as f:
    h3 = f.read()

# Extract grammar slides
pos_g_start = h3.find('id="grammar"')
pos_g_end = h3.find('id="quiz"')

grammar_slides = []
if pos_g_start != -1 and pos_g_end != -1:
    g_html = h3[pos_g_start:pos_g_end]
    cards = g_html.split('<div class="grammar-slide-card')[1:]
    for idx, c in enumerate(cards):
        # find title
        m_t = re.search(r'<h3[^>]*>(.*?)</h3>', c)
        t = f"شريحة {idx+1}"
        if m_t:
            clean_t = re.sub(r'<[^>]+>', ' ', m_t.group(1)).strip()
            t = ' '.join(clean_t.split())
        
        # clean ending of card
        last_div = c.rfind('</div>')
        chunk = c[:last_div].strip() if last_div != -1 else c.strip()

        grammar_slides.append({
            "title": t,
            "pillTitle": f"{idx+1}. {t.split(':')[0]}",
            "contentHtml": chunk
        })

print(f"Sec 1 Lesson 3: Extracted {len(grammar_slides)} grammar slides!")

# Update Sec_1/unit-1/lesson-3.data.js
with open('Sec_1/unit-1/lesson-3.data.js', 'r', encoding='utf-8') as f:
    d3_js = f.read()

pos_end = d3_js.rfind('};')
if 'grammarSlides' not in d3_js:
    extra = ',\n    "youtubeLecture": {\n        "title": "المحاضرة المرئية: شرح الماضي البسيط والماضي المستمر",\n        "subtitle": "شرح أسرار التكوين والاستخدام والروابط الزمنية مع مستر أحمد عاصم",\n        "url": "https://youtu.be/SkH6bdYOzEI"\n    },\n    "grammarSlides": ' + json.dumps(grammar_slides, ensure_ascii=False, indent=8) + '\n'
    d3_js = d3_js[:pos_end] + extra + d3_js[pos_end:]
    with open('Sec_1/unit-1/lesson-3.data.js', 'w', encoding='utf-8') as f:
        f.write(d3_js)
    print("Updated Sec_1/unit-1/lesson-3.data.js!")

clean_h3 = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 1 - Unit 1 - Lesson 3: Past Simple vs Continuous | Mr. Ahmed Assem</title>
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
            <a href="../index.html">Sec 1</a> / <a href="./index.html">Unit 1</a> / <span>Lesson 3 (Past Tenses)</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Sec 1 • Unit 1 • Lesson 3</span>
                <span class="badge badge-gold">🎬 Past Simple & Continuous</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lesson 3: Past Simple vs Past Continuous</h2>
            <p id="description" class="lesson-desc-display">قصة القراءة التفاعلية 3D، ماستر كلاس قواعد الماضي البسيط والمستمر بالشرائح التفاعلية والفيديو مع اختبار شامل 🎯</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('storybook', this)">📚 القراءة التفاعلية (StoryBook)</button>
            <button class="tab-btn" onclick="switchTab('grammar', this)">⚡ شرائح القواعد والفيديو (Grammar)</button>
            <button class="tab-btn" onclick="switchTab('quiz', this)">🎯 اختبار الدرس الشامل (Quiz)</button>
        </div>

        <!-- Tab 1: Interactive StoryBook 3D -->
        <div id="storybook" class="tab-content active">
            <div class="storybook-wrapper">
                <div class="storybook-book">
                    <div class="book-spine-divider"></div>
                    <div class="story-page-artwork">
                        <div class="artwork-page-inner">
                            <div class="page-badge-artwork"><span id="storyPageBadge">🖼️ Scene 1</span></div>
                            <div class="artwork-container">
                                <img id="storyArtworkImg" src="../../assets/images/sec1_u1_l3_scene1.webp" alt="Scene Artwork" onerror="this.classList.add('hidden');" referrerpolicy="no-referrer">
                            </div>
                            <div class="artwork-caption" id="storyCaption">Reading Scene</div>
                        </div>
                        <div class="story-page-meta">
                            <span>📖 Taking Pride in Egypt</span>
                            <span id="storyPageCounter">Page 1 / 4</span>
                        </div>
                    </div>
                    <div class="story-page-content">
                        <div>
                            <div class="story-header">
                                <h3 class="story-page-title" id="storyTitle">Interactive Reading Passage</h3>
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

        <!-- Tab 2: Dynamic Grammar Slides & Video Deck -->
        <div id="grammar" class="tab-content"></div>

        <!-- Tab 3: QuizEngine Contract -->
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

            <div class="center-row" style="margin-top: 20px;">
                <button type="button" class="action-btn next-btn" id="next-btn" onclick="nextQuestion()" style="display: none;">السؤال التالي ➔</button>
            </div>
        </div>

        <!-- Bottom Return Controls -->
        <div class="nav-controls" style="margin-top: 36px;">
            <a href="./index.html" class="action-btn secondary" data-sound-click="click">⬅ العودة لقائمة دروس الوحدة الأولى</a>
            <a href="../index.html" class="action-btn secondary" data-sound-click="click">🏠 قائمة وحدات الصف الأول الثانوي</a>
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
    <script src="../../assets/js/renderers/grammar-slides-engine.js"></script>

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="./lesson-3.data.js"></script>

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
                const text = cur ? (cur.textEn || cur.text || '') : '';
                if (text && typeof speakText === 'function') speakText(text, btn);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {
                window.CurriculumRenderer.init();
            }
            if (typeof loadQuestion === 'function' && document.getElementById('question')) {
                loadQuestion();
            }
            if (window.storyEngine && window.lessonData && window.lessonData.storyPages) {
                window.storyEngine.loadPages(window.lessonData.storyPages);
            }
        });
    </script>
</body>
</html>
'''

with open('Sec_1/unit-1/lesson-3.html', 'w', encoding='utf-8') as f:
    f.write(clean_h3)

print(f"Refactored Sec_1/unit-1/lesson-3.html! New line count: {len(clean_h3.splitlines())}")

# ========================================================
# 2. Migrate Sec_1/unit-1/lesson-4-5
# ========================================================
with open('Sec_1/unit-1/lesson-4-5.html', 'r', encoding='utf-8') as f:
    h45 = f.read()

# Parse derivatives & confusion notes from scratch/migrate_sec1.py logic
pos_ln = h45.find('id="language-notes"')
pos_ln_end = h45.find('id="storybook"')

ln_html = h45[pos_ln:pos_ln_end] if pos_ln != -1 and pos_ln_end != -1 else ""

der45 = []
pos_cc = ln_html.find('Clear the Confusion')
der_html = ln_html[:pos_cc] if pos_cc != -1 else ln_html
cards = der_html.split('<div class="note-card">')[1:]
for c in cards:
    m_en = re.search(r'<div class="note-title-en">([^<]+)</div>', c)
    m_ar = re.search(r'<div class="note-title-ar">([^<]+)</div>', c)
    items = []
    inner_cards = c.split('<div class="card"')[1:]
    for ic in inner_cards:
        m_term = re.search(r'<div style="font-weight: 700; color: var\(--accent-primary\);">([^<]+)</div>', ic)
        m_ex = re.search(r'<div style="color: #cbd5e1;[^>]*>\s*•\s*(.*?)</div>', ic, re.DOTALL)
        if m_term:
            term_raw = m_term.group(1).strip()
            term_part = term_raw.split('-')[0].strip()
            meaning_part = term_raw.split('-')[1].strip() if '-' in term_raw else ""
            ex_text = re.sub(r'<[^>]+>', ' ', m_ex.group(1)).strip() if m_ex else ""
            ex_text = ' '.join(ex_text.split())
            items.append({
                "term": term_part,
                "meaning": meaning_part,
                "example": ex_text
            })
    if m_en:
        der45.append({
            "rootWord": m_en.group(1).strip(),
            "rootWordAr": m_ar.group(1).strip() if m_ar else "",
            "items": items
        })

conf45 = []
if pos_cc != -1:
    cc_html = ln_html[pos_cc:]
    cc_cards = cc_html.split('<div class="note-card"')[1:]
    for c in cc_cards:
        m_en = re.search(r'<div class="note-title-en">([^<]+)</div>', c)
        m_ar = re.search(r'<div class="note-title-ar">([^<]+)</div>', c)
        items = []
        inner_cards = c.split('<div class="card"')[1:]
        for ic in inner_cards:
            m_term = re.search(r'<div style="font-weight: 700; color: var\(--accent-primary\);">([^<]+)</div>', ic)
            m_ex = re.search(r'<div style="color: #cbd5e1;[^>]*>\s*•\s*(.*?)</div>', ic, re.DOTALL)
            if m_term:
                term_raw = m_term.group(1).strip()
                term_part = term_raw.split('-')[0].strip()
                meaning_part = term_raw.split('-')[1].strip() if '-' in term_raw else ""
                ex_text = re.sub(r'<[^>]+>', ' ', m_ex.group(1)).strip() if m_ex else ""
                ex_text = ' '.join(ex_text.split())
                items.append({
                    "term": term_part,
                    "meaning": meaning_part,
                    "example": ex_text
                })
        if m_en:
            conf45.append({
                "titleEn": m_en.group(1).strip(),
                "titleAr": m_ar.group(1).strip() if m_ar else "",
                "items": items
            })

# Dialogue
pos_d = h45.find('id="dialogue"')
pos_d_end = h45.find('id="quiz"')
diag45 = None
if pos_d != -1 and pos_d_end != -1:
    d_html = h45[pos_d:pos_d_end]
    boxes = d_html.split('<div class="dialogue-turn-box">')[1:]
    turns = []
    for b in boxes:
        m_av = re.search(r'<div class="dialogue-avatar">([^<]+)</div>', b)
        m_sp = re.search(r'<strong[^>]*>([^<]+)</strong>', b)
        m_en = re.search(r'<div class="en-text"[^>]*>(.*?)</div>', b, re.DOTALL)
        m_ar = re.search(r'<div[^>]*dir="rtl"[^>]*>\s*\((.*?)\)\s*</div>', b, re.DOTALL)

        av = m_av.group(1).strip() if m_av else '🗣️'
        sp_full = m_sp.group(1).strip() if m_sp else 'Speaker'
        sp_en = sp_full.split('(')[0].strip()
        sp_ar = sp_full.split('(')[1].replace(')', '').strip() if '(' in sp_full else sp_full
        en = re.sub(r'<[^>]+>', ' ', m_en.group(1)).strip() if m_en else ''
        en = ' '.join(en.split())
        ar = re.sub(r'<[^>]+>', ' ', m_ar.group(1)).strip() if m_ar else ''
        ar = ' '.join(ar.split())

        turns.append({
            "speaker": sp_en,
            "speakerAr": sp_ar,
            "avatar": av,
            "textEn": en,
            "textAr": ar
        })
    if turns:
        diag45 = {
            "title": "Interactive Speaking Dialogue",
            "turns": turns
        }

print(f"Sec 1 Lesson 4-5: {len(der45)} derivatives, {len(conf45)} confusion notes, dialogue={diag45 is not None}")

# Update Sec_1/unit-1/lesson-4-5.data.js
with open('Sec_1/unit-1/lesson-4-5.data.js', 'r', encoding='utf-8') as f:
    d45_js = f.read()

pos_end = d45_js.rfind('};')
extra_fields = ""
if 'derivatives' not in d45_js and der45:
    extra_fields += ',\n    "derivatives": ' + json.dumps(der45, ensure_ascii=False, indent=8)
if 'confusionNotes' not in d45_js and conf45:
    extra_fields += ',\n    "confusionNotes": ' + json.dumps(conf45, ensure_ascii=False, indent=8)
if 'dialogue' not in d45_js and diag45:
    extra_fields += ',\n    "dialogue": ' + json.dumps(diag45, ensure_ascii=False, indent=8)

if extra_fields:
    d45_js = d45_js[:pos_end] + extra_fields + '\n' + d45_js[pos_end:]
    with open('Sec_1/unit-1/lesson-4-5.data.js', 'w', encoding='utf-8') as f:
        f.write(d45_js)
    print("Updated Sec_1/unit-1/lesson-4-5.data.js!")

# Rebuild clean Sec_1/unit-1/lesson-4-5.html
clean_h45 = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 1 - Unit 1 - Lessons 4 & 5: Ecotourism & Environment | Mr. Ahmed Assem</title>
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
            <a href="../index.html">Sec 1</a> / <a href="./index.html">Unit 1</a> / <span>Lessons 4 & 5 (Ecotourism)</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Sec 1 • Unit 1</span>
                <span class="badge badge-gold">🌿 Ecotourism & Sustainable Travel</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lessons 4 & 5: Ecotourism & Environment</h2>
            <p id="description" class="lesson-desc-display">المفردات، التعريفات، المتلازمات، المشتقات، قصة القراءة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 🎯</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('collocations', this)">🔗 المتلازمات والتعبيرات</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('language-notes', this)">🧬 المشتقات والفروق (Notes)</button>
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

        <!-- Tab: Interactive StoryBook 3D -->
        <div id="storybook" class="tab-content">
            <div class="storybook-wrapper">
                <div class="storybook-book">
                    <div class="book-spine-divider"></div>
                    <div class="story-page-artwork">
                        <div class="artwork-page-inner">
                            <div class="page-badge-artwork"><span id="storyPageBadge">🖼️ Scene 1</span></div>
                            <div class="artwork-container">
                                <img id="storyArtworkImg" src="../../assets/images/galapagos_giant_tortoise_1790099446413.webp" alt="Scene Artwork" onerror="this.classList.add('hidden');" referrerpolicy="no-referrer">
                            </div>
                            <div class="artwork-caption" id="storyCaption">Reading Scene</div>
                        </div>
                        <div class="story-page-meta">
                            <span>📖 Ecotourism</span>
                            <span id="storyPageCounter">Page 1</span>
                        </div>
                    </div>
                    <div class="story-page-content">
                        <div>
                            <div class="story-header">
                                <h3 class="story-page-title" id="storyTitle">Interactive Reading Passage</h3>
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

        <!-- Bottom Return Controls -->
        <div class="nav-controls" style="margin-top: 36px;">
            <a href="./index.html" class="action-btn secondary" data-sound-click="click">⬅ العودة لقائمة دروس الوحدة الأولى</a>
            <a href="../index.html" class="action-btn secondary" data-sound-click="click">🏠 قائمة وحدات الصف الأول الثانوي</a>
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
    <script src="./lesson-4-5.data.js"></script>

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
                const text = cur ? (cur.textEn || cur.text || '') : '';
                if (text && typeof speakText === 'function') speakText(text, btn);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {
                window.CurriculumRenderer.init();
            }
            if (typeof loadQuestion === 'function' && document.getElementById('question')) {
                loadQuestion();
            }
            if (window.storyEngine && window.lessonData && window.lessonData.storyPages) {
                window.storyEngine.loadPages(window.lessonData.storyPages);
            }
        });
    </script>
</body>
</html>
'''

with open('Sec_1/unit-1/lesson-4-5.html', 'w', encoding='utf-8') as f:
    f.write(clean_h45)

print(f"Refactored Sec_1/unit-1/lesson-4-5.html! New line count: {len(clean_h45.splitlines())}")
