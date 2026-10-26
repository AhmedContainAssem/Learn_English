const fs = require('fs');

const content = fs.readFileSync('Prep_3/unit-1/lesson-1-part-2.html.bak', 'utf8');

const studioMatch = content.match(/<script id="studio-payload" type="application\/json">([\s\S]*?)<\/script>/);
if (!studioMatch) {
    console.error('Studio payload not found!');
    process.exit(1);
}

let payload;
try {
    payload = JSON.parse(studioMatch[1].trim());
} catch(e) {
    eval('payload = ' + studioMatch[1]);
}

const quiz = payload.quiz || [];
const standardQuiz = quiz.map(item => {
    let answerIdx = 0;
    const options = (item.options || []).map((opt, idx) => {
        if (opt.isCorrect) answerIdx = idx;
        return opt.text || opt;
    });
    return {
        q: item.question,
        options: options,
        answer: answerIdx,
        hint: item.correctMsg || '',
        emoji: item.emoji || '🎯'
    };
});

const lessonDataPayload = {
    id: "prep3_unit1_lesson1_part2",
    title: payload.title || "الدرس الأول (الجزء الثاني): Vocabulary & Structure",
    description: payload.description || "الأفعال غير المنتظمة، التعريفات والمتلازمات، المرادفات والمتضادات، البوادئ واللواحق، واختبار شامل 🎯",
    stage: "Prep_3",
    unit: "unit-1",
    lesson: "lesson-1-part-2",
    verbs: payload.verbs || [],
    definitions: payload.definitions || [],
    collocations: payload.collocations || [],
    synonyms: payload.synonyms || [],
    affixes: payload.affixes || [],
    quiz: standardQuiz,
    questions: standardQuiz,
    totalQuestions: standardQuiz.length
};

const fileContent = `/**
 * Prep 3 - Unit 1 - Lesson 1 (Part 2) Data Payload
 * Irregular Verbs, Definitions, Collocations, Synonyms/Antonyms, Affixes & Quiz (25 Questions)
 * Pure decoupled data payload adhering strictly to DRY & SoC.
 */

window.lessonData = ${JSON.stringify(lessonDataPayload, null, 4)};
window.quizData = window.lessonData;
`;

fs.writeFileSync('Prep_3/unit-1/lesson-1-part-2.data.js', fileContent, 'utf8');
console.log('Successfully wrote Prep_3/unit-1/lesson-1-part-2.data.js with ' + standardQuiz.length + ' questions.');
