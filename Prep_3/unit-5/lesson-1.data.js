/**
 * Prep 3 - Unit 5: Design Thinking
 * Lessons 1 & 2: Think Like a Designer • Dream It, Build It
 * Data payload strictly adhering to Decoupled Architecture
 */

window.lessonData = {
    title: "Lessons 1 & 2: Think Like a Designer • Dream It, Build It",
    unit: "Unit 5: Design Thinking",
    grade: "Prep 3",
    term: "Term 1",
    totalQuestions: 35,

    // Vocabulary lists categorized by lessons
    lessonVocabulary: [
        {
            category: "Key Vocabulary (المفردات الرئيسية)",
            words: [
                { en: "schedule", ar: "جدول مواعيد / برنامج عمل", pos: "n", example: "The manager has a busy schedule today.", exampleAr: "المدير لديه جدول مواعيد مزدحم اليوم." },
                { en: "designer", ar: "مُصمم", pos: "n", example: "A great designer creates practical products.", exampleAr: "المصمم البارع يبتكر منتجات عملية ونافعة." },
                { en: "stylish", ar: "عصري / أنيق / جذاب", pos: "adj", example: "Young people love to wear stylish clothes.", exampleAr: "الشباب يحبون ارتداء الملابس العصرية والأنيقة." },
                { en: "creativity", ar: "ابتكار / إبداع", pos: "n", example: "Creativity is the ability to invent new ideas.", exampleAr: "الإبداع هو القدرة على ابتكار أفكار جديدة." },
                { en: "prototype", ar: "نموذج أولي تجريبي", pos: "n", example: "They built a simple prototype to test the app.", exampleAr: "قاموا ببناء نموذج أولي بسيط لاختبار التطبيق." },
                { en: "design sprint", ar: "ورشة تصميم مكثفة ومحددة بوقت", pos: "n", example: "A design sprint solves complex problems in five days.", exampleAr: "ورشة التصميم المكثفة تحل المشكلات المعقدة في خمسة أيام." },
                { en: "solution", ar: "حَلّ لمشكلة", pos: "n", example: "We found a practical solution to our problem.", exampleAr: "وجدنا حلاً عملياً لمشكلتنا." },
                { en: "brainstorm", ar: "يعصف ذهنياً / يولد أفكاراً", pos: "v", example: "Let's brainstorm as many ideas as possible.", exampleAr: "دعونا نعصف ذهنياً لتوليد أكبر قدر ممكن من الأفكار." },
                { en: "crazy", ar: "غريب جداً / مبالغ فيه / مجنون", pos: "adj", example: "Some ideas sounded crazy, but they inspired us.", exampleAr: "بعض الأفكار بدت غريبة جداً، لكنها ألهمتنا." },
                { en: "comfort", ar: "راحة / رفاهية", pos: "n", example: "Designing a school bag is about comfort and safety.", exampleAr: "تصميم حقيبة المدرسة يرتكز على الراحة والسلامة." },
                { en: "practical", ar: "عملي / واقعي / قابل للتطبيق", pos: "adj", example: "We need practical solutions that work in real life.", exampleAr: "نحتاج إلى حلول عملية قابلة للتطبيق في الواقع." },
                { en: "ideation", ar: "توليد الأفكار وابتكارها", pos: "n", example: "Monday was ideation day in our project.", exampleAr: "كان يوم الاثنين مخصصاً لتوليد وابتكار الأفكار في مشروعنا." },
                { en: "point of view", ar: "وجهة نظر", pos: "n", example: "Designers look at problems from different points of view.", exampleAr: "ينظر المصممون إلى المشكلات من وجهات نظر متعددة ومختلفة." }
            ]
        },
        {
            category: "Lesson 1 Vocabulary (SB pages 73 & 74)",
            words: [
                { en: "problem-solver", ar: "حلّال المشكلات / أداة حل المشاكل", pos: "n", example: "Designers are everyday problem-solvers.", exampleAr: "المصممون هم حلّالو المشكلات في حياتنا اليومية." },
                { en: "objects", ar: "أشياء / أغراض", pos: "n", example: "We use many everyday objects in our classrooms.", exampleAr: "نستخدم العديد من الأغراض اليومية في فصولنا الدراسية." },
                { en: "building", ar: "مبنى / عمارة", pos: "n", example: "The architect designed a modern eco-friendly building.", exampleAr: "صمم المهندس المعماري مبنى حديثاً صديقاً للبيئة." },
                { en: "app", ar: "تطبيق هاتف / برنامج", pos: "n", example: "They downloaded an app to organize their daily tasks.", exampleAr: "قاموا بتحميل تطبيق لتنظيم مهامهم اليومية." },
                { en: "model", ar: "نموذج مجسم", pos: "n", example: "The student built a 3D model of the school cafeteria.", exampleAr: "صنع الطالب نموذجاً مجسماً ثلاثي الأبعاد لكافتيريا المدرسة." },
                { en: "curiosity", ar: "حب الاستطلاع / فضول معرفي", pos: "n", example: "Curiosity drives inventors to discover new things.", exampleAr: "الفضول المعرفي يدفع المخترعين لاكتشاف أشياء جديدة." },
                { en: "skill", ar: "مهارة", pos: "n", example: "Active listening is an essential communication skill.", exampleAr: "الاستماع الفعال مهارة تواصل أساسية ولا غنى عنها." },
                { en: "function", ar: "وظيفة / غرض الشيء", pos: "n", example: "A designer always focuses on the function of the object.", exampleAr: "يركز المصمم دائماً على وظيفة الشيء والغرض منه." },
                { en: "interact", ar: "يتفاعل مع", pos: "v", example: "How do students interact with this device?", exampleAr: "كيف يتفاعل الطلاب مع هذا الجهاز؟" },
                { en: "safety", ar: "أمان / سلامة", pos: "n", example: "Safety is our top priority when designing school bags.", exampleAr: "السلامة هي أولويتنا القصوى عند تصميم حقائب المدرسة." },
                { en: "style", ar: "شكل / أسلوب / مظهر", pos: "n", example: "A backpack should have both nice style and high comfort.", exampleAr: "يجب أن تتمتع حقيبة الظهر بمظهر أنيق وراحة عالية." },
                { en: "imagining", ar: "تخيّل / تصور", pos: "n", example: "Imagining new possibilities helps us innovate.", exampleAr: "تخيل إمكانيات جديدة يساعدنا على الابتكار." },
                { en: "weight", ar: "وزن / ثقل", pos: "n", example: "The light weight of the bag protects the student's back.", exampleAr: "الوزن الخفيف للحقيبة يحمي ظهر الطالب." },
                { en: "backpack", ar: "حقيبة ظهر", pos: "n", example: "Put your heavy books inside your backpack.", exampleAr: "ضع كتبك الثقيلة داخل حقيبة ظهرك." },
                { en: "mind", ar: "عقل / ذهن", pos: "n", example: "A creative mind can transform simple materials.", exampleAr: "العقل المبدع يستطيع تحويل المواد البسيطة إلى أشياء مبهرة." },
                { en: "outfit", ar: "طقم ملابس / زي كامل", pos: "n", example: "She wore a comfortable outfit for the workshop.", exampleAr: "ارتدت زياً مريحاً لحضور ورشة العمل." },
                { en: "space", ar: "مساحة / فراغ", pos: "n", example: "There is enough space for your laptop inside the bag.", exampleAr: "توجد مساحة كافية لحاسوبك المحمول داخل الحقيبة." },
                { en: "organize", ar: "ينظم / يرتب", pos: "v", example: "Organize your schedule to finish homework on time.", exampleAr: "نظّم جدول مواعيدك لتنهي واجباتك في الوقت المحدد." }
            ]
        },
        {
            category: "Lesson 2 Vocabulary (SB pages 75 & 76)",
            words: [
                { en: "impossible", ar: "مستحيل", pos: "adj", example: "Nothing is impossible if you work hard in a team.", exampleAr: "لا شيء مستحيل إذا عملت بجد ضمن فريق متعاون." },
                { en: "successful", ar: "ناجح", pos: "adj", example: "The design sprint was extremely successful.", exampleAr: "كانت ورشة التصميم ناجحة للغاية وحققت أهدافها." },
                { en: "layout", ar: "تصميم المخطط / توزيع المكان", pos: "n", example: "They redesigned the cafeteria layout to speed up service.", exampleAr: "أعادوا تصميم مخطط الكافتيريا لتسريع تقديم الخدمة." },
                { en: "fancy", ar: "فاخر / راقٍ / مزخرف", pos: "adj", example: "They made a simple model, nothing fancy.", exampleAr: "صنعوا نموذجاً بسيطاً، دون أي بهرجة أو زخرفة معقدة." },
                { en: "define", ar: "يحدد بدقة / يعرّف", pos: "v", example: "On Sunday, we defined our main challenge.", exampleAr: "يوم الأحد، حددنا التحدي الرئيسي لمشروعنا بدقة." },
                { en: "modify", ar: "يُعدّل / يحسّن", pos: "v", example: "Engineers modify the prototype based on user feedback.", exampleAr: "يقوم المهندسون بتعديل النموذج الأولي بناءً على آراء المستخدمين." },
                { en: "interview", ar: "يجري مقابلة شخصية", pos: "v", example: "We interviewed 20 students to understand their needs.", exampleAr: "أجرينا مقابلات مع 20 طالباً لفهم احتياجاتهم الحقيقية." },
                { en: "express", ar: "سريع ومباشر (قطار أو خط خدمة)", pos: "adj", example: "The cafeteria opened an express line for salads.", exampleAr: "افتتحت الكافتيريا مساراً سريعاً مخصصاً للسلطات." },
                { en: "cafeteria", ar: "كافتيريا / مقصف مدرسي", pos: "n", example: "Students eat their lunch in the school cafeteria.", exampleAr: "يتناول الطلاب وجبة الغداء في كافتيريا المدرسة." }
            ]
        }
    ],

    // Pop Quiz as presented in El-Moasser
    popQuiz: {
        title: "Pop Quiz: Complete the sentences",
        boxWords: ["prototype", "stylish", "practical", "schedule", "view"],
        questions: [
            { id: 1, sentence: "The manager has a busy {blank}, so he can't meet you today.", answer: "schedule", ar: "المدير لديه جدول مواعيد مزدحم، لذلك لا يمكنه مقابلتك اليوم." },
            { id: 2, sentence: "Young ladies like to wear {blank} clothes.", answer: "stylish", ar: "الشابات والفتيات يحببن ارتداء ملابس أنيقة وعصرية." },
            { id: 3, sentence: "His {blank} solution helped us solve the serious problem.", answer: "practical", ar: "ساعدنا حله العملي على حل المشكلة المعقدة والخطيرة." },
            { id: 4, sentence: "Everyone has a different point of {blank} to deal with problems.", answer: "view", ar: "لكل شخص وجهة نظر مختلفة في التعامل مع المشكلات." }
        ]
    },

    // Irregular verb conjugations
    verbs: [
        { base: "meet", past: "met", pp: "met", meaning: "يقابل" },
        { base: "become", past: "became", pp: "become", meaning: "يصبح" },
        { base: "mean", past: "meant", pp: "meant", meaning: "يعني / يقصد" },
        { base: "find", past: "found", pp: "found", meaning: "يجد" },
        { base: "forget", past: "forgot", pp: "forgotten", meaning: "ينسى" }
    ],

    // Exact dictionary definitions
    definitions: [
        { term: "creativity", definition: "ability to make new ideas", translation: "ابتكار - إبداع" },
        { term: "point of view", definition: "a way of looking at something", translation: "وجهة نظر" },
        { term: "prototype", definition: "a simple model of a design", translation: "نموذج أولي" },
        { term: "schedule", definition: "a list of planned activities", translation: "برنامج - جدول مواعيد" },
        { term: "solution", definition: "a way to solve a problem", translation: "حل لمشكلة" },
        { term: "crazy", definition: "very unusual", translation: "غريب / غير معتاد" },
        { term: "practical", definition: "effective or suitable", translation: "عملي - تطبيقي" },
        { term: "sprint", definition: "a process of solving complex problems", translation: "فترة / جلسة التصميم المكثفة" },
        { term: "stylish", definition: "attractive in a fashionable way", translation: "عصري / أنيق" },
        { term: "ideation", definition: "brainstorming or coming up with ideas", translation: "توليد الأفكار وابتكارها" }
    ],

    // Synonyms and Antonyms
    synonyms: [
        { word: "well-designed", meaning: "مصمم جيداً", synonym: "neat / well-made", antonym: "badly-designed" },
        { word: "everyday", meaning: "يومي / معتاد", synonym: "daily / regular", antonym: "irregular / occasional" },
        { word: "stylish", meaning: "أنيق / عصري", synonym: "smart / fashionable / trendy", antonym: "old-fashioned" },
        { word: "curiosity", meaning: "حب الاستطلاع", synonym: "interest / concern", antonym: "disinterest" },
        { word: "solution", meaning: "حل", synonym: "answer / explanation", antonym: "question / problem" },
        { word: "simple", meaning: "بسيط / سهل", synonym: "plain / easy", antonym: "complicated / complex" },
        { word: "practical", meaning: "عملي / واقعي", synonym: "realistic", antonym: "impractical / imaginative" },
        { word: "successful", meaning: "ناجح", synonym: "lucky / fortunate", antonym: "unsuccessful / loser" },
        { word: "safety", meaning: "أمان / سلامة", synonym: "security", antonym: "danger" }
    ],

    // Prefixes and Suffixes
    affixes: [
        { affix: "-er", type: "suffix", function: "تكوّن الاسم من الفعل (يدل على الفاعل)", examples: "solver (حلّال المشاكل), designer (مصمم)" },
        { affix: "inter-", type: "prefix", function: "تكوّن الفعل بمعنى تفاعل متبادل", examples: "interact (يتفاعل مع)" },
        { affix: "-able", type: "suffix", function: "تكوّن الصفة من الاسم أو الفعل", examples: "suitable (مناسب), comfortable (مريح)" },
        { affix: "un-", type: "prefix", function: "تفيد عكس المعنى ونفي الصفة", examples: "unusual (غير عادي / استثنائي)" },
        { affix: "im-", type: "prefix", function: "تفيد عكس المعنى", examples: "impossible (مستحيل)" },
        { affix: "-ish", type: "suffix", function: "تكوّن الصفة من الاسم", examples: "stylish (أنيق / ذو أسلوب جذاب)" }
    ],

    // General Notes on Reading and Listening
    confusionNotes: [
        {
            title: "الفرق بين weather و whether",
            titleEn: "weather vs whether",
            titleAr: "الفرق بين حالة الطقس (weather) وأداة التخيير (whether)",
            note: "الكلمة weather تعني (حالة الجو أو الطقس). بينما whether أداة ربط بمعنى (سواء / ما إذا) وتستخدم للاختيار بين بدائل أو نقل الأسئلة غير المباشرة.",
            examples: [
                { en: "What's the weather like today?", ar: "كيف تبدو حالة الطقس اليوم؟" },
                { en: "It doesn't matter whether Ghada will come or not.", ar: "لا يهم ما إذا كانت غادة ستأتي أم لا." }
            ]
        },
        {
            title: "الفرق بين beside و besides",
            titleEn: "beside vs besides",
            titleAr: "الفرق بين بجانب (beside) وبالإضافة إلى (besides)",
            note: "الكلمة beside حرف جر بمعنى (بجانب / بجوار = next to). بينما besides رابط بمعنى (بالإضافة إلى ذلك = in addition to) ويليها اسم أو فعل مضاف له V-ing.",
            examples: [
                { en: "I'm sitting beside Ali in the class.", ar: "أنا أجلس بجوار علي في الفصل الدراسي." },
                { en: "Besides style, what is important when designing a backpack?", ar: "بالإضافة إلى المظهر والشكل، ما هو الشيء الهام عند تصميم حقيبة الظهر؟" },
                { en: "I want to go to the cinema besides doing the shopping.", ar: "أريد الذهاب إلى السينما بالإضافة إلى القيام بالتسوق." }
            ]
        }
    ],

    // Expressions and Prepositions
    expressions: [
        { en: "easy to understand", ar: "سهل الفهم والتطبيق" },
        { en: "design thinking", ar: "التفكير التصميمي / صياغة الحلول" },
        { en: "fun to use", ar: "ممتع للاستخدام" },
        { en: "well-designed", ar: "مصمم بإتقان وجودة" },
        { en: "make it better", ar: "يطورها / يحسنها" },
        { en: "take too long to", ar: "يستغرق وقتاً طويلاً لـ" },
        { en: "relationship problems", ar: "مشاكل العلاقات الشخصية" },
        { en: "the hardest part of", ar: "الجزء الأصعب من" }
    ],

    prepositions: [
        { en: "function of", ar: "وظيفة لـ / غرض من" },
        { en: "interested in", ar: "مهتم بـ" },
        { en: "interact with", ar: "يتفاعل مع" },
        { en: "test with", ar: "يجري اختباراً على" },
        { en: "in the same way", ar: "بنفس الطريقة" },
        { en: "in five days", ar: "في خلال خمسة أيام" },
        { en: "afraid of", ar: "خائف من" },
        { en: "designed for", ar: "مُصمم من أجل" }
    ],

    // StoryPages for the 3D interactive storybook (triptych single-image rule)
    storyPages: [
        {
            titleEn: "Chapter 1: Think Like a Designer",
            titleAr: "الفصل الأول: فكّر كالمصممين",
            textEn: "Designers are everyday problem-solvers. They create things that are useful, easy to understand, and fun to use. Whether it is a building, a phone app, or a daily schedule, a designer asks important questions: 'Who will use it?', 'What do they need?', and 'How can I make it better?' Great designers don't just draw pictures or make stylish objects; they explore ideas from different points of view and test simple models called prototypes.",
            textAr: "المصممون هم حلّالو المشكلات في حياتنا اليومية. إنهم يصنعون أشياء مفيدة، سهلة الفهم، وممتعة للاستخدام. سواء كان ذلك مبنى، تطبيق هاتف، أو جدول مواعيد يومي، يطرح المصمم أسئلة مهمة: «من سيستخدمه؟»، «ماذا يحتاجون؟»، و«كيف يمكنني جعله أفضل؟». المصممون العظماء لا يرسمون لوحات أو يصنعون أشياء أنيقة فحسب، بل يستكشفون الأفكار من وجهات نظر مختلفة ويختبرون نماذج بسيطة تسمى النماذج الأولية.",
            captionEn: "Exploring ideas from multiple points of view to solve real human problems.",
            captionAr: "استكشاف الأفكار من وجهات نظر متعددة لحل مشكلات البشر الحقيقية.",
            vocabChips: ["Problem-solvers", "Prototypes", "Point of view", "Creativity"]
        },
        {
            titleEn: "Chapter 2: Function, Comfort, and Mindset",
            titleAr: "الفصل الثاني: الوظيفة، الراحة، وعقلية الابتكار",
            textEn: "Creativity, listening, and curiosity are vital skills in design. Designers think deeply about the function of objects and how people interact with them. For example, designing a school backpack is not just about attractive style; it is equally about comfort, weight distribution, interior space, and student safety. In the same way, design thinking means caring about people and imagining better solutions. Anyone can be a designer—all you need is a creative mind and a desire to improve the world.",
            textAr: "يُعد الإبداع، وحسن الاستماع، والفضول المعرفي مهارات حيوية في التصميم. يفكر المصممون بعمق في وظيفة الأشياء وكيفية تفاعل الناس معها. على سبيل المثال، لا يقتصر تصميم حقيبة المدرسة على المظهر الأنيق؛ بل يتعلق بالراحة، وتوزيع الوزن، والمساحة الداخلية، وسلامة الطالب. وبنفس الطريقة، يعني التفكير التصميمي الاهتمام بالناس وتخيل حلول أفضل. يمكن لأي شخص أن يصبح مصمماً، فكل ما تحتاجه هو عقل مبدع ورغبة في تحسين العالم من حولك.",
            captionEn: "Balancing comfort, safety, and function with creative style.",
            captionAr: "الموازنة بين الراحة والسلامة والوظيفة مع الأسلوب الإبداعي.",
            vocabChips: ["Function", "Comfort", "Safety", "Creative mind"]
        },
        {
            titleEn: "Chapter 3: The 5-Day Design Sprint Challenge",
            titleAr: "الفصل الثالث: تحدي ورشة التصميم في 5 أيام",
            textEn: "Sarah and her school team joined an exciting 5-day design sprint to solve a big challenge: 'How might we help students eat healthier lunches at school?' On Sunday, they defined the problem and interviewed 20 students, discovering that getting healthy food took too long. On Monday, they brainstormed over 50 ideas—some were crazy, like a robot chef, while others were practical. On Tuesday and Wednesday, they built prototypes for a new cafeteria layout and an express line. On Thursday, they tested it with real students, solving a real problem in record time!",
            textAr: "انضمت سارة وفريقها المدرسي إلى ورشة تصميم مثيرة مدتها 5 أيام لحل تحدٍ كبير: «كيف يمكننا مساعدة الطلاب على تناول وجبات غداء صحية أكثر في المدرسة؟». يوم الأحد، حددوا المشكلة وأجروا مقابلات مع 20 طالباً، واكتشفوا أن الحصول على طعام صحي يستغرق وقتاً طويلاً. يوم الاثنين، عصفوا ذهنياً بأكثر من 50 فكرة—بعضها كان غريباً مثل طاهٍ آلي، وبعضها كان عملياً. يومي الثلاثاء والأربعاء، بنوا نماذج أولية لمخطط كافتيريا جديد وخط خدمة سريع. ويوم الخميس، اختبروه مع طلاب حقيقيين، فحلوا مشكلة حقيقية في وقت قياسي!",
            captionEn: "Rapid brainstorming and prototyping to build a faster, healthier cafeteria.",
            captionAr: "العصف الذهني وبناء النماذج الأولية لحل مشكلة كافتيريا المدرسة بسرعة وكفاءة.",
            vocabChips: ["Design sprint", "Brainstorm", "Ideation", "Practical solution"]
        }
    ],

    // Dialogue data for DialoguePlayer
    dialogue: {
        banner: {
            title: "🗣️ Speaking Practice: Thinking Like a Designer",
            subtitle: "حوار تدريبي تفاعلي بين سارة وطارق حول أسرار التفكير التصميمي وتجربة ورشة الـ 5 أيام 💡"
        },
        lines: [
            {
                speaker: "Tarek",
                speakerAr: "طارق",
                avatar: "👨‍🎓",
                en: "Hi Sarah! What does it actually mean to think like a designer?",
                ar: "مرحباً يا سارة! ماذا يعني حقاً أن نفكر مثل المصممين؟"
            },
            {
                speaker: "Sarah",
                speakerAr: "سارة",
                avatar: "👩‍🎨",
                en: "It means creating useful, creative solutions by exploring ideas from different points of view.",
                ar: "ذلك يعني ابتكار حلول مفيدة ومبدعة من خلال استكشاف الأفكار من وجهات نظر مختلفة."
            },
            {
                speaker: "Tarek",
                speakerAr: "طارق",
                avatar: "👨‍🎓",
                en: "That sounds awesome! Did you really solve your school problem in just five days during the sprint?",
                ar: "هذا رائع! هل حقاً قمتم بحل مشكلة مدرستكم في خمسة أيام فقط خلال ورشة التصميم؟"
            },
            {
                speaker: "Sarah",
                speakerAr: "سارة",
                avatar: "👩‍🎨",
                en: "Yes! First, we defined the challenge on Sunday. Next, we brainstormed over 50 ideas on Monday.",
                ar: "نعم! أولاً، حددنا التحدي يوم الأحد. بعد ذلك، عصفنا ذهنياً بأكثر من 50 فكرة يوم الاثنين."
            },
            {
                speaker: "Tarek",
                speakerAr: "طارق",
                avatar: "👨‍🎓",
                en: "And how did you know which idea was practical?",
                ar: "وكيف عرفتم أي الأفكار كانت عملية وقابلة للتطبيق؟"
            },
            {
                speaker: "Sarah",
                speakerAr: "سارة",
                avatar: "👩‍🎨",
                en: "We built a simple prototype of an express food line and tested it with real students on Thursday!",
                ar: "قمنا ببناء نموذج أولي بسيط لخط طعام سريع واختبرناه مع طلاب حقيقيين يوم الخميس!"
            },
            {
                speaker: "Tarek",
                speakerAr: "طارق",
                avatar: "👨‍🎓",
                en: "Brilliant! So anyone can be a problem-solver with curiosity and teamwork.",
                ar: "عبقري! إذن يمكن لأي شخص أن يكون حلّالاً للمشكلات بالفضول والعمل الجماعي."
            }
        ]
    },

    // Grammar Content HTML (Sequence Adverbs & Imperative forms)
    grammarContentHtml: `
        <div class="grammar-section">
            <div class="grammar-card">
                <h3 class="grammar-topic-title">⚡ 1. Sequence Adverbs (ظروف التسلسل الزمني والترتيب)</h3>
                <p class="grammar-desc">نستخدم ظروف التسلسل الزمني <strong>Sequence Adverbs</strong> لتنظيم وشرح خطوات عملية ما أو سرد الأحداث بالترتيب المنطقي.</p>
                
                <div class="rules-table-wrapper" style="overflow-x: auto; margin-top: 15px;">
                    <table class="rules-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--bg-card); color: var(--accent-primary);">
                                <th style="padding: 12px; border: 1px solid var(--border-color);">المرحلة</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">ظروف التسلسل (Sequence Adverbs)</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">المعنى والاستخدام</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">أمثلة توضيحية</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">البداية (Beginning)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">First, / Firstly,</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">في البداية / أولاً (لبدء العملية)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);"><strong>First</strong>, define the problem clearly before designing.</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">المتابعة (Middle steps)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">Next, / Then, / After that,</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">التالي / ثم / بعد ذلك (لتسلسل الخطوات)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);"><strong>Next</strong>, brainstorm as many ideas as possible. <strong>Then</strong>, build a prototype.</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">النهاية والختام (End)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">Finally, / Lastly, / In conclusion,</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">أخيراً / في الختام (لإنهاء العملية)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);"><strong>Finally</strong>, test the product with real users to get feedback.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="note-box" style="margin-top: 15px; padding: 12px; background: rgba(255, 193, 7, 0.1); border-right: 4px solid #ffc107; border-radius: 6px;">
                    💡 <strong>ملاحظة ترقيم هامة:</strong> عادةً ما نضع فاصلة <code>,</code> بعد ظرف التسلسل الزمني عندما يأتي في بداية الجملة (مثال: <em>First, identify the problem.</em>).
                </div>
            </div>

            <div class="grammar-card" style="margin-top: 25px;">
                <h3 class="grammar-topic-title">⚡ 2. The Imperative (أسلوب الأمر والتعليمات)</h3>
                <p class="grammar-desc">نستخدم صيغة الأمر <strong>Imperative</strong> لإعطاء التعليمات (Instructions)، التوجيهات (Directions)، أو الأوامر والنصائح المباشرة.</p>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin-top: 15px;">
                    <!-- Positive Imperative -->
                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #4caf50;">
                        <h4 style="color: #4caf50; margin-bottom: 8px;">✅ الأمر الإيجابي (Positive Imperative)</h4>
                        <p>يبدأ دائماً بـ <strong>مصدر الفعل (Infinitive)</strong> بدون أي إضافات:</p>
                        <p style="direction: ltr; font-weight: bold; margin: 8px 0; color: var(--accent-primary);">[Inf. مصدر الفعل] + باقي الجملة</p>
                        <ul style="padding-right: 20px; line-height: 1.8;">
                            <li><strong>Organize</strong> your time to have a successful life.</li>
                            <li><strong>Brainstorm</strong> as many creative ideas as you can.</li>
                            <li><strong>Listen</strong> carefully to user feedback.</li>
                        </ul>
                    </div>

                    <!-- Negative Imperative -->
                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #f44336;">
                        <h4 style="color: #f44336; margin-bottom: 8px;">⛔ الأمر المنفي والنهي (Negative Imperative)</h4>
                        <p>يبدأ بـ <strong>Don't + مصدر الفعل</strong> أو <strong>Never + مصدر الفعل</strong> للتحذير والنهي القاطع:</p>
                        <p style="direction: ltr; font-weight: bold; margin: 8px 0; color: #f44336;">Don't / Never + [Inf. مصدر الفعل] + باقي الجملة</p>
                        <ul style="padding-right: 20px; line-height: 1.8;">
                            <li><strong>Don't judge</strong> ideas during brainstorming.</li>
                            <li><strong>Don't be</strong> afraid to make mistakes.</li>
                            <li><strong>Never waste</strong> your valuable time. (نهي شديد وقاطع)</li>
                        </ul>
                    </div>
                </div>

                <div class="note-box" style="margin-top: 15px; padding: 12px; background: rgba(33, 150, 243, 0.1); border-right: 4px solid #2196f3; border-radius: 6px;">
                    🎯 <strong>معادلات التحويل في سؤال Rewrite:</strong>
                    <ul style="margin-top: 5px; padding-right: 20px; line-height: 1.7;">
                        <li>You should help your friends. ➔ <strong>Help</strong> your friends.</li>
                        <li>I advise you not to spend much time on screens. ➔ <strong>Don't spend</strong> much time on screens.</li>
                        <li>Always arrive early. ➔ <strong>Never arrive</strong> late.</li>
                    </ul>
                </div>
            </div>
        </div>
    `,

    // 35 Questions covering the complete lesson content strictly aligned with El-Moasser
    quiz: [
        // Vocabulary & Definitions
        {
            id: 1,
            question: "A __________ is a simple model of a design built to test ideas before making the final product.",
            options: ["schedule", "prototype", "building", "cafeteria"],
            correctAnswer: 1,
            explanation: "النموذج الأولي (prototype) هو مجسم بسيط لاختبار التصميم قبل الإنتاج النهائي."
        },
        {
            id: 2,
            question: "__________ is the ability to invent and make new, original ideas.",
            options: ["Creativity", "Safety", "Weight", "Space"],
            correctAnswer: 0,
            explanation: "الإبداع والابتكار (Creativity) هو القدرة على توليد أفكار جديدة ومميزة."
        },
        {
            id: 3,
            question: "The word 'stylish' means attractive and __________.",
            options: ["ugly", "old-fashioned", "fashionable", "impossible"],
            correctAnswer: 2,
            explanation: "كلمة stylish تعني عصري وأنيق ومرادفها fashionable."
        },
        {
            id: 4,
            question: "To __________ means to think of lots of possibilities and ideas quickly with your team.",
            options: ["interview", "brainstorm", "destroy", "forget"],
            correctAnswer: 1,
            explanation: "العصف الذهني (brainstorm) هو توليد واقتراح أكبر قدر من الأفكار بسرعة."
        },
        {
            id: 5,
            question: "It is important for a designer's solution to be __________ and effective, not just crazy.",
            options: ["impossible", "practical", "complex", "badly-designed"],
            correctAnswer: 1,
            explanation: "الحل يجب أن يكون عملياً وواقعياً (practical) وقابلاً للتطبيق بنجاح."
        },
        {
            id: 6,
            question: "A design __________ is a fast 5-day process for solving complex problems with a team.",
            options: ["walk", "marathon", "sprint", "vacation"],
            correctAnswer: 2,
            explanation: "ورشة التصميم السريعة تسمى design sprint ومدتها المعتادة 5 أيام."
        },
        {
            id: 7,
            question: "A __________ is a list of planned activities and appointments.",
            options: ["schedule", "layout", "outfit", "prototype"],
            correctAnswer: 0,
            explanation: "جدول المواعيد وبرنامج الأنشطة يسمى schedule."
        },
        {
            id: 8,
            question: "Great designers explore ideas from different __________ of view.",
            options: ["points", "sights", "looks", "eyes"],
            correctAnswer: 0,
            explanation: "التعبير 'وجهات نظر' هو points of view."
        },
        {
            id: 9,
            question: "A way to solve a difficult problem is called a __________.",
            options: ["question", "conflict", "solution", "danger"],
            correctAnswer: 2,
            explanation: "حل المشكلة هو solution."
        },
        {
            id: 10,
            question: "Designing a school backpack is not just about style; it's also about __________ and safety.",
            options: ["comfort", "laziness", "danger", "disinterest"],
            correctAnswer: 0,
            explanation: "تصميم الحقيبة المدرسية يركز على الراحة (comfort) والسلامة."
        },

        // Synonyms, Antonyms & Affixes
        {
            id: 11,
            question: "The word 'solution' is the antonym (opposite) of __________.",
            options: ["answer", "problem", "explanation", "result"],
            correctAnswer: 1,
            explanation: "عكس كلمة حل (solution) هو مشكلة (problem)."
        },
        {
            id: 12,
            question: "The word 'complex' is the opposite of __________.",
            options: ["simple", "difficult", "hard", "complicated"],
            correctAnswer: 0,
            explanation: "عكس معقد (complex) هو بسيط وسهل (simple)."
        },
        {
            id: 13,
            question: "The suffix '-er' in the word 'designer' turns the verb 'design' into a/an __________.",
            options: ["verb", "adverb", "noun", "adjective"],
            correctAnswer: 2,
            explanation: "اللاحقة '-er' تحول الفعل إلى اسم فاعل (designer = مُصمم)."
        },
        {
            id: 14,
            question: "The prefix 'im-' in the word 'impossible' gives the __________ of the word.",
            options: ["synonym", "opposite", "noun form", "adverb"],
            correctAnswer: 1,
            explanation: "البادئة 'im-' تعطي المعنى المعاكس (possible ➔ impossible)."
        },
        {
            id: 15,
            question: "The suffix '-ish' turns the noun 'style' into a/an __________.",
            options: ["adjective", "noun", "verb", "preposition"],
            correctAnswer: 0,
            explanation: "اللاحقة '-ish' تحول الاسم إلى صفة (stylish = أنيق)."
        },
        {
            id: 16,
            question: "The synonym of 'curiosity' is __________.",
            options: ["boredom", "interest", "danger", "dislike"],
            correctAnswer: 1,
            explanation: "مرادف الفضول وحب الاستطلاع (curiosity) هو الاهتمام (interest)."
        },
        {
            id: 17,
            question: "The antonym of 'successful' is __________.",
            options: ["lucky", "fortunate", "unsuccessful", "clever"],
            correctAnswer: 2,
            explanation: "عكس ناجح (successful) هو غير ناجح (unsuccessful)."
        },

        // Language Notes, Expressions & Prepositions
        {
            id: 18,
            question: "What is the __________ like in Cairo today? Is it sunny or cold?",
            options: ["weather", "whether", "feather", "leather"],
            correctAnswer: 0,
            explanation: "حالة الطقس والجو تكتب weather."
        },
        {
            id: 19,
            question: "It doesn't matter __________ you work alone or in a team, you must do your best.",
            options: ["weather", "whether", "neither", "either"],
            correctAnswer: 1,
            explanation: "نستخدم whether بمعنى 'سواء / ما إذا' للربط بين الخيارات."
        },
        {
            id: 20,
            question: "I am sitting __________ my best friend Omar in the English class.",
            options: ["beside", "besides", "except", "instead"],
            correctAnswer: 0,
            explanation: "كلمة beside تعني 'بجانب / بجوار' (= next to)."
        },
        {
            id: 21,
            question: "__________ style, what is important when choosing your new school bag?",
            options: ["Beside", "Besides", "Behind", "Between"],
            correctAnswer: 1,
            explanation: "كلمة Besides تعني 'بالإضافة إلى ذلك' ويليها اسم أو V-ing."
        },
        {
            id: 22,
            question: "Designers study how users __________ with their new application.",
            options: ["interact", "act", "prevent", "distract"],
            correctAnswer: 0,
            explanation: "يتفاعل مع المستخدمين هي interact with."
        },
        {
            id: 23,
            question: "The school team is very interested __________ design thinking.",
            options: ["at", "in", "on", "with"],
            correctAnswer: 1,
            explanation: "التعبير 'مهتم بـ' يأخذ حرف الجر in (interested in)."
        },
        {
            id: 24,
            question: "The students were able to solve the cafeteria problem __________ five days.",
            options: ["on", "at", "in", "by"],
            correctAnswer: 2,
            explanation: "في غضون أو خلال فترة زمنية نستخدم in (in five days)."
        },

        // Grammar: Sequence Adverbs
        {
            id: 25,
            question: "__________, identify the problem by interviewing users before doing anything.",
            options: ["Finally", "First", "After that", "Lastly"],
            correctAnswer: 1,
            explanation: "لبدء العملية والخطوة الأولى نستخدم First أو Firstly."
        },
        {
            id: 26,
            question: "First, define the problem. __________, brainstorm as many ideas as possible.",
            options: ["Finally", "In conclusion", "Then", "Firstly"],
            correctAnswer: 2,
            explanation: "للانتقال للخطوة التالية في التسلسل نستخدم Then أو Next."
        },
        {
            id: 27,
            question: "First we interviewed students. Next we built a prototype. __________, we tested it on Thursday.",
            options: ["Firstly", "At first", "Finally", "Beginning"],
            correctAnswer: 2,
            explanation: "للخطوة الأخيرة والختامية نستخدم Finally."
        },
        {
            id: 28,
            question: "Sequence adverbs help us __________ the steps in a process clearly.",
            options: ["forget", "organize", "destroy", "hide"],
            correctAnswer: 1,
            explanation: "ظروف التسلسل تساعدنا على تنظيم وترتيب خطوات العملية (organize)."
        },

        // Grammar: Imperatives (Positive & Negative)
        {
            id: 29,
            question: "__________ as many ideas as possible during the brainstorming stage.",
            options: ["Brainstorming", "Brainstorms", "Brainstorm", "To brainstorm"],
            correctAnswer: 2,
            explanation: "صيغة الأمر المثبت تبدأ بمصدر الفعل بدون إضافات (Brainstorm)."
        },
        {
            id: 30,
            question: "__________ afraid to share your creative ideas with the team.",
            options: ["Don't", "Not be", "Don't be", "Are not"],
            correctAnswer: 2,
            explanation: "الأمر المنفي مع فعل يكون هو 'Don't be afraid'."
        },
        {
            id: 31,
            question: "__________ the challenge clearly before you start building any model.",
            options: ["Define", "Defining", "Defined", "Defines"],
            correctAnswer: 0,
            explanation: "أمر مثبت يبدأ بمصدر الفعل: Define (حدد المشكلة بوضوح)."
        },
        {
            id: 32,
            question: "__________ waste your time during the design sprint; every minute counts!",
            options: ["Never", "Always", "Ever", "Doesn't"],
            correctAnswer: 0,
            explanation: "نستخدم Never مع المصدر للنهي القاطع والشديد عن إضاعة الوقت."
        },
        {
            id: 33,
            question: "Please, __________ ideas during the early brainstorm meeting.",
            options: ["not judge", "don't judge", "doesn't judge", "not to judge"],
            correctAnswer: 1,
            explanation: "الأمر المنفي بعد Please يبدأ بـ don't + المصدر (don't judge)."
        },

        // Reading & Critical Thinking
        {
            id: 34,
            question: "Why did Sarah's team build a prototype of the express line and cafeteria layout?",
            options: [
                "To sell it for money",
                "To test their ideas with real students",
                "To replace all teachers",
                "Because they had no homework"
            ],
            correctAnswer: 1,
            explanation: "تم بناء النموذج الأولي لاختبار أفكارهم عملياً مع الطلاب في المدرسة."
        },
        {
            id: 35,
            question: "According to the lesson, who can be a designer?",
            options: [
                "Only famous engineers in big companies",
                "Anyone with a creative mind and a desire to improve things",
                "Only people who can draw beautiful pictures",
                "Students who have robot chefs at home"
            ],
            correctAnswer: 1,
            explanation: "أي شخص يمتلك عقلاً مبدعاً ورغبة في تحسين العالم يمكنه أن يفكر كمصمم."
        }
    ]
};

// Aliasing for universal engine compatibility
window.lessonData.questions = window.lessonData.quiz;
