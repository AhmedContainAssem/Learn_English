/**
 * Grade 6 • Unit 1 • Lessons 4 & 5 Data Payload
 * Lesson: A Day in My School • Think and Create (Informal Email & Daily Life Poster)
 * Pure Decoupled Architectural Data - Zero Inline Hardcoding
 */

window.lessonData = {
    id: "g6-u1-l4-5",
    stage: "Grade_6",
    unit: "Unit 1",
    lesson: "Lessons 4 & 5",
    title: "Lessons 4 & 5: A Day in My School • Think and Create",
    description: "استكشف يومًا دراسيًا نموذجيًا في المدارس المصرية، وتعلم مهارة كتابة البريد الإلكتروني غير الرسمي (Informal Email) ومقارنة التعبيرات الرسمية والودية، بالإضافة إلى ملصق الحياة اليومية في محافظة بني سويف واختبار تفاعلي شامل 🎯",

    // 1. Key Vocabulary (Core Exam Words)
    keyVocabulary: [
        {
            word: "take out books",
            phonetic: "/teɪk aʊt bʊks/",
            partOfSpeech: "phrase / verb",
            arabic: "يخرج الكتب",
            example: "The teacher asks all students to take out books and open page 45."
        },
        {
            word: "pack schoolbag",
            phonetic: "/pæk ˈskuːlbæɡ/",
            partOfSpeech: "phrase / verb",
            arabic: "يجهز [يحزم] الحقيبة المدرسية",
            example: "I always pack my schoolbag with my notebooks before going to bed."
        },
        {
            word: "salute the flag",
            phonetic: "/səˈluːt ðə flæɡ/",
            partOfSpeech: "phrase / verb",
            arabic: "يحيى العلم",
            example: "Every morning, Egyptian students stand in lines to salute the flag."
        },
        {
            word: "play in the playground",
            phonetic: "/pleɪ ɪn ðə ˈpleɪɡraʊnd/",
            partOfSpeech: "phrase / verb",
            arabic: "يلعب في فناء المدرسة",
            example: "Children love to play in the playground during their morning break."
        }
    ],

    // 2. Extra Vocabulary (Supporting Exam Vocabulary)
    lessonVocabulary: [
        {
            word: "typical",
            phonetic: "/ˈtɪpɪkl/",
            partOfSpeech: "adjective",
            arabic: "نموذجي - نمطي",
            example: "A typical school day in Egypt starts early at 7:30 in the morning."
        },
        {
            word: "normal",
            phonetic: "/ˈnɔːml/",
            partOfSpeech: "adjective",
            arabic: "طبيعي - عادي",
            example: "It is normal to feel a bit tired after a busy day of studying."
        },
        {
            word: "national anthem",
            phonetic: "/ˈnæʃnəl ˈænθəm/",
            partOfSpeech: "noun",
            arabic: "النشيد الوطني",
            example: "Students sing the national anthem proudly in the school morning assembly."
        },
        {
            word: "governorate",
            phonetic: "/ɡəˈvʌnərət/",
            partOfSpeech: "noun",
            arabic: "محافظة",
            example: "Beni Suef is an important governorate in Upper Egypt."
        },
        {
            word: "cement",
            phonetic: "/sɪˈment/",
            partOfSpeech: "noun",
            arabic: "الأسمنت",
            example: "Some modern factories in Egypt produce cement for building."
        },
        {
            word: "social studies",
            phonetic: "/ˌsəʊʃl ˈstʌdiz/",
            partOfSpeech: "noun",
            arabic: "مادة الدراسات الاجتماعية",
            example: "We learn about Egyptian history and geography in social studies."
        },
        {
            word: "religion",
            phonetic: "/rɪˈlɪdʒən/",
            partOfSpeech: "noun",
            arabic: "التربية الدينية",
            example: "Religion classes teach students moral values and kindness."
        },
        {
            word: "P.E",
            phonetic: "/ˌpiː ˈiː/",
            partOfSpeech: "noun (Physical Education)",
            arabic: "التربية البدنية / الرياضية",
            example: "My favorite subject is P.E because I love exercising and playing sports."
        },
        {
            word: "tricky",
            phonetic: "/ˈtrɪki/",
            partOfSpeech: "adjective",
            arabic: "صعب / محير",
            example: "Some science problems are a bit tricky, but I try my best to solve them."
        }
    ],

    // 3. Conjugation of Verbs
    verbs: [
        { present: "chat", past: "chatted", arabic: "يدردش / يتحدث", type: "regular" },
        { present: "end", past: "ended", arabic: "ينتهي", type: "regular" },
        { present: "rest", past: "rested", arabic: "يستريح", type: "regular" },
        { present: "wake up", past: "woke up", arabic: "يستيقظ", type: "irregular" },
        { present: "begin", past: "began", arabic: "يبدأ", type: "irregular" }
    ],

    // 4. Important Expressions & Prepositions
    expressions: [
        { phrase: "get dressed", meaning: "يرتدي الملابس", note: "Routine: wake up and get dressed." },
        { phrase: "stand in line", meaning: "يقف في طابور", note: "Assembly: stand in line in the morning yard." },
        { phrase: "at noon", meaning: "في وقت الظهيرة", note: "Time: 12:00 PM." },
        { phrase: "a bit tricky", meaning: "صعبة إلى حد ما", note: "Challenging but doable." },
        { phrase: "try my best", meaning: "أبذل ما بوسعي / قصارى جهدي", note: "Work hard to achieve a goal." },
        { phrase: "Bye for now.", meaning: "إلى اللقاء الآن", note: "Informal friendly email closing." }
    ],

    // 5. Pop Quiz on Vocabulary (From Textbook Page 46)
    popQuiz: [
        {
            id: 1,
            question: "Students take P.E classes at the school ________.",
            options: ["library", "classroom", "playground", "museum"],
            correct: 2,
            explanation: "P.E (Physical Education) classes take place outdoors in the school playground."
        },
        {
            id: 2,
            question: "She forgot to ________ her schoolbag before going to school.",
            options: ["start", "pack", "cry", "rest"],
            correct: 1,
            explanation: "We use 'pack' to mean put books and pens into the schoolbag."
        },
        {
            id: 3,
            question: "Some topics in math are a bit ________, but I try my best.",
            options: ["normal", "tricky", "easy", "simple"],
            correct: 1,
            explanation: "'Tricky' means challenging or not very easy, but we try our best."
        },
        {
            id: 4,
            question: "In the morning, students must sing the national ________.",
            options: ["anthem", "poem", "topic", "class"],
            correct: 0,
            explanation: "The official patriotic song of a country is the national anthem."
        },
        {
            id: 5,
            question: "Every morning, students stand in the school yard. They ________ the flag.",
            options: ["wake", "salute", "laugh", "rest"],
            correct: 1,
            explanation: "Students stand respectfully and salute the flag in the morning line."
        }
    ],

    // 6. Interactive StoryBook: Fady's Email (Daily School Life in Egypt)
    storyPages: [
        {
            badge: "✉️ Email Header & Morning Routine",
            title: "Fady's Email • Starting the Day",
            imageUrl: "../../assets/images/grade_6/unit_1/fady_school_day.webp",
            text: "To: mark@gmail.com\nFrom: fady@gmail.com\nSubject: Daily School Life in Egypt\n\nHi Mark,\nHow are you? I hope you're doing well. I want to tell you about a typical day at my school here in Egypt.\n\nMy day starts early. I wake up around 6:30 a.m., get dressed, and have a quick breakfast—usually bread, cheese, and fruit.",
            translation: "إلى: مارك | من: فادي | الموضوع: الحياة المدرسية اليومية في مصر\n\nمرحبًا يا مارك،\nكيف حالك؟ أتمنى أن تكون بأفضل حال. أود أن أحدثك عن يوم عادي ونمطي في مدرستي هنا في مصر.\n\nيبدأ يومي مبكرًا؛ حيث أستيقظ في حوالي الساعة 6:30 صباحًا، وأرتدي ملابسي، وأتناول فطورًا سريعًا يتكون عادة من الخبز والجبن والفاكهة.",
            vocabChips: ["typical (نموذجي)", "get dressed (يرتدي ملابسه)", "quick breakfast (فطور سريع)"],
            caption: "Fady wakes up at 6:30 a.m. and gets ready for school."
        },
        {
            badge: "🎺 Morning Assembly & Flag",
            title: "Standing in Line & National Anthem",
            imageUrl: "../../assets/images/grade_6/unit_1/fady_school_day.webp",
            text: "The school day begins at 7:30. We start it by standing in line, saluting the flag, and singing the national anthem. Then we go to our classrooms and begin our lessons. Our first subject is usually Arabic.",
            translation: "يبدأ اليوم الدراسي في تمام الساعة 7:30 صباحًا. نفتتح اليوم بالوقوف في طابور الصباح، وتحية علم مصر، وترديد النشيد الوطني بحماس. بعد ذلك نتوجه إلى فصولنا لنبدأ دروسنا. وتكون حصتنا الأولى عادة هي اللغة العربية.",
            vocabChips: ["salute the flag (يحيي العلم)", "national anthem (النشيد الوطني)", "stand in line (يقف في طابور)"],
            caption: "Students saluting the Egyptian flag during the morning assembly."
        },
        {
            badge: "📚 Subjects & Morning Break",
            title: "Classroom Lessons & Break Time",
            imageUrl: "../../assets/images/grade_6/unit_1/fady_school_day.webp",
            text: "Next, we have subjects like math, English, and science. Some topics are a bit tricky, but I try my best. At around 10:15, we have a short break. I usually eat a sandwich, play with my friends, chat and laugh.",
            translation: "بعد ذلك، ندرس مواد مثل الرياضيات، واللغة الإنجليزية، والعلوم. بعض الموضوعات تكون صعبة ومحيرة إلى حد ما، لكني أبذل أقصى جهدي لفهمها. وفي حوالي الساعة 10:15، نحصل على استراحة قصيرة؛ أتناول فيها شطيرتي، وألعب مع أصدقائي في الفناء، ونتحدث ونضحك معًا.",
            vocabChips: ["tricky (صعب / محير)", "try my best (أبذل قصارى جهدي)", "short break (فسحة قصيرة)"],
            caption: "Students chatting and laughing in the school playground during the 10:15 break."
        },
        {
            badge: "💻 Afternoon Lessons & Favorite Subject",
            title: "Social Studies, Religion, & P.E",
            imageUrl: "../../assets/images/grade_6/unit_1/fady_school_day.webp",
            text: "Later, we have more lessons like social studies, religion, or computer. I enjoy learning how to use the computer in class. However, my favorite subject is P.E.",
            translation: "في وقت لاحق من اليوم، ندرس حصصًا أخرى مثل الدراسات الاجتماعية، والتربية الدينية، أو الحاسب الآلي. أنا أستمتع بتعلم كيفية استخدام الكمبيوتر في الفصل، ولكن مادتي المفضلة على الإطلاق هي التربية البدنية (الألعاب).",
            vocabChips: ["social studies (دراسات اجتماعية)", "religion (تربية دينية)", "P.E (تربية بدنية)"],
            caption: "Fady loves learning computer skills and playing sports in P.E."
        },
        {
            badge: "🏠 End of the School Day",
            title: "Heading Home & Friendly Closing",
            imageUrl: "../../assets/images/grade_6/unit_1/fady_school_day.webp",
            text: "The school day ends at 1:30 p.m. I usually feel a bit tired, but I'm happy after a good day. I go home, eat lunch, rest a little, and then do my homework.\n\nThat's what a school day looks like for me. What about you?\nBye for now,\nFady",
            translation: "ينتهي اليوم الدراسي عند الساعة 1:30 ظهرًا. غالبًا ما أشعر ببعض التعب، لكني سعيد بعد قضاء يوم دراسي جميل. أعود إلى المنزل، وأتناول الغداء، وأستريح قليلاً، ثم أقوم بحل واجبي المدرسي.\n\nهكذا يبدو يومي المدرسي، فماذا عنك؟\nإلى اللقاء الآن،\nفادي",
            vocabChips: ["feel tired (يشعر بالتعب)", "rest a little (يستريح قليلاً)", "Bye for now (إلى اللقاء الآن)"],
            caption: "Fady finishing his school day at 1:30 p.m. and going home happily."
        }
    ],

    // 7. Writing Skill: Informal Email Guide
    writingSkill: {
        title: "How to Write an Informal Email (كيف تكتب بريدًا إلكترونيًا غير رسمي)",
        definition: "An informal email is a message you write to a friend or someone you know very well (رسالة بريد إلكتروني غير رسمية ترسلها لصديق أو لشخص تعرفه جيدًا).",
        features: [
            {
                name: "Using contractions (استخدام الاختصارات)",
                description: "نستخدم صيغ الاختصار الشائعة مثل That's, I'm, don't بدلاً من الصيغ الطويلة الرسمية.",
                examples: ["That's what a school day looks like.", "I'm happy after a good day."]
            },
            {
                name: "Opening phrase (عبارة افتتاحية ودية)",
                description: "نبدأ بتحية غير رسمية متبوعة باسم الصديق وسؤال عن حاله.",
                examples: ["Hi Mark!", "How are you?", "I hope you're doing well."]
            },
            {
                name: "Informal and friendly language (لغة ودية ومريحة)",
                description: "استخدام مفردات يومية طبيعية وأسئلة تفاعلية تشرك القارئ.",
                examples: ["I want to tell you about...", "What about you?"]
            },
            {
                name: "Friendly closing (خاتمة ودية وتوقيع)",
                description: "إنهاء الإيميل بعبارة وداع رقيقة متبوعة باسم الراسل فقط.",
                examples: ["Please, write back soon.", "Lots of love.", "Bye for now, Fady"]
            }
        ],
        formalVsInformal: [
            { formal: "Hello", informal: "Hi", meaning: "مرحبًا / أهلاً" },
            { formal: "normal", informal: "typical", meaning: "بشكل طبيعي / نمطي نموذجي" },
            { formal: "talk", informal: "chat", meaning: "يتحدث / يدردش" },
            { formal: "work hard", informal: "try my best", meaning: "يعمل بجد / يبذل ما بوسعه" }
        ],
        modelEmail: {
            to: "amr@gmail.com",
            from: "ali@gmail.com",
            subject: "A Typical Day at My School",
            body: "Hi Amr,\nHow are you? I hope you're doing great! I want to tell you about my typical school day in Egypt.\n\nMy day begins at 7:30 a.m. We stand in line, salute the Egyptian flag, and sing the national anthem. After that, we go to our classes to study Arabic, English, and science. At 10:15, we have our break, and I play football with my friends in the playground. School ends at 1:30 p.m., and then I go home, eat lunch, and rest.\n\nWhat about your school day? Please write back soon!\nBye for now,\nAli"
        }
    },

    // 8. Think & Create: Beni Suef Poster
    posterProject: {
        title: "Explore the Daily Life in Beni Suef (استكشف الحياة اليومية في بني سويف)",
        subtitle: "Making an Educational Poster About Daily Life in an Egyptian Governorate",
        elements: [
            {
                step: "1. Main Header (العنوان الرئيسي)",
                desc: "يجب أن يحتوي الملصق على عنوان جذاب وواضح مثل: 'Explore the Daily Life in Beni Suef'."
            },
            {
                step: "2. Expressive Pictures (صور ورسومات معبرة)",
                desc: "إضافة صور حيوية تدل على بيئة المعيشة والعمل والأسرة في المحافظة."
            },
            {
                step: "3. Detailed Sentences (جمل وصفية تفصيلية)",
                desc: "جمل بسيطة واضحة في زمن المضارع البسيط تصف حياة السكان اليومية."
            }
        ],
        aspects: [
            {
                icon: "🌅",
                title: "Morning Routine (الصباح الباكر)",
                english: "People wake up early, clean the house, and prepare breakfast.",
                arabic: "يستيقظ الناس مبكرًا، ينظفون منازلهم ويجهزون وجبة الإفطار اللذيذة."
            },
            {
                icon: "🌾",
                title: "Farming Life (العمل في المزارع)",
                english: "Many people work on farms. They grow cotton, beans, and vegetables.",
                arabic: "العديد من الناس يعملون في المزارع، ويزرعون القطن والفول ومختلف الخضروات."
            },
            {
                icon: "🏭",
                title: "Industrial Work (العمل بالمصانع)",
                english: "Some people work in factories. They make cement and clothes.",
                arabic: "يعمل بعض المواطنين في المصانع لإنتاج الأسمنت عالي الجودة والملابس الجاهزة."
            },
            {
                icon: "🍲",
                title: "Family Lunch at Noon (غداء الظهيرة)",
                english: "At noon, families eat lunch together. They eat rice, bread, and vegetables.",
                arabic: "في وقت الظهيرة، تجتمع العائلات لتناول الغداء معًا: الأرز والخبز والخضروات الطازجة."
            }
        ]
    },

    // 9. Comprehensive Lesson Mastery Quiz (10 Questions)
    quiz: [
        {
            id: 1,
            question: "Every morning, students stand in line in the yard to ________ the flag.",
            options: ["salute", "break", "close", "drop"],
            correct: 0,
            explanation: "'Salute the flag' (تحية العلم) is the respectful morning custom in Egyptian schools."
        },
        {
            id: 2,
            question: "Don't forget to ________ your schoolbag with your books and pencil case before sleeping.",
            options: ["pack", "wake", "draw", "sail"],
            correct: 0,
            explanation: "'Pack schoolbag' means to prepare and put necessary study materials into the bag."
        },
        {
            id: 3,
            question: "During morning assembly, all teachers and students sing the national ________.",
            options: ["poem", "anthem", "uniform", "factory"],
            correct: 1,
            explanation: "The official patriotic song of Egypt is the 'national anthem' (النشيد الوطني)."
        },
        {
            id: 4,
            question: "Students enjoy playing games and running with friends in the school ________.",
            options: ["office", "station", "playground", "library"],
            correct: 2,
            explanation: "Outdoor games, sports, and break activities take place in the school playground."
        },
        {
            id: 5,
            question: "Some math and science questions are a bit ________, but I always try my best.",
            options: ["tricky", "asleep", "empty", "soft"],
            correct: 0,
            explanation: "'Tricky' means challenging or difficult to understand immediately."
        },
        {
            id: 6,
            question: "Which of the following is an informal, friendly greeting for an email to a friend?",
            options: ["Dear Sir / Madam", "Hi Mark!", "To Whom It May Concern", "Yours sincerely"],
            correct: 1,
            explanation: "'Hi Mark!' is a warm, casual greeting suitable for friends."
        },
        {
            id: 7,
            question: "What is the friendly, informal equivalent of the word 'normal'?",
            options: ["typical", "ancient", "heavy", "formal"],
            correct: 0,
            explanation: "As taught on textbook page 48, 'typical' is the informal equivalent of 'normal'."
        },
        {
            id: 8,
            question: "In Beni Suef, some people work in factories to make ________ and clothes.",
            options: ["cement", "waterfalls", "coral reefs", "camels"],
            correct: 0,
            explanation: "Page 50 specifies that factories in Beni Suef produce cement and clothes."
        },
        {
            id: 9,
            question: "According to Fady's email, what time does his school day begin?",
            options: ["At 6:30 a.m.", "At 7:30 a.m.", "At 10:15 a.m.", "At 1:30 p.m."],
            correct: 1,
            explanation: "Fady wakes up at 6:30, but the school day officially begins at 7:30 a.m."
        },
        {
            id: 10,
            question: "In an informal email to a classmate, instead of 'talk' we frequently say: ________.",
            options: ["argue", "chat", "command", "whisper"],
            correct: 1,
            explanation: "'Chat' is the friendly, casual equivalent of 'talk' when hanging out with friends."
        }
    ]
};
