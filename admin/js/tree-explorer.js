/**
 * Curriculum & File Tree Explorer Module (tree-explorer.js)
 * Provides visual hierarchical navigation of all grades, units, lessons, and hub indexes.
 */

let curriculumManifest = null;
let treeSearchQuery = '';
let collapsedStages = {};

async function loadCurriculumManifest() {
    try {
        const saved = localStorage.getItem('curriculum_manifest_override');
        if (saved) {
            curriculumManifest = JSON.parse(saved);
            return;
        }
        const res = await fetch('../curriculum-manifest.json');
        if (res.ok) {
            curriculumManifest = await res.json();
        }
    } catch(e) {
        console.warn("Could not load curriculum-manifest.json, using fallback schema:", e);
    }

    if (!curriculumManifest) {
        curriculumManifest = { stages: [] };
    }
}

function openTreeExplorerModal() {
    if (typeof playSound === 'function') playSound('click');
    const modal = document.getElementById('treeExplorerModal');
    if (modal) {
        modal.style.display = 'flex';
        renderCurriculumTree();
    }
}

function closeTreeExplorerModal() {
    if (typeof playSound === 'function') playSound('click');
    const modal = document.getElementById('treeExplorerModal');
    if (modal) modal.style.display = 'none';
}

function toggleStageCollapse(stageId) {
    if (typeof playSound === 'function') playSound('click');
    collapsedStages[stageId] = !collapsedStages[stageId];
    renderCurriculumTree();
}

function filterCurriculumTree(query) {
    treeSearchQuery = (query || '').trim().toLowerCase();
    renderCurriculumTree();
}

async function renderCurriculumTree() {
    const container = document.getElementById('curriculumTreeContainer');
    if (!container) return;

    if (!curriculumManifest) {
        await loadCurriculumManifest();
    }

    // Merge custom stages from localStorage
    const customStages = typeof getCustomStages === 'function' ? getCustomStages() : [];
    const allStages = [...(curriculumManifest?.stages || [])];

    customStages.forEach(cs => {
        if (!allStages.some(s => s.slug === cs.slug)) {
            allStages.push({
                id: cs.slug,
                slug: cs.slug,
                name: cs.name,
                category: cs.category || 'مخصص',
                icon: cs.icon || '🏫',
                indexPath: `${cs.slug}/index.html`,
                status: 'active',
                units: []
            });
        }
    });

    if (allStages.length === 0) {
        container.innerHTML = `<div style="text-align: center; padding: 30px; color: var(--text-muted);">No stages registered in curriculum tree.</div>`;
        return;
    }

    let filteredStages = allStages;
    if (treeSearchQuery) {
        filteredStages = allStages.filter(s => {
            const matchStage = s.name.toLowerCase().includes(treeSearchQuery) || s.slug.toLowerCase().includes(treeSearchQuery);
            const matchUnits = (s.units || []).some(u => 
                u.name.toLowerCase().includes(treeSearchQuery) || 
                (u.arabicName && u.arabicName.toLowerCase().includes(treeSearchQuery)) ||
                (u.lessons || []).some(l => l.name.toLowerCase().includes(treeSearchQuery) || (l.arabicName && l.arabicName.toLowerCase().includes(treeSearchQuery)))
            );
            return matchStage || matchUnits;
        });
    }

    let html = `
        <!-- Main Platform Hub Root Entry -->
        <div style="background: rgba(0, 243, 255, 0.05); border: 1px solid rgba(0, 243, 255, 0.25); border-radius: 12px; padding: 12px 16px; margin-bottom: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.8rem;">🏠</span>
                <div>
                    <div style="font-weight: 900; color: var(--text-main); font-size: 1.05rem;">Platform Root Index Hub</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); font-family: monospace;">Learn_English/index.html</div>
                </div>
            </div>
            <div style="display: flex; gap: 8px;">
                <button type="button" onclick="loadAndParsePresetFile('../index.html', '', '', 'index.html')" class="action-btn secondary" style="padding: 5px 12px; font-size: 0.82rem; color: var(--accent-primary); border-color: var(--accent-primary);">
                    ⚡ Edit Root Index
                </button>
            </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
    `;

    filteredStages.forEach(stage => {
        const isCollapsed = collapsedStages[stage.slug] && !treeSearchQuery;
        const units = stage.units || [];

        html += `
            <div style="background: rgba(19, 27, 46, 0.8); border: 1px solid var(--border-color); border-radius: 14px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                <!-- Stage Header Bar -->
                <div style="padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; background: rgba(255, 255, 255, 0.03); border-bottom: ${isCollapsed ? 'none' : '1px solid var(--border-color)'}; flex-wrap: wrap; gap: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; cursor: pointer;" onclick="toggleStageCollapse('${escapeHTML(stage.slug)}')">
                        <span style="font-size: 1.1rem; color: var(--accent-primary); width: 20px; text-align: center;">${isCollapsed ? '➕' : '➖'}</span>
                        <span style="font-size: 1.6rem;">${escapeHTML(stage.icon || '🏫')}</span>
                        <div>
                            <div style="font-weight: 800; color: var(--text-main); font-size: 1.02rem;">
                                ${escapeHTML(stage.name)}
                                <span style="font-size: 0.75rem; background: rgba(0, 243, 255, 0.1); color: var(--accent-primary); padding: 2px 8px; border-radius: 6px; margin-left: 6px; font-weight: normal;">${escapeHTML(stage.category || 'Stage')}</span>
                            </div>
                            <div style="font-size: 0.78rem; color: var(--text-muted); font-family: monospace;">📁 Learn_English/${escapeHTML(stage.slug)}/</div>
                        </div>
                    </div>

                    <div class="d-flex gap-xs items-center">
                        <button type="button" onclick="loadAndParsePresetFile('../${escapeHTML(stage.slug)}/index.html', '${escapeHTML(stage.slug)}', '', 'index.html')" class="action-btn secondary" style="padding: 4px 10px; font-size: 0.78rem;" title="Edit stage index page">
                            📑 Stage Index
                        </button>
                        <button type="button" onclick="prepareNewUnitForStage('${escapeHTML(stage.slug)}')" class="action-btn secondary" style="padding: 4px 10px; font-size: 0.78rem; color: var(--accent-green); border-color: var(--accent-green);" title="Add new unit to this stage">
                            ➕ New Unit
                        </button>
                        <button type="button" onclick="prepareNewLessonForStage('${escapeHTML(stage.slug)}', '')" class="action-btn" style="padding: 4px 10px; font-size: 0.78rem;" title="Create new lesson">
                            ✨ New Lesson
                        </button>
                    </div>
                </div>

                <!-- Units & Lessons Container -->
                ${!isCollapsed ? `
                    <div style="padding: 12px 16px; display: flex; flex-direction: column; gap: 10px;">
                        ${units.length === 0 ? `
                            <div style="text-align: center; padding: 14px; color: var(--text-muted); font-size: 0.85rem; border: 1px dashed rgba(255,255,255,0.08); border-radius: 8px;">
                                No units registered yet. Click "➕ New Unit" to scaffold the first unit.
                            </div>
                        ` : units.map(u => `
                            <div style="background: rgba(11, 15, 25, 0.7); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px; padding: 10px 14px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; border-bottom: ${(u.lessons && u.lessons.length > 0) ? '1px solid rgba(255,255,255,0.05)' : 'none'}; padding-bottom: ${(u.lessons && u.lessons.length > 0) ? '8px' : '0'}; margin-bottom: ${(u.lessons && u.lessons.length > 0) ? '8px' : '0'};">
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="font-size: 1.3rem;">${escapeHTML(u.icon || '📘')}</span>
                                        <div>
                                            <div style="font-weight: bold; color: var(--text-main); font-size: 0.92rem;">
                                                ${escapeHTML(u.name)}
                                                ${u.arabicName ? `<span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;"> - ${escapeHTML(u.arabicName)}</span>` : ''}
                                            </div>
                                            <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">📁 ${escapeHTML(stage.slug)}/${escapeHTML(u.slug)}/</div>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-xs items-center">
                                        <button type="button" onclick="loadAndParsePresetFile('../${escapeHTML(stage.slug)}/${escapeHTML(u.slug)}/index.html', '${escapeHTML(stage.slug)}', '${escapeHTML(u.slug)}', 'index.html')" class="action-btn secondary" style="padding: 3px 8px; font-size: 0.75rem;">
                                            📑 Unit Index
                                        </button>
                                        <button type="button" onclick="prepareNewLessonForStage('${escapeHTML(stage.slug)}', '${escapeHTML(u.slug)}')" class="action-btn" style="padding: 3px 8px; font-size: 0.75rem;">
                                            ➕ Add Lesson
                                        </button>
                                    </div>
                                </div>

                                <!-- Lessons List inside Unit -->
                                ${u.lessons && u.lessons.length > 0 ? `
                                    <div style="display: flex; flex-direction: column; gap: 6px; padding-left: 12px; border-left: 2px solid rgba(0, 243, 255, 0.3); margin-top: 6px;">
                                        ${u.lessons.map(l => `
                                            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255,255,255,0.04); border-radius: 6px; padding: 6px 10px;">
                                                <div style="display: flex; align-items: center; gap: 8px;">
                                                    <span style="font-size: 0.95rem;">${l.archetype === 'curriculum_tabs' ? '📑' : l.archetype === 'flashcards_dialogue' ? '🎴' : '🎯'}</span>
                                                    <span style="font-size: 0.85rem; color: var(--text-main); font-weight: 600;">${escapeHTML(l.name)}</span>
                                                    <span style="font-size: 0.72rem; color: var(--text-muted); font-family: monospace;">(${escapeHTML(l.slug)})</span>
                                                </div>
                                                <div style="display: flex; gap: 6px;">
                                                    <button type="button" onclick="loadAndParsePresetFile('../${escapeHTML(stage.slug)}/${escapeHTML(u.slug)}/${escapeHTML(l.slug)}', '${escapeHTML(stage.slug)}', '${escapeHTML(u.slug)}', '${escapeHTML(l.slug)}')" class="action-btn secondary" style="padding: 2px 8px; font-size: 0.72rem; color: var(--accent-primary); border-color: var(--accent-primary);">
                                                        ⚡ Open to Edit
                                                    </button>
                                                </div>
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    });

    html += `</div>`;
    container.innerHTML = html;
}

function prepareNewUnitForStage(stageSlug) {
    if (typeof playSound === 'function') playSound('click');
    closeTreeExplorerModal();

    state.stage = stageSlug;
    state.unit = 'unit-1';
    state.filename = 'index.html';
    state.archetype = 'unit_index';
    state.indexType = 'unit';
    state.indexScope = 'unit_hub';
    state.indexLayoutType = 'lessons';
    state.title = `📚 Unit 1 Lessons Index`;
    state.description = `Interactive lessons and quizzes for ${getStageDisplayName(stageSlug)}`;
    state.indexBackLink = '../index.html';
    state.indexBackText = `⬅️ Back to ${getStageDisplayName(stageSlug)} Units`;

    state.indexCards = [
        {
            title: 'Lesson 1 - Vocabulary & Practice',
            subtitle: 'Lesson 1 - Core Vocabulary & Exercises',
            icon: '📝',
            destType: 'same_folder_lesson',
            link: './lesson-1.html',
            status: 'active',
            tag: '🎯 Available'
        },
        {
            title: 'Lesson 2 - Language & Quiz',
            subtitle: 'Lesson 2 - Grammar & Challenge Quiz',
            icon: '🎯',
            destType: 'same_folder_lesson',
            link: './lesson-2.html',
            status: 'locked',
            tag: '🔒 Upcoming'
        }
    ];

    applyStateToUI();
    showAdminToast(`🪄 Unit index template (${stageSlug}/unit-1/index.html) loaded in studio!`);
    if (typeof playCorrectFX === 'function') playCorrectFX();
}

function prepareNewLessonForStage(stageSlug, unitSlug = '') {
    if (typeof playSound === 'function') playSound('click');
    closeTreeExplorerModal();

    state.stage = stageSlug;
    state.unit = unitSlug || 'unit-1';
    state.filename = 'lesson-1.html';
    state.archetype = 'curriculum_tabs';
    state.title = 'Lesson 1: Vocabulary & Skills';
    state.description = `Explanation and interactive practice for Lesson 1 - ${getStageDisplayName(stageSlug)}`;

    applyStateToUI();
    showAdminToast(`✨ New lesson template (${stageSlug}/${state.unit}/lesson-1.html) ready to write!`);
    if (typeof playCorrectFX === 'function') playCorrectFX();
}
