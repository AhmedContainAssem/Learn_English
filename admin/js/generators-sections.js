/**
 * Lesson Studio HTML Body & Archetype Sections Generator (generators-sections.js)
 * Single Responsibility: Renders specific DOM components (Storybook 3D book, YouTube video cards, Archetype tabs).
 */

function renderGeneratedSlidesSection() {
    const slides = state.grammarSlides || [];
    const total = slides.length;
    if (total === 0) return '';
    return `
    <!-- Grammar Slides Presentation Container -->
    <div class="slide-presentation-container" id="grammarSlidesContainer">
        ${slides.map((s, idx) => `
        <div class="slide-frame ${idx === 0 ? '' : 'hide-in-slide-mode'}" id="grammar-slide-${idx + 1}">
            <div class="slide-graphic-wrapper" onclick="openSlideLightbox('${s.imageUrl || ''}', '${(s.title || `شريحة ${idx + 1}`).replace(/'/g, "\\'")}')" title="انقر لتكبير الشريحة 🔍">
                <img src="${s.imageUrl || ''}" alt="${escapeHTML(s.title || `شريحة ${idx + 1}`)}" class="slide-graphic-img" loading="${idx === 0 ? 'eager' : 'lazy'}">
                <button class="slide-zoom-badge" type="button">🔍 تكبير الشريحة</button>
            </div>
            <div class="slide-footer-bar">
                <span class="slide-footer-brand">✨ Easy Peasy Ya Englezeey</span>
                <span class="slide-footer-author">Mr. Ahmed Assem | شريحة ${idx + 1} من ${total}</span>
            </div>
        </div>`).join('')}
    </div>`;
}

function renderGeneratedStorybookSection() {
    const pages = state.storyPages || [];
    const firstPage = pages[0] || {};
    const total = pages.length;

    return `
    <!-- Storybook Reading Experience -->
    <div class="storybook-wrapper">
        <div class="storybook-book">
            <div class="book-spine-divider"></div>

            <!-- Right Page: Scene Artwork -->
            <div class="story-page-artwork">
                <div class="artwork-page-inner">
                    <div class="page-badge-artwork">
                        <span id="storyPageBadge">🖼️ Scene 1 of ${total}</span>
                    </div>
                    <div class="artwork-container">
                        <img id="storyArtworkImg" src="${firstPage.imageUrl || ''}" alt="Scene Artwork" class="${firstPage.imageUrl ? '' : 'hidden'}" onerror="this.classList.add('hidden');">
                    </div>
                    <div class="artwork-caption" id="storyCaption">${firstPage.caption || ''}</div>
                </div>

                <div class="story-page-meta">
                    <span>📖 Book Reader</span>
                    <span id="storyPageCounter">Page 1 / ${total}</span>
                </div>
            </div>

            <!-- Left Page: Story Passage -->
            <div class="story-page-content">
                <div>
                    <div class="story-header">
                        <h3 class="story-page-title" id="storyTitle">${firstPage.title || 'Chapter 1'}</h3>
                        <button type="button" class="audio-btn" onclick="speakCurrentStoryPage()" title="استمع للنطق">🔊</button>
                    </div>
                    <div class="story-paragraph" id="storyText">
                        ${firstPage.textEn || ''}
                    </div>
                </div>

                <div>
                    <div class="story-translation-box ${firstPage.textAr ? '' : 'hidden'}" id="storyTranslation">
                        <span class="translation-tag">💡 الترجمة:</span>
                        ${firstPage.textAr || ''}
                    </div>

                    <div class="story-vocab-chips ${firstPage.vocabNotes ? '' : 'hidden'}" id="storyVocab">
                        ${(firstPage.vocabNotes || '').split('•').map(chip => `<span class="vocab-chip">${chip.trim()}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>

        <!-- Navigation & Auto Storyteller Bar -->
        <div class="story-controls-bar">
            <button type="button" id="storyPrevBtn" onclick="changeStoryPage(-1)" class="action-btn secondary" disabled>
                ⬅️ الصفحة السابقة
            </button>

            <button type="button" id="storytellerBtn" onclick="toggleStoryteller()" class="storyteller-btn">
                ▶️ القارئ التلقائي (Auto Storyteller)
            </button>

            <div class="story-page-progress">
                <div class="progress-dots" id="storyProgressDots">
                    ${pages.map((_, i) => `<span class="dot ${i === 0 ? 'active' : ''}"></span>`).join('')}
                </div>
            </div>

            <button type="button" id="storyNextBtn" onclick="changeStoryPage(1)" class="action-btn secondary" ${total <= 1 ? 'disabled' : ''}>
                الصفحة التالية ➔
            </button>
        </div>
    </div>`;
}

function renderGeneratedVideoSection() {
    if (!state.videoUrl) return '';
    const embedUrl = typeof parseYouTubeEmbed === 'function' ? parseYouTubeEmbed(state.videoUrl) : state.videoUrl;
    return `
    <!-- Video Lesson Embed -->
    <div class="video-lesson-card">
        <div class="video-header-bar">
            <div class="video-lesson-title">
                🎥 ${state.videoTitle || 'فيديو شرح ومناقشة الدرس'}
            </div>
            <a href="${state.videoUrl}" target="_blank" rel="noopener noreferrer" class="action-btn secondary video-external-link">
                ↗️ فتح في YouTube
            </a>
        </div>
        <div class="video-responsive-wrapper">
            <iframe src="${embedUrl || state.videoUrl}" title="Video Lesson" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
        </div>
    </div>`;
}

function generateBodyByArchetype() {
    if (state.archetype === 'curriculum_tabs') {
        const hasSlides = (state.grammarSlides && state.grammarSlides.length > 0);
        const hasStory = (state.storyPages && state.storyPages.length > 0);
        const hasVideo = !!state.videoUrl;

        return `
        <!-- Tabs Navigation -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('verbs')">📌 الأفعال الشاذة</button>
            <button class="tab-btn" onclick="switchTab('definitions')">📚 التعريفات</button>
            <button class="tab-btn" onclick="switchTab('synonyms')">⚖️ المرادفات والمضاد</button>
            <button class="tab-btn" onclick="switchTab('affixes')">🔤 البوادئ واللواحق</button>
            ${hasSlides ? `<button class="tab-btn" onclick="switchTab('grammar')">⚡ قواعد وشرائح الشرح (${state.grammarSlides.length})</button>` : ''}
            ${hasStory ? `<button class="tab-btn" onclick="switchTab('reading')">📖 نص القراءة (${state.storyPages.length})</button>` : ''}
            ${hasVideo ? `<button class="tab-btn" onclick="switchTab('video')">🎥 فيديو الشرح</button>` : ''}
            <button class="tab-btn" onclick="switchTab('quiz')">🎯 كويز التحدي</button>
        </div>

        <!-- Tab 1: Verbs -->
        <div id="tab-verbs" class="tab-content active">
            <h3 class="section-heading">📌 قائمة الأفعال وتصريفاتها:</h3>
            <div class="cards-grid">
                ${state.verbs.map(v => `
                <div class="card verb-card">
                    <div class="card-header-row">
                        <strong class="word-en">${v.word}</strong>
                        <button type="button" class="audio-btn" onclick="speakText('${(v.word || '').replace(/'/g, "\\'")}')" title="استمع للنطق">🔊</button>
                    </div>
                    <div class="word-meaning">${v.meaning}</div>
                    <div class="word-forms-badge">التصريف: <span>${v.forms || ''}</span></div>
                </div>`).join('')}
            </div>
        </div>

        <!-- Tab 2: Definitions -->
        <div id="tab-definitions" class="tab-content">
            <h3 class="section-heading">📚 التعريفات والمتلازمات:</h3>
            <div class="definitions-list">
                ${state.definitions.map(d => `
                <div class="card definition-card">
                    <div class="definition-body">
                        <div class="word-group">
                            <span class="word-en">${d.word}</span>
                            <span class="word-ar-sub">(${d.meaning})</span>
                        </div>
                        <div class="definition-text">${d.definition}</div>
                    </div>
                    <button type="button" class="audio-btn" onclick="speakText('${(d.word || '').replace(/'/g, "\\'")}')" title="استمع للنطق">🔊</button>
                </div>`).join('')}
            </div>
        </div>

        <!-- Tab 3: Synonyms -->
        <div id="tab-synonyms" class="tab-content">
            <h3 class="section-heading">⚖️ المرادفات والمضاد (Synonyms & Antonyms):</h3>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>الكلمة (Word)</th>
                            <th>المعنى العربي</th>
                            <th>المرادف (Synonym)</th>
                            <th>المضاد (Antonym)</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.synonyms.map(s => `
                        <tr>
                            <td class="word-cell">${s.word}</td>
                            <td>${s.arabic}</td>
                            <td class="synonym-cell">${s.synonym}</td>
                            <td class="antonym-cell">${s.antonym}</td>
                        </tr>`).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Tab 4: Affixes -->
        <div id="tab-affixes" class="tab-content">
            <h3 class="section-heading">🔤 البوادئ واللواحق (Prefixes & Suffixes):</h3>
            <div class="cards-grid">
                ${state.affixes.map(a => `
                <div class="card affix-card">
                    <div class="affix-title">${a.affix}</div>
                    <div class="affix-function">${a.function}</div>
                    <div class="affix-examples">أمثلة: <span>${a.examples}</span></div>
                </div>`).join('')}
            </div>
        </div>

        ${hasSlides ? `
        <!-- Tab: Grammar Slides -->
        <div id="tab-grammar" class="tab-content">
            <h3 class="section-heading">⚡ شرائح وقواعد الدرس (${state.grammarSlides.length} شريحة):</h3>
            ${renderGeneratedSlidesSection()}
        </div>` : ''}

        ${hasStory ? `
        <!-- Tab 5: Reading Storybook -->
        <div id="tab-reading" class="tab-content">
            <h3 class="section-heading">📖 نص القراءة والقصة التفاعلية:</h3>
            ${renderGeneratedStorybookSection()}
        </div>` : ''}

        ${hasVideo ? `
        <!-- Tab 6: Video Lesson -->
        <div id="tab-video" class="tab-content">
            ${renderGeneratedVideoSection()}
        </div>` : ''}

        <!-- Tab 7: Quiz -->
        <div id="tab-quiz" class="tab-content">
            <div class="score-board">
                <span>السؤال: <span id="current-q">1</span> / <span id="total-q">${state.quiz.length}</span></span>
                <span>النقاط: <span id="score">0</span> 🌟</span>
            </div>

            <div class="question-card">
                <span class="emoji-display" id="emoji">${(state.quiz[0] && state.quiz[0].emoji) || '🎯'}</span>
                <div class="question-text" id="question">جاري تحميل السؤال...</div>
                <div class="options-grid" id="options"></div>
                <div class="feedback" id="feedback"></div>
            </div>

            <div class="quiz-controls">
                <button class="action-btn next-btn" id="next-btn" onclick="nextQuestion()">السؤال التالي ➔</button>
            </div>
        </div>`;
    } else if (state.archetype === 'flashcards_dialogue') {
        return `
        <!-- Flashcards Grid -->
        <div class="flashcards-section">
            <div class="section-header-row">
                <h3 class="section-heading">🎴 بطاقات المفردات (انقر للقلب):</h3>
                <span class="badge badge-active">Interactive Flashcards</span>
            </div>
            <div class="flashcards-grid">
                ${state.flashcards.map(f => `
                <div class="flip-card" onclick="this.classList.toggle('flipped'); if(typeof window.playSound==='function') window.playSound('flip');" title="انقر لقلب البطاقة">
                    <div class="card-face card-front">
                        <span class="word-en">${f.front || ''}</span>
                        <button type="button" class="audio-btn" onclick="event.stopPropagation(); speakText('${(f.front || '').replace(/'/g, "\\'")}')" title="استمع للنطق">🔊</button>
                    </div>
                    <div class="card-face card-back">
                        <span class="word-ar-back">${f.back || ''}</span>
                    </div>
                </div>`).join('')}
            </div>
        </div>

        <!-- Dialogue Section -->
        <div class="dialogue-section">
            <h3 class="section-heading">🗣️ ${state.dialogueTitle || 'محادثة الدرس'}</h3>
            <div class="dialogue-list">
                ${state.dialogueLines.map(l => `
                <div class="dialogue-box">
                    <div class="dialogue-content">
                        <div class="speaker-name">${l.speaker}:</div>
                        <div class="en-text">${l.english}</div>
                        <div class="arabic-text">${l.arabic}</div>
                    </div>
                    <button type="button" class="audio-btn" onclick="speakText('${(l.english || '').replace(/'/g, "\\'")}')" title="استمع للنطق">🔊</button>
                </div>`).join('')}
            </div>
        </div>

        ${state.homeworkTitle ? `
        <!-- Homework Box -->
        <div class="homework-box">
            <div class="homework-title">📝 ${state.homeworkTitle}</div>
            <div class="homework-desc">${state.homeworkDesc}</div>
        </div>` : ''}

        <!-- Quiz Section -->
        <div class="quiz-section">
            <h3 class="section-heading">🎯 الاختبار التفاعلي:</h3>
            <div class="score-board">
                <span>السؤال: <span id="current-q">1</span> / <span id="total-q">${state.quiz.length}</span></span>
                <span>النقاط: <span id="score">0</span> 🌟</span>
            </div>

            <div class="question-card">
                <span class="emoji-display" id="emoji">${(state.quiz[0] && state.quiz[0].emoji) || '🎯'}</span>
                <div class="question-text" id="question">جاري تحميل السؤال...</div>
                <div class="options-grid" id="options"></div>
                <div class="feedback" id="feedback"></div>
            </div>

            <div class="quiz-controls">
                <button class="action-btn next-btn" id="next-btn" onclick="nextQuestion()">السؤال التالي ➔</button>
            </div>
        </div>`;
    } else if (state.archetype === 'storybook_reading') {
        return `
        ${renderGeneratedStorybookSection()}
        ${renderGeneratedVideoSection()}

        ${state.quiz && state.quiz.length > 0 ? `
        <!-- Comprehension Quiz -->
        <div class="comprehension-quiz-section">
            <h3 class="section-heading">🎯 كويز فهم القصة (Comprehension Quiz):</h3>
            <div class="score-board">
                <span>السؤال: <span id="current-q">1</span> / <span id="total-q">${state.quiz.length}</span></span>
                <span>النقاط: <span id="score">0</span> 🌟</span>
            </div>

            <div class="question-card">
                <span class="emoji-display" id="emoji">${(state.quiz[0] && state.quiz[0].emoji) || '🎯'}</span>
                <div class="question-text" id="question">جاري تحميل السؤال...</div>
                <div class="options-grid" id="options"></div>
                <div class="feedback" id="feedback"></div>
            </div>

            <div class="quiz-controls">
                <button class="action-btn next-btn" id="next-btn" onclick="nextQuestion()">السؤال التالي ➔</button>
            </div>
        </div>` : ''}
        `;
    } else {
        // Direct Quiz Only
        return `
        <div class="score-board">
            <span>السؤال: <span id="current-q">1</span> / <span id="total-q">${state.quiz.length}</span></span>
            <span>النقاط: <span id="score">0</span> 🌟</span>
        </div>

        <div class="question-card">
            <span class="emoji-display" id="emoji">${(state.quiz[0] && state.quiz[0].emoji) || '🎯'}</span>
            <div class="question-text" id="question">جاري تحميل السؤال...</div>
            <div class="options-grid" id="options"></div>
            <div class="feedback" id="feedback"></div>
        </div>

        <div class="quiz-controls">
            <button class="action-btn next-btn" id="next-btn" onclick="nextQuestion()">السؤال التالي ➔</button>
        </div>`;
    }
}

