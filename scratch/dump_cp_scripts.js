const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/connect-plus-lesson-1-2.html.bak', 'utf8');

const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
scripts.forEach((s, idx) => {
    console.log(`\n================ SCRIPT ${idx} (len: ${s[1].length}) ================`);
    console.log(s[1].substring(0, 500));
    console.log('...');
    console.log(s[1].substring(s[1].length - 500));
});
