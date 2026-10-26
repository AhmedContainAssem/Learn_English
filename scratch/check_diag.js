const fs = require('fs');
const path = require('path');
const vm = require('vm');

const html = fs.readFileSync('Sec_1/unit-2/lesson-1.html', 'utf8');
const data = fs.readFileSync('Sec_1/unit-2/lesson-1.data.js', 'utf8');

const elements = new Map();
const idRegex = /id=["']([^"']+)["']/g;
let match;
while ((match = idRegex.exec(html)) !== null) {
    elements.set(match[1], { id: match[1], innerHTML: '', style: {}, classList: { add: ()=>{}, remove: ()=>{} }, parentNode: null });
}

const doc = {
    getElementById: (id) => elements.get(id) || null,
    querySelectorAll: () => [],
    querySelector: () => null,
    getElementsByTagName: () => [],
    createElement: () => ({ style: {}, classList: { add: ()=>{}, remove: ()=>{} } })
};
const sb = { window: { speechSynthesis: { speak: ()=>{}, cancel: ()=>{} } }, document: doc, console };
sb.window.document = doc;
sb.window.window = sb.window;
vm.createContext(sb);

['assets/js/renderers/ui-primitives.js', 'assets/js/renderers/dialogue-player.js', 'assets/js/curriculum-renderer.js'].forEach(f => {
    vm.runInContext(fs.readFileSync(f, 'utf8'), sb);
});
vm.runInContext(data, sb);
sb.window.CurriculumRenderer.init();

console.log('dialogue innerHTML len:', elements.get('dialogue')?.innerHTML?.length);
console.log('dialogue-banner-container innerHTML len:', elements.get('dialogue-banner-container')?.innerHTML?.length);
console.log('dialogue-list-container innerHTML len:', elements.get('dialogue-list-container')?.innerHTML?.length);
