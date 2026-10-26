import re
import json

def extract_language_notes(html):
    pos_ln = html.find('id="language-notes"')
    # find end of language-notes
    # typically before id="storybook" or id="grammar" or id="reading-text"
    end_candidates = [html.find(f'id="{x}"', pos_ln) for x in ['storybook', 'grammar', 'reading-text', 'dialogue', 'quiz']]
    end_pos = min([p for p in end_candidates if p != -1], default=-1)

    if pos_ln == -1 or end_pos == -1:
        return [], []

    ln_html = html[pos_ln:end_pos]
    
    # 1. Derivatives
    derivatives = []
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
            derivatives.append({
                "rootWord": m_en.group(1).strip(),
                "rootWordAr": m_ar.group(1).strip() if m_ar else "",
                "items": items
            })

    # 2. Confusion Notes
    confusion = []
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
                confusion.append({
                    "titleEn": m_en.group(1).strip(),
                    "titleAr": m_ar.group(1).strip() if m_ar else "",
                    "items": items
                })

    return derivatives, confusion

def extract_dialogue(html):
    pos_d = html.find('id="dialogue"')
    pos_d_end = html.find('id="quiz"')
    if pos_d == -1 or pos_d_end == -1:
        return None
    d_html = html[pos_d:pos_d_end]
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
        return {
            "title": "Interactive Speaking Dialogue",
            "turns": turns
        }
    return None

# ========================================================
# 1. Migrate Sec_2/unit-1/lesson-1-3
# ========================================================
with open('Sec_2/unit-1/lesson-1-3.html', 'r', encoding='utf-8') as f:
    h13 = f.read()

der13, conf13 = extract_language_notes(h13)
print(f"Sec 2 Lesson 1.3: {len(der13)} derivatives, {len(conf13)} confusion notes")

with open('Sec_2/unit-1/lesson-1-3.data.js', 'r', encoding='utf-8') as f:
    d13_js = f.read()

pos_end = d13_js.rfind('};')
extra_fields = ""
if 'derivatives' not in d13_js and der13:
    extra_fields += ',\n    "derivatives": ' + json.dumps(der13, ensure_ascii=False, indent=8)
if 'confusionNotes' not in d13_js and conf13:
    extra_fields += ',\n    "confusionNotes": ' + json.dumps(conf13, ensure_ascii=False, indent=8)

if extra_fields:
    d13_js = d13_js[:pos_end] + extra_fields + '\n' + d13_js[pos_end:]
    with open('Sec_2/unit-1/lesson-1-3.data.js', 'w', encoding='utf-8') as f:
        f.write(d13_js)
    print("Updated Sec_2/unit-1/lesson-1-3.data.js!")

clean_h13 = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 2 - Unit 1 - Lesson 1.3: Shared Responsibility | Mr. Ahmed Assem</title>
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
            <a href="../index.html">Sec 2</a> / <a href="./index.html">Unit 1</a> / <span>Lesson 1.3 (Whose Responsibility?)</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Sec 2 • Unit 1 • Lesson 1.3</span>
                <span class="badge badge-gold">🤝 Shared Responsibility</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lesson 1.3: Whose Responsibility Is It?</h2>
            <p id="description" class="lesson-desc-display">المفردات الأساسية والهامة، التعريفات، المترادفات والمتضادات، المتلازمات، الملاحظات اللغوية والمشتقات، نصوص القراءة المصورة، واختبار شامل 🎯</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('collocations', this)">🔗 المتلازمات وحروف الجر</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('language-notes', this)">🧬 المشتقات والفروق (Notes)</button>
            <button class="tab-btn" onclick="switchTab('storybook', this)">📚 القراءة التفاعلية (StoryBook)</button>
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
                                <img id="storyArtworkImg" src="../../assets/images/sec2_u1_l3_scene1.webp" alt="Scene Artwork" onerror="this.classList.add('hidden');" referrerpolicy="no-referrer">
                            </div>
                            <div class="artwork-caption" id="storyCaption">Reading Scene</div>
                        </div>
                        <div class="story-page-meta">
                            <span>📖 Shared Responsibility</span>
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

        <!-- Tab: QuizEngine Contract -->
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
            <a href="../index.html" class="action-btn secondary" data-sound-click="click">🏠 قائمة وحدات الصف الثاني الثانوي</a>
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

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="./lesson-1-3.data.js"></script>

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

with open('Sec_2/unit-1/lesson-1-3.html', 'w', encoding='utf-8') as f:
    f.write(clean_h13)

print(f"Refactored Sec_2/unit-1/lesson-1-3.html! New line count: {len(clean_h13.splitlines())}")

# ========================================================
# 2. Migrate Sec_2/unit-1/lesson-1-4-5
# ========================================================
with open('Sec_2/unit-1/lesson-1-4-5.html', 'r', encoding='utf-8') as f:
    h145 = f.read()

der145, conf145 = extract_language_notes(h145)

# Extract grammar slides
pos_g_start = h145.find('id="grammar"')
pos_g_end = h145.find('id="storybook"')
grammar_slides145 = []
if pos_g_start != -1 and pos_g_end != -1:
    g_html = h145[pos_g_start:pos_g_end]
    cards = g_html.split('<div class="grammar-slide-card')[1:]
    for idx, c in enumerate(cards):
        m_t = re.search(r'<h3[^>]*>(.*?)</h3>', c)
        t = f"شريحة {idx+1}"
        if m_t:
            clean_t = re.sub(r'<[^>]+>', ' ', m_t.group(1)).strip()
            t = ' '.join(clean_t.split())
        last_div = c.rfind('</div>')
        chunk = c[:last_div].strip() if last_div != -1 else c.strip()
        grammar_slides145.append({
            "title": t,
            "pillTitle": f"{idx+1}. {t.split(':')[0]}",
            "contentHtml": chunk
        })

print(f"Sec 2 Lesson 1.4-5: {len(der145)} derivatives, {len(conf145)} confusion notes, {len(grammar_slides145)} grammar slides")

with open('Sec_2/unit-1/lesson-1-4-5.data.js', 'r', encoding='utf-8') as f:
    d145_js = f.read()

pos_end = d145_js.rfind('};')
extra_fields = ""
if 'derivatives' not in d145_js and der145:
    extra_fields += ',\n    "derivatives": ' + json.dumps(der145, ensure_ascii=False, indent=8)
if 'confusionNotes' not in d145_js and conf145:
    extra_fields += ',\n    "confusionNotes": ' + json.dumps(conf145, ensure_ascii=False, indent=8)
if 'grammarSlides' not in d145_js and grammar_slides145:
    extra_fields += ',\n    "grammarSlides": ' + json.dumps(grammar_slides145, ensure_ascii=False, indent=8)

if extra_fields:
    d145_js = d145_js[:pos_end] + extra_fields + '\n' + d145_js[pos_end:]
    with open('Sec_2/unit-1/lesson-1-4-5.data.js', 'w', encoding='utf-8') as f:
        f.write(d145_js)
    print("Updated Sec_2/unit-1/lesson-1-4-5.data.js!")

clean_h145 = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 2 - Unit 1 - Lessons 1.4 & 1.5: Shared Responsibility | Mr. Ahmed Assem</title>
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
            <a href="../index.html">Sec 2</a> / <a href="./index.html">Unit 1</a> / <span>Lessons 1.4 & 1.5</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Sec 2 • Unit 1 • Lessons 1.4 & 1.5</span>
                <span class="badge badge-gold">🤝 Shared Responsibility</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lessons 1.4 & 1.5: Shared Responsibility</h2>
            <p id="description" class="lesson-desc-display">المفردات الأساسية والهامة، التعريفات، المشتقات والفروق الدقيقة، شرائح القواعد التفاعلية، قصة القراءة المصورة، واختبار شامل 🎯</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('collocations', this)">🔗 المتلازمات وحروف الجر</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('language-notes', this)">🧬 المشتقات والفروق (Notes)</button>
            <button class="tab-btn" onclick="switchTab('grammar', this)">⚡ شرائح القواعد (Grammar)</button>
            <button class="tab-btn" onclick="switchTab('storybook', this)">📚 القراءة التفاعلية (StoryBook)</button>
            <button class="tab-btn" onclick="switchTab('quiz', this)">🎯 اختبار الدرس الشامل (Quiz)</button>
        </div>

        <!-- Dynamic Content Containers (Hydrated by CurriculumRenderer) -->
        <div id="vocab" class="tab-content active"></div>
        <div id="definitions" class="tab-content"></div>
        <div id="collocations" class="tab-content"></div>
        <div id="synonyms" class="tab-content"></div>
        <div id="language-notes" class="tab-content"></div>
        <div id="grammar" class="tab-content"></div>

        <!-- Tab: Interactive StoryBook 3D -->
        <div id="storybook" class="tab-content">
            <div class="storybook-wrapper">
                <div class="storybook-book">
                    <div class="book-spine-divider"></div>
                    <div class="story-page-artwork">
                        <div class="artwork-page-inner">
                            <div class="page-badge-artwork"><span id="storyPageBadge">🖼️ Scene 1</span></div>
                            <div class="artwork-container">
                                <img id="storyArtworkImg" src="../../assets/images/sec2_u1_l45_scene1.webp" alt="Scene Artwork" onerror="this.classList.add('hidden');" referrerpolicy="no-referrer">
                            </div>
                            <div class="artwork-caption" id="storyCaption">Reading Scene</div>
                        </div>
                        <div class="story-page-meta">
                            <span>📖 Shared Responsibility</span>
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

        <!-- Tab: QuizEngine Contract -->
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
            <a href="../index.html" class="action-btn secondary" data-sound-click="click">🏠 قائمة وحدات الصف الثاني الثانوي</a>
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
    <script src="./lesson-1-4-5.data.js"></script>

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

with open('Sec_2/unit-1/lesson-1-4-5.html', 'w', encoding='utf-8') as f:
    f.write(clean_h145)

print(f"Refactored Sec_2/unit-1/lesson-1-4-5.html! New line count: {len(clean_h145.splitlines())}")

# ========================================================
# 3. Migrate Sec_2/unit-1/lesson-1-part-1
# ========================================================
with open('Sec_2/unit-1/lesson-1-part-1.html', 'r', encoding='utf-8') as f:
    hp1 = f.read()

# Extract 15 slides
pos_deck = hp1.find('id="presentation-deck"')
pos_deck_end = hp1.find('id="quiz"')

slides_p1 = []
if pos_deck != -1 and pos_deck_end != -1:
    deck_html = hp1[pos_deck:pos_deck_end]
    frames = deck_html.split('<div class="slide-frame">')[1:]
    for idx, fr in enumerate(frames):
        chunk = fr
        last_div = chunk.rfind('</div>')
        if last_div != -1:
            chunk = chunk[:last_div].strip()
        m_t = re.search(r'<h[23][^>]*>(.*?)</h[23]>', chunk, re.DOTALL)
        t = f"الشريحة {idx+1}"
        if m_t:
            clean_t = re.sub(r'<[^>]+>', ' ', m_t.group(1)).strip()
            t = ' '.join(clean_t.split())
        slides_p1.append({
            "title": t,
            "pillTitle": f"{idx+1}. {t.split(':')[0]}",
            "contentHtml": chunk
        })

print(f"Sec 2 Lesson 1 Part 1: Extracted {len(slides_p1)} slides!")

with open('Sec_2/unit-1/lesson-1-part-1.data.js', 'r', encoding='utf-8') as f:
    dp1_js = f.read()

pos_end = dp1_js.rfind('};')
if 'grammarSlides' not in dp1_js and slides_p1:
    extra = ',\n    "youtubeLecture": {\n        "title": "المحاضرة المرئية: فك شفرة ضمائر وظروف الوصل",\n        "subtitle": "شرح مبسط وممتع بطريقة السهل الممتنع مع مستر أحمد عاصم",\n        "url": "https://youtu.be/Xs-pKy9sgpY"\n    },\n    "grammarSlides": ' + json.dumps(slides_p1, ensure_ascii=False, indent=8) + '\n'
    dp1_js = dp1_js[:pos_end] + extra + dp1_js[pos_end:]
    with open('Sec_2/unit-1/lesson-1-part-1.data.js', 'w', encoding='utf-8') as f:
        f.write(dp1_js)
    print("Updated Sec_2/unit-1/lesson-1-part-1.data.js!")

clean_hp1 = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 2 - Unit 1 - Lesson 1.1 (Part 1): Relative Clauses | Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css?v=6">
    <link rel="stylesheet" href="../../assets/css/curriculum.css">
    <link rel="stylesheet" href="../../assets/css/quiz.css">
</head>
<body>

    <div class="container">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb">
            <a href="../index.html">Sec 2</a> / <a href="./index.html">Unit 1</a> / <span>Lesson 1.1 (Part 1 - Relative Clauses)</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Sec 2 • Unit 1 • Lesson 1.1 (Part 1)</span>
                <span class="badge badge-gold">⚡ Relative Clauses Masterclass</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lesson 1.1 (Part 1): Relative Pronouns & Adverbs</h2>
            <p id="description" class="lesson-desc-display">المفردات الأساسية والتكميلية، التعريفات، المرادفات والمتضادات، ماستر كلاس ضمائر الوصل بالشرائح التفاعلية الـ 15 والفيديو مع اختبار شامل 🎯</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('grammar-video', this)">🎥 ضمائر الوصل (Grammar Deck)</button>
            <button class="tab-btn" onclick="switchTab('quiz', this)">🎯 اختبار الدرس الشامل (Quiz)</button>
        </div>

        <!-- Dynamic Content Containers (Hydrated by CurriculumRenderer) -->
        <div id="vocab" class="tab-content active"></div>
        <div id="definitions" class="tab-content"></div>
        <div id="synonyms" class="tab-content"></div>
        <div id="grammar-video" class="tab-content"></div>

        <!-- Tab 5: QuizEngine Contract -->
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
            <a href="../index.html" class="action-btn secondary" data-sound-click="click">🏠 قائمة وحدات الصف الثاني الثانوي</a>
        </div>
    </div>

    <!-- Framework & Data Scripts -->
    <script src="../../assets/js/bidi.js"></script>
    <script src="../../assets/js/audio.js"></script>
    <script src="../../assets/js/tabs.js"></script>
    <script src="../../assets/js/quiz-engine.js"></script>
    <script src="../../assets/js/ui.js?v=6"></script>

    <!-- Modular Curriculum Sub-Renderers -->
    <script src="../../assets/js/renderers/ui-primitives.js"></script>
    <script src="../../assets/js/renderers/vocab-renderer.js"></script>
    <script src="../../assets/js/renderers/lexicon-renderer.js"></script>
    <script src="../../assets/js/renderers/grammar-slides-engine.js"></script>

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="./lesson-1-part-1.data.js"></script>

    <!-- Universal Dynamic Curriculum Renderer -->
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/main.js"></script>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {
                window.CurriculumRenderer.init();
            }
            if (typeof loadQuestion === 'function' && document.getElementById('question')) {
                loadQuestion();
            }
        });
    </script>
</body>
</html>
'''

with open('Sec_2/unit-1/lesson-1-part-1.html', 'w', encoding='utf-8') as f:
    f.write(clean_hp1)

print(f"Refactored Sec_2/unit-1/lesson-1-part-1.html! New line count: {len(clean_hp1.splitlines())}")

# ========================================================
# 4. Migrate Sec_2/unit-1/lesson-1-part-2
# ========================================================
with open('Sec_2/unit-1/lesson-1-part-2.html', 'r', encoding='utf-8') as f:
    hp2 = f.read()

der_p2, conf_p2 = extract_language_notes(hp2)

with open('Sec_2/unit-1/lesson-1-part-2.data.js', 'r', encoding='utf-8') as f:
    dp2_js = f.read()

pos_end = dp2_js.rfind('};')
extra_fields = ""
if 'derivatives' not in dp2_js and der_p2:
    extra_fields += ',\n    "derivatives": ' + json.dumps(der_p2, ensure_ascii=False, indent=8)
if 'confusionNotes' not in dp2_js and conf_p2:
    extra_fields += ',\n    "confusionNotes": ' + json.dumps(conf_p2, ensure_ascii=False, indent=8)

if extra_fields:
    dp2_js = dp2_js[:pos_end] + extra_fields + '\n' + dp2_js[pos_end:]
    with open('Sec_2/unit-1/lesson-1-part-2.data.js', 'w', encoding='utf-8') as f:
        f.write(dp2_js)
    print("Updated Sec_2/unit-1/lesson-1-part-2.data.js!")

clean_hp2 = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 2 - Unit 1 - Lesson 1.1 (Part 2): Health & Safety | Mr. Ahmed Assem</title>
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
            <a href="../index.html">Sec 2</a> / <a href="./index.html">Unit 1</a> / <span>Lesson 1.1 (Part 2)</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Sec 2 • Unit 1 • Lesson 1.1 (Part 2)</span>
                <span class="badge badge-gold">🏥 Health & Safety</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lesson 1.1 (Part 2): Staying Healthy & CPR</h2>
            <p id="description" class="lesson-desc-display">المفردات، المتلازمات، التعريفات، الملاحظات اللغوية، نصوص القراءة المصورة، واختبار شامل 🎯</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('collocations', this)">🔗 المتلازمات والتعبيرات</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('language-notes', this)">🧬 المشتقات والفروق (Notes)</button>
            <button class="tab-btn" onclick="switchTab('reading-text', this)">📚 القراءة التفاعلية (StoryBook)</button>
            <button class="tab-btn" onclick="switchTab('quiz', this)">🎯 اختبار الدرس الشامل (Quiz)</button>
        </div>

        <!-- Dynamic Content Containers (Hydrated by CurriculumRenderer) -->
        <div id="vocab" class="tab-content active"></div>
        <div id="collocations" class="tab-content"></div>
        <div id="definitions" class="tab-content"></div>
        <div id="language-notes" class="tab-content"></div>

        <!-- Tab: Interactive Reading Text -->
        <div id="reading-text" class="tab-content">
            <div class="storybook-wrapper">
                <div class="storybook-book">
                    <div class="book-spine-divider"></div>
                    <div class="story-page-artwork">
                        <div class="artwork-page-inner">
                            <div class="page-badge-artwork"><span id="storyPageBadge">🖼️ Scene 1</span></div>
                            <div class="artwork-container">
                                <img id="storyArtworkImg" src="../../assets/images/sec2_u1_l1_cpr.webp" alt="Scene Artwork" onerror="this.classList.add('hidden');" referrerpolicy="no-referrer">
                            </div>
                            <div class="artwork-caption" id="storyCaption">Reading Scene</div>
                        </div>
                        <div class="story-page-meta">
                            <span>📖 Health & Safety</span>
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

        <!-- Tab: QuizEngine Contract -->
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
            <a href="../index.html" class="action-btn secondary" data-sound-click="click">🏠 قائمة وحدات الصف الثاني الثانوي</a>
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

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="./lesson-1-part-2.data.js"></script>

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

with open('Sec_2/unit-1/lesson-1-part-2.html', 'w', encoding='utf-8') as f:
    f.write(clean_hp2)

print(f"Refactored Sec_2/unit-1/lesson-1-part-2.html! New line count: {len(clean_hp2.splitlines())}")

# ========================================================
# 5. Migrate Sec_2/unit-2/lesson-2-1
# ========================================================
with open('Sec_2/unit-2/lesson-2-1.html', 'r', encoding='utf-8') as f:
    h21 = f.read()

der21, conf21 = extract_language_notes(h21)
diag21 = extract_dialogue(h21)
print(f"Sec 2 Unit 2 Lesson 2.1: {len(der21)} derivatives, {len(conf21)} confusion notes, dialogue={diag21 is not None}")

with open('Sec_2/unit-2/lesson-2-1.data.js', 'r', encoding='utf-8') as f:
    d21_js = f.read()

pos_end = d21_js.rfind('};')
extra_fields = ""
if 'derivatives' not in d21_js and der21:
    extra_fields += ',\n    "derivatives": ' + json.dumps(der21, ensure_ascii=False, indent=8)
if 'confusionNotes' not in d21_js and conf21:
    extra_fields += ',\n    "confusionNotes": ' + json.dumps(conf21, ensure_ascii=False, indent=8)
if 'dialogue' not in d21_js and diag21:
    extra_fields += ',\n    "dialogue": ' + json.dumps(diag21, ensure_ascii=False, indent=8)

if extra_fields:
    d21_js = d21_js[:pos_end] + extra_fields + '\n' + d21_js[pos_end:]
    with open('Sec_2/unit-2/lesson-2-1.data.js', 'w', encoding='utf-8') as f:
        f.write(d21_js)
    print("Updated Sec_2/unit-2/lesson-2-1.data.js!")

clean_h21 = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 2 - Unit 2 - Lessons 2.1 & 2.2: Leisure Time | Mr. Ahmed Assem</title>
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
            <a href="../index.html">Sec 2</a> / <a href="./index.html">Unit 2</a> / <span>Lessons 2.1 & 2.2</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Sec 2 • Unit 2</span>
                <span class="badge badge-gold">🎉 Leisure Time</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lessons 2.1 & 2.2: Leisure Time & Hobbies</h2>
            <p id="description" class="lesson-desc-display">المفردات، التعريفات، المشتقات، قصة القراءة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 🎯</p>
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
                                <img id="storyArtworkImg" src="../../assets/images/sec2_u2_l1_scene1.webp" alt="Scene Artwork" onerror="this.classList.add('hidden');" referrerpolicy="no-referrer">
                            </div>
                            <div class="artwork-caption" id="storyCaption">Reading Scene</div>
                        </div>
                        <div class="story-page-meta">
                            <span>📖 Leisure Time</span>
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
            <a href="./index.html" class="action-btn secondary" data-sound-click="click">⬅ العودة لقائمة دروس الوحدة الثانية</a>
            <a href="../index.html" class="action-btn secondary" data-sound-click="click">🏠 قائمة وحدات الصف الثاني الثانوي</a>
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
    <script src="./lesson-2-1.data.js"></script>

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

with open('Sec_2/unit-2/lesson-2-1.html', 'w', encoding='utf-8') as f:
    f.write(clean_h21)

print(f"Refactored Sec_2/unit-2/lesson-2-1.html! New line count: {len(clean_h21.splitlines())}")

