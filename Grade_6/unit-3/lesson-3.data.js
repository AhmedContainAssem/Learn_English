/**
 * Grade 6 - Unit 3: Community Builders
 * Lesson 3: The Proud Rose & Word Stress
 * Clean, decoupled pure data model for CurriculumRenderer
 */

window.lessonData = {
    id: "grade_6_u3_l3",
    stage: "Grade_6",
    unit: "unit-3",
    lesson: "lesson-3",
    title: "Lesson 3: Story: The Proud Rose & Word Stress",
    arabicTitle: "الدرس الثالث: قصة الوردة المغرورة ومختبر نبرة الكلمات",
    subtitle: "Mr. Ahmed Assem • Connect 6 (Term 1) • Unit 3: Community Builders",
    description: "مفردات القصة، القصة المصورة التفاعلية (StoryBook: البداية والوسط والخاتمة)، مختبر نبرات الكلمات والمقاطع الصوتية (Word Stress)، واختبار شامل",

    // 1. Key Vocabulary (مفردات القصة الأساسية)
    keyVocabulary: [
        {
            word: "proud / vain",
            translation: "مغرور / متكبر / فخور",
            pos: "adj",
            icon: "🦚",
            example: "The red rose was so proud of her beauty that she looked down on other plants.",
            exampleAr: "كانت الوردة الحمراء مغرورة جداً بجمالها لدرجة أنها احتقرت باقي النباتات."
        },
        {
            word: "cactus",
            translation: "نبات الصبار",
            pos: "noun",
            icon: "🌵",
            example: "The cactus has sharp thorns, but inside it stores precious cool water.",
            exampleAr: "يمتلك الصبار أشواكاً حادة، ولكنه يخزن بداخله ماءً عذباً نفيساً."
        },
        {
            word: "thorns",
            translation: "أشواك",
            pos: "noun",
            icon: "🌿",
            example: "The rose laughed at the ugly thorns covering the humble cactus.",
            exampleAr: "سخرت الوردة من الأشواك القبيحة التي تغطي نبات الصبار المتواضع."
        },
        {
            word: "scorching",
            translation: "شديد الحرارة / حارق",
            pos: "adj",
            icon: "☀️",
            example: "The scorching summer sun dried up the soil, and no rain fell.",
            exampleAr: "جففت شمس الصيف الحارقة التربة ولم تسقط أي أمطار."
        },
        {
            word: "wilt",
            translation: "يذبل / يتلاشى رونقه",
            pos: "verb",
            icon: "🥀",
            example: "Without water, the beautiful red petals began to wilt and curl.",
            exampleAr: "بدون ماء، بدأت بتلات الوردة الحمراء الجميلة تذبل وتنحني."
        },
        {
            word: "humble",
            translation: "متواضع",
            pos: "adj",
            icon: "🤲",
            example: "The humble cactus was always polite and never boasted about anything.",
            exampleAr: "كان الصبار المتواضع مهذباً دائماً ولم يتفاخر قط بأي شيء."
        },
        {
            word: "beak",
            translation: "منقار الطائر",
            pos: "noun",
            icon: "🐦",
            example: "Thirsty sparrows dipped their beaks into the cactus flesh to drink water drops.",
            exampleAr: "غمست العصافير العطشى مناقيرها في ساق الصبار لترتشف قطرات الماء."
        },
        {
            word: "ashamed",
            translation: "خجلان / نادم على فعلته",
            pos: "adj",
            icon: "😔",
            example: "The rose felt ashamed of her past words and asked the cactus for forgiveness.",
            exampleAr: "شعرت الوردة بالخجل من كلماتها السابقة وطلبت من الصبار الصفح والمغفرة."
        }
    ],

    // 2. Extra Lesson Vocabulary (المفردات التكميلية)
    lessonVocabulary: [
        { word: "pine tree", translation: "شجرة الصنوبر", pos: "noun", example: "The wise pine tree advised the rose not to be vain.", exampleAr: "نصحت شجرة الصنوبر الحكيمة الوردة بألا تكون متكبرة." },
        { word: "sparrow", translation: "عصفور دوري صغير", pos: "noun", example: "Little sparrows rested on the branches in the heat.", exampleAr: "استراحت العصافير الصغيرة على الأغصان هرباً من الحر." },
        { word: "petals", translation: "بتلات الزهرة", pos: "noun", example: "The red petals were soft and fragrant.", exampleAr: "كانت البتلات الحمراء ناعمة وعطرة." },
        { word: "appearance", translation: "المظهر الخارجي", pos: "noun", example: "Never judge someone solely by their appearance.", exampleAr: "إياك أن تحكم على شخص من مظهره الخارجي فقط." },
        { word: "drought", translation: "جفاف", pos: "noun", example: "The long summer drought tested all the desert plants.", exampleAr: "اختبر جفاف الصيف الطويل قدرة جميع نباتات الصحراء." },
        { word: "kindness", translation: "عطف وطيبة قلب", pos: "noun", example: "The cactus's kindness saved the dying rose.", exampleAr: "أنقذ عطف وطيبة الصبار حياة الوردة المشرفة على الهلاك." }
    ],

    // 3. Verbs (تصريف الأفعال)
    verbs: [
        { present: "wilt", past: "wilted", type: "regular", translation: "يذبل", example: "Flowers wilt without water." },
        { present: "mock / laugh at", past: "mocked / laughed at", type: "regular", translation: "يسخر من", example: "She mocked the cactus's thorns." },
        { present: "advise", past: "advised", type: "regular", translation: "ينصح", example: "The pine tree advised her kindly." },
        { present: "dip", past: "dipped", type: "regular", translation: "يغمس", example: "Birds dipped their beaks into water." },
        { present: "share", past: "shared", type: "regular", translation: "يشارك / يتقاسم", example: "The cactus shared his water." },
        { present: "grow", past: "grew", type: "irregular", translation: "ينمو / يكبر", example: "The red rose grew proud." },
        { present: "feel", past: "felt", type: "irregular", translation: "يشعر بـ", example: "The rose felt ashamed." },
        { present: "shine", past: "shone", type: "irregular", translation: "تشرق / تسطع", example: "The sun shone mercilessly." }
    ],

    // 4. Expressions & Story Morals (تعبيرات وحكمة القصة)
    expressions: [
        { phrase: "look down on", translation: "يحتقر / يستخف بـ", note: "The vain rose looked down on the prickly cactus." },
        { phrase: "dip their beaks", translation: "تغمس مناقيرها", note: "Birds dip their beaks to drink drops of moisture." },
        { phrase: "never judge by appearance", translation: "لا تحكم أبداً بالمظهر الخارجي", note: "The central moral lesson of the story." },
        { phrase: "in the scorching heat", translation: "في وطأة الحر القائظ", note: "Describes extreme desert summer temperatures." },
        { phrase: "a friend in need", translation: "صديق وقت الشدة", note: "The cactus proved to be a true friend in need." }
    ],

    // 5. Phonics Laboratory: Syllables and Word Stress (مختبر المقاطع ونبرة الكلمات)
    pronunciation: {
        title: "مختبر المقاطع الصوتية ونبرة الكلمة (Syllables & Word Stress)",
        description: "المقطع الصوتي (Syllable) هو وحدة نطق تحتوي على صوت متحرك واحد. أما نبرة الكلمة (Word Stress) فهي المقطع الذي ننطقه بصوت أقوى وأعلى وأطول:",
        oneSyllable: {
            title: "1-Syllable Words (كلمات ذات مقطع صوتي واحد)",
            note: "تنطق دفعة واحدة بنبرة كاملة:",
            words: [
                { word: "rose", phonetic: "/rəʊz/", translation: "وردة" },
                { word: "sun", phonetic: "/sʌn/", translation: "شمس" },
                { word: "plant", phonetic: "/plɑːnt/", translation: "نبات" },
                { word: "thorns", phonetic: "/θɔːnz/", translation: "أشواك" },
                { word: "beak", phonetic: "/biːk/", translation: "منقار" },
                { word: "leaf", phonetic: "/liːf/", translation: "ورقة شجر" }
            ]
        },
        twoSyllablesFirst: {
            title: "2-Syllable Words: Stress on 1st Syllable (نبر المقطع الأول)",
            note: "معظم الأسماء والصفات المكونة من مقطعين تكون النبرة على المقطع الأول (Capitalized):",
            words: [
                { word: "CAC-tus", phonetic: "/ˈkæk.təs/", translation: "صبار", stressPart: "CAC" },
                { word: "GAR-den", phonetic: "/ˈɡɑː.dən/", translation: "حديقة", stressPart: "GAR" },
                { word: "SUM-mer", phonetic: "/ˈsʌm.ər/", translation: "فصل الصيف", stressPart: "SUM" },
                { word: "BEAU-ty", phonetic: "/ˈbjuː.ti/", translation: "جمال", stressPart: "BEAU" },
                { word: "SPAR-row", phonetic: "/ˈspær.əʊ/", translation: "عصفور دوري", stressPart: "SPAR" },
                { word: "HUM-ble", phonetic: "/ˈhʌm.bəl/", translation: "متواضع", stressPart: "HUM" }
            ]
        },
        twoSyllablesSecond: {
            title: "2-Syllable Words: Stress on 2nd Syllable (نبر المقطع الثاني)",
            note: "معظم الأفعال المكونة من مقطعين تكون النبرة على المقطع الثاني:",
            words: [
                { word: "pro-TECT", phonetic: "/prəˈtekt/", translation: "يحمي", stressPart: "TECT" },
                { word: "be-GIN", phonetic: "/bɪˈɡɪn/", translation: "يبدأ", stressPart: "GIN" },
                { word: "a-GREE", phonetic: "/əˈɡriː/", translation: "يوافق", stressPart: "GREE" },
                { word: "a-SHAMED", phonetic: "/əˈʃeɪmd/", translation: "خجلان", stressPart: "SHAMED" },
                { word: "ad-VISE", phonetic: "/ədˈvaɪz/", translation: "ينصح", stressPart: "VISE" }
            ]
        },
        threeSyllables: {
            title: "3-Syllable Words (كلمات ثلاثية المقاطع)",
            note: "تتكون من ثلاثة مقاطع مع نبرة محددة:",
            words: [
                { word: "BEAU-ti-ful", phonetic: "/ˈbjuː.tɪ.fəl/", translation: "جميل (نبر المقطع 1)", stressPart: "BEAU" },
                { word: "im-POR-tant", phonetic: "/ɪmˈpɔː.tənt/", translation: "مهم (نبر المقطع 2)", stressPart: "POR" },
                { word: "pa-ra-ME-dic", phonetic: "/ˌpær.əˈmed.ɪk/", translation: "مسعف (نبر المقطع 3)", stressPart: "ME" },
                { word: "AR-chi-tect", phonetic: "/ˈɑː.kɪ.tekt/", translation: "مهندس معماري (نبر المقطع 1)", stressPart: "AR" }
            ]
        }
    },

    // 6. Interactive 3D StoryBook (قصة الوردة المغرورة في 3 مشاهد)
    storyPages: [
        {
            titleEn: "Part 1: The Beginning - A Vain Red Rose",
            titleAr: "الجزء الأول: البداية - الوردة الحمراء المغرورة",
            textEn: "In a quiet desert garden, a magnificent red rose blossomed. Her petals were silky red, and all the nearby creatures praised her dazzling beauty. But the rose grew haughty and vain. She turned her nose up at the prickly cactus growing quietly next to her. 'Look at that thorny, ugly plant!' she mocked. The wise old pine tree warned her: 'Do not be boastful, little rose. True value lies within, not in outward appearance.'",
            translation: "في حديقة صحراوية هادئة، تفتحت وردة حمراء بديعة. كانت بتلاتها حريرية الملمس، وامتدحت جميع الكائنات جمالها الأخاذ. غير أن الوردة استبد بها الغرور والتعالي، فازدرت نبات الصبار الشوكي النامي بهدوء بجوارها وقالت ساخرة: 'انظروا إلى ذلك النبات القبيح المليء بالأشواك!' فحذرتها شجرة الصنوبر الحكيمة: 'إياكِ والتفاخر يا وردتي، فالقيمة الحقيقية تكمن في الجوهر لا في المظهر الخارجي.'",
            image: "../../assets/images/grade_6/unit_3/proud_rose_ai.webp",
            caption: "The proud rose boasting of her beauty while mocking the prickly cactus.",
            vocabHighlights: ["proud", "cactus", "thorns", "appearance"]
        },
        {
            titleEn: "Part 2: The Middle - The Scorching Summer Drought",
            titleAr: "الجزء الثاني: الوسط - جفاف الصيف الحارق",
            textEn: "As high summer arrived, rain ceased and the desert garden baked under a scorching sun. The springs dried out, and the soil cracked with thirst. Day by day, the rose lost her freshness. Her vibrant red petals wilted, turning brown and brittle. She felt her life slipping away in the unbearable heat, while the green cactus beside her remained firm, fresh, and full of life.",
            translation: "ومع حلول ذروة فصل الصيف، انقطعت الأمطار وشوت شمس الصحراء الحارقة أرجاء الحديقة. جفت الينابيع وتشققت الأرض عطشاً، وفقدت الوردة نضارتها يوماً بعد يوم؛ فذبلت بتلاتها الحمراء وتحولت إلى اللون البني الجاف. شعرت الوردة بأن حياتها توشك على الانتهاء تحت وطأة الحر القائظ، بينما ظل الصبار الأخضر بجوارها صامداً نضراً ومفعماً بالحياة.",
            image: "../../assets/images/grade_6/unit_3/proud_rose_ai.webp",
            caption: "The rose withering under the scorching summer sun during the drought.",
            vocabHighlights: ["scorching", "drought", "wilt", "petals"]
        },
        {
            titleEn: "Part 3: The End - A Lifesaving Act of Kindness",
            titleAr: "الجزء الثالث: النهاية - صنيع عطف أنقذ الحياة",
            textEn: "Weak and trembling, the rose noticed small sparrows dipping their beaks into the cactus's fleshy stems, drinking stored droplets of cool water. Feeling deeply ashamed of her arrogance, the dying rose asked the cactus softly: 'Could you please spare a drop of water for me?' The noble cactus did not hesitate. He generously shared his water, quenching the rose's thirst until she bloomed again. From that day on, the rose never mocked anyone, learning that kindness is the true meaning of beauty.",
            translation: "وبينما كانت الوردة واهنة ترتجف، لاحظت عصافير صغيرة تغمس مناقيرها في ساق الصبار الممتلئة، لترتشف قطرات ماء عذب مخزون. ولما شعرت بخجل عميق من غرورها السابق، همست الوردة المشرفة على الموت للصبار برجاء: 'هل يمكن أن تجود عليّ بقطرة ماء؟' فلم يتردد الصبار النبيل قط، بل تقاسم ماءه بكل كرم، مروياً ظمأ الوردة حتى أزهرت من جديد. ومنذ ذلك اليوم، لم تسخر الوردة من أحد أبداً، بعدما أدركت أن العطف هو الجمال الحقيقي.",
            image: "../../assets/images/grade_6/unit_3/proud_rose_ai.webp",
            caption: "The humble cactus generously sharing stored water to save the repentant rose.",
            vocabHighlights: ["beak", "ashamed", "humble", "never judge by appearance"]
        }
    ],

    // 7. Comprehensive Mastery Quiz (اختبار شامل 12 سؤال مأخوذ من تدريبات المعاصر)
    quiz: [
        {
            question: "Why was the red rose boastful and proud at the beginning?",
            options: ["Because she had thorns", "Because she was very beautiful", "Because she could fly", "Because she lived in the ocean"],
            correct: 1,
            explanation: "كانت الوردة مغرورة بسبب جمال مظهرها ولون بتلاتها الأخاذ."
        },
        {
            question: "The rose laughed at the cactus because of its __________.",
            options: ["sweet fruits", "ugly thorns", "red roses", "yellow feathers"],
            correct: 1,
            explanation: "سخرت الوردة من الصبار بسبب أشواكه (thorns)."
        },
        {
            question: "What happened to the desert garden during summer?",
            options: ["It snowed heavily", "It rained for three weeks", "The sun was scorching and rain stopped", "A river flooded the trees"],
            correct: 2,
            explanation: "في الصيف اشتدت حرارة الشمس الحارقة (scorching sun) وجفت المياه."
        },
        {
            question: "Without water, the rose's petals began to __________.",
            options: ["sing", "wilt", "fly", "jump"],
            correct: 1,
            explanation: "بدأت البتلات تذبل وتجف (wilt) لغياب الماء."
        },
        {
            question: "The rose saw sparrows dipping their __________ into the cactus to drink.",
            options: ["tails", "wings", "beaks", "feet"],
            correct: 2,
            explanation: "كانت العصافير تغمس مناقيرها (beaks) لترتشف قطرات الماء."
        },
        {
            question: "How did the rose feel when she asked the cactus for help?",
            options: ["Proud", "Ashamed", "Angry", "Bored"],
            correct: 1,
            explanation: "شعرت الوردة بالخجل والندم (ashamed) على كلامها السيئ في الماضي."
        },
        {
            question: "The cactus was very __________ and shared his stored water immediately.",
            options: ["cruel", "selfish", "kind and generous", "lazy"],
            correct: 2,
            explanation: "كان الصبار طيباً وكريماً (kind and generous) وأنقذ حياة الوردة."
        },
        {
            question: "What is the moral of 'The Proud Rose' story?",
            options: ["Thorns are better than flowers", "Never judge anyone by their appearance", "Summer is cold", "Cactus cannot drink water"],
            correct: 1,
            explanation: "حكمة القصة: إياك أن تحكم على أحد من مظهره الخارجي (Never judge anyone by appearance)."
        },
        {
            question: "How many syllables does the word 'cac-tus' have?",
            options: ["1 syllable", "2 syllables", "3 syllables", "4 syllables"],
            correct: 1,
            explanation: "كلمة 'cac-tus' تتكون من مقطعين صوتيين (2 syllables)."
        },
        {
            question: "Where is the stress in the noun 'GAR-den'?",
            options: ["On the 1st syllable", "On the 2nd syllable", "On the 3rd syllable", "There is no stress"],
            correct: 0,
            explanation: "في الأسماء الثنائية المقاطع مثل 'garden'، تقع النبرة على المقطع الأول (GAR-den)."
        },
        {
            question: "Where is the stress in the verb 'pro-TECT'?",
            options: ["On the 1st syllable", "On the 2nd syllable", "On the 3rd syllable", "At the very end only"],
            correct: 1,
            explanation: "في الأفعال الثنائية المقاطع مثل 'pro-tect'، تقع النبرة على المقطع الثاني (pro-TECT)."
        },
        {
            question: "Which of the following is a 3-syllable word?",
            options: ["rose", "cactus", "beautiful", "sun"],
            correct: 2,
            explanation: "كلمة 'beau-ti-ful' تتكون من ثلاثة مقاطع (3 syllables)."
        }
    ]
};
