const fs = require('fs');
const html = fs.readFileSync('Prep_3/unit-2/connect-plus-lesson-1-2.html.bak', 'utf8');

console.log('File size:', html.length, 'bytes');

// Check title and meta
const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/);
console.log('Title:', titleMatch ? titleMatch[1].trim() : 'N/A');

// Check tabs
const tabMatches = [...html.matchAll(/class="tab-btn[^"]*"\s+onclick="switchTab\('([^']+)',\s*this\)">([\s\S]*?)<\/button>/g)];
console.log('Tabs:', tabMatches.map(m => ({ id: m[1], name: m[2].trim() })));

// Check section comments
const comments = [...html.matchAll(/<!--\s*(=+[\s\S]*?=+)\s*-->/g)];
console.log('Sections:');
comments.forEach(c => console.log(' - ' + c[1].replace(/=/g, '').trim()));

// Check storybook
const hasStorybook = html.includes('storybook-wrapper') || html.includes('storyEngine') || html.includes('story-controls');
console.log('Has Storybook:', hasStorybook);

// Check grammar video / slides
const hasGrammarSlides = html.includes('slide-presentation-container') || html.includes('GrammarSlides');
const hasGrammarVideo = html.includes('video-lesson-card') || html.includes('youtube');
console.log('Has Grammar Slides:', hasGrammarSlides, 'Has Grammar Video:', hasGrammarVideo);

// Check Quiz
const hasQuiz = html.includes('window.lessonData = {') || html.includes('quizEngine');
console.log('Has Quiz in script:', hasQuiz);
