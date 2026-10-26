import json
import os

lesson_data = {
    "id": "sec1-u4-l45",
    "stage": "sec1",
    "unit": 4,
    "lesson": "4-5",
    "title": "Lessons 4 & 5: Helping our Community & Formal Email Writing (خدمة مجتمعنا وكتابة الإيميل الرسمي)",
    "description": "المفردات الأساسية والتراكمية، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، دليل كتابة الإيميل الرسمي، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)",

    "keyVocabulary": [
        { "word": "assembly", "partOfSpeech": "n", "arabic": "طابور الصباح - جمعية - اجتماع رسمي", "example": "The principal gave an inspiring speech during the morning assembly." },
        { "word": "drip", "partOfSpeech": "v-n", "arabic": "يقطر - يسقط قطرة قطرة / قطرة ماء", "example": "A single tap that drips can waste dozens of liters of clean water daily." },
        { "word": "impact", "partOfSpeech": "n-v", "arabic": "أثر - تأثير / يؤثر تأثيراً قوياً", "example": "Green community campaigns have a powerful positive impact on the city." },
        { "word": "leak", "partOfSpeech": "n-v", "arabic": "تسريب - ثقب / يتسرب - يسرب معلومات", "example": "Plumbers quickly fixed the underground leak before the pipes burst." },
        { "word": "mission", "partOfSpeech": "n", "arabic": "مهمة خاصة - غاية محددة", "example": "The students' mission was to inspect every water fountain in the school." },
        { "word": "observe", "partOfSpeech": "v", "arabic": "يلاحظ بدقة - يرصد - يراقب", "example": "Scientists observe animal behavior in their natural habitats." },
        { "word": "observation", "partOfSpeech": "n", "arabic": "ملاحظة - رصد دقيق", "example": "Careful observation revealed that several taps were left dripping." },
        { "word": "record", "partOfSpeech": "v-n", "arabic": "يسجل - يوثق / سجل رسمي", "example": "Keep a written record of all daily electricity meter readings." },
        { "word": "survey", "partOfSpeech": "v-n", "arabic": "يفحص - يستعرض / استبيان - بحث استطلاعي", "example": "The club conducted a survey to ask residents about recycling services." }
    ],

    "accumulativeVocabulary": [
        { "word": "active", "partOfSpeech": "adj", "arabic": "نشيط - فعال", "example": "Active youth participation strengthens community projects." },
        { "word": "bright", "partOfSpeech": "adj", "arabic": "مشرق - ساطع - ذكي", "example": "In a bright classroom, students brainstormed green ideas." },
        { "word": "chart", "partOfSpeech": "n", "arabic": "رسم بياني - مخطط توضيحي", "example": "The team presented a colorful chart showing monthly water savings." },
        { "word": "completely", "partOfSpeech": "adv", "arabic": "تماماً - بالكامل", "example": "Remember to turn off taps completely after washing your hands." },
        { "word": "cycle", "partOfSpeech": "v", "arabic": "يركب دراجة هوائية", "example": "He cycles to the club every afternoon to stay fit." },
        { "word": "device", "partOfSpeech": "n", "arabic": "جهاز إلكتروني أو آلي", "example": "Unplug any electronic device that you are not actively using." },
        { "word": "fill", "partOfSpeech": "v", "arabic": "يملأ - يعبئ", "example": "Students fill their reusable flasks at the clean water dispenser." },
        { "word": "finding", "partOfSpeech": "n", "arabic": "نتيجة - ما تم التوصل إليه بالبحث", "example": "The survey findings proved that public awareness had increased." },
        { "word": "fix", "partOfSpeech": "v", "arabic": "يصلح - يعالج خللاً", "example": "A professional carpenter helped fix the broken desks." },
        { "word": "form", "partOfSpeech": "v-n", "arabic": "يشكل - يكوّن / استمارة - نموذج", "example": "The teacher suggested forming small environmental teams." },
        { "word": "fountain", "partOfSpeech": "n", "arabic": "نافورة - مبرد مياه للشرب", "example": "Do not play with water around the school drinking fountain." },
        { "word": "include", "partOfSpeech": "v", "arabic": "يتضمن - يشمل", "example": "The inspection will include all science laboratories and cafeterias." },
        { "word": "lab", "partOfSpeech": "n", "arabic": "معمل - مختبر علمي", "example": "Turn off gas burners and water taps before leaving the chemistry lab." },
        { "word": "playground", "partOfSpeech": "n", "arabic": "ملعب - فناء المدرسة", "example": "Children gathered in the playground during recess." },
        { "word": "present", "partOfSpeech": "v", "arabic": "يقدم - يعرض أمام الجمهور", "example": "The student committee will present their findings tomorrow." },
        { "word": "product", "partOfSpeech": "n", "arabic": "منتج - سلعة مصنعة", "example": "Always choose eco-friendly cleaning products." },
        { "word": "public space", "partOfSpeech": "n phr", "arabic": "مكان عام - مساحة مفتوحة للجميع", "example": "Maintaining clean public spaces is everyone's civic duty." },
        { "word": "regularly", "partOfSpeech": "adv", "arabic": "بانتظام وبشكل دوري", "example": "Check electrical cords regularly for any signs of wear." },
        { "word": "research", "partOfSpeech": "n-v", "arabic": "بحث علمي / يجري أبحاثاً", "example": "She conducted thorough research before drafting the report." },
        { "word": "sink", "partOfSpeech": "n", "arabic": "حوض غسيل", "example": "Never leave dirty plates piling up in the kitchen sink." },
        { "word": "tap", "partOfSpeech": "n", "arabic": "صنبور مياه - حنفية", "example": "Make sure the tap is firmly shut so it stops dripping." },
        { "word": "unique", "partOfSpeech": "adj", "arabic": "فريد من نوعه - مميز", "example": "Each student group was assigned a unique community mission." },
        { "word": "unplug", "partOfSpeech": "v", "arabic": "ينزع القابس الكهربائي", "example": "Unplug the television before leaving for summer vacation." },
        { "word": "useful", "partOfSpeech": "adj", "arabic": "مفيد ونافع", "example": "Carrying cloth tote bags is a very useful shopping habit." }
    ],

    "definitions": [
        {
            "word": "assembly",
            "defEn": "A large gathering of people, especially students and teachers, brought together for a common purpose.",
            "defAr": "تجمع رسمي لعدد كبير من الأشخاص (كالطلاب والمعلمين بطابور الصباح) لهدف مشترك."
        },
        {
            "word": "drip",
            "defEn": "A small liquid drop that falls from a surface, or the action of falling slowly in small drops.",
            "defAr": "قطرة سائل صغيرة تسقط، أو فعل السقوط قطرة تلو الأخرى ببطء."
        },
        {
            "word": "impact",
            "defEn": "A strong effect, impression, or influence that an action or situation produces.",
            "defAr": "تأثير أو انطباع قوي وواضح ينتج عن تصرف أو موقف معين."
        },
        {
            "word": "leak",
            "defEn": "A crack or hole that allows liquid or gas to escape accidentally, or the unauthorized release of secret information.",
            "defAr": "ثقب أو شق يسمح بخروج سائل أو غاز بالخطأ، أو تسريب وتمرير معلومات سرية للعامة."
        },
        {
            "word": "mission",
            "defEn": "An important special assignment or official duty given to an individual or group to accomplish.",
            "defAr": "مهمة خاصة أو تكليف رسمي محدد يُسند لفرد أو جماعة لإنجازه."
        },
        {
            "word": "observation",
            "defEn": "The act of watching or noticing someone or something attentively and systematically.",
            "defAr": "عملية مراقبة ورصد شخص أو شيء بانتباه ودقة منظمة."
        },
        {
            "word": "record",
            "defEn": "To store information, data, or facts in writing or digital form for future reference.",
            "defAr": "تدوين وحفظ المعلومات والبيانات كتابياً أو إلكترونياً للرجوع إليها مستقبلاً."
        },
        {
            "word": "survey",
            "defEn": "An investigation of opinions or behavior conducted by asking a structured set of questions.",
            "defAr": "بحث استطلاعي أو استبيان منظم يُجرى بطرح أسئلة لدراسة آراء أو سلوكيات عينة من الناس."
        }
    ],

    "synonyms": [
        { "word": "assembly", "synonyms": ["gathering", "meeting", "council", "rally"], "arabic": "تجمع - اجتماع - جمعية" },
        { "word": "drip", "synonyms": ["trickle", "leak", "dribble", "drop"], "arabic": "يقطر - ينساب قطرة قطرة" },
        { "word": "impact", "synonyms": ["effect", "influence", "impression", "consequence"], "arabic": "أثر - تأثير - وقع" },
        { "word": "leak", "synonyms": ["revelation", "release", "escape", "seepage"], "arabic": "تسريب - كشف أسرار - خروج سائل" },
        { "word": "mission", "synonyms": ["task", "assignment", "duty", "objective"], "arabic": "مهمة - تكليف - غاية" },
        { "word": "observation", "synonyms": ["perception", "viewing", "notice", "monitoring"], "arabic": "ملاحظة - رصد - مراقبة" },
        { "word": "record", "synonyms": ["document", "note", "log", "register"], "arabic": "يسجل - يوثق - يدون" },
        { "word": "survey", "synonyms": ["review", "question", "inspect", "examine"], "arabic": "يستعرض - يفحص - يستطلع الآراء" }
    ],

    "antonyms": [
        { "word": "assembly", "antonyms": ["separation", "dispersion", "division", "scattering"], "arabic": "تفرق - تشتت - انقسام" },
        { "word": "drip", "antonyms": ["gush", "pour", "flow heavily", "flood"], "arabic": "يتدفق بغزارة - ينسكب" },
        { "word": "observation", "antonyms": ["disregard", "inattention", "ignorance", "neglect"], "arabic": "تجاهل - إغفال - عدم انتباه" },
        { "word": "record", "antonyms": ["erase", "delete", "ignore", "forget"], "arabic": "يمحو - يحذف - يتجاهل" },
        { "word": "leak", "antonyms": ["containment", "secrecy", "hiding"], "arabic": "احتواء - كتمان - سرية" },
        { "word": "mission", "antonyms": ["aimlessness", "inactivity", "idleness"], "arabic": "عبثية - بلا هدف - خمول" }
    ],

    "collocations": [
        { "phrase": "cause serious problems / harm", "meaning": "يسبب مشكلات أو ضرراً جسيماً", "example": "Cutting down trees causes serious problems for birds." },
        { "phrase": "have a big impact on", "meaning": "يمتلك تأثيراً كبيراً وبالغاً على", "example": "Climate change has a big impact on agriculture." },
        { "phrase": "play a part in", "meaning": "يشارك في / يسهم بدور في", "example": "Students play a part in keeping their school beautiful." },
        { "phrase": "make a big difference", "meaning": "يحدث فارقاً ملموساً", "example": "Fixing dripping taps can make a big difference in water bills." },
        { "phrase": "practice recycling", "meaning": "يمارس تدوير المخلفات والقمامة", "example": "Many families practice recycling at home." },
        { "phrase": "present findings", "meaning": "يعرض ما تم التوصل إليه من نتائج", "example": "The team will present findings at the morning assembly." },
        { "phrase": "unplug a device", "meaning": "يفصل القابس الكهربائي لجهاز ما", "example": "Always unplug a device once it is fully charged." },
        { "phrase": "record observations", "meaning": "يسجل ويوثق الملاحظات كتابة", "example": "Researchers record observations in daily field logs." },
        { "phrase": "conduct a survey", "meaning": "يجري بحثاً استطلاعياً أو استبياناً", "example": "The school conducted a survey about cafeteria food." },
        { "phrase": "fix leaks", "meaning": "يصلح مواضع تسريب المياه أو الغاز", "example": "Maintenance workers were called to fix leaks in the laboratory." }
    ],

    "expressionsAndPrepositions": [
        { "phrase": "in addition", "type": "Expression", "meaning": "بالإضافة إلى ذلك", "example": "In addition, she helped clean the playground." },
        { "phrase": "ideas for", "type": "Expression", "meaning": "أفكار أو مقترحات لـ", "example": "They shared creative ideas for saving water." },
        { "phrase": "instead of", "type": "Prepositional Phrase", "meaning": "بدلاً من", "example": "Use washable cloths instead of paper towels." },
        { "phrase": "keeps ... from running out", "type": "Expression", "meaning": "يمنع الشيء من النفاد والانتهاء", "example": "Sensible use keeps energy reserves from running out." },
        { "phrase": "be left running", "type": "Expression", "meaning": "يُترك قيد التشغيل (دون إغلاق)", "example": "Taps should never be left running unattended." },
        { "phrase": "apologize for", "type": "Verb + Preposition", "meaning": "يعتذر عن خطأ أو تصرف", "example": "He apologized for missing yesterday's meeting." },
        { "phrase": "apologize to", "type": "Verb + Preposition", "meaning": "يعتذر لشخص ما", "example": "You should apologize to the teacher for being late." },
        { "phrase": "check ... for", "type": "Verb + Preposition", "meaning": "يفحص أو يتفقد بحثاً عن خلل", "example": "Inspect the pipes to check them for leaks." },
        { "phrase": "turn off / on", "type": "Phrasal Verb", "meaning": "يطفئ / يشغل", "example": "Please turn off the faucet completely." },
        { "phrase": "write down", "type": "Phrasal Verb", "meaning": "يدون ويسجل كتابياً", "example": "Write down your key observations during the experiment." }
    ],

    "derivativeRoots": [
        {
            "root": "assemble (v)",
            "meaning": "يتجمع - يجمع أجزاء أو أشخاص",
            "derivatives": [
                { "word": "assembly", "pos": "n", "meaning": "طابور - جمعية - تجمّع" },
                { "word": "assembler", "pos": "n", "meaning": "مُجمِّع" }
            ]
        },
        {
            "root": "drip (v-n)",
            "meaning": "يقطر / قطرة ماء",
            "derivatives": [
                { "word": "dripping", "pos": "adj / n", "meaning": "تقطير مستمر / قاطر" },
                { "word": "dripper", "pos": "n", "meaning": "منقط / قطارة" }
            ]
        },
        {
            "root": "impact (n-v)",
            "meaning": "أثر - يؤثر في",
            "derivatives": [
                { "word": "impactful", "pos": "adj", "meaning": "مؤثر - ذو وقع كبير" },
                { "word": "impacting", "pos": "participle", "meaning": "مؤثر حالياً" }
            ]
        },
        {
            "root": "leak (v-n)",
            "meaning": "يسرب / تسريب",
            "derivatives": [
                { "word": "leakage", "pos": "n", "meaning": "عملية التسريب" },
                { "word": "leaked", "pos": "adj", "meaning": "مُسرَّب (للإعلام أو العامة)" },
                { "word": "leaky", "pos": "adj", "meaning": "به تسريب أو ثقوب (كصنبور متهالك)" }
            ]
        },
        {
            "root": "observe (v)",
            "meaning": "يلاحظ ويرصد بدقة",
            "derivatives": [
                { "word": "observation", "pos": "n", "meaning": "الملاحظة / الرصد" },
                { "word": "observant", "pos": "adj", "meaning": "يقظ - دقيق الملاحظة" },
                { "word": "observer", "pos": "n", "meaning": "المراقب" }
            ]
        },
        {
            "root": "record (v-n)",
            "meaning": "يسجل / سجل موثق",
            "derivatives": [
                { "word": "recorder", "pos": "n", "meaning": "جهاز تسجيل / مسجِّل" },
                { "word": "recording", "pos": "n", "meaning": "تسجيل صوتي أو مرئي" }
            ]
        },
        {
            "root": "survey (v-n)",
            "meaning": "يستطلع / استبيان أو مسح",
            "derivatives": [
                { "word": "surveyor", "pos": "n", "meaning": "مسّاح أراضٍ / قائم بالاستبيان" },
                { "word": "surveying", "pos": "n", "meaning": "المسح الميداني والاستطلاع" }
            ]
        }
    ],

    "clearConfusion": [
        {
            "pair": "leak vs. drip vs. spill",
            "explanation": "leak تعني تسريب مستمر لسائل أو غاز من شق أو ثقب (أو تسريب وثائق سرية)، drip تعني سقوط السائل قطرة إثر قطرة ببطء، بينما spill تعني انسكاب مفاجئ غير مقصود لكمية من السائل على سطح ما.",
            "example": "A slow drip from the lab tap caused a leaky pipe, which eventually spilled water across the tiled floor."
        },
        {
            "pair": "assembly vs. meeting vs. gathering",
            "explanation": "assembly تجمع رسمي عام وكامل (مثل طابور المدرسة الصباحي أو الجمعية العمومية)، meeting اجتماع رسمي لأشخاص محددين لمناقشة عمل أو اتخاذ قرار، بينما gathering تجمع اجتماعي ودي غير رسمي للأصدقاء أو العائلة.",
            "example": "The principal addressed all students at the morning assembly, before teachers attended their weekly staff meeting."
        },
        {
            "pair": "survey vs. poll vs. research",
            "explanation": "survey فحص استطلاعي شامل يضم مجموعة أسئلة لدراسة آراء أو سلوكيات، poll استطلاع رأي سريع يعتمد غالباً على سؤال واحد أو تصويت انتخابي، بينما research بحث علمي وتجريبي معمق لاكتشاف حقائق جديدة.",
            "example": "Before doing scientific research on water quality, we conducted a school-wide survey on water usage."
        },
        {
            "pair": "observant vs. observation vs. observer",
            "explanation": "observant صفة تعني قوي الملاحظة ودقيق الانتباه، observation اسم يعني عملية الملاحظة أو الملحوظة المدونة، بينما observer اسم فاعل يعني المراقب أو الشاهد العيان.",
            "example": "The observant student wrote down every observation carefully, acting as an impartial observer."
        }
    ],

    "formalEmailGuide": {
        "title": "Comprehensive Guide to Formal Email Writing (دليل كتابة الإيميل الرسمي)",
        "definition": "A formal email is a written electronic message sent for official, academic, or professional reasons.",
        "purposes": [
            "Asking for information from an organization or institution",
            "Applying for a job, internship, or school club",
            "Communicating politely with teachers, school principals, or officials",
            "Submitting formal complaints, requests, or apologies"
        ],
        "structure": [
            {
                "part": "1. Subject Line (سطر الموضوع)",
                "rules": "Must be brief, precise, and directly state the email's topic. Never leave it blank.",
                "examples": ["Subject: Inquiry regarding School Water Conservation Project", "Subject: Apology for Missing Class on Monday"]
            },
            {
                "part": "2. Salutation / Greeting (التحية الرسمية)",
                "rules": "Use polite titles and full last names. Avoid informal greetings like 'Hi', 'Hey', or 'What\\'s up'.",
                "examples": ["Dear Mr. Ashraf,", "Dear Mrs. Magda,", "Dear Sir or Madam, (when recipient is unknown)"]
            },
            {
                "part": "3. Opening Sentence (جملة البداية وتوضيح الغرض)",
                "rules": "Politely and clearly explain the exact reason for sending the email.",
                "examples": ["I hope this email finds you well. I am writing to inquire about...", "I am writing to formally apologize for not attending school yesterday."]
            },
            {
                "part": "4. Body Paragraphs (متن الرسالة)",
                "rules": "Use complete sentences, formal tone, and proper grammar. Strictly avoid slang, emojis, or short contractions (use 'I am' instead of 'I\\'m', 'do not' instead of 'don\\'t').",
                "examples": ["During our survey, we observed several leaky taps in the science building. We would like to request maintenance."]
            },
            {
                "part": "5. Closing Sentence / Call to Action (جملة الختام المهذبة)",
                "rules": "State expected action or express appreciation politely.",
                "examples": ["Thank you for your time and assistance.", "I look forward to hearing from you at your earliest convenience."]
            },
            {
                "part": "6. Sign-off & Signature (التحية الختامية والتوقيع)",
                "rules": "Use formal closing words followed by a comma, then your full name.",
                "examples": ["Yours sincerely, (if recipient's name is known)", "Yours faithfully, (if starting with Dear Sir/Madam)", "Best regards,"]
            }
        ]
    },

    "storyBook": {
        "title": "The Water Team: Small Leaks, Huge Impact (فريق حماة المياه في المدرسة)",
        "scenes": [
            {
                "sceneNumber": 1,
                "title": "A Mission in the Classroom",
                "textEn": "In a bright and busy classroom at El-Noor Secondary School, students were brainstorming ways to help their community. Mr. Ashraf, their science teacher, proposed forming specialized student teams, each tasked with a unique mission. Malek, Sherry, and Youssef enthusiastically formed 'The Water Team'. Their goal was simple yet urgent: to survey every water source across the school, including restroom taps, lab sinks, and playground fountains.",
                "textAr": "في فصل مشرق يعج بالنشاط بمدرسة النور الثانوية، كان الطلاب يفكرون في طرق لمساعدة مجتمعهم وحماية البيئة. اقترح أستاذ أشرف، معلم العلوم، تشكيل فِرق طلابية متخصصة تُسند لكل منها مهمة فريدة. شكل مالك وشيري ويوسف بحماس 'فريق المياه'. وكانت مهمتهم محددة وعاجلة: فحص واستطلاع كل مصادر المياه بالمدرسة، بما في ذلك صنابير دورات المياه، وأحواض المعامل، ونوافير مياه الشرب بالفناء.",
                "imagePrompt": "A lively Egyptian classroom with teacher pointing at a blackboard about saving water, enthusiastic high school students holding clipboards, modern bright daylight."
            },
            {
                "sceneNumber": 2,
                "title": "Recording Daily Observations",
                "textEn": "Equipped with notebooks and measurement beakers, The Water Team began their inspection. They observed how students used water throughout the morning recess. They discovered three faucets that dripped non-stop and one rusty pipe with a continuous leak. Calculating the drip rate, they were astonished to find that those small drops wasted nearly seventy liters of clean water every single day! Malek carefully recorded every observation in their project log.",
                "textAr": "مسلحين بدفاتر الملاحظات والمخابير المدرجة، بدأ فريق المياه جولتهم التفتيشية. راقبوا ورصدوا كيفية استهلاك الطلاب للمياه أثناء الفسحة المدرسية. واكتشفوا ثلاثة صنابير تقطر بلا انقطاع وأنبوباً به تسريب مستمر. وعند حساب معدل التقطير، ذهلوا حين وجدوا أن تلك القطرات الصغيرة تهدر ما يقرب من سبعين لتراً من الماء النقي يومياً! وقام مالك بتوثيق وتسجيل كل ملاحظة بدقة في سجل المشروع.",
                "imagePrompt": "High school teenagers in uniform inspecting a leaking water tap in a school courtyard, holding measuring cylinder and notebook, sunny day, clear focus."
            },
            {
                "sceneNumber": 3,
                "title": "Presenting Findings at the Assembly",
                "textEn": "After two weeks of diligent research, The Water Team stood before the entire school during the morning assembly. They presented colorful charts illustrating water loss and shared actionable tips for saving water. The school administration immediately sent maintenance technicians to fix all leaky faucets. Inspired by their presentation, students pledged to turn off taps completely and carry reusable bottles, proving that small initiatives create massive community impact.",
                "textAr": "بعد أسبوعين من البحث الدؤوب، وقف فريق المياه أمام المدرسة بأسرها في طابور الصباح. وقدموا رسوماً بيانية ملونة توضح كميات المياه المهدرة، وشاركوا نصائح عملية لترشيد الاستهلاك. وعلى الفور، أرسلت إدارة المدرسة فنيي الصيانة لإصلاح جميع الصنابير والتسريبات. مستلهمين عرض الفريق، تعهد الطلاب بإغلاق الصنابير تماماً وحمل زجاجات قابلة لإعادة الاستخدام، مؤكدين أن المبادرات الصغيرة تصنع أثراً مجتمعياً هائلاً.",
                "imagePrompt": "Egyptian high school students standing on a stage at school morning assembly presenting posters and colorful charts about water conservation to peers and teachers."
            }
        ]
    },

    "speakingDialogue": {
        "title": "Preparing the Water Conservation Presentation (التحضير لعرض ترشيد المياه)",
        "participants": [
            { "name": "Malek", "role": "Water Team Leader" },
            { "name": "Sherry", "role": "Research Coordinator" }
        ],
        "conversation": [
            {
                "speaker": "Malek",
                "text": "Hello Sherry! Did you finish compiling all the data we gathered during our water survey yesterday?",
                "arabic": "أهلاً يا شيري! هل انتهيتِ من تجميع كل البيانات التي رصدناها أثناء استطلاع فحص المياه بالأمس؟"
            },
            {
                "speaker": "Sherry",
                "text": "Yes Malek. I recorded every single observation in our spreadsheet, including the two leaky taps in the science lab.",
                "arabic": "نعم يا مالك. قمت بتسجيل وتوثيق كل ملاحظة في جدول البيانات، بما في ذلك الصنبوران اللذان بهما تسريب بمعمل العلوم."
            },
            {
                "speaker": "Malek",
                "text": "Outstanding work! When you calculate how fast those taps drip, how much water is actually being wasted?",
                "arabic": "عمل ممتاز! عندما قمتِ بحساب سرعة تقطير تلك الصنابير، ما كمية المياه التي تُهدر فعلياً؟"
            },
            {
                "speaker": "Sherry",
                "text": "Our chart shows that even a small drip wastes over fifty liters a day, which causes serious problems if left unfixed.",
                "arabic": "يُظهر رسمنا البياني أن مجرد قطرة صغيرة تهدر أكثر من خمسين لتراً يومياً، مما يسبب مشكلات خطيرة إن تُركت دون إصلاح."
            },
            {
                "speaker": "Malek",
                "text": "That is astonishing. We must present these findings clearly to everyone at tomorrow's morning assembly.",
                "arabic": "هذا مذهل ومقلق. يجب أن نعرض هذه النتائج بوضوح أمام الجميع في طابور الصباح غداً."
            },
            {
                "speaker": "Sherry",
                "text": "I prepared visual charts and a formal email to send to the principal requesting urgent plumbing repairs.",
                "arabic": "لقد جهزت مخططات ورسوماً بيانية توضيحية، كما كتبت مسودة إيميل رسمي لإرساله للمدير لطلب صيانة سباكة عاجلة."
            },
            {
                "speaker": "Malek",
                "text": "Remember that our formal email must have a polite greeting, no slang, and a clear call to action.",
                "arabic": "تذكري أن إيميلنا الرسمي يجب أن يحتوي على تحية مهذبة، ولغة خالية من العامية، ودعوة واضحة لاتخاذ إجراء."
            },
            {
                "speaker": "Sherry",
                "text": "Absolutely! It ends with 'Yours sincerely' and clearly states how saving water keeps school resources from running out.",
                "arabic": "بالتأكيد! وينتهي بعبارة 'المخلص لكم' ويوضح بجلاء كيف يحفظ ترشيد المياه موارد المدرسة من النفاد."
            }
        ]
    },

    "quiz": [
        {
            "id": 1,
            "question": "All the students gathered in the school .......... to listen to Mr. Ashraf, the new principal.",
            "options": ["record", "drip", "leak", "assembly"],
            "answer": "assembly",
            "explanation": "school assembly تعني طابور أو اجتماع المدرسة الصباحي العام للطلاب والمعلمين."
        },
        {
            "id": 2,
            "question": "Planting trees along the roads has a good .......... on the local environment.",
            "options": ["fact", "impact", "pact", "pack"],
            "answer": "impact",
            "explanation": "المتلازمة اللفظية has a good impact on تعني يترك أثراً وتأثيراً إيجابياً كبيراً على البيئة."
        },
        {
            "id": 3,
            "question": "The company conducted a customer .......... to gather honest feedback on their new service.",
            "options": ["survey", "hesitation", "attitude", "check-in"],
            "answer": "survey",
            "explanation": "conduct a survey تعني يجري بحثاً استطلاعياً أو استبياناً للتعرف على آراء المستهلكين."
        },
        {
            "id": 4,
            "question": "Tiny water .......... falling from a damaged tap can waste many liters of water each day.",
            "options": ["drips", "observations", "impacts", "missions"],
            "answer": "drips",
            "explanation": "water drips تعني قطرات المياه المتساقطة من الصنبور."
        },
        {
            "id": 5,
            "question": "The science teacher asked the class to write down their .......... in their laboratory notebooks.",
            "options": ["impacts", "drips", "taps", "observations"],
            "answer": "observations",
            "explanation": "observations تعني الملاحظات والنتائج المدونة أثناء إجراء التجارب والمراقبة."
        },
        {
            "id": 6,
            "question": "The dishonest officer .......... secret government documents to hostile enemies.",
            "options": ["leaked", "practised", "traveled", "gapped"],
            "answer": "leaked",
            "explanation": "الفعل leak في سياق المعلومات يعني يسرّب وثائق أو أسراراً للعامة أو للصحافة."
        },
        {
            "id": 7,
            "question": "It is important to keep a written .......... of all your monthly household expenses.",
            "options": ["drip", "record", "sink", "fountain"],
            "answer": "record",
            "explanation": "المصطلح keep a record of يعني يحتفظ بسجل أو توثيق كتابي للمصروفات أو الأحداث."
        },
        {
            "id": 8,
            "question": "The student environmental committee was assigned a unique .......... to clean public gardens.",
            "options": ["mission", "leak", "tap", "sink"],
            "answer": "mission",
            "explanation": "mission تعني مهمة خاصة أو تكليفاً رسمياً لتحقيق غاية محددة."
        },
        {
            "id": 9,
            "question": "A small hole that lets liquids or gas escape accidentally is called a .......... .",
            "options": ["mission", "leak", "impact", "drip"],
            "answer": "leak",
            "explanation": "تعريف leak هو الشق أو الثقب الذي يتسرب منه السائل أو الغاز."
        },
        {
            "id": 10,
            "question": "The act of noticing or watching something carefully and systematically is called .......... .",
            "options": ["assembly", "observation", "mission", "impact"],
            "answer": "observation",
            "explanation": "تعريف observation هو عملية الملاحظة والرصد الدقيق والمنظم."
        },
        {
            "id": 11,
            "question": "The word 'record' when used as a verb is closest in meaning to .......... .",
            "options": ["document", "erase", "delete", "forget"],
            "answer": "document",
            "explanation": "مرادف الفعل record (يسجل / يوثق) هو document أو log."
        },
        {
            "id": 12,
            "question": "The noun 'assembly' has a similar meaning to .......... .",
            "options": ["separation", "gathering", "division", "neglect"],
            "answer": "gathering",
            "explanation": "مرادف assembly (تجمع أو اجتماع رسمي) هو gathering أو meeting."
        },
        {
            "id": 13,
            "question": "The opposite of the noun 'observation' is .......... .",
            "options": ["monitoring", "perception", "inattention", "viewing"],
            "answer": "inattention",
            "explanation": "مضاد observation (انتباه ورصد دقيق) هو inattention أو disregard (عدم انتباه وتجاهل)."
        },
        {
            "id": 14,
            "question": "The verb 'drip' is closest in meaning to .......... .",
            "options": ["trickle", "stop", "dry", "freeze"],
            "answer": "trickle",
            "explanation": "مرادف الفعل drip (يقطر) هو trickle (يسيل أو ينساب قطرة قطرة)."
        },
        {
            "id": 15,
            "question": "Please turn off the water .......... completely after washing your hands.",
            "options": ["device", "tap", "chart", "mission"],
            "answer": "tap",
            "explanation": "tap تعني صنبور المياه (الحنفية) التي يجب إغلاقها تماماً لمنع الهدر."
        },
        {
            "id": 16,
            "question": "Never leave oily dishes dirty inside the kitchen .......... overnight.",
            "options": ["device", "sink", "tap", "finding"],
            "answer": "sink",
            "explanation": "kitchen sink هو حوض غسيل الأطباق في المطبخ."
        },
        {
            "id": 17,
            "question": "Children enjoy watching the dancing water .......... in the central city square.",
            "options": ["fountain", "chart", "tone", "leak"],
            "answer": "fountain",
            "explanation": "water fountain تعني نافورة المياه أو مبرد مياه الشرب."
        },
        {
            "id": 18,
            "question": "The research team will .......... their findings during the school morning assembly.",
            "options": ["cycle", "unplug", "include", "present"],
            "answer": "present",
            "explanation": "المتلازمة اللفظية present findings تعني يعرض ويقدم النتائج التي تم التوصل إليها."
        },
        {
            "id": 19,
            "question": "The teacher displayed a colorful .......... to explain the survey results clearly.",
            "options": ["chart", "fountain", "drip", "tap"],
            "answer": "chart",
            "explanation": "chart تعني رسماً بيانياً أو مخططاً توضيحياً لتفسير البيانات والأرقام."
        },
        {
            "id": 20,
            "question": "To save energy, remember to .......... chargers from the wall socket when finished.",
            "options": ["unplug", "drip", "leak", "cycle"],
            "answer": "unplug",
            "explanation": "unplug devices تعني سحب القابس وفصل الشاحن من مقبس الحائط لتوفير الطاقة."
        },
        {
            "id": 21,
            "question": "The adjective derived from 'observe' describing someone who notices everything is .......... .",
            "options": ["observant", "observation", "observed", "observance"],
            "answer": "observant",
            "explanation": "الصفة observant تعني يقظاً ودقيق الملاحظة وسريع البديهة في رصد التفاصيل."
        },
        {
            "id": 22,
            "question": "Which of the following is the most appropriate greeting for a formal email?",
            "options": ["Hey there!", "Hi John,", "Dear Mr. Smith,", "What's up buddy!"],
            "answer": "Dear Mr. Smith,",
            "explanation": "التحية الرسمية الصحيحة تبدأ بـ Dear متبوعة باللقب واسم العائلة مثل Dear Mr. Smith."
        },
        {
            "id": 23,
            "question": "Which of the following should be strictly AVOIDED in a formal email?",
            "options": ["Clear subject line", "Polite closing", "Emojis and slang", "Full complete sentences"],
            "answer": "Emojis and slang",
            "explanation": "في الإيميل الرسمي يجب تجنب الرموز التعبيرية (emojis) والألفاظ العامية (slang) والاختصارات تماماً."
        },
        {
            "id": 24,
            "question": "Which closing phrase is appropriate when you know the name of the recipient in a formal email?",
            "options": ["Yours sincerely,", "Cheers!", "See you later,", "Talk soon,"],
            "answer": "Yours sincerely,",
            "explanation": "نستخدم Yours sincerely, كتحية ختامية رسمية عندما نعرف اسم الشخص المرسل إليه."
        },
        {
            "id": 25,
            "question": "Which of the following sentences represents formal academic language?",
            "options": [
                "I wanna know about your offer ASAP.",
                "I am interested in your offer and would like to request more details.",
                "Gimme the info right now!",
                "What's up with the project?"
            ],
            "answer": "I am interested in your offer and would like to request more details.",
            "explanation": "الجملة الرسمية تستخدم كلمات كاملة ومهذبة وخالية من العامية مثل (I am interested in...)."
        },
        {
            "id": 26,
            "question": "Why is a formal email written according to the curriculum?",
            "options": [
                "To share funny memes with classmates",
                "To communicate professionally for official, academic, or work reasons",
                "To gossip about weekend parties with friends",
                "To make casual jokes with peers"
            ],
            "answer": "To communicate professionally for official, academic, or work reasons",
            "explanation": "الهدف من الإيميل الرسمي هو التواصل المهني والأكاديمي والرسمي بكل وضوح واحترام."
        },
        {
            "id": 27,
            "question": "Which phrase is NOT a suitable opening sentence for a formal email?",
            "options": [
                "I am writing to inquire about the project.",
                "I hope this email finds you well.",
                "What's up dude?",
                "I am writing to formally submit my application."
            ],
            "answer": "What's up dude?",
            "explanation": "'What's up dude?' هي عامية وغير لائقة على الإطلاق في المراسلات الرسمية."
        },
        {
            "id": 28,
            "question": "The plumber replaced the old .......... pipe because it was damaging the kitchen cabinets.",
            "options": ["leaky", "leaked", "leakage", "leak"],
            "answer": "leaky",
            "explanation": "الصفة leaky تعني به تسريب أو ثقوب (leaky pipe = ماسورة بها تسريب مياه)."
        },
        {
            "id": 29,
            "question": "Fares offered an apology .......... the school principal for being late.",
            "options": ["to", "for", "with", "from"],
            "answer": "to",
            "explanation": "نستخدم apologize to أو an apology to عندما يتبعها الشخص المعتذر له."
        },
        {
            "id": 30,
            "question": "In the reading passage on SB page 65, what was 'The Water Team's' primary mission?",
            "options": [
                "To sell plastic bottled water in the cafeteria",
                "To survey school water sources and check for leaks and dripping taps",
                "To build a swimming pool in the school yard",
                "To clean the computer monitors in the IT lab"
            ],
            "answer": "To survey school water sources and check for leaks and dripping taps",
            "explanation": "وفقاً لنص القراءة بكتاب الطالب (ص 65)، كانت مهمة فريق المياه فحص مصادر المياه ورصد التسريبات والصنابير القاطرة."
        }
    ]
}

# 1. Write the data file
output_data_path = os.path.join("Sec_1", "unit-4", "lesson-4-5.data.js")
js_code = f"window.lessonData = {json.dumps(lesson_data, ensure_ascii=False, indent=2)};\n"
with open(output_data_path, "w", encoding="utf-8") as f:
    f.write(js_code)
print(f"Generated data file: {output_data_path} ({len(js_code)} bytes)")

# 2. Write the presentation shell HTML
html_content = """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 1 - Unit 4 - Lessons 4 & 5: Helping our Community & Formal Email Writing | Mr. Ahmed Assem</title>
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
            <a href="../index.html">Sec 1</a> / <a href="./index.html">Unit 4</a> / <span>Lessons 4 & 5</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Sec 1 • Unit 4</span>
                <span class="badge badge-gold">🤝 Community & Formal Email Writing</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lessons 4 & 5: Helping our Community & Formal Email Writing</h2>
            <p id="description" class="lesson-desc-display">المفردات الأساسية والتراكمية، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، دليل كتابة الإيميل الرسمي، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)</p>
        </div>

        <!-- Tabs Navigation Bar (Zero Grammar) -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('collocations', this)">🔗 المتلازمات والتعبيرات</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('language-notes', this)">🧬 المشتقات والفروق (Notes)</button>
            <button class="tab-btn" onclick="switchTab('writing-skill', this)">✍️ مهارة كتابة الإيميل الرسمي (Writing)</button>
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

        <!-- Tab: Writing Skill (Formal Email Writing Guide) -->
        <div id="writing-skill" class="tab-content">
            <div class="lexicon-section">
                <h2 class="section-title">✍️ دليل وقواعد كتابة البريد الإلكتروني الرسمي (Formal Email Writing)</h2>
                
                <div class="writing-plan-container" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
                        <div style="background: rgba(14, 165, 233, 0.08); border: 1px solid rgba(14, 165, 233, 0.2); border-radius: 12px; padding: 18px;">
                            <h3 style="color: #38bdf8; font-size: 1.15rem; margin-bottom: 12px;">1️⃣ Subject & Greeting (الموضوع والتحية)</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8; font-size: 0.95rem;">
                                <li>📌 <strong>Clear Subject:</strong> سطر موضوع محدد وواضح لا يُترك فارغاً أبداً.</li>
                                <li>👋 <strong>Formal Salutation:</strong> تحية رسمية مهذبة مثل:
                                    <br><code style="color: #38bdf8;">Dear Mr. [Last Name],</code> أو <code style="color: #38bdf8;">Dear Sir or Madam,</code>
                                </li>
                                <li>⚠️ <strong>تجنب العامية:</strong> لا تستخدم مطلقاً: "Hi", "Hey", "What's up".</li>
                            </ul>
                        </div>
                        <div style="background: rgba(168, 85, 247, 0.08); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; padding: 18px;">
                            <h3 style="color: #c084fc; font-size: 1.15rem; margin-bottom: 12px;">2️⃣ Opening & Body (الافتتاحية والمتن)</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8; font-size: 0.95rem;">
                                <li>🎯 <strong>Opening Purpose:</strong> توضيح سبب الرسالة باحترام:
                                    <br><code style="color: #c084fc;">I am writing to inquire about / apologize for...</code>
                                </li>
                                <li>📝 <strong>Full Sentences:</strong> جمل كاملة ولغة راقية واضحة.</li>
                                <li>🚫 <strong>ممنوع الاختصارات:</strong> اكتب <code style="color: #c084fc;">I am, do not</code> بدلاً من <code style="color: #ef4444;">I'm, don't</code> وتجنب الإيموجي تماماً.</li>
                            </ul>
                        </div>
                        <div style="background: rgba(34, 197, 94, 0.08); border: 1px solid rgba(34, 197, 94, 0.2); border-radius: 12px; padding: 18px;">
                            <h3 style="color: #4ade80; font-size: 1.15rem; margin-bottom: 12px;">3️⃣ Closing & Sign-off (الختام والتوقيع)</h3>
                            <ul style="list-style: none; padding: 0; margin: 0; line-height: 1.8; font-size: 0.95rem;">
                                <li>🤝 <strong>Call to Action:</strong> جملة ختام مهذبة:
                                    <br><code style="color: #4ade80;">Thank you for your time and assistance.</code>
                                </li>
                                <li>✍️ <strong>Sign-off:</strong> عبارة ختامية رسمية:
                                    <br><code style="color: #4ade80;">Yours sincerely,</code> (عند معرفة الاسم) أو <code style="color: #4ade80;">Yours faithfully,</code>
                                </li>
                                <li>👤 <strong>Signature:</strong> اسمك الكامل وبيانات التواصل.</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Model Formal Email Card -->
                    <div style="margin-top: 24px; padding: 22px; background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); border-radius: 12px;">
                        <h3 style="color: #fbbf24; font-size: 1.2rem; margin-bottom: 14px;">📧 نموذج إيميل رسمي من كتاب المعاصر (Model Formal Email)</h3>
                        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.9; color: #cbd5e1; font-size: 0.98rem; text-align: left; direction: ltr; background: rgba(0,0,0,0.3); padding: 18px; border-radius: 8px;">
                            <p style="margin-bottom: 8px;"><strong style="color: #38bdf8;">Subject:</strong> Apology for Not Attending School</p>
                            <p style="margin-bottom: 12px;"><strong style="color: #38bdf8;">Dear Mr. Mohammed,</strong></p>
                            <p style="margin-bottom: 10px;">I hope this email finds you well. I am writing to sincerely apologize for not attending school yesterday, Monday, August 19th. Unfortunately, I was unable to come because I was feeling unwell and had a high fever. My parents took me to see a doctor, and he advised me to rest at home and not return to school until I fully recover and no longer have a fever.</p>
                            <p style="margin-bottom: 10px;">I understand the importance of attending every class, and I am very sorry for missing your lessons. I will do my best to catch up on all the work I missed, and I have already contacted some of my classmates to ask about the assignments and notes.</p>
                            <p style="margin-bottom: 14px;">Please let me know if there is any additional work I should complete or if there are any specific instructions I need to follow. Thank you for your understanding and support.</p>
                            <p style="margin-bottom: 4px;"><strong style="color: #4ade80;">Yours sincerely,</strong></p>
                            <p><strong style="color: #fff;">Alaa</strong></p>
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
                        <div class="art-glow"></div>
                        <div class="storybook-visual" id="storybookVisual">💧</div>
                        <div class="scene-badge" id="sceneBadge">Scene 1 of 3</div>
                    </div>
                    <div class="story-page-narrative">
                        <h3 class="scene-title" id="sceneTitle">Scene Title</h3>
                        <p class="scene-text-en" id="sceneTextEn">English narrative will appear here...</p>
                        <p class="scene-text-ar" id="sceneTextAr">الترجمة العربية للقصة ستظهر هنا...</p>
                        
                        <div class="storybook-controls">
                            <button class="story-nav-btn" id="prevSceneBtn" onclick="StoryBook.prevScene()">
                                <span>&rarr;</span> المشهد السابق
                            </button>
                            <button class="story-speak-btn" id="speakSceneBtn" onclick="StoryBook.toggleSpeech()">
                                <span id="speakIcon">🔊</span> استمع للمشهد
                            </button>
                            <button class="story-nav-btn primary" id="nextSceneBtn" onclick="StoryBook.nextScene()">
                                المشهد التالي <span>&larr;</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Tab: Interactive Speaking Dialogue -->
        <div id="dialogue" class="tab-content">
            <div class="dialogue-container">
                <div class="dialogue-header">
                    <h3 id="dialogueTitle">Speaking Dialogue</h3>
                    <div class="dialogue-participants" id="dialogueParticipants"></div>
                </div>
                <div class="dialogue-chat" id="dialogueChat"></div>
                <div class="dialogue-actions">
                    <button class="action-btn-dialogue" onclick="SpeakingDialogue.playAll()">▶️ تشغيل المحادثة بالكامل</button>
                    <button class="action-btn-dialogue stop" onclick="SpeakingDialogue.stop()">⏹️ إيقاف الصوت</button>
                </div>
            </div>
        </div>

        <!-- Tab: Comprehensive 30-MCQ Quiz -->
        <div id="quiz" class="tab-content">
            <div class="quiz-wrapper">
                <div class="quiz-header-card">
                    <div class="quiz-badge">🎯 Authentic Moasser Assessment</div>
                    <h2>اختبار الدرس الشامل • 30 سؤال اختيار من متعدد</h2>
                    <p>اختبر استيعابك للمفردات، المتلازمات، قواعد الإيميل الرسمي، المشتقات، وحروف الجر بدقة متناهية (Zero Grammar)</p>
                </div>
                <div id="quizContainer" class="quiz-questions-list"></div>
                <div class="quiz-footer-actions">
                    <button class="submit-quiz-btn" onclick="QuizEngine.submit()">تصحيح الاختبار وعرض النتيجة 📊</button>
                </div>
                <div id="quizResult" class="quiz-result-modal hidden"></div>
            </div>
        </div>

        <!-- Floating Quick Navigation Links -->
        <div class="lesson-nav-footer">
            <a href="lesson-3.html" class="nav-lesson-link prev">&rarr; الدرس الثالث: Small Actions Can Make a Difference</a>
            <a href="index.html" class="nav-lesson-link hub">🏠 فهرس الوحدة الرابعة</a>
            <a href="../index.html" class="nav-lesson-link next">فهرس منهج الصف الأول الثانوي &larr;</a>
        </div>
    </div>

    <!-- Scripts: Core Renderer, StoryBook, Dialogue, Quiz -->
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/storybook.js"></script>
    <script src="../../assets/js/speaking-dialogue.js"></script>
    <script src="../../assets/js/quiz-engine.js"></script>
    
    <!-- Lesson Payload -->
    <script src="lesson-4-5.data.js"></script>
    
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (window.lessonData) {
                CurriculumRenderer.init(window.lessonData);
                if (window.lessonData.storyBook) StoryBook.init(window.lessonData.storyBook);
                if (window.lessonData.speakingDialogue) SpeakingDialogue.init(window.lessonData.speakingDialogue);
                if (window.lessonData.quiz) QuizEngine.init(window.lessonData.quiz);
            }
        });

        function switchTab(tabId, btn) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            const target = document.getElementById(tabId);
            if (target) target.classList.add('active');
            if (btn) btn.classList.add('active');
            if (window.speechSynthesis) window.speechSynthesis.cancel();
        }
    </script>
</body>
</html>
"""

output_html_path = os.path.join("Sec_1", "unit-4", "lesson-4-5.html")
with open(output_html_path, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"Generated HTML shell: {output_html_path} ({len(html_content)} bytes)")
