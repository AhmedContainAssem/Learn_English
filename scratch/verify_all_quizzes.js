const fs = require('fs');

// Mock browser window and DOM
global.window = {};
eval(fs.readFileSync('assets/js/quiz-engine.js', 'utf8'));

const targetFiles = [
    // Sec 3 Unit 3
    'Sec_3/unit-3/lesson-1-2.data.js',
    'Sec_3/unit-3/lesson-4-5.data.js',
    // Sec 2 Unit 3
    'Sec_2/unit-3/lesson-3-1.data.js',
    'Sec_2/unit-3/lesson-3-2.data.js',
    'Sec_2/unit-3/lesson-3-3.data.js',
    'Sec_2/unit-3/lesson-3-4.data.js',
    // Sec 2 Unit 4
    'Sec_2/unit-4/lesson-4-1.data.js',
    'Sec_2/unit-4/lesson-4-2.data.js',
    'Sec_2/unit-4/lesson-4-3.data.js',
    'Sec_2/unit-4/lesson-4-4.data.js',
    // Grade 6
    'Grade_6/unit-1/lesson-1.data.js',
    'Grade_6/unit-1/lesson-2.data.js',
    'Grade_6/unit-1/lesson-3.data.js',
    'Grade_6/unit-1/lesson-4-5.data.js',
    'Grade_6/unit-2/lesson-1.data.js',
    'Grade_6/unit-2/lesson-2.data.js',
    'Grade_6/unit-2/lesson-3.data.js',
    'Grade_6/unit-2/lesson-4-5.data.js',
    'Grade_6/unit-3/lesson-1.data.js',
    'Grade_6/unit-3/lesson-2.data.js',
    'Grade_6/unit-3/lesson-3.data.js',
    'Grade_6/unit-3/lesson-4-5.data.js'
];

let allPassed = true;

targetFiles.forEach(f => {
    global.window.lessonData = null;
    eval(fs.readFileSync(f, 'utf8'));
    const d = global.window.lessonData;
    const qList = d.quiz || d.questions;
    
    const engine = new global.window.QuizEngine({ shuffleQuestions: false, shuffleOptions: false });
    const normalized = engine.normalizeQuestions(qList);

    const count = normalized.length;
    const validPrompts = normalized.filter(q => q.question && q.question.trim().length > 0).length;
    const validChoices = normalized.filter(q => Array.isArray(q.options) && q.options.length >= 2).length;
    const validCorrect = normalized.filter(q => q.options && q.options.some(o => o.isCorrect === true)).length;

    const pass = (count > 0 && count === validPrompts && count === validChoices && count === validCorrect);
    if (!pass) allPassed = false;

    console.log(`${pass ? '✅' : '❌'} ${f}: total ${count} | prompts: ${validPrompts}/${count} | choices: ${validChoices}/${count} | correctMarked: ${validCorrect}/${count}`);
});

console.log('\nFINAL QUIZ AUDIT STATUS:', allPassed ? 'ALL PASSED 100%' : 'SOME FAILED');
