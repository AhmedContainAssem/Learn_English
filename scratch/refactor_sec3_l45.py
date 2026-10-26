import re

writing_skills_data = {
    "arabicTitle": "دليل مهارة كتابة المنشور التدويني (How to Write a Blog Post)",
    "overview": {
        "title": "ما هي المدونة؟ (What is a Blog Post?)",
        "definition": "<strong>المدونة (A blog post):</strong> هي مقال أو قطعة كتابية تُنشر على مدونة إلكترونية (موقع أو مجلة على الإنترنت). وتتميز المقالات التدوينية بالمواصفات الأساسية التالية:",
        "keyFeatures": [
            { "title": "1. Informal or semi-formal", "desc": "أسلوب غير رسمي أو شبه رسمي، كالتحدث مع صديق لكنه أكثر تنظيماً." },
            { "title": "2. Engaging style", "desc": "أسلوب جذاب يهدف إلى لفت انتباه القارئ وشده للقراءة." },
            { "title": "3. About a specific topic", "desc": "يركز على موضوع محدد يشارك فيه الكاتب معلومات أو آراء أو تجارب شخصية." },
            { "title": "4. Not too long", "desc": "غير طويلة ومقسمة لفقرات قصيرة لتكون سهلة القراءة السريعة على الإنترنت." }
        ]
    },
    "structure": [
        {
            "name": "1. Catchy Title (Headline)",
            "purpose": "جعل الناس يرغبون في النقر على الرابط وقراءة المقال فوراً (To make people want to click and read!).",
            "details": "يجب أن يكون العنوان جذاباً ومثيراً للفضول.",
            "components": [
                {
                    "name": "أمثلة كتاب الوزارة المعتمدة",
                    "purpose": "نماذج عناوين تدوينية شهيرة",
                    "examples": [
                        "5 Amazing Places to Visit in Summer",
                        "My First Time Trying Sushi (and Why I Loved It!)",
                        "Is Learning English Hard? My Opinion."
                    ]
                }
            ]
        },
        {
            "name": "2. Introduction (The Hook)",
            "purpose": "تقديم الموضوع وخطف اهتمام القارئ وجذبه بالـ (Hook) كسؤال مثير أو اقتباس أو حقيقة مشوقة.",
            "details": "تبدأ بمقدمة جذابة (Hook) تدعو القارئ للاستمرار في القراءة.",
            "components": [
                {
                    "name": "نموذج افتتاحية المقدمة",
                    "purpose": "Opening Hook Example",
                    "examples": [
                        "Have you ever dreamed of traveling the world? For me, visiting new countries has always been a passion. Today, I want to share my recent trip to Japan..."
                    ]
                }
            ]
        },
        {
            "name": "3. Main Body (With Subheadings)",
            "purpose": "تطوير الأفكار وتقديم التفاصيل وشرح النقاط مع استخدام عناوين فرعية (Subheadings) لتقسيم الموضوع.",
            "details": "استخدم لغة واضحة، جملاً قصيرة، وفقرات مركزة ومحددة.",
            "components": [
                {
                    "name": "أمثلة فقرات صلب الموضوع",
                    "purpose": "Body Paragraphs with Subheadings",
                    "examples": [
                        "Subheading 1 (Food): One of the best parts was food (sushi, ramen)...",
                        "Subheading 2 (Culture): Fascinated by traditional culture and tea ceremony..."
                    ]
                }
            ]
        },
        {
            "name": "4. Conclusion (With CTA)",
            "purpose": "تلخيص الأفكار الرئيسية، وإعطاء فكرة ختامية، وختم المقال بدعوة لاتخاذ إجراء (Call to Action - CTA).",
            "details": "اختم بدعوة القراء للتعليق أو التفاعل أو مشاركة تجاربهم.",
            "components": [
                {
                    "name": "نموذج الخاتمة والـ CTA",
                    "purpose": "Conclusion & Call to Action Example",
                    "examples": [
                        "Overall, my trip to Japan was an unforgettable experience... Have you ever been to Japan? What was your favorite part? Let me know in the comments!"
                    ]
                }
            ]
        }
    ],
    "linkingWords": [
        {
            "category": "Sequential Transitions (الترتيب والتسلسل)",
            "functionAr": "لترتيب الأفكار زمنياً ومنطقياً",
            "words": ["First", "Next", "Then", "After that", "Finally"],
            "example": "First, explore the old town. Next, head towards the vibrant market.",
            "exampleAr": "أولاً استكشف البلدة القديمة، ثم اتجه نحو السوق النابض بالحياة."
        },
        {
            "category": "Contrasting & Addition (التناقض والإضافة)",
            "functionAr": "لربط الأفكار وإظهار التباين أو الإضافة",
            "words": ["However", "Although", "In addition", "Furthermore", "On the other hand"],
            "example": "However, learning Kanji can be challenging at first.",
            "exampleAr": "مع ذلك، قد يكون تعلم حروف الكانجي تحدياً في البداية."
        }
    ],
    "sampleEssay": {
        "title": "Model Blog Post: An Unforgettable Journey to Ancient Luxor",
        "paragraphs": [
            {
                "title": "Headline",
                "type": "Catchy Title",
                "note": "العنوان التدويني الجذاب",
                "textEn": "Why Luxor Stole My Heart (and Why You Must Visit It Now!)",
                "textAr": "لماذا خطفت الأقصر قلبي (ولماذا يجب عليك زيارتها الآن!)"
            },
            {
                "title": "Introduction",
                "type": "Hook & Welcome",
                "note": "المقدمة والخطاف",
                "textEn": "Have you ever stood in front of monuments so magnificent that they literally take your breath away? For years, I had read about Egypt's ancient capitals, but nothing prepared me for the magic of Luxor.",
                "textAr": "هل وقفت يوماً أمام آثار من العظمة بحيث تحبس أنفاسك حرفياً؟ لسنوات قرأت عن عواصم مصر القديمة، لكن لا شيء هيأني لسحر الأقصر."
            },
            {
                "title": "Main Body",
                "type": "Body with Subheadings",
                "note": "صلب الموضوع مع عناوين فرعية",
                "textEn": "Temples Beyond Imagination: Walking through Karnak Temple felt like stepping directly into history. The soaring columns and hieroglyphs are astounding.\\n\\nThe Valley of Wonders: Exploring the Valley of the Kings early in the morning offered tranquility and profound awe.",
                "textAr": "معابد تفوق الخيال: كان المشي في معبد الكرنك كأنك تخطو مباشرة في التاريخ. الأعمدة الشاهقة والهيروغليفية مذهلة."
            },
            {
                "title": "Conclusion",
                "type": "Summary & CTA",
                "note": "الخاتمة والدعوة للإجراء",
                "textEn": "To wrap up, Luxor is not just an open-air museum; it is a transformative life experience. What about you? Have you visited Upper Egypt yet? Drop your thoughts in the comments below!",
                "textAr": "في الختام، الأقصر ليست مجرد متحف مفتوح، بل تجربة حياة مغيرّة. ماذا عنك؟ هل زرت صعيد مصر من قبل؟ شاركني أفكارك في التعليقات أدناه!"
            }
        ]
    },
    "examTips": [
        {
            "title": "طبيعة لغة المدونة",
            "rule": "لغة المدونة غير رسمية (Informal) أو شبه رسمية (Semi-formal)، وتستخدم لغة مباشرة وودودة.",
            "example": "A blog post is informal or semi-formal, engaging, and usually not too long."
        },
        {
            "title": "ضمائر التدوين",
            "rule": "في المقالات التدوينية الشخصية نستخدم ضمير المتكلم الأول (First person) مثل I و We.",
            "example": "In a personal blog post, we use the first person (I / we)."
        },
        {
            "title": "العناوين الفرعية (Subheadings)",
            "rule": "تُستخدم العناوين الفرعية لتقسيم التدوينة إلى أجزاء وتسهيل قراءتها السريعة على الشاشات.",
            "example": "Subheadings help divide the post into digestible sections for online readers."
        },
        {
            "title": "الدعوة لاتخاذ إجراء (Call to Action - CTA)",
            "rule": "تنتهي المدونة عادة بدعوة القراء للتعليق أو التفاعل أو طرح سؤال.",
            "example": "A Call to Action (CTA) invites the reader to take an action, like leaving a comment."
        }
    ]
}

# 1. Add writingSkills into Sec_3/unit-1/lesson-4-5.data.js
import json

with open('Sec_3/unit-1/lesson-4-5.data.js', 'r', encoding='utf-8') as f:
    data_content = f.read()

if 'writingSkills' not in data_content:
    # insert before the final closing "};"
    pos_end = data_content.rfind('};')
    if pos_end != -1:
        skills_json = ',\n    "writingSkills": ' + json.dumps(writing_skills_data, ensure_ascii=False, indent=8) + '\n'
        data_content = data_content[:pos_end] + skills_json + data_content[pos_end:]
        with open('Sec_3/unit-1/lesson-4-5.data.js', 'w', encoding='utf-8') as f:
            f.write(data_content)
        print("Added writingSkills to Sec_3 lesson-4-5.data.js!")

# 2. Refactor Sec_3/unit-1/lesson-4-5.html
with open('Sec_3/unit-1/lesson-4-5.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

tab_start = '<!-- Tab 4: Writing Skills (Preserved Pedagogical Study Guide) -->'
tab_end = '<!-- Tab 5: Interactive 3D Storybook -->'

pos_ts = html_content.find(tab_start)
pos_te = html_content.find(tab_end)

if pos_ts != -1 and pos_te != -1:
    clean_tab = '''<!-- Tab 4: Writing Skills (Rendered by WritingRenderer) -->
        <div id="writing-skills" class="tab-content" style="display: none;"></div>

        '''
    html_content = html_content[:pos_ts] + clean_tab + html_content[pos_te:]

# Ensure writing-renderer.js is loaded
if 'writing-renderer.js' not in html_content:
    html_content = html_content.replace(
        '<script src="../../assets/js/curriculum-renderer.js"></script>',
        '<script src="../../assets/js/renderers/ui-primitives.js"></script>\n    <script src="../../assets/js/renderers/writing-renderer.js"></script>\n    <script src="../../assets/js/curriculum-renderer.js"></script>'
    )

with open('Sec_3/unit-1/lesson-4-5.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Refactored Sec_3 lesson-4-5.html! New line count: {len(html_content.splitlines())}")
