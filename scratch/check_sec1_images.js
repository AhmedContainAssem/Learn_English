const fs = require('fs');

['Sec_1/unit-2', 'Sec_1/unit-3'].forEach(dir => {
    if (fs.existsSync(dir)) {
        const files = fs.readdirSync(dir).filter(f => f.endsWith('.data.js') || f.endsWith('.html'));
        console.log(dir, files);
        files.filter(f => f.endsWith('.data.js')).forEach(df => {
            const content = fs.readFileSync(dir + '/' + df, 'utf8');
            const lines = content.split('\n').filter(l => l.includes('imageUrl') || l.includes('image":') || l.includes('img":'));
            console.log('  ', df, lines);
        });
    }
});
