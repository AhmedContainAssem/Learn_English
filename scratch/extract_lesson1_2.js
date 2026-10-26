const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/lesson-1-2.html.bak', 'utf8');

function splitCards(snippet) {
    return snippet.split('<div class="card"').slice(1);
}

// 1. Key Vocabulary
const keyVocabStart = html.indexOf('🌟 المفردات الرئيسية');
const keyVocabEnd = html.indexOf('<div class="pop-quiz-box">', keyVocabStart);
const keyVocabHtml = html.substring(keyVocabStart, keyVocabEnd);
const keyCards = splitCards(keyVocabHtml);

const keyVocabulary = keyCards.map(c => {
    const posMatch = c.match(/<span class="tag-badge">([\s\S]*?)<\/span>/);
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const meaningMatch = c.match(/<strong>المعنى:<\/strong>([\s\S]*?)(?:<\/div>|$)/);
    return {
        word: wordMatch ? wordMatch[1].trim() : '',
        pos: posMatch ? posMatch[1].trim() : 'Vocab',
        meaning: meaningMatch ? meaningMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : ''
    };
});
console.log('Extracted Key Vocabulary:', keyVocabulary.length, keyVocabulary.map(k => k.word));

// 2. Pop Quiz
const popQuizStart = html.indexOf('<div class="pop-quiz-box">');
const popQuizEnd = html.indexOf('📘 مفردات الدرس الأول', popQuizStart);
const popQuizHtml = html.substring(popQuizStart, popQuizEnd);

const wordsBankMatches = [...popQuizHtml.matchAll(/<span class="word-token"[^>]*>([\s\S]*?)🔊?<\/span>/g)];
const wordsBank = wordsBankMatches.map(m => m[1].replace(/🔊/g, '').trim());

const popExerciseMatches = [...popQuizHtml.matchAll(/<div class="pop-exercise-item"[^>]*>[\s\S]*?<span>(\d+\.[\s\S]*?)<\/span>[\s\S]*?data-correct="([^"]+)"[\s\S]*?<span>([\s\S]*?)<\/span>[\s\S]*?speakText\('([^']+)'\)/g)];
const popQuizQuestions = popExerciseMatches.map(m => ({
    prefix: m[1].trim(),
    correct: m[2].trim(),
    suffix: m[3].trim(),
    fullSentence: m[4].trim()
}));
console.log('Extracted Pop Quiz:', { wordsBank, questionsCount: popQuizQuestions.length });

// 3. Lesson Vocabulary
const lessonVocabStart = html.indexOf('📘 مفردات الدرس الأول');
const lessonVocabEnd = html.indexOf('Tab 2: Irregular Verbs', lessonVocabStart);
const lessonVocabHtml = html.substring(lessonVocabStart, lessonVocabEnd);
const lessonCards = splitCards(lessonVocabHtml);

const lessonVocabulary = lessonCards.map(c => {
    const posMatch = c.match(/<span class="tag-badge">([\s\S]*?)<\/span>/);
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const meaningMatch = c.match(/<strong>المعنى:<\/strong>([\s\S]*?)(?:<\/div>|$)/);
    return {
        word: wordMatch ? wordMatch[1].trim() : '',
        pos: posMatch ? posMatch[1].trim() : 'Vocab',
        meaning: meaningMatch ? meaningMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : ''
    };
});
console.log('Extracted Lesson Vocabulary:', lessonVocabulary.length, lessonVocabulary.map(l => l.word));

// 4. Verbs
const verbsStart = html.indexOf('Tab 2: Irregular Verbs');
const verbsEnd = html.indexOf('Tab 3: Definitions', verbsStart);
const verbsHtml = html.substring(verbsStart, verbsEnd);

const verbMatches = [...verbsHtml.matchAll(/<tr>[\s\S]*?<strong class="en-text">([\s\S]*?)<\/strong>[\s\S]*?<td>([\s\S]*?)<\/td>[\s\S]*?<span class="en-text">([\s\S]*?)<\/span>[\s\S]*?<span class="en-text">([\s\S]*?)<\/span>/g)];
const verbs = verbMatches.map(m => ({
    word: m[1].trim(),
    v1: m[1].trim(),
    v2: m[3].trim(),
    v3: m[4].trim(),
    forms: `${m[3].trim()} / ${m[4].trim()}`,
    meaning: m[2].trim(),
    audio: `${m[1].trim()}, ${m[3].trim()}, ${m[4].trim()}`
}));
console.log('Extracted Verbs:', verbs.length, verbs.map(v => v.word));

// 5. Definitions & Collocations
const defsStart = html.indexOf('Tab 3: Definitions');
const defsEnd = html.indexOf('Tab 4: Synonyms', defsStart);
const defsHtml = html.substring(defsStart, defsEnd);

const collocMarker = defsHtml.indexOf('<!-- Collocations -->');
const defPart = defsHtml.substring(0, collocMarker);
const collocPart = defsHtml.substring(collocMarker);

const defCards = splitCards(defPart);
const definitions = defCards.map(c => {
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const defTextMatch = c.match(/<span class="def-text">([\s\S]*?)<\/span>/);
    const arMatch = c.match(/المعنى بالعربية:\s*<span>([\s\S]*?)<\/span>/);
    return {
        word: wordMatch ? wordMatch[1].trim() : '',
        definition: defTextMatch ? defTextMatch[1].trim() : '',
        meaning: arMatch ? arMatch[1].trim() : ''
    };
});
console.log('Extracted Definitions:', definitions.length, definitions.map(d => d.word));

const collocCards = splitCards(collocPart);
const collocations = collocCards.map(c => {
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const arMatch = c.match(/<strong>المعنى:<\/strong>\s*([\s\S]*?)(?:<\/div>|$)/);
    return {
        phrase: wordMatch ? wordMatch[1].trim() : '',
        en: wordMatch ? wordMatch[1].trim() : '',
        ar: arMatch ? arMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : ''
    };
});
console.log('Extracted Collocations:', collocations.length, collocations.map(c => c.phrase));

// 6. Synonyms & Antonyms
const synStart = html.indexOf('Tab 4: Synonyms');
const synEnd = html.indexOf('Tab 5: Prefixes', synStart);
const synHtml = html.substring(synStart, synEnd);

const synRowMatches = [...synHtml.matchAll(/<tr>[\s\S]*?<td><span class="en-text">([\s\S]*?)<\/span>(?:\s*<br><small>([\s\S]*?)<\/small>)?<\/td>[\s\S]*?<td><span class="en-text">([\s\S]*?)<\/span><\/td>[\s\S]*?<td><span class="en-text">([\s\S]*?)<\/span>(?:\s*<br><small>([\s\S]*?)<\/small>)?<\/td>/g)];
const synonyms = synRowMatches.map(m => ({
    word: m[1].trim(),
    ar: (m[2] || '').trim(),
    synonym: m[3].trim(),
    antonym: m[4].trim(),
    arAnt: (m[5] || '').trim()
}));
console.log('Extracted Synonyms:', synonyms.length, synonyms.map(s => s.word));

// 7. Affixes
const affixesStart = html.indexOf('Tab 5: Prefixes');
const affixesEnd = html.indexOf('Tab 6: Comprehensive', affixesStart);
const affixesHtml = html.substring(affixesStart, affixesEnd);

const affixCards = splitCards(affixesHtml);
const affixes = affixCards.map(c => {
    const typeMatch = c.match(/<span class="tag-badge">([\s\S]*?)<\/span>/);
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const roleMatch = c.match(/<strong>الوظيفة:<\/strong>\s*([\s\S]*?)(?:<div class="details-box"|$)/);
    const exMatch = c.match(/<div class="details-box">أمثلة:\s*<span>([\s\S]*?)<\/span>/);
    return {
        type: typeMatch ? typeMatch[1].trim() : 'Affix',
        affix: wordMatch ? wordMatch[1].trim() : '',
        role: roleMatch ? roleMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : '',
        examples: exMatch ? exMatch[1].trim() : ''
    };
});
console.log('Extracted Affixes:', affixes.length, affixes.map(a => a.affix));

// 8. Quiz Questions
const quizScriptIdx = html.indexOf('window.lessonData = {');
const quizEndIdx = html.indexOf('</script>', quizScriptIdx);
const quizScriptContent = html.substring(quizScriptIdx, quizEndIdx);
const sandbox = { window: {} };
const fn = new Function('window', quizScriptContent);
fn(sandbox.window);
const questions = sandbox.window.lessonData.questions;
console.log('Extracted Quiz Questions:', questions.length);

// Build complete data payload object
const payload = {
    id: "prep3_unit2_lesson1_2",
    title: "Prep 3 - Unit 2 - Lessons 1 & 2: Stay connected • Communication, Challenges and Solutions",
    description: "المفردات الأساسية والتكميلية كاملة، تدريب Pop Quiz التفاعلي، تصريف الأفعال غير المنتظمة، التعريفات الهامة، المتلازمات اللفظية، المرادفات والمتضادات، المقاطع البادئة والناهية، واختبار شامل 🎯",
    stage: "Prep_3",
    unit: "unit-2",
    sbPages: "SB pages 28 : 31",
    keyVocabulary,
    popQuiz: {
        wordsBank,
        questions: popQuizQuestions
    },
    popQuizFocus: {
        words: wordsBank.join(', '),
        examples: popQuizQuestions.map(q => q.fullSentence)
    },
    lessonVocabulary,
    verbs,
    definitions,
    collocations,
    synonyms,
    affixes,
    quiz: questions,
    questions: questions,
    totalQuestions: questions.length
};

const fileContent = `/**
 * Prep 3 - Unit 2 - Lessons 1 & 2 Data Payload
 * Stay connected • Communication, Challenges and Solutions
 * Decoupled data architecture adhering strictly to DRY & SoC.
 */

window.lessonData = ${JSON.stringify(payload, null, 4)};
`;

fs.writeFileSync('Prep_3/unit-2/lesson-1-2.data.js', fileContent, 'utf8');
console.log('Successfully wrote Prep_3/unit-2/lesson-1-2.data.js');
