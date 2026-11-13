/**
 * Prep 3 - Unit 5: Design Thinking
 * Lesson 3: See Through Their Eyes • Empathy in Design
 * Data payload strictly adhering to Decoupled Architecture
 */

window.lessonData = {
    title: "Lesson 3: See Through Their Eyes (Empathy & Newcomers)",
    unit: "Unit 5: Design Thinking",
    grade: "Prep 3",
    term: "Term 1",
    totalQuestions: 35,

    // Vocabulary categorized by section
    lessonVocabulary: [
        {
            category: "Key Vocabulary (المفردات الرئيسية)",
            words: [
                { en: "buddy", ar: "صديق / رفيق معوان", pos: "n", example: "A welcome buddy helps new students settle into school.", exampleAr: "الرفيق المعوان يساعد الطلاب الجدد على التأقلم في المدرسة." },
                { en: "understand", ar: "يفهم / يستوعب", pos: "v", example: "To solve a problem, you must understand how people feel.", exampleAr: "لكي تحل مشكلة ما، يجب عليك أن تفهم كيف يشعر الناس." },
                { en: "challenge", ar: "تَحَدٍّ / مهمة تختبر القدرات", pos: "n", example: "The teacher gave the class a challenge to help newcomers.", exampleAr: "أعطى المعلم الفصل تحدياً لمساعدة الطلاب الجدد والوافدين." },
                { en: "confused", ar: "مُرتبك / مشوَّش الذهن", pos: "adj", example: "Karim looked confused on his first day at school.", exampleAr: "بدا كريم مشوش الذهن ومرتبكاً في يومه الأول بالمدرسة." },
                { en: "real", ar: "حقيقي / واقعي / ملموس", pos: "adj", example: "Good design starts with real people and real feelings.", exampleAr: "يبدأ التصميم المتقن من أناس حقيقيين ومشاعر واقعية." },
                { en: "brainstorm", ar: "يستثير الأفكار / يولد حلولاً بالعصف الذهني", pos: "v", example: "The group brainstormed ideas during the workshop.", exampleAr: "قامت المجموعة بالعصف الذهني لتوليد الأفكار أثناء ورشة العمل." },
                { en: "newcomers", ar: "الوافدون الجدد / الطلاب الجدد", pos: "n", example: "The school organized an event to welcome newcomers.", exampleAr: "نظمت المدرسة فعالية خاصة للترحيب بالطلاب الوافدين الجدد." },
                { en: "design", ar: "تصميم / يصمم", pos: "n, v", example: "Empathy is the first step in successful design.", exampleAr: "التعاطف ومراعاة المشاعر هو الخطوة الأولى في التصميم الناجح." },
                { en: "problem", ar: "مشكلة", pos: "n", example: "We identified the main problem that students faced.", exampleAr: "حددنا المشكلة الرئيسية التي واجهها الطلاب." }
            ]
        },
        {
            category: "Lesson 3 Additional Vocabulary (SB page 77)",
            words: [
                { en: "ideas", ar: "أفكار", pos: "n", example: "They wrote down all their creative ideas on cards.", exampleAr: "قاموا بتدوين جميع أفكارهم الإبداعية على بطاقات ملونة." },
                { en: "student", ar: "طالب / تلميذ", pos: "n", example: "Every new student needs guidance and support.", exampleAr: "كل طالب جديد يحتاج إلى التوجيه والدعم المعنوي." },
                { en: "closely", ar: "عن قُرب / باهتمام وعناية", pos: "adv", example: "Omar watched Karim closely to observe his feelings.", exampleAr: "راقب عمر كريم عن كثب وعناية لملاحظة مشاعره واحتياجاته." },
                { en: "nervous", ar: "متوتر / قلق", pos: "adj", example: "He felt nervous because he didn't know anyone.", exampleAr: "شعر بالتوتر والقلق لأنه لم يكن يعرف أحداً هناك." },
                { en: "corner", ar: "ركن / زاوية", pos: "n", example: "They created a quiet break-time corner in the playground.", exampleAr: "أنشأوا ركناً هادئاً للاستراحة في فناء المدرسة." },
                { en: "important", ar: "هام / ضروري", pos: "adj", example: "It is important to see the world through other people's eyes.", exampleAr: "من المهم جداً أن ترى العالم من خلال أعين ومشاعر الآخرين." },
                { en: "confident", ar: "واثق من نفسه", pos: "adj", example: "The new students became confident after joining the club.", exampleAr: "أصبح الطلاب الجدد واثقين بأنفسهم بعد انضمامهم للنادي." },
                { en: "curious", ar: "فضولي / محب للاستطلاع", pos: "adj", example: "A curious mind always asks questions to learn more.", exampleAr: "العقل الفضولي يسأل دائماً ليتعلم المزيد من المعارف." },
                { en: "break", ar: "فترة راحة / فُسحة مدرسية", pos: "n", example: "Students eat and play together during the break.", exampleAr: "يتناول الطلاب الطعام ويلعبون معاً خلال فترة الفسحة." },
                { en: "group", ar: "مجموعة / فريق عمل", pos: "n", example: "Our study group finished the assignment successfully.", exampleAr: "أنهت مجموعتنا الدراسية المهمة المطلوبة بنجاح تام." },
                { en: "notice", ar: "يلاحظ / ينتبه إلى", pos: "v", example: "Did you notice where the newcomers stood?", exampleAr: "هل لاحظت أين كان يقف الطلاب الوافدون الجدد؟" },
                { en: "plan", ar: "خطة / يخطط", pos: "n, v", example: "They made a detailed plan for the welcome program.", exampleAr: "وضعوا خطة تفصيلية لبرنامج الترحيب بالطلاب." },
                { en: "school map", ar: "خريطة للمدرسة وأقسامها", pos: "n", example: "A school map helps students find the labs easily.", exampleAr: "خريطة المدرسة تساعد الطلاب على الوصول للمعامل بسهولة." },
                { en: "test", ar: "يختبر فكرة / اختبار", pos: "v, n", example: "Engineers test their prototypes with actual users.", exampleAr: "يختبر المهندسون نماذجهم الأولية مع مستخدمين حقيقيين." },
                { en: "solutions", ar: "حلول", pos: "n", example: "Creative thinking leads to practical solutions.", exampleAr: "التفكير الإبداعي يقود إلى حلول واقعية وعملية." }
            ]
        }
    ],

    // Pop Quiz matching El-Moasser page 209
    popQuiz: {
        title: "Pop Quiz: Complete the sentences",
        boxWords: ["newcomers", "buddy", "confused", "challenge", "brainstorm"],
        questions: [
            { id: 1, sentence: "I felt {blank} during the first week of school because everything was so new.", answer: "confused", ar: "شعرت بالارتباك والحيرة خلال الأسبوع الأول من المدرسة لأن كل شيء كان جديداً." },
            { id: 2, sentence: "The school welcomed {blank} with a special party.", answer: "newcomers", ar: "رحبت المدرسة بالطلاب الوافدين الجدد بإقامة حفل خاص." },
            { id: 3, sentence: "Learning a new language can be a {blank}, but it's exciting.", answer: "challenge", ar: "تعلم لغة جديدة قد يكون تحدياً كبيراً، لكنه ممتع وشيق." },
            { id: 4, sentence: "In the last class, we had to {blank} a new idea for reducing plastic waste.", answer: "brainstorm", ar: "في الحصة الأخيرة، كان علينا العصف الذهني لابتكار فكرة جديدة للحد من النفايات البلاستيكية." },
            { id: 5, sentence: "My {blank} helped me study for the math test when I was feeling nervous.", answer: "buddy", ar: "ساعدني صديقي المعوان في الاستذكار لاختبار الرياضيات عندما كنت أشعر بالتوتر." }
        ]
    },

    // Irregular Verbs
    verbs: [
        { base: "give", past: "gave", pp: "given", meaning: "يعطي" },
        { base: "see", past: "saw", pp: "seen", meaning: "يرى" },
        { base: "understand", past: "understood", pp: "understood", meaning: "يفهم" },
        { base: "sit", past: "sat", pp: "sat", meaning: "يجلس" },
        { base: "draw", past: "drew", pp: "drawn", meaning: "يرسم" }
    ],

    // Definitions
    definitions: [
        { term: "challenge", definition: "a task or situation that tests someone's abilities", translation: "تحدٍّ / اختبار للقدرات" },
        { term: "feeling", definition: "an emotional state or reaction", translation: "شعور / حالة عاطفية" },
        { term: "nervous", definition: "feeling worried or anxious", translation: "متوتر / قلق" },
        { term: "confused", definition: "unable to think clearly", translation: "مرتبك / غير قادر على التفكير بوضوح" },
        { term: "newcomer", definition: "someone who has recently arrived in a place", translation: "وافد جديد" },
        { term: "buddy", definition: "a close friend or companion who helps someone", translation: "صديق معوان / رفيق" },
        { term: "see through their eyes", definition: "to understand how someone else feels", translation: "يفهم مشاعر الآخرين بوضع نفسه مكانهم" }
    ],

    // Synonyms and Antonyms
    synonyms: [
        { word: "nervous", meaning: "متوتر / قلق", synonym: "upset / worried", antonym: "relaxed / calm" },
        { word: "create", meaning: "يبتكر / يصنع", synonym: "produce / invent / design", antonym: "ruin / destroy" },
        { word: "welcome", meaning: "يرحب بـ", synonym: "greet", antonym: "reject / refuse" },
        { word: "buddy", meaning: "صديق / رفيق", synonym: "friend / companion / mate", antonym: "enemy / opponent" },
        { word: "real", meaning: "حقيقي / واقعي", synonym: "actual / true / factual", antonym: "fake / false" }
    ],

    // Prefixes and Suffixes
    affixes: [
        { affix: "-ous", type: "suffix", function: "تكوّن الصفة من الاسم (nerve ➔ nervous)", examples: "nervous (متوتر)" },
        { affix: "-ent", type: "suffix", function: "تكوّن الصفة للدلالة على السمة", examples: "confident (واثق من نفسه)" }
    ],

    // General Notes on Reading and Listening
    confusionNotes: [
        {
            title: "استخدامات الفعل stop",
            titleEn: "Uses of the verb 'stop'",
            titleAr: "صيغ واستخدامات الفعل stop مع معانيه المختلفة",
            note: "يأتي الفعل stop بعدة تراكيب لغوية بحسب المعنى: 1) stop + V-ing يتوقف عن العادة أو الفعل نهائياً. 2) stop + to + inf يتوقف مؤقتاً ليفعل شيئاً آخر. 3) stop + مفعول + from + V-ing يمنع شخصاً من فعل الشيء.",
            examples: [
                { en: "You should stop smoking.", ar: "يجب عليك أن تتوقف عن التدخين نهائياً." },
                { en: "I stopped to drink some water.", ar: "توقفت مؤقتاً في طريقي لكي أشرب بعض الماء." },
                { en: "She stopped me from eating more chips.", ar: "منعتني من تناول المزيد من رقائق البطاطس." }
            ]
        },
        {
            title: "قاعدة الفعل feel + صفة",
            titleEn: "feel + adjective",
            titleAr: "استخدام الفعل feel متبوعاً بصفة للتعبير عن المشاعر والحالة",
            note: "يأتي بعد الفعل feel صفة مباشرة تصف مشاعر الشخص أو حالته النفسية والجسدية (feel welcomed / feel relaxed).",
            examples: [
                { en: "Omar felt sorry for the new student.", ar: "شعر عمر بالتعاطف والحزن من أجل الطالب الجديد." },
                { en: "The newcomers smiled and felt more relaxed.", ar: "ابتسم الطلاب الوافدون وشعروا بمزيد من الراحة والاسترخاء." },
                { en: "What can help a new student feel welcomed?", ar: "ما الذي يمكن أن يساعد الطالب الجديد على الشعور بالترحيب والحفاوة؟" }
            ]
        }
    ],

    // Important Expressions & Prepositions
    expressions: [
        { en: "feel welcomed", ar: "يشعر بالترحيب والحفاوة" },
        { en: "make life easier", ar: "يجعل الحياة أسهل" },
        { en: "watch closely", ar: "يراقب عن قرب وبعناية" },
        { en: "feel sorry", ar: "يشعر بالحزن أو الأسف" },
        { en: "make the break time longer", ar: "يجعل وقت الفسحة أطول" },
        { en: "brainstorm ideas", ar: "يولد أفكاراً بالعصف الذهني" },
        { en: "break-time corner", ar: "ركن هادئ للاستراحة في الفسحة" },
        { en: "create a welcome buddy plan", ar: "ينظم خطة للترحيب بالأصدقاء الجدد" },
        { en: "felt more relaxed", ar: "شعر بمزيد من الاسترخاء والراحة" }
    ],

    prepositions: [
        { en: "spent a day with", ar: "قضى يوماً بصحبة" },
        { en: "during the break", ar: "أثناء فترة الراحة / الفسحة" },
        { en: "write down", ar: "يُدوّن / يكتب ملاحظات" },
        { en: "at the end", ar: "في النهاية" },
        { en: "talk to his friends", ar: "يتحدث إلى أصدقائه" },
        { en: "start with", ar: "يبدأ بـ" },
        { en: "hard for", ar: "صعب على / شاق لـ" },
        { en: "see through their eyes", ar: "يفهم مشاعرهم من منظورهم" }
    ],

    // 3D Story Pages (Single WebP triptych rule)
    storyPages: [
        {
            titleEn: "Chapter 1: The Challenge of Empathy",
            titleAr: "الفصل الأول: تحدي التعاطف",
            textEn: "Omar loved designing things. One morning, his teacher gave the class a meaningful challenge: 'How can we make school life easier and friendlier for new students?' Omar immediately suggested making posters, but his teacher kindly paused him. 'First, see through their eyes,' she smiled. 'Great designers must understand genuine human emotions before proposing solutions.'",
            textAr: "كان عمر يعشق تصميم الأشياء. وفي أحد الصباحات، طرحت معلمته تحدياً هادفاً على الفصل: «كيف يمكننا جعل الحياة المدرسية أسهل وأكثر ودّاً للطلاب الجدد؟». اقترح عمر على الفور صنع لافتات، لكن معلمته أوقفته بلطف قائلة: «أولاً، انظر إلى الأمور من خلال أعينهم؛ فالمصممون العظماء يفهمون المشاعر الإنسانية الحقيقية قبل اقتراح أي حلول».",
            captionEn: "True design begins with empathy: seeing challenges from the user's perspective.",
            captionAr: "يبدأ التصميم الحقيقي بالتعاطف: رؤية التحديات من وجهة نظر المستخدم.",
            vocabChips: ["Challenge", "Empathy", "See through their eyes", "Design"]
        },
        {
            titleEn: "Chapter 2: Walking in Karim's Shoes",
            titleAr: "الفصل الثاني: معايشة يوم في حياة كريم",
            textEn: "Omar spent the whole school day with a new student named Karim, observing his experience closely. Karim spoke very quietly and appeared visibly confused and nervous. When the break bell rang, Karim didn't know which corridor led to the cafeteria or where to sit, feeling completely isolated in the crowded yard. Omar felt deeply for him, remembering how overwhelming his own first week had been.",
            textAr: "قضى عمر اليوم المدرسي بأكمله برفقة طالب جديد يُدعى كريم، مراقباً تجربته عن قرب. كان كريم يتحدث بصوت منخفض وبدا مرتبكاً وقلقاً بوضوح. وعندما دق جرس الفسحة، لم يعرف كريم أي ممر يؤدي إلى الكافتيريا أو أين يجلس، وشعر بالعزلة في الفناء المزدحم. شعر عمر بالتعاطف الصادق معه، وتذكر كم كان أسبوعه الأول صعباً ومربكاً.",
            captionEn: "Observing real struggles during break time to identify true student needs.",
            captionAr: "ملاحظة الصعوبات الحقيقية أثناء الفسحة لتحديد الاحتياجات الفعلية للطلاب.",
            vocabChips: ["Confused", "Nervous", "Break time", "Observed closely"]
        },
        {
            titleEn: "Chapter 3: The Welcome Buddy Solution",
            titleAr: "الفصل الثالث: حل الرفيق المعوان",
            textEn: "Later that afternoon, Omar and his group documented their observations and brainstormed creative solutions. They designed a 'Welcome Buddy' program, drew an illustrated school map for newcomers, and set up a cozy break-time friendship corner. When they tested the prototype, the newcomers smiled, laughed, and felt much more relaxed. Omar discovered that true design starts with real people and real feelings.",
            textAr: "في وقت لاحق من بعد الظهر، دوّن عمر ومجموعته ملاحظاتهم وعصفوا ذهنياً لابتكار حلول عملية. فصمموا برنامج «الرفيق المعوان Welcome Buddy»، ورسموا خريطة مصورة للمدرسة للوافدين الجدد، وأنشأوا ركناً هادئاً للصداقة أثناء الفسحة. وعندما اختبروا النموذج الأولي، ابتسم الطلاب الجدد وشعروا براحة وسعادة أكبر. واكتشف عمر أن التصميم الحقيقي ينطلق من الناس الحقيقيين ومشاعرهم الصادقة.",
            captionEn: "Prototyping a welcome system that brings smiles and comfort to new students.",
            captionAr: "بناء نموذج لنظام ترحيب يعيد الابتسامة والراحة لقلوب الطلاب الجدد.",
            vocabChips: ["Welcome Buddy", "School map", "Break corner", "Real feelings"]
        }
    ],

    // Dialogue Player Data
    dialogue: {
        banner: {
            title: "🗣️ Speaking Dialogue: Welcoming a Newcomer",
            subtitle: "حوار تفاعلي ناطق بين عادل وباسم الطالب الجديد في المدرسة لمساعدته في استكشاف الفصول والمعامل 🏫"
        },
        lines: [
            {
                speaker: "Basem",
                speakerAr: "باسم (طالب جديد)",
                avatar: "👦",
                en: "Excuse me, where is the science lab?",
                ar: "معذرةً، أين يوجد معمل العلوم؟"
            },
            {
                speaker: "Adel",
                speakerAr: "عادل (رفيق مرحب)",
                avatar: "🧑‍🎓",
                en: "It's upstairs next to class 2/C. Are you new here?",
                ar: "إنه في الطابق العلوي بجوار فصل 2/ج. هل أنت طالب جديد هنا؟"
            },
            {
                speaker: "Basem",
                speakerAr: "باسم",
                avatar: "👦",
                en: "Yes, I am. I really want to explore the school.",
                ar: "نعم، أنا كذلك. أريد حقاً استكشاف المدرسة."
            },
            {
                speaker: "Adel",
                speakerAr: "عادل",
                avatar: "🧑‍🎓",
                en: "Don't worry! I can be your welcome buddy and show you around.",
                ar: "لا تقلق! يمكنني أن أكون رفيقك المعوان وأصحبك في جولة."
            },
            {
                speaker: "Basem",
                speakerAr: "باسم",
                avatar: "👦",
                en: "That is so kind of you! Where is the gym?",
                ar: "هذا لطف كبير منك! وأين صالة الألعاب الرياضية؟"
            },
            {
                speaker: "Adel",
                speakerAr: "عادل",
                avatar: "🧑‍🎓",
                en: "It's next to the sports field. Are you interested in sports?",
                ar: "إنها بجوار الملعب الرياضي. هل أنت مهتم بممارسة الرياضة؟"
            },
            {
                speaker: "Basem",
                speakerAr: "باسم",
                avatar: "👦",
                en: "Yes! Basketball is my favorite sport, and I love science too.",
                ar: "نعم! كرة السلة هي رياضتي المفضلة، وأحب العلوم أيضاً."
            },
            {
                speaker: "Adel",
                speakerAr: "عادل",
                avatar: "🧑‍🎓",
                en: "Awesome! Let's start our tour right now. I hope you will love our school!",
                ar: "رائع! دعنا نبدأ جولتنا الآن. أتمنى أن تحب مدرستنا!"
            }
        ]
    },

    // Grammar Content HTML (Empathy in Design Thinking, stop forms, feel + adj)
    grammarContentHtml: `
        <div class="grammar-section">
            <div class="grammar-card">
                <h3 class="grammar-topic-title">⚡ 1. The Power of 'Stop' (استخدامات الفعل Stop)</h3>
                <p class="grammar-desc">يختلف معنى الفعل <strong>stop</strong> اختلافاً جوهرياً باختلاف التركيب اللغوي الذي يليه:</p>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 15px;">
                    <!-- stop + V-ing -->
                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #e91e63;">
                        <h4 style="color: #e91e63; margin-bottom: 8px;">🛑 stop + V-ing / Noun</h4>
                        <p><strong>المعنى:</strong> يتوقف عن ممارسة الشيء نهائياً أو ينقطع عنه:</p>
                        <p style="direction: ltr; font-weight: bold; margin: 8px 0; color: var(--accent-primary);">You should stop smoking.</p>
                        <p style="font-size: 0.9rem; color: var(--text-secondary);">توقف عن التدخين نهائياً لأنه ضار بالصحة.</p>
                    </div>

                    <!-- stop + to + inf -->
                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #00bcd4;">
                        <h4 style="color: #00bcd4; margin-bottom: 8px;">⏸️ stop + to + Infinitive</h4>
                        <p><strong>المعنى:</strong> يتوقف عما كان يفعله لكي يفعل شيئاً آخر (توقف مؤقت لغرض):</p>
                        <p style="direction: ltr; font-weight: bold; margin: 8px 0; color: var(--accent-primary);">I stopped to drink some water.</p>
                        <p style="font-size: 0.9rem; color: var(--text-secondary);">توقفت عن المشي لكي أشرب بعض الماء.</p>
                    </div>

                    <!-- stop + object + from + V-ing -->
                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #ff9800;">
                        <h4 style="color: #ff9800; margin-bottom: 8px;">🛡️ stop + مفعول + from + V-ing</h4>
                        <p><strong>المعنى:</strong> يمنع شخصاً أو كائناً من القيام بأمر معين:</p>
                        <p style="direction: ltr; font-weight: bold; margin: 8px 0; color: var(--accent-primary);">She stopped me from eating more chips.</p>
                        <p style="font-size: 0.9rem; color: var(--text-secondary);">منعتني من تناول المزيد من رقائق البطاطس.</p>
                    </div>
                </div>
            </div>

            <div class="grammar-card" style="margin-top: 25px;">
                <h3 class="grammar-topic-title">⚡ 2. Linking Verbs: feel + Adjective (الشعور والصفات)</h3>
                <p class="grammar-desc">الفعل <strong>feel</strong> من أفعال الحواس والربط (Linking verbs) التي يأتي بعدها <strong>صفة (Adjective)</strong> تصف مشاعر الفاعل وحالته النفسية، وليس حالاً (Adverb):</p>

                <div class="rules-table-wrapper" style="overflow-x: auto; margin-top: 15px;">
                    <table class="rules-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--bg-card); color: var(--accent-primary);">
                                <th style="padding: 12px; border: 1px solid var(--border-color);">التعبير (Expression)</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">الصفة المستخدمة</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">المعنى</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">مثال من كتاب الوزارة (SB)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">feel welcomed</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);">welcomed (مرحب به)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">يشعر بالحفاوة والترحيب</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">What can help a new student <strong>feel welcomed</strong>?</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">feel relaxed</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);">relaxed (مسترخٍ ومطمئن)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">يشعر بالهدوء وزوال التوتر</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">The new students smiled and <strong>felt more relaxed</strong>.</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">feel nervous / confused</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);">nervous / confused</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">يشعر بالقلق والارتباك</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">Karim looked confused and <strong>felt nervous</strong> during break.</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">feel sorry</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);">sorry (متأسف / متعاطف)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">يشعر بالأسف والتعاطف</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">Omar <strong>felt sorry</strong> when he saw Karim sitting alone.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="note-box" style="margin-top: 15px; padding: 12px; background: rgba(76, 175, 80, 0.1); border-right: 4px solid #4caf50; border-radius: 6px;">
                    ✨ <strong>حكمة التفكير التصميمي (Design Thinking Rule):</strong><br>
                    <em>"Good design starts with real people and real feelings."</em><br>
                    التصميم الناجح يبدأ دائماً بالتعاطف الإنساني وفهم مشاعر المستخدمين الحقيقية.
                </div>
            </div>
        </div>
    `,

    // 35 Questions covering all aspects of Lesson 3
    quiz: [
        // Vocabulary & Definitions
        {
            id: 1,
            question: "A __________ is a close friend or companion who helps someone, especially a new student at school.",
            options: ["buddy", "enemy", "teacher", "opponent"],
            correctAnswer: 0,
            explanation: "الصديق المعوان والرفيق يسمى buddy."
        },
        {
            id: 2,
            question: "A task or situation that tests someone's abilities and requires effort is called a __________.",
            options: ["break", "challenge", "corner", "solution"],
            correctAnswer: 1,
            explanation: "المهمة التي تختبر القدرات وتتطلب جهداً تسمى تحدياً (challenge)."
        },
        {
            id: 3,
            question: "To 'see through their eyes' means to __________ how someone else feels.",
            options: ["ignore", "forget", "understand", "refuse"],
            correctAnswer: 2,
            explanation: "التعبير see through their eyes يعني أن تفهم مشاعر الشخص الآخر بوضع نفسك مكانه."
        },
        {
            id: 4,
            question: "A 'newcomer' is someone who has __________ arrived in a place or school.",
            options: ["never", "recently", "always", "seldom"],
            correctAnswer: 1,
            explanation: "الوافد الجديد (newcomer) هو شخص وصل حديثاً (recently) إلى المكان."
        },
        {
            id: 5,
            question: "When someone is unable to think clearly, they feel __________.",
            options: ["confused", "confident", "creative", "relaxed"],
            correctAnswer: 0,
            explanation: "الشخص الذي يشعر بالتشوش وعدم القدرة على التفكير بوضوح يكون confused."
        },
        {
            id: 6,
            question: "The teacher asked the class to make life easier for __________ at their school.",
            options: ["newcomers", "machines", "robots", "enemies"],
            correctAnswer: 0,
            explanation: "التحدي كان جعل الحياة المدرسية أسهل للطلاب الوافدين الجدد (newcomers)."
        },
        {
            id: 7,
            question: "A/An __________ is an emotional state or reaction like joy, fear, or anxiety.",
            options: ["map", "feeling", "plan", "object"],
            correctAnswer: 1,
            explanation: "الحالة الشعورية أو العاطفية تسمى feeling."
        },
        {
            id: 8,
            question: "Omar created a welcome __________ plan to help new students feel supported.",
            options: ["buddy", "robot", "enemy", "boss"],
            correctAnswer: 0,
            explanation: "نظام الرفيق المعوان يسمى welcome buddy plan."
        },
        {
            id: 9,
            question: "Good design starts with real people and real __________.",
            options: ["feelings", "conflicts", "problems", "dangers"],
            correctAnswer: 0,
            explanation: "التصميم الجيد يبدأ بالناس الحقيقيين ومشاعرهم الصادقة (real feelings)."
        },
        {
            id: 10,
            question: "Students can relax and talk peacefully in the break-time __________.",
            options: ["corner", "danger", "weight", "backpack"],
            correctAnswer: 0,
            explanation: "ركن الفسحة الهادئ للاستراحة هو break-time corner."
        },

        // Synonyms and Antonyms
        {
            id: 11,
            question: "The word 'nervous' has the same meaning as __________.",
            options: ["relaxed", "worried", "calm", "confident"],
            correctAnswer: 1,
            explanation: "مرادف متوتر (nervous) هو قلق (worried)."
        },
        {
            id: 12,
            question: "The antonym (opposite) of 'relaxed' is __________.",
            options: ["calm", "nervous", "happy", "comfortable"],
            correctAnswer: 1,
            explanation: "عكس مسترخٍ (relaxed) هو متوتر وقلق (nervous)."
        },
        {
            id: 13,
            question: "The word 'buddy' is a synonym for __________.",
            options: ["friend", "enemy", "stranger", "opponent"],
            correctAnswer: 0,
            explanation: "مرادف buddy هو صديق (friend أو mate)."
        },
        {
            id: 14,
            question: "I welcomed my new neighbor with juice. 'Welcomed' here means __________.",
            options: ["greeted", "rejected", "destroyed", "confused"],
            correctAnswer: 0,
            explanation: "رحب بـ (welcomed) مرادفها حيا وقابل بحفاوة (greeted)."
        },
        {
            id: 15,
            question: "Good design starts with real people. 'Real' can be replaced by __________.",
            options: ["fake", "factual", "false", "untrue"],
            correctAnswer: 1,
            explanation: "مرادف real (حقيقي / واقعي) هو factual أو actual."
        },
        {
            id: 16,
            question: "The opposite of 'welcome' is __________.",
            options: ["greet", "reject", "receive", "accept"],
            correctAnswer: 1,
            explanation: "عكس يرحب بـ (welcome) هو يرفض (reject)."
        },

        // Prefixes and Suffixes
        {
            id: 17,
            question: "The suffix '-ous' turns the noun 'nerve' into the adjective __________.",
            options: ["nervous", "nervely", "nervish", "unnerve"],
            correctAnswer: 0,
            explanation: "اللاحقة '-ous' تحول الاسم nerve إلى الصفة nervous."
        },
        {
            id: 18,
            question: "The suffix '-ent' is found in the adjective __________.",
            options: ["confident", "nervous", "stylish", "practical"],
            correctAnswer: 0,
            explanation: "كلمة confident تنتهي باللاحقة '-ent' للدلالة على الصفة."
        },

        // Language Notes: stop & feel
        {
            id: 19,
            question: "You should stop __________ junk food because it is very unhealthy.",
            options: ["to eat", "eating", "eat", "eaten"],
            correctAnswer: 1,
            explanation: "الفعل stop يليه V-ing للتعبير عن التوقف عن الشيء نهائياً."
        },
        {
            id: 20,
            question: "While driving to Alexandria, dad stopped __________ some fuel for the car.",
            options: ["getting", "to get", "got", "gets"],
            correctAnswer: 1,
            explanation: "نستخدم stop + to + inf للتوقف المؤقت لغرض فعل شيء آخر."
        },
        {
            id: 21,
            question: "The teacher stopped the two boys __________ arguing in class.",
            options: ["with", "for", "from", "at"],
            correctAnswer: 2,
            explanation: "التركيب 'يمنع شخصاً من' هو stop someone from (V-ing)."
        },
        {
            id: 22,
            question: "The new students smiled and felt more __________ after receiving their school maps.",
            options: ["relaxed", "relaxing", "relax", "relaxation"],
            correctAnswer: 0,
            explanation: "يأتي بعد الفعل feel صفة (felt more relaxed)."
        },
        {
            id: 23,
            question: "What activities can help a new student feel __________?",
            options: ["welcomed", "welcoming", "welcome", "welcomes"],
            correctAnswer: 0,
            explanation: "التعبير هو feel welcomed (يشعر بأنه مرحب به)."
        },
        {
            id: 24,
            question: "Omar felt __________ when he saw the new student sitting alone during the break.",
            options: ["sorry", "happily", "nervously", "loudly"],
            correctAnswer: 0,
            explanation: "التعبير feel sorry يعني يشعر بالحزن والتعاطف."
        },

        // Expressions and Prepositions
        {
            id: 25,
            question: "Omar spent a day __________ Karim to understand what difficulties he faced.",
            options: ["at", "with", "from", "on"],
            correctAnswer: 1,
            explanation: "قضى وقتاً مع شخص تكتب spent time with."
        },
        {
            id: 26,
            question: "Karim didn't know where to sit __________ the school break.",
            options: ["during", "while", "since", "until"],
            correctAnswer: 0,
            explanation: "خلال فترة الراحة تأخذ حرف الجر during the break."
        },
        {
            id: 27,
            question: "Omar and his group wrote __________ everything they noticed about the students.",
            options: ["up", "into", "down", "off"],
            correctAnswer: 2,
            explanation: "يُدوّن أو يسجل ملاحظات هي write down."
        },
        {
            id: 28,
            question: "Designing a school map will make life __________ for newcomers.",
            options: ["easier", "hardest", "worse", "nervous"],
            correctAnswer: 0,
            explanation: "يجعل الحياة أسهل هي make life easier."
        },
        {
            id: 29,
            question: "Omar watched Karim __________ to see how he interacted with others.",
            options: ["closely", "badly", "falsely", "blindly"],
            correctAnswer: 0,
            explanation: "راقبه باهتمام وعن قرب هي watched closely."
        },
        {
            id: 30,
            question: "Mr. Ahmed always talks __________ his students friendly and kindly.",
            options: ["at", "to", "for", "in"],
            correctAnswer: 1,
            explanation: "يتحدث إلى شخص تأخذ حرف الجر to (talk to)."
        },

        // Reading Comprehension & Problem-Solving
        {
            id: 31,
            question: "Why did the teacher tell Omar to 'see through their eyes' first?",
            options: [
                "Because she wanted him to buy glasses",
                "To understand the real feelings and needs of new students before designing solutions",
                "Because Karim could not see well",
                "To draw a portrait of the students"
            ],
            correctAnswer: 1,
            explanation: "طلبت المعلمة ذلك لكي يفهم مشاعر واحتياجات الطلاب الجدد أولاً قبل وضع أي حلول."
        },
        {
            id: 32,
            question: "How did Karim feel on his first day at school according to Omar's observation?",
            options: [
                "Confused and nervous",
                "Proud and arrogant",
                "Excited and loud",
                "Angry and aggressive"
            ],
            correctAnswer: 0,
            explanation: "لاحظ عمر أن كريم كان مرتبكاً ومتوتراً (confused and nervous)."
        },
        {
            id: 33,
            question: "Which of the following was NOT one of the solutions Omar's group created?",
            options: [
                "A Welcome Buddy plan",
                "A school map for newcomers",
                "A break-time corner",
                "Buying expensive tablets for everyone"
            ],
            correctAnswer: 3,
            explanation: "الحلول كانت: رفيق معوان، خريطة للمدرسة، وركن للاستراحة، ولم يقترحوا شراء أجهزة باهظة."
        },
        {
            id: 34,
            question: "What happened when Omar's team tested their welcome ideas?",
            options: [
                "The new students smiled and felt more relaxed",
                "The new students ran away from school",
                "The headmaster cancelled the project",
                "Nobody showed up"
            ],
            correctAnswer: 0,
            explanation: "عند اختبار الفكرة، ابتسم الطلاب الجدد وشعروا براحة أكبر وزال توترهم."
        },
        {
            id: 35,
            question: "What is the key takeaway lesson Omar learned about good design?",
            options: [
                "Good design only depends on computer software",
                "Good design starts with real people and real feelings",
                "Good design must be very expensive",
                "Designers should work completely alone"
            ],
            correctAnswer: 1,
            explanation: "الدرس الأهم هو أن التصميم الجيد ينطلق من الناس الحقيقيين ومشاعرهم الصادقة."
        }
    ]
};

// Aliasing for universal engine compatibility
window.lessonData.questions = window.lessonData.quiz;
