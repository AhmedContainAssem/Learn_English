const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/connect-plus-lesson-1-2.html.bak', 'utf8');

function getTab(tabId) {
    const reg = new RegExp(`<div id="${tabId}"[^>]*>`, 'i');
    const m = html.match(reg);
    if (!m) return '';
    const start = m.index + m[0].length;
    const next = html.substring(start).search(/<div id="[^"]+" class="tab-content|<!-- =+ -->\s*<!-- Tab \d+/i);
    return next === -1 ? html.substring(start, html.indexOf('</main>', start)) : html.substring(start, start + next);
}

// Check Storybook structure
const story = getTab('storybook');
console.log('=== STORYBOOK PREVIEW ===');
console.log(story.substring(0, 1000));

// Check Dialogue structure
const dia = getTab('dialogue');
console.log('=== DIALOGUE PREVIEW ===');
console.log(dia.substring(0, 1000));

// Check Grammar structure
const gr = getTab('grammar');
console.log('=== GRAMMAR PREVIEW ===');
console.log(gr.substring(0, 1000));
