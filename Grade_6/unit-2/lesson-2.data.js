/**
 * Grade 6 - Unit 2: Our Nature
 * Lesson 2: How's the weather in your city? & The Present Continuous Tense
 * Clean, decoupled data model for CurriculumRenderer & GrammarSlides
 */

window.lessonData = {
    id: "grade_6_u2_l2",
    stage: "Grade_6",
    unit: "unit-2",
    lesson: "lesson-2",
    title: "Lesson 2: How's the weather in your city? & The Present Continuous Tense",
    arabicTitle: "الدرس الثاني: كيف يبدو الطقس في مدينتك؟ وزمن المضارع المستمر",
    subtitle: "Mr. Ahmed Assem • Connect 6 (Term 1) • Unit 2: Our Nature",
    description: "المفردات وحالة الطقس في مصر، شرائح المضارع المستمر التفاعلية (Grammar Slides)، إيميل يوسف عن مدن مصر، واختبار شامل",

    // 1. Key Vocabulary (المفردات الأساسية)
    keyVocabulary: [
        {
            word: "weather",
            translation: "الطقس / حالة الجو",
            pos: "noun",
            icon: "🌤️",
            example: "What is the weather like in Alexandria today?",
            exampleAr: "كيف تبدو حالة الطقس في الإسكندرية اليوم؟"
        },
        {
            word: "windy",
            translation: "عاصف / شديد الرياح",
            pos: "adj",
            icon: "💨",
            example: "It is windy near the sea and waves are high.",
            exampleAr: "الجو عاصف بالقرب من البحر والأمواج عالية."
        },
        {
            word: "outdoors",
            translation: "بالخارج / في الهواء الطلق",
            pos: "adv",
            icon: "🏞️",
            example: "Some students are doing their homework outdoors in the garden.",
            exampleAr: "يقوم بعض الطلاب بأداء واجباتهم المدرسية بالخارج في الحديقة."
        },
        {
            word: "shade",
            translation: "الظل",
            pos: "noun",
            icon: "⛱️",
            example: "When the sun is hot, people sit in the shade to rest.",
            exampleAr: "عندما تشتد حرارة الشمس، يجلس الناس في الظل للاستراحة."
        },
        {
            word: "warm",
            translation: "دافئ",
            pos: "adj",
            icon: "☀️",
            example: "In Cairo, the weather is pleasantly warm and sunny today.",
            exampleAr: "في القاهرة، الطقس دافئ ولطيف ومشمس اليوم."
        },
        {
            word: "sunny",
            translation: "مشمس",
            pos: "adj",
            icon: "🌞",
            example: "Aswan is sunny all year round with clear blue skies.",
            exampleAr: "مدينة أسوان مشمسة طوال العام بسماء زرقاء صافية."
        },
        {
            word: "wet",
            translation: "مبتل / رطب",
            pos: "adj",
            icon: "🌧️",
            example: "The streets are wet because it is raining heavily.",
            exampleAr: "الشوارع مبللة لأن السماء تمطر بغزارة."
        },
        {
            word: "rainy",
            translation: "ممطر",
            pos: "adj",
            icon: "☔",
            example: "Take an umbrella with you on rainy winter days.",
            exampleAr: "خذ معك مظلة في الأيام الشتوية الممطرة."
        },
        {
            word: "clouds",
            translation: "سحب / غيوم",
            pos: "noun",
            icon: "☁️",
            example: "The sky is full of dark clouds before the storm.",
            exampleAr: "السماء مليئة بالسحب والغيوم الداكنة قبل العاصفة."
        }
    ],

    // 2. Extra Vocabulary (المفردات التكميلية)
    lessonVocabulary: [
        { word: "dark", translation: "مظلم / داكن / غائم", pos: "adj", example: "Dark clouds mean rain is coming soon.", exampleAr: "السحب الداكنة تعني أن المطر قادم قريباً." },
        { word: "dusty", translation: "مليء بالغبار / مغبر", pos: "adj", example: "On windy desert days, the air can be quite dusty.", exampleAr: "في الأيام العاصفة بالصحراء، قد يكون الهواء مغبراً للغاية." },
        { word: "waves", translation: "أمواج البحر", pos: "noun", example: "High waves crashed against the rocks in Alexandria.", exampleAr: "تحطمت الأمواج العالية على صخور شاطئ الإسكندرية." },
        { word: "heat", translation: "حرارة / شدة الحر", pos: "noun", example: "Drink plenty of water to protect yourself from summer heat.", exampleAr: "اشرب الكثير من الماء لتحمي نفسك من حرارة الصيف." },
        { word: "sunglasses", translation: "نظارات شمسية", pos: "noun", example: "I wear dark sunglasses to protect my eyes from the sun.", exampleAr: "أرتدي نظارات شمسية داكنة لحماية عيني من أشعة الشمس." },
        { word: "hat", translation: "قبعة", pos: "noun", example: "Wearing a wide hat keeps your head cool outdoors.", exampleAr: "ارتداء قبعة عريضة يحافظ على برودة رأسك بالخارج." },
        { word: "indoors", translation: "بالداخل / في المنزل", pos: "adv", example: "People stayed indoors because it was stormy and cold.", exampleAr: "بقي الناس في منازلهم بالداخل لأن الجو كان عاصفاً وبارداً." }
    ],

    // 3. Verbs (تصريف الأفعال)
    verbs: [
        { present: "stay", past: "stayed", type: "regular", translation: "يمكث / يقيم / يظل", example: "People are staying indoors today." },
        { present: "protect", past: "protected", type: "regular", translation: "يحمي", example: "Sunglasses protect our eyes from bright sunlight." },
        { present: "rain", past: "rained", type: "regular", translation: "تمطر", example: "It is raining heavily in Alexandria." },
        { present: "fly", past: "flew", type: "irregular", translation: "يطير / يحلق", example: "Birds are flying in the clear sky." },
        { present: "wear", past: "wore", type: "irregular", translation: "يرتدي", example: "He is wearing a thick warm coat." },
        { present: "shine", past: "shone", type: "irregular", translation: "تشرق / تسطع", example: "The sun is shining brightly in Aswan." }
    ],

    // 4. Expressions & Prepositions (تعبيرات وحروف جر هامة)
    expressions: [
        { phrase: "full of dark clouds", translation: "ملبد بالغيوم الداكنة", note: "Describes stormy overcast skies in coastal cities." },
        { phrase: "stay indoors", translation: "يمكث بالداخل / يلزم المنزل", note: "Commonly advised during severe cold or rain." },
        { phrase: "rain heavily", translation: "تمطر بغزارة / بشدة", note: "Adverb 'heavily' describes strong rainfall." },
        { phrase: "write back soon", translation: "عاود الكتابة قريباً", note: "Friendly sign-off closing at the end of informal emails." },
        { phrase: "clear sky", translation: "سماء صافية خالية من السحب", note: "Typical weather in Upper Egypt (Aswan & Luxor)." },
        { phrase: "check the weather", translation: "يتحقق من حالة الطقس", note: "Checking weather forecasts helps plan activities." },
        { phrase: "rest in the shade", translation: "يستريح في الظل", note: "Sitting away from direct sunshine on hot days." }
    ],

    // 5. Pop Quiz on Vocabulary (تدريب المفردات السريع)
    popQuiz: [
        {
            question: "We didn't play __________ because it was raining heavily.",
            options: ["indoors", "inside", "outside", "sadly"],
            correct: 2,
            explanation: "لم نتمكن من اللعب بالخارج (outside) بسبب المطر."
        },
        {
            question: "We wear hats and sunglasses to __________ ourselves from the strong sun.",
            options: ["heat", "clean", "grow", "protect"],
            correct: 3,
            explanation: "نرتدي القبعات والنظارات لنحمي (protect) أنفسنا من أشعة الشمس."
        },
        {
            question: "When it is hot, people drink water and rest in the __________.",
            options: ["shade", "sun", "heat", "dust"],
            correct: 0,
            explanation: "عندما يكون الجو حاراً، يستريح الناس في الظل (shade)."
        },
        {
            question: "The streets are __________ because it is raining heavily.",
            options: ["dry", "wet", "dusty", "hot"],
            correct: 1,
            explanation: "الشوارع تصبح مبللة (wet) نتيجة المطر الغزير."
        },
        {
            question: "It is windy and the sky is full of dark __________.",
            options: ["waves", "glasses", "pants", "clouds"],
            correct: 3,
            explanation: "السماء مليئة بالسحب الداكنة (dark clouds)."
        }
    ],

    // 6. Interactive Grammar Slides (شرائح المضارع المستمر التفاعلية)
    grammarSlides: [
        {
            title: "1. مفهوم واستخدام زمن المضارع المستمر (Usage)",
            lead: "We use the Present Continuous to talk about actions happening right now at the moment of speaking.",
            content: `
                <div class="grammar-rule-box" style="background: rgba(14, 165, 233, 0.1); border-left: 4px solid var(--accent-primary); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                    <h4 style="color: var(--accent-primary); margin-bottom: 8px;">🎯 متى نستخدم المضارع المستمر؟</h4>
                    <p>نستخدمه للتعبير عن <strong>حدث يقع الآن</strong> أثناء لحظة الكلام وما زال مستمراً ولم ينتهِ بعد.</p>
                </div>
                <div class="grammar-examples-grid" style="display: grid; gap: 12px;">
                    <div class="example-item" style="background: rgba(19, 27, 46, 0.8); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <strong style="color: #38bdf8;">Alexandria:</strong> "People <strong>are staying</strong> indoors because it's cold."
                        <div style="color: #94a3b8; font-size: 0.9rem;">الناس يمكثون في منازلهم الآن لأن الجو بارد.</div>
                    </div>
                    <div class="example-item" style="background: rgba(19, 27, 46, 0.8); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <strong style="color: #38bdf8;">Cairo:</strong> "Children <strong>are playing</strong> in the park right now."
                        <div style="color: #94a3b8; font-size: 0.9rem;">الأطفال يلعبون في الحديقة في هذه اللحظة.</div>
                    </div>
                </div>
            `
        },
        {
            title: "2. التكوين في الجملة المثبتة (Affirmative Formation)",
            lead: "Subject + am / is / are + Verb + ing",
            content: `
                <table class="grammar-table" style="width: 100%; border-collapse: collapse; margin-bottom: 16px; text-align: center;">
                    <thead>
                        <tr style="background: rgba(56, 189, 248, 0.2); color: var(--accent-primary);">
                            <th style="padding: 10px; border: 1px solid var(--border-color);">الفاعل (Subject)</th>
                            <th style="padding: 10px; border: 1px solid var(--border-color);">فعل Be</th>
                            <th style="padding: 10px; border: 1px solid var(--border-color);">الفعل + ing</th>
                            <th style="padding: 10px; border: 1px solid var(--border-color);">مثال</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 8px; border: 1px solid var(--border-color); font-weight: 700;">I</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); color: #38bdf8;">am ('m)</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);">reading</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);">I am reading a book.</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid var(--border-color); font-weight: 700;">He / She / It / اسم مفرد</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); color: #38bdf8;">is ('s)</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);">playing</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);">He is playing football.</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid var(--border-color); font-weight: 700;">We / You / They / اسم جمع</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); color: #38bdf8;">are ('re)</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);">watching</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);">They are watching TV.</td>
                        </tr>
                    </tbody>
                </table>
            `
        },
        {
            title: "3. قواعد إضافة ing إلى نهاية الفعل (Spelling Rules)",
            lead: "Special spelling rules when adding -ing to verbs.",
            content: `
                <div style="display: grid; gap: 14px;">
                    <div style="background: rgba(19, 27, 46, 0.8); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <strong style="color: #38bdf8;">1. حذف الـ e غير المنطوقة:</strong>
                        <p style="margin: 6px 0; color: #cbd5e1;">إذا انتهى الفعل بـ e قبله حرف ساكن، تُحذف الـ e عند إضافة ing:</p>
                        <code style="color: #fbbf24;">cycle ➔ cycling | write ➔ writing | make ➔ making</code>
                    </div>
                    <div style="background: rgba(19, 27, 46, 0.8); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <strong style="color: #38bdf8;">2. مضاعفة الحرف الساكن الأخير:</strong>
                        <p style="margin: 6px 0; color: #cbd5e1;">إذا كان الفعل ذا مقطع واحد وينتهي بحرف ساكن قبله حرف متحرك واحد فقط، نضاعف الحرف الساكن:</p>
                        <code style="color: #fbbf24;">sit ➔ sitting | swim ➔ swimming | run ➔ running</code>
                        <div style="margin-top: 6px; font-size: 0.85rem; color: #94a3b8;">⚠️ تنبيه: إذا سبقه حرفان متحركان لا نضاعف: <code style="color: #a7f3d0;">rain ➔ raining | feed ➔ feeding</code></div>
                    </div>
                    <div style="background: rgba(19, 27, 46, 0.8); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <strong style="color: #38bdf8;">3. قلب ie إلى y:</strong>
                        <p style="margin: 6px 0; color: #cbd5e1;">إذا انتهى الفعل بالحرفين ie، يتحولان إلى y:</p>
                        <code style="color: #fbbf24;">lie ➔ lying | die ➔ dying</code>
                    </div>
                </div>
            `
        },
        {
            title: "4. النفي والسؤال (Negative & Question Forms)",
            lead: "How to form negatives and questions in the Present Continuous.",
            content: `
                <div style="display: grid; gap: 14px;">
                    <div style="background: rgba(19, 27, 46, 0.8); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <h4 style="color: #f87171; margin-bottom: 6px;">❌ الجملة المنفية (Negative):</h4>
                        <p style="color: #cbd5e1;">نضع <strong>not</strong> بعد (am / is / are):</p>
                        <ul style="margin-right: 20px; color: #e2e8f0;">
                            <li>I <strong>am not</strong> ('m not) wearing my jacket.</li>
                            <li>She <strong>is not</strong> (isn't) sleeping now.</li>
                            <li>They <strong>are not</strong> (aren't) studying today.</li>
                        </ul>
                    </div>
                    <div style="background: rgba(19, 27, 46, 0.8); padding: 14px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <h4 style="color: var(--accent-primary); margin-bottom: 6px;">❓ السؤال (Questions):</h4>
                        <p style="color: #cbd5e1;"><strong>سؤال هل (Yes/No):</strong> نبدأ بـ <code>Am / Is / Are + الفاعل + Verb-ing...?</code></p>
                        <div style="color: #38bdf8; margin-bottom: 8px;">"Are you watching TV now?" ➔ "Yes, I am." / "No, I'm not."</div>
                        <p style="color: #cbd5e1;"><strong>سؤال بأداة استفهام (Wh-):</strong> <code>أداة الاستفهام + am/is/are + الفاعل + Verb-ing...?</code></p>
                        <div style="color: #38bdf8;">"What is he doing now?" ➔ "He is eating lunch."</div>
                    </div>
                </div>
            `
        },
        {
            title: "5. الكلمات الدالة وعلامات الزمن (Key Time Expressions)",
            lead: "Words and phrases that signal the Present Continuous tense.",
            content: `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-top: 10px;">
                    <div style="background: rgba(56, 189, 248, 0.15); padding: 14px; border-radius: 10px; border: 1px solid #38bdf8; text-align: center;">
                        <span style="font-size: 1.3rem; font-weight: 800; color: #38bdf8;">now</span>
                        <div style="color: #cbd5e1; font-size: 0.9rem;">الآن</div>
                    </div>
                    <div style="background: rgba(56, 189, 248, 0.15); padding: 14px; border-radius: 10px; border: 1px solid #38bdf8; text-align: center;">
                        <span style="font-size: 1.3rem; font-weight: 800; color: #38bdf8;">at the moment</span>
                        <div style="color: #cbd5e1; font-size: 0.9rem;">في هذه اللحظة</div>
                    </div>
                    <div style="background: rgba(56, 189, 248, 0.15); padding: 14px; border-radius: 10px; border: 1px solid #38bdf8; text-align: center;">
                        <span style="font-size: 1.3rem; font-weight: 800; color: #38bdf8;">Look!</span>
                        <div style="color: #cbd5e1; font-size: 0.9rem;">انظر! (جذب انتباه لحدث الآن)</div>
                    </div>
                    <div style="background: rgba(56, 189, 248, 0.15); padding: 14px; border-radius: 10px; border: 1px solid #38bdf8; text-align: center;">
                        <span style="font-size: 1.3rem; font-weight: 800; color: #38bdf8;">Listen!</span>
                        <div style="color: #cbd5e1; font-size: 0.9rem;">استمع! (صوت يقع الآن)</div>
                    </div>
                    <div style="background: rgba(56, 189, 248, 0.15); padding: 14px; border-radius: 10px; border: 1px solid #38bdf8; text-align: center;">
                        <span style="font-size: 1.3rem; font-weight: 800; color: #38bdf8;">right now</span>
                        <div style="color: #cbd5e1; font-size: 0.9rem;">الآن فوراً</div>
                    </div>
                    <div style="background: rgba(56, 189, 248, 0.15); padding: 14px; border-radius: 10px; border: 1px solid #38bdf8; text-align: center;">
                        <span style="font-size: 1.3rem; font-weight: 800; color: #38bdf8;">today / tonight</span>
                        <div style="color: #cbd5e1; font-size: 0.9rem;">اليوم / الليلة</div>
                    </div>
                </div>
            `
        }
    ],

    // 7. Interactive StoryBook / Reading Email (إيميل يوسف عن طقس مصر)
    storyPages: [
        {
            titleEn: "Scene 1: Weather in Alexandria by the Sea",
            titleAr: "المشهد الأول: الطقس في مدينة الإسكندرية الساحلية",
            textEn: "Youssef is writing an email to his friend John about the diverse weather in Egypt today. In Alexandria, it is cold, windy, and rainy. High waves crash along the rocky coast, and the sky is packed with dark clouds. The streets are wet, so most people are staying indoors by the heaters, and several seaside shops are closing early.",
            translation: "يكتب يوسف بريداً إلكترونياً لصديقه جون عن اختلاف الطقس في مصر اليوم. ففي الإسكندرية، الجو بارد وعاصف وممطر. وتتلاطم الأمواج العالية على امتداد الساحل الصخري، بينما تمتلئ السماء بسحب داكنة كثيفة. الشوارع مبللة بالمياه، ولذلك يمكث معظم الناس داخل منازلهم، وتغلق بعض المحلات أبوابها مبكراً.",
            image: "../../assets/images/grade_6/unit_2/weather_in_egypt.webp",
            caption: "High sea waves and rain in Alexandria during an overcast winter morning.",
            vocabHighlights: ["weather", "windy", "rainy", "dark clouds", "stay indoors"]
        },
        {
            titleEn: "Scene 2: Warm Sunshine in Cairo Parks",
            titleAr: "المشهد الثاني: دفء وشمس مشرقة في حدائق القاهرة",
            textEn: "Further inland in Cairo, the weather is completely different. It is wonderfully warm and sunny! Families are walking happily down wide streets, and children are laughing and playing in green public parks. Under the clear sky, some hardworking students are even doing their homework outdoors while birds fly overhead.",
            translation: "وفي داخل البلاد في القاهرة، يبدو الطقس مختلفاً تماماً؛ فالجو دافئ ومشمس على نحو رائع! يسير الناس بسعادة في الشوارع، ويمرح الأطفال ويلعبون في الحدائق العامة الخضراء. وتحت السماء الصافية، يحل بعض الطلاب المجتهدين واجباتهم في الهواء الطلق بينما تحلق الطيور في السماء.",
            image: "../../assets/images/grade_6/unit_2/weather_in_egypt.webp",
            caption: "Sunny and warm weather in Cairo with clear blue skies and green parks.",
            vocabHighlights: ["warm", "sunny", "outdoors", "clear sky", "flying"]
        },
        {
            titleEn: "Scene 3: Hot Sun in Aswan & Protecting Nature",
            titleAr: "المشهد الثالث: حرارة الشمس في أسوان وحماية الطبيعة",
            textEn: "Down south in Aswan, the sun is blazing hot and the blue sky is crystal clear. To beat the heat, farmers water their crops early in the morning, while pedestrians drink plenty of water, wear hats, and put on dark sunglasses. Many rest in the shade of tall palms. Youssef notes that Egyptians check daily weather forecasts to care for their homes and gardens.",
            translation: "وفي أقصى الجنوب في أسوان، تسطع الشمس بحرارة شديدة وسماء زرقاء صافية نقية. ولمواجهة الحر الشديد، يروي المزارعون محاصيلهم مبكراً في الصباح، بينما يحرص المارة على شرب الماء الوفير وارتداء القبعات والنظارات الشمسية، والاستراحة في ظلال أشجار النخيل. ويختتم يوسف إيميله بأن المصريين يتابعون النشرة الجوية يومياً لحماية بيوتهم وحدائقهم.",
            image: "../../assets/images/grade_6/unit_2/weather_in_egypt.webp",
            caption: "Bright sun and shade in southern Egypt with farmers caring for plants.",
            vocabHighlights: ["heat", "shade", "sunglasses", "hat", "protect"]
        }
    ],

    // 8. Comprehensive Mastery Quiz (اختبار شامل 12 سؤالاً مأخوذ مباشرة من تدريبات المعاصر)
    quiz: [
        {
            question: "In Alexandria, people are staying indoors because it is __________.",
            options: ["cold and rainy", "very hot", "sunny and dry", "dusty and warm"],
            correct: 0,
            explanation: "في الإسكندرية يمكث الناس بالداخل لأن الجو بارد وممطر (cold and rainy)."
        },
        {
            question: "Children in Cairo are __________ in the public parks today.",
            options: ["sleeping", "playing", "crying", "swimming"],
            correct: 1,
            explanation: "الأطفال في القاهرة يلعبون (are playing) في الحدائق العامة."
        },
        {
            question: "We wear dark sunglasses and hats to __________ ourselves from the hot sun.",
            options: ["protect", "clean", "wash", "hurt"],
            correct: 0,
            explanation: "نرتدي النظارات والقبعات لنحمي (protect) أنفسنا من أشعة الشمس."
        },
        {
            question: "The streets in Alexandria are wet because it is __________ heavily.",
            options: ["raining", "shining", "flying", "growing"],
            correct: 0,
            explanation: "الشوارع مبللة لأن السماء تمطر (raining) بغزارة."
        },
        {
            question: "Look! He __________ a fascinating book about nature right now.",
            options: ["reads", "is reading", "read", "reading"],
            correct: 1,
            explanation: "مع وجود 'Look!' نستخدم المضارع المستمر: He is reading."
        },
        {
            question: "What are you __________ at the moment, Nada?",
            options: ["do", "does", "did", "doing"],
            correct: 3,
            explanation: "بعد 'What are you' نضع الفعل مضافاً له ing: doing."
        },
        {
            question: "__________ she having her lunch right now?",
            options: ["Are", "Is", "Was", "Does"],
            correct: 1,
            explanation: "الفاعل المفرد (she) في المضارع المستمر يبدأ السؤال بـ Is."
        },
        {
            question: "Ahmed is __________ his bedroom right now.",
            options: ["cleans", "clean", "are cleaning", "cleaning"],
            correct: 3,
            explanation: "بعد 'Ahmed is' نختار الفعل المنتهي بـ ing: cleaning."
        },
        {
            question: "Where are they __________ their holiday this summer?",
            options: ["spend", "spending", "spent", "spends"],
            correct: 1,
            explanation: "بعد 'Where are they' نستخدم صيغة المضارع المستمر: spending."
        },
        {
            question: "When it is hot, people drink water and sit in the __________.",
            options: ["shade", "heat", "fire", "dark"],
            correct: 0,
            explanation: "يجلس الناس في الظل (shade) للاستراحة من الحرارة."
        },
        {
            question: "I am not __________ my heavy coat now because the weather is warm.",
            options: ["wear", "wore", "wearing", "wears"],
            correct: 2,
            explanation: "في النفي: I am not wearing."
        },
        {
            question: "Look! The bright sun is __________ brightly in the clear sky.",
            options: ["shine", "shining", "shined", "shines"],
            correct: 1,
            explanation: "الفعل shine ينتهي بـ e غير منطوقة، تُحذف عند إضافة ing: shining."
        }
    ]
};
