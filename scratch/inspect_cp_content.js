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

// 1. Vocab tab
const vocabContent = getTab('vocab');
const vocabCards = vocabContent.split('<div class="card"').slice(1);
console.log('Vocab Cards count:', vocabCards.length);
// Check subtitles in vocab
const vocabSubtitles = [...vocabContent.matchAll(/<h3 class="section-subtitle"[^>]*>([\s\S]*?)<\/h3>/g)].map(m => m[1].replace(/<\/?[^>]+(>|$)/g, '').trim());
console.log('Vocab subtitles:', vocabSubtitles);

// 2. Storybook tab
const storyContent = getTab('storybook');
console.log('Storybook content length:', storyContent.length);
// Check for decks or story passages
const deckMatches = [...storyContent.matchAll(/class="[^"]*deck[^"]*"|class="[^"]*story[^"]*"/gi)];
console.log('Storybook classes count:', deckMatches.length);

// 3. Dialogue tab
const dialogueContent = getTab('dialogue');
console.log('Dialogue content length:', dialogueContent.length);

// 4. Grammar tab
const grammarContent = getTab('grammar');
console.log('Grammar content length:', grammarContent.length);

// 5. Verbs tab
const verbsContent = getTab('verbs');
console.log('Verbs content length:', verbsContent.length);

// 6. Definitions tab
const defsContent = getTab('definitions');
console.log('Defs content length:', defsContent.length);

// 7. Synonyms-Affixes tab
const synAffContent = getTab('synonyms-affixes');
console.log('Syn-Aff content length:', synAffContent.length);
