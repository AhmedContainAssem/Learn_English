const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/connect-plus-lesson-1-2.html.bak', 'utf8');
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
const s0 = scripts[0][1];

const mockDoc = {
    addEventListener: () => {},
    getElementById: () => null,
    querySelectorAll: () => []
};

const sandbox = {
    window: {},
    document: mockDoc
};

const fn = new Function('window', 'document', s0);
fn(sandbox.window, sandbox.document);
const d = sandbox.window.lessonData;
console.log('lessonData keys:', Object.keys(d || {}));
if (d) {
    console.log({
        title: d.title,
        questions: d.questions?.length,
        readingDecks: d.readingDecks?.length,
        storyPages: d.storyPages?.length,
        dialogue: d.dialogue ? Object.keys(d.dialogue) : null,
        dialogues: d.dialogues?.length
    });
}
