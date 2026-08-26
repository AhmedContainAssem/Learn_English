/**
 * Lesson Studio HTML & Template Generator Module (generators.js)
 * Pure Inheritance Architecture: Generates clean, standalone lesson & index HTML utilizing shared assets and engines.
 */

function getRelativeAssetsPrefix() {
    const hasStage = !!(state.stage && state.stage.trim());
    const hasUnit = !!(state.unit && state.unit.trim());

    if (hasStage && hasUnit) return '../../';
    if (hasStage || hasUnit) return '../';
    return './';
}

function parseYouTubeEmbed(url) {
    if (!url) return null;
    url = url.trim();
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|shorts\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length === 11) {
        return `https://www.youtube-nocookie.com/embed/${match[2]}`;
    }
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }
    return null;
}

function generateCompleteHTMLDocument() {
    const assetPrefix = getRelativeAssetsPrefix();

    if (state.archetype === 'index_hub' || state.archetype === 'stage_index' || state.archetype === 'unit_index') {
        return generateIndexHubHTML(assetPrefix);
    }

    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.title || 'Lesson'} | Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${assetPrefix}assets/css/style.css">
</head>
<body>

    <div class="container">
        <!-- Breadcrumb Navigation -->
        <div class="breadcrumb">
            <span>${state.stage || 'المرحلة الدراسية'}</span> ${state.unit ? `/ <span>${state.unit}</span>` : ''} / <span>${state.title || 'الدرس'}</span>
        </div>

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="${assetPrefix}my-photo-profile.png" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='${assetPrefix}my-photo-profile.png';">
            </div>
            <h1 class="teacher-title">Mr. Ahmed Assem</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            <div class="lesson-meta-badge">
                <span class="badge badge-active">${state.stage || 'الصف الدراسي'}${state.unit ? ' • ' + state.unit : ''}</span>
            </div>
            <h2 id="title" class="lesson-main-title">${state.title || 'عنوان الدرس'}</h2>
            <p id="description" class="lesson-desc">${state.description || ''}</p>
        </div>

        ${generateBodyByArchetype()}

        <!-- Bottom Return Controls -->
        <div class="nav-controls">
            <a href="./index.html" class="action-btn secondary" data-sound-click="click">⬅ العودة لقائمة دروس الوحدة</a>
        </div>
    </div>

    <!-- Data Injection -->
    <script>
        window.lessonData = {
            title: ${JSON.stringify(state.title || 'Lesson')},
            description: ${JSON.stringify(state.description || '')},
            videoUrl: ${JSON.stringify(state.videoUrl || '')},
            videoTitle: ${JSON.stringify(state.videoTitle || '')},
            storyPages: ${JSON.stringify(state.storyPages || [], null, 4)},
            questions: ${JSON.stringify(state.quiz || [], null, 4)}
        };
    </script>

    <!-- Framework & Shared Scripts -->
    <script src="${assetPrefix}assets/js/bidi.js"></script>
    <script src="${assetPrefix}assets/js/audio.js"></script>
    <script src="${assetPrefix}assets/js/tabs.js"></script>
    <script src="${assetPrefix}assets/js/story-engine.js"></script>
    <script src="${assetPrefix}assets/js/quiz-engine.js"></script>
    <script src="${assetPrefix}assets/js/ui.js"></script>
    <script src="${assetPrefix}assets/js/main.js"></script>

    <!-- Studio Data Payload for 100% Lossless Roundtrip Editing -->
    <script id="studio-payload" type="application/json">
${JSON.stringify(state, null, 2)}
    </script>
</body>
</html>`;
}

function generateIndexHubHTML(assetPrefix) {
    const cards = state.indexCards || [];
    const layout = state.indexLayoutType || 'units';
    const backLink = state.indexBackLink || '../index.html';
    const backText = state.indexBackText || '⬅️ العودة للقائمة الرئيسية';

    let cardsHTML = '';

    if (layout === 'lessons') {
        // Vertical lessons list
        cardsHTML = `
        <div class="lessons-list">
            ${cards.map(c => {
                if (c.status === 'active') {
                    return `
            <a href="${c.link || '#'}" class="lesson-card" data-sound-click="click">
                <div class="lesson-info">
                    <span class="lesson-icon">${c.icon || '📝'}</span>
                    <div>
                        <div class="lesson-title">${c.title}</div>
                        ${c.subtitle ? `<div class="lesson-subtitle">${c.subtitle}</div>` : ''}
                    </div>
                </div>
                <div class="lesson-action-badge">
                    <span class="badge badge-active">${c.tag || '🎯 متاح'}</span>
                    <span class="arrow-icon">⬅️</span>
                </div>
            </a>`;
                } else {
                    return `
            <div class="lesson-card locked">
                <div class="lesson-info">
                    <span class="lesson-icon">${c.icon || '📝'}</span>
                    <div>
                        <div class="lesson-title">${c.title}</div>
                        ${c.subtitle ? `<div class="lesson-subtitle">${c.subtitle}</div>` : ''}
                    </div>
                </div>
                <span class="badge badge-locked">${c.tag || '🔒 قريباً'}</span>
            </div>`;
                }
            }).join('\n')}
        </div>`;
    } else {
        // Grid layout (units / courses / custom)
        cardsHTML = `
        <div class="units-grid">
            ${cards.map(c => {
                if (c.status === 'active') {
                    return `
            <a href="${c.link || '#'}" class="unit-card active" data-sound-click="click">
                <span class="badge badge-active">${c.tag || '🎯 متاح'}</span>
                <span class="unit-icon">${c.icon || '📘'}</span>
                <span class="unit-name">${c.title}</span>
                <span class="unit-sub">${c.subtitle || ''}</span>
            </a>`;
                } else {
                    return `
            <div class="unit-card locked">
                <span class="badge badge-locked">${c.tag || '🔒 قريباً'}</span>
                <span class="unit-icon">${c.icon || '📘'}</span>
                <span class="unit-name">${c.title}</span>
                <span class="unit-sub">${c.subtitle || ''}</span>
            </div>`;
                }
            }).join('\n')}
        </div>`;
    }

    return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${state.title || 'Index'} - Mr. Ahmed Assem</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="${assetPrefix}assets/css/style.css">
</head>
<body class="index-page">

    <div class="container">
        ${backLink ? `
        <!-- Top Back Navigation -->
        <div class="page-actions">
            <a href="${backLink}" class="back-btn action-btn secondary" data-sound-click="click">${backText}</a>
        </div>` : ''}

        <!-- Teacher Profile Header -->
        <div class="teacher-profile-header">
            <div class="avatar-wrapper">
                <img src="${assetPrefix}my-photo-profile.png" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='${assetPrefix}my-photo-profile.png';">
            </div>
            <h1 class="header-title">${state.title || 'فهرس الوحدات والدروس'}</h1>
            <div class="slogan">✨ Easy Peasy Ya Englezeey ✨</div>
            ${state.description ? `<p class="subtitle">${state.description}</p>` : ''}
        </div>

        <!-- Navigation Cards -->
        ${cardsHTML}
    </div>

    <!-- Interactive Scripts -->
    <script src="${assetPrefix}assets/js/audio.js"></script>
    <script src="${assetPrefix}assets/js/ui.js"></script>
    <script src="${assetPrefix}assets/js/main.js"></script>

    <!-- Studio Data Payload for 100% Lossless Roundtrip Editing -->
    <script id="studio-payload" type="application/json">
${JSON.stringify(state, null, 2)}
    </script>
</body>
</html>`;
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
                <div>
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
        const hasStory = (state.storyPages && state.storyPages.length > 0);
        const hasVideo = !!state.videoUrl;

        return `
        <!-- Tabs Navigation -->
        <div class="tabs-container">
            <button class="tab-btn active" onclick="switchTab('verbs')">📌 الأفعال الشاذة</button>
            <button class="tab-btn" onclick="switchTab('definitions')">📚 التعريفات</button>
            <button class="tab-btn" onclick="switchTab('synonyms')">⚖️ المرادفات والمضاد</button>
            <button class="tab-btn" onclick="switchTab('affixes')">🔤 البوادئ واللواحق</button>
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


function downloadCompleteHTMLFile() {
    const html = generateCompleteHTMLDocument();
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = state.filename || 'lesson.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showAdminToast("📥 Lesson HTML file downloaded.");
}

function copyFullHTMLCode() {
    const html = generateCompleteHTMLDocument();
    navigator.clipboard.writeText(html).then(() => {
        showAdminToast("✅ Full HTML code copied to clipboard.");
    });
}

function copyJSONState() {
    navigator.clipboard.writeText(JSON.stringify(state, null, 2)).then(() => {
        showAdminToast("✅ Lesson JSON state copied to clipboard.");
    });
}

function updateSourceCodePreview() {
    const preview = document.getElementById('generatedCodePreview');
    if (!preview) return;
    const fullDoc = generateCompleteHTMLDocument();
    preview.textContent = fullDoc.substring(0, 1500) + '\n\n... (Full code generated by unified engine)';
}

function showNavSnippet(targetPath) {
    const fname = state.filename || 'lesson.html';
    const snippet = `<a href="${fname}" class="lesson-card active" data-sound-click="click">\n    <span class="lesson-title">📖 ${state.title}</span>\n    <span class="badge badge-active">🎯 Available</span>\n</a>`;
    
    const codeEl = document.getElementById('navSnippetCode');
    const container = document.getElementById('navSnippetContainer');
    if (codeEl && container) {
        codeEl.textContent = snippet;
        container.style.display = 'block';
    }
}

function copyNavSnippet() {
    const codeEl = document.getElementById('navSnippetCode');
    if (!codeEl) return;
    navigator.clipboard.writeText(codeEl.textContent).then(() => {
        showAdminToast("✅ Lesson navigation card snippet copied.");
    });
}
