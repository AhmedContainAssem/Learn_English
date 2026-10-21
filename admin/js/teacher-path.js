/**
 * Teacher Path & Zero-Code Routing Module (teacher-path.js)
 * Bridges the gap between educational teacher concepts and low-level file paths.
 * Allows teachers to pick stages, units, and lesson types in friendly Arabic
 * while auto-generating target paths (unit-1/lesson-1.html) behind the scenes.
 */

const TeacherPath = (function() {
    'use strict';

    const STAGE_NAMES = {
        'Prep_3': 'الصف الثالث الإعدادي (Prep 3)',
        'Prep_2': 'الصف الثاني الإعدادي (Prep 2)',
        'Prep_1': 'الصف الأول الإعدادي (Prep 1)',
        'Sec_1': 'الصف الأول الثانوي (Sec 1)',
        'Sec_2': 'الصف الثاني الثانوي (Sec 2)',
        'Sec_3': 'الصف الثالث الثانوي (Sec 3)',
        'Grade_6': 'الصف السادس الابتدائي (Primary 6)',
        'Grade_5': 'الصف الخامس الابتدائي (Primary 5)',
        'Grade_4': 'الصف الرابع الابتدائي (Primary 4)',
        'Grade_3': 'الصف الثالث الابتدائي (Primary 3)',
        'Grade_2': 'الصف الثاني الابتدائي (Primary 2)',
        'Grade_1': 'الصف الأول الابتدائي (Primary 1)',
        'Course': 'كورسات التأسيس العامة',
        'Grammar': 'فهرس القواعد الشامل',
        'Phonics': 'الصوتيات والقراءة (Phonics)',
        'Kindergarten': 'رياض الأطفال (KG)',
        'General_English': 'محادثات ولغة عامة'
    };

    const UNIT_NAMES = {
        'unit-1': 'الوحدة الأولى (Unit 1)',
        'unit-2': 'الوحدة الثانية (Unit 2)',
        'unit-3': 'الوحدة الثالثة (Unit 3)',
        'unit-4': 'الوحدة الرابعة (Unit 4)',
        'unit-5': 'الوحدة الخامسة (Unit 5)',
        'unit-6': 'الوحدة السادسة (Unit 6)',
        'session-1': 'الحصة 1 (Session 1)',
        'session-2': 'الحصة 2 (Session 2)',
        '': 'القسم الرئيسي (بدون وحدة فرعية)'
    };

    const LESSON_NAMES = {
        'lesson-1-2.html': 'الدرس 1 و 2 (Lesson 1 & 2)',
        'lesson-3-4.html': 'الدرس 3 و 4 (Lesson 3 & 4)',
        'lesson-4-5.html': 'الدرس 4 و 5 (Lesson 4 & 5)',
        'lesson-5-6.html': 'الدرس 5 و 6 (Lesson 5 & 6)',
        'lesson-1.html': 'الدرس الأول منفصل (Lesson 1)',
        'lesson-2.html': 'الدرس الثاني منفصل (Lesson 2)',
        'lesson-1-part-1.html': 'الدرس 1 (جزء 1)',
        'lesson-1-part-2.html': 'الدرس 1 (جزء 2)',
        'quiz.html': 'اختبار وكويز الوحدة (Unit Quiz)',
        'revision.html': 'مراجعة وتلخيص (Revision)',
        'index.html': 'فهرس دروس الوحدة (Unit Hub)'
    };

    function init() {
        syncFromState();
    }

    function onUnitSelect(unitVal) {
        if (typeof playSound === 'function') playSound('click');
        const customUnitBox = document.getElementById('customUnitBox');
        
        if (unitVal === '__custom__') {
            if (customUnitBox) customUnitBox.classList.remove('d-none');
            return;
        }

        if (customUnitBox) customUnitBox.classList.add('d-none');
        if (typeof state !== 'undefined') {
            state.unit = unitVal.trim();
        }

        const rawUnitInput = document.getElementById('unitInput');
        if (rawUnitInput) rawUnitInput.value = state.unit;

        if (typeof updateTargetFilePath === 'function') updateTargetFilePath();
        if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
        if (typeof saveDraft === 'function') saveDraft();
        updateDisplay();
    }

    function handleCustomUnitInput(val) {
        const cleaned = (val || '').trim().toLowerCase().replace(/\s+/g, '-');
        if (typeof state !== 'undefined') state.unit = cleaned;
        const rawUnitInput = document.getElementById('unitInput');
        if (rawUnitInput) rawUnitInput.value = cleaned;
        if (typeof updateTargetFilePath === 'function') updateTargetFilePath();
        updateDisplay();
    }

    function onLessonTypeSelect(lessonVal) {
        if (typeof playSound === 'function') playSound('click');
        const devDrawer = document.getElementById('devAdvancedDrawer');

        if (lessonVal === '__custom__') {
            if (devDrawer) {
                devDrawer.open = true;
                const rawInput = document.getElementById('lessonFilenameInput');
                if (rawInput) rawInput.focus();
            }
            return;
        }

        if (typeof state !== 'undefined') {
            state.filename = lessonVal.trim();
            // Intelligent Archetype Suggestion
            if (lessonVal === 'quiz.html' && state.archetype !== 'quiz_only') {
                if (typeof setArchetype === 'function') setArchetype('quiz_only');
            } else if (lessonVal === 'index.html' && state.archetype !== 'unit_index') {
                if (typeof setArchetype === 'function') setArchetype('unit_index');
            }
        }

        const rawFnInput = document.getElementById('lessonFilenameInput');
        if (rawFnInput) rawFnInput.value = state.filename;

        if (typeof updateTargetFilePath === 'function') updateTargetFilePath();
        if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
        if (typeof saveDraft === 'function') saveDraft();
        updateDisplay();
    }

    function updateDisplay() {
        const stage = state.stage || 'Prep_3';
        const unit = (state.unit || '').trim();
        const fn = (state.filename || 'lesson-1.html').trim();

        const stageDisplay = STAGE_NAMES[stage] || stage;
        const unitDisplay = UNIT_NAMES[unit] || (unit ? `الوحدة (${unit})` : 'القسم الرئيسي');
        const lessonDisplay = LESSON_NAMES[fn] || `ملف (${fn})`;

        // Update Friendly Breadcrumb Elements
        const bStage = document.getElementById('teacherBreadcrumbStage');
        const bUnit = document.getElementById('teacherBreadcrumbUnit');
        const bLesson = document.getElementById('teacherBreadcrumbLesson');
        const bRawPath = document.getElementById('teacherBreadcrumbRawPath');

        if (bStage) bStage.textContent = stageDisplay;
        if (bUnit) bUnit.textContent = unitDisplay;
        if (bLesson) bLesson.textContent = lessonDisplay;

        let fullPath = stage;
        if (unit) fullPath += `/${unit}`;
        if (fn) fullPath += `/${fn}`;
        if (bRawPath) bRawPath.textContent = fullPath;

        // Auto-select in friendly dropdowns if they exist
        const friendlyUnit = document.getElementById('friendlyUnitSelect');
        if (friendlyUnit) {
            if (friendlyUnit.querySelector(`option[value="${unit}"]`)) {
                friendlyUnit.value = unit;
            } else if (unit) {
                friendlyUnit.value = '__custom__';
                const customUnitBox = document.getElementById('customUnitBox');
                if (customUnitBox) customUnitBox.classList.remove('d-none');
                const customUnitInput = document.getElementById('customUnitInput');
                if (customUnitInput) customUnitInput.value = unit;
            }
        }

        const friendlyLesson = document.getElementById('friendlyLessonSelect');
        if (friendlyLesson) {
            if (friendlyLesson.querySelector(`option[value="${fn}"]`)) {
                friendlyLesson.value = fn;
            } else {
                friendlyLesson.value = '__custom__';
            }
        }
    }

    function syncFromState() {
        updateDisplay();
    }

    function previewAsStudent() {
        if (typeof playSound === 'function') playSound('click');
        const sim = document.getElementById('liveSimulatorWrapper') || document.getElementById('pane-slides');
        if (sim) {
            sim.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (typeof showAdminToast === 'function') {
                showAdminToast('👁️ جاري عرض تجربة الطالب الحية في الأسفل...');
            }
        }
    }

    function saveDraftFriendly() {
        if (typeof playSound === 'function') playSound('save');
        if (typeof saveDraft === 'function') saveDraft();
        if (typeof showAdminToast === 'function') {
            showAdminToast('💾 تم حفظ الدرس كمسودة بنجاح! يمكنك العودة له في أي وقت.');
        }
    }

    function publishFriendly() {
        if (typeof playSound === 'function') playSound('magic');
        if (typeof publishDirectlyToGitHub === 'function') {
            publishDirectlyToGitHub();
        }
    }

    return {
        init,
        onUnitSelect,
        handleCustomUnitInput,
        onLessonTypeSelect,
        updateDisplay,
        syncFromState,
        previewAsStudent,
        saveDraftFriendly,
        publishFriendly
    };
})();

if (typeof window !== 'undefined') {
    window.TeacherPath = TeacherPath;
}
