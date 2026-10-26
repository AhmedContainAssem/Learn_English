const fs = require('fs');

const html = fs.readFileSync('Sec_3/unit-1/lesson-1-2.html', 'utf8');

// Parse IDs actually in html
const ids = new Set();
for (const match of html.matchAll(/id="([^"]+)"/g)) {
    ids.add(match[1]);
}
console.log('Real IDs in Sec_3/unit-1/lesson-1-2.html:', Array.from(ids));

const elements = {};
Array.from(ids).forEach(id => {
    elements[id] = { id, innerHTML: '', style: {}, classList: { add: ()=>{}, remove: ()=>{} } };
});

global.window = global;
global.document = {
    getElementById: (id) => elements[id] || null,
    querySelectorAll: () => [],
    querySelector: () => null
};

eval(fs.readFileSync('assets/js/renderers/ui-primitives.js', 'utf8'));
eval(fs.readFileSync('assets/js/renderers/vocab-renderer.js', 'utf8'));
eval(fs.readFileSync('Sec_3/unit-1/lesson-1-2.data.js', 'utf8'));

const d = window.__LESSON_DATA__ || window.lessonData;
window.VocabRenderer.render(d);

console.log('vocab container innerHTML length:', elements['vocab'] ? elements['vocab'].innerHTML.length : 'NULL');
