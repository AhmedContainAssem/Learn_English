import re

with open('Sec_1/unit-4/lesson-3.data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect what's at the end of lessonData in Sec_1/unit-4/lesson-3.data.js
# We can add helper aliases inside the object or after it
# window.lessonData.storyPages = window.lessonData.storyPages || (window.lessonData.storyBook ? window.lessonData.storyBook.scenes.map(...) : []);
alias_code = '''
// Aliases for standard unified CurriculumRenderer compatibility:
if (window.lessonData) {
    if (!window.lessonData.storyPages && window.lessonData.storyBook && window.lessonData.storyBook.scenes) {
        window.lessonData.storyPages = window.lessonData.storyBook.scenes.map(s => ({
            title: s.titleEn || s.title || '',
            titleAr: s.titleAr || '',
            textEn: s.textEn || s.text || s.narrativeEn || '',
            textAr: s.textAr || s.translation || s.narrativeAr || '',
            vocabWords: s.vocabWords || s.targetWords || []
        }));
    }
    if (!window.lessonData.dialogue && window.lessonData.speakingDialogue) {
        window.lessonData.dialogue = {
            title: window.lessonData.speakingDialogue.title || 'Environmental Responsibility Dialogue',
            description: window.lessonData.speakingDialogue.topic || 'A discussion on saving energy and keeping communities clean',
            characters: window.lessonData.speakingDialogue.participants || [],
            lines: (window.lessonData.speakingDialogue.conversation || []).map(l => ({
                speaker: l.speaker,
                en: l.text,
                ar: l.arabic
            }))
        };
    }
    if (!window.lessonData.derivatives && window.lessonData.derivativeRoots) {
        window.lessonData.derivatives = window.lessonData.derivativeRoots;
    }
    if (!window.lessonData.confusionNotes && window.lessonData.clearConfusion) {
        window.lessonData.confusionNotes = window.lessonData.clearConfusion;
    }
    if ((!window.lessonData.expressions || !window.lessonData.prepositions) && window.lessonData.expressionsAndPrepositions) {
        window.lessonData.expressions = window.lessonData.expressionsAndPrepositions.filter(x => !x.phrase.includes('out') && !x.phrase.includes('off') && !x.phrase.includes('into') && !x.phrase.includes('from'));
        window.lessonData.prepositions = window.lessonData.expressionsAndPrepositions.filter(x => x.phrase.includes('out') || x.phrase.includes('off') || x.phrase.includes('into') || x.phrase.includes('from'));
    }
}
window.__LESSON_DATA__ = window.lessonData;
'''

if 'window.__LESSON_DATA__ = window.lessonData;' not in text:
    text = text.rstrip() + '\n' + alias_code
    with open('Sec_1/unit-4/lesson-3.data.js', 'w', encoding='utf-8') as f:
        f.write(text)
    print('Sec_1/unit-4/lesson-3.data.js aliases appended successfully!')
else:
    print('Already has aliases.')
