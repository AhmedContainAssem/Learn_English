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

// 1. Vocabulary & Pop Quiz
const vocabTab = getTab('vocab');
const keyVocabStart = vocabTab.indexOf('🌟 المفردات الرئيسية');
const popQuizStart = vocabTab.indexOf('<div class="pop-quiz-box">');
const extraVocabStart = vocabTab.indexOf('📖 مفردات إضافية');

const keyVocabHtml = vocabTab.substring(keyVocabStart, popQuizStart);
const popQuizHtml = vocabTab.substring(popQuizStart, extraVocabStart);
const extraVocabHtml = vocabTab.substring(extraVocabStart);

function parseVocabCard(c) {
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const posMatch = c.match(/<span class="tag-badge">([\s\S]*?)<\/span>/);
    const meaningMatch = c.match(/<strong>المعنى:<\/strong>([\s\S]*?)(?:<div|$)/);

    return {
        word: wordMatch ? wordMatch[1].trim() : '',
        pos: posMatch ? posMatch[1].trim() : 'Vocab',
        meaning: meaningMatch ? meaningMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : ''
    };
}

const keyVocabulary = splitCards(keyVocabHtml).map(parseVocabCard).filter(v => v.word);
const lessonVocabulary = splitCards(extraVocabHtml).map(parseVocabCard).filter(v => v.word);
console.log('Key Vocab:', keyVocabulary.length);
console.log('Lesson Vocab:', lessonVocabulary.length);

// Pop Quiz
const wordsBankMatches = [...popQuizHtml.matchAll(/<span class="word-token"[^>]*>([\s\S]*?)<\/span>/g)];
const wordsBank = wordsBankMatches.map(m => m[1].replace(/🔊/g, '').trim());

const popExerciseMatches = [...popQuizHtml.matchAll(/<div class="pop-exercise-item"[^>]*>[\s\S]*?<span>(\d+\.[\s\S]*?)<\/span>[\s\S]*?checkPopQuiz\(this,\s*'([^']+)'\)[\s\S]*?<span>([\s\S]*?)<\/span>/g)];
const popQuizQuestions = popExerciseMatches.map(m => ({
    prefix: m[1].trim(),
    correct: m[2].trim(),
    suffix: m[3].trim(),
    fullSentence: `${m[1].trim()} ${m[2].trim()} ${m[3].trim()}`.replace(/\s+/g, ' ')
}));
console.log('Pop Quiz:', { wordsBank, questionsCount: popQuizQuestions.length });

// 2. Verbs
const verbsTab = getTab('verbs');
const verbCards = splitCards(verbsTab);
const verbs = verbCards.map(c => {
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const meaningMatch = c.match(/<strong>المعنى:<\/strong>\s*([\s\S]*?)(?:<\/div>|$)/);
    const pastMatch = c.match(/Past:\s*<strong>([\s\S]*?)<\/strong>\s*\|\s*P\.P\.:\s*<strong>([\s\S]*?)<\/strong>/);

    const fullWord = wordMatch ? wordMatch[1].trim() : '';
    const parts = fullWord.split('/').map(p => p.trim());
    const v1 = parts[0] || '';
    const v2 = pastMatch ? pastMatch[1].trim() : (parts[1] || '');
    const v3 = pastMatch ? pastMatch[2].trim() : (parts[2] || parts[1] || '');

    return {
        word: v1,
        v1, v2, v3,
        forms: `${v2} / ${v3}`,
        meaning: meaningMatch ? meaningMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : '',
        audio: `${v1}, ${v2}, ${v3}`
    };
}).filter(v => v.word);
console.log('Verbs:', verbs.length, verbs.map(v => v.word));

// 3. Definitions & Collocations
const defsTab = getTab('definitions');
const collocIdx = defsTab.indexOf('🔗 متلازمات لفظية');
const defPart = collocIdx !== -1 ? defsTab.substring(0, collocIdx) : defsTab;
const collocPart = collocIdx !== -1 ? defsTab.substring(collocIdx) : '';

const defCards = splitCards(defPart);
const definitions = defCards.map(c => {
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const arMatch = c.match(/<div style="color: var\(--accent-primary\)[^>]*>([\s\S]*?)<\/div>/);
    const defTextMatch = c.match(/<div style="line-height: 1\.6;">([\s\S]*?)<\/div>/);

    return {
        word: wordMatch ? wordMatch[1].trim() : '',
        definition: defTextMatch ? defTextMatch[1].trim() : '',
        meaning: arMatch ? arMatch[1].trim() : ''
    };
}).filter(d => d.word);
console.log('Definitions:', definitions.length, definitions.map(d => d.word));

const collocCards = splitCards(collocPart);
const collocations = collocCards.map(c => {
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const arMatch = c.match(/<strong>المعنى:<\/strong>\s*([\s\S]*?)(?:<\/div>|$)/);

    return {
        phrase: wordMatch ? wordMatch[1].trim() : '',
        en: wordMatch ? wordMatch[1].trim() : '',
        ar: arMatch ? arMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : ''
    };
}).filter(c => c.phrase);
console.log('Collocations:', collocations.length, collocations.map(c => c.phrase));

// 4. Synonyms & Antonyms
const synTab = getTab('synonyms');
const synCards = splitCards(synTab);
const synonyms = synCards.map(c => {
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const arMatch = c.match(/<strong>المعنى:<\/strong>\s*([\s\S]*?)(?:<\/div>|$)/);
    const synMatch = c.match(/Synonyms?:<\/strong>\s*<span[^>]*>([\s\S]*?)<\/span>/);
    const antMatch = c.match(/Antonyms?:<\/strong>\s*<span[^>]*>([\s\S]*?)<\/span>/);

    return {
        word: wordMatch ? wordMatch[1].trim() : '',
        meaning: arMatch ? arMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : '',
        ar: arMatch ? arMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : '',
        synonym: synMatch ? synMatch[1].trim() : '',
        synonyms: synMatch ? synMatch[1].trim() : '',
        antonym: antMatch ? antMatch[1].trim() : '',
        antonyms: antMatch ? antMatch[1].trim() : ''
    };
}).filter(s => s.word);
console.log('Synonyms:', synonyms.length, synonyms.map(s => s.word));

// 5. Notes & Affixes
const notesTab = getTab('notes-affixes');
const notesCards = splitCards(notesTab);
const affixes = [];
const confusionNotes = [];

notesCards.forEach(c => {
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const title = wordMatch ? wordMatch[1].trim() : '';

    if (title.includes('Prefix') || title.includes('Suffix') || title.startsWith('-') || title.endsWith('-')) {
        const roleMatch = c.match(/<strong>الوظيفة[^:]*:<\/strong>\s*([\s\S]*?)(?:<div|$)/);
        const exMatch = c.match(/أمثلة:\s*<span>([\s\S]*?)<\/span>/);
        affixes.push({
            affix: title.replace(/\([^)]*\)/g, '').trim(),
            type: title.includes('Prefix') ? 'Prefix' : 'Suffix',
            role: roleMatch ? roleMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : '',
            examples: exMatch ? exMatch[1].trim() : ''
        });
    } else {
        const bodyMatch = c.match(/<div class="card-body">([\s\S]*?)<\/div>\s*<\/div>/);
        confusionNotes.push({
            title: title,
            desc: bodyMatch ? bodyMatch[1].replace(/<\/?[^>]+(>|$)/g, ' ').replace(/\s+/g, ' ').trim() : ''
        });
    }
});
console.log('Affixes:', affixes.length, affixes.map(a => a.affix));
console.log('Confusion Notes:', confusionNotes.length);

// 6. Story Pages
const storyPagesMatch = html.match(/storyPages:\s*(\[[\s\S]*?\])\s*,\s*quiz:/);
let storyPages = [];
if (storyPagesMatch) {
    const fn = new Function('return ' + storyPagesMatch[1]);
    storyPages = fn();
}
console.log('Story Pages:', storyPages.length);

// 7. Quiz Questions
const quizDataMatch = html.match(/const quizData\s*=\s*(\[[\s\S]*?\]);/);
let questions = [];
if (quizDataMatch) {
    const fn = new Function('return ' + quizDataMatch[1]);
    questions = fn();
}
console.log('Quiz Questions:', questions.length);

// Build complete data payload
const payload = {
    id: "prep3_unit2_lesson3",
    title: "Prep 3 - Unit 2 - Lesson 3: The Silent Dinner",
    description: "المفردات، الأفعال، التعريفات والمتلازمات، المرادفات والمتضادات، اللغويات والتعبيرات، القراءة التفاعلية المصورة مع محرك القصص (StoryEngine)، شرح قواعد المضارع التام والمستمر، واختبار شامل 🎯",
    stage: "Prep_3",
    unit: "unit-2",
    lesson: "lesson-3",
    sbPages: "SB pages 32 & 33",
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
    confusionNotes,
    storyPages,
    quiz: questions,
    questions: questions,
    totalQuestions: questions.length
};

const output = `/**
 * Prep 3 - Unit 2 - Lesson 3 Data Payload
 * The Silent Dinner • Communication, Listening & Reconnecting
 * Decoupled data architecture adhering strictly to DRY & SoC.
 */

window.lessonData = ${JSON.stringify(payload, null, 4)};
window.quizData = window.lessonData;
`;

fs.writeFileSync('Prep_3/unit-2/lesson-3.data.js', output, 'utf8');
console.log('Successfully written Prep_3/unit-2/lesson-3.data.js');
