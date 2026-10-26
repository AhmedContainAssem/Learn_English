/**
 * Grade 6 • Unit 1 • Lesson 3 Data Payload
 * Lesson: Around Egypt • Phonetics & Life in Egyptian Villages
 * Pure Decoupled Architectural Data - Zero Inline Hardcoding
 */

window.lessonData = {
    id: "g6-u1-l3",
    stage: "Grade_6",
    unit: "Unit 1",
    lesson: "Lesson 3",
    title: "Lesson 3: Around Egypt • Phonetics & Life in Egyptian Villages",
    description: "استكشف تفاصيل الحياة اليومية في قرى مصر المتنوعة، وحرف الصيد والنسيج وغزل الصوف، مع معمل الصوتيات الممتع لنطق صوت /er/ واختبار تفاعلي شامل!",

    // 1. Key Vocabulary
    keyVocabulary: [
        {
            word: "responsibilities",
            phonetic: "/rɪˌspɒnsəˈbɪlətiz/",
            partOfSpeech: "noun (pl.)",
            arabic: "مسئوليات",
            example: "Students describe their daily work and responsibilities in their villages."
        },
        {
            word: "repair",
            phonetic: "/rɪˈpeər/",
            partOfSpeech: "verb",
            arabic: "يصلح",
            example: "The fishermen work hard to repair their boats and wooden tools."
        },
        {
            word: "dye",
            phonetic: "/daɪ/",
            partOfSpeech: "verb / noun",
            arabic: "يصبغ / صبغة",
            example: "We dye wool with special natural colors before weaving carpets."
        },
        {
            word: "loom",
            phonetic: "/luːm/",
            partOfSpeech: "noun",
            arabic: "نول (لنسج القماش والسجاد)",
            example: "Hassan's family weaves wool into beautiful rugs on traditional looms."
        },
        {
            word: "fishermen",
            phonetic: "/ˈfɪʃəmən/",
            partOfSpeech: "noun (pl.)",
            arabic: "صيادين",
            example: "Many people in Ezbet El Borg are skilled fishermen who catch fresh fish."
        },
        {
            word: "accompany",
            phonetic: "/əˈkʌmpəni/",
            partOfSpeech: "verb",
            arabic: "يصطحب / يرافق",
            example: "Amina accompanies her father early in the morning to catch fish."
        },
        {
            word: "fishing net",
            phonetic: "/ˈfɪʃɪŋ net/",
            partOfSpeech: "noun",
            arabic: "شبكة صيد",
            example: "Omar helps his uncle clean and mend the fishing net."
        },
        {
            word: "harvest",
            phonetic: "/ˈhɑːvɪst/",
            partOfSpeech: "verb / noun",
            arabic: "يحصد (المحاصيل)",
            example: "Salma's family waters the vegetables and harvests the fresh crops."
        },
        {
            word: "spin",
            phonetic: "/spɪn/",
            partOfSpeech: "verb",
            arabic: "يغزل (الصوف أو القطن)",
            example: "Artisans spin soft sheep wool into strong threads for carpets."
        },
        {
            word: "village",
            phonetic: "/ˈvɪlɪdʒ/",
            partOfSpeech: "noun",
            arabic: "قرية",
            example: "Bashandi is a peaceful village located in the Dakhla Oasis."
        }
    ],

    // 2. Extra Vocabulary
    lessonVocabulary: [
        {
            word: "villager",
            phonetic: "/ˈvɪlɪdʒər/",
            partOfSpeech: "noun",
            arabic: "قروي / ساكن القرية",
            example: "Some villagers work in local factories or grow organic crops."
        },
        {
            word: "wooden",
            phonetic: "/ˈwʊdn/",
            partOfSpeech: "adjective",
            arabic: "خشبي / مصنوع من الخشب",
            example: "Fishermen cross the calm lake in small wooden boats."
        },
        {
            word: "factory",
            phonetic: "/ˈfæktri/",
            partOfSpeech: "noun",
            arabic: "مصنع",
            example: "Canned fish is prepared inside a modern food factory."
        },
        {
            word: "breeze",
            phonetic: "/briːz/",
            partOfSpeech: "noun",
            arabic: "نسيم (رياح خفيفة لطيفة)",
            example: "We sit near the Mediterranean shore and enjoy the cool sea breeze."
        },
        {
            word: "crafts",
            phonetic: "/krɑːfts/",
            partOfSpeech: "noun (pl.)",
            arabic: "أعمال يدوية / حرف",
            example: "Tourists buy handmade crafts, pottery, and woven baskets."
        },
        {
            word: "rug",
            phonetic: "/rʌɡ/",
            partOfSpeech: "noun",
            arabic: "سجادة صغيرة / مفرش أرضي",
            example: "Visitors love to purchase colorful rugs with Bedouin patterns."
        },
        {
            word: "carpet",
            phonetic: "/ˈkɑːpɪt/",
            partOfSpeech: "noun",
            arabic: "سجادة كبيرة",
            example: "The spacious living room is decorated with a soft Egyptian carpet."
        },
        {
            word: "natural",
            phonetic: "/ˈnætʃrəl/",
            partOfSpeech: "adjective",
            arabic: "طبيعي",
            example: "Herbs and pomegranate peels are used to make natural colors."
        },
        {
            word: "voice recording",
            phonetic: "/vɔɪs rɪˈkɔːdɪŋ/",
            partOfSpeech: "noun",
            arabic: "تسجيل صوتي",
            example: "The teacher played a voice recording from students around Egypt."
        }
    ],

    // 3. Cultural Geography (Places in Egypt)
    placesInEgypt: [
        {
            name: "Ezbet El Borg",
            governorate: "Damietta (محافظة دمياط)",
            arabic: "عزبة البرج",
            specialty: "Fishing boats, fish factories, and fresh sea breeze.",
            icon: "⛵"
        },
        {
            name: "Shakhlouba",
            governorate: "Kafr El Sheikh (محافظة كفر الشيخ)",
            arabic: "قرية شخلوبة",
            specialty: "Near Lake Manzala / Burullus, wooden boats, and mending fishing nets.",
            icon: "🐟"
        },
        {
            name: "Qutur",
            governorate: "Gharbia (محافظة الغربية)",
            arabic: "قرية قطور",
            specialty: "Growing fruits and vegetables, harvesting crops, and Friday markets.",
            icon: "🌾"
        },
        {
            name: "Bashandi",
            governorate: "New Valley - Dakhla Oasis (محافظة الوادي الجديد)",
            arabic: "قرية باشنـدي",
            specialty: "Spinning sheep wool, natural dye, and weaving carpets on looms.",
            icon: "🧶"
        }
    ],

    // 4. Conjugation of Verbs
    verbs: [
        { present: "accompany", past: "accompanied", arabic: "يصطحب / يرافق", type: "regular" },
        { present: "fish", past: "fished", arabic: "يصطاد سمك", type: "regular" },
        { present: "support", past: "supported", arabic: "يدعم / يساند", type: "regular" },
        { present: "repair", past: "repaired", arabic: "يصلح", type: "regular" },
        { present: "catch", past: "caught", arabic: "يمسك / يصطاد", type: "irregular" },
        { present: "weave", past: "wove", arabic: "ينسج", type: "irregular" },
        { present: "spin", past: "spun", arabic: "يغزل", type: "irregular" }
    ],

    // 5. Study These Definitions
    definitions: [
        {
            word: "dye",
            definition: "to color cloth or wool using a special liquid",
            arabic: "يصبغ القماش أو الصوف باستخدام سائل خاص ملون"
        },
        {
            word: "fishing net",
            definition: "a tool made of rope or string used to catch fish",
            arabic: "أداة مصنوعة من الحبال أو الخيوط تستخدم لصيد الأسماك"
        },
        {
            word: "accompany",
            definition: "to go somewhere with another person",
            arabic: "يذهب إلى مكان ما برفقة شخص آخر"
        },
        {
            word: "looms",
            definition: "machines for making cloth or carpets",
            arabic: "آلات تستخدم لصناعة الأقمشة أو السجاد"
        }
    ],

    // 6. Listening & Reading Voice Recordings (Around Egypt Project)
    storyPages: [
        {
            pageNumber: 1,
            speaker: "Mr. Nader (Class Teacher)",
            speakerRole: "Classroom Intro",
            title: "The 'Know Egypt' Project",
            image: "../../assets/images/grade_6/unit_1/egyptian_village_crafts.webp",
            textEn: "As part of our 'Know Egypt' project, we'll listen to four voice recordings from four students. They'll describe life, work, and daily responsibilities in their villages.",
            textAr: "كجزء من مشروعنا 'اعرف مصر'، سنستمع إلى أربعة تسجيلات صوتية من أربعة طلاب. سيصفون الحياة والعمل والمسؤوليات اليومية في قراهم.",
            audioText: "As part of our Know Egypt project, we will listen to four voice recordings from four students. They will describe life, work, and daily responsibilities in their villages."
        },
        {
            pageNumber: 2,
            speaker: "Amina",
            speakerRole: "Ezbet El Borg • Damietta",
            title: "Voice 1: A Fishermen Community",
            image: "../../assets/images/grade_6/unit_1/egyptian_village_crafts.webp",
            textEn: "Hello! I'm Amina from Ezbet El Borg in Damietta. People here are fishermen. I accompany my father to catch fish early in the morning. Some villagers work in fish factories or repair boats. We eat fish almost every day and enjoy the cool sea breeze.",
            textAr: "مرحباً! أنا أمينة من عزبة البرج في دمياط. الناس هنا صيادون. أرافق والدي لصيد السمك في الصباح الباكر. يعمل بعض القرويين في مصانع الأسماك أو إصلاح القوارب. نأكل السمك تقريباً كل يوم ونستمتع بنسيم البحر العليل.",
            audioText: "Hello! I am Amina from Ezbet El Borg in Damietta. People here are fishermen. I accompany my father to catch fish early in the morning. Some villagers work in fish factories or repair boats. We eat fish almost every day and enjoy the cool sea breeze."
        },
        {
            pageNumber: 3,
            speaker: "Omar",
            speakerRole: "Shakhlouba • Kafr El Sheikh",
            title: "Voice 2: Life on Lake Manzala",
            image: "../../assets/images/grade_6/unit_1/egyptian_village_crafts.webp",
            textEn: "My name is Omar. I live in Shakhlouba in Kafr El Sheikh near Lake Manzala. People fish using small wooden boats. I help my uncle clean the fishing nets. Some women also help catch fish. In the evening, we sit together and drink hot tea outside.",
            textAr: "اسمي عمر. أعيش في قرية شخلوبة بمحافظة كفر الشيخ بالقرب من بحيرة المنزلة. يصطاد الناس باستخدام قوارب خشبية صغيرة. أساعد عمي في تنظيف شباك الصيد. تساعد بعض النساء أيضاً في صيد الأسماك. في المساء، نجلس معاً ونشرب الشاي الساخن في الخارج.",
            audioText: "My name is Omar. I live in Shakhlouba in Kafr El Sheikh near Lake Manzala. People fish using small wooden boats. I help my uncle clean the fishing nets. Some women also help catch fish. In the evening, we sit together and drink hot tea outside."
        },
        {
            pageNumber: 4,
            speaker: "Salma",
            speakerRole: "Qutur • Gharbia",
            title: "Voice 3: The Green Heart of Delta",
            image: "../../assets/images/grade_6/unit_1/egyptian_village_crafts.webp",
            textEn: "Hi! I'm Salma from Qutur in Gharbia. My family grows fruits and vegetables. We water the plants, harvest the crops, and feed our animals. On Fridays, we go to the market to sell food. Life is quiet, but we are always busy.",
            textAr: "مرحباً! أنا سلمى من قطور في الغربية. تزرع عائلتي الفواكه والخضروات. نحن نروي النباتات، ونحصد المحاصيل، ونطعم حيواناتنا. في أيام الجمعة، نذهب إلى السوق لبيع الطعام. الحياة هادئة، لكننا دائماً مشغولون.",
            audioText: "Hi! I am Salma from Qutur in Gharbia. My family grows fruits and vegetables. We water the plants, harvest the crops, and feed our animals. On Fridays, we go to the market to sell food. Life is quiet, but we are always busy."
        },
        {
            pageNumber: 5,
            speaker: "Hassan",
            speakerRole: "Bashandi • Dakhla Oasis",
            title: "Voice 4: Desert Carpets on Looms",
            image: "../../assets/images/grade_6/unit_1/egyptian_village_crafts.webp",
            textEn: "Hi! I'm Hassan from Bashandi, a village in the Dakhla Oasis in the Western Desert. People in my village make carpets, rugs, and crafts. My family spins wool and weaves it on looms. I help my mother dye the wool with natural colors. Some visitors come to buy rugs from the village shops.",
            textAr: "مرحباً! أنا حسن من قرية بشندي، وهي قرية في واحة الداخلة بالصحراء الغربية. يصنع الناس في قريتي السجاد والبسط والحرف اليدوية. تغزل عائلتي الصوف وتنسجه على الأنوال. أساعد أمي في صبغ الصوف بألوان طبيعية. يأتي بعض الزوار لشراء السجاد من متاجر القرية.",
            audioText: "Hi! I am Hassan from Bashandi, a village in the Dakhla Oasis in the Western Desert. People in my village make carpets, rugs, and crafts. My family spins wool and weaves it on looms. I help my mother dye the wool with natural colors. Some visitors come to buy rugs from the village shops."
        },
        {
            pageNumber: 6,
            speaker: "Mr. Nader (Conclusion)",
            speakerRole: "Teacher's Praise",
            title: "Egyptian Village Values",
            image: "../../assets/images/grade_6/unit_1/egyptian_village_crafts.webp",
            textEn: "Thank you! These villages show how people in Egypt live, work, and support their families every day. Great job!",
            textAr: "شكراً لكم! هذه القرى توضح كيف يعيش الناس في مصر ويعملون ويدعمون عائلاتهم كل يوم. عمل رائع!",
            audioText: "Thank you! These villages show how people in Egypt live, work, and support their families every day. Great job!"
        }
    ],

    // 7. Pronunciation Lab: /er/ sound
    pronunciation: {
        sound: "/er/",
        title: "The /er/ Sound Lab",
        description: "انطق واستمع لصوت /er/ وكيف يتكرر في نهايات وكلمات مختلفة باللغة الإنجليزية مثل (air, are, ear, ere):",
        words: [
            { word: "bear", phonetic: "/beər/", arabic: "دب", example: "The brown bear is strong." },
            { word: "stare", phonetic: "/steər/", arabic: "يحدق / ينظر باهتمام", example: "Don't stare at people." },
            { word: "square", phonetic: "/skweər/", arabic: "ميدان / مربع", example: "Tahrir is a famous square." },
            { word: "airport", phonetic: "/ˈeəpɔːt/", arabic: "مطار", example: "Planes land at Cairo Airport." },
            { word: "scared", phonetic: "/skeəd/", arabic: "خائف", example: "He was scared of the dark." },
            { word: "wear", phonetic: "/weər/", arabic: "يرتدي", example: "I wear a blue jacket." },
            { word: "pear", phonetic: "/peər/", arabic: "كمثرى", example: "The green pear is sweet." },
            { word: "where", phonetic: "/weər/", arabic: "أين", example: "Where did your aunt go?" },
            { word: "nightmare", phonetic: "/ˈnaɪtmeər/", arabic: "كابوس (حلم سيئ)", example: "I had a bad nightmare." },
            { word: "there", phonetic: "/ðeər/", arabic: "هناك", example: "Look, my friend is over there!" },
            { word: "hare", phonetic: "/heər/", arabic: "أرنب بري", example: "The hare can run very fast." }
        ],
        practiceSentences: [
            { text: "Where did your aunt go last week?", highlight: "Where" },
            { text: "I had a nightmare last night that scared me.", highlight: "nightmare, scared" },
            { text: "The brown bear stood in the village square.", highlight: "bear, square" }
        ]
    },

    // 8. Mastery Quiz
    quiz: [
        {
            id: 1,
            question: "The machines used for making cloth or carpets are called .............",
            options: ["fishing nets", "boats", "looms", "rugs"],
            correct: 2,
            explanation: "Looms (الأنوال) هي الآلات التقليدية المستخدمة لنسج القماش والسجاد."
        },
        {
            id: 2,
            question: "To ............. means to go somewhere with another person.",
            options: ["spin", "dye", "repair", "accompany"],
            correct: 3,
            explanation: "To accompany تعني أن ترافق أو تصطحب شخصاً آخر إلى مكان ما."
        },
        {
            id: 3,
            question: "To ............. means to color cloth or wool using a special liquid.",
            options: ["dye", "spin", "repair", "harvest"],
            correct: 0,
            explanation: "To dye تعني صبغ القماش أو الصوف بسائل ملون مخصص."
        },
        {
            id: 4,
            question: "People in Ezbet El Borg in Damietta mainly work as .............",
            options: ["pilots", "fishermen", "carpenters", "doctors"],
            correct: 1,
            explanation: "عزبة البرج بدمياط تشتهر بالصيد ويعمل معظم سكانها كصيادين (fishermen)."
        },
        {
            id: 5,
            question: "In Omar's village, people fish using small ............. boats.",
            options: ["iron", "plastic", "wooden", "paper"],
            correct: 2,
            explanation: "يستخدم الصيادون قوارب خشبية صغيرة (small wooden boats)."
        },
        {
            id: 6,
            question: "Salma's family in Qutur waters plants and ............. the crops.",
            options: ["spins", "harvests", "dyes", "weaves"],
            correct: 1,
            explanation: "عائلة سلمى تقوم بري النباتات وحصاد المحاصيل (harvests the crops)."
        },
        {
            id: 7,
            question: "In Bashandi village, Hassan's family spins wool and weaves it on .............",
            options: ["airports", "fishing nets", "looms", "factories"],
            correct: 2,
            explanation: "تغزل عائلة حسن الصوف وتنسجه على الأنوال (looms)."
        },
        {
            id: 8,
            question: "A tool made of rope or string used to catch fish is a .............",
            options: ["loom", "fishing net", "carpet", "breeze"],
            correct: 1,
            explanation: "الشبكة المصنوعة من الحبال لصيد الأسماك هي (fishing net)."
        },
        {
            id: 9,
            question: "Which of the following words contains the /er/ sound?",
            options: ["book", "nightmare", "food", "cat"],
            correct: 1,
            explanation: "كلمة nightmare تنتهي بصوت /er/ (care, stare, nightmare)."
        },
        {
            id: 10,
            question: "Which word has the /er/ sound like 'stare' and 'bear'?",
            options: ["square", "car", "door", "tree"],
            correct: 0,
            explanation: "كلمة square تتضمن نفس الصوت /er/ مثل bear و stare."
        }
    ]
};
