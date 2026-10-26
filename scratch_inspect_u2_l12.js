const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/lesson-1-2.html.bak', 'utf8');
const lines = html.split('\n');
console.log('Total lines:', lines.length, 'Size:', html.length);

lines.forEach((l, i) => {
  if (l.includes('<section') || l.includes('tab-content') || l.includes('tab-button') || l.includes('data-tab=') || l.includes('class="tab-btn"')) {
    console.log(`Line ${i+1}: ${l.trim().substring(0, 100)}`);
  }
  if (l.includes('window.lessonData') || l.includes('window.readingDecks') || l.includes('window.dialogueDecks') || l.includes('<script')) {
    console.log(`Script/Data at Line ${i+1}: ${l.trim().substring(0, 80)}`);
  }
});
