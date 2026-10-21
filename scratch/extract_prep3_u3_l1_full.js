const fs = require('fs');

const content = fs.readFileSync('Prep_3/unit-3/lesson-1.html.bak', 'utf8');

// Parse Key Vocabulary (first 15) and Lesson 1 Vocab (next 14) from #vocab
const vocabSection = content.slice(content.indexOf('id="vocab"'), content.indexOf('id="verbs"'));
const vocabCards = [];
const cardRegex = /<div class="card"[\s\S]*?<\/div>\s*<\/div>/g;
let m;
while ((m = cardRegex.exec(vocabSection)) !== null) {
    const cardHtml = m[0];
    const posMatch = cardHtml.match(/<span class="tag-badge">([^<]+)<\/span>/);
    const wordMatch = cardHtml.match(/<div class="word-en"[^>]*>([^<]+)<\/div>/);
    const meaningMatch = cardHtml.match(/<strong>المعنى:<\/strong>\s*([^<\n]+)/);
    const explainMatch = cardHtml.match(/💡 <strong>التوضيح:<\/strong>\s*([^<]+)/);
    
    if (wordMatch) {
        vocabCards.push({
            word: wordMatch[1].trim(),
            pos: posMatch ? posMatch[1].trim() : 'Word',
            meaning: meaningMatch ? meaningMatch[1].trim() : '',
            explain: explainMatch ? explainMatch[1].trim() : ''
        });
    }
}
console.log('Extracted vocab words:', vocabCards.length);

// Parse Verbs (14 verbs)
const verbsSection = content.slice(content.indexOf('id="verbs"'), content.indexOf('id="collocations-affixes"'));
const verbsCards = [];
const vCardRegex = /<div class="card"[\s\S]*?<\/div>\s*<\/div>/g;
while ((m = vCardRegex.exec(verbsSection)) !== null) {
    const cardHtml = m[0];
    const wordMatch = cardHtml.match(/<div class="word-en"[^>]*>([^<]+)<\/div>/);
    const meaningMatch = cardHtml.match(/<strong>المعنى:<\/strong>\s*([^<\n]+)/);
    const formsMatch = cardHtml.match(/الماضي والتصريف الثالث:\s*<span>([^<]+)<\/span>/);
    const audioMatch = cardHtml.match(/speakText\('([^']+)'/);
    if (wordMatch) {
        verbsCards.push({
            word: wordMatch[1].trim(),
            meaning: meaningMatch ? meaningMatch[1].trim() : '',
            forms: formsMatch ? formsMatch[1].trim() : '',
            audio: audioMatch ? audioMatch[1].trim() : wordMatch[1].trim()
        });
    }
}
console.log('Extracted verbs:', verbsCards.length);

// Parse Collocations (6)
const collocSection = content.slice(content.indexOf('id="collocations-affixes"'), content.indexOf('id="synonyms-antonyms"'));
const collocations = [];
const cItemRegex = /<div class="study-item">[\s\S]*?<span>([^<]+)<\/span>[\s\S]*?<div class="study-item-ar"[^>]*>([^<]+)<\/div>/g;
while ((m = cItemRegex.exec(collocSection)) !== null) {
    collocations.push({
        phrase: m[1].trim(),
        en: m[1].trim(),
        meaning: m[2].trim(),
        ar: m[2].trim()
    });
}
console.log('Extracted collocations:', collocations.length);

// Parse Affixes (7)
const affixes = [];
const affCardRegex = /<div class="word-en"[^>]*>([^<]+)<\/div>[\s\S]*?<strong>الوظيفة والتحويل:<\/strong>\s*([^<]+)[\s\S]*?<span[^>]*>([^<]+)<\/span>/g;
while ((m = affCardRegex.exec(collocSection)) !== null) {
    affixes.push({
        affix: m[1].trim(),
        word: m[1].trim(),
        role: m[2].trim(),
        examples: m[3].trim()
    });
}
console.log('Extracted affixes:', affixes.length);

// Parse Synonyms & Antonyms (10)
const synSection = content.slice(content.indexOf('id="synonyms-antonyms"'), content.indexOf('id="general-notes"'));
const synonyms = [];
const synCardRegex = /<div class="study-item-en"[^>]*>([^<]+)<\/div>\s*<div class="study-item-ar"[^>]*>([^<]+)<\/div>[\s\S]*?✨ Synonym[^:]*:\s*<\/strong>\s*<div[^>]*>([^<]+)<\/div>\s*<\/div>\s*<div class="ant-box">\s*<strong[^>]*>⚡ Antonym[^:]*:\s*<\/strong>\s*<div[^>]*>([^<]+)(?:<span[^>]*>\(([^)]+)\)<\/span>)?/g;
while ((m = synCardRegex.exec(synSection)) !== null) {
    synonyms.push({
        word: m[1].trim(),
        ar: m[2].trim(),
        meaning: m[2].trim(),
        synonym: m[3].trim(),
        synonyms: m[3].trim(),
        antonym: m[4].trim(),
        antonyms: m[4].trim(),
        arAnt: m[5] ? m[5].trim() : ''
    });
}
console.log('Extracted synonyms:', synonyms.length);
