const fs = require('fs');

const content = fs.readFileSync('Prep_3/unit-2/lesson-3.html.bak', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
    if (line.includes('class="tab-content') || line.includes("class='tab-content'") || line.includes('tab-content')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
});
