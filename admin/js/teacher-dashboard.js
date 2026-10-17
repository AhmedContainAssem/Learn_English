/**
 * Teacher Dashboard Module (teacher-dashboard.js)
 * Hierarchical Canva/Notion style management hub organized cleanly by:
 * Academic Stages -> Grades -> Units -> Lessons with live search and quick add actions.
 */

const TeacherDashboard = (function() {
    'use strict';

    let manifestData = null;
    let currentFilter = 'all';
    let searchQuery = '';
    let viewMode = 'tree'; // 'tree' or 'grid'
    let activeGradeId = 'Prep_3'; // default open grade for immediate preview
    let activeUnitId = 'all';
    const expandedStages = new Set(['secondary', 'prep', 'primary', 'course']);

    const CATEGORIES = [
        { id: 'secondary', name: 'المرحلة الثانوية', enName: 'Secondary Stage (Sec 1 - 3)', icon: '🎓', prefix: 'Sec_' },
        { id: 'prep', name: 'المرحلة الإعدادية', enName: 'Preparatory Stage (Preps 1 - 3)', icon: '🎒', prefix: 'Prep_' },
        { id: 'primary', name: 'المرحلة الابتدائية', enName: 'Primary Stage (Grades 1 - 6)', icon: '🌱', prefix: 'Grade_' },
        { id: 'course', name: 'كورسات التأسيس الشاملة', enName: 'Foundation Courses & Phonics', icon: '🚀', prefix: 'Course' }
    ];

    async function init() {
        if (typeof window !== 'undefined' && window.EMBEDDED_CURRICULUM_DATA) {
            manifestData = window.EMBEDDED_CURRICULUM_DATA;
        }
        try {
            const res = await fetch('../curriculum-manifest.json');
            if (res.ok) manifestData = await res.json();
        } catch(e) {}

        if (!manifestData && typeof curriculumManifest !== 'undefined' && curriculumManifest?.stages) {
            manifestData = curriculumManifest;
        }
        renderDashboard();
    }

    function getLessonsList() {
        if (!manifestData || !manifestData.stages) return [];
        const all = [];
        manifestData.stages.forEach(stage => {
            const stageName = stage.name || stage.id;
            (stage.units || []).forEach(unit => {
                const unitName = unit.arabicName || unit.name || unit.id;
                (unit.lessons || []).forEach(lesson => {
                    all.push({
                        stageId: stage.id,
                        stageName,
                        unitId: unit.id,
                        unitName,
                        lessonId: lesson.id,
                        title: lesson.arabicName || lesson.name,
                        enTitle: lesson.name,
                        path: lesson.path || lesson.filePath,
                        archetype: lesson.archetype || 'curriculum_tabs'
                    });
                });
            });
        });
        return all;
    }

    function filterMatches(stageId, text) {
        if (currentFilter !== 'all') {
            if (currentFilter === 'secondary' && !stageId.startsWith('Sec_')) return false;
            if (currentFilter === 'prep' && !stageId.startsWith('Prep_')) return false;
            if (currentFilter === 'primary' && !stageId.startsWith('Grade_')) return false;
            if (currentFilter === 'course' && stageId !== 'Course') return false;
        }
        if (searchQuery) {
            return (text || '').toLowerCase().includes(searchQuery);
        }
        return true;
    }

    function renderDashboard() {
        const container = document.getElementById('teacherDashboardContent');
        if (!container) return;

        const allLessons = getLessonsList();
        const totalStages = manifestData?.stages?.length || 0;
        const totalLessons = allLessons.length;

        container.innerHTML = `
            <div class="dashboard-hero-banner">
                <div class="hero-text-cluster">
                    <h2 class="hero-welcome-title">مرحباً بك في استوديو إعداد الدروس 🎓</h2>
                    <p class="hero-welcome-desc">صمّم ونظّم دروسك التعليمية بهيكلية تربوية واضحة وممتعة مثل Canva و Microsoft Word</p>
                </div>
                <div class="hero-action-cluster">
                    <button type="button" onclick="TeacherDashboard.startNewLesson()" class="btn-create-lesson-hero">
                        <span class="icon">➕</span>
                        <span>إنشاء درس جديد الآن</span>
                    </button>
                </div>
            </div>

            <div class="dashboard-stats-grid">
                <div class="stat-card">
                    <div class="stat-icon">📚</div>
                    <div class="stat-val">${totalLessons}</div>
                    <div class="stat-label">إجمالي الدروس التفاعلية</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏫</div>
                    <div class="stat-val">${totalStages}</div>
                    <div class="stat-label">المراحل والصفوف الدراسية</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">⚡</div>
                    <div class="stat-val">100% WebP</div>
                    <div class="stat-label">كفاءة وسرعة الصور</div>
                </div>
            </div>

            <!-- Search & View Mode Toolbar -->
            <div class="teacher-search-toolbar">
                <div class="teacher-search-wrapper">
                    <span class="teacher-search-icon">🔍</span>
                    <input type="search" class="teacher-search-input" 
                        placeholder="ابحث عن مرحلة، صف دراسي، وحدة، أو درس... (مثال: تالتة إعدادي، حواسنا، Unit 1)" 
                        value="${escapeHTML(searchQuery)}" 
                        oninput="TeacherDashboard.setSearch(this.value)">
                </div>

                <div class="view-mode-pills">
                    <button type="button" class="view-mode-pill ${viewMode === 'tree' ? 'active' : ''}" 
                        onclick="TeacherDashboard.setViewMode('tree')" title="عرض شجري منظم بالصفوف والوحدات">
                        🗂️ عرض المراحل والصفوف
                    </button>
                    <button type="button" class="view-mode-pill ${viewMode === 'grid' ? 'active' : ''}" 
                        onclick="TeacherDashboard.setViewMode('grid')" title="عرض جميع البطاقات دفعة واحدة">
                        📑 شبكة جميع الدروس (${totalLessons})
                    </button>
                </div>
            </div>

            <!-- Category Filter Pills -->
            <div class="dashboard-filters-bar">
                <button type="button" class="filter-pill ${currentFilter === 'all' ? 'active' : ''}" onclick="TeacherDashboard.setFilter('all')">
                    📌 جميع المراحل (${totalLessons})
                </button>
                <button type="button" class="filter-pill ${currentFilter === 'secondary' ? 'active' : ''}" onclick="TeacherDashboard.setFilter('secondary')">
                    🎓 المرحلة الثانوية
                </button>
                <button type="button" class="filter-pill ${currentFilter === 'prep' ? 'active' : ''}" onclick="TeacherDashboard.setFilter('prep')">
                    🎒 المرحلة الإعدادية
                </button>
                <button type="button" class="filter-pill ${currentFilter === 'primary' ? 'active' : ''}" onclick="TeacherDashboard.setFilter('primary')">
                    🌱 المرحلة الابتدائية
                </button>
                <button type="button" class="filter-pill ${currentFilter === 'course' ? 'active' : ''}" onclick="TeacherDashboard.setFilter('course')">
                    🚀 كورسات التأسيس
                </button>
            </div>

            <!-- Main Content Area: Tree vs Grid -->
            <div id="teacherDashboardMainArea">
                ${viewMode === 'tree' 
                    ? TeacherTreeView.renderTree(manifestData?.stages, CATEGORIES, { expandedStages, activeGradeId, activeUnitId, searchQuery }, filterMatches)
                    : renderFlatGrid(allLessons)}
            </div>
        `;
    }

    function renderFlatGrid(lessons) {
        const filtered = lessons.filter(l => filterMatches(l.stageId, `${l.stageName} ${l.unitName} ${l.title} ${l.enTitle}`));
        if (filtered.length === 0) {
            return `<div class="color-muted p-xl text-center fs-md">🔍 لا توجد دروس مطابقة لبحثك</div>`;
        }

        return `
            <div class="teacher-lessons-grid">
                ${filtered.map(l => `
                    <div class="teacher-lesson-card">
                        <div class="card-stage-pill">${l.stageName} • ${l.unitName}</div>
                        <h3 class="card-lesson-title">${l.title}</h3>
                        <p class="card-lesson-en">${l.enTitle || ''}</p>
                        
                        <div class="card-status-row">
                            <span class="status-badge-live">✅ منشور ونشط</span>
                            <span class="path-badge">${l.path}</span>
                        </div>

                        <div class="card-actions-row">
                            <a href="../${l.path}" target="_blank" class="card-btn-preview" title="معاينة الدرس في المتصفح">
                                👁️ معاينة
                            </a>
                            <button type="button" onclick="TeacherDashboard.editLesson('${l.path}')" class="card-btn-edit">
                                ✏️ تعديل المحتوى
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    function toggleStage(catId) {
        if (expandedStages.has(catId)) {
            expandedStages.delete(catId);
        } else {
            expandedStages.add(catId);
        }
        renderDashboard();
    }

    function selectGrade(gradeId) {
        if (activeGradeId === gradeId) {
            // Clicking active grade toggles inspector closed
            activeGradeId = null;
        } else {
            activeGradeId = gradeId;
            activeUnitId = 'all';
            // Ensure parent stage category is expanded
            const parentCat = CATEGORIES.find(c => {
                if (c.id === 'secondary') return gradeId.startsWith('Sec_');
                if (c.id === 'prep') return gradeId.startsWith('Prep_');
                if (c.id === 'primary') return gradeId.startsWith('Grade_');
                if (c.id === 'course') return gradeId === 'Course';
                return false;
            });
            if (parentCat) expandedStages.add(parentCat.id);
        }
        renderDashboard();
    }

    function selectUnit(unitId) {
        activeUnitId = unitId;
        renderDashboard();
    }

    function setFilter(f) {
        currentFilter = f;
        renderDashboard();
    }

    function setSearch(q) {
        searchQuery = (q || '').trim().toLowerCase();
        renderDashboard();
    }

    function setViewMode(m) {
        viewMode = m;
        renderDashboard();
    }

    function startNewLesson() {
        if (typeof resetForm === 'function') resetForm();
        switchToEditor();
        showAdminToast("✨ تم فتح مسودة جديدة للدرس! ابدأ بكتابة المحتوى بكل سهولة.");
    }

    function startNewLessonIn(stageId, unitId) {
        if (typeof resetForm === 'function') resetForm();
        if (typeof state !== 'undefined') {
            state.stage = stageId || 'Prep_3';
            state.unit = unitId || 'unit-1';
        }
        const stageSel = document.getElementById('stageSelect');
        if (stageSel) stageSel.value = state.stage;
        const unitEl = document.getElementById('unitInput');
        if (unitEl) unitEl.value = state.unit;

        if (typeof TeacherPath !== 'undefined') {
            TeacherPath.syncFromState();
        }
        switchToEditor();
        showAdminToast(`🎯 تم إعداد مسار الدرس في: ${stageId} > ${unitId}`);
    }

    async function editLesson(relativePath) {
        showAdminToast("⏳ جاري تحميل الدرس في المحرر...");
        try {
            const res = await fetch(`../${relativePath}`);
            if (!res.ok) throw new Error('Could not fetch lesson file');
            const html = await res.text();
            
            const segs = relativePath.split('/');
            const stage = segs[0] || 'Sec_3';
            const unit = segs[1] || 'unit-1';
            const fname = segs[segs.length - 1] || 'lesson.html';

            if (typeof importLessonFromHTMLString === 'function') {
                importLessonFromHTMLString(html);
            }
            if (typeof state !== 'undefined') {
                state.stage = stage;
                state.unit = unit;
                state.filename = fname;
            }
            if (typeof TeacherPath !== 'undefined') {
                TeacherPath.syncFromState();
            }
            switchToEditor();
            showAdminToast("✅ تم فتح الدرس في المحرر بنجاح.");
        } catch(e) {
            console.error('Edit lesson error:', e);
            showAdminToast("❌ تعذر تحميل ملف الدرس: " + e.message, false);
        }
    }

    function switchToEditor() {
        const dash = document.getElementById('teacherDashboardContainer');
        const editor = document.getElementById('teacherEditorContainer');
        const tabDash = document.getElementById('navTabDashboard');
        const tabEditor = document.getElementById('navTabEditor');

        if (dash) dash.style.display = 'none';
        if (editor) editor.style.display = 'block';
        if (tabDash) tabDash.classList.remove('active');
        if (tabEditor) tabEditor.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function switchToDashboard() {
        const dash = document.getElementById('teacherDashboardContainer');
        const editor = document.getElementById('teacherEditorContainer');
        const tabDash = document.getElementById('navTabDashboard');
        const tabEditor = document.getElementById('navTabEditor');

        if (dash) dash.style.display = 'block';
        if (editor) editor.style.display = 'none';
        if (tabDash) tabDash.classList.add('active');
        if (tabEditor) tabEditor.classList.remove('active');
        renderDashboard();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return {
        init,
        setFilter,
        setSearch,
        setViewMode,
        toggleStage,
        selectGrade,
        selectUnit,
        startNewLesson,
        startNewLessonIn,
        editLesson,
        switchToEditor,
        switchToDashboard
    };
})();

if (typeof window !== 'undefined') {
    window.TeacherDashboard = TeacherDashboard;
}
