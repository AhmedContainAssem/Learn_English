const fs = require('fs');
const path = require('path');
const vm = require('vm');

function createDOMMock(html) {
    const elements = new Map();
    const idRegex = /id=["']([^"']+)["']/g;
    let match;
    while ((match = idRegex.exec(html)) !== null) {
        const id = match[1];
        if (!elements.has(id)) {
            elements.set(id, {
                id: id,
                innerHTML: '',
                textContent: '',
                style: {},
                classList: {
                    add: () => {},
                    remove: () => {},
                    contains: () => false,
                    toggle: () => {}
                },
                parentNode: {
                    querySelector: () => null,
                    appendChild: () => {}
                },
                querySelector: () => null,
                querySelectorAll: () => [],
                setAttribute: () => {},
                getAttribute: () => '',
                disabled: false
            });
        }
    }

    return {
        getElementById: (id) => elements.get(id) || null,
        querySelectorAll: () => [],
        querySelector: (sel) => {
            if (sel.startsWith('#')) return elements.get(sel.slice(1)) || null;
            return null;
        },
        createElement: (tag) => ({
            tagName: tag,
            style: {},
            innerHTML: '',
            classList: { add: () => {}, remove: () => {} },
            appendChild: () => {}
        }),
        readyState: 'complete',
        currentScript: null,
        getElementsByTagName: () => [],
        createTreeWalker: () => ({ nextNode: () => null }),
        elements
    };
}

function testLesson(stage, unit, htmlFile) {
    const uDir = path.join(stage, unit);
    const htmlPath = path.join(uDir, htmlFile);
    const dataPath = path.join(uDir, htmlFile.replace('.html', '.data.js'));

    if (!fs.existsSync(htmlPath) || !fs.existsSync(dataPath)) {
        return { error: 'File not found' };
    }

    const html = fs.readFileSync(htmlPath, 'utf8');
    const docMock = createDOMMock(html);

    const sandbox = {
        window: {
            speechSynthesis: { speak: () => {}, cancel: () => {} }
        },
        document: docMock,
        NodeFilter: { SHOW_TEXT: 4 },
        console: console,
        setTimeout: (fn) => fn(),
        clearTimeout: () => {}
    };
    sandbox.window.document = docMock;
    sandbox.window.window = sandbox.window;

    vm.createContext(sandbox);

    // Load scripts
    const scriptsToLoad = [
        'assets/js/renderers/ui-primitives.js',
        'assets/js/renderers/vocab-renderer.js',
        'assets/js/renderers/lexicon-renderer.js',
        'assets/js/renderers/dialogue-player.js',
        'assets/js/story-engine.js',
        'assets/js/curriculum-renderer.js',
        dataPath
    ];

    for (const s of scriptsToLoad) {
        const code = fs.readFileSync(s, 'utf8');
        vm.runInContext(code, sandbox);
    }

    // Run CurriculumRenderer.init()
    if (sandbox.window.CurriculumRenderer) {
        sandbox.window.CurriculumRenderer.init();
    }

    // Also run StoryEngine if storyPages exist
    if (sandbox.window.storyEngine && sandbox.window.lessonData && sandbox.window.lessonData.storyPages) {
        sandbox.window.storyEngine.loadPages(sandbox.window.lessonData.storyPages);
    }

    // Inspect containers
    const results = {};
    const checkIds = ['vocab', 'verbs', 'collocations', 'prepositions', 'definitions', 'synonyms', 'language-notes', 'dialogue', 'storyText', 'storyEn'];
    for (const cid of checkIds) {
        const el = docMock.getElementById(cid);
        if (el) {
            let renderedLength = (el.innerHTML || el.textContent || '').length;
            let preview = (el.innerHTML || el.textContent || '').substring(0, 100).replace(/\s+/g, ' ');
            if (cid === 'dialogue' && renderedLength === 0) {
                const listEl = docMock.getElementById('dialogue-list-container') || docMock.getElementById('dialogueList');
                if (listEl && (listEl.innerHTML || '').length > 0) {
                    renderedLength = (listEl.innerHTML || '').length;
                    preview = (listEl.innerHTML || '').substring(0, 100).replace(/\s+/g, ' ');
                }
            }
            results[cid] = {
                existsInHtml: true,
                renderedLength: renderedLength,
                preview: preview
            };
        } else {
            results[cid] = { existsInHtml: false };
        }
    }

    return results;
}

// Target test cases from user prompt
const targets = [
    { stage: 'Grade_6', unit: 'unit-2', file: 'lesson-1.html', focus: ['verbs', 'collocations'] },
    { stage: 'Grade_6', unit: 'unit-2', file: 'lesson-2.html', focus: ['verbs', 'collocations'] },
    { stage: 'Grade_6', unit: 'unit-3', file: 'lesson-1.html', focus: ['verbs', 'collocations'] },
    { stage: 'Grade_6', unit: 'unit-3', file: 'lesson-2.html', focus: ['verbs', 'collocations'] },
    { stage: 'Grade_6', unit: 'unit-3', file: 'lesson-3.html', focus: ['verbs', 'collocations'] },
    { stage: 'Sec_1', unit: 'unit-2', file: 'lesson-1.html', focus: ['definitions', 'synonyms', 'dialogue'] },
    { stage: 'Sec_1', unit: 'unit-2', file: 'lesson-3.html', focus: ['definitions', 'synonyms', 'dialogue'] },
    { stage: 'Sec_1', unit: 'unit-3', file: 'lesson-1.html', focus: ['definitions', 'synonyms', 'dialogue', 'storyText'] },
    { stage: 'Sec_1', unit: 'unit-3', file: 'lesson-3.html', focus: ['definitions', 'synonyms', 'dialogue', 'storyText'] },
    { stage: 'Sec_2', unit: 'unit-2', file: 'lesson-2-3.html', focus: ['synonyms', 'dialogue'] },
    { stage: 'Sec_2', unit: 'unit-4', file: 'lesson-4-1.html', focus: ['synonyms', 'dialogue'] },
    { stage: 'Sec_3', unit: 'unit-1', file: 'lesson-1-2.html', focus: ['synonyms', 'dialogue'] }
];

console.log('=== RUNNING VERIFICATION ON CRITICAL USER BUG LESSONS ===\n');
targets.forEach(t => {
    console.log(`Checking ${t.stage}/${t.unit}/${t.file}:`);
    const res = testLesson(t.stage, t.unit, t.file);
    t.focus.forEach(f => {
        const info = res[f];
        if (!info || !info.existsInHtml) {
            console.log(`  [${f}] Not in HTML or not rendered`);
        } else {
            const status = info.renderedLength > 0 ? '✅ POPULATED' : '❌ BLANK';
            console.log(`  [${f}] ${status} (Length: ${info.renderedLength}) -> ${info.preview.substring(0, 70)}...`);
        }
    });
    console.log('');
});
