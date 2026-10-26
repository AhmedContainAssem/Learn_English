const fs = require('fs');

function inspectBak(file) {
    if (!fs.existsSync(file)) return;
    const c = fs.readFileSync(file, 'utf8');
    const match = c.match(/<div id=["']dialogue["'][\s\S]*?<\/div>\s*<!--/);
    if (match) {
        console.log('=== ' + file + ' ===');
        console.log(match[0].substring(0, 1500));
    } else {
        const idx = c.indexOf('dialogue');
        console.log(file, 'no exact match, index:', idx);
    }
}

inspectBak('Sec_1/unit-1/lesson-1.html.bak');
inspectBak('Sec_1/unit-1/lesson-4-5.html.bak');
