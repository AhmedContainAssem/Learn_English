/**
 * Teacher Tree View Renderer (teacher-tree-view.js)
 * Single Responsibility: Generates HTML markup that directly inherits the student platform's
 * exact design system (.stage-group, .stage-header, .grid-cards, .grade-card, SVG badges).
 */

const TeacherTreeView = (function() {
    'use strict';

    const CATEGORY_SVGS = {
        foundation: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
        primary: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>`,
        prep: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 10h2"/><path d="M9 14h2"/><path d="M13 10h2"/><path d="M13 14h2"/><path d="M10 21v-3h4v3"/></svg>`,
        secondary: `<svg class="icon-svg" viewBox="0 0 24 24"><path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"/><path d="M22 10v6"/><path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"/></svg>`,
        chevron: `<svg class="icon-svg" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>`,
        lock: `<svg class="icon-svg" style="width:13px;height:13px;display:inline-block;vertical-align:-1px;" viewBox="0 0 24 24"><rect width="16" height="11" x="4" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`
    };

    function renderTree(manifestStages, categories, state, filterMatches) {
        if (!manifestStages || manifestStages.length === 0) {
            return '<div class="color-muted p-xl text-center fs-md">لا توجد بيانات دراسية متاحة حالياً.</div>';
        }

        return categories.map(cat => {
            const stages = manifestStages.filter(s => {
                if (cat.id === 'secondary') return s.id.startsWith('Sec_');
                if (cat.id === 'prep') return s.id.startsWith('Prep_');
                if (cat.id === 'primary') return s.id.startsWith('Grade_');
                if (cat.id === 'course') return s.id === 'Course';
                return false;
            });

            if (stages.length === 0) return '';

            const matchingStages = stages.filter(stage => {
                const combined = `${stage.name} ${stage.units?.map(u => `${u.name} ${u.arabicName} ${u.lessons?.map(l => `${l.name} ${l.arabicName}`).join(' ')}`).join(' ')}`;
                return filterMatches(stage.id, combined);
            });

            if (matchingStages.length === 0) return '';

            let catLessonCount = 0;
            let activeGrades = 0;
            stages.forEach(s => {
                let lCount = 0;
                (s.units || []).forEach(u => lCount += (u.lessons || []).length);
                catLessonCount += lCount;
                if (lCount > 0) activeGrades++;
            });

            const isExpanded = state.expandedStages.has(cat.id);
            const activeStageInCat = matchingStages.find(s => s.id === state.activeGradeId);
            const svgIcon = CATEGORY_SVGS[cat.id === 'course' ? 'foundation' : cat.id] || CATEGORY_SVGS.secondary;

            return `
                <div class="stage-group ${isExpanded ? 'is-expanded' : ''}" data-stage="${cat.id}">
                    <div class="stage-header" role="button" tabindex="0" aria-expanded="${isExpanded}" 
                         onclick="TeacherDashboard.toggleStage('${cat.id}')">
                        <div class="stage-header-main">
                            <span class="stage-icon-badge">${svgIcon}</span>
                            <div>
                                <h2 class="stage-name">${cat.name}</h2>
                                <span class="stage-en-sub">${cat.enName}</span>
                            </div>
                        </div>
                        <div class="stage-header-actions">
                            <span class="stage-counter">
                                <strong class="count-active">${activeGrades} متاح (${catLessonCount} درس)</strong>
                                • <span class="count-locked">${stages.length - activeGrades} قريباً</span>
                            </span>
                            <span class="stage-accordion-toggle" aria-hidden="true">${CATEGORY_SVGS.chevron}</span>
                        </div>
                    </div>

                    <div class="stage-drawer">
                        <div class="stage-drawer-inner">
                            <!-- Grade Cards Grid (Direct Student Layout) -->
                            <div class="grid-cards">
                                ${matchingStages.map(stage => renderGradeCard(stage, cat.id, state)).join('')}
                            </div>

                            <!-- Selected Grade Inspector -->
                            ${activeStageInCat ? renderGradeInspector(activeStageInCat, state) : ''}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderGradeCard(stage, catId, state) {
        let lessonCount = 0;
        const units = stage.units || [];
        units.forEach(u => lessonCount += (u.lessons || []).length);

        const isActive = state.activeGradeId === stage.id;
        const hasLessons = lessonCount > 0;
        const svgIcon = CATEGORY_SVGS[catId === 'course' ? 'foundation' : catId] || CATEGORY_SVGS.secondary;

        return `
            <div class="grade-card ${hasLessons ? 'active-card' : 'locked'} ${isActive ? 'is-selected-card' : ''}"
                 onclick="TeacherDashboard.selectGrade('${stage.id}')"
                 role="button" tabindex="0" title="${stage.name}">
                <div class="grade-main-info">
                    <span class="grade-icon">${svgIcon}</span>
                    <div class="grade-text-group">
                        <span class="grade-title">${stage.name || stage.id}</span>
                        <span class="grade-en-tag">${stage.slug || stage.id}</span>
                    </div>
                </div>

                <span class="badge ${hasLessons ? 'badge-active' : 'badge-locked'}">
                    ${hasLessons 
                        ? `<span class="status-dot"></span> ${lessonCount} درس`
                        : `${CATEGORY_SVGS.lock} قريباً`}
                </span>
            </div>
        `;
    }

    function renderGradeInspector(stage, state) {
        const units = stage.units || [];
        let allGradeLessons = [];
        units.forEach(u => {
            (u.lessons || []).forEach(l => allGradeLessons.push({ unit: u, lesson: l }));
        });

        const activeUnitId = state.activeUnitId || 'all';
        const displayedItems = activeUnitId === 'all'
            ? allGradeLessons
            : allGradeLessons.filter(item => item.unit.id === activeUnitId);

        return `
            <div class="teacher-grade-inspector" id="grade-inspector-${stage.id}">
                <div class="inspector-header">
                    <div class="inspector-title-cluster">
                        <span class="inspector-badge-symbol">🏫</span>
                        <div>
                            <h3 class="inspector-title">مستكشف وحدات: ${stage.name}</h3>
                            <span class="inspector-sub">إجمالي ${allGradeLessons.length} درساً في ${units.length} وحدات دراسية</span>
                        </div>
                    </div>
                    <div class="inspector-header-actions">
                        ${stage.indexPath ? `
                            <a href="../${stage.indexPath}" target="_blank" class="btn-inspector-preview" title="معاينة صفحة الصف كما يراها الطالب">
                                👁️ معاينة كطالب
                            </a>
                        ` : ''}
                        <button type="button" class="btn-inspector-create" 
                                onclick="TeacherDashboard.startNewLessonIn('${stage.id}', '${activeUnitId !== 'all' ? activeUnitId : 'unit-1'}')">
                            ➕ إضافة درس في هذا الصف
                        </button>
                    </div>
                </div>

                <!-- Unit Tabs Navigation Strip -->
                <div class="inspector-unit-tabs">
                    <button type="button" class="unit-tab-pill ${activeUnitId === 'all' ? 'active' : ''}"
                            onclick="TeacherDashboard.selectUnit('all')">
                        📁 جميع الوحدات (${allGradeLessons.length})
                    </button>
                    ${units.map(u => {
                        const count = (u.lessons || []).length;
                        const uName = u.arabicName || u.name || u.id;
                        return `
                            <button type="button" class="unit-tab-pill ${activeUnitId === u.id ? 'active' : ''}"
                                    onclick="TeacherDashboard.selectUnit('${u.id}')">
                                <span>${u.icon || '📘'}</span>
                                <span>${uName}</span>
                                <span class="tab-count-bubble">${count}</span>
                            </button>
                        `;
                    }).join('')}
                </div>

                <!-- Lessons Content Grid -->
                <div class="inspector-lessons-area">
                    ${displayedItems.length === 0 ? `
                        <div class="inspector-empty-state">
                            <span class="empty-icon">📭</span>
                            <p class="empty-text">لا توجد دروس مجهزة في هذه الوحدة حتى الآن.</p>
                            <button type="button" class="btn-empty-add" 
                                    onclick="TeacherDashboard.startNewLessonIn('${stage.id}', '${activeUnitId !== 'all' ? activeUnitId : 'unit-1'}')">
                                ➕ أنشئ الدرس الأول في هذه الوحدة
                            </button>
                        </div>
                    ` : `
                        <div class="teacher-lessons-grid">
                            ${displayedItems.map(item => renderLessonCard(stage, item.unit, item.lesson)).join('')}
                        </div>
                    `}
                </div>
            </div>
        `;
    }

    function renderLessonCard(stage, unit, l) {
        const title = l.arabicTitle || l.arabicName || l.title || l.name || l.id;
        const enTitle = (l.title && l.title !== title) ? l.title : (l.name && l.name !== title ? l.name : '');
        const path = l.path || l.filePath || `${stage.id}/${unit.id}/${l.slug || 'lesson.html'}`;
        const unitName = unit.arabicName || unit.title || unit.name || unit.id;

        return `
            <div class="teacher-lesson-card">
                <div class="card-stage-pill">${stage.name || stage.id} • ${unitName}</div>
                <h4 class="card-lesson-title">${title}</h4>
                <p class="card-lesson-en">${enTitle}</p>
                
                <div class="card-status-row">
                    <span class="status-badge-live">✅ منشور ونشط</span>
                    <span class="path-badge">${path}</span>
                </div>

                <div class="card-actions-row">
                    <a href="../${path}" target="_blank" class="card-btn-preview" title="معاينة في صفحة جديدة">
                        👁️ معاينة كطالب
                    </a>
                    <button type="button" onclick="TeacherDashboard.editLesson('${path}')" class="card-btn-edit">
                        ✏️ تعديل في المحرر
                    </button>
                </div>
            </div>
        `;
    }

    return {
        renderTree,
        renderGradeCard,
        renderGradeInspector,
        renderLessonCard
    };
})();
