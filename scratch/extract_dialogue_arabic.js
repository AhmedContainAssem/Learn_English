const fs = require('fs');

function extractTurns(file) {
    if (!fs.existsSync(file)) return null;
    const c = fs.readFileSync(file, 'utf8');
    const turns = [];
    const turnRegex = /<div class="dialogue-box"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
    let match;
    while ((match = turnRegex.exec(c)) !== null) {
        const box = match[1];
        const speakerMatch = box.match(/<div class="speaker-name"[^>]*>([\s\S]*?)<\/div>/);
        const enMatch = box.match(/<div class="en-text"[^>]*>([\s\S]*?)<\/div>/);
        const arMatch = box.match(/<div class="ar-text"[^>]*>([\s\S]*?)<\/div>/);

        turns.push({
            speaker: speakerMatch ? speakerMatch[1].replace(/<[^>]+>/g, '').trim() : '',
            en: enMatch ? enMatch[1].replace(/<[^>]+>/g, '').replace(/^"|"$/g, '').trim() : '',
            ar: arMatch ? arMatch[1].replace(/<[^>]+>/g, '').replace(/^💡\s*/, '').trim() : ''
        });
    }
    return turns;
}

const f1 = extractTurns('Sec_1/unit-1/lesson-1.html.bak');
console.log('Sec 1 U1 L1 bak turns:', JSON.stringify(f1, null, 2));

const f2 = extractTurns('Sec_1/unit-1/lesson-4-5.html.bak');
console.log('Sec 1 U1 L4-5 bak turns:', JSON.stringify(f2, null, 2));

const f3 = extractTurns('Sec_2/unit-2/lesson-2-1.html.bak');
console.log('Sec 2 U2 L2-1 bak turns:', JSON.stringify(f3, null, 2));
