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
let fixedCount = 0;

htmlFiles.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    if (!content.includes('curriculum-renderer.js')) return;

    // Remove any wrongly placed scripts from middle of the body
    const scriptNames = [
        'quiz-normalizer.js',
        'ui-primitives.js',
        'vocab-renderer.js',
        'lexicon-renderer.js',
        'dialogue-player.js',
        'writing-renderer.js'
    ];

    // Remove existing occurrences of these sub-renderers
    scriptNames.forEach(sn => {
        const re = new RegExp(`\\s*<script[^>]*${sn}[^>]*><\\/script>`, 'g');
        content = content.replace(re, '');
    });

    // Determine correct relative prefix
    const depth = f.split(path.sep).length - 1;
    const relPrefix = depth === 2 ? '../../assets/js/' : (depth === 1 ? '../assets/js/' : 'assets/js/');

    // Find the exact script tag for curriculum-renderer.js
    const currMatch = content.match(/([ \t]*)<script[^>]*curriculum-renderer\.js[^>]*><\/script>/);
    if (!currMatch) return;

    const indent = currMatch[1] || '    ';
    const subRenderersBlock = [
        `${indent}<!-- Modular Sub-Renderers & Quiz Normalizer -->`,
        `${indent}<script src="${relPrefix}quiz-normalizer.js"></script>`,
        `${indent}<script src="${relPrefix}renderers/ui-primitives.js"></script>`,
        `${indent}<script src="${relPrefix}renderers/vocab-renderer.js"></script>`,
        `${indent}<script src="${relPrefix}renderers/lexicon-renderer.js"></script>`,
        `${indent}<script src="${relPrefix}renderers/dialogue-player.js"></script>`,
        `${indent}<script src="${relPrefix}renderers/writing-renderer.js"></script>`,
        `${indent}<script src="${relPrefix}curriculum-renderer.js"></script>`
    ].join('\n');

    content = content.replace(currMatch[0], subRenderersBlock);

    fs.writeFileSync(f, content, 'utf8');
    fixedCount++;
});

console.log(`Cleanly positioned all sub-renderers across ${fixedCount} HTML files!`);
