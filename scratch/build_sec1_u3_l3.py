import json
import os

lesson_data = {
    "id": "sec1-u3-l3",
    "stage": "sec1",
    "unit": 3,
    "lesson": "3",
    "title": "Lesson 3: Fake Appearance (المظاهر الخادعة)",
    "description": "المفردات الأساسية والتراكمية، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)",

    "keyVocabulary": [
        { "word": "appearances", "partOfSpeech": "n", "arabic": "مظاهر خارجية", "example": "In modern life, appearances can sometimes be deceptive." },
        { "word": "misleading", "partOfSpeech": "adj", "arabic": "مضلل - خادع", "example": "The advertisement made misleading claims about the product's quality." },
        { "word": "genuine", "partOfSpeech": "adj", "arabic": "حقيقي - صادق - أصلي", "example": "She showed genuine concern for her friend's well-being." },
        { "word": "edited pictures", "partOfSpeech": "n phr", "arabic": "صور معدلة / منقحة", "example": "Many photos on social media are heavily edited pictures." },
        { "word": "staged lifestyles", "partOfSpeech": "n phr", "arabic": "أساليب حياة مصطنعة ومجهزة للعرض", "example": "Don't feel insecure by comparing yourself with staged lifestyles online." },
        { "word": "makeup", "partOfSpeech": "n", "arabic": "مستحضرات تجميل - مكياج", "example": "Throughout history, people have used makeup to express their style." },
        { "word": "inspiring", "partOfSpeech": "adj", "arabic": "ملهم - محفز", "example": "Her speech about overcoming failure was truly inspiring." },
        { "word": "sincerity", "partOfSpeech": "n", "arabic": "إخلاص - صدق النية", "example": "His words touched everyone because of their evident sincerity." },
        { "word": "influencers", "partOfSpeech": "n", "arabic": "مؤثرون - صانعو محتوى", "example": "Social media influencers can change how young people view the world." },
        { "word": "role models", "partOfSpeech": "n phr", "arabic": "قدوة حسنة - نماذج يُحتذى بها", "example": "Parents and dedicated teachers are the best role models for teenagers." },
        { "word": "authenticity", "partOfSpeech": "n", "arabic": "أصالة - مصداقية وواقعية", "example": "Audiences appreciate the authenticity of creators who show their true selves." },
        { "word": "openness", "partOfSpeech": "n", "arabic": "صراحة - انفتاح ووضوح", "example": "Her openness about mental health struggles encouraged others to seek help." },
        { "word": "perfection", "partOfSpeech": "n", "arabic": "كمال - مثالية تامة", "example": "Striving for perfection often leads to stress, whereas progress brings happiness." },
        { "word": "the bright side", "partOfSpeech": "n phr", "arabic": "الجانب المشرق / الإيجابي", "example": "Always look on the bright side of life even when facing setbacks." },
        { "word": "sincere words", "partOfSpeech": "n phr", "arabic": "كلمات صادقة ومخلصة", "example": "A few sincere words of thanks can make someone's entire day." },
        { "word": "lasting impressions", "partOfSpeech": "n phr", "arabic": "انطباعات دائمة ومؤثرة", "example": "Kind acts leave lasting impressions that people never forget." },
        { "word": "illusions", "partOfSpeech": "n", "arabic": "أوهام - صور خادعة", "example": "We should face reality rather than live in comfortable illusions." },
        { "word": "imitation", "partOfSpeech": "n", "arabic": "تقليد - محاكاة", "example": "Authenticity is always better than poor imitation." }
    ],

    "accumulativeVocabulary": [
        { "word": "reflect on", "partOfSpeech": "v phr", "arabic": "يتأمل في - يفكر بعمق", "example": "Take time to reflect on what really matters in your life." },
        { "word": "what really matters", "partOfSpeech": "idiom", "arabic": "ما يهم حقاً في الجوهر", "example": "Kindness and character are what really matters, not expensive clothes." },
        { "word": "compare with", "partOfSpeech": "v phr", "arabic": "يقارن بـ", "example": "It is harmful to compare your real life with someone's highlight reel." },
        { "word": "motivation", "partOfSpeech": "n", "arabic": "حافز - دافع", "example": "Use other people's genuine success as motivation to improve yourself." },
        { "word": "real achievements", "partOfSpeech": "n phr", "arabic": "إنجازات حقيقية ملموسة", "example": "Building skills through hard work leads to real achievements." },
        { "word": "express oneself", "partOfSpeech": "phr", "arabic": "يعبر عن نفسه", "example": "Art gives teenagers a safe way to express themselves freely." },
        { "word": "true worth", "partOfSpeech": "n phr", "arabic": "القيمة الحقيقية", "example": "True worth does not depend on exterior looks or expensive brands." },
        { "word": "depend on", "partOfSpeech": "v phr", "arabic": "يعتمد على - يتوقف على", "example": "Real respect does not depend on external appearances." },
        { "word": "combine with", "partOfSpeech": "v phr", "arabic": "يدمج مع - يجمع بين", "example": "When you combine good appearance with sincerity, you earn respect." },
        { "word": "powerful message", "partOfSpeech": "n phr", "arabic": "رسالة قوية ذات أثر", "example": "Her honest speech sent a powerful message to all young people." },
        { "word": "daily struggles", "partOfSpeech": "n phr", "arabic": "تحديات ومعاناة يومية", "example": "Everyone has their own daily struggles, even if they smile in photos." },
        { "word": "simple routines", "partOfSpeech": "n phr", "arabic": "روتين يومي بسيط", "example": "Sharing simple routines helps creators connect honestly with viewers." },
        { "word": "true feelings", "partOfSpeech": "n phr", "arabic": "مشاعر صادقة وحقيقية", "example": "Don't be afraid to express your true feelings to trustworthy friends." },
        { "word": "value", "partOfSpeech": "v", "arabic": "يقدر - يثمن", "example": "Wise people value honesty much more than artificial perfection." },
        { "word": "trust and respect", "partOfSpeech": "n phr", "arabic": "ثقة واحترام", "example": "Honest actions build long-term trust and respect among peers." },
        { "word": "real smiles", "partOfSpeech": "n phr", "arabic": "ابتسامات حقيقية نابعة من القلب", "example": "Real smiles light up a room much more than staged poses." },
        { "word": "acts of kindness", "partOfSpeech": "n phr", "arabic": "أفعال وأعمال البر واللطف", "example": "Small acts of kindness can create lasting warmth in the community." },
        { "word": "celebrate", "partOfSpeech": "v", "arabic": "يحتفي بـ - يفخر بـ", "example": "We should celebrate who we truly are instead of pretending to be someone else." },
        { "word": "hide behind", "partOfSpeech": "v phr", "arabic": "يختبئ / يتستر وراء", "example": "Never hide behind false appearances to gain temporary popularity." },
        { "word": "truth over imitation", "partOfSpeech": "idiom", "arabic": "الحقيقة بدلاً من التقليد", "example": "By choosing truth over imitation, we inspire both ourselves and others." }
    ],

    "definitions": [
        {
            "word": "misleading",
            "defEn": "Giving the wrong idea or impression and causing someone to believe something that is not true.",
            "defAr": "إعطاء فكرة خاطئة أو انطباع خادع يجعل الشخص يصدق ما ليس حقيقياً."
        },
        {
            "word": "genuine",
            "defEn": "Real, authentic, and truly what it is said to be; honest and sincere rather than artificial.",
            "defAr": "حقيقي وأصيل وصادق النية وليس مصطنعاً أو مزيفاً."
        },
        {
            "word": "authenticity",
            "defEn": "The quality of being real, true to oneself, and genuine rather than copied or fake.",
            "defAr": "صفة الأصالة والصدق مع النفس والواقعية بعيداً عن التزييف والتقليد."
        },
        {
            "word": "staged lifestyles",
            "defEn": "Daily lives or activities that are artificially planned and arranged for public display on social media.",
            "defAr": "أنماط حياة وأنشطة مدبرة ومصطنعة خصيصاً للتصوير والعرض على منصات التواصل."
        },
        {
            "word": "sincerity",
            "defEn": "The quality of being completely honest, truthful, and free from deceit or pretense.",
            "defAr": "خلو النية من الخداع والتكلف، والصدق التام في القول والعمل."
        },
        {
            "word": "influencer",
            "defEn": "A person who has the ability to affect the behavior, opinions, or buying habits of others via social media.",
            "defAr": "شخص يمتلك القدرة على التأثير في آراء وسلوكيات الآخرين عبر منصات التواصل الاجتماعي."
        },
        {
            "word": "role model",
            "defEn": "A person looked to by others as an inspiring example to be admired and imitated.",
            "defAr": "شخص يعتبره الآخرون قدوة ومثالاً يُحتذى به في الأخلاق أو النجاح."
        },
        {
            "word": "illusion",
            "defEn": "A deceptive appearance or false impression that is not based on reality.",
            "defAr": "مظهر خادع أو انطباع خاطئ لا يمت للواقع بصلة."
        },
        {
            "word": "imitation",
            "defEn": "The act of copying or mimicking someone else's behavior, style, or work.",
            "defAr": "محاكاة وتقليد سلوك أو أسلوب أو عمل شخص آخر دون أصالة ذاتية."
        },
        {
            "word": "openness",
            "defEn": "The quality of being frank, transparent, and willing to share true feelings and thoughts.",
            "defAr": "الصراحة والشفافية والاستعداد لمشاركة المشاعر والأفكار بصدق دون إخفاء."
        }
    ],

    "synonyms": [
        { "word": "genuine", "synonyms": "authentic, real, sincere, truthful", "arabic": "أصيل - حقيقي - صادق" },
        { "word": "misleading", "synonyms": "deceptive, false, confusing, illusory", "arabic": "مضلل - خادع" },
        { "word": "authenticity", "synonyms": "genuineness, originality, truthfulness, reality", "arabic": "أصالة - مصداقية" },
        { "word": "sincerity", "synonyms": "honesty, frankness, integrity, truthfulness", "arabic": "إخلاص - صدق" },
        { "word": "illusion", "synonyms": "mirage, deception, fantasy, delusion", "arabic": "وهم - سراب - خيال خادع" },
        { "word": "imitation", "synonyms": "copy, replica, mimicry, simulation", "arabic": "تقليد - محاكاة" },
        { "word": "inspiring", "synonyms": "motivating, encouraging, uplifting, stimulating", "arabic": "ملهم - مشجع - محفز" },
        { "word": "openness", "synonyms": "frankness, candidness, transparency, honesty", "arabic": "صراحة - شفافية" }
    ],

    "antonyms": [
        { "word": "genuine", "antonyms": "fake, artificial, forged, counterfeit", "arabic": "مزيف - مصطنع" },
        { "word": "misleading", "antonyms": "truthful, accurate, precise, reliable", "arabic": "صادق - دقيق - موثوق" },
        { "word": "authenticity", "antonyms": "fakeness, artificiality, imitation", "arabic": "تزييف - تصنع" },
        { "word": "sincerity", "antonyms": "hypocrisy, deceit, insincerity, pretense", "arabic": "نفاق - رياء - تصنع" },
        { "word": "illusion", "antonyms": "reality, truth, fact, actuality", "arabic": "حقيقة - واقع ملموس" },
        { "word": "imitation", "antonyms": "original, authentic, creation", "arabic": "أصل - ابتكار أصيل" },
        { "word": "perfection", "antonyms": "imperfection, defect, flaw, fault", "arabic": "نقص - عيب" },
        { "word": "openness", "antonyms": "secrecy, concealment, reserve, deception", "arabic": "تكتم - سرية - خفاء" }
    ],

    "collocations": [
        { "collocation": "staged lifestyles", "meaningEn": "Artificially arranged lives for show", "meaningAr": "أساليب حياة مصطنعة ومجهزة للعرض" },
        { "collocation": "edited pictures", "meaningEn": "Digitally modified and filtered photos", "meaningAr": "صور معدلة ومنقحة رقمياً" },
        { "collocation": "sincere words", "meaningEn": "Honest and heartfelt statements", "meaningAr": "كلمات صادقة ومخلصة من القلب" },
        { "collocation": "lasting impressions", "meaningEn": "Memorable effects that endure over time", "meaningAr": "انطباعات باقية ومؤثرة لا تُنسى" },
        { "collocation": "the bright side", "meaningEn": "The positive aspect of a situation", "meaningAr": "الجانب الإيجابي / المشرق" },
        { "collocation": "build trust", "meaningEn": "To create confidence over time through honesty", "meaningAr": "يبني الثقة والاطمئنان" },
        { "collocation": "hide behind illusions", "meaningEn": "To mask reality with fake impressions", "meaningAr": "يختبئ وراء الأوهام والخداع" },
        { "collocation": "value honesty", "meaningEn": "To prioritize truthfulness over fake looks", "meaningAr": "يقدر الصدق والنزاهة" },
        { "collocation": "send a powerful message", "meaningEn": "To deliver an influential statement or action", "meaningAr": "يوجه رسالة قوية ومؤثرة" },
        { "collocation": "real achievements", "meaningEn": "Actual successes gained by genuine effort", "meaningAr": "إنجازات حقيقية على أرض الواقع" }
    ],

    "expressions": [
        { "expression": "acts of kindness", "meaningEn": "Generous and caring deeds done for others", "meaningAr": "أفعال البر وأعمال اللطف" },
        { "expression": "role model", "meaningEn": "A person whose behavior serves as a guide for others", "meaningAr": "قدوة حسنة ونموذج يحتذى به" },
        { "expression": "as long as", "meaningEn": "Provided that / on the condition that", "meaningAr": "طالما / ما دام أن" },
        { "expression": "what really matters", "meaningEn": "The most fundamental and important truths", "meaningAr": "ما يهم حقاً في الجوهر" },
        { "expression": "truth over imitation", "meaningEn": "Choosing reality instead of shallow copying", "meaningAr": "اختيار الحقيقة والأصالة بدلاً من التقليد" },
        { "expression": "true worth", "meaningEn": "The genuine moral and human value of someone", "meaningAr": "القيمة الإنسانية الحقيقية" },
        { "expression": "express oneself", "meaningEn": "To communicate one's thoughts and emotions", "meaningAr": "يعبر عن نفسه وأفكاره" },
        { "expression": "daily struggles", "meaningEn": "The everyday challenges faced by everyone", "meaningAr": "تحديات ومعاناة الحياة اليومية" }
    ],

    "prepositions": [
        { "verb": "reflect on", "meaningEn": "To think deeply and carefully about something", "meaningAr": "يتأمل ويفكر بعمق في" },
        { "verb": "compare with", "meaningEn": "To examine differences and similarities with", "meaningAr": "يقارن بـ / مع" },
        { "verb": "depend on", "meaningEn": "To be determined or influenced by", "meaningAr": "يعتمد على - يتوقف على" },
        { "verb": "combine with", "meaningEn": "To join together with another element", "meaningAr": "يدمج مع - يجمع بين" },
        { "verb": "turn towards", "meaningEn": "To move or direct attention towards something", "meaningAr": "يتجه نحو - يتبنى" },
        { "verb": "hide behind", "meaningEn": "To conceal one's real self behind something", "meaningAr": "يختبئ / يتستر خلف" },
        { "verb": "express through", "meaningEn": "To demonstrate feelings using a medium", "meaningAr": "يعبر من خلال" },
        { "verb": "value ... more than", "meaningEn": "To give greater priority to one thing over another", "meaningAr": "يقدر شيئاً أكثر من شيء آخر" }
    ],

    "derivatives": [
        {
            "base": "mislead",
            "forms": [
                { "word": "mislead", "partOfSpeech": "v", "arabic": "يضلل - يخدع" },
                { "word": "misleading", "partOfSpeech": "adj", "arabic": "مضلل - خادع" },
                { "word": "misleadingly", "partOfSpeech": "adv", "arabic": "بشكل مضلل" },
                { "word": "misleader", "partOfSpeech": "n", "arabic": "شخص مضلل" }
            ]
        },
        {
            "base": "genuine",
            "forms": [
                { "word": "genuine", "partOfSpeech": "adj", "arabic": "صادق - حقيقي" },
                { "word": "genuinely", "partOfSpeech": "adv", "arabic": "بصدق - حقاً" },
                { "word": "genuineness", "partOfSpeech": "n", "arabic": "أصالة - صدق" }
            ]
        },
        {
            "base": "authentic",
            "forms": [
                { "word": "authenticate", "partOfSpeech": "v", "arabic": "يوثق - يثبت صحة" },
                { "word": "authentic", "partOfSpeech": "adj", "arabic": "أصيل - موثوق" },
                { "word": "authentically", "partOfSpeech": "adv", "arabic": "بشكل أصيل وموثوق" },
                { "word": "authenticity", "partOfSpeech": "n", "arabic": "أصالة - موثوقية" }
            ]
        },
        {
            "base": "sincere",
            "forms": [
                { "word": "sincere", "partOfSpeech": "adj", "arabic": "مخلص - صادق" },
                { "word": "sincerely", "partOfSpeech": "adv", "arabic": "بإخلاص - بصدق" },
                { "word": "sincerity", "partOfSpeech": "n", "arabic": "إخلاص - صدق" }
            ]
        },
        {
            "base": "imitate",
            "forms": [
                { "word": "imitate", "partOfSpeech": "v", "arabic": "يقلد - يحاكي" },
                { "word": "imitation", "partOfSpeech": "n", "arabic": "تقليد - محاكاة" },
                { "word": "imitative", "partOfSpeech": "adj", "arabic": "تقليدي - محاكٍ" },
                { "word": "imitator", "partOfSpeech": "n", "arabic": "مقلد" }
            ]
        },
        {
            "base": "inspire",
            "forms": [
                { "word": "inspire", "partOfSpeech": "v", "arabic": "يلهم - يحفز" },
                { "word": "inspiring", "partOfSpeech": "adj", "arabic": "ملهم - باعث على الأمل" },
                { "word": "inspired", "partOfSpeech": "adj", "arabic": "مُلهَم" },
                { "word": "inspiration", "partOfSpeech": "n", "arabic": "إلهام - وحي" }
            ]
        },
        {
            "base": "perfect",
            "forms": [
                { "word": "perfect", "partOfSpeech": "v", "arabic": "يتقن - يكمل" },
                { "word": "perfect", "partOfSpeech": "adj", "arabic": "كامل - تام - مثالي" },
                { "word": "perfective", "partOfSpeech": "adj", "arabic": "إتقاني" },
                { "word": "perfection", "partOfSpeech": "n", "arabic": "كمال - إتقان" }
            ]
        },
        {
            "base": "open",
            "forms": [
                { "word": "open", "partOfSpeech": "v / adj", "arabic": "يفتح / منفتح" },
                { "word": "openly", "partOfSpeech": "adv", "arabic": "علانية - بصراحة" },
                { "word": "openness", "partOfSpeech": "n", "arabic": "صراحة - انفتاح ووضوح" }
            ]
        }
    ],

    "clearConfusion": [
        {
            "title": "genuine vs authentic vs original",
            "explanation": "فروق هامة بين كلمات الأصالة والواقعية:",
            "examples": [
                "genuine: تصف شخصاً أو مشاعر حقيقية وصادقة خالية من الخداع (e.g. He showed genuine kindness).",
                "authentic: تصف شيئاً مطابقاً للأصل التاريخي أو الثقافي وموثوقاً به (e.g. This is an authentic Italian recipe / an authentic ancient artifact).",
                "original: تعني النسخة الأولى غير المنسوخة، أو فكرة مبتكرة غير مسبوقة (e.g. The original painting is displayed in the Louvre)."
            ]
        },
        {
            "title": "illusion vs delusion vs hallucination",
            "explanation": "الفرق بين الوهم والضلالة والهلوسة:",
            "examples": [
                "illusion: وهم بصري أو إدراك خادع لشيء موجود بالفعل (e.g. The mirror created an optical illusion of a vast room).",
                "delusion: اعتقاد فكري باطل وخاطئ يتمسك به الشخص رغم الأدلة (e.g. He lives under the delusion that he never makes mistakes).",
                "hallucination: إدراك حسي لأشياء غير موجودة أصلاً وغالباً بسبب مرض (e.g. High fever can cause scary hallucinations)."
            ]
        },
        {
            "title": "imitate vs emulate vs copy",
            "explanation": "فروق أفعال التقليد والمحاكاة:",
            "examples": [
                "imitate: يقلد شخصاً في طريقة كلامه أو حركاته لمجرد المحاكاة أو السخرية (e.g. Parrots imitate human sounds).",
                "emulate: يقتدي بشخص ناجح في سلوكه لكي يحقق نجاحاً مماثلاً أو يتفوق عليه (e.g. Young students strive to emulate their dedicated teachers).",
                "copy: ينسخ أو يغش نقلاً حرفياً (e.g. He copied the entire essay from a website)."
            ]
        },
        {
            "title": "affect vs effect",
            "explanation": "الفرق بين الفعل والاسم المتعلق بالتأثير:",
            "examples": [
                "affect (verb): يؤثر على (e.g. Social media images affect the mental health of teens).",
                "effect (noun): أثر أو نتيجة (e.g. The lasting effect of genuine role models is inspiring)."
            ]
        }
    ],

    "storyPages": [
        {
            "page": 1,
            "badge": "المشهد 1 • The Filtered World",
            "caption": "The Illusion of Digital Perfection",
            "title": "The Staged Reality",
            "textEn": "Sara spent hours scrolling through social media feeds, admiring influencers with flawless skin and luxury vacations. Every photo seemed to project perfection, but it slowly created an illusion that made her feel ordinary and inadequate. What she did not realize was that behind those edited pictures were elaborate studio lighting, heavy makeup, and carefully staged lifestyles designed to capture clicks rather than convey truth.",
            "textAr": "أمضت سارة ساعات طويلة تتصفح حسابات التواصل الاجتماعي، معجبة بصانعي المحتوى الذين يظهرون ببشرة خالية من العيوب ورحلات فاخرة. بدت كل صورة وكأنها تعكس الكمال، لكنها ببطء ولّدت لديها وهماً جعلها تشعر بأنها عادية وغير كافية. ما لم تدركه هو أنه وراء تلك الصور المعدلة كانت هناك إضاءات تصوير متقنة، ومساحيق تجميل كثيفة، وأساليب حياة مصطنعة صُممت فقط لجذب الإعجابات بدلاً من نقل الحقيقة."
        },
        {
            "page": 2,
            "badge": "المشهد 2 • The Courageous Choice",
            "caption": "Choosing Authenticity Over Imitation",
            "title": "The Breakthrough to Sincerity",
            "textEn": "One afternoon, a renowned influencer posted an unedited video showing her messy kitchen, real fatigue, and open discussion of daily struggles. Her sincere words broke the pattern of empty imitation. Instead of perfection, she presented authenticity and vulnerability. The response was astonishing: millions thanked her for her openness, realizing that genuine human flaws connect people far more deeply than any staged glamour.",
            "textAr": "في أحد الأيام، نشرت صانعة محتوى شهيرة مقطع فيديو غير معدل يعرض مطبخها غير المرتب وإرهاقها الحقيقي، متحدثة بصراحة عن تحدياتها اليومية. كسرت كلماتها الصادقة نمط التقليد الأجوف؛ فبدلاً من السعي للكمال الزائف، قدمت أصالة وواقعية. كانت ردود الفعل مذهلة: شكرها الملايين على صراحتها، مدركين أن العيوب الإنسانية الحقيقية تقرب القلوب أعمق بكثير من أي بريق مصطنع."
        },
        {
            "page": 3,
            "badge": "المشهد 3 • What Truly Endures",
            "caption": "True Worth and Lasting Impressions",
            "title": "The Power of Inner Character",
            "textEn": "Sara felt an immediate sense of relief and liberation. She put down her phone and looked on the bright side: real life is not an audition. She resolved to appreciate what really matters—loyalty, empathy, and real achievements. By combining natural appearance with genuine sincerity, she discovered that confidence does not come from concealing behind illusions, but from celebrating our true, unedited selves.",
            "textAr": "شعرت سارة براحة عارمة وتحرر فوري. وضعت هاتفها جانباً ونظرت إلى الجانب المشرق: فالحياة الواقعية ليست مسابقة استعراضية! قررت أن تقدر ما يهم حقاً؛ كالوفاء والتعاطف والإنجازات الحقيقية. ومن خلال الجمع بين المظهر الطبيعي والإخلاص الصادق، اكتشفت أن الثقة بالنفس لا تنبع من التستر خلف الأوهام، بل من الاحتفاء بذواتنا الحقيقية غير المنقحة."
        }
    ],

    "dialogue": [
        {
            "speaker": "Salma",
            "role": "High School Student",
            "en": "Nour, do you ever feel overwhelmed when looking at influencers on Instagram? Their lives seem so perfect!",
            "ar": "نور، هل تشعرين أحياناً بالإحباط عند متابعة المؤثرين على إنستغرام؟ تبدو حياتهم مثالية تماماً!"
        },
        {
            "speaker": "Nour",
            "role": "Friend & Classmate",
            "en": "I used to feel that way, Salma, until I learned that most of those posts are staged lifestyles with edited pictures.",
            "ar": "كنت أشعر بذلك يا سلمى، حتى علمت أن معظم تلك المنشورات هي أساليب حياة مصطنعة وصور معدلة."
        },
        {
            "speaker": "Salma",
            "role": "High School Student",
            "en": "So you mean they hide behind illusions rather than showing their genuine daily reality?",
            "ar": "تقصدين أنهم يتسترون خلف الأوهام بدلاً من إظهار واقعهم اليومي الصادق؟"
        },
        {
            "speaker": "Nour",
            "role": "Friend & Classmate",
            "en": "Exactly! True role models today are turning towards authenticity. They share real struggles and true feelings.",
            "ar": "بالضبط! القدوة الحقيقية اليوم تتجه نحو الأصالة والمصداقية، ويشاركون تحدياتهم ومشاعرهم الواقعية."
        },
        {
            "speaker": "Salma",
            "role": "High School Student",
            "en": "That makes total sense. Their openness encourages us to value honesty rather than chasing impossible perfection.",
            "ar": "هذا منطقي جداً. صراحتهم تشجعنا على تقدير الصدق بدلاً من مطاردة كمال مستحيل."
        },
        {
            "speaker": "Nour",
            "role": "Friend & Classmate",
            "en": "Always remember: kind acts and sincere words leave lasting impressions that outshine any digital filter!",
            "ar": "تذكري دائماً: الأفعال الطيبة والكلمات المخلصة تترك انطباعات دائمة تفوق أي فلتر رقمي بمراحل!"
        }
    ],

    "quizQuestions": [
        {
            "question": "1. Photos on social media are often altered using software, so they are considered ............. pictures.",
            "options": ["edited", "raw", "original", "ancient"],
            "correct": 0,
            "explanation": "الصور التي يُجرى عليها تعديل رقمي تُسمى 'edited pictures'."
        },
        {
            "question": "2. In modern life, external ............. can sometimes be misleading and deceptive.",
            "options": ["appearances", "appliances", "audiences", "assistants"],
            "correct": 0,
            "explanation": "'Appearances' تعني المظاهر الخارجية التي قد تخدع أحياناً."
        },
        {
            "question": "3. Her feelings of empathy were .............; she genuinely cared about the poor orphans.",
            "options": ["genuine", "fake", "staged", "misleading"],
            "correct": 0,
            "explanation": "'Genuine' تعني صادق / حقيقي نابع من القلب."
        },
        {
            "question": "4. Many influencers post about their ............. lifestyles, which are carefully arranged for the camera.",
            "options": ["staged", "spontaneous", "primitive", "natural"],
            "correct": 0,
            "explanation": "'Staged lifestyles' هي أنماط حياة مصطنعة ومجهزة مسبقاً للعرض."
        },
        {
            "question": "5. The word 'misleading' is closest in meaning to ............. .",
            "options": ["deceptive", "accurate", "reliable", "honest"],
            "correct": 0,
            "explanation": "مرادف 'misleading' (مضلل) هو 'deceptive' (مخادع)."
        },
        {
            "question": "6. The opposite of 'sincerity' is ............. .",
            "options": ["hypocrisy", "loyalty", "honesty", "integrity"],
            "correct": 0,
            "explanation": "مضاد 'sincerity' (الإخلاص والصدق) هو 'hypocrisy' (النفاق والرياء)."
        },
        {
            "question": "7. A good teacher is always a positive role ............. for his students.",
            "options": ["model", "actor", "fashion", "filter"],
            "correct": 0,
            "explanation": "المصطلح 'role model' يعني قدوة حسنة يُحتذى بها."
        },
        {
            "question": "8. True self-confidence grows when we celebrate who we are, instead of hiding behind ............. .",
            "options": ["illusions", "realities", "facts", "truths"],
            "correct": 0,
            "explanation": "المتلازمة اللفظية في الدرس هي 'hide behind illusions' (يختبئ وراء الأوهام)."
        },
        {
            "question": "9. Her ............. about her previous failures helped other students feel less anxious.",
            "options": ["openness", "secrecy", "envy", "cruelty"],
            "correct": 0,
            "explanation": "'Openness' تعني الصراحة والانفتاح والوضوح مع الآخرين."
        },
        {
            "question": "10. Sincere words and kind acts create lasting ............. on people you meet.",
            "options": ["impressions", "expressions", "depressions", "compressions"],
            "correct": 0,
            "explanation": "'Lasting impressions' تعني انطباعات دائمة وباقية في الذاكرة."
        },
        {
            "question": "11. 'Authenticity' is the quality of being ............. .",
            "options": ["real and genuine", "fake and copied", "staged and artificial", "cheap and disposable"],
            "correct": 0,
            "explanation": "الأصالة 'authenticity' تعني أن يكون الشيء حقيقياً وأصيلاً (real and genuine)."
        },
        {
            "question": "12. It is always better to look on the ............. side of difficult situations.",
            "options": ["bright", "dark", "bleak", "hidden"],
            "correct": 0,
            "explanation": "التعبير 'look on the bright side' يعني ينظر للجانب المشرق والإيجابي."
        },
        {
            "question": "13. Striving for absolute ............. can cause mental exhaustion, as nobody is flawless.",
            "options": ["perfection", "pollution", "penetration", "portion"],
            "correct": 0,
            "explanation": "'Perfection' تعني الكمال التام والمثالية المطلقة."
        },
        {
            "question": "14. A person who inspires others by their genuine achievements can be described as ............. .",
            "options": ["inspiring", "depressing", "annoying", "deceiving"],
            "correct": 0,
            "explanation": "'Inspiring' تعني مُلهِم ومحفز للآخرين."
        },
        {
            "question": "15. The speaker advised young people to choose truth over ............. .",
            "options": ["imitation", "dedication", "education", "meditation"],
            "correct": 0,
            "explanation": "وفقاً للنص: 'By choosing truth over imitation, we inspire both ourselves and others.'"
        },
        {
            "question": "16. Teenagers should take time to reflect ............. what really matters in life.",
            "options": ["on", "at", "for", "in"],
            "correct": 0,
            "explanation": "الفعل 'reflect' يأخذ حرف الجر 'on' بمعنى يتأمل في أو يفكر بعمق في."
        },
        {
            "question": "17. A person's true worth does not depend ............. luxury clothes and jewelry.",
            "options": ["on", "of", "with", "from"],
            "correct": 0,
            "explanation": "الفعل 'depend' يأخذ حرف الجر 'on' بمعنى يعتمد أو يتوقف على."
        },
        {
            "question": "18. When you combine attractive appearance ............. genuine sincerity, you earn lasting respect.",
            "options": ["with", "by", "at", "to"],
            "correct": 0,
            "explanation": "الفعل 'combine' يأخذ حرف الجر 'with' (combine X with Y)."
        },
        {
            "question": "19. The company's advertisements were criticized for giving ............. information.",
            "options": ["misleading", "authentic", "reliable", "truthful"],
            "correct": 0,
            "explanation": "'Misleading information' تعني معلومات مضللة وخادعة للمستهلك."
        },
        {
            "question": "20. The noun form derived from the verb 'imitate' is ............. .",
            "options": ["imitation", "imitative", "imitably", "imitate"],
            "correct": 0,
            "explanation": "الاسم من 'imitate' هو 'imitation' (تقليد / محاكاة)."
        },
        {
            "question": "21. The adverb form of 'genuine' is ............. .",
            "options": ["genuinely", "genuineness", "genuine", "genuity"],
            "correct": 0,
            "explanation": "الظرف هو 'genuinely' بمعنى بصدق أو حقاً."
        },
        {
            "question": "22. An optical ............. makes the pencil in a glass of water look broken.",
            "options": ["illusion", "delusion", "hallucination", "conclusion"],
            "correct": 0,
            "explanation": "'Optical illusion' هو الخداع البصري."
        },
        {
            "question": "23. Which word means 'to copy someone with the aim of equaling or excelling them'?",
            "options": ["emulate", "cheat", "ruin", "mock"],
            "correct": 0,
            "explanation": "'Emulate' تعني يقتدي بشخص ناجح في سلوكه ليحقق نجاحاً مماثلاً."
        },
        {
            "question": "24. Excessive exposure to fake social media images can negatively ............. young minds.",
            "options": ["affect", "effect", "effective", "effectively"],
            "correct": 0,
            "explanation": "هنا نحتاج فعلاً (verb)، لذا نختار 'affect' (يؤثر على)."
        },
        {
            "question": "25. Many modern influencers are turning towards ............. by sharing their simple daily routines.",
            "options": ["authenticity", "dishonesty", "artificiality", "deception"],
            "correct": 0,
            "explanation": "يتجه المؤثرون المعاصرون نحو 'authenticity' (الأصالة والمصداقية)."
        },
        {
            "question": "26. The antonym of 'misleading' is ............. .",
            "options": ["reliable", "deceptive", "staged", "false"],
            "correct": 0,
            "explanation": "عكس 'misleading' (مضلل) هو 'reliable' (موثوق / صادق)."
        },
        {
            "question": "27. She spoke with complete ............., and everyone could tell she was not lying.",
            "options": ["sincerity", "arrogance", "envy", "cruelty"],
            "correct": 0,
            "explanation": "'Sincerity' تعني إخلاص وصدق في النية والقول."
        },
        {
            "question": "28. Small acts of ............. such as helping an elder can brighten someone's day.",
            "options": ["kindness", "greed", "selfishness", "arrogance"],
            "correct": 0,
            "explanation": "التعبير هو 'acts of kindness' (أعمال البر واللطف الإنساني)."
        },
        {
            "question": "29. To give the wrong idea or impression to someone is to ............. them.",
            "options": ["mislead", "encourage", "inspire", "assist"],
            "correct": 0,
            "explanation": "الفعل 'mislead' يعني يضلل شخصاً أو يقوده إلى الاعتقاد الخاطئ."
        },
        {
            "question": "30. The lesson on SB page 42 primarily emphasizes that true worth comes from ............. .",
            "options": ["honesty and genuine character", "expensive makeup and designer clothes", "heavily edited social media photos", "staged lifestyles with fake luxury"],
            "correct": 0,
            "explanation": "الفكرة الجوهرية للدرس هي أن القيمة الحقيقية تنبع من الصدق والشخصية الأصيلة وليس المظاهر الخادعة."
        }
    ]
}

out_data_path = r"c:\Users\Al700t\OneDrive\Desktop\Learn_English\Sec_1\unit-3\lesson-3.data.js"
js_content = f"// Sec 1 - Unit 3 - Lesson 3 Data Payload\nwindow.__LESSON_DATA__ = {json.dumps(lesson_data, ensure_ascii=False, indent=2)};\n"

with open(out_data_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print(f"Successfully generated {out_data_path} with {len(lesson_data['quizQuestions'])} MCQs!")

# Now generate lesson-3.html
html_content = """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 1 - Unit 3 - Lesson 3: Fake Appearance | Mr. Ahmed Assem</title>
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
            <a href="../index.html">Sec 1</a> / <a href="./index.html">Unit 3</a> / <span>Lesson 3</span>
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
                <span class="badge badge-gold">🎭 Fake Appearance</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lesson 3: Fake Appearance (المظاهر الخادعة)</h2>
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
                        <div class="artwork-frame">
                            <img id="storyImg" src="../../assets/images/gem_museum.webp" alt="Story Illustration" class="story-img-display" onerror="this.onerror=null; this.src='../../assets/images/gem_museum.webp';">
                            <div class="artwork-gradient"></div>
                        </div>
                        <div class="story-badge" id="storyBadge">المشهد 1 • The Filtered World</div>
                        <div class="story-caption" id="storyCaption">The Illusion of Digital Perfection</div>
                    </div>
                    <div class="story-page-content">
                        <h2 class="story-page-title" id="storyTitle">The Staged Reality</h2>
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
                    <p class="dialogue-subtitle">حوار توعوي تفاعلي بين سلمى ونور حول تأثير منصات التواصل ومظاهر الحياة المصطنعة وأهمية الصدق مع النفس</p>
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
    <script src="./lesson-3.data.js"></script>

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

out_html_path = r"c:\Users\Al700t\OneDrive\Desktop\Learn_English\Sec_1\unit-3\lesson-3.html"
with open(out_html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Successfully generated {out_html_path}!")
