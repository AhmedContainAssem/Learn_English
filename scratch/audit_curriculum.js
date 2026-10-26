const fs = require('fs');
const path = require('path');
const vm = require('vm');

const stages = ['Grade_6', 'Prep_3', 'Sec_1', 'Sec_2', 'Sec_3'];
const report = [];

stages.forEach(stage => {
    if (!fs.existsSync(stage)) return;
    const units = fs.readdirSync(stage).filter(u => fs.statSync(path.join(stage, u)).isDirectory() && u.startsWith('unit'));
    units.forEach(unit => {
        const uDir = path.join(stage, unit);
        const files = fs.readdirSync(uDir).filter(f => f.endsWith('.html') && f !== 'index.html');
        files.forEach(htmlFile => {
            const htmlPath = path.join(uDir, htmlFile);
            const dataFile = htmlFile.replace('.html', '.data.js');
            const dataPath = path.join(uDir, dataFile);
            const hasData = fs.existsSync(dataPath);
            
            let lessonData = null;
            if (hasData) {
                try {
                    const code = fs.readFileSync(dataPath, 'utf8');
                    const sandbox = { window: {} };
                    vm.createContext(sandbox);
                    vm.runInContext(code, sandbox);
                    lessonData = sandbox.window.lessonData;
                } catch (e) {
                    // parse error
                }
            }
            
            const html = fs.readFileSync(htmlPath, 'utf8');
            const tabBtnMatches = Array.from(html.matchAll(/switchTab\(['"]([^'"]+)['"]/g)).map(m => m[1]);
            const tabContentMatches = Array.from(html.matchAll(/id=['"]([^'"]+)['"][^>]*class=['"][^'"]*tab-content[^'"]*['"]/g)).map(m => m[1]);
            const tabContentMatches2 = Array.from(html.matchAll(/class=['"][^'"]*tab-content[^'"]*['"][^>]*id=['"]([^'"]+)['"]/g)).map(m => m[1]);
            const allTabContentIds = Array.from(new Set([...tabContentMatches, ...tabContentMatches2]));

            report.push({
                lessonKey: `${stage}/${unit}/${htmlFile}`,
                hasData,
                tabBtns: tabBtnMatches,
                tabContentIds: allTabContentIds,
                verbsType: lessonData && lessonData.verbs ? (Array.isArray(lessonData.verbs) ? 'array' : typeof lessonData.verbs) : 'none',
                hasExpressions: !!(lessonData && lessonData.expressions),
                hasCollocations: !!(lessonData && lessonData.collocations),
                hasPrepositions: !!(lessonData && lessonData.prepositions),
                hasSynonyms: !!(lessonData && lessonData.synonyms),
                hasAntonyms: !!(lessonData && lessonData.antonyms),
                hasDefinitions: !!(lessonData && lessonData.definitions),
                dialogueType: lessonData && lessonData.dialogue ? (Array.isArray(lessonData.dialogue) ? 'array' : typeof lessonData.dialogue) : 'none',
                hasStoryPages: !!(lessonData && lessonData.storyPages),
                storyPagesCount: lessonData && lessonData.storyPages ? lessonData.storyPages.length : 0
            });
        });
    });
});

console.log(`Audited ${report.length} lessons total.`);

// Filter for potential anomalies
const verbsAnomalies = report.filter(r => r.tabBtns.includes('verbs') && r.verbsType !== 'array');
console.log('\n--- VERBS TAB ANOMALIES ---');
console.log(verbsAnomalies.map(r => ({ lesson: r.lessonKey, verbsType: r.verbsType })));

const collocationsAnomalies = report.filter(r => (r.tabBtns.includes('collocations') || r.tabBtns.includes('prepositions')) && (!r.hasCollocations && (r.hasExpressions || r.hasPrepositions)));
console.log('\n--- COLLOCATIONS/EXPRESSIONS ANOMALIES ---');
console.log(collocationsAnomalies.map(r => ({ lesson: r.lessonKey, hasCollocations: r.hasCollocations, hasExpressions: r.hasExpressions, hasPrepositions: r.hasPrepositions })));

const synAnomalies = report.filter(r => r.tabBtns.includes('synonyms') && r.tabContentIds.includes('synonyms'));
console.log('\n--- LESSONS WITH DEDICATED SYNONYMS TAB ---');
console.log(synAnomalies.map(r => ({ lesson: r.lessonKey, hasSyn: r.hasSynonyms, hasAnt: r.hasAntonyms, hasDef: r.hasDefinitions })));

const dialogueAnomalies = report.filter(r => r.tabBtns.includes('dialogue'));
console.log('\n--- DIALOGUE TABS AUDIT ---');
console.log(dialogueAnomalies.map(r => ({ lesson: r.lessonKey, dialogueType: r.dialogueType })));

const storyBookLessons = report.filter(r => r.tabBtns.includes('storybook') || r.tabBtns.includes('reading'));
console.log(`\n--- STORYBOOK/READING TABS (${storyBookLessons.length} lessons) ---`);
