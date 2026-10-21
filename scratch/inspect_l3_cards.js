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

function splitCards(snippet) {
    return snippet.split('<div class="card"').slice(1);
}

// 1. Vocab cards
const vocabCards = splitCards(getTab('vocab'));
console.log('Sample vocab card:');
console.log(vocabCards[0]?.substring(0, 400));

// 2. Verbs cards
const verbCards = splitCards(getTab('verbs'));
console.log('\nSample verb card:');
console.log(verbCards[0]?.substring(0, 400));

// 3. Defs cards
const defCards = splitCards(getTab('definitions'));
console.log('\nSample def card:');
console.log(defCards[0]?.substring(0, 400));

// 4. Synonyms cards
const synCards = splitCards(getTab('synonyms'));
console.log('\nSample syn card:');
console.log(synCards[0]?.substring(0, 400));

// 5. Notes & Affixes cards
const notesCards = splitCards(getTab('notes-affixes'));
console.log('\nSample notes-affixes card:');
console.log(notesCards[0]?.substring(0, 400));
