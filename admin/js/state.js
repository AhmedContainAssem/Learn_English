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
    // Grammar & Presentation Slides
    grammarSlides: [],
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
let simCurrentSlide = 0;
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


// Note: loadArchetypePreset is decoupled into admin/js/archetype-presets.js
