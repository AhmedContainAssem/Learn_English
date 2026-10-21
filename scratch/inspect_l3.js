const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/lesson-3.html.bak', 'utf8');

console.log('File size:', html.length, 'bytes');

// Check title
const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');

// Check tabs
const tabMatches = [...html.matchAll(/class="tab-btn[^"]*"\s+onclick="switchTab\('([^']+)',\s*this\)">([\s\S]*?)<\/button>/g)];
console.log('Tabs:', tabMatches.map(m => ({ id: m[1], name: m[2].trim() })));

// Check sections
const comments = [...html.matchAll(/<!--\s*(=+[\s\S]*?=+)\s*-->/g)];
console.log('Sections:');
comments.forEach(c => console.log(' - ' + c[1].replace(/=/g, '').trim()));

// Check script with lessonData
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
scripts.forEach((s, idx) => {
    const txt = s[1];
    if (txt.includes('lessonData') || txt.includes('questions') || txt.includes('GrammarSlides')) {
        console.log(`Script ${idx} has:`, {
            len: txt.length,
            hasLessonData: txt.includes('lessonData'),
            hasQuestions: txt.includes('questions'),
            hasSlides: txt.includes('GrammarSlides') || txt.includes('slides')
        });
    }
});
