/**
 * Lesson Studio File Importer & Parser Module (importer.js)
 * Enables loading, parsing, and editing existing HTML lessons and index files.
 */

function openFileImportModal() {
    if (typeof playSound === 'function') playSound('click');
    const modal = document.getElementById('fileImportModal');
    if (modal) {
        modal.style.display = 'flex';
        renderPresetFilesList();
    }
}

function closeFileImportModal() {
    if (typeof playSound === 'function') playSound('click');
    const modal = document.getElementById('fileImportModal');
    if (modal) modal.style.display = 'none';
}

function renderPresetFilesList() {
    const listEl = document.getElementById('presetFilesList');
    if (!listEl) return;

    const presets = [
        { name: 'Primary 4: Unit 1 - Lesson 1 (Our Senses)', path: '../Grade_4/unit-1/lesson-1.html', stage: 'Grade_4', unit: 'unit-1', filename: 'lesson-1.html', type: 'Interactive Lesson / Quiz' },
        { name: 'Primary 4: Unit 1 Lessons Index', path: '../Grade_4/unit-1/index.html', stage: 'Grade_4', unit: 'unit-1', filename: 'index.html', type: 'Unit Lessons Index' },
        { name: 'Primary 4: Stage Units Index', path: '../Grade_4/index.html', stage: 'Grade_4', unit: '', filename: 'index.html', type: 'Stage Hub Index' },
        { name: 'Prep 3: Stage Units Index', path: '../Prep_3/index.html', stage: 'Prep_3', unit: '', filename: 'index.html', type: 'Stage Hub Index' }
    ];

    listEl.innerHTML = presets.map(p => `
        <div style="display: flex; align-items: center; justify-content: space-between; background: rgba(19, 27, 46, 0.7); border: 1px solid var(--border-color); border-radius: 12px; padding: 12px 16px; margin-bottom: 8px;">
            <div>
                <div style="font-weight: bold; color: var(--text-main); font-size: 0.95rem;">${escapeHTML(p.name)}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted); font-family: monospace; direction: ltr; text-align: left; margin-top: 2px;">
                    <span style="background: rgba(0, 243, 255, 0.1); color: var(--accent-primary); padding: 2px 6px; border-radius: 4px;">${p.type}</span>
                    ${p.path}
                </div>
            </div>
            <button type="button" onclick="loadExistingPresetFile('${p.path}', '${p.stage}', '${p.unit}', '${p.filename}')" class="action-btn" style="padding: 6px 14px; font-size: 0.85rem;">
                ⚡ Open to Edit
            </button>
        </div>
    `).join('');
}

async function loadExistingPresetFile(path, stage = '', unit = '', filename = '') {
    if (typeof playSound === 'function') playSound('click');
    showAdminToast("⏳ Loading and parsing file contents...");
    try {
        const res = await fetch(path);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        const success = parseHTMLToStudioState(html, path, stage, unit, filename);
        if (success) {
            closeFileImportModal();
            showAdminToast(`✅ Opened ${filename || path} successfully! Ready to edit.`);
        }
    } catch(err) {
        console.error("Failed to load preset file:", err);
        showAdminToast(`❌ Unable to load file directly (${err.message}). You can upload it manually via the file picker.`, false);
    }
}

function handleUploadedHTMLFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const content = e.target.result;
        const success = parseHTMLToStudioState(content, file.name);
        if (success) {
            closeFileImportModal();
            showAdminToast(`✅ Imported and parsed ${file.name} successfully!`);
        } else {
            showAdminToast("❌ Could not extract lesson data from the uploaded file.", false);
        }
    };
    reader.onerror = function() {
        showAdminToast("❌ Error reading the file.", false);
    };
    reader.readAsText(file);
}

async function fetchAndLoadFromGitHubCustomPath() {
    const customPathInput = document.getElementById('customGhLoadPath');
    const path = (customPathInput?.value || '').trim();
    if (!path) {
        showAdminToast("Please enter the repository file path.", false);
        return;
    }

    if (!ghConfig || !ghConfig.token) {
        showAdminToast("Please configure your GitHub Token in the publishing section first.", false);
        return;
    }

    showAdminToast("⏳ Fetching file from GitHub repository...");
    try {
        const res = await fetch(`https://api.github.com/repos/${ghConfig.owner}/${ghConfig.repo}/contents/${path}?ref=${ghConfig.branch}`, {
            headers: {
                'Authorization': `Bearer ${ghConfig.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || `HTTP ${res.status}`);
        }

        const data = await res.json();
        // Decode base64 content
        const decodedContent = decodeURIComponent(escape(atob(data.content.replace(/\s/g, ''))));
        const filename = path.split('/').pop() || 'lesson.html';
        const success = parseHTMLToStudioState(decodedContent, path);
        if (success) {
            closeFileImportModal();
            showAdminToast(`✅ تم جلب وقراءة ملف ${filename} بنجاح من GitHub!`);
        }
    } catch(err) {
        console.error("GitHub fetch error:", err);
        showAdminToast(`❌ فشل جلب الملف من GitHub: ${err.message}`, false);
    }
}

/**
 * Robust HTML to Studio State Parser
 */
function parseHTMLToStudioState(htmlContent, filePath = '', forceStage = '', forceUnit = '', forceFilename = '') {
    if (!htmlContent) return false;

    // 1. Check for embedded studio-payload JSON
    const payloadMatch = htmlContent.match(/<script\s+id="studio-payload"\s+type="application\/json">([\s\S]*?)<\/script>/i);
    if (payloadMatch && payloadMatch[1]) {
        try {
            const parsedState = JSON.parse(payloadMatch[1].trim());
            state = Object.assign({}, state, parsedState);
            if (forceStage) state.stage = forceStage;
            if (forceUnit) state.unit = forceUnit;
            if (forceFilename) state.filename = forceFilename;
            applyStateToUI();
            saveDraft();
            return true;
        } catch(e) {
            console.warn("Found studio-payload but failed to parse JSON:", e);
        }
    }

    // 2. DOM Parsing for legacy or non-payload HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Extract Basic Metadata
    const pageTitle = doc.querySelector('#title')?.textContent?.trim() || doc.querySelector('title')?.textContent?.trim() || 'Lesson';
    const pageDesc = doc.querySelector('#description')?.textContent?.trim() || doc.querySelector('.subtitle')?.textContent?.trim() || '';

    // Infer Stage / Unit / Filename from path or breadcrumb
    let stage = forceStage || state.stage || 'Prep_3';
    let unit = forceUnit !== undefined ? forceUnit : (state.unit || 'unit-1');
    let filename = forceFilename || 'lesson-1.html';

    if (filePath) {
        const parts = filePath.replace(/^\.\.\//, '').replace(/^Learn_English\//, '').split('/');
        if (parts.length >= 3) {
            stage = parts[0] || stage;
            unit = parts[1] || unit;
            filename = parts[2] || filename;
        } else if (parts.length === 2) {
            stage = parts[0] || stage;
            filename = parts[1] || filename;
            if (filename === 'index.html') unit = '';
        } else if (parts.length === 1) {
            filename = parts[0] || filename;
        }
    }

    state.title = pageTitle;
    state.description = pageDesc;
    state.stage = stage;
    state.unit = unit;
    state.filename = filename;

    // 3. Detect Archetype & Extract Content
    const isIndexHub = doc.querySelector('.index-grid') || doc.querySelector('.units-grid') || doc.querySelector('.lessons-grid') || filename === 'index.html';
    const hasCurriculumTabs = doc.querySelector('#tab-verbs') || doc.querySelector('.irregular-verbs-table') || doc.querySelector('.synonyms-table');
    const hasFlashcards = doc.querySelector('.flashcards-grid') || doc.querySelector('.flip-card') || doc.querySelector('.dialogue-box');

    if (isIndexHub && (filename === 'index.html' || doc.querySelector('.index-grid') || doc.querySelector('.units-grid'))) {
        // Index Hub Parser
        const cards = [];
        const cardEls = doc.querySelectorAll('.unit-card, .lesson-card, .index-card, .course-card, .card-link');
        
        cardEls.forEach(c => {
            const title = c.querySelector('.unit-title, .lesson-title, .card-title, h2, h3')?.textContent?.trim() || '';
            const subtitle = c.querySelector('.unit-subtitle, .lesson-subtitle, .card-desc, p')?.textContent?.trim() || '';
            const icon = c.querySelector('.unit-icon, .lesson-icon, .card-icon, .icon')?.textContent?.trim() || '📘';
            const link = c.getAttribute('href') || c.querySelector('a')?.getAttribute('href') || '#';
            const isLocked = c.classList.contains('locked') || c.getAttribute('data-status') === 'locked' || c.textContent.includes('قريباً');
            const tagEl = c.querySelector('.unit-tag, .lesson-tag, .tag, .badge');
            const tag = tagEl ? tagEl.textContent.trim() : (isLocked ? '🔒 قريباً' : '🎯 متاح');

            let destType = 'same_folder_lesson';
            if (link.includes('unit-')) destType = 'sub_unit_folder';
            else if (link.startsWith('http')) destType = 'custom_url';
            else if (link.includes('../')) destType = 'other_stage';

            cards.push({
                icon: icon || '📘',
                title: title || 'Card',
                subtitle: subtitle || '',
                destType: destType,
                link: link,
                status: isLocked ? 'locked' : 'active',
                tag: tag
            });
        });

        const isStageLevel = !unit || cards.some(c => c.destType === 'sub_unit_folder');
        if (isStageLevel) {
            state.archetype = 'stage_index';
            state.indexType = 'stage';
            state.indexScope = 'stage_hub';
            state.indexLayoutType = 'units';
            state.indexBackLink = '../index.html';
            state.indexBackText = '⬅️ العودة للقائمة الرئيسية';
        } else {
            state.archetype = 'unit_index';
            state.indexType = 'unit';
            state.indexScope = 'unit_hub';
            state.indexLayoutType = 'lessons';
            state.indexBackLink = '../index.html';
            state.indexBackText = `⬅️ العودة لوحدات ${getStageDisplayName(state.stage)}`;
        }

        if (cards.length > 0) state.indexCards = cards;
    }
    else if (hasCurriculumTabs) {
        state.archetype = 'curriculum_tabs';
        
        // Extract Verbs
        const verbRows = doc.querySelectorAll('.irregular-verbs-table tbody tr, #verbsTable tbody tr');
        if (verbRows.length > 0) {
            state.verbs = [];
            verbRows.forEach(row => {
                const cols = row.querySelectorAll('td');
                if (cols.length >= 4) {
                    const baseWord = cols[0]?.textContent?.trim() || '';
                    const pastForm = cols[1]?.textContent?.trim() || '';
                    const ppForm = cols[2]?.textContent?.trim() || '';
                    const formsCombined = (pastForm && ppForm) ? `${pastForm} / ${ppForm}` : (pastForm || ppForm);
                    state.verbs.push({
                        word: baseWord,
                        forms: formsCombined,
                        meaning: cols[3]?.textContent?.trim() || '',
                        tag: 'Present'
                    });
                } else if (cols.length >= 3) {
                    state.verbs.push({
                        word: cols[0]?.textContent?.trim() || '',
                        forms: cols[1]?.textContent?.trim() || '',
                        meaning: cols[2]?.textContent?.trim() || '',
                        tag: 'Present'
                    });
                }
            });
        }

        // Extract Definitions
        const defCards = doc.querySelectorAll('.definition-card, .def-item');
        if (defCards.length > 0) {
            state.definitions = [];
            defCards.forEach(d => {
                const term = d.querySelector('.def-term, .term, strong, h3')?.textContent?.trim() || '';
                const meaning = d.querySelector('.def-meaning, .meaning, p')?.textContent?.trim() || '';
                if (term) state.definitions.push({ term, meaning });
            });
        }

        // Extract Synonyms
        const synRows = doc.querySelectorAll('.synonyms-table tbody tr');
        if (synRows.length > 0) {
            state.synonyms = [];
            synRows.forEach(row => {
                const cols = row.querySelectorAll('td');
                if (cols.length >= 3) {
                    state.synonyms.push({
                        word: cols[0]?.textContent?.trim() || '',
                        synonym: cols[1]?.textContent?.trim() || '',
                        antonym: cols[2]?.textContent?.trim() || ''
                    });
                }
            });
        }

        // Extract Affixes
        const affixRows = doc.querySelectorAll('.affixes-table tbody tr, .affix-card');
        if (affixRows.length > 0) {
            state.affixes = [];
            affixRows.forEach(row => {
                const cols = row.querySelectorAll('td');
                if (cols.length >= 4) {
                    state.affixes.push({
                        affix: cols[0]?.textContent?.trim() || '',
                        type: cols[1]?.textContent?.trim() || 'Prefix',
                        functionText: cols[2]?.textContent?.trim() || '',
                        example: cols[3]?.textContent?.trim() || ''
                    });
                }
            });
        }
    }
    else if (hasFlashcards) {
        state.archetype = 'flashcards_dialogue';
        
        // Extract Flashcards
        const cards = doc.querySelectorAll('.vocab-card, .flip-card');
        if (cards.length > 0) {
            state.flashcards = [];
            cards.forEach(c => {
                const word = c.querySelector('.card-word, .front h3, .front strong')?.textContent?.trim() || '';
                const trans = c.querySelector('.card-translation, .back h3, .back p')?.textContent?.trim() || '';
                const ex = c.querySelector('.card-example, .example, .example-sentence')?.textContent?.trim() || '';
                if (word) state.flashcards.push({ word, translation: trans, example: ex, pron: '' });
            });
        }

        // Extract Dialogue
        const lines = doc.querySelectorAll('.dialogue-line, .chat-bubble');
        if (lines.length > 0) {
            state.dialogueLines = [];
            lines.forEach(l => {
                const speaker = l.querySelector('.speaker, strong')?.textContent?.trim() || 'A';
                const text = l.querySelector('.dialogue-text, .text')?.textContent?.trim() || '';
                const trans = l.querySelector('.dialogue-translation, .translation')?.textContent?.trim() || '';
                if (text) state.dialogueLines.push({ speaker, text, translation: trans });
            });
        }
    }
    else {
        // Fallback or Direct Quiz
        state.archetype = 'quiz_only';
    }

    // Extract Quiz Questions from window.lessonData embedded in scripts
    const scriptTags = doc.querySelectorAll('script');
    scriptTags.forEach(s => {
        const txt = s.textContent || '';
        const match = txt.match(/window\.lessonData\s*=\s*(\{[\s\S]*?\});/);
        if (match && match[1]) {
            try {
                // Safe evaluation of object literal
                const data = Function(`"use strict"; return (${match[1]})`)();
                if (data.questions && Array.isArray(data.questions)) {
                    state.quiz = data.questions.map(q => {
                        let targetCorrectIdx = typeof q.correctAnswer === 'number' ? q.correctAnswer : 0;
                        const canonicalOpts = (q.options || []).map((o, idx) => {
                            if (typeof o === 'object' && o !== null) {
                                return { text: o.text || '', isCorrect: Boolean(o.isCorrect) };
                            }
                            return { text: String(o || ''), isCorrect: idx === targetCorrectIdx };
                        });

                        // Ensure at least one correct answer
                        if (!canonicalOpts.some(o => o.isCorrect) && canonicalOpts.length > 0) {
                            canonicalOpts[0].isCorrect = true;
                        }

                        return {
                            emoji: q.emoji || '❓',
                            question: q.question || '',
                            options: canonicalOpts.length >= 2 ? canonicalOpts : [
                                { text: 'Choice A', isCorrect: true },
                                { text: 'Choice B', isCorrect: false }
                            ],
                            correctMsg: q.correctMsg || q.hint || 'إجابة صحيحة (+10)',
                            wrongMsg: q.wrongMsg || 'حاول مجدداً'
                        };
                    });
                }
            } catch(e) {
                console.warn("Could not evaluate lessonData JS object:", e);
            }
        }
    });

    applyStateToUI();
    saveDraft();
    return true;
}

// Global Alias to guarantee tree-explorer.js calls succeed without error
if (typeof window !== 'undefined') {
    window.loadExistingPresetFile = loadExistingPresetFile;
    window.loadAndParsePresetFile = loadExistingPresetFile;
}

