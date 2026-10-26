const fs = require('fs');

function normalizeQuestions(rawData) {
    if (!rawData) return [];

    let list = [];
    if (Array.isArray(rawData)) {
        list = rawData;
    } else if (typeof rawData === 'object' && rawData !== null) {
        if (Array.isArray(rawData.sections)) {
            rawData.sections.forEach(sec => {
                if (Array.isArray(sec.questions)) list.push(...sec.questions);
            });
        } else if (Array.isArray(rawData.questions)) {
            list = rawData.questions;
        } else if (Array.isArray(rawData.quiz)) {
            list = rawData.quiz;
        }
    }

    return list.map((q, qIndex) => {
        if (!q) return q;
        const clean = { ...q };

        // 1. Normalize question prompt
        clean.question = clean.question || clean.q || clean.prompt || clean.text || '';
        if (typeof clean.question === 'string') {
            clean.question = clean.question.replace(/^\d+[\.\-\)]\s*/, '').trim();
        }

        // 2. Normalize explanation / feedback messages
        clean.explanation = clean.explanation || clean.exp || clean.explain || clean.rationale || '';
        clean.correctMsg = clean.correctMsg || (clean.feedback && clean.feedback.correct) || (clean.explanation ? `✅ إجابة صحيحة! أحسنت 🎯 (${clean.explanation})` : null);
        clean.wrongMsg = clean.wrongMsg || (clean.feedback && clean.feedback.wrong) || (clean.explanation ? `❌ إجابة غير صحيحة. (${clean.explanation})` : null);

        // 3. Normalize options into objects: [{ text: "...", isCorrect: true/false }]
        const rawOptions = Array.isArray(clean.options) ? clean.options : (Array.isArray(clean.choices) ? clean.choices : []);

        // Determine correct answer indicator
        const rawAnswer = clean.correct !== undefined 
            ? clean.correct 
            : (clean.a !== undefined 
                ? clean.a 
                : (clean.answer !== undefined 
                    ? clean.answer 
                    : clean.correctAnswer));

        const alreadyStructured = rawOptions.length > 0 && typeof rawOptions[0] === 'object' && rawOptions[0] !== null && 'isCorrect' in rawOptions[0];

        if (alreadyStructured) {
            clean.options = rawOptions.map(opt => ({
                text: String(opt.text || ''),
                isCorrect: Boolean(opt.isCorrect)
            }));
        } else {
            clean.options = rawOptions.map((opt, idx) => {
                const optText = (typeof opt === 'object' && opt !== null) ? (opt.text || '') : String(opt);
                let isMatch = false;

                if (typeof rawAnswer === 'number') {
                    isMatch = (idx === rawAnswer);
                } else if (typeof rawAnswer === 'string') {
                    const trimmedAns = rawAnswer.trim().toLowerCase();
                    if (optText.trim().toLowerCase() === trimmedAns) {
                        isMatch = true;
                    } else if (['a', 'b', 'c', 'd'].includes(trimmedAns)) {
                        const letterIdx = trimmedAns.charCodeAt(0) - 97;
                        isMatch = (idx === letterIdx);
                    }
                }
                return {
                    text: optText,
                    isCorrect: isMatch
                };
            });
        }

        // Ensure at least one correct option exists if rawAnswer was given
        if (clean.options.length > 0 && !clean.options.some(o => o.isCorrect)) {
            if (typeof rawAnswer === 'number' && rawAnswer >= 0 && rawAnswer < clean.options.length) {
                clean.options[rawAnswer].isCorrect = true;
            }
        }

        // Store correct answer string for quick lookup
        const correctOpt = clean.options.find(o => o.isCorrect);
        clean.answer = correctOpt ? correctOpt.text : (typeof rawAnswer === 'string' ? rawAnswer : '');

        return clean;
    });
}

const testFiles = [
    'Sec_3/unit-3/lesson-1-2.data.js',
    'Sec_3/unit-3/lesson-4-5.data.js',
    'Sec_2/unit-3/lesson-3-1.data.js',
    'Sec_2/unit-3/lesson-3-2.data.js',
    'Sec_2/unit-3/lesson-3-3.data.js',
    'Sec_2/unit-3/lesson-3-4.data.js',
    'Sec_2/unit-4/lesson-4-1.data.js',
    'Sec_2/unit-4/lesson-4-2.data.js',
    'Sec_2/unit-4/lesson-4-3.data.js',
    'Sec_2/unit-4/lesson-4-4.data.js',
    'Grade_6/unit-1/lesson-1.data.js',
    'Grade_6/unit-1/lesson-2.data.js',
    'Grade_6/unit-1/lesson-3.data.js',
    'Grade_6/unit-2/lesson-1.data.js',
    'Grade_6/unit-3/lesson-1.data.js'
];

testFiles.forEach(file => {
    global.window = {};
    eval(fs.readFileSync(file, 'utf8'));
    const d = global.window.lessonData || global.window.__LESSON_DATA__;
    const qList = d.quiz || d.questions;
    const normalized = normalizeQuestions(qList);
    
    const count = normalized.length;
    const hasPrompt = normalized.every(q => q.question && q.question.length > 0);
    const hasOptions = normalized.every(q => q.options && q.options.length >= 2);
    const hasCorrect = normalized.every(q => q.options.some(o => o.isCorrect));
    
    console.log(`${file}: ${count} questions | Prompt: ${hasPrompt} | Options: ${hasOptions} | Correct marked: ${hasCorrect}`);
    if (!hasCorrect) {
        const failed = normalized.findIndex(q => !q.options.some(o => o.isCorrect));
        console.error(`  FAILED QUESTION ${failed}:`, normalized[failed]);
    }
});
