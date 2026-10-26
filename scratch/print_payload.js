const fs = require('fs');
const content = fs.readFileSync('Prep_3/unit-2/lesson-4-5.html.bak', 'utf8');
const idx = content.indexOf('<script id="studio-payload"');
if (idx !== -1) {
    const end = content.indexOf('</script>', idx);
    console.log(content.slice(idx, end + 9));
} else {
    console.log('Not found');
}
