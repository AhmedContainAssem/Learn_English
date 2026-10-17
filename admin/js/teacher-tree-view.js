/**
 * Teacher Tree View Renderer (teacher-tree-view.js)
 * Single Responsibility: Generates HTML markup for hierarchical Stages,
 * Grade Cards grid (matching student homepage), Grade Inspector, and Unit tabs.
 */

const TeacherTreeView = (function() {
    'use strict';

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
            stages.forEach(s => (s.units || []).forEach(u => catLessonCount += (u.lessons || []).length));
            const isExpanded = state.expandedStages.has(cat.id);

            // Check if active grade belongs to this category
            const activeStageInCat = matchingStages.find(s => s.id === state.activeGradeId);

            return `
                <div class="teacher-stage-group ${isExpanded ? 'expanded' : ''}" id="cat-group-${cat.id}">
                    <div class="teacher-stage-head" onclick="TeacherDashboard.toggleStage('${cat.id}')">
                        <div class="stage-head-title-cluster">
                            <span class="stage-head-icon">${cat.icon}</span>
                            <div>
                                <h3 class="stage-head-name">${cat.name}</h3>
                                <span class="stage-head-sub">${cat.enName}</span>
                            </div>
                        </div>
                        <div class="stage-head-stats">
                            <span class="stage-count-badge">${catLessonCount} درس متاح • ${matchingStages.length} صفوف</span>
                            <span class="stage-toggle-chevron">▼</span>
                        </div>
                    </div>

                    <div class="teacher-stage-body">
                        <!-- Grade Cards Grid (Matching Student Homepage Structure) -->
                        <div class="teacher-grades-grid">
                            ${matchingStages.map(stage => renderGradeCard(stage, state)).join('')}
                        </div>

                        <!-- Active Grade Inspector Panel -->
                        ${activeStageInCat ? renderGradeInspector(activeStageInCat, state) : ''}
                    </div>
                </div>
            `;
        }).join('');
    }

    function renderGradeCard(stage, state) {
        let lessonCount = 0;
        const units = stage.units || [];
        units.forEach(u => lessonCount += (u.lessons || []).length);

        const isActive = state.activeGradeId === stage.id;
        const hasLessons = lessonCount > 0;

        return `
            <div class="teacher-grade-nav-card ${isActive ? 'is-active' : ''} ${hasLessons ? 'has-content' : 'is-empty'}"
                 onclick="TeacherDashboard.selectGrade('${stage.id}')">
                <div class="grade-nav-main">
                    <span class="grade-nav-icon">${stage.icon || '🏫'}</span>
                    <div class="grade-nav-text">
                        <h4 class="grade-nav-title">${stage.name || stage.id}</h4>
                        <span class="grade-nav-sub">${stage.slug || stage.id}</span>
                    </div>
                </div>

                <div class="grade-nav-footer">
                    <span class="grade-nav-badge ${hasLessons ? 'badge-available' : 'badge-empty'}">
                        <span class="status-dot"></span>
                        ${hasLessons ? `${lessonCount} دروس (${units.length} وحدات)` : 'فارغ حالياً'}
                    </span>
                    <div class="grade-nav-actions" onclick="event.stopPropagation()">
                        <button type="button" class="btn-grade-toggle ${isActive ? 'active' : ''}" 
                                onclick="TeacherDashboard.selectGrade('${stage.id}')"
                                title="${isActive ? 'إغلاق وحدات الصف' : 'عرض وحدات ودروس الصف'}">
                            ${isActive ? '▲ إخفاء الوحدات' : '📂 عرض الوحدات (' + lessonCount + ')'}
                        </button>
                        <button type="button" class="btn-grade-add" 
                                onclick="TeacherDashboard.startNewLessonIn('${stage.id}', 'unit-1')"
                                title="إضافة درس جديد لهذا الصف">
                            ➕ درس جديد
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderGradeInspector(stage, state) {
        const units = stage.units || [];
        let allGradeLessons = [];
        units.forEach(u => {
            (u.lessons || []).forEach(l => {
                allGradeLessons.push({ unit: u, lesson: l });
            });
        });

        const activeUnitId = state.activeUnitId || 'all';
        const displayedItems = activeUnitId === 'all'
            ? allGradeLessons
            : allGradeLessons.filter(item => item.unit.id === activeUnitId);

        return `
            <div class="teacher-grade-inspector" id="grade-inspector-${stage.id}">
                <div class="inspector-header">
                    <div class="inspector-title-cluster">
                        <span class="inspector-icon">${stage.icon || '🏫'}</span>
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

                <!-- Lessons Content Area -->
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
        const title = l.arabicName || l.name;
        const enTitle = l.name || '';
        const path = l.path || l.filePath || `${stage.id}/${unit.id}/${l.slug || 'lesson.html'}`;
        const unitName = unit.arabicName || unit.name || unit.id;

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
                        👁️ معاينة
                    </a>
                    <button type="button" onclick="TeacherDashboard.editLesson('${path}')" class="card-btn-edit">
                        ✏️ تعديل المحتوى
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
