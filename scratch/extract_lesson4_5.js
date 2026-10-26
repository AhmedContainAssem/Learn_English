const fs = require('fs');

const content = fs.readFileSync('Prep_3/unit-2/lesson-4-5.html.bak', 'utf8');

console.log('--- Checking Scripts at the end of lesson-4-5.html.bak ---');
const scriptMatches = [...content.matchAll(/<script[\s\S]*?<\/script>/gi)];
scriptMatches.forEach((m, idx) => {
    const s = m[0];
    console.log(`Script ${idx + 1} (length: ${s.length}):`);
    console.log(s.slice(0, 150).replace(/\n/g, ' ') + '...');
});
