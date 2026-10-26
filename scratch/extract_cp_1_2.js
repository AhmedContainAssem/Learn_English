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

function splitCards(snippet) {
    return snippet.split('<div class="card"').slice(1);
}

// 1. Extract Vocab
const vocabTab = getTab('vocab');
const keyVocabStart = vocabTab.indexOf('🌟 المفردات الرئيسية');
const extraVocabStart = vocabTab.indexOf('📝 المفردات الإضافية');

const keyVocabHtml = vocabTab.substring(keyVocabStart, extraVocabStart);
const extraVocabHtml = vocabTab.substring(extraVocabStart);

function parseVocabCard(c) {
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const posMatch = c.match(/<span class="tag-badge">([\s\S]*?)<\/span>/);
    const meaningMatch = c.match(/<strong>المعنى:<\/strong>([\s\S]*?)(?:<div|$)/);
    const explainMatch = c.match(/💡\s*<strong>التوضيح:<\/strong>([\s\S]*?)<\/div>/);
    const exMatch = c.match(/<div class="en-example">([\s\S]*?)<\/div>/);
    const exArMatch = c.match(/💬([\s\S]*?)(?:<\/div>|$)/);

    return {
        word: wordMatch ? wordMatch[1].trim() : '',
        pos: posMatch ? posMatch[1].trim() : 'Vocab',
        meaning: meaningMatch ? meaningMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : '',
        explain: explainMatch ? explainMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : undefined,
        example: exMatch ? exMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : undefined,
        exampleAr: exArMatch ? exArMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : undefined
    };
}

const keyVocabulary = splitCards(keyVocabHtml).map(parseVocabCard);
const lessonVocabulary = splitCards(extraVocabHtml).map(parseVocabCard);
console.log('Extracted Key Vocab:', keyVocabulary.length);
console.log('Extracted Extra Vocab:', lessonVocabulary.length);

// 2. Extract Script 0 data: readingDecks, dialogueDecks, questions
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
const s0 = scripts[0][1];

const sandbox = {
    window: {},
    document: { addEventListener: () => {} }
};
const fn = new Function('window', 'document', s0);
fn(sandbox.window, sandbox.document);

const readingDecks = sandbox.window.readingDecks || [];
const dialogueDecks = sandbox.window.dialogueDecks || [];
const questions = sandbox.window.lessonData?.questions || [];
console.log('Extracted readingDecks:', readingDecks.length);
console.log('Extracted dialogueDecks:', dialogueDecks.length);
console.log('Extracted quiz questions:', questions.length);

// 3. Extract Irregular Verbs (Tab 5)
const verbsTab = getTab('verbs');
const verbCards = splitCards(verbsTab);
const verbs = verbCards.map(c => {
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const meaningMatch = c.match(/<strong>المعنى:<\/strong>([\s\S]*?)(?:<div|$)/);
    const presMatch = c.match(/🔹\s*<strong>Present:<\/strong>\s*<span class="highlight">([\s\S]*?)<\/span>/);
    const pastMatch = c.match(/🔹\s*<strong>Past:<\/strong>\s*<span class="highlight">([\s\S]*?)<\/span>/);
    const ppMatch = c.match(/🔹\s*<strong>P\.P\.:<\/strong>\s*<span class="highlight">([\s\S]*?)<\/span>/);
    const exMatch = c.match(/<div class="en-example">([\s\S]*?)<\/div>/);

    const v1 = presMatch ? presMatch[1].trim() : (wordMatch ? wordMatch[1].trim() : '');
    const v2 = pastMatch ? pastMatch[1].trim() : '';
    const v3 = ppMatch ? ppMatch[1].trim() : '';

    return {
        word: wordMatch ? wordMatch[1].trim() : '',
        v1, v2, v3,
        forms: `${v2} / ${v3}`,
        meaning: meaningMatch ? meaningMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : '',
        example: exMatch ? exMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : undefined,
        audio: `${v1}, ${v2}, ${v3}`
    };
});
console.log('Extracted Verbs:', verbs.length, verbs.map(v => v.word));

// 4. Extract Definitions & Notes (Tab 6)
const defsTab = getTab('definitions');
const defCards = splitCards(defsTab.substring(0, defsTab.indexOf('General Notes on Reading')));
const definitions = defCards.map(c => {
    const wordMatch = c.match(/<div class="word-en">([\s\S]*?)<\/div>/);
    const defTextMatch = c.match(/<div class="en-example"[^>]*>[\s\S]*?<span class="highlight">([\s\S]*?)<\/span>/);
    const arMatch = c.match(/💬([\s\S]*?)(?:<\/div>|$)/);

    return {
        word: wordMatch ? wordMatch[1].trim() : '',
        definition: defTextMatch ? defTextMatch[1].trim() : '',
        meaning: arMatch ? arMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : ''
    };
});
const cleanDefs = definitions.filter(d => d.word);
console.log('Extracted Definitions:', cleanDefs.length, definitions.map(d => d.word));

// Language notes (celebrity, celebration, celebrate)
const confusionNotes = [
    {
        title: "celebrity (n) = شخص مشهور",
        word: "celebrity",
        desc: "شخص مشهور أو نجم بارز في السينما أو المجتمع.",
        example: "Tom Hanks is a beloved celebrity known for his roles in many famous movies."
    },
    {
        title: "celebration (n) = احتفال (حدث / مناسبة)",
        word: "celebration",
        desc: "حدث أو مناسبة يتم الاحتفال فيها بشيء مهم.",
        example: "The town's annual celebration attracted important businessmen."
    },
    {
        title: "celebrate(d) (v) = يحتفل بـ",
        word: "celebrate",
        desc: "يقيم احتفالاً أو يشارك في مناسبة سعيدة.",
        example: "We will celebrate my birthday this weekend with a big party."
    }
];

// Expressions
const expressions = [
    { en: "I'd love to ...", ar: "أحب أن ..." },
    { en: "It's my dream to ...", ar: "حلمي أن ..." },
    { en: "I hope to ...", ar: "أتمنى أن ..." },
    { en: "close relatives", ar: "أقارب مقربون" },
    { en: "By the time ...", ar: "بحلول الوقت ..." },
    { en: "I'm not sure ...", ar: "لست متأكداً ..." },
    { en: "run a business", ar: "يدير عملاً / مشروعاً تجارياً" },
    { en: "make payments", ar: "يقوم بالسداد والدفع" }
];

// Prepositions
const prepositions = [
    { en: "save up for", ar: "يدخر من أجل (غرض أو سيارة)" },
    { en: "take part in", ar: "يشارك في" },
    { en: "on social media", ar: "على وسائل التواصل الاجتماعي" },
    { en: "interested in", ar: "مهتم بـ" },
    { en: "part of", ar: "جزء من" },
    { en: "focus on", ar: "يركز على" }
];

// 5. Synonyms & Antonyms (Tab 7)
const synTab = getTab('synonyms-affixes');
const synBoxes = [...synTab.substring(0, synTab.indexOf('Prefixes & Suffixes')).matchAll(/<div class="details-box"[^>]*>([\s\S]*?)<\/div>/g)];
const synonyms = synBoxes.map(b => {
    const txt = b[1];
    const wordMatch = txt.match(/<div style="font-size: 1.2rem;[^"]*">([\s\S]*?)<span[^>]*>\(([\s\S]*?)\)<\/span>/);
    const synMatch = txt.match(/Synonym:<\/strong>\s*<span[^>]*>([\s\S]*?)<\/span>\s*\(([\s\S]*?)\)/);
    const antMatch = txt.match(/Antonym:<\/strong>\s*<span[^>]*>([\s\S]*?)<\/span>\s*\(([\s\S]*?)\)/);

    return {
        word: wordMatch ? wordMatch[1].trim() : '',
        ar: wordMatch ? wordMatch[2].trim() : '',
        synonym: synMatch ? synMatch[1].trim() : '',
        synonymAr: synMatch ? synMatch[2].trim() : '',
        antonym: antMatch ? antMatch[1].trim() : '',
        arAnt: antMatch ? antMatch[2].trim() : ''
    };
}).filter(s => s.word);
console.log('Extracted Synonyms:', synonyms.length, synonyms.map(s => s.word));

// Affixes
const affixBoxes = [...synTab.substring(synTab.indexOf('Prefixes & Suffixes')).matchAll(/<div class="details-box"[^>]*>([\s\S]*?)<\/div>/g)];
const affixes = affixBoxes.map(b => {
    const txt = b[1];
    const headerMatch = txt.match(/<strong[^>]*>([\s\S]*?)<\/strong>[\s\S]*?<span class="tag-badge">([\s\S]*?)<\/span>/);
    const roleMatch = txt.match(/<strong>الوظيفة:<\/strong>([\s\S]*?)<\/div>/);
    const exMatch = txt.match(/<div style="margin-top: 8px;">([\s\S]*?)<\/div>/);
    const ex2Match = txt.match(/<div style="margin-top: 4px;">([\s\S]*?)<\/div>/);

    const examples = [exMatch ? exMatch[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : '', ex2Match ? ex2Match[1].replace(/<\/?[^>]+(>|$)/g, '').trim() : ''].filter(Boolean).join(' | ');

    return {
        affix: headerMatch ? headerMatch[1].replace(/\([^)]*\)/g, '').trim() : '',
        type: headerMatch ? headerMatch[2].trim() : 'Affix',
        role: roleMatch ? roleMatch[1].trim() : '',
        examples
    };
}).filter(a => a.affix);
console.log('Extracted Affixes:', affixes.length, affixes.map(a => a.affix));

// Build payload
const payload = {
    id: "prep3_cp_unit2_lesson1_2",
    title: "Connect Plus (G9) - Unit 2 - Lessons 1 & 2: Changes",
    description: "المفردات الكاملة (51 كلمة)، استوديو القراءة والقصص التفاعلية (3 كتب عبر StoryEngine)، محرك المحادثات التفاعلية الناطقة، زمن المستقبل المستمر، تصريف الأفعال، التعريفات والمترادفات، واختبار شامل 35 سؤالاً 🎯",
    stage: "Prep_3",
    unit: "unit-2",
    sbPages: "SB pages 18 : 21 • WB pages 12 & 13",
    keyVocabulary,
    lessonVocabulary,
    readingDecks,
    storyPages: readingDecks[0]?.pages || [],
    dialogueDecks,
    dialogue: dialogueDecks[0] || null,
    verbs,
    definitions: cleanDefs,
    confusionNotes,
    expressions,
    prepositions,
    synonyms,
    affixes,
    quiz: questions,
    questions: questions,
    totalQuestions: questions.length
};

const output = `/**
 * Prep 3 (Connect Plus - G9) - Unit 2 - Lessons 1 & 2 Data Payload
 * Changes • Future Predictions & Ambitions
 * Decoupled data architecture adhering strictly to DRY & SoC.
 */

window.lessonData = ${JSON.stringify(payload, null, 4)};
window.readingDecks = window.lessonData.readingDecks;
window.dialogueDecks = window.lessonData.dialogueDecks;
window.quizData = window.lessonData;
`;

fs.writeFileSync('Prep_3/unit-2/connect-plus-lesson-1-2.data.js', output, 'utf8');
console.log('Successfully generated Prep_3/unit-2/connect-plus-lesson-1-2.data.js');
