const fs = require('fs');
const path = require('path');
const vm = require('vm');

const stages = ['Grade_6', 'Prep_3', 'Sec_1', 'Sec_2', 'Sec_3'];
const sbReport = [];

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
            if (!fs.existsSync(dataPath)) return;
            
            try {
                const code = fs.readFileSync(dataPath, 'utf8');
                const sandbox = { window: {} };
                vm.createContext(sandbox);
                vm.runInContext(code, sandbox);
                const ld = sandbox.window.lessonData;
                if (!ld || !ld.storyPages) return;
                
                const html = fs.readFileSync(htmlPath, 'utf8');
                const hasStoryArtworkImg = html.includes('storyArtworkImg');
                const hasStoryImg = html.includes('storyImg');
                const hasStoryText = html.includes('storyText');
                const hasStoryEn = html.includes('storyEn');

                const missingImages = [];
                ld.storyPages.forEach((p, idx) => {
                    const img = p.image || p.imageUrl || p.img;
                    if (img) {
                        const resolved = path.resolve(uDir, img);
                        if (!fs.existsSync(resolved)) {
                            missingImages.push({ idx, img });
                        }
                    }
                });

                sbReport.push({
                    lesson: stage + '/' + unit + '/' + htmlFile,
                    hasStoryArtworkImg,
                    hasStoryImg,
                    hasStoryText,
                    hasStoryEn,
                    missingImages
                });
            } catch(e) {}
        });
    });
});

console.log('Storybook DOM mismatches (has storyImg or storyEn instead of storyArtworkImg/storyText):');
console.log(sbReport.filter(r => r.hasStoryImg || r.hasStoryEn).map(r => r.lesson));

console.log('\nStorybook missing images total lessons:', sbReport.filter(r => r.missingImages.length > 0).length);
sbReport.filter(r => r.missingImages.length > 0).forEach(r => {
    console.log(r.lesson, r.missingImages.map(m => m.img));
});
