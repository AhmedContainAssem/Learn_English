const fs = require('fs');
const path = require('path');

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

const files = getAllFiles('.', ['.html', '.js']).filter(f => !f.includes('.bak'));

let checkedCount = 0;
const brokenLinks = [];

// Matches any string containing assets/images/....(ext)
const imgRegex = /["'`]([^"'`]*assets\/images\/[^"'`]+\.(?:webp|jpg|jpeg|png|svg|gif))["'`]/gi;

files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
        checkedCount++;
        const rawPath = match[1];
        // Clean URL query params if present (e.g. ?v=6)
        const cleanPath = rawPath.split('?')[0];

        // Resolve relative to the file's directory
        const dir = path.dirname(file);
        // Handle URL encoding if present (e.g. %20 -> space)
        const decodedPath = decodeURIComponent(cleanPath);
        const resolved = path.resolve(dir, decodedPath);

        if (!fs.existsSync(resolved)) {
            brokenLinks.push({
                file,
                rawPath,
                resolved
            });
        }
    }
});

console.log('Total image path references checked:', checkedCount);
console.log('Total broken image links found:', brokenLinks.length);

if (brokenLinks.length > 0) {
    console.error('Broken links:');
    brokenLinks.slice(0, 30).forEach(b => {
        console.error(`- In ${b.file}: ${b.rawPath} -> ${b.resolved}`);
    });
} else {
    console.log('🎉 100% of all image links across all stages and units resolved successfully!');
}
