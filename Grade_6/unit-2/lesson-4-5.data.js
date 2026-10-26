/**
 * Grade 6 - Unit 2: Our Nature
 * Lessons 4 & 5: Unforgettable Trip to Wadi El Rayan & Think and Create
 * Clean, decoupled data model for CurriculumRenderer, StoryEngine, WritingLab, and QuizEngine
 */

window.lessonData = {
    id: "grade_6_u2_l45",
    stage: "Grade_6",
    unit: "unit-2",
    lesson: "lesson-4-5",
    title: "Lessons 4 & 5: Unforgettable Trip to Wadi El Rayan & Think and Create",
    arabicTitle: "الدرسان 4 و5: رحلة لا تُنسى إلى وادي الريان، مهارات الكتابة، وبطاقة الحياة البرية",
    subtitle: "Mr. Ahmed Assem • Connect 6 (Term 1) • Unit 2: Our Nature",
    description: "مفردات الطبيعة والمحميات، الأفعال، التعبيرات، قصة وادي الريان ووادي الحيتان المصورة (StoryBook)، مهارات كتابة القصة، واختبار شامل 🎯",

    // 1. Key Vocabulary (المفردات الأساسية)
    keyVocabulary: [
        {
            word: "lake",
            translation: "بحيرة",
            pos: "noun",
            icon: "🏞️",
            example: "Wadi El Rayan is famous for its large natural lakes.",
            exampleAr: "يشتهر وادي الريان ببحيراته الطبيعية الكبرى."
        },
        {
            word: "fossils",
            translation: "حفريات / بقايا كائنات قديمة",
            pos: "noun",
            icon: "🦴",
            example: "Scientists discovered prehistoric whale fossils in the desert.",
            exampleAr: "اكتشف العلماء حفريات حيتان ما قبل التاريخ في الصحراء."
        },
        {
            word: "skeleton",
            translation: "هيكل عظمي",
            pos: "noun",
            icon: "💀",
            example: "We saw the intact skeleton of an ancient giant whale.",
            exampleAr: "شاهدنا الهيكل العظمي الكامل لحوت عملاق قديم."
        },
        {
            word: "waterfall",
            translation: "شلال مياه",
            pos: "noun",
            icon: "🌊",
            example: "The waterfalls in Wadi El Rayan are the only waterfalls in Egypt.",
            exampleAr: "شلالات وادي الريان هي الشلالات الوحيدة في مصر."
        },
        {
            word: "sand dunes",
            translation: "كثبان رملية",
            pos: "noun",
            icon: "🏜️",
            example: "There are golden sand dunes surrounding the lakes.",
            exampleAr: "توجد كثبان رملية ذهبية تحيط بالبحيرات."
        },
        {
            word: "guide",
            translation: "مرشد سياحي",
            pos: "noun",
            icon: "🧭",
            example: "Mr. Tarek was a helpful guide who showed us the park.",
            exampleAr: "كان الأستاذ طارق مرشداً متعاوناً أطلعنا على معالم المحمية."
        },
        {
            word: "history",
            translation: "تاريخ",
            pos: "noun",
            icon: "📜",
            example: "The area has a fascinating geological history of millions of years.",
            exampleAr: "تمتلك المنطقة تاريخاً جيولوجياً مذهلاً يمتد لملايين السنين."
        },
        {
            word: "rare",
            translation: "نادر",
            pos: "adj",
            icon: "⭐",
            example: "The national park protects many rare animals and desert plants.",
            exampleAr: "تحمي المحمية الوطنية العديد من الحيوانات النادرة والنباتات الصحراوية."
        },
        {
            word: "tucked",
            translation: "مخبأ / مدسوس بعناية",
            pos: "adj",
            icon: "📦",
            example: "The camera was found safely tucked under the wooden bench.",
            exampleAr: "عُثر على الكاميرا بأمان مدسوسة تحت المقعد الخشبي."
        },
        {
            word: "exhibit",
            translation: "معرض / معروضات",
            pos: "noun",
            icon: "🏛️",
            example: "Visitors enjoyed the informative fossil exhibit at the museum.",
            exampleAr: "استمتع الزوار بمعرض الحفريات التعليمي في المتحف."
        }
    ],

    // 2. Extra Vocabulary (المفردات التكميلية)
    lessonVocabulary: [
        { word: "national park", translation: "محمية طبيعية وطنية", pos: "noun", example: "Wadi El Rayan is a protected national park in Fayoum.", exampleAr: "وادي الريان محمية طبيعية وطنية في الفيوم." },
        { word: "thankfully", translation: "لحسن الحظ / حمداً لله", pos: "adv", example: "Thankfully, our teacher found the lost camera.", exampleAr: "لحسن الحظ، وجد معلمنا الكاميرا المفقودة." },
        { word: "wildlife", translation: "الحياة البرية", pos: "noun", example: "The desert reserve protects diverse Egyptian wildlife.", exampleAr: "تحمي المحمية الصحراوية الحياة البرية المصرية المتنوعة." },
        { word: "Wadi El-Hitan", translation: "وادي الحيتان (Valley of the Whales)", pos: "noun", example: "Wadi El-Hitan is a UNESCO World Heritage site in Egypt.", exampleAr: "وادي الحيتان أحد مواقع التراث العالمي لليونسكو في مصر." },
        { word: "bones", translation: "عظام", pos: "noun", example: "Ancient whale bones were preserved perfectly in the sand.", exampleAr: "حُفظت عظام الحيتان القديمة بصورة ممتازة في الرمال." },
        { word: "fossil museum", translation: "متحف الحفريات ومناخ ما قبل التاريخ", pos: "noun", example: "The fossil museum displays real skeletons from millions of years ago.", exampleAr: "يعرض متحف الحفريات هياكل حقيقية تعود لملايين السنين." },
        { word: "wooden", translation: "خشبي / مصنوع من الخشب", pos: "adj", example: "We sat on a wooden bench to rest in the shade.", exampleAr: "جلسنا على مقعد خشبي للاستراحة في الظل." },
        { word: "bench", translation: "مقعد طويل / دكة", pos: "noun", example: "There are comfortable benches outside the museum exhibit.", exampleAr: "توجد مقاعد مريحة خارج معرض المتحف." },
        { word: "snapshot", translation: "لقطة / صورة سريعة / بطاقة موجزة", pos: "noun", example: "Take a photographic snapshot of the desert sunset.", exampleAr: "التقط صورة فوتوغرافية لغروب الشمس في الصحراء." }
    ],

    // 3. Conjugation of Verbs (تصريف الأفعال)
    verbs: [
        { word: "organize", past: "organized", pp: "organized", meaning: "ينظم / يُرتب", type: "regular" },
        { word: "name", past: "named", pp: "named", meaning: "يُسمي / يدعو", type: "regular" },
        { word: "explain", past: "explained", pp: "explained", meaning: "يشرح / يفسر", type: "regular" },
        { word: "cover", past: "covered", pp: "covered", meaning: "يغطي / يشمل", type: "regular" },
        { word: "realize", past: "realized", pp: "realized", meaning: "يدرك / يفهم", type: "regular" },
        { word: "leave", past: "left", pp: "left", meaning: "يغادر / يترك", type: "irregular" },
        { word: "ride", past: "rode", pp: "ridden", meaning: "يركب", type: "irregular" },
        { word: "come", past: "came", pp: "come", meaning: "يأتي / يحضر", type: "irregular" }
    ],

    // 4. Expressions & Prepositions (تعبيرات وحروف الجر الهامة)
    collocations: [
        {
            phrase: "unforgettable trip",
            meaning: "رحلة لا تُنسى ومميزة",
            example: "Our school trip to Wadi El Rayan was an unforgettable trip."
        },
        {
            phrase: "in the distance",
            meaning: "في الأفق / من مكان بعيد",
            example: "We could see golden sand dunes and camels in the distance."
        },
        {
            phrase: "with no luck",
            meaning: "دون جدوى / دون أن يحالفه التوفيق",
            example: "I searched everywhere for my bag with no luck."
        },
        {
            phrase: "covered by",
            meaning: "مغطى بـ / كان مغموراً بـ",
            example: "Millions of years ago, this valley was covered by a deep sea."
        },
        {
            phrase: "ride the bus",
            meaning: "يركب الحافلة",
            example: "We rode the bus for two hours to reach Fayoum."
        },
        {
            phrase: "full of nature and history",
            meaning: "حافل بالطبيعة والتاريخ",
            example: "The trip was full of nature, history, and fun with friends."
        }
    ],

    // 5. Reading & Writing Skills Laboratory (معمل مهارات القراءة والكتابة)
    writingSkills: {
        skimming: {
            title: "📖 مهارة التصفح السريع للنصوص (Skimming Skill)",
            definition: "Skimming a text means reading quickly to get the main idea without reading every single word.",
            arabicDefinition: "تصفح النص يعني القراءة السريعة للحصول على الفكرة العامة والرئيسية، والتركيز على العناوين والبدايات لفهم ما يدور حوله الموضوع في الغالب."
        },
        storyWritingSteps: [
            { step: "1. Tell when and where", rule: "قم بذكر الزمان والمكان اللذين وقعت فيهما القصة (e.g., Last Thursday, in Fayoum).", icon: "📍" },
            { step: "2. Say who is in the story", rule: "اذكر الشخصيات (المعلمون، الأصدقاء، المرشد السياحي) (e.g., Miss Salma, Mr. Ahmed).", icon: "👥" },
            { step: "3. Use sequence words", rule: "استخدم كلمات التسلسل الزمني لترتيب الأحداث: first, next, after lunch, finally.", icon: "⏳" },
            { step: "4. Include a problem and solution", rule: "أضف عقدة أو مشكلة وحلها (e.g., losing the camera and finding it tucked under the bench).", icon: "💡" },
            { step: "5. Use Past Simple tense", rule: "استخدم زمن الماضي البسيط لسرد الأحداث المكتملة (organized, rode, saw, explained).", icon: "⚡" },
            { step: "6. Finish with a wrap-up ending", rule: "أنهِ القصة بخاتمة تلخص المشاعر والانطباع العام (It was an unforgettable trip full of fun).", icon: "🌟" }
        ],
        wildlifeSnapshotProject: {
            title: "🦎 مشروع: بطاقة حقائق الحياة البرية المصرية (My Egyptian Wildlife Snapshot)",
            steps: [
                "1. Choose one animal (e.g., Camel, Nile Crocodile, Fennec Fox, Heron).",
                "2. Find or draw a picture of the animal.",
                "3. Write 3 easy facts: Where does it live? What's the weather like? What does it eat / Is it dangerous?",
                "4. Make your card, color it, and share it with your classmates."
            ]
        }
    },

    // 6. Interactive StoryBook: Unforgettable Trip to Wadi El Rayan (القصة المصورة التفاعلية)
    storyPages: [
        {
            titleEn: "Scene 1: Bus Ride through Dunes to Fayoum",
            titleAr: "المشهد الأول: ركوب الحافلة عبر الكثبان الرملية إلى الفيوم",
            textEn: "Last Thursday, our school organized an exciting trip to Wadi El Rayan National Park in Fayoum. Our class teacher, Miss Salma, and science teacher, Mr. Ahmed, came with us. We left school very early in the morning and rode the comfortable bus for two hours. On the way through the Western Desert, we saw green farms, golden sand dunes, and camels walking gracefully in the distance.",
            translation: "في يوم الخميس الماضي، نظمت مدرستنا رحلة مشوقة إلى محمية وادي الريان الوطنية بالفيوم. رافقتنا معلمة الفصل الأستاذة سلمى، ومعلم العلوم الأستاذ أحمد. غادرنا المدرسة في الصباح الباكر وركبنا الحافلة المريحة لمدة ساعتين. وفي طريقنا عبر الصحراء الغربية، شاهدنا المزارع الخضراء والكثبان الرملية الذهبية، وجمالاً تمشي برشاقة في الأفق البعيد.",
            image: "../../assets/images/grade_6/unit_2/wadi_el_rayan.webp",
            caption: "The students embarking on their desert adventure through golden sand dunes.",
            vocabHighlights: ["organized", "Wadi El Rayan", "National Park", "sand dunes", "in the distance", "camels"]
        },
        {
            titleEn: "Scene 2: Waterfalls, Lakes & Rare Nature",
            titleAr: "المشهد الثاني: شلالات المياه المتدفقة والبحيرات والطبيعة النادرة",
            textEn: "When we arrived at the park, a kind and knowledgeable guide named Mr. Tarek welcomed us with a warm smile. He showed us the magnificent blue lakes, the splashing waterfalls, and the tall green palm trees. Mr. Tarek explained that Wadi El Rayan is not only famous for its breathtaking natural beauty, but it also strictly protects rare desert animals and endangered wild plants.",
            translation: "عندما وصلنا إلى المحمية، استقبلنا مرشد ودود وخبير يُدعى الأستاذ طارق بابتسامة ترحيبية. أطلعنا على البحيرات الزرقاء الرائعة، والشلالات المتدفقة، وأشجار النخيل الخضراء الباسقة. وشرح لنا الأستاذ طارق أن وادي الريان لا يشتهر بجماله الطبيعي الأخاذ فحسب، بل إنه يحمي أيضاً الحيوانات الصحراوية النادرة والنباتات البرية المعرضة للانقراض.",
            image: "../../assets/images/grade_6/unit_2/wadi_el_rayan.webp",
            caption: "The majestic cascading waterfalls of Wadi El Rayan surrounded by desert cliffs.",
            vocabHighlights: ["guide", "waterfalls", "lakes", "palm trees", "protects", "rare animals"]
        },
        {
            titleEn: "Scene 3: Valley of the Whales (Wadi El-Hitan)",
            titleAr: "المشهد الثالث: وادي الحيتان وعظام الحفريات العملاقة",
            textEn: "After enjoying our lunch by the water, we took another short ride deeper into the desert to Wadi El-Hitan—the world-famous Valley of the Whales. Millions of years ago, this entire vast desert was covered by a warm, deep sea! Scientists discovered huge skeletons of ancient whales preserved in the sand. We were amazed to see real whale bones and an incredible fossil museum tucked between the dunes.",
            translation: "وبعد الاستمتاع بوجبة الغداء قرب الماء، قمنا برحلة قصيرة أخرى في عمق الصحراء إلى وادي الحيتان المشهور عالمياً. فقبل ملايين السنين، كان هذا الوادي الصحراوي الشاسع مغطى ببحر دافئ وعميق! وقد اكتشف العلماء هياكل عظمية ضخمة لحيتان قديمة محفوظة في الرمال، وذهلنا لرؤية عظام الحيتان الحقيقية ومتحف الحفريات المدهش وسط الكثبان.",
            image: "../../assets/images/grade_6/unit_2/wadi_el_hitan_fossils.webp",
            caption: "Complete prehistoric whale skeleton fossils preserved in the golden desert sand.",
            vocabHighlights: ["Wadi El-Hitan", "Valley of the Whales", "covered by sea", "skeletons", "whale bones", "fossil museum"]
        },
        {
            titleEn: "Scene 4: The Lost Camera Adventure & Safe Return",
            titleAr: "المشهد الرابع: مغامرة الكاميرا المفقودة والعودة السعيدة",
            textEn: "I eagerly wanted to take a picture of the prehistoric whale skeleton with my camera when I suddenly realized it was missing! I searched everywhere in panic with no luck. Thankfully, our kind teacher Mr. Ahmed found it safely tucked under a wooden bench outside the exhibit just before the bus left. We returned home singing, knowing our trip was full of nature, ancient history, and unforgettable memories.",
            translation: "أردت بشغف التقاط صورة للهيكل العظمي للحوت بكاميرتي عندما أدركت فجأة أنها مفقودة! بحثت في كل مكان بقلق ودون جدوى، ولكن لحسن الحظ، وجدها معلمنا اللطيف الأستاذ أحمد مدسوسة بأمان تحت مقعد خشبي خارج المعرض قبل مغادرة الحافلة مباشرة. وعدنا جميعاً إلى منازلنا مسرورين برحلة حافلة بالطبيعة والتاريخ القديم والذكريات التي لا تُنسى.",
            image: "../../assets/images/grade_6/unit_2/wadi_el_hitan_fossils.webp",
            caption: "The lost camera safely recovered, wrapping up an unforgettable school adventure.",
            vocabHighlights: ["realized", "with no luck", "thankfully", "tucked", "wooden bench", "exhibit", "unforgettable trip"]
        }
    ],

    // 7. Comprehensive Mastery Quiz (14 سؤالاً شاملاً مأخوذاً من تدريبات المعاصر ص 90، 94، 95)
    quiz: [
        {
            question: "Last Thursday, our school __________ a trip to Wadi El Rayan National Park.",
            options: ["organized", "destroyed", "kept", "forgot"],
            correct: 0,
            explanation: "نظمت مدرستنا رحلة: الفعل هو (organized a trip)."
        },
        {
            question: "Wadi El Rayan is famous for its natural places like __________.",
            options: ["waterfalls", "dams", "canals", "airports"],
            correct: 0,
            explanation: "يشتهر وادي الريان بوجود الشلالات الطبيعية (waterfalls) والبحيرات."
        },
        {
            question: "There are a lot of golden __________ in the Western Desert.",
            options: ["sand dunes", "whales", "notebooks", "swimming pools"],
            correct: 0,
            explanation: "توجد كثبان رملية كثيرة (sand dunes) في الصحراء الغربية."
        },
        {
            question: "The kind __________ showed us the famous lakes and waterfalls.",
            options: ["guide", "photographer", "actor", "mechanic"],
            correct: 0,
            explanation: "المرشد السياحي (guide) أطلعنا على معالم المحمية."
        },
        {
            question: "This is a __________ kind of bird, so we don't see it very often.",
            options: ["rare", "common", "noisy", "usual"],
            correct: 0,
            explanation: "طائر نادر (rare) لا نراه كثيراً."
        },
        {
            question: "We saw skeletons and bones of ancient whales in the __________ museum.",
            options: ["fossil", "toy", "clothing", "car"],
            correct: 0,
            explanation: "في متحف الحفريات (fossil museum) شاهدنا هياكل الحيتان القديمة."
        },
        {
            question: "Millions of years ago, Wadi El-Hitan was __________ sea.",
            options: ["covered by", "built of", "picked by", "broken by"],
            correct: 0,
            explanation: "كان وادي الحيتان مغطى بالبحر (covered by sea)."
        },
        {
            question: "My lost camera was found __________ under a wooden bench.",
            options: ["tucked", "painted", "old", "dangerous"],
            correct: 0,
            explanation: "وُجدت الكاميرا مدسوسة أو مخبأة (tucked) تحت المقعد الخشبي."
        },
        {
            question: "There are comfortable wooden __________ in the park for visitors to sit on.",
            options: ["benches", "gates", "skeletons", "dunes"],
            correct: 0,
            explanation: "مقاعد خشبية للجلوس عليها: (benches)."
        },
        {
            question: "The word 'unforgettable' means something that we __________.",
            options: ["can't forget", "can't remember", "can't see", "can't eat"],
            correct: 0,
            explanation: "كلمة unforgettable تعني شيئاً مميزاً لا يمكن نسيانه (can't forget)."
        },
        {
            question: "Scientists found ancient whale __________ preserved in the sand.",
            options: ["skeletons", "pens", "hats", "boots"],
            correct: 0,
            explanation: "عثر العلماء على هياكل عظمية (skeletons) لحيتان قديمة."
        },
        {
            question: "Ali is __________ to fix his broken bicycle right now.",
            options: ["trying", "tries", "tried", "try"],
            correct: 0,
            explanation: "في زمن المضارع المستمر: Ali is + verb-ing (trying)."
        },
        {
            question: "Why are the boys __________ so loudly?",
            options: ["shouting", "shout", "shouted", "shouts"],
            correct: 0,
            explanation: "بعد are الفاعل يحتاج الفعل إلى ing: (are the boys shouting)."
        },
        {
            question: "'Skimming' a text means reading __________ to get the main idea.",
            options: ["quickly", "very slowly", "loudly", "angrily"],
            correct: 0,
            explanation: "تصفح النص (skimming) يعني القراءة السريعة (reading quickly) للوصول للفكرة الرئيسية."
        }
    ]
};
