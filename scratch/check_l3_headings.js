const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/lesson-3.html.bak', 'utf8');
const vocabIdx = html.indexOf('id="vocab"');
const vocabEnd = html.indexOf('id="verbs"');
const vocabHtml = html.substring(vocabIdx, vocabEnd);
const subtitles = [...vocabHtml.matchAll(/<h[34][^>]*>([\s\S]*?)<\/h[34]>/g)].map(m => m[1].replace(/<\/?[^>]+(>|$)/g, '').trim());
console.log('Vocab subtitles:', subtitles);
