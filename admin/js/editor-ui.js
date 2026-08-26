/**
 * Studio Editor UI Coordinator & Navigation Controller (editor-ui.js)
 * Single Responsibility: Manages archetype switching, editor navigation tabs, state-to-DOM synchronization, and studio bootstrap lifecycle.
 */

function isIndexArchetype(arch) {
    return arch === 'stage_index' || arch === 'unit_index' || arch === 'index_hub';
}

function setArchetypeUIState(archetype) {
    const stageBadgeInfo = document.getElementById('stageBadgeInfo');
    const activeArchetypeBadge = document.getElementById('activeArchetypeBadge');
    const indexTypeBadge = document.getElementById('indexTypeBadge');
    const curStageNameHint = document.getElementById('curStageNameHint');

    if (stageBadgeInfo) {
        stageBadgeInfo.textContent = state.stage || 'Platform Root';
    }

    if (curStageNameHint) {
        curStageNameHint.textContent = state.stage || 'Stage';
    }

    if (activeArchetypeBadge) {
        const badgeMap = {
            'curriculum_tabs': '📚 Curriculum Tabs',
            'flashcards_dialogue': '🎴 Flashcards & Dialogue',
            'quiz_only': '🎯 Direct Quiz',
            'storybook_reading': '📖 Storybook & Reading',
            'stage_index': '🏫 Stage Index Hub',
            'unit_index': '📁 Unit Lessons Hub',
            'index_hub': '📑 Custom Index Hub'
        };
        activeArchetypeBadge.textContent = badgeMap[archetype] || 'Page Archetype';
    }

    // Highlight active archetype card
    document.querySelectorAll('.archetype-card').forEach(c => c.classList.remove('active'));
    const targetCard = document.getElementById(`arch-card-${archetype}`) || (isIndexArchetype(archetype) ? document.getElementById('arch-card-stage_index') : null);
    if (targetCard) targetCard.classList.add('active');

    // Index specific UI controls
    if (isIndexArchetype(archetype)) {
        const stageCard = document.getElementById('index-mode-stage-card');
        const unitCard = document.getElementById('index-mode-unit-card');
        
        if (state.indexType === 'unit' || archetype === 'unit_index') {
            if (stageCard) {
                stageCard.style.border = '1.5px solid var(--border-color)';
                stageCard.style.background = 'rgba(19, 27, 46, 0.6)';
                stageCard.style.boxShadow = 'none';
            }
            if (unitCard) {
                unitCard.style.border = '2px solid var(--accent-primary)';
                unitCard.style.background = 'rgba(0, 243, 255, 0.15)';
                unitCard.style.boxShadow = '0 0 16px rgba(0, 243, 255, 0.25)';
            }
            if (indexTypeBadge) {
                indexTypeBadge.textContent = '📁 Unit Lessons Hub';
                indexTypeBadge.style.background = 'var(--accent-primary)';
                indexTypeBadge.style.color = '#0b0f19';
            }
        } else {
            if (stageCard) {
                stageCard.style.border = '2px solid var(--accent-primary)';
                stageCard.style.background = 'rgba(0, 243, 255, 0.15)';
                stageCard.style.boxShadow = '0 0 16px rgba(0, 243, 255, 0.25)';
            }
            if (unitCard) {
                unitCard.style.border = '1.5px solid var(--border-color)';
                unitCard.style.background = 'rgba(19, 27, 46, 0.6)';
                unitCard.style.boxShadow = 'none';
            }
            if (indexTypeBadge) {
                indexTypeBadge.textContent = '🏫 Stage Index Hub';
                indexTypeBadge.style.background = 'var(--accent-primary)';
                indexTypeBadge.style.color = '#0b0f19';
            }
        }
    }

    if (typeof updateTargetFilePath === 'function') updateTargetFilePath();
    if (typeof updateHomeCardSnippet === 'function') updateHomeCardSnippet();
}

function switchIndexType(type) {
    if (typeof playSound === 'function') playSound('click');
    state.indexType = type;
    if (type === 'stage') {
        state.archetype = 'stage_index';
        state.indexScope = 'stage_hub';
    } else if (type === 'unit') {
        state.archetype = 'unit_index';
        state.indexScope = 'unit_hub';
    } else {
        state.archetype = 'index_hub';
        state.indexScope = 'custom';
    }

    if (typeof loadArchetypePreset === 'function') loadArchetypePreset(state.archetype);
    applyStateToUI();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof showAdminToast === 'function') showAdminToast(`✨ Switched index level to: ${type === 'stage' ? 'Stage Hub' : type === 'unit' ? 'Unit Lessons Hub' : 'Custom Index'}`);
}

function setArchetype(arch) {
    if (typeof playSound === 'function') playSound('click');
    state.archetype = arch;
    
    if (typeof StudioStore !== 'undefined') {
        StudioStore.recordSnapshot(`Switch page archetype to ${arch}`);
    }

    if (typeof loadArchetypePreset === 'function') loadArchetypePreset(arch);
    
    // Set initial pane according to archetype
    if (isIndexArchetype(arch)) {
        currentEditorPane = 'index_hub';
        currentSimTab = 'index_hub';
    } else if (arch === 'flashcards_dialogue') {
        currentEditorPane = 'flashcards';
        currentSimTab = 'flashcards';
    } else if (arch === 'quiz_only') {
        currentEditorPane = 'quiz';
        currentSimTab = 'quiz';
    } else {
        currentEditorPane = 'verbs';
        currentSimTab = 'verbs';
    }

    applyStateToUI();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    if (typeof showAdminToast === 'function') showAdminToast("✨ Template applied and editor layout updated");
}

function renderEditorNavigation() {
    const nav = document.getElementById('editorTabsBar') || document.getElementById('editorNav');
    if (!nav) return;

    let tabs = [];
    if (isIndexArchetype(state.archetype)) {
        tabs = [
            { id: 'index_hub', label: 'Index Cards & Links', icon: '🗂️' },
            { id: 'quiz', label: 'Assessment Quiz (Optional)', icon: '🏆' }
        ];
    } else if (state.archetype === 'storybook_reading') {
        tabs = [
            { id: 'story_pages', label: 'Story Pages & Scenes', icon: '📖' },
            { id: 'video_lesson', label: 'Video Lesson (YouTube)', icon: '🎥' },
            { id: 'quiz', label: 'Comprehension Quiz', icon: '🏆' }
        ];
    } else if (state.archetype === 'flashcards_dialogue') {
        tabs = [
            { id: 'flashcards', label: 'Flashcards', icon: '🎴' },
            { id: 'dialogue', label: 'Dialogue & Homework', icon: '💬' },
            { id: 'quiz', label: 'Comprehension Quiz', icon: '🏆' }
        ];
    } else if (state.archetype === 'quiz_only') {
        tabs = [
            { id: 'quiz', label: 'Questions & Options', icon: '🏆' }
        ];
    } else {
        // curriculum_tabs
        tabs = [
            { id: 'verbs', label: 'Verbs & Conjugations', icon: '⚡' },
            { id: 'definitions', label: 'Definitions & Collocations', icon: '📖' },
            { id: 'synonyms', label: 'Synonyms & Antonyms', icon: '🔄' },
            { id: 'affixes', label: 'Prefixes & Suffixes', icon: '🧩' },
            { id: 'story_pages', label: 'Reading Passage (Storybook)', icon: '📖' },
            { id: 'video_lesson', label: 'Video Lesson (YouTube)', icon: '🎥' },
            { id: 'quiz', label: 'Evaluation Quiz', icon: '🏆' }
        ];
    }

    const availableIds = tabs.map(t => t.id);
    if (!availableIds.includes(currentEditorPane)) {
        currentEditorPane = availableIds[0] || 'verbs';
    }

    nav.innerHTML = tabs.map(t => {
        const count = getTabItemCount(t.id);
        const countBadge = count > 0 ? `<span class="item-count-badge" style="background: rgba(0, 243, 255, 0.2); color: var(--accent-primary); font-size: 0.76rem; padding: 2px 7px; border-radius: 10px; margin-left: 6px; font-weight: 800;">${count}</span>` : '';
        return `
            <button type="button" class="sec-tab-btn ${currentEditorPane === t.id ? 'active' : ''}" onclick="switchEditorPane('${t.id}')">
                <span>${t.icon}</span>
                <span>${t.label}</span>
                ${countBadge}
            </button>
        `;
    }).join('');
}

function getTabItemCount(paneId) {
    if (paneId === 'verbs') return state.verbs?.length || 0;
    if (paneId === 'definitions' || paneId === 'defs') return state.definitions?.length || 0;
    if (paneId === 'synonyms') return state.synonyms?.length || 0;
    if (paneId === 'affixes') return state.affixes?.length || 0;
    if (paneId === 'flashcards') return state.flashcards?.length || 0;
    if (paneId === 'dialogue') return state.dialogueLines?.length || 0;
    if (paneId === 'story_pages') return state.storyPages?.length || 0;
    if (paneId === 'video_lesson') return state.videoUrl ? 1 : 0;
    if (paneId === 'quiz') return state.quiz?.length || 0;
    if (paneId === 'index_hub') return state.indexCards?.length || 0;
    return 0;
}

function switchEditorPane(paneId) {
    if (typeof playSound === 'function') playSound('click');
    currentEditorPane = paneId;
    currentSimTab = paneId;

    document.querySelectorAll('.editor-pane').forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });

    const targetPane = document.getElementById(`pane-${paneId}`);
    if (targetPane) {
        targetPane.style.display = 'block';
        targetPane.classList.add('active');
    }

    renderEditorNavigation();
    if (typeof setSimTab === 'function') {
        setSimTab(paneId);
    }
}

function applyStateToUI() {
    // Set UI archetype state (shows/hides appropriate metadata cards)
    setArchetypeUIState(state.archetype);

    // Bind Basic Inputs
    const titleInput = document.getElementById('lessonTitleInput');
    const descInput = document.getElementById('lessonDescInput');
    const unitInput = document.getElementById('unitInput');
    const fnInput = document.getElementById('lessonFilenameInput');
    const stageSelect = document.getElementById('stageSelect');

    if (titleInput) titleInput.value = state.title || '';
    if (descInput) descInput.value = state.description || '';
    if (unitInput) unitInput.value = state.unit || '';
    if (fnInput) fnInput.value = state.filename || 'lesson-1.html';
    if (stageSelect && typeof populateStageSelects === 'function') {
        populateStageSelects();
    }

    // Index Hub Inputs
    const idxBackLinkInput = document.getElementById('indexBackLinkInput');
    const idxBackTextInput = document.getElementById('indexBackTextInput');
    const idxLayoutSelect = document.getElementById('indexLayoutSelect');

    if (idxBackLinkInput) idxBackLinkInput.value = state.indexBackLink || '../index.html';
    if (idxBackTextInput) idxBackTextInput.value = state.indexBackText || '⬅️ Back to Main Menu';
    if (idxLayoutSelect) idxLayoutSelect.value = state.indexLayoutType || 'units';

    // Dialogue & Homework Inputs
    const diagTitleInput = document.getElementById('dialogueTitle');
    const hwTitleInput = document.getElementById('homeworkTitle');
    const hwDescInput = document.getElementById('homeworkDesc');

    if (diagTitleInput) diagTitleInput.value = state.dialogueTitle || '';
    if (hwTitleInput) hwTitleInput.value = state.homeworkTitle || '';
    if (hwDescInput) hwDescInput.value = state.homeworkDesc || '';

    // Video Lesson Inputs
    const videoUrlInput = document.getElementById('videoUrlInput');
    const videoTitleInput = document.getElementById('videoTitleInput');
    if (videoUrlInput) videoUrlInput.value = state.videoUrl || '';
    if (videoTitleInput) videoTitleInput.value = state.videoTitle || '';

    // Render Navigation and Builder Lists
    renderEditorNavigation();
    if (typeof renderAllBuilderLists === 'function') {
        renderAllBuilderLists();
    }

    // Update active pane visibility
    document.querySelectorAll('.editor-pane').forEach(p => {
        p.style.display = 'none';
        p.classList.remove('active');
    });

    const activePane = document.getElementById(`pane-${currentEditorPane}`);
    if (activePane) {
        activePane.style.display = 'block';
        activePane.classList.add('active');
    }

    if (typeof updateTargetFilePath === 'function') updateTargetFilePath();
    if (typeof updateHomeCardSnippet === 'function') updateHomeCardSnippet();
}

// ==========================================
// SYSTEM DIAGNOSTICS & DEBUGGER MODAL
// ==========================================
function openDiagnosticsModal() {
    const modal = document.getElementById('diagnosticsModal');
    if (modal) {
        modal.style.display = 'flex';
        refreshDiagnosticsPanel();
    }
    if (typeof StudioLogger !== 'undefined') {
        StudioLogger.info('Diagnostics', 'Diagnostics modal opened by teacher/developer.');
    }
}

function closeDiagnosticsModal() {
    const modal = document.getElementById('diagnosticsModal');
    if (modal) modal.style.display = 'none';
}

function refreshDiagnosticsPanel() {
    const listEl = document.getElementById('diagnosticsChecksList');
    const stateViewer = document.getElementById('diagStateViewer');

    if (stateViewer && typeof state !== 'undefined') {
        stateViewer.value = JSON.stringify(state, null, 2);
    }

    if (!listEl) return;

    if (typeof StudioLogger !== 'undefined') {
        const diag = StudioLogger.runDiagnostics();
        listEl.innerHTML = `
            <div style="font-size: 0.84rem; margin-bottom: 6px; color: ${diag.status === 'HEALTHY' ? 'var(--accent-green)' : '#f59e0b'}; font-weight: 700;">
                Overall System Health: ${diag.status}
            </div>
            ${diag.checks.map(c => `
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.82rem; background: rgba(255,255,255,0.03); padding: 4px 8px; border-radius: 6px;">
                    <span style="color: var(--text-main);">${c.passed ? '✅' : '❌'} ${c.name}</span>
                    <span style="color: var(--text-muted); font-size: 0.78rem;">${c.details || (c.passed ? 'OK' : 'Failed')}</span>
                </div>
            `).join('')}
            ${diag.warnings.map(w => `
                <div style="font-size: 0.8rem; color: #f59e0b; background: rgba(245,158,11,0.1); padding: 4px 8px; border-radius: 6px;">
                    ⚠️ ${w}
                </div>
            `).join('')}
            ${diag.errors.map(e => `
                <div style="font-size: 0.8rem; color: #f43f5e; background: rgba(244,63,94,0.1); padding: 4px 8px; border-radius: 6px;">
                    ❌ ${e}
                </div>
            `).join('')}
        `;
    }
}

function copyStateJSON() {
    const stateViewer = document.getElementById('diagStateViewer');
    if (stateViewer && stateViewer.value) {
        navigator.clipboard.writeText(stateViewer.value).then(() => {
            if (typeof showAdminToast === 'function') showAdminToast('✅ State JSON copied to clipboard!');
        }).catch(() => {
            stateViewer.select();
            document.execCommand('copy');
            if (typeof showAdminToast === 'function') showAdminToast('✅ State JSON copied!');
        });
    }
}

function downloadDebugReport() {
    if (typeof StudioLogger !== 'undefined') {
        const bundle = StudioLogger.exportDebugBundle();
        const blob = new Blob([bundle], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `lesson-studio-debug-report-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(a.href);
        if (typeof showAdminToast === 'function') showAdminToast('📥 Debug report exported successfully!');
    }
}

// ==========================================
// STUDIO LIFECYCLE & GLOBAL INITIALIZER
// ==========================================
function initAdminStudio() {
    if (typeof checkAuthStatus === 'function') checkAuthStatus();
    if (typeof populateStageSelects === 'function') populateStageSelects();
    if (typeof loadGitHubConfig === 'function') loadGitHubConfig();
    if (typeof loadCurriculumManifest === 'function') loadCurriculumManifest();

    if (sessionStorage.getItem('teacher_studio_unlocked') === 'true') {
        if (typeof loadSavedDraftOrPreset === 'function') loadSavedDraftOrPreset();
        if (typeof StudioStore !== 'undefined' && typeof StudioStore.initShortcuts === 'function') StudioStore.initShortcuts();
        if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAdminStudio);
} else {
    initAdminStudio();
}

