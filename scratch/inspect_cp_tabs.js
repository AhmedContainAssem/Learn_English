const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/connect-plus-lesson-1-2.html.bak', 'utf8');

function getTab(tabId) {
    const reg = new RegExp(`<div id="${tabId}"[^>]*>`, 'i');
    const m = html.match(reg);
    if (!m) return '';
    const start = m.index + m[0].length;
    const next = html.substring(start).search(/<div id="[^"]+" class="tab-content|<!-- =+ -->\s*<!-- Tab \d+/i);
    return next === -1 ? html.substring(start, html.indexOf('</main>', start)) : html.substring(start, start + next);
}

const tabs = ['vocab', 'storybook', 'dialogue', 'grammar', 'verbs', 'definitions', 'synonyms-affixes', 'quiz'];
tabs.forEach(t => {
    const content = getTab(t);
    console.log(`Tab: ${t} -> Length: ${content.length}`);
});

// Check if storyPages or readingDecks exist in script
const scripts = [...html.matchAll(/<script[\s\S]*?>([\s\S]*?)<\/script>/gi)];
scripts.forEach((s, idx) => {
    const txt = s[1];
    if (txt.includes('story') || txt.includes('deck') || txt.includes('dialogue') || txt.includes('lessonData')) {
        console.log(`Script ${idx} has:`, {
            len: txt.length,
            hasLessonData: txt.includes('lessonData'),
            hasStory: txt.includes('storyPages') || txt.includes('readingDecks') || txt.includes('stories'),
            hasDialogue: txt.includes('dialogue'),
            hasQuiz: txt.includes('questions')
        });
    }
});
