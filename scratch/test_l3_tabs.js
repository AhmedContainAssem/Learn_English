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

// Check vocab
const vocabTab = getTab('vocab');
const vocabCards = splitCards(vocabTab);
console.log('Vocab cards count:', vocabCards.length);

// Check verbs
const verbsTab = getTab('verbs');
const verbCards = splitCards(verbsTab);
console.log('Verbs cards count:', verbCards.length);

// Check definitions & collocations
const defsTab = getTab('definitions');
const defCards = splitCards(defsTab.substring(0, defsTab.indexOf('Collocations') !== -1 ? defsTab.indexOf('Collocations') : defsTab.length));
console.log('Defs cards count:', defCards.length);

// Check synonyms
const synTab = getTab('synonyms');
console.log('Synonyms table/cards:', synTab.includes('<table') ? 'table' : 'cards', splitCards(synTab).length);

// Check notes-affixes
const notesTab = getTab('notes-affixes');
console.log('Notes-affixes cards count:', splitCards(notesTab).length);

// Check reading
const readingTab = getTab('reading');
console.log('Reading tab length:', readingTab.length);

// Check grammar
const grTab = getTab('grammar-video');
console.log('Grammar tab length:', grTab.length);
