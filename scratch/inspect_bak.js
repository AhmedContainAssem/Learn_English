const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/lesson-1-2.html.bak', 'utf8');

function getTabContent(tabId) {
    const startRegex = new RegExp(`<div id="${tabId}"[^>]*>`, 'i');
    const startMatch = html.match(startRegex);
    if (!startMatch) return '';
    const startIdx = startMatch.index + startMatch[0].length;
    // Find next tab-content or end of main
    const nextMatch = html.substring(startIdx).search(/<div id="[^"]+" class="tab-content|<!-- =+ -->\s*<!-- Tab \d+/i);
    if (nextMatch === -1) {
        return html.substring(startIdx, html.indexOf('</main>', startIdx));
    }
    return html.substring(startIdx, startIdx + nextMatch);
}

['vocab', 'verbs', 'definitions', 'synonyms', 'affixes', 'quiz'].forEach(id => {
    const content = getTabContent(id);
    console.log(`=== TAB: ${id} === (length: ${content.length})`);
    // count cards
    const cardCount = (content.match(/class="card"/g) || []).length;
    const tableCount = (content.match(/<table/g) || []).length;
    console.log(`  Cards: ${cardCount}, Tables: ${tableCount}`);
});
