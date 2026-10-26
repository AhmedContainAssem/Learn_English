const fs = require('fs');

const content = fs.readFileSync('Prep_3/unit-3/lesson-1.html.bak', 'utf8');

function extractCards(html) {
    const cards = [];
    const cardRegex = /<div class="card[^"]*"[\s\S]*?<\/div>\s*<\/div>/g;
    let m;
    while ((m = cardRegex.exec(html)) !== null) {
        cards.push(m[0]);
    }
    return cards;
}

const tabVocab = content.slice(content.indexOf('id="vocab"'), content.indexOf('id="verbs"'));
console.log('Tab Vocab cards count:', extractCards(tabVocab).length);

const tabVerbs = content.slice(content.indexOf('id="verbs"'), content.indexOf('id="collocations-affixes"'));
console.log('Tab Verbs cards count:', extractCards(tabVerbs).length);

const tabColloc = content.slice(content.indexOf('id="collocations-affixes"'), content.indexOf('id="synonyms-antonyms"'));
console.log('Tab Colloc length:', tabColloc.length);

const tabSyn = content.slice(content.indexOf('id="synonyms-antonyms"'), content.indexOf('id="general-notes"'));
console.log('Tab Syn length:', tabSyn.length);

const tabNotes = content.slice(content.indexOf('id="general-notes"'), content.indexOf('id="storybook"'));
console.log('Tab Notes length:', tabNotes.length);

const tabStory = content.slice(content.indexOf('id="storybook"'), content.indexOf('id="dialogue-speaking"'));
console.log('Tab Story length:', tabStory.length);

const tabDialogue = content.slice(content.indexOf('id="dialogue-speaking"'), content.indexOf('id="grammar"'));
console.log('Tab Dialogue length:', tabDialogue.length);

const tabGrammar = content.slice(content.indexOf('id="grammar"'), content.indexOf('id="quiz"'));
console.log('Tab Grammar length:', tabGrammar.length);
