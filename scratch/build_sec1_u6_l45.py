import os
import json

u6_dir = r"c:\Users\Al700t\OneDrive\Desktop\Learn_English\Sec_1\unit-6"
os.makedirs(u6_dir, exist_ok=True)

lesson45_data = {
    "id": "sec1-u6-l45",
    "stage": "sec1",
    "unit": 6,
    "lesson": "4 & 5",
    "title": "Lessons 4 & 5: My Resume / Curriculum Vitae [CV] & Professional Communication",
    "description": "السيرة الذاتية (CV)، أقسام السيرة الذاتية ومعايير كتابتها، الترويج المهني، تحليل البيانات، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً من امتحانات المحافظات 2026/2027 🎯 (Zero Grammar)",
    "keyVocabulary": [
        {
            "word": "analysis",
            "partOfSpeech": "n",
            "arabic": "تحليل البيانات والدراسة المفصلة",
            "example": "We still need further analysis of the data to help the decision-maker."
        },
        {
            "word": "coordinator",
            "partOfSpeech": "n",
            "arabic": "مُنَسِّق / منظم لفرق العمل والأنشطة",
            "example": "The event coordinator made sure everything started precisely on time."
        },
        {
            "word": "promotional",
            "partOfSpeech": "adj",
            "arabic": "ترويجي / إعلاني وتنشيطي",
            "example": "The company launched an energetic promotional campaign to boost sales."
        },
        {
            "word": "resume (CV)",
            "partOfSpeech": "n",
            "arabic": "السيرة الذاتية (Curriculum Vitae)",
            "example": "A well-crafted resume summarizes your education, work experience, and core skills."
        },
        {
            "word": "personal statement",
            "partOfSpeech": "n",
            "arabic": "بيان شخصي / نبذة مهنية افتتاحية",
            "example": "Start your CV with a concise personal statement describing your strengths and goals."
        },
        {
            "word": "work experience",
            "partOfSpeech": "n",
            "arabic": "الخبرة العملية والوظائف السابقة",
            "example": "List your work experience in reverse chronological order with your most recent job first."
        },
        {
            "word": "credential",
            "partOfSpeech": "n",
            "arabic": "مؤهل علمي / شهادة اعتماد رسمية",
            "example": "A certified university degree is an essential credential for international companies."
        },
        {
            "word": "competency",
            "partOfSpeech": "n",
            "arabic": "كفاءة / جدارة وقدرة مهنية",
            "example": "The HR manager assessed each candidate's competency in digital communication."
        },
        {
            "word": "objective",
            "partOfSpeech": "n",
            "arabic": "هدف مهني / غاية محددة",
            "example": "Her career objective is to become a leading marketing coordinator in regional retail."
        },
        {
            "word": "execution",
            "partOfSpeech": "n",
            "arabic": "تنفيذ وإنجاز المهام",
            "example": "Good strategic planning is worthless without prompt, accurate execution."
        },
        {
            "word": "monitor",
            "partOfSpeech": "v",
            "arabic": "يراقب / يرصد بدقة",
            "example": "The project supervisor will monitor daily progress and metrics during the launch."
        },
        {
            "word": "maximize",
            "partOfSpeech": "v",
            "arabic": "يزيد إلى الحد الأقصى / يعظم",
            "example": "The digital agency aims to maximize user engagement and online conversions."
        },
        {
            "word": "proofread",
            "partOfSpeech": "v",
            "arabic": "يراجع لغوياً ويصحح الأخطاء",
            "example": "Always proofread your resume multiple times before sending it to employers."
        },
        {
            "word": "proposal",
            "partOfSpeech": "n",
            "arabic": "مقترح عمل / عرض مشروع رسمي",
            "example": "The team submitted a detailed marketing proposal to the board of directors."
        },
        {
            "word": "suite",
            "partOfSpeech": "n",
            "arabic": "حزمة برمجية متكاملة / جناح فندقي",
            "example": "He is proficient in the complete Microsoft Office software suite."
        },
        {
            "word": "bachelor",
            "partOfSpeech": "n",
            "arabic": "درجة البكالوريوس / أعزب",
            "example": "He holds a Bachelor of Science in Information Systems from Cairo University."
        },
        {
            "word": "database",
            "partOfSpeech": "n",
            "arabic": "قاعدة بيانات",
            "example": "The assistant maintained the customer database and updated contact records daily."
        },
        {
            "word": "checklist",
            "partOfSpeech": "n",
            "arabic": "قائمة تحقق ومراجعة",
            "example": "Use a checklist to verify that all necessary sections are present in your CV."
        },
        {
            "word": "relevant",
            "partOfSpeech": "adj",
            "arabic": "وثيق الصلة / ملائم ومرتبط",
            "example": "Include only relevant experience that aligns with the job description."
        },
        {
            "word": "references",
            "partOfSpeech": "n",
            "arabic": "المراجع / الأشخاص الموصون",
            "example": "Provide professional references such as university professors or past supervisors."
        },
        {
            "word": "follower engagement",
            "partOfSpeech": "n",
            "arabic": "تفاعل المتابعين",
            "example": "The campaign increased follower engagement by 45% across social platforms."
        },
        {
            "word": "visual content",
            "partOfSpeech": "n",
            "arabic": "محتوى مرئي وبصري",
            "example": "Audiences respond much faster to dynamic visual content like infographics."
        }
    ],
    "accumulativeVocab": [
        {
            "word": "assistant",
            "partOfSpeech": "n",
            "arabic": "مساعد إداري أو تنفيذي",
            "example": "The marketing assistant supported the team with event logistics."
        },
        {
            "word": "attribute",
            "partOfSpeech": "n",
            "arabic": "سمة بارزة / صفة وخصلة مميزة",
            "example": "Honesty and reliability are crucial attributes in any promising hire."
        },
        {
            "word": "brief",
            "partOfSpeech": "adj",
            "arabic": "موجز / مقتضب",
            "example": "The CEO gave a brief welcome speech before the interviews commenced."
        },
        {
            "word": "concise",
            "partOfSpeech": "adj",
            "arabic": "موجز ودقيق خالٍ من الحشو",
            "example": "Write concise bullet points when explaining your past job achievements."
        },
        {
            "word": "conduct",
            "partOfSpeech": "v",
            "arabic": "يُجري / يقوم بعمل",
            "example": "Marketing analysts conduct regular competitor surveys to spot opportunities."
        },
        {
            "word": "content creation",
            "partOfSpeech": "n",
            "arabic": "صناعة وإنشاء المحتوى",
            "example": "Digital agencies seek young specialists skilled in compelling content creation."
        },
        {
            "word": "event planning",
            "partOfSpeech": "n",
            "arabic": "تخطيط الفعاليات والمؤتمرات",
            "example": "Her background in event planning helped make the annual symposium a success."
        },
        {
            "word": "excite",
            "partOfSpeech": "v",
            "arabic": "يثير الحماس والشغف",
            "example": "Challenging design projects always excite creative graphic designers."
        },
        {
            "word": "fulfilling",
            "partOfSpeech": "adj",
            "arabic": "محقق للطموح ومرضٍ للذات",
            "example": "Working in public healthcare is one of the most fulfilling careers imaginable."
        },
        {
            "word": "guidance",
            "partOfSpeech": "n",
            "arabic": "توجيه وإرشاد مهني",
            "example": "Under the guidance of senior mentors, young recruits learn rapidly."
        },
        {
            "word": "income",
            "partOfSpeech": "n",
            "arabic": "الدخل المادي",
            "example": "Diversifying your skills helps you secure a stable and comfortable income."
        },
        {
            "word": "internship",
            "partOfSpeech": "n",
            "arabic": "فترة تدريب عملي",
            "example": "She secured a paid three-month internship with a multinational tech firm."
        },
        {
            "word": "manage",
            "partOfSpeech": "v",
            "arabic": "يدير ويتولى الإشراف على",
            "example": "She was chosen to manage digital advertising across North Africa."
        },
        {
            "word": "performance",
            "partOfSpeech": "n",
            "arabic": "الأداء الوظيفي ومستوى الإنجاز",
            "example": "Quarterly performance reports show whether targets have been met."
        },
        {
            "word": "prevent",
            "partOfSpeech": "v",
            "arabic": "يمنع / يتفادى حدوث خطأ",
            "example": "Careful proofreading prevents embarrassing grammatical mistakes in your CV."
        },
        {
            "word": "properly",
            "partOfSpeech": "adv",
            "arabic": "بشكل صحيح ومتقن",
            "example": "Ensure that your contact numbers and email are formatted properly."
        },
        {
            "word": "purpose",
            "partOfSpeech": "n",
            "arabic": "هدف / غاية أساسية",
            "example": "The primary purpose of a CV is to secure an in-person job interview."
        },
        {
            "word": "qualification",
            "partOfSpeech": "n",
            "arabic": "مؤهل علمي أو مهني",
            "example": "Each applicant must list their highest academic qualification clearly."
        },
        {
            "word": "rewarding",
            "partOfSpeech": "adj",
            "arabic": "مُجزٍ معنوياً ومادياً",
            "example": "Mentoring high school interns is a truly rewarding endeavor."
        },
        {
            "word": "schedule",
            "partOfSpeech": "v / n",
            "arabic": "يجدول / جدول زمني",
            "example": "The marketing manager scheduled 50 promotional social posts for the week."
        },
        {
            "word": "section",
            "partOfSpeech": "n",
            "arabic": "قسم أو جزء من المستند",
            "example": "Place the Work Experience section directly below your Personal Statement."
        },
        {
            "word": "specialist",
            "partOfSpeech": "n",
            "arabic": "أخصائي وخبير في مجال دقيق",
            "example": "The tech firm hired a search engine optimization specialist."
        }
    ],
    "definitions": [
        {
            "word": "analysis (تحليل)",
            "meaning": "الدراسة المفصلة للبيانات",
            "englishDef": "the detailed study or examination of something to understand its nature or determine its essential features."
        },
        {
            "word": "coordinator (منسق)",
            "meaning": "شخص ينسق جهود وأجزاء العمل",
            "englishDef": "a person or thing that brings separate parts together to work smoothly as a whole."
        },
        {
            "word": "promotional (ترويجي)",
            "meaning": "متعلق بالإعلان والتسويق",
            "englishDef": "related to advertising or promoting something to increase sales or public awareness."
        },
        {
            "word": "personal statement (البيان الشخصي)",
            "meaning": "ملخص موجز عنك وعن أهدافك",
            "englishDef": "a brief summary of who you are and what you aim to achieve in your career."
        },
        {
            "word": "education (التعليم والمؤهلات)",
            "meaning": "مؤهلاتك وخلفيتك الأكاديمية",
            "englishDef": "your academic degrees, educational institutions, dates attended, and grades obtained."
        },
        {
            "word": "work experience (الخبرة العملية)",
            "meaning": "وظائفك ومسؤولياتك السابقة",
            "englishDef": "your past jobs, internships, voluntary work, company names, and specific achievements."
        },
        {
            "word": "skills (المهارات)",
            "meaning": "قدراتك التقنية والشخصية",
            "englishDef": "your technical abilities (software, languages) and soft competencies (teamwork, leadership)."
        },
        {
            "word": "references (المراجع والموصون)",
            "meaning": "أشخاص يزكونك ويوصون بك",
            "englishDef": "trusted individuals who can recommend you, confirm your character, and vouch for your work."
        }
    ],
    "synonymsAntonyms": [
        {
            "word": "analysis (تحليل البيانات)",
            "synonym": "examination, study, evaluation, assessment, investigation",
            "antonym": "neglect, guesswork, overlook"
        },
        {
            "word": "coordinator (منسق)",
            "synonym": "organizer, supervisor, planner, director",
            "antonym": "disorganizer, subordinate"
        },
        {
            "word": "promotional (ترويجي)",
            "synonym": "advertising, marketing, boosting, publicity",
            "antonym": "discouraging, suppressing, hindering"
        },
        {
            "word": "concise (موجز ومكثف)",
            "synonym": "brief, compact, succinct, to the point",
            "antonym": "lengthy, wordy, verbose, repetitive"
        },
        {
            "word": "credential (مؤهل / شهادة)",
            "synonym": "qualification, certificate, diploma, accreditation",
            "antonym": "disqualification, incompetence"
        },
        {
            "word": "relevant (وثيق الصلة)",
            "synonym": "pertinent, applicable, related, fitting",
            "antonym": "irrelevant, unrelated, inappropriate"
        },
        {
            "word": "objective (هدف)",
            "synonym": "goal, aim, target, purpose",
            "antonym": "aimlessness, randomness"
        },
        {
            "word": "maximize (يعظم / يزيد للأقصى)",
            "synonym": "increase, optimize, boost, expand",
            "antonym": "minimize, decrease, diminish"
        }
    ],
    "collocations": [
        {
            "phrase": "build a balance",
            "meaning": "يحقق توازناً مدروساً",
            "example": "A professional CV must build a balance between conciseness and thoroughness."
        },
        {
            "phrase": "conduct research",
            "meaning": "يُجري بحثاً واستقصاءً",
            "example": "Conduct research about the prospective employer before tailoring your CV."
        },
        {
            "phrase": "make choices",
            "meaning": "يختار وينتقي بذكاء",
            "example": "Make smart choices regarding which past projects highlight your key skills."
        },
        {
            "phrase": "provide a clear vision",
            "meaning": "يعطي رؤية وانطباعاً واضحاً",
            "example": "Your personal statement should provide a clear vision of your career ambitions."
        },
        {
            "phrase": "take time",
            "meaning": "يخصص وقتاً كافياً",
            "example": "Take time to proofread each sentence so you submit a flawless document."
        },
        {
            "phrase": "schedule posts",
            "meaning": "يجدول المنشورات على مدار الأسبوع",
            "example": "The marketing coordinator used automated tools to schedule promotional posts."
        }
    ],
    "expressionsPrepositions": [
        {
            "expression": "a sense of purpose",
            "meaning": "إحساس بوجود هدف ورسالة في العمل",
            "type": "Expression"
        },
        {
            "expression": "career path",
            "meaning": "المسار المهني للموظف",
            "type": "Expression"
        },
        {
            "expression": "content creation",
            "meaning": "صناعة المحتوى الرقمي",
            "type": "Expression"
        },
        {
            "expression": "event planning",
            "meaning": "تخطيط وتنظيم الفعاليات",
            "type": "Expression"
        },
        {
            "expression": "follower engagement",
            "meaning": "تفاعل الجمهور والمتابعين",
            "type": "Expression"
        },
        {
            "expression": "promotional activities",
            "meaning": "أنشطة تسويقية وترويجية",
            "type": "Expression"
        },
        {
            "expression": "skilled in (+ v-ing / n)",
            "meaning": "ماهر ومتمكن في مجال معين",
            "type": "Adjective + Preposition"
        },
        {
            "expression": "assist with",
            "meaning": "يقدم المساعدة في أمر محدد",
            "type": "Verb + Preposition"
        },
        {
            "expression": "collaborate with",
            "meaning": "يتعاون وينسق جهوده مع شخص أو فريق",
            "type": "Verb + Preposition"
        },
        {
            "expression": "increase ... by (+ percentage / amount)",
            "meaning": "يزيد بمقدار نسبة مئوية أو كمية",
            "type": "Verb + Preposition"
        }
    ],
    "derivatives": [
        {
            "root": "analysis family",
            "verb": "analyze (يُحلل ويفرز)",
            "noun": "analysis (تحليل) / analyst (محلل) / analytics (تحليلات)",
            "adjective": "analytical (تحليلي المنهج)",
            "adverb": "analytically (بأسلوب تحليلي)"
        },
        {
            "root": "coordinate family",
            "verb": "coordinate (ينسق وينظم)",
            "noun": "coordinator (مُنسق) / coordination (تنسيق)",
            "adjective": "coordinated (مُنسَّق ومنتظم)",
            "adverb": "—"
        },
        {
            "root": "promote family",
            "verb": "promote (يروج / يرقي)",
            "noun": "promotion (ترقية / ترويج) / promoter (مُروّج)",
            "adjective": "promotional (ترويجي)",
            "adverb": "promotionally (بشكل ترويجي)"
        },
        {
            "root": "execute family",
            "verb": "execute (ينفذ / يطبق)",
            "noun": "execution (تنفيذ) / executive (مدير تنفيذي)",
            "adjective": "executive (تنفيذي)",
            "adverb": "—"
        },
        {
            "root": "qualify family",
            "verb": "qualify (يؤهل / يجتاز)",
            "noun": "qualification (مؤهل رسمي)",
            "adjective": "qualified (مؤهل وكفء)",
            "adverb": "—"
        }
    ],
    "confusion": [
        {
            "pair": "Resume vs Curriculum Vitae (CV)",
            "difference": "السياق والاصطلاح بين النظام الأمريكي والبريطاني",
            "examples": [
                "Resume: مصطلح أمريكي شائع للوثيقة الموجزة للتقديم على وظيفة (1-2 pages).",
                "CV (Curriculum Vitae): مصطلح لاتيني / بريطاني للأصل الأكاديمي والتفصيلي، ولكن في مصر والعالم العربي يُستخدم الاثنان كمترادفين لوثيقة التوظيف."
            ]
        },
        {
            "pair": "Personal Statement vs Cover Letter",
            "difference": "الفقرة الافتتاحية داخل الـ CV مقابل الخطاب المنفصل المرفق معه",
            "examples": [
                "Personal Statement: فقرة قصيرة في أعلى السيرة الذاتية تبرز هويتك وأهدافك باختصار.",
                "Cover Letter: خطاب كامل مستقل من صفحة واحدة تشرح فيه بتفصيل سبب رغبتك في الانضمام للشركة."
            ]
        },
        {
            "pair": "Qualifications vs Work Experience",
            "difference": "المؤهلات العلمية والأكاديمية مقابل الوظائف والممارسات الميدانية",
            "examples": [
                "Qualifications: الشهادات الأكاديمية والدورات المعتمدة (BSc in Computer Science).",
                "Work Experience: الوظائف السابقة، فترات التدريب العملي والمهام التي أديتها."
            ]
        },
        {
            "pair": "References vs Referees",
            "difference": "التوصيات / أسماء الموصين مقابل الشخص نفسه الذي يُرجع إليه",
            "examples": [
                "References: خطابات التزكية أو بيانات التواصل مع الموصين في الـ CV.",
                "Referee: الشخص المسؤول الموثوق (أستاذك أو مديرك السابق) الذي يتصل به صاحب العمل للتأكد من كفاءتك."
            ]
        }
    ],
    "storybook": {
        "title": "3D Interactive Story: Crafting the Golden Resume",
        "subtitle": "رحلة فريدة في صياغة سيرة ذاتية احترافية توافق معايير سوق العمل وأنظمة الفرز الرقمي",
        "scenes": [
            {
                "scene": 1,
                "title": "Scene 1: The Frustrating Draft (المسودة الأولى المشوشة)",
                "text": "Farida sat staring at her glowing laptop screen, staring at an overwhelming four-page draft. She had written down everything from her middle school art prizes to vacation memories with friends. She had even added a casual selfie from social media! Feeling overwhelmed, she reached out to Sami Adel, a senior digital marketing specialist and family friend, who instantly recognized that her document needed serious professional restructuring.",
                "arabicText": "جلست فريدة تنظر بحيرة إلى شاشة حاسوبها المحمول، وهي تتأمل مسودة سيرة ذاتية تجاوزت أربع صفحات. كانت قد كتبت فيها كل شيء بدءاً من جوائز الرسم في المرحلة الإعدادية وحتى ذكريات إجازاتها مع أصدقائها! بل وضعت صورة شخصية غير رسمية التقطتها لنفسها! ولما شعرت بالإحباط، تواصلت مع سامي عادل، أخصائي التسويق الرقمي الأول وصديق العائلة، والذي أدرك على الفور أن وثيقتها تحتاج إلى إعادة هيكلة مهنية جذرية.",
                "vocabularyHighlights": ["resume", "analysis", "section", "proofread"]
            },
            {
                "scene": 2,
                "title": "Scene 2: The Architecture of Impact (هندسة التأثير والوضوح)",
                "text": "Sami opened Farida's file and explained the golden rules of resume writing: 'A resume is your formal marketing proposal, Farida. It must be concise—one or two pages maximum. It starts with your contact details at the top, followed by a punchy personal statement. Always organize your education and work experience in reverse chronological order, emphasizing measurable achievements like increasing follower engagement.'",
                "arabicText": "فتح سامي ملف فريدة وشرح لها القواعد الذهبية لكتابة السيرة الذاتية: 'السيرة الذاتية هي مقترح تسويقي رسمي عنك يا فريدة. يجب أن تكون موجزة—صفحة أو صفحتين على الأكثر. تبدأ ببيانات الاتصال في الأعلى مباشرة، تليها نبذة شخصية قوية ومحددة. وعليكِ دوماً تنظيم مؤهلاتك التعليمية وخبرتك العملية بترتيب زمني عكسي من الأحدث للأقدم، مع إبراز الإنجازات القابلة للقياس مثل زيادة تفاعل المتابعين.'",
                "vocabularyHighlights": ["concise", "personal statement", "follower engagement", "relevant", "credential"]
            },
            {
                "scene": 3,
                "title": "Scene 3: The Polished Breakthrough (السيرة الذاتية الذهبية)",
                "text": "Under Sami's mentorship, Farida eliminated every piece of irrelevant trivia and selected only her relevant digital competencies, her Bachelor's degree, and her marketing internship. She proofread every line analytically to prevent any spelling slips. When she submitted her sleek, two-page resume for an event coordinator role, she received a call for an interview within forty-eight hours!",
                "arabicText": "تحت توجيهات سامي، حذفت فريدة كل المعلومات غير المفيدة واختارت فقط كفاءاتها الرقمية ذات الصلة، وشهادة البكالوريوس، وخبرتها في التدريب العملي بالتسويق. ثم قامت بمراجعة كل سطر بأسلوب تحليلي دقيق لتفادي أي أخطاء لغوية. وعندما قدمت سيرتها الذاتية الأنيقة المكونة من صفحتين لوظيفة منسق فعاليات، تلقت اتصالاً لتحديد مقابلة شخصية خلال ثمانٍ وأربعين ساعة فقط!",
                "vocabularyHighlights": ["coordinator", "proofread", "bachelor", "competency", "execution"]
            }
        ]
    },
    "dialogue": {
        "title": "Speaking Dialogue: The Professional Resume Clinic",
        "scenario": "A live CV review consultation between Sami Adel (Senior Marketing Specialist) and Farida (Applicant) discussing resume standards.",
        "turns": [
            {
                "speaker": "Farida",
                "role": "Job Applicant",
                "text": "Thank you for reviewing my resume, Mr. Sami. How does my opening personal statement look?",
                "arabic": "شكراً جزيلاً لمراجعة سيرتي الذاتية يا أستاذ سامي. كيف تبدو نبذتي الشخصية الافتتاحية؟"
            },
            {
                "speaker": "Sami Adel",
                "role": "Marketing Specialist",
                "text": "It's well-written, Farida! It clearly defines who you are, your core skills in data analysis, and your career objective.",
                "arabic": "إنها مكتوبة بشكل ممتاز يا فريدة! فهي توضح بدقة هويتك، ومهاراتك الجوهرية في تحليل البيانات، وهدفك المهني."
            },
            {
                "speaker": "Farida",
                "role": "Job Applicant",
                "text": "I was confused about where to place my contact details and my recent internship.",
                "arabic": "كنت محتارة بشأن المكان المناسب لبيانات الاتصال ومكان وضع فترة التدريب الصيفي الأخيرة."
            },
            {
                "speaker": "Sami Adel",
                "role": "Marketing Specialist",
                "text": "Your contact information belongs strictly at the top. The internship goes under Work Experience, listed before older projects.",
                "arabic": "بيانات الاتصال مكانها الصحيح في أعلى الصفحة دائماً. أما التدريب الصيفي فيوضع تحت قسم الخبرة العملية، ويُذكر قبل المشروعات الأقدم."
            },
            {
                "speaker": "Farida",
                "role": "Job Applicant",
                "text": "Should I include my childhood interests and sports trophies?",
                "arabic": "هل يجدر بي ذكر اهتماماتي في مرحلة الطفولة وكؤوسي الرياضية؟"
            },
            {
                "speaker": "Sami Adel",
                "role": "Marketing Specialist",
                "text": "Definitely not! An employer only cares about relevant qualifications, software suites, and professional competencies.",
                "arabic": "قطعاً لا! صاحب العمل يهتم فقط بالمؤهلات ذات الصلة المباشرة بالوظيفة، وحزم البرمجيات، والكفاءات المهنية."
            },
            {
                "speaker": "Farida",
                "role": "Job Applicant",
                "text": "Understood. And what about the ideal length of the entire document?",
                "arabic": "فهمت تماماً. وماذا عن الطول المثالي للوثيقة بأكملها؟"
            },
            {
                "speaker": "Sami Adel",
                "role": "Marketing Specialist",
                "text": "Keep it short and concise—one or two pages maximum. And always proofread it analytically before clicking send!",
                "arabic": "اجعليها قصيرة وموجزة—صفحة أو صفحتين كحد أقصى. واحرصي دائماً على مراجعتها تحليلياً بعناية قبل الضغط على زر الإرسال!"
            }
        ]
    },
    "quiz": [
        {
            "id": 1,
            "type": "mcq",
            "question": "The event ............ has made sure everything starts on time. (الشرقية - كفر صقر 2026)",
            "options": ["assistant", "follower", "coordinator", "specialist"],
            "correct": 2,
            "explanation": "كتاب المعاصر ص 345: (coordinator) تعني منسق أو منظم يضمن تنظيم الفعاليات وبدء العمل في موعده.",
            "hint": "A person who brings separate parts together to work smoothly."
        },
        {
            "id": 2,
            "type": "mcq",
            "question": "The company launched a new ............ campaign to promote their latest product. (الدقهلية - الجمالية 2026)",
            "options": ["promotional", "critical", "flexible", "miserable"],
            "correct": 0,
            "explanation": "كتاب المعاصر ص 345: الحملة الترويجية والإعلانية تسمى (promotional campaign).",
            "hint": "Related to advertising or marketing to increase sales."
        },
        {
            "id": 3,
            "type": "mcq",
            "question": "We still need further ............ of the data to help the decision-maker. (المعاصر ص 345)",
            "options": ["purpose", "passion", "attribute", "analysis"],
            "correct": 3,
            "explanation": "تحليل البيانات الدقيق يسمى (analysis of data) وهو الاسم المشتق من الفعل analyze.",
            "hint": "The detailed study or examination of something."
        },
        {
            "id": 4,
            "type": "mcq",
            "question": "An important ............ of Yassin is his honesty. (البحيرة - دمنهور 2026)",
            "options": ["analysis", "attribute", "execution", "credential"],
            "correct": 1,
            "explanation": "كتاب المعاصر ص 345: كلمة (attribute) تعني سمة أو صفة أو خصيصة إيجابية في شخصية الفرد.",
            "hint": "A quality or characteristic that someone has."
        },
        {
            "id": 5,
            "type": "mcq",
            "question": "Applicants usually write down their work experience, like all relevant jobs, ............, and volunteer work. (البحيرة - دمنهور 2026)",
            "options": ["duties", "hobbies", "interests", "internships"],
            "correct": 3,
            "explanation": "كتاب المعاصر ص 345: يكتب المتقدمون خبراتهم العملية مثل الوظائف والتدريب العملي (internships) والعمل التطوعي.",
            "hint": "Periods of work experience taken to gain practical skills."
        },
        {
            "id": 6,
            "type": "mcq",
            "question": "A good study plan helps students keep ............ between schoolwork and free time.",
            "options": ["balance", "passion", "proposal", "reference"],
            "correct": 0,
            "explanation": "المتلازمة (keep a balance / build a balance) تعني يحافظ على التوازن بين الدراسة ووقت الفراغ.",
            "hint": "A state of equilibrium where things are evenly distributed."
        },
        {
            "id": 7,
            "type": "mcq",
            "question": "I know you have a good monthly ............ from your new job.",
            "options": ["suite", "income", "internship", "talent"],
            "correct": 1,
            "explanation": "الدخل المالي أو الراتب الشهري من الوظيفة يسمى (income).",
            "hint": "Money received on a regular basis for work."
        },
        {
            "id": 8,
            "type": "mcq",
            "question": "Mr Munir asked Ali to write the book title as a ............ in his report.",
            "options": ["balance", "passion", "proposal", "reference"],
            "correct": 3,
            "explanation": "كتابة عنوان الكتاب كمرجع وتوثيق في التقرير تسمى (reference).",
            "hint": "A source of information cited in a formal paper."
        },
        {
            "id": 9,
            "type": "mcq",
            "question": "The coach will ............ the players' progress during training.",
            "options": ["monitor", "maximize", "seek", "prove"],
            "correct": 0,
            "explanation": "الفعل (monitor) يعني يراقب ويرصد سير التقدم بدقة.",
            "hint": "To observe and check the progress over a period of time."
        },
        {
            "id": 10,
            "type": "mcq",
            "question": "The company wants to ............ its profits by improving its online sales.",
            "options": ["monitor", "maximize", "seek", "review"],
            "correct": 1,
            "explanation": "الفعل (maximize) يعني يزيد إلى الحد الأقصى أو يعظم الأرباح.",
            "hint": "To make as large or great as possible."
        },
        {
            "id": 11,
            "type": "mcq",
            "question": "To get permission for the school trip, the students sent a ............ to the head teacher.",
            "options": ["balance", "passion", "proposal", "reference"],
            "correct": 2,
            "explanation": "المقترح الرسمي أو طلب الإذن المكتوب يُسمى (proposal).",
            "hint": "A plan or suggestion put forward for consideration."
        },
        {
            "id": 12,
            "type": "mcq",
            "question": "A recognized university degree is an important ............ for this executive job.",
            "options": ["assistant", "bachelor", "specialist", "credential"],
            "correct": 3,
            "explanation": "الشهادة أو المؤهل الرسمي المعترف به يُسمى (credential).",
            "hint": "A qualification, achievement, or certificate of competence."
        },
        {
            "id": 13,
            "type": "mcq",
            "question": "Good strategic planning is not enough; successful ............ is also essential.",
            "options": ["section", "guidance", "execution", "requirement"],
            "correct": 2,
            "explanation": "تنفيذ الخطط وإنجازها على أرض الواقع يسمى (execution).",
            "hint": "The carrying out or carrying into effect of a plan."
        },
        {
            "id": 14,
            "type": "mcq",
            "question": "Choose information that is ............ to the topic of your presentation.",
            "options": ["visual", "rewarding", "relevant", "brief"],
            "correct": 2,
            "explanation": "الصفة (relevant) تعني وثيق الصلة ومناسباً لموضوع العرض أو الوظيفة.",
            "hint": "Closely connected or appropriate to the matter in hand."
        },
        {
            "id": 15,
            "type": "mcq",
            "question": "Salma always ............ her essay before she gives it to the teacher.",
            "options": ["schedules", "excites", "prevents", "proofreads"],
            "correct": 3,
            "explanation": "مراجعة المقال لتصحيح الأخطاء الإملائية والنحوية تسمى (proofread / proofreads).",
            "hint": "To read text in order to find and correct mistakes."
        },
        {
            "id": 16,
            "type": "mcq",
            "question": "The manager gave us a ............ explanation because the meeting was very short.",
            "options": ["visual", "rewarding", "relevant", "brief"],
            "correct": 3,
            "explanation": "الصفة (brief) تعني موجز ومقتضب.",
            "hint": "Short in duration or concise in expression."
        },
        {
            "id": 17,
            "type": "mcq",
            "question": "The marketing manager ............ fifty promotional posts for the upcoming week.",
            "options": ["scheduled", "excited", "prevented", "proofread"],
            "correct": 0,
            "explanation": "جدولة المنشورات ومواعيد بثها على المنصات يُعبر عنها بالفعل (scheduled).",
            "hint": "Planned for a certain time."
        },
        {
            "id": 18,
            "type": "mcq",
            "question": "A/An ............ is a person or thing that brings separate parts together to work smoothly as a whole.",
            "options": ["specialist", "coordinator", "assistant", "bachelor"],
            "correct": 1,
            "explanation": "تعريف كتاب المعاصر ص 347: المنسق (coordinator) هو من يجمع الأجزاء لتعمل معاً بسلاسة.",
            "hint": "Someone who coordinates different activities."
        },
        {
            "id": 19,
            "type": "mcq",
            "question": "In a science class, 'investigation' is a synonym for ............ (سوهاج - البلينا 2026)",
            "options": ["placement", "flaw", "analysis", "package"],
            "correct": 2,
            "explanation": "وفقاً لامتحانات المحافظات 2026 بكتاب المعاصر: مرادف (investigation) الفحص والدراسة هو (analysis).",
            "hint": "Detailed examination or study."
        },
        {
            "id": 20,
            "type": "mcq",
            "question": "The company launched a promotional campaign. The underlined adjective 'promotional' is antonymous with ............",
            "options": ["marketing", "advertising", "discouraging", "boosting"],
            "correct": 2,
            "explanation": "المعاصر ص 347: عكس كلمة (promotional) ترويجي هو (discouraging / hindering / suppressing).",
            "hint": "Opposite that means causing someone to lose confidence or stop enthusiasm."
        },
        {
            "id": 21,
            "type": "mcq",
            "question": "The company increased its online sales ............ 20% last year. (المعاصر ص 350)",
            "options": ["with", "to", "from", "by"],
            "correct": 3,
            "explanation": "حرف الجر المستخدم مع الزيادة في النسب المئوية هو: (increase ... by 20%).",
            "hint": "Preposition showing the difference or amount of increase."
        },
        {
            "id": 22,
            "type": "mcq",
            "question": "Ahmed assisted his senior teacher ............ the school conference preparations.",
            "options": ["with", "by", "to", "from"],
            "correct": 0,
            "explanation": "الفعل وحرف الجر: (assist someone with something) يساعد فلاناً في أمر ما.",
            "hint": "Preposition paired with assist."
        },
        {
            "id": 23,
            "type": "mcq",
            "question": "This complex problem requires an ............ answer, not just a personal opinion.",
            "options": ["analysis", "analytical", "analytically", "analyze"],
            "correct": 1,
            "explanation": "نحتاج إلى صفة قبل الاسم (answer) والصفة المشتقة من analysis هي (analytical) تحليلي.",
            "hint": "Adjective modifying the noun 'answer'."
        },
        {
            "id": 24,
            "type": "mcq",
            "question": "The main purpose of a CV is to ............ (كتاب الطالب SB)",
            "options": ["tell a personal life story", "request a favor from a friend", "summarize education, skills, and work experience", "share vacation photos"],
            "correct": 2,
            "explanation": "الهدف الأساسي من السيرة الذاتية (CV) هو تلخيص المؤهلات العلمية والمهارات والخبرات العملية.",
            "hint": "A document highlighting your professional qualifications."
        },
        {
            "id": 25,
            "type": "mcq",
            "question": "Where would you typically include your contact information in a CV?",
            "options": ["At the end, after references", "In the middle of work experience", "At the top of the page", "Only in the email signature"],
            "correct": 2,
            "explanation": "بيانات الاتصال (الاسم، الهاتف، البريد، العنوان) توضع دائماً في أعلى صفحة السيرة الذاتية (At the top of the page).",
            "hint": "The very first section at the top."
        },
        {
            "id": 26,
            "type": "mcq",
            "question": "Which of the following is NOT typically included in a CV? (الجيزة - الدقي 2026)",
            "options": ["Education history", "Work experience", "Full life story and childhood memories", "Relevant skills"],
            "correct": 2,
            "explanation": "سؤال امتحان محافظة الجيزة 2026: السيرة الذاتية وثيقة مهنية موجزة، فلا تتضمن أبداً قصة الحياة الكاملة أو ذكريات الطفولة.",
            "hint": "Irrelevant personal stories should never be in a CV."
        },
        {
            "id": 27,
            "type": "mcq",
            "question": "In a CV, the ............ section lists your phone number and email address. (البحيرة - بندر دمنهور 2026)",
            "options": ["personal information", "skills", "objective", "hobbies"],
            "correct": 0,
            "explanation": "قسم البيانات الشخصية (personal information) يدرج رقم الهاتف والبريد الإلكتروني والاسم.",
            "hint": "Section containing contact details."
        },
        {
            "id": 28,
            "type": "mcq",
            "question": "Which of these should you NOT include in the personal information section of your CV? (الجيزة - العجوزة 2026)",
            "options": ["Your full name", "Your phone number", "Your Facebook profile picture", "Your professional email address"],
            "correct": 2,
            "explanation": "امتحان العجوزة 2026: لا يجوز وضع صورة حساب فيسبوك الشخصية غير الرسمية في السيرة الذاتية.",
            "hint": "Casual social media photo."
        },
        {
            "id": 29,
            "type": "mcq",
            "question": "What is the recommended ideal length for a standard resume?",
            "options": ["5 to 6 pages", "1 to 2 pages", "10 pages", "Half a line"],
            "correct": 1,
            "explanation": "القاعدة الذهبية في كتاب المعاصر: الطول المثالي للسيرة الذاتية هو صفحة أو صفحتان كحد أقصى (1-2 pages maximum).",
            "hint": "Short and concise standard."
        },
        {
            "id": 30,
            "type": "mcq",
            "question": "A well-written resume should always be ............",
            "options": ["long and full of jokes", "short, clear, and up to date", "informal and handwritten", "unclear and vague"],
            "correct": 1,
            "explanation": "المعايير المعتمدة في كتاب المعاصر: السيرة الذاتية الممتازة يجب أن تكون قصيرة، واضحة، ومحدثة باستمرار (short, clear, and up to date).",
            "hint": "Concise, professional, and updated."
        }
    ]
}

# Write lesson-4-5.data.js
data_js_path = os.path.join(u6_dir, "lesson-4-5.data.js")
with open(data_js_path, "w", encoding="utf-8") as f:
    f.write("/**\n")
    f.write(" * Secondary 1 - Unit 6 - Lessons 4 & 5 Data Payload\n")
    f.write(" * My Resume / Curriculum Vitae [CV] & Professional Communication (السيرة الذاتية والتواصل المهني)\n")
    f.write(" * Official Source: El-Moasser 2026/2027 (SB pages 88 : 91, textbook pp. 344-356)\n")
    f.write(" * ZERO GRAMMAR MANDATE COMPLIANT: Pure Lexical, Structural, Writing Skills & Reading Study.\n")
    f.write(" */\n\n")
    f.write("window.lessonData = ")
    json.dump(lesson45_data, f, ensure_ascii=False, indent=2)
    f.write(";\n\n")
    f.write("window.__LESSON_DATA__ = window.lessonData;\n")

print(f"Generated {data_js_path}")

# Write lesson-4-5.html
html_content = """<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 1 - Unit 6: Lessons 4 & 5 | Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&family=Outfit:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../assets/css/style.css?v=6">
    <link rel="stylesheet" href="../../assets/css/curriculum-renderer.css?v=6">
</head>
<body class="lesson-page" data-stage="sec1" data-unit="6" data-lesson="4-5">

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
                <span class="badge badge-lesson">الدروس 4 و 5</span>
                <span class="badge badge-sb">SB pages 88 : 91</span>
            </div>
            <h1 class="lesson-hero-title">My Resume / Curriculum Vitae [CV]</h1>
            <p class="lesson-hero-arabic">السيرة الذاتية، مهارات الكتابة الاحترافية، تحليل البيانات، والتواصل التسويقي 🎯 (Zero Grammar)</p>
        </div>

        <!-- Navigation Tabs Bar -->
        <div class="lesson-tabs-nav" id="lessonTabsNav">
            <button class="tab-link active" data-tab="vocab" data-sound-click="tab">📚 المفردات واللغويات</button>
            <button class="tab-link" data-tab="story" data-sound-click="tab">📖 القصة التفاعلية 3D</button>
            <button class="tab-link" data-tab="dialogue" data-sound-click="tab">🗣️ محادثة عيادة السيرة الذاتية</button>
            <button class="tab-link" data-tab="quiz" data-sound-click="tab">🎯 اختبار المعاصر (30 سؤالاً)</button>
        </div>

        <!-- Tab: Vocabulary & Linguistics -->
        <div id="vocab" class="tab-content active">
            <!-- Key Vocabulary -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">🔑</span>
                    <h3 class="sec-title">المفردات الرئيسية (Key Vocabulary)</h3>
                    <span class="sec-tag">كتاب المعاصر ص 344</span>
                </div>
                <div id="keyVocabGrid" class="vocab-cards-grid"></div>
            </div>

            <!-- Accumulative Vocabulary -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">💼</span>
                    <h3 class="sec-title">المفردات التراكمية وسوق العمل (Accumulative Vocabulary)</h3>
                </div>
                <div id="accumulativeVocabGrid" class="vocab-cards-grid"></div>
            </div>

            <!-- Definitions -->
            <div class="vocab-section-block">
                <div class="section-title-wrap">
                    <span class="sec-icon">📖</span>
                    <h3 class="sec-title">التعريفات الهامة ومكونات السيرة الذاتية (Definitions)</h3>
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
                    <h3 class="sec-title">المشتقات اللغوية وعائلة تحليل البيانات (Derivatives)</h3>
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
                    <h2 class="storybook-hero-title">Crafting the Golden Resume</h2>
                    <p class="storybook-hero-subtitle">رحلة فريدة في صياغة سيرة ذاتية احترافية توافق معايير سوق العمل وأنظمة الفرز الرقمي</p>
                </div>
                <div id="storybookMount" class="storybook-mount"></div>
            </div>
        </div>

        <!-- Tab: Speaking Dialogue -->
        <div id="dialogue" class="tab-content">
            <div class="dialogue-container">
                <div class="dialogue-hero-banner">
                    <div class="dialogue-hero-badge">🗣️ محادثة عيادة السيرة الذاتية الناطقة</div>
                    <h2 class="dialogue-hero-title">The Professional Resume Clinic</h2>
                    <p class="dialogue-hero-subtitle">جلسة مراجعة حية مع خبير التسويق الرقمي سامي عادل والمتقدمة فريدة مع التفاعل الصوتي</p>
                </div>
                <div id="dialogueMount" class="dialogue-mount"></div>
            </div>
        </div>

        <!-- Tab: Authentic 30-MCQ Quiz (Zero Grammar) -->
        <div id="quiz" class="tab-content">
            <div class="quiz-container">
                <div class="quiz-hero-banner">
                    <div class="quiz-hero-badge">🎯 اختبار المعاصر الشامل (30 سؤالاً)</div>
                    <h3 class="quiz-hero-title">تقييم شامل على مفردات وتعبيرات ومهارات كتابة السيرة الذاتية للدروس 4 و 5</h3>
                    <p class="quiz-hero-desc">أسئلة مطابقة 100% لامتحانات المحافظات 2026/2027 (الدقي، دمنهور، كفر الدوار، العجوزة، كفر صقر) مع التغذية الراجعة والشرح العربي الفوري.</p>
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
            <a href="./lesson-3.html" class="back-btn" data-sound-click="click">⬅️ الدرس السابق: Lesson 3</a>
            <a href="./index.html" class="next-btn" data-sound-click="click">قائمة الوحدة السادسة 📋</a>
        </div>
    </div>

    <!-- Scripts: Sound Effects, Data Payload, and Decoupled Presentation Engine -->
    <script src="../../assets/js/sounds.js"></script>
    <script src="./lesson-4-5.data.js"></script>
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/ui.js"></script>
</body>
</html>
"""

html_path = os.path.join(u6_dir, "lesson-4-5.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"Generated {html_path}")
