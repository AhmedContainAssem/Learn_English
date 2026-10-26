import re
import json

with open('Prep_3/unit-1/lesson-2.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract slide frames
# Finding start of presentation-deck
pos_deck = html.find('id="presentation-deck"')
pos_deck_end = html.find('<!-- Tab 7: QuizEngine Contract -->')
if pos_deck == -1 or pos_deck_end == -1:
    pos_deck_end = html.find('id="quiz"')

deck_html = html[pos_deck:pos_deck_end]

# Split by slide-frame
frames = re.split(r'<div class="slide-frame">', deck_html)[1:]

pills = [
    "1. الغلاف",
    "2. التكوين الأساسي",
    "3. نفي الجملة",
    "4. صيغة الاستفهام",
    "5. حدث بدأ ومستمر",
    "6. أثر في الحاضر",
    "7. الكلمات الدالة",
    "8. Ever vs Never",
    "9. For vs Since",
    "10. Been to vs Gone to",
    "11. المخطط الشامل"
]

grammar_slides = []
for idx, fr in enumerate(frames):
    # remove trailing closing div of frame
    # frame ends before next frame or end of deck
    # Find last </div> in this chunk
    chunk = fr
    # clean trailing </div>
    last_div = chunk.rfind('</div>')
    if last_div != -1:
        chunk = chunk[:last_div].strip()
    
    # Try to find title in h2/h3
    m_title = re.search(r'<h[23][^>]*>(.*?)</h[23]>', chunk, re.DOTALL)
    title_text = pills[idx]
    if m_title:
        # clean html tags from title
        clean_t = re.sub(r'<[^>]+>', ' ', m_title.group(1)).strip()
        clean_t = ' '.join(clean_t.split())
        title_text = clean_t
    
    grammar_slides.append({
        "title": title_text,
        "pillTitle": pills[idx] if idx < len(pills) else f"Slide {idx+1}",
        "contentHtml": chunk
    })

print(f"Extracted {len(grammar_slides)} grammar slides!")

# 1. Update Prep_3/unit-1/lesson-2.data.js
with open('Prep_3/unit-1/lesson-2.data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

lecture_info = {
    "youtubeLecture": {
        "title": "المحاضرة المرئية الكاملة: كوبري الزمن (The Present Perfect)",
        "subtitle": "شرح شامل ومفصل لجميع أسرار كوبري الزمن مع مستر أحمد عاصم",
        "url": "https://youtu.be/HCN7hB5mHac",
        "note": "فكرة الدرس: لماذا سُمّي المضارع التام بـ 'كوبري الزمن'؟ لأنه يربط حدثاً بدأ في الماضي وله أثر أو نتيجة حية في الحاضر."
    },
    "youtubeShorts": {
        "title": "لمحة سريعة في دقيقة (Quick Short)",
        "url": "https://youtube.com/shorts/xZDAW8xax4Y?si=S5QyaMO9a8eyDxHC"
    },
    "grammarSlides": grammar_slides
}

# Add into window.lessonData
pos_end = data_js.rfind('};')
if pos_end != -1 and 'grammarSlides' not in data_js:
    extra_json = ',\n    "youtubeLecture": ' + json.dumps(lecture_info["youtubeLecture"], ensure_ascii=False, indent=8) + ',\n    "youtubeShorts": ' + json.dumps(lecture_info["youtubeShorts"], ensure_ascii=False, indent=8) + ',\n    "grammarSlides": ' + json.dumps(grammar_slides, ensure_ascii=False, indent=8) + '\n'
    data_js = data_js[:pos_end] + extra_json + data_js[pos_end:]
    with open('Prep_3/unit-1/lesson-2.data.js', 'w', encoding='utf-8') as f:
        f.write(data_js)
    print("Updated lesson-2.data.js with grammarSlides and videos!")

# 2. Refactor Prep_3/unit-1/lesson-2.html
clean_html = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prep 3 - Unit 1 - Lesson 2: Vocabulary & Grammar (Present Perfect) | Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css?v=6">
    <link rel="stylesheet" href="../../assets/css/curriculum.css">
    <link rel="stylesheet" href="../../assets/css/quiz.css">
</head>
<body>

    <div class="container">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb">
            <a href="../index.html">Prep 3</a> / <a href="./index.html">Unit 1</a> / <span>Lesson 2 (Vocab & Grammar)</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Prep 3 • Unit 1 • Lesson 2</span>
                <span class="badge badge-gold">📖 Around Town</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lesson 2: Vocabulary & Grammar (Present Perfect)</h2>
            <p id="description" class="lesson-desc-display">المفردات، تصريف الأفعال، التعريفات، المرادفات والمتضادات، المقاطع واللواحق، وشرح كوبري الزمن (المضارع التام) بالشرائح التفاعلية والفيديو مع اختبار تفاعلي 🎯</p>
        </div>

        <!-- Tabs Navigation Bar -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('verbs', this)">⚡ تصريف الأفعال (Verbs)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('affixes', this)">🔤 اللواحق والمقاطع (Affixes)</button>
            <button class="tab-btn" onclick="switchTab('grammar-video', this)">🎥 كوبري الزمن (Grammar Deck)</button>
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
    <script src="./lesson-2.data.js"></script>

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

with open('Prep_3/unit-1/lesson-2.html', 'w', encoding='utf-8') as f:
    f.write(clean_html)

print(f"Refactored Prep 3 Unit 1 lesson-2.html! New line count: {len(clean_html.splitlines())}")
