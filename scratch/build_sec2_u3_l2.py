import json
import os

lesson_data = {
    "id": "sec2_unit3_lesson32",
    "stage": "Sec 2",
    "unit": "Unit 3: Echoes of the Past",
    "lesson": "Lesson 3.2",
    "title": "Lesson 3.2: The Museum as a Storyteller (The Grand Egyptian Museum)",
    "description": "المفردات الأساسية والهامة، التعريفات، المترادفات والمتضادات، المتلازمات، الملاحظات اللغوية والمشتقات، قصة القراءة التفاعلية 3D عن المتحف المصري الكبير GEM، والمحادثة الناطقة واختبار شامل 30 سؤالاً من كتاب المعاصر 🎯",
    "keyVocabulary": [
        {
            "word": "accessible",
            "pos": "Adjective",
            "meaning": "فِي مُتَنَاوَلِ الجَمِيعِ / مَيْسُورُ الوُصُولِ إِلَيْهِ وَفَهْمِهِ",
            "explain": "Easy for people of all backgrounds and abilities to reach, use, or understand.",
            "example": "Interactive screens make the museum exhibitions accessible to visitors of all ages and abilities."
        },
        {
            "word": "artifact",
            "pos": "Noun",
            "meaning": "قِطْعَةٌ أَثَرِيَّةٌ (مِنْ صُنْعِ الإِنْسَانِ قَدِيماً)",
            "explain": "An object made or used by humans in the past, especially one of historical interest.",
            "example": "The Grand Egyptian Museum houses more than 100,000 priceless artifacts from ancient Egypt."
        },
        {
            "word": "chronological",
            "pos": "Adjective",
            "meaning": "زَمَنِيٌّ / مُرَتَّبٌ حَسَبَ التَّسَلْسُلِ الزَّمَنِيِّ لِلأَحْدَاثِ",
            "explain": "Arranged in the order in which events happened over time.",
            "example": "The royal statues along the Grand Staircase are arranged in strict chronological order."
        },
        {
            "word": "conservation",
            "pos": "Noun",
            "meaning": "الصَّوْنُ / الحِفَاظُ عَلَى الآثَارِ وَتَرْمِيمُهَا عِلْمِيّاً",
            "explain": "The careful process of protecting and preserving cultural or natural objects from damage and decay.",
            "example": "State-of-the-art conservation laboratories inside the GEM ensure our heritage survives for centuries."
        },
        {
            "word": "curator",
            "pos": "Noun",
            "meaning": "أَمِينُ مُتْحَفٍ / المَسْؤُولُ عَنِ اخْتِيَارِ وَتَنْظِيمِ المَعْرُوضَاتِ",
            "explain": "A professional person who looks after, researches, and organizes the contents of a museum or gallery.",
            "example": "As the museum's curator, she decides which historical stories each exhibition should convey."
        },
        {
            "word": "curation",
            "pos": "Noun",
            "meaning": "الانْتِقَاءُ وَالتَّنْظِيمُ وَالعَرْضُ بِعِنَايَةٍ فَائِقَةٍ",
            "explain": "The thoughtful process of selecting, organizing, and presenting items in an exhibition.",
            "example": "Skillful curation transforms a room of ancient stones into a captivating living narrative."
        },
        {
            "word": "dynasty",
            "pos": "Noun",
            "meaning": "أُسْرَةٌ حَاكِمَةٌ / سُلَالَةٌ مَلَكِيَّةٌ تَتَعَاقَبُ عَلَى الحُكْمِ",
            "explain": "A series of rulers or monarchs from the same family who govern a country over an era.",
            "example": "The museum galleries guide visitors from prehistory through the great dynasties of the pharaohs."
        },
        {
            "word": "multilingual",
            "pos": "Adjective",
            "meaning": "مُتَعَدِّدُ اللُّغَاتِ (يَتَحَدَّثُ أَوْ مَكْتُوبٌ بِأَكْثَرَ مِنْ لُغَتَيْنِ)",
            "explain": "Able to speak, use, or written in more than two languages.",
            "example": "Multilingual labels and audio guides welcome international tourists in six different languages."
        }
    ],
    "importantVocabulary": [
        {
            "word": "ancient",
            "pos": "Adjective",
            "meaning": "قَدِيمٌ جِدّاً / عَتِيقٌ",
            "explain": "Belonging to a period of history that is thousands of years in the past.",
            "example": "Ancient Egyptian craftsmen possessed remarkable engineering skills."
        },
        {
            "word": "archaeological",
            "pos": "Adjective",
            "meaning": "أَثَرِيٌّ / مُتَعَلِّقٌ بِعِلْمِ الآثَارِ",
            "explain": "Relating to the study of ancient cultures through their material remains.",
            "example": "The GEM is celebrated as the largest archaeological museum in the world."
        },
        {
            "word": "artefact",
            "pos": "Noun",
            "meaning": "قِطْعَةٌ أَثَرِيَّةٌ (هجاء بديل شائع)",
            "explain": "British spelling of artifact; a historic hand-made item.",
            "example": "Each artefact in the display case tells an unforgettable story."
        },
        {
            "word": "aspect",
            "pos": "Noun",
            "meaning": "جَانِبٌ / وَجْهٌ مِنْ أَوْجُهِ الشَّيْءِ",
            "explain": "A particular part, feature, or quality of a situation.",
            "example": "Education is one of the most exciting aspects of the museum's mission."
        },
        {
            "word": "breathtaking",
            "pos": "Adjective",
            "meaning": "مُبْهِرٌ لِلْغَايَةِ / يَأْخُذُ الأَنْفَاسَ مِنْ جَمَالِهِ",
            "explain": "Extremely beautiful, astonishing, or impressive.",
            "example": "The view of the Giza Pyramids through the glass facade is truly breathtaking."
        },
        {
            "word": "civilisation",
            "pos": "Noun",
            "meaning": "حَضَارَةٌ",
            "explain": "A well-developed society with advanced culture, laws, and architecture.",
            "example": "The Nile Valley gave birth to one of human history's earliest civilisations."
        },
        {
            "word": "Coptic",
            "pos": "Adjective",
            "meaning": "قِبْطِيٌّ (مُتَعَلِّقٌ بِمَسِيحِيِّي مِصْرَ أَوْ لُغَتِهِمْ)",
            "explain": "Relating to the Coptic Christian church or Egyptian historical period.",
            "example": "The museum displays artifacts from the Pharaonic, Greco-Roman, and Coptic eras."
        },
        {
            "word": "colossal",
            "pos": "Adjective",
            "meaning": "هَائِلٌ / ضَخْمٌ كَالعِمْلَاقِ",
            "explain": "Extremely large, massive, or immense in scale.",
            "example": "The Grand Staircase features 87 colossal royal statues rising up to the atrium."
        },
        {
            "word": "depth",
            "pos": "Noun",
            "meaning": "عُمْقٌ / غِنَى وَأَصَالَةٌ",
            "explain": "The quality of being profound, thorough, and richly detailed.",
            "example": "The exhibitions reflect the depth and diversity of ancient Egyptian daily life."
        },
        {
            "word": "develop (ed)",
            "pos": "Verb",
            "meaning": "يَتَطَوَّرُ / يَنْمُو تَدْرِيجِيّاً",
            "explain": "To grow, expand, or become more advanced over time.",
            "example": "The exhibits demonstrate how ancient tools developed across millennia."
        },
        {
            "word": "display (ed)",
            "pos": "Verb / Noun",
            "meaning": "يَعْرِضُ / مَعْرَضٌ",
            "explain": "To arrange something so that people can look at it and enjoy it.",
            "example": "Tutankhamun's gold mask is displayed in a dedicated high-security gallery."
        },
        {
            "word": "ensure (d)",
            "pos": "Verb",
            "meaning": "يَضْمَنُ / يَكْفُلُ السَّلَامَةَ",
            "explain": "To make certain that something will happen or be safely protected.",
            "example": "Temperature-controlled cases ensure that fragile papyri remain undamaged."
        },
        {
            "word": "feature (d)",
            "pos": "Verb / Noun",
            "meaning": "يَتَمَيَّزُ بِـ / سِمَةٌ بَارِزَةٌ",
            "explain": "To include someone or something as an important part.",
            "example": "The grand hall features a towering statue of King Ramses II."
        },
        {
            "word": "generation",
            "pos": "Noun",
            "meaning": "جِيلٌ (مَجْمُوعَةٌ مِنَ النَّاسِ فِي عُمْرٍ مُتَقَارِبٍ)",
            "explain": "All of the people born and living at about the same time.",
            "example": "We have a sacred duty to preserve our national heritage for future generations."
        },
        {
            "word": "heritage",
            "pos": "Noun",
            "meaning": "تُرَاثٌ وَطَنِيٌّ أَوْ ثَقَافِيٌّ",
            "explain": "The history, traditions, and culture that belong to a country.",
            "example": "School field trips help young Egyptians feel connected to their heritage."
        },
        {
            "word": "impression",
            "pos": "Noun",
            "meaning": "انْطِبَاعٌ / تَأْثِيرٌ",
            "explain": "An idea, feeling, or opinion about something formed after experiencing it.",
            "example": "The monumental entrance left an unforgettable impression on every tourist."
        },
        {
            "word": "impressive",
            "pos": "Adjective",
            "meaning": "مُبْهِرٌ / مُثِيرٌ لِلإِعْجَابِ",
            "explain": "Evoking admiration through size, quality, skill, or grandeur.",
            "example": "The museum's high-tech conservation center is truly impressive."
        },
        {
            "word": "interactive",
            "pos": "Adjective",
            "meaning": "تَفَاعُلِيٌّ (يَسْمَحُ بِالمُشَارَكَةِ المُبَاشِرَةِ)",
            "explain": "Involving direct communication and two-way engagement between user and system.",
            "example": "Interactive touchscreens allow students to virtually restore broken pottery."
        },
        {
            "word": "landmark",
            "pos": "Noun",
            "meaning": "مَعْلَمٌ بَارِزٌ / نُقْطَةُ عَلَامٍ حَضَارِيَّةٌ",
            "explain": "An easily recognized building or feature that has great cultural importance.",
            "example": "The GEM has firmly established itself as a world-class cultural landmark."
        },
        {
            "word": "medieval",
            "pos": "Adjective",
            "meaning": "مُتَعَلِّقٌ بِالعُصُورِ الوُسْطَى",
            "explain": "Connected with the Middle Ages period in history.",
            "example": "Cairo is famous for its stunning Islamic and medieval architecture."
        },
        {
            "word": "memorable",
            "pos": "Adjective",
            "meaning": "لَا يُنْسَى / خَالِدٌ فِي الذَّاكِرَةِ",
            "explain": "Special and unforgettable; well worth remembering.",
            "example": "Hands-on workshops offer children a deeply memorable learning experience."
        },
        {
            "word": "narrative",
            "pos": "Noun",
            "meaning": "سَرْدٌ قَصَصِيٌّ / رِوَايَةٌ مُتَرَابِطَةٌ",
            "explain": "A story or account of events woven together in a meaningful way.",
            "example": "The museum's layout creates a powerful narrative of Egypt's endurance."
        },
        {
            "word": "ordinary",
            "pos": "Adjective",
            "meaning": "عَادِيٌّ / غَيْرُ اسْتِثْنَائِيٍّ",
            "explain": "Normal and usual, with no special or distinctive features.",
            "example": "Alongside royal crowns, ordinary everyday tools show how farmers lived."
        },
        {
            "word": "plateau",
            "pos": "Noun",
            "meaning": "هَضَبَةٌ (مِنْطَقَةٌ مُرْتَفِعَةٌ مُسْتَوِيَةُ السَّطْحِ)",
            "explain": "A large area of flat land that is elevated above the surrounding countryside.",
            "example": "The Grand Egyptian Museum overlooks the historic Giza plateau."
        },
        {
            "word": "prehistory",
            "pos": "Noun",
            "meaning": "عَصْرُ مَا قَبْلَ التَّارِيخِ (قَبْلَ اخْتِرَاعِ الكِتَابَةِ)",
            "explain": "The long period of human history before written records were kept.",
            "example": "The tour begins with stone weapons dating back to prehistory."
        },
        {
            "word": "preserve (d)",
            "pos": "Verb",
            "meaning": "يَحْفَظُ / يَصُونُ مِنَ التَّلَفِ",
            "explain": "To keep something in its original state and protect it from harm.",
            "example": "Dry desert sands helped preserve delicate organic remains for five millennia."
        },
        {
            "word": "program",
            "pos": "Noun",
            "meaning": "بَرْنَامَجٌ تَعْلِيمِيٌّ أَوْ تَدْرِيبِيٌّ",
            "explain": "A planned series of educational activities, workshops, or events.",
            "example": "Youth programs at the museum inspire children to pursue archaeology."
        },
        {
            "word": "recognise (d)",
            "pos": "Verb",
            "meaning": "يَتَعَرَّفُ عَلَى / يُقِرُّ بِأَهَمِّيَّةِ كَذَا",
            "explain": "To acknowledge the worth, validity, or distinct identity of something.",
            "example": "UNESCO recognised the site as an invaluable treasure of human achievement."
        },
        {
            "word": "remarkable",
            "pos": "Adjective",
            "meaning": "لَافِتٌ لِلنَّظَرِ / رَائِعٌ وَاسْتِثْنَائِيٌّ",
            "explain": "Unusual or special and therefore deserving attention and praise.",
            "example": "The museum makes a remarkable effort to represent all social classes."
        },
        {
            "word": "restore (d)",
            "pos": "Verb",
            "meaning": "يُرَمِّمُ / يُعِيدُ إِلَى حَالَتِهِ الأَصْلِيَّةِ",
            "explain": "To repair or renovate a building or work of art back to its initial state.",
            "example": "Chemists and artisans work collaboratively to restore ancient wooden panels."
        },
        {
            "word": "royal",
            "pos": "Adjective",
            "meaning": "مَلَكِيٌّ (مُتَعَلِّقٌ بِالمُلُوكِ وَالأُمَرَاءِ)",
            "explain": "Belonging to or connected with a king, queen, or royal family.",
            "example": "The museum showcases royal jewelry crafted with astonishing precision."
        },
        {
            "word": "scale",
            "pos": "Noun",
            "meaning": "حَجْمٌ / نِطَاقٌ / مِقْيَاسٌ",
            "explain": "The size, extent, or range of a project, building, or idea.",
            "example": "Designing a building on such an unprecedented scale required international teamwork."
        },
        {
            "word": "section",
            "pos": "Noun",
            "meaning": "قِسْمٌ / جُزْءٌ مُحَدَّدٌ",
            "explain": "One of the parts that something is divided into.",
            "example": "The Tutankhamun section occupies two vast wings of the second floor."
        },
        {
            "word": "staircase",
            "pos": "Noun",
            "meaning": "دَرَجٌ / سُلَّمٌ مَعْمَارِيٌّ كَبِيرٌ",
            "explain": "A set of stairs inside a building with its surrounding supports.",
            "example": "Ascending the Grand Staircase takes you through 3,000 years of pharaonic greatness."
        },
        {
            "word": "structure",
            "pos": "Noun",
            "meaning": "هَيْكَلٌ / بِنَاءٌ / تَنْظِيمٌ بِنَائِيٌّ",
            "explain": "A building or the organized way in which parts are connected together.",
            "example": "The chronological structure helps visitors grasp historical progression easily."
        },
        {
            "word": "technology",
            "pos": "Noun",
            "meaning": "تِكْنُولُوجْيَا / تَقْنِيَّةٌ حَدِيثَةٌ",
            "explain": "Scientific knowledge and sophisticated equipment applied in practice.",
            "example": "Laser scanning technology helps reveal invisible inscriptions on damaged relics."
        },
        {
            "word": "treasure",
            "pos": "Noun",
            "meaning": "كَنْزٌ (مَادِّيٌّ أَوْ ثَقَافِيٌّ ثَمِينٌ)",
            "explain": "A quantity of precious items such as gold, jewels, or priceless antiquities.",
            "example": "Tutankhamun's burial treasures were discovered virtually intact in 1922."
        },
        {
            "word": "variety",
            "pos": "Noun",
            "meaning": "تَنَوُّعٌ / تَشْكِيلَةٌ مُتَعَدِّدَةٌ",
            "explain": "A number of different things of the same general type.",
            "example": "The displays exhibit a rich variety of everyday ceramics, toys, and tools."
        },
        {
            "word": "workshop",
            "pos": "Noun",
            "meaning": "وِرْشَةُ عَمَلٍ تَدْرِيبِيَّةٌ أَوْ تَعْلِيمِيَّةٌ",
            "explain": "A meeting where a group of people learn through practical activities.",
            "example": "Children enthusiastically joined a pottery workshop at the museum's education center."
        }
    ],
    "definitions": [
        {
            "term": "accessible (adj)",
            "meaning": "في متناول الجميع / سهل الوصول إليه وفهمه",
            "definition": "Easy for people of all backgrounds and abilities to reach, use, or understand."
        },
        {
            "term": "artifact (n)",
            "meaning": "قطعة أثرية تاريخية من صنع الإنسان",
            "definition": "An object made or used by humans in the past, especially one of historical interest."
        },
        {
            "term": "chronological (adj)",
            "meaning": "زمني / تسلسلي حسب وقت الحدوث",
            "definition": "Arranged in the order in which events happened over time."
        },
        {
            "term": "conservation (n)",
            "meaning": "الصون والحفاظ والترميم العلمي للآثار",
            "definition": "The process of protecting and preserving natural or cultural things from damage."
        },
        {
            "term": "curator (n)",
            "meaning": "أمين متحف / المسؤول عن تنظيم المعروضات",
            "definition": "People who look after, research, and organize the contents of a museum or exhibition."
        },
        {
            "term": "curation (n)",
            "meaning": "الانتقاء والتنظيم والعرض بعناية",
            "definition": "The thoughtful process of selecting and organizing items for an exhibition."
        },
        {
            "term": "dynasty (n)",
            "meaning": "أسرة حاكمة / سلالة ملكية عبر الزمن",
            "definition": "A series of rulers or kings from the same family who rule a country over a long period of time."
        },
        {
            "term": "multilingual (adj)",
            "meaning": "متعدد اللغات (أكثر من لغتين)",
            "definition": "Able to speak, use, or write in more than two languages."
        }
    ],
    "synonyms": [
        {
            "word": "accessible (متاح / ميسور الوصول)",
            "synonyms": "reachable, approachable, open, usable"
        },
        {
            "word": "artifact (قطعة أثرية)",
            "synonyms": "relic, antique, object, remnant"
        },
        {
            "word": "chronological (زمني تسلسلي)",
            "synonyms": "sequential, ordered, time-based, systematic"
        },
        {
            "word": "conservation (صون / صيانة / حماية)",
            "synonyms": "preservation, protection, maintenance, safeguarding"
        },
        {
            "word": "dynasty (أسرة حاكمة)",
            "synonyms": "lineage, royal house, ruling family"
        },
        {
            "word": "colossal (هائل ضخم)",
            "synonyms": "gigantic, enormous, massive, immense"
        },
        {
            "word": "breathtaking (مبهر رائع)",
            "synonyms": "astonishing, spectacular, awe-inspiring, stunning"
        }
    ],
    "antonyms": [
        {
            "word": "accessible (متاح للجميع)",
            "antonyms": "inaccessible, restricted (صعب المنال / مقيد)"
        },
        {
            "word": "chronological (مرتب زمنياً)",
            "antonyms": "random, unordered, anachronistic (عشوائي / غير مرتب زمنياً)"
        },
        {
            "word": "conservation (الصون والحفظ)",
            "antonyms": "destruction, neglect, deterioration (تدمير / إهمال / تدهور)"
        },
        {
            "word": "multilingual (متعدد اللغات)",
            "antonyms": "monolingual, unilingual (أحادي اللغة فقط)"
        },
        {
            "word": "ordinary (عادي)",
            "antonyms": "extraordinary, remarkable, royal (استثنائي / لافت / ملكي)"
        }
    ],
    "collocations": [
        {
            "phrase": "arrange in chronological order",
            "meaning": "يرتب بتسلسل زمني تاريخي من الأقدم للأحدث"
        },
        {
            "phrase": "connect with their heritage",
            "meaning": "يرتبط بتراثه الوطني ويستشعر أصوله"
        },
        {
            "phrase": "create a narrative",
            "meaning": "يبني سرداً قصصياً متكاملاً وممتعاً"
        },
        {
            "phrase": "house artefacts",
            "meaning": "يضم ويستضيف آلاف القطع الأثرية"
        },
        {
            "phrase": "interpret the past",
            "meaning": "يفسر ويستجلي أحداث التاريخ القديم"
        },
        {
            "phrase": "make decisions",
            "meaning": "يتخذ قرارات حاسمة بشأن المعروضات"
        },
        {
            "phrase": "make accessible",
            "meaning": "يجعله في متناول الجميع وسهل الفهم"
        },
        {
            "phrase": "make an effort",
            "meaning": "يبذل جهداً ملحوظاً"
        },
        {
            "phrase": "open its doors to the public",
            "meaning": "يفتح أبوابه رسمياً لعامة الجماهير"
        },
        {
            "phrase": "play a role",
            "meaning": "يؤدي دوراً تعليمياً وثقافياً محورياً"
        },
        {
            "phrase": "preserve for future generations",
            "meaning": "يصون التراث وينقله سليماً للأجيال القادمة"
        },
        {
            "phrase": "represent the depth and variety",
            "meaning": "يجسد عمق وتنوع تفاصيل الحياة القديمة"
        },
        {
            "phrase": "restore artefacts",
            "meaning": "يرمم القطع الأثرية ويصلح تلفها علمياً"
        },
        {
            "phrase": "tell stories",
            "meaning": "يروي قصصاً تاريخية مشوقة ومؤثرة"
        }
    ],
    "expressions": [
        {
            "phrase": "a breathtaking introduction",
            "meaning": "مقدمة مبهرة تأخذ الألباب من روعتها"
        },
        {
            "phrase": "a hands-on and memorable way",
            "meaning": "بأسلوب عملي تفاعلي لا يُمحى من الذاكرة"
        },
        {
            "phrase": "come together",
            "meaning": "يلتقيان معاً ويتكاملان (العلم والتاريخ)"
        },
        {
            "phrase": "for the very first time in history",
            "meaning": "لأول مرة في التاريخ البشري كعرض كامل"
        },
        {
            "phrase": "multi-era chronological displays",
            "meaning": "معروضات منظمة تسلسلياً عبر مختلف الحقب"
        },
        {
            "phrase": "established itself as",
            "meaning": "رسخ مكانته العالمية كـمعلم ثقافي رائد"
        },
        {
            "phrase": "for years to come",
            "meaning": "لسنوات وعقود طويلة قادمة في المستقبل"
        },
        {
            "phrase": "of all ages",
            "meaning": "من شتى الفئات العمرية (صغاراً وكباراً)"
        },
        {
            "phrase": "no simple task",
            "meaning": "مهمة بالغة الدقة وليست يسيرة على الإطلاق"
        },
        {
            "phrase": "step by step over time",
            "meaning": "خطوة بخطوة وتدريجياً عبر تعاقب الأزمنة"
        },
        {
            "phrase": "curation creates a narrative",
            "meaning": "الانتقاء الحكيم والتنظيم يصنعان قصة متكاملة"
        }
    ],
    "verbPrepositions": [
        {
            "verb": "focus on",
            "meaning": "يركز تركيزاً تاماً على (التعليم وتوعية الشباب)"
        },
        {
            "verb": "move forward through",
            "meaning": "يمضي قدماً ويعبر عبر (الحقب التاريخية المتتالية)"
        },
        {
            "verb": "apply ... to",
            "meaning": "يطبق مبدأ أو معياراً علمياً على"
        },
        {
            "verb": "preserve ... for",
            "meaning": "يحفظ ويصون الآثار لفائدة أجيال المستقبل"
        },
        {
            "verb": "recognise ... as",
            "meaning": "يعترف به ويقره رسمياً بوصفه معلماً عالمياً"
        }
    ],
    "derivatives": [
        {
            "rootEn": "access / accessible (في متناول اليد)",
            "rootAr": "عائلة كلمة access",
            "items": [
                {
                    "term": "access (v)",
                    "meaning": "يصل إلى معلومة أو مكان بسهولة",
                    "example": "I can access the museum guide on my smartphone."
                },
                {
                    "term": "access (n)",
                    "meaning": "الحق أو القدرة على الدخول والاستخدام",
                    "example": "Students have free access to the research library."
                },
                {
                    "term": "accessible (adj)",
                    "meaning": "متاح وفي متناول الجميع وميسور",
                    "example": "Ramps and elevators make all galleries accessible."
                },
                {
                    "term": "accessibility (n)",
                    "meaning": "سهولة الوصول وإمكانية الاستخدام",
                    "example": "The GEM improved accessibility for visitors with disabilities."
                },
                {
                    "term": "inaccessible (adj)",
                    "meaning": "صعب المنال / لا يمكن الوصول إليه",
                    "example": "Without a pass, the private laboratory is inaccessible."
                }
            ]
        },
        {
            "rootEn": "conserve / conservation (الصون والحفظ)",
            "rootAr": "عائلة كلمة conserve",
            "items": [
                {
                    "term": "conserve (v)",
                    "meaning": "يصون ويحمي من التلف والاندثار",
                    "example": "Specialists conserve papyrus scrolls using humidity control."
                },
                {
                    "term": "conservation (n)",
                    "meaning": "عملية الصون والحفظ والترميم الوقائي",
                    "example": "Conservation laboratories inside the museum use laser tech."
                },
                {
                    "term": "conservator (n)",
                    "meaning": "أخصائي صيانة وترميم الآثار",
                    "example": "The conservator cleaned the gilded wooden panel carefully."
                },
                {
                    "term": "conservative (adj)",
                    "meaning": "محافظ / حذر ولا يحبذ التغيير الجذري",
                    "example": "A conservative restoration approach avoids modifying the original stone."
                }
            ]
        },
        {
            "rootEn": "curate / curator (الإشراف والانتقاء)",
            "rootAr": "عائلة كلمة curate",
            "items": [
                {
                    "term": "curate (v)",
                    "meaning": "ينتقي وينظم المعروضات بوعي ودراسة",
                    "example": "She curates the ancient Egypt exhibition with immense passion."
                },
                {
                    "term": "curator (n)",
                    "meaning": "أمين المتحف والمشرف على مقتنياته",
                    "example": "The curator selects the artifacts that best tell the pharaonic story."
                },
                {
                    "term": "curation (n)",
                    "meaning": "عملية الاختيار والتنظيم الفني للمعرض",
                    "example": "Good curation helps visitors connect deeply with historical context."
                },
                {
                    "term": "curatorial (adj)",
                    "meaning": "خاص بمهام أمانة المتاحف وتنسيقها",
                    "example": "The curatorial team spent months designing the new wing."
                }
            ]
        },
        {
            "rootEn": "chronology / chronological (التسلسل الزمني)",
            "rootAr": "عائلة كلمة chronology",
            "items": [
                {
                    "term": "chronology (n)",
                    "meaning": "علم التسلسل الزمني للأحداث",
                    "example": "The textbook follows the chronology of Egyptian dynasties."
                },
                {
                    "term": "chronological (adj)",
                    "meaning": "مرتب بتسلسل زمني من الأقدم للأحدث",
                    "example": "The statues are displayed in strict chronological order."
                },
                {
                    "term": "chronologically (adv)",
                    "meaning": "بترتيب زمني تسلسلي",
                    "example": "The photos were arranged chronologically in the family album."
                },
                {
                    "term": "anachronism (n)",
                    "meaning": "مفارقة تاريخية / خروج عن السياق الزمني",
                    "example": "Showing a wristwatch in an ancient pharaoh's portrait is an anachronism."
                }
            ]
        }
    ],
    "confusionNotes": [
        {
            "titleEn": "accessible vs available",
            "titleAr": "الفارق بين accessible (سهل المنال والفهم) و available (متاح وموجود)",
            "notes": [
                "• accessible: تعني سهولة الوصول للشيء أو فهمه واستخدامه لجميع الناس بمختلف قدراتهم وخلفياتهم (e.g. The GEM is accessible to visitors of all abilities).",
                "• available: تعني فقط أن الشيء موجود ومتاح حالياً وليس نافداً أو مشغولاً (e.g. Tickets are available online today).",
                "• Goes with: accessible to all visitors / accessible for students of all ages."
            ]
        },
        {
            "titleEn": "artifact / artefact vs relic",
            "titleAr": "الفارق بين artifact (قطعة أثرية إنسانية) و relic (أثر مقدس أو ذو دلالة عاطفية)",
            "notes": [
                "• artifact / artefact: أي أداة أو قطعة من صنع الإنسان القديم ولها قيمة تاريخية عامة (أدوات، فخار، أسلحة).",
                "• relic: أثر متبقٍ له دلالة دينية مقدسة أو ذكرى روحية وعاطفية خاصة جداً.",
                "• artificial: صفة تعني صناعي من صنع البشر وليس طبيعياً (e.g. artificial materials / artificial flowers)."
            ]
        },
        {
            "titleEn": "chronological vs historical",
            "titleAr": "الفارق بين chronological (مرتب زمنياً) و historical (تاريخي بشكل عام)",
            "notes": [
                "• chronological: مرتب حسب توالي وقوع الأحداث في الزمن خطوة بخطوة من الأقدم للأحدث (time-ordered).",
                "• historical: متعلق بدراسة أو وقائع التاريخ البشري بصفة عامة (historical events / historical novel)."
            ]
        },
        {
            "titleEn": "conservation vs preservation",
            "titleAr": "الفارق الدقيق بين conservation (صيانة وترميم علمي) و preservation (حفظ دون تغيير)",
            "notes": [
                "• conservation: عملية صون نشطة قد تشمل التدخل العلمي وترميم الأجزاء التالفة لإعادة القطعة لحالتها السليمة (active restoration).",
                "• preservation: تهدف إلى إبقاء الشيء على حالته الراهنة تماماً وحمايته من أي تدخل أو تغيير إضافي."
            ]
        },
        {
            "titleEn": "curator vs director",
            "titleAr": "الفارق بين curator (أمين المعروضات) و director (مدير المؤسسة بأكملها)",
            "notes": [
                "• curator: متخصص يشرف على فحص، دراسة، انتقاء، وتنظيم مجموعة معروضات محددة وصياغة سرديتها.",
                "• director: المدير الإداري العام الذي يدير المؤسسة أو المتحف ككل من الناحية المالية والإدارية والتنظيمية."
            ]
        },
        {
            "titleEn": "dynasty vs empire",
            "titleAr": "الفارق بين dynasty (أسرة حاكمة) و empire (إمبراطورية جغرافية)",
            "notes": [
                "• dynasty: سلسلة حكام أو ملوك ينتمون لنفس العائلة ويتعاقبون على الحكم (e.g. The 18th Dynasty of Egypt).",
                "• empire: دولة شاسعة تضم أقاليم وشعوباً متعددة تخضع لحكم قوة مركزية واحدة (e.g. The Roman Empire)."
            ]
        },
        {
            "titleEn": "multilingual vs bilingual vs monolingual",
            "titleAr": "التفريق الدقيق بين عدد اللغات",
            "notes": [
                "• multilingual: يتقن أو يستخدم ثلاث لغات أو أكثر (e.g. multilingual museum labels in Arabic, English, French, and German).",
                "• bilingual: يتقن لغتين اثنتين فقط لا غير (e.g. a bilingual tour guide in Arabic and English).",
                "• monolingual: أحادي اللغة (يتحدث لغة واحدة فقط)."
            ]
        }
    ],
    "storyPages": [
        {
            "badge": "🏛️ Scene 1: An Architectural Wonder",
            "image": "../../assets/images/gem_facade.jpg",
            "caption": "The Facade of the GEM overlooking the Giza Plateau",
            "titleEn": "A Journey Through Time: Opening the Gates to Eternity",
            "textEn": "Since the Grand Egyptian Museum (GEM) opened its doors to the public on 4 November 2025, it has been celebrated as the largest archaeological museum in the world. Located on the edge of the Giza Plateau, the museum spans 45,000 square meters and houses more than 100,000 artifacts from ancient Egypt. Among these treasures is the complete collection of Tutankhamun, displayed together for the first time in history. Even though the museum is ultra-modern, it presents the story of one of humanity's oldest and most profound civilizations.",
            "translation": "منذ أن افتتح المتحف المصري الكبير (GEM) أبوابه رسميًا للجمهور في 4 نوفمبر 2025، وُصف بأنه أضخم متحف أثري على مستوى العالم. يمتد المتحف بالقرب من أهرامات الجيزة الخالدة على مساحة 45,000 متر مربع، ويضم بين جنباته ما يزيد على 100,000 قطعة أثرية فريدة من مصر القديمة. ومن بين هذه الكنوز، تُعرض المجموعة الكاملة للملك الشاب توت عنخ آمون مجتمعةً معًا لأول مرة في التاريخ. ورغم الحداثة الفائقة لصرح المتحف، فإنه يروي بحرفية ملحمية حكاية واحدة من أقدم وأعرق حضارات العالم.",
            "vocab": [
                "opened its doors to the public (افتتح أبوابه للجمهور)",
                "archaeological museum (متحف أثري)",
                "artifacts (قطع أثرية)",
                "treasures (كنوز ثمينة)",
                "complete collection (مجموعة كاملة)",
                "civilization (حضارة)"
            ]
        },
        {
            "badge": "👑 Scene 2: The Colossal Ascension",
            "image": "../../assets/images/gem_grand_staircase.jpg",
            "caption": "The Grand Staircase featuring 87 Colossal Royal Statues",
            "titleEn": "The Grand Staircase: Ascending Through 30 Dynasties",
            "textEn": "Designing a museum of this colossal scale is no simple task. Curators must make careful decisions about which objects to display, how to arrange them, and what stories to tell. The impressive Grand Staircase alone features 87 colossal royal statues, arranged in chronological order, offering visitors a breathtaking introduction to thousands of years of pharaonic greatness. At the GEM, the journey begins in prehistory and moves forward through the great dynasties. Multilingual labels, interactive screens, and guided tours make the experience enjoyable and accessible to visitors of all ages.",
            "translation": "إن تصميم وتنسيق متحف بهذا الحجم الهائل ليس بالمهمة اليسيرة على الإطلاق! يتعين على أمناء المتحف اتخاذ قرارات دقيقة للغاية بشأن أي القطع يجب عرضها، وكيفية تنظيمها، وأي الروايات التاريخية ينبغي سردها. فالدرج العظيم بمفرده يضم 87 تمثالاً ملكياً ضخماً، رُتّبت بتسلسل زمني صارم، لتقدم للزوار مدخلاً مبهراً يأخذ الألباب عبر آلاف السنين من المجد الفرعوني. تبدأ الرحلة من عصر ما قبل التاريخ وتمضي متقدمة عبر الأسر الحاكمة الكبرى. وتجعل البطاقات متعددة اللغات والشاشات التفاعلية والجولات الإرشادية الزيارة ممتعة ومتاحة للجميع.",
            "vocab": [
                "curator (أمين متحف)",
                "curation (تنظيم وانتقاء المعروضات)",
                "colossal (عملاق وهائل)",
                "Grand Staircase (الدرج العظيم)",
                "chronological order (ترتيب زمني تسلسلي)",
                "dynasties (أسر حاكمة)",
                "multilingual (متعدد اللغات)",
                "accessible (ميسور ومتاح للجميع)"
            ]
        },
        {
            "badge": "🔬 Scene 3: Science Safeguards History",
            "image": "../../assets/images/gem_conservation.jpg",
            "caption": "High-Tech Conservation Laboratories inside the GEM",
            "titleEn": "Conservation Labs: Where Modern Science Meets Ancient Wisdom",
            "textEn": "The GEM is not merely a place to view ancient objects; it is also a space where science and history come together. High-tech conservation laboratories inside the museum allow world-class experts to study and restore fragile artifacts using the latest technology, ensuring that these national treasures are carefully preserved for future generations. The collection continues to grow, develop, and surprise its visitors, firmly establishing the museum as an enduring cultural landmark for Egypt and the world.",
            "translation": "لا يقتصر دور المتحف المصري الكبير على كونه مجرد فضاء فسيح لمشاهدة الآثار القديمة فحسب؛ بل هو صرح تلتقي فيه براعة العلم الحديث بعبق التاريخ القديم. فمعامل الصون والترميم المتطورة داخل المتحف تتيح لصفوة الخبراء العالميين دراسة القطع الأثرية النادرة وترميمها باستخدام أحدث التقنيات الليزرية والرقمية، بما يكفل صون هذه الكنوز الوطنية للأجيال القادمة بأعلى معايير الحماية. وتواصل المقتنيات نموها وتطورها وإدهاش روادها، مرسخةً مكانة المتحف كمعلم ثقافي رائد.",
            "vocab": [
                "conservation laboratories (معامل صون وترميم الآثار)",
                "study and restore (دراسة وترميم)",
                "latest technology (أحدث تكنولوجيا)",
                "preserved for future generations (مصونة للأجيال القادمة)",
                "cultural landmark (معلم ثقافي بارز)"
            ]
        },
        {
            "badge": "🎓 Scene 4: A Living School for the Nation",
            "image": "../../assets/images/gem_facade.jpg",
            "caption": "Egyptian Students Connecting with their National Heritage",
            "titleEn": "Connecting Young Hearts to Their Living Heritage",
            "textEn": "One of the most exciting aspects of the GEM is its strong focus on education. School trips, hands-on workshops, and special educational programs are available to students from across Egypt, giving young people the golden opportunity to connect with their heritage in a memorable way. While a single museum cannot possibly include every story from Egypt's rich past, the GEM makes a remarkable effort to represent the depth and variety of ancient Egyptian life — from royal tombs to the everyday objects used by ordinary people thousands of years ago.",
            "translation": "يعد التركيز القوي على التعليم ونشر المعرفة أحد أكثر جوانب المتحف المصري الكبير إثارة للإعجاب. فالرحلات المدرسية والورش التفاعلية والبرامج التعليمية الخاصة متاحة للطلاب من كل ربوع مصر، مما يمنح النشء فرصة ذهبية للارتباط بتراثهم الوطني العريق بطريقة عملية لا تُنسى. وعلى الرغم من أنه لا يمكن لمتحف واحد أن يحيط بكل تفاصيل ماضي مصر الحافل، فإن المتحف يبذل جهداً استثنائياً لتمثيل عمق وتنوع الحياة المصرية القديمة — من المقابر الملكية الفخمة إلى الأدوات اليومية البسيطة التي استخدمها الإنسان العادي.",
            "vocab": [
                "focus on education (التركيز على التعليم)",
                "connect with their heritage (يرتبط بتراثه العريق)",
                "hands-on workshops (ورش عمل تطبيقية تفاعلية)",
                "memorable (خالد في الذاكرة ولا يُنسى)",
                "depth and variety (العمق والتنوع)",
                "ordinary people (عامة الناس وبسطاؤهم)"
            ]
        }
    ],
    "dialogue": {
        "scenarioEn": "Dr. Tarek, a chief conservator at the Grand Egyptian Museum, guides Salma, a passionate Secondary 2 student, through the galleries and conservation labs.",
        "scenarioAr": "د. طارق، كبير أخصائيي الترميم بالمتحف المصري الكبير، يصطحب سلمى، طالبة الصف الثاني الثانوي الشغوفة بالآثار، في جولة استكشافية بالدرج العظيم ومعامل الصون.",
        "turns": [
            {
                "speaker": "Salma",
                "avatar": "👩‍🎓",
                "en": "Dr. Tarek, walking beside these 87 colossal statues on the Grand Staircase is absolutely breathtaking! How were curators able to organize such an immense collection?",
                "ar": "دكتور طارق، السير بجانب هذه التماثيل الملكية العملاقة الـ 87 على الدرج العظيم أمر مبهر للأنفاس حقاً! كيف استطاع أمناء المتحف تنظيم هذه المجموعة الهائلة؟"
            },
            {
                "speaker": "Dr. Tarek",
                "avatar": "👨‍🏫",
                "en": "It was no simple task, Salma! Curation is an art. We arranged them in chronological order so visitors move forward through history step by step, from prehistory to the great dynasties.",
                "ar": "لم تكن مهمة بسيطة على الإطلاق يا سلمى! فالانتقاء والتنظيم (Curation) فن بحد ذاته. لقد رتبنا التماثيل بتسلسل زمني صارم، بحيث يمضي الزائر متقدماً عبر التاريخ خطوة بخطوة من عصور ما قبل التاريخ حتى الأسر العظيمة."
            },
            {
                "speaker": "Salma",
                "avatar": "👩‍🎓",
                "en": "I noticed that labels are multilingual and the touchscreens are very interactive. Does that make the exhibits accessible to everyone?",
                "ar": "لاحظت أن لافتات الشرح متعددة اللغات (multilingual) والشاشات شديدة التفاعلية. هل الهدف من ذلك جعل المعروضات في متناول الجميع وسهلة الفهم (accessible)؟"
            },
            {
                "speaker": "Dr. Tarek",
                "avatar": "👨‍🏫",
                "en": "Exactly! Our goal is to ensure our national heritage is accessible to visitors of all ages, languages, and physical abilities.",
                "ar": "بالضبط! هدفنا هو ضمان أن يكون تراثنا الوطني متاحاً ومفهوماً (accessible) لجميع الزوار من مختلف الأعمار واللغات والقدرات البدنية."
            },
            {
                "speaker": "Salma",
                "avatar": "👩‍🎓",
                "en": "What happens behind these glass partitions? Those white coats look like scientists in a medical research lab!",
                "ar": "وما الذي يجري خلف هذه الفواصل الزجاجية الشفافة؟ أولئك الذين يرتدون المعاطف البيضاء يبدون كعلماء في مختبر أبحاث طبية!"
            },
            {
                "speaker": "Dr. Tarek",
                "avatar": "👨‍🏫",
                "en": "That is our conservation center! Here, cutting-edge science and history come together. We study and restore delicate artifacts to preserve them for future generations.",
                "ar": "هذا هو مركز الصون والترميم المتطور لدينا! هنا يلتقي العلم الحديث بعبق التاريخ؛ نقوم بدراسة وترميم القطع الأثرية الدقيقة لنصونها سالمة للأجيال القادمة."
            }
        ]
    },
    "quiz": [
        {
            "id": 1,
            "q": "The museum provides ......... labels in Arabic, English, French, and German.",
            "options": [
                "monolingual",
                "bilingual",
                "multilingual",
                "unilingual"
            ],
            "a": 2,
            "exp": "الصفة الصحيحة هي multilingual (متعدد اللغات) لأن اللافتات مكتوبة بأربع لغات (أكثر من لغتين)."
        },
        {
            "id": 2,
            "q": "The museum's exhibitions are ......... to visitors of all ages, including those with disabilities.",
            "options": [
                "accessible",
                "conserved",
                "chronological",
                "multilingual"
            ],
            "a": 0,
            "exp": "الصفة accessible تعني ميسور وفي متناول الجميع ومتاح لجميع الزوار بمختلف القدرات."
        },
        {
            "id": 3,
            "q": "“The city's new information website is accessible to people with different needs. Users can get the information they need on it.” Which situation best reflects the meaning of “accessible”?",
            "options": [
                "A sports center allows members to enter only during two short periods each week.",
                "A cinema keeps some seats unavailable even when no one has booked them.",
                "A public garden provides smooth paths and clear signs so visitors with different needs can use it comfortably.",
                "A library stores its most popular books in a room that visitors cannot enter."
            ],
            "a": 2,
            "exp": "كلمة accessible تعني سهولة الوصول والاستخدام للجميع، والحديقة العامة التي توفر ممرات ممهدة ولافتات واضحة لذوي الاحتياجات الخاصة تجسد هذا المفهوم بدقة."
        },
        {
            "id": 4,
            "q": "“A website presented the town's history in chronological order. Visitors first read about events from the nineteenth century before moving through each later period.” Which situation best reflects the idea of ‘chronological’?",
            "options": [
                "A music app groups songs according to whether they are calm, fast, or energetic.",
                "A shop displays clothes according to colour rather than when they were made.",
                "A photo album places family pictures into separate sections for holidays and birthdays.",
                "A documentary tells what happened on the first day of a journey before showing the events of the following days."
            ],
            "a": 3,
            "exp": "كلمة chronological تعني الترتيب التسلسلي حسب وقوع الأحداث زمنياً من البداية لليوم التالي."
        },
        {
            "id": 5,
            "q": "“A rare old manuscript was placed in a special case where light and moisture could not damage it. These measures were part of its conservation.” Which situation is the clearest example of “conservation”?",
            "options": [
                "A family photographs an old wooden boat before selling it to another owner.",
                "A town strengthens a historic fountain and limits anything that could cause further damage to it.",
                "A café replaces its traditional wooden tables with modern plastic ones.",
                "A visitor buys a small model of an ancient building from a gift shop."
            ],
            "a": 1,
            "exp": "الصون والحفظ (conservation) يعني حماية المعلم التاريخي وترميمه والحد من أي مسببات لتلفه المستقبلي."
        },
        {
            "id": 6,
            "q": "“As the museum's curator, Yasmeen regularly checks the collection, studies the history of its objects, and decides which stories future displays should tell.” Which person has a similar role?",
            "options": [
                "Hossam welcomes visitors at the entrance and shows them where to buy tickets.",
                "Nada leads groups around a cultural center and explains what they can see.",
                "Fouad is responsible for a gallery's collection and decides which works should appear in its major displays.",
                "Arwa repairs damaged frames and broken display cases when necessary."
            ],
            "a": 2,
            "exp": "أمين المتحف (curator) هو المسؤول عن مقتنيات المعرض وانتقائها وتنظيم سرديتها مثل فؤاد."
        },
        {
            "id": 7,
            "q": "“The curation of the new museum room took months. By opening day, every object had a clear purpose in the story the exhibition told, and nothing had been included by chance.” Which situation best reflects “curation”?",
            "options": [
                "Workers repaint a gallery and replace several broken lights before visitors arrive.",
                "Visitors vote for the historical object they find most attractive during their tour.",
                "A museum moves all its stored objects into one large room without deciding how to present them.",
                "A cultural center carefully chooses material for a heritage display and plans how the pieces will work together for visitors."
            ],
            "a": 3,
            "exp": "عملية التنسيق والانتقاء (curation) تعني اختيار المواد بعناية بالغة والتخطيط لكيفية ترابطها لتروي قصة متكاملة."
        },
        {
            "id": 8,
            "q": "“The hospital uses multilingual signs so that patients from different countries can find important rooms without always needing someone to translate for them.” Which situation best reflects the same idea?",
            "options": [
                "A restaurant uses photographs beside every dish to help customers choose their meals.",
                "A cinema shows the same film at several different times during the day.",
                "A tourist center prepares one welcome guide that visitors can read in Arabic, English, French, and German.",
                "A bookshop places books from different countries on separate shelves according to their subject."
            ],
            "a": 2,
            "exp": "إعداد دليل بعدة لغات أجنبية (عربية، إنجليزية، فرنسية، ألمانية) يمثل تماماً استخدام لافتات multilingual."
        },
        {
            "id": 9,
            "q": "The GEM is the world's largest ......... museum, housing objects from ancient Egypt.",
            "options": [
                "archaeological",
                "accessible",
                "multilingual",
                "royal"
            ],
            "a": 0,
            "exp": "المتحف المصري الكبير هو أضخم متحف أثري (archaeological museum) في العالم."
        },
        {
            "id": 10,
            "q": "The impressive Grand Staircase alone ......... 87 colossal royal statues arranged in order.",
            "options": [
                "ensures",
                "develops",
                "features",
                "restores"
            ],
            "a": 2,
            "exp": "الفعل features يعني يشتمل على / يتميز بضم 87 تمثالاً ملكياً ضخماً كسمة رئيسية."
        },
        {
            "id": 11,
            "q": "Thousands of years ago, the Nile Valley gave rise to one of history's greatest ......... .",
            "options": [
                "workshops",
                "civilisations",
                "landmarks",
                "programs"
            ],
            "a": 1,
            "exp": "وادي النيل شهد قيام واحدة من أعظم الحضارات (civilisations) في التاريخ البشري."
        },
        {
            "id": 12,
            "q": "The museum will continue to grow and ......... for many years to come.",
            "options": [
                "restore",
                "develop",
                "conserve",
                "preserve"
            ],
            "a": 1,
            "exp": "المتحف سيواصل النمو والتطور (grow and develop) لسنوات طويلة قادمة."
        },
        {
            "id": 13,
            "q": "The Grand Staircase features 87 ......... royal statues that immediately impress every visitor.",
            "options": [
                "ordinary",
                "memorable",
                "colossal",
                "interactive"
            ],
            "a": 2,
            "exp": "الصفة colossal تعني ضخمة وهائلة جداً كالتماثيل العملاقة على الدرج العظيم."
        },
        {
            "id": 14,
            "q": "The museum was immediately ......... as the largest archaeological museum in the world.",
            "options": [
                "recognized",
                "preserved",
                "conserved",
                "curated"
            ],
            "a": 0,
            "exp": "تم الاعتراف بالمتحف وإقراره دولياً (recognized as) كأكبر متحف أثري في العالم."
        },
        {
            "id": 15,
            "q": "The museum has become a major cultural ......... that attracts millions of visitors each year.",
            "options": [
                "section",
                "depth",
                "variety",
                "landmark"
            ],
            "a": 3,
            "exp": "المتحف رسخ مكانته كمعلم ثقافي وسياحي بارز (cultural landmark)."
        },
        {
            "id": 16,
            "q": "Experts work hard to ......... the ancient wall paintings so future generations can enjoy them.",
            "options": [
                "feature",
                "develop",
                "display",
                "preserve"
            ],
            "a": 3,
            "exp": "يبذل الخبراء قصارى جهدهم لحفظ وصيانة (preserve) الرسومات الجدارية للأجيال القادمة."
        },
        {
            "id": 17,
            "q": "School trips give students a/an ......... experience they will remember for many years.",
            "options": [
                "memorable",
                "ordinary",
                "ancient",
                "royal"
            ],
            "a": 0,
            "exp": "الرحلات المدرسية تمنح الطلاب تجربة لا تُنسى وخالدة في الأذهان (memorable experience)."
        },
        {
            "id": 18,
            "q": "Conservation laboratories ......... that artifacts are carefully protected for the future.",
            "options": [
                "display",
                "restore",
                "ensure",
                "develop"
            ],
            "a": 2,
            "exp": "معامل الترميم تضمن وتكفل (ensure) حماية القطع الأثرية الثمينة للمستقبل."
        },
        {
            "id": 19,
            "q": "The GEM uses ......... screens so that visitors can explore exhibits at their own pace.",
            "options": [
                "breathtaking",
                "interactive",
                "colossal",
                "ancient"
            ],
            "a": 1,
            "exp": "يستخدم المتحف شاشات لمس تفاعلية (interactive screens) تتيح للزوار الاستكشاف الذاتي."
        },
        {
            "id": 20,
            "q": "The museum's ......... helps visitors understand how Egypt developed step by step over time.",
            "options": [
                "generation",
                "structure",
                "variety",
                "depth"
            ],
            "a": 1,
            "exp": "التنظيم والهيكل البنائي والزمني للمتحف (structure) يساعد الزوار على استيعاب التطور التاريخي."
        },
        {
            "id": 21,
            "q": "Experts use the latest ......... to study and restore objects in the conservation laboratory.",
            "options": [
                "scale",
                "heritage",
                "technology",
                "structure"
            ],
            "a": 2,
            "exp": "يستعين الخبراء بأحدث التقنيات التكنولوجية المتطورة (latest technology) في مختبر الصون والترميم."
        },
        {
            "id": 22,
            "q": "The museum represents the ......... and variety of ancient Egyptian life.",
            "options": [
                "section",
                "workshop",
                "program",
                "depth"
            ],
            "a": 3,
            "exp": "المتحف يمثل عمق وتنوع (depth and variety) تفاصيل حياة المصريين القدماء."
        },
        {
            "id": 23,
            "q": "Young Egyptians have the opportunity to connect with their national ......... through school trips.",
            "options": [
                "heritage",
                "scale",
                "section",
                "structure"
            ],
            "a": 0,
            "exp": "الرحلات المدرسية تمكن الشباب المصري من الارتباط الوثيق بتراثهم الوطني (national heritage)."
        },
        {
            "id": 24,
            "q": "Specialists placed the old manuscript in a special case away from strong light and moisture. In this context, “conservation” most nearly means ......... .",
            "options": [
                "the process of displaying something so more people can see it",
                "the process of protecting something valuable from being damaged or lost",
                "the process of copying something before returning the original",
                "the process of changing something old to make it look modern"
            ],
            "a": 1,
            "exp": "معنى كلمة conservation في هذا السياق هو عملية حماية وصون الشيء الثمين من التلف أو الفقدان."
        },
        {
            "id": 25,
            "q": "“The museum displayed statues of three rulers from one dynasty: a grandfather, his son, and later his grandson.” Based on the sentence above, what does “dynasty” mean?",
            "options": [
                "a group of advisers who help one ruler govern",
                "a period when several unrelated leaders share power",
                "a line of rulers from the same family over a period of time",
                "a group of countries controlled by one powerful king"
            ],
            "a": 2,
            "exp": "الأسرة الحاكمة (dynasty) تعني سلالة حكام ينتمون لنفس العائلة يحكمون على مدار حقبة زمنية متعاقبة."
        },
        {
            "id": 26,
            "q": "“The statues are arranged in time-ordered sequence along the Grand Staircase.” The underlined phrase is closest in meaning to ......... .",
            "options": [
                "multilingual",
                "accessible",
                "royal",
                "chronological"
            ],
            "a": 3,
            "exp": "المصطلح time-ordered sequence يطابق تماماً معنى كلمة chronological (مرتب زمنياً بالتسلسل)."
        },
        {
            "id": 27,
            "q": "“The head keeper of the museum spent months selecting artefacts for the new wing.” The underlined phrase is closest in meaning to ......... .",
            "options": [
                "dynasty",
                "landmark",
                "curator",
                "section"
            ],
            "a": 2,
            "exp": "أمين المتحف والمشرف على مقتنياته يسمى curator (keeper of museum collection)."
        },
        {
            "id": 28,
            "q": "“The exhibition is accessible to all visitors regardless of age or ability.” The underlined word is opposite in meaning to ......... .",
            "options": [
                "inaccessible",
                "multilingual",
                "chronological",
                "royal"
            ],
            "a": 0,
            "exp": "مضاد كلمة accessible (متاح وسهل الوصول) هو inaccessible (صعب المنال وغير متاح)."
        },
        {
            "id": 29,
            "q": "Seeing the pyramids glowing in the evening light gave the visitors a ......... to their first trip around Egypt.",
            "options": [
                "disappointing end",
                "difficult challenge",
                "quiet conclusion",
                "breathtaking introduction"
            ],
            "a": 3,
            "exp": "التعبير اللفظي الصحيح هو breathtaking introduction (مقدمة مبهرة تحبس الأنفاس)."
        },
        {
            "id": 30,
            "q": "Moving the heavy furniture upstairs without a lift was ......... , so the family needed several people to help.",
            "options": [
                "an ordinary routine",
                "an easy job",
                "a minor effort",
                "no simple task"
            ],
            "a": 3,
            "exp": "المصطلح الاصطلاحي no simple task يعني مهمة شاقة وليست بالأمر الهين على الإطلاق."
        }
    ]
}

output_path = r"c:\Users\Al700t\OneDrive\Desktop\Learn_English\Sec_2\unit-3\lesson-3-2.data.js"
with open(output_path, "w", encoding="utf-8") as f:
    f.write("/**\n * Data Payload for Sec 2 - Unit 3 - Lesson 3.2: The Museum as a Storyteller (GEM)\n * Verbatim El-Moasser 2026/2027 Curriculum (ZERO GRAMMAR)\n */\n")
    f.write("window.lessonData = ")
    json.dump(lesson_data, f, ensure_ascii=False, indent=4)
    f.write(";\n")

print(f"Successfully wrote {output_path}")
