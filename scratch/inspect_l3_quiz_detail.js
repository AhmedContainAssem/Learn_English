const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/lesson-3.html.bak', 'utf8');

const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
console.log('Script 5 full length:', scripts[5][1].length);
console.log('Script 5 content:\n', scripts[5][1]);

// Check Tab 8 Quiz content
const quizIdx = html.indexOf('id="quiz"');
const quizEnd = html.indexOf('</main>', quizIdx);
const quizHtml = html.substring(quizIdx, quizEnd !== -1 ? quizEnd : quizIdx + 5000);
console.log('\nQuiz HTML length:', quizHtml.length);
console.log(quizHtml.substring(0, 1500));
