const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/lesson-1-2.html.bak', 'utf8');

function getSection(startId, endId) {
  const startIdx = html.indexOf(`id="${startId}"`);
  if (startIdx === -1) return '';
  const endIdx = endId ? html.indexOf(`id="${endId}"`) : html.length;
  return html.substring(startIdx, endIdx);
}

// 1. vocab
const vocabSec = getSection('vocab', 'verbs');
const vocabCards = [...vocabSec.matchAll(/<div class="word-en">([^<]+)<\/div>/g)].map(m => m[1].trim());
console.log('Vocab cards (' + vocabCards.length + '):', vocabCards);

// 2. verbs
const verbsSec = getSection('verbs', 'definitions');
const verbsCards = [...verbsSec.matchAll(/<div class="word-en">([^<]+)<\/div>/g)].map(m => m[1].trim());
console.log('Verbs cards (' + verbsCards.length + '):', verbsCards);

// 3. definitions
const defsSec = getSection('definitions', 'synonyms');
const defsCards = [...defsSec.matchAll(/<div class="word-en">([^<]+)<\/div>/g)].map(m => m[1].trim());
console.log('Definitions cards (' + defsCards.length + '):', defsCards);

// 4. synonyms
const synSec = getSection('synonyms', 'affixes');
const synCards = [...synSec.matchAll(/<div class="word-en">([^<]+)<\/div>/g)].map(m => m[1].trim());
console.log('Synonyms cards (' + synCards.length + '):', synCards);

// 5. affixes
const affSec = getSection('affixes', 'quiz');
const affCards = [...affSec.matchAll(/<div class="word-en">([^<]+)<\/div>/g)].map(m => m[1].trim());
console.log('Affixes cards (' + affCards.length + '):', affCards);

// 6. quiz script
const sQuiz = html.indexOf('window.lessonData = {');
console.log('Quiz script start:\n', html.substring(sQuiz, sQuiz + 300));
