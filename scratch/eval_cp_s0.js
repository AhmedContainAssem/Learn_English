const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/connect-plus-lesson-1-2.html.bak', 'utf8');
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
const s0 = scripts[0][1];

const sandbox = {
    window: {},
    document: {
        addEventListener: () => {}
    }
};

const fn = new Function('window', 'document', s0);
fn(sandbox.window, sandbox.document);

console.log('window keys in script 0:', Object.keys(sandbox.window));
console.log('readingDecks:', sandbox.window.readingDecks?.length);
console.log('dialogues:', sandbox.window.dialogues ? Object.keys(sandbox.window.dialogues) : sandbox.window.dialogueDecks ? Object.keys(sandbox.window.dialogueDecks) : null);
console.log('lessonData:', Object.keys(sandbox.window.lessonData || {}));
