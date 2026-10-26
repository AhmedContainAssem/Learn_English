const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.git' && file !== '.gemini' && file !== 'scratch') {
                results = results.concat(walk(fullPath));
            }
        } else if (file.endsWith('.data.js')) {
            results.push(fullPath);
        }
    });
    return results;
}

const files = walk('.');
console.log('Total data files found:', files.length);

const reports = [];

files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    global.window = {};
    try {
        eval(content);
        const d = global.window.lessonData || global.window.__LESSON_DATA__;
        if (!d) return;

        // Check dialogue
        if (d.dialogue && Array.isArray(d.dialogue.turns)) {
            const emptyAr = d.dialogue.turns.filter(t => !t.ar || t.ar.trim() === '');
            if (emptyAr.length > 0) {
                reports.push({ file: f, type: 'dialogue_empty_ar', count: emptyAr.length, total: d.dialogue.turns.length });
            }
        }

        // Check keyVocabulary
        const vocabs = d.keyVocabulary || d.vocabulary || [];
        if (Array.isArray(vocabs)) {
            const emptyMeaning = vocabs.filter(v => !v.meaning || v.meaning.trim() === '' || v.meaning === '-');
            if (emptyMeaning.length > 0) {
                reports.push({ file: f, type: 'vocab_empty_meaning', count: emptyMeaning.length, total: vocabs.length });
            }
        }

        // Check story / reading passage
        if (d.readingPassage || d.story) {
            const story = d.readingPassage || d.story;
            if (story.pages && Array.isArray(story.pages)) {
                const emptyTrans = story.pages.filter(p => !p.translation || p.translation.trim() === '');
                if (emptyTrans.length > 0) {
                    reports.push({ file: f, type: 'story_empty_translation', count: emptyTrans.length, total: story.pages.length });
                }
            }
        }
    } catch (e) {
        reports.push({ file: f, type: 'eval_error', error: e.message });
    }
});

fs.writeFileSync('scratch/missing_translations_report.json', JSON.stringify(reports, null, 2), 'utf8');
console.log('Report saved. Total issues found:', reports.length);
reports.forEach(r => console.log(JSON.stringify(r)));
