const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (!['node_modules', '.git', 'admin', 'scratch', 'assets'].includes(file)) {
        results = results.concat(walk(fullPath));
      }
    } else if (file.endsWith('.html') && file !== 'index.html') {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = walk('.');
const summary = [];

for (const f of htmlFiles) {
  const content = fs.readFileSync(f, 'utf8');
  const hasInline = /window\.(lessonData|quizData)\s*=/.test(content);
  const hasExternal = /src=["'][^"']+\.data\.js["']/.test(content);
  const rel = f.replace(/\\/g, '/');
  summary.push({
    file: rel,
    hasInline,
    hasExternal,
    size: content.length
  });
}

console.table(summary);
