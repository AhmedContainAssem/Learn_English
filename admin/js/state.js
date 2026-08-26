/**
 * Lesson Studio State & Preset Management Module (state.js)
 * Single Responsibility: Holds reactive studio state, draft persistence, custom stage data storage, and educational archetype presets.
 */

// Global Safe HTML Escaper Utility
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function getCustomStages() {
    try {
        const saved = localStorage.getItem('custom_stages_list');
        return saved ? JSON.parse(saved) : [];
    } catch(e) {
        return [];
    }
}

function saveCustomStage(stageObj) {
    const list = getCustomStages();
    const existingIdx = list.findIndex(s => s.slug === stageObj.slug);
    if (existingIdx >= 0) {
        list[existingIdx] = stageObj;
    } else {
        list.push(stageObj);
    }
    localStorage.setItem('custom_stages_list', JSON.stringify(list));
    if (typeof populateStageSelects === 'function') populateStageSelects();
}

function deleteCustomStage(slug) {
    let list = getCustomStages();
    list = list.filter(s => s.slug !== slug);
    localStorage.setItem('custom_stages_list', JSON.stringify(list));
    if (typeof populateStageSelects === 'function') populateStageSelects();
}

function getStageDisplayName(stage) {
    const map = {
        'Prep_3': 'الصف الثالث الإعدادي (Prep 3)',
        'Prep_2': 'الصف الثاني الإعدادي (Prep 2)',
        'Prep_1': 'الصف الأول الإعدادي (Prep 1)',
        'Sec_1': 'الصف الأول الثانوي (Sec 1)',
        'Sec_2': 'الصف الثاني الثانوي (Sec 2)',
        'Sec_3': 'الصف الثالث الثانوي (Sec 3)',
        'Grade_6': 'الصف السادس الابتدائي (Grade 6)',
        'Grade_5': 'الصف الخامس الابتدائي (Grade 5)',
        'Grade_4': 'الصف الرابع الابتدائي (Grade 4)',
        'Grade_3': 'الصف الثالث الابتدائي (Grade 3)',
        'Grade_2': 'الصف الثاني الابتدائي (Grade 2)',
        'Grade_1': 'الصف الأول الابتدائي (Grade 1)',
        'Course': 'كورسات التأسيس والمحادثة (English Course)',
        'Grammar': 'قواعد وتراكيب (Grammar Hub)',
        'Phonics': 'صوتيات وتأسيس (Phonics)',
        'Kindergarten': 'رياض الأطفال (Kindergarten)',
        'General_English': 'اللغة الإنجليزية العامة'
    };

    if (map[stage]) return map[stage];

    // Check custom stages
    const customList = getCustomStages();
    const custom = customList.find(s => s.slug === stage);
    if (custom) return custom.name;

    return stage || 'المرحلة الدراسية';
}

// Core Reactive Application State
let state = {
    archetype: 'curriculum_tabs', // 'curriculum_tabs' | 'flashcards_dialogue' | 'quiz_only' | 'storybook_reading' | 'stage_index' | 'unit_index' | 'index_hub'
    stage: 'Prep_3',
    unit: 'unit-1',
    title: 'Lesson 1 (Part 2)',
    filename: 'lesson-1-part-2.html',
    description: 'دراسة الأفعال والتعريفات واختبار الفهم تفاعلياً',
    verbs: [],
    definitions: [],
    synonyms: [],
    affixes: [],
    flashcards: [],
    dialogueTitle: 'محادثة التعارف والعمل (Job Interview Dialogue)',
    dialogueLines: [],
    homeworkTitle: 'التطبيق المنزلي (Homework Task)',
    homeworkDesc: 'اكتب 5 جمل عن وظيفتك المستقبلية وتدرب على نطقها.',
    quiz: [],
    // Storybook & Video Lesson Properties
    storyPages: [],
    videoUrl: '',
    videoTitle: 'فيديو شرح وتوضيح الدرس (Video Lesson)',
    // Index / Hub Archetype Properties
    indexType: 'stage', // 'stage' | 'unit' | 'custom'
    indexScope: 'stage_hub', // 'stage_hub' | 'unit_hub' | 'root_hub' | 'custom'
    indexLayoutType: 'units', // 'units' | 'lessons' | 'courses' | 'custom'
    indexBackLink: '../index.html',
    indexBackText: '⬅️ العودة للقائمة الرئيسية',
    indexCards: []
};

let currentEditorPane = 'verbs';
let currentSimTab = 'verbs';
let simQuizIndex = 0;
let simQuizScore = 0;
let simQuizAnswered = false;
let simQuizSelectedOptIdx = null;
let simQuizCorrectCount = 0;
let simQuizWrongCount = 0;
let simQuizCompleted = false;

// Storybook Simulator State
let simStoryCurrentPage = 0;
let simStoryIsPlaying = false;
let simStoryUtterance = null;

// ==========================================
// NOTIFICATIONS & UTILITIES
// ==========================================
function showAdminToast(msg, isSuccess = true) {
    let t = document.getElementById('adminToast');
    if (!t) {
        t = document.createElement('div');
        t.id = 'adminToast';
        t.style.position = 'fixed';
        t.style.bottom = '24px';
        t.style.left = '50%';
        t.style.transform = 'translateX(-50%)';
        t.style.padding = '12px 24px';
        t.style.borderRadius = '50px';
        t.style.fontWeight = 'bold';
        t.style.fontSize = '0.95rem';
        t.style.zIndex = '999999';
        t.style.boxShadow = '0 8px 30px rgba(0,0,0,0.5)';
        t.style.transition = 'all 0.3s ease';
        t.style.pointerEvents = 'none';
        document.body.appendChild(t);
    }
    t.style.background = isSuccess ? '#059669' : '#dc2626';
    t.style.color = '#fff';
    t.textContent = msg;
    t.style.opacity = '1';
    t.style.display = 'block';
    clearTimeout(t._timer);
    t._timer = setTimeout(() => {
        t.style.opacity = '0';
        setTimeout(() => { t.style.display = 'none'; }, 300);
    }, 3000);
}

function toggleTeacherGuide() {
    if (typeof playSound === 'function') playSound('click');
    const sec = document.getElementById('teacherGuideSection');
    if (sec) sec.style.display = sec.style.display === 'none' ? 'block' : 'none';
}

// ==========================================
// DRAFT & PRESET PERSISTENCE
// ==========================================
function loadSavedDraftOrPreset() {
    const saved = localStorage.getItem('teacher_studio_draft_v3');
    if (saved) {
        try {
            state = JSON.parse(saved);
            if (!state.archetype) state.archetype = 'curriculum_tabs';
        } catch(e) {
            loadArchetypePreset('curriculum_tabs');
            return;
        }
    } else {
        loadArchetypePreset('curriculum_tabs');
        return;
    }

    if (state.archetype === 'curriculum_tabs') {
        currentEditorPane = 'verbs';
        currentSimTab = 'verbs';
    } else if (state.archetype === 'flashcards_dialogue') {
        currentEditorPane = 'flashcards';
        currentSimTab = 'flashcards';
    } else if (state.archetype === 'quiz_only') {
        currentEditorPane = 'quiz';
        currentSimTab = 'quiz';
    } else if (state.archetype === 'index_hub') {
        currentEditorPane = 'index_hub';
        currentSimTab = 'index_hub';
    }

    if (typeof applyStateToUI === 'function') applyStateToUI();
}

function saveDraft() {
    localStorage.setItem('teacher_studio_draft_v3', JSON.stringify(state));
    if (typeof updateTargetFilePath === 'function') updateTargetFilePath();
}

function resetAllData() {
    if (typeof playSound === 'function') playSound('click');
    if (confirm("هل ترغب في تفريغ المحتوى والبدء من جديد؟")) {
        state.verbs = [];
        state.definitions = [];
        state.synonyms = [];
        state.affixes = [];
        state.flashcards = [];
        state.dialogueLines = [];
        state.quiz = [];
        state.indexCards = [];
        if (typeof applyStateToUI === 'function') applyStateToUI();
        if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
        saveDraft();
        showAdminToast("تم تفريغ بيانات الصفحة بنجاح");
    }
}

function loadArchetypePreset(preset) {
    if (preset === 'stage_index' || (preset === 'index_hub' && state.indexType === 'stage')) {
        state.archetype = 'stage_index';
        state.indexType = 'stage';
        state.indexScope = 'stage_hub';
        state.stage = state.stage || 'Prep_3';
        state.unit = '';
        state.title = `📚 ${getStageDisplayName(state.stage)}`;
        state.filename = 'index.html';
        state.description = 'اختر الوحدة للبدء في الدروس والتمارين';
        state.indexLayoutType = 'units';
        state.indexBackLink = '../index.html';
        state.indexBackText = '⬅️ العودة للقائمة الرئيسية';
        
        state.indexCards = [
            { title: 'Unit 1', subtitle: 'الوحدة الأولى', icon: '📘', destType: 'sub_unit_folder', link: './unit-1/index.html', status: 'active', tag: '🎯 متاح' },
            { title: 'Unit 2', subtitle: 'الوحدة الثانية', icon: '📗', destType: 'sub_unit_folder', link: './unit-2/index.html', status: 'locked', tag: '🔒 قريباً' },
            { title: 'Unit 3', subtitle: 'الوحدة الثالثة', icon: '📙', destType: 'sub_unit_folder', link: './unit-3/index.html', status: 'locked', tag: '🔒 قريباً' },
            { title: 'Unit 4', subtitle: 'الوحدة الرابعة', icon: '📕', destType: 'sub_unit_folder', link: './unit-4/index.html', status: 'locked', tag: '🔒 قريباً' },
            { title: 'Unit 5', subtitle: 'الوحدة الخامسة', icon: '📓', destType: 'sub_unit_folder', link: './unit-5/index.html', status: 'locked', tag: '🔒 قريباً' },
            { title: 'Unit 6', subtitle: 'الوحدة السادسة', icon: '📔', destType: 'sub_unit_folder', link: './unit-6/index.html', status: 'locked', tag: '🔒 قريباً' }
        ];
    }
    else if (preset === 'unit_index' || (preset === 'index_hub' && state.indexType === 'unit')) {
        state.archetype = 'unit_index';
        state.indexType = 'unit';
        state.indexScope = 'unit_hub';
        state.stage = state.stage || 'Prep_3';
        state.unit = state.unit || 'unit-1';
        state.title = `📘 ${state.stage} - ${state.unit} (الوحدة الأولى)`;
        state.filename = 'index.html';
        state.description = 'اختر الدرس لبدء التمارين والتطبيق';
        state.indexLayoutType = 'lessons';
        state.indexBackLink = '../index.html';
        state.indexBackText = `⬅️ العودة لوحدات ${getStageDisplayName(state.stage)}`;
        
        state.indexCards = [
            { title: 'Lesson 1 (Part 1)', subtitle: 'الكلمات والمفردات الرئيسية', icon: '📖', destType: 'same_folder_lesson', link: './lesson-1-part-1.html', status: 'active', tag: '🎯 متاح' },
            { title: 'Lesson 1 (Part 2)', subtitle: 'الأفعال والتعريفات واختبار الفهم', icon: '📝', destType: 'same_folder_lesson', link: './lesson-1-part-2.html', status: 'active', tag: '🎯 متاح' },
            { title: 'Lesson 2 (Grammar)', subtitle: 'القواعد والتراكيب اللغوية', icon: '💡', destType: 'same_folder_lesson', link: './lesson-2.html', status: 'active', tag: '🎯 متاح' },
            { title: 'Unit Assessment Quiz', subtitle: 'اختبار تدريبي وتقييم شامل', icon: '🏆', destType: 'same_folder_lesson', link: './quiz.html', status: 'active', tag: '🎯 متاح' }
        ];
    }
    else if (preset === 'index_hub') {
        return loadArchetypePreset('stage_index');
    }
    else if (preset === 'curriculum_tabs') {
        state.archetype = 'curriculum_tabs';
        state.stage = 'Prep_3';
        state.unit = 'unit-1';
        state.title = 'Lesson 1 (Part 2)';
        state.filename = 'lesson-1-part-2.html';
        state.description = 'دراسة الأفعال والتعريفات واختبار الفهم تفاعلياً';
        
        state.verbs = [
            { word: 'feel', meaning: 'يشعر', forms: 'felt / felt', tag: 'Present' },
            { word: 'find', meaning: 'يجد - يكتسب', forms: 'found / found', tag: 'Present' },
            { word: 'grow', meaning: 'ينمو - ينضج', forms: 'grew / grown', tag: 'Present' },
            { word: 'overcome', meaning: 'يتغلب - يتخطى', forms: 'overcame / overcome', tag: 'Present' },
            { word: 'make', meaning: 'يجعل - يصنع', forms: 'made / made', tag: 'Present' },
            { word: 'think', meaning: 'يعتقد', forms: 'thought / thought', tag: 'Present' }
        ];

        state.definitions = [
            { word: 'identity', definition: 'who a person is', meaning: 'الهوية', isCollocation: false },
            { word: 'value', definition: 'have a high opinion of someone or something', meaning: 'يقدر - يقيم', isCollocation: false },
            { word: 'background', definition: 'where someone comes from', meaning: 'خلفية اجتماعية', isCollocation: false },
            { word: 'solve a problem', definition: 'find an answer to a difficulty', meaning: 'يحل مشكلة', isCollocation: true },
            { word: 'build confidence', definition: 'gain belief in your abilities', meaning: 'يكتسب الثقة بالنفس', isCollocation: true }
        ];

        state.synonyms = [
            { word: 'strength', arabic: 'قوة', synonym: 'power', antonym: 'weakness', antonymArabic: 'ضعف' },
            { word: 'unique', arabic: 'فريد', synonym: 'special / rare', antonym: 'common / ordinary', antonymArabic: 'عادي' },
            { word: 'simple', arabic: 'بسيط', synonym: 'easy', antonym: 'difficult / complicated', antonymArabic: 'معقد' },
            { word: 'confident', arabic: 'واثق', synonym: 'sure / certain', antonym: 'unsure', antonymArabic: 'غير واثق' }
        ];

        state.affixes = [
            { affix: '-ity', function: 'تكوين الاسم من الصفة', examples: 'individuality / personality' },
            { affix: '-ness', function: 'تكوين الاسم الدال على الحالة', examples: 'weakness / kindness' },
            { affix: 'un-', function: 'إعطاء عكس المعنى للصفة', examples: 'unique -> common / unsure' }
        ];

        state.quiz = [
            {
                emoji: '🧠',
                question: 'What is the past tense of "feel"?',
                options: [
                    { text: 'felt', isCorrect: true },
                    { text: 'feeled', isCorrect: false },
                    { text: 'feeling', isCorrect: false }
                ],
                correctMsg: 'صحيح! التصريف الثاني لـ feel هو felt (+10)',
                wrongMsg: 'حاول مجدداً'
            },
            {
                emoji: '⚖️',
                question: 'The synonym of "unique" is _______:',
                options: [
                    { text: 'special / rare', isCorrect: true },
                    { text: 'common', isCorrect: false },
                    { text: 'ordinary', isCorrect: false }
                ],
                correctMsg: 'صحيح! Unique تعني فريد أو مميز (+10)',
                wrongMsg: 'راجع جدول المرادفات'
            }
        ];
    } 
    else if (preset === 'flashcards_dialogue') {
        state.archetype = 'flashcards_dialogue';
        state.stage = 'Course';
        state.unit = 'session-2';
        state.title = 'Jobs & Daily Expressions';
        state.filename = 'session-2.html';
        state.description = 'مفردات الوظائف والتعبيرات الحوارية اليومية';
        
        state.flashcards = [
            { front: 'Job / Work', back: 'عمل / وظيفة', category: 'vocab' },
            { front: 'Teacher / Student', back: 'معلم / طالب', category: 'vocab' },
            { front: 'Engineer / Doctor', back: 'مهندس / طبيب', category: 'vocab' },
            { front: 'What do you do?', back: 'ما هي مهنتك؟', category: 'sentence' },
            { front: 'I am an English teacher.', back: 'أنا معلم لغة إنجليزية.', category: 'sentence' },
            { front: 'Where do you work?', back: 'أين تعمل؟', category: 'sentence' }
        ];

        state.dialogueTitle = 'محادثة التعارف والعمل (Job Interview Dialogue)';
        state.dialogueLines = [
            { speaker: 'Omar', english: 'Hello! What do you do?', arabic: 'أهلاً! ما هي وظيفتك؟' },
            { speaker: 'Hassan', english: 'I am a software engineer at a tech company.', arabic: 'أنا مهندس برمجيات في شركة تكنولوجيا.' },
            { speaker: 'Omar', english: 'That is great! How long have you worked there?', arabic: 'رائع! منذ متى وأنت تعمل هناك؟' },
            { speaker: 'Hassan', english: 'For about three years. I really enjoy it.', arabic: 'منذ حوالي ثلاث سنوات. أنا أستمتع بذلك حقاً.' }
        ];

        state.homeworkTitle = 'التطبيق المنزلي (Homework Task)';
        state.homeworkDesc = 'اكتب 5 جمل عن وظيفتك أو مهنة تود العمل بها مستقبلاً وتدرب على قراءتها.';

        state.quiz = [
            {
                emoji: '💼',
                question: 'Which question is used to ask about someone\'s job?',
                options: [
                    { text: 'What do you do?', isCorrect: true },
                    { text: 'Where are you going?', isCorrect: false },
                    { text: 'How old are you?', isCorrect: false }
                ],
                correctMsg: 'صحيح! What do you do تسأل عن الوظيفة (+10)',
                wrongMsg: 'حاول مجدداً'
            }
        ];
    }
    else if (preset === 'quiz_only') {
        state.archetype = 'quiz_only';
        state.stage = 'Prep_3';
        state.unit = 'unit-1';
        state.title = 'Quick Assessment Quiz';
        state.filename = 'quiz-unit-1.html';
        state.description = 'اختبار تدريبي سريع ومباشر';

        state.quiz = [
            {
                emoji: '🚀',
                question: 'Choose the correct sentence:',
                options: [
                    { text: 'She overcomes her fears with confidence.', isCorrect: true },
                    { text: 'She overcome her fears with confidence.', isCorrect: false },
                    { text: 'She overcoming her fears with confidence.', isCorrect: false }
                ],
                correctMsg: 'إجابة صحيحة (+10)',
                wrongMsg: 'حاول مجدداً'
            },
            {
                emoji: '💡',
                question: 'What is the opposite of "simple"?',
                options: [
                    { text: 'complicated', isCorrect: true },
                    { text: 'easy', isCorrect: false },
                    { text: 'clear', isCorrect: false }
                ],
                correctMsg: 'إجابة صحيحة (+10)',
                wrongMsg: 'حاول مجدداً'
            }
        ];
    }
    else if (preset === 'storybook_reading') {
        state.archetype = 'storybook_reading';
        state.stage = 'Prep_3';
        state.unit = 'unit-1';
        state.title = 'The Secret of the Ancient Lighthouse';
        state.filename = 'reading-story.html';
        state.description = 'قصة القراءة التفاعلية: اكتشف سر المنارة القديمة مع القارئ الصوتي التلقائي';
        state.videoUrl = 'https://www.youtube.com/watch?v=kJQP7kiw5Fk';
        state.videoTitle = 'فيديو شرح ومناقشة أحداث القصة (Video Story Explainer)';

        state.storyPages = [
            {
                title: 'Chapter 1: The Mysterious Light',
                textEn: 'Late at night, Adam noticed a strange glowing beam coming from the abandoned lighthouse on the rocky cliff. Nobody had lived there for decades.',
                textAr: 'في وقت متأخر من الليل، لاحظ آدم شعاعاً متوهجاً غريباً ينبعث من المنارة المهجورة الواقعة على الجرف الصخري. لم يكن أحد قد عاش هناك منذ عقود.',
                imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
                caption: 'The old lighthouse standing tall above the foggy sea',
                vocabNotes: 'abandoned (مهجور) • cliff (جرف صخري) • beam (شعاع ضوء)'
            },
            {
                title: 'Chapter 2: The Journey to the Island',
                textEn: 'Early the next morning, Adam and his loyal dog Buster took a small wooden boat. The sea was calm, but a mysterious fog surrounded the distant island.',
                textAr: 'في الصباح الباكر من اليوم التالي، استقل آدم وكلبه الوفي باستر قارباً خشبياً صغيراً. كان البحر هادئاً، لكن ضباباً غامضاً أحاط بالجزيرة البعيدة.',
                imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
                caption: 'Rowing across the quiet coastal waters towards the cliff',
                vocabNotes: 'loyal (وفيّ / مخلص) • fog (ضباب) • distant (بعيد)'
            },
            {
                title: 'Chapter 3: The Hidden Golden Compass',
                textEn: 'Inside the dusty lighthouse tower, Adam found an ancient wooden box. Inside lay a shiny golden compass pointing towards a hidden cave.',
                textAr: 'داخل برج المنارة المليء بالغبار، وجد آدم صندوقاً خشبياً قديماً. بداخله كانت بوصلة ذهبية لامعة تشير نحو كهف مخفي.',
                imageUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80',
                caption: 'The mysterious compass uncovering old maritime secrets',
                vocabNotes: 'dusty (مترب) • compass (بوصلة) • maritime (بحري)'
            },
            {
                title: 'Chapter 4: The Discovery',
                textEn: 'Following the compass, they discovered ancient historical maps of the coast. Adam realized that preserving local heritage is the greatest treasure.',
                textAr: 'باتباع البوصلة، اكتشفوا خرائط تاريخية قديمة للساحل. أدرك آدم أن الحفاظ على التراث المحلي هو أعظم كنز على الإطلاق.',
                imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80',
                caption: 'Preserving ancient maps and stories for future generations',
                vocabNotes: 'heritage (تراث) • treasure (كنز) • preserving (الحفاظ على)'
            }
        ];

        state.quiz = [
            {
                emoji: '💡',
                question: 'What did Adam notice coming from the lighthouse?',
                options: [
                    { text: 'A strange glowing beam of light', isCorrect: true },
                    { text: 'A loud noisy siren', isCorrect: false },
                    { text: 'A fleet of ships', isCorrect: false }
                ],
                correctMsg: 'ممتاز! لاحظ آدم شعاعاً متوهجاً غريباً (+10)',
                wrongMsg: 'راجع الفصل الأول من القصة'
            },
            {
                emoji: '🧭',
                question: 'What was inside the ancient wooden box?',
                options: [
                    { text: 'A shiny golden compass', isCorrect: true },
                    { text: 'Gold and silver coins', isCorrect: false },
                    { text: 'An old diary book', isCorrect: false }
                ],
                correctMsg: 'إجابة صحيحة! وجد بوصلة ذهبية لامعة (+10)',
                wrongMsg: 'راجع الفصل الثالث من القصة'
            },
            {
                emoji: '🏆',
                question: 'What did Adam realize was the greatest treasure?',
                options: [
                    { text: 'Preserving local heritage and history', isCorrect: true },
                    { text: 'Selling the golden compass', isCorrect: false },
                    { text: 'Buying a big fast boat', isCorrect: false }
                ],
                correctMsg: 'رائع! التراث والتاريخ هو الكنز الحقيقي (+10)',
                wrongMsg: 'حاول مجدداً'
            }
        ];
    }

    // Reset simulation counters
    simQuizIndex = 0;
    simQuizScore = 0;
    simQuizAnswered = false;
    simQuizSelectedOptIdx = null;
    simQuizCorrectCount = 0;
    simQuizWrongCount = 0;
    simQuizCompleted = false;
    simStoryCurrentPage = 0;
    simStoryIsPlaying = false;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }

    if (state.archetype === 'curriculum_tabs') {
        currentEditorPane = 'verbs';
        currentSimTab = 'verbs';
    } else if (state.archetype === 'flashcards_dialogue') {
        currentEditorPane = 'flashcards';
        currentSimTab = 'flashcards';
    } else if (state.archetype === 'quiz_only') {
        currentEditorPane = 'quiz';
        currentSimTab = 'quiz';
    } else if (state.archetype === 'storybook_reading') {
        currentEditorPane = 'story_pages';
        currentSimTab = 'story_pages';
    } else if (state.archetype === 'index_hub') {
        currentEditorPane = 'index_hub';
        currentSimTab = 'index_hub';
    }

    if (typeof applyStateToUI === 'function') applyStateToUI();
    if (typeof setArchetypeUIState === 'function') setArchetypeUIState(state.archetype);
    if (typeof renderEditorNavigation === 'function') renderEditorNavigation();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    saveDraft();
}
