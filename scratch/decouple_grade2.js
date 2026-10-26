const fs = require('fs');
const path = require('path');
const vm = require('vm');

const unitDir = path.join(__dirname, '..', 'Grade_2', 'unit-1');
const lessons = [
  { file: 'lesson-1-part-1.html', dataFile: 'lesson-1-part-1.data.js', fallbackTitle: 'Quick Assessment Quiz', fallbackDesc: 'اختبار تدريبي سريع ومباشر - مفردات الدرس الأول (Part 1)' },
  { file: 'lesson-1-part-2.html', dataFile: 'lesson-1-part-2.data.js', fallbackTitle: 'Lesson 1 (Part 2): Extra Vocabulary & Expressions', fallbackDesc: 'اختبار تدريبي تفاعلي - مفردات وتعبيرات وحروف الجر الهامة (Part 2)' },
  { file: 'lesson-2.html', dataFile: 'lesson-2.data.js', fallbackTitle: 'Lesson 2: Around the classroom & Phonics', fallbackDesc: 'أدوات الفصل الدراسي، قاعدة (This is a/an)، وصوتيات حرف A القصير (Short \'a\' sound /æ/)' }
];

lessons.forEach(({ file, dataFile, fallbackTitle, fallbackDesc }) => {
  const filePath = path.join(unitDir, file);
  const bakPath = path.join(unitDir, file + '.bak');
  const dataPath = path.join(unitDir, dataFile);

  const originalContent = fs.readFileSync(filePath, 'utf8');

  // Step 1: Backup if not exists
  if (!fs.existsSync(bakPath)) {
    fs.writeFileSync(bakPath, originalContent, 'utf8');
    console.log(`[BACKUP] Created ${file}.bak`);
  }

  // Step 2: Extract window.lessonData
  const match = originalContent.match(/window\.lessonData\s*=\s*(\{[\s\S]*?\n\s*\});?\s*<\/script>/);
  if (!match) {
    console.error(`[ERROR] Could not find window.lessonData in ${file}`);
    return;
  }

  const rawJs = match[1];
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(`window.lessonData = ${rawJs};`, sandbox);
  const parsedData = sandbox.window.lessonData;

  if (!parsedData.title) parsedData.title = fallbackTitle;
  if (!parsedData.description) parsedData.description = fallbackDesc;

  // Step 3: Write data file
  const dataJsContent = `/**
 * Grade 2 - Unit 1: ${parsedData.title}
 * Platform Curriculum Dataset
 */

window.lessonData = ${JSON.stringify(parsedData, null, 4)};

window.quizData = window.lessonData;
`;
  fs.writeFileSync(dataPath, dataJsContent, 'utf8');
  console.log(`[DATA] Generated ${dataFile} with ${parsedData.questions ? parsedData.questions.length : 0} questions.`);

  // Step 4: Write clean decoupled HTML shell
  // Extract content up to the closing container div or before <script>
  const containerMatch = originalContent.match(/([\s\S]*?<\/div>\s*<\/div>)\s*(?:<!-- Data Injection -->\s*)?<script>[\s\S]*?<\/body>\s*<\/html>/i);
  let htmlHeadAndBody;
  if (containerMatch) {
    htmlHeadAndBody = containerMatch[1];
  } else {
    // fallback: slice before <script>
    const scriptIndex = originalContent.indexOf('<script>');
    htmlHeadAndBody = originalContent.substring(0, scriptIndex).trim();
  }

  const standardScripts = `    <script src="./${dataFile}"></script>
    <script src="../../assets/js/bidi.js"></script>
    <script src="../../assets/js/audio.js"></script>
    <script src="../../assets/js/quiz-engine.js"></script>
    <script src="../../assets/js/ui.js"></script>
    <script src="../../assets/js/main.js"></script>`;

  const shellHtml = `${htmlHeadAndBody}

${standardScripts}
</body>
</html>
`;

  fs.writeFileSync(filePath, shellHtml, 'utf8');
  console.log(`[SHELL] Updated ${file} (${originalContent.length} bytes -> ${shellHtml.length} bytes).`);
});
