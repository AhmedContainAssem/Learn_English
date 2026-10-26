# الدروس المستفادة والقرارات المعمارية (Lessons Learned & Decisions)

توثيق تفصيلي للقرارات التقنية والتصميمية، الأخطاء التي تم تلافيها، وأسباب اختيار الحلول الحالية لضمان استمرارية التطوير بجودة واحترافية.

---

## 1. مشكلة النوافذ المنبثقة الافتراضية (Native Popups vs. In-Page Modals)

### 🔴 المشكلة والخطأ السابق:
- كان استوديو المعلم يعتمد على دوال المتصفح الأساسية `window.prompt()` و `window.alert()` في تعيين وتغيير رمز المرور الخاص بالمعلم.
- في بيئات الـ iFrames والمنصات الحديثة، يقوم المتصفح تلقائياً بحظر نوافذ `prompt()` أو تجاهلها لدواعي الأمان وتجربة المستخدم، مما أدى إلى:
  - عدم استجابة زر "تغيير رمز المرور".
  - ظهور ثغرات في استقرار شاشة القفل وتجاوز التحقق.

### 🟢 القرار والحل المطبق:
- **استبدال كامل بـ In-Page Custom Modals**: تم بناء واجهة قفل وتغيير رمز مرور مدمجة في شجرة الـ DOM (HTML + CSS) مع حقول إدخال واضحة (الرمز القديم، الرمز الجديد، تأكيد الرمز) ورسائل تحقق فورية باللونين الأخضر والأحمر، وتفعيل زر `Enter` لسهولة الاستخدام، واستخدام إشعارات عائمة (Toast notifications) لتقديم التغذية الراجعة دون مقاطعة التفاعل.
- **إدارة جلسة آمنة ومستقرة**: فحص حالة تسجيل الدخول عبر `sessionStorage` مع توفير زر "🔒 قفل اللوحة" الصريح لإلغاء الجلسة فوراً عند الانتهاء.

---

## 2. محرك بطاقات التقليب التفاعلية ثلاثية الأبعاد (3D Flashcard Flip Engine)

### 🔴 المشكلة والخطأ السابق:
- كان المحاكي المباشر يعتمد على عنصر مسطح يغير محتواه أو يعتمد على كلاسات غير متطابقة بين المحاكي وملفات CSS في الدروس المولدة (`.card-inner` مقابل `.card-face`)، مما جعل النقر على البطاقة لا ينتج عنه حركة الدوران الفيزيائية ثلاثية الأبعاد.

### 🟢 القرار والحل المطبق:
- **بناء هيكلية 3D Perspective موحدة**:
  - اعتماد الحاوية ذات العمق البصري `perspective: 1000px;` والعنصر الداخلي بتقنية `transform-style: preserve-3d;` مع توجيه الدوران بزاوية 180 درجة `rotateY(180deg)`.
  - دمج وجهين مستقلين (`.card-front` و `.card-back`) مع خاصية `backface-visibility: hidden;`.
  - توحيد كلاسات CSS في `assets/css/main.css` واستوديو المعلم والصفحات المولدة لضمان عمل البطاقات بانسيابية كاملة في أي مكان.
  - إضافة أزرار نطق صوتية مباشرة لكل بطاقة للربط بين المعنى البصري والنطق الصحيح.

---

## 3. خصوصية لوحة المعلم وفصلها عن الطلاب (Discreet Teacher Access)

### 🔴 المشكلة والخطأ السابق:
- كان هناك زر ضخم وملون في منتصف الصفحة الرئيسية لبطاقة المعلم يشير إلى "لوحة المعلم"، مما يلفت انتباه الطلاب ويشجعهم على محاولة فتحه.

### 🟢 القرار والحل المطبق:
- إزالة الزر الدعائي البارز من واجهة الطالب.
- استبداله بأيقونة إعدادات هادئة وصغيرة (`⚙️`) في الزاوية العلوية لبطاقة المعلم بشفافية منخفضة، تتيح للمعلم الدخول بسهولة دون إثارة انتباه المتعلمين، مع الحماية الكاملة برمز المرور.

---

## 4. تعميم وتجريد بنية الدروس (Generic Curriculum Architecture)

### 🔴 المشكلة والخطأ السابق:
- كتابة نصوص ثابتة تخص مرحلة معينة فقط (مثل حصر النموذج في الصف الثالث الإعدادي).

### 🟢 القرار والحل المطبق:
- جعل لوحة الاستوديو عامة بالكامل (Generic)، تدعم أي مرحلة دراسية (إعدادي، ثانوي، ابتدائي، كورسات تأسيس) مع إمكانية تحديد اسم المجلد والملف والعنوان والأقسام بحرية تامة من خلال 3 هياكل:
  1. `Curriculum Tabs` (التبويبات المنهجية الخماسية).
  2. `Flashcards & Dialogue` (البطاقات التفاعلية والمحادثة).
  3. `Direct Quiz` (الاختبار المباشر المتعدد).

---

## 5. استقلالية وأمان النشر المباشر عبر GitHub (Jamstack Direct Publishing)

### 🔴 التحدي:
- كيف ينشئ المعلم صفحات HTML حقيقية وتُضاف للموقع المفتوح دون الحاجة إلى خادم backend وسيط أو مطور برمجيات؟

### 🟢 القرار والحل المطبق:
- استخدام **GitHub REST API** مباشرة من المتصفح عبر رمز وصول شخصي (Personal Access Token) يُخزن في المتصفح فقط (`localStorage`).
- توليد شفرة الصفحة المستقلة بالكامل متضمنة محرك الصوت والاختبارات التفاعلية، ورفعها بنقرة زر واحدة.
- توفير زر تنزيل احتياطي للملف بصيغة HTML يعمل بدون إنترنت في حال رغب المعلم في التخزين اليدوي.

---

## 6. تفكيك الملفات الضخمة والتحول للهيكلية المعيارية (Modular Architecture vs. God Files)

### 🔴 المشكلة والخطأ السابق:
- مع تراكم الميزات السريعة في صفحة استوديو إعداد الدروس (`admin/index.html`)، تحول الملف إلى ما يُعرف برمجياً بـ **"God File"** (ملف يتجاوز 2300 سطر)، يجمع بين عناصر الـ HTML، وأكواد الـ CSS في وسم `<style>` ضخم، ومنطق JavaScript كامل لمحركات القوالب والمحاكي وواجهة GitHub في وسم `<script>` واحد.
- هذا التكدس جعل الملف:
  - صعب الصيانة والقراءة.
  - مخترقاً لمبادئ هندسة البرمجيات النظيفة (Single Responsibility Principle & Separation of Concerns).
  - يزيد من احتمالية حدوث أخطاء غير متوقعة عند تعديل أي دالة.

### 🟢 القرار والحل المطبق:
- **تفكيك استوديو إعداد الدروس إلى وحدات نموذجية ومستقلة (Modular Separation)**:
  1. `admin/css/admin.css`: ملف أنماط وتنسيقات مخصص لواجهة المعلم والمحاكي والبطاقات ثلاثية الأبعاد.
  2. `admin/js/state.js`: إدارة الحالة العامة (State)، النماذج المسبقة (Presets)، إدارة الأمان والتحقق من رمز المرور، ونظام الإشعارات العائمة.
  3. `admin/js/editor-ui.js`: بناء حقول الإدخال، التنقل بين التبويبات، وعمليات الإضافة والحذف والتعديل (CRUD) لكافة العناصر.
  4. `admin/js/preview.js`: محرك المحاكاة المباشرة لتجربة الطالب في الوقت الفعلي.
  5. `admin/js/generators.js`: محرك توليد أكواد الـ HTML المستقلة، قوالب الدروس، ونظام التصدير والتحميل.
  6. `admin/js/github.js`: تكامل النشر المباشر عبر واجهة GitHub REST API وسجل العمليات.
  7. `admin/index.html`: أصبح ملف HTML نظيف ودلالي (Semantic HTML) بنسبة 100% بدون أي أكواد CSS أو JS مدمجة عشوائياً.

---

## 7. توضيح معمارية حفظ البيانات ومسارات الدروس (Lesson Data Storage Architecture)

### 🔴 التساؤل واللبس:
- وجود ملفات تخص الصف الثالث الإعدادي فقط داخل مجلد `assets/js/data/` بينما توجد باقي الدروس داخل مجلدات المراحل (`Grade_4`, `Prep_3`, ...).

### 🟢 التوضيح والمعمارية المعتمدة:
- **نظام الدروس المستقلة (Self-Contained Lesson Documents)**: 
  - المنصة مصممة على معمارية الويب الثابت (Static Jamstack)، حيث كل درس عبارة عن صفحة HTML قائمة بذاتها ومستقلة تشتمل على محتواها ومحرك الصوت الخاص بها لتعمل مباشرة عبر GitHub Pages أو محلياً دون الحاجة لقاعدة بيانات خارجية.
  - كان مجلد `assets/js/data/` تجربة أولية لربط البيانات عبر ملفات JS خارجية قبل اعتماد المحرك الحالي القائم على توليد صفحات HTML كاملة وجاهزة للعمل الفوري من خلال استوديو المعلم.
  - الدروس الفعلية المنشورة لجميع المراحل تخزن بشكل طبيعي ومنظم داخل مجلدات المراحل المخصصة لها (`Grade_4/`, `Prep_3/`, `Course/` إلخ).

---

## 8. مبدأ الوراثة وتجنب تكرار الكود (Pure CSS & JS Inheritance - DRY Principle)

### 🔴 المشكلة والخطأ السابق:
- تكرار تعريف كلاسات الأزرار والبطاقات والتبويبات في ملف `admin.css` بدلاً من وراثتها مباشرة من `main.css`.
- تكرار دوال النطق الصوتي وتقليب البطاقات في ملفات الجافاسكريبت الفرعية بدلاً من استدعاء الدوال المشتركة المركزية في `assets/js/audio.js` و `assets/js/tabs.js`.

### 🟢 القرار والحل المطبق:
- **وراثة تامة لملفات التنسيق الأساسية**:
  - يعتمد `admin.css` فقط على الفروقات الخاصة باستوديو المعلم (Delta Styles: حقول الإدخال، شاشات القفل، وسجل GitHub)، بينما يرث جميع الأنماط العامة (الألوان، المتغيرات، الخطوط، الأزرار `.action-btn`، والبطاقات التفاعلية `.card` و `.flip-card`) مباشرة من `assets/css/style.css`.
- **الاعتماد على الدوال المركزية المشتركة (DRY)**:
  - استخدام `speakText()` من `audio.js` في جميع أرجاء الاستوديو والمحاكي.
  - استخدام `flipCard()` من `tabs.js` للتفاعل الحركي ثلاثي الأبعاد.
  - ربط الدروس المولدة بمحرك الاختبارات المركزي `quiz-engine.js` لتقليل حجم الصفحات وسهولة تحديث المنطق البرمجي من مكان واحد.

---

## 9. أمان رمز المرور ومنع التسريب (Zero-Leak Passcode Management)

### 🔴 المشكلة والخطأ السابق:
- وجود قيمة رمز مرور افتراضية صريحة وثابتة في الشيفرة المصدرية ("2025") مما قد يمكن الطلاب أو أي مستخدم من الاطلاع عليها في المتصفح أو في المستودع.

### 🟢 القرار والحل المطبق:
- **حذف أي رمز مرور ثابت من الكود والواجهة**:
  - إزالة أي نصوص أو تلميحات أو قيم افتراضية مكشوفة في الشفرة البرمجية.
- **نظام التهيئة الأولية للمرة الأولى (First-Time Setup Flow)**:
  - عند زيارة المعلم للاستوديو لأول مرة وعدم وجود رمز في متصفحه، تفتح شاشة آمنة مخصصة لتعيين رمزه السري الخاص مع حقل تأكيد، ويتم حفظ الرمز في `localStorage` الخاص بمتصفح المعلم فقط.
- **تسجيل الدخول والتغيير الآمن**:
  - تطلب شاشة الدخول الرمز دون إعطاء أي تلميحات، مع إمكانية تحديث الرمز في أي وقت بعد التحقق من الرمز السابق.

---

## 10. توحيد معمارية وهيكلة الدروس عبر جميع الصفوف والمراحل (Unified Lesson Architecture)

### 🔴 المشكلة والدافع:
- كان هناك تفاوت في معمارية الدروس بين الصفوف؛ حيث كانت بعض دروس الصف الثالث الإعدادي تعتمد على استدعاء ملفات جافاسكريبت خارجية من مجلد `assets/js/data/`، بينما تعتمد باقي الدروس في الصفوف الأخرى على تضمين كائن البيانات مباشرة داخل ملف الـ HTML (`window.lessonData`) مع حمولة استوديو المعلم (`#studio-payload`).
- هذا التفاوت كان يصعب من عمليات الصيانة، التعديل، والمزامنة السلسة مع استوديو إعداد الدروس (Admin Studio).

### 🟢 القرار والحل المطبق:
- **اعتماد وتعميم المعمارية الموحدة ذاتية الاحتواء (100% Self-Contained Architecture)** على جميع الصفوف والمراحل بلا استثناء:
  1. **الترويسة الموحدة (Standard Header)**: شارة المرحلة الدراسية، اسم المعلم وصورته، شعار المنصة، ومسار التنقل (Breadcrumb).
  2. **نظام التنسيق الموحد**: استدعاء ملف `style.css` المركزي للاستفادة من كامل منظومة الألوان والبطاقات والأزرار الموحدة.
  3. **استقلالية البيانات وحفظها الذاتي**: تضمين بيانات الأسئلة والكلمات مباشرة في كائن `window.lessonData` داخل ملف الـ HTML، مما يجعل كل صفحة درس مستقلة تماماً وقابلة للتشغيل المباشر دون تبعيات خارجية معقدة.
  4. **عقد الاستوديو ثنائي الاتجاه (Lossless Studio Roundtrip)**: تضمين وسم `<script id="studio-payload" type="application/json">` في كافة الدروس لضمان إمكانية فتح أي درس وتعديله وإعادة حفظه بنقرة واحدة من استوديو المعلم دون فقدان أي بيانات.
  5. **استدعاء المكتبات المشتركة فقط**: ربط الدروس بالملفات القياسية الثابتة (`audio.js`, `tabs.js`, `quiz-engine.js`, `ui.js`, `main.js`).

---

## 11. الترقية الشاملة لمعمارية CSS المتداخلة وتجربة الموبايل الانسيابية (Native CSS Nesting & Fluid Mobile Experience)

### 🔴 المشكلة والدافع:
- الاعتماد على استعلامات الوسائط التقليدية الثابتة (Rigid Media Queries) كان يسبب قفزات غير متناسقة في الأحجام والتخطيط عند فتح المنصة على شاشات الهواتف المختلفة (مثل 360px مقابل 390px أو 428px).
- تشتت القواعد البرمجية وحالات العناصر في أماكن متعددة داخل ملفات الـ CSS وصعوبة تتبعها.

### 🟢 القرار والحل المطبق:
1. **الترقية إلى معمارية التداخل القياسية الحديثة (Native CSS Nesting `&`)**:
   - دمج جميع الحالات التفاعلية (`&:hover`, `&:active`, `&:focus-visible`)، والحالات المخصصة (`&.active`, `&.locked`, `&.flipped`)، والعناصر الفرعية داخل المحدد الرئيسي مباشرة بواسطة رمز `&`.
2. **الخطوط والأبعاد الانسيابية المرنة (Fluid `clamp()` System)**:
   - استبدال الأحجام الثابتة بدوال `clamp(min, val, max)` للعناوين، الهوامش، وتباعدات البطاقات، مما يجعل العناصر تكبر وتصغر بنعومة متناهية تناسب كل بكسل في أي هاتف أو تابلت.
3. **الشبكات الذكية بدون تجاوز أفقي (Zero-Overflow Auto-Fit Grids)**:
   - استخدام `repeat(auto-fit, minmax(min(100%, 280px), 1fr))` لمنع أي انكسار أو خروج للعناصر خارج الشاشة على الهواتف الصغيرة.
4. **أزرار ولمس متوافقة مع معايير الهواتف المحمولة (Touch-First UX)**:
   - ضبط الحد الأدنى لمساحة النقر لأزرار الصوت والخيارات والتبويبات على 44px-52px مع `touch-action: manipulation` وإلغاء وميض النقر، وجعل شريط التبويبات يدعم السحب الأفقي الناعم على الشاشات الضيقة.

---

## 12. Golden Reference Lesson Archetype & Mobile-First Inheritance

### 🔴 Problem & Architectural Deviation:
When authoring a secondary grade lesson (such as `Sec_2/unit-1/lesson-1-part-2.html`), architectural deviations occurred relative to the proven Golden Reference template (`Sec_1/unit-1/lesson-1.html`):
1. **Ad-hoc Static Tables (`<table>`)**: Raw HTML data tables with static pixel column widths caused horizontal viewport overflow (`horizontal scroll bug`) on smartphones below 400px.
2. **Missing Direct CSS Linkage in `<head>`**: Only referencing `style.css` without directly including `curriculum.css`, `storybook.css`, and `quiz.css` led to delayed rendering or un-styled UI states in mobile webviews when nested `@import` chains failed.
3. **DOM & Engine Class Divergence**: Inconsistent ID naming and missing standard container wrappers (`.quiz-container-card`, `.quiz-question-box`, etc.) broke binding with singleton engines (`QuizEngine` and `StoryEngine`).

### 🟢 Solution & Permanent Directives:
1. **Strict Golden Reference Conformance (`Sec_1/unit-1/lesson-1.html`)**:
   - Never write lesson HTML scaffolding from scratch. Always inherit the validated semantic structure from the Golden Reference.
2. **Mobile Zero-Overflow Rule (Cards Over Tables)**:
   - Forbid raw HTML tables in vocabulary and curriculum presentations. Always use responsive `.card` and `.details-box` components inside `class="cards-grid grid-cards"` with `repeat(auto-fit, minmax(min(100%, 280px), 1fr))`, ensuring flawless wrapping on screens as narrow as 320px.
3. **Direct Head CSS Inclusions**:
   - Always link `curriculum.css`, `storybook.css`, and `quiz.css` directly alongside `style.css` in `<head>` for immediate, zero-latency painting.
4. **Strict Engine DOM Contract Parity**:
   - Provide the exact DOM IDs required by `QuizEngine` (`#question-box`, `#options-box`, `#feedback-box`, `#score-display`, `#current-question-num`, `#total-questions-num`, `#next-btn`, `#retry-btn`) and `StoryEngine` (`#storyArtworkImg`, `#storyTitle`, `#storyText`, `#storyTranslation`, `#storyVocab`, `#storytellerBtn`, `#storyPrevBtn`, `#storyNextBtn`).
5. **Interactive Audio Pronunciation**:
   - Provide `speakText()` and interactive `.audio-btn` hooks on all vocabulary, definitions, and collocations cards.

---

## 13. Strict Zero-Purple Color Architecture & Visual Harmonization

### 🔴 Problem & Context:
A legacy magenta/purple accent color (`#e086ff`, `#a855f7`, `rgba(224, 134, 255, ...)`) was inconsistently used across design tokens, retry buttons, storyteller buttons, admin badges, and SVG documentation diagrams. This created high optical fatigue, poor contrast on certain dark surfaces, and stylistic clutter.

### 🟢 Solution & Permanent Directives:
1. **Total Eradication of Purple/Magenta**:
   - Replaced all legacy purple and magenta tokens across the entire codebase with clean, high-legibility Sky Blue (`#38bdf8`) and Cyan (`#00f3ff`).
   - Standardized `--accent-secondary` to `#38bdf8` (Sky Blue) which pairs with the primary cyan (`#00f3ff`) and emerald green (`#00ff9d`).
2. **Permanent System Prohibition**:
   - Strictly forbidden from generating or introducing any shades of purple, violet, magenta, lavender, or fuchsia across stylesheets, SVGs, HTML attributes, or logging styles.

---

## 14. Pure CSS Ambient Background Architecture (Zero Raster Payload)

### 🔴 Problem & Context:
The global layout previously relied on a 400KB raster image asset (`blur-bg.png`) attached to the `body` background. This introduced unnecessary network bandwidth consumption on mobile networks, potential rendering flash while the image loaded, and occasional browser repaint overhead on scroll.

### 🟢 Solution & Permanent Directives:
1. **Zero-Byte Raster Payload**:
   - Removed `blur-bg.png` entirely from the project.
2. **Multi-Layered Pure CSS Ambient Canvas**:
   - Implemented a GPU-accelerated CSS composition inside `base.css`:
     - Subtle ambient cyan (`rgba(0, 243, 255, 0.08)`) and sky blue (`rgba(56, 189, 248, 0.06)`) radial flares.
     - Bottom organic emerald glow (`rgba(0, 255, 157, 0.05)`).
     - Crisp 36px micro-grid dot matrix (`radial-gradient(rgba(0, 243, 255, 0.07) 1px, transparent 1px)`) for elegant textural depth without pixelation.
     - Smooth midnight slate vignette gradient (`linear-gradient(180deg, #070a12 0%, #0b0f19 30%, #0d1322 70%, #070a12 100%)`).
   - Results in instant zero-latency rendering, perfectly crisp visuals on any display resolution or mobile viewport, and zero network overhead.

---

## 15. Seamless Canvas Architecture (Elimination of Outer "Giant Card" Anti-Pattern)

### 🔴 Problem & Context:
The global `.container` previously applied a dark translucent background (`rgba(19, 27, 46, 0.88)`), a 1px border (`var(--border-color)`), and an oversized box-shadow. On large monitors, this wrapped the entire page in a single giant floating box, causing the "nested cards" anti-pattern (cards inside a giant card) and restricting the ambient background canvas to a narrow framing margin.

### 🟢 Solution & Permanent Directives:
1. **True Structural Layout Container**:
   - Refactored `.container` to act as an unbordered, non-enclosed layout wrapper (`max-width: 1140px; margin: 0 auto;`).
2. **Direct Surface Elevation**:
   - The teacher avatar, title, and brand elements float freely as a natural Hero header directly against the ambient micro-grid canvas.
   - Stage headers act as clean navigational landmarks with subtle dividers.
   - Individual grade cards (`.grade-card`, `.unit-card`) serve as the sole interactive elevated surfaces with frosted glass backdrop blur and hover micro-interactions.
3. **Backward Compatibility**:
   - Added `.card-container` utility class for any isolated modals or authentication dialogs requiring an explicit card wrapper.

---

## 16. Visual Hierarchy & Status Contrast (Spotlight Card & Graceful Locked States)

### 🔴 Problem & Context:
On the home portal, cards marked "قريباً" (Coming Soon) had the identical border, background, and hover glow as active cards marked "متاح", forcing learners to read every badge text to find active content. Additionally, the Foundation Course was stretched into an awkward thin 100% bar above 3-column grids, and stage headers were plain floating cyan text on a hairline.

### 🟢 Solution & Permanent Directives:
1. **Active vs. Locked Visual Hierarchy**:
   - Active cards (`.grade-card.active-card`) boast high-contrast gradient glass, luminous cyan borders, elevated hover lifts, and glowing icon frames.
   - Locked cards (`.grade-card.locked` and `:has(.badge-locked)`) are gracefully subdued with `opacity: 0.62`, dashed slate borders, desaturated icons, and quiet, non-jumping hovers.
2. **Spotlight Banner for Single Courses**:
   - Transformed the Foundation Course into a dedicated `.featured-course-card` featuring topical tag pills, clear value proposition copy, an illuminated rocket icon box, and an action button ("دخول الكورس ←").
3. **Structured Stage Header Landmarks**:
   - Replaced flat floating lines with `.stage-header` landmarks containing an icon badge (`.stage-icon-badge`), dual-language headings, and real-time availability counters (`2 متاح • 4 قريباً`).

---

## 17. Universal Singleton & Static Bridge Architecture for Platform Engines

### 🔴 Problem & Context:
In `Sec_2/unit-1/lesson-1-3.html`, a script called `StoryEngine.init(window.lessonData.storyPages)` on `DOMContentLoaded`, and button elements called `StoryEngine.toggleAutoPlay()` and `StoryEngine.nextPage()`. Because `StoryEngine` is exported as an ES6 `class StoryEngine` whose primary instance is `window.storyEngine`, calling `.init()` directly on the constructor threw `Uncaught TypeError: StoryEngine.init is not a function`.

### 🟢 Solution & Permanent Directives:
1. **Universal Static Bridge Pattern on Engine Classes**:
   - Added static factory and bridge methods directly to `StoryEngine` (`StoryEngine.init`, `StoryEngine.loadPages`, `StoryEngine.prevPage`, `StoryEngine.nextPage`, `StoryEngine.toggleAutoPlay`, `StoryEngine.toggleStoryteller`, `StoryEngine.speakCurrentPage`).
   - Added static bridge methods directly to `QuizEngine` (`QuizEngine.init`, `QuizEngine.loadQuestions`, `QuizEngine.nextQuestion`, `QuizEngine.restartQuiz`, `QuizEngine.retryQuiz`).
2. **Standardized Window Helper Hooks**:
   - `story-engine.js` exports universal helper aliases (`changeStoryPage(dir)`, `toggleStoryteller()`, `speakCurrentStoryPage()`).
   - `quiz-engine.js` exports universal helper aliases (`nextQuestion()`, `restartQuiz()`, `retryQuiz()`).
3. **Dual Compatibility**:
   - Any lesson can now call either instance methods (`storyEngine.loadPages(...)`, `quizEngine.loadQuestions(...)`), global convenience helpers (`nextQuestion()`, `toggleStoryteller()`), OR static class calls (`StoryEngine.init(...)`, `QuizEngine.init(...)`) without throwing errors.





