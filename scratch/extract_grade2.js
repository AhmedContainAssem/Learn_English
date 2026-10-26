const fs = require('fs');
const path = require('path');
const vm = require('vm');

const grade2Dir = path.join(__dirname, '..', 'Grade_2', 'unit-1');
const files = [
  'lesson-1-part-1.html',
  'lesson-1-part-2.html',
  'lesson-2.html'
];

files.forEach(file => {
  const filePath = path.join(grade2Dir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  const match = content.match(/window\.lessonData\s*=\s*(\{[\s\S]*?\n\s*\});?\s*<\/script>/);
  if (!match) {
    console.error(`FAILED to find window.lessonData in ${file}`);
    return;
  }

  const rawJs = match[1];
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  try {
    vm.runInContext(`window.lessonData = ${rawJs};`, sandbox);
    const data = sandbox.window.lessonData;
    let qCount = 0;
    if (Array.isArray(data.questions)) {
      qCount = data.questions.length;
    } else if (Array.isArray(data.sections)) {
      qCount = data.sections.reduce((acc, s) => acc + (s.questions ? s.questions.length : 0), 0);
    }
    console.log(`[OK] ${file}: Title="${data.title || '(no title)'}", Questions=${qCount}`);
  } catch (err) {
    console.error(`Error parsing ${file}:`, err.message);
  }
});
