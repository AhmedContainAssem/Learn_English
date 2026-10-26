import json
import os

lesson_data = {
    "id": "sec2-u3-l4",
    "stage": "sec2",
    "unit": 3,
    "lesson": "3.4 & 3.5",
    "title": "Lessons 3.4 & 3.5: Social Media and Historical Events",
    "description": "المفردات، التعريفات، المتلازمات والتعبيرات، قصة القراءة التفاعلية 3D عن جلب الاكتشافات المصرية للعالم عبر السوشيال ميديا، المحادثة الناطقة، مهارات كتابة التقرير الخبري، واختبار شامل 30 سؤالاً 🎯",

    "keyVocabulary": [
        { "word": "accuracy", "partOfSpeech": "n", "arabic": "دقة / ضبط وصحة", "example": "Before publishing the report, the team checked the accuracy of every historical detail." },
        { "word": "citizen journalism", "partOfSpeech": "n", "arabic": "صحافة المواطن", "example": "Citizen journalism allows eyewitnesses to report discoveries directly to the public." },
        { "word": "documentation", "partOfSpeech": "n", "arabic": "توثيق / تسجيل الأدلة", "example": "The archaeological team kept careful documentation of the tomb using notes, photos, and videos." },
        { "word": "documented", "partOfSpeech": "adj", "arabic": "موثق", "example": "The event was well documented by both scholars and official institutions." },
        { "word": "excavation", "partOfSpeech": "n", "arabic": "تنقيب / حفر أثري", "example": "Archaeologists began the excavation after finding the sealed entrance." },
        { "word": "fragile", "partOfSpeech": "adj", "arabic": "هش / قابل للكسر والتلف", "example": "The ancient papyrus is fragile, so experts handle it with great care." },
        { "word": "remarkable", "partOfSpeech": "adj", "arabic": "بارز / لافت / مدهش", "example": "The discovery was remarkable because the tomb had remained untouched for centuries." },
        { "word": "submerged", "partOfSpeech": "adj", "arabic": "مغمور بالماء / غارق", "example": "The ancient city was found submerged under the sea near Alexandria." }
    ],

    "importantVocabulary": [
        { "word": "abroad", "partOfSpeech": "adv", "arabic": "في الخارج", "example": "The discovery attracted thousands of tourists from Egypt and abroad." },
        { "word": "academic", "partOfSpeech": "adj", "arabic": "أكاديمي / جامعي", "example": "Specialists argue that social media works best alongside academic research." },
        { "word": "alongside", "partOfSpeech": "prep", "arabic": "إلى جانب / جنباً إلى جنب", "example": "Social media works alongside careful documentation." },
        { "word": "analyze", "partOfSpeech": "v", "arabic": "يحلل", "example": "Researchers analyze primary evidence before drawing historical conclusions." },
        { "word": "civilian", "partOfSpeech": "adj / n", "arabic": "مدني (غير عسكري)", "example": "Civilian accounts can provide eyewitness details during excavations." },
        { "word": "coast", "partOfSpeech": "n", "arabic": "ساحل", "example": "Sunken statues were found off the coast of Alexandria." },
        { "word": "community", "partOfSpeech": "n", "arabic": "مجتمع / جماعة", "example": "In the past, news reached only a small community of scholars." },
        { "word": "consider", "partOfSpeech": "v", "arabic": "يأخذ في الاعتبار / يفكر في", "example": "There are several challenges we must consider regarding online posts." },
        { "word": "creator", "partOfSpeech": "n", "arabic": "صانع محتوى / منشئ", "example": "A TikTok video may be deleted by its creator within minutes." },
        { "word": "consent", "partOfSpeech": "n", "arabic": "موافقة / إذن", "example": "Publishing pictures of private artifacts requires the owner's consent." },
        { "word": "discovery", "partOfSpeech": "n", "arabic": "اكتشاف", "example": "The discovery of King Tut's tomb astonished the modern world." },
        { "word": "document", "partOfSpeech": "v / n", "arabic": "يوثق / وثيقة", "example": "Official accounts use platforms like X to document discoveries in real time." },
        { "word": "enigmatic", "partOfSpeech": "adj", "arabic": "غامض / يصعب فهمه", "example": "The stone showed enigmatic inscriptions that took years to decode." },
        { "word": "expert", "partOfSpeech": "n", "arabic": "خبير", "example": "Not every post about an Egyptian discovery is written by an expert." },
        { "word": "expire", "partOfSpeech": "v", "arabic": "ينتهي / تنتهي صلاحيته", "example": "An Instagram story expires after twenty-four hours." },
        { "word": "extraordinary", "partOfSpeech": "adj", "arabic": "استثنائي / غير عادي", "example": "Egypt's extraordinary heritage is now shared with millions globally." },
        { "word": "follower", "partOfSpeech": "n", "arabic": "متابع", "example": "Followers from Cairo to Tokyo watched the excavation live." },
        { "word": "gatekeeper", "partOfSpeech": "n", "arabic": "حارس البوابة (الجهة المتحكمة في النشر)", "example": "In the past, official gatekeepers controlled what news reached the public." },
        { "word": "government ministries", "partOfSpeech": "n", "arabic": "وزارات حكومية", "example": "Government ministries run verified accounts on major platforms." },
        { "word": "housing", "partOfSpeech": "n", "arabic": "إسكان / مساكن", "example": "Modern housing projects sometimes uncover ancient ruins underneath." },
        { "word": "inscription", "partOfSpeech": "n", "arabic": "نقش / كتابة منقوشة", "example": "Visitors read the inscription carved into the granite column." },
        { "word": "instead of", "partOfSpeech": "prep", "arabic": "بدلاً من", "example": "Read verified sources instead of unverified viral rumors." },
        { "word": "journal", "partOfSpeech": "n", "arabic": "مجلة دورية أكاديمية", "example": "Findings were published in an academic specialist journal." },
        { "word": "manage", "partOfSpeech": "v", "arabic": "يدير / يتحكم في", "example": "Knowledge of the past was once carefully managed by institutions." },
        { "word": "masterpiece", "partOfSpeech": "n", "arabic": "تحفة فنية رائعة", "example": "The golden mask of the pharaoh is a world-renowned masterpiece." },
        { "word": "moderation", "partOfSpeech": "n", "arabic": "إشراف على المحتوى / رقابة", "example": "The platform's moderation system removes harmful or misleading clips." },
        { "word": "news outlets", "partOfSpeech": "n", "arabic": "وسائل الإعلام الإخبارية", "example": "Professional news outlets verify information before broadcasting." },
        { "word": "news broadcast", "partOfSpeech": "n", "arabic": "نشرة إخبارية", "example": "The discovery was featured in the evening news broadcast." },
        { "word": "occurrence", "partOfSpeech": "n", "arabic": "حدوث / واقعة", "example": "Finding an intact tomb is a rare historical occurrence." },
        { "word": "official", "partOfSpeech": "adj / n", "arabic": "رسمي / مسؤول", "example": "We received an official statement from the Ministry of Tourism." },
        { "word": "organisation", "partOfSpeech": "n", "arabic": "منظمة / هيئة", "example": "Cultural organisations work hard to protect endangered monuments." },
        { "word": "out of context", "partOfSpeech": "idm", "arabic": "خارج السياق", "example": "Ancient claims can be misunderstood when shared out of context." },
        { "word": "papyrus", "partOfSpeech": "n", "arabic": "ورق البردي / بردية", "example": "Ancient Egyptian medical knowledge was recorded on fragile papyrus." },
        { "word": "platform", "partOfSpeech": "n", "arabic": "منصة رقمية", "example": "Official bodies use digital platforms like X and Instagram." },
        { "word": "permanently", "partOfSpeech": "adv", "arabic": "بشكل دائم", "example": "Stone carvings preserve royal names permanently." },
        { "word": "post", "partOfSpeech": "v / n", "arabic": "ينشر / منشور", "example": "A post on social media can be deleted within seconds." },
        { "word": "preservation", "partOfSpeech": "n", "arabic": "حفظ / صيانة وتراث", "example": "Careful preservation ensures that delicate relics survive for centuries." },
        { "word": "professional", "partOfSpeech": "n / adj", "arabic": "محترف / مهني ومتخصص", "example": "Museum professionals use special tools to clean artifacts." },
        { "word": "publish", "partOfSpeech": "v", "arabic": "ينشر (في كتاب أو مجلة أو موقع)", "example": "The ministry published photographs of the newly discovered sarcophagus." },
        { "word": "rather than", "partOfSpeech": "conj", "arabic": "بدلاً من / بالأحرى", "example": "Ahmed chose to read the book rather than watch short video clips." },
        { "word": "real time", "partOfSpeech": "n", "arabic": "الوقت الفعلي / التزامن المباشر", "example": "Live streaming allows us to document excavations in real time." },
        { "word": "remove", "partOfSpeech": "v", "arabic": "يزيل / يحذف", "example": "The platform decided to remove misleading posts." },
        { "word": "royal", "partOfSpeech": "adj", "arabic": "ملكي", "example": "Archaeologists uncovered a royal tomb belonging to an 18th-dynasty queen." },
        { "word": "scholar", "partOfSpeech": "n", "arabic": "باحث / عالم أكاديمي", "example": "Scholars spend decades analyzing ancient hieroglyphs." },
        { "word": "sealed", "partOfSpeech": "adj", "arabic": "مغلق بإحكام / مختوم", "example": "The sealed tomb had remained closed for over three thousand years." },
        { "word": "spanning", "partOfSpeech": "adj / v", "arabic": "يمتد عبر / يشمل فترة", "example": "The exhibition covers a civilization spanning thousands of years." },
        { "word": "specialist", "partOfSpeech": "n / adj", "arabic": "أخصائي / متخصص", "example": "The artifact was sent to a specialist in ancient metallurgy." },
        { "word": "threads", "partOfSpeech": "n", "arabic": "سلاسل نقاش / محادثات متتابعة", "example": "Historians created detailed threads on X explaining the context." },
        { "word": "threaten", "partOfSpeech": "v", "arabic": "يهدد", "example": "Climate change and water submergence threaten coastal monuments." },
        { "word": "trace", "partOfSpeech": "v / n", "arabic": "يتتبع أثر / أثر متبقٍ", "example": "We can trace the roots of modern medicine back to ancient Egypt." },
        { "word": "transform", "partOfSpeech": "v", "arabic": "يحول / يغير جذرياً", "example": "Social media has transformed how people learn about the past." },
        { "word": "uncover", "partOfSpeech": "v", "arabic": "يكشف عن / يعثر على", "example": "Workers uncovered a cache of mummies near Luxor." },
        { "word": "viral", "partOfSpeech": "adj", "arabic": "فيروسي واسع الانتشار", "example": "The video of the submerged palace went viral within hours." }
    ],

    "definitions": [
        { "word": "accuracy", "definition": "the state of being correct and free from mistakes", "arabic": "حالة الصحة والدقة والخلو من الأخطاء" },
        { "word": "documentation", "definition": "the process of recording and keeping information, evidence, or details about something", "arabic": "عملية تسجيل وحفظ المعلومات أو الأدلة أو التفاصيل عن شيء ما" },
        { "word": "excavation", "definition": "the activity of digging to discover old objects or buildings", "arabic": "نشاط الحفر والتنقيب لاكتشاف القطع الأثرية أو المباني القديمة" },
        { "word": "fragile", "definition": "easily damaged or broken", "arabic": "سريع التلف أو الكسر بسهولة" },
        { "word": "remarkable", "definition": "very unusual or surprising in a positive way", "arabic": "غير عادي أو مفاجئ جداً بطريقة إيجابية ومدهشة" },
        { "word": "submerged", "definition": "covered or hidden under water", "arabic": "مغطى أو متوارٍ تحت سطح الماء" },
        { "word": "citizen journalism", "definition": "news reporting carried out by members of the public, not trained journalists", "arabic": "التقارير الإخبارية التي يقوم بها أفراد الجمهور العاديون وليس الصحفيون المحترفون" },
        { "word": "real-time documentation", "definition": "recording and sharing events as they happen, without delay", "arabic": "تسجيل ومشاركة الأحداث فور وقوعها دون أي تأخير" },
        { "word": "hashtag", "definition": "a word or phrase preceded by # used on social media to tag content by topic", "arabic": "كلمة أو عبارة مسبوقة برمز # لتصنيف المحتوى حسب الموضوع" },
        { "word": "digital archive", "definition": "a collection of historical materials stored and accessible online", "arabic": "مجموعة من المواد التاريخية المحفوظة والمتاحة عبر الإنترنت" },
        { "word": "selective framing", "definition": "choosing which details to include or exclude to shape the audience's understanding", "arabic": "اختيار التفاصيل التي يتم تضمينها أو استبعادها لتشكيل وتوجيه فهم الجمهور" }
    ],

    "synonyms": [
        { "word": "accuracy", "synonyms": ["correctness", "precision", "exactness"], "arabic": "دقة / ضبط" },
        { "word": "documentation", "synonyms": ["recording", "keeping records", "evidence keeping"], "arabic": "توثيق / تدوين" },
        { "word": "excavation", "synonyms": ["digging", "archaeological digging", "uncovering"], "arabic": "تنقيب / حفر" },
        { "word": "fragile", "synonyms": ["delicate", "breakable", "easily damaged"], "arabic": "هش / قابل للكسر" },
        { "word": "remarkable", "synonyms": ["impressive", "unusual", "extraordinary"], "arabic": "مدهش / لافت / بارز" },
        { "word": "submerged", "synonyms": ["underwater", "flooded", "sunken", "immersed"], "arabic": "مغمور بالمياه / غارق" }
    ],

    "antonyms": [
        { "word": "accuracy", "antonyms": ["inaccuracy", "incorrectness", "error", "mistake", "falsehood"], "arabic": "عدم دقة / خطأ / زلل" },
        { "word": "documentation", "antonyms": ["neglect", "loss", "omission", "deletion", "undocumented record"], "arabic": "إهمال / ضياع / حذف / سجل غير موثق" },
        { "word": "excavation", "antonyms": ["burial", "covering", "concealment", "hiding"], "arabic": "دفن / تغطية / إخفاء / ستر" },
        { "word": "fragile", "antonyms": ["strong", "durable", "solid", "sturdy", "tough"], "arabic": "قوي / متين / صلب / شديد التحمل" },
        { "word": "remarkable", "antonyms": ["ordinary", "usual", "common", "unremarkable", "unimpressive"], "arabic": "عادي / مألوف / شائع / غير ملحوظ" },
        { "word": "selective", "antonyms": ["full", "complete", "balanced", "fair"], "arabic": "شامل / كامل / متوازن / عادل" },
        { "word": "submerged", "antonyms": ["emerged", "exposed"], "arabic": "بارز / مكشوف فوق الماء" },
        { "word": "enigmatic", "antonyms": ["clear", "obvious", "understandable"], "arabic": "واضح / جلي / مفهوم" }
    ],

    "collocations": [
        { "phrase": "analyze primary evidence", "arabic": "يحلل دليلاً أولياً", "example": "Historians analyze primary evidence before writing their conclusions." },
        { "phrase": "create a lasting record", "arabic": "ينشئ سجلاً دائماً", "example": "Photographs and field notes create a lasting record of the excavation." },
        { "phrase": "document historical events", "arabic": "يوثق أحداثاً تاريخية", "example": "Official channels document historical events with accurate dates and footage." },
        { "phrase": "erect a protective screen", "arabic": "يضع حاجزاً واقياً", "example": "Engineers erect a protective screen around the fragile ancient tomb." },
        { "phrase": "keep people updated", "arabic": "يبقي الناس على اطلاع", "example": "Social media accounts keep people updated about recent finds." },
        { "phrase": "locate a sealed door", "arabic": "يحدد مكان باب مغلق بإحكام", "example": "The archaeological survey located a sealed door in the bedrock." },
        { "phrase": "record events as they happen", "arabic": "يسجل الأحداث فور وقوعها", "example": "Live streaming enables researchers to record events as they happen." },
        { "phrase": "report archaeological discoveries", "arabic": "يعلن عن اكتشافات أثرية", "example": "Specialist journals report archaeological discoveries in full detail." },
        { "phrase": "share events with the public", "arabic": "يشارك الأحداث مع الجمهور", "example": "The ministry uses Instagram to share events with the public instantly." },
        { "phrase": "shape the audience's understanding", "arabic": "يشكل فهم الجمهور", "example": "Media framing can shape the audience's understanding of historical facts." },
        { "phrase": "suggest a possible connection", "arabic": "يشير إلى صلة محتملة", "example": "Artifacts found at the site suggest a possible connection with ancient Greece." },
        { "phrase": "uncover a royal tomb", "arabic": "يكشف مقبرة ملكية", "example": "Archaeologists managed to uncover a royal tomb filled with treasures." },
        { "phrase": "verify primary evidence", "arabic": "يتحقق من دليل أولي", "example": "Scholars carefully verify primary evidence before publishing claims." }
    ],

    "expressions": [
        { "phrase": "as they happen", "arabic": "فور وقوعها (مباشرة)", "note": "Instant reporting in real time" },
        { "phrase": "by accident", "arabic": "عن طريق الصدفة / دون قصد", "note": "Without prior planning" },
        { "phrase": "high-ranking court official", "arabic": "مسؤول رفيع المستوى في البلاط الملكي", "note": "Important ancient nobility" },
        { "phrase": "the very dawn of humanity", "arabic": "فجر البشرية الأول / بدايات التاريخ", "note": "Earliest origins of civilized human life" },
        { "phrase": "verified account", "arabic": "حساب موثق رسمياً بالعلامة الزرقاء", "note": "Authenticated social media identity" },
        { "phrase": "weigh both sides before you decide", "arabic": "وازن بين الأمرين وفكر في المزايا والعيوب قبل أن تقرر", "note": "Critical thinking guideline" },
        { "phrase": "official gatekeepers", "arabic": "حراس النشر الرسميون / جهات التحكم في المعلومات", "note": "Traditional entities controlling media flow" },
        { "phrase": "professional news outlets", "arabic": "وسائل إعلام مهنية ومحترفة", "note": "Established journalistic institutions" },
        { "phrase": "protective gear", "arabic": "معدات الوقاية وأدوات الحماية", "note": "Safety clothing used on digging sites" }
    ],

    "verbPrepositions": [
        { "verb": "analyze ... through", "arabic": "يحلل ... من خلال", "example": "Scholars analyze historical shifts through primary documents." },
        { "verb": "date to", "arabic": "يعود تاريخه إلى", "example": "The submerged statues date to the Ptolemaic period." },
        { "verb": "document ... through", "arabic": "يوثق ... من خلال", "example": "The team documented the discovery through high-resolution photography." },
        { "verb": "get to", "arabic": "يتمكن من / يصل إلى", "example": "The public can now get to see discoveries within hours of their finding." },
        { "verb": "share ... with", "arabic": "يشارك ... مع", "example": "Official institutions share real-time updates with millions of followers." },
        { "verb": "tag ... by", "arabic": "يوسم ... حسب / يصنف بـ", "example": "Posts are tagged by topic and excavation name using clear hashtags." },
        { "verb": "verify ... by", "arabic": "يتحقق ... بواسطة / عبر", "example": "Claims were verified by independent academic specialists." },
        { "verb": "leave ... out", "arabic": "يحذف / يستبعد / يغفل", "example": "A biased short video may leave out vital historical context." }
    ],

    "derivatives": [
        { "word": "accuracy", "verb": "-", "noun": "accuracy (دقة)", "adjective": "accurate (دقيق)", "adverb": "accurately (بدقة)" },
        { "word": "documentation", "verb": "document (يوثق)", "noun": "document (وثيقة) / documentation (توثيق)", "adjective": "documented (موثق)", "adverb": "-" },
        { "word": "excavation", "verb": "excavate (ينقب / يحفر)", "noun": "excavation (تنقيب) / excavator (منقب)", "adjective": "excavated (منقب عنه)", "adverb": "-" },
        { "word": "fragile", "verb": "-", "noun": "fragility (هشاشة / قابلية للكسر)", "adjective": "fragile (هش / ضعيف)", "adverb": "-" },
        { "word": "remarkable", "verb": "remark (يلاحظ / يعلق)", "noun": "remark (ملاحظة / تعليق)", "adjective": "remarkable (لافت / مدهش)", "adverb": "remarkably (بشكل لافت / على نحو مدهش)" },
        { "word": "submerged", "verb": "submerge (يغمر / يغرق)", "noun": "submergence (غمر / غرق بالماء)", "adjective": "submerged (مغمور)", "adverb": "-" }
    ],

    "confusionNotes": [
        {
            "title": "accuracy vs reliability",
            "explanation": "كلمة **accuracy** تعني صحة وخلو المعلومات من الأخطاء (correctness of information). بينما **reliability** تعني موثوقية وجدارة المصدر بالثقة (trustworthiness of the source). المصدر الموثوق غالباً ما يقدم معلومات دقيقة، لكنهما مفهومان مختلفان.",
            "examples": [
                "The report's accuracy was verified by checking the original papyrus.",
                "You should evaluate the reliability of the website before believing its posts."
            ]
        },
        {
            "title": "documentation vs description",
            "explanation": "كلمة **documentation** تعني تسجيل وتوثيق الأدلة والتفاصيل لحفظها كمرجع رسمي تاريخي (recording and keeping details). أما **description** فتعني مجرد وصف مظهر الشيء أو خصائصه اللحظية (saying what something is like).",
            "examples": [
                "Careful archaeological documentation protects the integrity of the site.",
                "The guide gave a brief description of the tomb's outer walls."
            ]
        },
        {
            "title": "excavation vs discovery",
            "explanation": "كلمة **excavation** تعني عملية الحفر والتنقيب العلمي للوصول للآثار المدفونة (digging to find ancient remains). أما **discovery** فتعني لحظة العثور على الشيء أو الاكتشاف نفسه (finding something important).",
            "examples": [
                "The archaeological excavation took three months of intensive digging.",
                "The discovery of King Tut's tomb was announced worldwide."
            ]
        },
        {
            "title": "fragile vs weak",
            "explanation": "كلمة **fragile** تصف مادة قابلة للكسر أو التلف السريع وتتطلب عناية فائقة كالفخار أو ورق البردي أو الزجاج (easily broken or damaged). بينما **weak** تعني ضعيف القوة البدنية أو الفعالية (not physically strong or not effective).",
            "examples": [
                "Ancient papyrus scrolls are extremely fragile and must be kept in climate-controlled cases.",
                "After the long fever, the patient felt too weak to climb the stairs."
            ]
        },
        {
            "title": "remarkable vs important",
            "explanation": "كلمة **remarkable** تعني استثنائي أو غير عادي أو مدهش ومثير للإعجاب (impressive or unusual). بينما **important** تعني ذو قيمة عالية أو أثر وأهمية بالغة (having great value or significance). الشيء قد يكون مهماً دون أن يكون مدهشاً بصرياً.",
            "examples": [
                "The tomb was in a remarkably well-preserved condition.",
                "It is important to wear protective gloves when handling ancient relics."
            ]
        },
        {
            "title": "submergence vs excavation",
            "explanation": "كلمة **submergence** تشير إلى الغمر تحت الماء (being under water)، كما في الآثار الغارقة بالإسكندرية. أما **excavation** فتشير إلى الحفر واستخراج الآثار من تحت التربة (digging underground).",
            "examples": [
                "The submergence of the ancient lighthouse occurred after powerful earthquakes.",
                "Archaeologists conducted an underwater excavation using specialized diving gear."
            ]
        }
    ],

    "writingSkill": {
        "title": "News Report (التقرير الخبري)",
        "definition": "A news report is a short piece of writing that informs people about a recent event.",
        "definitionAr": "التقرير الخبري هو نص كتابي قصير يخبر القراء بمعلومات دقيقة عن حدث وقع مؤخراً.",
        "components": [
            { "part": "1. Headline (العنوان)", "function": "It should be short and interesting; it tells the main event quickly.", "example": "Ancient Tomb Discovered in Luxor", "functionAr": "يجب أن يكون قصيراً وجذاباً ويخبر بالحدث الرئيسي بسرعة واختصار." },
            { "part": "2. Lead (المقدمة)", "function": "It is an opening sentence answering What? Where? When?", "example": "A royal tomb was discovered in Luxor this week by Egyptian archaeologists.", "functionAr": "جملة افتتاحية تجيب عن الأسئلة: ماذا؟ أين؟ متى؟" },
            { "part": "3. Details (التفاصيل)", "function": "Explains who discovered it, what it is, and why it is important.", "example": "Experts say the tomb may belong to a high-ranking court official from the 18th dynasty.", "functionAr": "توضح من شارك في الحدث، وماذا وجدوا، ولماذا يعد الاكتشاف مهماً." },
            { "part": "4. Background (الخلفية)", "function": "Extra information to help readers understand the context.", "example": "In the past, discoveries took months before being reported in specialist academic journals.", "functionAr": "معلومات إضافية لمساعدة القراء على فهم السياق العام وتاريخ الموقع." },
            { "part": "5. Closing (الخاتمة)", "function": "A short final sentence that ends the report.", "example": "Experts say more details will be revealed in an official conference soon.", "functionAr": "جملة ختامية قصيرة تنهي التقرير وتشير إلى الخطوات القادمة." }
        ]
    },

    "storyPages": [
        {
            "title": "The Slow Pace of the Past",
            "badge": "Scene 1 • Official Channels & Scholarly Gatekeepers",
            "caption": "How Archaeological News Used to Travel",
            "image": "../../assets/images/gem_museum.webp",
            "textEn": "For most of human history, news of a great archaeological discovery traveled slowly. A royal tomb found in the Valley of the Kings might be reported in a specialist journal months after the excavation began, reaching only a small community of scholars and museum professionals. The wider public — whether in Egypt or abroad — would wait years before seeing even a photograph of what had been uncovered. Knowledge of the past was carefully managed, moving through official channels before it reached ordinary people.",
            "translation": "خلال معظم التاريخ البشري، كانت أنباء الاكتشافات الأثرية الكبرى تسير وتنتقل ببطء شديد. فالمقبرة الملكية المكتشفة في وادي الملوك كان يُعلن عنها في مجلة دورية متخصصة بعد أشهر طويلة من بدء أعمال التنقيب، ولا يصل خبرها إلا لمجتمع ضيق من الباحثين وخبراء المتاحف. وكان الجمهور العريض — سواء داخل مصر أو خارجها — ينتظر سنوات قبل أن يرى مجرد صورة فوتوغرافية لما تم الكشف عنه. فقد كانت المعرفة بالتاريخ تُدار بحرص شديد، وتمر عبر قنوات رسمية قبل أن تصل إلى الناس العاديين.",
            "vocabulary": ["archaeological", "specialist", "excavation", "scholars", "uncovered", "official"]
        },
        {
            "title": "The Real-Time Digital Revolution",
            "badge": "Scene 2 • Bringing Egyptian Discoveries to the World",
            "caption": "From Sealed Tombs to Submerged Cities Instantly",
            "image": "../../assets/images/gem_museum.webp",
            "textEn": "Social media has transformed this process in remarkable ways. When an exciting find is made today, whether a sealed tomb in Luxor, a submerged city off the coast of Alexandria, or an ancient papyrus in the Delta, it can be photographed, posted, and shared with millions of people within hours. Official accounts run by organizations such as the Ministry of Tourism and Antiquities now use platforms like X and Instagram to document discoveries in real time, allowing followers from Cairo to Tokyo to watch history being uncovered. For the first time, Egypt's extraordinary heritage is being shared with the world at the very moment it is found.",
            "translation": "لقد غيّر الإعلام الاجتماعي هذه العملية بشكل جذري وبطرق مدهشة ولفتة للنظر. فعندما يتم التوصل إلى اكتشاف مثير اليوم، سواء كانت مقبرة مغلقة بإحكام في الأقصر، أو مدينة مغمورة تحت الماء قبالة ساحل الإسكندرية، أو بردية قديمة في الدلتا، يمكن تصويرها ونشرها ومشاركتها مع ملايين البشر في غضون ساعات قليلة. وتستخدم الحسابات الرسمية التي تديرها منظمات كوزارة السياحة والآثار منصات مثل X وإنستغرام لتوثيق الاكتشافات في الوقت الفعلي والتزامن المباشر، مما يتيح للمتابعين من القاهرة إلى طوكيو مشاهدة التاريخ وهو يُكشف عنه. ولأول مرة، يُشارك تراث مصر الاستثنائي مع العالم فور اكتشافه مباشرة.",
            "vocabulary": ["remarkable", "sealed", "submerged", "papyrus", "platforms", "real time", "extraordinary"]
        },
        {
            "title": "Digital Fragility and Academic Balance",
            "badge": "Scene 3 • Preserving Context in a Fast-Paced World",
            "caption": "Why Social Media Needs Academic Documentation",
            "image": "../../assets/images/gem_museum.webp",
            "textEn": "There are challenges to consider, however. A post on X can be deleted; an Instagram story expires after twenty-four hours; a TikTok video may be removed by its creator or by the platform's moderation systems within minutes of going viral. Unlike a stone inscription or a printed journal, social media documentation is fragile. There is also the question of accuracy: not every post about an Egyptian discovery is published by experts, and images or claims can sometimes be misunderstood or shared out of context. Specialists argue that social media is most valuable when it works alongside careful academic documentation and preservation.",
            "translation": "مع ذلك، ثمة تحديات ومخاطر حقيقية يجب أن نأخذها في الحسبان. فالمنشور على منصة X يمكن حذفه، و\"ستوري\" الإنستغرام تنتهي صلاحيتها وتختفي بعد أربع وعشرين ساعة، ومقطع التيك توك قد يزيله منشئه أو تحذفه أنظمة الإشراف على المحتوى في غضون دقائق من انتشاره كالنار في الهشيم. وعلى عكس النقوش الحجرية الصلبة أو المجلات المطبوعة، فإن التوثيق الرقمي عبر السوشيال ميديا يتسم بالهشاشة وقابلية الزوال السريع. يُضاف إلى ذلك مسألة الدقة؛ فليس كل منشور عن اكتشاف مصري يكتبه خبراء متخصصون، وقد يُساء فهم الصور والادعاءات أو يتم تداولها خارج سياقها الصحيح. ولذلك يؤكد المتخصصون أن السوشيال ميديا تحقق أعظم فائدة عندما تعمل جنباً إلى جنب مع التوثيق الأكاديمي الدقيق وجهود الحفظ والصيانة.",
            "vocabulary": ["expires", "creator", "moderation", "viral", "inscription", "fragile", "accuracy", "alongside"]
        }
    ],

    "dialogue": [
        {
            "speaker": "Tarek (Tech Journalist)",
            "textEn": "Dr. Laila, the live stream of the submerged palace excavation in Alexandria gained three million views in just four hours! Isn't social media revolutionary for archaeology?",
            "textAr": "دكتورة ليلى، البث المباشر لأعمال حفر القصر المغمور بالمياه في الإسكندرية جاب 3 مليون مشاهدة في 4 ساعات بس! أليست السوشيال ميديا ثورة حقيقية في علم الآثار؟",
            "audioId": "dial_sec2_34_1"
        },
        {
            "speaker": "Dr. Laila (Archaeologist)",
            "textEn": "It is truly remarkable, Tarek. Real-time documentation allows followers worldwide to connect with Egypt's heritage as it is uncovered. But as archaeologists, we also worry about digital fragility.",
            "textAr": "هو أمر مدهش حقاً يا طارق. التوثيق اللحظي بيسمح للمتابعين حول العالم بالتواصل مع تراث مصر فور اكتشافه. لكن كعلماء آثار، بنقلق برضه من الهشاشة الرقمية.",
            "audioId": "dial_sec2_34_2"
        },
        {
            "speaker": "Tarek (Tech Journalist)",
            "textEn": "Digital fragility? You mean because stories expire after twenty-four hours and posts can be deleted or removed by moderation?",
            "textAr": "هشاشة رقمية؟ تقصدي عشان الستوري بتنتهي صلاحيتها بعد 24 ساعة والبوستات ممكن تتحذف أو تلغيها أنظمة الرقابة؟",
            "audioId": "dial_sec2_34_3"
        },
        {
            "speaker": "Dr. Laila (Archaeologist)",
            "textEn": "Exactly. Furthermore, viral posts are often created without citizen journalism verification, leading to claims being shared completely out of context.",
            "textAr": "بالضبط كده. وفوق ده كله، المنشورات الفيروسية بتتعمل أحياناً من غير تدقيق أو فحص، وده بيخلي ادعاءات غير دقيقة تنتشر تماماً برة سياقها التاريخي.",
            "audioId": "dial_sec2_34_4"
        },
        {
            "speaker": "Tarek (Tech Journalist)",
            "textEn": "So how can the public distinguish between verified historical facts and sensational claims?",
            "textAr": "طب إزاي الجمهور يقدر يميز بين الحقائق التاريخية الموثقة والادعاءات المثيرة المبالغ فيها؟",
            "audioId": "dial_sec2_34_5"
        },
        {
            "speaker": "Dr. Laila (Archaeologist)",
            "textEn": "Always look for official accounts from government ministries, check for academic documentation, and remember to weigh both sides before you believe a viral clip!",
            "textAr": "دايماً تابع الحسابات الرسمية الموثقة التابعة للوزارات، ودور على التوثيق الأكاديمي، وافتكر توازن وتفكر في الأدلة كويس قبل ما تصدق أي فيديو تريند!",
            "audioId": "dial_sec2_34_6"
        }
    ],

    "quiz": [
        {
            "id": 1,
            "question": "Archaeologists began the ............ after finding the sealed entrance.",
            "options": ["excavation", "hashtag", "ministry", "event"],
            "correct": 0,
            "explanation": "نختار excavation (أعمال الحفر والتنقيب) لأنها النشاط العلمي الذي يبدأه علماء الآثار فور العثور على مدخل المقبرة المغلق بإحكام."
        },
        {
            "id": 2,
            "question": "Before publishing the report, the team checked the ............ of every historical detail.",
            "options": ["accuracy", "hashtag", "excavation", "outlet"],
            "correct": 0,
            "explanation": "نختار accuracy (الدقة) لأن الباحثين يتحققون من دقة وصحة التفاصيل التاريخية قبل نشر أي تقرير."
        },
        {
            "id": 3,
            "question": "The ancient city was found ............ under the sea near Alexandria.",
            "options": ["protective", "intact", "submerged", "high-ranking"],
            "correct": 2,
            "explanation": "نختار submerged (مغمورة تحت الماء) لوصف المدينة الأثرية الغارقة في قاع البحر قبالة شواطئ الإسكندرية."
        },
        {
            "id": 4,
            "question": "The ancient papyrus is ............ , so experts handle it with great care.",
            "options": ["academic", "fragile", "verified", "routine"],
            "correct": 1,
            "explanation": "نختار fragile (هشة / سريعة التلف) لأن أوراق البردي القديمة تكون رقيقة وقابلة للتلف والكسر بسهولة وتتطلب عناية بالغة."
        },
        {
            "id": 5,
            "question": "The discovery was ............ because the tomb had remained untouched for centuries.",
            "options": ["remarkable", "submerged", "neighbouring", "sealed"],
            "correct": 0,
            "explanation": "نختار remarkable (مدهش / لافت للنظر) لوصف الاكتشاف الاستثنائي لبقاء المقبرة سليمة ومغلقة لآلاف السنين."
        },
        {
            "id": 6,
            "question": "The archaeological team kept careful ............ of the tomb using notes, photos, and videos.",
            "options": ["outlet", "accuracy", "specialist", "documentation"],
            "correct": 3,
            "explanation": "نختار documentation (توثيق) لأن تسجيل الموقع بالصور والملاحظات والفيديو هو عملية التوثيق الأثري الدقيق."
        },
        {
            "id": 7,
            "question": "'A football website reported that a match ended 3–1, but the official result was 2–1. Readers questioned the accuracy of the website’s information.' Which situation best illustrates 'accuracy'?",
            "options": [
                "A traveler describes a journey in an entertaining way but leaves out several details.",
                "A photographer chooses the brightest picture from a group of similar photos.",
                "A map shows every road name and distance correctly, so drivers can rely on it.",
                "A shop changes its opening hours during a public holiday."
            ],
            "correct": 2,
            "explanation": "الدقة (accuracy) تعني صحة البيانات وخلوها من الأخطاء، وهو ما تجسده الخريطة التي تعرض أسماء الطرق والمسافات بدقة تامة ليعتمد عليها السائقون."
        },
        {
            "id": 8,
            "question": "'Before selling an old family house, the owners collected previous contracts. This documentation helped show how the property had changed over the years.' Which situation best reflects 'documentation'?",
            "options": [
                "A traveler tells relatives about a memorable holiday after returning home.",
                "A sports club keeps signed forms, match records, and dated reports from each season.",
                "A family replaces old furniture before guests arrive for a celebration.",
                "A visitor chooses several favorite pictures from an exhibition."
            ],
            "correct": 1,
            "explanation": "التوثيق (documentation) هو حفظ الأدلة والسجلات الرسمية المؤرخة، مثل احتفاظ النادي بالاستمارات وسجلات المباريات والتقارير."
        },
        {
            "id": 9,
            "question": "'The old photograph had become fragile with age, so its edges tore when someone handled it carelessly.' Which situation best reflects 'fragile'?",
            "options": [
                "A thick travel bag remains undamaged after being dropped several times.",
                "A very old paper letter begins to tear when it is unfolded too roughly.",
                "A heavy wooden door needs two people to lift it from its frame.",
                "A rubber ball changes shape when pressed but returns to normal."
            ],
            "correct": 1,
            "explanation": "الهشاشة (fragile) تعني قابلية الشيء للتلف والتمزق السريع عند التعامل معه بقسوة، مثل خطاب ورقي قديم يتمزق بمجرد فرده."
        },
        {
            "id": 10,
            "question": "'Despite being only twelve years old, Salma completed a detailed painting that visitors thought had been made by an experienced artist. Her achievement was remarkable.' Which situation best illustrates 'remarkable'?",
            "options": [
                "A singer performs a familiar song correctly at a family celebration.",
                "A cyclist finishes a normal daily ride at his usual pace.",
                "A young inventor creates a simple device that helps an entire country save water.",
                "A baker prepares the same type of bread that he makes every morning."
            ],
            "correct": 2,
            "explanation": "الإنجاز اللافت والمدهش (remarkable) هو الأمر الاستثنائي وغير المعتاد، مثل ابتكار مخترع صغير لجهاز يوفر المياه لدولة كاملة."
        },
        {
            "id": 11,
            "question": "'After the boat sank near the shore, most of it remained submerged, with only a small part visible above the surface.' Which situation best demonstrates 'submerged'?",
            "options": [
                "A bicycle is left outside during heavy rain and becomes completely wet.",
                "A box is placed beneath a bed so that it cannot be seen easily.",
                "A swimmer stands in shallow water that reaches only to his knees.",
                "A fallen car lies beneath floodwater so that only its roof can still be seen."
            ],
            "correct": 3,
            "explanation": "المغمور (submerged) يعني المتواري تحت سطح الماء، مثل سيارة غارقة في مياه الفيضان ولا يظهر منها سوى سقفها فقط."
        },
        {
            "id": 12,
            "question": "A part of the interview was shared ............, so it changed the speaker's intended meaning.",
            "options": ["by accident", "out of context", "in advance", "on purpose"],
            "correct": 1,
            "explanation": "المصطلح out of context يعني 'خارج السياق'، ومشاركة الكلام مجتزأً خارج سياقه يغير المعنى المقصود للمتحدث."
        },
        {
            "id": 13,
            "question": "Adding bright curtains can ............ a dark room into a cheerful place.",
            "options": ["uncover", "document", "photograph", "transform"],
            "correct": 3,
            "explanation": "الفعل transform يعني 'يحول / يغير جذرياً'، واستخدام الستائر الفاتحة يحول الغرفة المظلمة إلى مكان مبهج."
        },
        {
            "id": 14,
            "question": "Before buying the juice, Rokaya checked that the bottle was still ............ .",
            "options": ["official", "sealed", "royal", "viral"],
            "correct": 1,
            "explanation": "الصفة sealed تعني 'مغلق بإحكام / محكم الإغلاق'، ورقية تأكدت من أن الزجاجة لا تزال مغلقة ومختومة قبل شرائها."
        },
        {
            "id": 15,
            "question": "During the journey, Ahmed used a paper map ............ than a navigation app to compare routes.",
            "options": ["instead", "rather", "alongside", "apart"],
            "correct": 1,
            "explanation": "التركيب هو rather than (بدلاً من / بالأحرى من) ويستخدم للمفاضلة والاختيار."
        },
        {
            "id": 16,
            "question": "During the trip, Aya ............ a rare bird before it flew away.",
            "options": ["posted", "shared", "uncovered", "photographed"],
            "correct": 3,
            "explanation": "نختار photographed (التقطت صورة لـ) لأنها التقطت صورة للطائر النادر قبل أن يطير بعيداً."
        },
        {
            "id": 17,
            "question": "Keeping family photos away from water helps with their ............ .",
            "options": ["preservation", "moderation", "discrimination", "claim"],
            "correct": 0,
            "explanation": "نختار preservation (حفظ / صيانة) لأن إبعاد الصور عن الماء يساعد في الحفاظ عليها وحمايتها من التلف."
        },
        {
            "id": 18,
            "question": "Marwan renewed his library card because it would ............ next month.",
            "options": ["transform", "expire", "uncover", "document"],
            "correct": 1,
            "explanation": "الفعل expire يعني 'تنتهي صلاحيته'، ومروان جدد بطاقته لأن صلاحيتها كانت ستنتهي الشهر القادم."
        },
        {
            "id": 19,
            "question": "Nada used photos and notes to ............ the family celebration for future memories.",
            "options": ["transport", "transform", "uncover", "document"],
            "correct": 3,
            "explanation": "الفعل document يعني 'يوثق ويسجل'، وندى استخدمت الصور لتوثيق الاحتفال العائلي للمستقبل."
        },
        {
            "id": 20,
            "question": "The advert made a/an ............ that the medicine could cure every illness.",
            "options": ["claim", "discovery", "inscription", "heritage"],
            "correct": 0,
            "explanation": "نختار claim (ادعاء / زعم) لأن الإعلان زعم وادعى أن الدواء يشفي جميع الأمراض دون دليل مثبت."
        },
        {
            "id": 21,
            "question": "The club created a page on a social-media ............ for its match updates.",
            "options": ["post", "canal", "platform", "organization"],
            "correct": 2,
            "explanation": "المصطلح هو social-media platform (منصة تواصل اجتماعي) مثل فيسبوك أو إنستغرام أو X."
        },
        {
            "id": 22,
            "question": "We are waiting for a/an ............ announcement from the transport company.",
            "options": ["pandemic", "official", "royal", "viral"],
            "correct": 1,
            "explanation": "نختار official announcement (بيان رسمي / إعلان رسمي) صادر عن جهة معتمدة مسؤولة."
        },
        {
            "id": 23,
            "question": "Your funny video became ............ ; thousands of people shared it.",
            "options": ["academic", "royal", "official", "viral"],
            "correct": 3,
            "explanation": "المصطلح became viral (أصبح فيروسي الانتشار / تريند) يعبر عن انتشار الفيديو على نطاق واسع جداً بين آلاف المستخدمين."
        },
        {
            "id": 24,
            "question": "This crown is ............ ; it once belonged to a king.",
            "options": ["official", "sealed", "royal", "viral"],
            "correct": 2,
            "explanation": "الصفة royal تعني 'ملكي'، والتاج ملكي لأنه كان يخص أحد الملوك القدماء."
        },
        {
            "id": 25,
            "question": "The old mosque is part of the town's ............ and must be protected.",
            "options": ["inscription", "preservation", "claim", "heritage"],
            "correct": 3,
            "explanation": "كلمة heritage تعني 'تراث'، والمسجد التاريخي جزء لا يتجزأ من تراث المدينة الواجب حمايته."
        },
        {
            "id": 26,
            "question": "The page uses ............ to remove harmful comments before they appear.",
            "options": ["moderation", "preservation", "documentation", "organization"],
            "correct": 0,
            "explanation": "كلمة moderation تعني 'الإشراف على المحتوى / الرقابة والتنقية' لحذف التعليقات المسيئة والضارة تلقائياً."
        },
        {
            "id": 27,
            "question": "Visitors read the ............ carved into the stone, which gave the ruler's name.",
            "options": ["claim", "journal", "inscription", "documentation"],
            "correct": 2,
            "explanation": "كلمة inscription تعني 'نقش كتابي منحوت' على الحجر أو الجدران لتخليد اسم الحاكم."
        },
        {
            "id": 28,
            "question": "While digging in the garden, Hossam ............ a six-kilogram block of gold.",
            "options": ["uncovered", "transformed", "documented", "photographed"],
            "correct": 0,
            "explanation": "الفعل uncovered يعني 'كشف عن / أزاح التراب عن'، وهو المناسب لعثور حسام على سبيكة الذهب أثناء الحفر."
        },
        {
            "id": 29,
            "question": "Which benefit of social media is explicitly mentioned in the reading passage?",
            "options": [
                "It completely prevents inaccurate posts.",
                "It allows people to see discoveries within hours.",
                "It guarantees every image is preserved forever for users.",
                "It replaces academic documentation."
            ],
            "correct": 1,
            "explanation": "وفقاً لما ورد بنص القراءة في كتاب المعاصر (ص 286)، فإن الفائدة الصريحة للسوشيال ميديا هي إتاحة رؤية الاكتشافات ومشاركتها مع الملايين في غضون ساعات (within hours)."
        },
        {
            "id": 30,
            "question": "Which sentence would work BEST as the lead of a news report about a newly discovered tomb?",
            "options": [
                "Experts believe the tomb may contain important objects from ancient Egypt.",
                "In the past, many archaeological discoveries took years to examine fully.",
                "Archaeologists discovered an ancient tomb near Luxor on Monday during work at a historical site.",
                "More information about the discovery is expected to be announced soon."
            ],
            "correct": 2,
            "explanation": "مقدمة التقرير الخبري (Lead) هي الجملة الافتتاحية التي تجيب بدقة وإيجاز عن: ماذا حدث؟ أين؟ متى؟ (discovered an ancient tomb near Luxor on Monday)."
        }
    ]
}

js_content = f"/**\n * Secondary 2 - Unit 3 - Lessons 3.4 & 3.5 Data Store\n * 'Social Media and Historical Events'\n * Strictly Vocabulary, Definitions, Collocations, Expressions, Reading Passage & 30-Question Quiz.\n * ZERO GRAMMAR as requested.\n */\n\nwindow.lessonData = {json.dumps(lesson_data, ensure_ascii=False, indent=4)};\n"

output_path = r"c:\Users\Al700t\OneDrive\Desktop\Learn_English\Sec_2\unit-3\lesson-3-4.data.js"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully generated {output_path} with {len(lesson_data['quiz'])} questions.")
