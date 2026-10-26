import json
import os

lesson_data = {
    "id": "sec1-u4-l3",
    "stage": "sec1",
    "unit": 4,
    "lesson": "3",
    "title": "Lesson 3: Small Actions Can Make a Difference (خطوات صغيرة تصنع فارقاً كبيراً)",
    "description": "المفردات الأساسية والتراكمية، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)",

    "keyVocabulary": [
        { "word": "serious harm", "partOfSpeech": "n phr", "arabic": "ضرر خطير / بالغ", "example": "Dumping factory waste in the river causes serious harm to wildlife." },
        { "word": "turning off lights", "partOfSpeech": "v phr", "arabic": "إطفاء الأنوار", "example": "Turning off lights when leaving an empty room saves electricity." },
        { "word": "unplugging devices", "partOfSpeech": "v phr", "arabic": "فصل الأجهزة عن الكهرباء (نزع القابس)", "example": "Unplugging devices when not in use stops phantom power consumption." },
        { "word": "running out", "partOfSpeech": "phr v", "arabic": "النفاد / الاستنفاد (الانتهاء)", "example": "Fossil fuels are non-renewable and risk running out in the future." },
        { "word": "public spaces", "partOfSpeech": "n phr", "arabic": "أماكن عامة / مساحات عامة", "example": "Cleaning public spaces makes our city parks more welcoming and safe." },
        { "word": "cycle", "partOfSpeech": "v", "arabic": "يركب دراجة هوائية", "example": "Many commuters cycle to work to stay healthy and reduce pollution." },
        { "word": "sustainable future", "partOfSpeech": "n phr", "arabic": "مستقبل مستدام وصديق للبيئة", "example": "Investing in solar power is vital for creating a sustainable future." },
        { "word": "environmental responsibility", "partOfSpeech": "n phr", "arabic": "مسؤولية بيئية", "example": "Every citizen shares an environmental responsibility to keep streets clean." },
        { "word": "reusable bag", "partOfSpeech": "n phr", "arabic": "حقيبة قابلة لإعادة الاستخدام", "example": "Carrying a reusable bag to the grocery store cuts single-use plastic." },
        { "word": "reducing waste", "partOfSpeech": "v phr", "arabic": "تقليل النفايات والمخلفات", "example": "Reducing waste starts by buying only the food items we truly need." },
        { "word": "saving energy", "partOfSpeech": "v phr", "arabic": "ترشيد وتوفير الطاقة", "example": "Saving energy at home lowers both electric bills and carbon emissions." },
        { "word": "planting trees", "partOfSpeech": "v phr", "arabic": "زراعة وغرس الأشجار", "example": "Planting trees provides shade and absorbs carbon dioxide from the air." },
        { "word": "fresh air", "partOfSpeech": "n phr", "arabic": "هواء نقي ومنعش", "example": "Morning walks in the park allow us to breathe fresh air." },
        { "word": "protect nature", "partOfSpeech": "v phr", "arabic": "حماية الطبيعة والبيئة", "example": "We must protect nature so that future generations enjoy green lands." },
        { "word": "healthier planet", "partOfSpeech": "n phr", "arabic": "كوكب أكثر صحة وعافية", "example": "Small green habits practiced by millions build a healthier planet." },
        { "word": "play a part in", "partOfSpeech": "idiom", "arabic": "يشارك في / يلعب دوراً في", "example": "Every student can play a part in school recycling campaigns." },
        { "word": "make a big difference", "partOfSpeech": "idiom", "arabic": "يحدث فارقاً وأثراً كبيراً", "example": "Turning off a dripping tap can make a big difference over time." },
        { "word": "eco-friendly habits", "partOfSpeech": "n phr", "arabic": "عادات صديقة للبيئة", "example": "Adopting eco-friendly habits protects natural habitats worldwide." }
    ],

    "accumulativeVocabulary": [
        { "word": "avoid driving", "partOfSpeech": "v phr", "arabic": "تجنب قيادة السيارات", "example": "We should avoid driving short distances and walk instead." },
        { "word": "keep from", "partOfSpeech": "v phr", "arabic": "يمنع من / يحفظ من", "example": "Saving water keeps our water reserves from running out." },
        { "word": "water bottle", "partOfSpeech": "n phr", "arabic": "زجاجة ماء شخصية", "example": "Bringing your own water bottle eliminates single-use cups." },
        { "word": "in addition", "partOfSpeech": "linking phr", "arabic": "بالإضافة إلى ذلك", "example": "In addition to recycling, we must reduce unnecessary consumption." },
        { "word": "clean streets and parks", "partOfSpeech": "n phr", "arabic": "شوارع ومتنزهات نظيفة", "example": "Volunteers work on weekends to keep streets and parks tidy." },
        { "word": "green community", "partOfSpeech": "n phr", "arabic": "مجتمع أخضر وصديق للبيئة", "example": "Our youth center started a green community tree initiative." },
        { "word": "electrical power", "partOfSpeech": "n phr", "arabic": "طاقة كهربائية", "example": "Switching off displays saves electrical power across offices." },
        { "word": "greener future", "partOfSpeech": "n phr", "arabic": "مستقبل أكثر خضرة ونقاء", "example": "Teaching environmental science inspires youth to build a greener future." },
        { "word": "resource conservation", "partOfSpeech": "n phr", "arabic": "الحفاظ على الموارد الطبيعية", "example": "Resource conservation is key to sustainable economic development." },
        { "word": "daily routine", "partOfSpeech": "n phr", "arabic": "روتين يومي", "example": "Unplugging your laptop charger should become a daily routine." },
        { "word": "take action", "partOfSpeech": "v phr", "arabic": "يتخذ إجراءً ملموساً", "example": "It is not enough to discuss climate issues; we must take action." },
        { "word": "care for the planet", "partOfSpeech": "v phr", "arabic": "يعتني بالكوكب", "example": "Teaching children to care for the planet ensures long-term preservation." },
        { "word": "carbon footprint", "partOfSpeech": "n phr", "arabic": "البصمة الكربونية", "example": "Cycling to school significantly cuts your personal carbon footprint." },
        { "word": "waste separation", "partOfSpeech": "n phr", "arabic": "فرز وتصنيف النفايات", "example": "Waste separation makes glass and paper recycling far more effective." },
        { "word": "natural habitats", "partOfSpeech": "n phr", "arabic": "المواطن والبيئات الطبيعية", "example": "Pollution in lakes endangers the natural habitats of migratory birds." },
        { "word": "renewable resources", "partOfSpeech": "n phr", "arabic": "موارد متجددة", "example": "Wind and sunlight are unlimited renewable resources." },
        { "word": "household habits", "partOfSpeech": "n phr", "arabic": "عادات منزلية", "example": "Simple household habits like short showers save thousands of liters." },
        { "word": "collective effort", "partOfSpeech": "n phr", "arabic": "جهد جماعي مشترك", "example": "Beautifying public gardens requires a sustained collective effort." },
        { "word": "phantom power", "partOfSpeech": "n phr", "arabic": "طاقة خفية مستهلكة في وضع الاستعداد", "example": "Unplugging chargers prevents phantom power drain while sleeping." },
        { "word": "lasting positive impact", "partOfSpeech": "n phr", "arabic": "أثر إيجابي دائم", "example": "Our neighborhood clean-up had a lasting positive impact on all residents." }
    ],

    "definitions": [
        {
            "word": "serious harm",
            "defEn": "Severe physical or environmental damage that causes deep negative consequences.",
            "defAr": "ضرر أو تلف جسيم في البيئة أو الصحة يؤدي إلى نتائج سلبية بالغة."
        },
        {
            "word": "unplugging devices",
            "defEn": "The act of disconnecting electrical appliances from the power wall socket to prevent energy waste.",
            "defAr": "فصل الأجهزة الكهربائية وسحب القابس من المقبس لمنع هدر الطاقة الكهربائية."
        },
        {
            "word": "reusable bag",
            "defEn": "A sturdy shopping bag designed to be used repeatedly instead of throwaway plastic bags.",
            "defAr": "حقيبة تسوق متينة ومصنوعة ليعاد استخدامها عدة مرات بدلاً من الأكياس البلاستيكية أحادية الاستخدام."
        },
        {
            "word": "sustainable future",
            "defEn": "A way of living and developing that meets current needs without depleting natural resources for the next generations.",
            "defAr": "مستقبل ونمط حياة يلبي الاحتياجات الحالية دون استنزاف أو إهلاك الموارد الطبيعية للأجيال القادمة."
        },
        {
            "word": "public spaces",
            "defEn": "Areas such as public parks, squares, and streets that are open and accessible to all citizens.",
            "defAr": "المناطق العامة مثل الحدائق والميادين والشوارع المتاحة والمفتوحة لجميع أفراد المجتمع."
        },
        {
            "word": "running out",
            "defEn": "Becoming completely used up or exhausted so that none is left to use.",
            "defAr": "النفاد والاستهلاك التام لشيء أو مورد بحيث لا يتبقى منه شيء."
        },
        {
            "word": "recycling",
            "defEn": "The process of converting waste materials into new materials and objects to reduce trash.",
            "defAr": "عملية تحويل المخلفات والمواد المستعملة إلى منتجات ومواد جديدة لتقليل القمامة وحماية البيئة."
        },
        {
            "word": "reducing waste",
            "defEn": "Decreasing the total amount of rubbish and unnecessary materials created in daily life.",
            "defAr": "تقليل كمية القمامة والمواد غير الضرورية المستهلكة في الحياة اليومية."
        }
    ],

    "synonyms": [
        { "word": "harm", "synonyms": ["damage", "injury", "destruction"], "arabic": "ضرر - تلف - إتلاف" },
        { "word": "unplug", "synonyms": ["disconnect", "pull the plug", "unhook"], "arabic": "يفصل القابس - يقطع التوصيل" },
        { "word": "sustainable", "synonyms": ["renewable", "eco-friendly", "viable"], "arabic": "مستدام - متجدد - دائم" },
        { "word": "reduce", "synonyms": ["decrease", "cut down", "diminish", "lessen"], "arabic": "يقلل - يخفض - ينقص" },
        { "word": "reusable", "synonyms": ["recyclable", "multi-use", "non-disposable"], "arabic": "قابل لإعادة الاستخدام - متعدد الاستعمال" },
        { "word": "protect", "synonyms": ["guard", "defend", "shield", "preserve"], "arabic": "يحمي - يحافظ على - يدافع عن" },
        { "word": "encourage", "synonyms": ["inspire", "motivate", "urge", "support"], "arabic": "يشجع - يحفز - يحث" },
        { "word": "clean", "synonyms": ["tidy", "pure", "unpolluted", "spotless"], "arabic": "نظيف - نقي - غير ملوث" }
    ],

    "antonyms": [
        { "word": "harm", "antonyms": ["benefit", "help", "healing", "cure"], "arabic": "نفع - فائدة - شفاء" },
        { "word": "unplug", "antonyms": ["plug in", "connect", "hook up"], "arabic": "يصل بالكهرباء - يضع القابس" },
        { "word": "sustainable", "antonyms": ["depleting", "wasteful", "temporary"], "arabic": "مستنزِف - مبدد - مؤقت" },
        { "word": "reduce", "antonyms": ["increase", "expand", "boost", "multiply"], "arabic": "يزيد - يضاعف - يوسع" },
        { "word": "reusable", "antonyms": ["disposable", "single-use", "throwaway"], "arabic": "أحادي الاستخدام - مخصص للإلقاء" },
        { "word": "protect", "antonyms": ["endanger", "neglect", "harm", "threaten"], "arabic": "يعرض للخطر - يهمل - يهدد" },
        { "word": "encourage", "antonyms": ["discourage", "dissuade", "hinder"], "arabic": "يحبط - يثبط - يعيق" },
        { "word": "clean", "antonyms": ["polluted", "dirty", "contaminated"], "arabic": "ملوث - متسخ - غير نقي" }
    ],

    "collocations": [
        { "phrase": "cause serious harm", "meaning": "يسبب ضرراً بالغاً للبيئة أو الصحة", "example": "Chemical leaks cause serious harm to local wildlife." },
        { "phrase": "turn off lights", "meaning": "يطفئ الأنوار والمصابيح", "example": "Always turn off lights when leaving classrooms." },
        { "phrase": "unplug devices", "meaning": "يفصل الأجهزة من المقابس", "example": "Unplug devices before going to sleep at night." },
        { "phrase": "run out of resources", "meaning": "تنفد الموارد الطبيعية منه", "example": "If we waste clean water, our city will run out of resources." },
        { "phrase": "make a big difference", "meaning": "يصنع فارقاً وأثراً ملموساً", "example": "Small eco-friendly habits make a big difference in the long run." },
        { "phrase": "play a part in", "meaning": "يشارك في / يلعب دوراً في", "example": "We all should play a part in conserving water and trees." },
        { "phrase": "plant trees", "meaning": "يغرس ويزرع الأشجار", "example": "Students plant trees along school walkways each spring." },
        { "phrase": "save energy", "meaning": "يرشد ويوفر استهلاك الطاقة", "example": "Adjusting the thermostat helps families save energy and money." },
        { "phrase": "reduce waste", "meaning": "يقلل من كميات النفايات والقمامة", "example": "Carrying your own mug is an easy way to reduce waste." },
        { "phrase": "carry a reusable bag", "meaning": "يحمل حقيبة قابلة لإعادة الاستعمال", "example": "Shoppers who carry a reusable bag avoid plastic waste." }
    ],

    "expressionsAndPrepositions": [
        { "phrase": "in addition", "type": "Expression", "meaning": "بالإضافة إلى ذلك", "example": "In addition, we planted thirty flowers in the school garden." },
        { "phrase": "keep ... from running out", "type": "Expression", "meaning": "يمنع / يحفظ الموارد من النفاد", "example": "Prudent water usage keeps reserves from running out." },
        { "phrase": "play a part in", "type": "Expression", "meaning": "يشارك في / يلعب دوراً مؤثراً في", "example": "Youth should play a part in community development." },
        { "phrase": "instead of", "type": "Prepositional Phrase", "meaning": "بدلاً من", "example": "Take the stairs instead of using the elevator." },
        { "phrase": "run out of", "type": "Phrasal Verb", "meaning": "ينفد منه شيء / يفرغ مخزونه", "example": "The car stopped because we ran out of fuel." },
        { "phrase": "turn off / on", "type": "Phrasal Verb", "meaning": "يطفئ / يشغل جهازاً أو ضوءاً", "example": "Please turn off the television when nobody is watching." },
        { "phrase": "apologize for", "type": "Verb + Preposition", "meaning": "يعتذر عن خطأ ارتكبه", "example": "He apologized for leaving the water tap running." },
        { "phrase": "apologize to", "type": "Verb + Preposition", "meaning": "يعتذر لشخص ما", "example": "You must apologize to your classmate for being late." }
    ],

    "derivativeRoots": [
        {
            "root": "sustain (v)",
            "meaning": "يديم - يحافظ على البقاء",
            "derivatives": [
                { "word": "sustainable", "pos": "adj", "meaning": "مستدام - بيئي ودائم" },
                { "word": "sustainability", "pos": "n", "meaning": "الاستدامة البيئية" },
                { "word": "sustainably", "pos": "adv", "meaning": "بشكل مستدام" }
            ]
        },
        {
            "root": "pollute (v)",
            "meaning": "يلوث البيئة",
            "derivatives": [
                { "word": "pollution", "pos": "n", "meaning": "التلوث" },
                { "word": "pollutant", "pos": "n", "meaning": "المادة الملوثة" },
                { "word": "polluted", "pos": "adj", "meaning": "ملوث" }
            ]
        },
        {
            "root": "recycle (v)",
            "meaning": "يعيد تدوير المخلفات",
            "derivatives": [
                { "word": "recycling", "pos": "n", "meaning": "إعادة التدوير" },
                { "word": "recyclable", "pos": "adj", "meaning": "قابل لإعادة التدوير" },
                { "word": "recycled", "pos": "adj", "meaning": "مُعاد تدويره" }
            ]
        },
        {
            "root": "protect (v)",
            "meaning": "يحمي ويصون",
            "derivatives": [
                { "word": "protection", "pos": "n", "meaning": "الحماية والوقاية" },
                { "word": "protective", "pos": "adj", "meaning": "واقٍ - حمائي" },
                { "word": "protector", "pos": "n", "meaning": "الحامي أو الواقي" }
            ]
        },
        {
            "root": "harm (v-n)",
            "meaning": "يضر - يؤذي / ضرر",
            "derivatives": [
                { "word": "harmful", "pos": "adj", "meaning": "ضار ومؤذٍ" },
                { "word": "harmless", "pos": "adj", "meaning": "غير ضار - مسالم" },
                { "word": "harmfully", "pos": "adv", "meaning": "بشكل ضار" }
            ]
        },
        {
            "root": "conserve (v)",
            "meaning": "يرشد - يحافظ على الموارد",
            "derivatives": [
                { "word": "conservation", "pos": "n", "meaning": "الحفاظ والترشيد" },
                { "word": "conservationist", "pos": "n", "meaning": "ناشط بيئي / حامي البيئة" },
                { "word": "conservative", "pos": "adj", "meaning": "محافظ / حذر" }
            ]
        }
    ],

    "clearConfusion": [
        {
            "pair": "unplug vs. switch off vs. disconnect",
            "explanation": "unplug تعني سحب القابس الفعلي للجهاز من فيشة الحائط لمنع تسرب الكهرباء، بينما switch off تعني إطفاء زر التشغيل فقط مع بقاء الجهاز موصولاً، وdisconnect تعني قطع الاتصال سلكياً أو لاسلكياً (مثل فصل الإنترنت).",
            "example": "To prevent phantom electricity drain, you should unplug your charger, not just switch off the power."
        },
        {
            "pair": "reusable vs. renewable vs. recycled",
            "explanation": "reusable تعني قابل لإعادة الاستخدام لمرات عديدة (كحقائب القماش)، renewable تعني متجدد طبيعياً لا ينفد (كالرياح والشمس)، بينما recycled تعني مُصنّع من مخلفات تمت إعادة معالجتها صناعياً.",
            "example": "She carries a reusable shopping bag made of recycled cotton while supporting renewable wind power."
        },
        {
            "pair": "harm vs. damage vs. injure",
            "explanation": "harm تشير إلى إحداث ضرر أو أذى عام بالبيئة أو الأشخاص، damage تشير إلى تلف مادي للأشياء والمنشآت والممتلكات، وinjure تعني إصابة جسدية حية لإنسان أو حيوان.",
            "example": "Pollution causes serious harm to nature and damages city monuments, while reckless drivers injure pedestrians."
        },
        {
            "pair": "cycle vs. circle vs. recycle",
            "explanation": "cycle كفعل تعني يركب الدراجة الهوائية، circle تعني يدور في دائرة أو يرسم دائرة، بينما recycle تعني يعيد تدوير المخلفات والمواد القديمة.",
            "example": "I prefer to cycle to the recycling depot rather than driving in circles looking for parking."
        }
    ],

    "storyBook": {
        "title": "The Green Guardians of New Cairo (حماة البيئة في القاهرة الجديدة)",
        "scenes": [
            {
                "sceneNumber": 1,
                "title": "A Wake-Up Call at School Yard",
                "textEn": "During the morning assembly at Al-Amal High School, Kareem looked around the school yard. Plastic water bottles littered the lawn, and bathroom taps were left running. The principal announced that every class must elect a representative to propose a real environmental project. Kareem stepped forward with determination. 'We cannot wait for someone else to protect our nature,' he told his classmates. 'Our journey toward a sustainable future starts right here with small actions!'",
                "textAr": "خلال طابور الصباح بمدرسة الأمل الثانوية، نظر كريم حول فناء المدرسة. كانت زجاجات المياه البلاستيكية تملأ الحديقة، وصنابير دورات المياه تُركت مفتوحة تسيل دون توقف. أعلن مدير المدرسة أن كل فصل يجب أن ينتخب ممثلاً لتقديم مشروع بيئي ملموس. تقدم كريم بكل حزم قائلاً لزملائه: 'لا يمكننا انتظار شخص آخر ليحمي طبيعتنا. رحلتنا نحو مستقبل مستدام تبدأ هنا والآن بخطوات صغيرة!'",
                "imagePrompt": "A modern Egyptian high school courtyard with students gathering at morning assembly, lush green palm trees, bright morning sunlight, a passionate teenage boy speaking with determination, ultra realistic cinematic."
            },
            {
                "sceneNumber": 2,
                "title": "The Power of Daily Habits",
                "textEn": "The next day, Kareem and his team launched their campaign. They placed vibrant signs next to wall sockets reminding students to unplug laptops and phone chargers when fully charged. In the science labs, they fixed two dripping faucets that had been wasting liters of fresh water daily. Instead of buying throwaway plastic containers, students began bringing reusable bottles and canvas lunch bags. Even teachers started cycling to school on Thursdays to cut down car exhaust emissions.",
                "textAr": "في اليوم التالي، أطلق كريم وفريقه حملتهم البيئية. وضعوا لافتات مميزة بجانب مقابس الكهرباء لتذكير الطلاب بفصل أجهزة الكمبيوتر المحمولة وشواحن الهواتف عند اكتمال الشحن. وفي معامل العلوم، أصلحوا صنبورين كانا يقطران مهدِرين لترات من الماء النقي يومياً. وبدلاً من شراء الأواني البلاستيكية المستهلكة، بدأ الطلاب في إحضار زجاجات قابلة لإعادة الاستخدام وحقائب قماشية. حتى المعلمون بدأوا في ركوب الدراجات إلى المدرسة كل خميس للحد من عوادم السيارات.",
                "imagePrompt": "Egyptian teenagers in school uniform placing eco-friendly posters on walls, fixing a dripping water tap in a clean science laboratory, reusable bottles on desks, bright modern lighting."
            },
            {
                "sceneNumber": 3,
                "title": "Greening the Public Spaces",
                "textEn": "On Saturday morning, the initiative expanded into the surrounding neighborhood. Neighbors, teachers, and students joined hands to clean the public park and plant thirty olive and ficus trees. The fresh air and vibrant green leaves completely transformed the street. The municipal council awarded Kareem's school the 'Eco-Champion Trophy'. Looking at the blooming saplings, Kareem smiled warmly: 'When we unite to take small actions every single day, we truly build a healthier planet for everyone.'",
                "textAr": "في صباح يوم السبت، توسعت المبادرة لتشمل الحي المجاور للمدرسة. تكاتف الجيران والمعلمون والطلاب لتنظيف الحديقة العامة وزراعة ثلاثين شجرة زيتون وفيكس. لقد حوّل الهواء النقي وأوراق الشجر الخضراء المشرقة مظهر الشارع بالكامل. ومنح المجلس البلدي مدرسة كريم كأس 'بطل الاستدامة البيئية'. ونظر كريم إلى الشتلات النامية بابتسامة دافئة قائلاً: 'حين نتحد لاتخاذ خطوات صغيرة كل يوم، فإننا نبني كوكباً أكثر صحة للجميع.'",
                "imagePrompt": "A beautiful sunny community park in Cairo, teenagers and adults planting young green trees together, clean paved pathways, cheerful atmosphere, cinematic golden hour lighting."
            }
        ]
    },

    "speakingDialogue": {
        "title": "Discussing the School Green Initiative (حوار المبادرة الخضراء)",
        "participants": [
            { "name": "Farida", "role": "Environmental Club President" },
            { "name": "Omar", "role": "Student Union Leader" }
        ],
        "conversation": [
            {
                "speaker": "Farida",
                "text": "Good morning Omar! Did you notice how much electricity our school consumed during the exams last week?",
                "arabic": "صباح الخير يا عمر! هل لاحظت كمية الكهرباء الهائلة التي استهلكتها مدرستنا أثناء امتحانات الأسبوع الماضي؟"
            },
            {
                "speaker": "Omar",
                "text": "Yes Farida, it was quite alarming. Almost every classroom left fans and smartboards running after the students went home.",
                "arabic": "نعم يا فريدة، كان الأمر مقلقاً للغاية. معظم الفصول تركت المراوح والشاشات الذكية تعمل بعد انصراف الطلاب."
            },
            {
                "speaker": "Farida",
                "text": "That is why we need to remind everyone that unplugging devices and turning off lights can prevent serious environmental harm.",
                "arabic": "لهذا السبب تحديداً نحتاج لتذكير الجميع بأن فصل الأجهزة وإطفاء الأنوار يمنعان ضرراً بيئياً بالغاً."
            },
            {
                "speaker": "Omar",
                "text": "You are absolutely right. If we don't save energy now, global resources risk running out much quicker than expected.",
                "arabic": "أنتِ على حق تماماً. إن لم نوفر الطاقة الآن، فإن الموارد العالمية ستكون معرضة للنفاد أسرع بكثير مما نتوقع."
            },
            {
                "speaker": "Farida",
                "text": "In addition to energy saving, we should encourage students to bring reusable bags and water bottles instead of disposable plastic.",
                "arabic": "بالإضافة إلى توفير الطاقة، ينبغي أن نشجع الطلاب على جلب حقائب وزجاجات مياه قابلة لإعادة الاستخدام بدلاً من البلاستيك أحادي الاستعمال."
            },
            {
                "speaker": "Omar",
                "text": "Splendid idea! How about organizing a weekend tree-planting event in the public spaces around our campus?",
                "arabic": "فكرة رائعة! ما رأيك في تنظيم فعالية لزراعة الأشجار في عطلة نهاية الأسبوع بالأماكن العامة حول مدرستنا؟"
            },
            {
                "speaker": "Farida",
                "text": "That would provide fresh air and clean surroundings for our whole community. Let us present this proposal to our principal today.",
                "arabic": "سيوفر ذلك هواءً نقياً وبيئة نظيفة لمجتمعنا بأسره. دعنا نعرض هذا المقترح على مدير المدرسة اليوم."
            },
            {
                "speaker": "Omar",
                "text": "Agreed! It will prove that small, consistent actions truly make a big difference for our planet.",
                "arabic": "أوافقكِ تماماً! فهذا يثبت أن الخطوات الصغيرة والمستمرة تصنع فارقاً هائلاً حقاً لكوكبنا."
            }
        ]
    },

    "quiz": [
        {
            "id": 1,
            "question": "Dumping toxic industrial chemicals into rivers causes serious .......... to marine life.",
            "options": ["harm", "safety", "benefit", "cure"],
            "answer": "harm",
            "explanation": "المتلازمة اللفظية هي cause serious harm وتعني يسبب ضرراً خطيراً أو بالغاً للحياة البحرية."
        },
        {
            "id": 2,
            "question": "Before leaving your hotel room, remember to .......... off the lights to conserve power.",
            "options": ["turn", "break", "give", "take"],
            "answer": "turn",
            "explanation": "المصطلح الشائع هو turn off lights ويعني يطفئ الأنوار والمصابيح."
        },
        {
            "id": 3,
            "question": ".......... unused electrical appliances prevents phantom electricity consumption.",
            "options": ["Plugging", "Unplugging", "Connecting", "Charging"],
            "answer": "Unplugging",
            "explanation": "unplugging devices تعني نزع القابس وفصل الأجهزة الكهربائية من الحائط لتوفير الطاقة."
        },
        {
            "id": 4,
            "question": "Non-renewable fossil fuels are in danger of .......... out within this century.",
            "options": ["breaking", "dropping", "running", "filling"],
            "answer": "running",
            "explanation": "الفعل الاصطلاحي run out يعني ينفد أو يفرغ المخزون منه تماماً."
        },
        {
            "id": 5,
            "question": "Parks, libraries, and city squares are all .......... spaces that belong to everyone.",
            "options": ["private", "secret", "public", "lonely"],
            "answer": "public",
            "explanation": "public spaces تعني الأماكن والمساحات العامة المتاحة لجميع أفراد المجتمع."
        },
        {
            "id": 6,
            "question": "Ziad decided to .......... to his high school every morning instead of riding the bus.",
            "options": ["cycle", "circle", "drip", "fly"],
            "answer": "cycle",
            "explanation": "الفعل cycle يعني يركب الدراجة الهوائية كوسيلة تنقل صحية وصديقة للبيئة."
        },
        {
            "id": 7,
            "question": "Investing in clean solar energy is essential to build a .......... future for the coming generations.",
            "options": ["sustainable", "harmful", "temporary", "wasteful"],
            "answer": "sustainable",
            "explanation": "sustainable future يعني مستقبلاً مستداماً يلبي متطلبات الحاضر دون الإضرار بموارد المستقبل."
        },
        {
            "id": 8,
            "question": "Every citizen has an environmental .......... to keep public streets clean and tidy.",
            "options": ["hesitation", "responsibility", "ignorance", "laziness"],
            "answer": "responsibility",
            "explanation": "environmental responsibility تعني المسؤولية البيئية المشتركة تجاه كوكب الأرض والمجتمع."
        },
        {
            "id": 9,
            "question": "Bringing your own .......... bag to the supermarket helps reduce plastic waste significantly.",
            "options": ["reusable", "disposable", "throwaway", "polluted"],
            "answer": "reusable",
            "explanation": "reusable bag تعني حقيبة قابلة لإعادة الاستخدام لمرات متعددة بدلاً من الأكياس البلاستيكية."
        },
        {
            "id": 10,
            "question": "Practicing recycling and .......... waste helps preserve natural habitats worldwide.",
            "options": ["reducing", "increasing", "multiplying", "expanding"],
            "answer": "reducing",
            "explanation": "reducing waste تعني تقليل المخلفات والنفايات لتجنب تلوث البيئة."
        },
        {
            "id": 11,
            "question": "Turning down the air conditioner slightly is a great habit for .......... energy at home.",
            "options": ["wasting", "saving", "burning", "harming"],
            "answer": "saving",
            "explanation": "saving energy تعني توفير وترشيد استهلاك الطاقة الكهربائية."
        },
        {
            "id": 12,
            "question": "Volunteers gathered on Friday morning for .......... trees along the canal bank.",
            "options": ["cutting", "chopping", "planting", "burning"],
            "answer": "planting",
            "explanation": "planting trees تعني زراعة وغرس الأشجار لزيادة المساحات الخضراء."
        },
        {
            "id": 13,
            "question": "Walking through dense green forests allows hikers to breathe clean, .......... air.",
            "options": ["polluted", "toxic", "fresh", "stagnant"],
            "answer": "fresh",
            "explanation": "fresh air تعني الهواء النقي والمنعش الخالي من الملوثات."
        },
        {
            "id": 14,
            "question": "Government regulations are designed to .......... wildlife and nature from industrial damage.",
            "options": ["protect", "destroy", "endanger", "waste"],
            "answer": "protect",
            "explanation": "protect nature تعني حماية الطبيعة والكائنات الحية وصيانتها من الأخطار."
        },
        {
            "id": 15,
            "question": "When millions of people make small changes in their daily habits, we create a .......... planet.",
            "options": ["healthier", "dirtier", "poorer", "hotter"],
            "answer": "healthier",
            "explanation": "healthier planet يعني كوكباً أكثر صحة وعافية ونقاءً للجميع."
        },
        {
            "id": 16,
            "question": "Students can .......... a vital part in community clean-up initiatives.",
            "options": ["make", "play", "take", "bring"],
            "answer": "play",
            "explanation": "المتلازمة اللفظية هي play a part in وتعني يشارك في أو يلعب دوراً هاماً في."
        },
        {
            "id": 17,
            "question": "Even modest lifestyle adjustments can .......... a big difference over the years.",
            "options": ["do", "have", "make", "draw"],
            "answer": "make",
            "explanation": "المتلازمة اللفظية هي make a difference وتعني يُحدث فارقاً ملموساً وأثراً إيجابياً."
        },
        {
            "id": 18,
            "question": "The synonym of the word 'sustainable' is .......... .",
            "options": ["renewable", "harmful", "depleting", "wasteful"],
            "answer": "renewable",
            "explanation": "مرادف كلمة sustainable (مستدام) هو renewable (متجدد وصديق للبيئة)."
        },
        {
            "id": 19,
            "question": "The antonym of 'unplug' is .......... .",
            "options": ["disconnect", "plug in", "unhook", "detach"],
            "answer": "plug in",
            "explanation": "مضاد unplug (ينزع القابس) هو plug in (يضع القابس في الكهرباء)."
        },
        {
            "id": 20,
            "question": "The word 'harm' is opposite in meaning to .......... .",
            "options": ["damage", "injury", "benefit", "destruction"],
            "answer": "benefit",
            "explanation": "عكس كلمة harm (ضرر / أذى) هو benefit (فائدة / نفع)."
        },
        {
            "id": 21,
            "question": "The noun 'sustainability' refers to the ability to .......... .",
            "options": ["waste natural wealth rapidly", "maintain ecological balance over time", "burn fossil fuels constantly", "pollute pure rivers"],
            "answer": "maintain ecological balance over time",
            "explanation": "الاستدامة (sustainability) تعني الحفاظ على التوازن البيئي والموارد على المدى الطويل."
        },
        {
            "id": 22,
            "question": "Saving clean water keeps our community supplies from .......... out.",
            "options": ["running", "breaking", "falling", "turning"],
            "answer": "running",
            "explanation": "التعبير keeps ... from running out يعني يحفظ أو يمنع الموارد من النفاد."
        },
        {
            "id": 23,
            "question": "We should use cloth bags .......... single-use plastic bags when shopping.",
            "options": ["in spite of", "instead of", "because of", "due to"],
            "answer": "instead of",
            "explanation": "حرف الجر المركب instead of يعني بدلاً من (يأتي بعده اسم أو فعل مضاف له -ing)."
        },
        {
            "id": 24,
            "question": "Salma had to apologize .......... her mother for forgetting to turn off the kitchen tap.",
            "options": ["to", "for", "with", "from"],
            "answer": "to",
            "explanation": "نستخدم apologize to عندما يتبعها الشخص المعتذر له (اعتذر لأمه)."
        },
        {
            "id": 25,
            "question": "Fares offered an apology .......... leaving his laptop charger connected overnight.",
            "options": ["to", "for", "at", "with"],
            "answer": "for",
            "explanation": "نستخدم apologize for أو apology for عند ذكر سبب الاعتذار أو الخطأ."
        },
        {
            "id": 26,
            "question": "The adjective derived from the noun 'pollution' is .......... .",
            "options": ["polluter", "polluted", "polluting", "pollute"],
            "answer": "polluted",
            "explanation": "الصفة المأخوذة من pollution هي polluted وتعني ملوثاً (مثل polluted air)."
        },
        {
            "id": 27,
            "question": "What is the difference between 'unplug' and 'switch off'?",
            "options": [
                "Unplugging removes the physical plug from the wall, while switching off only turns off the power button",
                "Switching off disconnects the wire completely from the wall",
                "Both terms mean exactly the same physical action with no difference",
                "Unplugging means turning on the television"
            ],
            "answer": "Unplugging removes the physical plug from the wall, while switching off only turns off the power button",
            "explanation": "unplug تعني سحب القابس من المقبس الجداري كلياً، أما switch off فهي إغلاق الزر مع بقاء السلك موصولاً بالكهرباء."
        },
        {
            "id": 28,
            "question": "A material or bag that can be cleaned and used repeatedly is described as .......... .",
            "options": ["reusable", "disposable", "temporary", "throwaway"],
            "answer": "reusable",
            "explanation": "تعريف reusable هو الشيء القابل لإعادة الاستخدام مراراً وتكراراً."
        },
        {
            "id": 29,
            "question": "According to the lesson's listening passage, carrying a personal water bottle helps by .......... .",
            "options": [
                "increasing paper cup waste in cafes",
                "stopping the excessive usage of single-use plastic",
                "consuming more tap water unnecessarily",
                "harming city public spaces"
            ],
            "answer": "stopping the excessive usage of single-use plastic",
            "explanation": "وفقاً لنص الاستماع بكتاب الطالب، حمل زجاجة مياه خاصة يقلل ويوقف استهلاك البلاستيك أحادي الاستخدام."
        },
        {
            "id": 30,
            "question": "Cleaning our streets and neighborhood parks makes our communities both .......... .",
            "options": [
                "safer and more beautiful",
                "louder and more crowded",
                "dirtier and colder",
                "darker and dangerous"
            ],
            "answer": "safer and more beautiful",
            "explanation": "كما ورد بنص الاستماع: 'cleaning our streets and parks makes our communities safer and more beautiful'."
        }
    ]
}

# 1. Write the data file
output_data_path = os.path.join("Sec_1", "unit-4", "lesson-3.data.js")
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
    <title>Sec 1 - Unit 4 - Lesson 3: Small Actions Can Make a Difference | Mr. Ahmed Assem</title>
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
            <a href="../index.html">Sec 1</a> / <a href="./index.html">Unit 4</a> / <span>Lesson 3</span>
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
                <span class="badge badge-gold">🌱 Small Actions Can Make a Difference</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lesson 3: Small Actions Can Make a Difference (خطوات صغيرة تصنع فارقاً كبيراً)</h2>
            <p id="description" class="lesson-desc-display">المفردات الأساسية والتراكمية، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)</p>
        </div>

        <!-- Tabs Navigation Bar (Zero Grammar) -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('vocab', this)">📖 المفردات (Vocabulary)</button>
            <button class="tab-btn" onclick="switchTab('definitions', this)">💡 التعريفات (Definitions)</button>
            <button class="tab-btn" onclick="switchTab('collocations', this)">🔗 المتلازمات والتعبيرات</button>
            <button class="tab-btn" onclick="switchTab('synonyms', this)">🔄 المرادفات والمتضادات</button>
            <button class="tab-btn" onclick="switchTab('language-notes', this)">🧬 المشتقات والفروق (Notes)</button>
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

        <!-- Tab: Interactive StoryBook 3D -->
        <div id="storybook" class="tab-content">
            <div class="storybook-wrapper">
                <div class="storybook-book">
                    <div class="book-spine-divider"></div>
                    <div class="story-page-artwork">
                        <div class="art-glow"></div>
                        <div class="storybook-visual" id="storybookVisual">🌱</div>
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
                    <p>اختبر استيعابك للمفردات، المتلازمات اللفظية، التعريفات، المشتقات، وحروف الجر بدقة متناهية (Zero Grammar)</p>
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
            <a href="lesson-1.html" class="nav-lesson-link prev">&rarr; الدرس الأول والثاني: Save and Shine</a>
            <a href="index.html" class="nav-lesson-link hub">🏠 فهرس الوحدة الرابعة</a>
            <a href="lesson-4-5.html" class="nav-lesson-link next">الدرس الرابع والخامس: Helping our community &larr;</a>
        </div>
    </div>

    <!-- Scripts: Core Renderer, StoryBook, Dialogue, Quiz -->
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/storybook.js"></script>
    <script src="../../assets/js/speaking-dialogue.js"></script>
    <script src="../../assets/js/quiz-engine.js"></script>
    
    <!-- Lesson Payload -->
    <script src="lesson-3.data.js"></script>
    
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

output_html_path = os.path.join("Sec_1", "unit-4", "lesson-3.html")
with open(output_html_path, "w", encoding="utf-8") as f:
    f.write(html_content)
print(f"Generated HTML shell: {output_html_path} ({len(html_content)} bytes)")
