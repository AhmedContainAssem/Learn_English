/**
 * Grade 6 - Unit 2: Our Nature
 * Lesson 1: Caring for Plants (العناية بالنباتات)
 * Clean, decoupled data model for CurriculumRenderer
 */

window.lessonData = {
    id: "grade_6_u2_l1",
    stage: "Grade_6",
    unit: "unit-2",
    lesson: "lesson-1",
    title: "Lesson 1: Caring for Plants",
    arabicTitle: "الدرس الأول: العناية بالنباتات",
    subtitle: "Mr. Ahmed Assem • Connect 6 (Term 1) • Unit 2: Our Nature",
    description: "تعلم أسماء الأعشاب والنباتات المصرية، طرق العناية بالحديقة، قصة الجد وليلى التفاعلية، وتدريبات شاملة",
    
    // 1. Key Vocabulary (المفردات اللغوية الأساسية)
    keyVocabulary: [
        {
            word: "natural fertilizer",
            translation: "سماد عضوي (طبيعي)",
            pos: "noun",
            icon: "🌱",
            example: "Grandpa uses natural fertilizer to help his plants grow strong.",
            exampleAr: "يستخدم جدي سماداً طبيعياً لمساعدة نباتاته على النمو بقوة."
        },
        {
            word: "weeds",
            translation: "أعشاب برية (ضارة)",
            pos: "noun",
            icon: "🌿",
            example: "We pull out weeds because they can be harmful to other plants.",
            exampleAr: "نقتلع الحشائش الضارة لأنها يمكن أن تؤذي النباتات الأخرى."
        },
        {
            word: "mint",
            translation: "نبات النعناع",
            pos: "noun",
            icon: "🍃",
            example: "Dad likes to drink hot mint tea on the balcony every evening.",
            exampleAr: "يحب والدي شرب الشاي بالنعناع الساخن في الشرفة كل مساء."
        },
        {
            word: "hibiscus",
            translation: "نبات الكركديه",
            pos: "noun",
            icon: "🌺",
            example: "We use dry hibiscus flowers to brew a delicious, refreshing drink.",
            exampleAr: "نستخدم زهور الكركديه المجففة لتحضير مشروب لذيذ ومنعش."
        },
        {
            word: "basil",
            translation: "نبات الريحان",
            pos: "noun",
            icon: "🪴",
            example: "Basil is an aromatic herb that adds a wonderful flavor to pasta dishes.",
            exampleAr: "الريحان عشب عطري يضفي نكهة رائعة على أطباق المعكرونة."
        },
        {
            word: "parsley",
            translation: "نبات البقدونس",
            pos: "noun",
            icon: "🌿",
            example: "Mom puts fresh green parsley in the salad to give it great taste.",
            exampleAr: "تضع أمي البقدونس الأخضر الطازج في السلطة ليعطيها طعماً رائعاً."
        },
        {
            word: "pull out",
            translation: "يشد / ينزع / يقتلع",
            pos: "phrasal verb",
            icon: "🧤",
            example: "He pulls out the unwanted weeds carefully with his gardening gloves.",
            exampleAr: "يقتلع الأعشاب الضارة غير المرغوب فيها بحرص باستخدام قفازات الحديقة."
        },
        {
            word: "care for",
            translation: "يعتني بـ / يهتم بـ",
            pos: "phrasal verb",
            icon: "💚",
            example: "Grandpa cares for his garden every day with love and patience.",
            exampleAr: "يعتني الجد بحديقته كل يوم بحب وصبر."
        },
        {
            word: "water",
            translation: "يسقي / يروي",
            pos: "verb",
            icon: "🚿",
            example: "It is best to water the garden early in the morning before the heat.",
            exampleAr: "من الأفضل ري الحديقة مبكراً في الصباح قبل اشتداد الحرارة."
        }
    ],

    // 2. Extra Vocabulary (المفردات التكميلية الهامة)
    lessonVocabulary: [
        { word: "decoration", translation: "ديكور / زينة", pos: "noun", example: "Some flowers are grown just for decoration.", exampleAr: "تُزرع بعض الأزهار للزينة والديكور فقط." },
        { word: "sage", translation: "مريمية (عشب عطري)", pos: "noun", example: "Sage is a healthy herb used in tea and medicine.", exampleAr: "المريمية عشب صحي يُستخدم في الشاي والطب." },
        { word: "lavender", translation: "خزامى / لافندر", pos: "noun", example: "Lavender has a sweet purple flower and calming scent.", exampleAr: "اللافندر له زهور بنفسجية ورائحة مهدئة." },
        { word: "soil", translation: "تربة صالحة للزراعة", pos: "noun", example: "Plants need rich, healthy soil to spread their roots.", exampleAr: "تحتاج النباتات إلى تربة غنية وصحية لمد جذورها." },
        { word: "oil", translation: "زيت", pos: "noun", example: "Olives are pressed to extract healthy olive oil.", exampleAr: "يُعصر الزيتون لاستخراج زيت الزيتون الصحي." },
        { word: "ginger", translation: "زنجبيل", pos: "noun", example: "Ginger adds a spicy flavor to hot winter drinks.", exampleAr: "يضيف الزنجبيل نكهة حارة للمشروبات الشتوية الساخنة." },
        { word: "jasmine", translation: "نبات الياسمين", pos: "noun", example: "Jasmine flowers smell incredibly sweet at night.", exampleAr: "تفوح زهور الياسمين برائحة حلوة مذهلة في الليل." },
        { word: "mint tea", translation: "شاي بالنعناع", pos: "noun", example: "Mint tea helps people relax after a long day.", exampleAr: "يساعد الشاي بالنعناع الناس على الاسترخاء بعد يوم طويل." },
        { word: "flavor", translation: "طعم / نكهة", pos: "noun", example: "Herbs add a unique and delicious flavor to Egyptian dishes.", exampleAr: "تضفي الأعشاب نكهة فريدة ولذيذة للأطباق المصرية." },
        { word: "herbs", translation: "أعشاب طبيعية", pos: "noun", example: "Herbs can be used for cooking, scent, and medicine.", exampleAr: "يمكن استخدام الأعشاب في الطهي والعطور والطب." },
        { word: "thyme", translation: "نبات الزعتر", pos: "noun", example: "Thyme is a popular Mediterranean herb.", exampleAr: "الزعتر هو أحد الأعشاب الشهيرة في حوض البحر المتوسط." },
        { word: "harmful", translation: "مضر / مؤذي", pos: "adj", example: "Weeds are harmful because they steal water from crops.", exampleAr: "الحشائش ضارة لأنها تسلب الماء من المحاصيل." },
        { word: "hibiscus tea", translation: "مشروب الكركديه", pos: "noun", example: "Cold hibiscus tea is the perfect drink on a hot summer afternoon.", exampleAr: "مشروب الكركديه البارد هو المشروب المثالي في فترة بعد ظهر يوم صيفي حار." },
        { word: "insects", translation: "حشرات", pos: "noun", example: "Grandpa checks the leaves regularly for bad insects.", exampleAr: "يفحص الجد الأوراق بانتظام للبحث عن الحشرات الضارة." },
        { word: "olives", translation: "زيتون", pos: "noun", example: "Egypt has been growing olives since ancient times.", exampleAr: "تزرع مصر الزيتون منذ العصور القديمة." },
        { word: "fig", translation: "تين", pos: "noun", example: "Figs are sweet and juicy fruits that grow in Egypt.", exampleAr: "التين فاكهة حلوة وغنية بالعصارة تنمو في مصر." },
        { word: "guava", translation: "جوافة", pos: "noun", example: "Grandpa picked fresh white guavas from his garden tree.", exampleAr: "قطف الجد جوافة بيضاء طازجة من شجرة حديقته." }
    ],

    // 3. Verbs (تصريف الأفعال)
    verbs: [
        { present: "add", past: "added", type: "regular", translation: "يضيف", example: "We add herbs to the soup for taste." },
        { present: "relax", past: "relaxed", type: "regular", translation: "يستريح / يسترخي", example: "Sitting in the green garden helps me relax." },
        { present: "plant", past: "planted", type: "regular", translation: "يزرع", example: "They planted fig and olive trees last year." },
        { present: "grow", past: "grew", type: "irregular", translation: "يزرع / ينمو", example: "Farmers grew olive trees in ancient Egypt." },
        { present: "keep", past: "kept", type: "irregular", translation: "يحافظ على / يجعل", example: "Watering keeps the plants fresh and green." }
    ],

    // 4. Expressions & Prepositions (تعبيرات وحروف جر هامة)
    expressions: [
        { phrase: "good for health", translation: "مفيد / جيد للصحة", note: "Used to describe nutritious herbs and natural drinks." },
        { phrase: "take time", translation: "يستغرق وقتاً", note: "Olive trees take time to grow and produce fruit." },
        { phrase: "look incredible", translation: "يبدو مذهلاً / رائعاً", note: "Grandpa's green garden looks incredible!" },
        { phrase: "check for", translation: "يتأكد من وجود / يفحص بحثاً عن", note: "He checks the leaves for small insects." },
        { phrase: "since ancient times", translation: "منذ العصور القديمة", note: "Egyptians have grown olives and herbs since ancient times." },
        { phrase: "early in the morning", translation: "مبكراً في الصباح", note: "The best time to water delicate garden plants." },
        { phrase: "all the time", translation: "طوال الوقت / دائماً", note: "Mom makes hibiscus tea all the time." }
    ],

    // 5. Pop Quiz (تدريب الفهم السريع)
    popQuiz: [
        {
            question: "Basil, mint, and parsley are all types of __________.",
            options: ["chemicals", "herbs", "fertilizers", "fruits"],
            correct: 1,
            explanation: "الريحان والنعناع والبقدونس هي أعشاب (herbs) تستخدم في الطهي والعلاج."
        },
        {
            question: "__________ out weeds is essential because weeds are harmful to plants.",
            options: ["Pulling", "Pushing", "Selling", "Buying"],
            correct: 0,
            explanation: "التعبير الصحيح هو 'Pulling out weeds' أي اقتلاع الحشائش الضارة."
        },
        {
            question: "Herbs like basil add a wonderful __________ to Egyptian food.",
            options: ["color", "flavor", "time", "wood"],
            correct: 1,
            explanation: "الأعشاب تضفي نكهة ومذاقاً لذيذاً (flavor) على الطعام."
        },
        {
            question: "We need to __________ the garden regularly so that flowers do not dry out.",
            options: ["water", "fly", "pull", "push"],
            correct: 0,
            explanation: "فعل 'water' يعني يروي أو يسقي الحديقة بالماء."
        }
    ],

    // 6. Interactive 3D StoryBook (صفحات القصة المصورة التفاعلية)
    storyPages: [
        {
            titleEn: "Scene 1: Visiting Grandpa's Incredible Garden",
            titleAr: "المشهد الأول: زيارة حديقة الجد الرائعة",
            textEn: "Today, Laila is visiting her grandfather's home. She walks out into the backyard and is amazed. The garden looks incredible! Lush green herbs, bright flowering pots, and healthy young trees fill the courtyard. Laila asks her grandpa how he keeps the garden so vibrant and healthy. Grandpa smiles and explains that every plant needs water, sunlight, and careful attention to grow well.",
            translation: "اليوم، تزور ليلى منزل جدها. تخرج إلى الفناء الخلفي فتبهرها الحديقة الرائعة! الأعشاب الخضراء المورقة، وأواني الزهور الزاهية، والأشجار الفتية الصحية تملأ المكان. تسأل ليلى جدها كيف يحافظ على الحديقة مفعمة بالحيوية والصحة، فيبتسم الجد ويوضح أن كل نبتة تحتاج إلى الماء وضوء الشمس والرعاية الجيدة لتنمو بقوة.",
            image: "../../assets/images/grade_6/unit_2/caring_for_plants.webp",
            caption: "Laila discovering the fresh herbs and colorful blooms in Grandpa's garden.",
            vocabHighlights: ["incredible", "garden", "sunlight", "care for"]
        },
        {
            titleEn: "Scene 2: Aromatic Herbs and Refreshing Drinks",
            titleAr: "المشهد الثاني: أعشاب عطرية ومشروبات منعشة",
            textEn: "Grandpa shows Laila his clay pots of fresh herbs: basil, mint, and parsley. He explains that Egyptians use these fragrant herbs in delicious traditional dishes to add flavor. Laila remembers that her dad drinks soothing mint tea every evening on the balcony to relax. Grandpa also points out his vibrant red hibiscus flowers and sweet jasmine, which fill the evening air with a delightful perfume.",
            translation: "يعرض الجد لليلى أوانيه الفخارية المليئة بالأعشاب الطازجة: الريحان والنعناع والبقدونس. ويوضح أن المصريين يستخدمون هذه الأعشاب العطرية في الأطباق الشعبية الشهية لإضافة نكهة مميزة. تتذكر ليلى أن والدها يشرب شاي النعناع المهدئ كل مساء في الشرفة للاسترخاء. كما يشير الجد إلى أزهار الكركديه الحمراء الزاهية والياسمين العطر.",
            image: "../../assets/images/grade_6/unit_2/caring_for_plants.webp",
            caption: "Fresh basil, mint, and vibrant red hibiscus flowers in clay pots.",
            vocabHighlights: ["basil", "mint", "parsley", "hibiscus", "flavor"]
        },
        {
            titleEn: "Scene 3: Ancient Olive Trees and Daily Garden Care",
            titleAr: "المشهد الثالث: أشجار الزيتون العريقة والعناية اليومية",
            textEn: "Next to the guava and fig trees stand the strong olive trees. Grandpa tells Laila that olive trees take time to mature, but they produce rich healthy oil. People in Egypt have cultivated olives since ancient times! To protect his plants, Grandpa wakes up early in the morning to water them, pulls out harmful weeds, and uses natural fertilizer. Laila is proud of her grandpa's dedication.",
            translation: "بجوار أشجار الجوافة والتين تقف أشجار الزيتون القوية. يخبر الجد ليلى أن أشجار الزيتون تستغرق وقتاً لتكبر، لكنها تنتج زيتاً غنياً وصحياً. وقد زرع المصريون الزيتون منذ العصور القديمة! ولحماية نباتاته، يستيقظ الجد مبكراً لسقيها، ويقتلع الحشائش الضارة، ويستخدم السماد الطبيعي.",
            image: "../../assets/images/grade_6/unit_2/caring_for_plants.webp",
            caption: "Grandpa watering the young plants with a watering can in the morning light.",
            vocabHighlights: ["natural fertilizer", "weeds", "pull out", "since ancient times"]
        }
    ],

    // 7. Interactive Listening Dialogue (محادثة الاستماع التفاعلية مع مشغل الصوت)
    dialogue: [
        {
            speaker: "Laila (ليلى)",
            en: "Grandpa, your garden looks incredible! How do you keep it so green and healthy?",
            ar: "يا جدي، حديقتك تبدو مذهلة ورائعة! كيف تحافظ عليها خضراء وصحية هكذا؟",
            tags: "سؤال وتعجب"
        },
        {
            speaker: "Grandpa (الجد)",
            en: "Thank you, Laila. I take care of it every day. Plants need water, sunlight, and care to grow well.",
            ar: "شكراً لكِ يا ليلى. أنا أعتني بها كل يوم. فالنباتات تحتاج للماء وأشعة الشمس والرعاية لتنمو جيداً.",
            tags: "نصيحة زراعية"
        },
        {
            speaker: "Laila (ليلى)",
            en: "What kinds of plants do you have here?",
            ar: "ما هي أنواع النباتات التي تزرعها هنا؟",
            tags: "استفسار"
        },
        {
            speaker: "Grandpa (الجد)",
            en: "I grow herbs like basil, mint, and parsley. We use them in many Egyptian dishes. Some add flavor, and others are good for health.",
            ar: "أزرع أعشاباً مثل الريحان والنعناع والبقدونس. نستخدمها في العديد من الأطباق المصرية؛ فبعضها يضفي نكهة، والبعض الآخر مفيد للصحة.",
            tags: "أعشاب ونكهات"
        },
        {
            speaker: "Laila (ليلى)",
            en: "Oh, Dad drinks mint tea every evening on the balcony. It helps him relax.",
            ar: "أوه! أبي يشرب الشاي بالنعناع كل مساء في الشرفة. إنه يساعده على الاسترخاء.",
            tags: "عادة يومية"
        },
        {
            speaker: "Grandpa (الجد)",
            en: "Yes, it tastes good! I also grow hibiscus and jasmine. They smell lovely, and we use hibiscus to make a tasty drink.",
            ar: "نعم، طعمه لذيذ! أزرع أيضاً الكركديه والياسمين؛ رائحتهما جميلة، ونستخدم الكركديه لصنع مشروب لذيذ.",
            tags: "مشروبات وزهور"
        },
        {
            speaker: "Laila (ليلى)",
            en: "Mom makes hibiscus tea all the time! And jasmine smells amazing at night.",
            ar: "أمي تحضر شاي الكركديه طوال الوقت! ورائحة الياسمين مدهشة حقاً في الليل.",
            tags: "ملاحظة ليلية"
        },
        {
            speaker: "Grandpa (الجد)",
            en: "I have guava and fig trees, too. Their fruit is sweet and healthy. Over there are the olive trees.",
            ar: "لدي أشجار جوافة وتين أيضاً، وثمارها حلوة وصحية. وهناك في تلك الزاوية توجد أشجار الزيتون.",
            tags: "أشجار فاكهة"
        },
        {
            speaker: "Laila (ليلى)",
            en: "Wow! Do Egyptians really grow olives?",
            ar: "واو! هل حقاً يزرع المصريون الزيتون؟",
            tags: "سؤال تاريخي"
        },
        {
            speaker: "Grandpa (الجد)",
            en: "Yes. Olives take time to grow, but they are full of oil. People grew olive trees in Egypt many years ago - and they still do.",
            ar: "نعم. يستغرق الزيتون وقتاً لينمو، لكنه مليء بالزيت. زرع الناس أشجار الزيتون في مصر منذ سنوات طويلة، وما زالوا يفعلون ذلك حتى الآن.",
            tags: "معلومة هامة"
        },
        {
            speaker: "Laila (ليلى)",
            en: "That's cool! How do you care for all these plants?",
            ar: "هذا رائع جداً! وكيف تعتني بكل هذه النباتات؟",
            tags: "طريقة الرعاية"
        },
        {
            speaker: "Grandpa (الجد)",
            en: "I water them early in the morning, pull out weeds, and check for insects. Sometimes, I use natural fertilizer.",
            ar: "أسقيها مبكراً في الصباح، وأقتلع الحشائش الضارة، وأفحص الأوراق للتأكد من خلوها من الحشرات. وأحياناً أستخدم السماد الطبيعي.",
            tags: "روتين الصباح"
        },
        {
            speaker: "Laila (ليلى)",
            en: "It sounds like hard work, but the results look incredible!",
            ar: "يبدو وكأنه عمل شاق، لكن النتائج تبدو مذهلة ومبهجة حقاً!",
            tags: "إعجاب وتشجيع"
        }
    ],

    // 7. Comprehensive Mastery Quiz (اختبار شامل 10 أسئلة مأخوذ من تدريبات المعاصر)
    quiz: [
        {
            question: "Laila is visiting her __________ garden.",
            options: ["grandpa's", "teacher's", "friend's", "uncle's"],
            correct: 0,
            explanation: "ليلى تزور حديقة جدها (grandpa's garden)."
        },
        {
            question: "What do plants need to grow healthy and strong?",
            options: ["Soda and candy", "Water, sunlight, and care", "Plastic and sand", "Insects and weeds"],
            correct: 1,
            explanation: "تحتاج النباتات إلى الماء وأشعة الشمس والرعاية (water, sunlight, and care)."
        },
        {
            question: "Grandpa grows herbs like basil, mint, and __________.",
            options: ["parsley", "cement", "metal", "wood"],
            correct: 0,
            explanation: "الأعشاب المذكورة هي الريحان والنعناع والبقدونس (parsley)."
        },
        {
            question: "Dad drinks __________ tea every evening on the balcony to relax.",
            options: ["mint", "salt", "vinegar", "pepper"],
            correct: 0,
            explanation: "يشرب الوالد شاي النعناع (mint tea) في الشرفة للاسترخاء."
        },
        {
            question: "We use dry flowers from the __________ plant to make a refreshing red drink.",
            options: ["hibiscus", "cactus", "oak", "pine"],
            correct: 0,
            explanation: "الكركديه (hibiscus) هو النبات الذي يصنع منه المشروب الأحمر المنعش."
        },
        {
            question: "Which flower smells especially lovely and sweet at night?",
            options: ["Weeds", "Jasmine", "Grass", "Thorns"],
            correct: 1,
            explanation: "الياسمين (jasmine) يفوح برائحة عطرة مميزة بالليل."
        },
        {
            question: "Olive trees take time to grow, but their fruits are full of healthy __________.",
            options: ["smoke", "oil", "poison", "fertilizer"],
            correct: 1,
            explanation: "ثمار الزيتون غنية بالزيت الصحي (oil)."
        },
        {
            question: "Grandpa waters his plants __________ to avoid the scorching midday heat.",
            options: ["at midnight", "early in the morning", "in the dark", "once a year"],
            correct: 1,
            explanation: "يسقي النباتات مبكراً في الصباح (early in the morning)."
        },
        {
            question: "Why does Grandpa pull out the weeds?",
            options: ["Because weeds are harmful to other plants", "Because weeds make ice cream", "Because weeds are expensive", "Because weeds turn into gold"],
            correct: 0,
            explanation: "الحشائش الضارة تقتلع لأنها تضر النباتات وتسلب منها الماء والغذاء."
        },
        {
            question: "People in Egypt have grown olive trees __________.",
            options: ["since yesterday", "since ancient times", "only last week", "for two hours"],
            correct: 1,
            explanation: "يزرع المصريون أشجار الزيتون منذ العصور القديمة (since ancient times)."
        }
    ]
};
