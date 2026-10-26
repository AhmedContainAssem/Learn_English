const fs = require('fs');
const path = require('path');
const vm = require('vm');

const unitDir = path.join(__dirname, '..', 'Grade_4', 'unit-1');
const lessons = [
  { file: 'lesson-1.html', dataFile: 'lesson-1.data.js', fallbackTitle: 'Unit 1 - Lesson 1: Our Senses 👁️👂', fallbackDesc: 'الحواس والكلمات الأساسية (Our Senses)' },
  { file: 'lesson-2_part-1.html', dataFile: 'lesson-2_part-1.data.js', fallbackTitle: 'Unit 1 - Lesson 2: Healthy Habits (Part 1)', fallbackDesc: 'اختر العادة الصحية الصحيحة المناسبة للصورة والتعريف!' },
  { file: 'lesson-2_part-2.html', dataFile: 'lesson-2_part-2.data.js', fallbackTitle: 'Unit 1 - Lesson 2: Vocabulary & Expressions (Part 2)', fallbackDesc: 'اختر الكلمة أو التعبير الصحيح للمنهج!' },
  { file: 'lesson-2_part-3.html', dataFile: 'lesson-2_part-3.data.js', fallbackTitle: 'Unit 1 - Lesson 2: Verbs & Expressions (Part 3)', fallbackDesc: 'اختر الإجابة الصحيحة للأفعال والتعبيرات من الكتاب!' },
  { file: 'lesson-3_part-1.html', dataFile: 'lesson-3_part-1.data.js', fallbackTitle: 'Unit 1 - Lesson 3: Key & Extra Vocabulary 🪙🍲', fallbackDesc: 'شامل جميع كلمات Key Vocabulary & Extra Vocabulary!' },
  { file: 'lesson-4-5.html', dataFile: 'lesson-4-5.data.js', fallbackTitle: 'Lessons 4 & 5: Writing, Vocabulary & Pronunciation', fallbackDesc: 'الروتين اليومي، العادات الصحية، ونطق الأصوات المتحركة القصيرة والطويلة (Short & Long Vowels)' }
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

  // Ensure title & desc
  if (!parsedData.title) parsedData.title = fallbackTitle;
  if (!parsedData.description) parsedData.description = fallbackDesc;

  // Flatten questions if inside sections, but keep sections too for zero data loss
  if (!Array.isArray(parsedData.questions) && Array.isArray(parsedData.sections)) {
    const flat = [];
    parsedData.sections.forEach(sec => {
      if (Array.isArray(sec.questions)) {
        flat.push(...sec.questions);
      }
    });
    parsedData.questions = flat;
  }

  // Step 3: Write data file
  const dataJsContent = `/**
 * Grade 4 - Unit 1: ${parsedData.title}
 * Platform Curriculum Dataset
 */

window.lessonData = ${JSON.stringify(parsedData, null, 4)};

window.quizData = window.lessonData;
`;
  fs.writeFileSync(dataPath, dataJsContent, 'utf8');
  console.log(`[DATA] Generated ${dataFile} with ${parsedData.questions ? parsedData.questions.length : 0} questions.`);

  // Step 4: Write clean decoupled HTML shell
  // Remove the inline script block and ensure standard scripts are loaded
  let shellHtml = originalContent;

  // Replace script containing window.lessonData with reference to external data file and standard scripts
  const standardScripts = `    <script src="./${dataFile}"></script>
    <script src="../../assets/js/bidi.js"></script>
    <script src="../../assets/js/audio.js"></script>
    <script src="../../assets/js/quiz-engine.js"></script>
    <script src="../../assets/js/ui.js"></script>
    <script src="../../assets/js/main.js"></script>`;

  // In originalContent, check if there are already script tags at the bottom or if it ends before/after
  // First, remove any existing assets scripts at the end if they exist, and remove the inline lessonData script
  shellHtml = shellHtml.replace(/<script>\s*window\.lessonData\s*=\s*[\s\S]*?<\/script>/, '');
  shellHtml = shellHtml.replace(/\s*<script src="\.\.\/\.\.\/assets\/js\/bidi\.js"><\/script>/g, '');
  shellHtml = shellHtml.replace(/\s*<script src="\.\.\/\.\.\/assets\/js\/audio\.js"><\/script>/g, '');
  shellHtml = shellHtml.replace(/\s*<script src="\.\.\/\.\.\/assets\/js\/quiz-engine\.js"><\/script>/g, '');
  shellHtml = shellHtml.replace(/\s*<script src="\.\.\/\.\.\/assets\/js\/ui\.js"><\/script>/g, '');
  shellHtml = shellHtml.replace(/\s*<script src="\.\.\/\.\.\/assets\/js\/main\.js"><\/script>/g, '');
  // Clean up any empty comments before script injection
  shellHtml = shellHtml.replace(/<!-- Data Injection -->\s*/g, '');
  shellHtml = shellHtml.replace(/\/\/\s*={10,}\s*\n\s*\/\/\s*📌[^\n]*\n\s*\/\/\s*={10,}\s*/g, '');

  // Insert standardScripts right before </body>
  shellHtml = shellHtml.replace(/\s*<\/body>/, `\n${standardScripts}\n</body>`);

  fs.writeFileSync(filePath, shellHtml, 'utf8');
  console.log(`[SHELL] Updated ${file} (${originalContent.length} bytes -> ${shellHtml.length} bytes).`);
});
