const fs = require('fs');

const content = fs.readFileSync('Prep_3/unit-3/lesson-1.html.bak', 'utf8');
const lines = content.split('\n');

console.log('Total lines:', lines.length);

lines.forEach((line, idx) => {
    if (line.includes('class="tab-content') || line.includes("class='tab-content'") || line.includes('tab-content') || line.includes('switchTab(')) {
        console.log(`Line ${idx + 1}: ${line.trim()}`);
    }
});
