# -*- coding: utf-8 -*-
"""
Builder for Secondary 1 Unit 5 Lessons 4 & 5
"Ramy's Journey with English & Informal Email Writing"
Textbook Source: El-Moasser 2026/2027, Pages 286-300 (SB pages 77:79)
ZERO GRAMMAR MANDATE: Strictly 0 grammar questions / tabs.
Decoupled architecture: pure data in lesson-4-5.data.js, presentation in lesson-4-5.html.
"""

import json
import os

u5_dir = os.path.join(os.getcwd(), "Sec_1", "unit-5")
os.makedirs(u5_dir, exist_ok=True)

lesson_data = {
    "id": "sec1-u5-l45",
    "stage": "Secondary 1",
    "unit": "Unit 5: Using Technology at Schools / Communication",
    "lesson": "Lessons 4 & 5: Ramy's Journey with English & Informal Email Writing",
    "title": "Lessons 4 & 5: Ramy's Journey with English & Informal Email Writing (رحلة رامي مع الإنجليزية وكتابة الإيميل غير الرسمي)",
    "description": "المفردات الأساسية والتراكمية، دليل وقواعد كتابة الإيميل غير الرسمي، التعريفات، المترادفات والمتضادات، المتلازمات والمشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)",
    "keyVocabulary": [
        {
            "word": "anxious",
            "partOfSpeech": "adj.",
            "meaning": "قلق / متوتر",
            "example": "Ramy felt anxious when he couldn't understand the airport officer's questions."
        },
        {
            "word": "complicated",
            "partOfSpeech": "adj.",
            "meaning": "معقد / متشابك",
            "example": "Life in a foreign city became complicated when he tried to navigate the bus system."
        },
        {
            "word": "confident",
            "partOfSpeech": "adj.",
            "meaning": "واثق من نفسه",
            "example": "Practicing basic phrases daily made him much more confident when speaking to locals."
        },
        {
            "word": "enrich",
            "partOfSpeech": "v.",
            "meaning": "يثري / ينمّي",
            "example": "Reading international literature and learning languages enrich our minds and worldview."
        },
        {
            "word": "enriching",
            "partOfSpeech": "adj.",
            "meaning": "إثرائي / مفيد وممتع",
            "example": "Traveling turned from an anxious struggle into an enriching adventure."
        }
    ],
    "accumulativeVocabulary": [
        {"word": "abroad", "partOfSpeech": "adv.", "meaning": "في الخارج / إلى بلد أجنبي"},
        {"word": "accidentally", "partOfSpeech": "adv.", "meaning": "عن طريق الخطأ / صدفة"},
        {"word": "adventure", "partOfSpeech": "n.", "meaning": "مغامرة"},
        {"word": "appreciate", "partOfSpeech": "v.", "meaning": "يقدّر / يشكر جهود شخص"},
        {"word": "basic", "partOfSpeech": "adj.", "meaning": "أساسي / بسيط"},
        {"word": "embarrassed", "partOfSpeech": "adj.", "meaning": "محرج / خجلان"},
        {"word": "effort", "partOfSpeech": "n.", "meaning": "جهد / مسعى"},
        {"word": "greet", "partOfSpeech": "v.", "meaning": "يحيي / يسلّم على"},
        {"word": "impatient", "partOfSpeech": "adj.", "meaning": "نافد الصبر / غير صبور"},
        {"word": "local", "partOfSpeech": "adj. / n.", "meaning": "محلي / أحد السكان المحليين"},
        {"word": "struggle", "partOfSpeech": "v. / n.", "meaning": "يكافح / صراع ومشقة"},
        {"word": "informal email", "partOfSpeech": "n.", "meaning": "بريد إلكتروني ودي وغير رسمي"},
        {"word": "contraction", "partOfSpeech": "n.", "meaning": "صيغة مختصرة (مثل I'm و don't)"},
        {"word": "greeting", "partOfSpeech": "n.", "meaning": "تحية البداية"},
        {"word": "closing", "partOfSpeech": "n.", "meaning": "خاتمة الرسالة"},
        {"word": "catch up", "partOfSpeech": "phr. v.", "meaning": "يتبادل الأخبار والمستجدات"},
        {"word": "direction", "partOfSpeech": "n.", "meaning": "اتجاه"},
        {"word": "phrase", "partOfSpeech": "n.", "meaning": "عبارة / تعبير"}
    ],
    "definitions": [
        {
            "word": "anxious",
            "definition": "Feeling worried, nervous, or afraid about something that might happen.",
            "arabicMeaning": "قلق: الشعور بالتوتر أو الخوف حيال أمر قد يحدث."
        },
        {
            "word": "complicated",
            "definition": "Not simple; difficult to understand or deal with because it has many interconnected parts.",
            "arabicMeaning": "معقد: ليس بسيطاً؛ يصعب فهمه أو التعامل معه لاحتوائه على تفاصيل وأجزاء كثيرة."
        },
        {
            "word": "confident",
            "definition": "Feeling sure of yourself and completely certain about your own abilities.",
            "arabicMeaning": "واثق: شعور باليقين في النفس والاطمئنان التام للقدرات الشخصية."
        },
        {
            "word": "enriching",
            "definition": "Making your life better, more meaningful, or fulfilling by giving you new knowledge, experience, or joy.",
            "arabicMeaning": "إثرائي: يجعل الحياة أكثر قيمة ومعنى بتزويدها بالمعارف والخبرات المبهجة."
        },
        {
            "word": "informal email",
            "definition": "A personal electronic message written in a friendly, relaxed, and casual tone to friends or family.",
            "arabicMeaning": "إيميل غير رسمي: رسالة إلكترونية شخصية مكتوبة بأسلوب ودي وبسيط للأصدقاء والأقارب."
        }
    ],
    "synonyms": [
        {"word": "anxious", "synonyms": "worried, nervous, uneasy, concerned", "meaning": "قلق / متوتر"},
        {"word": "complicated", "synonyms": "complex, difficult, confusing, tricky", "meaning": "معقد"},
        {"word": "confident", "synonyms": "assured, self-assured, certain", "meaning": "واثق"},
        {"word": "enriching", "synonyms": "rewarding, meaningful, valuable, uplifting", "meaning": "إثرائي / ذو قيمة"},
        {"word": "embarrassed", "synonyms": "shy, uncomfortable, self-conscious", "meaning": "محرج"}
    ],
    "antonyms": [
        {"word": "anxious", "antonyms": "calm, relaxed, unworried, tranquil", "meaning": "هادئ / مطمئن"},
        {"word": "complicated", "antonyms": "straightforward, simple, easy, clear", "meaning": "بسيط / مباشر"},
        {"word": "confident", "antonyms": "unsure, doubtful, hesitant, shy", "meaning": "غير واثق / متردد"},
        {"word": "enriching", "antonyms": "boring, uninspiring, dull, impoverishing", "meaning": "ممل / غير مفيد"}
    ],
    "collocations": [
        {"collocation": "appreciate his efforts", "meaning": "يقدّر جهوده ومساعيه"},
        {"collocation": "build confidence", "meaning": "يبني ويعزز الثقة بالنفس"},
        {"collocation": "grow impatient", "meaning": "يصبح نافد الصبر / ينفد صبره"},
        {"collocation": "make progress", "meaning": "يحرز تقدماً ملموساً"},
        {"collocation": "master new languages", "meaning": "يتقن لغات جديدة"},
        {"collocation": "reach success", "meaning": "يصل إلى قمة النجاح"},
        {"collocation": "travel abroad", "meaning": "يسافر خارج البلاد"},
        {"collocation": "show little interest in", "meaning": "يُبدي اهتماماً ضئيلاً بـ"},
        {"collocation": "ask for directions", "meaning": "يسأل عن الاتجاهات والطرق"}
    ],
    "expressionsAndPrepositions": [
        {"expression": "according to", "meaning": "وفقاً لـ / بناءً على", "type": "prepositional phrase"},
        {"expression": "enriching adventure", "meaning": "مغامرة مفيدة وإثرائية", "type": "expression"},
        {"expression": "hope for the best", "meaning": "يتمنى ويأمل الأفضل", "type": "expression"},
        {"expression": "to one's surprise", "meaning": "لدهشته ومفاجأته", "type": "idiom"},
        {"expression": "adjust to", "meaning": "يتأقلم ويتكيف مع", "type": "verb + preposition"},
        {"expression": "connect with", "meaning": "يتواصل مع", "type": "verb + preposition"},
        {"expression": "dream of", "meaning": "يحلم بـ", "type": "verb + preposition"},
        {"expression": "rely on", "meaning": "يعتمد على", "type": "verb + preposition"},
        {"expression": "write down", "meaning": "يسجّل ويدوّن في دفتر", "type": "phrasal verb"},
        {"expression": "catch up", "meaning": "يتبادل الأخبار والمستجدات مع صديق", "type": "phrasal verb"}
    ],
    "derivativeRoots": [
        {
            "root": "anxious",
            "family": {
                "verb": "—",
                "noun": "anxiety (قلق وتوتر)",
                "adjective": "anxious (قلق)",
                "adverb": "anxiously (بقلق وتوتر)"
            }
        },
        {
            "root": "complicate",
            "family": {
                "verb": "complicate (يعقد المشكلة)",
                "noun": "complication (تعقيد / مشكلة)",
                "adjective": "complicated (معقد)",
                "adverb": "—"
            }
        },
        {
            "root": "confident",
            "family": {
                "verb": "confide (يأمن / يسر لـ)",
                "noun": "confidence (ثقة)",
                "adjective": "confident (واثق)",
                "adverb": "confidently (بثقة واقتدار)"
            }
        },
        {
            "root": "enrich",
            "family": {
                "verb": "enrich (يثري / ينمّي)",
                "noun": "enrichment (إثراء / تدعيم)",
                "adjective": "enriching / enriched (إثرائي / مدعّم)",
                "adverb": "—"
            }
        }
    ],
    "clearConfusion": [
        {
            "title": "abroad vs. aboard",
            "notes": [
                {
                    "word": "abroad (adv)",
                    "explanation": "في الخارج أو إلى دولة أجنبية.",
                    "example": "Ramy dreamed of traveling abroad to study English in the UK."
                },
                {
                    "word": "aboard (adv / prep)",
                    "explanation": "على متن وسيلة مواصلات (طائرة، سفينة، قطار، حافلة).",
                    "example": "The flight attendant welcomed all passengers aboard the airplane."
                }
            ]
        },
        {
            "title": "rich vs. enriching vs. enriched",
            "notes": [
                {
                    "word": "rich (adj)",
                    "explanation": "غني بالمال أو وافر بالموارد الطبيعية.",
                    "example": "Egypt is rich in historical monuments and natural resources."
                },
                {
                    "word": "enriching (adj)",
                    "explanation": "إثرائي ومفيد يضيف قيمة وخبرة للحياة والعقل.",
                    "example": "Traveling and conversing with people of different cultures is an enriching experience."
                },
                {
                    "word": "enriched (adj)",
                    "explanation": "مُدعم أو مقوّى بمواد مضافة كالفيتامينات في الأغذية.",
                    "example": "This whole-wheat flour is enriched with iron and vitamin B."
                }
            ]
        },
        {
            "title": "speak vs. say vs. tell",
            "notes": [
                {
                    "word": "speak (v)",
                    "explanation": "يتحدث لغة معينة أو يلقي خطاباً (يليه اللغة مباشرة أو to someone).",
                    "example": "Ramy can now speak English fluently."
                },
                {
                    "word": "say (v)",
                    "explanation": "يقول كلاماً أو عبارة محددة (لا يليه مفعول عاقل مباشر إلا بحرف to).",
                    "example": "He said 'One ticket, please' to the bus driver."
                },
                {
                    "word": "tell (v)",
                    "explanation": "يخبر شخصاً أو يروي قصة (يليه مفعول به شخصي مباشر tell + person).",
                    "example": "Please tell me the directions to the train station."
                }
            ]
        },
        {
            "title": "anxious vs. nervous vs. worried vs. afraid",
            "notes": [
                {
                    "word": "anxious",
                    "explanation": "قلق ومتلهف بشأن نتيجة غير مؤكدة في المستقبل.",
                    "example": "She felt anxious while waiting for her final test results."
                },
                {
                    "word": "nervous",
                    "explanation": "متوتر ومرتبك لحظياً (مثل الوقوف للتحدث أمام حشد).",
                    "example": "He felt nervous before stepping onto the stage."
                },
                {
                    "word": "worried",
                    "explanation": "قلق ومهموم بشأن مشكلة قائمة بالفعل (كالمرض أو الأقساط).",
                    "example": "I was very worried about my sick grandmother."
                },
                {
                    "word": "afraid",
                    "explanation": "خائف من خطر داهم أو مادي محدد.",
                    "example": "The young boy is afraid of snakes and heights."
                }
            ]
        }
    ],
    "storyBook": {
        "title": "Ramy's British Adventure: From Struggle to Confidence (رحلة رامي: من المعاناة إلى الثقة)",
        "scenes": [
            {
                "sceneNumber": 1,
                "title": "The Airport Arrival (الوصول والارتباك في المطار)",
                "narrative": "Ramy had always dreamed of visiting England. But when his flight landed at Liverpool Airport, anxiety washed over him. The immigration officer asked him questions, and Ramy could only smile and nervously show his passport. In the city, trying to buy a bus ticket was so complicated that people grew impatient behind him, leaving him deeply embarrassed.",
                "illustration": "🛬 Ramy standing at the Liverpool airport border counter, holding his green passport with a shy, bewildered smile.",
                "moral": "Facing real linguistic barriers can be overwhelming, but recognizing the need for change is the first step toward growth."
            },
            {
                "sceneNumber": 2,
                "title": "The Digital Breakthrough (الانطلاقة الرقمية ليلاً)",
                "narrative": "That evening in his hotel room, determined not to let fear spoil his adventure, Ramy downloaded a language app. He practiced basic travel phrases and carefully wrote down common questions in his pocket notepad. The next morning, he stepped into a bakery and said clearly: 'One coffee and a pastry, please.' The baker smiled and handed him his order. His confidence soared!",
                "illustration": "☕ Ramy sitting at a cheerful Liverpool café terrace, holding his notepad and speaking cheerfully to the friendly shopkeeper.",
                "moral": "Small, practical steps combined with modern learning tools instantly break the ice of self-doubt."
            },
            {
                "sceneNumber": 3,
                "title": "An Enriching Transformation (مغامرة إثرائية تُغير الحياة)",
                "narrative": "Throughout the remainder of his stay, Ramy greeted locals, asked for directions in the parks, and listened attentively to British accents. The locals warmly appreciated his efforts and helped him navigate the city. By the time he flew back home to Cairo, his journey was no longer a struggle, but an unforgettable, enriching adventure.",
                "illustration": "🏛️ Ramy walking happily near the historic Royal Albert Dock in Liverpool, laughing and chatting with friendly local youth.",
                "moral": "Courage and dedication transform everyday communication hurdles into rewarding, life-enriching connections."
            }
        ]
    },
    "speakingDialogue": {
        "title": "Catching Up & Informal Email Advice (حوار بين رامي وصديقه مازن حول رحلته وكتابة الإيميل)",
        "characters": ["Mazen", "Ramy"],
        "lines": [
            {
                "speaker": "Mazen",
                "text": "Hi Ramy! Long time no see! How was your summer trip to Liverpool?",
                "translation": "أهلاً يا رامي! لم أرك منذ وقت طويل! كيف كانت رحلتك الصيفية إلى ليفربول؟"
            },
            {
                "speaker": "Ramy",
                "text": "What's up, Mazen! At first, it was quite complicated because I couldn't understand local accents, and I felt so anxious.",
                "translation": "ما الأخبار يا مازن! في البداية كانت الأمور معقدة للغاية لأنني لم أستطع فهم اللهجات المحلية وشعرت بقلق شديد."
            },
            {
                "speaker": "Mazen",
                "text": "Really? How did you manage to get around and order food without getting completely embarrassed?",
                "translation": "حقاً؟ وكيف استطعت التجول وطلب الطعام دون أن تشعر بالحرج الشديد؟"
            },
            {
                "speaker": "Ramy",
                "text": "I downloaded a handy language app, practiced basic phrases, and wrote down useful expressions every night.",
                "translation": "قمت بتحميل تطبيق لغات عملي، وتدربت على عبارات أساسية ودونت تعبيرات مفيدة كل ليلة."
            },
            {
                "speaker": "Mazen",
                "text": "That's awesome! Did people appreciate your efforts when you tried speaking to them?",
                "translation": "هذا مذهل! وهل قدّر الناس جهودك عندما حاولت التحدث معهم؟"
            },
            {
                "speaker": "Ramy",
                "text": "Definitely! The locals were extremely kind and supportive, which built my speaking confidence day by day.",
                "translation": "بالتأكيد! كان السكان المحليون في غاية اللطف والتشجيع، مما بنى ثقتي في التحدث يوماً بعد يوم."
            },
            {
                "speaker": "Mazen",
                "text": "By the way, could you send me an informal email describing your weekend trip with tips on informal writing?",
                "translation": "بالمناسبة، هل يمكنك أن ترسل لي إيميلاً غير رسمي تصف فيه رحلتك في عطلة نهاية الأسبوع مع نصائح لكتابة الرسائل الودية؟"
            },
            {
                "speaker": "Ramy",
                "text": "Sure thing! Remember that informal emails always use friendly greetings, everyday words, and casual contractions like 'I'm' and 'don't'!",
                "translation": "بكل سرور! وتذكر دائماً أن الإيميل غير الرسمي يستخدم تحيات ودية، كلمات يومية، واختصارات بسيطة مثل I'm و don't!"
            }
        ]
    },
    "quiz": [
        {
            "id": 1,
            "question": "Malak felt very ............ before her first big secondary school exam. [الأقصر - الطود 2026]",
            "options": ["anxious", "local", "confidence", "enriching"],
            "correct": 0,
            "explanation": "'Anxious' (قلق / متوتر) is the correct adjective describing emotional distress before an exam. 'Confidence' is a noun."
        },
        {
            "id": 2,
            "question": "The lecture on cultural exchange was both informative and ............ . [أسيوط - ساحل سليم / الإسماعيلية 2026]",
            "options": ["generic", "enriching", "anxious", "hesitant"],
            "correct": 1,
            "explanation": "'Enriching' (إثرائي / مفيد وقيّم) describes something educational that enhances one's understanding."
        },
        {
            "id": 3,
            "question": "Try to ............ your vocabulary by reading short stories and listening to podcasts. [الدقهلية - بلقاس 2026]",
            "options": ["forget", "memorize", "enrich", "forge"],
            "correct": 2,
            "explanation": "'Enrich your vocabulary' (يثري حصيلتك اللغوية) is a standard academic collocation."
        },
        {
            "id": 4,
            "question": "Luckily, Lujain answered every challenging question ............ during the interview. [الدقهلية - طلخا 2026]",
            "options": ["confidently", "critically", "lately", "cowardly"],
            "correct": 0,
            "explanation": "'Confidently' (بثقة واقتدار) is an adverb modifying the verb 'answered'."
        },
        {
            "id": 5,
            "question": "Modern search engines depend on highly ............ digital algorithms. [El-Moasser 2026]",
            "options": ["hesitant", "enriching", "anxious", "complicated"],
            "correct": 3,
            "explanation": "'Complicated' (معقدة / متشابكة) describes complex software algorithms with many interconnected parts."
        },
        {
            "id": 6,
            "question": "He ............ ran into his former teacher at the supermarket; he had not planned to see him. [البحيرة - دمنهور 2026]",
            "options": ["intentionally", "accidentally", "confidently", "contentedly"],
            "correct": 1,
            "explanation": "'Accidentally' (عن طريق الصدفة / دون تخطيط مسبق) means by chance without intention."
        },
        {
            "id": 7,
            "question": "She looked ............ and turned red when everyone laughed at her simple slip of the tongue. [الجيزة - الدقي 2026]",
            "options": ["happy", "confident", "proud", "embarrassed"],
            "correct": 3,
            "explanation": "'Embarrassed' (محرج / خجلان) describes the feeling of awkwardness that causes someone to blush (turn red)."
        },
        {
            "id": 8,
            "question": "Hana had to ............ the brightness settings on her laptop because the room was dim. [البحيرة - إدكو 2026]",
            "options": ["greet", "adjust", "download", "appreciate"],
            "correct": 1,
            "explanation": "'Adjust' (يعدّل / يضبط) is used for altering machine or software settings."
        },
        {
            "id": 9,
            "question": "The teacher was pleased with the students' ............ in speaking English fluently. [الجيزة - الوراق 2026]",
            "options": ["progress", "spices", "economy", "traffic"],
            "correct": 0,
            "explanation": "'Progress' (تقدّم وتطور) is the academic achievement made over time in learning."
        },
        {
            "id": 10,
            "question": "A person who is ............ gets annoyed quickly when things take more time than expected. [El-Moasser 2026]",
            "options": ["interactive", "impatient", "local", "audio"],
            "correct": 1,
            "explanation": "'Impatient' (نافد الصبر / غير صبور) describes someone easily irritated by delays."
        },
        {
            "id": 11,
            "question": "Areej wants to ............ English before traveling to Canada for her university degree. [El-Moasser 2026]",
            "options": ["appreciate", "greet", "master", "receive"],
            "correct": 2,
            "explanation": "To 'master English' (يتقن الإنجليزية) means to achieve full command and fluency."
        },
        {
            "id": 12,
            "question": "Karim practises English sounds with an audio app to improve his ............ . [El-Moasser 2026]",
            "options": ["application", "playback", "pronunciation", "communication"],
            "correct": 2,
            "explanation": "'Pronunciation' (النطق الصوتي السليم) is improved by practicing vocal sounds and accents."
        },
        {
            "id": 13,
            "question": "She made a great ............ to finish the research paper before the midnight deadline. [El-Moasser 2026]",
            "options": ["target", "platform", "effort", "chance"],
            "correct": 2,
            "explanation": "We say 'make an effort' (يبذل جهداً كبيراً)."
        },
        {
            "id": 14,
            "question": "The tourist asked a/an ............ guide about the most historic monuments in Luxor. [El-Moasser 2026]",
            "options": ["interactive", "impatient", "local", "audio"],
            "correct": 2,
            "explanation": "A 'local guide' (مرشد محلي) belongs to the specific town or region."
        },
        {
            "id": 15,
            "question": "We all ............ the doctors and nurses for their heroic efforts during health crises. [El-Moasser 2026]",
            "options": ["appreciate", "greet", "master", "receive"],
            "correct": 0,
            "explanation": "'Appreciate' (يقدّر / يشكر جهود) means to recognize the value or good work of someone."
        },
        {
            "id": 16,
            "question": "To be 'confident' means to feel ............ . [القليوبية - قليوب 2026]",
            "options": [
                "worried and anxious about unknown threats",
                "sure of yourself and your capabilities",
                "embarrassed when speaking in public",
                "impatient when standing in lines"
            ],
            "correct": 1,
            "explanation": "Official El-Moasser definition: 'confident' means feeling sure of yourself and your abilities."
        },
        {
            "id": 17,
            "question": "The instructions were so complicated that students struggled. Two synonyms of 'complicated' are ............ . [الإسماعيلية 2026]",
            "options": [
                "complex and difficult",
                "simple and clear",
                "fluent and easy",
                "short and brief"
            ],
            "correct": 0,
            "explanation": "'Complex' and 'difficult' are direct synonyms of 'complicated' (معقد)."
        },
        {
            "id": 18,
            "question": "The antonyms of the adjective 'anxious' are ............ . [الشرقية - الصالحية 2026]",
            "options": [
                "calm and relaxed",
                "frightened and nervous",
                "confused and shy",
                "troubled and uneasy"
            ],
            "correct": 0,
            "explanation": "'Calm' and 'relaxed' (هادئ ومرتاح) are the antonyms of 'anxious' (قلق)."
        },
        {
            "id": 19,
            "question": "Travelling provides hands-on experience and enriches life. The antonym of 'enrich' is ............ . [الإسكندرية 2026]",
            "options": ["deepen", "improve", "weaken", "develop"],
            "correct": 2,
            "explanation": "'Weaken' (يضعف أو يقلل القيمة) is the opposite of 'enrich' (يثري)."
        },
        {
            "id": 20,
            "question": "When people are forced to wait in long queues under the sun, they easily grow ............ . [El-Moasser 2026]",
            "options": ["impatient", "enriching", "local", "accidental"],
            "correct": 0,
            "explanation": "'Grow impatient' (ينفد صبره) is a standard collocation."
        },
        {
            "id": 21,
            "question": "Ramy thought no one would understand him, but ............ , the waiter understood his English clearly. [El-Moasser 2026]",
            "options": ["in addition", "because of", "to his surprise", "according to"],
            "correct": 2,
            "explanation": "'To his surprise' (لدهشته ومفاجأته) introduces an unexpected positive outcome."
        },
        {
            "id": 22,
            "question": "New exchange students need some time to adjust ............ the culture and climate of the new country. [الأقصر - أرمنت 2026]",
            "options": ["on", "with", "to", "at"],
            "correct": 2,
            "explanation": "'Adjust to' (يتأقلم ويتكيف مع) takes the preposition 'to'."
        },
        {
            "id": 23,
            "question": "Before you leave the classroom, please write ............ the homework assignments in your notebook. [El-Moasser 2026]",
            "options": ["on", "of", "with", "down"],
            "correct": 3,
            "explanation": "'Write down' (يدوّن ويسجل) is the correct phrasal verb."
        },
        {
            "id": 24,
            "question": "The news about the sudden storm was shocking; everyone listened ............ to the radio. [السويس 2026]",
            "options": ["anxious", "anxiously", "anxiety", "anxieties"],
            "correct": 1,
            "explanation": "We need the adverb 'anxiously' (بقلق وتوتر) to describe the manner of listening."
        },
        {
            "id": 25,
            "question": "In an informal email, you usually begin with a friendly ............ . [أسيوط - أبو تيج 2026]",
            "options": ["subject line", "greeting", "to line", "sender signature"],
            "correct": 1,
            "explanation": "An informal email opens with a casual, friendly greeting like 'Hi' or 'Hello'."
        },
        {
            "id": 26,
            "question": "Which of the following is a classic example of an informal greeting? [أسوان 2026]",
            "options": ["Dear Sir:", "To whom it may concern:", "Hi Salma,", "Yours faithfully,"],
            "correct": 2,
            "explanation": "'Hi Salma,' is friendly and casual. The other choices are strictly formal business conventions."
        },
        {
            "id": 27,
            "question": "The general tone of an informal email is typically ............ . [الدقهلية - بلقاس 2026]",
            "options": ["academic and strict", "business-like and rigid", "relaxed and friendly", "legal and formal"],
            "correct": 2,
            "explanation": "Official writing skill standard: informal emails maintain a 'relaxed and friendly' tone."
        },
        {
            "id": 28,
            "question": "In informal emails to close friends, it is natural to use ............ like 'I'm' and 'don't'. [الدقهلية - طلخا 2026]",
            "options": ["long classical words", "contractions", "archaic legal terms", "foreign technical jargon"],
            "correct": 1,
            "explanation": "'Contractions' (الصيغ المختصرة) are a trademark characteristic of informal writing."
        },
        {
            "id": 29,
            "question": "'............' is a common informal sign-off used to say goodbye to a friend. [أسوان - إدفو 2026]",
            "options": ["Yours sincerely", "Respectfully", "Faithfully", "See you soon"],
            "correct": 3,
            "explanation": "'See you soon' is an informal sign-off. The other three options are formal closings."
        },
        {
            "id": 30,
            "question": "In an email to your cousin, the phrase 'catch up' means to ............ . [El-Moasser 2026]",
            "options": [
                "run fast to grab a moving train",
                "meet or talk to exchange latest news",
                "file an official legal complaint",
                "cancel an appointment suddenly"
            ],
            "correct": 1,
            "explanation": "'Catch up' in informal communication means to talk or meet with someone to hear about their latest news and life updates."
        }
    ]
}

# 1. Output Data File
data_path = os.path.join(u5_dir, "lesson-4-5.data.js")
js_content = f"""/**
 * Secondary 1 - Unit 5 - Lessons 4 & 5 Data Payload
 * Ramy's Journey with English & Informal Email Writing (رحلة رامي مع الإنجليزية وكتابة الإيميل غير الرسمي)
 * Official Source: El-Moasser 2026/2027 (SB pages 77:79, textbook pages 286-300)
 * ZERO GRAMMAR MANDATE COMPLIANT: Only authentic Lexical, Functional, Writing & Reading Study.
 */

window.lessonData = {json.dumps(lesson_data, ensure_ascii=False, indent=2)};

// Backward compatibility & shell initialization hook
window.__LESSON_DATA__ = window.lessonData;
"""

with open(data_path, "w", encoding="utf-8") as f:
    f.write(js_content)

print("Created lesson-4-5.data.js successfully!")

# 2. Output Presentation HTML File
html_content = '''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sec 1 - Unit 5 - Lessons 4 & 5: Ramy's Journey & Informal Email | Mr. Ahmed Assem</title>
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
            <a href="../index.html">Sec 1</a> / <a href="./index.html">Unit 5</a> / <span>Lessons 4 & 5</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="../../my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='../../my-photo-profile.webp';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="badges-row">
                <span class="badge badge-active">Sec 1 • Unit 5</span>
                <span class="badge badge-gold">✉️ Ramy's Journey & Informal Email</span>
            </div>
            <h2 id="title" class="lesson-header-title">Lessons 4 & 5: Ramy's Journey with English & Informal Email Writing</h2>
            <p id="description" class="lesson-desc-display">المفردات الأساسية والتراكمية، مهارة كتابة الإيميل الودي، التعريفات والمترادفات والمتضادات، المتلازمات والمشتقات، الفروق اللغوية، القصة التفاعلية 3D، المحادثة الناطقة، واختبار شامل 30 سؤالاً 🎯 (Zero Grammar)</p>
        </div>

        <!-- Dynamic Navigation Tabs -->
        <div class="nav-tabs-wrapper">
            <div class="nav-tabs-container" id="navTabsContainer">
                <button class="nav-tab active" data-tab="vocab" data-sound-click="tab">📚 المفردات واللغويات</button>
                <button class="nav-tab" data-tab="writing" data-sound-click="tab">✉️ مهارة كتابة الإيميل</button>
                <button class="nav-tab" data-tab="storybook" data-sound-click="tab">📖 القصة التفاعلية 3D</button>
                <button class="nav-tab" data-tab="dialogue" data-sound-click="tab">🎙️ المحادثة الناطقة</button>
                <button class="nav-tab" data-tab="quiz" data-sound-click="tab">🎯 الاختبار الشامل (30 سؤالاً)</button>
            </div>
        </div>

        <!-- TAB 1: Comprehensive Vocabulary & Language Study -->
        <div id="tab-vocab" class="tab-pane active">
            <!-- 1. Key Vocabulary -->
            <div class="curriculum-card">
                <div class="card-header-badge">المفردات الرئيسية • Key Vocabulary</div>
                <div id="keyVocabGrid" class="vocab-grid"></div>
            </div>

            <!-- 2. Accumulative Vocabulary -->
            <div class="curriculum-card">
                <div class="card-header-badge">المفردات التراكمية الإضافية • Accumulative Vocabulary</div>
                <div id="accumulativeVocabGrid" class="vocab-grid-compact"></div>
            </div>

            <!-- 3. Definitions -->
            <div class="curriculum-card">
                <div class="card-header-badge">التعريفات الهامة • Definitions</div>
                <div id="definitionsList" class="definitions-list"></div>
            </div>

            <!-- 4. Synonyms & Antonyms -->
            <div class="curriculum-card">
                <div class="card-header-badge">المترادفات والمتضادات • Synonyms & Antonyms</div>
                <div class="syn-ant-tables-wrapper">
                    <div class="syn-col">
                        <h4 class="col-subheading">المترادفات (Synonyms)</h4>
                        <div id="synonymsTable"></div>
                    </div>
                    <div class="ant-col">
                        <h4 class="col-subheading">المتضادات (Antonyms)</h4>
                        <div id="antonymsTable"></div>
                    </div>
                </div>
            </div>

            <!-- 5. Collocations -->
            <div class="curriculum-card">
                <div class="card-header-badge">المتلازمات اللفظية • Collocations</div>
                <div id="collocationsGrid" class="collocations-grid"></div>
            </div>

            <!-- 6. Expressions & Prepositions -->
            <div class="curriculum-card">
                <div class="card-header-badge">تعبيرات وحروف جر هامة • Expressions & Prepositions</div>
                <div id="expressionsGrid" class="expressions-grid"></div>
            </div>

            <!-- 7. Derivatives -->
            <div class="curriculum-card">
                <div class="card-header-badge">المشتقات اللغوية • Derivatives</div>
                <div id="derivativesTable" class="derivatives-wrapper"></div>
            </div>

            <!-- 8. Clear the Confusion -->
            <div class="curriculum-card">
                <div class="card-header-badge">لاحظ الفرق وجنب الخلط • Clear the Confusion</div>
                <div id="confusionContainer" class="confusion-container"></div>
            </div>
        </div>

        <!-- TAB 2: Writing Skill - Informal Email -->
        <div id="tab-writing" class="tab-pane">
            <div class="curriculum-card">
                <div class="card-header-badge">مهارة الكتابة • Writing Skill: Informal Email</div>
                
                <div class="writing-guide-hero" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                    <h3 style="color: #60a5fa; margin-top: 0; font-size: 1.3rem;">✉️ ما هو البريد الإلكتروني غير الرسمي (Informal Email)؟</h3>
                    <p style="color: #cbd5e1; line-height: 1.8; margin-bottom: 16px;">
                        رسالة شخصية تُرسل إلى الأصدقاء، أفراد العائلة، أو زملاء الدراسة المقربين. تُكتب بأسلوب ودي وبسيط وغير رسمي (relaxed, friendly, and casual style) لمشاركة الأخبار، الدعوات، أو الدردشة الودية.
                    </p>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 20px;">
                        <div style="background: rgba(59, 130, 246, 0.08); border-radius: 12px; padding: 16px; border: 1px solid rgba(59, 130, 246, 0.2);">
                            <h4 style="color: #93c5fd; margin-top: 0;">1. خصائص الأسلوب واللغة</h4>
                            <ul style="color: #cbd5e1; padding-right: 20px; line-height: 1.8; margin: 0;">
                                <li>جمل بسيطة ومعبرة (Simple sentences)</li>
                                <li>استخدام الاختصارات (Contractions: I'm, don't, can't)</li>
                                <li>كلمات يومية مألوفة وتعبيرات ودية</li>
                                <li>إمكانية استخدام الرموز التعبيرية (Emojis)</li>
                            </ul>
                        </div>
                        <div style="background: rgba(16, 185, 129, 0.08); border-radius: 12px; padding: 16px; border: 1px solid rgba(16, 185, 129, 0.2);">
                            <h4 style="color: #6ee7b7; margin-top: 0;">2. الهيكل البنائي (Structure)</h4>
                            <ol style="color: #cbd5e1; padding-right: 20px; line-height: 1.8; margin: 0;">
                                <li><strong>Greeting:</strong> Hi / Hello [Name]</li>
                                <li><strong>Opening:</strong> How are you? / What's up?</li>
                                <li><strong>Main Message:</strong> متن الرسالة والأفكار الرئيسية</li>
                                <li><strong>Closing:</strong> Best wishes, / See you soon, / Take care,</li>
                                <li><strong>Your Name:</strong> اسم الراسل</li>
                            </ol>
                        </div>
                    </div>
                </div>

                <div class="writing-model-card" style="background: rgba(245, 158, 11, 0.05); border: 1px solid rgba(245, 158, 11, 0.2); border-radius: 16px; padding: 24px;">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                        <h4 style="color: #fbbf24; margin: 0; font-size: 1.15rem;">📝 نموذج إيميل غير رسمي استرشادي (El-Moasser Model)</h4>
                        <span style="background: rgba(245, 158, 11, 0.2); color: #fbbf24; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem;">دعوة لرحلة شاطئية</span>
                    </div>
                    
                    <div style="background: rgba(0, 0, 0, 0.3); border-radius: 12px; padding: 20px; font-family: 'Inter', sans-serif; direction: ltr; text-align: left; color: #e2e8f0; line-height: 1.7;">
                        <p style="margin: 0 0 12px 0;"><strong style="color: #94a3b8;">Subject:</strong> Let's go on a weekend adventure!</p>
                        <p style="margin: 0 0 12px 0;"><strong style="color: #60a5fa;">Hi Nour,</strong></p>
                        <p style="margin: 0 0 12px 0;">How's everything going? I haven't seen you in a while, so I thought it would be great to catch up and have some fun together. I'm planning a weekend trip with a few friends, and I really hope you can join us!</p>
                        <p style="margin: 0 0 12px 0;">We're heading to the beach this Saturday morning. We'll swim, play some volleyball, and have a picnic by the sea. I know how much you love the water and good food! If you want, you can bring your brother or anyone else who wants to come.</p>
                        <p style="margin: 0 0 12px 0;">We'll meet at the park at 8:30 a.m., then we'll all go together by car. I'll bring snacks and drinks, but if you have a favorite, let me know!</p>
                        <p style="margin: 0 0 16px 0;">Let me know as soon as you can if you're in. I can't wait to spend the day together and make some awesome memories!</p>
                        <p style="margin: 0;"><strong style="color: #34d399;">See you soon,</strong><br><strong style="color: #f1f5f9;">Reda</strong></p>
                    </div>
                </div>
            </div>
        </div>

        <!-- TAB 3: 3D Interactive StoryBook -->
        <div id="tab-storybook" class="tab-pane">
            <div class="curriculum-card storybook-window">
                <div class="card-header-badge">القصة التفاعلية • 3D StoryBook</div>
                <div id="storybookMount" class="storybook-viewport"></div>
            </div>
        </div>

        <!-- TAB 4: Speaking Dialogue -->
        <div id="tab-dialogue" class="tab-pane">
            <div class="curriculum-card">
                <div class="card-header-badge">المحادثة الناطقة • Speaking Dialogue</div>
                <div id="dialogueMount" class="dialogue-theater"></div>
            </div>
        </div>

        <!-- TAB 5: 30-Question Comprehensive Quiz -->
        <div id="tab-quiz" class="tab-pane">
            <div class="quiz-container-box">
                <div class="quiz-hero-header">
                    <span class="quiz-pill-badge">🎯 بنك أسئلة المعاصر 2026/2027</span>
                    <h3 class="quiz-hero-title">اختبار تقييم Lessons 4 & 5: ثلاثون سؤالاً شاملاً</h3>
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
            <a href="./lesson-3.html" class="back-btn" data-sound-click="click">⬅️ الدرس السابق: Lesson 3</a>
            <a href="./index.html" class="next-btn" data-sound-click="click">قائمة الوحدة الخامسة 📋</a>
        </div>
    </div>

    <!-- Scripts: Sound Effects, Data Payload, and Decoupled Presentation Engine -->
    <script src="../../assets/js/sounds.js"></script>
    <script src="./lesson-4-5.data.js"></script>
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/ui.js"></script>
</body>
</html>
'''

html_path = os.path.join(u5_dir, "lesson-4-5.html")
with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Created lesson-4-5.html successfully!")
