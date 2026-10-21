const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/lesson-3.html.bak', 'utf8');

function getTab(tabId) {
    const reg = new RegExp(`<div id="${tabId}"[^>]*>`, 'i');
    const m = html.match(reg);
    if (!m) return '';
    const start = m.index + m[0].length;
    const next = html.substring(start).search(/<div id="[^"]+" class="tab-content|<!-- =+ -->\s*<!-- Tab \d+/i);
    return next === -1 ? html.substring(start, html.indexOf('</main>', start)) : html.substring(start, start + next);
}

const gr = getTab('grammar-video');
console.log(gr.substring(0, 1200));

// Check if GrammarSlides engine is used
console.log('Has slides:', gr.includes('slide-presentation-container'));
console.log('Slide frames count:', (gr.match(/class="slide-frame"/g) || []).length);
