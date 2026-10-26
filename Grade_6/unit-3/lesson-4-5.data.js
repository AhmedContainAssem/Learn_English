/**
 * Grade 6 - Unit 3: Community Builders
 * Lessons 4 & 5: Dr. Mostafa El-Sayed & Writing a Biography
 * Clean, decoupled pure data model for CurriculumRenderer
 */

window.lessonData = {
    id: "grade_6_u3_l4_5",
    stage: "Grade_6",
    unit: "unit-3",
    lesson: "lesson-4-5",
    title: "Lessons 4 & 5: Biography of Dr. Mostafa El-Sayed & Writing Skills",
    arabicTitle: "الدروس الرابع والخامس: سيرة د. مصطفى السيد ومهارات الكتابة",
    subtitle: "Mr. Ahmed Assem • Connect 6 (Term 1) • Unit 3: Community Builders",
    description: "سيرة العالم المصري د. مصطفى السيد وعلاج السرطان بجزيئات الذهب، القصة المصورة (StoryBook)، مهارات كتابة السيرة الذاتية، واختبار شامل",

    // 1. Key Vocabulary (المفردات الأساسية)
    keyVocabulary: [
        {
            word: "chemist / scientist",
            translation: "عالم كيمياء / عالم",
            pos: "noun",
            icon: "🔬",
            example: "Dr. Mostafa El-Sayed is a world-renowned Egyptian chemist and physical scientist.",
            exampleAr: "الدكتور مصطفى السيد هو عالم كيمياء وفيزياء مصري ذائع الصيت عالمياً."
        },
        {
            word: "nanotechnology",
            translation: "تكنولوجيا النانو (تقنية الجزيئات المتناهية الصغر)",
            pos: "noun",
            icon: "⚛️",
            example: "Nanotechnology works with microscopic particles to create revolutionary medicine.",
            exampleAr: "تتعامل تكنولوجيا النانو مع الجزيئات المجهرية الدقيقة لابتكار علاجات طبية ثورية."
        },
        {
            word: "gold nanoparticles",
            translation: "جزيئات الذهب النانوية",
            pos: "noun phrase",
            icon: "✨",
            example: "Gold nanoparticles stick specifically to cancer cells and absorb light energy.",
            exampleAr: "تلتصق جزيئات الذهب النانوية خصيصاً بالخلايا السرطانية وتمتص طاقة الضوء."
        },
        {
            word: "cancer cells",
            translation: "الخلايا السرطانية",
            pos: "noun",
            icon: "🧫",
            example: "Heated gold nanoparticles destroy harmful cancer cells without damaging healthy tissue.",
            exampleAr: "تدمر جزيئات الذهب النانوية المسخنة الخلايا السرطانية الضارة دون إيذاء الأنسجة السليمة."
        },
        {
            word: "tumor",
            translation: "ورم خبيث",
            pos: "noun",
            icon: "⚠️",
            example: "Scientists use focused laser light on nanoparticles to melt away the tumor.",
            exampleAr: "يستخدم العلماء ضوء الليزر المركز على جزيئات النانو لإذابة الورم."
        },
        {
            word: "healthy cells",
            translation: "خلايا سليمة",
            pos: "noun",
            icon: "🛡️",
            example: "The great advantage of this treatment is keeping all surrounding healthy cells safe.",
            exampleAr: "الميزة الكبرى لهذا العلاج هي الحفاظ على سلامة جميع الخلايا السليمة المحيطة."
        },
        {
            word: "National Medal of Science",
            translation: "قلادة (وسام) العلوم الوطنية الأمريكية",
            pos: "proper noun",
            icon: "🥇",
            example: "In 2008, Dr. El-Sayed was awarded the National Medal of Science, the highest US scientific honor.",
            exampleAr: "في عام 2008، نال الدكتور مصطفى السيد قلادة العلوم الوطنية، وهي أرفع تكريم علمي في الولايات المتحدة."
        },
        {
            word: "inspirational / inspire",
            translation: "ملهم / يلهم",
            pos: "adj / verb",
            icon: "💡",
            example: "His lifelong scientific dedication continues to inspire young Egyptian students.",
            exampleAr: "يواصل إخلاصه العلمي طوال حياته إلهام الطلاب والشباب المصريين."
        }
    ],

    // 2. Extra Lesson Vocabulary (المفردات التكميلية)
    lessonVocabulary: [
        { word: "biography", translation: "سيرة ذاتية (قصة حياة شخص يكتبها غيره)", pos: "noun", example: "We are writing a biography of a famous Egyptian hero.", exampleAr: "نحن نكتب سيرة ذاتية لبطل وشخصية مصرية مشهورة." },
        { word: "laboratory / lab", translation: "مختبر / معمل أبحاث", pos: "noun", example: "He spent decades conducting experiments in his laser laboratory.", exampleAr: "أمضى عقوداً من الزمن في إجراء التجارب بمعمله لأبحاث الليزر." },
        { word: "achievement", translation: "إنجاز عظيم", pos: "noun", example: "Finding a cure for cancer is a monumental human achievement.", exampleAr: "اكتشاف علاج للسرطان هو إنجاز إنساني هائل." },
        { word: "award", translation: "جائزة / يمنح جائزة", pos: "noun / verb", example: "He received many international awards for his discoveries.", exampleAr: "حصل على العديد من الجوائز الدولية تقديراً لاكتشافاته." },
        { word: "research", translation: "بحث علمي", pos: "noun", example: "Scientific research requires patience, observation, and hard work.", exampleAr: "يتطلب البحث العلمي الصبر وقوة الملاحظة والعمل الدؤوب." },
        { word: "role model", translation: "قدوة حسنة ومثل أعلى", pos: "noun", example: "Dr. El-Sayed is a wonderful role model for every young learner.", exampleAr: "الدكتور مصطفى السيد قدوة رائعة لكل متعلم شاب." }
    ],

    // 3. Verbs (تصريف الأفعال)
    verbs: [
        { present: "discover", past: "discovered", type: "regular", translation: "يكتشف", example: "He discovered new rules in chemistry." },
        { present: "develop", past: "developed", type: "regular", translation: "يطور", example: "Scientists developed new cancer therapies." },
        { present: "destroy", past: "destroyed", type: "regular", translation: "يدمر / يقضي على", example: "Heat destroyed the tumor cells." },
        { present: "graduate", past: "graduated", type: "regular", translation: "يتخرج من", example: "He graduated from Ain Shams University in 1953." },
        { present: "inspire", past: "inspired", type: "regular", translation: "يلهم", example: "His story inspired many students." },
        { present: "win", past: "won", type: "irregular", translation: "يفوز بـ", example: "He won the National Medal of Science." },
        { present: "lead", past: "led", type: "irregular", translation: "يقود / يرأس", example: "He led the laser research team." },
        { present: "become", past: "became", type: "irregular", translation: "يصبح", example: "He became a top university professor." }
    ],

    // 4. Expressions & Collocations (تعبيرات وتراكيب هامة)
    collocations: [
        { phrase: "graduate from university", translation: "يتخرج من الجامعة", note: "He graduated from Ain Shams University Faculty of Science." },
        { phrase: "laser dynamics", translation: "ديناميكيات واستخدامات الليزر", note: "Specialized field of chemical physics." },
        { phrase: "destroy cancer cells", translation: "يقضي على الخلايا السرطانية", note: "Using microscopic heated gold nanoparticles." },
        { phrase: "keep healthy cells safe", translation: "يحافظ على سلامة الخلايا السليمة", note: "The key medical innovation of nanotechnology." },
        { phrase: "win the highest honor", translation: "ينال أعلى وسام وتكريم", note: "Awarded by presidents and global scientific bodies." },
        { phrase: "role model for youth", translation: "قدوة حسنة للشباب", note: "Inspires future Egyptian inventors and scientists." }
    ],

    // 5. Pop Quiz on Vocabulary (تدريب الفهم السريع)
    popQuiz: [
        {
            question: "Dr. Mostafa El-Sayed is a world-famous Egyptian __________.",
            options: ["mechanic", "chemist and scientist", "traffic officer", "tailor"],
            correct: 1,
            explanation: "الدكتور مصطفى السيد عالم كيمياء مصري عالمي (chemist and scientist)."
        },
        {
            question: "He used __________ nanoparticles to help treat cancer cells safely.",
            options: ["gold", "wood", "sand", "plastic"],
            correct: 0,
            explanation: "استخدم جزيئات الذهب النانوية (gold nanoparticles)."
        },
        {
            question: "Gold nanoparticles destroy cancer cells while keeping __________ cells safe.",
            options: ["broken", "healthy", "dead", "empty"],
            correct: 1,
            explanation: "الميزة الكبرى هي حماية الخلايا السليمة (healthy cells)."
        },
        {
            question: "A __________ is a written story of someone's life written by another person.",
            options: ["poem", "biography", "dictionary", "ticket"],
            correct: 1,
            explanation: "السيرة الذاتية (biography) هي قصة حياة شخص يكتبها شخص آخر."
        }
    ],

    // 6. Writing Guide: How to Write a Biography (دليل مهارات كتابة السيرة الذاتية)
    writingGuide: {
        title: "كيف تكتب سيرة ذاتية مميزة لشخصية ملهمة؟ (How to Write a Biography)",
        description: "السيرة الذاتية (Biography) هي نص يسرد قصة حياة شخصية حقيقية بالترتيب الزمني. اتبع الخطوات الأربع التالية:",
        steps: [
            {
                number: "1",
                name: "المقدمة (Introduction)",
                icon: "🌟",
                content: "اذكر اسم الشخصية، ومن هو، ولماذا يُعد شخصية مشهورة أو بطلاً قومياً.",
                example: "Dr. Mostafa El-Sayed is a world-famous Egyptian chemist who helped develop groundbreaking cancer treatments using nanotechnology."
            },
            {
                number: "2",
                name: "النشأة والتعليم (Early Life & Education)",
                icon: "🎓",
                content: "اذكر متى وأين وُلِد، وأين درس وما هي الكلية التي تخرج منها.",
                example: "He was born in Zifta, Gharbia in 1933. He loved chemistry and graduated at the top of his class from Ain Shams University in 1953."
            },
            {
                number: "3",
                name: "أهم الإنجازات والأبحاث (Major Achievements)",
                icon: "🔬",
                content: "صف أهم أبحاثه واكتشافاته العلمية وكيف أفادت البشرية.",
                example: "He pioneered research using heated gold nanoparticles to destroy cancer tumors while keeping all healthy cells completely safe."
            },
            {
                number: "4",
                name: "الجوائز والأثر الدائم (Awards & Legacy)",
                icon: "🏆",
                content: "اذكر التكريمات والجوائز التي نالها وكيف يمثل قدوة ومصدر إلهام للجيل القادم.",
                example: "In 2008, he won the US National Medal of Science. He is an inspiring role model for millions of young Egyptian students."
            }
        ]
    },

    // 7. Interactive 3D StoryBook (سيرة الدكتور مصطفى السيد في 3 مشاهد)
    storyPages: [
        {
            titleEn: "Scene 1: From Gharbia to Ain Shams University",
            titleAr: "المشهد الأول: من محافظة الغربية إلى جامعة عين شمس",
            textEn: "Dr. Mostafa El-Sayed was born in Zifta, Gharbia Governorate, Egypt in 1933. From a young age, he showed a brilliant curiosity about how the world works. He loved experimenting and asking questions about matter and light. He enrolled in the Faculty of Science at Ain Shams University in Cairo, studying chemistry with extraordinary passion. In 1953, he graduated at the very top of his class, earning a prestigious scholarship to pursue his doctorate in the United States.",
            translation: "وُلد الدكتور مصطفى السيد في مدينة زفتى بمحافظة الغربية في مصر عام 1933. ومنذ نعومة أظفاره، أظهر شغفاً وفضولاً متقداً لمعرفة أسرار الطبيعة وحركة المادة والضوء. التحق بكلية العلوم بجامعة عين شمس في القاهرة، ودرس الكيمياء بحماس وشغف استثنائيين. وفي عام 1953، تخرج في صدارة دفعته متفوقاً بالمركز الأول، مما أهله للحصول على منحة دراسية لاستكمال الدكتوراه في الولايات المتحدة الأمريكية.",
            image: "../../assets/images/grade_6/unit_3/mostafa_elsayed.webp",
            caption: "Young Dr. Mostafa El-Sayed studying chemistry with immense dedication.",
            vocabHighlights: ["chemist", "scientist", "graduate", "university"]
        },
        {
            titleEn: "Scene 2: The Breakthrough in Cancer Nanotechnology",
            titleAr: "المشهد الثاني: الطفرة العلمية في علاج السرطان بالنانو",
            textEn: "In the United States, Dr. El-Sayed became a distinguished professor and director of the Laser Dynamics Laboratory at Georgia Tech. Tragic family loss to cancer motivated him to search for gentler, more effective treatments. His laboratory made an astounding discovery using nanotechnology: microscopic gold nanoparticles can be guided directly to cancerous tumors. When exposed to a gentle laser, the gold particles heat up and melt the cancer cells without harming adjacent healthy cells!",
            translation: "وفي الولايات المتحدة، أصبح الدكتور السيد أستاذاً مرموقاً ورئيساً لمختبر أبحاث ديناميكيات الليزر بمعهد جورجيا للتكنولوجيا. وكان لوفاة زوجته بمرض السرطان أثر بالغ دفعه للبحث عن علاجات أكثر أمناً وفاعلية. وحقق مختبره كشفاً مذهلاً باستخدام تكنولوجيا النانو: حيث يمكن توجيه جزيئات الذهب النانوية الدقيقة للالتصاق بالأورام السرطانية مباشرة؛ وعند تسليط ضوء الليزر عليها، تسخن الجزيئات وتدمر الخلايا السرطانية دون أي مساس بالخلايا السليمة المجاورة!",
            image: "../../assets/images/grade_6/unit_3/nanotechnology_gold.webp",
            caption: "Gold nanoparticles targeting and destroying cancer cells under laser light.",
            vocabHighlights: ["nanotechnology", "gold nanoparticles", "cancer cells", "tumor", "healthy cells"]
        },
        {
            titleEn: "Scene 3: Highest Honors and Inspiring Future Generations",
            titleAr: "المشهد الثالث: أرفع الأوسمة العالمية وإلهام الأجيال",
            textEn: "Dr. Mostafa El-Sayed's revolutionary work gained worldwide acclaim. In 2008, the President of the United States awarded him the National Medal of Science, the highest scientific honor in the nation. He also received Egypt's Order of the Nile and the King Faisal International Prize. Despite his global fame, Dr. El-Sayed always remains deeply attached to Egypt, regularly visiting schools and universities to guide students. He is a shining hero whose journey proves that dedication and science can change the world.",
            translation: "نالت أبحاث الدكتور مصطفى السيد الثورية إشادة وتقدير المجتمع العلمي في كافة أنحاء العالم. وفي عام 2008، قلده رئيس الولايات المتحدة وسام العلوم الوطني الأمريكي، وهو أرفع وسام علمي هناك. كما نال قلادة النيل العظمى من مصر وجائزة الملك فيصل العالمية. ورغم شهرته العالمية، ظل الدكتور السيد شديد الارتباط بوطنه مصر، يزور الجامعات والمدارس بانتظام لتوجيه الطلاب. إنه بحق بطل مصري يلهم الأجيال ويثبت أن العلم قادر على تغيير العالم.",
            image: "../../assets/images/grade_6/unit_3/mostafa_elsayed.webp",
            caption: "Dr. El-Sayed receiving high international honors and inspiring young scientists.",
            vocabHighlights: ["National Medal of Science", "award", "inspirational", "role model"]
        }
    ],

    // 8. Comprehensive Mastery Quiz (اختبار شامل 12 سؤال مأخوذ من تدريبات المعاصر)
    quiz: [
        {
            question: "Where was Dr. Mostafa El-Sayed born?",
            options: ["In Alexandria", "In Zifta, Gharbia Governorate", "In Luxor", "In Aswan"],
            correct: 1,
            explanation: "وُلد الدكتور مصطفى السيد في مدينة زفتى بمحافظة الغربية."
        },
        {
            question: "Which university in Egypt did Dr. Mostafa El-Sayed graduate from?",
            options: ["Cairo University", "Ain Shams University", "Alexandria University", "Assiut University"],
            correct: 1,
            explanation: "تخرج من كلية العلوم بجامعة عين شمس عام 1953."
        },
        {
            question: "Dr. El-Sayed is a world-famous specialist in __________.",
            options: ["music and acting", "chemistry and nanotechnology", "farming and fishing", "cooking"],
            correct: 1,
            explanation: "هو عالم رائد في الكيمياء وتكنولوجيا النانو (chemistry and nanotechnology)."
        },
        {
            question: "What microscopic material did he use to detect and treat cancer tumors?",
            options: ["Gold nanoparticles", "Wood chips", "Iron bars", "Plastic beads"],
            correct: 0,
            explanation: "استخدم جزيئات الذهب النانوية (gold nanoparticles)."
        },
        {
            question: "What happens when light or laser shines on the gold nanoparticles on tumor cells?",
            options: ["They freeze the whole body", "They heat up and destroy the cancer cells", "They turn into green plants", "They make music"],
            correct: 1,
            explanation: "تسخن جزيئات الذهب وتدمر الخلايا السرطانية (heat up and destroy cancer cells)."
        },
        {
            question: "What is the biggest advantage of using gold nanoparticles in cancer therapy?",
            options: ["It destroys everything", "It keeps surrounding healthy cells completely safe", "It is very loud", "It takes 20 years"],
            correct: 1,
            explanation: "أكبر ميزة أنها تدمر الخلايا المصابة وتبقي الخلايا السليمة آمنة (keeps healthy cells safe)."
        },
        {
            question: "Which prestigious award did Dr. El-Sayed win in 2008 in the USA?",
            options: ["The Academy Award", "The National Medal of Science", "The Golden Globe", "The Olympic Medal"],
            correct: 1,
            explanation: "نال قلادة العلوم الوطنية الأمريكية (The National Medal of Science) عام 2008."
        },
        {
            question: "What is a 'biography'?",
            options: ["A list of food recipes", "The story of a real person's life written by someone else", "A book of jokes", "A train schedule"],
            correct: 1,
            explanation: "السيرة الذاتية (biography) هي قصة حياة شخص يكتبها شخص آخر."
        },
        {
            question: "When writing a biography, what do you write in the 'Early Life' section?",
            options: ["The person's date/place of birth and education", "A funny recipe", "The weather tomorrow", "Movie titles"],
            correct: 0,
            explanation: "في قسم النشأة والتعليم نذكر تاريخ ومكان الميلاد ودراسة الشخصية."
        },
        {
            question: "Dr. El-Sayed is considered a wonderful __________ for young students in Egypt and worldwide.",
            options: ["problem", "role model and inspiration", "stranger", "rival"],
            correct: 1,
            explanation: "يعتبر قدوة ومثلاً أعلى ومصدراً للإلهام (role model and inspiration)."
        },
        {
            question: "Nanotechnology deals with things that are extremely __________.",
            options: ["giant", "microscopic and tiny", "heavy", "noisy"],
            correct: 1,
            explanation: "تتعامل تكنولوجيا النانو مع أحجام مجهرية متناهية الصغر (microscopic and tiny)."
        },
        {
            question: "How does Dr. El-Sayed support young Egyptian researchers today?",
            options: ["By visiting universities and guiding students", "By ignoring everyone", "By stopping his research", "By closing labs"],
            correct: 0,
            explanation: "يحرص دائماً على زيارة مصر والجامعات لتوجيه الطلاب والباحثين الشباب."
        }
    ]
};
