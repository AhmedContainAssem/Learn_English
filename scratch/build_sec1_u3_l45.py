import json
import os

lesson_data = {
    "id": "sec1-u3-l45",
    "stage": "sec1",
    "unit": 3,
    "lesson": "4-5",
    "title": "Lessons 4 & 5: The Truth Trap & Essay Writing Plan (فخ الحقيقة ومخطط كتابة المقال)",
    "description": "المفردات الأساسية والتراكمية، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، الفروق اللغوية، مخطط كتابة المقال (Essay Writing Plan)، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)",

    "keyVocabulary": [
        { "word": "awareness", "partOfSpeech": "n", "arabic": "وعي - إدراك", "example": "Protecting ourselves from online misinformation requires constant awareness." },
        { "word": "defense", "partOfSpeech": "n", "arabic": "دفاع - حماية", "example": "A questioning mind is our strongest defense against fake news." },
        { "word": "invisible", "partOfSpeech": "adj", "arabic": "غير مرئي - خفي", "example": "Misinformation acts like an invisible weapon in modern society." },
        { "word": "misinformation", "partOfSpeech": "n", "arabic": "معلومات خاطئة - تضليل", "example": "Social media can rapidly spread dangerous misinformation." },
        { "word": "ruin", "partOfSpeech": "v", "arabic": "يدمر - يخرّب", "example": "A false rumor can easily ruin a person's reputation and career." },
        { "word": "rumor", "partOfSpeech": "n / v", "arabic": "شائعة / يروّج شائعة", "example": "People should check the facts before passing on an unverified rumor." }
    ],

    "accumulativeVocabulary": [
        { "word": "tank", "partOfSpeech": "n", "arabic": "دبابة", "example": "In traditional warfare, armies fought with tanks and heavy artillery." },
        { "word": "bullet", "partOfSpeech": "n", "arabic": "رصاصة", "example": "Unlike bullets, false words wound human minds and destroy trust." },
        { "word": "bomb", "partOfSpeech": "n", "arabic": "قنبلة", "example": "A fabricated story can be as destructive as an exploding bomb." },
        { "word": "weapon", "partOfSpeech": "n", "arabic": "سلاح", "example": "Words can be more dangerous than physical weapons if used with malice." },
        { "word": "half-truth", "partOfSpeech": "n", "arabic": "نصف حقيقة - معلومة مبتورة", "example": "A half-truth is often more deceptive than an outright lie." },
        { "word": "generation", "partOfSpeech": "n", "arabic": "جيل", "example": "Experts call information attacks the war of the new generation." },
        { "word": "damage", "partOfSpeech": "v", "arabic": "يضر - يُلحق تلفاً", "example": "The main goal of digital deception is to damage public trust." },
        { "word": "confused", "partOfSpeech": "adj", "arabic": "مرتبك - حائر ومشتت", "example": "Contradictory reports left citizens confused about what to believe." },
        { "word": "control", "partOfSpeech": "v", "arabic": "يتحكم في - يسيطر على", "example": "When people lose trust, it becomes easier for manipulators to control them." },
        { "word": "victim", "partOfSpeech": "n", "arabic": "ضحية", "example": "Both individuals and large businesses can become victims of internet defamation." },
        { "word": "individual", "partOfSpeech": "n / adj", "arabic": "فرد / فردي", "example": "Every individual has a responsibility to check news before sharing." },
        { "word": "career", "partOfSpeech": "n", "arabic": "مسار مهني - حياة مهنية", "example": "Dr. Samira built a distinguished career in pediatric medicine." },
        { "word": "products", "partOfSpeech": "n", "arabic": "منتجات - سلع", "example": "Boycotts caused by false rumors can destroy demand for quality products." },
        { "word": "fight back", "partOfSpeech": "v phr", "arabic": "يقاوم - يرد الهجوم", "example": "It is difficult to fight back against lies once they circulate worldwide." },
        { "word": "checking", "partOfSpeech": "n", "arabic": "تحقق - فحص ومراجعة", "example": "Fact-checking is vital before republishing shocking news." },
        { "word": "require", "partOfSpeech": "v", "arabic": "يتطلب - يستلزم", "example": "Protecting truth requires effort, critical thinking, and patience." },
        { "word": "questioning mind", "partOfSpeech": "n phr", "arabic": "عقل ناقد ومتسائل", "example": "A questioning mind always asks for evidence before accepting claims." },
        { "word": "destroy", "partOfSpeech": "v", "arabic": "يدمر - يهدم", "example": "Lies do not destroy buildings, but they dismantle human trust." },
        { "word": "throughout", "partOfSpeech": "prep", "arabic": "على مدار - في أرجاء", "example": "Rumors spread rapidly throughout the university campus." },
        { "word": "advertisement", "partOfSpeech": "n", "arabic": "إعلان تجاري", "example": "The deceptive advertisement misled customers about the price." }
    ],

    "definitions": [
        {
            "word": "awareness",
            "defEn": "The state of knowing, perceiving, and understanding what is happening around you.",
            "defAr": "حالة المعرفة والفهم والإدراك لما يدور من حولك في الواقع."
        },
        {
            "word": "defense",
            "defEn": "The act of protecting someone or something from attack, danger, or harm.",
            "defAr": "فعل حماية شخص أو شيء من التعرض لهجوم أو ضرر."
        },
        {
            "word": "invisible",
            "defEn": "Not able to be seen with the human eye; concealed or undetectable.",
            "defAr": "غير مرئي بالعين المجردة؛ خفي أو مستتر."
        },
        {
            "word": "misinformation",
            "defEn": "False, incomplete, or inaccurate information meant to make people believe untruths.",
            "defAr": "معلومات خاطئة أو غير دقيقة تُبث لجعل الناس يصدقون ما هو كاذب."
        },
        {
            "word": "ruin",
            "defEn": "To spoil, damage severely, or destroy something completely beyond repair.",
            "defAr": "إفساد أو تدمير أو تخريب شيء ما بالكامل حتى يفقد قيمته أو فائدته."
        },
        {
            "word": "rumor",
            "defEn": "A story or statement that may not be true, passed from one person to another.",
            "defAr": "خبر أو حكاية غير مؤكدة تنتقل بالتناقل من شخص إلى آخر."
        },
        {
            "word": "victim",
            "defEn": "A person or entity that suffers harm, injustice, or loss as a result of an action or crime.",
            "defAr": "شخص أو جهة تتكبد ضرراً أو ظلماً نتيجة عمل ضار أو جريمة."
        },
        {
            "word": "weapon",
            "defEn": "Any object, tool, or instrument used to cause hurt, damage, or defeat an opponent.",
            "defAr": "أي أداة أو وسيلة تُستخدم لإلحاق الضرر بالخصم أو هزيمته."
        }
    ],

    "synonyms": [
        { "word": "awareness", "synonyms": "consciousness, knowledge, alertness, mindfulness", "arabic": "وعي - يقظة - انتباه" },
        { "word": "defense", "synonyms": "protection, safeguard, shielding, security", "arabic": "دفاع - حماية - وقاية" },
        { "word": "invisible", "synonyms": "unseen, hidden, concealed, undetectable", "arabic": "غير مرئي - خفي - مستتر" },
        { "word": "misinformation", "synonyms": "untruth, disinformation, fabrication, lie", "arabic": "تضليل - معلومات مغلوطة - كذب" },
        { "word": "ruin", "synonyms": "destroy, devastate, demolish, spoil, wreck", "arabic": "يدمر - يخرب - يهلك" },
        { "word": "rumor", "synonyms": "gossip, hearsay, unverified story", "arabic": "شائعة - قيل وقال" },
        { "word": "lasting", "synonyms": "permanent, enduring, persistent, long-term", "arabic": "دائم - طويل الأمد - مستمر" }
    ],

    "antonyms": [
        { "word": "awareness", "antonyms": "ignorance, oblivion, unawareness, inattention", "arabic": "جهل - غفلة - عدم وعي" },
        { "word": "defense", "antonyms": "attack, offense, aggression, invasion", "arabic": "هجوم - اعتداء" },
        { "word": "invisible", "antonyms": "visible, clear, apparent, noticeable, obvious", "arabic": "مرئي - ظاهر - جلي" },
        { "word": "misinformation", "antonyms": "truth, fact, accurate information, reality", "arabic": "حقيقة - معلومة موثوقة - واقع" },
        { "word": "ruin", "antonyms": "build, repair, restore, construct, preserve", "arabic": "يبني - يعمّر - يصلح" },
        { "word": "rumor", "antonyms": "proven fact, truth, verified evidence", "arabic": "حقيقة مثبتة - برهان قاطع" },
        { "word": "lasting", "antonyms": "temporary, fleeting, short-lived, transient", "arabic": "مؤقت - زائل - عابر" }
    ],

    "collocations": [
        { "collocation": "build trust", "meaningEn": "To establish mutual confidence over time", "meaningAr": "يبني الثقة المتبادلة" },
        { "collocation": "damage trust", "meaningEn": "To harm or diminish confidence between people", "meaningAr": "يضر بالثقة أو يدمرها" },
        { "collocation": "create lasting impressions", "meaningEn": "To leave a deep, memorable influence", "meaningAr": "يترك انطباعات دائمة لا تزول" },
        { "collocation": "hide behind illusions", "meaningEn": "To mask true reality with deceits", "meaningAr": "يختبئ وراء الأوهام" },
        { "collocation": "introduce an idea", "meaningEn": "To present a thought or point to an audience", "meaningAr": "يطرح فكرة أو نقطة للنقاش" },
        { "collocation": "state an argument", "meaningEn": "To formally express a reasoning or viewpoint", "meaningAr": "يعرض حجة أو يقدم دليلاً منطقياً" },
        { "collocation": "value honesty", "meaningEn": "To prize truthfulness above appearances", "meaningAr": "يقدر الصدق والنزاهة" },
        { "collocation": "information attacks", "meaningEn": "Digital campaigns aimed at undermining truth", "meaningAr": "هجمات التضليل المعلوماتي" }
    ],

    "expressions": [
        { "expression": "questioning mind", "meaningEn": "A critical, analytical attitude that checks facts", "meaningAr": "عقل ناقد وباحث عن الحقيقة" },
        { "expression": "benefit from me believing this", "meaningEn": "Who gains advantage if I accept this claim", "meaningAr": "من المستفيد من تصديقي لهذا الادعاء" },
        { "expression": "war of the new generation", "meaningEn": "Modern psychological and digital conflict using words", "meaningAr": "حرب الجيل الجديد (حرب الكلمات)" },
        { "expression": "trustworthy relationships", "meaningEn": "Bonds based on verified loyalty and honesty", "meaningAr": "علاقات جديرة بالثقة والاطمئنان" },
        { "expression": "acts of kindness", "meaningEn": "Good and thoughtful deeds", "meaningAr": "أفعال البر وأعمال اللطف" },
        { "expression": "as long as", "meaningEn": "Provided that", "meaningAr": "طالما / ما دام أن" }
    ],

    "prepositions": [
        { "verb": "benefit from", "meaningEn": "To gain advantage or profit from", "meaningAr": "يستفيد من" },
        { "verb": "protect ... from", "meaningEn": "To keep safe against danger or damage", "meaningAr": "يحمي ... من" },
        { "verb": "spread across", "meaningEn": "To extend or circulate over an entire area", "meaningAr": "ينتشر في أرجاء / عبر" },
        { "verb": "fight back", "meaningEn": "To resist or defend against an attack", "meaningAr": "يقاوم ويرد الهجوم" },
        { "verb": "remind ... of", "meaningEn": "To cause someone to remember something", "meaningAr": "يذكر ... بـ" },
        { "verb": "turn towards", "meaningEn": "To shift orientation or approach toward", "meaningAr": "يتجه نحو" },
        { "verb": "choose ... over", "meaningEn": "To prefer one option instead of another", "meaningAr": "يفضل ... على" }
    ],

    "derivatives": [
        {
            "base": "aware",
            "forms": [
                { "word": "aware", "partOfSpeech": "adj", "arabic": "واعٍ - مدرك" },
                { "word": "unaware", "partOfSpeech": "adj", "arabic": "غير واعٍ - غافل" },
                { "word": "awareness", "partOfSpeech": "n", "arabic": "وعي - إدراك" }
            ]
        },
        {
            "base": "defend",
            "forms": [
                { "word": "defend", "partOfSpeech": "v", "arabic": "يدافع عن - يحمي" },
                { "word": "defender", "partOfSpeech": "n", "arabic": "مدافع" },
                { "word": "defense", "partOfSpeech": "n", "arabic": "دفاع - حماية" },
                { "word": "defensive", "partOfSpeech": "adj", "arabic": "دفاعي" },
                { "word": "defensively", "partOfSpeech": "adv", "arabic": "بطريقة دفاعية" }
            ]
        },
        {
            "base": "visible",
            "forms": [
                { "word": "visible", "partOfSpeech": "adj", "arabic": "مرئي - واضح" },
                { "word": "invisible", "partOfSpeech": "adj", "arabic": "غير مرئي - خفي" },
                { "word": "invisibly", "partOfSpeech": "adv", "arabic": "بشكل غير مرئي" },
                { "word": "invisibility", "partOfSpeech": "n", "arabic": "عدم الرؤية - خفاء" }
            ]
        },
        {
            "base": "ruin",
            "forms": [
                { "word": "ruin", "partOfSpeech": "v", "arabic": "يدمر - يخرب" },
                { "word": "ruin", "partOfSpeech": "n", "arabic": "دمار - خراب" },
                { "word": "ruined", "partOfSpeech": "adj", "arabic": "مدمر - مخرب" }
            ]
        },
        {
            "base": "rumor",
            "forms": [
                { "word": "rumor", "partOfSpeech": "n", "arabic": "شائعة" },
                { "word": "rumor", "partOfSpeech": "v", "arabic": "يشيع - يروج شائعة" }
            ]
        }
    ],

    "clearConfusion": [
        {
            "title": "find + object + adjective",
            "explanation": "نستخدم هذه الصيغة للتعبير عن رأي أو شعور شخصي تجاه أمر ما:",
            "examples": [
                "I find the exam difficult. (أجد الامتحان صعباً)",
                "Many people find digital misinformation alarming. (يجد كثيرون التضليل مقلقاً)",
                "She found his explanation convincing. (وجدت تفسيره مقنعاً)"
            ]
        },
        {
            "title": "help + object + (to) infinitive / with + noun",
            "explanation": "أشكال وتراكيب الفعل (help):",
            "examples": [
                "help + obj + inf: My teacher helped me understand the lesson.",
                "help + obj + to + inf: My teacher helped me to understand the lesson. (كلاهما صحيح تماماً)",
                "help + obj + with + noun: I promised to help mum with the cooking."
            ]
        },
        {
            "title": "make: active (inf) vs passive (to + inf) vs adjective",
            "explanation": "استخدامات الفعل (make) المختلفة:",
            "examples": [
                "make + obj + adj: Her kind words made me happy. (جعلتني سعيداً)",
                "make + obj + inf (active): Mr Hossam made Omar write the essay again.",
                "be made + to + inf (passive): Omar was made to write the essay again. (لاحظ إضافة to في صيغة المبني للمجهول!)"
            ]
        },
        {
            "title": "(-ed) vs (-ing) Adjectives",
            "explanation": "الفرق بين الصفات المنتهية بـ (-ed) وتلك المنتهية بـ (-ing):",
            "examples": [
                "(-ed) adjective: تصف شعور الشخص أو المتأثر (I am interested in science / The little cat looks frightened).",
                "(-ing) adjective: تصف الشيء أو الشخص الذي يسبب ذلك الشعور (Science is interesting / The large dog is frightening)."
            ]
        },
        {
            "title": "career vs profession vs work vs job",
            "explanation": "الفروق الدقيقة بين مصطلحات العمل والمهنة:",
            "examples": [
                "career (n): مسار العمل أو سلسلة الوظائف طوال حياة الشخص (Dr. Samira has a long career in teaching).",
                "profession (n): مهنة تحتاج تدريباً أو مؤهلاً أكاديمياً خاصاً (Medicine is a noble profession).",
                "work (n): العمل بشكل عام لكسب الرزق وهو اسم لا يعد (I go to work every morning).",
                "job (n): وظيفة محددة ومنصب رسمي وهو اسم يعد (He got a new job as an engineer)."
            ]
        }
    ],

    "writingSkill": {
        "title": "Essay Writing Development Plan & Terminology (مخطط ومصطلحات كتابة المقال)",
        "overview": "يتكون المقال الأكاديمي من 3 أجزاء رئيسية: المقدمة (Introduction)، فقرات المتن (Body Paragraphs)، والخاتمة (Conclusion).",
        "structure": [
            {
                "section": "1. Introduction (المقدمة)",
                "role": "The first paragraph that introduces the topic and main idea.",
                "elements": [
                    { "name": "Hook (جملة الجذب)", "desc": "The opening sentence that catches the reader's interest (e.g. a thought-provoking question, shocking fact, or quote)." },
                    { "name": "Background Information (الخلفية)", "desc": "Brief sentences explaining the general context and history of the topic." },
                    { "name": "Thesis Statement (جملة الأطروحة)", "desc": "The core sentence stating the essay's main argument clearly at the end of the introduction." }
                ]
            },
            {
                "section": "2. Body Paragraphs (فقرات المتن/الموضوع)",
                "role": "Paragraphs in the middle that explain and support the thesis statement.",
                "elements": [
                    { "name": "Topic Sentence (جملة الموضوع)", "desc": "The first sentence in each body paragraph that tells its specific main point." },
                    { "name": "Supporting Details (التفاصيل الداعمة)", "desc": "Facts, real-life examples, statistics, or reasons that validate the topic sentence." },
                    { "name": "Transitions (عبارات الربط)", "desc": "Words and phrases (e.g. Furthermore, On the other hand, In addition) connecting ideas smoothly." }
                ]
            },
            {
                "section": "3. Conclusion (الخاتمة)",
                "role": "The final paragraph that summarizes and closes the essay effectively.",
                "elements": [
                    { "name": "Restate Thesis (إعادة صياغة الأطروحة)", "desc": "Summarizing the primary argument using fresh, different vocabulary." },
                    { "name": "Final Thought (الخاطرة النهائية)", "desc": "Ending with an inspiring reflection, warning, or call to action." }
                ]
            }
        ],
        "modelEssay": {
            "title": "Words Can Be More Dangerous Than Weapons",
            "content": "Words are powerful tools that can build or destroy. Many people believe that weapons are the most dangerous things in the world, but words can sometimes cause even more harm. Words do not leave physical wounds, but they can hurt people deeply and affect entire societies.\n\nFirstly, words can ruin a person's life. Bullying, rumors, or harsh criticism can destroy someone's confidence or reputation. A single lie or a careless comment can make a person feel alone or hopeless, which sometimes leads to serious psychological problems.\n\nSecondly, words can divide families, friends, or whole countries. Fake news and misinformation spread quickly, especially on social media. When people believe lies, they become angry or afraid. This can lead to conflict, violence, or even war.\n\nIn conclusion, words have the power to heal or to harm. We should always think before we speak or write. Using our words responsibly is just as important as handling any dangerous weapon safely."
        }
    },

    "storyPages": [
        {
            "page": 1,
            "badge": "المشهد 1 • The Spark of Deception",
            "caption": "The Dangerous Spread of Unchecked Rumors",
            "title": "The Invisible Missile",
            "textEn": "Late on Tuesday night, an anonymous post appeared claiming that the city's oldest bakery was using contaminated ingredients. Within hours, thousands of anxious parents reposted the warning across social networks without verification. Nobody paused to check official health inspection records. By morning, an invisible weapon of misinformation had exploded, threatening to ruin thirty years of honest labor.",
            "textAr": "في ساعة متأخرة من ليلة الثلاثاء، ظهر منشور مجهول يزعم أن أقدم مخبز في المدينة يستخدم مكونات فاسدة. وفي غضون ساعات قليلة، أعاد آلاف الآباء القلقين نشر التحذير عبر شبكات التواصل دون أي تحقق. لم يتوقف أحد لمراجعة سجلات التفتيش الصحي الرسمية! وبحلول الصباح، كان سلاح التضليل الخفي قد انفجر، مهدداً بتدمير ثلاثين عاماً من العمل الشريف والنزيه."
        },
        {
            "page": 2,
            "badge": "المشهد 2 • The Questioning Mind",
            "caption": "How Critical Thinking Shields Society",
            "title": "The Investigative Defense",
            "textEn": "Karim, a high school student and aspiring journalist, read the trending panic with a questioning mind. He refused to be manipulated. He asked crucial questions: 'Where did this story originate? Who benefits from destroying this bakery's reputation?' Karim visited the city health department and secured official laboratory certificates confirming that the bakery's flour was completely pure. The rumor was a fabricated half-truth designed by an unscrupulous competitor.",
            "textAr": "قرأ كريم، وهو طالب بالمرحلة الثانوية وصحفي واعد، موجة الذعر الشائعة بعقل ناقد ومتسائل. ورفض أن يكون أداة في يد المضللين؛ فطرح أسئلة جوهرية: 'من أين انطلقت هذه القصة؟ ومن المستفيد من تدمير سمعة هذا المخبز؟' توجه كريم إلى إدارة الصحة بالمدينة وحصل على شهادات معملية رسمية تؤكد نقاء دقيق المخبز بنسبة 100%. لقد كانت الشائعة مجرد نصف حقيقة ملفقة دبرها منافس تجاري بلا ضمير."
        },
        {
            "page": 3,
            "badge": "المشهد 3 • The Victory of Awareness",
            "caption": "Restoring Trust Through Truth",
            "title": "Building Lasting Awareness",
            "textEn": "Karim published his verified findings alongside the official documents. The community rallied around the honest baker, realizing how easily misinformation damages trust. The incident taught the entire neighborhood a profound lesson: digital awareness is the strongest shield in the modern world. When citizens think critically before sharing, truth triumphs over deception.",
            "textAr": "نشر كريم نتائجه الموثقة بالأدلة إلى جانب المستندات الرسمية. فالتف المجتمع بأسره حول الخباز الشريف، مدركين كم هو سهل على الشائعات أن تضر بالثقة الإنسانية. كان ذلك الحادث درساً بليغاً للحي بأكمله: الوعي الرقمي هو أقوى درع في العالم المعاصر. فعندما يفكر الأفراد بنقد وتحرٍّ قبل المشاركة، تنتصر الحقيقة دوماً على التضليل."
        }
    ],

    "dialogue": [
        {
            "speaker": "Ziad",
            "role": "High School Student",
            "en": "Hany, did you read that shocking news on Facebook about our school schedule changing tomorrow?",
            "ar": "هاني، هل قرأت هذا الخبر الصادم على فيسبوك عن تغيير جدول مدرستنا غداً؟"
        },
        {
            "speaker": "Hany",
            "role": "Classmate & Fact-Checker",
            "en": "I did, Ziad, but I didn't share it. It sounds like an unverified rumor.",
            "ar": "قرأته يا زياد، لكني لم أنشره. يبدو لي أنه مجرد شائعة غير مؤكدة."
        },
        {
            "speaker": "Ziad",
            "role": "High School Student",
            "en": "Why are you so skeptical? It was shared by hundreds of students!",
            "ar": "لماذا أنت متشكك هكذا؟ لقد شاركه مئات الطلاب!"
        },
        {
            "speaker": "Hany",
            "role": "Classmate & Fact-Checker",
            "en": "Because in modern warfare, misinformation travels faster than truth! We must always protect ourselves with awareness.",
            "ar": "لأنه في عصرنا الحالي، تنتشر المعلومات المضللة أسرع من الحقيقة! وعلينا دائماً حماية أنفسنا بالوعي."
        },
        {
            "speaker": "Ziad",
            "role": "High School Student",
            "en": "You're right. Words can really act like invisible weapons if people don't fact-check.",
            "ar": "معك حق تماماً. الكلمات يمكن أن تعمل كأسلحة خفية إذا لم يتحقق الناس من صحتها."
        },
        {
            "speaker": "Hany",
            "role": "Classmate & Fact-Checker",
            "en": "Exactly. A questioning mind asks: 'Who benefits from me believing this?' Let's wait for the official school website.",
            "ar": "بالضبط! العقل الناقد يسأل دوماً: 'من المستفيد من تصديقي لهذا؟' دعنا ننتظر البيان على الموقع الرسمي للمدرسة."
        }
    ],

    "quizQuestions": [
        {
            "question": "1. Protecting ourselves against modern cyber threats requires a high level of digital ............. .",
            "options": ["awareness", "carelessness", "ignorance", "laziness"],
            "correct": 0,
            "explanation": "'Awareness' تعني الوعي والإدراك للمخاطر المحيطة."
        },
        {
            "question": "2. Modern digital misinformation acts like an ............. weapon that hurts without being seen.",
            "options": ["invisible", "obvious", "audible", "attractive"],
            "correct": 0,
            "explanation": "'Invisible' تعني غير مرئي أو خفي."
        },
        {
            "question": "3. Spreading malicious lies about a public figure can easily ............. their professional career.",
            "options": ["ruin", "repair", "assist", "build"],
            "correct": 0,
            "explanation": "الفعل 'ruin' يعني يدمر أو يخرّب السمعة والمسار المهني."
        },
        {
            "question": "4. Before believing shocking gossip, you should ensure it is not just an unconfirmed ............. .",
            "options": ["rumor", "fact", "proof", "truth"],
            "correct": 0,
            "explanation": "'Rumor' هي الشائعة أو القصة التي يتناقلها الناس دون تثبت."
        },
        {
            "question": "5. A ............. mind questions information and looks for reliable sources.",
            "options": ["questioning", "sleeping", "careless", "foolish"],
            "correct": 0,
            "explanation": "المصطلح 'questioning mind' يعني عقلاً ناقداً ومتسائلاً يتحرى الصدق."
        },
        {
            "question": "6. The main objective of information warfare is not to demolish buildings, but to ............. trust.",
            "options": ["damage", "construct", "rebuild", "support"],
            "correct": 0,
            "explanation": "المتلازمة اللفظية في النص: 'damage trust' (يضر بالثقة أو يدمرها)."
        },
        {
            "question": "7. The opposite of 'defense' is ............. .",
            "options": ["attack", "protection", "shield", "safeguard"],
            "correct": 0,
            "explanation": "عكس كلمة 'defense' (دفاع) هو 'attack' (هجوم / اعتداء)."
        },
        {
            "question": "8. What is the synonym of the adjective 'invisible'?",
            "options": ["unseen", "noticeable", "visible", "apparent"],
            "correct": 0,
            "explanation": "مرادف 'invisible' (غير مرئي) هو 'unseen' (مخفي / غير منظور)."
        },
        {
            "question": "9. 'Information meant to make people believe something false' is the definition of ............. .",
            "options": ["misinformation", "education", "inspiration", "cooperation"],
            "correct": 0,
            "explanation": "هذا هو التعريف الحرفي لكلمة 'misinformation' في كتاب المعاصر ص 169."
        },
        {
            "question": "10. In traditional wars, soldiers fought using bullets, bombs, and ............. .",
            "options": ["tanks", "tablets", "filters", "mirages"],
            "correct": 0,
            "explanation": "وفقاً لنص القراءة SB p. 44: 'wars were fought with soldiers, tanks, and planes.'"
        },
        {
            "question": "11. Once a rumor starts circulating online, it is extremely difficult to ............. .",
            "options": ["fight back", "hide back", "give back", "look back"],
            "correct": 0,
            "explanation": "التعبير في النص هو 'fight back' بمعنى يقاوم أو يرد الهجوم."
        },
        {
            "question": "12. We should always ask: 'Who might benefit ............. me believing this false news?'",
            "options": ["from", "of", "with", "at"],
            "correct": 0,
            "explanation": "الفعل 'benefit' يأخذ حرف الجر 'from' (benefit from)."
        },
        {
            "question": "13. The antonym of 'ruin' is ............. .",
            "options": ["restore", "destroy", "devastate", "demolish"],
            "correct": 0,
            "explanation": "مضاد 'ruin' (يدمر) هو 'restore' (يصلح / يعيد بناء)."
        },
        {
            "question": "14. A person who suffers harm as a result of a cyber crime or malicious rumor is a ............. .",
            "options": ["victim", "winner", "bully", "perpetrator"],
            "correct": 0,
            "explanation": "'Victim' تعني ضحية."
        },
        {
            "question": "15. The goalkeeper played in a very ............. manner to protect his goal.",
            "options": ["defensive", "defensively", "defender", "defend"],
            "correct": 0,
            "explanation": "نحتاج صفة تصف manner (manner اسم)، لذا نختار 'defensive'."
        },
        {
            "question": "16. Many people remain completely ............. of the psychological impact of cyberbullying.",
            "options": ["unaware", "awareness", "awarely", "awareless"],
            "correct": 0,
            "explanation": "'Unaware of' تعني غافل أو غير واعٍ بـ."
        },
        {
            "question": "17. I ............. this reading passage very challenging and thought-provoking.",
            "options": ["find", "make", "let", "have"],
            "correct": 0,
            "explanation": "التركيب 'find + obj + adj' يُستخدم للتعبير عن الرأي (I find this passage challenging)."
        },
        {
            "question": "18. The teacher helped her students ............. the complex essay structure.",
            "options": ["understand", "understanding", "understood", "for understanding"],
            "correct": 0,
            "explanation": "بعد 'help + obj' نستخدم المصدر بدون to أو مع to (understand / to understand)."
        },
        {
            "question": "19. The sudden bad news made everyone in the room ............. .",
            "options": ["sad", "sadly", "sadness", "to sadden"],
            "correct": 0,
            "explanation": "التركيب 'make + object + adjective' (made everyone sad)."
        },
        {
            "question": "20. The naughty boy was made ............. for his rude behavior in class.",
            "options": ["to apologize", "apologize", "apologizing", "apologized"],
            "correct": 0,
            "explanation": "في المبني للمجهول 'be made' يأخذ بعدها 'to + infinitive' (was made to apologize)."
        },
        {
            "question": "21. Medicine is considered a noble ............. that requires years of rigorous study.",
            "options": ["profession", "work", "job", "career"],
            "correct": 0,
            "explanation": "'Profession' هي المهنة التخصصية التي تتطلب تعليماً وتدريباً عالياً."
        },
        {
            "question": "22. The horror documentary on television was truly ............. .",
            "options": ["frightening", "frightened", "fright", "frightfully"],
            "correct": 0,
            "explanation": "الصفة المنتهية بـ '-ing' تصف الشيء المسبب للشعور (The documentary was frightening)."
        },
        {
            "question": "23. The opening sentence of an essay that catches the reader's interest is known as the ............. .",
            "options": ["hook", "thesis statement", "topic sentence", "conclusion"],
            "correct": 0,
            "explanation": "جملة الجذب التي تستهل المقال وتثير فضول القارئ هي 'hook'."
        },
        {
            "question": "24. The main argument of an entire essay is stated clearly in the ............. .",
            "options": ["thesis statement", "hook", "supporting detail", "transition"],
            "correct": 0,
            "explanation": "الفكرة الرئيسية أو الحجة المحورية للمقال كله هي 'thesis statement' (جملة الأطروحة)."
        },
        {
            "question": "25. The first sentence in a body paragraph that introduces its specific point is the ............. .",
            "options": ["topic sentence", "hook", "title", "call to action"],
            "correct": 0,
            "explanation": "الجملة الافتتاحية في فقرة المتن هي 'topic sentence' (جملة الموضوع)."
        },
        {
            "question": "26. Words or phrases like 'Furthermore' and 'In contrast' that connect ideas are called ............. .",
            "options": ["transitions", "theses", "hooks", "rumors"],
            "correct": 0,
            "explanation": "أدوات وعبارات الربط بين الجمل والفقرات تُسمى 'transitions'."
        },
        {
            "question": "27. In the conclusion paragraph of an essay, a writer should ............. the thesis statement.",
            "options": ["restate", "ignore", "forget", "contradict"],
            "correct": 0,
            "explanation": "في الخاتمة، يقوم الكاتب بإعادة صياغة الأطروحة 'restate the thesis' بكلمات مختلفة."
        },
        {
            "question": "28. An essay typically consists of three main components: ............. .",
            "options": ["introduction, body paragraphs, and conclusion", "heading, bullet points, and signature", "stanza, rhyme, and meter", "dialogue, script, and stage directions"],
            "correct": 0,
            "explanation": "يتكون المقال من مقدمة، فقرات متن، وخاتمة (introduction, body paragraphs, and conclusion)."
        },
        {
            "question": "29. The main purpose of a catchy title in an essay or article is to ............. .",
            "options": ["attract the reader's attention", "waste reading time", "confuse the reader", "ignore the main theme"],
            "correct": 0,
            "explanation": "الغرض من العنوان الجذاب هو لفت انتباه القارئ (attract the reader's attention - سؤال محافظة الجيزة ص 180)."
        },
        {
            "question": "30. A piece of writing that consists of a series of paragraphs sharing ideas on a specific topic is a/an ............. .",
            "options": ["essay", "single sentence", "short idiom", "optical illusion"],
            "correct": 0,
            "explanation": "المقال 'essay' هو عمل كتابي يتألف من عدة فقرات تعالج موضوعاً محدداً (سؤال محافظة البحيرة ص 180)."
        }
    ]
}

out_data_path = r"c:\Users\Al700t\OneDrive\Desktop\Learn_English\Sec_1\unit-3\lesson-4-5.data.js"
js_content = f"// Sec 1 - Unit 3 - Lessons 4 & 5 Data Payload\nwindow.__LESSON_DATA__ = {json.dumps(lesson_data, ensure_ascii=False, indent=2)};\n"

with open(out_data_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully generated {out_data_path} with {len(lesson_data['quizQuestions'])} MCQs!")

# Now generate lesson-4-5.html
html_content = """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 1 - Unit 3 - Lessons 4 & 5: The Truth Trap & Essay Writing Plan | Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css?v=6">
    <link rel="stylesheet" href="../../assets/css/curriculum.css">
    <link rel="stylesheet" href="../../assets/css/storybook.css">
    <link rel="stylesheet" href="../../assets/css/quiz.css">
</head>
<body>

    <div class="container">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb">
            <a href="../index.html">Sec 1</a> / <a href="./index.html">Unit 3</a> / <span>Lessons 4 & 5</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Sec 1 • Unit 3</span>
                <span class="badge badge-gold">🛡 The Truth Trap & Essay Plan</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lessons 4 & 5: The Truth Trap & Essay Writing Plan</h2>
            <p id="description" class="lesson-desc-display">المفردات الأساسية والتراكمية، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، الفروق اللغوية، مخطط كتابة المقال، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)</p>
        </div>

        <!-- Tabs Navigation Bar (Zero Grammar) -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('collocations', this)">🔗 المتلازمات والتعبيرات</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('language-notes', this)">🧬 المشتقات والفروق (Notes)</button>
            <button class="tab-btn" onclick="switchTab('writing-skill', this)">✍️ مهارة كتابة المقال (Writing)</button>
            <button class="tab-btn" onclick="switchTab('storybook', this)">📚 القراءة التفاعلية (StoryBook)</button>
            <button class="tab-btn" onclick="switchTab('dialogue', this)">💬 المحادثة الناطقة (Dialogue)</button>
            <button class="tab-btn" onclick="switchTab('quiz', this)">🎯 اختبار الدرس الشامل (Quiz)</button>
        </div>

        <!-- Dynamic Content Containers (Hydrated by CurriculumRenderer) -->
        <div id="vocab" class="tab-content active"></div>
        <div id="definitions" class="tab-content"></div>
        <div id="collocations" class="tab-content"></div>
        <div id="synonyms" class="tab-content"></div>
        <div id="language-notes" class="tab-content"></div>

        <!-- Tab: Writing Skill (Essay Writing Plan) -->
        <div id="writing-skill" class="tab-content">
            <div class="lexicon-section">
                <h2 class="section-title">✍️ مخطط ومصطلحات كتابة المقال (Essay Writing Plan)</h2>
                <div class="writing-plan-container" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                        <div style="background: rgba(14, 165, 233, 0.08); border: 1px solid rgba(14, 165, 233, 0.2); border-radius: 12px; padding: 18px;">
                            <h3 style="color: #38bdf8; font-size: 1.15rem; margin-bottom: 12px;">1️⃣ Introduction (المقدمة)</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8; font-size: 0.95rem;">
                                <li>🎣 <strong>Hook:</strong> جملة الجذب الافتتاحية (سؤال أو حقيقة صادمة) لجذب اهتمام القارئ.</li>
                                <li>📜 <strong>Background:</strong> معلومات تمهيدية تشرح سياق الموضوع بإيجاز.</li>
                                <li>🎯 <strong>Thesis Statement:</strong> جملة الأطروحة في نهاية المقدمة توضح الفكرة والحجة الرئيسية للمقال.</li>
                            </ul>
                        </div>
                        <div style="background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; padding: 18px;">
                            <h3 style="color: #c084fc; font-size: 1.15rem; margin-bottom: 12px;">2️⃣ Body Paragraphs (فقرات المتن)</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8; font-size: 0.95rem;">
                                <li>📌 <strong>Topic Sentence:</strong> الجملة الأولى في كل فقرة تقدم الفكرة الأساسية لتلك الفقرة.</li>
                                <li>📊 <strong>Supporting Details:</strong> حقائق وأمثلة وأسباب تدعم وتوضح فكرة الفقرة.</li>
                                <li>🔗 <strong>Transitions:</strong> كلمات وعبارات ربط (مثل Furthermore, However) لربط الأفكار بسلاسة.</li>
                            </ul>
                        </div>
                        <div style="background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px; padding: 18px;">
                            <h3 style="color: #4ade80; font-size: 1.15rem; margin-bottom: 12px;">3️⃣ Conclusion (الخاتمة)</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8; font-size: 0.95rem;">
                                <li>🔄 <strong>Restate Thesis:</strong> تلخيص وإعادة صياغة الأطروحة الأساسية بكلمات مختلفة.</li>
                                <li>💡 <strong>Final Thought:</strong> اختتام المقال بخاطرة ملهمة، تأمل، أو دعوة صريحة للعمل (Call to Action).</li>
                            </ul>
                        </div>
                    </div>

                    <div style="margin-top: 24px; padding: 20px; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 12px;">
                        <h3 style="color: #fbbf24; font-size: 1.2rem; margin-bottom: 12px;">📝 مقال نموذجي (Model Essay)</h3>
                        <h4 style="color: #fff; font-size: 1.05rem; margin-bottom: 10px;">"Words can be more dangerous than weapons"</h4>
                        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.9; color: #cbd5e1; font-size: 0.98rem; text-align: left; direction: ltr;">
                            <p><strong>Introduction:</strong> Words are powerful tools that can build or destroy. Many people believe that weapons are the most dangerous things in the world, but words can sometimes cause even more harm. Words do not leave physical wounds, but they can hurt people deeply and affect entire societies.</p>
                            <p style="margin-top: 10px;"><strong>Body Paragraph 1:</strong> Firstly, words can ruin a person's life. Bullying, rumors, or harsh criticism can destroy someone's confidence or reputation. A single lie or a comment can make a person feel alone or hopeless, which sometimes leads to serious problems.</p>
                            <p style="margin-top: 10px;"><strong>Body Paragraph 2:</strong> Secondly, words can divide families, friends, or whole countries. Fake news and misinformation spread quickly, especially on social media. When people believe lies, they become angry or afraid. This can lead to conflict, violence, or even war.</p>
                            <p style="margin-top: 10px;"><strong>Conclusion:</strong> In conclusion, words have the power to heal or to harm. We should always think before we speak or write. Using our words responsibly is as important as using any weapon safely.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab: Interactive StoryBook 3D -->
        <div id="storybook" class="tab-content">
            <div class="storybook-wrapper">
                <div class="storybook-book">
                    <div class="book-spine-divider"></div>
                    <div class="story-page-artwork">
                        <div class="artwork-frame">
                            <img id="storyImg" src="../../assets/images/gem_museum.webp" alt="Story Illustration" class="story-img-display" onerror="this.onerror=null; this.src='../../assets/images/gem_museum.webp';">
                            <div class="artwork-gradient"></div>
                        </div>
                        <div class="story-badge" id="storyBadge">المشهد 1 • The Spark of Deception</div>
                        <div class="story-caption" id="storyCaption">The Dangerous Spread of Unchecked Rumors</div>
                    </div>
                    <div class="story-page-content">
                        <h2 class="story-page-title" id="storyTitle">The Invisible Missile</h2>
                        <div class="story-text-container">
                            <p class="story-text-en" id="storyEn"></p>
                            <p class="story-text-ar" id="storyAr"></p>
                        </div>
                        <div class="story-page-footer">
                            <div class="page-indicator">الصفحة <span id="currentPageNum">1</span> من <span id="totalPagesNum">3</span></div>
                            <div class="story-audio-btn-row">
                                <button class="story-audio-btn" id="ttsBtn" onclick="speakCurrentStoryPage(this)">🔊 استمع بالإنجليزية</button>
                                <button class="story-audio-btn story-toggle-btn" id="storytellerBtn" onclick="toggleStoryteller()">🎭 الراوي الآلي</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="story-controls">
                    <button class="story-nav-btn" id="prevPageBtn" onclick="changeStoryPage(-1)">الصفحة السابقة</button>
                    <button class="story-nav-btn" id="nextPageBtn" onclick="changeStoryPage(1)">الصفحة التالية</button>
                </div>
            </div>
        </div>

        <!-- Tab: Interactive Speaking Dialogue -->
        <div id="dialogue" class="tab-content">
            <div class="dialogue-container">
                <div class="dialogue-header">
                    <h2>💬 المحادثة الناطقة (Interactive Dialogue)</h2>
                    <p class="dialogue-subtitle">حوار توعوي تفاعلي بين زياد وهاني حول مواجهة الشائعات الإلكترونية والتحقق من الأخبار والتفكير الناقد</p>
                </div>
                <div class="dialogue-flow" id="dialogueList"></div>
            </div>
        </div>

        <!-- Tab: Comprehensive Quiz (Zero Grammar) -->
        <div id="quiz" class="tab-content">
            <div class="quiz-card">
                <div class="quiz-progress-bar">
                    <div class="quiz-progress-fill" id="quizProgressFill"></div>
                </div>
                <div class="quiz-meta-row">
                    <span class="quiz-step-badge" id="questionStep">السؤال 1 من 30</span>
                    <span class="quiz-score-badge" id="quizScoreBadge">الدرجة: 0 / 30</span>
                </div>
                <h3 class="quiz-question-title" id="question">جاري تحميل السؤال...</h3>
                <div class="quiz-options-list" id="options"></div>
                <div class="quiz-feedback-box" id="feedback"></div>
                <div class="quiz-actions-row">
                    <button class="quiz-nav-btn" id="prevBtn" onclick="prevQuestion()" disabled>السابق</button>
                    <button class="quiz-nav-btn primary" id="nextBtn" onclick="nextQuestion()" disabled>التالي</button>
                </div>
                <div class="quiz-results-card" id="quizResultsCard" style="display: none;">
                    <div class="quiz-score-circle">
                        <span class="quiz-final-score" id="finalScoreVal">0</span>
                        <span class="quiz-max-score">/ 30</span>
                    </div>
                    <h3 class="quiz-results-title" id="quizFeedbackTitle">أحسنت!</h3>
                    <p class="quiz-results-desc" id="quizFeedbackDesc">لقد أتممت الاختبار الشامل بنجاح.</p>
                    <button class="quiz-nav-btn primary" onclick="restartQuiz()">إعادة الاختبار 🔄</button>
                </div>
            </div>
        </div>

        <!-- Bottom Return Controls -->
        <div class="nav-controls" style="margin-top: 36px;">
            <a href="./index.html" class="action-btn secondary" data-sound-click="click">⬅ العودة لقائمة دروس الوحدة الثالثة</a>
            <a href="../index.html" class="action-btn secondary" data-sound-click="click">🏠 قائمة وحدات الصف الأول الثانوي</a>
        </div>
    </div>

    <!-- Framework & Data Scripts -->
    <script src="../../assets/js/bidi.js"></script>
    <script src="../../assets/js/audio.js"></script>
    <script src="../../assets/js/tabs.js"></script>
    <script src="../../assets/js/quiz-engine.js"></script>
    <script src="../../assets/js/story-engine.js"></script>
    <script src="../../assets/js/ui.js?v=6"></script>

    <!-- Modular Curriculum Sub-Renderers -->
    <script src="../../assets/js/renderers/ui-primitives.js"></script>
    <script src="../../assets/js/renderers/vocab-renderer.js"></script>
    <script src="../../assets/js/renderers/lexicon-renderer.js"></script>
    <script src="../../assets/js/renderers/dialogue-player.js"></script>

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="./lesson-4-5.data.js"></script>

    <!-- Universal Dynamic Curriculum Renderer -->
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/main.js"></script>

    <script>
        function changeStoryPage(dir) {
            if (window.storyEngine && typeof window.storyEngine.changePage === 'function') {
                window.storyEngine.changePage(dir);
            }
        }
        function toggleStoryteller() {
            if (window.storyEngine && typeof window.storyEngine.toggleStoryteller === 'function') {
                window.storyEngine.toggleStoryteller();
            }
        }
        function speakCurrentStoryPage(btn) {
            if (window.storyEngine && window.storyEngine.storyPages) {
                const cur = window.storyEngine.storyPages[window.storyEngine.currentPage];
                const text = cur ? (cur.textEn || cur.text || '') : '';
                if (text && typeof speakText === 'function') speakText(text, btn);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {
                window.CurriculumRenderer.init();
            }
            if (typeof loadQuestion === 'function' && document.getElementById('question')) {
                loadQuestion();
            }
            if (window.storyEngine && window.lessonData && window.lessonData.storyPages) {
                window.storyEngine.loadPages(window.lessonData.storyPages);
            }
        });
    </script>
</body>
</html>
"""

out_html_path = r"c:\Users\Al700t\OneDrive\Desktop\Learn_English\Sec_1\unit-3\lesson-4-5.html"
with open(out_html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Successfully generated {out_html_path}!")
