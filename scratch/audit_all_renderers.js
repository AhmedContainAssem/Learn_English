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
const audit = [];

files.forEach(f => {
    const content = fs.readFileSync(f, 'utf8');
    global.window = {};
    try {
        eval(content);
        const d = global.window.lessonData || global.window.__LESSON_DATA__;
        if (!d) return;

        // 1. Dialogue
        if (d.dialogue) {
            const turns = d.dialogue.turns || d.dialogue.lines || [];
            turns.forEach((t, i) => {
                const ar = t.ar || t.textAr || t.translation || t.arabic || '';
                if (!ar.trim()) {
                    audit.push({ file: f, section: 'dialogue', index: i, en: t.en || t.textEn || '' });
                }
            });
        }

        // 2. Vocabulary (Key + Important)
        const vocabs = (d.keyVocabulary || d.vocabulary || []).concat(d.importantVocabulary || d.accumulativeVocabulary || []);
        vocabs.forEach((v, i) => {
            const ar = v.meaning || v.translation || v.ar || v.arabic || v.meaningAr || '';
            if (!ar.trim() || ar.trim() === '-') {
                audit.push({ file: f, section: 'vocabulary', word: v.word || v.infinitive || '' });
            }
        });

        // 3. Definitions
        (d.definitions || []).forEach(df => {
            const ar = df.meaning || df.ar || df.arabic || df.meaningAr || df.defAr || df.translation || '';
            if (!ar.trim()) {
                audit.push({ file: f, section: 'definitions', word: df.word || '' });
            }
        });

        // 4. Verbs
        const verbs = Array.isArray(d.verbs) ? d.verbs : ((d.verbs && d.verbs.regular) ? d.verbs.regular.concat(d.verbs.irregular || []) : []);
        verbs.forEach(v => {
            const ar = v.meaning || v.ar || v.arabic || v.translation || v.meaningAr || '';
            if (!ar.trim()) {
                audit.push({ file: f, section: 'verbs', word: v.word || v.infinitive || '' });
            }
        });

    } catch (e) {
        audit.push({ file: f, section: 'error', error: e.message });
    }
});

console.log('Total missing Arabic items:', audit.length);
const byFile = {};
audit.forEach(a => {
    if (!byFile[a.file]) byFile[a.file] = [];
    byFile[a.file].push(a);
});

for (const [file, items] of Object.entries(byFile)) {
    console.log(file, '->', items.length, 'issues:', items.map(i => i.section + (i.word ? `(${i.word})` : '')).slice(0, 5).join(', '));
}
