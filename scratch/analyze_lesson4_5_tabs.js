const fs = require('fs');

const content = fs.readFileSync('Prep_3/unit-2/lesson-4-5.html.bak', 'utf8');

// Let's check sections in the HTML:
// Pop Quiz in Tab 1
const popQuizMatch = content.match(/<div class="pop-quiz-box">([\s\S]*?)<\/div>\s*<\/div>/);
console.log('PopQuiz found:', !!popQuizMatch);

// Reading section in Tab 7
const readingMatch = content.match(/<div id="reading"[\s\S]*?<\/div>\s*(?=<div id="quiz")/);
console.log('Reading tab length:', readingMatch ? readingMatch[0].length : 0);

// Language Notes in Tab 5 (id="notes")
const notesMatch = content.match(/<div id="notes"[\s\S]*?<\/div>\s*(?=<div id="expressions")/);
console.log('Notes tab length:', notesMatch ? notesMatch[0].length : 0);

// Expressions in Tab 6 (id="expressions")
const expressionsMatch = content.match(/<div id="expressions"[\s\S]*?<\/div>\s*(?=<div id="reading")/);
console.log('Expressions tab length:', expressionsMatch ? expressionsMatch[0].length : 0);
