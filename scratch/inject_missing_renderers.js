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
        } else if (file.endsWith('.html') && !file.endsWith('.bak')) {
            results.push(fullPath);
        }
    });
    return results;
}

const htmlFiles = walk('.');
let updatedCount = 0;

htmlFiles.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (!content.includes('curriculum-renderer.js')) return;

    // Determine relative path prefix to assets/js
    const depth = f.split(path.sep).length - 1;
    let relPrefix = depth === 2 ? '../../assets/js/' : (depth === 1 ? '../assets/js/' : 'assets/js/');

    let changed = false;

    // Required sub-renderers
    const requiredScripts = [
        'quiz-normalizer.js',
        'renderers/ui-primitives.js',
        'renderers/vocab-renderer.js',
        'renderers/lexicon-renderer.js',
        'renderers/dialogue-player.js',
        'renderers/writing-renderer.js'
    ];

    const toInject = [];
    requiredScripts.forEach(rs => {
        const scriptBase = path.basename(rs);
        if (!content.includes(scriptBase)) {
            toInject.push(`    <script src="${relPrefix}${rs}"></script>`);
        }
    });

    if (toInject.length > 0) {
        // Insert right before curriculum-renderer.js
        const currIdx = content.indexOf('curriculum-renderer.js');
        if (currIdx !== -1) {
            const lineStart = content.lastIndexOf('\n', currIdx) + 1;
            const injection = toInject.join('\n') + '\n';
            content = content.slice(0, lineStart) + injection + content.slice(lineStart);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(f, content, 'utf8');
        updatedCount++;
        console.log(`✅ Updated ${f} with ${toInject.length} missing scripts`);
    }
});

console.log(`\nDone. Total HTML files updated: ${updatedCount}`);
