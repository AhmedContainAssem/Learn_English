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
    <link rel="stylesheet" href="${assetPrefix}assets/css/curriculum.css">
    <link rel="stylesheet" href="${assetPrefix}assets/css/grammar-slides.css">
    <link rel="stylesheet" href="${assetPrefix}assets/css/storybook.css">
    <link rel="stylesheet" href="${assetPrefix}assets/css/quiz.css">
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
                <img src="${assetPrefix}my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='${assetPrefix}my-photo-profile.webp';">
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
            grammarSlides: ${JSON.stringify(state.grammarSlides || [], null, 4)},
            storyPages: ${JSON.stringify(state.storyPages || [], null, 4)},
            questions: ${JSON.stringify(state.quiz || [], null, 4)}
        };
    </script>

    <!-- Framework & Shared Scripts -->
    <script src="${assetPrefix}assets/js/bidi.js"></script>
    <script src="${assetPrefix}assets/js/audio.js"></script>
    <script src="${assetPrefix}assets/js/vocab-mastery.js"></script>
    <script src="${assetPrefix}assets/js/story-engine.js"></script>
    <script src="${assetPrefix}assets/js/slides-engine.js"></script>
    <script src="${assetPrefix}assets/js/quiz-engine.js"></script>
    <script src="${assetPrefix}assets/js/tabs.js"></script>
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
                <img src="${assetPrefix}my-photo-profile.webp" alt="Mr. Ahmed Assem" class="teacher-avatar" onerror="this.onerror=null; this.src='${assetPrefix}my-photo-profile.webp';">
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


// Note: Archetype section templates are modularized into generators-sections.js


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
