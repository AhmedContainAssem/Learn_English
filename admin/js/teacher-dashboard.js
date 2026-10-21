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
    let activeGradeId = null; // Clean closed state by default
    let activeUnitId = 'all';
    const expandedStages = new Set(); // Clean closed stage accordions by default

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
                const unitName = unit.arabicName || unit.title || unit.name || unit.id;
                (unit.lessons || []).forEach(lesson => {
                    const lTitle = lesson.arabicTitle || lesson.arabicName || lesson.title || lesson.name || lesson.id;
                    const lEn = (lesson.title && lesson.title !== lTitle) ? lesson.title : (lesson.name && lesson.name !== lTitle ? lesson.name : '');
                    all.push({
                        stageId: stage.id,
                        stageName,
                        unitId: unit.id,
                        unitName,
                        lessonId: lesson.id,
                        title: lTitle,
                        enTitle: lEn,
                        path: lesson.path || lesson.filePath,
                        archetype: lesson.archetype || 'curriculum_tabs'
                    });
                });
            });
        });
        return all;
    }

    function filterMatches(stageId, text) {
        if (currentFilter === 'secondary' && !stageId.startsWith('Sec_')) return false;
        if (currentFilter === 'prep' && !stageId.startsWith('Prep_')) return false;
        if (currentFilter === 'primary' && !stageId.startsWith('Grade_')) return false;
        if (currentFilter === 'course' && stageId !== 'Course') return false;
        return !searchQuery || (text || '').toLowerCase().includes(searchQuery);
    }

    function renderDashboard() {
        const container = document.getElementById('teacherDashboardContent');
        if (!container) return;

        const allLessons = getLessonsList();
        const totalStages = manifestData?.stages?.length || 0;
        const totalLessons = allLessons.length;

        container.innerHTML = `
            <!-- Teacher Profile Header (Directly Inheriting Student Platform Hero) -->
            <div class="teacher-profile-header">
                <div class="profile-main-layout">
                    <div class="profile-identity-group">
                        <div class="avatar-wrapper">
                            <img src="../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar">
                            <span class="avatar-verified-badge" title="Teacher Verified">✓</span>
                        </div>
                        <div class="profile-details">
                            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
                            <div class="slogan-pill">✨ Easy Peasy Ya Englezeey ✨</div>
                        </div>
                    </div>
                    <div class="profile-actions">
                        <div class="contact-pill" title="إجمالي الدروس التفاعلية">
                            <span class="status-dot"></span>
                            <span class="contact-num">${totalLessons}</span>
                            <span class="contact-hint">درساً تفاعلياً</span>
                        </div>
                        <div class="contact-pill" title="المراحل والصفوف الدراسية">
                            <span class="contact-num">${totalStages}</span>
                            <span class="contact-hint">صفاً دراسياً</span>
                        </div>
                        <button type="button" onclick="TeacherDashboard.startNewLesson()" class="btn-create-lesson-primary" title="إنشاء درس جديد فوراً">
                            <span>➕ إنشاء درس جديد</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Signature Cyane Glowing Center-Node Divider -->
            <div class="cyane-divider" aria-hidden="true"></div>

            <!-- Search & Discovery Bar (Inheriting Student Search Row) -->
            <div class="dashboard-tools-row">
                <div class="search-input-wrapper">
                    <span class="search-icon">🔍</span>
                    <input type="search" class="dashboard-search-input" 
                        placeholder="ابحث عن مرحلة، صف دراسي، أو كورس... (مثال: تانية ثانوي، رابع ابتدائي، تأسيس)" 
                        value="${escapeHTML(searchQuery)}" 
                        oninput="TeacherDashboard.setSearch(this.value)"
                        autocomplete="off">
                </div>
            </div>

            <!-- Tracked Section Eyebrow -->
            <div class="cyane-eyebrow">ACADEMIC STAGES & CURRICULUM</div>

            <!-- Stages Filter Segmented Navigation (Direct Student Navigation) -->
            <nav class="stages-filter-nav" aria-label="تصفية المراحل الدراسية">
                <button type="button" class="stage-filter-btn ${currentFilter === 'all' ? 'active' : ''}" onclick="TeacherDashboard.setFilter('all')">
                    <span>جميع المراحل</span>
                    <span class="filter-count">${totalStages}</span>
                </button>
                <button type="button" class="stage-filter-btn ${currentFilter === 'course' ? 'active' : ''}" onclick="TeacherDashboard.setFilter('course')">
                    <span>التأسيس</span>
                    <span class="filter-count">1</span>
                </button>
                <button type="button" class="stage-filter-btn ${currentFilter === 'primary' ? 'active' : ''}" onclick="TeacherDashboard.setFilter('primary')">
                    <span>الابتدائية</span>
                    <span class="filter-count">6</span>
                </button>
                <button type="button" class="stage-filter-btn ${currentFilter === 'prep' ? 'active' : ''}" onclick="TeacherDashboard.setFilter('prep')">
                    <span>الإعدادية</span>
                    <span class="filter-count">3</span>
                </button>
                <button type="button" class="stage-filter-btn ${currentFilter === 'secondary' ? 'active' : ''}" onclick="TeacherDashboard.setFilter('secondary')">
                    <span>الثانوية</span>
                    <span class="filter-count">3</span>
                </button>
            </nav>

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
            if (activeGradeId) {
                const cat = CATEGORIES.find(c => activeGradeId.startsWith(c.prefix));
                if (cat && cat.id === catId) activeGradeId = null;
            }
        } else {
            expandedStages.add(catId);
        }
        renderDashboard();
    }

    function selectGrade(gradeId) {
        if (activeGradeId === gradeId) {
            activeGradeId = null;
        } else {
            activeGradeId = gradeId;
            activeUnitId = 'all';
            const cat = CATEGORIES.find(c => gradeId.startsWith(c.prefix));
            if (cat) expandedStages.add(cat.id);
        }
        renderDashboard();
    }

    function selectUnit(unitId) {
        activeUnitId = unitId;
        renderDashboard();
    }

    function setFilter(f) {
        currentFilter = f;
        expandedStages.clear();
        activeGradeId = null;
        if (f !== 'all') expandedStages.add(f);
        renderDashboard();
    }

    function setSearch(q) {
        searchQuery = (q || '').trim().toLowerCase();
        if (searchQuery) {
            CATEGORIES.forEach(cat => {
                const stagesInCat = (manifestData?.stages || []).filter(s => s.id.startsWith(cat.prefix));
                const hasMatch = stagesInCat.some(stage => {
                    const text = `${stage.name} ${stage.units?.map(u => `${u.name} ${u.arabicName} ${u.lessons?.map(l => `${l.name} ${l.arabicName}`).join(' ')}`).join(' ')}`;
                    return text.toLowerCase().includes(searchQuery);
                });
                if (hasMatch) expandedStages.add(cat.id);
            });
        } else {
            expandedStages.clear();
            activeGradeId = null;
        }
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
