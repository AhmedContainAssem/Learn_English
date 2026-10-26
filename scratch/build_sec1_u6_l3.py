import os
import json

u6_dir = r"c:\Users\Al700t\OneDrive\Desktop\Learn_English\Sec_1\unit-6"
os.makedirs(u6_dir, exist_ok=True)

lesson3_data = {
    "id": "sec1-u6-l3",
    "stage": "sec1",
    "unit": 6,
    "lesson": "3",
    "title": "Lesson 3: Career Decisions & Exploring Opportunities",
    "description": "قرارات المسار المهني، التأمل الذاتي، التوفيق بين الشغف واحتياجات السوق، التوجيه والإرشاد، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً من كتاب المعاصر 🎯 (Zero Grammar)",
    "keyVocabulary": [
        {
            "word": "self-reflection",
            "partOfSpeech": "n",
            "arabic": "مراجعة النفس / التأمل الذاتي",
            "example": "Self-reflection helps students discover their true strengths, interests, and core values."
        },
        {
            "word": "career path",
            "partOfSpeech": "n",
            "arabic": "المسار المهني / طريق الحياة المهنية",
            "example": "Choosing the right career path requires a balance between passion and job market demand."
        },
        {
            "word": "growth opportunities",
            "partOfSpeech": "n",
            "arabic": "فرص النمو والترقي الوظيفي",
            "example": "Ambitious graduates look for jobs that offer excellent long-term growth opportunities."
        },
        {
            "word": "internship",
            "partOfSpeech": "n",
            "arabic": "تدريب عملي / فترة تدريب مهني",
            "example": "Joining a summer internship gives young students real workplace experience."
        },
        {
            "word": "volunteering",
            "partOfSpeech": "n",
            "arabic": "العمل التطوعي",
            "example": "Volunteering for community projects shapes your career goals and develops empathy."
        },
        {
            "word": "requirements",
            "partOfSpeech": "n",
            "arabic": "متطلبات واشتراطات الوظيفة",
            "example": "Always read the job requirements thoroughly before submitting your application."
        },
        {
            "word": "daily tasks",
            "partOfSpeech": "n",
            "arabic": "المهام اليومية",
            "example": "Understanding your daily tasks ensures you will actually enjoy your workday routine."
        },
        {
            "word": "passion",
            "partOfSpeech": "n",
            "arabic": "شغف / حماس قوي",
            "example": "Success happens when deep passion meets authentic market opportunities."
        },
        {
            "word": "guidance",
            "partOfSpeech": "n",
            "arabic": "إرشاد / توجيه",
            "example": "The guidance of experienced mentors prevents young people from making careless decisions."
        },
        {
            "word": "mentor",
            "partOfSpeech": "n",
            "arabic": "مرشد ناصح / موجه ذو خبرة",
            "example": "A wise mentor can provide valuable insights into navigating workplace challenges."
        },
        {
            "word": "build a balance",
            "partOfSpeech": "v phr",
            "arabic": "يحقق توازناً",
            "example": "It is essential to build a balance between your personal dreams and market needs."
        },
        {
            "word": "income",
            "partOfSpeech": "n",
            "arabic": "الدخل المادي / الإيراد",
            "example": "Choosing a career is not just about income; personal happiness is equally vital."
        },
        {
            "word": "rewarding",
            "partOfSpeech": "adj",
            "arabic": "مُجزٍ / يستحق العناء",
            "example": "Teaching and nursing are demanding fields, but they are incredibly rewarding."
        },
        {
            "word": "fulfilling",
            "partOfSpeech": "adj",
            "arabic": "مُشبع للذات / محقق للطموح",
            "example": "A fulfilling career allows you to use your talents to help society flourish."
        },
        {
            "word": "talent",
            "partOfSpeech": "n",
            "arabic": "موهبة فطرية / مهارة خاصة",
            "example": "By combining natural talent with relentless effort, students achieve excellence."
        },
        {
            "word": "sense of purpose",
            "partOfSpeech": "n phr",
            "arabic": "إحساس بوجود هدف أو دافع في الحياة",
            "example": "Working for a meaningful cause gives employees a profound sense of purpose."
        },
        {
            "word": "pay well",
            "partOfSpeech": "v phr",
            "arabic": "يدر دخلاً جيداً / يدفع أجراً مجزياً",
            "example": "A career that pays well might still leave you unhappy if you lack genuine interest in it."
        },
        {
            "word": "clear vision",
            "partOfSpeech": "n phr",
            "arabic": "رؤية واضحة ومحددة",
            "example": "Consulting career specialists provides a clear vision of emerging industries."
        },
        {
            "word": "prevent from",
            "partOfSpeech": "v phr",
            "arabic": "يمنع من / يحول دون",
            "example": "Proper planning prevents young graduates from falling into dead-end jobs."
        },
        {
            "word": "careless choices",
            "partOfSpeech": "n phr",
            "arabic": "قرارات متسرعة أو غير مدروسة",
            "example": "Taking sufficient time to evaluate your options prevents hasty, careless choices."
        }
    ],
    "accumulativeVocab": [
        {
            "word": "strengths",
            "partOfSpeech": "n",
            "arabic": "نقاط القوة",
            "example": "During self-reflection, list your strengths such as problem-solving and communication."
        },
        {
            "word": "interests",
            "partOfSpeech": "n",
            "arabic": "الاهتمامات والرغبات",
            "example": "Aligning your interests with your field of study makes academic work enjoyable."
        },
        {
            "word": "core values",
            "partOfSpeech": "n",
            "arabic": "القيم الجوهرية / المبادئ",
            "example": "Honesty, fairness, and creativity are fundamental core values in the workplace."
        },
        {
            "word": "market needs",
            "partOfSpeech": "n",
            "arabic": "احتياجات سوق العمل",
            "example": "AI, data science, and green energy are growing fields driven by modern market needs."
        },
        {
            "word": "decision-maker",
            "partOfSpeech": "n",
            "arabic": "صانع القرار / متخذ القرارات",
            "example": "As an adult, you must become the primary decision-maker in your educational journey."
        },
        {
            "word": "meaningful life",
            "partOfSpeech": "n",
            "arabic": "حياة ذات مغزى وقيمة",
            "example": "Doing work that contributes to society helps you lead a truly meaningful life."
        },
        {
            "word": "inspiring journey",
            "partOfSpeech": "n",
            "arabic": "رحلة ملهمة",
            "example": "Dedication and curiosity can transform an ordinary career into an inspiring journey."
        },
        {
            "word": "lasting career",
            "partOfSpeech": "n",
            "arabic": "مسيرة مهنية مستدامة وطويلة الأمد",
            "example": "Continuous learning and adaptability are the secret to building a lasting career."
        },
        {
            "word": "excite",
            "partOfSpeech": "v",
            "arabic": "يثير الحماس / يشعل الشغف",
            "example": "Explore various school subjects to see which topics truly excite your curiosity."
        },
        {
            "word": "shape goals",
            "partOfSpeech": "v phr",
            "arabic": "يصيغ ويشكل الأهداف",
            "example": "Early volunteering experiences help shape your long-term academic and career goals."
        },
        {
            "word": "career counselor",
            "partOfSpeech": "n",
            "arabic": "مستشار مهني / مرشد توجيه مهني",
            "example": "The school career counselor helped the students choose suitable university majors."
        },
        {
            "word": "self-awareness",
            "partOfSpeech": "n",
            "arabic": "الوعي الذاتي / معرفة قدرات النفس",
            "example": "Developing self-awareness allows you to identify both your talents and limitations."
        },
        {
            "word": "dedication",
            "partOfSpeech": "n",
            "arabic": "التفاني والإخلاص في العمل",
            "example": "Her dedication to clinical research earned her widespread respect among her peers."
        },
        {
            "word": "lifelong learning",
            "partOfSpeech": "n",
            "arabic": "التعلم المستمر مدى الحياة",
            "example": "In a rapidly evolving global economy, lifelong learning is no longer optional."
        },
        {
            "word": "adaptability",
            "partOfSpeech": "n",
            "arabic": "المرونة والقدرة على التكيف",
            "example": "Workplace adaptability allows employees to thrive during technological shifts."
        },
        {
            "word": "shadowing",
            "partOfSpeech": "n",
            "arabic": "المعايشة الميدانية لملاحظة مهنة معينة",
            "example": "Job shadowing a doctor for a week gave Ahmed firsthand insight into hospital life."
        },
        {
            "word": "real-world experience",
            "partOfSpeech": "n",
            "arabic": "خبرة واقعية عملية",
            "example": "Internships bridge the gap between theoretical textbooks and real-world experience."
        },
        {
            "word": "evaluation",
            "partOfSpeech": "n",
            "arabic": "تقييم ودراسة تحليلية",
            "example": "An honest evaluation of your progress helps you refine your career strategies."
        },
        {
            "word": "hasty decision",
            "partOfSpeech": "n",
            "arabic": "قرار متعجل",
            "example": "Avoid making a hasty decision under peer pressure when choosing your high school branch."
        },
        {
            "word": "satisfaction",
            "partOfSpeech": "n",
            "arabic": "الرضا والارتياح النفسي",
            "example": "Job satisfaction is often far more important than a slightly higher paycheck."
        }
    ],
    "definitions": [
        {
            "word": "self-reflection",
            "meaning": "تأمل ومراجعة النفس",
            "englishDef": "careful thought about your own strengths, weaknesses, values, and character."
        },
        {
            "word": "career path",
            "meaning": "المسار المهني",
            "englishDef": "the series of jobs and progressive steps you take throughout your working life."
        },
        {
            "word": "internship",
            "meaning": "تدريب عملي",
            "englishDef": "a period of work experience offered by an organization for a limited time to learn practical skills."
        },
        {
            "word": "mentor",
            "meaning": "مرشد ناصح",
            "englishDef": "an experienced and trusted person who advises and guides a younger or less experienced person."
        },
        {
            "word": "guidance",
            "meaning": "توجيه وإرشاد",
            "englishDef": "help or advice given to someone by a specialist or mentor about choices, education, or career."
        },
        {
            "word": "requirements",
            "meaning": "متطلبات",
            "englishDef": "things that are needed, mandatory, or demanded for a specific position or qualification."
        },
        {
            "word": "growth opportunities",
            "meaning": "فرص النمو",
            "englishDef": "possibilities for promotion, learning new skills, and professional advancement in a company."
        },
        {
            "word": "sense of purpose",
            "meaning": "إحساس بالهدف",
            "englishDef": "a deep feeling that what you do is meaningful, useful, and gives direction to your life."
        }
    ],
    "synonymsAntonyms": [
        {
            "word": "passion (شغف)",
            "synonym": "enthusiasm, zeal, eagerness, devotion",
            "antonym": "apathy, indifference, coldness"
        },
        {
            "word": "guidance (إرشاد)",
            "synonym": "advice, counseling, direction, mentoring",
            "antonym": "misdirection, neglect, ignorance"
        },
        {
            "word": "rewarding (مجزٍ)",
            "synonym": "fulfilling, satisfying, gratifying, fruitful",
            "antonym": "unrewarding, frustrating, pointless"
        },
        {
            "word": "fulfilling (مشبع للذات)",
            "synonym": "enriching, rewarding, pleasing, inspiring",
            "antonym": "disappointing, unsatisfying, empty"
        },
        {
            "word": "prevent (يمنع)",
            "synonym": "stop, hinder, avert, deter, block",
            "antonym": "allow, encourage, facilitate, permit"
        },
        {
            "word": "careless (غير مبالٍ / متسرع)",
            "synonym": "hasty, reckless, negligent, thoughtless",
            "antonym": "careful, prudent, cautious, deliberate"
        },
        {
            "word": "balance (توازن)",
            "synonym": "equilibrium, harmony, proportion, stability",
            "antonym": "imbalance, disproportion, chaos"
        },
        {
            "word": "strengths (نقاط القوة)",
            "synonym": "assets, advantages, talents, capabilities",
            "antonym": "weaknesses, shortcomings, flaws"
        }
    ],
    "collocations": [
        {
            "phrase": "build a balance",
            "meaning": "يحقق توازناً متناغماً",
            "example": "He worked hard to build a balance between demanding office hours and family life."
        },
        {
            "phrase": "conduct research",
            "meaning": "يُجري بحثاً استقصائياً",
            "example": "Before deciding on a major, conduct thorough research about emerging industry trends."
        },
        {
            "phrase": "make choices",
            "meaning": "يتخذ قرارات واختيارات",
            "example": "Self-reflection helps high school students make responsible educational choices."
        },
        {
            "phrase": "provide a clear vision",
            "meaning": "يوفر رؤية واضحة ومستنيرة",
            "example": "Conversations with senior engineers provide a clear vision of software development."
        },
        {
            "phrase": "take time",
            "meaning": "يأخذ وقتاً كافياً للتفكير",
            "example": "Take time to reflect on what you truly enjoy doing before applying for universities."
        },
        {
            "phrase": "shape career goals",
            "meaning": "يبلور ويحدد الأهداف المهنية",
            "example": "Summer volunteering can dramatically shape career goals in unforeseen positive ways."
        }
    ],
    "expressionsPrepositions": [
        {
            "expression": "a sense of purpose",
            "meaning": "إحساس بوجود هدف ورسالة سامية في الحياة",
            "type": "Expression"
        },
        {
            "expression": "career path",
            "meaning": "المسار المهني وطريق العمل",
            "type": "Expression"
        },
        {
            "expression": "not just about income",
            "meaning": "الأمر لا يتعلق بالدخل المادي فحسب",
            "type": "Expression"
        },
        {
            "expression": "passion meets opportunities",
            "meaning": "عندما يلتقي الشغف الحقيقي بفرص السوق المتاحة",
            "type": "Expression"
        },
        {
            "expression": "pay well",
            "meaning": "يدر دخلاً وراتباً مجزياً",
            "type": "Expression"
        },
        {
            "expression": "combine ... with ...",
            "meaning": "يدمج / يجمع بين ... و ...",
            "type": "Verb + Preposition"
        },
        {
            "expression": "lead to (+ v-ing / n)",
            "meaning": "يؤدي إلى نتيجة معينة",
            "type": "Verb + Preposition"
        },
        {
            "expression": "prevent ... from (+ v-ing / n)",
            "meaning": "يمنع / يحمي شخصاً أو شيئاً من حدوث ضرر",
            "type": "Verb + Preposition"
        }
    ],
    "derivatives": [
        {
            "root": "reflect",
            "verb": "reflect (يتأمل / يعكس)",
            "noun": "reflection / self-reflection (تأمل ذاتي / انعكاس)",
            "adjective": "reflective (تأملي / متفكر)",
            "adverb": "reflectively (بتأمل وتفكر)"
        },
        {
            "root": "guide",
            "verb": "guide (يرشد / يوجه)",
            "noun": "guidance (إرشاد) / guide (مرشد)",
            "adjective": "guiding (توجيهي / ملهم)",
            "adverb": "—"
        },
        {
            "root": "decide",
            "verb": "decide (يقرر / يحسم)",
            "noun": "decision (قرار) / decisiveness (حسم)",
            "adjective": "decisive (حاسم / قاطع)",
            "adverb": "decisively (بحسم وجرأة)"
        },
        {
            "root": "combine",
            "verb": "combine (يدمج / يخلط)",
            "noun": "combination (دمج / توليفة)",
            "adjective": "combined (مشترك / مدمج)",
            "adverb": "—"
        },
        {
            "root": "grow",
            "verb": "grow (ينمو / يتطور)",
            "noun": "growth (نمو / ازدهار)",
            "adjective": "growing (متنامٍ / متصاعد)",
            "adverb": "growingly (على نحو متزايد)"
        }
    ],
    "confusion": [
        {
            "pair": "Career vs Job vs Profession vs Work",
            "difference": "الفروق الدقيقة بين مسميات العمل والوظيفة",
            "examples": [
                "Career: المسيرة المهنية للشخص طوال حياته (She had a long career in journalism).",
                "Job: وظيفة محددة بأجر ثابت ومنصب معين (He got a full-time job at a bank).",
                "Profession: مهنة تخصصية تتطلب تعليماً وتدريباً عالياً كالطب والمحاماة (the medical profession).",
                "Work: اسم لا يُعد يعبر عن الجهد أو مكان العمل بشكل عام (I have a lot of work today)."
            ]
        },
        {
            "pair": "Mentor vs Tutor vs Coach",
            "difference": "الفرق بين المرشد والمعلم الخصوصي والمدرب الرياضي/الحياتي",
            "examples": [
                "Mentor: شخص ذو خبرة يقدم النصح والتوجيه الحياتي والمهني على المدى الطويل.",
                "Tutor: مدرس خاص يساعد طالباً في مادة دراسية أو أكاديمية محددة.",
                "Coach: مدرب يدرب شخصاً أو فريقاً لتحسين مهارة رياضية أو تحقيق أداء محدد."
            ]
        },
        {
            "pair": "Internship vs Training Course",
            "difference": "فترة المعايشة التدريبية داخل شركة مقابل الكورس النظري",
            "examples": [
                "Internship: تدريب عملي داخل مؤسسة واقعية لاكتساب خبرة ومهام ميدانية حقيقية.",
                "Training Course: دورة تعليمية أو ورشة عمل منظمة لشرح مهارة محددة."
            ]
        },
        {
            "pair": "Rewarding vs Awarding",
            "difference": "صفة تعني مجزٍ نفسياً مقابل منح جائزة أو تكريم",
            "examples": [
                "Rewarding (adj): شيء يعطيك شعوراً بالرضا والسعادة (Working with charities is very rewarding).",
                "Awarding (n / v): عملية منح جائزة أو شهادة رسمية (The awarding of the Nobel Prize takes place annually)."
            ]
        }
    ],
    "storybook": {
        "title": "3D Interactive Story: The Compass Within",
        "subtitle": "رحلة البحث عن البوصلة الداخلية واكتشاف الشغف والتوازن المهني",
        "scenes": [
            {
                "scene": 1,
                "title": "Scene 1: The Weight of Expectations (ثقل التوقعات)",
                "text": "Seif stood in his room, surrounded by medical textbooks his relatives had recommended. Everyone urged him to study medicine purely because it was prestigious and would pay well. Yet every time Seif opened those books, he felt completely drained. His real spark ignited whenever he coded simple web applications and helped local charities analyze their environmental data. He realized he needed self-reflection before making a hasty, careless choice about his future.",
                "arabicText": "وقف سيف في غرفته محاطاً بكتب الطب التي أوصاه بها أقاربه؛ فالجميع كان يحثه على دراسة الطب فقط لأنه ذو مكانة اجتماعية مرموقة ويدر دخلاً كبيراً. ومع ذلك، كلما فتح تلك الكتب شعر بالإحباط والخمول. كانت شعلة حماسه الحقيقية تشتعل عندما يبرمج تطبيقات الويب ويساعد الجمعيات الخيرية في تحليل بياناتها البيئية. أدرك سيف أنه في أمس الحاجة إلى التأمل الذاتي ومراجعة نفسه قبل اتخاذ قرار متسرع وغير مدروس بشأن مستقبله.",
                "vocabularyHighlights": ["self-reflection", "careless choice", "pay well", "income"]
            },
            {
                "scene": 2,
                "title": "Scene 2: The Guidance of a Mentor (إرشاد الموجه الخبير)",
                "text": "Seeking clarity, Seif scheduled a session with Mr. Tarek, his school's career counselor. Mr. Tarek listened carefully and smiled warmly: 'Choosing a career is not just about income, Seif. It affects your happiness and gives you a deep sense of purpose. A good career path is built when your authentic passion meets genuine market opportunities.' Mr. Tarek advised Seif to research the daily tasks, growth opportunities, and technological requirements of green tech industries.",
                "arabicText": "بحثاً عن الوضوح، حجز سيف جلسة مع الأستاذ طارق، المستشار المهني بالمدرسة. استمع الأستاذ طارق باهتمام وابتسم بلطف قائلاً: 'اختيار المسار المهني لا يتعلق بالدخل المادي فحسب يا سيف، بل يؤثر مباشرة على سعادتك ويمنحك إحساساً عميقاً بوجود هدف. إن المسار المهني الناجح يُبنى عندما يلتقي شغفك الحقيقي بفرص السوق المتاحة.' ونصح الأستاذ طارق سيفاً بأن يُجري بحثاً دقيقاً حول المهام اليومية وفرص النمو والمتطلبات التكنولوجية في مجال التكنولوجيا الخضراء.",
                "vocabularyHighlights": ["guidance", "mentor", "sense of purpose", "career path", "growth opportunities", "daily tasks"]
            },
            {
                "scene": 3,
                "title": "Scene 3: The Summer Breakthrough (انطلاقة التدريب الصيفي)",
                "text": "Following his mentor's guidance, Seif applied for a summer internship at an environmental data firm. For eight weeks, he collaborated with software engineers to monitor renewable energy sensors. By combining his coding talent with rigorous daily effort, he discovered how fulfilling it was to build a balance between his personal passion and modern market needs. He knew with certainty that his future lay in green data technology.",
                "arabicText": "اتباعاً لتوجيهات مرشده، تقدم سيف للحصول على تدريب صيفي في شركة لتحليل البيانات البيئية. وعلى مدار ثمانية أسابيع، تعاون مع مهندسي البرمجيات لمراقبة حساسات الطاقة المتجددة. وبدمج موهبته في البرمجة مع جهوده اليومية الحثيثة، اكتشف كم هو ممتع ومشبع للذات أن يحقق توازناً بين شغفه الشخصي واحتياجات السوق العصرية. وبات يعلم على وجه اليقين أن مستقبله يكمن في تكنولوجيا البيانات الخضراء.",
                "vocabularyHighlights": ["internship", "combine with", "talent", "fulfilling", "build a balance", "market needs"]
            }
        ]
    },
    "dialogue": {
        "title": "Speaking Dialogue: Navigating Career Crossroads",
        "scenario": "A supportive career counseling dialogue between Seif and Career Advisor Mr. Tarek discussing self-reflection, passions, and market requirements.",
        "turns": [
            {
                "speaker": "Seif",
                "role": "High School Student",
                "text": "Good morning, Mr. Tarek. I'm feeling quite anxious about choosing my university pathway.",
                "arabic": "صباح الخير يا أستاذ طارق. أشعر بقلق بالغ حيال اختيار مساري الجامعي."
            },
            {
                "speaker": "Mr. Tarek",
                "role": "Career Advisor",
                "text": "Good morning, Seif. Take a seat. Remember that taking time to reflect on your interests is the best starting point.",
                "arabic": "صباح الخير يا سيف. تفضل بالجلوس. تذكر أن تخصيص الوقت للتأمل في اهتماماتك هو أفضل نقطة انطلاق."
            },
            {
                "speaker": "Seif",
                "role": "High School Student",
                "text": "My relatives keep insisting that I should only choose a profession that pays exceptionally well, regardless of whether I enjoy it.",
                "arabic": "أقاربي يصرون دوماً على أن أختار فقط مهنة تدفع راتباً استثنائياً كبيراً، بغض النظر عما إذا كنت أستمتع بها أم لا."
            },
            {
                "speaker": "Mr. Tarek",
                "role": "Career Advisor",
                "text": "Choosing a career is not just about income, Seif. It shapes your daily happiness and provides an enduring sense of purpose.",
                "arabic": "اختيار المسار المهني لا يتعلق بالدخل المادي فحسب يا سيف؛ بل إنه يصيغ سعادتك اليومية ويمنحك إحساساً دائماً بوجود هدف وقيمة."
            },
            {
                "speaker": "Seif",
                "role": "High School Student",
                "text": "How can I be certain that my passion can actually support a viable, lasting career?",
                "arabic": "كيف أتأكد من أن شغفي يمكن أن يدعم مسيرة مهنية مستدامة وناجحة في الواقع؟"
            },
            {
                "speaker": "Mr. Tarek",
                "role": "Career Advisor",
                "text": "By researching job requirements, daily tasks, and market needs. You must build a balance between what you love and what employers seek.",
                "arabic": "من خلال البحث في متطلبات الوظائف، والمهام اليومية، واحتياجات السوق. يجب أن تحقق توازناً بين ما تحبه وما يبحث عنه أصحاب العمل."
            },
            {
                "speaker": "Seif",
                "role": "High School Student",
                "text": "Should I try applying for a summer internship or volunteer work before making my final decision?",
                "arabic": "هل يجدر بي أن أحاول التقديم على تدريب صيفي أو عمل تطوعي قبل اتخاذ قراري النهائي؟"
            },
            {
                "speaker": "Mr. Tarek",
                "role": "Career Advisor",
                "text": "Absolutely! Real workplace exposure will show you what truly excites you and prevent you from making hasty choices.",
                "arabic": "بكل تأكيد! فالاحتكاك ببيئة العمل الحقيقية سيوضح لك ما يثير حماسك حقاً ويحميك من اتخاذ قرارات متسرعة."
            }
        ]
    },
    "quiz": [
        {
            "id": 1,
            "type": "mcq",
            "question": "Choosing a career is not just about ............; it also affects our personal happiness.",
            "options": ["income", "internship", "balance", "guidance"],
            "correct": 0,
            "explanation": "وفقاً لنص الاستماع بكتاب الطالب (SB p. 86): اختيار المهنة لا يتعلق بالدخل المادي فقط (income) بل يؤثر على السعادة وراحة البال.",
            "hint": "Think about the financial reward of a job."
        },
        {
            "id": 2,
            "type": "mcq",
            "question": "Through careful ............, students discover their true strengths, values, and interests.",
            "options": ["confusion", "self-reflection", "proposal", "distraction"],
            "correct": 1,
            "explanation": "التأمل الذاتي ومراجعة النفس (self-reflection) يساعد الطلاب على إدراك قدراتهم واهتماماتهم وقيمهم.",
            "hint": "Careful thought about one's own character and qualities."
        },
        {
            "id": 3,
            "type": "mcq",
            "question": "Learning about daily tasks and job ............ helps young people avoid making wrong career decisions.",
            "options": ["requirements", "hobbies", "rumors", "jokes"],
            "correct": 0,
            "explanation": "معرفة متطلبات واشتراطات الوظيفة (requirements) والمهام اليومية تحمي الشباب من الوقوع في اختيارات خاطئة.",
            "hint": "Things that are needed or demanded for a job."
        },
        {
            "id": 4,
            "type": "mcq",
            "question": "Doing a summer ............ at a local company provides students with valuable real-world experience.",
            "options": ["internship", "vacation", "ceremony", "punishment"],
            "correct": 0,
            "explanation": "التدريب العملي المؤقت (internship) يمنح الطلاب خبرة واقعية وعملية بالغة القيمة.",
            "hint": "A period of work experience offered by a company."
        },
        {
            "id": 5,
            "type": "mcq",
            "question": "A rewarding career path is built when personal ............ meets real market opportunities.",
            "options": ["laziness", "passion", "doubt", "fear"],
            "correct": 1,
            "explanation": "المسار المهني الناجح يتحقق عندما يلتقي الشغف والحماس الصادق (passion) بالفرص الحقيقية المتاحة في السوق.",
            "hint": "Strong enthusiasm and love for doing something."
        },
        {
            "id": 6,
            "type": "mcq",
            "question": "By combining natural ............ with consistent effort, students can turn an ordinary job into an inspiring journey.",
            "options": ["carelessness", "talent", "pride", "conflict"],
            "correct": 1,
            "explanation": "بدمج الموهبة الفطرية (talent) مع بذل الجهد الدؤوب تتحول الوظيفة العادية إلى رحلة ملهمة وناجحة.",
            "hint": "Natural ability or skill."
        },
        {
            "id": 7,
            "type": "mcq",
            "question": "The wise ............ of parents and teachers can prevent young people from making careless choices.",
            "options": ["guidance", "absence", "rejection", "punishment"],
            "correct": 0,
            "explanation": "التوجيه والإرشاد الحكيم (guidance) من المعلمين والأسرة يمنع الشباب من القرارات المتسرعة.",
            "hint": "Help, direction, or advice given by experienced people."
        },
        {
            "id": 8,
            "type": "mcq",
            "question": "An experienced ............ can give invaluable career advice and support to young graduates.",
            "options": ["stranger", "mentor", "competitor", "novice"],
            "correct": 1,
            "explanation": "المرشد الناصح ذو الخبرة (mentor) يقدم دعماً وتوجيهاً لا يقدر بثمن للخريجين الجدد.",
            "hint": "An experienced and trusted adviser."
        },
        {
            "id": 9,
            "type": "mcq",
            "question": "It is essential to build a ............ between your personal dreams and current market needs.",
            "options": ["wall", "balance", "barrier", "conflict"],
            "correct": 1,
            "explanation": "المتلازمة اللفظية الشهيرة: (build a balance) تعني يحقق توازناً بين الأحلام الشخصية واحتياجات السوق.",
            "hint": "A state of equilibrium where things are equal and stable."
        },
        {
            "id": 10,
            "type": "mcq",
            "question": "Working with humanitarian charities gave Mariam a profound sense of ............",
            "options": ["purpose", "guilt", "fatigue", "boredom"],
            "correct": 0,
            "explanation": "التعبير (a sense of purpose) يعني إحساس بوجود هدف ورسالة نبيلة في العمل والحياة.",
            "hint": "A feeling that your work has meaning."
        },
        {
            "id": 11,
            "type": "mcq",
            "question": "Nursing is an exhausting profession, but helping sick patients recover is deeply ............",
            "options": ["rewarding", "pointless", "careless", "harmful"],
            "correct": 0,
            "explanation": "الصفة (rewarding) تعني مجزٍ نفسياً ومعنوياً ويشعر صاحبها بالرضا العظيم.",
            "hint": "Providing personal satisfaction or gratification."
        },
        {
            "id": 12,
            "type": "mcq",
            "question": "A job that provides personal satisfaction and fulfills your ambition is called a ............ career.",
            "options": ["fulfilling", "miserable", "destructive", "pointless"],
            "correct": 0,
            "explanation": "الصفة (fulfilling) تصف المسيرة المهنية التي تحقق لصاحبها الرضا الذاتي والطموح.",
            "hint": "Making someone satisfied or happy because of fully developing their character or abilities."
        },
        {
            "id": 13,
            "type": "mcq",
            "question": "Before making an important career decision, you should ............ thorough research on modern industries.",
            "options": ["conduct", "make", "take", "damage"],
            "correct": 0,
            "explanation": "المتلازمة اللفظية الصحيحة هي (conduct research) أي يُجري بحثاً واستقصاءً علمياً أو مهنياً.",
            "hint": "Collocation with 'research'."
        },
        {
            "id": 14,
            "type": "mcq",
            "question": "Students must take their time to ............ responsible choices for their higher education.",
            "options": ["make", "build", "conduct", "invent"],
            "correct": 0,
            "explanation": "المتلازمة اللفظية المعتمدة هي (make choices / make a choice) أي يختار أو يتخذ خيارات.",
            "hint": "Collocation used with 'choices'."
        },
        {
            "id": 15,
            "type": "mcq",
            "question": "Meeting senior professionals can provide young learners with a ............ vision of what a job entails.",
            "options": ["clear", "blind", "hasty", "cloudy"],
            "correct": 0,
            "explanation": "المتلازمة اللفظية (provide a clear vision) تعني يمنح رؤية واضحة ومستنيرة.",
            "hint": "Opposite of obscure or dark."
        },
        {
            "id": 16,
            "type": "mcq",
            "question": "You should ............ time to think carefully before deciding which college major to pursue.",
            "options": ["take", "waste", "lose", "break"],
            "correct": 0,
            "explanation": "المتلازمة اللفظية (take time) تعني يخصص وقتاً كافياً للتفكير والتمعن.",
            "hint": "To spend sufficient time."
        },
        {
            "id": 17,
            "type": "mcq",
            "question": "Early participation in volunteer work helps ............ future career goals.",
            "options": ["shape", "destroy", "cancel", "break"],
            "correct": 0,
            "explanation": "المتلازمة (shape goals) تعني يصيغ ويبلور أهدافه المهنية.",
            "hint": "To influence the development of something."
        },
        {
            "id": 18,
            "type": "mcq",
            "question": "You can ............ technical skill with artistic creativity to become a great animator.",
            "options": ["combine", "divide", "separate", "remove"],
            "correct": 0,
            "explanation": "الفعل وحرف الجر (combine ... with ...) يعني يدمج أو يجمع بين شيئين لتحقيق نتيجة متميزة.",
            "hint": "To join two or more things together."
        },
        {
            "id": 19,
            "type": "mcq",
            "question": "Making a hasty and unguided career choice can lead ............ serious dissatisfaction later.",
            "options": ["to", "at", "for", "in"],
            "correct": 0,
            "explanation": "الفعل (lead) يأتي بعده حرف الجر (to) ويتبعه اسم أو فعل مضاف له -ing بمعنى يؤدي إلى.",
            "hint": "Preposition following 'lead'."
        },
        {
            "id": 20,
            "type": "mcq",
            "question": "Sound career counseling helps prevent students ............ choosing unsuitable universities.",
            "options": ["from", "with", "about", "for"],
            "correct": 0,
            "explanation": "القاعدة: (prevent + مفعول + from + v-ing) تعني يمنع فلاناً من ارتكاب خطأ أو الوقوع في مكروه.",
            "hint": "Preposition used after 'prevent someone'."
        },
        {
            "id": 21,
            "type": "mcq",
            "question": "In the sentence 'She has a deep passion for writing', the synonym of 'passion' is ............",
            "options": ["enthusiasm", "dislike", "carelessness", "reluctance"],
            "correct": 0,
            "explanation": "مرادف كلمة (passion) هو الحماس والشغف الشديد (enthusiasm / zeal).",
            "hint": "Synonym meaning intense excitement and interest."
        },
        {
            "id": 22,
            "type": "mcq",
            "question": "The antonym of the word 'rewarding' is ............",
            "options": ["unrewarding", "satisfying", "enriching", "fruitful"],
            "correct": 0,
            "explanation": "مضاد كلمة (rewarding) التي تعني مجزٍ هو (unrewarding / frustrating) غير مجزٍ.",
            "hint": "Opposite with negative prefix."
        },
        {
            "id": 23,
            "type": "mcq",
            "question": "The antonym of 'careless' is ............",
            "options": ["careful", "reckless", "hasty", "neglectful"],
            "correct": 0,
            "explanation": "مضاد (careless) مهمل أو متسرع هو (careful / cautious) حذر ودقيق.",
            "hint": "Mindful and paying attention to detail."
        },
        {
            "id": 24,
            "type": "mcq",
            "question": "The noun form derived from the verb 'reflect' when thinking about yourself is ............",
            "options": ["reflection", "reflective", "reflector", "reflectingly"],
            "correct": 0,
            "explanation": "الاسم المشتق من الفعل (reflect) في سياق التفكير والتأمل هو (reflection / self-reflection).",
            "hint": "Noun ending with suffix -tion."
        },
        {
            "id": 25,
            "type": "mcq",
            "question": "A person who demonstrates the ability to make firm decisions quickly is described as ............",
            "options": ["decisive", "hesitant", "careless", "aimless"],
            "correct": 0,
            "explanation": "الصفة المشتقة من (decide) التي تعني حاسم وقاطع في قراراته هي (decisive).",
            "hint": "Adjective from 'decision'."
        },
        {
            "id": 26,
            "type": "mcq",
            "question": "A doctor belongs to the medical ............, which requires extensive specialized university training.",
            "options": ["profession", "hobby", "chore", "jobless"],
            "correct": 0,
            "explanation": "كلمة (profession) تعبر عن مهنة مرموقة وتخصصية تتطلب تعليماً وتدريباً جامعياً مثل الطب والمحاماة والتدريس.",
            "hint": "A type of job that requires special training or qualification."
        },
        {
            "id": 27,
            "type": "mcq",
            "question": "A senior colleague who provides wisdom and advice over an extended period is a ............",
            "options": ["mentor", "tutor", "trainee", "stranger"],
            "correct": 0,
            "explanation": "المرشد الناصح (mentor) يوجه وينصح مهنياً وحياتياً على المدى الطويل.",
            "hint": "A trusted personal and professional guide."
        },
        {
            "id": 28,
            "type": "mcq",
            "question": "A temporary practical placement in a business to learn real workplace skills is an ............",
            "options": ["internship", "award", "interview", "exhibition"],
            "correct": 0,
            "explanation": "فترة التدريب العملي الميداني للطلاب والخريجين تسمى (internship).",
            "hint": "Practical on-the-job training program."
        },
        {
            "id": 29,
            "type": "mcq",
            "question": "Rapid technological change requires today's graduates to commit to lifelong ............",
            "options": ["learning", "sleeping", "forgetting", "hesitation"],
            "correct": 0,
            "explanation": "المصطلح (lifelong learning) يعني التعلم المستمر مدى الحياة لمواكبة تطورات سوق العمل.",
            "hint": "Continuous acquiring of new knowledge and skills."
        },
        {
            "id": 30,
            "type": "mcq",
            "question": "Jobs that offer strong promotion pathways and skill advancement provide great ............",
            "options": ["growth opportunities", "careless choices", "dead ends", "daily boredom"],
            "correct": 0,
            "explanation": "الوظائف التي تتيح الترقية وتطوير المهارات توفر (growth opportunities) أي فرص نمو وتطور مهني ممتاز.",
            "hint": "Chances to develop and advance in a career."
        }
    ]
}

# Write lesson-3.data.js
data_js_path = os.path.join(u6_dir, "lesson-3.data.js")
with open(data_js_path, "w", encoding="utf-8") as f:
    f.write("/**\n")
    f.write(" * Secondary 1 - Unit 6 - Lesson 3 Data Payload\n")
    f.write(" * Career Decisions & Exploring Opportunities (قرارات المسار المهني واكتشاف الفرص)\n")
    f.write(" * Official Source: El-Moasser 2026/2027 (SB pages 86 & 87, textbook p. 331)\n")
    f.write(" * ZERO GRAMMAR MANDATE COMPLIANT: Strictly Lexical, Collocations, Phonetic, Functional & Reading.\n")
    f.write(" */\n\n")
    f.write("window.lessonData = ")
    json.dump(lesson3_data, f, ensure_ascii=False, indent=2)
    f.write(";\n\n")
    f.write("window.__LESSON_DATA__ = window.lessonData;\n")

print(f"Generated {data_js_path}")

# Write lesson-3.html
html_content = """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 1 - Unit 6: Lesson 3 | Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css?v=6">
    <link rel="stylesheet" href="../../assets/css/curriculum-renderer.css?v=6">
</head>
<body class="lesson-page" data-stage="sec1" data-unit="6" data-lesson="3">

    <div class="container lesson-container">
        <!-- Floating Audio Control Widget -->
        <div class="audio-control-bar">
            <button id="toggleAudioBtn" class="audio-btn" title="تشغيل / كتم الصوت">🔊</button>
            <span class="audio-hint">استمع للنطق والمؤثرات</span>
        </div>

        <!-- Lesson Header Card -->
        <div class="lesson-header-card">
            <div class="lesson-badge-strip">
                <span class="badge badge-stage">الصف الأول الثانوي</span>
                <span class="badge badge-unit">الوحدة السادسة: Job Hunting</span>
                <span class="badge badge-lesson">الدرس 3</span>
                <span class="badge badge-sb">SB pages 86 & 87</span>
            </div>
            <h1 class="lesson-hero-title">Career Decisions & Opportunities</h1>
            <p class="lesson-hero-arabic">قرارات المسار المهني، التأمل الذاتي، التوفيق بين الشغف واحتياجات السوق، والتوجيه والإرشاد 🎯 (Zero Grammar)</p>
        </div>

        <!-- Navigation Tabs Bar -->
        <div class="lesson-tabs-nav" id="lessonTabsNav">
            <button class="tab-link active" data-tab="vocab" data-sound-click="tab">📚 المفردات واللغويات</button>
            <button class="tab-link" data-tab="story" data-sound-click="tab">📖 القصة التفاعلية 3D</button>
            <button class="tab-link" data-tab="dialogue" data-sound-click="tab">🗣️ محادثة التوجيه المهني</button>
            <button class="tab-link" data-tab="quiz" data-sound-click="tab">🎯 اختبار المعاصر (30 سؤالاً)</button>
        </div>

        <!-- Tab: Vocabulary & Linguistics -->
        <div id="vocab" class="tab-content active">
            <!-- Key Vocabulary -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">🔑</span>
                    <h3 class="sec-title">المفردات الرئيسية (Key Vocabulary)</h3>
                    <span class="sec-tag">كتاب المعاصر ص 331</span>
                </div>
                <div id="keyVocabGrid" class="vocab-cards-grid"></div>
            </div>

            <!-- Accumulative Vocabulary -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">🌱</span>
                    <h3 class="sec-title">المفردات التراكمية وتطوير المهارات (Accumulative Vocabulary)</h3>
                </div>
                <div id="accumulativeVocabGrid" class="vocab-cards-grid"></div>
            </div>

            <!-- Definitions -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">📖</span>
                    <h3 class="sec-title">التعريفات الهامة (Definitions)</h3>
                </div>
                <div id="definitionsList" class="definitions-grid"></div>
            </div>

            <!-- Synonyms & Antonyms -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">🔄</span>
                    <h3 class="sec-title">المترادفات والمتضادات (Synonyms & Antonyms)</h3>
                </div>
                <div id="synonymsAntonymsGrid" class="syn-ant-cards-grid"></div>
            </div>

            <!-- Collocations -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">🤝</span>
                    <h3 class="sec-title">المتلازمات اللفظية (Collocations)</h3>
                </div>
                <div id="collocationsGrid" class="collocations-table-wrap"></div>
            </div>

            <!-- Expressions & Prepositions -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">💬</span>
                    <h3 class="sec-title">التعبيرات وحروف الجر (Expressions & Prepositions)</h3>
                </div>
                <div id="expressionsGrid" class="expressions-list"></div>
            </div>

            <!-- Derivatives -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">🌳</span>
                    <h3 class="sec-title">المشتقات اللغوية (Derivatives)</h3>
                </div>
                <div id="derivativesTable" class="derivatives-table-wrap"></div>
            </div>

            <!-- Clear the Confusion -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">💡</span>
                    <h3 class="sec-title">لاحظ الفرق وتجنب الخلط (Clear the Confusion)</h3>
                </div>
                <div id="confusionContainer" class="confusion-grid"></div>
            </div>
        </div>

        <!-- Tab: 3D Storybook -->
        <div id="story" class="tab-content">
            <div class="storybook-container">
                <div class="storybook-hero-banner">
                    <div class="storybook-hero-badge">📖 القصة التفاعلية 3D</div>
                    <h2 class="storybook-hero-title">The Compass Within</h2>
                    <p class="storybook-hero-subtitle">رحلة البحث عن البوصلة الداخلية واكتشاف الشغف والتوازن المهني</p>
                </div>
                <div id="storybookMount" class="storybook-mount"></div>
            </div>
        </div>

        <!-- Tab: Speaking Dialogue -->
        <div id="dialogue" class="tab-content">
            <div class="dialogue-container">
                <div class="dialogue-hero-banner">
                    <div class="dialogue-hero-badge">🗣️ محادثة التوجيه المهني الناطقة</div>
                    <h2 class="dialogue-hero-title">Navigating Career Crossroads</h2>
                    <p class="dialogue-hero-subtitle">حوار توجيهي بين الطالب سيف والمستشار المهني الأستاذ طارق مع النطق الصوتي الفوري</p>
                </div>
                <div id="dialogueMount" class="dialogue-mount"></div>
            </div>
        </div>

        <!-- Tab: Authentic 30-MCQ Quiz (Zero Grammar) -->
        <div id="quiz" class="tab-content">
            <div class="quiz-container">
                <div class="quiz-hero-banner">
                    <div class="quiz-hero-badge">🎯 اختبار المعاصر الشامل (30 سؤالاً)</div>
                    <h3 class="quiz-hero-title">تقييم شامل على مفردات وتعبيرات ومشتقات الدرس الثالث</h3>
                    <p class="quiz-hero-desc">أسئلة مطابقة 100% لمواصفات الامتحانات من كتاب المعاصر 2026/2027 مع التغذية الراجعة والشرح العربي الفوري.</p>
                </div>
                <div class="quiz-controls-bar">
                    <div class="quiz-progress-track">
                        <div id="quizProgressBar" class="quiz-progress-fill" style="width: 0%;"></div>
                    </div>
                    <div class="quiz-stats-display">
                        <span id="quizScoreDisplay">الدرجة: 0 / 30</span>
                        <span id="quizCounterDisplay">السؤال 1 من 30</span>
                    </div>
                </div>
                <div id="quizCardsFeed" class="quiz-cards-feed"></div>
                <div id="quizResultModal" class="quiz-modal" style="display: none;">
                    <div class="quiz-modal-content">
                        <div class="quiz-modal-avatar">🏆</div>
                        <h3 id="quizModalTitle">أحسنت صنعاً!</h3>
                        <p id="quizModalScoreText">درجتك: 30 / 30</p>
                        <p id="quizModalFeedback"></p>
                        <button class="quiz-retry-btn" onclick="resetQuiz()">🔄 إعادة المحاولة</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer Navigation Controls -->
        <div class="nav-controls">
            <a href="./lesson-1.html" class="back-btn" data-sound-click="click">⬅️ الدرس السابق: Lessons 1 & 2</a>
            <a href="./lesson-4-5.html" class="next-btn" data-sound-click="click">الدرس التالي: Lessons 4 & 5 ➡️</a>
        </div>
    </div>

    <!-- Scripts: Sound Effects, Data Payload, and Decoupled Presentation Engine -->
    <script src="../../assets/js/sounds.js"></script>
    <script src="./lesson-3.data.js"></script>
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/ui.js"></script>
</body>
</html>
"""

html_path = os.path.join(u6_dir, "lesson-3.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated {html_path}")
