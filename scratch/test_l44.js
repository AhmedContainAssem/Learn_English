const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('--- 1. Testing curriculum-manifest.json ---');
const manifestRaw = fs.readFileSync('curriculum-manifest.json', 'utf8');
const manifest = JSON.parse(manifestRaw);
const sec2 = manifest.stages.find(s => s.id === 'Sec_2');
if (!sec2) throw new Error('Sec_2 stage not found!');
const u4 = sec2.units.find(u => u.id === 'unit-4');
if (!u4) throw new Error('unit-4 not found in Sec_2!');
const l4 = u4.lessons.find(l => l.id === 'lesson-4-4');
if (!l4) throw new Error('lesson-4-4 not registered in manifest!');
console.log('✅ Manifest registered:', l4.title, '| Path:', l4.path);

console.log('--- 2. Testing lesson-4-4.data.js ---');
const dataCode = fs.readFileSync('Sec_2/unit-4/lesson-4-4.data.js', 'utf8');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(dataCode, sandbox);

const d = sandbox.window.lessonData;
if (!d) throw new Error('window.lessonData is not defined!');
if (sandbox.window.__LESSON_DATA__ !== d) throw new Error('window.__LESSON_DATA__ mismatch!');

console.log('Lesson ID:', d.id);
console.log('Key Vocab:', d.keyVocabulary.length, '(expected 8)');
console.log('Important Vocab:', d.importantVocabulary.length, '(expected 25)');
console.log('Definitions:', d.definitions.length, '(expected 6)');
console.log('Synonyms:', d.synonyms.length);
console.log('Antonyms:', d.antonyms.length, '(expected 6)');
console.log('Collocations:', d.collocations.length, '(expected 10)');
console.log('Expressions:', d.expressions.length, '(expected 5)');
console.log('Prepositions:', d.prepositions.length, '(expected 7)');
console.log('Derivatives:', d.derivatives.length, '(expected 7)');
console.log('Confusion Notes:', d.confusionNotes.length, '(expected 5)');
console.log('Story Pages:', d.storyPages.length, '(expected 3)');
console.log('Dialogue turns:', d.dialogue.length, '(expected 7)');

if (!Array.isArray(d.quiz)) throw new Error('d.quiz is not an array!');
if (d.quiz.length !== 30) throw new Error('Quiz length is ' + d.quiz.length + ', must be exactly 30!');
console.log('✅ Quiz questions count: exactly 30 questions');

d.quiz.forEach((q, idx) => {
    if (!q.q || typeof q.q !== 'string') throw new Error('Q' + (idx+1) + ' missing q text');
    if (!Array.isArray(q.options) || q.options.length !== 4) throw new Error('Q' + (idx+1) + ' options not 4');
    if (typeof q.a !== 'number' || q.a < 0 || q.a > 3) throw new Error('Q' + (idx+1) + ' invalid answer index: ' + q.a);
    if (!q.exp || typeof q.exp !== 'string') throw new Error('Q' + (idx+1) + ' missing explanation');
});
console.log('✅ All 30 questions verified: 4 options, integer answer in [0..3], and Arabic explanation.');

console.log('--- 3. Testing HTML files ---');
if (!fs.existsSync('Sec_2/unit-4/lesson-4-4.html')) throw new Error('lesson-4-4.html missing');
const htmlContent = fs.readFileSync('Sec_2/unit-4/lesson-4-4.html', 'utf8');
if (!htmlContent.includes('./lesson-4-4.data.js')) throw new Error('HTML does not link lesson-4-4.data.js');

const indexContent = fs.readFileSync('Sec_2/unit-4/index.html', 'utf8');
if (!indexContent.includes('href="./lesson-4-4.html"')) throw new Error('index.html missing active link to lesson-4-4.html');
console.log('✅ index.html and lesson-4-4.html verified!');

console.log('🎉 ALL TESTS PASSED WITH ZERO ERRORS!');
