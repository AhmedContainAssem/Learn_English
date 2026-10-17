/**
 * Lesson Studio Live Preview Simulator Module (preview.js)
 * Clean Architecture: Inherits shared styles and JS components (flipCard, speakText, playSound, etc.)
 */

let currentViewportMode = 'desktop'; // 'desktop' | 'tablet' | 'mobile'

function setViewportMode(mode) {
    if (typeof playSound === 'function') playSound('click');
    currentViewportMode = mode;
    
    // Update toolbar active states
    document.querySelectorAll('.viewport-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-mode') === mode);
    });

    const simWrapper = document.getElementById('liveSimulatorWrapper');
    const simBox = document.getElementById('liveSimulatorBox');
    const modeBadge = document.getElementById('viewportDimBadge');

    if (simWrapper && simBox) {
        simWrapper.className = `simulator-viewport-container viewport-${mode}`;
        if (mode === 'mobile') {
            simBox.style.maxWidth = '380px';
            simBox.style.margin = '0 auto';
            simBox.style.borderRadius = '28px';
            simBox.style.border = '4px solid #334155';
            simBox.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
            if (modeBadge) modeBadge.textContent = '📱 375px × 667px (Mobile)';
        } else if (mode === 'tablet') {
            simBox.style.maxWidth = '768px';
            simBox.style.margin = '0 auto';
            simBox.style.borderRadius = '20px';
            simBox.style.border = '3px solid #334155';
            simBox.style.boxShadow = '0 8px 24px rgba(0,0,0,0.4)';
            if (modeBadge) modeBadge.textContent = '💻 768px × 1024px (Tablet)';
        } else {
            simBox.style.maxWidth = '850px';
            simBox.style.margin = '0 auto';
            simBox.style.borderRadius = '18px';
            simBox.style.border = '1px solid var(--border-color)';
            simBox.style.boxShadow = 'none';
            if (modeBadge) modeBadge.textContent = '🖥️ 100% Fluid (Desktop)';
        }
    }
}

function triggerLiveUpdate() {
    renderLiveSimulator();
    if (typeof updateSourceCodePreview === 'function') updateSourceCodePreview();
    if (typeof updateTargetFilePath === 'function') updateTargetFilePath();
    if (typeof StudioLinter !== 'undefined') StudioLinter.audit();
}

function renderLiveSimulator() {
    const sim = document.getElementById('liveSimulatorBox');
    if (!sim) return;

    let html = `
        <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 14px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
                <div style="font-size: 0.85rem; color: var(--accent-primary); font-weight: bold;">${getStageDisplayName(state.stage)} ${state.unit ? '• ' + state.unit : ''}</div>
                <h2 style="margin: 4px 0; color: var(--text-main); font-size: 1.45rem;">${state.title || 'Untitled Lesson'}</h2>
                <div style="color: var(--text-muted); font-size: 0.9rem;">${state.description || ''}</div>
            </div>
            <div class="badge badge-active" style="background: rgba(0, 243, 255, 0.15); color: var(--accent-primary); border: 1px solid var(--accent-primary);">
                <span>👁️ Live Preview</span>
            </div>
        </div>
    `;

    if (state.archetype === 'curriculum_tabs') {
        const hasSlides = (state.grammarSlides && state.grammarSlides.length > 0);
        const hasStory = (state.storyPages && state.storyPages.length > 0);
        const hasVideo = !!state.videoUrl;

        html += `
            <div class="tabs-container" style="margin-bottom: 20px;">
                <button onclick="setSimTab('verbs')" class="tab-btn ${currentSimTab === 'verbs' ? 'active' : ''}">📌 Verbs (${state.verbs.length})</button>
                <button onclick="setSimTab('definitions')" class="tab-btn ${currentSimTab === 'definitions' ? 'active' : ''}">📚 Definitions (${state.definitions.length})</button>
                <button onclick="setSimTab('synonyms')" class="tab-btn ${currentSimTab === 'synonyms' ? 'active' : ''}">⚖️ Synonyms & Antonyms (${state.synonyms.length})</button>
                <button onclick="setSimTab('affixes')" class="tab-btn ${currentSimTab === 'affixes' ? 'active' : ''}">🔤 Affixes (${state.affixes.length})</button>
                ${hasSlides ? `<button onclick="setSimTab('slides')" class="tab-btn ${currentSimTab === 'slides' ? 'active' : ''}">⚡ Slides (${state.grammarSlides.length})</button>` : ''}
                ${hasStory ? `<button onclick="setSimTab('reading')" class="tab-btn ${(currentSimTab === 'reading' || currentSimTab === 'story_pages') ? 'active' : ''}">📖 Reading (${state.storyPages.length})</button>` : ''}
                ${hasVideo ? `<button onclick="setSimTab('video')" class="tab-btn ${(currentSimTab === 'video' || currentSimTab === 'video_lesson') ? 'active' : ''}">🎥 Video</button>` : ''}
                <button onclick="setSimTab('quiz')" class="tab-btn ${currentSimTab === 'quiz' ? 'active' : ''}">🎯 Quiz (${state.quiz.length})</button>
            </div>
        `;

        if (currentSimTab === 'verbs') {
            html += `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
                    ${state.verbs.map(v => `
                        <div class="card">
                            <div class="card-header">
                                <span class="word-en">${v.word || 'verb'}</span>
                                <button type="button" onclick="speakText('${(v.word || '').replace(/'/g, "\\'")}')" class="audio-btn" title="Listen to pronunciation">🔊</button>
                            </div>
                            <div class="card-body">
                                <div style="color: var(--text-muted); font-size: 0.95rem;">${v.meaning || 'Meaning'}</div>
                                <div class="details-box">Forms: <span>${v.forms || 'past / p.p'}</span></div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (currentSimTab === 'definitions') {
            html += `
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${state.definitions.map(d => `
                        <div class="card" style="flex-direction: row; justify-content: space-between; align-items: center; flex-wrap: wrap;">
                            <div>
                                <div style="font-weight: 800; font-size: 1.15rem; color: var(--accent-primary);">
                                    <span class="en-text">${d.word}</span> 
                                    <span style="font-size: 0.9rem; color: var(--text-muted); font-weight: normal;">(${d.meaning})</span>
                                </div>
                                <div style="color: #cbd5e1; font-size: 0.95rem; margin-top: 4px;">${d.definition}</div>
                            </div>
                            <button type="button" onclick="speakText('${(d.word || '').replace(/'/g, "\\'")}')" class="audio-btn" title="Listen to pronunciation">🔊</button>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (currentSimTab === 'synonyms') {
            html += `
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Meaning</th>
                                <th>Synonym</th>
                                <th>Antonym</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${state.synonyms.map(s => `
                                <tr>
                                    <td class="en-text">${s.word}</td>
                                    <td>${s.arabic}</td>
                                    <td style="color: var(--accent-green); font-weight: bold;">${s.synonym}</td>
                                    <td style="color: var(--accent-red); font-weight: bold;">${s.antonym}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        } else if (currentSimTab === 'affixes') {
            html += `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
                    ${state.affixes.map(a => `
                        <div class="card">
                            <div style="font-size: 1.3rem; font-weight: 900; color: var(--accent-secondary);">${a.affix}</div>
                            <div style="color: var(--text-main); font-size: 0.95rem; margin: 6px 0;">${a.function}</div>
                            <div class="details-box">Examples: <span>${a.examples}</span></div>
                        </div>
                    `).join('')}
                </div>
            `;
        } else if (currentSimTab === 'reading' || currentSimTab === 'story_pages') {
            html += renderSimStorybookView();
        } else if (currentSimTab === 'video' || currentSimTab === 'video_lesson') {
            const embedUrl = parseYouTubeEmbed(state.videoUrl);
            if (embedUrl) {
                html += `
                    <div class="video-lesson-card">
                        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                            <div style="font-weight: 800; font-size: 1.15rem; color: var(--accent-primary);">
                                🎥 ${state.videoTitle || 'Video Lesson'}
                            </div>
                            <a href="${state.videoUrl}" target="_blank" rel="noopener noreferrer" class="action-btn secondary" style="padding: 4px 12px; font-size: 0.8rem; text-decoration: none;">
                                ↗️ Open in YouTube
                            </a>
                        </div>
                        <div class="video-responsive-wrapper">
                            <iframe src="${embedUrl}" title="Video Lesson" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>
                        </div>
                    </div>
                `;
            } else {
                html += `
                    <div style="text-align: center; color: var(--text-muted); padding: 30px;">
                        <div>🎥 No YouTube Video URL specified yet.</div>
                        <div style="font-size: 0.85rem; margin-top: 6px;">Add a video URL from the Video Lesson editor tab.</div>
                    </div>
                `;
            }
        } else if (currentSimTab === 'slides') {
            html += (typeof renderSlidesSimulator === 'function') ? renderSlidesSimulator() : '<div style="padding: 20px; text-align: center;">⚡ Slides Simulator</div>';
        } else if (currentSimTab === 'quiz') {
            html += renderSimQuizView();
        }
    } else if (state.archetype === 'flashcards_dialogue') {
        html += `
            <div style="margin-bottom: 24px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
                    <h4 style="color: var(--accent-primary); margin: 0;">🎴 Flip Cards (${state.flashcards.length}) - Click any card to flip:</h4>
                    <span class="badge badge-new">🔄 Click to Flip</span>
                </div>
                <div class="flashcards-grid">
                    ${state.flashcards.map((f) => `
                        <div class="flip-card" onclick="if(typeof flipCard==='function') flipCard(this); else this.classList.toggle('flipped');" title="Click to flip card">
                            <div class="card-face card-front">
                                <div class="word-en">${f.front || 'English'}</div>
                                <button type="button" onclick="event.stopPropagation(); speakText('${(f.front || '').replace(/'/g, "\\'")}')" class="audio-btn" title="Listen to pronunciation">🔊</button>
                            </div>
                            <div class="card-face card-back">
                                <div style="font-weight: 800; font-size: 1.2rem; color: var(--accent-green);">${f.back || 'Meaning in Arabic'}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div style="margin-bottom: 24px;">
                <h4 style="color: var(--accent-primary); margin-bottom: 12px;">🗣️ ${state.dialogueTitle}</h4>
                <div style="display: flex; flex-direction: column; gap: 12px;">
                    ${state.dialogueLines.map(l => `
                        <div class="dialogue-box" style="display: flex; justify-content: space-between; align-items: center; gap: 12px;">
                            <div>
                                <div class="speaker-name">${l.speaker}:</div>
                                <div class="en-text" style="font-size: 1.05rem; margin-bottom: 4px;">${l.english}</div>
                                <div style="color: var(--text-muted); font-size: 0.9rem;">${l.arabic}</div>
                            </div>
                            <button type="button" onclick="speakText('${(l.english || '').replace(/'/g, "\\'")}')" class="audio-btn" title="Listen to pronunciation">🔊</button>
                        </div>
                    `).join('')}
                </div>
            </div>

            ${state.homeworkTitle ? `
                <div class="homework-box">
                    <div class="homework-title">${state.homeworkTitle}</div>
                    <div class="homework-desc">${state.homeworkDesc}</div>
                </div>
            ` : ''}
        `;
    } else if (state.archetype === 'storybook_reading') {
        html += renderSimStorybookView();
    } else if (state.archetype === 'quiz_only') {
        html += renderSimQuizView();
    } else if (state.archetype === 'index_hub' || state.archetype === 'stage_index' || state.archetype === 'unit_index') {
        html += renderSimIndexHubView();
    }

    sim.innerHTML = html;
}

function renderSimIndexHubView() {
    const cards = state.indexCards || [];
    const layout = state.indexLayoutType || 'units';
    const backText = state.indexBackText || '⬅️ Back to Main Menu';
    const backLink = state.indexBackLink || '../index.html';

    if (cards.length === 0) {
        return `
            <div style="text-align: center; color: var(--text-muted); padding: 36px 20px; background: rgba(11, 15, 25, 0.4); border-radius: 16px; border: 1px dashed rgba(0, 243, 255, 0.2);">
                <div style="font-size: 2.4rem; margin-bottom: 8px;">📭</div>
                <div style="font-weight: bold; color: var(--text-main);">No cards added to the index yet</div>
                <div style="font-size: 0.9rem; margin-top: 6px;">Add new cards from the "Page Content" tab or use preset scaffolding buttons.</div>
            </div>
        `;
    }

    let cardsHTML = '';
    if (layout === 'lessons') {
        cardsHTML = `
            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 18px;">
                ${cards.map(c => {
                    if (c.status === 'active') {
                        return `
                            <div class="lesson-card" style="display: flex; justify-content: space-between; align-items: center; background: var(--card-bg); border: 1.5px solid var(--border-color); border-radius: 14px; padding: 14px 18px; cursor: pointer;" onclick="if(typeof playSound==='function') playSound('click'); showAdminToast('Simulation: Navigate to ' + '${(c.title || '').replace(/'/g, "\\'")}');">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <span style="font-size: 1.6rem;">${c.icon || '📝'}</span>
                                    <div>
                                        <div style="font-weight: 800; font-size: 1.05rem; color: var(--text-main);">${c.title}</div>
                                        ${c.subtitle ? `<div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">${c.subtitle}</div>` : ''}
                                    </div>
                                </div>
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <span class="badge badge-active" style="background: rgba(0, 243, 255, 0.15); color: var(--accent-primary); font-size: 0.78rem; padding: 3px 8px; border-radius: 12px;">${c.tag || '🎯 Available'}</span>
                                    <span>➔</span>
                                </div>
                            </div>
                        `;
                    } else {
                        return `
                            <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(15, 23, 42, 0.4); border: 1px dashed rgba(255, 255, 255, 0.12); border-radius: 14px; padding: 14px 18px; opacity: 0.6; cursor: not-allowed;" onclick="if(typeof playSound==='function') playSound('wrong'); showAdminToast('This section is currently locked', false);">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <span style="font-size: 1.6rem; filter: grayscale(80%);">${c.icon || '📝'}</span>
                                    <div>
                                        <div style="font-weight: 800; font-size: 1.05rem; color: var(--text-muted);">${c.title}</div>
                                        ${c.subtitle ? `<div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 2px;">${c.subtitle}</div>` : ''}
                                    </div>
                                </div>
                                <span class="badge badge-locked" style="background: rgba(255, 71, 126, 0.15); color: var(--accent-red); font-size: 0.78rem; padding: 3px 8px; border-radius: 12px;">${c.tag || '🔒 Upcoming'}</span>
                            </div>
                        `;
                    }
                }).join('')}
            </div>
        `;
    } else {
        cardsHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 14px; margin-top: 18px;">
                ${cards.map(c => {
                    if (c.status === 'active') {
                        return `
                            <div class="unit-card active" style="background: var(--card-bg); border: 1.5px solid var(--border-color); border-radius: 16px; padding: 18px 14px; text-align: center; position: relative; cursor: pointer;" onclick="if(typeof playSound==='function') playSound('click'); showAdminToast('Simulation: Navigate to ' + '${(c.title || '').replace(/'/g, "\\'")}');">
                                <span class="badge badge-active" style="position: absolute; top: 10px; right: 10px; background: rgba(0, 243, 255, 0.15); color: var(--accent-primary); padding: 3px 8px; border-radius: 12px; font-size: 0.75rem; border: 1px solid var(--accent-primary);">${c.tag || '🎯 Available'}</span>
                                <div style="font-size: 2.4rem; margin: 8px 0 6px;">${c.icon || '📘'}</div>
                                <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-main); margin-bottom: 2px;">${c.title}</div>
                                <div style="font-size: 0.85rem; color: var(--text-muted);">${c.subtitle || ''}</div>
                            </div>
                        `;
                    } else {
                        return `
                            <div class="unit-card locked" style="background: rgba(15, 23, 42, 0.4); border: 1px dashed rgba(255, 255, 255, 0.15); border-radius: 16px; padding: 18px 14px; text-align: center; position: relative; opacity: 0.6; cursor: not-allowed;" onclick="if(typeof playSound==='function') playSound('wrong'); showAdminToast('This section is currently locked', false);">
                                <span class="badge badge-locked" style="position: absolute; top: 10px; right: 10px; background: rgba(255, 71, 126, 0.15); color: var(--accent-red); padding: 3px 8px; border-radius: 12px; font-size: 0.75rem;">${c.tag || '🔒 Upcoming'}</span>
                                <div style="font-size: 2.4rem; margin: 8px 0 6px; filter: grayscale(80%);">${c.icon || '📘'}</div>
                                <div style="font-size: 1.15rem; font-weight: 800; color: var(--text-muted); margin-bottom: 2px;">${c.title}</div>
                                <div style="font-size: 0.85rem; color: var(--text-muted);">${c.subtitle || ''}</div>
                            </div>
                        `;
                    }
                }).join('')}
            </div>
        `;
    }

    return `
        <div style="margin-bottom: 14px;">
            ${backLink ? `
                <div style="margin-bottom: 14px;">
                    <span class="action-btn secondary" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 10px; font-size: 0.85rem; font-weight: bold; cursor: default;">${backText}</span>
                </div>
            ` : ''}
            ${cardsHTML}
        </div>
    `;
}

function setSimTab(tab) {
    currentSimTab = tab;
    if (typeof playSound === 'function') playSound('click');
    renderLiveSimulator();
}


// Note: Interactive Simulators are modularized into preview-quiz.js and preview-story.js
