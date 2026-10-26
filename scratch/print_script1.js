const fs = require('fs');
const content = fs.readFileSync('Prep_3/unit-2/lesson-4-5.html.bak', 'utf8');
const scriptMatches = [...content.matchAll(/<script[\s\S]*?<\/script>/gi)];
console.log('--- Script 1 ---');
console.log(scriptMatches[0][0]);
