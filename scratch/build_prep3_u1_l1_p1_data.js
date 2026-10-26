const fs = require('fs');

const content = fs.readFileSync('Prep_3/unit-1/lesson-1-part-1.html.bak', 'utf8');

// Extract the studio payload JSON or window.lessonData
const studioMatch = content.match(/<script id="studio-payload" type="application\/json">([\s\S]*?)<\/script>/);
let payload;
if (studioMatch) {
    payload = JSON.parse(studioMatch[1].trim());
} else {
    const dataMatch = content.match(/window\.lessonData\s*=\s*(\{[\s\S]*?\});\s*<\/script>/);
    eval('payload = ' + dataMatch[1]);
}

const quiz = payload.quiz || payload.questions;
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
    id: "prep3_unit1_lesson1_part1",
    title: payload.title || "Lesson 1: Key & Extra Vocabulary",
    description: payload.description || "اختبر معلوماتك في جميع كلمات الدرس الأول (37 كلمة)!",
    stage: "Prep_3",
    unit: "unit-1",
    lesson: "lesson-1-part-1",
    archetype: "direct_quiz",
    quiz: standardQuiz,
    questions: standardQuiz,
    totalQuestions: standardQuiz.length
};

const fileContent = `/**
 * Prep 3 - Unit 1 - Lesson 1 (Part 1) Data Payload
 * Key & Extra Vocabulary Quiz (37 Questions)
 * Pure decoupled data payload adhering strictly to DRY & SoC.
 */

window.lessonData = ${JSON.stringify(lessonDataPayload, null, 4)};
window.quizData = window.lessonData;
`;

fs.writeFileSync('Prep_3/unit-1/lesson-1-part-1.data.js', fileContent, 'utf8');
console.log('Successfully wrote Prep_3/unit-1/lesson-1-part-1.data.js with ' + standardQuiz.length + ' questions.');
