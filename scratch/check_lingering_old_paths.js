const fs = require('fs');
const path = require('path');
const plan = JSON.parse(fs.readFileSync('scratch/migration_plan.json', 'utf8'));

function getAllFiles(dir, exts, fileList = []) {
    if (!fs.existsSync(dir)) return fileList;
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        try {
            const stat = fs.statSync(filePath);
            if (stat.isDirectory()) {
                if (!['.git', 'node_modules', '.gemini', 'scratch', 'assets'].includes(file)) {
                    getAllFiles(filePath, exts, fileList);
                }
            } else if (exts.some(ext => file.toLowerCase().endsWith(ext))) {
                fileList.push(filePath);
            }
        } catch (e) { }
    });
    return fileList;
}

const codeFiles = getAllFiles('.', ['.html', '.js']).filter(f => !f.includes('.bak'));

const remainingOldRefs = [];

for (const [src, destDir] of Object.entries(plan)) {
    if (destDir === 'assets/images/unreferenced') continue;
    const filename = path.basename(src);

    codeFiles.forEach(f => {
        const content = fs.readFileSync(f, 'utf8');
        if (content.includes('./sec 3 storybook photos/' + filename)) {
            remainingOldRefs.push({ file: f, old: './sec 3 storybook photos/' + filename });
        }
        const directPattern = new RegExp('\\.\\./\\.\\./assets/images/' + filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?=["\'\`\\s?\\)]|$)', 'g');
        if (directPattern.test(content)) {
            remainingOldRefs.push({ file: f, old: '../../assets/images/' + filename });
        }
    });
}

console.log('Remaining old references:', remainingOldRefs.length);
if (remainingOldRefs.length > 0) {
    console.log(remainingOldRefs);
}
