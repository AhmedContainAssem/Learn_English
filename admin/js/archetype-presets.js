/**
 * Lesson Studio Archetype Presets (archetype-presets.js)
 * Single Responsibility: Manages starter data and configurations for all educational archetypes.
 */

function loadArchetypePreset(preset) {
    if (preset === 'stage_index' || (preset === 'index_hub' && state.indexType === 'stage')) {
        state.archetype = 'stage_index';
        state.indexType = 'stage';
        state.indexScope = 'stage_hub';
        state.stage = state.stage || 'Prep_3';
        state.unit = '';
        state.title = `📚 ${getStageDisplayName(state.stage)}`;
        state.filename = 'index.html';
        state.description = 'اختر الوحدة للبدء في الدروس والتمارين';
        state.indexLayoutType = 'units';
        state.indexBackLink = '../index.html';
        state.indexBackText = '⬅️ العودة للقائمة الرئيسية';
        
        state.indexCards = [
            { title: 'Unit 1', subtitle: 'الوحدة الأولى', icon: '📘', destType: 'sub_unit_folder', link: './unit-1/index.html', status: 'active', tag: '🎯 متاح' },
            { title: 'Unit 2', subtitle: 'الوحدة الثانية', icon: '📗', destType: 'sub_unit_folder', link: './unit-2/index.html', status: 'locked', tag: '🔒 قريباً' },
            { title: 'Unit 3', subtitle: 'الوحدة الثالثة', icon: '📙', destType: 'sub_unit_folder', link: './unit-3/index.html', status: 'locked', tag: '🔒 قريباً' },
            { title: 'Unit 4', subtitle: 'الوحدة الرابعة', icon: '📕', destType: 'sub_unit_folder', link: './unit-4/index.html', status: 'locked', tag: '🔒 قريباً' },
            { title: 'Unit 5', subtitle: 'الوحدة الخامسة', icon: '📓', destType: 'sub_unit_folder', link: './unit-5/index.html', status: 'locked', tag: '🔒 قريباً' },
            { title: 'Unit 6', subtitle: 'الوحدة السادسة', icon: '📔', destType: 'sub_unit_folder', link: './unit-6/index.html', status: 'locked', tag: '🔒 قريباً' }
        ];
    }
    else if (preset === 'unit_index' || (preset === 'index_hub' && state.indexType === 'unit')) {
        state.archetype = 'unit_index';
        state.indexType = 'unit';
        state.indexScope = 'unit_hub';
        state.stage = state.stage || 'Prep_3';
        state.unit = state.unit || 'unit-1';
        state.title = `📘 ${state.stage} - ${state.unit} (الوحدة الأولى)`;
        state.filename = 'index.html';
        state.description = 'اختر الدرس لبدء التمارين والتطبيق';
        state.indexLayoutType = 'lessons';
        state.indexBackLink = '../index.html';
        state.indexBackText = `⬅️ العودة لوحدات ${getStageDisplayName(state.stage)}`;
        
        state.indexCards = [
            { title: 'Lesson 1 (Part 1)', subtitle: 'الكلمات والمفردات الرئيسية', icon: '📖', destType: 'same_folder_lesson', link: './lesson-1-part-1.html', status: 'active', tag: '🎯 متاح' },
            { title: 'Lesson 1 (Part 2)', subtitle: 'الأفعال والتعريفات واختبار الفهم', icon: '📝', destType: 'same_folder_lesson', link: './lesson-1-part-2.html', status: 'active', tag: '🎯 متاح' },
            { title: 'Lesson 2 (Grammar)', subtitle: 'القواعد والتراكيب اللغوية', icon: '💡', destType: 'same_folder_lesson', link: './lesson-2.html', status: 'active', tag: '🎯 متاح' },
            { title: 'Unit Assessment Quiz', subtitle: 'اختبار تدريبي وتقييم شامل', icon: '🏆', destType: 'same_folder_lesson', link: './quiz.html', status: 'active', tag: '🎯 متاح' }
        ];
    }
    else if (preset === 'index_hub') {
        return loadArchetypePreset('stage_index');
    }
    else if (preset === 'curriculum_tabs') {
        state.archetype = 'curriculum_tabs';
        state.stage = 'Prep_3';
        state.unit = 'unit-1';
        state.title = 'Lesson 1 (Part 2)';
        state.filename = 'lesson-1-part-2.html';
        state.description = 'دراسة الأفعال والتعريفات واختبار الفهم تفاعلياً';
        
        state.verbs = [
            { word: 'feel', meaning: 'يشعر', forms: 'felt / felt', tag: 'Present' },
            { word: 'find', meaning: 'يجد - يكتسب', forms: 'found / found', tag: 'Present' },
            { word: 'grow', meaning: 'ينمو - ينضج', forms: 'grew / grown', tag: 'Present' },
            { word: 'overcome', meaning: 'يتغلب - يتخطى', forms: 'overcame / overcome', tag: 'Present' },
            { word: 'make', meaning: 'يجعل - يصنع', forms: 'made / made', tag: 'Present' },
            { word: 'think', meaning: 'يعتقد', forms: 'thought / thought', tag: 'Present' }
        ];

        state.definitions = [
            { word: 'identity', definition: 'who a person is', meaning: 'الهوية', isCollocation: false },
            { word: 'value', definition: 'have a high opinion of someone or something', meaning: 'يقدر - يقيم', isCollocation: false },
            { word: 'background', definition: 'where someone comes from', meaning: 'خلفية اجتماعية', isCollocation: false },
            { word: 'solve a problem', definition: 'find an answer to a difficulty', meaning: 'يحل مشكلة', isCollocation: true },
            { word: 'build confidence', definition: 'gain belief in your abilities', meaning: 'يكتسب الثقة بالنفس', isCollocation: true }
        ];

        state.synonyms = [
            { word: 'strength', arabic: 'قوة', synonym: 'power', antonym: 'weakness', antonymArabic: 'ضعف' },
            { word: 'unique', arabic: 'فريد', synonym: 'special / rare', antonym: 'common / ordinary', antonymArabic: 'عادي' },
            { word: 'simple', arabic: 'بسيط', synonym: 'easy', antonym: 'difficult / complicated', antonymArabic: 'معقد' },
            { word: 'confident', arabic: 'واثق', synonym: 'sure / certain', antonym: 'unsure', antonymArabic: 'غير واثق' }
        ];

        state.affixes = [
            { affix: '-ity', function: 'تكوين الاسم من الصفة', examples: 'individuality / personality' },
            { affix: '-ness', function: 'تكوين الاسم الدال على الحالة', examples: 'weakness / kindness' },
            { affix: 'un-', function: 'إعطاء عكس المعنى للصفة', examples: 'unique -> common / unsure' }
        ];

        state.quiz = [
            {
                emoji: '🧠',
                question: 'What is the past tense of "feel"?',
                options: [
                    { text: 'felt', isCorrect: true },
                    { text: 'feeled', isCorrect: false },
                    { text: 'feeling', isCorrect: false }
                ],
                correctMsg: 'صحيح! التصريف الثاني لـ feel هو felt (+10)',
                wrongMsg: 'حاول مجدداً'
            },
            {
                emoji: '⚖️',
                question: 'The synonym of "unique" is _______:',
                options: [
                    { text: 'special / rare', isCorrect: true },
                    { text: 'common', isCorrect: false },
                    { text: 'ordinary', isCorrect: false }
                ],
                correctMsg: 'صحيح! Unique تعني فريد أو مميز (+10)',
                wrongMsg: 'راجع جدول المرادفات'
            }
        ];
    } 
    else if (preset === 'flashcards_dialogue') {
        state.archetype = 'flashcards_dialogue';
        state.stage = 'Course';
        state.unit = 'session-2';
        state.title = 'Jobs & Daily Expressions';
        state.filename = 'session-2.html';
        state.description = 'مفردات الوظائف والتعبيرات الحوارية اليومية';
        
        state.flashcards = [
            { front: 'Job / Work', back: 'عمل / وظيفة', category: 'vocab' },
            { front: 'Teacher / Student', back: 'معلم / طالب', category: 'vocab' },
            { front: 'Engineer / Doctor', back: 'مهندس / طبيب', category: 'vocab' },
            { front: 'What do you do?', back: 'ما هي مهنتك؟', category: 'sentence' },
            { front: 'I am an English teacher.', back: 'أنا معلم لغة إنجليزية.', category: 'sentence' },
            { front: 'Where do you work?', back: 'أين تعمل؟', category: 'sentence' }
        ];

        state.dialogueTitle = 'محادثة التعارف والعمل (Job Interview Dialogue)';
        state.dialogueLines = [
            { speaker: 'Omar', english: 'Hello! What do you do?', arabic: 'أهلاً! ما هي وظيفتك؟' },
            { speaker: 'Hassan', english: 'I am a software engineer at a tech company.', arabic: 'أنا مهندس برمجيات في شركة تكنولوجيا.' },
            { speaker: 'Omar', english: 'That is great! How long have you worked there?', arabic: 'رائع! منذ متى وأنت تعمل هناك؟' },
            { speaker: 'Hassan', english: 'For about three years. I really enjoy it.', arabic: 'منذ حوالي ثلاث سنوات. أنا أستمتع بذلك حقاً.' }
        ];

        state.homeworkTitle = 'التطبيق المنزلي (Homework Task)';
        state.homeworkDesc = 'اكتب 5 جمل عن وظيفتك أو مهنة تود العمل بها مستقبلاً وتدرب على قراءتها.';

        state.quiz = [
            {
                emoji: '💼',
                question: 'Which question is used to ask about someone\'s job?',
                options: [
                    { text: 'What do you do?', isCorrect: true },
                    { text: 'Where are you going?', isCorrect: false },
                    { text: 'How old are you?', isCorrect: false }
                ],
                correctMsg: 'صحيح! What do you do تسأل عن الوظيفة (+10)',
                wrongMsg: 'حاول مجدداً'
            }
        ];
    }
    else if (preset === 'quiz_only') {
        state.archetype = 'quiz_only';
        state.stage = 'Prep_3';
        state.unit = 'unit-1';
        state.title = 'Quick Assessment Quiz';
        state.filename = 'quiz-unit-1.html';
        state.description = 'اختبار تدريبي سريع ومباشر';

        state.quiz = [
            {
                emoji: '🚀',
                question: 'Choose the correct sentence:',
                options: [
                    { text: 'She overcomes her fears with confidence.', isCorrect: true },
                    { text: 'She overcome her fears with confidence.', isCorrect: false },
                    { text: 'She overcoming her fears with confidence.', isCorrect: false }
                ],
                correctMsg: 'إجابة صحيحة (+10)',
                wrongMsg: 'حاول مجدداً'
            },
            {
                emoji: '💡',
                question: 'What is the opposite of "simple"?',
                options: [
                    { text: 'complicated', isCorrect: true },
                    { text: 'easy', isCorrect: false },
                    { text: 'clear', isCorrect: false }
                ],
                correctMsg: 'إجابة صحيحة (+10)',
                wrongMsg: 'حاول مجدداً'
            }
        ];
    }
    else if (preset === 'storybook_reading') {
        state.archetype = 'storybook_reading';
        state.stage = 'Prep_3';
        state.unit = 'unit-1';
        state.title = 'The Secret of the Ancient Lighthouse';
        state.filename = 'reading-story.html';
        state.description = 'قصة القراءة التفاعلية: اكتشف سر المنارة القديمة مع القارئ الصوتي التلقائي';
        state.videoUrl = 'https://www.youtube.com/watch?v=kJQP7kiw5Fk';
        state.videoTitle = 'فيديو شرح ومناقشة أحداث القصة (Video Story Explainer)';

        state.storyPages = [
            {
                title: 'Chapter 1: The Mysterious Light',
                textEn: 'Late at night, Adam noticed a strange glowing beam coming from the abandoned lighthouse on the rocky cliff. Nobody had lived there for decades.',
                textAr: 'في وقت متأخر من الليل، لاحظ آدم شعاعاً متوهجاً غريباً ينبعث من المنارة المهجورة الواقعة على الجرف الصخري. لم يكن أحد قد عاش هناك منذ عقود.',
                imageUrl: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&auto=format&fit=crop&q=80',
                caption: 'The old lighthouse standing tall above the foggy sea',
                vocabNotes: 'abandoned (مهجور) • cliff (جرف صخري) • beam (شعاع ضوء)'
            },
            {
                title: 'Chapter 2: The Journey to the Island',
                textEn: 'Early the next morning, Adam and his loyal dog Buster took a small wooden boat. The sea was calm, but a mysterious fog surrounded the distant island.',
                textAr: 'في الصباح الباكر من اليوم التالي، استقل آدم وكلبه الوفي باستر قارباً خشبياً صغيراً. كان البحر هادئاً، لكن ضباباً غامضاً أحاط بالجزيرة البعيدة.',
                imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&auto=format&fit=crop&q=80',
                caption: 'Rowing across the quiet coastal waters towards the cliff',
                vocabNotes: 'loyal (وفيّ / مخلص) • fog (ضباب) • distant (بعيد)'
            },
            {
                title: 'Chapter 3: The Hidden Golden Compass',
                textEn: 'Inside the dusty lighthouse tower, Adam found an ancient wooden box. Inside lay a shiny golden compass pointing towards a hidden cave.',
                textAr: 'داخل برج المنارة المليء بالغبار، وجد آدم صندوقاً خشبياً قديماً. بداخله كانت بوصلة ذهبية لامعة تشير نحو كهف مخفي.',
                imageUrl: 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80',
                caption: 'The mysterious compass uncovering old maritime secrets',
                vocabNotes: 'dusty (مترب) • compass (بوصلة) • maritime (بحري)'
            },
            {
                title: 'Chapter 4: The Discovery',
                textEn: 'Following the compass, they discovered ancient historical maps of the coast. Adam realized that preserving local heritage is the greatest treasure.',
                textAr: 'باتباع البوصلة، اكتشفوا خرائط تاريخية قديمة للساحل. أدرك آدم أن الحفاظ على التراث المحلي هو أعظم كنز على الإطلاق.',
                imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80',
                caption: 'Preserving ancient maps and stories for future generations',
                vocabNotes: 'heritage (تراث) • treasure (كنز) • preserving (الحفاظ على)'
            }
        ];

        state.quiz = [
            {
                emoji: '💡',
                question: 'What did Adam notice coming from the lighthouse?',
                options: [
                    { text: 'A strange glowing beam of light', isCorrect: true },
                    { text: 'A loud noisy siren', isCorrect: false },
                    { text: 'A fleet of ships', isCorrect: false }
                ],
                correctMsg: 'ممتاز! لاحظ آدم شعاعاً متوهجاً غريباً (+10)',
                wrongMsg: 'راجع الفصل الأول من القصة'
            },
            {
                emoji: '🧭',
                question: 'What was inside the ancient wooden box?',
                options: [
                    { text: 'A shiny golden compass', isCorrect: true },
                    { text: 'Gold and silver coins', isCorrect: false },
                    { text: 'An old diary book', isCorrect: false }
                ],
                correctMsg: 'إجابة صحيحة! وجد بوصلة ذهبية لامعة (+10)',
                wrongMsg: 'راجع الفصل الثالث من القصة'
            },
            {
                emoji: '🏆',
                question: 'What did Adam realize was the greatest treasure?',
                options: [
                    { text: 'Preserving local heritage and history', isCorrect: true },
                    { text: 'Selling the golden compass', isCorrect: false },
                    { text: 'Buying a big fast boat', isCorrect: false }
                ],
                correctMsg: 'رائع! التراث والتاريخ هو الكنز الحقيقي (+10)',
                wrongMsg: 'حاول مجدداً'
            }
        ];
    }

    // Reset simulation counters
    simQuizIndex = 0;
    simQuizScore = 0;
    simQuizAnswered = false;
    simQuizSelectedOptIdx = null;
    simQuizCorrectCount = 0;
    simQuizWrongCount = 0;
    simQuizCompleted = false;
    simStoryCurrentPage = 0;
    simStoryIsPlaying = false;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }

    if (state.archetype === 'curriculum_tabs') {
        currentEditorPane = 'verbs';
        currentSimTab = 'verbs';
    } else if (state.archetype === 'flashcards_dialogue') {
        currentEditorPane = 'flashcards';
        currentSimTab = 'flashcards';
    } else if (state.archetype === 'quiz_only') {
        currentEditorPane = 'quiz';
        currentSimTab = 'quiz';
    } else if (state.archetype === 'storybook_reading') {
        currentEditorPane = 'story_pages';
        currentSimTab = 'story_pages';
    } else if (state.archetype === 'index_hub') {
        currentEditorPane = 'index_hub';
        currentSimTab = 'index_hub';
    }

    if (typeof applyStateToUI === 'function') applyStateToUI();
    if (typeof setArchetypeUIState === 'function') setArchetypeUIState(state.archetype);
    if (typeof renderEditorNavigation === 'function') renderEditorNavigation();
    if (typeof triggerLiveUpdate === 'function') triggerLiveUpdate();
    saveDraft();
}

// ==========================================
// Index Hub Structural Presets
// ==========================================
function generateSixUnitsPreset() {
    if (typeof playSound === 'function') playSound('click');
    state.archetype = 'stage_index';
    state.indexType = 'stage';
    state.indexScope = 'stage_hub';
    state.unit = '';
    state.filename = 'index.html';
    state.title = `📚 ${getStageDisplayName(state.stage)}`;
    state.description = 'Select a unit to explore lessons, flashcards, and quizzes';
    state.indexLayoutType = 'units';
    state.indexBackLink = '../index.html';
    state.indexBackText = '⬅️ Back to Main Menu';

    const icons = ['📘', '📗', '📙', '📕', '📓', '📔'];
    state.indexCards = [];
    for (let i = 1; i <= 6; i++) {
        state.indexCards.push({
            title: `Unit ${i}`,
            subtitle: `Stage curriculum unit ${i}`,
            icon: icons[(i - 1) % icons.length],
            destType: 'sub_unit_folder',
            link: `./unit-${i}/index.html`,
            status: i === 1 ? 'active' : 'locked',
            tag: i === 1 ? '🎯 Available' : '🔒 Coming Soon'
        });
    }
    if (typeof applyStateToUI === 'function') applyStateToUI();
    if (typeof showAdminToast === 'function') showAdminToast("🪄 6 standard stage units generated");
}

function generateLessonsPreset() {
    if (typeof playSound === 'function') playSound('click');
    state.archetype = 'unit_index';
    state.indexType = 'unit';
    state.indexScope = 'unit_hub';
    state.unit = state.unit || 'unit-1';
    state.filename = 'index.html';
    state.title = `📘 ${state.stage || 'Prep 3'} - ${state.unit || 'Unit 1'}`;
    state.description = 'Select a lesson to begin interactive exercises and tasks';
    state.indexLayoutType = 'lessons';
    state.indexBackLink = '../index.html';
    state.indexBackText = `⬅️ Back to ${getStageDisplayName(state.stage)} Units`;

    state.indexCards = [
        { title: 'Lesson 1 (Part 1)', subtitle: 'Key vocabulary, definitions & flashcards', icon: '📖', destType: 'same_folder_lesson', link: './lesson-1-part-1.html', status: 'active', tag: '🎯 Available' },
        { title: 'Lesson 1 (Part 2)', subtitle: 'Verbs table, prefixes/suffixes & quiz', icon: '📝', destType: 'same_folder_lesson', link: './lesson-1-part-2.html', status: 'active', tag: '🎯 Available' },
        { title: 'Lesson 2 (Grammar)', subtitle: 'Grammar structures and exercises', icon: '💡', destType: 'same_folder_lesson', link: './lesson-2.html', status: 'active', tag: '🎯 Available' },
        { title: 'Unit Assessment Quiz', subtitle: 'Comprehensive unit evaluation test', icon: '🏆', destType: 'same_folder_lesson', link: './quiz.html', status: 'active', tag: '🎯 Available' }
    ];
    if (typeof applyStateToUI === 'function') applyStateToUI();
    if (typeof showAdminToast === 'function') showAdminToast("🪄 Standard unit lesson cards generated");
}

function generateCoursesPreset() {
    if (typeof playSound === 'function') playSound('click');
    state.indexLayoutType = 'courses';
    state.indexCards = [
        { title: 'Session 1: Foundations & Greetings', subtitle: 'Everyday speaking essentials & greetings', icon: '👋', destType: 'same_folder_lesson', link: './session-1.html', status: 'active', tag: '🎯 Available' },
        { title: 'Session 2: Jobs & Daily Expressions', subtitle: 'Workplace vocabulary & conversational idioms', icon: '💼', destType: 'same_folder_lesson', link: './session-2.html', status: 'active', tag: '🎯 Available' },
        { title: 'Session 3: Travel & Shopping', subtitle: 'Travel inquiries, ordering, & shopping', icon: '✈️', destType: 'same_folder_lesson', link: './session-3.html', status: 'locked', tag: '🔒 Coming Soon' },
        { title: 'Session 4: Fluency & Dialogue Mastery', subtitle: 'Advanced discourse & speech flow', icon: '🗣️', destType: 'same_folder_lesson', link: './session-4.html', status: 'locked', tag: '🔒 Coming Soon' }
    ];
    if (typeof applyStateToUI === 'function') applyStateToUI();
    if (typeof showAdminToast === 'function') showAdminToast("🪄 Conversation course sessions generated");
}

