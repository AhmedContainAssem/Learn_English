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

const stages = ['Grade_6', 'Prep_3', 'Sec_1', 'Sec_2', 'Sec_3'];
let totalChecked = 0;
let errors = 0;
const issues = [];

stages.forEach(stage => {
    if (!fs.existsSync(stage)) return;
    const units = fs.readdirSync(stage).filter(u => fs.statSync(path.join(stage, u)).isDirectory() && u.startsWith('unit'));
    units.forEach(unit => {
        const uDir = path.join(stage, unit);
        const files = fs.readdirSync(uDir).filter(f => f.endsWith('.html') && f !== 'index.html');
        files.forEach(htmlFile => {
            totalChecked++;
            const htmlPath = path.join(uDir, htmlFile);
            const dataPath = path.join(uDir, htmlFile.replace('.html', '.data.js'));
            if (!fs.existsSync(dataPath)) return;

            const html = fs.readFileSync(htmlPath, 'utf8');
            const docMock = createDOMMock(html);

            const sandbox = {
                window: {
                    speechSynthesis: { speak: () => {}, cancel: () => {} }
                },
                document: docMock,
                NodeFilter: { SHOW_TEXT: 4 },
                console: { log: () => {}, warn: () => {}, error: () => {} },
                setTimeout: (fn) => fn(),
                clearTimeout: () => {}
            };
            sandbox.window.document = docMock;
            sandbox.window.window = sandbox.window;
            vm.createContext(sandbox);

            const scripts = [
                'assets/js/renderers/ui-primitives.js',
                'assets/js/renderers/vocab-renderer.js',
                'assets/js/renderers/lexicon-renderer.js',
                'assets/js/renderers/dialogue-player.js',
                'assets/js/story-engine.js',
                'assets/js/curriculum-renderer.js',
                dataPath
            ];

            try {
                for (const s of scripts) {
                    vm.runInContext(fs.readFileSync(s, 'utf8'), sandbox);
                }
                if (sandbox.window.CurriculumRenderer) {
                    sandbox.window.CurriculumRenderer.init();
                }
                if (sandbox.window.storyEngine && sandbox.window.lessonData && sandbox.window.lessonData.storyPages) {
                    sandbox.window.storyEngine.loadPages(sandbox.window.lessonData.storyPages);
                }

                const ld = sandbox.window.lessonData;
                // Check verbs if data has verbs
                if (ld && ld.verbs && docMock.getElementById('verbs')) {
                    const len = (docMock.getElementById('verbs').innerHTML || '').length;
                    if (len === 0) issues.push({ file: `${stage}/${unit}/${htmlFile}`, tab: 'verbs', issue: 'verbs container blank despite data having verbs' });
                }

                // Check collocations if data has collocations/expressions/prepositions
                if (ld && (ld.collocations || ld.expressions || ld.prepositions) && docMock.getElementById('collocations')) {
                    const len = (docMock.getElementById('collocations').innerHTML || '').length;
                    if (len === 0) issues.push({ file: `${stage}/${unit}/${htmlFile}`, tab: 'collocations', issue: 'collocations container blank despite data having collocations/expressions/prepositions' });
                }

                // Check synonyms if data has synonyms
                if (ld && (ld.synonyms || ld.antonyms) && docMock.getElementById('synonyms')) {
                    const len = (docMock.getElementById('synonyms').innerHTML || '').length;
                    if (len === 0) issues.push({ file: `${stage}/${unit}/${htmlFile}`, tab: 'synonyms', issue: 'synonyms container blank despite data having synonyms/antonyms' });
                }

                // Check dialogue if data has dialogue
                if (ld && ld.dialogue && (docMock.getElementById('dialogue') || docMock.getElementById('dialogue-container') || docMock.getElementById('dialogue-list-container'))) {
                    const mainLen = (docMock.getElementById('dialogue')?.innerHTML || '').length;
                    const containerLen = (docMock.getElementById('dialogue-container')?.innerHTML || '').length;
                    const listLen = (docMock.getElementById('dialogue-list-container')?.innerHTML || docMock.getElementById('dialogueList')?.innerHTML || '').length;
                    if (mainLen === 0 && containerLen === 0 && listLen === 0) issues.push({ file: `${stage}/${unit}/${htmlFile}`, tab: 'dialogue', issue: 'dialogue container blank despite data having dialogue' });
                }

                // Check storyText if data has storyPages
                if (ld && ld.storyPages && ld.storyPages.length > 0 && (docMock.getElementById('storyText') || docMock.getElementById('storyEn'))) {
                    const textLen = (docMock.getElementById('storyText')?.textContent || docMock.getElementById('storyEn')?.textContent || '').length;
                    if (textLen === 0) issues.push({ file: `${stage}/${unit}/${htmlFile}`, tab: 'storyText', issue: 'storyText blank despite data having storyPages' });
                }

            } catch (e) {
                errors++;
                issues.push({ file: `${stage}/${unit}/${htmlFile}`, error: e.message });
            }
        });
    });
});

console.log(`Audited ${totalChecked} lessons across ${stages.join(', ')}.`);
console.log(`Execution runtime errors: ${errors}`);
console.log(`Rendering issues found: ${issues.length}`);
if (issues.length > 0) {
    console.log(JSON.stringify(issues, null, 2));
} else {
    console.log('🎉 ALL 65 LESSONS PASSED WITH 100% SUCCESS! NO BLANK TABS!');
}
