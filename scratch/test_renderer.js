const fs = require('fs');
const path = require('path');
const vm = require('vm');

function createDOMContext() {
    const elements = {};
    const dom = {
        getElementById: (id) => {
            if (!elements[id]) {
                elements[id] = { id, innerHTML: '', style: {}, classList: { add: () => {}, remove: () => {} }, appendChild: () => {} };
            }
            return elements[id];
        },
        querySelectorAll: (sel) => [],
        querySelector: (sel) => null,
        getElementsByTagName: (tag) => [],
        createElement: (tag) => ({ innerHTML: '', style: {}, classList: { add: () => {}, remove: () => {} }, appendChild: () => {} }),
        readyState: 'complete'
    };

    const ctx = {
        window: {},
        document: dom,
        console: console,
        setTimeout: setTimeout,
        clearTimeout: clearTimeout,
        setInterval: setInterval,
        clearInterval: clearInterval
    };
    ctx.window = ctx;
    ctx.window.document = dom;
    return { ctx, elements };
}

function testLesson(dataPath) {
    console.log(`\n========================================`);
    console.log(`Testing: ${dataPath}`);
    const { ctx, elements } = createDOMContext();

    // Load libraries
    const scripts = [
        'assets/js/bidi.js',
        'assets/js/renderers/ui-primitives.js',
        'assets/js/renderers/vocab-renderer.js',
        'assets/js/renderers/lexicon-renderer.js',
        'assets/js/renderers/writing-renderer.js',
        'assets/js/renderers/dialogue-player.js',
        dataPath,
        'assets/js/curriculum-renderer.js'
    ];

    for (const s of scripts) {
        if (!fs.existsSync(s)) {
            console.error(`Script not found: ${s}`);
            continue;
        }
        const code = fs.readFileSync(s, 'utf-8');
        try {
            vm.runInNewContext(code, ctx);
        } catch (e) {
            console.error(`Error loading ${s}:`, e.message, e.stack);
            return;
        }
    }

    // Now call CurriculumRenderer.init()
    try {
        ctx.window.CurriculumRenderer.init();
        console.log(`CurriculumRenderer.init() completed without unhandled errors.`);
    } catch (e) {
        console.error(`CurriculumRenderer.init() CRASHED:`, e.message, e.stack);
    }

    // Check key element outputs
    const checkIds = ['vocab', 'definitions', 'synonyms', 'collocations', 'language-notes', 'writing', 'writing-skills', 'dialogue'];
    for (const id of checkIds) {
        const el = elements[id];
        const len = el ? el.innerHTML.length : 0;
        console.log(`Element #${id}: innerHTML length = ${len}`);
        if (len > 0 && len < 200) {
            console.log(`   Sample content: ${el.innerHTML.substring(0, 150)}...`);
        }
    }
}

// Test the files from screenshots
testLesson('Sec_1/unit-2/lesson-4-5.data.js');
testLesson('Sec_1/unit-3/lesson-4-5.data.js');
testLesson('Sec_1/unit-4/lesson-1.data.js');
testLesson('Sec_2/unit-2/lesson-2-4.data.js');
testLesson('Sec_2/unit-3/lesson-3-4.data.js');
testLesson('Sec_3/unit-2/lesson-4-5.data.js');
