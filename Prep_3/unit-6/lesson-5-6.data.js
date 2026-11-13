/**
 * Prep 3 - Unit 6: Why do We Like Stories?
 * Lessons 5 & 6: Let's Talk • My Own Story • The Dog and His Shadow
 * Data payload strictly adhering to Decoupled Architecture
 */

window.lessonData = {
    title: "Lessons 5 & 6: Let's Talk • The Dog and His Shadow",
    unit: "Unit 6: Why do We Like Stories?",
    grade: "Prep 3",
    term: "Term 1",
    totalQuestions: 35,

    // Vocabulary categorized by section
    lessonVocabulary: [
        {
            category: "Key Vocabulary (المفردات الرئيسية)",
            words: [
                { en: "fictional", ar: "روائي / خيالي غير واقعي", pos: "adj", example: "I love reading fictional tales about talking animals." },
                { en: "respond", ar: "يستجيب / يرد بردة فعل مدروسة", pos: "v", example: "Always respond politely when someone asks you a question." },
                { en: "various", ar: "متنوع / مختلف ومتعدد", pos: "adj", example: "Stories show us life from various points of view." },
                { en: "greedy", ar: "جشع / طمّاع وأناني", pos: "adj", example: "The greedy dog wanted the other dog's bone as well." },
                { en: "bone", ar: "عظمة", pos: "n", example: "The dog held a tasty bone firmly between its teeth." },
                { en: "stream", ar: "جدول مائي / مجرى ماء ضيق رقراق", pos: "n", example: "A sparkling stream flowed beneath the wooden bridge." },
                { en: "bridge", ar: "جسر / كوبري للمرور", pos: "n", example: "He walked across the wooden bridge to cross the stream." },
                { en: "bark", ar: "ينبح (صوت الكلب)", pos: "v", example: "The dog barked loudly to frighten away the stranger." },
                { en: "shadow", ar: "ظل / خيال منعكس على الماء", pos: "n", example: "The dog saw his own shadow reflected in the clear water." },
                { en: "discover", ar: "يكتشف حقيقة الأمر", pos: "v", example: "He was sad when he discovered that he lost his meal." },
                { en: "clear", ar: "صافٍ / نقي وواضح", pos: "adj", example: "The stream water was so clear that you could see pebbles." }
            ]
        },
        {
            category: "Lesson 5 Vocabulary (SB pages 94 & 95)",
            words: [
                { en: "points of view", ar: "وجهات نظر / مناظير مختلفة", pos: "n", example: "Reading opens our eyes to diverse points of view." },
                { en: "life lesson", ar: "درس مستفاد في معترك الحياة", pos: "n", example: "Every ancient fable carries an enduring life lesson." },
                { en: "carry", ar: "يحمل رسالة أو معنى عميقاً", pos: "v", example: "Fictional tales carry deep messages for young readers." },
                { en: "pass", ar: "يجتاز / يتناقل شفهياً", pos: "v", example: "Folk stories pass from generation to generation." },
                { en: "conversation", ar: "محادثة / حوار ثنائي", pos: "n", example: "We had an engaging conversation about storytelling." },
                { en: "experiences", ar: "تجارب وخبرات حياتية", pos: "n", example: "Try sharing personal experiences during your speech." },
                { en: "exactly", ar: "بالضبط / تماماً كالمطلوب", pos: "adv", example: "That is exactly what the moral of the story explains." },
                { en: "orally", ar: "شفهياً / بالحديث المنطوق", pos: "adv", example: "Students answered the comprehension questions orally." },
                { en: "deep", ar: "عميق الأثر / ذو مغزى كبير", pos: "adj", example: "Literature leaves a deep impression on our character." },
                { en: "messages", ar: "رسائل هادفة وتوجيهات", pos: "n", example: "The author communicates meaningful moral messages." }
            ]
        },
        {
            category: "Lesson 6 Vocabulary (SB pages 96 & 97)",
            words: [
                { en: "tasty", ar: "لذيذ الطعم / شهي وممتع", pos: "adj", example: "The hungry dog was lucky to find a tasty bone." },
                { en: "proudly", ar: "بفخر واعتزاز", pos: "adv", example: "He proudly carried his reward back to his den." },
                { en: "wag", ar: "يهز / يحرك ذيله فرحاً", pos: "v", example: "The puppy wagged its tail happily upon seeing its master." },
                { en: "wooden", ar: "خشبي / مصنوع من الخشب", pos: "adj", example: "They built a sturdy wooden bridge over the creek." },
                { en: "sparkling", ar: "متلألئ / براق ولامع", pos: "adj", example: "Sunlight reflected brilliantly on the sparkling water." },
                { en: "frighten", ar: "يُخيف / يُرعب الآخرين", pos: "v", example: "The dog barked fiercely to frighten the reflection." }
            ]
        }
    ],

    // Pop Quiz matching El-Moasser page 266
    popQuiz: {
        title: "Pop Quiz: Complete the sentences",
        boxWords: ["stream", "greedy", "bark", "fictional", "bridge"],
        questions: [
            { id: 1, sentence: "I enjoy reading {blank} stories because they take me to imaginary worlds.", answer: "fictional", ar: "أستمتع بقراءة القصص الخيالية لأنها تأخذني إلى عوالم خيالية ساحرة." },
            { id: 2, sentence: "The dog was so {blank} that he wanted the other dog's bone, too.", answer: "greedy", ar: "كان الكلب طماعاً لدرجة أنه أراد الاستيلاء على عظمة الكلب الآخر أيضاً." },
            { id: 3, sentence: "Dogs usually {blank} when they see strangers.", answer: "bark", ar: "تنبح الكلاب عادة عندما ترى الغرباء يقتربون." },
            { id: 4, sentence: "We crossed the {blank} to reach the park.", answer: "bridge", ar: "عبرنا الجسر لنصل إلى الحديقة العامة." },
            { id: 5, sentence: "Children were playing by a {blank} in the forest.", answer: "stream", ar: "كان الأطفال يلعبون بجوار جدول مائي صغير في الغابة." }
        ]
    },

    // Irregular Verbs
    verbs: [
        { base: "find", past: "found", pp: "found", meaning: "يجد" },
        { base: "carry", past: "carried", pp: "carried", meaning: "يحمل" },
        { base: "think", past: "thought", pp: "thought", meaning: "يفكر / يظن" },
        { base: "fall", past: "fell", pp: "fallen", meaning: "يسقط / يقع" },
        { base: "lose", past: "lost", pp: "lost", meaning: "يفقد / يخسر" },
        { base: "teach", past: "taught", pp: "taught", meaning: "يعلم / يدرس" }
    ],

    // Definitions
    definitions: [
        { term: "greedy", definition: "wanting more money, things, or food than you really need", translation: "جشع / طماع" },
        { term: "stream", definition: "a small, narrow river of clear water", translation: "جدول أو مجرى مائي ضيق" },
        { term: "bridge", definition: "a structure built over a river or road for people to cross", translation: "جسر / كوبري" },
        { term: "shadow", definition: "a dark reflection or shape formed when light is blocked", translation: "ظل / انعكاس الصورة" },
        { term: "fictional", definition: "imaginary and not existing in real life", translation: "خيالي / روائي" },
        { term: "moral", definition: "a valuable practical life lesson taught by an allegory", translation: "عبرة / مغزى أخلاقي" }
    ],

    // Synonyms and Antonyms
    synonyms: [
        { word: "various", meaning: "متنوع / مختلف", synonym: "different / numerous", antonym: "same / identical" },
        { word: "fictional", meaning: "خيالي", synonym: "imaginary / unreal", antonym: "real / true" },
        { word: "deep", meaning: "عميق المغزى", synonym: "profound / keen", antonym: "simple / light" },
        { word: "greedy", meaning: "جشع / طماع", synonym: "selfish / materialistic", antonym: "generous / contented" },
        { word: "tasty", meaning: "لذيذ الطعم", synonym: "delicious / yummy", antonym: "tasteless / horrible" }
    ],

    // Prefixes and Suffixes
    affixes: [
        { affix: "-en", type: "suffix", function: "تحول الاسم إلى فعل (fright ➔ frighten)", examples: "frighten (يخيف)" },
        { affix: "-en", type: "suffix", function: "تكوّن الصفة للدلالة على المادة الخام", examples: "wooden (خشبي)" },
        { affix: "-al", type: "suffix", function: "تكوّن الصفة من الاسم", examples: "fictional (خيالي), personal (شخصي)" },
        { affix: "-ity", type: "suffix", function: "تكوّن الاسم من الصفة", examples: "curiosity (حب الاستطلاع)" },
        { affix: "-ing", type: "suffix", function: "تكوّن الاسم من الفعل", examples: "setting (الزمان والمكان), ending (النهاية)" },
        { affix: "-y", type: "suffix", function: "تكوّن الصفة من الاسم (greed ➔ greedy)", examples: "greedy (جشع / طماع)" }
    ],

    // General Notes on Reading and Listening
    confusionNotes: [
        {
            title: "الفرق بين solution و resolution",
            titleEn: "solution vs resolution",
            titleAr: "الفرق بين حل المشكلة (solution) والقرار الحاسم/العزم (resolution)",
            note: "الكلمة solution تعني (حلاً عملياً لمشكلة أو مسألة). بينما resolution تعني (قراراً حاسماً أو عزيمة وإصراراً شخصياً أو تسوية لخلاف):",
            examples: [
                { en: "There is no simple solution to this math problem.", ar: "لا يوجد حل بسيط وسهل لهذه المسألة الرياضية." },
                { en: "She made a firm resolution to exercise every morning.", ar: "اتخذت قراراً حاسماً وعزيمة بممارسة الرياضة كل صباح." }
            ]
        },
        {
            title: "الفرق بين park و bark",
            titleEn: "park vs bark",
            titleAr: "الفرق بين الحديقة/يركن (park) ونباح الكلب/لحاء الشجر (bark)",
            note: "الكلمة park تعني (حديقة عامة أو يركن السيارة). بينما bark تعني (ينبح الكلب كفعل، أو لحاء الشجرة كاسم):",
            examples: [
                { en: "We went for an afternoon walk in the public park.", ar: "ذهبنا في نزهة مسائية للمشي في الحديقة العامة." },
                { en: "The dog began barking fiercely when the postman approached.", ar: "بدأ الكلب في النباح بشراسة عندما اقترب ساعي البريد." }
            ]
        },
        {
            title: "استخدام كلمة stream",
            titleEn: "stream as Noun",
            titleAr: "المعنى الدقيق لكلمة stream في اللغة الإنجليزية",
            note: "تأتي stream كاسم بمعنى (جدول مائي صغير أو سيل جارف من السوائل أو تدفق الأفكار):",
            examples: [
                { en: "A refreshing stream of clear mountain water flowed beside our campsite.", ar: "تدفق جدول منعش من مياه الجبال الصافية بجوار موقع مخيمنا." }
            ]
        }
    ],

    // Important Expressions & Prepositions
    expressions: [
        { en: "That's true!", ar: "هذا صحيح تماماً!" },
        { en: "have conflicts", ar: "يحتوي على صراعات وعقد درامية" },
        { en: "carry deep messages", ar: "يحمل رسائل وتوجيهات عميقة" },
        { en: "make the conversation more exciting", ar: "يجعل الحديث أكثر تشويقاً وإثارة" },
        { en: "try sharing personal experiences", ar: "حاول مشاركة خبراتك وتجاربك الشخصية" },
        { en: "answer questions orally", ar: "يجيب عن الأسئلة شفهياً" },
        { en: "give a clear ending", ar: "يضع خاتمة واضحة ومحددة" },
        { en: "plan your story", ar: "خطط لأحداث ومسار قصتك" }
    ],

    prepositions: [
        { en: "stay with", ar: "يظل عالقاً في الذاكرة مع الشخص" },
        { en: "fall into", ar: "يسقط في داخل الشيء (الماء/النهر)" },
        { en: "arrive at / in", ar: "يصل إلى مكان صغير (at) / مدينة أو دولة (in)" }
    ],

    // 3D Story Pages (Single WebP triptych rule)
    storyPages: [
        {
            titleEn: "Chapter 1: The Power of Story Messages",
            titleAr: "الفصل الأول: قوة الرسائل في القصص",
            textEn: "In their school library, Sarah and Amal reflected on why human beings treasure stories across all generations. Sarah explained that narrative tales help us perceive the world through various points of view, even from backgrounds we have never lived. Amal agreed, noting that even simple or fictional fables carry deep moral messages that stay with readers for decades, helping young minds grow mentally and emotionally wiser.",
            textAr: "في مكتبة المدرسة، تأملت سارة وأمل في سر حب البشر للقصص عبر جميع الأجيال المتعاقبة. أوضحت سارة أن الحكايات السردية تساعدنا على إدراك العالم من وجهات نظر متنوعة، حتى من بيئات لم نعش فيها قط. ووافقتها أمل، مشيرةً إلى أن حتى الحكايات الرمزية البسيطة أو الخيالية تحمل في طياتها رسائل أخلاقية عميقة تظل عالقة في أذهان القراء لعقود، مما يساعد العقول الفتية على النمو ذهنياً وعاطفياً لتصبح أكثر حكمة.",
            captionEn: "Reflecting on how fictional stories communicate enduring wisdom and empathy.",
            captionAr: "التأمل في قدرة القصص الخيالية على نقل الحكمة الإنسانية وقيم التعاطف للأجيال.",
            vocabChips: ["Various points of view", "Deep messages", "Life lessons", "Stay with us"]
        },
        {
            titleEn: "Chapter 2: The Lucky Dog and the Wooden Bridge",
            titleAr: "الفصل الثاني: الكلب المحظوظ والجسر الخشبي",
            textEn: "One sunny afternoon, a stray dog was overjoyed to stumble upon a fresh, tasty bone outside a butcher's shop. Clamping the prize firmly in his jaws, he trotted off proudly with his tail wagging merrily. To reach a peaceful clearing in the forest where he could dine undisturbed, he began crossing a narrow wooden bridge suspended over a cool, sparkling stream of clear running water.",
            textAr: "في ظهيرة أحد الأيام المشمسة، غمرت الفرحة كلباً جائعاً عندما عثر على عظمة طازجة وشهية أمام متجر الجزار. أمسك بالغنيمة الثمينة بإحكام بين فكيه، وانطلق يخب فخوراً وذيله يهتز طرباً. ولكي يصل إلى بقعة هادئة في الغابة ليتناول وجبته دون إزعاج، بدأ في عبور جسر خشبي ضيق معلق فوق جدول مائي رقراق وصافٍ ينساب بهدوء.",
            captionEn: "The proud dog carries his tasty prize across the wooden bridge over the stream.",
            captionAr: "الكلب الفخور يحمل عظمته الشهية ويعبر الجسر الخشبي فوق الجدول الرقراق.",
            vocabChips: ["Tasty bone", "Proudly wagging tail", "Wooden bridge", "Sparkling stream"]
        },
        {
            titleEn: "Chapter 3: The Shadow, Greed, and Regret",
            titleAr: "الفصل الثالث: الظل، الطمع، والندم",
            textEn: "Midway across the bridge, the dog glanced down into the crystalline water. Looking back at him was what appeared to be another dog carrying an even bigger, juicier bone! Overwhelmed by sheer greed, he refused to settle for his own feast. He opened his mouth wide to bark fiercely and frighten the rival—and splash! His bone slipped from his jaws and sank to the muddy bottom. Too late, he realized the 'rival' was merely his own shadow, teaching the eternal truth: greed loses what is already gained.",
            textAr: "في منتصف الجسر، نظر الكلب إلى أسفل في الماء الشفاف الصافي. وتراءى له ما ظنه كلباً آخر يحمل عظمة تبدو أكبر وأشهى بكثير! فاستبد به الطمع والجشع، ورفض الاكتفاء بما يملك؛ ففتح فمه على مصراعيه ليعوي بشراسة ويرعب منافسه—وطشّ! انزلقت عظمته من بين فكيه وغاصت في قاع النهر الطيني. وأدرك بعد فوات الأوان أن «المنافس» لم يكن سوى خياله المنعكس، ليتعلم الحقيقة الخالدة: الطمع يضيع ما جمع.",
            captionEn: "Barking at his own reflection, the greedy dog loses everything in the water.",
            captionAr: "نباح الكلب على ظله المنعكس يفقده طعامه الوحيد، معلماً درساً بليغاً في عواقب الطمع.",
            vocabChips: ["Shadow reflection", "Greedy barking", "Slipped into water", "Greed loses all"]
        }
    ],

    // Dialogue Player Data
    dialogue: {
        banner: {
            title: "🗣️ Speaking Dialogue: Why We Love Stories",
            subtitle: "حوار فكري تفاعلي بين سارة وأمل حول سر تأثير الحكايات ومغزى قصة الكلب وظله 💬"
        },
        lines: [
            {
                speaker: "Sarah",
                speakerAr: "سارة",
                avatar: "👩‍🎓",
                en: "I asked our English teacher yesterday why people across history love stories so much.",
                ar: "سألت معلمة اللغة الإنجليزية أمس عن سر حب الناس الشديد للقصص عبر التاريخ."
            },
            {
                speaker: "Amal",
                speakerAr: "أمل",
                avatar: "👧",
                en: "What an interesting question! What did she tell you?",
                ar: "يا له من سؤال ممتع! وماذا قالت لكِ؟"
            },
            {
                speaker: "Sarah",
                speakerAr: "سارة",
                avatar: "👩‍🎓",
                en: "She explained that stories show us the world from various points of view and help us develop empathy.",
                ar: "أوضحت أن القصص ترسم لنا العالم من وجهات نظر متنوعة وتساعدنا على بناء التعاطف الإنساني."
            },
            {
                speaker: "Amal",
                speakerAr: "أمل",
                avatar: "👧",
                en: "That's completely true! Every memorable story has a conflict and a moral lesson.",
                ar: "هذا صحيح تماماً! فكل قصة خالدة تحتوي على صراع ومغزى أخلاقي مستفاد."
            },
            {
                speaker: "Sarah",
                speakerAr: "سارة",
                avatar: "👩‍🎓",
                en: "Yes! Take the fable of 'The Dog and His Shadow', for example. It is short, but its message is powerful.",
                ar: "نعم! خذي حكاية «الكلب وظله» على سبيل المثال؛ فهي قصة قصيرة، لكن رسالتها شديدة القوة."
            },
            {
                speaker: "Amal",
                speakerAr: "أمل",
                avatar: "👧",
                en: "Right! The dog was so greedy that he barked at his own reflection and lost his tasty bone.",
                ar: "بالضبط! لقد كان الكلب طماعاً لدرجة أنه نبح على ظله المنعكس في الماء فخسر عظمته الشهية."
            },
            {
                speaker: "Sarah",
                speakerAr: "سارة",
                avatar: "👩‍🎓",
                en: "Exactly. It warns us that greed causes people to lose the valuable blessings they already possess.",
                ar: "تماماً. إنها تحذرنا من أن الجشع والطمع يضيعان على الإنسان النعم القيمة التي يملكها بالفعل."
            },
            {
                speaker: "Amal",
                speakerAr: "أمل",
                avatar: "👧",
                en: "Stories like this stay with us forever and help us make wiser choices every day.",
                ar: "القصص التي من هذا النوع تظل راسخة معنا دائماً وتعيننا على اتخاذ قرارات أكثر رشداً كل يوم."
            }
        ]
    },

    // Grammar & Narrative Writing Content HTML
    grammarContentHtml: `
        <div class="grammar-section">
            <div class="grammar-card">
                <h3 class="grammar-topic-title">⚡ 1. Story Planning & Narrative Arc (مخطط بناء القصة السردية)</h3>
                <p class="grammar-desc">لكتابة قصة سردية شيقة ومؤثرة <strong>(Narrative Story)</strong>، اتبع الهيكل الثلاثي الكلاسيكي:</p>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 15px;">
                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #4caf50;">
                        <h4 style="color: #4caf50; margin-bottom: 8px;">🎬 1. Beginning (البداية والتقديم)</h4>
                        <p><strong>العناصر:</strong> تقديم الزمان والمكان <em>(Setting)</em> والشخصيات الرئيسية <em>(Characters)</em>.</p>
                        <p style="font-size: 0.9rem; color: var(--accent-gold); font-weight: bold; margin-top: 5px;">One sunny day, a hungry dog found a tasty bone in town.</p>
                    </div>

                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #ff9800;">
                        <h4 style="color: #ff9800; margin-bottom: 8px;">⚡ 2. Middle (المنتصف وتصاعد الصراع)</h4>
                        <p><strong>العناصر:</strong> ظهور المشكلة أو الصراع <em>(Conflict)</em> ولحظة الذروة <em>(Climax)</em>.</p>
                        <p style="font-size: 0.9rem; color: var(--accent-gold); font-weight: bold; margin-top: 5px;">Crossing the bridge, he saw his shadow and greedily barked.</p>
                    </div>

                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #2196f3;">
                        <h4 style="color: #2196f3; margin-bottom: 8px;">🏁 3. Ending (النهاية والمغزى)</h4>
                        <p><strong>العناصر:</strong> حسم الصراع <em>(Resolution)</em> والدرس الأخلاقي المستفاد <em>(Moral)</em>.</p>
                        <p style="font-size: 0.9rem; color: var(--accent-gold); font-weight: bold; margin-top: 5px;">The bone fell into the stream. Greed causes great loss.</p>
                    </div>
                </div>
            </div>

            <div class="grammar-card" style="margin-top: 25px;">
                <h3 class="grammar-topic-title">⚡ 2. Reported Speech in Storytelling (نقل الكلام في القصص)</h3>
                <p class="grammar-desc">عند سرد ما قالته الشخصيات داخل القصة، نستخدم صيغ الكلام غير المباشر ببراعة:</p>

                <div class="rules-table-wrapper" style="overflow-x: auto; margin-top: 15px;">
                    <table class="rules-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--bg-card); color: var(--accent-primary);">
                                <th style="padding: 12px; border: 1px solid var(--border-color);">الكلام المباشر (Direct)</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">الكلام المنقول غير المباشر (Reported)</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">التغيير النحوي</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">The teacher said, "Stories help us grow."</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">The teacher said that stories <strong>helped</strong> us grow.</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">مضارع بسيط ➔ ماضٍ بسيط</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">Sarah said, "I have read a fable."</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">Sarah said that she <strong>had read</strong> a fable.</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">مضارع تام ➔ ماضٍ تام</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">Ali said to me, "I will stay calm."</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold); font-weight: bold;">Ali <strong>told me</strong> that he <strong>would</strong> stay calm.</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">said to ➔ told + will ➔ would</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,

    // 35 Questions covering Lessons 5 & 6
    quiz: [
        // Vocabulary & Definitions
        {
            id: 1,
            question: "A person or animal that wants far more food or possessions than they need is __________.",
            options: ["generous", "greedy", "patient", "polite"],
            correctAnswer: 1,
            explanation: "الشخص أو الكائن الطماع الذي يريد أكثر مما يحتاج هو greedy."
        },
        {
            id: 2,
            question: "A small, narrow river of clear running water is called a __________.",
            options: ["bridge", "stream", "mountain", "bone"],
            correctAnswer: 1,
            explanation: "الجدول أو المجرى المائي الصغير يسمى stream."
        },
        {
            id: 3,
            question: "The dog walked across a sturdy __________ to reach the other side of the stream.",
            options: ["bridge", "stream", "cloud", "beak"],
            correctAnswer: 0,
            explanation: "الجسر أو الكوبري للمرور يسمى bridge."
        },
        {
            id: 4,
            question: "The dog looked down into the water and saw his own __________ reflected on the surface.",
            options: ["friend", "shadow", "enemy", "teacher"],
            correctAnswer: 1,
            explanation: "الظل أو الانعكاس على سطح الماء هو shadow / reflection."
        },
        {
            id: 5,
            question: "The dog was lucky to find a __________ bone outside the meat market.",
            options: ["wooden", "tasty", "tasteless", "horrible"],
            correctAnswer: 1,
            explanation: "عظمة لذيذة وشهية هي a tasty bone."
        },
        {
            id: 6,
            question: "When dogs see unfamiliar strangers, they usually __________ loudly.",
            options: ["sing", "bark", "whisper", "smile"],
            correctAnswer: 1,
            explanation: "نباح الكلاب هو bark."
        },
        {
            id: 7,
            question: "Stories that are invented from the author's imagination are called __________ stories.",
            options: ["fictional", "factual", "historical", "scientific"],
            correctAnswer: 0,
            explanation: "القصص الخيالية الروائية تسمى fictional stories."
        },
        {
            id: 8,
            question: "The puppy wagged its __________ cheerfully when its owner returned home.",
            options: ["wing", "tail", "beak", "horn"],
            correctAnswer: 1,
            explanation: "يهز ذيله فرحاً هي wagged its tail."
        },
        {
            id: 9,
            question: "The bridge over the forest stream was made of strong __________ planks.",
            options: ["wooden", "plastic", "paper", "glass"],
            correctAnswer: 0,
            explanation: "ألواح خشبية هي wooden planks."
        },
        {
            id: 10,
            question: "The water in the natural creek was clear and __________ in the sunlight.",
            options: ["dirty", "sparkling", "cloudy", "dark"],
            correctAnswer: 1,
            explanation: "الماء اللامع المتلألئ في ضوء الشمس هو sparkling."
        },

        // Synonyms and Antonyms
        {
            id: 11,
            question: "The synonym of 'greedy' is __________.",
            options: ["generous", "selfish", "kind", "helpful"],
            correctAnswer: 1,
            explanation: "مرادف greedy (طماع / أناني) هو selfish."
        },
        {
            id: 12,
            question: "The antonym of 'greedy' is __________.",
            options: ["selfish", "materialistic", "generous", "hungry"],
            correctAnswer: 2,
            explanation: "عكس طماع وجشع هو كريم وسخي (generous)."
        },
        {
            id: 13,
            question: "The word 'fictional' is the opposite of __________.",
            options: ["imaginary", "unreal", "real", "invented"],
            correctAnswer: 2,
            explanation: "عكس خيالي (fictional) هو حقيقي وواقعي (real)."
        },
        {
            id: 14,
            question: "The synonym of 'tasty' is __________.",
            options: ["delicious", "horrible", "tasteless", "nasty"],
            correctAnswer: 0,
            explanation: "مرادف tasty (لذيذ وشهي) هو delicious أو yummy."
        },
        {
            id: 15,
            question: "The antonym of 'tasty' is __________.",
            options: ["delicious", "tasteless", "sweet", "flavorful"],
            correctAnswer: 1,
            explanation: "عكس لذيذ هو بلا طعم (tasteless)."
        },
        {
            id: 16,
            question: "The opposite of 'clear' water is __________ water.",
            options: ["sparkling", "cloudy", "pure", "clean"],
            correctAnswer: 1,
            explanation: "عكس ماء صافٍ (clear) هو ماء عكر (cloudy أو muddy)."
        },

        // Prefixes & Suffixes
        {
            id: 17,
            question: "To turn the noun 'wood' into an adjective, we add the suffix __________.",
            options: ["-al", "-en", "-ly", "-ful"],
            correctAnswer: 1,
            explanation: "إضافة اللاحقة '-en' للاسم wood تعطي الصفة wooden (خشبي)."
        },
        {
            id: 18,
            question: "To turn the noun 'greed' into an adjective, we add the suffix __________.",
            options: ["-y", "-ly", "-able", "-ment"],
            correctAnswer: 0,
            explanation: "إضافة اللاحقة '-y' للاسم greed تعطي الصفة greedy (طماع)."
        },
        {
            id: 19,
            question: "The suffix '-en' turns the noun 'fright' into the verb __________.",
            options: ["frighten", "frightful", "frightly", "frighting"],
            correctAnswer: 0,
            explanation: "اللاحقة '-en' تحول fright إلى الفعل frighten (يخيف / يرعب)."
        },
        {
            id: 20,
            question: "The suffix '-ity' in 'curiosity' forms a/an __________.",
            options: ["adverb", "adjective", "noun", "verb"],
            correctAnswer: 2,
            explanation: "اللاحقة '-ity' تكون الاسم من الصفة (curious ➔ curiosity)."
        },

        // Confusion Pairs & Expressions
        {
            id: 21,
            question: "The doctor performed a very delicate surgical __________ on the patient's heart.",
            options: ["process", "operation", "series", "stairs"],
            correctAnswer: 1,
            explanation: "العملية الجراحية الطبية تسمى operation."
        },
        {
            id: 22,
            question: "Writing a novel is a creative __________ that requires patience and revisions.",
            options: ["process", "operation", "bridge", "stairs"],
            correctAnswer: 0,
            explanation: "العملية المنهجية أو الإبداعية المتتابعة تسمى process."
        },
        {
            id: 23,
            question: "The guard told the driver, 'You cannot __________ your car in this private lane.'",
            options: ["bark", "park", "pack", "pick"],
            correctAnswer: 1,
            explanation: "يركن السيارة هي park your car."
        },
        {
            id: 24,
            question: "The bone slipped from the dog's mouth and fell __________ the rushing stream.",
            options: ["into", "onto", "out", "over"],
            correctAnswer: 0,
            explanation: "يسقط في داخل الماء تأخذ حرف الجر into (fell into the stream)."
        },
        {
            id: 25,
            question: "Good stories carry deep messages that stay __________ us long after reading.",
            options: ["from", "with", "at", "by"],
            correctAnswer: 1,
            explanation: "تظل عالقة مع الشخص في الذاكرة: stay with us."
        },

        // Narrative Analysis: The Dog and His Shadow
        {
            id: 26,
            question: "What did the dog find at the beginning of the story?",
            options: [
                "A gold coin",
                "A tasty bone",
                "A loaf of bread",
                "A wooden stick"
            ],
            correctAnswer: 1,
            explanation: "وجد الكلب عظمة لذيذة (a tasty bone)."
        },
        {
            id: 27,
            question: "Where was the dog when he looked down and saw his reflection?",
            options: [
                "Inside a butcher shop",
                "On a wooden bridge over a stream",
                "On top of a rocky mountain",
                "Under a big oak tree"
            ],
            correctAnswer: 1,
            explanation: "كان يعبر جسراً خشبياً فوق جدول مائي (on a wooden bridge over a stream)."
        },
        {
            id: 28,
            question: "Why did the dog bark at the reflection in the water?",
            options: [
                "Because he was singing a song",
                "Because he was greedy and wanted to frighten the other dog to get its bone",
                "To ask for directions to the park",
                "Because he fell into the water"
            ],
            correctAnswer: 1,
            explanation: "نباحه كان بدافع الطمع لإخافة الكلب الآخر وأخذ عظمته الأكبر حجماً."
        },
        {
            id: 29,
            question: "What was the final outcome when the dog barked?",
            options: [
                "He caught two bones and ate them happily",
                "His own bone dropped into the stream and was lost",
                "The other dog jumped out of the water to play",
                "A fisherman gave him fish"
            ],
            correctAnswer: 1,
            explanation: "سقطت عظمته في مجرى الماء وفقدها تماماً ولم يربح شيئاً."
        },
        {
            id: 30,
            question: "What moral lesson does 'The Dog and His Shadow' teach readers?",
            options: [
                "Dogs must learn how to swim well",
                "Being greedy can cause you to lose what you already have",
                "Never cross wooden bridges in the afternoon",
                "Always look into rivers before drinking"
            ],
            correctAnswer: 1,
            explanation: "المغزى الأخلاقي هو أن الطمع والجشع يضيعان على الإنسان ما يملكه بالفعل."
        },

        // Grammar: Reported Speech & Sequence Adverbs
        {
            id: 31,
            question: "Sarah said, 'Stories help us learn.' In reported speech: Sarah said that stories __________ us learn.",
            options: ["help", "helped", "helping", "had helped"],
            correctAnswer: 1,
            explanation: "يتحول المضارع البسيط help إلى الماضي البسيط helped."
        },
        {
            id: 32,
            question: "Amal said to Sarah, 'I will write my own story.' Amal __________ Sarah that she would write her story.",
            options: ["said", "told", "tells", "says"],
            correctAnswer: 1,
            explanation: "تتحول said to + مفعول إلى told + مفعول."
        },
        {
            id: 33,
            question: "'The dog lost his bone,' the teacher said. The teacher said that the dog __________ his bone.",
            options: ["loses", "had lost", "is losing", "losts"],
            correctAnswer: 1,
            explanation: "الماضي البسيط lost يتحول إلى ماضٍ تام had lost."
        },
        {
            id: 34,
            question: "Which of the following phrases indicates the setting of a narrative?",
            options: [
                "'Once upon a time in a faraway forest'",
                "'He barked loudly'",
                "'Greed leads to great sorrow'",
                "'The bone fell into the water'"
            ],
            correctAnswer: 0,
            explanation: "العبارة 'Once upon a time in a faraway forest' تحدد الزمان والمكان (Setting)."
        },
        {
            id: 35,
            question: "In story planning, where does the main conflict usually reach its most exciting point?",
            options: [
                "In the very first sentence",
                "In the middle at the climax",
                "In the title of the book",
                "After the book is closed"
            ],
            correctAnswer: 1,
            explanation: "يصل الصراع إلى ذروة الإثارة في منتصف القصة عند نقطة الذروة (climax)."
        }
    ]
};

// Aliasing for universal engine compatibility
window.lessonData.questions = window.lessonData.quiz;
