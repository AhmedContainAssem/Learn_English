const fs = require('fs');
const path = require('path');

const plan = JSON.parse(fs.readFileSync('scratch/migration_plan.json', 'utf8'));

// Build filename -> new relative subpath from assets/images/
const fileToNewSubpath = {};
for (const [src, destDir] of Object.entries(plan)) {
    if (destDir === 'assets/images/unreferenced') continue;
    const filename = path.basename(src);
    const subpath = destDir.replace(/^assets\/images\//, '');
    fileToNewSubpath[filename] = subpath;
}

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

const targetFiles = getAllFiles('.', ['.html', '.js', '.css']).filter(f => !f.includes('.bak'));

let totalFilesModified = 0;

targetFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;

    // 1. Replace ./sec 3 storybook photos/
    content = content.replace(/\.\/sec 3 storybook photos\/([^"'\`\s)]+)/g, (match, filename) => {
        const subpath = fileToNewSubpath[filename] || 'sec_3/unit_1';
        return '../../assets/images/' + subpath + '/' + filename;
    });

    // 2. Replace ../../assets/images/<filename> with ../../assets/images/<subpath>/<filename>
    for (const [filename, subpath] of Object.entries(fileToNewSubpath)) {
        const escapedFilename = filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        // Check if ../../assets/images/filename is present
        const searchPattern = new RegExp('(\\.\\./\\.\\./assets/images/)' + escapedFilename + '(?=["\'\`\\s?\\)]|$)', 'g');
        content = content.replace(searchPattern, (m, prefix) => {
            return prefix + subpath + '/' + filename;
        });

        // For admin files: ../assets/images/filename
        const adminPattern = new RegExp('(\\.\\./assets/images/)' + escapedFilename + '(?=["\'\`\\s?\\)]|$)', 'g');
        content = content.replace(adminPattern, (m, prefix) => {
            return prefix + subpath + '/' + filename;
        });
    }

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        totalFilesModified++;
        console.log('Updated:', file);
    }
});

console.log('Total files modified:', totalFilesModified);
