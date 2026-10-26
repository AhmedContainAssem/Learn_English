/**
 * Grade 6 - Unit 2: Our Nature
 * Lesson 3: The Wonderful Nile River & Pronunciation (/e/ vs /ɪ/)
 * Clean, decoupled data model for CurriculumRenderer, StoryEngine, PhonicsLab, and QuizEngine
 */

window.lessonData = {
    id: "grade_6_u2_l3",
    stage: "Grade_6",
    unit: "unit-2",
    lesson: "lesson-3",
    title: "Lesson 3: The Wonderful Nile River & Pronunciation",
    arabicTitle: "الدرس الثالث: نهر النيل الرائع ومختبر الصوتيات (/e/ مقابل /ɪ/)",
    subtitle: "Mr. Ahmed Assem • Connect 6 (Term 1) • Unit 2: Our Nature",
    description: "مفردات نهر النيل والكائنات الحية، تصريف الأفعال، التعبيرات وحروف الجر، قصة نهر النيل التفاعلية (StoryBook)، مختبر صوتيات /e/ و /ɪ/، واختبار شامل 🎯",

    // 1. Key Vocabulary (المفردات الأساسية المعتمدة)
    keyVocabulary: [
        {
            word: "the Nile River",
            translation: "نهر النيل",
            pos: "noun",
            icon: "🌊",
            example: "The Nile River is the longest river in the world.",
            exampleAr: "نهر النيل هو أطول نهر في العالم."
        },
        {
            word: "tilapia",
            translation: "سمك البلطي",
            pos: "noun",
            icon: "🐟",
            example: "Tilapia is a famous fish that swims in the Nile.",
            exampleAr: "البلطي سمك شهير يسبح في مياه النيل."
        },
        {
            word: "crocodile",
            translation: "تمساح",
            pos: "noun",
            icon: "🐊",
            example: "Crocodiles live in the Nile and they are dangerous animals.",
            exampleAr: "تعيش التماسيح في نهر النيل وهي حيوانات خطيرة."
        },
        {
            word: "kingfisher",
            translation: "طائر الرفراف (صياد السمك)",
            pos: "noun",
            icon: "🦜",
            example: "The colorful kingfisher flies over the river to catch fish.",
            exampleAr: "يطير طائر الرفراف الملون فوق النهر لصيد الأسماك."
        }
    ],

    // 2. Extra Vocabulary (المفردات التكميلية)
    lessonVocabulary: [
        { word: "country", translation: "دولة / بلد", pos: "noun", example: "Egypt is a wonderful country with rich history.", exampleAr: "مصر بلد رائع يتمتع بتاريخ غني." },
        { word: "dangerous", translation: "خطير", pos: "adj", example: "Crocodiles are dangerous reptiles with sharp teeth.", exampleAr: "التماسيح زواحف خطيرة ذات أسنان حادة." },
        { word: "Nile perch", translation: "سمك نيلي / قشر بياض", pos: "noun", example: "Nile perch and tilapia are big fish in the river.", exampleAr: "قشر البياض والبلطي من الأسماك الكبيرة في النهر." },
        { word: "heron", translation: "طائر البلشون (مالك الحزين)", pos: "noun", example: "Herons stand near the water looking for food.", exampleAr: "يقف طائر البلشون قرب الماء باحثاً عن الطعام." },
        { word: "temples", translation: "معابد", pos: "noun", example: "Ancient Egyptians built magnificent temples near the Nile.", exampleAr: "بنى قدماء المصريين معابد فخمة بالقرب من النيل." },
        { word: "wheat", translation: "قمح", pos: "noun", example: "Farmers grow wheat in the fertile soil near the river.", exampleAr: "يزرع الفلاحون القمح في التربة الخصبة قرب النهر." },
        { word: "desert", translation: "صحراء", pos: "noun", example: "The Nile flows through the dry desert and brings life.", exampleAr: "يتدفق النيل عبر الصحراء الجافة ويجلب الحياة للبلاد." },
        { word: "soil", translation: "تربة زراعية خصبة", pos: "noun", example: "Good soil helps healthy plants and crops grow.", exampleAr: "التربة الجيدة تساعد النباتات والمحاصيل الصحية على النمو." },
        { word: "ducks", translation: "بط", pos: "noun", example: "You can see ducks swimming gracefully in the river.", exampleAr: "يمكنك رؤية البط يسبح برشاقة في مياه النهر." },
        { word: "boats", translation: "قوارب / مراكب", pos: "noun", example: "People use boats to travel and transport goods on the Nile.", exampleAr: "يستخدم الناس القوارب للسفر ونقل البضائع عبر النيل." },
        { word: "depend", translation: "يعتمد على", pos: "verb", example: "Millions of people depend on the Nile for fresh water.", exampleAr: "يعتمد ملايين الناس على نهر النيل للحصول على المياه العذبة." }
    ],

    // 3. Conjugation of Verbs (تصريف الأفعال)
    verbs: [
        { word: "flow", past: "flowed", pp: "flowed", meaning: "يتدفق / يجري", type: "regular" },
        { word: "flood", past: "flooded", pp: "flooded", meaning: "يفيض / يغمر بالمياه", type: "regular" },
        { word: "provide", past: "provided", pp: "provided", meaning: "يمد / يزود بـ", type: "regular" },
        { word: "bring", past: "brought", pp: "brought", meaning: "يجلب / يحضر", type: "irregular" },
        { word: "build", past: "built", pp: "built", meaning: "يبني", type: "irregular" },
        { word: "swim", past: "swam", pp: "swum", meaning: "يسبح / يعوم", type: "irregular" },
        { word: "catch", past: "caught", pp: "caught", meaning: "يصطاد / يمسك", type: "irregular" },
        { word: "grow", past: "grew", pp: "grown", meaning: "يزرع / ينمو", type: "irregular" }
    ],

    // 4. Expressions & Prepositions (تعبيرات وحروف الجر)
    collocations: [
        {
            phrase: "flow through",
            meaning: "يتدفق أو يجري عبر",
            example: "The Nile flows through Egypt from south to north."
        },
        {
            phrase: "good soil",
            meaning: "تربة خصبة وجيدة للزراعة",
            example: "When the Nile flooded, it brought good soil for crops."
        },
        {
            phrase: "bring life to",
            meaning: "يجلب الحياة والخير لـ",
            example: "The river goes through the desert and brings life to the country."
        },
        {
            phrase: "provide ... with",
            meaning: "يمد أو يزود بـ",
            example: "The Nile provides people and animals with fresh water to drink."
        },
        {
            phrase: "from south to north",
            meaning: "من الجنوب إلى الشمال",
            example: "The water flows from south to north into the Mediterranean Sea."
        },
        {
            phrase: "depend on",
            meaning: "يعتمد على",
            example: "Many people still depend on the Nile for their jobs and food."
        },
        {
            phrase: "live in and near",
            meaning: "يعيش في وبالقرب من",
            example: "Many animals and birds live in and near the Nile."
        },
        {
            phrase: "travel in boats",
            meaning: "يسافر عبر القوارب والمراكب",
            example: "People also use the river to travel in boats."
        }
    ],

    // 5. Phonics Laboratory: /e/ vs /ɪ/ (مختبر الصوتيات والتلفظ)
    pronunciation: {
        title: "الصوت /e/ القصير مقابل الصوت /ɪ/ القصير",
        description: "تعلّم التمييز الصوتي الدقيق بين صوت الفتح الخفيف /e/ وصوت الكسر الرقيق /ɪ/ مع أمثلة المعاصر وقوائم الكلمات المتقابلة (Minimal Pairs):",
        soundE: {
            symbol: "/e/",
            label: "Short 'e' Sound",
            arabicRule: "ينطق عن طريق فتح الفم قليلاً وإبقاء لسانك منخفضاً في المنتصف ومقدمة الفم مثل كلمة ten.",
            words: [
                { word: "net", arabic: "شبكة", phonetic: "/net/", example: "Fishermen use a strong net to catch fish." },
                { word: "desk", arabic: "مكتب", phonetic: "/desk/", example: "The student sits at the desk to study." },
                { word: "shelf", arabic: "رف", phonetic: "/ʃelf/", example: "Put the science book on the top shelf." },
                { word: "hen", arabic: "دجاجة", phonetic: "/hen/", example: "The hen lays fresh eggs in the morning." },
                { word: "clever", arabic: "ذكي / ماهر", phonetic: "/ˈklev.ər/", example: "Ahmed is a clever student who loves English." },
                { word: "red", arabic: "لون أحمر", phonetic: "/red/", example: "The kingfisher has bright red and blue feathers." },
                { word: "bed", arabic: "سرير", phonetic: "/bed/", example: "I go to bed early every night." },
                { word: "fence", arabic: "سور / سياج", phonetic: "/fens/", example: "There is a wooden fence around the garden." },
                { word: "ten", arabic: "رقم 10", phonetic: "/ten/", example: "There are ten ducks swimming near the shore." }
            ]
        },
        soundI: {
            symbol: "/ɪ/",
            label: "Short 'i' Sound",
            arabicRule: "ينطق بإبقاء اللسان مرتفعاً قليلاً مع إرخاء الشفتين والفك واللسان خلف الأسنان السفلية مثل كلمة sit.",
            words: [
                { word: "pin", arabic: "دبوس", phonetic: "/pɪn/", example: "Fasten the map with a metal pin." },
                { word: "gift", arabic: "هدية", phonetic: "/ɡɪft/", example: "The Nile is truly a gift to Egypt." },
                { word: "pick", arabic: "يقطف / يختار", phonetic: "/pɪk/", example: "We pick fresh mint leaves from the garden." },
                { word: "window", arabic: "نافذة / شباك", phonetic: "/ˈwɪn.dəʊ/", example: "Look out of the window at the river." },
                { word: "milk", arabic: "حليب / لبن", phonetic: "/mɪlk/", example: "Drink a warm glass of milk daily." },
                { word: "village", arabic: "قرية", phonetic: "/ˈvɪl.ɪdʒ/", example: "Farmers live in peaceful villages along the banks." },
                { word: "swim", arabic: "يسبح / يعوم", phonetic: "/swɪm/", example: "Tilapia and Nile perch swim in clean water." },
                { word: "mint", arabic: "نعناع", phonetic: "/mɪnt/", example: "Fresh mint smells wonderful in tea." },
                { word: "hill", arabic: "تل", phonetic: "/hɪl/", example: "We climbed up the hill near the valley." },
                { word: "insect", arabic: "حشرة", phonetic: "/ˈɪn.sekt/", example: "Birds eat insects along the riverbank." },
                { word: "sit", arabic: "يجلس", phonetic: "/sɪt/", example: "People sit quietly by the river to relax." },
                { word: "bit", arabic: "جزء صغير / قليلاً", phonetic: "/bɪt/", example: "Add just a little bit of fertilizer." },
                { word: "in", arabic: "في / داخل", phonetic: "/ɪn/", example: "Fish live in the fresh water." }
            ]
        },
        minimalPairs: [
            { word1: "pen", p1: "/pen/", m1: "قلم جاف", word2: "pin", p2: "/pɪn/", m2: "دبوس" },
            { word1: "bed", p1: "/bed/", m1: "سرير", word2: "bid", p2: "/bɪd/", m2: "عرض / عطاء" },
            { word1: "desk", p1: "/desk/", m1: "مكتب", word2: "disk", p2: "/dɪsk/", m2: "قرص" },
            { word1: "red", p1: "/red/", m1: "أحمر", word2: "rid", p2: "/rɪd/", m2: "يتخلص من" },
            { word1: "ten", p1: "/ten/", m1: "عشرة", word2: "tin", p2: "/tɪn/", m2: "علبة صفيح" },
            { word1: "fell", p1: "/fel/", m1: "سقط", word2: "fill", p2: "/fɪl/", m2: "يملأ" }
        ],
        practiceSentences: [
            {
                text: "The clever hen is standing near the red desk.",
                arabic: "الدجاجة الذكية تقف بالقرب من المكتب الأحمر.",
                focus: "/e/ in hen, red, desk, clever"
            },
            {
                text: "Pick up the pin and place it in the gift box.",
                arabic: "التقط الدبوس وضعه داخل صندوق الهدية.",
                focus: "/ɪ/ in pick, pin, in, gift"
            },
            {
                text: "Ten fish swim in the river near the green hill.",
                arabic: "عشر سمكات تسبح في النهر بالقرب من التل الأخضر.",
                focus: "contrast between /e/ (ten) and /ɪ/ (fish, swim, in, hill)"
            }
        ]
    },

    // 6. Interactive StoryBook: The Wonderful Nile River (قصة نهر النيل الرائع التفاعلية)
    storyPages: [
        {
            titleEn: "Scene 1: The Longest River Brings Life",
            titleAr: "المشهد الأول: أطول أنهار العالم يجلب الحياة",
            textEn: "The Nile is the longest river in the world. It is about 6,650 kilometers long. The Nile flows through Egypt from south to north. It goes through the hot desert and brings fresh water, green fields, and vibrant life to the whole country.",
            translation: "نهر النيل هو أطول أنهار العالم؛ إذ يبلغ طوله حوالي 6,650 كيلومتراً. يتدفق النيل عبر مصر من الجنوب إلى الشمال، ماراً بالصحراء الجافة الحارة ليجلب المياه العذبة والحقول الخضراء والحياة النابضة للبلاد بأسرها.",
            image: "../../assets/images/grade_6/unit_2/nile_river.webp",
            caption: "The magnificent Nile River flowing through Egypt with feluccas and palm trees.",
            vocabHighlights: ["longest river", "6,650 kilometers", "flows", "south to north", "desert", "brings life"]
        },
        {
            titleEn: "Scene 2: Wonderful Nile Wildlife & Birds",
            titleAr: "المشهد الثاني: الحياة البرية والطيور الرائعة على ضفاف النيل",
            textEn: "Many amazing animals live in and near the Nile. Big fish like Nile perch and delicious tilapia swim through the cool water. Large crocodiles live in the river too, and they are very dangerous animals! Many birds fly to the riverbanks to drink and catch food. You can see colorful kingfishers, tall herons, and swimming ducks near the shore.",
            translation: "يعيش العديد من الحيوانات الرائعة في نهر النيل وبالقرب منه. تسبح أسماك ضخمة مثل قشر البياض والبلطي اللذيذ في المياه العذبة، وتعيش التماسيح الكبيرة في النهر أيضاً وهي كائنات خطيرة للغاية! وتأتي طيور كثيرة للشرب وصيد الطعام، فيمكنك رؤية طيور الرفراف الملونة، وطيور البلشون الطويلة، والبط السابح قرب الضفاف.",
            image: "../../assets/images/grade_6/unit_2/nile_river.webp",
            caption: "A vibrant kingfisher and Nile wildlife thriving along the peaceful riverbanks.",
            vocabHighlights: ["Nile perch", "tilapia", "crocodiles", "dangerous", "kingfishers", "herons", "ducks"]
        },
        {
            titleEn: "Scene 3: Ancient Egypt, Farming, and Temples",
            titleAr: "المشهد الثالث: مصر القديمة، الزراعة، وتشييد المعابد",
            textEn: "The Nile has always been very important for Egyptian people. In the past, the river flooded each year and brought rich, dark soil. Ancient farmers used this good soil to grow wheat, barley, and vegetables. Because the Ancient Egyptians knew the Nile was sacred and special, they built monumental stone temples near its waters and traveled smoothly between cities in boats.",
            translation: "كان نهر النيل دائماً في غاية الأهمية للشعب المصري. ففي الماضي، كان النهر يفيض كل عام جالباً معه تربة خصبة سوداء غنية، استغلها المزارعون القدماء لزراعة القمح والشعير والخضروات. ولإدراك المصريين القدماء لمكانة النيل المتميزة، شيدوا معابدهم الحجرية الخالدة قربه واستخدموا المراكب للتنقل بين المدن.",
            image: "../../assets/images/grade_6/unit_2/nile_river.webp",
            caption: "Ancient temples and fertile wheat fields nurtured by the annual Nile flood.",
            vocabHighlights: ["flooded", "good soil", "wheat", "temples", "Ancient Egyptians", "boats"]
        },
        {
            titleEn: "Scene 4: Modern Life and Our Duty to Protect It",
            titleAr: "المشهد الرابع: النيل في حياتنا المعاصرة وواجب حمايته",
            textEn: "Today, millions of people still depend on the Nile for their jobs, farming, and food. The river provides drinking water for homes, schools, and cities. It connects Egyptian families and carries travelers and goods across the country. Protecting the Nile from pollution ensures that future generations will always enjoy this wonderful gift of nature.",
            translation: "واليوم، لا يزال ملايين الناس يعتمدون على النيل في وظائفهم وزراعتهم وطعامهم. يوفر النهر مياه الشرب النظيفة للبيوت والمدارس والمدن، ويربط العائلات المصرية وينقل المسافرين والبضائع. وتعد حماية النيل من التلوث واجباً وطنياً لضمان تمتع الأجيال القادمة بهذه الهبة الطبيعية الرائعة.",
            image: "../../assets/images/grade_6/unit_2/nile_river.webp",
            caption: "Protecting the Nile ensures the survival of its rich ecosystem and future generations.",
            vocabHighlights: ["depend on", "provides water", "jobs and food", "protecting", "gift of nature"]
        }
    ],

    // 7. Comprehensive Mastery Quiz (14 سؤالاً شاملاً مأخوذاً من تدريبات المعاصر ص 84، 85، 87، 88)
    quiz: [
        {
            question: "The Nile is the __________ river in the world.",
            options: ["longest", "shortest", "thinnest", "tallest"],
            correct: 0,
            explanation: "نهر النيل هو أطول نهر في العالم (the longest river in the world) بطول 6650 كم."
        },
        {
            question: "The Nile flows through Egypt from __________.",
            options: ["south to north", "north to south", "east to west", "west to east"],
            correct: 0,
            explanation: "يتدفق نهر النيل عبر مصر من الجنوب إلى الشمال (from south to north)."
        },
        {
            question: "__________ and tilapia are big fish that live in the Nile River.",
            options: ["Nile perch", "Polar bears", "Lions", "Kingfishers"],
            correct: 0,
            explanation: "سمك قشر البياض (Nile perch) والبلطي (tilapia) أسماك كبيرة تعيش في النيل."
        },
        {
            question: "__________ live in the Nile and they are very dangerous animals.",
            options: ["Crocodiles", "Villagers", "Vets", "Farmers"],
            correct: 0,
            explanation: "التماسيح (Crocodiles) تعيش في النيل وهي حيوانات خطيرة جداً."
        },
        {
            question: "I saw a beautiful colorful __________ flying over the river to catch fish.",
            options: ["kingfisher", "cow", "giraffe", "cat"],
            correct: 0,
            explanation: "طائر الرفراف (kingfisher) طائر ملون يطير فوق النهر لصيد الأسماك."
        },
        {
            question: "Ducks and __________ are birds we can see near the Nile.",
            options: ["herons", "crocodiles", "snakes", "turtles"],
            correct: 0,
            explanation: "طائر البلشون (herons) والبط من الطيور التي نراها قرب النهر."
        },
        {
            question: "When the Nile __________, it brought good soil for farming.",
            options: ["flooded", "built", "needed", "swam"],
            correct: 0,
            explanation: "عندما كان يفيض النيل (flooded)، كان يجلب معه تربة خصبة جيدة للزراعة."
        },
        {
            question: "Farmers need good __________ to grow healthy crops like wheat.",
            options: ["soil", "rocks", "rooms", "oil"],
            correct: 0,
            explanation: "يحتاج الفلاحون إلى تربة جيدة (soil) لزراعة محاصيل صحية مثل القمح."
        },
        {
            question: "The Nile __________ people and animals with fresh water to drink.",
            options: ["provides", "builds", "depends", "grows"],
            correct: 0,
            explanation: "يمد ويزود (provides) النيل الناس والحيوانات بالمياه العذبة للشرب."
        },
        {
            question: "Many Egyptian people still __________ on the Nile for their food and jobs.",
            options: ["depend", "look", "pick", "write"],
            correct: 0,
            explanation: "يعتمد الناس على النيل: الفعل هو (depend on)."
        },
        {
            question: "Ancient Egyptians built grand __________ near the river.",
            options: ["temples", "airports", "cars", "trains"],
            correct: 0,
            explanation: "بنى قدماء المصريين معابد عظيمة (temples) بالقرب من النيل."
        },
        {
            question: "Which word has the short /e/ vowel sound?",
            options: ["desk", "pin", "milk", "hill"],
            correct: 0,
            explanation: "كلمة desk تحتوي على الصوت /e/ القصير، بينما البقية تحتوي على /ɪ/."
        },
        {
            question: "Which word has the short /ɪ/ vowel sound?",
            options: ["gift", "hen", "red", "bed"],
            correct: 0,
            explanation: "كلمة gift تحتوي على الصوت /ɪ/ القصير، بينما البقية تحتوي على /e/."
        },
        {
            question: "The river carries fresh water and __________ through the land.",
            options: ["flows", "swims", "celebrates", "waters"],
            correct: 0,
            explanation: "النهر يتدفق ويجري عبر الأرض: (flows through the land)."
        }
    ]
};
