import json
import os

lesson_data = {
    "id": "sec1-u2-l45",
    "stage": "sec1",
    "unit": 2,
    "lesson": "4 & 5",
    "title": "Lessons 4 & 5: Serving in Danger & Show, Don't Just Tell",
    "description": "المفردات الأساسية والتراكمية، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، مهارة كتابة المقال الوصفي (Descriptive Essay)، القصة 3D، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)",

    "keyVocabulary": [
        { "word": "emergency", "partOfSpeech": "n", "arabic": "حالة طوارئ", "example": "In case of emergency, call the ambulance immediately." },
        { "word": "obligation", "partOfSpeech": "n", "arabic": "التزام - إلزام - واجب", "example": "Citizens have a moral obligation to protect their country." },
        { "word": "obligatory", "partOfSpeech": "adj", "arabic": "إلزامي - وجوبي", "example": "Wearing a seatbelt while driving is obligatory by law." },
        { "word": "protect", "partOfSpeech": "v", "arabic": "يحمي - يحافظ على", "example": "Firefighters risk their own lives to protect people from danger." },
        { "word": "rescue", "partOfSpeech": "v / n", "arabic": "يُنقذ - يُخلّص / عملية إنقاذ", "example": "The brave lifeguard managed to rescue the boy from drowning." },
        { "word": "risk", "partOfSpeech": "v / n", "arabic": "يُخاطر / مخاطرة - مجازفة", "example": "Doctors and nurses often risk their health to save sick patients." },
        { "word": "risky", "partOfSpeech": "adj", "arabic": "خطير - محتمل الخطورة", "example": "Driving in dense fog is extremely risky." },
        { "word": "trust", "partOfSpeech": "v / n", "arabic": "يثق بـ / ثقة", "example": "You can always trust true friends in times of hardship." }
    ],

    "accumulativeVocabulary": [
        { "word": "act", "partOfSpeech": "v", "arabic": "يتصرف - يعمل", "example": "Emergency teams must act swiftly when a fire breaks out." },
        { "word": "aspect", "partOfSpeech": "n", "arabic": "جانب - مظهر", "example": "Each paragraph of a descriptive essay focuses on a different aspect." },
        { "word": "assist", "partOfSpeech": "v", "arabic": "يساعد - يعاون", "example": "Paramedics assist injured people at the accident scene." },
        { "word": "background", "partOfSpeech": "n", "arabic": "خلفية", "example": "Volunteers come from every social and professional background." },
        { "word": "contribution", "partOfSpeech": "n", "arabic": "مساهمة", "example": "His courageous contribution saved several families from the flood." },
        { "word": "cooperate", "partOfSpeech": "v", "arabic": "يتعاون", "example": "Rescue teams must cooperate closely during natural disasters." },
        { "word": "cooperation", "partOfSpeech": "n", "arabic": "تعاون", "example": "Close cooperation between police and civilians ensures public safety." },
        { "word": "damp", "partOfSpeech": "adj", "arabic": "رطب - مبلل قليلاً", "example": "The morning grass was damp with fresh dew." },
        { "word": "debate", "partOfSpeech": "n / v", "arabic": "مناقشة - مناظرة / يناقش", "example": "The students held an engaging debate about community obligations." },
        { "word": "drown", "partOfSpeech": "v", "arabic": "يغرق - يموت غرقاً", "example": "The alert lifeguard jumped into the waves to prevent the child from drowning." },
        { "word": "duty", "partOfSpeech": "n", "arabic": "واجب - مهمة", "example": "It is our shared duty to look after elderly neighbors in winter." },
        { "word": "elderly", "partOfSpeech": "adj", "arabic": "كبير السن - مُسن", "example": "Elderly citizens were evacuated first when the storm hit." },
        { "word": "empathy", "partOfSpeech": "n", "arabic": "تعاطف - مشاركة وجدانية", "example": "Showing empathy to victims of disasters gives them immense comfort." },
        { "word": "employment", "partOfSpeech": "n", "arabic": "عمل - توظيف", "example": "Paid employment offers regular wages, while charity offers spiritual fulfillment." },
        { "word": "essential", "partOfSpeech": "adj", "arabic": "ضروري - جوهري", "example": "Teamwork is an essential skill in every modern workplace." },
        { "word": "financial", "partOfSpeech": "adj", "arabic": "مالي", "example": "The community fund provided financial support to flood victims." },
        { "word": "leadership", "partOfSpeech": "n", "arabic": "قيادة", "example": "Her calm leadership helped the team overcome the crisis." },
        { "word": "lifeguard", "partOfSpeech": "n", "arabic": "مُنقذ سباحة", "example": "The lifeguard warned swimmers not to go beyond the red flag." },
        { "word": "matter", "partOfSpeech": "v", "arabic": "يهم - يكون ذا شأن", "example": "Every small protective measure matters during a major storm." },
        { "word": "moss", "partOfSpeech": "n", "arabic": "طحلب", "example": "Green moss covered the old stone walls near the river." },
        { "word": "motivation", "partOfSpeech": "n", "arabic": "دافع - تحفيز", "example": "Saving lives is the highest motivation for paramedics." },
        { "word": "overall", "partOfSpeech": "adj", "arabic": "إجمالي - شامل - عام", "example": "The concluding paragraph presents the writer's overall feeling." },
        { "word": "paid", "partOfSpeech": "adj", "arabic": "مدفوع الأجر", "example": "Unlike volunteer tasks, regular jobs are paid." },
        { "word": "participate", "partOfSpeech": "v", "arabic": "يشارك", "example": "Thousands participate in disaster preparedness drills." },
        { "word": "patience", "partOfSpeech": "n", "arabic": "صبر", "example": "Search and rescue operations require extreme patience." },
        { "word": "pine needle", "partOfSpeech": "n", "arabic": "شوكة الصنوبر (إبرة)", "example": "Dry pine needles on the forest floor caught fire rapidly." },
        { "word": "practical", "partOfSpeech": "adj", "arabic": "عملي - تطبيقي", "example": "The firefighters gave practical demonstrations on using fire extinguishers." },
        { "word": "problem-solving", "partOfSpeech": "n", "arabic": "حل المشكلات", "example": "In dangerous emergencies, rapid problem-solving is vital." },
        { "word": "put out", "partOfSpeech": "v phr", "arabic": "يُطفئ - يُخمد", "example": "Firefighters worked for five hours to put out the warehouse blaze." },
        { "word": "retired", "partOfSpeech": "adj", "arabic": "متقاعد", "example": "The retired firefighter volunteered to teach safety courses at school." },
        { "word": "reward", "partOfSpeech": "n", "arabic": "مكافأة - جزاء", "example": "The greatest reward for a rescuer is seeing victims safe." },
        { "word": "rustling", "partOfSpeech": "n", "arabic": "حفيف أوراق الشجر", "example": "The gentle rustling of leaves broke the nighttime silence." },
        { "word": "satisfaction", "partOfSpeech": "n", "arabic": "رضا - قناعة", "example": "Rescuing a trapped kitten gave the boy deep satisfaction." },
        { "word": "scenario", "partOfSpeech": "n", "arabic": "سيناريو - موقف تخيلي", "example": "Rescue teams train for every possible disaster scenario." },
        { "word": "strengthen", "partOfSpeech": "v", "arabic": "يقوي - يعزز", "example": "Working together in times of danger strengthens community solidarity." },
        { "word": "texture", "partOfSpeech": "n", "arabic": "ملمس - نسيج", "example": "The rough texture of the tree bark gave a vivid sensory image." },
        { "word": "trap", "partOfSpeech": "v", "arabic": "يحبس - يصطاد", "example": "Several residents were trapped inside the smoke-filled building." },
        { "word": "unlike", "partOfSpeech": "prep", "arabic": "بخلاف - على عكس", "example": "Unlike ordinary citizens, emergency personnel run towards danger." },
        { "word": "valuable", "partOfSpeech": "adj", "arabic": "قيّم - ذو قيمة عالية", "example": "Lifeguards provide valuable protection along crowded public beaches." }
    ],

    "definitions": [
        {
            "word": "emergency",
            "defEn": "A sudden, unexpected, and dangerous situation requiring immediate action.",
            "defAr": "حالة طارئة ومفاجئة وخطيرة تتطلب تدخلاً فورياً وسريعاً."
        },
        {
            "word": "obligation",
            "defEn": "Something that you must do because it is your duty, a law, or a moral promise.",
            "defAr": "التزام أو واجب يتعين عليك فعله بموجب القانون أو الأخلاق."
        },
        {
            "word": "protect",
            "defEn": "To keep someone or something safe from harm, damage, injury, or loss.",
            "defAr": "حماية شخص أو شيء والحفاظ على سلامته من الأذى والضرر."
        },
        {
            "word": "rescue",
            "defEn": "To save someone or something from danger, harm, imprisonment, or death.",
            "defAr": "إنقاذ وتخليص شخص أو كائن من خطر أو أسر أو موت محقق."
        },
        {
            "word": "risk (n / v)",
            "defEn": "The chance of something bad happening; to do something that might have a dangerous result.",
            "defAr": "احتمال حدوث أمر سيئ؛ أو الإقدام على فعل محفوف بالمخاطر."
        },
        {
            "word": "risky",
            "defEn": "Involving the possibility of danger, failure, harm, or unpleasant consequences.",
            "defAr": "محفوف بالمخاطر والتهديدات، وغير آمن."
        },
        {
            "word": "trust",
            "defEn": "To firmly believe in the honesty, reliability, or ability of someone or something.",
            "defAr": "الإيمان التام بصدق أو كفاءة أو أمانة شخص أو جهة ما."
        }
    ],

    "synonyms": [
        { "word": "emergency", "syns": ["crisis", "urgent situation", "dangerous situation"], "meaning": "أزمة / حالة طوارئ / ظرف عاجل" },
        { "word": "obligation", "syns": ["duty", "responsibility", "commitment"], "meaning": "واجب / التزام / مسؤولية" },
        { "word": "protect", "syns": ["keep safe", "defend", "guard", "shield"], "meaning": "يحمي / يدافع عن / يحرس" },
        { "word": "rescue", "syns": ["save", "free", "deliver", "extricate"], "meaning": "ينقذ / يخلّص / يحرر" },
        { "word": "risky", "syns": ["dangerous", "unsafe", "hazardous", "harmful"], "meaning": "خطير / غير آمن / مجازف" },
        { "word": "trust", "syns": ["believe in", "rely on", "have confidence in"], "meaning": "يثق بـ / يعتمد على" }
    ],

    "antonyms": [
        { "word": "emergency", "ants": ["normal situation", "calm situation", "safety"], "meaning": "موقف عادي / هدوء / أمان" },
        { "word": "obligation", "ants": ["choice", "option", "freedom"], "meaning": "حرية / اختيار / خيار متاح" },
        { "word": "protect", "ants": ["endanger", "harm", "expose", "damage"], "meaning": "يعرّض للخطر / يؤذي / يضر" },
        { "word": "rescue", "ants": ["abandon", "leave", "endanger"], "meaning": "يتخلى عن / يترك لمصيره" },
        { "word": "risky", "ants": ["safe", "secure", "harmless"], "meaning": "آمن / مضمون / غير ضار" },
        { "word": "trust", "ants": ["distrust", "doubt", "suspect"], "meaning": "يشك / يرتاب / لا يثق" }
    ],

    "collocations": [
        { "phrase": "believe in obligation", "arabic": "يؤمن بالواجب والالتزام", "example": "Civil servants believe in the obligation to serve the public." },
        { "phrase": "bring joy and comfort", "arabic": "يجلب السعادة والراحة", "example": "Rescuing trapped pets brings joy and comfort to families." },
        { "phrase": "build understanding and respect", "arabic": "يبني التفاهم والاحترام", "example": "Cooperation in crisis builds understanding and respect among neighbors." },
        { "phrase": "create pride and motivation", "arabic": "يخلق الفخر والتحفيز", "example": "Saving human lives creates immense pride and motivation." },
        { "phrase": "develop empathy and patience", "arabic": "ينمي التعاطف والصبر", "example": "Emergency volunteers develop empathy and patience during distress calls." },
        { "phrase": "do work freely", "arabic": "يقوم بالعمل طواعية", "example": "Lifeguard volunteers do their work freely during beach holidays." },
        { "phrase": "do a job", "arabic": "يؤدي عملاً / وظيفة", "example": "Firefighters do a difficult and hazardous job." },
        { "phrase": "lose lives", "arabic": "يفقد أرواحاً", "example": "Without prompt rescue, many people would lose their lives in floods." },
        { "phrase": "put out fires", "arabic": "يُطفئ الحرائق", "example": "Fire crews rushed to the scene to put out the fires quickly." },
        { "phrase": "save lives", "arabic": "ينقذ الأرواح", "example": "Vaccines and emergency rescue teams save millions of lives each year." },
        { "phrase": "share experiences", "arabic": "يشارك التجارب", "example": "Veteran rescuers shared their experiences with novice trainees." },
        { "phrase": "strengthen social connections", "arabic": "يقوي الروابط الاجتماعية", "example": "Volunteering during neighborhood crises strengthens social connections." },
        { "phrase": "take action", "arabic": "يتخذ إجراءً سريعاً", "example": "When smoke was detected, the security guard took immediate action." }
    ],

    "expressions": [
        { "phrase": "be worth every risk", "arabic": "يستحق كل مخاطرة", "example": "Saving the trapped baby was definitely worth every risk." },
        { "phrase": "elderly patients", "arabic": "المرضى كبار السن", "example": "Ambulances gave priority to elderly patients during the power cut." },
        { "phrase": "in the middle of the night", "arabic": "في منتصف الليل", "example": "The emergency siren sounded loudly in the middle of the night." },
        { "phrase": "make it hard to", "arabic": "يجعل من الصعب أن", "example": "Heavy black smoke made it hard to breathe inside the corridor." },
        { "phrase": "measured in money", "arabic": "يُقاس بالمال", "example": "The value of human courage can never be measured in money." },
        { "phrase": "no matter the cost", "arabic": "مهما كان الثمن أو التكلفة", "example": "They resolved to save the stranded mountain climbers no matter the cost." },
        { "phrase": "of all ages", "arabic": "من جميع الأعمار", "example": "Volunteers of all ages rallied to distribute emergency flood supplies." },
        { "phrase": "paid employment", "arabic": "عمل مدفوع الأجر", "example": "Some citizens balanced paid employment with nighttime volunteer firefighting." },
        { "phrase": "personal satisfaction", "arabic": "رضا وقناعة شخصية", "example": "Pulling a victim safely from the wreck brings deep personal satisfaction." },
        { "phrase": "practical skills", "arabic": "مهارات عملية", "example": "First-aid training equips ordinary people with practical lifesaving skills." },
        { "phrase": "retired professionals", "arabic": "متخصصون متقاعدون", "example": "Retired doctors returned to assist local clinics during the health crisis." },
        { "phrase": "see lives lost", "arabic": "يرى أرواحاً تُفقد", "example": "Rescuers hate to see lives lost when preventative action was possible." },
        { "phrase": "stay with ... forever", "arabic": "يبقى مع ... إلى الأبد (أثر لا يُنسى)", "example": "The memory of that dramatic rescue will stay with him forever." },
        { "phrase": "their actions matter", "arabic": "تصرفاتهم وأفعالهم لها وزن وقيمة", "example": "Citizens realized that their quick alert actions truly matter." }
    ],

    "prepositions": [
        { "verb": "work as", "arabic": "يعمل كـ", "example": "He decided to work as a volunteer lifeguard during the summer." },
        { "verb": "put out", "arabic": "يُطفئ", "example": "Please put out your camp fire before leaving the forest." },
        { "verb": "rescue ... from", "arabic": "يُنقذ ... من", "example": "The helicopter rescued four fishermen from the sinking boat." },
        { "verb": "trap (...) in", "arabic": "يحبس / يحتجز في", "example": "Several shoppers were trapped in the elevator when electricity failed." },
        { "verb": "believe in", "arabic": "يؤمن بـ", "example": "Heroic citizens believe in serving others without selfish motives." },
        { "verb": "participate in", "arabic": "يشارك في", "example": "School students participate in emergency fire safety evacuation drills." }
    ],

    "derivatives": [
        { "word": "obligation", "verb": "oblige (يُلزم / يفرض)", "noun": "obligation (التزام / واجب)", "adjective": "obligatory / obliged (إلزامي / مُلزم)", "adverb": "obligatorily (بشكل إلزامي)" },
        { "word": "protect", "verb": "protect (يحمي)", "noun": "protection (حماية)", "adjective": "protected / protective (محمي / وقائي)", "adverb": "protectively (بوقائية / بحماية)" },
        { "word": "rescue", "verb": "rescue (ينقذ)", "noun": "rescue / rescuer (إنقاذ / مُنقذ)", "adjective": "rescuable (قابل للإنقاذ)", "adverb": "-" },
        { "word": "risk", "verb": "risk (يخاطر)", "noun": "risk (مخاطرة)", "adjective": "risky (خطير / مجازف)", "adverb": "-" },
        { "word": "trust", "verb": "trust / mistrust (يثق / لا يثق)", "noun": "trust / mistrust (ثقة / ريبة)", "adjective": "trusted / trustworthy (موثوق به)", "adverb": "trustingly (بثقة)" }
    ],

    "clearConfusion": [
        {
            "term": "Sentence Adverb (ظرف الجملة)",
            "explanation": "ظرف يصف الجملة بأكملها وليس الفعل فقط، ويُعبر عن موقف المتكلم أو رأيه أو تعليقه على الحدث (يُفصل عادة بفاصلة في بداية الجملة).",
            "examples": [
                "Certainly, she will pass the driving test.",
                "In fact, nobody knew the answer to that question.",
                "Unfortunately, the football match was cancelled due to heavy rain.",
                "Honestly, I don't like horror films.",
                "Luckily, everyone was safe after the fire."
            ]
        },
        {
            "term": "argue for vs. argue against",
            "explanation": "argue for يعني يدافع عن فكرة أو يجادل لصالحها، بينما argue against يعني يعارض فكرة ويجادل ضدها.",
            "examples": [
                "The students argued for longer school breaks. (دافعوا عن / طالبوا بـ)",
                "The teacher argued against using smartphones during class. (عارض / جادل ضد)"
            ]
        },
        {
            "term": "put out vs. turn off",
            "explanation": "put out يُستخدم لإطفاء النار أو اللهب أو السيجارة أو الشمعة، بينما turn off يُستخدم لإطفاء الأجهزة الكهربائية أو الإضاءة.",
            "examples": [
                "Please, put out the cigarette. We are in a public building.",
                "Don't forget to turn off the computer and lights before you leave."
            ]
        },
        {
            "term": "each other vs. one another",
            "explanation": "each other تُستخدم للإشارة إلى تبادل الفعل بين اثنين (أحدهما الآخر)، بينما one another تُستخدم عادة للإشارة إلى أكثر من اثنين (بعضهم البعض).",
            "examples": [
                "The two friends looked at each other and smiled.",
                "Members of the rescue squad support one another during crises."
            ]
        }
    ],

    "writingSkills": {
        "title": "A Descriptive Essay (المقال الوصفي)",
        "arabicTitle": "مهارة كتابة المقال الوصفي (Show, Don't Just Tell)",
        "overview": {
            "title": "ما هو المقال الوصفي؟ (What is a Descriptive Essay?)",
            "definition": "A descriptive essay is a piece of writing where you use words to create a vivid picture for the reader. It is like painting a picture, but with words instead of paint! You describe a person, place, object, or experience in a way that makes the reader feel like they are right there.",
            "keyFeatures": [
                { "title": "👁️ الحواس الخمس (Uses the 5 Senses)", "desc": "يصف الكاتب ما يمكن رؤيته، سماعه، شمه، تذوقه، ولمسه (sight, hearing, smell, taste, touch)." },
                { "title": "🎨 تفاصيل دقيقة (Vivid Details)", "desc": "يحتوي على أوصاف دقيقة وتصويرية حية تبتعد عن التعميم المجرّد." },
                { "title": "🧠 صورة ذهنية (Picture in the Mind)", "desc": "الهدف الأساسي هو جعل القارئ يعيش التجربة وكأنه موجود داخل المشهد عبر الكلمات." },
                { "title": "🎯 التركيز على موضوع رئيسي", "desc": "يركز المقال عادة على وصف شخص واحد، مكان محدد، شيء معين، أو تجربة شعورية فريدة." }
            ]
        },
        "structure": [
            {
                "name": "1. Introduction (المقدمة)",
                "purpose": "التمهيد وتقديم الشخص أو المكان أو الشيء المراد وصفه",
                "details": "Start by introducing the person, place, or thing you will describe. Give a general idea of why it is important to you and catch the reader's attention with a compelling hook.",
                "components": [
                    { "name": "Hook (جملة جذب الانتباه)", "purpose": "A captivating sentence that grabs the reader's attention.", "examples": ["Assuit's quiet countryside holds a treasure unlike any modern city."] },
                    { "name": "General Idea (الفكرة العامة)", "purpose": "Explains what is being described and why it matters to the writer.", "examples": ["My grandpa's house is a peaceful haven of warmth and childhood memories."] }
                ]
            },
            {
                "name": "2. Body Paragraphs (فقرات متن الموضوع)",
                "purpose": "فصل جوانب الوصف وتوظيف الحواس المختلفة بالتفصيل",
                "details": "Consists of two or more paragraphs. Each body paragraph focuses on a different aspect or sense (e.g., what you see, hear, smell, feel, or taste).",
                "components": [
                    { "name": "Aspect 1: Sights & Architecture (المظهر والبناء)", "purpose": "Describing colors, textures, and structures.", "examples": ["Old mud bricks keep it cool in summer, surrounded by wide green fields."] },
                    { "name": "Aspect 2: Sounds & Scents (الأصوات والروائح)", "purpose": "Engaging hearing and smell with sensory details.", "examples": ["Birds sing merrily in the trees; the aroma of fresh bread fills the morning air."] }
                ]
            },
            {
                "name": "3. Conclusion (الخاتمة)",
                "purpose": "تلخيص الأفكار الرئيسية والتعبير عن الشعور العام",
                "details": "Finish by summarizing the main points and sharing your overall feeling and emotional connection towards the subject.",
                "components": [
                    { "name": "Summary (تلخيص)", "purpose": "Restates the essence of the place or person without repeating words identically.", "examples": ["In short, this humble countryside house embodies simplicity and tradition."] },
                    { "name": "Overall Feeling (الشعور العام)", "purpose": "Leaves a lasting emotional impression.", "examples": ["To me, my grandpa's house will always feel like a warm hug of pure love."] }
                ]
            }
        ],
        "linkingWords": [
            {
                "category": "Describing Sights (البصر والرؤية)",
                "functionAr": "كلمات تصف الألوان والأشكال والمظهر الخارجي",
                "words": ["spacious", "mud-brick", "gleaming", "shadowy", "towering", "wide green fields"],
                "example": "The house is made of old mud bricks with a flat roof.",
                "exampleAr": "المنزل مصنوع من طوب اللبن القديم بسقف مستوٍ."
            },
            {
                "category": "Describing Sounds (السمع والأصوات)",
                "functionAr": "كلمات تصف الأصوات المحيطة والنغمات",
                "words": ["rustling leaves", "chirping birds", "roaring blaze", "gentle whisper", "crackling fire"],
                "example": "The rustling of dry pine needles alerted the forest rangers.",
                "exampleAr": "نبّه حفيف شوك الصنوبر الجاف حراس الغابة."
            },
            {
                "category": "Describing Touch & Texture (اللمس والملمس)",
                "functionAr": "كلمات تصف ملمس الأشياء ودرجة الحرارة",
                "words": ["damp", "rough bark", "warm breeze", "silky", "sharp needle", "icy water"],
                "example": "The damp morning air carried the scent of wet soil and pine needles.",
                "exampleAr": "حمل هواء الصباح الرطب عبير التربة المبللة وإبر الصنوبر."
            }
        ],
        "sampleEssay": {
            "title": "Model Essay: My Grandpa's House (منزل جدي)",
            "paragraphs": [
                {
                    "type": "Introduction (المقدمة)",
                    "note": "تقديم المكان وتحديد موقعه وأهميته النفسية",
                    "textEn": "My grandpa's house is in the countryside of Assuit, far from the noise of the city. The road to his home passes through wide green farms and fields filled with crops. My grandpa's house is a place full of charm with a simple design inside and a peaceful atmosphere.",
                    "textAr": "يقع منزل جدي في ريف أسيوط، بعيداً عن صخب وضوضاء المدينة. ويمر الطريق المؤدي إلى بيته عبر مزارع خضراء فسيحة وحقول عامرة بالمحاصيل. إن منزل جدي مكان يفيض بالسحر والتألق، بتصميم داخلي بسيط وأجواء تغمرها السكينة والسلام."
                },
                {
                    "type": "Body Paragraph 1 (الوصف المعماري والبصري)",
                    "note": "التركيز على حاسة البصر ومواد البناء والحيوانات",
                    "textEn": "The house itself is simple but special. It is made of old mud bricks that keep it cool in the summer and warm in the winter. The walls are thick and brown, and the roof is flat. There are chickens and goats living in the yard, and sometimes a cat sleeps quietly by the door.",
                    "textAr": "المنزل في حد ذاته بسيط ولكنه مميز للغاية؛ فهو مبني من طوب اللبن القديم الذي يحفظ برودته في الصيف ودفئه في الشتاء. وجدرانه سميكة بنية اللون، وسقفه مسطح. وتعيش الدجاجات والماعز في فناء الدار، وأحياناً تنام قطة بوداعة وهدوء جوار الباب."
                },
                {
                    "type": "Body Paragraph 2 (الأصوات والروائح وحفاوة الجد)",
                    "note": "توظيف حواس السمع والشم والتذوق وكرم الضيافة",
                    "textEn": "In the morning, birds sing in the trees near the house, and their songs fill the air with happiness. My grandpa always wakes up early and feeds the animals before breakfast. The best thing about my grandpa's house is his generosity. He welcomes everyone with a warm smile and always shares fresh bread, fruit, and hot tea with his guests.",
                    "textAr": "في الصباح الباكر، تغرد العصافير في الأشجار المحيطة بالمنزل، فتملأ ألحانها الأجواء بهجة وسروراً. ويستيقظ جدي دائماً مبكراً ليطعم الحيوانات قبل الإفطار. وأروع ما يميز منزل جدي هو كرمه الحاتمي؛ إذ يرحب بالجميع بابتسامة مشرقة ويشارك ضيوفه دائماً الخبز الساخن الطازج والفاكهة والشاي اللذيذ."
                },
                {
                    "type": "Conclusion (الخاتمة والانطباع العام)",
                    "note": "تلخيص المشاعر العامة والخاطرة الوجدانية المؤثرة",
                    "textEn": "To me, his house feels warm, friendly, and full of love. It is not just a building of clay and wood, but a living sanctuary where I always feel safe, peaceful, and deeply connected to my roots.",
                    "textAr": "بالنسبة لي، ينبض بيته بالدفء والمودة وتغمره مشاعر الحب الصادق. إنه ليس مجرد بناء من الطين والخشب، بل هو ملاذ حي أشعر فيه دائماً بالأمان والسكينة والارتباط الوثيق بجذوري وأصالتي."
                }
            ]
        },
        "examTips": [
            {
                "title": "A descriptive essay uses words to create a picture for the reader",
                "rule": "الهدف الأساسي للمقال الوصفي هو رسم صورة تخيلية في ذهن القارئ (like painting a picture with words).",
                "example": "Q: What is the main goal of a descriptive essay? -> To describe a person, place, object, or experience in detail."
            },
            {
                "title": "Sensory Details & The 5 Senses",
                "rule": "المقال الوصفي المميز يعتمد على توظيف الحواس الخمس (sight, hearing, smell, taste, touch) وليس مجرد إعطاء حقائق جافة.",
                "example": "Q: What should a descriptive essay include to make it vivid? -> Sensory details and imagery."
            },
            {
                "title": "Role of the Introduction vs. Conclusion",
                "rule": "في المقدمة تعطي فكرة عامة عن الشيء الموصوف وسبب أهميته (give a general idea), بينما في الخاتمة تلخص الأفكار وتعبر عن الشعور العام (summarize main ideas & overall feeling).",
                "example": "Q: Which section summarizes main points? -> Conclusion. Q: Where is the general idea introduced? -> Introduction."
            },
            {
                "title": "Topic Sentence & Hook",
                "rule": "الـ Topic Sentence هي الجملة التي تعبر عن الفكرة الرئيسية للفقرة (states the main idea of the paragraph)، بينما الـ Hook في المقدمة يهدف إلى جذب انتباه القارئ (grabs the reader's attention).",
                "example": "Q: What is a topic sentence? -> A sentence that states the main idea of the paragraph."
            }
        ]
    },

    "storyPages": [
        {
            "title": "The Beach Emergency",
            "badge": "Scene 1 • Swift Action at Sea",
            "caption": "Lifeguard Youssef rescues a child from dangerous waves",
            "image": "../../assets/images/gem_museum.webp",
            "textEn": "It was a scorching summer afternoon along the Alexandria coastline. Ten-year-old Ziad was playing with a colorful beach ball when a sudden rogue current dragged him into deep water. He began to splash frantically, unable to stay afloat. On the wooden observation tower stood Youssef, a trained lifeguard who believed protecting swimmers was his moral obligation. The moment he spotted the emergency, Youssef blew his whistle and plunged into the churning sea. Swimming against powerful waves was risky, but Youssef knew that hesitation meant losing a precious life. Within moments, he reached the terrified child and safely towed him back to the sandy shore.",
            "translation": "كانت ظهيرة صيفية شديدة الحرارة على ساحل الإسكندرية. كان زياد، وهو طفل في العاشرة من عمره، يلعب بكرة شاطئية ملونة حين جرفه تيار مائي مفاجئ وعنيف إلى المياه العميقة. أخذ يتخبط مذعوراً غير قادر على البقاء فوق سطح الماء. وعلى برج المراقبة الخشبي، كان يقف يوسف، وهو منقذ سباحة مدرب يؤمن بأن حماية المصطافين التزام وواجب أخلاقي مقدس. وفي اللحظة التي لمح فيها حالة الطوارئ، أطلق يوسف صفارته وقفز بقوة في البحر المتلاطم. كانت السباحة ضد الأمواج العاتية أمراً محفوفاً بالمخاطر، لكن يوسف كان يعلم أن أي تردد قد يؤدي إلى فقدان روح بريئة. وفي غضون لحظات، وصل إلى الطفل المذعور وسحبه بأمان إلى الشاطئ الرملي.",
            "vocabulary": ["emergency", "obligation", "protect", "rescue", "risky", "lifeguard"]
        },
        {
            "title": "Battling the Timber Blaze",
            "badge": "Scene 2 • Firefighters in the Night",
            "caption": "Putting out fires and saving trapped residents through teamwork",
            "image": "../../assets/images/gem_museum.webp",
            "textEn": "Later that autumn, an electrical short sparked a fierce fire inside a historic carpentry workshop in Old Cairo. In the middle of the night, thick black smoke billowed into the narrow alleys, trapping an elderly couple on the second floor. Captain Hazem and his squad arrived within minutes. The heavy smoke made it hard to breathe, and dry wooden planks threatened to collapse. Demonstrating remarkable teamwork and problem-solving, two firefighters operated the high-pressure hoses to put out the raging flames, while Hazem climbed the rescue ladder to carry the elderly residents out. Their courage proved that serving the community in times of danger is worth every risk.",
            "translation": "وفي وقت لاحق من ذلك الخريف، أدى ماس كهربائي إلى نشوب حريق هائل داخل ورشة نجارة تاريخية في القاهرة القديمة. وفي منتصف الليل، تصاعدت سحب الدخان الأسود الكثيف في الأزقة الضيقة، مما أدى إلى احتجاز زوجين مسنين في الطابق الثاني. وصل النقيب حازم وفرقته في غضون دقائق معدودة؛ وكان الدخان الخانق يجعل التنفس عسيراً للغاية، بينما هددت الألواح الخشبية الجافة بالانهيار. ومن خلال تجسيد رائع للعمل الجماعي وحل المشكلات، قام اثنان من الإطفائيين بتشغيل خراطيم المياه ذات الضغط العالي لإخماد النيران، بينما تسلق حازم سلم الإنقاذ لإخراج المسنين بأمان. أثبتت شجاعتهم أن خدمة المجتمع في أوقات الخطر تستحق كل مخاطرة وتضحية.",
            "vocabulary": ["in the middle of the night", "put out fires", "trap", "elderly", "worth every risk", "teamwork"]
        },
        {
            "title": "Trust and Lifelong Brotherhood",
            "badge": "Scene 3 • Unity in Crisis",
            "caption": "Mutual trust and gratitude between rescuers and the community",
            "image": "../../assets/images/gem_museum.webp",
            "textEn": "The following week, the neighborhood council held a gathering to honor Youssef and Captain Hazem's squad. Neighbors from diverse backgrounds embraced each other and thanked the brave men. The incident proved that when people cooperate and trust their emergency services, communities emerge stronger and more united. For Hazem and Youssef, the smiles of the saved victims and the pride of serving their people brought a profound sense of personal satisfaction that no money could ever equal. Their selfless actions showed everyone that true heroes do not seek wealth; they protect lives.",
            "translation": "في الأسبوع التالي، أقام مجلس الحي احتفالية لتكريم يوسف وفرقة النقيب حازم. تعانق الجيران من مختلف الخلفيات وشكروا هؤلاء الأبطال البواسل. أثبتت تلك الحادثة أنه عندما يتعاون الناس ويثقون في أجهزة الطوارئ، يخرج المجتمع أكثر قوة وتماسكاً. وبالنسبة لحازم ويوسف، فإن ابتسامات الضحايا الذين تم إنقاذهم وفخر خدمة وطنهم جلب لهم شعوراً عميقاً بالرضا الشخصي لا يمكن لأي مال في الدنيا أن يضاهيه. لقد أظهرت أفعالهم النبيلة للجميع أن الأبطال الحقيقيين لا يسعون وراء الثراء، بل يحمون الأرواح.",
            "vocabulary": ["trust", "cooperate", "each other", "personal satisfaction", "protect lives"]
        }
    ],

    "dialogue": {
        "title": "Serving in Times of Danger (مواجهة الطوارئ وحماية الآخرين)",
        "characters": {
            "speaker1": { "name": "Youssef", "avatar": "👨‍🚒", "role": "Firefighter & rescue volunteer" },
            "speaker2": { "name": "Salma", "avatar": "👩‍⚕️", "role": "Emergency medical technician" }
        },
        "lines": [
            {
                "speaker": "speaker1",
                "text": "Salma, that apartment fire last night was extremely risky. The thick smoke made it hard to breathe in the corridors.",
                "translation": "سلمى، كان حريق الشقة الليلة الماضية محفوفاً بمخاطر شديدة. لقد جعل الدخان الكثيف التنفس صعباً للغاية في الممرات."
            },
            {
                "speaker": "speaker2",
                "text": "I saw you rushing inside to rescue the elderly couple, Youssef! It was an incredible act of courage.",
                "translation": "لقد رأيتك تهرع إلى الداخل لإنقاذ الزوجين المسنين يا يوسف! لقد كان عملاً بطولياً فائق الشجاعة."
            },
            {
                "speaker": "speaker1",
                "text": "When lives are trapped in danger, you don't hesitate. We believe protecting others is our highest moral obligation.",
                "translation": "عندما تكون الأرواح محاصرة في خطر، لا يمكنك التردد؛ فنحن نؤمن بأن حماية الآخرين هي أسمى التزام وواجب أخلاقي."
            },
            {
                "speaker": "speaker2",
                "text": "True, but how do you and your squad manage fear when faced with such emergencies?",
                "translation": "صحيح، ولكن كيف تسيطر أنت وفريقك على الخوف عند مواجهة مثل هذه الطوارئ الصعبة؟"
            },
            {
                "speaker": "speaker1",
                "text": "It all comes down to trust and teamwork. We trust each other completely and put out fires together safely.",
                "translation": "الأمر كله يعتمد على الثقة والعمل الجماعي؛ فنحن نثق ببعضنا البعض تماماً ونخمد الحرائق معاً بأمان."
            },
            {
                "speaker": "speaker2",
                "text": "Our ambulance team felt the same relief when both residents were safely revived outside. Saving lives is worth every risk!",
                "translation": "فريق الإسعاف لدينا شعر بنفس الارتياح عندما تم إسعاف كلا الساكنين بأمان في الخارج. إن إنقاذ الأرواح يستحق كل مجازفة!"
            }
        ]
    },

    "quiz": [
        {
            "id": 1,
            "question": "In a descriptive essay, we ............ about the thing we are describing in the introduction.",
            "options": ["give detailed information", "focus on different aspects", "give a general idea", "express our final opinion"],
            "correct": 2,
            "explanation": "وفق كتاب المعاصر ص 120 (سؤال 1): في مقدمة المقال الوصفي نعطي فكرة عامة (give a general idea)."
        },
        {
            "id": 2,
            "question": "The main goal of a descriptive essay is to ............ .",
            "options": ["describe a person, place, object, or experience in detail", "tell a fictional story that has a moral", "argue a scientific point to reach a conclusion", "give technical instructions to assemble an engine"],
            "correct": 0,
            "explanation": "كتاب المعاصر ص 120 (سؤال 2): الهدف الأساسي هو وصف شخص، مكان، شيء، أو تجربة بالتفصيل."
        },
        {
            "id": 3,
            "question": "What should a descriptive essay include to make the description vivid and lively?",
            "options": ["Opinions and suggestions only", "Sensory details and imagery", "Only statistical figures", "Long mathematical formulas"],
            "correct": 1,
            "explanation": "كتاب المعاصر ص 120 (سؤال 3): لجعل المقال الوصفي حيوياً وواضحاً نوظف التفاصيل الحسية والصور البلاغية (Sensory details and imagery)."
        },
        {
            "id": 4,
            "question": "To make description clear and paint a picture with words, the writer uses ............ .",
            "options": ["facts only", "the five senses", "questions", "numbers"],
            "correct": 1,
            "explanation": "كتاب المعاصر ص 121 (سؤال 4): يوظف الكاتب الحواس الخمس (the five senses: sight, hearing, smell, taste, touch)."
        },
        {
            "id": 5,
            "question": "The main purpose of the introduction in an essay is to ............ .",
            "options": ["give a detailed summary of the topic", "end the essay in an attractive way", "present what you will describe", "give pieces of advice to readers"],
            "correct": 2,
            "explanation": "كتاب المعاصر ص 121 (سؤال 5): الغرض الأساسي للمقدمة هو تقديم وتحديد ما ستقوم بوصفه (present what you will describe)."
        },
        {
            "id": 6,
            "question": "What is a 'topic sentence' in an essay paragraph?",
            "options": ["A sentence that ends the essay.", "A sentence that states the main idea.", "A sentence found only in the conclusion.", "A sentence that restates the title."],
            "correct": 1,
            "explanation": "كتاب المعاصر ص 121 (سؤال 6): الجملة الرئيسية (Topic sentence) هي الجملة التي تصرح بالفكرة الأساسية للفقرة."
        },
        {
            "id": 7,
            "question": "A/An ............ is an opening sentence that grabs the reader's attention to read the essay.",
            "options": ["handwriting", "hook", "body", "conclusion"],
            "correct": 1,
            "explanation": "كتاب المعاصر ص 121 (سؤال 7): الجملة الجاذبة للانتباه في بداية المقال تُسمى hook (الخطاف)."
        },
        {
            "id": 8,
            "question": "Which section of an essay provides a summary of the main points and overall feeling?",
            "options": ["Body", "Introduction", "Conclusion", "Thesis statement"],
            "correct": 2,
            "explanation": "كتاب المعاصر ص 121 (سؤال 8): الخاتمة (Conclusion) هي التي تقدم تلخيصاً للنقاط والشعور العام."
        },
        {
            "id": 9,
            "question": "The thesis statement of an essay is usually located ............ .",
            "options": ["at the end of the body", "in the middle of the essay", "in the introduction", "in the conclusion only"],
            "correct": 2,
            "explanation": "كتاب المعاصر ص 121 (سؤال 9): جملة الأطروحة (thesis statement) تقع عادة في مقدمة المقال (in the introduction)."
        },
        {
            "id": 10,
            "question": "In a descriptive essay, an 'aspect' means ............ .",
            "options": ["a short summary", "a final conclusion", "one part or feature", "a punctuation mark"],
            "correct": 2,
            "explanation": "كتاب المعاصر ص 121 (سؤال 11): كلمة aspect تعني جانباً أو جزءاً أو سمة محددة من الموضوع (one part or feature)."
        },
        {
            "id": 11,
            "question": "Which of the following is NOT one of the senses used in descriptive essays?",
            "options": ["Sight", "Taste", "Running", "Touch"],
            "correct": 2,
            "explanation": "كتاب المعاصر ص 121 (سؤال 12): Running (الجري) نشاط حركي وليس من الحواس الخمس (Sight, Taste, Touch, Hearing, Smell)."
        },
        {
            "id": 12,
            "question": "In today's fast-changing world, teamwork has become an essential skill in ............ .",
            "options": ["some fields", "no fields", "most fields", "few fields"],
            "correct": 2,
            "explanation": "وفق قطعة القراءة ص 121 (سؤال 1): أصبح العمل الجماعي مهارة جوهرية في معظم المجالات (in most fields / almost every field)."
        },
        {
            "id": 13,
            "question": "Unlike individual work, teamwork allows members to share ideas and ............ responsibilities.",
            "options": ["ignore", "divide", "destroy", "delay"],
            "correct": 1,
            "explanation": "وفق قطعة القراءة ص 121: العمل الجماعي يتيح تقسيم وتوزيع المسؤوليات (divide responsibilities)."
        },
        {
            "id": 14,
            "question": "Working in diverse teams encourages creativity because people bring different ............ .",
            "options": ["languages only", "backgrounds and experiences", "conflicts and fights", "weapons and tools"],
            "correct": 1,
            "explanation": "وفق قطعة القراءة ص 121: تنوع الأعضاء يجلب خلفيات وخبرات متنوعة تثري الابتكار (backgrounds and experiences)."
        },
        {
            "id": 15,
            "question": "A sudden, dangerous situation that requires immediate help is called a/an ............ .",
            "options": ["holiday", "emergency", "celebration", "hobby"],
            "correct": 1,
            "explanation": "تعريف emergency في المعاصر ص 109 هو: a sudden, dangerous situation."
        },
        {
            "id": 16,
            "question": "Wearing a protective helmet at a construction site is ............ by company rules.",
            "options": ["obligatory", "voluntary", "free", "optional"],
            "correct": 0,
            "explanation": "الصفة obligatory تعني 'إلزامي ووجوبي' بموجب اللوائح والقوانين."
        },
        {
            "id": 17,
            "question": "The brave lifeguard jumped into the rough sea to ............ the drowning child.",
            "options": ["sink", "trap", "rescue", "drown"],
            "correct": 2,
            "explanation": "الفعل rescue يعني 'يُنقذ ويخلّص من الغرق'."
        },
        {
            "id": 18,
            "question": "Driving at high speed on a rainy, slippery highway is extremely ............ .",
            "options": ["risky", "safe", "secure", "calm"],
            "correct": 0,
            "explanation": "الصفة risky تعني 'محفوف بالمخاطر وخطير'."
        },
        {
            "id": 19,
            "question": "A true friend is someone you can always ............ and rely on in times of trouble.",
            "options": ["doubt", "trust", "mistrust", "suspect"],
            "correct": 1,
            "explanation": "الفعل trust يعني 'يثق به ويؤمن بصدقه'."
        },
        {
            "id": 20,
            "question": "Firefighters worked bravely for hours to ............ the blazing flames.",
            "options": ["turn off", "put out", "set off", "give up"],
            "correct": 1,
            "explanation": "المتلازمة الصحيحة لإطفاء النيران واللهب هي put out fires (بينما turn off للأجهزة والإضاءة)."
        },
        {
            "id": 21,
            "question": "Don't forget to ............ the lights and air conditioner before you leave the room.",
            "options": ["put out", "turn off", "take off", "blow out"],
            "correct": 1,
            "explanation": "إطفاء الأنوار والأجهزة الكهربائية يستخدم معه الفعل turn off."
        },
        {
            "id": 22,
            "question": "The noun 'obligation' can be replaced in meaning by ............ .",
            "options": ["duty", "choice", "freedom", "option"],
            "correct": 0,
            "explanation": "وفق كتاب المعاصر ص 111 (سؤال 13): مرادف obligation هو duty (واجب / التزام)."
        },
        {
            "id": 23,
            "question": "Students have no obligation to join the trip; the antonym of 'obligation' here is ............ .",
            "options": ["choice", "duty", "commitment", "responsibility"],
            "correct": 0,
            "explanation": "وفق كتاب المعاصر ص 111 (سؤال 14): عكس التزام (obligation) هو اختيار وحرية (choice / option)."
        },
        {
            "id": 24,
            "question": "The opposite in meaning of the adjective 'risky' is ............ .",
            "options": ["hazardous", "dangerous", "safe", "unsafe"],
            "correct": 2,
            "explanation": "وفق كتاب المعاصر ص 111 (سؤال 15): عكس risky (خطير) هو safe أو secure (آمن)."
        },
        {
            "id": 25,
            "question": "We must protect our ancient monuments. The antonym of 'protect' is ............ .",
            "options": ["guard", "save", "endanger", "keep safe"],
            "correct": 2,
            "explanation": "وفق كتاب المعاصر ص 111 (سؤال 16): عكس protect (يحمي) هو endanger أو harm (يُعرّض للخطر أو يُتلف)."
        },
        {
            "id": 26,
            "question": "The lifeguard managed to rescue the boy from drowning. The verb 'rescue' is opposite to ............ .",
            "options": ["save", "free", "abandon", "deliver"],
            "correct": 2,
            "explanation": "وفق كتاب المعاصر ص 111 (سؤال 18): عكس rescue (يُنقذ) هو abandon (يهجر / يتخلى عن)."
        },
        {
            "id": 27,
            "question": "“............, everyone was safe after the fire.” This sentence adverb expresses good fortune and relief.",
            "options": ["Honestly", "Luckily", "Unfortunately", "Hardly"],
            "correct": 1,
            "explanation": "ظرف الجملة الذي يعبر عن حسن الحظ والارتياح بعد النجاة هو Luckily (لحسن الحظ)."
        },
        {
            "id": 28,
            "question": "The environmental activists strongly argued ............ cutting down old trees in the city center.",
            "options": ["for", "against", "with", "into"],
            "correct": 1,
            "explanation": "المصطلح argue against يعني 'يجادل ضد أو يعارض' قطع الأشجار."
        },
        {
            "id": 29,
            "question": "The two brave rescuers looked at ............ and knew what had to be done.",
            "options": ["each other", "one other", "another one", "every other"],
            "correct": 0,
            "explanation": "نستخدم each other عند الحديث عن اثنين (أحدهما الآخر)."
        },
        {
            "id": 30,
            "question": "The firefighters believed that saving human lives was worth ............ risk.",
            "options": ["every", "none", "neither", "without"],
            "correct": 0,
            "explanation": "التعبير اللفظي الوارد في كتاب المعاصر ص 112: be worth every risk (يستحق كل مخاطرة وتضحية)."
        }
    ]
}

os.makedirs("Sec_1/unit-2", exist_ok=True)
js_content = f"window.lessonData = {json.dumps(lesson_data, ensure_ascii=False, indent=4)};\n"

with open("Sec_1/unit-2/lesson-4-5.data.js", "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Generated Sec_1/unit-2/lesson-4-5.data.js successfully! Quiz count: {len(lesson_data['quiz'])}")
