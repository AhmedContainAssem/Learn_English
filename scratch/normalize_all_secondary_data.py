import os, glob

alias_template = '''
// Standardized Aliases for Universal Curriculum Renderer
if (typeof window !== 'undefined' && window.lessonData) {
    const d = window.lessonData;
    if (!d.storyPages) {
        const scenes = (d.storyBook && d.storyBook.scenes) || (d.storybook && d.storybook.scenes);
        if (scenes) {
            d.storyPages = scenes.map(s => ({
                title: s.titleEn || s.title || '',
                titleAr: s.titleAr || '',
                textEn: s.textEn || s.text || s.narrativeEn || '',
                textAr: s.textAr || s.translation || s.narrativeAr || '',
                vocabWords: s.vocabWords || s.targetWords || []
            }));
        }
    }
    if (!d.dialogue) {
        if (d.speakingDialogue) {
            d.dialogue = {
                title: d.speakingDialogue.title || 'Speaking Dialogue',
                description: d.speakingDialogue.topic || 'Interactive speaking practice',
                characters: d.speakingDialogue.participants || d.speakingDialogue.characters || [],
                lines: (d.speakingDialogue.conversation || d.speakingDialogue.lines || []).map(l => ({
                    speaker: l.speaker || l.name,
                    en: l.text || l.en || l.english,
                    ar: l.arabic || l.ar || l.translation
                }))
            };
        }
    }
    if (!d.derivatives && d.derivativeRoots) {
        d.derivatives = d.derivativeRoots;
    }
    if (!d.confusionNotes) {
        d.confusionNotes = d.clearConfusion || d.confusion;
    }
    if (!d.writingSkill && !d.writingSkills) {
        if (d.formalEmailGuide) {
            d.writingSkill = {
                title: 'دليل وقواعد كتابة البريد الإلكتروني الرسمي (Formal Email Writing)',
                definition: d.formalEmailGuide.definition || 'Formal email is used for business, professional, or academic correspondence.',
                features: (d.formalEmailGuide.structure || []).map(s => ({
                    name: s.part || s.title || 'Component',
                    description: s.purpose || s.desc || '',
                    example: Array.isArray(s.examples) ? s.examples.join(' • ') : (s.example || '')
                }))
            };
        }
    }
    if ((!d.expressions || !d.prepositions) && (d.expressionsAndPrepositions || d.expressionsPrepositions)) {
        const raw = d.expressionsAndPrepositions || d.expressionsPrepositions;
        if (Array.isArray(raw)) {
            d.expressions = raw.filter(x => {
                const phr = (x.phrase || x.en || '').toLowerCase();
                return !phr.includes('out') && !phr.includes('off') && !phr.includes('into') && !phr.includes('from') && !phr.includes('on') && !phr.includes('for');
            });
            d.prepositions = raw.filter(x => {
                const phr = (x.phrase || x.en || '').toLowerCase();
                return phr.includes('out') || phr.includes('off') || phr.includes('into') || phr.includes('from') || phr.includes('on') || phr.includes('for');
            });
        }
    }
    window.__LESSON_DATA__ = d;
}
'''

for sec in ['Sec_1', 'Sec_2', 'Sec_3']:
    for fpath in sorted(glob.glob(f'{sec}/**/*.data.js', recursive=True)):
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if aliases already appended
        if '// Standardized Aliases for Universal Curriculum Renderer' in content:
            continue
            
        # If it has any non-standard key or is missing __LESSON_DATA__
        needs_patch = False
        for k in ['storyBook', 'speakingDialogue', 'derivativeRoots', 'clearConfusion', 'expressionsAndPrepositions', 'formalEmailGuide']:
            if f'"{k}"' in content:
                needs_patch = True
                break
        if '__LESSON_DATA__' not in content:
            needs_patch = True

        if needs_patch:
            content = content.rstrip() + '\n' + alias_template
            with open(fpath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Patched aliases in: {fpath}")

print("All secondary data files normalized!")
