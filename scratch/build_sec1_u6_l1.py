import os
import json

u6_dir = r"c:\Users\Al700t\OneDrive\Desktop\Learn_English\Sec_1\unit-6"
os.makedirs(u6_dir, exist_ok=True)

lesson_data = {
    "id": "sec1-u6-l1",
    "stage": "sec1",
    "unit": 6,
    "lesson": "1 & 2",
    "title": "Lessons 1 & 2: The Modern Job Hunt & Job Interviews",
    "description": "المفردات الأساسية والتراكمية، التعريفات، المتلازمات، التعبيرات وحروف الجر، المشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً من كتاب المعاصر 2026/2027 🎯 (Zero Grammar)",
    "keyVocabulary": [
        {
            "word": "approach",
            "partOfSpeech": "v / n",
            "arabic": "يقترب من / أسلوب أو نهج",
            "example": "He decided to approach the interview with confidence and an open mind."
        },
        {
            "word": "association",
            "partOfSpeech": "n",
            "arabic": "جمعية - منظمة - اتحاد",
            "example": "She joined a professional association for software developers to build contacts."
        },
        {
            "word": "attitude",
            "partOfSpeech": "n",
            "arabic": "موقف - توجه عقلي - سلوك",
            "example": "A positive attitude is one of the most valued qualities employers look for."
        },
        {
            "word": "check-in",
            "partOfSpeech": "n",
            "arabic": "اجتماع موجز لمتابعة سير العمل - مراجعة سريعة",
            "example": "We have a quick weekly check-in every Monday morning to review our milestones."
        },
        {
            "word": "clear-headed",
            "partOfSpeech": "adj",
            "arabic": "صافي الذهن - متقد الفكر",
            "example": "Taking deep breaths helped him stay clear-headed throughout the challenging interview."
        },
        {
            "word": "common ground",
            "partOfSpeech": "n",
            "arabic": "أرضية مشتركة - نقاط اتفاق",
            "example": "During the discussion, both candidates found common ground on remote work policies."
        },
        {
            "word": "coordinate",
            "partOfSpeech": "v",
            "arabic": "ينسق - ينظم جهود",
            "example": "The manager coordinates work across different departments smoothly."
        },
        {
            "word": "department",
            "partOfSpeech": "n",
            "arabic": "قسم في شركة أو مؤسسة",
            "example": "She submitted her application directly to the human resources department."
        },
        {
            "word": "footprint",
            "partOfSpeech": "n",
            "arabic": "أثر - انطباع أو بصمة",
            "example": "Your digital footprint on professional networks influences hiring decisions."
        },
        {
            "word": "generic",
            "partOfSpeech": "adj",
            "arabic": "عام - غير مخصص - نمطي",
            "example": "Avoid sending generic cover letters; tailor each one to the specific company."
        },
        {
            "word": "ground",
            "partOfSpeech": "n",
            "arabic": "أساس - قاعدة - منطلق",
            "example": "Thorough research into the company lays solid ground for a successful interview."
        },
        {
            "word": "implementing",
            "partOfSpeech": "n / v-ing",
            "arabic": "تنفيذ - تطبيق",
            "example": "Implementing the new digital system improved productivity across all teams."
        },
        {
            "word": "impressive",
            "partOfSpeech": "adj",
            "arabic": "مبهر - رائع ومميز",
            "example": "The young applicant delivered an impressive presentation about his portfolio."
        },
        {
            "word": "independently",
            "partOfSpeech": "adv",
            "arabic": "بشكل مستقل - دون مساعدة",
            "example": "Modern employers appreciate workers who can research and complete tasks independently."
        },
        {
            "word": "innovative",
            "partOfSpeech": "adj",
            "arabic": "مبتكر - إبداعي",
            "example": "The team came up with an innovative approach to reduce operational costs."
        },
        {
            "word": "mentor",
            "partOfSpeech": "n / v",
            "arabic": "مرشد - ناصح أمين / يُرشد",
            "example": "Having an experienced mentor gave the graduate valuable guidance in the job market."
        },
        {
            "word": "polish(ed)",
            "partOfSpeech": "v / adj",
            "arabic": "ينقح - يصقل / منقح ومتقن",
            "example": "He spent two hours polishing his CV until it looked smooth and highly professional."
        },
        {
            "word": "resume",
            "partOfSpeech": "n",
            "arabic": "سيرة ذاتية (موجزة)",
            "example": "Ensure your resume highlights your key achievements and relevant skills clearly."
        },
        {
            "word": "silo",
            "partOfSpeech": "n",
            "arabic": "صومعة (عزلة إدارية بين الأقسام)",
            "example": "Departments shouldn't operate in silos; teamwork requires transparent communication."
        },
        {
            "word": "stakeholder",
            "partOfSpeech": "n",
            "arabic": "صاحب مصلحة - طرف معني بالمشروع",
            "example": "Before launching the product, the manager consulted all key project stakeholders."
        },
        {
            "word": "trend",
            "partOfSpeech": "n",
            "arabic": "اتجاه سائد - صيحة عامة",
            "example": "Remote and hybrid work models represent a major trend in today's labor market."
        },
        {
            "word": "action plan",
            "partOfSpeech": "n",
            "arabic": "خطة عمل تنفيذية",
            "example": "Every job seeker needs a detailed action plan with daily milestones."
        }
    ],
    "accumulativeVocabulary": [
        {
            "word": "job description",
            "partOfSpeech": "n",
            "arabic": "الوصف الوظيفي",
            "example": "Carefully read the job description to match your skills with their requirements."
        },
        {
            "word": "job hunter",
            "partOfSpeech": "n",
            "arabic": "الباحث عن عمل",
            "example": "A smart job hunter uses professional networks rather than sending random emails."
        },
        {
            "word": "job market",
            "partOfSpeech": "n",
            "arabic": "سوق العمل",
            "example": "Technological advancements have radically reshaped the international job market."
        },
        {
            "word": "job posting",
            "partOfSpeech": "n",
            "arabic": "إعلان توظيف",
            "example": "She noticed a new job posting for an English translator at an international NGO."
        },
        {
            "word": "job seeker",
            "partOfSpeech": "n",
            "arabic": "طالب الوظيفة",
            "example": "Job seekers must polish their resumes and prepare thoroughly for interviews."
        },
        {
            "word": "networking strategy",
            "partOfSpeech": "n",
            "arabic": "استراتيجية تكوين شبكة علاقات مهنية",
            "example": "Developing a solid networking strategy opens doors to unadvertised positions."
        },
        {
            "word": "online presence",
            "partOfSpeech": "n",
            "arabic": "التواجد الإلكتروني المهني",
            "example": "Recruiters evaluate your online presence before inviting you for an in-person meeting."
        },
        {
            "word": "training session",
            "partOfSpeech": "n",
            "arabic": "جلسة تدريبية",
            "example": "The company organized an intensive training session on modern project management."
        },
        {
            "word": "assessment",
            "partOfSpeech": "n",
            "arabic": "تقييم",
            "example": "The initial assessment measures candidates' analytical and communication abilities."
        },
        {
            "word": "candidate",
            "partOfSpeech": "n",
            "arabic": "مُرشح لوظيفة",
            "example": "Only three candidates were shortlisted for the final interview round."
        },
        {
            "word": "digital footprint",
            "partOfSpeech": "n",
            "arabic": "الأثر أو البصمة الرقمية",
            "example": "Be mindful of what you post online, as it forms your digital footprint."
        },
        {
            "word": "employer",
            "partOfSpeech": "n",
            "arabic": "صاحب العمل / جهة التوظيف",
            "example": "A reliable employer provides a supportive environment and growth opportunities."
        },
        {
            "word": "handle",
            "partOfSpeech": "v",
            "arabic": "يتعامل مع - يدير أزمة",
            "example": "He knows how to handle stress and remain calm under tight deadlines."
        },
        {
            "word": "land",
            "partOfSpeech": "v",
            "arabic": "يقتنص / يفوز بـ (وظيفة أو فرصة)",
            "example": "With proper preparation and dedication, he managed to land his dream job."
        },
        {
            "word": "maintain",
            "partOfSpeech": "v",
            "arabic": "يحافظ على - يواصل",
            "example": "It is essential to maintain professional connections throughout your career."
        },
        {
            "word": "modify",
            "partOfSpeech": "v",
            "arabic": "يعدل - يحوّر",
            "example": "You should modify your cover letter for each position you target."
        },
        {
            "word": "personalized",
            "partOfSpeech": "adj",
            "arabic": "مخصص ومعد خصيصاً",
            "example": "Sending a personalized message to the recruiter demonstrates genuine interest."
        },
        {
            "word": "qualified",
            "partOfSpeech": "adj",
            "arabic": "مؤهل ولديه الكفاءة",
            "example": "She is highly qualified for the post, holding both a degree and rich experience."
        },
        {
            "word": "relevant",
            "partOfSpeech": "adj",
            "arabic": "ذو صلة - ملائم للموضوع",
            "example": "List only relevant work history on your resume to keep it concise and targeted."
        },
        {
            "word": "screen",
            "partOfSpeech": "v",
            "arabic": "يفرز - يفحص بعناية",
            "example": "HR specialists screen hundreds of applicants before selecting interviewees."
        },
        {
            "word": "specialize",
            "partOfSpeech": "v",
            "arabic": "يتخصص في مجاله",
            "example": "He decided to specialize in artificial intelligence and machine learning."
        },
        {
            "word": "stress",
            "partOfSpeech": "n",
            "arabic": "ضغط عصبي أو إجهاد",
            "example": "Learning techniques to handle stress is vital for workplace wellness."
        }
    ],
    "definitions": [
        {
            "word": "silos",
            "definition": "Teams or departments that work in isolation, not sharing information with others.",
            "arabic": "فرق عمل أو أقسام تعمل في عزلة دون مشاركة المعلومات مع غيرها"
        },
        {
            "word": "keep up with",
            "definition": "To continue to be informed about something or remain at the same level as developments.",
            "arabic": "يواكب أو يظل على اطلاع مستمر بآخر التطورات"
        },
        {
            "word": "association",
            "definition": "A group of people with a common purpose, goal, or professional interest.",
            "arabic": "رابطة أو جمعية تضم مجموعة أشخاص يجمعهم هدف مشترك"
        },
        {
            "word": "implementing",
            "definition": "Putting a plan, idea, policy, or system into action and actual practice.",
            "arabic": "تنفيذ خطة أو وضع فكرة ونظام حيز التطبيق الفعلي"
        },
        {
            "word": "generic",
            "definition": "General or plain; not special, tailored, or specific to an individual situation.",
            "arabic": "عام أو نمطي؛ غير مخصص أو محدد لحالة بعينها"
        },
        {
            "word": "polished",
            "definition": "Made to look smooth, refined, elegant, and thoroughly professional.",
            "arabic": "مصقول ومتقن؛ تم تحسينه وتعديله ليبدو أنيقاً واحترافياً"
        },
        {
            "word": "impressive",
            "definition": "Making you feel admiration, respect, or praise because of being remarkably skillful.",
            "arabic": "مبهر؛ يثير الإعجاب والتقدير لروعته أو مهارته العالية"
        },
        {
            "word": "independently",
            "definition": "On your own, without needing direct supervision, help, or control from others.",
            "arabic": "باستقلالية؛ بمفردك دون حاجة لإشراف مباشر أو معونة"
        },
        {
            "word": "innovative",
            "definition": "Using creative, forward-thinking ideas to solve problems or introduce improvements.",
            "arabic": "مبتكر؛ يستخدم أفكاراً جديدة وخلاقة لحل المشكلات"
        },
        {
            "word": "department",
            "definition": "A specific section or division within a company or organization handling specialized work.",
            "arabic": "قسم أو إدارة متخصصة داخل شركة أو منظمة"
        },
        {
            "word": "approach",
            "definition": "A particular way of dealing with a situation or problem; a chosen method or strategy.",
            "arabic": "نهج أو أسلوب؛ طريقة التعامل مع مسألة أو مهمة"
        },
        {
            "word": "stakeholder",
            "definition": "A person or group with an active interest, involvement, or concern in a company or project.",
            "arabic": "صاحب مصلحة؛ طرف معني أو متأثر بنشاط المشروع ونتائجه"
        },
        {
            "word": "check-in",
            "definition": "A brief, structured meeting or update to monitor progress and assess ongoing tasks.",
            "arabic": "اجتماع متابعة قصير لتفقد سير الأمور وتقييم المستجدات"
        },
        {
            "word": "ground",
            "definition": "A starting point, foundational basis, or fundamental reason for an activity.",
            "arabic": "أساس أو قاعدة انطلاق لمشروع أو حوار"
        },
        {
            "word": "footprint",
            "definition": "The mark, record, or lasting impact that an individual or organization leaves behind.",
            "arabic": "الأثر أو البصمة التي يتركها شخص أو كيان (كالبصمة الرقمية)"
        },
        {
            "word": "attitude",
            "definition": "A settled way of thinking or feeling about something; how one behaves and reacts.",
            "arabic": "توجه عقلي أو سلوك وموقف تجاه الأشخاص والمواقف"
        },
        {
            "word": "coordinate",
            "definition": "To organize different elements of an activity or manage people to work harmoniously together.",
            "arabic": "ينسق ويرتب جهود عدة أطراف لتعمل معاً بكفاءة وتناغم"
        }
    ],
    "synonymsAntonyms": [
        {
            "word": "approach (n)",
            "synonyms": "manner, method, way, strategy",
            "antonyms": "hesitation, inaction",
            "arabic": "نهج - أسلوب"
        },
        {
            "word": "coordinate (v)",
            "synonyms": "arrange, organize, synchronize",
            "antonyms": "confuse, disturb, disorganize",
            "arabic": "ينسق - يرتب"
        },
        {
            "word": "impressive (adj)",
            "synonyms": "remarkable, amazing, admirable, striking",
            "antonyms": "plain, ordinary, unimpressive",
            "arabic": "مبهر - لافت"
        },
        {
            "word": "association (n)",
            "synonyms": "organization, society, union, alliance",
            "antonyms": "separation, disconnection, isolation",
            "arabic": "منظمة - رابطة"
        },
        {
            "word": "attitude (n)",
            "synonyms": "mindset, outlook, viewpoint, stance",
            "antonyms": "indifference, apathy",
            "arabic": "توجه عقلي - سلوك"
        },
        {
            "word": "footprint (n)",
            "synonyms": "impact, effect, impression, trace",
            "antonyms": "removal, erasure, disappearance",
            "arabic": "أثر - بصمة"
        },
        {
            "word": "generic (adj)",
            "synonyms": "general, common, non-specific, collective",
            "antonyms": "specific, particular, distinctive",
            "arabic": "عام - غير مخصص"
        },
        {
            "word": "implementing (n)",
            "synonyms": "application, execution, realization",
            "antonyms": "cancellation, prevention, abandonment",
            "arabic": "تنفيذ - تطبيق"
        },
        {
            "word": "independently (adv)",
            "synonyms": "individually, separately, autonomously",
            "antonyms": "jointly, collectively, dependently",
            "arabic": "باستقلالية"
        },
        {
            "word": "innovative (adj)",
            "synonyms": "creative, inventive, original, novel",
            "antonyms": "traditional, conventional, old-fashioned",
            "arabic": "مبتكر - إبداعي"
        },
        {
            "word": "polished (adj)",
            "synonyms": "refined, elegant, perfected, sophisticated",
            "antonyms": "rough, unfinished, unrefined",
            "arabic": "مصقول - متقن"
        },
        {
            "word": "stakeholder (n)",
            "synonyms": "partner, participant, shareholder",
            "antonyms": "outsider, stranger, nonparticipant",
            "arabic": "طرف معني - صاحب مصلحة"
        }
    ],
    "collocations": [
        {
            "verb": "fill",
            "noun": "a position",
            "meaning": "يشغل وظيفة / يعين موظفاً في منصب",
            "example": "The executive board decided to fill the open managerial position with an internal candidate."
        },
        {
            "verb": "handle",
            "noun": "stress",
            "meaning": "يتعامل مع الضغوط العصبية بنجاح",
            "example": "Practicing mindfulness helps professionals handle workplace stress effectively."
        },
        {
            "verb": "implement",
            "noun": "a plan",
            "meaning": "ينفذ خطة عمل على أرض الواقع",
            "example": "The committee worked hard to implement the reform plan within the deadline."
        },
        {
            "verb": "increase",
            "noun": "the chances of",
            "meaning": "يزيد من فرص النجاح",
            "example": "Tailoring your CV will greatly increase the chances of landing an interview."
        },
        {
            "verb": "make",
            "noun": "a detailed action plan",
            "meaning": "يضع خطة عمل تفصيلية ومحددة",
            "example": "Before applying, you should make a detailed action plan outlining your target industries."
        },
        {
            "verb": "make",
            "noun": "contact",
            "meaning": "يجري اتصالاً أو يتواصل مع جهة ما",
            "example": "Job candidates should make contact with alumni working in their target firms."
        },
        {
            "verb": "screen",
            "noun": "candidates",
            "meaning": "يفرز ويقيم المتقدمين للوظائف",
            "example": "Automated recruitment systems screen candidates based on key professional terms."
        },
        {
            "verb": "stay",
            "noun": "clear-headed",
            "meaning": "يبقى صافي الذهن ومتزناً",
            "example": "It is vital to stay clear-headed when interviewers ask tricky questions."
        },
        {
            "verb": "take",
            "noun": "short breaks",
            "meaning": "يأخذ فترات استراحة قصيرة",
            "example": "Remember to take short breaks while studying or searching for jobs online."
        }
    ],
    "expressionsPrepositions": [
        {
            "phrase": "in hand",
            "meaning": "تحت السيطرة ويتم التعامل معه",
            "example": "Don't panic about the logistics; the entire event schedule is firmly in hand.",
            "type": "expression"
        },
        {
            "phrase": "make or break",
            "meaning": "يحدد مصير الأمر (إما النجاح التام أو الفشل الذريع)",
            "example": "First impressions during an interview can make or break your job prospects.",
            "type": "expression"
        },
        {
            "phrase": "land the right opportunity",
            "meaning": "يقتنص الفرصة المناسبة ويظفر بها",
            "example": "Persistent networking will help you land the right opportunity in your field.",
            "type": "expression"
        },
        {
            "phrase": "open doors to",
            "meaning": "يفتح آفاقاً جديدة وأبواباً للفرص",
            "example": "Fluent English and computer skills open doors to rewarding international careers.",
            "type": "expression"
        },
        {
            "phrase": "find common ground",
            "meaning": "يصل إلى أرضية مشتركة ونقاط اتفاق",
            "example": "The negotiators managed to find common ground after hours of constructive dialogue.",
            "type": "expression"
        },
        {
            "phrase": "the days of ... are gone",
            "meaning": "ولّت أيام كذا وانتهى عصرها",
            "example": "The days of sending paper CVs by postal mail are gone.",
            "type": "expression"
        },
        {
            "phrase": "in silos",
            "meaning": "في عزلة تامة بين الفرق",
            "example": "Companies stumble when their design and marketing departments operate in silos.",
            "type": "expression"
        },
        {
            "phrase": "lay the ground for",
            "meaning": "يمهد الطريق ويؤسس لـ",
            "example": "Volunteering early in college laid the ground for his future leadership role.",
            "type": "expression"
        },
        {
            "phrase": "bring together",
            "meaning": "يجمع بين الأطراف ليتعاونوا",
            "example": "Cross-functional meetings bring together engineers and designers.",
            "type": "prepositional_verb"
        },
        {
            "phrase": "keep up with",
            "meaning": "يواكب أو يساير المستجدات",
            "example": "Professionals must constantly learn to keep up with technological advances.",
            "type": "prepositional_phrase"
        },
        {
            "phrase": "apply for / apply to",
            "meaning": "يتقدم بطلب لوظيفة (for) / يتقدم لجهة أو مؤسسة (to)",
            "example": "You apply for a job, but you apply to a university or company.",
            "type": "preposition"
        },
        {
            "phrase": "specialize in",
            "meaning": "يتخصص في مجال علمي أو عملي",
            "example": "Tarek decided to specialize in digital marketing and social media strategy.",
            "type": "preposition"
        },
        {
            "phrase": "break ... into",
            "meaning": "يقسم شيئاً إلى أجزاء أصغر",
            "example": "Break large projects into manageable daily tasks to avoid being overwhelmed.",
            "type": "phrasal_verb"
        },
        {
            "phrase": "inform ... with / of",
            "meaning": "يحيط علماً بـ / يخطر بـ",
            "example": "Please inform me with any changes regarding the interview location.",
            "type": "preposition"
        }
    ],
    "derivatives": [
        {
            "root": "approach",
            "verb": "approach (يقترب من)",
            "noun": "approach (نهج - أسلوب)",
            "adjective": "approachable (ودود - يسهل الحديث معه)",
            "adverb": "—"
        },
        {
            "root": "associate",
            "verb": "associate (يربط بين / يشارك)",
            "noun": "association (رابطة - اتحاد)",
            "adjective": "associated (مرتبط بـ)",
            "adverb": "—"
        },
        {
            "root": "coordinate",
            "verb": "coordinate (ينسق)",
            "noun": "coordination (تنسيق) / coordinator (منسق)",
            "adjective": "coordinated (منسق ومحكم)",
            "adverb": "—"
        },
        {
            "root": "generic",
            "verb": "—",
            "noun": "generic / genericness (العمومية)",
            "adjective": "generic (عام - غير مخصص)",
            "adverb": "generically (بشكل عام)"
        },
        {
            "root": "ground",
            "verb": "ground (يؤسس - يثبت)",
            "noun": "ground (أساس - قاعدة)",
            "adjective": "grounded (راسخ - مستند لأدلة)",
            "adverb": "—"
        },
        {
            "root": "implement",
            "verb": "implement (يطبق - ينفذ)",
            "noun": "implementation (تنفيذ - تطبيق)",
            "adjective": "implemented (مطبق بالفعل)",
            "adverb": "—"
        },
        {
            "root": "impress",
            "verb": "impress (يبهر - يترك أثراً حسناً)",
            "noun": "impression (انطباع)",
            "adjective": "impressive (مبهر) / impressed (مبهور)",
            "adverb": "impressively (بشكل مبهر)"
        },
        {
            "root": "depend",
            "verb": "depend (يعتمد على)",
            "noun": "independence (استقلالية)",
            "adjective": "independent (مستقل)",
            "adverb": "independently (باستقلالية)"
        },
        {
            "root": "innovate",
            "verb": "innovate (يبتكر)",
            "noun": "innovation (ابتكار) / innovator (مبتكر)",
            "adjective": "innovative (مبتكر)",
            "adverb": "innovatively (بابتكار)"
        },
        {
            "root": "polish",
            "verb": "polish (ينقح - يصقل)",
            "noun": "polishing (صقل - تنقيح) / polisher (أداة تلميع)",
            "adjective": "polished (مصقول - متقن)",
            "adverb": "—"
        }
    ],
    "clearConfusion": [
        {
            "term1": "apply for",
            "meaning1": "يتقدم بطلب للحصول على وظيفة أو منحة أو تأشيرة (الشيء المطلوب)",
            "term2": "apply to",
            "meaning2": "يتقدم بطلب إلى جهة معينة (جامعة/شركة) أو تنطبق القاعدة على شخص ما",
            "comparisonNote": "He applied for a sales job (الوظيفة), but he applied to the telecom firm (الجهة)."
        },
        {
            "term1": "make way for",
            "meaning1": "يفسح الطريق مادياً لمرور سيارة إسعاف أو موكب",
            "term2": "give way to",
            "meaning2": "يحل محله تدريجياً أو يستسلم للتطور التكنولوجي والأفكار الحديثة",
            "comparisonNote": "Drivers must make way for the ambulance. Old floppy disks gave way to flash drives."
        },
        {
            "term1": "break in",
            "meaning1": "يقاطع الحديث بدون مفعول، أو يقتحم مكاناً بدون مفعول",
            "term2": "break into",
            "meaning2": "يقتحم مكاناً بالقوة ويليه مفعول به",
            "comparisonNote": "Please do not break in while I speak. A thief tried to break into the bank vault."
        },
        {
            "term1": "break ... into",
            "meaning1": "يقسم أو يجزئ مشروعاً أو مشكلة إلى أجزاء صغيرة يمكن إدارتها",
            "term2": "break up",
            "meaning2": "يتفرق أو ينفصل (للاجتماعات أو العلاقات)",
            "comparisonNote": "Let's break the large curriculum into manageable daily study modules."
        },
        {
            "term1": "colleague",
            "meaning1": "زميل في العمل أو المهنة",
            "term2": "college",
            "meaning2": "كلية جامعية ومؤسسة تعليم عالي",
            "comparisonNote": "My colleague Dr. Mona and I attended the same engineering college in Cairo."
        },
        {
            "term1": "hunt (v / n)",
            "meaning1": "يبحث بجدية وتتبع (job hunt = البحث الدؤوب عن عمل)",
            "term2": "search (v / n)",
            "meaning2": "يبحث في مكان محدد عن شيء مفقود أو معلومة",
            "comparisonNote": "Modern job hunting requires persistent networking rather than casual online searches."
        }
    ],
    "storybook": [
        {
            "title": "Scene 1: Beyond the Generic Resume",
            "textEn": "When Omar graduated with honors, he spent his first weeks sending identical, generic resumes to every online job posting he found. Days passed without a single callback. Frustrated, he reached out to his former university professor, who served as his mentor. The professor smiled and offered sage advice: 'Omar, the days of sending hundreds of generic resumes are gone. Recruiters screen candidates with intelligent systems looking for tailored evidence. You must clean up your digital footprint, highlight relevant accomplishments, and make a detailed action plan!'",
            "textAr": "عندما تخرج عمر بمرتبة الشرف، قضى أسابيعه الأولى يرسل سيرته الذاتية النمطية العامة إلى كل إعلان توظيف يجده عبر الإنترنت. مرت الأيام دون مكالمة واحدة. وبشعور من الإحباط، تواصل مع أستاذه الجامعي القديم الذي كان بمثابة مرشد أمين له. ابتسم الأستاذ وقال: 'يا عمر، ولّت أيام إرسال مئات السير الذاتية العامة النمطية! مسؤولو التوظيف يفرزون المرشحين بأنظمة تبحث عن أدلة مصممة بعناية. عليك تنقيح أثرك الرقمي، وإبراز إنجازاتك ذات الصلة، ووضع خطة عمل تفصيلية!'",
            "imagePrompt": "A focused young Egyptian graduate in a modern workspace analyzing his resume on a laptop alongside an inspiring mentor in an academic office.",
            "moral": "Tailored authenticity and strategic action plans always triumph over generic applications."
        },
        {
            "title": "Scene 2: Staying Clear-Headed Under Pressure",
            "textEn": "Taking his mentor's advice to heart, Omar completely revamped his approach. He polished his resume, carefully aligned his skills with specific job descriptions, and built meaningful professional connections. Soon, an impressive tech firm invited him for an intensive round of interviews. As the interview panel posed complex, unforeseen crisis scenarios, Omar paused, took a deep breath, and stayed remarkably clear-headed. Instead of panicking, he broke down each scenario step by step, demonstrating how to handle stress and coordinate teams effectively.",
            "textAr": "واضعاً نصيحة مرشده نصب عينيه، غير عمر نهجه بالكامل؛ صقل سيرته الذاتية، وطابق مهاراته بعناية مع التوصيفات الوظيفية، وبنى شبكة علاقات مهنية هادفة. وسرعان ما دعته شركة تكنولوجية مرموقة لمقابلة مكثفة. وعندما طرحت لجنة المقابلة سيناريوهات أزمات معقدة وغير متوقعة، تمهل عمر وأخذ نفساً عميقاً وحافظ على صفاء ذهنه. وبدلاً من الارتباك، جزّأ كل أزمة خطوة بخطوة موضحاً كيفية التعامل مع الضغوط وتنسيق الفرق بكفاءة.",
            "imagePrompt": "A composed young professional sitting confidently across from an executive interview panel in a sleek glass boardroom, speaking calmly.",
            "moral": "Remaining calm and clear-headed turns high-pressure interviews into opportunities to shine."
        },
        {
            "title": "Scene 3: Breaking Silos and Landing the Opportunity",
            "textEn": "During the final stage, the executive director asked Omar how he would handle friction between departments that traditionally operated in isolated silos. Omar explained that finding common ground among all stakeholders was paramount. 'When we bring teams together through weekly check-ins and open dialogue, innovative solutions naturally emerge,' Omar replied with poise. The director was visibly impressed. That evening, Omar received the official offer: he had landed the position of junior project coordinator, proving that perseverance, tailored preparation, and emotional intelligence truly open doors.",
            "textAr": "خلال المرحلة الأخيرة، سأل المدير التنفيذي عمر كيف سيتعامل مع التوتر بين الأقسام التي تعمل في صوامع منعزلة. أوضح عمر أن إيجاد أرضية مشتركة بين جميع الأطراف المعنية هو الأساس. وقال: 'حين نجمع الفرق معاً من خلال اجتماعات متابعة أسبوعية وحوار مفتوح، تظهر الحلول المبتكرة تلقائياً'. أُعجب المدير برده، وفي ذلك المساء تلقى عمر العرض الرسمي لشغل وظيفة منسق مشروعات مبتدئ، مثبتاً أن الإصرار والتحضير الدقيق يفتحان كل الأبواب.",
            "imagePrompt": "A joyful young man celebrating receiving his official employment contract in an innovative Cairo office lobby, surrounded by supportive colleagues.",
            "moral": "Collaboration, breaking down silos, and finding common ground are the true pillars of modern career success."
        }
    ],
    "dialogue": [
        {
            "speaker": "Mr. Khaled",
            "role": "HR Director at Horizon Solutions",
            "textEn": "Welcome to Horizon Solutions, Omar. To start, how would you describe your overall approach to career development and job hunting in today's fast-paced market?",
            "textAr": "أهلاً بك في شركة هورايزون يا عمر. في البداية، كيف تصف نهجك العام في التطوير المهني والبحث عن وظيفة في سوق العمل المتسارع اليوم؟",
            "avatar": "👨‍💼"
        },
        {
            "speaker": "Omar",
            "role": "Candidate for Project Coordinator",
            "textEn": "Thank you, Mr. Khaled. I believe the days of broadcasting generic resumes are gone. My strategy focuses on researching each company, refining my digital footprint, and building an actionable plan that aligns my capabilities directly with the employer's needs.",
            "textAr": "شكراً لك يا أستاذ خالد. أؤمن بأن أيام توزيع السير الذاتية النمطية قد ولت. تركز استراتيجيتي على دراسة كل شركة، وتحسين أثري الرقمي، وبناء خطة عملية تطابق مهاراتي مباشرة مع متطلبات صاحب العمل.",
            "avatar": "👨‍💻"
        },
        {
            "speaker": "Mr. Khaled",
            "role": "HR Director at Horizon Solutions",
            "textEn": "Impressive mindset! In our sector, our teams often have to deal with intense deadlines. How do you handle stress when multiple challenges arise at once?",
            "textAr": "عقلية مبهرة! في قطاعنا، غالباً ما تتعامل الفرق مع مواعيد نهائية ضاغطة. كيف تتعامل مع الإجهاد والضغط العصبي عندما تنشأ عدة تحديات في وقت واحد؟",
            "avatar": "👨‍💼"
        },
        {
            "speaker": "Omar",
            "role": "Candidate for Project Coordinator",
            "textEn": "I make it a rule to stay clear-headed. I immediately break the problem into smaller, actionable components, prioritize high-impact deliverables, and coordinate transparently with team members so nothing slips through the cracks.",
            "textAr": "أحرص دائماً على البقاء صافي الذهن؛ أجزئ المشكلة فوراً إلى مهام أصغر قابلة للتنفيذ، وأرتب الأولويات، وأنسق بشفافية مع أعضاء الفريق لضمان عدم إغفال أي تفصيلة.",
            "avatar": "👨‍💻"
        },
        {
            "speaker": "Mr. Khaled",
            "role": "HR Director at Horizon Solutions",
            "textEn": "That is vital. In many large firms, departments tend to work in isolated silos. If you notice a disconnect between marketing and software teams, how would you intervene?",
            "textAr": "هذا أمر حيوي للغاية. في العديد من الشركات الكبرى، تميل الأقسام للعمل في صوامع منعزلة. إذا لاحظت انقطاعاً في التواصل بين التسويق وفريق البرمجة، كيف تتدخل؟",
            "avatar": "👨‍💼"
        },
        {
            "speaker": "Omar",
            "role": "Candidate for Project Coordinator",
            "textEn": "I would establish regular check-ins to bring key stakeholders together. By facilitating open conversations, we can discover common ground, align shared goals, and cultivate an innovative collaborative environment.",
            "textAr": "سأقوم بإنشاء اجتماعات متابعة منتظمة لجمع الأطراف المعنية الرئيسية. وعبر تسهيل الحوار المفتوح، نستطيع اكتشاف أرضية مشتركة، ومواءمة الأهداف، وخلق بيئة تعاونية مبتكرة.",
            "avatar": "👨‍💻"
        },
        {
            "speaker": "Mr. Khaled",
            "role": "HR Director at Horizon Solutions",
            "textEn": "Your answers demonstrate mature emotional intelligence and solid preparation. When would you be ready to join our department?",
            "textAr": "إجاباتك تدل على نضج وذكاء عاطفي وتحضير متميز. متى ستكون مستعداً للانضمام إلى قسمنا؟",
            "avatar": "👨‍💼"
        },
        {
            "speaker": "Omar",
            "role": "Candidate for Project Coordinator",
            "textEn": "I have all my documentation in hand and could gladly start next Sunday, ready to contribute from day one!",
            "textAr": "كل أوراقي جاهزة وتحت السيطرة، ويسعدني البدء يوم الأحد القادم ومستعد للمساهمة بفاعلية من اليوم الأول!",
            "avatar": "👨‍💻"
        }
    ],
    "quiz": [
        {
            "id": 1,
            "question": "Teams or departments that work in isolation, not sharing information with others are called ......... . (القليوبية - الخصوص 2026)",
            "options": ["stakeholders", "check-ins", "silos", "colleagues"],
            "correct": 2,
            "explanationAr": "تُعرف فرق العمل أو الأقسام المنعزلة التي لا تتشارك المعلومات بـ (silos = صوامع إدارية)."
        },
        {
            "id": 2,
            "question": "To ......... something is to continue to be informed about something or remain at the same level. (الإسكندرية - العجمي 2026)",
            "options": ["approach", "handle", "keep up with", "contact"],
            "correct": 2,
            "explanationAr": "التعبير (keep up with) يعني يواكب أو يظل على اطلاع مستمر بآخر التطورات."
        },
        {
            "id": 3,
            "question": "What is an 'association'? (قنا - نجع حمادي 2026)",
            "options": [
                "A personal opinion.",
                "A method of teaching.",
                "A group of people with a common purpose.",
                "A job application document."
            ],
            "correct": 2,
            "explanationAr": "تعريف (association): جماعة أو رابطة من الأشخاص يجمعهم غرض أو هدف مشترك (A group of people with a common purpose)."
        },
        {
            "id": 4,
            "question": "Putting a plan, idea, or system into action means ......... it. (القليوبية - الخصوص 2026)",
            "options": ["attitude", "implementing", "mentor", "challenge"],
            "correct": 1,
            "explanationAr": "وضع خطة أو فكرة حيز التنفيذ والتطبيق الفعلي هو (implementing)."
        },
        {
            "id": 5,
            "question": "......... means general or plain; not special or specific to an individual situation.",
            "options": ["Relevant", "Polished", "Generic", "Impressive"],
            "correct": 2,
            "explanationAr": "الصفة (generic) تعني عام أو نمطي وغير مخصص لحالة بعينها."
        },
        {
            "id": 6,
            "question": "......... means made to look smooth, professional, or refined; something improved to look better.",
            "options": ["Generic", "Impressive", "Innovative", "Polished"],
            "correct": 3,
            "explanationAr": "الصفة (polished) تعني مصقول ومنقح ومتقن بحيث يبدو أنيقاً واحترافياً."
        },
        {
            "id": 7,
            "question": "......... means making you feel admiration because of being very good or skillful.",
            "options": ["Impressive", "Generic", "Polished", "Innovative"],
            "correct": 0,
            "explanationAr": "الصفة (impressive) تعني مبهر ورائع يثير الإعجاب والتقدير لمهارته."
        },
        {
            "id": 8,
            "question": "......... means on your own, without needing help or control from others.",
            "options": ["Greatly", "Independently", "Directly", "Currently"],
            "correct": 1,
            "explanationAr": "الظرف (independently) يعني باستقلالية وبشكل فردي دون الاعتماد على مساعدة الآخرين."
        },
        {
            "id": 9,
            "question": "......... means using new and creative ideas to solve problems or make things better.",
            "options": ["Generic", "Polished", "Innovative", "Former"],
            "correct": 2,
            "explanationAr": "الصفة (innovative) تعني مبتكر وخلاق ويستخدم أفكاراً جديدة."
        },
        {
            "id": 10,
            "question": "A ......... is a section of a company or organization that deals with a specific job.",
            "options": ["department", "stakeholder", "footprint", "ground"],
            "correct": 0,
            "explanationAr": "القسم أو الإدارة داخل شركة تسمى (department)."
        },
        {
            "id": 11,
            "question": "A/An ......... is a way of dealing with something; a chosen method or strategy.",
            "options": ["approach", "attitude", "check-in", "footprint"],
            "correct": 0,
            "explanationAr": "النهج أو الأسلوب في التعامل مع موضوع يسمى (approach)."
        },
        {
            "id": 12,
            "question": "......... are people or groups who care about or are affected by a company or project.",
            "options": ["Stakeholders", "Departments", "Approaches", "Grounds"],
            "correct": 0,
            "explanationAr": "الأطراف المعنية أو أصحاب المصلحة في مشروع يطلق عليهم (stakeholders)."
        },
        {
            "id": 13,
            "question": "A/An ......... is a short meeting or update to see how things are going.",
            "options": ["department", "footprint", "check-in", "approach"],
            "correct": 2,
            "explanationAr": "الاجتماع السريع لمتابعة المستجدات وسير العمل يسمى (check-in)."
        },
        {
            "id": 14,
            "question": "......... is a starting point, foundational basis, or fundamental reason.",
            "options": ["Check-in", "Footprint", "Department", "Ground"],
            "correct": 3,
            "explanationAr": "الأساس أو قاعدة الانطلاق تسمى (ground)."
        },
        {
            "id": 15,
            "question": "A/An ......... is the mark, record, or impact something leaves behind.",
            "options": ["stakeholder", "footprint", "approach", "check-in"],
            "correct": 1,
            "explanationAr": "الأثر أو الانطباع أو البصمة التي تتركها تسمى (footprint)."
        },
        {
            "id": 16,
            "question": "A/An ......... is the way of thinking about something; how you react to people or situations.",
            "options": ["approach", "attitude", "ground", "department"],
            "correct": 1,
            "explanationAr": "التوجه العقلي أو السلوك والموقف تجاه الأشخاص والمواقف هو (attitude)."
        },
        {
            "id": 17,
            "question": "To ......... is to organize the different parts of an activity or make people work together effectively.",
            "options": ["maintain", "modify", "specialize", "coordinate"],
            "correct": 3,
            "explanationAr": "تنظيم أجزاء النشاط وتنسيق جهود الأفراد للعمل معاً بكفاءة هو (coordinate)."
        },
        {
            "id": 18,
            "question": "The company decided to ......... the position with young qualified engineers.",
            "options": ["fill", "handle", "screen", "take"],
            "correct": 0,
            "explanationAr": "المتلازمة اللفظية لشغل وظيفة هي (fill a position)."
        },
        {
            "id": 19,
            "question": "Before starting your job search, you need to ......... a detailed action plan.",
            "options": ["make", "screen", "stay", "take"],
            "correct": 0,
            "explanationAr": "المتلازمة اللفظية لوضع خطة عمل هي (make an action plan)."
        },
        {
            "id": 20,
            "question": "Good preparation and tailored applications can ......... the chances of success.",
            "options": ["handle", "make", "fill", "increase"],
            "correct": 3,
            "explanationAr": "المتلازمة اللفظية لزيادة فرص النجاح هي (increase the chances of)."
        },
        {
            "id": 21,
            "question": "Job candidates must learn how to ......... stress during difficult interview questions.",
            "options": ["make", "handle", "increase", "fill"],
            "correct": 1,
            "explanationAr": "المتلازمة اللفظية للتعامل مع الضغوط العصبية هي (handle stress)."
        },
        {
            "id": 22,
            "question": "Automated recruitment software will ......... candidates before inviting them for interviews.",
            "options": ["increase", "take", "screen", "make"],
            "correct": 2,
            "explanationAr": "المتلازمة اللفظية لفحص وفرز المرشحين هي (screen candidates)."
        },
        {
            "id": 23,
            "question": "Don't worry about the interview logistics; the situation is 'in hand'. This means the situation is ......... .",
            "options": ["under control", "very expensive", "completely lost", "difficult to understand"],
            "correct": 0,
            "explanationAr": "التعبير الاصطلاحي (in hand) يعني أن الأمر تحت السيطرة تماماً (under control)."
        },
        {
            "id": 24,
            "question": "First impressions can 'make or break' a candidate's chances. This means they can ......... .",
            "options": [
                "make the interview simple only",
                "have no effect on the outcome",
                "lead to complete success or total failure",
                "make the salary less important"
            ],
            "correct": 2,
            "explanationAr": "التعبير الاصطلاحي (make or break) يعني يحدد مصير الشيء إما بالنجاح الكامل أو الفشل (lead to success or failure)."
        },
        {
            "id": 25,
            "question": "When two negotiators 'find common ground', they manage to ......... .",
            "options": [
                "discover a shared opinion or interest",
                "start a serious heated argument",
                "refuse to listen to each other",
                "work completely isolated"
            ],
            "correct": 0,
            "explanationAr": "التعبير (find common ground) يعني التوصل لأرضية ونقاط اتفاق واهتمام مشترك (discover a shared opinion or interest)."
        },
        {
            "id": 26,
            "question": "It is not easy to keep ......... with rapid developments in artificial intelligence.",
            "options": ["up", "with", "up with", "upon"],
            "correct": 2,
            "explanationAr": "حرف الجر والتعبير المتكامل لمواكبة التطورات هو (keep up with)."
        },
        {
            "id": 27,
            "question": "If you want to attend Alexandria University, you must apply ......... it before July.",
            "options": ["to", "into", "with", "on"],
            "correct": 0,
            "explanationAr": "يستخدم حرف الجر (to) مع الجهة أو المؤسسة: (apply to a university / company)."
        },
        {
            "id": 28,
            "question": "He decided to apply ......... the vacant marketing coordinator post.",
            "options": ["for", "to", "with", "into"],
            "correct": 0,
            "explanationAr": "يستخدم حرف الجر (for) مع الوظيفة أو المنحة المطلوبة: (apply for a job / post)."
        },
        {
            "id": 29,
            "question": "Mr. Ahmed is kind and ........., so new employees always feel comfortable asking him for advice.",
            "options": ["approaching", "approach", "approachable", "approachability"],
            "correct": 2,
            "explanationAr": "الصفة المناسبة للشخص الودود سهل التعامل هي (approachable)."
        },
        {
            "id": 30,
            "question": "In modern factories, old manual equipment had to ......... new robotic automated systems.",
            "options": ["make way", "break into", "give way to", "experiment"],
            "correct": 2,
            "explanationAr": "التعبير (give way to) يعني يفسح المجال ويحل محله شيء أحدث في التطور (gave way to new automated systems)."
        }
    ]
}

# Write lesson-1.data.js
data_js_path = os.path.join(u6_dir, "lesson-1.data.js")
with open(data_js_path, "w", encoding="utf-8") as f:
    f.write("// Sec 1 - Unit 6 - Lessons 1 & 2 Data Payload (El-Moasser 2026/2027)\n")
    f.write("// ZERO GRAMMAR MANDATE: Pure vocabulary, definitions, collocations, derivatives, clear confusion, storybook, speaking dialogue, and authentic quiz.\n")
    f.write("window.lessonData = ")
    json.dump(lesson_data, f, ensure_ascii=False, indent=2)
    f.write(";\n\n")
    f.write("window.__LESSON_DATA__ = window.lessonData;\n")

print("Created lesson-1.data.js successfully!")

# Write lesson-1.html
html_content = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 1 - Unit 6: Lessons 1 & 2 | Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css?v=6">
    <link rel="stylesheet" href="../../assets/css/curriculum-renderer.css?v=6">
</head>
<body class="lesson-page" data-stage="sec1" data-unit="6" data-lesson="1">

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
                <span class="badge badge-lesson">الدروس 1 و 2</span>
                <span class="badge badge-sb">SB pages 81 : 85</span>
            </div>
            <h1 class="lesson-hero-title">The Modern Job Hunt & Job Interviews</h1>
            <p class="lesson-hero-arabic">البحث الحديث عن عمل، مقابلات التوظيف، الأثر الرقمي، التغلب على الصوامع الإدارية، واختبار المعاصر 2026/2027 🎯 (Zero Grammar)</p>
        </div>

        <!-- Navigation Tabs Bar -->
        <div class="lesson-tabs-nav" id="lessonTabsNav">
            <button class="tab-link active" data-tab="vocab" data-sound-click="tab">📚 المفردات واللغويات</button>
            <button class="tab-link" data-tab="story" data-sound-click="tab">📖 القصة التفاعلية 3D</button>
            <button class="tab-link" data-tab="dialogue" data-sound-click="tab">🗣️ محادثة المقابلة الناطقة</button>
            <button class="tab-link" data-tab="quiz" data-sound-click="tab">🎯 اختبار المعاصر (30 سؤالاً)</button>
        </div>

        <!-- Tab: Vocabulary & Linguistics -->
        <div id="vocab" class="tab-content active">
            <!-- Key Vocabulary -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">🔑</span>
                    <h3 class="sec-title">المفردات الرئيسية (Key Vocabulary)</h3>
                    <span class="sec-tag">كتاب المعاصر 2026/2027</span>
                </div>
                <div id="keyVocabGrid" class="vocab-cards-grid"></div>
            </div>

            <!-- Job Market & Accumulative Vocabulary -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">💼</span>
                    <h3 class="sec-title">مصطلحات سوق العمل والتراكمية (Job Market & Accumulative Vocab)</h3>
                </div>
                <div id="accumulativeVocabGrid" class="vocab-cards-grid"></div>
            </div>

            <!-- Definitions -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">📖</span>
                    <h3 class="sec-title">التعريفات الهامة (Definitions)</h3>
                    <span class="sec-tag">مطابقة لامتحانات المحافظات</span>
                </div>
                <div id="definitionsFeed" class="definitions-feed"></div>
            </div>

            <!-- Synonyms & Antonyms -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">🔄</span>
                    <h3 class="sec-title">المترادفات والمتضادات (Synonyms & Antonyms)</h3>
                </div>
                <div id="synonymsAntonymsGrid" class="synonyms-table-wrap"></div>
            </div>

            <!-- Collocations -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">🤝</span>
                    <h3 class="sec-title">المتلازمات اللفظية (Collocations)</h3>
                </div>
                <div id="collocationsFeed" class="collocations-feed"></div>
            </div>

            <!-- Expressions & Prepositions -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">💡</span>
                    <h3 class="sec-title">التعبيرات وحروف الجر (Expressions & Prepositions)</h3>
                </div>
                <div id="expressionsFeed" class="expressions-feed"></div>
            </div>

            <!-- Derivatives -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">🧬</span>
                    <h3 class="sec-title">المشتقات (Derivatives)</h3>
                </div>
                <div id="derivativesFeed" class="derivatives-feed"></div>
            </div>

            <!-- Clear the Confusion -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">⚖️</span>
                    <h3 class="sec-title">لاحظ الفرق بدقة (Clear the Confusion)</h3>
                </div>
                <div id="confusionFeed" class="confusion-feed"></div>
            </div>
        </div>

        <!-- Tab: Interactive 3D Story -->
        <div id="story" class="tab-content">
            <div class="story-container">
                <div class="story-top-panel">
                    <h3 id="storySceneTitle" class="story-scene-title">Scene 1</h3>
                    <span id="storySceneCounter" class="story-badge">المشهد 1 من 3</span>
                </div>
                <div class="story-card-3d">
                    <div class="story-text-zone">
                        <p id="storyEnText" class="story-en-paragraph"></p>
                        <p id="storyArText" class="story-ar-paragraph"></p>
                        <div class="story-moral-strip">
                            <span class="moral-label">💡 العبرة المستفادة:</span>
                            <span id="storyMoralText" class="moral-content"></span>
                        </div>
                    </div>
                </div>
                <div class="story-nav-buttons">
                    <button id="storyPrevBtn" class="story-nav-btn" onclick="prevStoryScene()" disabled>⬅️ المشهد السابق</button>
                    <div class="story-dots-indicator" id="storyDotsIndicator"></div>
                    <button id="storyNextBtn" class="story-nav-btn" onclick="nextStoryScene()">المشهد التالي ➡️</button>
                </div>
            </div>
        </div>

        <!-- Tab: Interactive Speaking Dialogue -->
        <div id="dialogue" class="tab-content">
            <div class="dialogue-container">
                <div class="dialogue-header-panel">
                    <h3 id="dialogueTopic" class="dialogue-title">Job Interview: Professionalism, Pressure, and Cross-Team Collaboration</h3>
                    <p class="dialogue-subtitle">استمع وتدرب على النطق الإنجليزي الصحيح لمقابلة عمل تفاعلية مع ميزة القراءة الصوتية الفورية</p>
                </div>
                <div id="dialogueFeed" class="dialogue-feed"></div>
            </div>
        </div>

        <!-- Tab: Authentic 30-MCQ Quiz (Zero Grammar) -->
        <div id="quiz" class="tab-content">
            <div class="quiz-container">
                <div class="quiz-hero-banner">
                    <div class="quiz-hero-badge">🎯 اختبار المعاصر الشامل (30 سؤالاً)</div>
                    <h3 class="quiz-hero-title">تقييم شامل على مفردات وتعبيرات ومشتقات وفروق الدروس 1 و 2</h3>
                    <p class="quiz-hero-desc">أسئلة مطابقة 100% لأحدث مواصفات امتحانات المحافظات 2026/2027 من كتاب المعاصر مع التغذية الراجعة الفورية لكل سؤال.</p>
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
            <a href="./index.html" class="back-btn" data-sound-click="click">⬅️ العودة لقائمة الوحدة</a>
            <a href="./lesson-3.html" class="next-btn" data-sound-click="click">الدرس التالي: Lesson 3 ➡️</a>
        </div>
    </div>

    <!-- Scripts: Sound Effects, Data Payload, and Decoupled Presentation Engine -->
    <script src="../../assets/js/sounds.js"></script>
    <script src="./lesson-1.data.js"></script>
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/ui.js"></script>
</body>
</html>
'''

html_path = os.path.join(u6_dir, "lesson-1.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Created lesson-1.html successfully!")
