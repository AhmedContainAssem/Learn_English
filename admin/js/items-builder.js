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
    if (typeof renderSlidesList === 'function') renderSlidesList();
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


// Note: Quiz Questions & Story Pages builders are decoupled into admin/js/quiz-story-builder.js
