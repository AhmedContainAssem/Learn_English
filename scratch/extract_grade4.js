const fs = require('fs');
const path = require('path');
const vm = require('vm');

const grade4Dir = path.join(__dirname, '..', 'Grade_4', 'unit-1');
const files = [
  'lesson-1.html',
  'lesson-2_part-1.html',
  'lesson-2_part-2.html',
  'lesson-2_part-3.html',
  'lesson-3_part-1.html',
  'lesson-4-5.html'
];

files.forEach(file => {
  const filePath = path.join(grade4Dir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Find script block with window.lessonData
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
    console.log(`[OK] ${file}: Title="${data.title || '(no title)'}", Questions=${qCount}, Sections=${data.sections ? data.sections.length : 0}`);
  } catch (err) {
    console.error(`Error parsing ${file}:`, err.message);
  }
});
