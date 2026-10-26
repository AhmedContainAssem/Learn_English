/**
 * Grade 6 - Unit 3: Community Builders
 * Lesson 2: Let's Help Our Community & Expressing Ability (Can / Able to)
 * Clean, decoupled pure data model for CurriculumRenderer
 */

window.lessonData = {
    id: "grade_6_u3_l2",
    stage: "Grade_6",
    unit: "unit-3",
    lesson: "lesson-2",
    title: "Lesson 2: Let's Help Our Community & Expressing Ability",
    arabicTitle: "الدرس الثاني: لنساعد مجتمعنا وقواعد التعبير عن القدرة",
    subtitle: "Mr. Ahmed Assem • Connect 6 (Term 1) • Unit 3: Community Builders",
    description: "مفردات العمل التطوعي والخيري، شرائح القواعد التفاعلية (Grammar Slides: can / can't / able to)، قصة المبادرة المجتمعية، واختبار شامل",

    // 1. Key Vocabulary (المفردات الأساسية)
    keyVocabulary: [
        {
            word: "volunteer",
            translation: "متطوع / يتطوع",
            pos: "noun / verb",
            icon: "🤝",
            example: "Many kind teenagers volunteer at the animal shelter every Saturday.",
            exampleAr: "يتطوع العديد من المراهقين الطيبين في ملجأ الحيوانات كل يوم سبت."
        },
        {
            word: "charity",
            translation: "جمعية خيرية / عمل خيري",
            pos: "noun",
            icon: "❤️",
            example: "Our school organized a book sale to raise money for a children's charity.",
            exampleAr: "نظمت مدرستنا معرضاً لبيع الكتب لجمع التبرعات لصالح جمعية خيرية للأطفال."
        },
        {
            word: "elderly people",
            translation: "كبار السن / المسنون",
            pos: "noun",
            icon: "👴",
            example: "We should always show respect and offer help to elderly people with heavy bags.",
            exampleAr: "ينبغي علينا دائماً إظهار الاحترام وتقديم المساعدة للمسنين في حمل الحقائب الثقيلة."
        },
        {
            word: "community project",
            translation: "مشروع مجتمعي",
            pos: "noun",
            icon: "🌱",
            example: "Our community project turned the dusty empty field into a green community park.",
            exampleAr: "نجح مشروعنا المجتمعي في تحويل الأرض الفضاء المغبرة إلى حديقة عامة خضراء."
        },
        {
            word: "clean up",
            translation: "حملة تنظيف / ينظف",
            pos: "phrasal verb",
            icon: "🧹",
            example: "Neighbors gathered together to clean up the riverbank and remove plastic litter.",
            exampleAr: "تجمع الجيران معاً لتنظيف ضفة النهر وإزالة القمامة البلاستيكية."
        },
        {
            word: "plant trees",
            translation: "يزرع أشجاراً",
            pos: "verb phrase",
            icon: "🌳",
            example: "We can plant trees along the streets to provide cool shade and purify the air.",
            exampleAr: "يمكننا زراعة الأشجار على طول الشوارع لتوفير الظل المنعش وتنقية الهواء."
        },
        {
            word: "raise money",
            translation: "يجمع أموالاً وتبرعات",
            pos: "verb phrase",
            icon: "💰",
            example: "Students baked cookies to raise money for buying warm winter jackets for children in need.",
            exampleAr: "خبز الطلاب البسكويت لجمع تبرعات لشراء سترات شتوية دافئة للأطفال المحتاجين."
        },
        {
            word: "donate",
            translation: "يتبرع بـ",
            pos: "verb",
            icon: "🎁",
            example: "You can donate old storybooks and toys to the community library.",
            exampleAr: "يمكنك التبرع بكتب القصص والألعاب القديمة لمكتبة الحي."
        }
    ],

    // 2. Extra Lesson Vocabulary (المفردات التكميلية)
    lessonVocabulary: [
        { word: "neighbor", translation: "جار", pos: "noun", example: "Our friendly neighbor baked fresh bread for us.", exampleAr: "خبز جارنا اللطيف خبزاً طازجاً لنا." },
        { word: "neighborhood", translation: "حي / مجاورة سكنية", pos: "noun", example: "We are proud of our beautiful, clean neighborhood.", exampleAr: "نحن فخورون بحيّنا الجميل والنظيف." },
        { word: "sapling", translation: "شتلة شجرة صغيرة", pos: "noun", example: "Each student planted a young olive sapling in the park.", exampleAr: "زرع كل طالب شتلة زيتون صغيرة في الحديقة." },
        { word: "litter / trash", translation: "قمامة / مخلفات", pos: "noun", example: "Never drop litter on the pavement; use the bins.", exampleAr: "إياك وإلقاء القمامة على الرصيف؛ استخدم السلال." },
        { word: "difference", translation: "فارق / أثر إيجابي", pos: "noun", example: "Even small actions can make a huge difference in people's lives.", exampleAr: "حتى الأفعال الصغيرة قادرة على إحداث فارق كبير في حياة الناس." },
        { word: "kindness", translation: "طيبة / عطف وإحسان", pos: "noun", example: "Kindness makes the whole world a friendlier place.", exampleAr: "العطف والإحسان يجعلان العالم بأسره مكاناً أكثر مودة." },
        { word: "proud", translation: "فخور", pos: "adj", example: "Our teacher is very proud of our volunteer efforts.", exampleAr: "معلمنا فخور جداً بجهودنا التطوعية." }
    ],

    // 3. Verbs (تصريف الأفعال)
    verbs: [
        { present: "volunteer", past: "volunteered", type: "regular", translation: "يتطوع", example: "He volunteered to paint the fence." },
        { present: "plant", past: "planted", type: "regular", translation: "يزرع", example: "We planted olive trees yesterday." },
        { present: "donate", past: "donated", type: "regular", translation: "يتبرع", example: "She donated five warm coats." },
        { present: "collect", past: "collected", type: "regular", translation: "يجمع", example: "They collected plastic bottles for recycling." },
        { present: "organize", past: "organized", type: "regular", translation: "ينظم", example: "We organized a weekend clean-up day." },
        { present: "give", past: "gave", type: "irregular", translation: "يعطي / يقدم", example: "He gave a helping hand to his neighbor." },
        { present: "build", past: "built", type: "irregular", translation: "يبني", example: "Volunteers built a sturdy wooden bench." },
        { present: "feed", past: "fed", type: "irregular", translation: "يطعم", example: "Salma fed the stray kittens in the garden." }
    ],

    // 4. Expressions & Prepositions (تعبيرات وحروف جر هامة)
    expressions: [
        { phrase: "make a difference", translation: "يحدث فارقاً إيجابياً", note: "Working together can make a big difference in our community." },
        { phrase: "give a helping hand", translation: "يمد يد العون والمساعدة", note: "Always give a helping hand to those who need support." },
        { phrase: "care for elderly people", translation: "يعتني بكبار السن", note: "Young people should care for elderly people with love." },
        { phrase: "raise money for charity", translation: "يجمع أموالاً لصالح جمعية خيرية", note: "They baked cakes to raise money for charity." },
        { phrase: "people in need", translation: "المحتاجون / ذوو الحاجة", note: "Charities provide clothes and food for people in need." },
        { phrase: "be able to", translation: "يكون قادراً على (متبوع بمصدر)", note: "Requires am / is / are in the present tense." }
    ],

    // 5. Pop Quiz on Vocabulary (تدريب الفهم السريع)
    popQuiz: [
        {
            question: "A __________ is someone who works to help others without taking any money.",
            options: ["customer", "volunteer", "mechanic", "tailor"],
            correct: 1,
            explanation: "المتطوع (volunteer) يقدم وقته ومساعدته لوجه الخير دون أجر."
        },
        {
            question: "We should help __________ carry heavy bags and cross the street safely.",
            options: ["airplanes", "elderly people", "engines", "computers"],
            correct: 1,
            explanation: "كبار السن (elderly people) يحتاجون لمساعدتنا وتقديرنا."
        },
        {
            question: "Our class held a school fair to __________ money for poor families.",
            options: ["break", "lose", "raise", "drop"],
            correct: 2,
            explanation: "التعبير 'raise money' يعني يجمع أموالاً وتبرعات."
        },
        {
            question: "Volunteering helps our community and can make a big __________.",
            options: ["damage", "difference", "mistake", "noise"],
            correct: 1,
            explanation: "التعبير 'make a difference' يعني يحدث فارقاً وأثراً إيجابياً."
        }
    ],

    // 6. Interactive Grammar Slides (شرائح القواعد التفاعلية: التعبير عن القدرة)
    grammarSlides: [
        {
            title: "1. التعبير عن القدرة في المضارع (Expressing Ability in the Present)",
            lead: "We can express present ability using either 'can' or '(be) able to' + infinitive.",
            image: "../../assets/images/grade_6/unit_3/grammar_can_able_to.webp",
            content: `
                <div class="grammar-rule-box" style="background: rgba(14, 165, 233, 0.1); border-left: 4px solid var(--accent-primary); padding: 16px; border-radius: 8px; margin-bottom: 16px;">
                    <h4 style="color: var(--accent-primary); margin-bottom: 8px;">🎯 ما هي صيغ التعبير عن القدرة في الحاضر؟</h4>
                    <p>لدينا طريقتان متطابقتان في المعنى للتعبير عن الاستطاعة والمهارة الحالية:</p>
                    <ol style="margin-right: 20px; margin-top: 8px;">
                        <li><strong>Can / Can't + مصدر الفعل (infinitive):</strong> أبسط وأكثر شيوعاً.</li>
                        <li><strong>(am / is / are) able to + مصدر الفعل:</strong> صيغة أكثر رسمية ودقة.</li>
                    </ol>
                </div>
                <div class="grammar-examples-grid" style="display: grid; gap: 12px;">
                    <div class="example-item" style="background: rgba(19, 27, 46, 0.8); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <strong style="color: #38bdf8;">مثال متطابق 1:</strong> "I <strong>can volunteer</strong> this weekend." = "I <strong>am able to volunteer</strong> this weekend."
                        <div style="color: #94a3b8; font-size: 0.9rem;">أنا أستطيع / قادر على التطوع في عطلة نهاية هذا الأسبوع.</div>
                    </div>
                    <div class="example-item" style="background: rgba(19, 27, 46, 0.8); padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <strong style="color: #38bdf8;">مثال متطابق 2:</strong> "Omar <strong>can't come</strong> today." = "Omar <strong>is not able to come</strong> today."
                        <div style="color: #94a3b8; font-size: 0.9rem;">عمر لا يستطيع / غير قادر على الحضور اليوم.</div>
                    </div>
                </div>
            `
        },
        {
            title: "2. قواعد استخدام Can و Can't (Rules of Can / Can't)",
            lead: "Subject + can / can't + Verb (Infinitive)",
            content: `
                <table class="grammar-table" style="width: 100%; border-collapse: collapse; margin-bottom: 16px; text-align: center;">
                    <thead>
                        <tr style="background: rgba(56, 189, 248, 0.2); color: var(--accent-primary);">
                            <th style="padding: 10px; border: 1px solid var(--border-color);">النوع (Type)</th>
                            <th style="padding: 10px; border: 1px solid var(--border-color);">التكوين (Structure)</th>
                            <th style="padding: 10px; border: 1px solid var(--border-color);">أمثلة كتاب المعاصر</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 8px; border: 1px solid var(--border-color); font-weight: 700; color: #4ade80;">الإثبات (Affirmative)</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);">Subject + <strong>can</strong> + inf</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); text-align: right;">We <strong>can plant</strong> trees in the park.</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid var(--border-color); font-weight: 700; color: #f87171;">النفي (Negative)</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);">Subject + <strong>can't (cannot)</strong> + inf</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); text-align: right;">He <strong>can't carry</strong> the heavy ladder.</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid var(--border-color); font-weight: 700; color: #38bdf8;">السؤال (Yes/No Question)</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);"><strong>Can</strong> + Subject + inf...?</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); text-align: right;"><strong>Can</strong> you help us clean the street? (Yes, I can. / No, I can't.)</td>
                        </tr>
                    </tbody>
                </table>
                <div style="background: rgba(239, 68, 68, 0.1); border-right: 4px solid #ef4444; padding: 10px; border-radius: 6px;">
                    ⚠️ <strong>انتبه جيداً:</strong> لا نضع 'to' إطلاقاً بعد can! <br>
                    ❌ خطأ: He can to swim. <br>
                    ✔️ صح: He <strong>can swim</strong>.
                </div>
            `
        },
        {
            title: "3. قواعد استخدام (be) able to (Rules of 'able to')",
            lead: "Subject + am / is / are + able to + Verb (Infinitive)",
            content: `
                <table class="grammar-table" style="width: 100%; border-collapse: collapse; margin-bottom: 16px; text-align: center;">
                    <thead>
                        <tr style="background: rgba(56, 189, 248, 0.2); color: var(--accent-primary);">
                            <th style="padding: 10px; border: 1px solid var(--border-color);">الفاعل (Subject)</th>
                            <th style="padding: 10px; border: 1px solid var(--border-color);">فعل Be</th>
                            <th style="padding: 10px; border: 1px solid var(--border-color);">الصيغة والمصدر</th>
                            <th style="padding: 10px; border: 1px solid var(--border-color);">مثال توضيحي</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 8px; border: 1px solid var(--border-color); font-weight: 700;">I</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); color: #38bdf8;">am ('m) / am not</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);"><strong>able to</strong> + inf</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); text-align: right;">I <strong>am able to paint</strong> the wall.</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid var(--border-color); font-weight: 700;">He / She / It / مفرد</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); color: #38bdf8;">is ('s) / isn't</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);"><strong>able to</strong> + inf</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); text-align: right;">Mona <strong>is able to speak</strong> English well.</td>
                        </tr>
                        <tr>
                            <td style="padding: 8px; border: 1px solid var(--border-color); font-weight: 700;">We / You / They / جمع</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); color: #38bdf8;">are ('re) / aren't</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color);"><strong>able to</strong> + inf</td>
                            <td style="padding: 8px; border: 1px solid var(--border-color); text-align: right;">They <strong>are able to fix</strong> the gate.</td>
                        </tr>
                    </tbody>
                </table>
                <div style="background: rgba(16, 185, 129, 0.1); border-right: 4px solid #10b981; padding: 10px; border-radius: 6px;">
                    💡 <strong>صيغة السؤال بـ (be) able to:</strong><br>
                    <strong>Are you able to</strong> come early tomorrow? ➔ Yes, I am. / No, I am not. <br>
                    <strong>Is he able to</strong> ride a bike? ➔ Yes, he is. / No, he isn't.
                </div>
            `
        },
        {
            title: "4. أخطاء شائعة وتدريب التمييز (Common Mistakes & Mastery)",
            lead: "Test your grammar mastery and spot the differences!",
            content: `
                <div style="display: grid; gap: 12px; margin-bottom: 16px;">
                    <div style="background: rgba(19, 27, 46, 0.9); padding: 14px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <strong style="color: #f59e0b;">الخطأ الأول (نسيان be):</strong><br>
                        ❌ Hany able to play tennis.<br>
                        ✔️ Hany <strong>is able to</strong> play tennis.
                    </div>
                    <div style="background: rgba(19, 27, 46, 0.9); padding: 14px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <strong style="color: #f59e0b;">الخطأ الثاني (نسيان to):</strong><br>
                        ❌ We are able paint the fence.<br>
                        ✔️ We are <strong>able to paint</strong> the fence.
                    </div>
                    <div style="background: rgba(19, 27, 46, 0.9); padding: 14px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                        <strong style="color: #f59e0b;">الخطأ الثالث (وضع to بعد can):</strong><br>
                        ❌ Salma can to help us.<br>
                        ✔️ Salma <strong>can help</strong> us.
                    </div>
                </div>
                <div style="background: rgba(56, 189, 248, 0.1); padding: 12px; border-radius: 8px; text-align: center; color: #38bdf8; font-weight: 700;">
                    🌟 القاعدة الذهبية: Can + مصدر مباشرة | Be + able to + مصدر!
                </div>
            `
        }
    ],

    // 7. Interactive 3D StoryBook (صفحات القصة المصورة)
    storyPages: [
        {
            titleEn: "Scene 1: The Community Garden Project",
            titleAr: "المشهد الأول: مشروع الحديقة المجتمعية",
            textEn: "On a bright Saturday morning, Mazen and his schoolmates met at the local youth center. In the heart of their neighborhood lay a neglected, dusty lot full of trash and weeds. The students wanted to transform it into a vibrant green garden for everyone. Mazen smiled and said, 'We are able to clean this space if we work together!' The volunteers grabbed brooms, trash bags, and gardening tools with big smiles.",
            translation: "في صباح يوم سبت مشرق، التقى مازن وزملاؤه في مركز الشباب المحلي. ففي قلب حيّهم كانت هناك قطعة أرض مهملة ومغبرة مليئة بالقمامة والحشائش. أراد الطلاب تحويلها إلى حديقة خضراء مبهجة للجميع. ابتسم مازن وقال: 'نحن قادرون على تنظيف هذا المكان إذا تعاونّا معاً!' وتناول المتطوعون المكانس وأكياس القمامة وأدوات الزراعة بابتسامات عريضة.",
            image: "../../assets/images/grade_6/unit_3/help_community.webp",
            caption: "Young volunteers uniting to clean up and revitalize their neighborhood.",
            vocabHighlights: ["volunteer", "community project", "clean up", "able to"]
        },
        {
            titleEn: "Scene 2: Green Trees and Helping Hands",
            titleAr: "المشهد الثاني: أشجار خضراء وأيادٍ معطاءة",
            textEn: "By midday, the ground was spotless. The older boys dug holes and planted olive and lemon saplings along the borders. Salma and Dina visited the elderly neighbors on the adjacent street. The girls were able to help Mrs. Amina carry her heavy groceries and read her letters. Later, the volunteers organized a craft stall to raise money for charity, ensuring poor families receive warm meals and storybooks.",
            translation: "وبحلول منتصف النهار، أصبحت الأرض نظيفة تماماً دون أثر للمخلفات. حفر الفتيان الأكبر سناً الأرض وزرعوا شتلات الزيتون والليمون على طول الحدود. وتوجهت سلمى ودينا لزيارة الجيران المسنين في الشارع المجاور، حيث تمكنتا من مساعدة السيدة أمينة في حمل مشترياتها وقراءة رسائلها. وفي وقت لاحق، نظم المتطوعون كشكاً لبيع المشغولات لجمع تبرعات للجمعية الخيرية لتوفير وجبات وكتب للأسر المحتاجة.",
            image: "../../assets/images/grade_6/unit_3/help_community.webp",
            caption: "Planting young trees and supporting elderly neighbors with warm care.",
            vocabHighlights: ["plant trees", "elderly people", "raise money", "charity"]
        },
        {
            titleEn: "Scene 3: A Proud and Thriving Neighborhood",
            titleAr: "المشهد الثالث: حي فخور ومزدهر",
            textEn: "In the late afternoon, the town council representative arrived to admire the new park. Birds were already singing in the newly watered trees, and children sat happily on freshly painted green benches. The mayor awarded the teenagers certificates of appreciation and said, 'You have proven that kindness and cooperation can make a huge difference in any community!' Everyone felt incredibly proud.",
            translation: "في أواخر فترة ما بعد الظهر، وصل ممثل المجلس المحلي لزيارة الحديقة الجديدة. كانت الطيور تغرد بالفعل في الأشجار المروية حديثاً، وجلس الأطفال سعداء على المقاعد الخضراء المطلية. سلم رئيس المدينة المراهقين شهادات تقدير وقال: 'لقد أثبتم أن العطف والتعاون قادران على إحداث فارق هائل في أي مجتمع!' فشعر الجميع بفخر لا يوصف.",
            image: "../../assets/images/grade_6/unit_3/help_community.webp",
            caption: "Celebrating community achievements and inspiring future builders.",
            vocabHighlights: ["make a difference", "proud", "kindness", "can"]
        }
    ],

    // 8. Comprehensive Mastery Quiz (اختبار شامل 12 سؤال مأخوذ من تدريبات المعاصر)
    quiz: [
        {
            question: "A __________ is someone who works willingly without being paid to help their neighborhood.",
            options: ["mechanic", "volunteer", "traffic officer", "tailor"],
            correct: 1,
            explanation: "المتطوع (volunteer) يقدم وقته وجهده لمساعدة مجتمعه دون مقابل."
        },
        {
            question: "We should always show kindness and offer help to __________ people in our street.",
            options: ["elderly", "plastic", "wooden", "metallic"],
            correct: 0,
            explanation: "المسنون وكبار السن (elderly people) يستحقون عطفنا ومساعدتنا."
        },
        {
            question: "The students want to __________ money for a hospital charity.",
            options: ["break", "lose", "raise", "drop"],
            correct: 2,
            explanation: "التعبير 'raise money' يعني يجمع أموالاً وتبرعات."
        },
        {
            question: "Ali is very strong. He __________ lift this heavy box easily.",
            options: ["can", "able", "is", "are"],
            correct: 0,
            explanation: "نستخدم 'can' متبوعة بمصدر الفعل (lift) للتعبير عن الاستطاعة."
        },
        {
            question: "Salma __________ able to paint the school fence yesterday was impossible, but today she is ready.",
            options: ["is", "are", "am", "can"],
            correct: 0,
            explanation: "مع الفاعل المفرد (Salma) نستخدم 'is able to'."
        },
        {
            question: "We __________ able to clean the entire park in two hours.",
            options: ["is", "am", "are", "can"],
            correct: 2,
            explanation: "مع الضمير 'We' نستخدم 'are able to'."
        },
        {
            question: "Can you __________ the community clean-up this Saturday?",
            options: ["joining", "joined", "joins", "join"],
            correct: 3,
            explanation: "بعد 'Can' يأتي الفعل في المصدر بدون أي إضافات (join)."
        },
        {
            question: "Hany is not feeling well, so he __________ able to come today.",
            options: ["isn't", "aren't", "can", "am not"],
            correct: 0,
            explanation: "النفي مع الفاعل المفرد (he) هو 'isn't able to'."
        },
        {
            question: "They __________ plant olive trees because they don't have gardening tools.",
            options: ["can't", "aren't able", "cannot to", "isn't"],
            correct: 0,
            explanation: "نستخدم 'can't' متبوعة بالمصدر (plant)."
        },
        {
            question: "Are you __________ to speak English with the tourists?",
            options: ["can", "able", "ability", "could"],
            correct: 1,
            explanation: "السؤال يبدأ بـ 'Are you' ويليه 'able to'."
        },
        {
            question: "Small acts of volunteering can __________ a big difference to our town.",
            options: ["make", "take", "do", "break"],
            correct: 0,
            explanation: "التعبير الثابت هو 'make a difference' أي يحدث فارقاً."
        },
        {
            question: "You can __________ old clothes and toys to poor children.",
            options: ["donate", "destroy", "waste", "burn"],
            correct: 0,
            explanation: "الفعل 'donate' يعني يتبرع بـ."
        }
    ]
};
