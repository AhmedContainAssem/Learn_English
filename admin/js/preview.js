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
        const hasStory = (state.storyPages && state.storyPages.length > 0);
        const hasVideo = !!state.videoUrl;

        html += `
            <div class="tabs-container" style="margin-bottom: 20px;">
                <button onclick="setSimTab('verbs')" class="tab-btn ${currentSimTab === 'verbs' ? 'active' : ''}">📌 Verbs (${state.verbs.length})</button>
                <button onclick="setSimTab('definitions')" class="tab-btn ${currentSimTab === 'definitions' ? 'active' : ''}">📚 Definitions (${state.definitions.length})</button>
                <button onclick="setSimTab('synonyms')" class="tab-btn ${currentSimTab === 'synonyms' ? 'active' : ''}">⚖️ Synonyms & Antonyms (${state.synonyms.length})</button>
                <button onclick="setSimTab('affixes')" class="tab-btn ${currentSimTab === 'affixes' ? 'active' : ''}">🔤 Affixes (${state.affixes.length})</button>
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

function renderSimQuizView() {
    if (!state.quiz || state.quiz.length === 0) {
        return '<div style="text-align: center; color: var(--text-muted); padding: 30px;">No questions added yet in quiz section.</div>';
    }

    const totalQuestions = state.quiz.length;
    const totalPossibleScore = state.quiz.reduce((sum, q) => sum + (typeof q.points === 'number' ? q.points : 10), 0);

    // If quiz completed in simulator, show results screen (100% parity with quiz-engine.js)
    if (simQuizCompleted) {
        const percentage = totalPossibleScore > 0 ? Math.round((simQuizScore / totalPossibleScore) * 100) : 0;
        let gradeBadge = '';
        let gradeColor = 'var(--accent-primary, #00f3ff)';
        let trophyEmoji = '🏆';

        if (percentage >= 90) {
            gradeBadge = '🌟 Outstanding!';
            gradeColor = 'var(--accent-green, #10b981)';
            trophyEmoji = '🏆👑';
        } else if (percentage >= 75) {
            gradeBadge = '🎯 Very Good!';
            gradeColor = 'var(--accent-primary, #00f3ff)';
            trophyEmoji = '🎯✨';
        } else if (percentage >= 50) {
            gradeBadge = '👍 Good Effort!';
            gradeColor = 'var(--accent-orange, #ffb703)';
            trophyEmoji = '👏';
        } else {
            gradeBadge = '💪 Keep Practicing!';
            gradeColor = 'var(--accent-red, #ef4444)';
            trophyEmoji = '📚💡';
        }

        return `
            <div class="quiz-card" style="margin-top: 0; padding: 32px 24px; text-align: center; background: var(--card-bg); border: 1.5px solid var(--border-color); border-radius: 22px; box-shadow: 0 15px 40px rgba(0,0,0,0.5);">
                <div style="font-size: 3.8rem; margin-bottom: 12px; filter: drop-shadow(0 0 18px rgba(0,243,255,0.45)); animation: pulseSlow 2s infinite ease-in-out;">${trophyEmoji}</div>
                <h2 style="color: ${gradeColor}; margin-bottom: 12px; font-size: 1.45rem;">${gradeBadge}</h2>
                
                <p style="font-size: 1.2rem; margin: 16px 0; color: var(--text-main, #f8fafc); line-height: 1.7;">
                    Simulation Score: 
                    <strong style="color: var(--accent-orange, #ffb703); font-size: 1.7rem;">${simQuizScore}</strong> 
                    out of <strong>${totalPossibleScore}</strong> points
                    <span style="display: block; font-size: 1rem; color: var(--text-muted); margin-top: 8px;">
                        (Percentage: <strong style="color: ${gradeColor}; font-size: 1.2rem;">${percentage}%</strong> | ✅ Correct Answers: ${simQuizCorrectCount} of ${totalQuestions})
                    </span>
                </p>

                <div style="display: flex; justify-content: center; gap: 14px; flex-wrap: wrap; margin-top: 26px;">
                    <button type="button" onclick="restartSimQuiz()" class="action-btn" style="cursor: pointer; padding: 10px 24px;">🔄 Restart Quiz</button>
                    <button type="button" onclick="shuffleSimQuiz()" class="action-btn secondary" style="cursor: pointer; padding: 10px 22px;">🔀 Shuffle Order</button>
                </div>
            </div>
        `;
    }

    if (simQuizIndex >= totalQuestions) {
        simQuizIndex = totalQuestions - 1;
    }

    const q = state.quiz[simQuizIndex] || state.quiz[0];
    const emoji = q.emoji || '🎯';
    const qPoints = typeof q.points === 'number' ? q.points : 10;

    return `
        <div class="quiz-card" style="margin-top: 0; padding: 24px; text-align: center; background: var(--card-bg); border: 1.5px solid var(--border-color); border-radius: 20px;">
            <!-- Score Board (Exact Parity) -->
            <div class="score-board" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; padding: 12px 18px; background: rgba(11, 15, 25, 0.75); border: 1px solid var(--border-color); border-radius: 14px; font-weight: 800; font-size: 1.05rem;">
                <span>Question: <strong style="color: var(--accent-primary);">${simQuizIndex + 1}</strong> / <strong>${totalQuestions}</strong></span>
                <button type="button" onclick="shuffleSimQuiz()" class="action-btn secondary" style="padding: 4px 12px; font-size: 0.82rem;" title="Reshuffle questions randomly">🔀 Shuffle</button>
                <span>Score: <strong style="color: var(--accent-orange, #ffb703); font-size: 1.3rem;">${simQuizScore}</strong> 🌟</span>
            </div>

            <!-- Large Center Emoji Display -->
            <div class="emoji-display" style="font-size: 3.5rem; margin: 6px 0 14px; display: inline-block; filter: drop-shadow(0 0 15px rgba(0,243,255,0.4)); animation: pulseSlow 2s infinite ease-in-out;">
                ${emoji}
            </div>

            <div class="question-text" style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 20px; line-height: 1.5;">
                <span>${q.question || 'Question Text'}</span>
                <button type="button" onclick="speakText('${(q.question || '').replace(/'/g, "\\'")}')" class="audio-btn" style="margin-left: 8px; vertical-align: middle; width: 36px; height: 36px; font-size: 1rem;" title="Listen to question">🔊</button>
            </div>

            <!-- Options Grid with Interactive State and Locking -->
            <div class="options-grid" style="display: flex; flex-direction: column; gap: 11px; max-width: 560px; margin: 0 auto 18px;">
                ${q.options.map((opt, i) => {
                    let optStyle = "display: flex; justify-content: space-between; align-items: center; width: 100%; text-align: left; padding: 12px 18px; border-radius: 14px; font-size: 1.05rem; font-weight: 700; transition: all 0.2s ease; cursor: pointer; border: 1.5px solid var(--border-color); background: rgba(19, 27, 46, 0.9); color: var(--text-main);";
                    let stateClass = "";

                    if (simQuizAnswered) {
                        if (opt.isCorrect) {
                            optStyle += " background: rgba(16, 185, 129, 0.22) !important; border-color: var(--accent-green, #10b981) !important; color: #10b981 !important; box-shadow: 0 0 16px rgba(16, 185, 129, 0.35);";
                            stateClass = "correct";
                        } else if (simQuizSelectedOptIdx === i) {
                            optStyle += " background: rgba(239, 68, 68, 0.22) !important; border-color: var(--accent-red, #ef4444) !important; color: #ef4444 !important;";
                            stateClass = "wrong";
                        } else {
                            optStyle += " opacity: 0.55; cursor: default;";
                        }
                    }

                    return `
                        <button type="button" 
                                onclick="handleSimQuizAnswer(${simQuizIndex}, ${i})" 
                                ${simQuizAnswered ? 'disabled' : ''}
                                class="quiz-option-btn ${stateClass}" 
                                style="${optStyle}">
                            <span>${opt.text || ''}</span>
                            <span onclick="event.stopPropagation(); speakText('${(opt.text || '').replace(/'/g, "\\'")}')" class="audio-btn" style="width: 32px; height: 32px; font-size: 0.9rem;" title="Listen to option">🔊</span>
                        </button>
                    `;
                }).join('')}
            </div>

            <!-- Dynamic Feedback Box -->
            <div id="simFeedbackBox" style="min-height: 28px; margin-bottom: 16px; font-weight: bold; font-size: 1.05rem;">
                ${simQuizAnswered ? (
                    simQuizSelectedOptIdx !== null && q.options[simQuizSelectedOptIdx]?.isCorrect
                        ? `<span style="color: var(--accent-green, #10b981);">${q.correctMsg || `Correct! Well done 🎯 (+${qPoints} points)`}</span>`
                        : `<span style="color: var(--accent-red, #ef4444);">${q.wrongMsg || 'Incorrect answer, try again!'}</span>`
                ) : ''}
            </div>

            <!-- Navigation Controls -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 18px; gap: 10px; border-top: 1px solid rgba(255,255,255,0.08); padding-top: 16px;">
                <button type="button" onclick="prevSimQuestion()" ${simQuizIndex === 0 ? 'disabled' : ''} class="action-btn secondary" style="padding: 8px 20px; font-size: 0.92rem;">⬅ Previous</button>
                
                ${simQuizAnswered ? `
                    <button type="button" onclick="nextSimQuestion()" class="action-btn" style="padding: 9px 24px; font-size: 0.95rem;">
                        ${simQuizIndex >= totalQuestions - 1 ? '🎉 Show Results & Grade' : 'Next Question ➔'}
                    </button>
                ` : `
                    <button type="button" onclick="nextSimQuestion()" class="action-btn secondary" style="padding: 8px 18px; font-size: 0.9rem; opacity: 0.7;">Skip ➔</button>
                `}
            </div>
        </div>
    `;
}

function handleSimQuizAnswer(qIdx, optIdx) {
    if (simQuizAnswered) return;
    const q = state.quiz[qIdx];
    if (!q) return;
    const opt = q.options[optIdx];
    if (!opt) return;

    simQuizAnswered = true;
    simQuizSelectedOptIdx = optIdx;
    const points = typeof q.points === 'number' ? q.points : 10;

    if (opt.isCorrect) {
        if (typeof playCorrectFX === 'function') playCorrectFX();
        simQuizScore += points;
        simQuizCorrectCount += 1;
        showAdminToast(`Correct! (+${points} points)`);
    } else {
        if (typeof playWrongFX === 'function') playWrongFX();
        simQuizWrongCount += 1;
        showAdminToast('Incorrect answer', false);
    }

    renderLiveSimulator();
}

function nextSimQuestion() {
    if (typeof playSound === 'function') playSound('click');
    if (simQuizIndex < state.quiz.length - 1) {
        simQuizIndex++;
        simQuizAnswered = false;
        simQuizSelectedOptIdx = null;
        renderLiveSimulator();
    } else {
        // Last question reached -> show results
        simQuizCompleted = true;
        if (typeof playSound === 'function') {
            const totalScore = state.quiz.reduce((sum, q) => sum + (typeof q.points === 'number' ? q.points : 10), 0);
            const percentage = totalScore > 0 ? Math.round((simQuizScore / totalScore) * 100) : 0;
            playSound(percentage >= 50 ? 'success' : 'click');
        }
        renderLiveSimulator();
    }
}

function prevSimQuestion() {
    if (typeof playSound === 'function') playSound('click');
    if (simQuizIndex > 0) {
        simQuizIndex--;
        simQuizAnswered = false;
        simQuizSelectedOptIdx = null;
        simQuizCompleted = false;
        renderLiveSimulator();
    }
}

function restartSimQuiz() {
    if (typeof playSound === 'function') playSound('click');
    simQuizIndex = 0;
    simQuizScore = 0;
    simQuizAnswered = false;
    simQuizSelectedOptIdx = null;
    simQuizCorrectCount = 0;
    simQuizWrongCount = 0;
    simQuizCompleted = false;

    // Reshuffle questions & options if utility available
    if (Array.isArray(state.quiz) && state.quiz.length > 1) {
        if (typeof window.shuffleArray === 'function') {
            state.quiz = window.shuffleArray(state.quiz);
            state.quiz.forEach(q => {
                if (Array.isArray(q.options)) {
                    q.options = window.shuffleArray(q.options);
                }
            });
        }
    }

    renderQuizQuestionsList();
    renderLiveSimulator();
    showAdminToast('🔄 Quiz reset and restarted successfully.');
}

function shuffleSimQuiz() {
    if (typeof playSound === 'function') playSound('click');
    if (Array.isArray(state.quiz) && state.quiz.length > 1) {
        if (typeof window.shuffleArray === 'function') {
            state.quiz = window.shuffleArray(state.quiz);
            state.quiz.forEach(q => {
                if (Array.isArray(q.options)) {
                    q.options = window.shuffleArray(q.options);
                }
            });
        } else {
            for (let i = state.quiz.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [state.quiz[i], state.quiz[j]] = [state.quiz[j], state.quiz[i]];
            }
        }
        simQuizIndex = 0;
        simQuizScore = 0;
        simQuizAnswered = false;
        simQuizSelectedOptIdx = null;
        simQuizCorrectCount = 0;
        simQuizWrongCount = 0;
        simQuizCompleted = false;

        renderQuizQuestionsList();
        renderLiveSimulator();
        showAdminToast('🔀 Questions and options shuffled randomly.');
    } else {
        showAdminToast('Need more than one question to shuffle.', false);
    }
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

function renderSimStorybookView() {
    const pages = state.storyPages || [];
    if (pages.length === 0) {
        return `
            <div style="text-align: center; color: var(--text-muted); padding: 36px 20px; background: rgba(11, 15, 25, 0.4); border-radius: 16px; border: 1px dashed rgba(0, 243, 255, 0.2);">
                <div style="font-size: 2.4rem; margin-bottom: 8px;">📖</div>
                <div style="font-weight: bold; color: var(--text-main);">No story pages added yet</div>
                <div style="font-size: 0.9rem; margin-top: 6px;">Add story pages from the "Story Pages & Scenes" tab.</div>
            </div>
        `;
    }

    if (simStoryCurrentPage >= pages.length) {
        simStoryCurrentPage = pages.length - 1;
    }
    if (simStoryCurrentPage < 0) {
        simStoryCurrentPage = 0;
    }

    const curPage = pages[simStoryCurrentPage] || pages[0];
    const totalPages = pages.length;
    const embedUrl = parseYouTubeEmbed(state.videoUrl);

    let html = `
        <!-- Interactive 3D Book Container -->
        <div class="storybook-wrapper">
            <div class="storybook-book">
                <!-- Center Book Spine -->
                <div class="book-spine-divider"></div>

                <!-- Right Page: Scene Artwork -->
                <div class="story-page-artwork">
                    <div>
                        <div class="page-badge-artwork">
                            <span>🖼️ Scene ${simStoryCurrentPage + 1} of ${totalPages}</span>
                        </div>
                        <div class="artwork-container">
                            ${curPage.imageUrl ? `
                                <img src="${curPage.imageUrl}" alt="Scene ${simStoryCurrentPage + 1}" onerror="this.parentElement.innerHTML='<div style=\\'color:var(--text-muted);font-size:0.9rem;text-align:center;padding:20px;\\'>🖼️ Scene Artwork</div>';">
                            ` : `
                                <div style="color: var(--text-muted); font-size: 0.95rem; text-align: center; padding: 20px;">🖼️ Scene Artwork Placeholder</div>
                            `}
                        </div>
                        ${curPage.caption ? `<div class="artwork-caption">${curPage.caption}</div>` : ''}
                    </div>

                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); font-size: 0.85rem; color: var(--text-muted);">
                        <span>📖 Book Reader</span>
                        <span>Page ${simStoryCurrentPage + 1} / ${totalPages}</span>
                    </div>
                </div>

                <!-- Left Page: Story Reading Passage -->
                <div class="story-page-content">
                    <div>
                        <div class="story-header">
                            <h3 class="story-page-title">${curPage.title || `Chapter ${simStoryCurrentPage + 1}`}</h3>
                            <button type="button" onclick="speakText('${(curPage.textEn || '').replace(/'/g, "\\'")}')" class="audio-btn" title="Listen to pronunciation">🔊</button>
                        </div>
                        <div class="story-paragraph ${simStoryIsPlaying ? 'reading-active' : ''}">
                            ${curPage.textEn || 'No text written for this page.'}
                        </div>
                    </div>

                    <div>
                        ${curPage.textAr ? `
                            <div class="story-translation-box">
                                <span style="font-weight: 800; color: var(--accent-secondary); margin-left: 6px;">💡 الترجمة:</span>
                                ${curPage.textAr}
                            </div>
                        ` : ''}

                        ${curPage.vocabNotes ? `
                            <div class="story-vocab-chips">
                                ${curPage.vocabNotes.split('•').map(chip => `<span class="vocab-chip">${chip.trim()}</span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>

            <!-- Story Navigation & Auto-Storyteller Bar -->
            <div class="story-controls-bar">
                <button type="button" onclick="changeSimStoryPage(-1)" class="action-btn secondary" style="padding: 8px 16px; font-size: 0.9rem;" ${simStoryCurrentPage === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
                    ⬅️ Previous Page
                </button>

                <button type="button" onclick="toggleSimStoryteller()" class="storyteller-btn ${simStoryIsPlaying ? 'playing' : ''}">
                    ${simStoryIsPlaying ? '⏸️ Stop Storyteller' : '▶️ Auto Storyteller'}
                </button>

                <div class="story-page-progress">
                    <span>Page ${simStoryCurrentPage + 1} of ${totalPages}</span>
                    <div class="progress-dots">
                        ${pages.map((_, i) => `<span class="dot ${i === simStoryCurrentPage ? 'active' : ''}"></span>`).join('')}
                    </div>
                </div>

                <button type="button" onclick="changeSimStoryPage(1)" class="action-btn secondary" style="padding: 8px 16px; font-size: 0.9rem;" ${simStoryCurrentPage === totalPages - 1 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''}>
                    Next Page ➔
                </button>
            </div>
        </div>
    `;

    // Video Lesson Integration (if available)
    if (embedUrl) {
        html += `
            <div class="video-lesson-card">
                <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                    <div style="font-weight: 800; font-size: 1.15rem; color: var(--accent-primary);">
                        🎥 ${state.videoTitle || 'فيديو شرح ومناقشة أحداث القصة'}
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
    }

    // Comprehension Quiz
    if (state.quiz && state.quiz.length > 0) {
        html += `
            <div style="margin-top: 30px; border-top: 1px solid rgba(0, 243, 255, 0.2); padding-top: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                    <h3 style="color: var(--accent-primary); margin: 0; font-size: 1.25rem;">🏆 Comprehension Quiz (اختبار فهم القصة)</h3>
                    <span class="badge badge-new">Instant Scoring</span>
                </div>
                ${renderSimQuizView()}
            </div>
        `;
    }

    return html;
}

function changeSimStoryPage(direction) {
    if (typeof playSound === 'function') playSound('click');
    stopSimStoryteller();
    const newIdx = simStoryCurrentPage + direction;
    if (newIdx >= 0 && newIdx < (state.storyPages || []).length) {
        simStoryCurrentPage = newIdx;
        renderLiveSimulator();
    }
}

function toggleSimStoryteller() {
    if (simStoryIsPlaying) {
        stopSimStoryteller();
    } else {
        startSimStoryteller();
    }
}

function startSimStoryteller() {
    if (!('speechSynthesis' in window)) {
        if (typeof showAdminToast === 'function') showAdminToast('Web Speech API is not supported in this browser.', false);
        return;
    }

    const pages = state.storyPages || [];
    if (pages.length === 0) return;

    window.speechSynthesis.cancel();
    simStoryIsPlaying = true;
    renderLiveSimulator();

    const curPage = pages[simStoryCurrentPage];
    const textToRead = curPage ? curPage.textEn : '';
    if (!textToRead) {
        stopSimStoryteller();
        return;
    }

    simStoryUtterance = new SpeechSynthesisUtterance(textToRead);
    simStoryUtterance.lang = 'en-US';
    simStoryUtterance.rate = 0.92;

    simStoryUtterance.onend = () => {
        if (!simStoryIsPlaying) return;

        // Check if there are more pages
        if (simStoryCurrentPage < pages.length - 1) {
            simStoryCurrentPage++;
            renderLiveSimulator();
            setTimeout(() => {
                if (simStoryIsPlaying) {
                    startSimStoryteller();
                }
            }, 600);
        } else {
            // Reached final page
            simStoryIsPlaying = false;
            renderLiveSimulator();
            if (typeof playSound === 'function') playSound('correct');
            if (typeof showAdminToast === 'function') {
                showAdminToast('🎉 Reached the end of the story! Well done!');
            }
        }
    };

    simStoryUtterance.onerror = () => {
        simStoryIsPlaying = false;
        renderLiveSimulator();
    };

    window.speechSynthesis.speak(simStoryUtterance);
}

function stopSimStoryteller() {
    simStoryIsPlaying = false;
    if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
    }
    renderLiveSimulator();
}

