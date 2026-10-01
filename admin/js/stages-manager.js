/**
 * Stages & Curricula Manager Module (stages-manager.js)
 * Single Responsibility: Manages stage selection, custom educational stages, modal management, and path resolution.
 */

function populateStageSelects() {
    const stageSelect = document.getElementById('stageSelect');
    if (!stageSelect) return;

    const currentVal = state.stage || 'Prep_3';
    const customStages = typeof getCustomStages === 'function' ? getCustomStages() : [];

    let html = `
        <optgroup label="Preparatory Stage">
            <option value="Prep_3">Prep 3 (Grade 9 / Prep 3)</option>
            <option value="Prep_2">Prep 2 (Grade 8 / Prep 2)</option>
            <option value="Prep_1">Prep 1 (Grade 7 / Prep 1)</option>
        </optgroup>
        <optgroup label="Secondary Stage">
            <option value="Sec_1">Secondary 1 (Sec 1)</option>
            <option value="Sec_2">Secondary 2 (Sec 2)</option>
            <option value="Sec_3">Secondary 3 (Sec 3)</option>
        </optgroup>
        <optgroup label="Primary Stage">
            <option value="Grade_6">Primary 6 (Grade 6)</option>
            <option value="Grade_5">Primary 5 (Grade 5)</option>
            <option value="Grade_4">Primary 4 (Grade 4)</option>
            <option value="Grade_3">Primary 3 (Grade 3)</option>
            <option value="Grade_2">Primary 2 (Grade 2)</option>
            <option value="Grade_1">Primary 1 (Grade 1)</option>
        </optgroup>
        <optgroup label="General & Foundation Hubs">
            <option value="Course">English Course Hub</option>
            <option value="Grammar">Grammar Hub</option>
            <option value="Phonics">Phonics & Foundation</option>
            <option value="Kindergarten">Kindergarten Hub</option>
            <option value="General_English">General English</option>
        </optgroup>
    `;

    if (customStages.length > 0) {
        html += `<optgroup label="✨ Custom Stages Added">`;
        customStages.forEach(cs => {
            html += `<option value="${escapeHTML(cs.slug)}">${escapeHTML(cs.icon || '🏫')} ${escapeHTML(cs.name)} (${escapeHTML(cs.slug)})</option>`;
        });
        html += `</optgroup>`;
    }

    html += `
        <optgroup label="Custom Option">
            <option value="__custom__">➕ Type custom stage name manually...</option>
        </optgroup>
    `;

    stageSelect.innerHTML = html;
    stageSelect.value = currentVal;
}

function openStagesManagerModal() {
    if (typeof playSound === 'function') playSound('click');
    const modal = document.getElementById('stagesManagerModal');
    if (modal) {
        modal.style.display = 'flex';
        renderStagesManagerList();
    }
}

function closeStagesManagerModal() {
    if (typeof playSound === 'function') playSound('click');
    const modal = document.getElementById('stagesManagerModal');
    if (modal) modal.style.display = 'none';
}

function renderStagesManagerList() {
    const listEl = document.getElementById('customStagesListTable') || document.getElementById('customStagesListContainer');
    if (!listEl) return;

    const customStages = typeof getCustomStages === 'function' ? getCustomStages() : [];

    if (customStages.length === 0) {
        listEl.innerHTML = `
            <div style="text-align: center; padding: 24px; color: var(--text-muted); background: rgba(19, 27, 46, 0.5); border-radius: 12px; border: 1px dashed var(--border-color);">
                🏫 No custom stages added yet. You can add a new stage or course using the form above.
            </div>
        `;
        return;
    }

    listEl.innerHTML = customStages.map(s => `
        <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(19, 27, 46, 0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 12px 16px; margin-bottom: 8px;">
            <div style="display: flex; align-items: center; gap: 12px;">
                <span style="font-size: 1.8rem; background: rgba(255,255,255,0.05); border-radius: 10px; width: 44px; height: 44px; display: inline-flex; align-items: center; justify-content: center;">${escapeHTML(s.icon || '🏫')}</span>
                <div>
                    <div style="font-weight: bold; color: var(--text-main); font-size: 1rem;">${escapeHTML(s.name)}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted); font-family: monospace; direction: ltr; text-align: left; margin-top: 2px;">
                        <span style="background: rgba(0, 243, 255, 0.1); color: var(--accent-primary); padding: 2px 6px; border-radius: 4px;">${escapeHTML(s.category || 'Custom')}</span>
                        Folder: ${escapeHTML(s.slug)}
                    </div>
                </div>
            </div>
            <div class="d-flex gap-xs items-center">
                <button type="button" onclick="scaffoldNewStageIndexFromModal('${escapeHTML(s.slug)}', '${escapeHTML(s.name)}')" class="action-btn secondary" style="padding: 6px 12px; font-size: 0.82rem; color: var(--accent-green); border-color: var(--accent-green);">
                    🪄 Scaffold Index
                </button>
                <button type="button" onclick="selectStageFromModal('${escapeHTML(s.slug)}')" class="action-btn" style="padding: 6px 12px; font-size: 0.82rem;">
                    🎯 Select
                </button>
                <button type="button" onclick="deleteCustomStageFromModal('${escapeHTML(s.slug)}')" class="btn-delete-item" style="padding: 6px 10px; font-size: 0.82rem;">
                    🗑️
                </button>
            </div>
        </div>
    `).join('');
}

function addNewCustomStageFromModal() {
    const nameInput = document.getElementById('newStageNameInput') || document.getElementById('newStageLabelInput');
    const slugInput = document.getElementById('newStageSlugInput') || document.getElementById('newStageKeyInput');
    const catInput = document.getElementById('newStageCategorySelect');
    const iconInput = document.getElementById('newStageIconInput');

    const name = (nameInput?.value || '').trim();
    let slug = (slugInput?.value || '').trim().replace(/\s+/g, '_');
    const cat = catInput?.value || 'Custom';
    const icon = (iconInput?.value || '🏫').trim();

    if (!name) {
        showAdminToast("Please enter a stage or section name.", false);
        return;
    }

    if (!slug) {
        slug = name.replace(/[\s\W]+/g, '_');
    }

    const stageObj = {
        slug: slug,
        name: name,
        category: cat,
        icon: icon
    };

    saveCustomStage(stageObj);
    if (nameInput) nameInput.value = '';
    if (slugInput) slugInput.value = '';
    
    renderStagesManagerList();
    showAdminToast(`✅ Stage (${name}) added and registered successfully!`);
    if (typeof playCorrectFX === 'function') playCorrectFX();
}

function saveCustomStageItem() {
    addNewCustomStageFromModal();
}

function selectStageFromModal(slug) {
    if (typeof playSound === 'function') playSound('click');
    state.stage = slug;
    populateStageSelects();
    if (typeof applyStateToUI === 'function') applyStateToUI();
    closeStagesManagerModal();
    showAdminToast(`🎯 Selected Stage: ${getStageDisplayName(slug)}`);
}

function deleteCustomStageFromModal(slug) {
    if (typeof playSound === 'function') playSound('click');
    deleteCustomStage(slug);
    renderStagesManagerList();
    showAdminToast("🗑️ Custom stage deleted.");
}

function scaffoldNewStageIndexFromModal(slug, name) {
    if (typeof playSound === 'function') playSound('click');
    state.stage = slug;
    state.unit = '';
    state.filename = 'index.html';
    state.title = `📚 ${name}`;
    state.description = 'Select a unit to explore lessons, flashcards, and interactive quizzes.';
    state.archetype = 'stage_index';
    state.indexType = 'stage';
    state.indexScope = 'stage_hub';
    state.indexLayoutType = 'units';
    state.indexBackLink = '../index.html';
    state.indexBackText = '⬅️ Back to Main Menu';

    const icons = ['📘', '📗', '📙', '📕', '📓', '📔'];
    state.indexCards = [];
    for (let i = 1; i <= 6; i++) {
        state.indexCards.push({
            title: `Unit ${i}`,
            subtitle: `Unit ${i} Lessons & Revision`,
            icon: icons[i - 1] || '📘',
            destType: 'sub_unit_folder',
            link: `./unit-${i}/index.html`,
            status: i === 1 ? 'active' : 'locked',
            tag: i === 1 ? '🎯 Available' : '🔒 Upcoming'
        });
    }

    populateStageSelects();
    if (typeof applyStateToUI === 'function') applyStateToUI();
    closeStagesManagerModal();
    showAdminToast(`🪄 New Stage Index initialized (${slug}/index.html) and ready for publishing!`);
    if (typeof playCorrectFX === 'function') playCorrectFX();
}

function handleStageSelectChange() {
    const sel = document.getElementById('stageSelect');
    const customContainer = document.getElementById('customStageContainer');
    const customInput = document.getElementById('customStageInput');
    const stageBadgeInfo = document.getElementById('stageBadgeInfo');
    
    if (!sel) return;

    if (sel.value === '__custom__') {
        if (customContainer) customContainer.style.display = 'block';
        if (customInput) {
            customInput.focus();
            state.stage = customInput.value.trim() || 'Custom_Stage';
        }
    } else {
        if (customContainer) customContainer.style.display = 'none';
        state.stage = sel.value;
    }
    
    if (stageBadgeInfo) stageBadgeInfo.textContent = state.stage || 'Platform Root';
    updateTargetFilePath();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function handleCustomStageInput(val) {
    state.stage = (val || '').trim().replace(/\s+/g, '_');
    const stageBadgeInfo = document.getElementById('stageBadgeInfo');
    if (stageBadgeInfo) stageBadgeInfo.textContent = state.stage || 'Custom';
    updateTargetFilePath();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function setUnitQuick(unitName) {
    if (typeof playSound === 'function') playSound('click');
    const unitEl = document.getElementById('unitInput');
    if (unitEl) unitEl.value = unitName;
    state.unit = unitName;
    updateTargetFilePath();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function setFilenameQuick(fname) {
    if (typeof playSound === 'function') playSound('click');
    const fnameEl = document.getElementById('lessonFilenameInput');
    if (fnameEl) fnameEl.value = fname;
    state.filename = fname;
    updateTargetFilePath();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function autoFillStageMetadata() {
    handleStageSelectChange();
}

function updateTargetFilePath() {
    const targetPathEl = document.getElementById('ghTargetFilePath');
    const stage = (state.stage || '').trim();
    const unit = (state.unit || '').trim().replace(/\s+/g, '-');
    const fname = (state.filename || 'lesson.html').trim();

    let fullPath = 'Learn_English';
    if (stage) fullPath += `/${stage}`;
    if (unit) fullPath += `/${unit}`;
    fullPath += `/${fname}`;

    if (targetPathEl) targetPathEl.value = fullPath;
}

function updateHomeCardSnippet() {
    const snippetEl = document.getElementById('homeCardSnippet');
    if (!snippetEl) return;
    const stage = state.stage || 'My_Stage';
    const title = state.title || stage;
    const desc = state.description || 'Select a unit to start lessons and tests.';

    const snippet = `<a href="./${stage}/index.html" class="stage-card" data-sound-click="click">
    <div class="stage-icon">📚</div>
    <div class="stage-info">
        <h3 class="stage-name">${title}</h3>
        <p class="stage-desc">${desc}</p>
    </div>
    <span class="arrow-icon">⬅️</span>
</a>`;

    snippetEl.textContent = snippet;
}

function copyHomeCardSnippet() {
    const snippetEl = document.getElementById('homeCardSnippet');
    if (!snippetEl) return;
    navigator.clipboard.writeText(snippetEl.textContent).then(() => {
        if (typeof playSound === 'function') playSound('success');
        showAdminToast("📋 Stage card snippet copied successfully!");
    });
}

