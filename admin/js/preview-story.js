/**
 * Lesson Studio Interactive Storybook Simulator (preview-story.js)
 * Single Responsibility: Renders 3D Storybook preview, page turning, and Web Speech storyteller narration.
 */

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
                    <div class="artwork-page-inner">
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

