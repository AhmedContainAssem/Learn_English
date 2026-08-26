/**
 * Educational Items & Quiz Builder Module (items-builder.js)
 * Single Responsibility: Manages dynamic form builders for verbs, definitions, synonyms, affixes, flashcards, dialogues, and quiz questions.
 */

function scrollToNewItem(containerId) {
    setTimeout(() => {
        const list = document.getElementById(containerId);
        if (list && list.lastElementChild) {
            list.lastElementChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            const firstInput = list.lastElementChild.querySelector('input:not([type="radio"]):not([type="checkbox"])');
            if (firstInput) {
                firstInput.focus();
            }
        }
    }, 50);
}

function renderAllBuilderLists() {
    renderVerbsList();
    renderDefsList();
    renderSynonymsList();
    renderAffixesList();
    renderFlashcardsList();
    renderDialogueLinesList();
    renderStoryPagesList();
    renderQuizQuestionsList();
    if (typeof renderIndexCardsList === 'function') renderIndexCardsList();
}

// 1. Verbs
function renderVerbsList() {
    const list = document.getElementById('verbsList');
    if (!list) return;
    list.innerHTML = '';
    state.verbs.forEach((v, idx) => {
        const el = document.createElement('div');
        el.className = 'item-card-builder';
        el.innerHTML = `
            <div class="item-header">
                <span class="item-badge">Verb #${idx + 1}</span>
                <div class="d-flex gap-xs items-center">
                    <button type="button" onclick="speakText('${(v.word || '').replace(/'/g, "\\'")}')" class="action-btn secondary" class="action-btn secondary btn-listen">🔊 Listen</button>
                    <button type="button" onclick="removeVerbItem(${idx})" class="btn-delete-item">🗑️ Delete</button>
                </div>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Infinitive (Base Form):</label>
                    <input type="text" class="form-input" placeholder="e.g. build" value="${v.word || ''}" oninput="state.verbs[${idx}].word = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group">
                    <label class="form-label">Arabic Meaning:</label>
                    <input type="text" class="form-input" placeholder="e.g. يبني" value="${v.meaning || ''}" oninput="state.verbs[${idx}].meaning = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group">
                    <label class="form-label">Past / Past Participle (Forms):</label>
                    <input type="text" class="form-input" placeholder="e.g. built / built" value="${v.forms || ''}" oninput="state.verbs[${idx}].forms = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
            </div>
        `;
        list.appendChild(el);
    });
}

function addVerbItem() {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Add Verb');
    if (typeof playSound === 'function') playSound('click');
    state.verbs.push({ word: '', meaning: '', forms: '', tag: 'Present' });
    renderVerbsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    scrollToNewItem('verbsList');
}

function removeVerbItem(idx) {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Delete Verb');
    if (typeof playSound === 'function') playSound('click');
    state.verbs.splice(idx, 1);
    renderVerbsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

// 2. Definitions & Collocations
function renderDefsList() {
    const list = document.getElementById('defsList');
    if (!list) return;
    list.innerHTML = '';
    state.definitions.forEach((d, idx) => {
        const el = document.createElement('div');
        el.className = 'item-card-builder';
        el.innerHTML = `
            <div class="item-header">
                <span class="item-badge">${d.isCollocation ? 'Collocation' : 'Definition'} #${idx + 1}</span>
                <div class="d-flex gap-xs items-center">
                    <button type="button" onclick="speakText('${(d.word || '').replace(/'/g, "\\'")}')" class="action-btn secondary" class="action-btn secondary btn-listen">🔊 Listen</button>
                    <button type="button" onclick="removeDefItem(${idx})" class="btn-delete-item">🗑️ Delete</button>
                </div>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Word / Term:</label>
                    <input type="text" class="form-input" placeholder="e.g. monument" value="${d.word || ''}" oninput="state.definitions[${idx}].word = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group">
                    <label class="form-label">Arabic Meaning:</label>
                    <input type="text" class="form-input" placeholder="e.g. أثر تاريخي" value="${d.meaning || ''}" oninput="state.definitions[${idx}].meaning = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group" class="form-group col-span-all">
                    <label class="form-label">English Definition:</label>
                    <input type="text" class="form-input" placeholder="e.g. a structure built to remind people of an event or person" value="${d.definition || ''}" oninput="state.definitions[${idx}].definition = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
            </div>
        `;
        list.appendChild(el);
    });
}

function addDefItem() {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Add Definition');
    if (typeof playSound === 'function') playSound('click');
    state.definitions.push({ word: '', definition: '', meaning: '', isCollocation: false });
    renderDefsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    scrollToNewItem('defsList');
}

function removeDefItem(idx) {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Delete Definition');
    if (typeof playSound === 'function') playSound('click');
    state.definitions.splice(idx, 1);
    renderDefsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

// 3. Synonyms & Antonyms
function renderSynonymsList() {
    const list = document.getElementById('synonymsList');
    if (!list) return;
    list.innerHTML = '';
    state.synonyms.forEach((s, idx) => {
        const el = document.createElement('div');
        el.className = 'item-card-builder';
        el.innerHTML = `
            <div class="item-header">
                <span class="item-badge">Synonym Row #${idx + 1}</span>
                <button type="button" onclick="removeSynonymRow(${idx})" class="btn-delete-item">🗑️ Delete</button>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Word:</label>
                    <input type="text" class="form-input" placeholder="e.g. attractive" value="${s.word || ''}" oninput="state.synonyms[${idx}].word = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group">
                    <label class="form-label">Arabic Meaning:</label>
                    <input type="text" class="form-input" placeholder="e.g. جذاب" value="${s.arabic || ''}" oninput="state.synonyms[${idx}].arabic = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group">
                    <label class="form-label">Synonym:</label>
                    <input type="text" class="form-input" placeholder="e.g. beautiful" value="${s.synonym || ''}" oninput="state.synonyms[${idx}].synonym = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group">
                    <label class="form-label">Antonym (Opposite):</label>
                    <input type="text" class="form-input" placeholder="e.g. ugly" value="${s.antonym || ''}" oninput="state.synonyms[${idx}].antonym = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
            </div>
        `;
        list.appendChild(el);
    });
}

function addSynonymRow() {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Add Synonym');
    if (typeof playSound === 'function') playSound('click');
    state.synonyms.push({ word: '', arabic: '', synonym: '', antonym: '', antonymArabic: '' });
    renderSynonymsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    scrollToNewItem('synonymsList');
}

function removeSynonymRow(idx) {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Delete Synonym');
    if (typeof playSound === 'function') playSound('click');
    state.synonyms.splice(idx, 1);
    renderSynonymsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

// 4. Prefixes & Suffixes
function renderAffixesList() {
    const list = document.getElementById('affixesList');
    if (!list) return;
    list.innerHTML = '';
    state.affixes.forEach((a, idx) => {
        const el = document.createElement('div');
        el.className = 'item-card-builder';
        el.innerHTML = `
            <div class="item-header">
                <span class="item-badge">Affix #${idx + 1}</span>
                <button type="button" onclick="removeAffixItem(${idx})" class="btn-delete-item">🗑️ Delete</button>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Affix (Prefix/Suffix):</label>
                    <input type="text" class="form-input" placeholder="e.g. -ful" value="${a.affix || ''}" oninput="state.affixes[${idx}].affix = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group">
                    <label class="form-label">Grammar Function & Rule:</label>
                    <input type="text" class="form-input" placeholder="e.g. تحول الاسم إلى صفة" value="${a.function || ''}" oninput="state.affixes[${idx}].function = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group" class="form-group col-span-all">
                    <label class="form-label">Examples:</label>
                    <input type="text" class="form-input" placeholder="e.g. peace -> peaceful, care -> careful" value="${a.examples || ''}" oninput="state.affixes[${idx}].examples = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
            </div>
        `;
        list.appendChild(el);
    });
}

function addAffixItem() {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Add Affix');
    if (typeof playSound === 'function') playSound('click');
    state.affixes.push({ affix: '', function: '', examples: '' });
    renderAffixesList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    scrollToNewItem('affixesList');
}

function removeAffixItem(idx) {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Delete Affix');
    if (typeof playSound === 'function') playSound('click');
    state.affixes.splice(idx, 1);
    renderAffixesList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

// 5. Flashcards
function renderFlashcardsList() {
    const list = document.getElementById('flashcardsList');
    if (!list) return;
    list.innerHTML = '';
    state.flashcards.forEach((f, idx) => {
        const el = document.createElement('div');
        el.className = 'item-card-builder';
        el.innerHTML = `
            <div class="item-header">
                <span class="item-badge">Card #${idx + 1}</span>
                <div class="d-flex gap-xs items-center">
                    <button type="button" onclick="speakText('${(f.front || '').replace(/'/g, "\\'")}')" class="action-btn secondary" class="action-btn secondary btn-listen">🔊 Listen</button>
                    <button type="button" onclick="removeFlashcardItem(${idx})" class="btn-delete-item">🗑️ Delete</button>
                </div>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Front Side (English):</label>
                    <input type="text" class="form-input" placeholder="e.g. Traffic" value="${f.front || ''}" oninput="state.flashcards[${idx}].front = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group">
                    <label class="form-label">Back Side (Arabic):</label>
                    <input type="text" class="form-input" placeholder="e.g. حركة المرور" value="${f.back || ''}" oninput="state.flashcards[${idx}].back = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
            </div>
        `;
        list.appendChild(el);
    });
}

function addFlashcardItem() {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Add Flashcard');
    if (typeof playSound === 'function') playSound('click');
    state.flashcards.push({ front: '', back: '', category: 'vocab' });
    renderFlashcardsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    scrollToNewItem('flashcardsList');
}

function removeFlashcardItem(idx) {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Delete Flashcard');
    if (typeof playSound === 'function') playSound('click');
    state.flashcards.splice(idx, 1);
    renderFlashcardsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

// 6. Dialogue Lines
function renderDialogueLinesList() {
    const list = document.getElementById('dialogueLinesList');
    if (!list) return;
    list.innerHTML = '';
    state.dialogueLines.forEach((l, idx) => {
        const el = document.createElement('div');
        el.className = 'item-card-builder';
        el.innerHTML = `
            <div class="item-header">
                <span class="item-badge">Dialogue Line #${idx + 1}</span>
                <button type="button" onclick="removeDialogueLine(${idx})" class="btn-delete-item">🗑️ Delete</button>
            </div>
            <div class="form-grid">
                <div class="form-group">
                    <label class="form-label">Speaker:</label>
                    <input type="text" class="form-input" placeholder="e.g. Teacher" value="${l.speaker || ''}" oninput="state.dialogueLines[${idx}].speaker = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group">
                    <label class="form-label">English Line:</label>
                    <input type="text" class="form-input" placeholder="e.g. Good morning everyone!" value="${l.english || ''}" oninput="state.dialogueLines[${idx}].english = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
                <div class="form-group">
                    <label class="form-label">Arabic Translation:</label>
                    <input type="text" class="form-input" placeholder="e.g. صباح الخير جميعاً!" value="${l.arabic || ''}" oninput="state.dialogueLines[${idx}].arabic = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
            </div>
        `;
        list.appendChild(el);
    });
}

function addDialogueLine() {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Add Dialogue Line');
    if (typeof playSound === 'function') playSound('click');
    state.dialogueLines.push({ speaker: 'Teacher', english: '', arabic: '' });
    renderDialogueLinesList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    scrollToNewItem('dialogueLinesList');
}

function removeDialogueLine(idx) {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Delete Dialogue Line');
    if (typeof playSound === 'function') playSound('click');
    state.dialogueLines.splice(idx, 1);
    renderDialogueLinesList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

// 7. Interactive Quiz Questions
function renderQuizQuestionsList() {
    const list = document.getElementById('quizQuestionsList');
    if (!list) return;
    list.innerHTML = '';
    
    state.quiz.forEach((q, qIdx) => {
        const currentEmoji = q.emoji || '🎯';
        const el = document.createElement('div');
        el.className = 'item-card-builder';
        el.innerHTML = `
            <div class="item-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 8px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span class="item-badge" style="font-size: 0.95rem; font-weight: 800;">Question #${qIdx + 1}</span>
                    <button type="button" onclick="duplicateQuizQuestion(${qIdx})" class="card-action-btn card-duplicate-btn" title="Duplicate question">📋 Duplicate</button>
                    ${qIdx > 0 ? `<button type="button" onclick="moveQuizQuestion(${qIdx}, -1)" class="card-action-btn card-move-btn" title="Move Up">⬆️</button>` : ''}
                    ${qIdx < state.quiz.length - 1 ? `<button type="button" onclick="moveQuizQuestion(${qIdx}, 1)" class="card-action-btn card-move-btn" title="Move Down">⬇️</button>` : ''}
                </div>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <button type="button" onclick="speakText('${(q.question || '').replace(/'/g, "\\'")}')" class="card-action-btn" style="border-radius: 20px; padding: 5px 14px;" title="Listen to question">🔊 Listen</button>
                    <button type="button" onclick="removeQuizQuestion(${qIdx})" class="btn-delete-item">🗑️ Delete</button>
                </div>
            </div>

            <!-- Dedicated Emoji Field Directly Above Question -->
            <div class="question-emoji-container" style="background: rgba(11, 15, 25, 0.65); border: 1.5px solid rgba(0, 243, 255, 0.28); border-radius: 16px; padding: 14px 18px; margin-bottom: 16px;">
                <label class="form-label" style="color: var(--accent-primary, #00f3ff); font-weight: 800; font-size: 0.95rem; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px;">
                    <span>✨ Question Emoji / Visual Icon:</span>
                    <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: normal;">(Shown at 3.5rem size above question)</span>
                </label>
                <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                    <div class="emoji-large-badge" id="emoji-badge-${qIdx}" style="font-size: 3.5rem; line-height: 1; min-width: 80px; height: 80px; display: flex; align-items: center; justify-content: center; background: rgba(0, 243, 255, 0.08); border: 2px solid var(--accent-primary, #00f3ff); border-radius: 18px; box-shadow: 0 0 18px rgba(0, 243, 255, 0.25); flex-shrink: 0; user-select: none;" title="Full size emoji preview">
                        ${currentEmoji}
                    </div>
                    <div style="flex: 1; min-width: 220px;">
                        <input type="text" 
                               class="form-input emoji-input-field" 
                               id="emoji-input-${qIdx}" 
                               style="font-size: 1.35rem; padding: 12px 16px; font-weight: bold; border-color: rgba(0, 243, 255, 0.35); text-align: left;" 
                               value="${currentEmoji}" 
                               placeholder="e.g. 🎯 or 💡 or 🚀 or 🦁" 
                               oninput="updateQuizQuestionEmojiDirectly(${qIdx}, this.value)">
                        <div style="font-size: 0.82rem; color: var(--text-muted); margin-top: 6px;">
                            💡 Type or paste any single or composite emoji.
                        </div>
                    </div>
                </div>
            </div>

            <!-- Question Text -->
            <div class="form-grid" style="margin-bottom: 14px;">
                <div class="form-group" class="form-group col-span-all">
                    <label class="form-label" style="font-weight: 800; font-size: 0.95rem;">Question Prompt:</label>
                    <input type="text" class="form-input" style="font-size: 1.05rem;" value="${q.question || ''}" placeholder="Type question prompt here..." oninput="state.quiz[${qIdx}].question = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
            </div>

            <!-- Options List -->
            <div style="font-weight: 700; color: var(--text-main); font-size: 0.9rem; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                <span>🎯 Answer Options (Select the correct option with the radio button):</span>
                <span style="font-size: 0.8rem; color: var(--text-muted);">🔊 Click to listen to pronunciation</span>
            </div>
            
            <div id="options-list-${qIdx}" style="display: flex; flex-direction: column; gap: 8px;">
                ${q.options.map((opt, optIdx) => `
                    <div style="display: flex; gap: 8px; align-items: center; background: rgba(15, 23, 42, 0.6); padding: 8px 10px; border-radius: 12px; border: 1px solid ${opt.isCorrect ? 'var(--accent-green, #10b981)' : 'rgba(255,255,255,0.08)'}; flex-wrap: wrap;">
                        <label style="display: flex; align-items: center; cursor: pointer; gap: 6px; font-weight: bold; color: ${opt.isCorrect ? 'var(--accent-green, #10b981)' : 'var(--text-muted)'}; min-width: 90px; flex-shrink: 0;" title="Set as correct answer">
                            <input type="radio" name="correct-opt-${qIdx}" ${opt.isCorrect ? 'checked' : ''} onchange="setCorrectOption(${qIdx}, ${optIdx})" style="accent-color: var(--accent-green, #10b981); width: 18px; height: 18px; cursor: pointer;">
                            <span style="font-size: 0.85rem;">${opt.isCorrect ? '✅ Correct' : 'Option'}</span>
                        </label>
                        <input type="text" class="form-input" style="flex: 1 1 180px; min-width: 140px; padding: 8px 12px; font-size: 0.95rem;" value="${opt.text || ''}" oninput="state.quiz[${qIdx}].options[${optIdx}].text = this.value; triggerLiveUpdate(); saveDraft();">
                        <div style="display: flex; align-items: center; gap: 6px; margin-left: auto;">
                            <button type="button" onclick="speakText('${(opt.text || '').replace(/'/g, "\\'")}')" class="audio-btn" style="width: 34px; height: 34px; font-size: 0.85rem; flex-shrink: 0;" title="Listen to option">🔊</button>
                            ${q.options.length > 2 ? `<button type="button" onclick="removeQuizOption(${qIdx}, ${optIdx})" style="background: rgba(255,71,126,0.1); border: 1px solid rgba(255,71,126,0.25); color: var(--accent-red); font-size: 0.9rem; cursor: pointer; padding: 4px 8px; border-radius: 8px;" title="Remove this option">✖</button>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>

            <div style="margin-top: 8px; margin-bottom: 16px;">
                <button type="button" onclick="addQuizOption(${qIdx})" style="background: rgba(0, 243, 255, 0.08); border: 1px dashed var(--accent-primary); color: var(--accent-primary); padding: 6px 14px; border-radius: 10px; cursor: pointer; font-size: 0.85rem; font-weight: bold; transition: all 0.2s ease;">➕ Add Option</button>
            </div>

            <!-- Feedback Messages & Explanations -->
            <div style="background: rgba(0,0,0,0.25); border-radius: 12px; padding: 12px; border: 1px solid rgba(255,255,255,0.06);">
                <div style="font-size: 0.85rem; font-weight: 700; color: var(--accent-primary); margin-bottom: 8px;">💬 Feedback Messages:</div>
                <div class="form-grid">
                    <div class="form-group">
                        <label class="form-label" style="color: var(--accent-green, #10b981);">Correct Answer Feedback (+10 pts):</label>
                        <input type="text" class="form-input" value="${q.correctMsg || 'Excellent! Well done 🎯 (+10)'}" placeholder="Excellent! Well done 🎯 (+10)" oninput="state.quiz[${qIdx}].correctMsg = this.value; triggerLiveUpdate(); saveDraft();">
                    </div>
                    <div class="form-group">
                        <label class="form-label" style="color: var(--accent-orange, #ffb703);">Incorrect Answer Feedback:</label>
                        <input type="text" class="form-input" value="${q.wrongMsg || 'Incorrect, try again!'}" placeholder="Incorrect, try again!" oninput="state.quiz[${qIdx}].wrongMsg = this.value; triggerLiveUpdate(); saveDraft();">
                    </div>
                </div>
            </div>
        `;
        list.appendChild(el);
    });
}

function updateQuizQuestionEmojiDirectly(qIdx, val) {
    const cleanVal = (val || '').trim();
    state.quiz[qIdx].emoji = cleanVal;
    const badge = document.getElementById(`emoji-badge-${qIdx}`);
    if (badge) badge.textContent = cleanVal || '🎯';
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function duplicateQuizQuestion(qIdx) {
    if (typeof playSound === 'function') playSound('click');
    const source = state.quiz[qIdx];
    if (!source) return;
    
    const clone = JSON.parse(JSON.stringify(source));
    state.quiz.splice(qIdx + 1, 0, clone);
    renderQuizQuestionsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    if (typeof showAdminToast === 'function') showAdminToast("📋 Question duplicated successfully");
}

function moveQuizQuestion(qIdx, direction) {
    if (typeof playSound === 'function') playSound('click');
    const newIdx = qIdx + direction;
    if (newIdx < 0 || newIdx >= state.quiz.length) return;
    
    const temp = state.quiz[qIdx];
    state.quiz[qIdx] = state.quiz[newIdx];
    state.quiz[newIdx] = temp;
    
    renderQuizQuestionsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function addQuizQuestion() {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Add Question');
    if (typeof playSound === 'function') playSound('click');
    const defaultEmojis = ['🎯', '💡', '🚀', '🧠', '🌟', '🏆', '💎', '🍎'];
    const randomEmoji = defaultEmojis[state.quiz.length % defaultEmojis.length] || '🎯';
    
    state.quiz.push({
        emoji: randomEmoji,
        question: 'What does this word mean?',
        options: [
            { text: 'Correct Answer', isCorrect: true },
            { text: 'Second Option', isCorrect: false },
            { text: 'Third Option', isCorrect: false }
        ],
        correctMsg: 'Excellent! Well done 🎯 (+10)',
        wrongMsg: 'Incorrect, try again!'
    });
    renderQuizQuestionsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    scrollToNewItem('quizQuestionsList');
}

function removeQuizQuestion(qIdx) {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Delete Question');
    if (typeof playSound === 'function') playSound('click');
    state.quiz.splice(qIdx, 1);
    renderQuizQuestionsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function setCorrectOption(qIdx, optIdx) {
    if (typeof playSound === 'function') playSound('click');
    state.quiz[qIdx].options.forEach((o, i) => o.isCorrect = (i === optIdx));
    renderQuizQuestionsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function addQuizOption(qIdx) {
    if (typeof playSound === 'function') playSound('click');
    state.quiz[qIdx].options.push({ text: 'New Option', isCorrect: false });
    renderQuizQuestionsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function removeQuizOption(qIdx, optIdx) {
    if (typeof playSound === 'function') playSound('click');
    state.quiz[qIdx].options.splice(optIdx, 1);
    renderQuizQuestionsList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

// ==========================================
// 6.5 STORY PAGES BUILDER (STORYBOOK ARCHETYPE)
// ==========================================
function renderStoryPagesList() {
    const list = document.getElementById('storyPagesList');
    if (!list) return;
    list.innerHTML = '';

    if (!state.storyPages || state.storyPages.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 24px; color: var(--text-muted); background: rgba(11, 15, 25, 0.4); border-radius: 14px; border: 1px dashed rgba(0, 243, 255, 0.2);">
                <div style="font-size: 2rem; margin-bottom: 6px;">📖</div>
                <div style="font-weight: bold; color: var(--text-main);">No story pages added yet</div>
                <div style="font-size: 0.85rem; margin-top: 4px;">Click the button below to add your first illustrated story page.</div>
            </div>
        `;
        return;
    }

    state.storyPages.forEach((p, idx) => {
        const el = document.createElement('div');
        el.className = 'item-card-builder';
        el.innerHTML = `
            <div class="item-header">
                <span class="item-badge" style="background: rgba(224, 134, 255, 0.15); color: var(--accent-secondary); border-color: var(--accent-secondary);">
                    📖 Story Page #${idx + 1}
                </span>
                <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                    <button type="button" onclick="speakText('${(p.textEn || '').replace(/'/g, "\\'")}')" class="action-btn secondary" style="padding: 4px 10px; font-size: 0.8rem; border-radius: 20px;" title="Test Pronunciation">🔊 Listen</button>
                    ${idx > 0 ? `<button type="button" onclick="moveStoryPage(${idx}, -1)" class="action-btn secondary" style="padding: 4px 8px; font-size: 0.8rem;" title="Move Up">⬆️</button>` : ''}
                    ${idx < state.storyPages.length - 1 ? `<button type="button" onclick="moveStoryPage(${idx}, 1)" class="action-btn secondary" style="padding: 4px 8px; font-size: 0.8rem;" title="Move Down">⬇️</button>` : ''}
                    <button type="button" onclick="duplicateStoryPage(${idx})" class="action-btn secondary" style="padding: 4px 10px; font-size: 0.8rem;" title="Duplicate Page">📑 Copy</button>
                    <button type="button" onclick="removeStoryPageItem(${idx})" class="btn-delete-item" style="padding: 4px 10px; font-size: 0.8rem;">🗑️ Delete</button>
                </div>
            </div>

            <div class="form-grid">
                <div class="form-group" style="grid-column: span 2;">
                    <label class="form-label">Page / Chapter Title:</label>
                    <input type="text" class="form-input" placeholder="e.g. Chapter 1: The Mysterious Light" value="${p.title || ''}" oninput="state.storyPages[${idx}].title = this.value; triggerLiveUpdate(); saveDraft();">
                </div>

                <!-- Scene Artwork & Live Visual Preview (Exact Viewer Aspect Ratio) -->
                <div class="form-group" style="grid-column: span 2;">
                    <div style="background: rgba(11, 15, 25, 0.7); border: 1.5px solid rgba(0, 243, 255, 0.25); border-radius: 16px; padding: clamp(14px, 2.5vw, 20px); box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.4);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
                            <div style="font-weight: 800; font-size: 0.95rem; color: var(--accent-primary); display: flex; align-items: center; gap: 8px;">
                                <span>🖼️ Scene Artwork & Visual Preview</span>
                            </div>
                            <span style="font-size: 0.75rem; color: var(--text-muted); background: rgba(0, 243, 255, 0.08); padding: 3px 10px; border-radius: 12px; border: 1px solid rgba(0, 243, 255, 0.18); font-weight: 600;">
                                ✨ أبعاد مطابقة لشاشة القارئ التفاعلي
                            </span>
                        </div>

                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 20px; align-items: start;">
                            <!-- Form Controls for Image & Caption -->
                            <div style="display: flex; flex-direction: column; gap: 14px;">
                                <div class="form-group">
                                    <label class="form-label">Scene Artwork Image URL:</label>
                                    <input type="url" class="form-input" placeholder="e.g. https://images.unsplash.com/..." value="${p.imageUrl || ''}" oninput="state.storyPages[${idx}].imageUrl = this.value; updateStoryImgPreview(${idx}); triggerLiveUpdate(); saveDraft();">
                                    <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">Supports direct URLs, Unsplash links, or local image assets.</div>
                                </div>

                                <div class="form-group">
                                    <label class="form-label">Artwork Caption / Subtitle:</label>
                                    <input type="text" class="form-input" placeholder="e.g. The old lighthouse standing tall above the foggy sea" value="${p.caption || ''}" oninput="state.storyPages[${idx}].caption = this.value; updateStoryImgPreview(${idx}); triggerLiveUpdate(); saveDraft();">
                                    <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">يظهر كتعليق توضيحي أسفل الصورة داخل الكتاب.</div>
                                </div>
                            </div>

                            <!-- Live Student-Sized Preview -->
                            <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
                                <div id="storyImgThumb-${idx}" style="position: relative; width: 100%; max-width: 440px; height: 240px; border-radius: 18px; overflow: hidden; border: 2px solid rgba(0, 243, 255, 0.35); box-shadow: 0 10px 25px rgba(0, 0, 0, 0.55); background: #0b0f19; display: flex; align-items: center; justify-content: center;">
                                    ${p.imageUrl ? `<img src="${p.imageUrl}" alt="Scene Artwork Preview" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.innerHTML='<div style=\\'color:var(--text-muted);font-size:0.85rem;padding:16px;text-align:center;\\'>⚠️ رابط الصورة غير صالح أو غير متاح</div>';">` : `<div style="color: var(--text-muted); font-size: 0.88rem; text-align: center; padding: 20px;">🖼️ معاينة صورة المشهد بنفس أبعاد القارئ التفاعلي</div>`}
                                </div>
                                <div id="storyImgCaption-${idx}" style="margin-top: 10px; font-size: 0.88rem; color: var(--text-muted); text-align: center; font-style: italic; min-height: 20px; word-break: break-word; max-width: 440px;">
                                    ${p.caption || ''}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="form-group" style="grid-column: span 2;">
                    <label class="form-label">English Story Paragraph (Narrated by Text-to-Speech):</label>
                    <textarea class="form-textarea" rows="3" placeholder="Write the English passage here..." oninput="state.storyPages[${idx}].textEn = this.value; triggerLiveUpdate(); saveDraft();">${p.textEn || ''}</textarea>
                </div>

                <div class="form-group" style="grid-column: span 2;">
                    <label class="form-label">Arabic Translation (الترجمة التوضيحية):</label>
                    <textarea class="form-textarea" rows="2" placeholder="اكتب الترجمة العربية هنا..." oninput="state.storyPages[${idx}].textAr = this.value; triggerLiveUpdate(); saveDraft();">${p.textAr || ''}</textarea>
                </div>

                <div class="form-group" style="grid-column: span 2;">
                    <label class="form-label">Vocabulary Highlights / Notes (e.g. word (معنى) • word (معنى)):</label>
                    <input type="text" class="form-input" placeholder="e.g. abandoned (مهجور) • cliff (جرف صخري) • beam (شعاع ضوء)" value="${p.vocabNotes || ''}" oninput="state.storyPages[${idx}].vocabNotes = this.value; triggerLiveUpdate(); saveDraft();">
                </div>
            </div>
        `;
        list.appendChild(el);
    });
}

function updateStoryImgPreview(idx) {
    const thumb = document.getElementById(`storyImgThumb-${idx}`);
    const captionEl = document.getElementById(`storyImgCaption-${idx}`);
    const page = state.storyPages[idx];
    if (!page) return;

    if (thumb) {
        if (page.imageUrl) {
            thumb.innerHTML = `<img src="${page.imageUrl}" alt="Scene Artwork Preview" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.parentElement.innerHTML='<div style=\\'color:var(--text-muted);font-size:0.85rem;padding:16px;text-align:center;\\'>⚠️ رابط الصورة غير صالح أو غير متاح</div>';">`;
        } else {
            thumb.innerHTML = `<div style="color: var(--text-muted); font-size: 0.88rem; text-align: center; padding: 20px;">🖼️ معاينة صورة المشهد بنفس أبعاد القارئ التفاعلي</div>`;
        }
    }

    if (captionEl) {
        captionEl.textContent = page.caption || '';
    }
}

function addStoryPageItem() {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Add Story Page');
    if (typeof playSound === 'function') playSound('click');
    if (!state.storyPages) state.storyPages = [];
    const pageNum = state.storyPages.length + 1;
    state.storyPages.push({
        title: `Chapter ${pageNum}: New Adventure`,
        textEn: 'Write your exciting story sentence here for the students to read and listen to.',
        textAr: 'اكتب الترجمة العربية هنا لمساعدة الطلاب على الفهم.',
        imageUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80',
        caption: 'Illustration of the scene',
        vocabNotes: 'adventure (مغامرة) • exciting (مثير)'
    });
    renderStoryPagesList();
    if (typeof renderEditorNavigation === 'function') renderEditorNavigation();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    scrollToNewItem('storyPagesList');
}

function removeStoryPageItem(idx) {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Delete Story Page');
    if (typeof playSound === 'function') playSound('click');
    state.storyPages.splice(idx, 1);
    renderStoryPagesList();
    if (typeof renderEditorNavigation === 'function') renderEditorNavigation();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function duplicateStoryPage(idx) {
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Duplicate Story Page');
    if (typeof playSound === 'function') playSound('click');
    const orig = state.storyPages[idx];
    const copy = JSON.parse(JSON.stringify(orig));
    copy.title = `${copy.title} (Copy)`;
    state.storyPages.splice(idx + 1, 0, copy);
    renderStoryPagesList();
    if (typeof renderEditorNavigation === 'function') renderEditorNavigation();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

function moveStoryPage(idx, direction) {
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= state.storyPages.length) return;
    if (typeof StudioStore !== 'undefined') StudioStore.recordSnapshot('Reorder Story Page');
    if (typeof playSound === 'function') playSound('click');
    const temp = state.storyPages[idx];
    state.storyPages[idx] = state.storyPages[targetIdx];
    state.storyPages[targetIdx] = temp;
    renderStoryPagesList();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
}

