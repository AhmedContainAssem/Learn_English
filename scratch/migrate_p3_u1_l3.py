import re
import json

with open('Prep_3/unit-1/lesson-3.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract slide frames
pos_deck = html.find('id="presentation-deck"')
pos_deck_end = html.find('id="quiz"')

deck_html = html[pos_deck:pos_deck_end]
frames = re.split(r'<div class="slide-frame">', deck_html)[1:]

grammar_slides = []
for idx, fr in enumerate(frames):
    chunk = fr
    last_div = chunk.rfind('</div>')
    if last_div != -1:
        chunk = chunk[:last_div].strip()
    
    m_title = re.search(r'<h[23][^>]*>(.*?)</h[23]>', chunk, re.DOTALL)
    title_text = f"الشريحة {idx+1}"
    if m_title:
        clean_t = re.sub(r'<[^>]+>', ' ', m_title.group(1)).strip()
        clean_t = ' '.join(clean_t.split())
        title_text = clean_t
    
    grammar_slides.append({
        "title": title_text,
        "pillTitle": f"{idx+1}. {title_text.split(':')[0]}",
        "contentHtml": chunk
    })

print(f"Extracted {len(grammar_slides)} grammar slides for lesson-3!")

# 1. Update Prep_3/unit-1/lesson-3.data.js
with open('Prep_3/unit-1/lesson-3.data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

lecture_info = {
    "youtubeLecture": {
        "title": "سر الحكايات: زمن الماضي المستمر (Cinematic Past Continuous)",
        "subtitle": "إزاي تبقى مخرج لقصصك اليومية مع مستر أحمد عاصم",
        "url": "https://youtu.be/HCN7hB5mHac",
        "note": "صناعة السينما في كلامك: الماضي البسيط لوحده يذكر أحداثاً جافة، بينما الماضي المستمر يرسم المشهد والخلفية بتفاصيلها الحية!"
    },
    "youtubeShorts": {
        "title": "لمحة سريعة في دقيقة (Quick Short)",
        "url": "https://youtube.com/shorts/xZDAW8xax4Y?si=S5QyaMO9a8eyDxHC"
    },
    "grammarSlides": grammar_slides
}

pos_end = data_js.rfind('};')
if pos_end != -1 and 'grammarSlides' not in data_js:
    extra_json = ',\n    "youtubeLecture": ' + json.dumps(lecture_info["youtubeLecture"], ensure_ascii=False, indent=8) + ',\n    "youtubeShorts": ' + json.dumps(lecture_info["youtubeShorts"], ensure_ascii=False, indent=8) + ',\n    "grammarSlides": ' + json.dumps(grammar_slides, ensure_ascii=False, indent=8) + '\n'
    data_js = data_js[:pos_end] + extra_json + data_js[pos_end:]
    with open('Prep_3/unit-1/lesson-3.data.js', 'w', encoding='utf-8') as f:
        f.write(data_js)
    print("Updated lesson-3.data.js with grammarSlides and videos!")

# 2. Refactor Prep_3/unit-1/lesson-3.html
clean_html = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prep 3 - Unit 1 - Lesson 3: Past Continuous & Vocabulary | Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css?v=6">
    <link rel="stylesheet" href="../../assets/css/curriculum.css">
    <link rel="stylesheet" href="../../assets/css/quiz.css">
</head>
<body>

    <div class="container">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb">
            <a href="../index.html">Prep 3</a> / <a href="./index.html">Unit 1</a> / <span>Lesson 3 (Past Continuous & Vocab)</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Prep 3 • Unit 1 • Lesson 3</span>
                <span class="badge badge-gold">🎬 Past Continuous</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lesson 3: Vocabulary & Past Continuous</h2>
            <p id="description" class="lesson-desc-display">المفردات، تصريف الأفعال، التعريفات، المرادفات والمتضادات، المقاطع واللواحق، وشرح الماضي المستمر (Past Continuous) بالشرائح التفاعلية والفيديو مع اختبار تفاعلي 🎯</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('verbs', this)">⚡ تصريف الأفعال (Verbs)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('affixes', this)">🔤 اللواحق والمقاطع (Affixes)</button>
            <button class="tab-btn" onclick="switchTab('grammar-video', this)">🎬 الماضي المستمر (Grammar Deck)</button>
            <button class="tab-btn" onclick="switchTab('quiz', this)">🎯 اختبار الدرس الشامل (Quiz)</button>
        </div>

        <!-- Dynamic Content Containers (Hydrated by CurriculumRenderer) -->
        <div id="vocab" class="tab-content active"></div>
        <div id="verbs" class="tab-content"></div>
        <div id="definitions" class="tab-content"></div>
        <div id="synonyms" class="tab-content"></div>
        <div id="affixes" class="tab-content"></div>
        <div id="grammar-video" class="tab-content"></div>

        <!-- Tab 7: QuizEngine Contract -->
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
            <a href="../index.html" class="action-btn secondary" data-sound-click="click">🏠 قائمة وحدات الصف الثالث الإعدادي</a>
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
    <script src="./lesson-3.data.js"></script>

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

with open('Prep_3/unit-1/lesson-3.html', 'w', encoding='utf-8') as f:
    f.write(clean_html)

print(f"Refactored Prep 3 Unit 1 lesson-3.html! New line count: {len(clean_html.splitlines())}")
