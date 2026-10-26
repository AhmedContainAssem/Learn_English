const fs = require('fs');

const content = fs.readFileSync('Prep_3/unit-3/lesson-1.html.bak', 'utf8');

// 1. Vocabulary
const vocabSection = content.slice(content.indexOf('id="vocab"'), content.indexOf('id="verbs"'));
const keyVocabulary = [];
const lessonVocabulary = [];

const keyPart = vocabSection.slice(0, vocabSection.indexOf('مفردات الدرس الأول التكميلية'));
const lessonPart = vocabSection.slice(vocabSection.indexOf('مفردات الدرس الأول التكميلية'));

function parseVocabCards(html) {
    const list = [];
    const cardRegex = /<div class="card"[\s\S]*?<\/div>\s*<\/div>/g;
    let m;
    while ((m = cardRegex.exec(html)) !== null) {
        const cardHtml = m[0];
        const posMatch = cardHtml.match(/<span class="tag-badge">([^<]+)<\/span>/);
        const wordMatch = cardHtml.match(/<div class="word-en"[^>]*>([^<]+)<\/div>/);
        const meaningMatch = cardHtml.match(/<strong>المعنى:<\/strong>\s*([^<\n]+)/);
        const explainMatch = cardHtml.match(/💡 <strong>التوضيح:<\/strong>\s*([^<]+)/);
        if (wordMatch) {
            list.push({
                word: wordMatch[1].trim(),
                pos: posMatch ? posMatch[1].trim() : 'Noun',
                meaning: meaningMatch ? meaningMatch[1].trim() : '',
                explain: explainMatch ? explainMatch[1].trim() : ''
            });
        }
    }
    return list;
}

const keyVocab = parseVocabCards(keyPart);
const lessonVocab = parseVocabCards(lessonPart);
console.log('Key vocab count:', keyVocab.length);
console.log('Lesson vocab count:', lessonVocab.length);

const popQuiz = {
    title: "⏱️ Pop Quiz (تدريب سريع لإتقان المفردات من كتاب الطالب)",
    wordsBank: ["benefits", "tasks", "poems", "Humans", "limit", "robot"],
    questions: [
        {
            prefix: "1. The",
            correct: "robot",
            suffix: "can do dangerous tasks in the factory. (الروبوت ينجز المهام الخطرة في المصانع)",
            fullSentence: "The robot can do dangerous tasks in the factory."
        },
        {
            prefix: "2.",
            correct: "Humans",
            suffix: "only can have real emotions and empathy. (البشر فقط يمتلكون المشاعر الحقيقية)",
            fullSentence: "Humans only can have real emotions and empathy."
        },
        {
            prefix: "3. Modern sports and AI health apps have many",
            correct: "benefits",
            suffix: "for your health. (فوائد ومزايا صحية)",
            fullSentence: "Modern sports and AI health apps have many benefits for your health."
        },
        {
            prefix: "4. You should set a time",
            correct: "limit",
            suffix: "to use the internet on your phone. (حد أقصى للوقت)",
            fullSentence: "You should set a time limit to use the internet on your phone."
        },
        {
            prefix: "5. The teacher gave the creative students 20 minutes to compose their",
            correct: "poems",
            suffix: "and complete tasks. (قصائد ومهمات)",
            fullSentence: "The teacher gave the creative students 20 minutes to compose their poems and complete tasks."
        }
    ]
};

// 2. Verbs (14 verbs)
const verbsSection = content.slice(content.indexOf('id="verbs"'), content.indexOf('id="collocations-affixes"'));
const verbs = [];
const vCardRegex = /<div class="card"[\s\S]*?<\/div>\s*<\/div>/g;
let m;
while ((m = vCardRegex.exec(verbsSection)) !== null) {
    const cardHtml = m[0];
    const meaningMatch = cardHtml.match(/المعنى:\s*<span[^>]*>([^<]+)<\/span>/);
    const infMatch = cardHtml.match(/Infinitive:<\/span>\s*<strong[^>]*>([^<]+)<\/strong>/);
    const pastMatch = cardHtml.match(/Past Simple:<\/span>\s*<strong[^>]*>([^<]+)<\/strong>/);
    const ppMatch = cardHtml.match(/Past Participle[^:]*:<\/span>\s*<strong[^>]*>([^<]+)<\/strong>/);
    const audioMatch = cardHtml.match(/speakText\('([^']+)'\)/);

    if (infMatch) {
        const word = infMatch[1].trim();
        const past = pastMatch ? pastMatch[1].trim() : '';
        const pp = ppMatch ? ppMatch[1].trim() : '';
        verbs.push({
            word: word,
            v1: word,
            v2: past,
            v3: pp,
            meaning: meaningMatch ? meaningMatch[1].trim() : '',
            forms: `${past} / ${pp}`,
            audio: audioMatch ? audioMatch[1].trim() : `${word}, ${past}, ${pp}`
        });
    }
}
console.log('Verbs count:', verbs.length);

// 3. Collocations (6)
const collocSection = content.slice(content.indexOf('id="collocations-affixes"'), content.indexOf('id="synonyms-antonyms"'));
const collocations = [];
const cRegex = /<div class="study-item">[\s\S]*?<span>([^<]+)<\/span>[\s\S]*?<div class="study-item-ar"[^>]*>([^<]+)<\/div>/g;
while ((m = cRegex.exec(collocSection)) !== null) {
    collocations.push({
        phrase: m[1].trim(),
        en: m[1].trim(),
        meaning: m[2].trim(),
        ar: m[2].trim()
    });
}
console.log('Collocations count:', collocations.length);

// 4. Affixes (7)
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
console.log('Affixes count:', affixes.length);

// 5. Synonyms & Antonyms (10)
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
console.log('Synonyms count:', synonyms.length);

// 6. Notes, Expressions & Prepositions from #general-notes
const notesSection = content.slice(content.indexOf('id="general-notes"'), content.indexOf('id="storybook"'));
const confusionNotes = [];
const noteCardRegex = /<div class="note-title-en"[^>]*>([^<]+)<\/div>\s*<div class="note-title-ar">([^<]+)<\/div>[\s\S]*?<div style="margin-top: 6px; line-height: 1.7; color: #cbd5e1;">([\s\S]*?)<\/div>[\s\S]*?<div style="direction: ltr; text-align: left; color: #f8fafc; margin-top: 6px; font-weight: 600;">([^<]+)<\/div>/g;
while ((m = noteCardRegex.exec(notesSection)) !== null) {
    confusionNotes.push({
        titleEn: m[1].trim(),
        titleAr: m[2].trim(),
        items: [
            {
                term: m[1].trim(),
                meaning: m[3].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(),
                example: m[4].trim()
            }
        ]
    });
}
console.log('Notes count:', confusionNotes.length);

// Expressions (11) and Prepositions (3)
const expPart = notesSection.slice(notesSection.indexOf('Important Expressions'), notesSection.indexOf('Prepositions'));
const prepPart = notesSection.slice(notesSection.indexOf('Prepositions'));

function parseStudyItems(html) {
    const list = [];
    const r = /<div class="study-item">[\s\S]*?<span>([^<]+)<\/span>[\s\S]*?<div class="study-item-ar"[^>]*>([^<]+)<\/div>/g;
    let m;
    while ((m = r.exec(html)) !== null) {
        list.push({
            en: m[1].trim(),
            ar: m[2].trim()
        });
    }
    return list;
}

const expressions = parseStudyItems(expPart);
const prepositions = parseStudyItems(prepPart);
console.log('Expressions count:', expressions.length);
console.log('Prepositions count:', prepositions.length);

// 7. StoryPages & Quiz from window.lessonData at the end of the file
const startToken = 'window.lessonData = ';
const startIdx = content.indexOf(startToken);
if (startIdx === -1) {
    console.error('Could not find window.lessonData start!');
    process.exit(1);
}
const endIdx = content.indexOf('};\n\n        // Initialize', startIdx);
if (endIdx === -1) {
    console.error('Could not find window.lessonData end!');
    process.exit(1);
}
const scriptText = content.slice(startIdx + startToken.length, endIdx + 1);

// Safely evaluate window.lessonData
let parsedData;
try {
    eval('parsedData = ' + scriptText);
} catch(e) {
    console.error('Eval error:', e);
    process.exit(1);
}

const storyPages = parsedData.storyPages || [];
const quizList = parsedData.quiz || [];
console.log('StoryPages count:', storyPages.length);
console.log('Quiz count:', quizList.length);

// Convert quiz questions to standard schema: { q, options, answer, hint }
const standardQuiz = quizList.map(item => {
    let answerIdx = 0;
    const options = (item.options || []).map((opt, idx) => {
        if (opt.isCorrect) answerIdx = idx;
        return opt.text || opt;
    });
    return {
        q: item.question.replace(/^\d+\.\s*/, ''),
        options: options,
        answer: answerIdx,
        hint: item.correctMsg || ''
    };
});

const lessonDataPayload = {
    id: "prep3_unit3_lesson1",
    title: "Prep 3 - Unit 3 - Lessons 1 & 2: Artificial Intelligence & AI Technology",
    description: "المفردات الأساسية والتكميلية (29 كلمة)، تصريف الأفعال، التعريفات والمتلازمات، المرادفات والمتضادات، البوادئ واللواحق، القصة التفاعلية المصورة (Storybook)، حوار التحدث والاستماع، قواعد المستقبل البسيط المبني للمجهول، واختبار شامل (35 سؤالاً) 🎯",
    stage: "Prep_3",
    unit: "unit-3",
    lesson: "lesson-1",
    sbPages: "SB pages 42 : 46",
    keyVocabulary: keyVocab,
    popQuiz: popQuiz,
    lessonVocabulary: lessonVocab,
    verbs: verbs,
    collocations: collocations,
    affixes: affixes,
    synonyms: synonyms,
    confusionNotes: confusionNotes,
    expressions: expressions,
    prepositions: prepositions,
    storyPages: storyPages,
    quiz: standardQuiz,
    questions: standardQuiz,
    totalQuestions: standardQuiz.length
};

const fileContent = `/**
 * Prep 3 - Unit 3 - Lessons 1 & 2 Data Payload
 * Artificial Intelligence & AI Technology
 * Pure decoupled data payload adhering strictly to DRY & SoC.
 */

window.lessonData = ${JSON.stringify(lessonDataPayload, null, 4)};
window.quizData = window.lessonData;
`;

fs.writeFileSync('Prep_3/unit-3/lesson-1.data.js', fileContent, 'utf8');
console.log('Successfully wrote Prep_3/unit-3/lesson-1.data.js');
