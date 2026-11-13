/**
 * Prep 3 - Unit 6: Why do We Like Stories?
 * Lesson 3: Elements of a Story • The Clever Fox
 * Data payload strictly adhering to Decoupled Architecture
 */

window.lessonData = {
    title: "Lesson 3: Elements of a Story • The Clever Fox",
    unit: "Unit 6: Why do We Like Stories?",
    grade: "Prep 3",
    term: "Term 1",
    totalQuestions: 35,

    // Vocabulary categorized by section
    lessonVocabulary: [
        {
            category: "Key Vocabulary (المفردات الرئيسية)",
            words: [
                { en: "elements", ar: "عناصر القصة ومكوناتها", pos: "n", example: "Every narrative has four key elements." },
                { en: "type", ar: "نوع / صنف أدبي", pos: "n", example: "What is your favorite type of story?" },
                { en: "fiction", ar: "أدب خيالي / قصص خيالية غير واقعية", pos: "n", example: "Harry Potter is a famous work of fiction." },
                { en: "non-fiction", ar: "أدب واقعي / حقائق وقصص حقيقية", pos: "n", example: "Biographies and history books are non-fiction." },
                { en: "setting", ar: "زمان ومكان وقوع أحداث القصة", pos: "n", example: "The setting of the fable is a faraway forest." },
                { en: "conflict", ar: "الصراع / المشكلة الرئيسية في الحبكة", pos: "n", example: "The conflict arises when the fox spots the cheese." },
                { en: "folk", ar: "شعبي / موروث ثقافي شعبي", pos: "adj", example: "Folk stories pass from generation to generation." },
                { en: "adventure", ar: "مغامرة مثيرة وشجاعة", pos: "n", example: "Adventure stories take brave heroes on dangerous journeys." },
                { en: "comic", ar: "كوميدي / فكاهي ممتع", pos: "adj", example: "Comic tales are full of funny situations and humor." },
                { en: "historical", ar: "تاريخي قائم على أحداث الماضي", pos: "adj", example: "Historical stories describe ancient civilizations." },
                { en: "fable", ar: "حكاية رمزية على لسان الحيوانات لتعليم مغزى أخلاقي", pos: "n", example: "Aesop wrote many famous moral fables." },
                { en: "solution", ar: "حل الصراع / خاتمة القصة", pos: "n", example: "The conflict ends when the fox runs away with the cheese." }
            ]
        },
        {
            category: "Lesson 3 Additional Vocabulary (SB pages 90 & 91)",
            words: [
                { en: "forests", ar: "غابات كثيفة الأشجار", pos: "n", example: "Wild animals live peacefully in dense forests." },
                { en: "fox", ar: "ثعلب ماكر وذكي", pos: "n", example: "The clever fox tricked the innocent bird." },
                { en: "crow", ar: "غراب أسود", pos: "n", example: "The crow perched on a high branch holding food." },
                { en: "beak", ar: "منقار الطائر", pos: "n", example: "The crow held a piece of cheese firmly in its beak." },
                { en: "voice", ar: "صوت بشري أو صوت طائر", pos: "n", example: "The fox pretended that the crow had a sweet singing voice." },
                { en: "sweet", ar: "عذب / جميل ولطيف", pos: "adj", example: "The bird's song sounded sweet and harmonious." },
                { en: "quickly", ar: "بسرعة فائقة", pos: "adv", example: "The fox snatched the cheese quickly and escaped." },
                { en: "looks", ar: "مظهر خارجي / هيئة", pos: "n", example: "He praised the crow's attractive looks and feathers." },
                { en: "imaginary", ar: "خيالي / من نسج الخيال", pos: "adj", example: "Dragons are imaginary creatures found in fairy tales." },
                { en: "events", ar: "أحداث متتالية في القصة", pos: "n", example: "The events of the narrative kept readers on edge." },
                { en: "traditional", ar: "تقليدي / متوارث", pos: "adj", example: "Grandfather told us traditional folk tales." },
                { en: "journey", ar: "رحلة طويلة استكشافية", pos: "n", example: "The brave knight embarked on a perilous journey." },
                { en: "brave", ar: "شجاع / مقدام", pos: "adj", example: "Brave heroes never surrender in the face of danger." },
                { en: "humor", ar: "فكاهة / دعابة مرحة", pos: "n", example: "The comedian's performance was full of clever humor." },
                { en: "tale", ar: "حكاية / قصة مشوقة", pos: "n", example: "The Arabian Nights contains many enchanting tales." }
            ]
        }
    ],

    // Pop Quiz matching El-Moasser page 255
    popQuiz: {
        title: "Pop Quiz: Complete the sentences",
        boxWords: ["Fables", "Non-fiction", "adventure", "humor"],
        questions: [
            { id: 1, sentence: "I like {blank} stories. They are exciting and dangerous.", answer: "adventure", ar: "أحب قصص المغامرات؛ فهي مليئة بالإثارة والتشويق والمخاطر." },
            { id: 2, sentence: "Funny stories are full of {blank}.", answer: "humor", ar: "القصص الكوميدية مفعمة بالمرح والفكاهة والدعابة." },
            { id: 3, sentence: "{blank} teach a moral with talking animals.", answer: "Fables", ar: "الخرافات والقصص الرمزية تعلم دروساً أخلاقية من خلال حيوانات ناطقة." },
            { id: 4, sentence: "'Fiction' is the antonym of {blank}.", answer: "Non-fiction", ar: "كلمة 'Fiction' (أدب خيالي) هي المضاد لكلمة 'Non-fiction' (كتابات واقعية)." }
        ]
    },

    // Irregular Verbs
    verbs: [
        { base: "see", past: "saw", pp: "seen", meaning: "يرى" },
        { base: "sing", past: "sang", pp: "sung", meaning: "يغني" },
        { base: "catch", past: "caught", pp: "caught", meaning: "يمسك / يلحق" },
        { base: "run away", past: "ran away", pp: "run away", meaning: "يهرب" },
        { base: "teach", past: "taught", pp: "taught", meaning: "يعلم / يدرس" },
        { base: "fall", past: "fell", pp: "fallen", meaning: "يسقط / يقع" }
    ],

    // Story Types & Elements Definitions
    definitions: [
        { term: "fiction", definition: "stories made up with imaginary characters and events", translation: "قصص خيالية" },
        { term: "non-fiction", definition: "true stories based on real events, facts, and real people", translation: "قصص وحقائق واقعية" },
        { term: "fable", definition: "a short moral tale usually featuring talking animals", translation: "حكاية رمزية لتعليم مغزى أخلاقي" },
        { term: "setting", definition: "where and when the story takes place", translation: "زمان ومكان القصة" },
        { term: "characters", definition: "the people or animals that participate in the story's action", translation: "شخصيات القصة" },
        { term: "conflict", definition: "the main challenge, struggle, or problem in the plot", translation: "الصراع أو المشكلة الرئيسية" },
        { term: "solution", definition: "how the main conflict or problem is resolved at the end", translation: "الحل وخاتمة الصراع" }
    ],

    // Synonyms and Antonyms
    synonyms: [
        { word: "clever", meaning: "ماهر / ذكي", synonym: "intelligent / smart / talented", antonym: "untalented / stupid" },
        { word: "sweet", meaning: "عذب / جميل", synonym: "gentle / beautiful / nice", antonym: "horrible / nasty / rough" },
        { word: "imaginary", meaning: "خيالي", synonym: "fictional / fantastic", antonym: "real / ordinary / actual" },
        { word: "fiction", meaning: "خيال قصصي", synonym: "tale / novel / fantasy", antonym: "non-fiction / truth" },
        { word: "comic", meaning: "فكاهي / مضحك", synonym: "funny / amusing", antonym: "serious / tragic" },
        { word: "well-known", meaning: "مشهور ومعروف", synonym: "famous", antonym: "obscure / infamous" },
        { word: "traditional", meaning: "تقليدي", synonym: "old-fashioned", antonym: "modern / new" }
    ],

    // Prefixes and Suffixes
    affixes: [
        { affix: "re-", type: "prefix", function: "تفيد إعادة وتكرار الفعل (again)", examples: "retell (يعيد سرد القصة), rewrite (يعيد كتابة)" },
        { affix: "-tion", type: "suffix", function: "تكوّن الاسم من الفعل", examples: "solution (حل)" }
    ],

    // Confusion Notes & General Notes
    confusionNotes: [
        {
            title: "الفرق بين fiction و non-fiction",
            titleEn: "fiction vs non-fiction",
            titleAr: "الفرق بين الأدب الخيالي (fiction) والأعمال الواقعية (non-fiction)",
            note: "الكلمة fiction تعني (أدب خيالي من نسج خيال الكاتب كالأساطير والروايات). بينما non-fiction تعني (كتابات واقعية مبنية على حقائق تاريخية أو علمية وأشخاص حقيقيين):",
            examples: [
                { en: "Cinderella is a classic piece of fiction.", ar: "سندريلا هي قصة خيالية كلاسيكية شهيرة." },
                { en: "Biographies of scientists are non-fiction.", ar: "السير الذاتية للعلماء هي كتابات واقعية غير خيالية." }
            ]
        },
        {
            title: "الفرق بين voice و sound",
            titleEn: "voice vs sound",
            titleAr: "الفرق بين صوت الإنسان/الكائن الناطق (voice) وصوت الأشياء والطبيعة (sound)",
            note: "الكلمة voice تعني (صوت بشري يصدر من حنجرة الإنسان أو كائن متكلم في قصة). بينما sound تعني (صوت عام للأشياء أو الآلات أو ظواهر الطبيعة):",
            examples: [
                { en: "The crow has a harsh voice, but the fox praised it.", ar: "الغراب صوته خشن وأجش، لكن الثعلب امتدحه بمكر." },
                { en: "I heard a strange sound coming from the car engine.", ar: "سمعت صوتاً غريباً صادراً من محرك السيارة." }
            ]
        }
    ],

    // Important Expressions & Prepositions
    expressions: [
        { en: "as sweet as your look", ar: "عذب وحسن مثل مظهرك الجميل" },
        { en: "well-known story", ar: "قصة ذائعة الصيت ومشهورة" },
        { en: "help me feel happy", ar: "يساعدني على الشعور بالبهجة" },
        { en: "retell the story", ar: "يعيد سرد القصة بأسلوبه" },
        { en: "take turns", ar: "يتبادلون الأدوار بالتناوب" }
    ],

    prepositions: [
        { en: "Once upon a time", ar: "ذات مرة / كان يا ما كان" },
        { en: "in a faraway forest", ar: "في غابة بعيدة ونائية" },
        { en: "look down", ar: "ينظر إلى أسفل" },
        { en: "fall down", ar: "يسقط أرضاً" },
        { en: "run away", ar: "يهرب بعيداً مسرعاً" },
        { en: "write down", ar: "يُدوّن كتابةً" },
        { en: "make up", ar: "يؤلف / يبتكر قصة خيالية" },
        { en: "full of", ar: "مليء ومفعم بـ" },
        { en: "based on", ar: "مبني وقائم على" }
    ],

    // 3D Story Pages (Single WebP triptych rule)
    storyPages: [
        {
            titleEn: "Chapter 1: The Setting and the Flattery",
            titleAr: "الفصل الأول: مسرح الأحداث وكلام المديح",
            textEn: "Once upon a time in a faraway forest, a hungry but extremely clever fox was roaming beneath tall trees searching for lunch. Up in an oak branch, he spotted a black crow holding a delicious, appetizing piece of yellow cheese firmly in her beak. Knowing he couldn't climb the tree, the cunning fox smiled sweetly and called out, 'Good morning, magnificent bird! Your feathers glisten like royal silk!'",
            textAr: "ذات مرة في غابة بعيدة، كان ثعلب جائع لكنه شديد الدهاء يتجول تحت الأشجار العالية بحثاً عن طعام الغداء. وفي أعلى غصن شجرة بلوط، لمح غراباً أسود يمسك بقطعة جبن صفراء شهية ولذيذة بإحكام في منقاره. ولما علم الثعلب الماكر أنه لا يستطيع تسلق الشجرة، ابتسم بوداعة ونادى: «صباح الخير أيها الطائر الرائع! إن ريشك يلمع كالحرير الملكي!»",
            captionEn: "The cunning fox spots the crow and plans how to acquire the cheese.",
            captionAr: "الثعلب الماكر يلمح الغراب ويخطط بدهاء للحصول على قطعة الجبن.",
            vocabChips: ["Setting", "Faraway forest", "Clever fox", "Cheese in beak"]
        },
        {
            titleEn: "Chapter 2: The Song and the Lost Prize",
            titleAr: "الفصل الثاني: الأغنية والغنيمة الضائعة",
            textEn: "The crow looked down proudly, puffing her chest at the flattery. The fox continued with a gentle bow: 'Someone told me that your voice is as sweet and lovely as your royal looks. Won't you sing a melodious song to fill my heart with joy?' Vanity overtook the crow. Eager to prove her singing talent, she opened her wide beak to sing—and at that precise second, the heavy piece of cheese tumbled straight down through the air!",
            textAr: "نظر الغراب إلى أسفل بفخر، نافشاً ريش صدره فرحاً بكلام المديح. وتابع الثعلب بانحناءة رقيقة: «أخبرني أحدهم أن صوتك عذب وجميل تماماً مثل مظهرك الملكي؛ ألا تغني لي لحناً يملأ قلبي بالسعادة؟». سيطر الغرور على الغراب، وسعياً لإثبات موهبته الغنائية، فتح منقاره العريض ليصدح بالغناء—وفي تلك اللحظة بالذات، سقطت قطعة الجبن الثقيلة هاويةً في الهواء!",
            captionEn: "Flattered by sweet words, the vain crow opens its beak to sing.",
            captionAr: "انخدع الغراب بكلمات المديح المعسولة، ففتح منقاره ليغني فسقط الجبن.",
            vocabChips: ["Flattery", "Vain crow", "Opened beak", "Fell down"]
        },
        {
            titleEn: "Chapter 3: The Resolution and Moral of the Fable",
            titleAr: "الفصل الثالث: خاتمة الصراع والمغزى الأخلاقي",
            textEn: "Before the cheese even hit the forest grass, the agile fox swiftly leaped forward, caught the delicious prize in his jaws, and dashed away into the bushes laughing triumphantly. The deceived crow was left empty-handed with an empty stomach, learning the timeless moral of this Aesop fable: never let false flattery blind your senses, for those who flatter you without cause often seek your treasure.",
            textAr: "وقبل أن تلمس قطعة الجبن عشب الغابة، قفز الثعلب الرشيق بسرعة فائقة والتقط الغنيمة اللذيذة بين فكيه، وانطلق هارباً بين الشجيرات ضاحكاً بانتصار. وبقي الغراب المخدوع خالي الوفاض ومعدته خاوية، ليتعلم المغزى الخالد من هذه الحكاية الرمزية: إياك أن تجعل المديح الزائف يعمي بصيرتك، فمن يمتدحك بلا سبب يبتغي غالباً سلب ما تملك.",
            captionEn: "The fox catches the prize, teaching readers never to trust deceptive flattery.",
            captionAr: "الثعلب يظفر بالجائزة، معلماً القراء درساً بعدم الوثوق في المديح المخادع.",
            vocabChips: ["Caught the cheese", "Ran away", "Moral lesson", "Resolution"]
        }
    ],

    // Dialogue Player Data
    dialogue: {
        banner: {
            title: "🗣️ Speaking Dialogue: Analyzing Story Elements",
            subtitle: "حوار تحليلي ممتع بين هاني ويوسف لتفكيك عناصر قصة الثعلب والغراب واستخراج أركان القصة الأربعة 🎭"
        },
        lines: [
            {
                speaker: "Hany",
                speakerAr: "هاني",
                avatar: "👦",
                en: "Hey Youssef, did you enjoy the fable of The Clever Fox and the Crow?",
                ar: "مرحباً يا يوسف، هل استمتعت بحكاية الثعلب الماكر والغراب؟"
            },
            {
                speaker: "Youssef",
                speakerAr: "يوسف",
                avatar: "🧑‍🎓",
                en: "Yes, very much! It's a classic fable that teaches a memorable moral.",
                ar: "نعم، كثيراً جداً! إنها حكاية رمزية كلاسيكية تعلمنا مغزى أخلاقياً لا يُنسى."
            },
            {
                speaker: "Hany",
                speakerAr: "هاني",
                avatar: "👦",
                en: "Can you identify the four main elements of the story for our English project?",
                ar: "هل يمكنك تحديد عناصر القصة الأربعة الرئيسية لمشروع اللغة الإنجليزية؟"
            },
            {
                speaker: "Youssef",
                speakerAr: "يوسف",
                avatar: "🧑‍🎓",
                en: "Sure! First, the setting is a faraway forest during the daytime.",
                ar: "بالتأكيد! أولاً، الزمان والمكان (Setting) هما غابة بعيدة أثناء النهار."
            },
            {
                speaker: "Hany",
                speakerAr: "هاني",
                avatar: "👦",
                en: "And who are the main characters?",
                ar: "ومن هما الشخصيتان الرئيسيتان؟"
            },
            {
                speaker: "Youssef",
                speakerAr: "يوسف",
                avatar: "🧑‍🎓",
                en: "The characters are the cunning fox and the vain crow holding a piece of cheese.",
                ar: "الشخصيات هما الثعلب الماكر والغراب المغرور الذي يمسك بقطعة الجبن."
            },
            {
                speaker: "Hany",
                speakerAr: "هاني",
                avatar: "👦",
                en: "What about the conflict and the final resolution?",
                ar: "وماذا عن الصراع والحل النهائي؟"
            },
            {
                speaker: "Youssef",
                speakerAr: "يوسف",
                avatar: "🧑‍🎓",
                en: "The conflict was the fox wanting the cheese. The solution was tricking the crow to sing so the cheese fell!",
                ar: "الصراع كان رغبة الثعلب في الجبن. والحل كان خداع الغراب للغناء حتى سقط الجبن واقتنصه!"
            }
        ]
    },

    // Grammar Content HTML (Story Elements, Story Mapping, Sequence Words)
    grammarContentHtml: `
        <div class="grammar-section">
            <div class="grammar-card">
                <h3 class="grammar-topic-title">⚡ 1. The Four Essential Story Elements (عناصر القصة الأربعة)</h3>
                <p class="grammar-desc">لكل قصة سردية ناجحة <strong>(Narrative Story)</strong> أربعة أركان أساسية تبنى عليها الحبكة:</p>

                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-top: 15px;">
                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #2196f3;">
                        <h4 style="color: #2196f3; margin-bottom: 6px;">🌍 1. Setting (الزمان والمكان)</h4>
                        <p><strong>التعريف:</strong> أين ومتى وقعت أحداث القصة (Where and when).</p>
                        <p style="font-size: 0.9rem; color: var(--accent-gold); font-weight: bold;">In a faraway forest, one sunny day.</p>
                    </div>

                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #4caf50;">
                        <h4 style="color: #4caf50; margin-bottom: 6px;">👥 2. Characters (الشخصيات)</h4>
                        <p><strong>التعريف:</strong> الأشخاص أو الحيوانات الفاعلة في القصة.</p>
                        <p style="font-size: 0.9rem; color: var(--accent-gold); font-weight: bold;">The clever fox and the crow.</p>
                    </div>

                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #f44336;">
                        <h4 style="color: #f44336; margin-bottom: 6px;">⚡ 3. Conflict (الصراع / المشكلة)</h4>
                        <p><strong>التعريف:</strong> العقدة أو المشكلة التي تواجه الشخصيات (The main problem).</p>
                        <p style="font-size: 0.9rem; color: var(--accent-gold); font-weight: bold;">The fox wanted the cheese in the crow's beak.</p>
                    </div>

                    <div style="background: var(--bg-card); padding: 16px; border-radius: 10px; border-right: 4px solid #ff9800;">
                        <h4 style="color: #ff9800; margin-bottom: 6px;">🎯 4. Solution / Resolution (الحل)</h4>
                        <p><strong>التعريف:</strong> كيف انتهت المشكلة وحُسم الموقف (How the conflict ends).</p>
                        <p style="font-size: 0.9rem; color: var(--accent-gold); font-weight: bold;">The fox tricked the crow to sing and caught the cheese.</p>
                    </div>
                </div>
            </div>

            <div class="grammar-card" style="margin-top: 25px;">
                <h3 class="grammar-topic-title">⚡ 2. Major Story Genres (أنواع وأصناف القصص الأدبية)</h3>
                <div class="rules-table-wrapper" style="overflow-x: auto; margin-top: 15px;">
                    <table class="rules-table" style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--bg-card); color: var(--accent-primary);">
                                <th style="padding: 12px; border: 1px solid var(--border-color);">نوع القصة (Genre)</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">التعريف بالإنجليزية</th>
                                <th style="padding: 12px; border: 1px solid var(--border-color);">السمة والميزة الأساسية</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">Fiction</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);">Stories with imaginary characters and events</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">أدب خيالي من نسج الخيال</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">Non-fiction</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);">True stories based on real events and facts</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">قصص واقعية وحقائق تاريخية وعلمية</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">Fables</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);">Short tales that teach a moral with talking animals</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">حكايات رمزية على ألسنة الحيوانات لتعليم حكمة</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">Adventure stories</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);">Exciting journeys taken by brave characters</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">قصص مغامرات مشوقة ومليئة بالشجاعة</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px; border: 1px solid var(--border-color); font-weight: bold;">Comic stories</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color); color: var(--accent-gold);">Funny stories full of humor</td>
                                <td style="padding: 10px; border: 1px solid var(--border-color);">قصص فكاهية مضحكة هدفها التسلية والمرح</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `,

    // 35 Questions covering Lesson 3
    quiz: [
        // Vocabulary & Definitions
        {
            id: 1,
            question: "A short tale that teaches a moral lesson, often with talking animal characters, is a __________.",
            options: ["fable", "history book", "science article", "recipe"],
            correctAnswer: 0,
            explanation: "الحكاية الرمزية على لسان الحيوانات لتعليم مغزى أخلاقي هي fable."
        },
        {
            id: 2,
            question: "The __________ of a story tells us where and when the events take place.",
            options: ["conflict", "setting", "solution", "moral"],
            correctAnswer: 1,
            explanation: "مكان وزمان القصة يسمى setting."
        },
        {
            id: 3,
            question: "The main struggle or problem that the characters must overcome is the __________.",
            options: ["setting", "conflict", "beak", "voice"],
            correctAnswer: 1,
            explanation: "المشكلة أو الصراع في القصة يسمى conflict."
        },
        {
            id: 4,
            question: "Stories that are based on real facts and real historical events are classified as __________.",
            options: ["fiction", "non-fiction", "fables", "comics"],
            correctAnswer: 1,
            explanation: "الكتابات والقصص القائمة على حقائق واقعية هي non-fiction."
        },
        {
            id: 5,
            question: "The crow held a piece of cheese firmly in her __________.",
            options: ["tail", "wing", "beak", "foot"],
            correctAnswer: 2,
            explanation: "أمسك الغراب قطعة الجبن في منقاره (beak)."
        },
        {
            id: 6,
            question: "The fox asked the crow to sing because he pretended her voice was __________.",
            options: ["harsh", "sweet", "terrible", "silent"],
            correctAnswer: 1,
            explanation: "تظاهر الثعلب بأن صوت الغراب عذب وجميل (sweet)."
        },
        {
            id: 7,
            question: "Funny stories that make us laugh are full of __________.",
            options: ["humor", "danger", "conflict", "sorrow"],
            correctAnswer: 0,
            explanation: "القصص الكوميدية مفعمة بالدعابة والمرح (humor)."
        },
        {
            id: 8,
            question: "When the crow opened her beak to sing, the cheese __________ straight down.",
            options: ["flew", "fell", "grew", "walked"],
            correctAnswer: 1,
            explanation: "سقط الجبن إلى أسفل (fell down)."
        },
        {
            id: 9,
            question: "How a story's problem is finally settled at the end is called the __________.",
            options: ["solution", "setting", "beginning", "conflict"],
            correctAnswer: 0,
            explanation: "كيفية حل مشكلة القصة في النهاية هي solution."
        },
        {
            id: 10,
            question: "Stories featuring exciting journeys by brave explorers are called __________ stories.",
            options: ["adventure", "historical", "comic", "horror"],
            correctAnswer: 0,
            explanation: "قصص المغامرات التي يخوض فيها الأبطال رحلات مشوقة هي adventure stories."
        },

        // Synonyms and Antonyms
        {
            id: 11,
            question: "The word 'clever' has the same meaning as __________.",
            options: ["stupid", "smart", "untalented", "boring"],
            correctAnswer: 1,
            explanation: "مرادف clever (ماهر / ذكي) هو smart أو intelligent."
        },
        {
            id: 12,
            question: "The word 'fiction' is the exact antonym of __________.",
            options: ["fantasy", "novel", "non-fiction", "tale"],
            correctAnswer: 2,
            explanation: "عكس الخيال الأدبي (fiction) هو الواقع (non-fiction)."
        },
        {
            id: 13,
            question: "The word 'comic' has the same meaning as __________.",
            options: ["funny", "tragic", "serious", "scary"],
            correctAnswer: 0,
            explanation: "مرادف comic (كوميدي) هو funny أو amusing."
        },
        {
            id: 14,
            question: "The antonym of 'imaginary' is __________.",
            options: ["fictional", "fantastic", "real", "untrue"],
            correctAnswer: 2,
            explanation: "عكس خيالي (imaginary) هو حقيقي وواقعي (real)."
        },
        {
            id: 15,
            question: "The word 'traditional' is synonymous with __________.",
            options: ["modern", "brand-new", "old-fashioned", "recent"],
            correctAnswer: 2,
            explanation: "مرادف تقليدي (traditional) هو متوارث وقديم (old-fashioned)."
        },
        {
            id: 16,
            question: "The opposite of 'brave' is __________.",
            options: ["cowardly", "heroic", "strong", "patient"],
            correctAnswer: 0,
            explanation: "عكس شجاع (brave) هو جبان (cowardly)."
        },

        // Prefixes & Suffixes
        {
            id: 17,
            question: "The prefix 're-' in the word 'retell' means to do the action __________.",
            options: ["never", "again", "before", "against"],
            correctAnswer: 1,
            explanation: "البادئة re- تعني تكرار الفعل مرة أخرى (again)."
        },
        {
            id: 18,
            question: "The suffix '-tion' in 'solution' turns the verb 'solve' into a/an __________.",
            options: ["noun", "adjective", "adverb", "preposition"],
            correctAnswer: 0,
            explanation: "اللاحقة '-tion' تحول الفعل solve إلى الاسم solution."
        },

        // Confusion Pairs & Expressions
        {
            id: 19,
            question: "The crow had a harsh __________ when it tried to sing.",
            options: ["voice", "sound", "noise", "instrument"],
            correctAnswer: 0,
            explanation: "صوت الكائن البشري أو الطائر يعبر عنه بـ voice."
        },
        {
            id: 20,
            question: "I heard a loud __________ outside my bedroom window during the storm.",
            options: ["voice", "sound", "beak", "fable"],
            correctAnswer: 1,
            explanation: "صوت الطبيعة أو الأشياء يعبر عنه بـ sound."
        },
        {
            id: 21,
            question: "The fable begins with the famous traditional phrase: '__________ upon a time...'",
            options: ["Once", "One", "Ever", "Then"],
            correctAnswer: 0,
            explanation: "عبارة بداية الحكايات الكلاسيكية هي Once upon a time."
        },
        {
            id: 22,
            question: "In class, students take __________ retelling the story to each other.",
            options: ["turns", "steps", "beaks", "forests"],
            correctAnswer: 0,
            explanation: "التعبير 'يتبادلون الأدوار' هو take turns."
        },
        {
            id: 23,
            question: "Historical fiction novels are always based __________ events from the past.",
            options: ["at", "on", "in", "by"],
            correctAnswer: 1,
            explanation: "قائم على أو مستند إلى تأخذ حرف الجر on (based on)."
        },
        {
            id: 24,
            question: "The fox told the crow: 'Your voice must be as sweet as your __________.'",
            options: ["feathers", "looks", "tail", "wings"],
            correctAnswer: 1,
            explanation: "النص الوارد في كتاب الوزارة: as sweet as your looks."
        },

        // Story Elements Application (The Clever Fox)
        {
            id: 25,
            question: "What was the setting of the story 'The Clever Fox'?",
            options: [
                "A school classroom in the afternoon",
                "A faraway forest during the day",
                "A modern airport terminal",
                "A busy city restaurant"
            ],
            correctAnswer: 1,
            explanation: "مكان وزمان قصة الثعلب والغراب كان غابة بعيدة (a faraway forest)."
        },
        {
            id: 26,
            question: "Who were the characters in 'The Clever Fox'?",
            options: [
                "Ali and Omar",
                "A fox and a crow",
                "A lion and a mouse",
                "Two brave engineers"
            ],
            correctAnswer: 1,
            explanation: "الشخصيات كانت الثعلب والغراب (a fox and a crow)."
        },
        {
            id: 27,
            question: "What was the central conflict in 'The Clever Fox'?",
            options: [
                "The fox and crow got lost in the snow",
                "The fox was hungry and wanted the cheese held by the crow",
                "The crow wanted to learn how to fly faster",
                "The forest was catching fire"
            ],
            correctAnswer: 1,
            explanation: "الصراع الرئيسي كان رغبة الثعلب في الحصول على قطعة الجبن التي يحملها الغراب."
        },
        {
            id: 28,
            question: "How was the conflict resolved (the solution)?",
            options: [
                "The crow gave the cheese as a gift willingly",
                "The fox flattered the crow until it opened its beak to sing, dropping the cheese",
                "A hunter arrived and chased both animals away",
                "The cheese melted in the hot sun"
            ],
            correctAnswer: 1,
            explanation: "الحل كان بخداع الثعلب للغراب عبر التملق حتى فتح منقاره ليسقط الجبن."
        },
        {
            id: 29,
            question: "What is the moral lesson taught by the fable of 'The Clever Fox'?",
            options: [
                "Always share your food with foxes",
                "Never let false flattery fool you into losing what you have",
                "Singing loudly is good for your health",
                "Crows are the best singers in the world"
            ],
            correctAnswer: 1,
            explanation: "المغزى الأخلاقي هو عدم الانخداع بالمديح الزائف والمخادع."
        },

        // Grammar & Reported Speech Integration
        {
            id: 30,
            question: "The fox said to the crow, 'Your voice is sweet.' In reported speech: The fox __________ the crow that her voice was sweet.",
            options: ["said", "told", "tells", "says"],
            correctAnswer: 1,
            explanation: "تتحول said to + مفعول إلى told + مفعول."
        },
        {
            id: 31,
            question: "The teacher said, 'Aesop wrote great fables.' In reported speech: The teacher said that Aesop __________ great fables.",
            options: ["writes", "had written", "is writing", "write"],
            correctAnswer: 1,
            explanation: "الماضي البسيط wrote يتحول في غير المباشر إلى ماضٍ تام had written."
        },
        {
            id: 32,
            question: "Youssef said, 'I enjoy reading comic stories.' In reported speech: Youssef said he __________ reading comic stories.",
            options: ["enjoyed", "enjoys", "has enjoyed", "enjoying"],
            correctAnswer: 0,
            explanation: "المضارع البسيط enjoy يتحول إلى ماضٍ بسيط enjoyed."
        },
        {
            id: 33,
            question: "'Fables teach valuable morals,' the author said. The author said that fables __________ valuable morals.",
            options: ["teach", "taught", "are teaching", "teaches"],
            correctAnswer: 1,
            explanation: "الفعل teach يتحول إلى الماضي taught."
        },
        {
            id: 34,
            question: "Which of the following is an example of non-fiction?",
            options: [
                "A fantasy tale about magical dragons",
                "A science book explaining how planets orbit the sun",
                "A story about a talking fox and crow",
                "A comic book about superheroes"
            ],
            correctAnswer: 1,
            explanation: "الكتاب العلمي عن دوران الكواكب هو عمل واقعي (non-fiction)."
        },
        {
            id: 35,
            question: "Which sequence word should be used to describe the very last event in a narrative?",
            options: ["First", "Firstly", "Then", "Finally"],
            correctAnswer: 3,
            explanation: "نستخدم Finally لسرد الحدث الختامي والأخير في القصة."
        }
    ]
};

// Aliasing for universal engine compatibility
window.lessonData.questions = window.lessonData.quiz;
