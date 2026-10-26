const fs = require('fs');
const path = require('path');
const vm = require('vm');

function findDataFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(findDataFiles(fullPath));
        } else if (file.endsWith('.data.js')) {
            results.push(fullPath.replace(/\\/g, '/'));
        }
    });
    return results;
}

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
        if (!fs.existsSync(s)) continue;
        const code = fs.readFileSync(s, 'utf-8');
        try {
            vm.runInNewContext(code, ctx);
        } catch (e) {
            return { success: false, file: dataPath, error: `Error loading ${s}: ${e.message}` };
        }
    }

    try {
        ctx.window.CurriculumRenderer.init();
    } catch (e) {
        return { success: false, file: dataPath, error: `init crashed: ${e.message}` };
    }

    const checkIds = ['vocab', 'definitions', 'synonyms', 'collocations', 'language-notes', 'writing', 'writing-skills', 'dialogue'];
    const lengths = {};
    for (const id of checkIds) {
        lengths[id] = elements[id] ? elements[id].innerHTML.length : 0;
    }
    return { success: true, file: dataPath, lengths };
}

// Find all data.js files across Sec_1, Sec_2, Sec_3
const dataFiles = [
    ...findDataFiles('Sec_1'),
    ...findDataFiles('Sec_2'),
    ...findDataFiles('Sec_3')
];

console.log(`Found ${dataFiles.length} secondary data files to test.`);
let passed = 0;
let failed = 0;

for (const df of dataFiles) {
    const res = testLesson(df);
    if (!res.success) {
        console.error(`❌ FAILED: ${df} -> ${res.error}`);
        failed++;
    } else {
        const l = res.lengths;
        console.log(`✅ ${df}: vocab=${l['vocab']} def=${l['definitions']} syn=${l['synonyms']} colloc=${l['collocations']} notes=${l['language-notes']} writing=${l['writing'] || l['writing-skills']}`);
        passed++;
    }
}

console.log(`\n========================================`);
console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED out of ${dataFiles.length}`);
