import json

u5_code = '''
if (typeof window !== 'undefined' && window.lessonData) {
    if (!window.lessonData.writingSkill && !window.lessonData.writingSkills) {
        window.lessonData.writingSkill = {
            title: "مهارة كتابة البريد الإلكتروني غير الرسمي (Informal Email Writing)",
            definition: "رسالة شخصية تُرسل إلى الأصدقاء أو أفراد العائلة أو زملاء الدراسة المقربين بأسلوب ودي وبسيط (relaxed, friendly, and casual style) لمشاركة الأخبار أو الدعوات.",
            features: [
                {
                    name: "1. Greeting / Salutation (التحية الودية)",
                    description: "بدء الإيميل بتحية ودية غير رسمية متبوعة بالاسم الأول أو اللقب الودي.",
                    example: "Hi Omar, / Dear Sarah, / Hello friend,"
                },
                {
                    name: "2. Friendly Opening (الجملة الافتتاحية الودية)",
                    description: "الاطمئنان على أحوال الصديق والتعبير عن الشوق أو التحية.",
                    example: "How are things with you? / I hope you are doing great! / How are you and your family?"
                },
                {
                    name: "3. Body Paragraphs (متن الرسالة والأخبار)",
                    description: "مشاركة الأخبار والموضوع الرئيسي واستخدام لغة معبرة وجمل بسيطة واختصارات شائعة.",
                    example: "I am writing to tell you about my exciting summer trip... / Guess what happened yesterday!"
                },
                {
                    name: "4. Pre-Closing (الجملة الختامية التمهيدية)",
                    description: "التطلع للرد السريع أو اللقاء القريب.",
                    example: "Write back soon! / Hope to hear from you soon! / Give my best wishes to your family."
                },
                {
                    name: "5. Sign-off & Name (التوقيع الودي والاسم الأول)",
                    description: "عبارة وداع ودية متبوعة باسمك الأول.",
                    example: "Best wishes, / Warm regards, / Cheers, / Yours,"
                }
            ]
        };
    }
}
'''

u6_code = '''
if (typeof window !== 'undefined' && window.lessonData) {
    if (!window.lessonData.writingSkill && !window.lessonData.writingSkills) {
        window.lessonData.writingSkill = {
            title: "مهارة كتابة السيرة الذاتية (Resume / CV Writing & Professional Communication)",
            definition: "السيرة الذاتية (CV) هي وثيقة رسمية موجزة تلخص مهاراتك الأكاديمية والمهنية وتاريخك العملي لتقديمها لأصحاب العمل والمنح الدراسية.",
            features: [
                {
                    name: "1. Contact Information (البيانات الشخصية ومعلومات التواصل)",
                    description: "Full Name, Professional Email, Phone Number, City, and LinkedIn Profile.",
                    example: "Ahmed Assem • Cairo, Egypt • contact@domain.com • +20 100 000 0000"
                },
                {
                    name: "2. Professional Summary (الملخص المهني / الهدف)",
                    description: "فقرة موجزة من 2-3 أسطر تبرز أهم نقاط قوتك وتطلعاتك المهنية.",
                    example: "Motivated high school graduate with strong communication and multilingual skills seeking an internship in digital marketing."
                },
                {
                    name: "3. Education & Certifications (المؤهلات التعليمية والشهادات)",
                    description: "المرحلة الدراسية، اسم المدرسة، والشهادات أو الدورات المعتمدة.",
                    example: "Thanawiya Amma Certificate • Focus on Languages & Sciences"
                },
                {
                    name: "4. Skills & Strengths (المهارات التقنية والشخصية)",
                    description: "Hard skills (اللغات، الحاسوب) و Soft skills (العمل الجماعي، حل المشكلات).",
                    example: "Fluent English, Public Speaking, Creative Problem Solving, Time Management"
                },
                {
                    name: "5. Experience & Volunteer Work (الخبرات السابقة والعمل التطوعي)",
                    description: "الأنشطة المدرسية، المبادرات المجتمعية، وأدوار القيادة الطلابية.",
                    example: "Leader of School Environmental Club (Organized Bag Swap Day & Campus Recycling)"
                }
            ]
        };
    }
}
'''

with open('Sec_1/unit-5/lesson-4-5.data.js', 'r', encoding='utf-8') as f:
    t5 = f.read()
if 'Informal Email Writing' not in t5:
    t5 = t5.rstrip() + '\n' + u5_code
    with open('Sec_1/unit-5/lesson-4-5.data.js', 'w', encoding='utf-8') as f:
        f.write(t5)
    print("Sec_1/unit-5/lesson-4-5.data.js writing skill added!")

with open('Sec_1/unit-6/lesson-4-5.data.js', 'r', encoding='utf-8') as f:
    t6 = f.read()
if 'Resume / CV Writing' not in t6:
    t6 = t6.rstrip() + '\n' + u6_code
    with open('Sec_1/unit-6/lesson-4-5.data.js', 'w', encoding='utf-8') as f:
        f.write(t6)
    print("Sec_1/unit-6/lesson-4-5.data.js writing skill added!")
