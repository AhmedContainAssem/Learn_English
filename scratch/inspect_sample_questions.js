const fs = require('fs');

function inspectLesson(file) {
    if (!fs.existsSync(file)) return;
    try {
        const content = fs.readFileSync(file, 'utf8');
        global.window = {};
        eval(content);
        const d = global.window.lessonData || global.window.__LESSON_DATA__;
        if (!d) return console.log(file, 'NO lessonData');
        const q = d.quiz || d.questions;
        if (!q || q.length === 0) return console.log(file, 'NO quiz questions');
        
        console.log('\n--- ' + file + ' ---');
        console.log('Total questions:', q.length);
        console.log('Sample question 0:', JSON.stringify(q[0], null, 2));
    } catch (e) {
        console.error(file, 'ERROR:', e.message);
    }
}

['Sec_3/unit-3/lesson-1-2.data.js',
 'Sec_3/unit-3/lesson-4-5.data.js',
 'Sec_2/unit-3/lesson-3-1.data.js',
 'Sec_2/unit-3/lesson-3-2.data.js',
 'Sec_2/unit-3/lesson-3-3.data.js',
 'Sec_2/unit-3/lesson-3-4.data.js',
 'Sec_2/unit-4/lesson-4-1.data.js',
 'Sec_2/unit-4/lesson-4-2.data.js',
 'Sec_2/unit-4/lesson-4-3.data.js',
 'Sec_2/unit-4/lesson-4-4.data.js',
 'Grade_6/unit-1/lesson-1.data.js',
 'Grade_6/unit-1/lesson-3.data.js',
 'Grade_6/unit-2/lesson-1.data.js'
].forEach(inspectLesson);
