const fs = require('fs');
const path = require('path');

const courseDir = path.join(__dirname, '..', 'Course', 'A1');

// 1. Session 1 Data
const session1Data = {
    title: "Session 1: Getting Started & Introductions",
    description: "التعريف بالنفس، العمر، الموطن، والاهتمامات الشخصية",
    questions: [
        {
            id: "q1",
            emoji: "🔤",
            question: "ما معنى كلمة (Name) باللغة العربية؟",
            options: [
                { text: "سنة", isCorrect: false },
                { text: "اسم", isCorrect: true },
                { text: "لون", isCorrect: false },
                { text: "وجبة", isCorrect: false }
            ],
            correctMsg: "إجابة صحيحة! بطل ممتاز 🎯 (+10)",
            wrongMsg: "إجابة خاطئة، حاول مرة أخرى في المراجعة القادمة! 💪"
        },
        {
            id: "q2",
            emoji: "🇪🇬",
            question: "كيف نقول 'أنا من مصر' باللغة الإنجليزية؟",
            options: [
                { text: "I am 23 years old", isCorrect: false },
                { text: "My name is Ahmed", isCorrect: false },
                { text: "I am from Egypt", isCorrect: true },
                { text: "My favorite color is black", isCorrect: false }
            ],
            correctMsg: "إجابة صحيحة! بطل ممتاز 🎯 (+10)",
            wrongMsg: "إجابة خاطئة، حاول مرة أخرى في المراجعة القادمة! 💪"
        },
        {
            id: "q3",
            emoji: "👨‍👩‍👧‍👦",
            question: "ما معنى كلمة (Siblings)؟",
            options: [
                { text: "وجبة مفضلة", isCorrect: false },
                { text: "إخوة (أخت وأخ)", isCorrect: true },
                { text: "لون أسود", isCorrect: false },
                { text: "العمر", isCorrect: false }
            ],
            correctMsg: "إجابة صحيحة! بطل ممتاز 🎯 (+10)",
            wrongMsg: "إجابة خاطئة، حاول مرة أخرى في المراجعة القادمة! 💪"
        },
        {
            id: "q4",
            emoji: "🗣️",
            question: "ما هو السؤال المناسب لسؤال شخص عن إخوته؟",
            options: [
                { text: "Do you have siblings?", isCorrect: true },
                { text: "What is your name?", isCorrect: false },
                { text: "How old are you?", isCorrect: false },
                { text: "Where are you from?", isCorrect: false }
            ],
            correctMsg: "إجابة صحيحة! بطل ممتاز 🎯 (+10)",
            wrongMsg: "إجابة خاطئة، حاول مرة أخرى في المراجعة القادمة! 💪"
        }
    ]
};

// 2. Session 2 Data
const session2Data = {
    title: "Session 2: Job, Workplace & Contact Info",
    description: "الوظائف، أماكن العمل، والسؤال عن أرقام الهاتف والبريد الإلكتروني",
    questions: [
        {
            id: "q1",
            emoji: "💼",
            question: "ما معنى كلمة (Job / Work) باللغة العربية؟",
            options: [
                { text: "مدرسة", isCorrect: false },
                { text: "رقم الهاتف", isCorrect: false },
                { text: "عمل / وظيفة", isCorrect: true },
                { text: "طبيب", isCorrect: false }
            ],
            correctMsg: "إجابة صحيحة! بطل ممتاز 🎯 (+10)",
            wrongMsg: "إجابة خاطئة، حاول مرة أخرى في المراجعة القادمة! 💪"
        },
        {
            id: "q2",
            emoji: "❓",
            question: "كيف تسأل شخصاً عن وظيفته بالإنجليزية؟",
            options: [
                { text: "What do you do?", isCorrect: true },
                { text: "Where do you work?", isCorrect: false },
                { text: "What is your phone number?", isCorrect: false },
                { text: "Do you have siblings?", isCorrect: false }
            ],
            correctMsg: "إجابة صحيحة! بطل ممتاز 🎯 (+10)",
            wrongMsg: "إجابة خاطئة، حاول مرة أخرى في المراجعة القادمة! 💪"
        },
        {
            id: "q3",
            emoji: "👷‍♂️",
            question: "ما معنى كلمة (Engineer)؟",
            options: [
                { text: "معلم", isCorrect: false },
                { text: "طالب", isCorrect: false },
                { text: "مهندس", isCorrect: true },
                { text: "شركة", isCorrect: false }
            ],
            correctMsg: "إجابة صحيحة! بطل ممتاز 🎯 (+10)",
            wrongMsg: "إجابة خاطئة، حاول مرة أخرى في المراجعة القادمة! 💪"
        },
        {
            id: "q4",
            emoji: "🏢",
            question: "ما هو السؤال الصحيح للسؤال عن مكان العمل؟",
            options: [
                { text: "What is your name?", isCorrect: false },
                { text: "Where do you work?", isCorrect: true },
                { text: "How old are you?", isCorrect: false },
                { text: "What is your email?", isCorrect: false }
            ],
            correctMsg: "إجابة صحيحة! بطل ممتاز 🎯 (+10)",
            wrongMsg: "إجابة خاطئة، حاول مرة أخرى في المراجعة القادمة! 💪"
        }
    ]
};

const sessions = [
    { file: 'session-1.html', dataFile: 'session-1.data.js', data: session1Data },
    { file: 'session-2.html', dataFile: 'session-2.data.js', data: session2Data }
];

sessions.forEach(({ file, dataFile, data }) => {
    const filePath = path.join(courseDir, file);
    const bakPath = path.join(courseDir, file + '.bak');
    const dataPath = path.join(courseDir, dataFile);

    const originalContent = fs.readFileSync(filePath, 'utf8');

    // Step 1: Backup
    if (!fs.existsSync(bakPath)) {
        fs.writeFileSync(bakPath, originalContent, 'utf8');
        console.log(`[BACKUP] Created ${file}.bak`);
    }

    // Step 2: Write data.js
    const dataContent = `/**
 * Course Level A1 - ${data.title}
 * Platform Curriculum Dataset
 */

window.lessonData = ${JSON.stringify(data, null, 4)};

window.quizData = window.lessonData;
`;
    fs.writeFileSync(dataPath, dataContent, 'utf8');
    console.log(`[DATA] Generated ${dataFile}`);

    // Step 3: Decouple HTML
    // Keep everything up to the homework section or nav-controls
    const navControlsIndex = originalContent.indexOf('<!-- Navigation Controls -->');
    if (navControlsIndex === -1) {
        console.error(`Could not find Navigation Controls comment in ${file}`);
        return;
    }

    // Find the end of container div after nav-controls
    const afterNav = originalContent.substring(navControlsIndex);
    const containerCloseMatch = afterNav.match(/<\/div>\s*<\/div>/);
    let htmlBeforeScripts;
    if (containerCloseMatch) {
        const cutPoint = navControlsIndex + containerCloseMatch.index + containerCloseMatch[0].length;
        htmlBeforeScripts = originalContent.substring(0, cutPoint);
    } else {
        const scriptIndex = originalContent.indexOf('<script>');
        htmlBeforeScripts = originalContent.substring(0, scriptIndex).trim();
    }

    // Add score board inside quiz card if not already there
    if (!htmlBeforeScripts.includes('score-board')) {
        htmlBeforeScripts = htmlBeforeScripts.replace(
            '<div id="quiz-container" class="quiz-card">',
            `<div id="quiz-container" class="quiz-card">\n                <div class="score-board">\n                    <span>السؤال: <span id="current-q">1</span> / <span id="total-q">4</span></span>\n                    <span>النقاط: <span id="score">0</span> 🌟</span>\n                </div>`
        );
    }

    const standardScripts = `    <!-- Scripts -->
    <script src="./${dataFile}"></script>
    <script src="../../assets/js/bidi.js"></script>
    <script src="../../assets/js/audio.js"></script>
    <script src="../../assets/js/quiz-engine.js"></script>
    <script src="../../assets/js/ui.js"></script>
    <script src="../../assets/js/main.js"></script>
</body>
</html>
`;

    const newHtml = `${htmlBeforeScripts}

${standardScripts}`;

    fs.writeFileSync(filePath, newHtml, 'utf8');
    console.log(`[SHELL] Updated ${file} (${originalContent.length} bytes -> ${newHtml.length} bytes).`);
});
