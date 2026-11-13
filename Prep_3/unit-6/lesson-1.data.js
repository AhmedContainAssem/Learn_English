/**
 * Prep 3 - Unit 6: Why do We Like Stories?
 * Lessons 1 & 2: The Power of Stories • The Story That Helped Me
 * Data payload strictly adhering to Decoupled Architecture
 */

window.lessonData = {
    title: "Lessons 1 & 2: The Power of Stories • The Story That Helped Me",
    unit: "Unit 6: Why do We Like Stories?",
    grade: "Prep 3",
    term: "Term 1",
    totalQuestions: 35,

    // Vocabulary lists categorized by lessons
    lessonVocabulary: [
        {
            category: "Key Vocabulary (المفردات الرئيسية)",
            words: [
                { en: "moral", ar: "درس أخلاقي / مغزى القصة (اسم) - أخلاقي (صفة)", pos: "n, adj", example: "Every great fable teaches an important moral." },
                { en: "empathy", ar: "تعاطف ومشاركة وجدانية للآخرين", pos: "n", example: "Reading stories develops empathy towards people in need." },
                { en: "conflict", ar: "صراع / نزاع رئيسي في القصة", pos: "n", example: "The hero must solve the main conflict in the story." },
                { en: "critically", ar: "بشكل نقدي وعميق وواعٍ", pos: "adv", example: "We should think critically about the choices characters make." },
                { en: "spark", ar: "يثير / يشعل شرارة الخيال والابتكار", pos: "v", example: "Good books spark our imagination and curiosity." },
                { en: "aware", ar: "واعٍ / مدرك لما حوله", pos: "adj", example: "Stories make us more aware of different cultures." },
                { en: "various", ar: "متنوع / عديد ومختلف", pos: "adj", example: "The library contains various genres of narrative stories." },
                { en: "honestly", ar: "بصدق / بصراحة وأمانة", pos: "adv", example: "Honestly, I felt nervous before the debate started." },
                { en: "unfair", ar: "غير عادل / ظالم ومجحف", pos: "adj", example: "The character stayed polite even when treated unfairly." },
                { en: "stuck", ar: "عالق في الذهن / محتار", pos: "adj", example: "The wisdom of that tale stuck in my memory." },
                { en: "debate", ar: "مناظرة منظمة بالحجة والبرهان", pos: "n", example: "Ali participated in a school debate about technology." },
                { en: "recommendation", ar: "توصية / ترشيح لكتاب", pos: "n", example: "Can you give me a recommendation for a good novel?" },
                { en: "character", ar: "شخصية في قصة أو رواية", pos: "n", example: "Sindbad is a famous adventurous character." },
                { en: "influence", ar: "يؤثر على / تأثير", pos: "v, n", example: "Fictional heroes can influence our real behavior." },
                { en: "respectful", ar: "محترم ومراعٍ لمشاعر الآخرين", pos: "adj", example: "Always remain calm and respectful during discussions." },
                { en: "develop", ar: "يطور / ينمي مهارات", pos: "v", example: "Storytelling helps develop language and empathy." },
                { en: "emotional", ar: "عاطفي / متعلق بالمشاعر", pos: "adj", example: "Stories explore emotional and moral challenges." },
                { en: "point of view", ar: "وجهة نظر / منظور شخصي", pos: "n", example: "Literature shows us life from a different point of view." },
                { en: "mentally", ar: "عقلياً / ذهنياً", pos: "adv", example: "Solving riddles helps children grow mentally." },
                { en: "narrative story", ar: "قصة سردية تحكي أحداثاً متعاقبة", pos: "n", example: "I wrote an interesting narrative story about my village." }
            ]
        },
        {
            category: "Lesson 1 Vocabulary (SB pages 86 & 87)",
            words: [
                { en: "shaping", ar: "تشكيل وصياغة العقول", pos: "n", example: "Stories have a big role in shaping young minds." },
                { en: "minds", ar: "عقول / أذهان", pos: "n", example: "Reading opens the minds of learners to new possibilities." },
                { en: "respond", ar: "يستجيب / يرد بردة فعل مدروسة", pos: "v", example: "How does the hero respond to dangerous situations?" },
                { en: "reflect", ar: "يتأمل / يفكر بعمق في تصرفاته", pos: "v", example: "Take time to reflect on the moral of the fable." },
                { en: "wiser", ar: "أكثر حكمة ورشداً", pos: "adj", example: "Experienced elders become wiser through life lessons." },
                { en: "benefit", ar: "فائدة / نفع", pos: "n", example: "One major benefit of reading is expanding vocabulary." },
                { en: "awareness", ar: "وعي / إدراك تام", pos: "n", example: "Environmental stories increase our awareness about nature." },
                { en: "valuable", ar: "قَيِّم / ذو قيمة وفائدة كبرى", pos: "adj", example: "Grandmother gave me valuable life advice." },
                { en: "lifestyles", ar: "أساليب وأنماط المعيشة", pos: "n", example: "Stories describe various lifestyles around the globe." },
                { en: "choices", ar: "اختيارات وقرارات", pos: "n", example: "Characters often face difficult moral choices." },
                { en: "enjoyable", ar: "ممتع ومبهج", pos: "adj", example: "Reading historical fiction is deeply enjoyable." },
                { en: "entertain", ar: "يسلي / يمتع القارئ", pos: "v", example: "Good storytellers entertain and educate at the same time." },
                { en: "powerful", ar: "قوي / ذو تأثير عميق", pos: "adj", example: "Stories are powerful tools for teaching morals." },
                { en: "understanding", ar: "متفهم / مراعٍ للظروف", pos: "adj", example: "A good friend is patient and understanding." },
                { en: "ability", ar: "قدرة / استطاعة", pos: "n", example: "Stories enhance our ability to communicate effectively." }
            ]
        },
        {
            category: "Lesson 2 Vocabulary (SB pages 88 & 89)",
            words: [
                { en: "disagree", ar: "يختلف في الرأي / يعارض", pos: "v", example: "It is normal for team members to disagree politely." },
                { en: "react", ar: "يبدي ردة فعل", pos: "v", example: "He learned to react calmly instead of getting angry." },
                { en: "argument", ar: "جدال حاد / حجة منطقية", pos: "n", example: "Staying calm makes your argument much stronger." },
                { en: "advice", ar: "نصيحة (اسم لا يُعد)", pos: "n", example: "My teacher gave me helpful advice on public speaking." },
                { en: "speech", ar: "خطاب / حديث / كلام", pos: "n", example: "The president delivered an inspiring speech to the youth." },
                { en: "ignore", ar: "يتجاهل / يغفل عن عمد", pos: "v", example: "Don't ignore the warning signs when solving problems." }
            ]
        }
    ],

    // Pop Quiz matching El-Moasser page 237
    popQuiz: {
        title: "Pop Quiz: Complete the sentences",
        boxWords: ["conflict", "point of view", "moral", "empathy", "aware"],
        questions: [
            { id: 1, sentence: "Every good story has a {blank} that the main character must solve.", answer: "conflict", ar: "كل قصة شيقة تحتوي على صراع أو مشكلة رئيسية يجب على البطل حلها." },
            { id: 2, sentence: "Reading helps us see the world from a different {blank}.", answer: "point of view", ar: "القراءة تساعدنا على رؤية العالم من وجهة نظر ومنظور مختلف." },
            { id: 3, sentence: "The {blank} of the story was 'Honesty is the best policy'.", answer: "moral", ar: "كانت العبرة والدرس المستفاد من القصة هي أن «الصدق هو أفضل سياسة»." },
            { id: 4, sentence: "She felt {blank} for the sad character in the movie.", answer: "empathy", ar: "شعرت بتعاطف كبير مع الشخصية الحزينة في الفيلم." },
            { id: 5, sentence: "I am {blank} that reading stories can make me a better person.", answer: "aware", ar: "أنا على دراية ووعي تام بأن قراءة القصص تجعلني إنساناً أفضل." }
        ]
    },

    // Irregular Verbs
    verbs: [
        { base: "say", past: "said", pp: "said", meaning: "يقول" },
        { base: "tell", past: "told", pp: "told", meaning: "يخبر / يقول لـ" },
        { base: "speak", past: "spoke", pp: "spoken", meaning: "يتحدث" },
        { base: "know", past: "knew", pp: "known", meaning: "يعرف" },
        { base: "see", past: "saw", pp: "seen", meaning: "يرى" }
    ],

    // Definitions
    definitions: [
        { term: "aware", definition: "knowing or noticing something", translation: "واعٍ / مدرك للأمور" },
        { term: "critically", definition: "in a careful and thoughtful way; not just accepting things as they are", translation: "بشكل نقدي وتأملي" },
        { term: "spark", definition: "to start or cause something to happen", translation: "يطلق شرارة البدء / يثير" },
        { term: "moral", definition: "is related to what is right or wrong in behavior; the lesson of a story", translation: "أخلاقي / المغزى الأخلاقي" },
        { term: "empathy", definition: "the ability to understand and share someone else's feelings", translation: "التعاطف ومشاركة المشاعر" },
        { term: "various", definition: "different kinds or types; many and not the same", translation: "متنوع / عديد ومختلف" }
    ],

    // Collocations
    collocations: [
        { phrase: "solve a conflict", meaning: "يحل صراعاً أو خلافاً" },
        { phrase: "develop empathy", meaning: "ينمي مشاعر التعاطف مع الآخرين" },
        { phrase: "teach a moral", meaning: "يعلّم درساً أخلاقياً قيماً" },
        { phrase: "spark imagination", meaning: "يثير الخيال والابتكار" }
    ],

    // Synonyms and Antonyms
    synonyms: [
        { word: "improve", meaning: "يحسن / يطور", synonym: "enhance / upgrade / develop", antonym: "damage / harm" },
        { word: "respond", meaning: "يستجيب / يرد", synonym: "answer / react", antonym: "ignore" },
        { word: "various", meaning: "متنوع / عديد", synonym: "numerous / different", antonym: "similar / uniform" },
        { word: "moral", meaning: "أخلاقي / فاضل", synonym: "just / good", antonym: "unjust / immoral" },
        { word: "empathy", meaning: "تعاطف", synonym: "sympathy / compassion", antonym: "indifference" },
        { word: "conflict", meaning: "صراع / خلاف", synonym: "disagreement / opposition", antonym: "agreement / peace" },
        { word: "end", meaning: "نهاية / خاتمة", synonym: "conclusion", antonym: "beginning / start" },
        { word: "spark", meaning: "يحفز / يثير", synonym: "stimulate / stir / inspire", antonym: "discourage" },
        { word: "aware", meaning: "واعٍ / عليم", synonym: "wise / informed / knowledgeable", antonym: "unaware / ignorant" },
        { word: "fair", meaning: "عادل / منصف", synonym: "reasonable / just", antonym: "unfair / unjust" }
    ],

    // Prefixes and Suffixes
    affixes: [
        { affix: "-ous", type: "suffix", function: "تكوّن الصفة من الفعل أو الاسم", examples: "various (متنوع)" },
        { affix: "-al", type: "suffix", function: "تكوّن الصفة من الاسم", examples: "emotional (عاطفي), moral (أخلاقي)" },
        { affix: "-ly", type: "suffix", function: "تكوّن الظرف من الصفة", examples: "critically (نقدياً), emotionally (عاطفياً)" },
        { affix: "-able", type: "suffix", function: "تكوّن الصفة من الفعل", examples: "enjoyable (ممتع), valuable (قيّم)" },
        { affix: "-ful", type: "suffix", function: "تكوّن الصفة وتفيد الامتلاء بالشيء", examples: "powerful (قوي / ذو تأثير)" },
        { affix: "-ize", type: "suffix", function: "تكوّن الفعل من الاسم", examples: "memorize (يحفظ عن ظهر قلب)" },
        { affix: "-tion", type: "suffix", function: "تكوّن الاسم من الفعل", examples: "imagination (خيال)" },
        { affix: "-ment", type: "suffix", function: "تكوّن الاسم من الفعل", examples: "argument (جدال / حجة)" },
        { affix: "un-", type: "prefix", function: "تفيد عكس المعنى ونفي الصفة", examples: "unfair (غير عادل), unaware (غير مدرك)" }
    ],

    // Confusion Notes & General Notes
    confusionNotes: [
        {
            title: "الفرق بين point of view و viewpoint",
            titleEn: "point of view vs viewpoint",
            titleAr: "الفرق بين وجهة النظر والتعبير عن الرأي الشخصي",
            note: "كلا التعبيرين يعني 'وجهة نظر' أو منظور شخصي في تقييم الأمور ورؤية العالم:",
            examples: [
                { en: "Talking to others helps form your own point of view.", ar: "التحدث مع الآخرين يساعدك على صياغة وجهة نظرك المستقلة." },
                { en: "From my viewpoint, empathy is the greatest human value.", ar: "من وجهة نظري ومنظوري، التعاطف هو أعظم قيمة إنسانية." }
            ]
        },
        {
            title: "الفرق بين argument و debate",
            titleEn: "argument vs debate",
            titleAr: "الفرق بين الجدال والخلاف (argument) والمناظرة المنظمة (debate)",
            note: "الكلمة argument تعني (جدال شخصي أو خلاف حاد قد تنقصه الحكمة). بينما debate تعني (مناظرة رسمية منظمة بالحجة والبرهان والأدلة الهادئة):",
            examples: [
                { en: "After a big argument, the sisters reached an agreement.", ar: "بعد جدال طويل وحاد، توصلت الأختان إلى اتفاق وتراضٍ." },
                { en: "During the school debate, students presented evidence calmly.", ar: "أثناء المناظرة المدرسية، قدم الطلاب أدلتهم وحججهم بهدوء وثقة." }
            ]
        },
        {
            title: "استخدام كلمة moral كاسم وصفة",
            titleEn: "moral as Noun vs Adjective",
            titleAr: "استخدام moral كاسم (الدرس المستفاد) أو كصفة (أخلاقي)",
            note: "تأتي moral كاسم (Noun) بمعنى العبرة أو الدرس المستفاد. وتأتي كصفة (Adjective) بمعنى سلوك أو مبدأ أخلاقي قويم:",
            examples: [
                { en: "The stories of Goha have a lot of morals.", ar: "قصص ونوادر جحا تحتوي على الكثير من العبر والدروس المستفادة." },
                { en: "Children must be raised on strong moral values.", ar: "يجب تنشئة الأطفال وتربيتهم على قيم أخلاقية راسخة." }
            ]
        },
        {
            title: "الفرق بين character و personality",
            titleEn: "character vs personality",
            titleAr: "الفرق بين شخصية القصة (character) والشخصية الواقعية والسمات (personality)",
            note: "الكلمة character تعني (شخصية خيالية في قصة أو رواية أو مسرحية). بينما personality تعني (الشخصية الحقيقية للإنسان وسماته النفسية والسلوكية):",
            examples: [
                { en: "I love SpongeBob as a funny cartoon character.", ar: "أحب شخصية سبونج بوب كشخصية كرتونية مضحكة ومحبوبة." },
                { en: "His sister has a very strong and confident personality.", ar: "تتمتع أخته بشخصية قوية وواثقة جداً في حياتها اليومية." }
            ]
        }
    ],

    // Important Expressions & Prepositions
    expressions: [
        { en: "go through", ar: "يمر بتجربة / يستعرض" },
        { en: "solve conflicts", ar: "يحل الصراعات والخلافات" },
        { en: "make decisions", ar: "يتخذ قرارات حكيمة" },
        { en: "two years before", ar: "قبل عامين / منذ سنتين" },
        { en: "grow mentally", ar: "ينمو عقلياً وذهنياً" },
        { en: "become wiser", ar: "يصبح أكثر حكمة ورشداً" },
        { en: "increase awareness", ar: "يزيد من الوعي والإدراك" },
        { en: "stay calm", ar: "يحافظ على هدوئه" },
        { en: "during the debate", ar: "أثناء جلسة المناظرة" }
    ],

    prepositions: [
        { en: "respond to", ar: "يستجيب لـ / يرد على" },
        { en: "in the end", ar: "في نهاية المطاف / ختاماً" },
        { en: "aware of", ar: "واعٍ بـ / مدرك لـ" },
        { en: "related to", ar: "مرتبط بـ / متعلق بـ" },
        { en: "defined as", ar: "يُعرَّف على أنه" },
        { en: "disagree with", ar: "يختلف في الرأي مع شخص" },
        { en: "interested in", ar: "مهتم بـ / راغب في" }
    ],

    // 3D Story Pages (Single WebP triptych rule)
    storyPages: [
        {
            titleEn: "Chapter 1: Entering the Minds of Characters",
            titleAr: "الفصل الأول: الدخول إلى أذهان الشخصيات",
            textEn: "Reading stories can profoundly transform the way we think and perceive the world. Through narrative stories, we step into the shoes of diverse characters, confront their complex struggles, and witness how they respond to difficult life dilemmas. This unique mental journey enables us to explore various emotional, social, and moral problems safely, without having to suffer their painful consequences ourselves.",
            textAr: "يمكن لقراءة القصص أن تُحدث تحولاً عميقاً في طريقتنا للتفكير وإدراك العالم من حولنا. فمن خلال القصص السردية، نضع أنفسنا مكان شخصيات متنوعة، ونواجه صراعاتهم المعقدة، ونشهد كيف يستجيبون للمواقف الصعبة. وتتيح لنا هذه الرحلة الذهنية الفريدة استكشاف مختلف المشكلات العاطفية والاجتماعية والأخلاقية بأمان ودون الحاجة لتجربة عواقبها بأنفسنا.",
            captionEn: "Exploring real human emotions and moral challenges through the lives of story characters.",
            captionAr: "استكشاف المشاعر الإنسانية الحقيقية والتحديات الأخلاقية عبر حياة شخصيات القصص.",
            vocabChips: ["Minds of characters", "Moral challenges", "Respond to difficulty", "Empathy"]
        },
        {
            titleEn: "Chapter 2: Developing Empathy and Critical Thinking",
            titleAr: "الفصل الثاني: تنمية التعاطف والتفكير النقدي",
            textEn: "Stories introduce readers to different lifestyles, cultures, and points of view. As we immerse ourselves in tales, we naturally develop empathy and realize that complex conflicts often possess multiple viable solutions. Observing characters make tough decisions teaches us to evaluate our own lives and think critically before reacting, allowing our minds to grow mentally and emotionally wiser every day.",
            textAr: "تقدم القصص للقراء أساليب حياة وثقافات ووجهات نظر شديدة التنوع. وبينما نغوص في تلك الحكايات، ننمي التعاطف بشكل طبيعي وندرك أن الصراعات المعقدة غالباً ما تمتلك حلولاً متعددة. كما أن مراقبة الشخصيات وهي تتخذ قرارات صعبة يعلمنا كيف نقيم حياتنا ونفكر بشكل نقدي قبل اتخاذ أي ردة فعل، مما يجعل عقولنا تنمو ذهنياً وعاطفياً لتصبح أكثر حكمة كل يوم.",
            captionEn: "Seeing conflicts from diverse points of view helps us think critically about our choices.",
            captionAr: "رؤية الصراعات من وجهات نظر متعددة تساعدنا على التفكير النقدي في خياراتنا وقراراتنا.",
            vocabChips: ["Empathy", "Points of view", "Critical thinking", "Grow wiser"]
        },
        {
            titleEn: "Chapter 3: The Story That Guided Ali in Real Life",
            titleAr: "الفصل الثالث: القصة التي أنقذت علي في المناظرة",
            textEn: "During a heated school debate, a classmate aggressively challenged Ali's presentation. Instead of shouting back or getting flustered, Ali remained remarkably calm and respectful. When his friend Omar asked how he kept his cool, Ali explained that a hero in a narrative story he had recently read taught him that staying calm and composed under unfair pressure makes your logical argument far more powerful and convincing.",
            textAr: "أثناء مناظرة مدرسية محتدمة، عارض أحد الزملاء عرض علي بأسلوب حاد. وبدلاً من الصراخ في المقابل أو الغضب، ظل علي هادئاً ومحترماً للغاية. وعندما سأله صديقه عمر عن سر رباطة جأشه، أوضح علي أن بطل رواية سردية قرأها مؤخراً علمه أن التزام الهدوء والاحترام في وجه الاستفزاز يجعل حجتك المنطقية أقوى وأكثر إقناعاً للجميع.",
            captionEn: "Applying story lessons in real life: calmness and respect make every argument stronger.",
            captionAr: "تطبيق دروس القصص في الواقع: الهدوء والاحترام يجعلان الحجة أكثر قوة وإقناعاً.",
            vocabChips: ["School debate", "Stayed calm", "Respectful response", "Stronger argument"]
        }
    ],

    // Dialogue Player Data
    dialogue: {
        banner: {
            title: "🗣️ Speaking Dialogue: How a Story Influenced Ali",
            subtitle: "حوار تفاعلي ناطق بين عمر وعلي حول درس التحكم في النفس أثناء المناظرة بفضل قراءة القصص 💬"
        },
        lines: [
            {
                speaker: "Omar",
                speakerAr: "عمر",
                avatar: "👦",
                en: "Hey Ali! You looked really calm during the class debate today. I thought you'd be nervous about speaking up.",
                ar: "مرحباً يا علي! لقد بدوت هادئاً للغاية أثناء مناظرة الفصل اليوم. كنت أعتقد أنك ستتوتر عند التحدث أمام الجميع."
            },
            {
                speaker: "Ali",
                speakerAr: "علي",
                avatar: "🧑‍🎓",
                en: "Honestly, I was nervous at first. But I remembered an inspiring story I read last month that helped me.",
                ar: "بصراحة، كنت متوتراً في البداية. لكنني تذكرت قصة ملهمة قرأتها الشهر الماضي وساعدتني كثيراً."
            },
            {
                speaker: "Omar",
                speakerAr: "عمر",
                avatar: "👦",
                en: "Really? What kind of story was it?",
                ar: "حقاً؟ ما نوع تلك القصة؟"
            },
            {
                speaker: "Ali",
                speakerAr: "علي",
                avatar: "🧑‍🎓",
                en: "It was a narrative story where the main character stayed calm and respectful even when people were being unfair.",
                ar: "كانت قصة سردية حافظ فيها البطل على هدوئه واحترامه حتى عندما كان الناس يعاملونه بظلم."
            },
            {
                speaker: "Omar",
                speakerAr: "عمر",
                avatar: "👦",
                en: "So how did that lesson help you during the debate today?",
                ar: "وكيف ساعدك ذلك الدرس خلال مناظرة اليوم؟"
            },
            {
                speaker: "Ali",
                speakerAr: "علي",
                avatar: "🧑‍🎓",
                en: "Someone strongly disagreed with me. Normally I might get angry, but I took a deep breath and responded calmly.",
                ar: "لقد عارضني شخص بشدة. في العادة قد أغضب، لكنني أخذت نفساً عميقاً ورددت عليه بهدوء."
            },
            {
                speaker: "Omar",
                speakerAr: "عمر",
                avatar: "👦",
                en: "That's brilliant! So reading stories actually gave you practical real-life skills.",
                ar: "هذا رائع! إذن فقراءة القصص منحتك مهارات عملية حقيقية في الحياة."
            },
            {
                speaker: "Ali",
                speakerAr: "علي",
                avatar: "🧑‍🎓",
                en: "Exactly! It taught me that staying calm and respectful makes your argument much stronger.",
                ar: "بالضبط! لقد علمتني أن التزام الهدوء والاحترام يجعل حجتك أكثر قوة وتأثيراً."
            }
        ]
    },

    // Grammar Content HTML (Reported Speech: Statements, Reporting Verbs, Pronouns, Tenses, Time shifts)
    grammarContentHtml: `
        <div class="grammar-section">
            <div class="grammar-card">
                <h3 class="grammar-topic-title">⚡ 1. Direct vs Reported Speech (الكلام المباشر وغير المباشر)</h3>
                <p class="grammar-desc">الكلام المباشر <strong>(Direct Speech)</strong> هو ما قاله المتحدث بنصه ويوضع بين علامتي تنصيص <code>"..."</code>. أما غير المباشر <strong>(Reported Speech)</strong> فهو نقل معنى الكلام دون علامات تنصيص.</p>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin-top: 15px;">
                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #2196f3;">
                        <h4 style="color: #2196f3; margin-bottom: 8px;">🗣️ الكلام المباشر (Direct Speech)</h4>
                        <p style="direction: ltr; font-weight: bold; margin: 8px 0; color: var(--accent-primary);">"I like stories," Ali said to Omar.</p>
                        <p style="font-size: 0.9rem; color: var(--text-secondary);">نص كلام علي كما هو تماماً بين علامتي تنصيص.</p>
                    </div>

                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #4caf50;">
                        <h4 style="color: #4caf50; margin-bottom: 8px;">🔄 الكلام غير المباشر (Reported Speech)</h4>
                        <p style="direction: ltr; font-weight: bold; margin: 8px 0; color: var(--accent-gold);">Ali told Omar that he liked stories.</p>
                        <p style="font-size: 0.9rem; color: var(--text-secondary);">تم نقل الكلام بحذف الأقواس وتغيير فعل القول والضمير والزمن.</p>
                    </div>
                </div>
            </div>

            <div class="grammar-card" style="margin-top: 25px;">
                <h3 class="grammar-topic-title">⚡ 2. Reporting Verbs: said vs told (أفعال القول)</h3>
                <div class="rules-table-wrapper" style="overflow-x: auto; margin-top: 15px;">
                    <table class="rules-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--bg-card); color: var(--accent-primary);">
                                <th style="padding: 12px; border: 1px solid var(--border-color);">فعل القول المباشر</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">التحويل في غير المباشر</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">القاعدة والاستخدام</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">مثال توضيحي</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">said</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">said (that)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);"><strong>لا يتبعها مفعول به</strong> (مخاطب)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">Ali said (that) he was tired.</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">said to + مفعول</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">told + مفعول (that)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);"><strong>لابد أن يتبعها مفعول به</strong> مباشرة</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">Ali <strong>told me</strong> that he was tired.</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">أفعال خاصة</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">explained / promised / admitted</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">تستخدم حسب المعنى ولا يشترط مفعول</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">He <strong>promised</strong> that he would help me.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="grammar-card" style="margin-top: 25px;">
                <h3 class="grammar-topic-title">⚡ 3. Tense Shifts (تحويل الأزمنة للماضي الأبعد)</h3>
                <p class="grammar-desc">إذا كان فعل القول ماضياً (said / told)، نُرجع زمن الفعل خطوة إلى الماضي:</p>

                <div class="rules-table-wrapper" style="overflow-x: auto; margin-top: 15px;">
                    <table class="rules-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--bg-card); color: var(--accent-primary);">
                                <th style="padding: 12px; border: 1px solid var(--border-color);">الزمن المباشر (Direct)</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">الزمن في غير المباشر (Reported)</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">مثال التحويل</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">Present Simple (play / likes)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">Past Simple (played / liked)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">"I <strong>like</strong> fish." ➔ She said she <strong>liked</strong> fish.</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">Present Continuous (am/is/are + V-ing)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">Past Continuous (was/were + V-ing)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">"I <strong>am writing</strong>." ➔ He told me he <strong>was writing</strong>.</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">Past Simple / Present Perfect (saw / have seen)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">Past Perfect (had + P.P.)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">"I <strong>lost</strong> my key." ➔ He said he <strong>had lost</strong> his key.</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">can / will / may / must</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">could / would / might / had to</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">"I <strong>can</strong> swim." ➔ She said she <strong>could</strong> swim.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="grammar-card" style="margin-top: 25px;">
                <h3 class="grammar-topic-title">⚡ 4. Time and Place Expression Shifts (تحويل الظروف وأسماء الإشارة)</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; margin-top: 15px;">
                    <div style="background: var(--bg-card); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <p><strong>now</strong> ➔ <span style="color: var(--accent-gold); font-weight: bold;">then</span></p>
                        <p><strong>today</strong> ➔ <span style="color: var(--accent-gold); font-weight: bold;">that day</span></p>
                        <p><strong>tonight</strong> ➔ <span style="color: var(--accent-gold); font-weight: bold;">that night</span></p>
                    </div>
                    <div style="background: var(--bg-card); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <p><strong>tomorrow</strong> ➔ <span style="color: var(--accent-gold); font-weight: bold;">the following day</span></p>
                        <p><strong>yesterday</strong> ➔ <span style="color: var(--accent-gold); font-weight: bold;">the day before</span></p>
                        <p><strong>last week</strong> ➔ <span style="color: var(--accent-gold); font-weight: bold;">the week before</span></p>
                    </div>
                    <div style="background: var(--bg-card); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <p><strong>this</strong> ➔ <span style="color: var(--accent-gold); font-weight: bold;">that</span></p>
                        <p><strong>these</strong> ➔ <span style="color: var(--accent-gold); font-weight: bold;">those</span></p>
                        <p><strong>here</strong> ➔ <span style="color: var(--accent-gold); font-weight: bold;">there</span></p>
                    </div>
                </div>
            </div>
        </div>
    `,

    // 35 Questions covering Lessons 1 & 2
    quiz: [
        // Vocabulary & Definitions
        {
            id: 1,
            question: "A good story always has a main __________ that tests the hero and needs a resolution.",
            options: ["conflict", "benefit", "recommendation", "schedule"],
            correctAnswer: 0,
            explanation: "الصراع الرئيسي في القصة يسمى conflict."
        },
        {
            id: 2,
            question: "The __________ of the fable is the lesson it teaches about what is right and wrong.",
            options: ["conflict", "character", "moral", "debate"],
            correctAnswer: 2,
            explanation: "المغزى الأخلاقي والعبرة المستفادة من القصة تسمى moral."
        },
        {
            id: 3,
            question: "__________ is the ability to understand and share other people's genuine feelings.",
            options: ["Empathy", "Anger", "Disinterest", "Conflict"],
            correctAnswer: 0,
            explanation: "المشاركة الوجدانية وفهم مشاعر الآخرين تسمى empathy."
        },
        {
            id: 4,
            question: "Reading different stories can __________ our imagination and inspire creativity.",
            options: ["stop", "destroy", "spark", "ignore"],
            correctAnswer: 2,
            explanation: "يثير أو يطلق شرارة الخيال هي spark our imagination."
        },
        {
            id: 5,
            question: "A person who is 'aware' of something is __________ it.",
            options: ["ignorant of", "knowing and noticing", "refusing", "sleeping during"],
            correctAnswer: 1,
            explanation: "الشخص الواعي والمدرك (aware) يعرف وينتبه للشيء (knowing or noticing)."
        },
        {
            id: 6,
            question: "To think __________ means to evaluate choices carefully rather than just accepting them.",
            options: ["critically", "slowly", "angrily", "badly"],
            correctAnswer: 0,
            explanation: "التفكير بشكل نقدي وتأملي هو thinking critically."
        },
        {
            id: 7,
            question: "The book contains __________ kinds of tales from cultures around the world.",
            options: ["various", "single", "lonely", "unfair"],
            correctAnswer: 0,
            explanation: "أنواع متنوعة ومختلفة هي various kinds."
        },
        {
            id: 8,
            question: "During the school __________, students presented logical arguments politely.",
            options: ["debate", "conflict", "danger", "fight"],
            correctAnswer: 0,
            explanation: "المناظرة المنظمة تسمى debate."
        },
        {
            id: 9,
            question: "Sindbad is a famous adventurous fictional __________.",
            options: ["personality", "character", "debate", "speech"],
            correctAnswer: 1,
            explanation: "الشخصية الخيالية في قصة تسمى character."
        },
        {
            id: 10,
            question: "Reading stories teaches us valuable skills and helps us become __________.",
            options: ["wiser", "lazier", "slower", "crazier"],
            correctAnswer: 0,
            explanation: "قراءة القصص تزيد الحكمة وتجعلنا أكثر حكمة (wiser)."
        },

        // Synonyms, Antonyms & Affixes
        {
            id: 11,
            question: "The antonym of 'empathy' is __________.",
            options: ["sympathy", "compassion", "indifference", "understanding"],
            correctAnswer: 2,
            explanation: "عكس التعاطف (empathy) هو اللامبالاة وعدم الاهتمام (indifference)."
        },
        {
            id: 12,
            question: "The synonym of 'various' is __________.",
            options: ["different", "same", "identical", "single"],
            correctAnswer: 0,
            explanation: "مرادف various (متنوع / متعدد) هو different."
        },
        {
            id: 13,
            question: "We add the prefix 'un-' to the adjective 'fair' to get __________.",
            options: ["unfair", "infair", "disfair", "imfair"],
            correctAnswer: 0,
            explanation: "البادئة un- تعطي عكس fair فتصبح unfair (ظالم / غير عادل)."
        },
        {
            id: 14,
            question: "The suffix '-al' turns the noun 'emotion' into the adjective __________.",
            options: ["emotional", "emotionish", "emotionful", "emotionable"],
            correctAnswer: 0,
            explanation: "اللاحقة '-al' تحول الاسم emotion إلى الصفة emotional."
        },
        {
            id: 15,
            question: "The suffix '-ful' turns the noun 'power' into the adjective __________.",
            options: ["powerful", "powerly", "powerable", "powering"],
            correctAnswer: 0,
            explanation: "اللاحقة '-ful' تحول power إلى الصفة powerful."
        },
        {
            id: 16,
            question: "The opposite of 'conflict' is __________.",
            options: ["disagreement", "fight", "peace", "struggle"],
            correctAnswer: 2,
            explanation: "عكس الصراع والخلاف (conflict) هو السلام والتوافق (peace)."
        },
        {
            id: 17,
            question: "The opposite of 'aware' is __________.",
            options: ["unaware", "disaware", "inaware", "misaware"],
            correctAnswer: 0,
            explanation: "عكس مدرك وواعٍ (aware) هو غير مدرك (unaware)."
        },

        // Collocations & Expressions
        {
            id: 18,
            question: "Stories help young readers develop __________ towards different people.",
            options: ["empathy", "conflicts", "stairs", "arguments"],
            correctAnswer: 0,
            explanation: "المتلازمة اللفظية هي develop empathy (ينمي التعاطف)."
        },
        {
            id: 19,
            question: "Fables and moral tales spark our __________ and creativity.",
            options: ["imagination", "indifference", "pollution", "weight"],
            correctAnswer: 0,
            explanation: "المتلازمة اللفظية هي spark imagination (يثير الخيال)."
        },
        {
            id: 20,
            question: "During the debate, Ali took a deep breath and stayed __________.",
            options: ["calm", "nervously", "angrily", "loudly"],
            correctAnswer: 0,
            explanation: "حافظ على هدوئه هي stayed calm."
        },
        {
            id: 21,
            question: "How did the hero respond __________ the dangerous monster?",
            options: ["at", "to", "for", "with"],
            correctAnswer: 1,
            explanation: "يستجيب لـ تأخذ حرف الجر to (respond to)."
        },
        {
            id: 22,
            question: "Stories show us life from an entirely different point of __________.",
            options: ["sight", "view", "eye", "look"],
            correctAnswer: 1,
            explanation: "التعبير 'وجهة نظر' هو point of view."
        },
        {
            id: 23,
            question: "Ahmed Zaki acted out the __________ of President Sadat brilliantly.",
            options: ["personality", "character", "argument", "debate"],
            correctAnswer: 1,
            explanation: "الشخصية في التمثيل والدراما هي character."
        },

        // Grammar: Reported Speech (said vs told)
        {
            id: 24,
            question: "Mona __________ that she loved reading adventure stories.",
            options: ["told", "said", "say to", "telling"],
            correctAnswer: 1,
            explanation: "نستخدم said عندما لا يتبع فعل القول مفعول به مخاطب."
        },
        {
            id: 25,
            question: "Kareem __________ me that he had finished his English assignment.",
            options: ["said", "told", "spoke", "talked"],
            correctAnswer: 1,
            explanation: "نستخدم told لأنه يوجد مفعول به مباشر (me)."
        },
        {
            id: 26,
            question: "Sama said to Hoda, 'I will visit you.' In reported speech: Sama __________ Hoda she would visit her.",
            options: ["said", "told", "tells", "says"],
            correctAnswer: 1,
            explanation: "تتحول said to + مفعول إلى told + مفعول."
        },

        // Grammar: Tense & Pronoun Shifts
        {
            id: 27,
            question: "'I want to buy a new book,' Ali said. Ali said that he __________ to buy a new book.",
            options: ["wants", "wanted", "wanting", "had wanted"],
            correctAnswer: 1,
            explanation: "يتحول المضارع البسيط (want) إلى ماضٍ بسيط (wanted)."
        },
        {
            id: 28,
            question: "'We are playing chess now,' they said. They said they __________ chess then.",
            options: ["are playing", "were playing", "have played", "played"],
            correctAnswer: 1,
            explanation: "يتحول المضارع المستمر (are playing) إلى ماضٍ مستمر (were playing)."
        },
        {
            id: 29,
            question: "'I have seen that film,' Sarah told me. Sarah told me that she __________ that film.",
            options: ["saw", "has seen", "had seen", "is seeing"],
            correctAnswer: 2,
            explanation: "يتحول المضارع التام (have seen) إلى ماضٍ تام (had seen)."
        },
        {
            id: 30,
            question: "'I can solve this puzzle,' Omar said. Omar said that he __________ solve that puzzle.",
            options: ["can", "could", "may", "will"],
            correctAnswer: 1,
            explanation: "تتحول can إلى could في الكلام غير المباشر."
        },
        {
            id: 31,
            question: "In reported speech, the time word 'tomorrow' becomes '__________'.",
            options: ["yesterday", "the following day", "that day", "then"],
            correctAnswer: 1,
            explanation: "تتحول tomorrow إلى the following day أو the next day."
        },
        {
            id: 32,
            question: "In reported speech, the time word 'now' becomes '__________'.",
            options: ["then", "that day", "before", "ago"],
            correctAnswer: 0,
            explanation: "تتحول now إلى then في الكلام غير المباشر."
        },
        {
            id: 33,
            question: "Adel said, 'I lost my watch yesterday.' Adel said he had lost his watch __________.",
            options: ["tomorrow", "yesterday", "the day before", "the next day"],
            correctAnswer: 2,
            explanation: "تتحول yesterday إلى the day before."
        },

        // Reading Comprehension & Practical Application
        {
            id: 34,
            question: "What helped Ali stay calm and respectful during the school debate?",
            options: [
                "He took a magic medicine",
                "He remembered a story about a character who stayed calm in arguments",
                "He left the classroom immediately",
                "He shouted louder than everyone"
            ],
            correctAnswer: 1,
            explanation: "تذكر قصة قرأها سابقاً تعلم منها بطل القصة ضبط النفس والبقاء هادئاً."
        },
        {
            id: 35,
            question: "According to the lesson, how does reading stories benefit our minds and emotions?",
            options: [
                "It makes us waste valuable time",
                "It helps us develop empathy, think critically, and become wiser",
                "It makes us forget all real-life problems forever",
                "It teaches us to avoid talking to people"
            ],
            correctAnswer: 1,
            explanation: "قراءة القصص تنمي التعاطف، وتعلمنا التفكير النقدي، وتجعلنا أكثر حكمة."
        }
    ]
};

// Aliasing for universal engine compatibility
window.lessonData.questions = window.lessonData.quiz;
