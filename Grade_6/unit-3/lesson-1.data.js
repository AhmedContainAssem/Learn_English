/**
 * Grade 6 - Unit 3: Community Builders (بناة المجتمع)
 * Lesson 1: Jobs that Help the Community (وظائف تخدم المجتمع)
 * Clean, decoupled pure data model for CurriculumRenderer
 */

window.lessonData = {
    id: "grade_6_u3_l1",
    stage: "Grade_6",
    unit: "unit-3",
    lesson: "lesson-1",
    title: "Lesson 1: Jobs that Help the Community",
    arabicTitle: "الدرس الأول: وظائف تخدم المجتمع",
    subtitle: "Mr. Ahmed Assem • Connect 6 (Term 1) • Unit 3: Community Builders",
    description: "تعلم أسماء الوظائف الأساسية في المجتمع ودور كل مهنة، تصريف الأفعال، التعبيرات اللغوية، قصة بناة المجتمع المصورة، ومشغل المحادثة واختبار شامل",

    // 1. Key Vocabulary (المفردات الأساسية)
    keyVocabulary: [
        {
            word: "paramedic",
            translation: "مسعف",
            pos: "noun",
            icon: "🚑",
            example: "A paramedic provides emergency medical care and rushes patients to the hospital.",
            exampleAr: "يقدم المسعف الرعاية الطبية الطارئة وينقل المرضى سريعاً إلى المستشفى."
        },
        {
            word: "architect",
            translation: "مهندس معماري",
            pos: "noun",
            icon: "📐",
            example: "An architect designs safe, modern buildings, schools, and homes for our community.",
            exampleAr: "يصمم المهندس المعماري مباني ومدارس ومنازل حديثة وآمنة لمجتمعنا."
        },
        {
            word: "water resources engineer",
            translation: "مهندس موارد مائية",
            pos: "noun",
            icon: "💧",
            example: "A water resources engineer makes sure everyone has clean running water in their pipes.",
            exampleAr: "يتأكد مهندس الموارد المائية من وصول مياه نظيفة وصالحة للشرب لجميع المنازل عبر الأنابيب."
        },
        {
            word: "mechanic",
            translation: "ميكانيكي",
            pos: "noun",
            icon: "🔧",
            example: "The mechanic checked my father's car and repaired the broken engine.",
            exampleAr: "فحص الميكانيكي سيارة والدي وقام بإصلاح المحرك المعطل."
        },
        {
            word: "tailor",
            translation: "خياط / ترزي",
            pos: "noun",
            icon: "🪡",
            example: "A skilled tailor measures fabric and sews smart clothes and uniforms for customers.",
            exampleAr: "يقيس الخياط الماهر القماش ويخيط ملابس وبدلات أنيقة للزبائن."
        },
        {
            word: "delivery person",
            translation: "عامل توصيل الطلبات",
            pos: "noun",
            icon: "📦",
            example: "The delivery person rides a scooter to bring packages and hot meals right to our door.",
            exampleAr: "يقود عامل التوصيل دراجة نارية لنقل الطرود والوجبات الساخنة مباشرة إلى باب منزلنا."
        },
        {
            word: "street cleaner",
            translation: "عامل نظافة الشوارع",
            pos: "noun",
            icon: "🧹",
            example: "The street cleaner sweeps the streets early in the morning to keep our neighborhood clean and healthy.",
            exampleAr: "يكنس عامل النظافة الشوارع مبكراً في الصباح ليحافظ على حيّنا نظيفاً وصحياً."
        },
        {
            word: "traffic officer",
            translation: "ضابط مرور",
            pos: "noun",
            icon: "👮‍♂️",
            example: "The traffic officer stands at the busy intersection to direct traffic and keep pedestrians safe.",
            exampleAr: "يقف ضابط المرور في المفترق المزدحم لتنظيم حركة المرور والحفاظ على سلامة المشاة."
        }
    ],

    // 2. Lesson Vocabulary (مفردات الدرس التكميلية)
    lessonVocabulary: [
        {
            word: "community",
            translation: "مجتمع / حي سكني",
            pos: "noun",
            icon: "🏘️",
            example: "Everyone works together to make our community stronger and happier.",
            exampleAr: "يتعاون الجميع معاً لجعل مجتمعنا أقوى وأكثر سعادة."
        },
        {
            word: "emergency",
            translation: "حالة طوارئ",
            pos: "noun",
            icon: "🚨",
            example: "Call the emergency number immediately if someone is badly injured.",
            exampleAr: "اتصل برقم الطوارئ فوراً إذا أصيب شخص بجروح خطيرة."
        },
        {
            word: "neighborhood",
            translation: "حي / مجاورة سكنية",
            pos: "noun",
            icon: "🏡",
            example: "We love our friendly neighborhood because all the neighbors help each other.",
            exampleAr: "نحن نحب حيّنا الودود لأن جميع الجيران يساعدون بعضهم البعض."
        },
        {
            word: "vehicle",
            translation: "مركبة (سيارة / شاحنة / دراجة)",
            pos: "noun",
            icon: "🚗",
            example: "Mechanics know how to service all kinds of motor vehicles.",
            exampleAr: "يعرف الميكانيكيون كيفية صيانة وإصلاح جميع أنواع المركبات الآلية."
        },
        {
            word: "engine",
            translation: "محرك",
            pos: "noun",
            icon: "⚙️",
            example: "The car engine makes a strange noise when it needs oil.",
            exampleAr: "يصدر محرك السيارة صوتاً غريباً عندما يحتاج إلى الزيت."
        },
        {
            word: "pipe",
            translation: "ماسورة / أنبوب",
            pos: "noun",
            icon: "🚰",
            example: "Water engineers inspect underground pipes to prevent leaks.",
            exampleAr: "يفحص مهندسو المياه الأنابيب تحت الأرض لمنع التسريبات."
        },
        {
            word: "uniform",
            translation: "زي موحد",
            pos: "noun",
            icon: "👔",
            example: "The traffic officer wears a smart white and black uniform.",
            exampleAr: "يرتدي ضابط المرور زياً رسمياً أنيقاً باللونين الأبيض والأسود."
        },
        {
            word: "safe / safety",
            translation: "آمن / الأمان والسلامة",
            pos: "adj / noun",
            icon: "🛡️",
            example: "Following road rules ensures the safety of all children.",
            exampleAr: "اتباع قواعد الطريق يضمن سلامة جميع الأطفال."
        }
    ],

    // 3. Verbs Conjugations (تصريف الأفعال)
    verbs: {
        regular: [
            { present: "design", past: "designed", translation: "يصمم" },
            { present: "repair / fix", past: "repaired / fixed", translation: "يصلح" },
            { present: "deliver", past: "delivered", translation: "يوصل / يسلم" },
            { present: "direct", past: "directed", translation: "يوجه / ينظم" },
            { present: "clean", past: "cleaned", translation: "ينظف" },
            { present: "help", past: "helped", translation: "يساعد" },
            { present: "inspect", past: "inspected", translation: "يفحص / يفتش" }
        ],
        irregular: [
            { present: "sew", past: "sewed", p_p: "sewn", translation: "يخيط" },
            { present: "drive", past: "drove", p_p: "driven", translation: "يقود" },
            { present: "keep", past: "kept", p_p: "kept", translation: "يحافظ على" },
            { present: "bring", past: "brought", p_p: "brought", translation: "يحضر / يجلب" },
            { present: "make", past: "made", p_p: "made", translation: "يصنع / يجعل" }
        ]
    },

    // 4. Collocations and Expressions (تعبيرات وحروف جر هامة)
    collocations: [
        { phrase: "direct traffic", translation: "ينظم حركة المرور", note: "The traffic officer directs traffic safely at busy roads." },
        { phrase: "keep us safe", translation: "يحافظ على أماننا", note: "Emergency workers keep us safe day and night." },
        { phrase: "in an emergency", translation: "في حالة الطوارئ", note: "A paramedic is the first to arrive in an emergency." },
        { phrase: "on time", translation: "في الموعد المحدد", note: "Delivery persons always try to bring items on time." },
        { phrase: "take care of", translation: "يعتني بـ / يرعى", note: "Nurses and paramedics take care of sick patients." },
        { phrase: "repair engines", translation: "يصلح المحركات", note: "Mechanics use special tools to repair car engines." }
    ],

    // 5. Pop Quiz (تدريب الفهم السريع)
    popQuiz: [
        {
            question: "A __________ designs new buildings and homes for our community.",
            options: ["mechanic", "architect", "tailor", "street cleaner"],
            correct: 1,
            explanation: "المهندس المعماري (architect) هو من يخطط ويصمم المباني والمنازل."
        },
        {
            question: "In an emergency, a __________ gives medical help and drives people to hospital.",
            options: ["paramedic", "tailor", "water engineer", "delivery person"],
            correct: 0,
            explanation: "المسعف (paramedic) يقدم الإسعافات الطارئة وينقل المرضى للمستشفى."
        },
        {
            question: "The __________ stands in the street to direct traffic and prevent accidents.",
            options: ["mechanic", "traffic officer", "tailor", "architect"],
            correct: 1,
            explanation: "ضابط المرور (traffic officer) ينظم سير السيارات ويمنع الحوادث."
        },
        {
            question: "A delivery person brings packages __________ so customers don't wait.",
            options: ["on time", "late", "broken", "dirty"],
            correct: 0,
            explanation: "التعبير الصحيح هو 'on time' أي في الموعد المحدد."
        }
    ],

    // 6. Interactive 3D StoryBook (صفحات القصة المصورة التفاعلية)
    storyPages: [
        {
            titleEn: "Scene 1: Everyday Community Heroes",
            titleAr: "المشهد الأول: أبطال المجتمع اليوميون",
            textEn: "Every day in our vibrant community, hardworking people step out to make our lives better, safer, and cleaner. When you walk down the street, you see street cleaners sweeping the pathways before sunrise. Delivery drivers ride through the neighborhoods carrying letters, medicine, and food on time. Each worker has an indispensable role in keeping our city running smoothly and happily.",
            translation: "في كل يوم بمجتمعنا المفعم بالحيوية، يخرج رجال ونساء مخلصون لجعل حياتنا أفضل وأكثر أماناً ونظافة. عندما تسير في الشارع، ترى عمال النظافة يكنسون الممرات قبل شروق الشمس، وسائقي التوصيل يعبرون الأحياء لنقل الطرود والأدوية والطعام في موعده. كل عامل له دور لا غنى عنه في استمرار ازدهار مدينتنا وسعادتها.",
            image: "../../assets/images/grade_6/unit_3/jobs_community.webp",
            caption: "Diverse community helpers working together to support everyone in town.",
            vocabHighlights: ["community", "street cleaner", "delivery person", "on time"]
        },
        {
            titleEn: "Scene 2: Lifesavers and Skilled Builders",
            titleAr: "المشهد الثاني: منقذو الأرواح والمهندسون البارعون",
            textEn: "When an emergency happens, sirens wail and a rapid ambulance arrives. Dedicated paramedics leap into action, treating sick or injured people and keeping them stable on the way to hospital. Meanwhile, creative architects draw detailed blueprints to build green schools and strong hospitals, while water resources engineers make sure clean water flows safely through city pipes into every home.",
            translation: "عند وقوع حالة طوارئ، تدوي صفارات الإنذار وتصل سيارة الإسعاف مسرعة. يهب المسعفون المخلصون لتقديم الإسعافات اللازمة وعلاج المصابين وتأمينهم في طريقهم للمستشفى. وفي الوقت نفسه، يرسم المهندسون المعماريون مخططات لبناء مدارس ومستشفيات قوية، بينما يتأكد مهندسو الموارد المائية من تدفق المياه النظيفة بأمان عبر الأنابيب إلى كل منزل.",
            image: "../../assets/images/grade_6/unit_3/jobs_community.webp",
            caption: "Paramedics providing rapid medical help and architects planning modern buildings.",
            vocabHighlights: ["paramedic", "architect", "water resources engineer", "emergency"]
        },
        {
            titleEn: "Scene 3: Keeping Things Moving and Looking Smart",
            titleAr: "المشهد الثالث: الحفاظ على استمرار الحركة والأناقة",
            textEn: "At busy intersections, traffic officers guide thousands of cars, buses, and pedestrians, preventing accidents and ensuring everyone travels safely. If a car breaks down, a skilled mechanic picks up his heavy wrenches and fixes the engine in no time. Down the street, the tailor sews comfortable school uniforms and festive suits. Together, all these community builders make our neighborhood thrive!",
            translation: "في تقاطعات الطرق المزدحمة، يوجه ضباط المرور آلاف السيارات والحافلات والمشاة، مانعين الحوادث ومؤمنين سلامة الجميع. وإذا تعطلت سيارة، يمسك الميكانيكي الماهر بمفاتيحه ويصلح المحرك في أسرع وقت. وفي نهاية الشارع، يخيط الترزي الزي المدرسي المريح والبدلات الأنيقة. معاً، يبني كل هؤلاء مجتمعاً رائعاً ومزدهراً!",
            image: "../../assets/images/grade_6/unit_3/jobs_community.webp",
            caption: "Traffic officers directing cars and mechanics servicing vehicle engines.",
            vocabHighlights: ["traffic officer", "mechanic", "tailor", "direct traffic"]
        }
    ],

    // 7. Interactive Listening Dialogue (محادثة الاستماع التفاعلية مع مشغل الصوت)
    dialogue: [
        {
            speaker: "Omar (عمر)",
            en: "Look at that ambulance speeding down our avenue, Youssef! Paramedics have such an important job.",
            ar: "انظر إلى سيارة الإسعاف تلك المسرعة في شارعنا يا يوسف! المسعفون يؤدون عملاً فائق الأهمية.",
            tags: "إعجاب وملاحظة"
        },
        {
            speaker: "Youssef (يوسف)",
            en: "Yes, indeed! Last winter, a paramedic gave my uncle first aid and kept him safe during an emergency.",
            ar: "نعم بالتأكيد! في الشتاء الماضي، قدم مسعف الإسعافات الأولية لعمي وأنقذ حياته أثناء حالة طوارئ.",
            tags: "موقف واقعي"
        },
        {
            speaker: "Salma (سلمى)",
            en: "All community jobs are valuable. My older sister is studying to become a water resources engineer.",
            ar: "جميع مهن المجتمع ذات قيمة عظيمة. أختي الكبرى تدرس لتصبح مهندسة موارد مائية.",
            tags: "طموح مستقبلي"
        },
        {
            speaker: "Omar (عمر)",
            en: "What does a water resources engineer do exactly, Salma?",
            ar: "وماذا يفعل مهندس الموارد المائية تحديداً يا سلمى؟",
            tags: "استفسار"
        },
        {
            speaker: "Salma (سلمى)",
            en: "She designs underground water networks and makes sure clean water reaches every kitchen and school tap.",
            ar: "إنها تصمم شبكات المياه الجوفية وتتأكد من وصول المياه النقية إلى كل صنبور في المطبخ والمدرسة.",
            tags: "شرح وتوضيح"
        },
        {
            speaker: "Youssef (يوسف)",
            en: "That sounds amazing! Just like our uncle who is an architect. He designed our new community sports hall.",
            ar: "هذا رائع حقاً! تماماً مثل عمنا المهندس المعماري؛ لقد صمم الصالة الرياضية الجديدة بمجتمعنا.",
            tags: "مهنة معمارية"
        },
        {
            speaker: "Omar (عمر)",
            en: "And let's not forget the traffic officer at the junction! He directs traffic so we can cross safely to school.",
            ar: "ولا ننسَ ضابط المرور عند المفترق! إنه ينظم حركة السيارات حتى نتمكن من عبور الشارع بأمان للمدرسة.",
            tags: "أمان الطريق"
        },
        {
            speaker: "Salma (سلمى)",
            en: "And the mechanic who fixes school buses! Every single person helps our community grow strong and stay happy.",
            ar: "والميكانيكي الذي يصلح حافلات المدرسة! كل شخص يساعد مجتمعنا على أن ينمو قوياً ويبقى سعيداً.",
            tags: "خاتمة حكيمة"
        }
    ],

    // 8. Comprehensive Mastery Quiz (اختبار شامل 12 سؤال مأخوذ من تدريبات كتاب المعاصر)
    quiz: [
        {
            question: "A __________ helps sick or injured people and takes them to the hospital in an emergency.",
            options: ["paramedic", "mechanic", "tailor", "carpenter"],
            correct: 0,
            explanation: "المسعف (paramedic) يقدم العلاج العاجل وينقل المرضى في سيارة الإسعاف."
        },
        {
            question: "An __________ designs houses, schools, and attractive modern buildings.",
            options: ["architect", "artist", "actor", "author"],
            correct: 0,
            explanation: "المهندس المعماري (architect) هو المتخصص في تصميم المباني والمنشآت."
        },
        {
            question: "A water resources engineer makes sure clean water travels through the __________ to our houses.",
            options: ["wires", "pipes", "ropes", "fences"],
            correct: 1,
            explanation: "تنتقل المياه عبر الأنابيب والمواسير (pipes)."
        },
        {
            question: "When my father's car breaks down, he takes it to the skilled __________.",
            options: ["mechanic", "tailor", "gardener", "chef"],
            correct: 0,
            explanation: "الميكانيكي (mechanic) هو المسؤول عن إصلاح وصيانة السيارات."
        },
        {
            question: "A __________ measures cloth and sews wonderful clothes and jackets for people.",
            options: ["tailor", "doctor", "pilot", "driver"],
            correct: 0,
            explanation: "الخياط (tailor) هو من يقص القماش ويخيط الملابس."
        },
        {
            question: "The delivery person rides a motorbike to bring orders and parcels __________.",
            options: ["on time", "too late", "broken", "dirty"],
            correct: 0,
            explanation: "التعبير 'on time' يعني في الموعد المحدد بدقة."
        },
        {
            question: "The __________ sweeps our streets early every morning to keep the neighborhood clean.",
            options: ["street cleaner", "architect", "water engineer", "mechanic"],
            correct: 0,
            explanation: "عامل نظافة الشوارع (street cleaner) يكنس الطرقات ويحافظ على النظافة العامة."
        },
        {
            question: "The traffic officer stands at the road junction to __________ traffic.",
            options: ["direct", "break", "paint", "sell"],
            correct: 0,
            explanation: "ضابط المرور ينظم ويوجه حركة السير (direct traffic)."
        },
        {
            question: "All these community helpers work hard to keep our neighborhood __________ and safe.",
            options: ["healthy", "dangerous", "noisy", "dirty"],
            correct: 0,
            explanation: "يعمل الجميع للحفاظ على الحي صحياً وآمناً (healthy and safe)."
        },
        {
            question: "A paramedic knows what to do in an __________ to save lives.",
            options: ["emergency", "airport", "exam", "ocean"],
            correct: 0,
            explanation: "في حالة الطوارئ (emergency)، يتدخل المسعف لإنقاذ الأرواح."
        },
        {
            question: "The mechanic uses heavy tools to fix the car's __________.",
            options: ["engine", "books", "shoes", "windows"],
            correct: 0,
            explanation: "يصلح الميكانيكي محرك السيارة (engine)."
        },
        {
            question: "Omar says that everyone in the neighborhood __________ each other to build a great community.",
            options: ["helps", "ignores", "fights", "forgets"],
            correct: 0,
            explanation: "يتعاون ويساعد (helps) الجميع بعضهم لبناء مجتمع ناجح."
        }
    ]
};
