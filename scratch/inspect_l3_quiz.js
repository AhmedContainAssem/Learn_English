const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/lesson-3.html.bak', 'utf8');

const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
scripts.forEach((s, idx) => {
    const txt = s[1];
    const hasQ = txt.includes('questions: [') || txt.includes('"questions": [');
    console.log(`Script ${idx} len: ${txt.length}, hasQuestionsArray: ${hasQ}`);
    if (hasQ) {
        const m = txt.match(/questions:\s*\[([\s\S]*?)\]/);
        console.log('Found questions in script', idx);
    }
});

// Also check if quiz questions are in a separate .js or inside HTML
const srcMatches = [...html.matchAll(/<script[^>]+src="([^"]+)"/gi)];
console.log('External scripts:', srcMatches.map(m => m[1]));
