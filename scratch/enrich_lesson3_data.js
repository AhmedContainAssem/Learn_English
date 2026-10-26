const fs = require('fs');

const dataFilePath = 'Prep_3/unit-2/lesson-3.data.js';
let content = fs.readFileSync(dataFilePath, 'utf8');

const synonyms = [
    {
        word: "silence",
        meaning: "صمت / سكوت",
        ar: "صمت / سكوت",
        synonym: "peace / quietness",
        synonyms: "peace / quietness",
        antonym: "noise",
        antonyms: "noise",
        arAnt: "ضوضاء - إزعاج"
    },
    {
        word: "strange",
        meaning: "غريب",
        ar: "غريب",
        synonym: "unusual / weird",
        synonyms: "unusual / weird",
        antonym: "usual / common",
        antonyms: "usual / common",
        arAnt: "عادي / شائع"
    },
    {
        word: "awkward",
        meaning: "مربك - غير ملائم",
        ar: "مربك - غير ملائم",
        synonym: "difficult / uncomfortable",
        synonyms: "difficult / uncomfortable",
        antonym: "pleasant / comfortable",
        antonyms: "pleasant / comfortable",
        arAnt: "مريح"
    },
    {
        word: "frustrated",
        meaning: "محبط",
        ar: "محبط",
        synonym: "disappointed",
        synonyms: "disappointed",
        antonym: "satisfied / delighted",
        antonyms: "satisfied / delighted",
        arAnt: "قانع - راضي"
    },
    {
        word: "distraction",
        meaning: "تشتت - عدم انتباه",
        ar: "تشتت - عدم انتباه",
        synonym: "disorder / confusion",
        synonyms: "disorder / confusion",
        antonym: "concentration / focus",
        antonyms: "concentration / focus",
        arAnt: "تركيز"
    },
    {
        word: "meaningful",
        meaning: "ذو معنى / معبر",
        ar: "ذو معنى / معبر",
        synonym: "useful / significant",
        synonyms: "useful / significant",
        antonym: "meaningless / insignificant",
        antonyms: "meaningless / insignificant",
        arAnt: "بلا معنى"
    },
    {
        word: "discipline",
        meaning: "انضباط",
        ar: "انضباط",
        synonym: "control / rule",
        synonyms: "control / rule",
        antonym: "chaos",
        antonyms: "chaos",
        arAnt: "فوضى"
    },
    {
        word: "embarrassing",
        meaning: "محرج",
        ar: "محرج",
        synonym: "uncomfortable",
        synonyms: "uncomfortable",
        antonym: "comfortable",
        antonyms: "comfortable",
        arAnt: "مريح"
    }
];

const affixes = [
    {
        affix: "re-",
        word: "re- (Prefix)",
        type: "Prefix",
        role: "تعطي معنى (مرة أخرى) (again)",
        examples: "reconnect (يعيد اتصال)"
    },
    {
        affix: "-ly",
        word: "-ly (Suffix)",
        type: "Suffix",
        role: "تُكوّن الظرف من الصفة",
        examples: "softly (نعومة / بلطف)، simply (ببساطة)، physically (جسدياً)"
    },
    {
        affix: "-ance",
        word: "-ance (Suffix)",
        type: "Suffix",
        role: "تُكوّن الاسم من الصفة",
        examples: "importance (أهمية)"
    }
];

const expressions = [
    { en: "seem frustrated", ar: "يبدو محبطاً" },
    { en: "act of communication", ar: "خطوة / عمل للتواصل" },
    { en: "feel awkward", ar: "يشعر أنه غريب / غير مرتاح" },
    { en: "pay attention", ar: "ينتبه" },
    { en: "too busy to talk", ar: "مشغول لدرجة لا يستطيع التحدث" },
    { en: "feel like", ar: "يشعر كما لو" },
    { en: "build a relationship", ar: "يبني علاقة" },
    { en: "try something different", ar: "يجرب شيئاً مختلفاً" }
];

const prepositions = [
    { en: "across from", ar: "أمام / مقابل / على الجانب الآخر من" },
    { en: "start of", ar: "بداية لـ" },
    { en: "filled with laughter", ar: "مليء بالضحك" },
    { en: "speak up", ar: "يرفع صوته / يتحدث بصوت عالٍ" },
    { en: "put down", ar: "ينزل - يضع جانباً" },
    { en: "kind of", ar: "نوع من" },
    { en: "instead of", ar: "بدلاً من" },
    { en: "argument over", ar: "جدال حول" },
    { en: "move to", ar: "ينتقل إلى" },
    { en: "push the food around", ar: "يدفع الطعام / يقلّب الطعام" }
];

const confusionNotes = [
    {
        titleEn: "1. used to + inf. (SB page 32)",
        titleAr: "عادات ومواقف كانت تحدث في الماضي ولم تعد موجودة الآن",
        items: [
            {
                term: "used to + inf.",
                meaning: "اعتاد أن يفعل كذا في الماضي",
                example: "• Omar and his parents used to laugh together at dinner.\n• I miss how we used to talk."
            }
        ]
    },
    {
        titleEn: "2. laugh (v) vs. laughter (n) (SB page 32)",
        titleAr: "الفرق بين الفعل والاسم غير المعدود",
        items: [
            {
                term: "laugh (v)",
                meaning: "يضحك / يسخر عند اقترانها بـ at",
                example: "• They laughed at his funny jokes.\n• Don't laugh at anyone, and be kind to others."
            },
            {
                term: "laughter (n)",
                meaning: "الضحك (اسم لا يُعد)",
                example: "• Their dinner slowly became filled with laughter again."
            }
        ]
    },
    {
        titleEn: "3. due to vs. because (SB page 32)",
        titleAr: "روابط السبب والنتيجة",
        items: [
            {
                term: "due to = because of + (noun) / (v + ing)",
                meaning: "بسبب (يتبعها اسم أو فعل مضاف له ing)",
                example: "▸ Due to the heavy rain, they cancelled the match."
            },
            {
                term: "because = as = since + جملة كاملة (فاعل + فعل)",
                meaning: "لأن (يتبعها جملة كاملة)",
                example: "▸ Because it rained heavily, they cancelled the match."
            }
        ]
    }
];

// Load existing data object cleanly
let sandbox = { window: {} };
const vm = require('vm');
vm.createContext(sandbox);
vm.runInContext(content, sandbox);

let lessonData = sandbox.window.lessonData;
lessonData.synonyms = synonyms;
lessonData.affixes = affixes;
lessonData.expressions = expressions;
lessonData.prepositions = prepositions;
lessonData.confusionNotes = confusionNotes;

const outputCode = `/**
 * Prep 3 - Unit 2 - Lesson 3 Data Payload
 * The Silent Dinner • Communication, Listening & Reconnecting
 * Decoupled data architecture adhering strictly to DRY & SoC.
 */

window.lessonData = ${JSON.stringify(lessonData, null, 4)};
window.quizData = window.lessonData;
`;

fs.writeFileSync(dataFilePath, outputCode, 'utf8');
console.log('Successfully updated lesson-3.data.js with complete data fidelity.');
