/**
 * Smart Bulk Content Ingestion Engine (bulk-importer.js)
 * Parses tabular data copied from Excel, Word tables, Google Sheets, TSV, CSV, or structured text.
 * Auto-detects columns and populates dozens of entries in milliseconds.
 */

let currentBulkTargetType = 'verbs';
let parsedBulkRows = [];

function openBulkImportModal(targetType = null) {
    if (typeof playSound === 'function') playSound('click');

    // Default target based on active pane
    if (!targetType) {
        if (state.archetype === 'curriculum_tabs') {
            targetType = currentEditorPane || 'verbs';
        } else if (state.archetype === 'flashcards_dialogue') {
            targetType = currentEditorPane || 'flashcards';
        } else if (state.archetype === 'quiz_only') {
            targetType = 'quiz';
        } else if (state.archetype === 'index_hub' || state.archetype === 'stage_index' || state.archetype === 'unit_index') {
            targetType = 'indexCards';
        } else {
            targetType = 'verbs';
        }
    }

    currentBulkTargetType = targetType;
    const targetSelect = document.getElementById('bulkTargetTypeSelect');
    if (targetSelect) targetSelect.value = targetType;

    const textarea = document.getElementById('bulkPasteTextarea');
    if (textarea) textarea.value = '';

    parsedBulkRows = [];
    updateBulkPreviewTable();
    updateBulkHelperText();

    const modal = document.getElementById('bulkImportModal');
    if (modal) modal.style.display = 'flex';
}

function closeBulkImportModal() {
    if (typeof playSound === 'function') playSound('click');
    const modal = document.getElementById('bulkImportModal');
    if (modal) modal.style.display = 'none';
}

function onBulkTargetTypeChange() {
    const targetSelect = document.getElementById('bulkTargetTypeSelect');
    if (targetSelect) currentBulkTargetType = targetSelect.value;
    updateBulkHelperText();
    processBulkText();
}

function updateBulkHelperText() {
    const helper = document.getElementById('bulkHelperHint');
    if (!helper) return;

    const guides = {
        'verbs': '📋 Expected columns: (Base Form | Past | Past Participle (P.P) | Arabic Meaning | Regular yes/no)',
        'definitions': '📋 Expected columns: (Word | Collocation / Term | Arabic Definition / Meaning)',
        'synonyms': '📋 Expected columns: (Word | Meaning | Synonym | Antonym)',
        'affixes': '📋 Expected columns: (Affix | Type prefix/suffix | Meaning / Function | Example)',
        'flashcards': '📋 Expected columns: (Front English | Back Arabic | Hint / Example)',
        'dialogue': '📋 Expected columns: (Speaker Name | English Sentence | Arabic Translation)',
        'quiz': '📋 Expected columns: (Question | Option 1 | Option 2 | Option 3 | Correct Option # 1-3 | Hint)',
        'indexCards': '📋 Expected columns: (Title | Subtitle | Destination Link | Icon Emoji | Status active/locked)'
    };

    helper.innerHTML = guides[currentBulkTargetType] || '📋 Paste your data table directly from Excel or Word.';
}

function processBulkText() {
    const textarea = document.getElementById('bulkPasteTextarea');
    if (!textarea) return;

    const raw = textarea.value.trim();
    if (!raw) {
        parsedBulkRows = [];
        updateBulkPreviewTable();
        return;
    }

    // Split lines
    const lines = raw.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    parsedBulkRows = [];

    lines.forEach((line) => {
        // Support Tab-separated (Excel / Word table copy), Comma-separated (CSV), Semicolon, or Pipe (|)
        let cols = [];
        if (line.includes('\t')) {
            cols = line.split('\t');
        } else if (line.includes('|')) {
            cols = line.split('|');
        } else if (line.includes(',')) {
            // simple CSV split
            cols = line.split(',');
        } else if (line.includes(';')) {
            cols = line.split(';');
        } else if (line.includes('-')) {
            cols = line.split('-');
        } else {
            cols = [line];
        }

        cols = cols.map(c => c.trim().replace(/^["']|["']$/g, ''));

        // Skip header lines if pasted
        const firstCol = (cols[0] || '').toLowerCase();
        if (firstCol === 'verb' || firstCol === 'base' || firstCol === 'word' || firstCol === 'question' || firstCol === 'speaker' || firstCol === 'title') {
            return;
        }

        parsedBulkRows.push(cols);
    });

    updateBulkPreviewTable();
}

function updateBulkPreviewTable() {
    const container = document.getElementById('bulkPreviewContainer');
    const countBadge = document.getElementById('bulkParsedCountBadge');
    const commitBtn = document.getElementById('btnCommitBulkImport');

    if (countBadge) countBadge.textContent = `${parsedBulkRows.length} rows ready`;
    if (commitBtn) commitBtn.disabled = parsedBulkRows.length === 0;

    if (!container) return;

    if (parsedBulkRows.length === 0) {
        container.innerHTML = `<div style="text-align: center; padding: 24px; color: var(--text-muted); font-size: 0.88rem;">Paste your data above to see instant live column preview here.</div>`;
        return;
    }

    let html = `
        <table style="width: 100%; border-collapse: collapse; font-size: 0.82rem; text-align: left;">
            <thead>
                <tr style="background: rgba(0, 243, 255, 0.1); color: var(--accent-primary); border-bottom: 1px solid var(--border-color);">
                    <th style="padding: 6px 10px;">#</th>
                    <th style="padding: 6px 10px;">Column 1</th>
                    <th style="padding: 6px 10px;">Column 2</th>
                    <th style="padding: 6px 10px;">Column 3</th>
                    <th style="padding: 6px 10px;">Column 4 / Extra</th>
                </tr>
            </thead>
            <tbody>
    `;

    parsedBulkRows.slice(0, 15).forEach((row, i) => {
        html += `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 6px 10px; color: var(--text-muted);">${i + 1}</td>
                <td style="padding: 6px 10px; font-weight: bold; color: var(--text-main);">${escapeHTML(row[0] || '-')}</td>
                <td style="padding: 6px 10px; color: var(--accent-secondary);">${escapeHTML(row[1] || '-')}</td>
                <td style="padding: 6px 10px; color: var(--text-muted);">${escapeHTML(row[2] || '-')}</td>
                <td style="padding: 6px 10px; color: var(--text-muted);">${escapeHTML(row[3] || row[4] || '-')}</td>
            </tr>
        `;
    });

    if (parsedBulkRows.length > 15) {
        html += `
            <tr>
                <td colspan="5" style="padding: 8px; text-align: center; color: var(--text-muted); font-size: 0.78rem;">
                    ... and ${parsedBulkRows.length - 15} additional rows will be imported.
                </td>
            </tr>
        `;
    }

    html += `</tbody></table>`;
    container.innerHTML = html;
}

function commitBulkImport() {
    if (parsedBulkRows.length === 0) return;

    if (typeof StudioStore !== 'undefined') {
        StudioStore.recordSnapshot(`Bulk Import (${parsedBulkRows.length} items)`);
    }

    const appendMode = document.getElementById('bulkImportModeAppend')?.checked ?? true;

    if (currentBulkTargetType === 'verbs') {
        if (!appendMode) state.verbs = [];
        parsedBulkRows.forEach(row => {
            const base = row[0] || '';
            const past = row[1] || '';
            const pp = row[2] || '';
            const meaning = row[3] || row[2] || '';
            const isReg = row[4] ? (row[4].toLowerCase().includes('yes') || row[4].toLowerCase().includes('reg')) : false;

            if (base) {
                state.verbs.push({
                    base,
                    past: past || base,
                    pp: pp || past || base,
                    meaning: meaning,
                    isRegular: isReg
                });
            }
        });
    }
    else if (currentBulkTargetType === 'definitions') {
        if (!appendMode) state.definitions = [];
        parsedBulkRows.forEach(row => {
            const word = row[0] || '';
            const collocation = row[1] || '';
            const definition = row[2] || row[1] || '';

            if (word) {
                state.definitions.push({
                    word,
                    collocation,
                    definition
                });
            }
        });
    }
    else if (currentBulkTargetType === 'synonyms') {
        if (!appendMode) state.synonyms = [];
        parsedBulkRows.forEach(row => {
            const word = row[0] || '';
            const meaning = row[1] || '';
            const synonym = row[2] || '';
            const antonym = row[3] || '';

            if (word) {
                state.synonyms.push({
                    word,
                    meaning,
                    synonym,
                    antonym
                });
            }
        });
    }
    else if (currentBulkTargetType === 'affixes') {
        if (!appendMode) state.affixes = [];
        parsedBulkRows.forEach(row => {
            const affix = row[0] || '';
            const type = (row[1] || '').toLowerCase().includes('pre') ? 'prefix' : 'suffix';
            const meaning = row[2] || '';
            const example = row[3] || '';

            if (affix) {
                state.affixes.push({
                    affix,
                    type,
                    meaning,
                    example
                });
            }
        });
    }
    else if (currentBulkTargetType === 'flashcards') {
        if (!appendMode) state.flashcards = [];
        parsedBulkRows.forEach(row => {
            const front = row[0] || '';
            const back = row[1] || '';
            const hint = row[2] || '';

            if (front) {
                state.flashcards.push({
                    front,
                    back: back || front,
                    audio: front,
                    hint: hint
                });
            }
        });
    }
    else if (currentBulkTargetType === 'dialogue') {
        if (!appendMode) state.dialogueLines = [];
        parsedBulkRows.forEach(row => {
            const speaker = row[0] || 'Speaker';
            const english = row[1] || '';
            const arabic = row[2] || '';

            if (english) {
                state.dialogueLines.push({
                    speaker,
                    english,
                    arabic
                });
            }
        });
    }
    else if (currentBulkTargetType === 'quiz') {
        if (!appendMode) state.quiz = [];
        parsedBulkRows.forEach(row => {
            const question = row[0] || '';
            const opt1 = row[1] || '';
            const opt2 = row[2] || '';
            const opt3 = row[3] || '';
            const correctIdxRaw = parseInt(row[4], 10) || 1;
            const hint = row[5] || 'Correct answer (+10)';

            if (question && opt1) {
                const options = [
                    { text: opt1, isCorrect: correctIdxRaw === 1 },
                    { text: opt2 || 'Option 2', isCorrect: correctIdxRaw === 2 },
                    { text: opt3 || 'Option 3', isCorrect: correctIdxRaw === 3 }
                ];

                state.quiz.push({
                    emoji: '🎯',
                    question,
                    options,
                    correctMsg: hint,
                    wrongMsg: 'Try again'
                });
            }
        });
    }
    else if (currentBulkTargetType === 'indexCards') {
        if (!appendMode) state.indexCards = [];
        parsedBulkRows.forEach(row => {
            const title = row[0] || '';
            const subtitle = row[1] || '';
            const link = row[2] || './';
            const icon = row[3] || '📘';
            const status = (row[4] || '').includes('lock') ? 'locked' : 'active';
            const tag = status === 'active' ? '🎯 Available' : '🔒 Upcoming';

            if (title) {
                state.indexCards.push({
                    title,
                    subtitle,
                    link,
                    icon,
                    status,
                    tag
                });
            }
        });
    }

    closeBulkImportModal();
    if (typeof applyStateToUI === 'function') applyStateToUI();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    if (typeof saveDraft === 'function') saveDraft();
    if (typeof playCorrectFX === 'function') playCorrectFX();
    if (typeof showAdminToast === 'function') showAdminToast(`⚡ Successfully ingested ${parsedBulkRows.length} items!`);
}
