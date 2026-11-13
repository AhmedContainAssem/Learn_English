/**
 * Prep 3 - Unit 5: Design Thinking
 * Lessons 5 & 6: Let's Talk • Try, Learn, and Improve
 * Data payload strictly adhering to Decoupled Architecture
 */

window.lessonData = {
    title: "Lessons 5 & 6: Let's Talk • Try, Learn, and Improve",
    unit: "Unit 5: Design Thinking",
    grade: "Prep 3",
    term: "Term 1",
    totalQuestions: 35,

    // Vocabulary categorized by section
    lessonVocabulary: [
        {
            category: "Key Vocabulary (المفردات الرئيسية)",
            words: [
                { en: "perfect", ar: "مثالي / تام / خلو من العيوب", pos: "adj", example: "Don't worry about being perfect on your first attempt." },
                { en: "come up with", ar: "يبتكر / يتوصل إلى فكرة", pos: "phr v", example: "She managed to come up with a creative solution." },
                { en: "process", ar: "عملية / سلسلة من الخطوات المتتالية", pos: "n", example: "Design thinking is a step-by-step learning process." },
                { en: "steps", ar: "خطوات إجرائية", pos: "n", example: "Follow the five steps to improve your product." },
                { en: "make sense", ar: "يحمل معنى منطقياً / مفهوم", pos: "v phr", example: "Your explanation makes complete sense." },
                { en: "improve", ar: "يُحسن / يطوّر للأفضل", pos: "v", example: "Engineers constantly improve their prototypes." }
            ]
        },
        {
            category: "Lesson 5 Vocabulary (SB pages 80 & 81)",
            words: [
                { en: "creative", ar: "مبدع / مبتكر", pos: "adj", example: "Be creative during the brainstorming session." },
                { en: "simple", ar: "بسيط / غير معقد", pos: "adj", example: "Build a simple model to test your ideas." },
                { en: "model", ar: "نموذج / مجسم", pos: "n", example: "They displayed a 3D model of the school yard." },
                { en: "design thinking", ar: "التفكير التصميمي والابتكاري", pos: "n", example: "Design thinking helps us solve complex problems." },
                { en: "useful", ar: "مفيد / نافع", pos: "adj", example: "The app provides useful tips for students." },
                { en: "summarize", ar: "يُلخص الأفكار الرئيسية", pos: "v", example: "Summarize the key points in one short paragraph." },
                { en: "prototype", ar: "نموذج أولي تجريبي", pos: "n", example: "A prototype doesn't have to be perfect." },
                { en: "flow", ar: "يتدفق / ينساب بسلاسة", pos: "v", example: "The conversation flows naturally when you ask questions." },
                { en: "naturally", ar: "بشكل طبيعي وتلقائي", pos: "adv", example: "Repeat keywords to keep dialogue flowing naturally." },
                { en: "series", ar: "سلسلة متتابعة", pos: "n", example: "A process is a series of interconnected actions." },
                { en: "achieve", ar: "يحقق / ينجز هدفاً", pos: "v", example: "Work hard to achieve your academic goals." },
                { en: "logically", ar: "بشكل منطقي ومعقول", pos: "adv", example: "Arrange your presentation points logically." },
                { en: "invent", ar: "يخترع / يبتكر", pos: "v", example: "They invented a new device to clean the playground." },
                { en: "ideal", ar: "نموذجي / مثالي", pos: "adj", example: "This desk layout is ideal for group collaboration." }
            ]
        },
        {
            category: "Lesson 6 Vocabulary (SB page 82)",
            words: [
                { en: "include", ar: "يتضمن / يشمل", pos: "v", example: "Does the proposal include cost estimations?" },
                { en: "colorful", ar: "ملون / مبهج الألوان", pos: "adj", example: "They made a colorful chart to catch students' attention." },
                { en: "reminder chart", ar: "مخطط أو جدول للتذكير", pos: "n", example: "A homework reminder chart helps students organize tasks." },
                { en: "feedback", ar: "تغذية راجعة / آراء وملاحظات المستخدمين", pos: "n", example: "Ask for user feedback to fix bugs and improve the design." },
                { en: "print", ar: "يطبع على ورق", pos: "v", example: "We will print 100 copies of the chart for the class." },
                { en: "space", ar: "مساحة / فراغ للكتابة", pos: "n", example: "Leave enough space for parents' signatures." },
                { en: "hesitate", ar: "يتردد في اتخاذ قرار", pos: "v", example: "Don't hesitate to share your ideas." },
                { en: "trust", ar: "يثق في / ثقة", pos: "v, n", example: "Always trust your abilities when trying new things." },
                { en: "effort", ar: "مجهود / مسعى", pos: "n", example: "It takes genuine effort to build great solutions." }
            ]
        }
    ],

    // Pop Quiz matching El-Moasser page 218
    popQuiz: {
        title: "Pop Quiz: Complete the sentences",
        boxWords: ["perfect", "steps", "come up", "prototype", "process"],
        questions: [
            { id: 1, sentence: "The engineers designed a {blank} and tested it.", answer: "prototype", ar: "صمم المهندسون نموذجاً أولياً وقاموا باختباره عملياً." },
            { id: 2, sentence: "The solution Leen suggested was greatly {blank} for the problem.", answer: "perfect", ar: "كان الحل الذي اقترحته لين مثالياً ومناسباً جداً للمشكلة." },
            { id: 3, sentence: "The first {blank} in the process were the most important for success.", answer: "steps", ar: "كانت الخطوات الأولى في العملية هي الأكثر أهمية للنجاح." },
            { id: 4, sentence: "The {blank} of learning a new language takes time and patience.", answer: "process", ar: "عملية تعلم لغة جديدة تستغرق وقتاً وصبراً." },
            { id: 5, sentence: "She managed to {blank} with a creative idea for the project.", answer: "come up", ar: "تمكنت من التوصل إلى فكرة إبداعية ومبتكرة للمشروع." }
        ]
    },

    // Irregular Verbs
    verbs: [
        { base: "know", past: "knew", pp: "known", meaning: "يعرف" },
        { base: "take", past: "took", pp: "taken", meaning: "يأخذ / يستغرق" },
        { base: "come", past: "came", pp: "come", meaning: "يأتي" },
        { base: "keep", past: "kept", pp: "kept", meaning: "يحافظ / يواصل" },
        { base: "get", past: "got", pp: "got", meaning: "يحصل على / يصبح" },
        { base: "show", past: "showed", pp: "shown", meaning: "يوضح / يبين" },
        { base: "teach", past: "taught", pp: "taught", meaning: "يعلم / يدرس" },
        { base: "forget", past: "forgot", pp: "forgotten", meaning: "ينسى" }
    ],

    // Definitions
    definitions: [
        { term: "come up with", definition: "to invent or think of an idea or plan", translation: "يبتكر / يتوصل إلى فكرة" },
        { term: "make sense", definition: "logically correct; easy to understand", translation: "يحمل معنى منطقياً ومفهوماً" },
        { term: "perfect", definition: "as good as possible; ideal", translation: "مثالي / خالٍ من العيوب" },
        { term: "process", definition: "a series of steps or actions taken to achieve something", translation: "عملية / خطوات متتالية" },
        { term: "design thinking", definition: "a way to solve problems by doing some steps", translation: "التفكير الابتكاري لحل المشكلات" },
        { term: "fix", definition: "to mend or repair something and make it better", translation: "يصلح / يُعدل" },
        { term: "challenge", definition: "a difficulty or problem that needs to be overcome", translation: "تحدٍّ / صعوبة تحتاج إلى حل" }
    ],

    // Synonyms and Antonyms
    synonyms: [
        { word: "perfect", meaning: "مثالي / متقن", synonym: "ideal / exact", antonym: "imperfect" },
        { word: "summarize", meaning: "يلخص", synonym: "sum up / outline", antonym: "lengthen" },
        { word: "fun", meaning: "متعة / تسلية", synonym: "enjoyment / joy", antonym: "boredom / depression" },
        { word: "interest", meaning: "اهتمام", synonym: "significance / concern", antonym: "insignificance" }
    ],

    // Prefixes and Suffixes
    affixes: [
        { affix: "-ly", type: "suffix", function: "تكوّن الظرف من الصفة", examples: "closely (عن قرب), naturally (بشكل طبيعي)" },
        { affix: "-er", type: "suffix", function: "تكوّن الاسم من الفعل", examples: "reminder (رسالة أو أداة تذكير)" },
        { affix: "proto-", type: "prefix", function: "تعطي معنى أول أو بدائي (first)", examples: "prototype (نموذج أولي)" },
        { affix: "-ive", type: "suffix", function: "تكوّن الصفة من الفعل", examples: "active (نشط / فاعل)" }
    ],

    // General Notes on Reading and Listening
    confusionNotes: [
        {
            title: "الفرق بين operation و process",
            titleEn: "operation vs process",
            titleAr: "الفرق بين العملية الجراحية/التشغيلية (operation) والعملية الإجرائية (process)",
            note: "operation (عملية جراحية طبية أو تشغيل آلة) بينما process (عملية إجرائية - سلسلة من الخطوات للتطوير والتنفيذ).",
            examples: [
                { en: "The operation of the machine is very smooth.", ar: "تشغيل الآلة يتم بسلاسة تامة دون أي مشاكل." },
                { en: "My uncle had to have a heart operation.", ar: "اضطر عمي لإجراء عملية جراحية دقيقة في القلب." },
                { en: "Design thinking is a process where you improve your prototype many times.", ar: "التفكير التصميمي عملية إجرائية تقوم فيها بتحسين نموذجك الأولي عدة مرات." }
            ]
        },
        {
            title: "الفرق بين practical و theoretical",
            titleEn: "practical vs theoretical",
            titleAr: "الفرق بين العملي والتطبيقي (practical) والنظري (theoretical)",
            note: "practical (عملي وواقعي قابل للتطبيق والاستفادة منه) بينما theoretical (نظري فقط ولا يمكن تطبيقه بسهولة في الواقع).",
            examples: [
                { en: "AI apps can give you practical advice.", ar: "تطبيقات الذكاء الاصطناعي يمكن أن تقدم لك نصائح وتوجيهات عملية." },
                { en: "Your idea is theoretical, we cannot apply it in real life.", ar: "فكرتك نظرية فحسب، ولا يمكننا تطبيقها في أرض الواقع." }
            ]
        },
        {
            title: "الفرق بين steps و stairs",
            titleEn: "steps vs stairs",
            titleAr: "الفرق بين الخطوات الإجرائية (steps) ودرجات السلم الحقيقية (stairs)",
            note: "steps (خطوات معنوية أو إجرائية متتابعة لإنجاز عمل) بينما stairs (درجات السلم الخرساني أو الخشبي للصعود والنزول).",
            examples: [
                { en: "We are taking great steps to prevent pollution.", ar: "نحن نتخذ خطوات وإجراءات هامة للحد من التلوث." },
                { en: "We had to carry the heavy box up the stairs.", ar: "اضطررنا لحمل الصندوق الثقيل صعوداً على درجات السلم." }
            ]
        },
        {
            title: "قاعدة الفعل keep + V-ing",
            titleEn: "keep + V-ing rule",
            titleAr: "صيغة التعبير عن الاستمرار والمواصلة باستخدام الفعل keep",
            note: "يأتي بعد الفعل keep صيغة الفعل مضافاً له V-ing للتعبير عن مواصلة والاستمرار في الشيء دون توقف.",
            examples: [
                { en: "Keep improving your prototype.", ar: "واصل تحسين وتطوير نموذجك الأولي." },
                { en: "Keep asking questions to keep the conversation flowing.", ar: "استمر في طرح الأسئلة للحفاظ على تدفق المحادثة وسلاستها." }
            ]
        }
    ],

    // Important Expressions & Prepositions
    expressions: [
        { en: "make changes", ar: "يُحدث تغييرات وتحسينات" },
        { en: "do some steps", ar: "يقوم ببعض الخطوات" },
        { en: "take some time", ar: "يستغرق بعض الوقت" },
        { en: "come next", ar: "يأتي تالياً أو بعد ذلك" },
        { en: "I got it", ar: "لقد فهمت واستوعبت الأمر" },
        { en: "make a simple model", ar: "يصمم نموذجاً بسيطاً" },
        { en: "make it better = improve", ar: "يقوم بتحسينه وتطويره" },
        { en: "keep improving", ar: "يواصل التطوير والتحسين المستمر" },
        { en: "flow naturally", ar: "يتدفق الحديث طبيعياً وتلقائياً" },
        { en: "a little bit", ar: "قليلاً" },
        { en: "sounds fun", ar: "يبدو الأمر ممتعاً!" },
        { en: "build a simple prototype", ar: "يبني نموذجاً أولياً بسيطاً" },
        { en: "it doesn't work", ar: "معطل / لا يفي بالغرض" },
        { en: "trust your abilities", ar: "ثق في قدراتك ومهاراتك" },
        { en: "aged 82", ar: "يبلغ من العمر 82 عاماً" }
    ],

    prepositions: [
        { en: "solve ... by trying", ar: "يحل عن طريق المحاولة والتجريب" },
        { en: "think of", ar: "يفكر في أفكار جديدة" },
        { en: "ask for", ar: "يطلب المساعدة أو الرأي" },
        { en: "worry about", ar: "يقلق بشأن" },
        { en: "easy to understand", ar: "سهل الفهم والاستيعاب" }
    ],

    // 3D Story Pages (Single WebP triptych rule)
    storyPages: [
        {
            titleEn: "Chapter 1: The Iterative Nature of Design",
            titleAr: "الفصل الأول: الطبيعة المتكررة للتصميم",
            textEn: "Design thinking is not a one-time test; it is an ongoing process where you solve problems through structured steps. First, you must deeply understand your users and what they need, even if that takes time. Next, think of many creative ideas and don't worry about being perfect on your first try. Perfection is not the starting point—learning from the journey is!",
            textAr: "التفكير التصميمي ليس اختباراً لمرة واحدة، بل هو عملية مستمرة تحل فيها المشكلات من خلال خطوات محددة. أولاً، يجب أن تفهم بعمق مستخدميك وما يحتاجون إليه، حتى وإن استغرق ذلك بعض الوقت. ثانياً، فكر في العديد من الأفكار الإبداعية ولا تقلق بشأن الوصول للكمال من المحاولة الأولى، فالكمال ليس نقطة البداية بل التعلم المستمر!",
            captionEn: "Design is a process: understand user needs before rushing to build.",
            captionAr: "التصميم عملية متدرجة: افهم احتياجات المستخدمين قبل التسرع في التنفيذ.",
            vocabChips: ["Process", "Steps", "Understand users", "Not perfect"]
        },
        {
            titleEn: "Chapter 2: The Homework Reminder Chart",
            titleAr: "الفصل الثاني: مخطط التذكير بالواجبات المدرسية",
            textEn: "At school, Amir and his team tackled a common challenge: students frequently forgot their daily homework. Instead of scolding students, they applied design thinking. They created a simple prototype: a colorful desk reminder chart divided into clear daily subjects. They tested it by giving copies to twenty classmates for an entire week to observe how they used it.",
            textAr: "في المدرسة، تصدى أمير وفريقه لتحدٍ متكرر: نسيان الطلاب المتكرر لأداء واجباتهم اليومية. وبدلاً من توبيخ الطلاب، طبق الفريق التفكير التصميمي؛ فصنعوا نموذجاً أولياً بسيطاً: مخطط مكتبي ملون للتذكير مقسم حسب المواد اليومية. واختبروه بتوزيع نسخ على عشرين من زملائهم لاستخدامه لمدة أسبوع كامل ومراقبة تفاعلهم.",
            captionEn: "Prototyping a colorful reminder chart to help students stay organized.",
            captionAr: "بناء نموذج لمخطط تذكير ملون لمساعدة الطلاب على تنظيم واجباتهم.",
            vocabChips: ["Reminder chart", "Colorful", "Tested for a week", "Prototype"]
        },
        {
            titleEn: "Chapter 3: Feedback, Reflection, and Improvement",
            titleAr: "الفصل الثالث: التغذية الراجعة والتحسين المستمر",
            textEn: "After one week, the team asked for feedback from both students and teachers. The feedback was overwhelmingly positive, but students asked for one useful addition: extra space for parents' notes. The team immediately modified the design to include this space. Amir learned that testing, listening, and fixing keeps a design practical, useful, and truly successful.",
            textAr: "بعد مرور أسبوع، طلب الفريق التغذية الراجعة والملاحظات من الطلاب والمعلمين. كانت الآراء إيجابية للغاية، لكن الطلاب طلبوا إضافة مفيدة: مساحة إضافية لملاحظات أولياء الأمور. فقام الفريق على الفور بتعديل التصميم ليتضمن تلك المساحة. وتعلم أمير أن الاختبار، والاستماع، والتصحيح هو ما يجعل التصميم عملياً وناجحاً بحق.",
            captionEn: "Listening to user feedback to refine the prototype into an ideal solution.",
            captionAr: "الاستماع لملاحظات المستخدمين لتطوير النموذج الأولي إلى حل مثالي.",
            vocabChips: ["Feedback", "Modified design", "Practical & useful", "Continuous improvement"]
        }
    ],

    // Dialogue Player Data
    dialogue: {
        banner: {
            title: "🗣️ Speaking Dialogue: Learning About Design Thinking",
            subtitle: "حوار تعليمي تفاعلي بين أمير ومجدي حول خطوات التفكير التصميمي وأسرار الحوار التلقائي 💬"
        },
        lines: [
            {
                speaker: "Amir",
                speakerAr: "أمير",
                avatar: "🧑‍💻",
                en: "Hi Magdy! Do you know what design thinking actually is?",
                ar: "مرحباً يا مجدي! هل تعرف حقاً ما هو التفكير التصميمي؟"
            },
            {
                speaker: "Magdy",
                speakerAr: "مجدي",
                avatar: "🙋‍♂️",
                en: "Not really, Amir. What is it?",
                ar: "ليس تماماً يا أمير. ما هو بالتحديد؟"
            },
            {
                speaker: "Amir",
                speakerAr: "أمير",
                avatar: "🧑‍💻",
                en: "It's a way to solve problems by following a few clear steps. First, you understand the users and their needs.",
                ar: "إنها طريقة لحل المشكلات باتباع خطوات محددة. أولاً، تفهم المستخدمين واحتياجاتهم."
            },
            {
                speaker: "Magdy",
                speakerAr: "مجدي",
                avatar: "🙋‍♂️",
                en: "Okay, that makes sense. What comes next?",
                ar: "حسناً، هذا كلام منطقي. وما الذي يأتي بعد ذلك؟"
            },
            {
                speaker: "Amir",
                speakerAr: "أمير",
                avatar: "🧑‍💻",
                en: "Next, think of many creative ideas. Don't worry about being perfect on your first try!",
                ar: "بعد ذلك، فكر في العديد من الأفكار المبدعة. ولا تقلق بشأن أن تكون مثالياً من أول محاولة!"
            },
            {
                speaker: "Magdy",
                speakerAr: "مجدي",
                avatar: "🙋‍♂️",
                en: "Got it! And then what do we build?",
                ar: "فهمت! وماذا نبني بعد ذلك؟"
            },
            {
                speaker: "Amir",
                speakerAr: "أمير",
                avatar: "🧑‍💻",
                en: "Then you build a simple prototype. Finally, test it with real people and ask for their feedback.",
                ar: "ثم تبني نموذجاً أولياً بسيطاً. وأخيراً، تختبره مع أشخاص حقيقيين وتطلب ملاحظاتهم وتغذيتهم الراجعة."
            },
            {
                speaker: "Magdy",
                speakerAr: "مجدي",
                avatar: "🙋‍♂️",
                en: "Brilliant! So we understand, brainstorm, prototype, and keep improving!",
                ar: "عبقري! إذن نفهم، نعصف ذهنياً، نصنع نموذجاً، ونواصل التحسين!"
            }
        ]
    },

    // Grammar & Writing Content HTML
    grammarContentHtml: `
        <div class="grammar-section">
            <div class="grammar-card">
                <h3 class="grammar-topic-title">⚡ 1. Conversation & Active Listening Tips (مهارات الحوار الفعّال)</h3>
                <p class="grammar-desc">لجعل المحادثة تتدفق بشكل طبيعي <strong>(flow naturally)</strong> وتظهر اهتمامك بالتعلم، اتبع الإرشادات التالية:</p>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 15px; margin-top: 15px;">
                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #2196f3;">
                        <h4 style="color: #2196f3; margin-bottom: 8px;">❓ Ask Follow-Up Questions (طرح أسئلة للمتابعة)</h4>
                        <p>عندما تتعلم شيئاً جديداً، اطرح أسئلة تبين اهتمامك وتحافظ على استمرارية الحوار:</p>
                        <ul style="padding-right: 20px; line-height: 1.8;">
                            <li><strong>What's next?</strong> (ما التالي؟)</li>
                            <li><strong>Is it okay if...?</strong> (هل من المقبول لو...؟)</li>
                            <li><strong>That makes sense!</strong> (هذا أمر منطقي ومفهوم!)</li>
                        </ul>
                    </div>

                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #4caf50;">
                        <h4 style="color: #4caf50; margin-bottom: 8px;">🔁 Repeat Key Words (تكرار الكلمات المفتاحية)</h4>
                        <p>تكرار الكلمات المحورية يوضح أنك تستمع بتركيز ويساعدك على ترسيخ المعنى:</p>
                        <ul style="padding-right: 20px; line-height: 1.8;">
                            <li>Teacher: "We will build a <strong>prototype</strong>."</li>
                            <li>Student: "A <strong>prototype</strong>? So it's just a simple model?"</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="grammar-card" style="margin-top: 25px;">
                <h3 class="grammar-topic-title">✍️ 2. Writing a Design Review (كتابة مراجعة لمشروع تصميم)</h3>
                <p class="grammar-desc">عند كتابة تقرير أو مراجعة <strong>(Review)</strong> تشرح فيها خطوات حل المشكلة، استخدم الهيكل المنطقي التالي مع ظروف التسلسل:</p>

                <div class="rules-table-wrapper" style="overflow-x: auto; margin-top: 15px;">
                    <table class="rules-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--bg-card); color: var(--accent-primary);">
                                <th style="padding: 12px; border: 1px solid var(--border-color);">الخطوة</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">العبارة المفتاحية</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">الوظيفة في المقال</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">1. المشكلة (Problem)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);"><strong>First</strong>, our group wanted to solve the problem of...</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">تحديد المشكلة التي واجهت الفئة المستهدفة بوضوح</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">2. الفكرة والحل (Solution)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);">Our idea was to make / We decided to...</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">شرح الفكرة المبتكرة أو النموذج الأولي المقترح</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">3. الاختبار (Testing)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);"><strong>Next</strong>, we tested it by giving the chart to...</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">توضيح كيفية اختبار النموذج عملياً لمدة محددة</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">4. التغذية والتحسين (Feedback)</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);"><strong>Finally</strong>, we asked for feedback and modified the design...</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">جمع آراء المستخدمين وتطوير التصميم ليكون عملياً</td>
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
            question: "Design thinking is a __________ where you improve your prototype many times.",
            options: ["printer", "process", "result", "product"],
            correctAnswer: 1,
            explanation: "التفكير التصميمي هو عملية إجرائية (process) لتطوير النماذج الأولية."
        },
        {
            id: 2,
            question: "It is essential to keep your design __________ and useful in daily life.",
            options: ["complicated", "difficult", "practical", "crazy"],
            correctAnswer: 2,
            explanation: "من الضروري أن يكون التصميم عملياً وواقعياً (practical) ومفيداً."
        },
        {
            id: 3,
            question: "After testing the prototype, engineers can __________ it and make it better.",
            options: ["break", "sell", "fix", "destroy"],
            correctAnswer: 2,
            explanation: "بعد اختبار النموذج، يمكن إصلاحه وتعديله (fix it) وجعله أفضل."
        },
        {
            id: 4,
            question: "Before making a decision, consider the challenge from every point of __________.",
            options: ["view", "process", "prototype", "schedule"],
            correctAnswer: 0,
            explanation: "التعبير 'وجهة نظر' هو point of view."
        },
        {
            id: 5,
            question: "To 'come up with' an idea means to __________ it.",
            options: ["forget", "invent", "steal", "refuse"],
            correctAnswer: 1,
            explanation: "معنى come up with هو يبتكر أو يخترع فكرة (invent)."
        },
        {
            id: 6,
            question: "Something that is 'logically correct and easy to understand' makes __________.",
            options: ["fun", "sense", "noise", "trouble"],
            correctAnswer: 1,
            explanation: "التعبير make sense يعني يحمل معنى منطقياً ومفهوماً."
        },
        {
            id: 7,
            question: "A __________ is a series of actions or steps taken in order to achieve a particular end.",
            options: ["process", "stairs", "furniture", "space"],
            correctAnswer: 0,
            explanation: "السلسلة من الخطوات لتحقيق هدف معين تسمى عملية (process)."
        },
        {
            id: 8,
            question: "A homework __________ chart helped students remember their daily assignments.",
            options: ["reminder", "conflict", "problem", "danger"],
            correctAnswer: 0,
            explanation: "مخطط التذكير بالواجبات يسمى reminder chart."
        },
        {
            id: 9,
            question: "After testing the chart, the team asked teachers and students for __________.",
            options: ["money", "feedback", "coffee", "fines"],
            correctAnswer: 1,
            explanation: "طلبوا التغذية الراجعة والآراء (feedback) لتطوير التصميم."
        },
        {
            id: 10,
            question: "The prototype does not need to be __________ on your very first try.",
            options: ["tested", "perfect", "drawn", "seen"],
            correctAnswer: 1,
            explanation: "لا يلزم أن يكون النموذج الأولي مثالياً وتاماً (perfect) من المحاولة الأولى."
        },

        // Synonyms, Antonyms & Affixes
        {
            id: 11,
            question: "The synonym of 'perfect' is __________.",
            options: ["theoretical", "unrealistic", "ideal", "impossible"],
            correctAnswer: 2,
            explanation: "مرادف مثالي (perfect) هو نموذجي (ideal) أو exact."
        },
        {
            id: 12,
            question: "The prefix 'proto-' in the word 'prototype' means __________.",
            options: ["first", "last", "again", "opposite"],
            correctAnswer: 0,
            explanation: "البادئة proto- تعني الأولي أو الأول (first)."
        },
        {
            id: 13,
            question: "The verb 'act' can become an adjective by adding the suffix __________.",
            options: ["-ness", "-ive", "-ity", "-al"],
            correctAnswer: 1,
            explanation: "إضافة اللاحقة '-ive' للفعل act تعطي الصفة active (نشط)."
        },
        {
            id: 14,
            question: "'Enjoyment' and 'boredom' are __________.",
            options: ["synonyms", "opposites", "homophones", "identical"],
            correctAnswer: 1,
            explanation: "المتعة (enjoyment) والملل (boredom) هما كلمتان متضادتان (opposites)."
        },
        {
            id: 15,
            question: "The suffix '-ly' in 'naturally' turns the adjective 'natural' into a/an __________.",
            options: ["verb", "adverb", "noun", "preposition"],
            correctAnswer: 1,
            explanation: "اللاحقة '-ly' تحول الصفة natural إلى الظرف naturally."
        },
        {
            id: 16,
            question: "To 'summarize' a text means to __________.",
            options: ["lengthen it", "sum it up", "forget it", "hide it"],
            correctAnswer: 1,
            explanation: "يلخص (summarize) مرادفها يوجز ويقدم الأفكار الرئيسية (sum up)."
        },
        {
            id: 17,
            question: "The opposite of 'perfect' is __________.",
            options: ["imperfect", "practical", "complete", "active"],
            correctAnswer: 0,
            explanation: "عكس مثالي (perfect) هو غير كامل أو غير مثالي (imperfect)."
        },

        // Language Notes & Confusion Pairs
        {
            id: 18,
            question: "My uncle had a successful heart __________ at Cairo University Hospital.",
            options: ["operation", "process", "series", "prototype"],
            correctAnswer: 0,
            explanation: "العملية الجراحية الطبية تسمى operation."
        },
        {
            id: 19,
            question: "Scientific thinking is a step-by-step __________ to discover new knowledge.",
            options: ["operation", "process", "stairs", "furniture"],
            correctAnswer: 1,
            explanation: "العملية الإجرائية المنهجية تسمى process."
        },
        {
            id: 20,
            question: "Your project idea is purely __________; we cannot apply it in real life.",
            options: ["practical", "theoretical", "useful", "stylish"],
            correctAnswer: 1,
            explanation: "الفكرة النظرية غير القابلة للتطبيق تسمى theoretical."
        },
        {
            id: 21,
            question: "We took ten __________ upstairs to reach the chemistry laboratory.",
            options: ["steps", "stairs", "processes", "charts"],
            correctAnswer: 1,
            explanation: "درجات السلم الفيزيائية للصعود تسمى stairs."
        },
        {
            id: 22,
            question: "We must take positive __________ to reduce air pollution in our city.",
            options: ["stairs", "steps", "operations", "breaks"],
            correctAnswer: 1,
            explanation: "الخطوات المعنوية والإجرائية لعمل شيء تسمى steps."
        },
        {
            id: 23,
            question: "You should keep __________ your project until users are completely satisfied.",
            options: ["improve", "improved", "improving", "to improve"],
            correctAnswer: 2,
            explanation: "الفعل keep يليه صيغة V-ing (keep improving = واصل التحسين)."
        },

        // Expressions & Prepositions
        {
            id: 24,
            question: "Asking follow-up questions keeps the conversation flowing __________.",
            options: ["slowly", "naturally", "badly", "sadly"],
            correctAnswer: 1,
            explanation: "يجعل المحادثة تتدفق بشكل طبيعي (flows naturally)."
        },
        {
            id: 25,
            question: "When Magdy understood the explanation, he happily said, 'I __________ it!'",
            options: ["got", "put", "lost", "made"],
            correctAnswer: 0,
            explanation: "التعبير الشائع بمعنى 'فهمت الأمر' هو I got it!"
        },
        {
            id: 26,
            question: "Always trust __________ your own abilities when presenting your design.",
            options: ["on", "with", "in", "about"],
            correctAnswer: 2,
            explanation: "يثق في قدراته تأخذ حرف الجر in (trust in your abilities)."
        },
        {
            id: 27,
            question: "The designer left enough __________ at the bottom of the chart for parent notes.",
            options: ["sky", "space", "stairs", "step"],
            correctAnswer: 1,
            explanation: "المساحة أو الفراغ للكتابة تسمى space."
        },
        {
            id: 28,
            question: "Designers solve difficult problems __________ trying out different prototypes.",
            options: ["by", "at", "to", "with"],
            correctAnswer: 0,
            explanation: "يحل عن طريق كذا: solve by + V-ing."
        },
        {
            id: 29,
            question: "Don't worry __________ making minor mistakes during brainstorming.",
            options: ["for", "about", "with", "on"],
            correctAnswer: 1,
            explanation: "يقلق بشأن تأخذ حرف الجر about (worry about)."
        },

        // Conversation & Speaking Strategy
        {
            id: 30,
            question: "In active conversation, repeating key words like 'prototype' shows that you are __________.",
            options: ["bored and tired", "listening and learning", "sleeping", "angry"],
            correctAnswer: 1,
            explanation: "تكرار الكلمات المحورية يوضح أنك تستمع بتركيز وتتعلم بنشاط."
        },
        {
            id: 31,
            question: "Which of the following questions helps keep a conversation active?",
            options: ["'What's next?'", "'Can you shut up?'", "'I want to leave now.'", "'Why are you here?'"],
            correctAnswer: 0,
            explanation: "السؤال 'What's next?' يحافظ على حيوية واستمرارية الحوار."
        },

        // Reading Comprehension & Writing Review
        {
            id: 32,
            question: "What problem did Amir's group want to solve with the reminder chart?",
            options: [
                "Students eating too many snacks",
                "Students forgetting their homework",
                "Students being late for morning lines",
                "Students losing their school bags"
            ],
            correctAnswer: 1,
            explanation: "كانت المشكلة نسيان الطلاب المتكرر للواجبات المدرسية (forgetting homework)."
        },
        {
            id: 33,
            question: "How long did the students test the reminder chart prototype?",
            options: ["One month", "One day", "One week", "One year"],
            correctAnswer: 2,
            explanation: "قاموا باختبار المخطط لمدة أسبوع كامل (one week)."
        },
        {
            id: 34,
            question: "What modification did the team make to the chart after receiving feedback?",
            options: [
                "They removed all colors",
                "They added space for parents' notes",
                "They cancelled the whole project",
                "They made it much smaller"
            ],
            correctAnswer: 1,
            explanation: "قاموا بإضافة مساحة لملاحظات أولياء الأمور بناءً على طلب الطلاب."
        },
        {
            id: 35,
            question: "Which sequence adverb would you use to introduce your final test results in a review?",
            options: ["First", "Firstly", "Next", "Finally"],
            correctAnswer: 3,
            explanation: "نستخدم Finally أو In conclusion لتقديم الخطوة الختامية والنتائج النهائية."
        }
    ]
};

// Aliasing for universal engine compatibility
window.lessonData.questions = window.lessonData.quiz;
