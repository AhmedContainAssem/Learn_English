const fs = require('fs');

// 1. Prep 3 Unit 3 Lesson 1 Vocab
const p3u3_file = 'Prep_3/unit-3/lesson-1.data.js';
if (fs.existsSync(p3u3_file)) {
    global.window = {};
    eval(fs.readFileSync(p3u3_file, 'utf8'));
    const d = global.window.lessonData;
    const vocabMap = {
        'Artificial Intelligence (AI)': { m: 'الذكاء الاصطناعي', e: 'قدرة الأنظمة الحاسوبية على محاكاة القدرات العقلية والتعلم واتخاذ القرارات.' },
        'robot': { m: 'روبوت / آلة ذكية', e: 'آلة ميكانيكية مبرمجة لأداء مهام محددة أو معقدة تلقائياً.' },
        'limit': { m: 'حد / قيد / يُقيد', e: 'الحد الأقصى أو النطاق الذي لا يمكن تجاوزه.' },
        'emotion': { m: 'عاطفة / شعور وجداني', e: 'إحساس نفسي ووجداني حقيقي كالفرح والحزن والمحبة.' },
        'task': { m: 'مهمة / واجب عملي', e: 'عمل أو تكليف محدد مطلوب إنجازه بدقة.' },
        'algorithm': { m: 'خوارزمية', e: 'مجموعة من الخطوات الرياضية والمنطقية المتسلسلة لحل مشكلة معينة.' },
        'poem': { m: 'قصيدة شعرية', e: 'نص أدبي موزون يعبر عن المشاعر والأفكار بأسلوب جمالي بديع.' },
        'virtual': { m: 'افتراضي', e: 'محاكى رقمياً عبر شاشات الحاسوب وليس موجوداً في الواقع المادي الملموس.' },
        'advanced': { m: 'متقدم / متطور', e: 'حديث وعالي التقنية والتطور مقارنة بالأساليب التقليدية.' },
        'behavior': { m: 'سلوك / تصرف', e: 'طريقة التصرف أو الاستجابة للمواقف والمدخلات المختلفة.' },
        'vacuum cleaner': { m: 'مكنسة كهربائية', e: 'جهاز منزلي لسحب وتنظيف الأتربة والغبار من الأرضيات.' },
        'humans': { m: 'البشر / بنو الإنسان', e: 'الكائنات البشرية التي تتميز بالعقل والمشاعر والضمير الأخلاقي.' },
        'innovation': { m: 'ابتكار / تجديد إبداعي', e: 'ابتكار أفكار أو تقنيات جديدة تسهم في حل المشكلات وتطوير الحياة.' },
        'compose': { m: 'يؤلف / يلحن', e: 'صياغة نص شعري أو تأليف قطعة موسيقية أو إبداعية.' },
        'benefits': { m: 'فوائد / منافع', e: 'المكاسب والآثار الإيجابية الناتجة عن استخدام تقنية أو فكرة ما.' }
    };
    (d.keyVocabulary || []).forEach(v => {
        if (vocabMap[v.word]) {
            v.meaning = vocabMap[v.word].m;
            v.explain = vocabMap[v.word].e;
        }
    });
    fs.writeFileSync(p3u3_file, 'window.lessonData = ' + JSON.stringify(d, null, 4) + ';\n', 'utf8');
    console.log('✅ Updated Prep 3 U3 L1 vocabulary meanings');
}

// 2. Sec 2 Unit 1 Lesson 1 Part 1 Definitions
const s2u1p1_file = 'Sec_2/unit-1/lesson-1-part-1.data.js';
if (fs.existsSync(s2u1p1_file)) {
    global.window = {};
    eval(fs.readFileSync(s2u1p1_file, 'utf8'));
    const d = global.window.lessonData;
    const defMap = {
        'absolute word': { m: 'كلمة قطعية / تعبير جازم', d: 'A word that expresses no doubt or exception, such as "always", "never", or "completely".' },
        'bias': { m: 'انحياز / تحيز', d: 'An inclination or unfair preference towards one perspective over another.' },
        'biased language': { m: 'لغة متحيزة / ألفاظ غير محايدة', d: 'Words and phrases that show clear partiality, prejudice, or loaded emotional judgment.' },
        'evaluative adjective': { m: 'صفة تقييمية (حُكمية)', d: 'An adjective that expresses personal opinion or judgment rather than an objective factual description.' },
        'hedging word': { m: 'كلمة تحوط / تعبير احترازي', d: 'Cautious language used to soften statements and avoid absolute claims (e.g., "suggests", "tends to", "possibly").' },
        'highlight-reel effect': { m: 'أثر استعراض أفضل اللحظات', d: 'The psychological bias of comparing one\'s daily reality to the curated, best moments shown on social media.' },
        'intensifier': { m: 'أداة توكيد / لفظ مشدد', d: 'A word (like "extremely", "absolutely", "deeply") used to strengthen the force or degree of an adjective or verb.' },
        'neutral language': { m: 'لغة محايدة / أسلوب موضوعي', d: 'Objective, fact-based words without emotional coloring or subjective prejudice.' },
        'rhetorical question': { m: 'سؤال بلاغي', d: 'A question asked to make a point or stimulate thought rather than to elicit a literal answer.' },
        'social comparison': { m: 'المقارنة الاجتماعية', d: 'The psychological tendency to judge one\'s own abilities, success, or appearance against those of others.' }
    };
    (d.definitions || []).forEach(item => {
        if (defMap[item.word]) {
            item.meaning = defMap[item.word].m;
            item.definition = defMap[item.word].d;
        }
    });
    fs.writeFileSync(s2u1p1_file, 'window.lessonData = ' + JSON.stringify(d, null, 4) + ';\n', 'utf8');
    console.log('✅ Updated Sec 2 U1 L1 Part 1 definitions');
}

// 3. Sec 2 Unit 1 Lesson 1 Part 2 Definitions
const s2u1p2_file = 'Sec_2/unit-1/lesson-1-part-2.data.js';
if (fs.existsSync(s2u1p2_file)) {
    global.window = {};
    eval(fs.readFileSync(s2u1p2_file, 'utf8'));
    const d = global.window.lessonData;
    const defMap2 = {
        'measurable (adj)': { m: 'قابل للقياس', d: 'Able to be assessed, quantified, or tracked clearly with numbers or specific criteria.' },
        'mindfulness (n)': { m: 'اليقظة الذهنية / الحضور الواعي', d: 'The state of being consciously aware of the present moment without passing harsh judgment.' },
        'nutritionist (n)': { m: 'أخصائي تغذية', d: 'An expert on food, diet, and how balanced eating impacts health and physical well-being.' },
        'processed food (n)': { m: 'طعام مصنّع / أطعمة معالجة', d: 'Commercial foods that have been altered with additives, preservatives, or chemical treatments from their natural state.' },
        'sedentary (adj)': { m: 'خامل / قليل الحركة', d: 'Characterized by much sitting, physical inactivity, and little regular exercise.' },
        'underestimated (adj)': { m: 'مُستهان به / مقلّل من قيمته', d: 'Not given enough credit, importance, or value relative to its true impact.' },
        'well-being (n)': { m: 'الرفاهية / الصحة الجسدية والنفسية', d: 'The comfortable, healthy, and emotionally fulfilled state of living.' }
    };
    (d.definitions || []).forEach(item => {
        if (defMap2[item.word]) {
            item.meaning = defMap2[item.word].m;
            item.definition = defMap2[item.word].d;
        }
    });
    fs.writeFileSync(s2u1p2_file, 'window.lessonData = ' + JSON.stringify(d, null, 4) + ';\n', 'utf8');
    console.log('✅ Updated Sec 2 U1 L1 Part 2 definitions');
}

// 4. Clean up Sec 2 Unit 4 Lesson 4-1, 4-2, 4-3, 4-4 definitions and synonyms
const s2u4_files = [
    'Sec_2/unit-4/lesson-4-1.data.js',
    'Sec_2/unit-4/lesson-4-2.data.js',
    'Sec_2/unit-4/lesson-4-3.data.js',
    'Sec_2/unit-4/lesson-4-4.data.js'
];

s2u4_files.forEach(f => {
    if (!fs.existsSync(f)) return;
    global.window = {};
    eval(fs.readFileSync(f, 'utf8'));
    const d = global.window.lessonData;
    
    // Clean definitions
    (d.definitions || []).forEach(df => {
        const pm = String(df.word || '').match(/^(.*?)\s*[\(\[]([\u0600-\u06FF\s\/\-\،\.\…]+)[\)\]]$/);
        if (pm) {
            df.word = pm[1].trim();
            if (!df.meaning) df.meaning = pm[2].trim();
        }
    });

    // Clean synonyms
    (d.synonyms || []).forEach(s => {
        const pm = String(s.word || '').match(/^(.*?)\s*[\(\[]([\u0600-\u06FF\s\/\-\،\.\…]+)[\)\]]$/);
        if (pm) {
            s.word = pm[1].trim();
            if (!s.meaning) s.meaning = pm[2].trim();
        }
    });

    // Clean antonyms
    (d.antonyms || []).forEach(a => {
        const pm = String(a.word || '').match(/^(.*?)\s*[\(\[]([\u0600-\u06FF\s\/\-\،\.\…]+)[\)\]]$/);
        if (pm) {
            a.word = pm[1].trim();
            if (!a.meaning) a.meaning = pm[2].trim();
        }
    });

    fs.writeFileSync(f, 'window.lessonData = ' + JSON.stringify(d, null, 4) + ';\n', 'utf8');
    console.log('✅ Cleaned up definitions and synonyms in:', f);
});
