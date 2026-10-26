const fs = require('fs');
global.window = {};
const code = fs.readFileSync('Prep_3/unit-3/lesson-3.data.js', 'utf8');
eval(code);

console.log('Title:', window.lessonData?.title);
console.log('Keys in window.lessonData:', Object.keys(window.lessonData || {}));
console.log('Keys in window:', Object.keys(window));
if (window.quizQuestions) {
    console.log('window.quizQuestions count:', window.quizQuestions.length);
}
if (window.lessonData?.storyPages) {
    console.log('storyPages count:', window.lessonData.storyPages.length);
}
if (window.lessonData?.readingStory) {
    console.log('readingStory chapters count:', window.lessonData.readingStory.chapters?.length);
}
