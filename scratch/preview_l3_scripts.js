const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/lesson-3.html.bak', 'utf8');

const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
console.log('Script 4 preview:');
console.log(scripts[4][1].substring(0, 500));
console.log('\nScript 5 preview:');
console.log(scripts[5][1].substring(0, 500));
console.log('\nScript 6 preview:');
console.log(scripts[6][1].substring(0, 500));
