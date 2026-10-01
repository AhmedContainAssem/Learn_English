/**
 * Index Hub & Navigation Cards Builder Module (index-hub-builder.js)
 * Single Responsibility: Manages stage/unit index hubs, smart destination router assistant, and structural presets.
 */

function handleIndexScopeChange(scope) {
    state.indexScope = scope;
    const hintEl = document.getElementById('indexScopeHint');
    const filenameEl = document.getElementById('lessonFilenameInput');
    const unitEl = document.getElementById('unitInput');

    if (scope === 'stage_hub') {
        state.indexLayoutType = 'units';
        state.indexBackLink = '../index.html';
        state.indexBackText = '⬅️ Back to Main Menu';
        state.unit = '';
        state.filename = 'index.html';
        if (hintEl) hintEl.innerHTML = '💡 <strong>Stage Index Hub:</strong> Connects students to units in this stage (e.g. <code>./unit-1/index.html</code>). Back button returns to <code>../index.html</code>.';
    } else if (scope === 'unit_hub') {
        state.indexLayoutType = 'lessons';
        state.indexBackLink = '../index.html';
        state.indexBackText = '⬅️ Back to Stage Units';
        if (!state.unit) state.unit = 'unit-1';
        state.filename = 'index.html';
        if (hintEl) hintEl.innerHTML = '💡 <strong>Unit Index Hub:</strong> Connects students to lesson files in this unit (e.g. <code>./lesson-1-part-1.html</code>). Back button returns to <code>../index.html</code>.';
    } else if (scope === 'root_hub') {
        state.indexLayoutType = 'units';
        state.indexBackLink = '';
        state.indexBackText = '';
        state.stage = '';
        state.unit = '';
        state.filename = 'index.html';
        if (hintEl) hintEl.innerHTML = '💡 <strong>Platform Root Index:</strong> Connects students to stages and foundation courses (e.g. <code>./Prep_3/index.html</code>).';
    } else {
        if (hintEl) hintEl.innerHTML = '💡 <strong>Custom Routing:</strong> Specify custom links, backpaths, and structures.';
    }

    if (filenameEl) filenameEl.value = state.filename;
    if (unitEl) unitEl.value = state.unit;
    if (document.getElementById('indexBackLinkInput')) document.getElementById('indexBackLinkInput').value = state.indexBackLink;
    if (document.getElementById('indexBackTextInput')) document.getElementById('indexBackTextInput').value = state.indexBackText;
    if (document.getElementById('indexLayoutSelect')) document.getElementById('indexLayoutSelect').value = state.indexLayoutType;

    if (typeof updateTargetFilePath === 'function') updateTargetFilePath();
    if (typeof updateHomeCardSnippet === 'function') updateHomeCardSnippet();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    if (typeof showAdminToast === 'function') showAdminToast(`✨ Index Scope set to: (${scope})`);
}

function detectCardDestType(link) {
    const l = (link || '').trim();
    if (!l) return 'same_folder_lesson';
    if (l.startsWith('./unit-') || (l.includes('/') && l.endsWith('/index.html') && !l.startsWith('../'))) {
        return 'sub_unit_folder';
    }
    if (l.startsWith('../') || l.includes('Prep_') || l.includes('Sec_') || l.includes('Grade_') || l.includes('Course')) {
        return 'other_stage';
    }
    if (l.startsWith('./') && !l.slice(2).includes('/')) {
        return 'same_folder_lesson';
    }
    return 'custom_url';
}

function getCardRouteExplanation(link) {
    const l = (link || '').trim();
    if (!l) return '⚠️ No destination link specified yet.';

    if (l.startsWith('./unit-')) {
        const parts = l.replace('./', '').split('/');
        const unitName = parts[0] || 'unit';
        const fileName = parts[1] || 'index.html';
        return `📍 <strong>Smart Sub-folder:</strong> Navigates to folder <code>${escapeHTML(unitName)}</code> and opens <code>${escapeHTML(fileName)}</code>.`;
    }
    if (l.startsWith('./') && !l.slice(2).includes('/')) {
        const fileName = l.replace('./', '');
        return `📍 <strong>Same Folder File:</strong> Opens lesson file <code>${escapeHTML(fileName)}</code> directly in the current directory.`;
    }
    if (l.startsWith('../')) {
        return `📍 <strong>Parent Folder / External Stage:</strong> Steps back one level and opens <code>${escapeHTML(l)}</code>.`;
    }
    return `📍 <strong>Custom Target:</strong> Navigates to specified link <code>${escapeHTML(l)}</code>.`;
}

function toggleIndexCardStatus(idx) {
    if (typeof playSound === 'function') playSound('click');
    if (!state.indexCards[idx]) return;
    const current = state.indexCards[idx].status;
    const nextStatus = current === 'active' ? 'locked' : 'active';
    state.indexCards[idx].status = nextStatus;
    state.indexCards[idx].tag = nextStatus === 'active' ? '🎯 Available' : '🔒 Coming Soon';
    renderIndexCardsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    if (typeof showAdminToast === 'function') showAdminToast(nextStatus === 'active' ? '🟢 Card is now Available for students' : '🔒 Card is now Locked (Coming Soon)');
}

function renderIndexCardsList() {
    const list = document.getElementById('indexCardsList');
    if (!list) return;
    list.innerHTML = '';

    if (!state.indexCards || state.indexCards.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 24px; color: var(--text-muted); background: rgba(11, 15, 25, 0.5); border-radius: 12px; border: 1px dashed rgba(0, 243, 255, 0.2);">
                <div style="font-size: 2rem; margin-bottom: 8px;">📭</div>
                <div>No index cards created yet. Click "Add New Index Card" or use a quick preset above.</div>
            </div>
        `;
        return;
    }

    state.indexCards.forEach((card, idx) => {
        const destType = card.destType || detectCardDestType(card.link);
        const explanation = getCardRouteExplanation(card.link);
        const isActive = card.status === 'active';

        const item = document.createElement('div');
        item.className = 'index-card-item';
        item.innerHTML = `
            <div class="card-header-bar">
                <div class="card-header-info">
                    <span class="item-badge">${idx + 1}</span>
                    <span class="card-title-preview">Card: ${escapeHTML(card.title || 'Untitled Card')}</span>
                    <button type="button" class="status-pill-toggle ${isActive ? 'status-active' : 'status-locked'}" onclick="toggleIndexCardStatus(${idx})" title="Click to toggle availability">
                        ${isActive ? '🟢 Available' : '🔒 Locked (Coming Soon)'}
                    </button>
                </div>
                <div class="card-actions-group">
                    <button type="button" class="card-action-btn card-move-btn" onclick="moveIndexCardItem(${idx}, -1)" ${idx === 0 ? 'disabled' : ''} title="Move Up">⬆️</button>
                    <button type="button" class="card-action-btn card-move-btn" onclick="moveIndexCardItem(${idx}, 1)" ${idx === state.indexCards.length - 1 ? 'disabled' : ''} title="Move Down">⬇️</button>
                    <button type="button" class="card-action-btn card-duplicate-btn" onclick="duplicateIndexCardItem(${idx})" title="Duplicate Card">📋 Duplicate</button>
                    <button type="button" class="btn-delete-item" onclick="deleteIndexCardItem(${idx})" title="Delete Card">🗑️ Delete</button>
                </div>
            </div>

            <div class="form-grid">
                <div class="form-group" style="grid-column: span 1;">
                    <label class="form-label">Icon / Emoji:</label>
                    <div class="d-flex gap-sm items-center">
                        <span id="card-emoji-badge-${idx}" class="emoji-large-badge">${card.icon || '📘'}</span>
                        <input type="text" class="form-input" style="font-size: 1.1rem; text-align: center; max-width: 90px;" value="${escapeHTML(card.icon || '📘')}" placeholder="📘" oninput="handleCardEmojiInput(${idx}, this.value)">
                    </div>
                </div>

                <div class="form-group">
                    <label class="form-label">Card Title:</label>
                    <input type="text" class="form-input" value="${escapeHTML(card.title || '')}" placeholder="e.g. Unit 1 or Lesson 1 (Part 1)" oninput="state.indexCards[${idx}].title = this.value; triggerLiveUpdate(); saveDraft();">
                </div>

                <div class="form-group">
                    <label class="form-label">Subtitle / Description:</label>
                    <input type="text" class="form-input" value="${escapeHTML(card.subtitle || '')}" placeholder="e.g. Core Vocabulary & Practice" oninput="state.indexCards[${idx}].subtitle = this.value; triggerLiveUpdate(); saveDraft();">
                </div>

                <div class="form-group">
                    <label class="form-label">Card Status:</label>
                    <select class="form-select" onchange="state.indexCards[${idx}].status = this.value; state.indexCards[${idx}].tag = (this.value === 'active' ? '🎯 Available' : '🔒 Coming Soon'); renderIndexCardsList(); triggerLiveUpdate(); saveDraft();">
                        <option value="active" ${card.status === 'active' ? 'selected' : ''}>🟢 Active Link (Available)</option>
                        <option value="locked" ${card.status === 'locked' ? 'selected' : ''}>🔒 Locked Placeholder (Coming Soon)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label class="form-label">Displayed Tag Badge:</label>
                    <input type="text" class="form-input" value="${escapeHTML(card.tag || (card.status === 'active' ? '🎯 Available' : '🔒 Coming Soon'))}" placeholder="e.g. 🎯 Available or 🔒 Coming Soon" oninput="state.indexCards[${idx}].tag = this.value; triggerLiveUpdate(); saveDraft();">
                </div>

                <!-- Smart Target Destination Assistant -->
                <div class="destination-assistant-box">
                    <label class="form-label" style="color: var(--accent-primary); font-weight: 800; font-size: 0.95rem; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center;">
                        <span>🎯 Smart Target Destination Assistant:</span>
                        <span style="font-size: 0.78rem; color: var(--text-muted); font-weight: normal;">Route Selector</span>
                    </label>

                    <!-- Type Pills -->
                    <div class="dest-types-bar">
                        <span class="dest-type-pill ${destType === 'same_folder_lesson' ? 'active' : ''}" onclick="setCardDestType(${idx}, 'same_folder_lesson')">📄 Same Folder File</span>
                        <span class="dest-type-pill ${destType === 'sub_unit_folder' ? 'active' : ''}" onclick="setCardDestType(${idx}, 'sub_unit_folder')">📁 Sub-Unit Folder (unit-X)</span>
                        <span class="dest-type-pill ${destType === 'other_stage' ? 'active' : ''}" onclick="setCardDestType(${idx}, 'other_stage')">🏫 Other Stage / Hub</span>
                        <span class="dest-type-pill ${destType === 'custom_url' ? 'active' : ''}" onclick="setCardDestType(${idx}, 'custom_url')">🔗 Custom URL</span>
                    </div>

                    <!-- Dynamic Controls based on Dest Type -->
                    ${renderCardDestControls(idx, card, destType)}

                    <!-- Route Explanation Badge -->
                    <div class="route-preview-badge">
                        ${explanation}
                    </div>
                </div>
            </div>
        `;
        list.appendChild(item);
    });
}

function renderCardDestControls(idx, card, destType) {
    if (destType === 'same_folder_lesson') {
        const rawFile = (card.link || '').replace(/^\.\//, '');
        return `
            <div style="margin-top: 8px;">
                <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Target Lesson File Name:</label>
                <input type="text" class="form-input" style="font-family: monospace; direction: ltr; text-align: left;" value="${escapeHTML(rawFile || 'lesson-1.html')}" placeholder="lesson-1.html" oninput="updateCardLinkDirect(${idx}, './' + this.value.trim())">
                <div class="path-chips-container" style="margin-top: 6px;">
                    <span class="path-chip" onclick="updateCardLinkDirect(${idx}, './lesson-1-part-1.html')">lesson-1-part-1.html</span>
                    <span class="path-chip" onclick="updateCardLinkDirect(${idx}, './lesson-1-part-2.html')">lesson-1-part-2.html</span>
                    <span class="path-chip" onclick="updateCardLinkDirect(${idx}, './lesson-2.html')">lesson-2.html</span>
                    <span class="path-chip" onclick="updateCardLinkDirect(${idx}, './lesson-3.html')">lesson-3.html</span>
                    <span class="path-chip" onclick="updateCardLinkDirect(${idx}, './quiz.html')">quiz.html</span>
                    <span class="path-chip" onclick="updateCardLinkDirect(${idx}, './session-1.html')">session-1.html</span>
                    <span class="path-chip" onclick="updateCardLinkDirect(${idx}, './session-2.html')">session-2.html</span>
                </div>
            </div>
        `;
    } else if (destType === 'sub_unit_folder') {
        let curUnit = 'unit-1';
        let curFile = 'index.html';
        if (card.link && card.link.startsWith('./')) {
            const parts = card.link.replace('./', '').split('/');
            if (parts[0]) curUnit = parts[0];
            if (parts[1]) curFile = parts[1];
        }
        return `
            <div style="margin-top: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div>
                    <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Unit Folder Name:</label>
                    <input type="text" class="form-input" style="font-family: monospace; direction: ltr; text-align: left;" value="${escapeHTML(curUnit)}" placeholder="unit-1" oninput="updateCardSubUnitLink(${idx}, this.value, '${curFile}')">
                    <div class="path-chips-container" style="margin-top: 6px;">
                        <span class="path-chip" onclick="updateCardSubUnitLink(${idx}, 'unit-1', '${curFile}')">unit-1</span>
                        <span class="path-chip" onclick="updateCardSubUnitLink(${idx}, 'unit-2', '${curFile}')">unit-2</span>
                        <span class="path-chip" onclick="updateCardSubUnitLink(${idx}, 'unit-3', '${curFile}')">unit-3</span>
                        <span class="path-chip" onclick="updateCardSubUnitLink(${idx}, 'unit-4', '${curFile}')">unit-4</span>
                        <span class="path-chip" onclick="updateCardSubUnitLink(${idx}, 'unit-5', '${curFile}')">unit-5</span>
                        <span class="path-chip" onclick="updateCardSubUnitLink(${idx}, 'unit-6', '${curFile}')">unit-6</span>
                    </div>
                </div>
                <div>
                    <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Target File within Unit:</label>
                    <input type="text" class="form-input" style="font-family: monospace; direction: ltr; text-align: left;" value="${escapeHTML(curFile)}" placeholder="index.html" oninput="updateCardSubUnitLink(${idx}, '${curUnit}', this.value)">
                    <div class="path-chips-container" style="margin-top: 6px;">
                        <span class="path-chip" onclick="updateCardSubUnitLink(${idx}, '${curUnit}', 'index.html')">index.html (Unit Hub)</span>
                        <span class="path-chip" onclick="updateCardSubUnitLink(${idx}, '${curUnit}', 'lesson-1.html')">lesson-1.html</span>
                    </div>
                </div>
            </div>
        `;
    } else if (destType === 'other_stage') {
        let curStage = 'Prep_3';
        let curFile = 'index.html';
        if (card.link) {
            const clean = card.link.replace(/^(\.\.\/|\.\/)/, '');
            const parts = clean.split('/');
            if (parts[0]) curStage = parts[0];
            if (parts[1]) curFile = parts[1];
        }
        return `
            <div style="margin-top: 8px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div>
                    <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Stage / Course Name:</label>
                    <input type="text" class="form-input" style="font-family: monospace; direction: ltr; text-align: left;" value="${escapeHTML(curStage)}" placeholder="Prep_3 or Sec_1 or Course" oninput="updateCardStageLink(${idx}, this.value, '${curFile}')">
                    <div class="path-chips-container" style="margin-top: 6px;">
                        <span class="path-chip" onclick="updateCardStageLink(${idx}, 'Prep_3', '${curFile}')">Prep_3</span>
                        <span class="path-chip" onclick="updateCardStageLink(${idx}, 'Prep_2', '${curFile}')">Prep_2</span>
                        <span class="path-chip" onclick="updateCardStageLink(${idx}, 'Sec_1', '${curFile}')">Sec_1</span>
                        <span class="path-chip" onclick="updateCardStageLink(${idx}, 'Sec_2', '${curFile}')">Sec_2</span>
                        <span class="path-chip" onclick="updateCardStageLink(${idx}, 'Grade_4', '${curFile}')">Grade_4</span>
                        <span class="path-chip" onclick="updateCardStageLink(${idx}, 'Course', '${curFile}')">Course</span>
                    </div>
                </div>
                <div>
                    <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Target File:</label>
                    <input type="text" class="form-input" style="font-family: monospace; direction: ltr; text-align: left;" value="${escapeHTML(curFile)}" placeholder="index.html" oninput="updateCardStageLink(${idx}, '${curStage}', this.value)">
                </div>
            </div>
        `;
    } else {
        return `
            <div style="margin-top: 8px;">
                <label style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 4px;">Custom Relative or External URL:</label>
                <input type="text" class="form-input" style="font-family: monospace; direction: ltr; text-align: left;" value="${escapeHTML(card.link || '')}" placeholder="e.g. ./unit-1/index.html or https://example.com" oninput="updateCardLinkDirect(${idx}, this.value)">
            </div>
        `;
    }
}

function setCardDestType(idx, type) {
    if (typeof playSound === 'function') playSound('click');
    state.indexCards[idx].destType = type;

    if (type === 'same_folder_lesson') {
        state.indexCards[idx].link = './lesson-1.html';
    } else if (type === 'sub_unit_folder') {
        state.indexCards[idx].link = `./unit-${idx + 1}/index.html`;
    } else if (type === 'other_stage') {
        state.indexCards[idx].link = '../Prep_3/index.html';
    }

    renderIndexCardsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function updateCardLinkDirect(idx, linkVal) {
    state.indexCards[idx].link = (linkVal || '').trim();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    const badges = document.querySelectorAll('.route-preview-badge');
    if (badges[idx]) {
        badges[idx].innerHTML = getCardRouteExplanation(state.indexCards[idx].link);
    }
}

function updateCardSubUnitLink(idx, unitName, fileName) {
    const u = (unitName || 'unit-1').trim();
    const f = (fileName || 'index.html').trim();
    state.indexCards[idx].link = `./${u}/${f}`;
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    renderIndexCardsList();
}

function updateCardStageLink(idx, stageName, fileName) {
    const s = (stageName || 'Prep_3').trim();
    const f = (fileName || 'index.html').trim();
    state.indexCards[idx].link = `../${s}/${f}`;
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    renderIndexCardsList();
}

function handleCardEmojiInput(idx, val) {
    const cleanVal = (val || '').trim();
    state.indexCards[idx].icon = cleanVal || '📘';
    const badge = document.getElementById(`card-emoji-badge-${idx}`);
    if (badge) badge.textContent = cleanVal || '📘';
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function addIndexCardItem() {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Add Index Card');
    if (typeof playSound === 'function') playSound('click');
    if (!state.indexCards) state.indexCards = [];
    const count = state.indexCards.length + 1;
    
    let defLink = `./unit-${count}/index.html`;
    let defType = 'sub_unit_folder';
    if (state.indexScope === 'unit_hub') {
        defLink = `./lesson-${count}.html`;
        defType = 'same_folder_lesson';
    }

    state.indexCards.push({
        title: state.indexScope === 'unit_hub' ? `Lesson ${count}` : `Unit ${count}`,
        subtitle: state.indexScope === 'unit_hub' ? `Core lesson concepts` : `Unit overview and lessons`,
        icon: '📘',
        destType: defType,
        link: defLink,
        status: count === 1 ? 'active' : 'locked',
        tag: count === 1 ? '🎯 Available' : '🔒 Coming Soon'
    });
    renderIndexCardsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    if (typeof showAdminToast === 'function') showAdminToast("➕ Added new index card with Smart Link Assistant");
    if (typeof scrollToNewItem === 'function') {
        scrollToNewItem('indexCardsList');
    }
}

function deleteIndexCardItem(idx) {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Delete Index Card');
    if (typeof playSound === 'function') playSound('click');
    state.indexCards.splice(idx, 1);
    renderIndexCardsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function moveIndexCardItem(idx, dir) {
    if (typeof playSound === 'function') playSound('click');
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= state.indexCards.length) return;
    const temp = state.indexCards[idx];
    state.indexCards[idx] = state.indexCards[targetIdx];
    state.indexCards[targetIdx] = temp;
    renderIndexCardsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function duplicateIndexCardItem(idx) {
    if (typeof playSound === 'function') playSound('click');
    const source = state.indexCards[idx];
    if (!source) return;
    const clone = JSON.parse(JSON.stringify(source));
    clone.title += ' (Copy)';
    state.indexCards.splice(idx + 1, 0, clone);
    renderIndexCardsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    if (typeof showAdminToast === 'function') showAdminToast("📋 Index card duplicated");
}

function generateSixUnitsPreset() {
    if (typeof playSound === 'function') playSound('click');
    state.archetype = 'stage_index';
    state.indexType = 'stage';
    state.indexScope = 'stage_hub';
    state.unit = '';
    state.filename = 'index.html';
    state.title = `📚 ${getStageDisplayName(state.stage)}`;
    state.description = 'Select a unit to explore lessons, flashcards, and quizzes';
    state.indexLayoutType = 'units';
    state.indexBackLink = '../index.html';
    state.indexBackText = '⬅️ Back to Main Menu';

    const icons = ['📘', '📗', '📙', '📕', '📓', '📔'];
    state.indexCards = [];
    for (let i = 1; i <= 6; i++) {
        state.indexCards.push({
            title: `Unit ${i}`,
            subtitle: `Stage curriculum unit ${i}`,
            icon: icons[(i - 1) % icons.length],
            destType: 'sub_unit_folder',
            link: `./unit-${i}/index.html`,
            status: i === 1 ? 'active' : 'locked',
            tag: i === 1 ? '🎯 Available' : '🔒 Coming Soon'
        });
    }
    if (typeof applyStateToUI === 'function') applyStateToUI();
    if (typeof showAdminToast === 'function') showAdminToast("🪄 6 standard stage units generated");
}

function generateLessonsPreset() {
    if (typeof playSound === 'function') playSound('click');
    state.archetype = 'unit_index';
    state.indexType = 'unit';
    state.indexScope = 'unit_hub';
    state.unit = state.unit || 'unit-1';
    state.filename = 'index.html';
    state.title = `📘 ${state.stage || 'Prep 3'} - ${state.unit || 'Unit 1'}`;
    state.description = 'Select a lesson to begin interactive exercises and tasks';
    state.indexLayoutType = 'lessons';
    state.indexBackLink = '../index.html';
    state.indexBackText = `⬅️ Back to ${getStageDisplayName(state.stage)} Units`;

    state.indexCards = [
        { title: 'Lesson 1 (Part 1)', subtitle: 'Key vocabulary, definitions & flashcards', icon: '📖', destType: 'same_folder_lesson', link: './lesson-1-part-1.html', status: 'active', tag: '🎯 Available' },
        { title: 'Lesson 1 (Part 2)', subtitle: 'Verbs table, prefixes/suffixes & quiz', icon: '📝', destType: 'same_folder_lesson', link: './lesson-1-part-2.html', status: 'active', tag: '🎯 Available' },
        { title: 'Lesson 2 (Grammar)', subtitle: 'Grammar structures and exercises', icon: '💡', destType: 'same_folder_lesson', link: './lesson-2.html', status: 'active', tag: '🎯 Available' },
        { title: 'Unit Assessment Quiz', subtitle: 'Comprehensive unit evaluation test', icon: '🏆', destType: 'same_folder_lesson', link: './quiz.html', status: 'active', tag: '🎯 Available' }
    ];
    if (typeof applyStateToUI === 'function') applyStateToUI();
    if (typeof showAdminToast === 'function') showAdminToast("🪄 Standard unit lesson cards generated");
}

function generateCoursesPreset() {
    if (typeof playSound === 'function') playSound('click');
    state.indexLayoutType = 'courses';
    state.indexCards = [
        { title: 'Session 1: Foundations & Greetings', subtitle: 'Everyday speaking essentials & greetings', icon: '👋', destType: 'same_folder_lesson', link: './session-1.html', status: 'active', tag: '🎯 Available' },
        { title: 'Session 2: Jobs & Daily Expressions', subtitle: 'Workplace vocabulary & conversational idioms', icon: '💼', destType: 'same_folder_lesson', link: './session-2.html', status: 'active', tag: '🎯 Available' },
        { title: 'Session 3: Travel & Shopping', subtitle: 'Travel inquiries, ordering, & shopping', icon: '✈️', destType: 'same_folder_lesson', link: './session-3.html', status: 'locked', tag: '🔒 Coming Soon' },
        { title: 'Session 4: Fluency & Dialogue Mastery', subtitle: 'Advanced discourse & speech flow', icon: '🗣️', destType: 'same_folder_lesson', link: './session-4.html', status: 'locked', tag: '🔒 Coming Soon' }
    ];
    if (typeof applyStateToUI === 'function') applyStateToUI();
    if (typeof showAdminToast === 'function') showAdminToast("🪄 Conversation course sessions generated");
}

