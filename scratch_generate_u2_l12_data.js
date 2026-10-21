const fs = require('fs');

const bak = fs.readFileSync('Prep_3/unit-2/lesson-1-2.html.bak', 'utf8');

function getSection(startId, endId) {
  const startIdx = bak.indexOf(`id="${startId}"`);
  if (startIdx === -1) return '';
  const endIdx = endId ? bak.indexOf(`id="${endId}"`) : bak.length;
  return bak.substring(startIdx, endIdx);
}

// 1. Vocab tab
const vocabSec = getSection('vocab', 'verbs');
const keyPart = vocabSec.substring(0, vocabSec.indexOf('<!-- Lesson Vocabulary -->'));
const lessonPart = vocabSec.substring(vocabSec.indexOf('<!-- Lesson Vocabulary -->'));

const keyCardRegex = /<div class="card"[\s\S]*?<span class="tag-badge">([^<]*)<\/span>[\s\S]*?<div class="word-en">([^<]+)<\/div>[\s\S]*?<strong>المعنى:<\/strong>\s*([^<]+)(?:[\s\S]*?<div class="details-box"[^>]*>([\s\S]*?)<\/div>)?[\s\S]*?<\/div>\s*<\/div>/g;

let match;
const keyVocabulary = [];
while ((match = keyCardRegex.exec(keyPart)) !== null) {
  const tag = match[1].trim();
  const word = match[2].trim();
  const meaning = match[3].trim();
  const detailsRaw = (match[4] || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  
  let explain = detailsRaw;
  let example = '';
  const exMatch = detailsRaw.match(/"([^"]+)"/);
  if (exMatch) {
    example = exMatch[1];
    explain = detailsRaw.replace(exMatch[0], '').replace(/سياق توضيحي:\s*/, '').trim();
  }
  
  keyVocabulary.push({
    word,
    type: tag,
    meaning,
    explain: explain || undefined,
    example: example || undefined
  });
}
console.log('Key vocab extracted:', keyVocabulary.length);

// Pop quiz focus examples
const popQuizRegex = /<li>([\s\S]*?)<\/li>/g;
const popQuizExamples = [];
const popQuizSub = keyPart.substring(keyPart.indexOf('class="spotlight-list"'));
while ((match = popQuizRegex.exec(popQuizSub)) !== null) {
  popQuizExamples.push(match[1].trim());
}
console.log('Pop quiz examples:', popQuizExamples.length);

// Lesson Vocabulary
const lessonCardRegex = /<div class="card"[\s\S]*?<div class="word-en">([^<]+)<\/div>[\s\S]*?<div class="card-body">([\s\S]*?)<\/div>\s*<\/div>/g;
const lessonVocabulary = [];
while ((match = lessonCardRegex.exec(lessonPart)) !== null) {
  const word = match[1].trim();
  const rawBody = match[2].trim();
  const typeMatch = rawBody.match(/\((n|v|adj|adv|pl)\)/);
  const type = typeMatch ? (typeMatch[1] === 'n' ? 'Noun' : typeMatch[1] === 'v' ? 'Verb' : typeMatch[1] === 'adj' ? 'Adjective' : 'Adverb') : undefined;
  const meaning = rawBody.replace(/\((n|v|adj|adv|pl)\)/, '').trim();
  lessonVocabulary.push({
    word,
    type,
    meaning
  });
}
console.log('Lesson vocab extracted:', lessonVocabulary.length);

// 2. Verbs
const verbsSec = getSection('verbs', 'definitions');
const verbRegex = /<div class="card"[\s\S]*?<div class="word-en">([^<]+)<\/div>[\s\S]*?<strong>المعنى:<\/strong>\s*([^<]+)[\s\S]*?الماضي والتصريف الثالث:\s*<span>([^<]+)<\/span>/g;
const verbs = [];
while ((match = verbRegex.exec(verbsSec)) !== null) {
  const word = match[1].trim();
  const meaning = match[2].trim();
  const forms = match[3].trim();
  const [v2, v3] = forms.split('/').map(s => s.trim());
  verbs.push({
    word,
    v1: word,
    v2: v2 || forms,
    v3: v3 || v2 || forms,
    forms,
    meaning,
    audio: `${word} ${forms.replace(/\//g, ' ')}`
  });
}
console.log('Verbs extracted:', verbs.length);

// 3. Definitions & Collocations
const defsSec = getSection('definitions', 'synonyms');
const defRegex = /<div class="card"[\s\S]*?<div class="word-en"[^>]*>([^<]+)<\/div>[\s\S]*?<div class="card-body">\s*<span>([^<]+)<\/span>\s*<div class="details-box">المعنى:\s*<span>([^<]+)<\/span>/g;
const definitions = [];
while ((match = defRegex.exec(defsSec)) !== null) {
  definitions.push({
    word: match[1].trim(),
    definition: match[2].trim(),
    meaning: match[3].trim()
  });
}
console.log('Definitions extracted:', definitions.length);

// Collocations
const collRegex = /<div class="card"[\s\S]*?<div class="word-en">([^<]+)<\/div>[\s\S]*?<div class="card-body">المعنى:\s*<strong>([^<]+)<\/strong>/g;
const collocations = [];
while ((match = collRegex.exec(defsSec)) !== null) {
  collocations.push({
    phrase: match[1].trim(),
    meaning: match[2].trim()
  });
}
console.log('Collocations extracted:', collocations.length);

// 4. Synonyms & Antonyms
const synSec = getSection('synonyms', 'affixes');
const synRowRegex = /<tr>\s*<td><span class="en-text">([^<]+)<\/span>\s*<br><small>([^<]+)<\/small><\/td>\s*<td><span class="en-text">([^<]+)<\/span><\/td>\s*<td><span class="en-text">([^<]+)<\/span>(?:\s*<br><small>([^<]*)<\/small>)?<\/td>/g;
const synonyms = [];
while ((match = synRowRegex.exec(synSec)) !== null) {
  synonyms.push({
    word: match[1].trim(),
    arabic: match[2].trim(),
    synonym: match[3].trim(),
    antonym: match[4].trim(),
    arAnt: match[5] ? match[5].trim() : undefined
  });
}
console.log('Synonyms extracted:', synonyms.length);

// 5. Affixes
const affSec = getSection('affixes', 'quiz');
const affixRegex = /<div class="card"[\s\S]*?<span class="tag-badge">([^<]*)<\/span>[\s\S]*?<div class="word-en">([^<]+)<\/div>[\s\S]*?<strong>الوظيفة:<\/strong>\s*([^<]+)[\s\S]*?أمثلة:\s*<span>([^<]+)<\/span>/g;
const affixes = [];
while ((match = affixRegex.exec(affSec)) !== null) {
  affixes.push({
    type: match[1].trim(),
    affix: match[2].trim(),
    role: match[3].trim(),
    examples: match[4].trim()
  });
}
console.log('Affixes extracted:', affixes.length);

// 6. Extract Quiz Questions
const qzMatch = bak.match(/window\.lessonData\s*=\s*(\{[\s\S]*?\})\s*;\s*\/\/\s*Tab Switcher logic/);
let questions = [];
if (qzMatch) {
  let lData;
  eval('lData = ' + qzMatch[1]);
  questions = lData.questions || lData.quiz || [];
} else {
  const qArrMatch = bak.match(/questions:\s*(\[[\s\S]*?\])\s*\}\s*;/);
  if (qArrMatch) {
    eval('questions = ' + qArrMatch[1]);
  }
}
console.log('Quiz questions extracted:', questions.length);

const lessonData = {
    id: "prep3_unit2_lesson1_2",
    title: "Prep 3 - Unit 2 - Lessons 1 & 2: Stay connected • Communication, Challenges and Solutions",
    description: "المفردات الأساسية والتكميلية كاملة، تدريب Pop Quiz التفاعلي، تصريف الأفعال غير المنتظمة، التعريفات الهامة، المتلازمات اللفظية، المرادفات والمتضادات، المقاطع البادئة والناهية، واختبار شامل 🎯",
    stage: "Prep_3",
    unit: "unit-2",
    sbPages: "SB pages 28 : 31",

    keyVocabulary,
    popQuizFocus: {
        examples: popQuizExamples
    },
    lessonVocabulary,
    verbs,
    definitions,
    collocations,
    synonyms,
    affixes,
    quiz: questions,
    questions,
    totalQuestions: questions.length
};

const outContent = `/**
 * Prep 3 - Unit 2 - Lessons 1 & 2 Data Payload
 * Stay connected • Communication, Challenges and Solutions
 * Decoupled data architecture adhering strictly to DRY & SoC.
 */

window.lessonData = ${JSON.stringify(lessonData, null, 4)};

window.quizData = window.lessonData;
`;

fs.writeFileSync('Prep_3/unit-2/lesson-1-2.data.js', outContent, 'utf8');
console.log('lesson-1-2.data.js written successfully! Size:', fs.statSync('Prep_3/unit-2/lesson-1-2.data.js').size);
