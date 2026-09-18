/**
 * UI & Interaction Orchestrator (ui.js)
 * Coordinates user interactions, audio event bindings, and DOM lifecycle.
 */

(function (window) {
    'use strict';

    function attachSoundListeners() {
        document.querySelectorAll('[data-sound-click]').forEach(element => {
            element.addEventListener('click', () => {
                const soundType = element.dataset.soundClick || 'click';
                if (typeof window.playSound === 'function') {
                    window.playSound(soundType);
                }
            });
        });

        // Global delegated click listener for buttons, action links, and cards
        document.addEventListener('click', (event) => {
            const target = event.target.closest('button, .action-btn, .tab-btn, .quiz-option-btn, .flashcard, [role="button"], a.btn');
            if (target) {
                // If it already has specific audio-btn class or onclick handled with sound, let it play
                // Otherwise ensure tactile click sound
                if (typeof window.playSound === 'function' && !target.dataset.soundHandled) {
                    window.playSound('click');
                }
            }

            const audioBtn = event.target.closest('.audio-btn, .speak-btn');
            if (audioBtn) {
                audioBtn.classList.add('is-playing');
                setTimeout(() => audioBtn.classList.remove('is-playing'), 850);
            }
        }, { capture: true, passive: true });
    }

    function initStageFilters() {
        const filterNav = document.querySelector('.stages-filter-nav');
        if (!filterNav) return;

        const filterBtns = filterNav.querySelectorAll('.stage-filter-btn');
        const stageGroups = document.querySelectorAll('.stage-group[data-stage]');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                stageGroups.forEach(group => {
                    if (filter === 'all' || group.dataset.stage === filter) {
                        group.style.display = '';
                    } else {
                        group.style.display = 'none';
                    }
                });
            });
        });
    }

    function normalizeAr(str) {
        if (!str) return '';
        return str
            .toLowerCase()
            .replace(/[أإآ]/g, 'ا')
            .replace(/ة/g, 'ه')
            .replace(/ى/g, 'ي')
            .replace(/[\u064B-\u0652]/g, '')
            .trim();
    }

    function initDashboardSearch() {
        const searchInput = document.getElementById('dashboardSearchInput');
        if (!searchInput) return;

        const stageGroups = document.querySelectorAll('.stage-group');

        searchInput.addEventListener('input', () => {
            const query = normalizeAr(searchInput.value);
            if (!query) {
                stageGroups.forEach(group => {
                    group.style.display = '';
                    group.querySelectorAll('.grade-card, .featured-course-card').forEach(card => card.style.display = '');
                });
                return;
            }

            stageGroups.forEach(group => {
                let groupHasMatch = false;
                const cards = group.querySelectorAll('.grade-card, .featured-course-card');
                
                cards.forEach(card => {
                    const text = normalizeAr(card.textContent || '');
                    if (text.includes(query)) {
                        card.style.display = '';
                        groupHasMatch = true;
                    } else {
                        card.style.display = 'none';
                    }
                });

                group.style.display = groupHasMatch ? '' : 'none';
            });
        });
    }

    function initLessonTrackingAndResume() {
        const isLessonPage = document.querySelector('.cards-grid, .tab-content, .quiz-container-card');
        if (isLessonPage) {
            try {
                const titleElem = document.querySelector('h1, .teacher-title, title');
                const cleanTitle = (titleElem ? titleElem.textContent : document.title)
                    .replace(/\|.*$/, '')
                    .replace(/Mr\.\s*Ahmed\s*Assem/gi, '')
                    .trim();

                if (cleanTitle && cleanTitle.length > 2) {
                    localStorage.setItem('assem_recent_lesson', JSON.stringify({
                        title: cleanTitle,
                        url: window.location.href,
                        time: Date.now()
                    }));
                }
            } catch (e) {
                // Ignore storage errors
            }
            return;
        }

        const resumeContainer = document.getElementById('dashboardResumeContainer');
        if (!resumeContainer) return;

        try {
            const saved = localStorage.getItem('assem_recent_lesson');
            if (!saved) return;
            const data = JSON.parse(saved);
            if (!data || !data.title || !data.url) return;

            resumeContainer.innerHTML = `
                <div class="resume-learning-banner" role="complementary" aria-label="متابعة آخر درس">
                    <div class="resume-info">
                        <span class="resume-label">📖 تابع من حيث توقفت:</span>
                        <span class="resume-title">${data.title}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:10px;">
                        <a href="${data.url}" class="resume-btn">استئناف المذاكرة ←</a>
                        <button class="resume-dismiss" type="button" title="إخفاء" onclick="this.closest('.resume-learning-banner').remove(); localStorage.removeItem('assem_recent_lesson');">✕</button>
                    </div>
                </div>
            `;
        } catch (e) {
            // Ignore storage errors
        }
    }

    function initVocabStudyTools() {
        const searchInput = document.getElementById('vocabSearchInput');
        const selfStudyBtn = document.getElementById('selfStudyToggleBtn');

        if (searchInput) {
            searchInput.addEventListener('input', () => {
                const query = normalizeAr(searchInput.value);
                const activeTab = document.querySelector('.tab-content.active') || document;
                const cards = activeTab.querySelectorAll('.card');

                cards.forEach(card => {
                    const text = normalizeAr(card.textContent || '');
                    card.style.display = (!query || text.includes(query)) ? '' : 'none';
                });
            });
        }

        if (selfStudyBtn) {
            selfStudyBtn.addEventListener('click', () => {
                const isNowActive = document.body.classList.toggle('self-study-active');
                selfStudyBtn.classList.toggle('active', isNowActive);
                selfStudyBtn.setAttribute('aria-pressed', isNowActive);
                selfStudyBtn.innerHTML = isNowActive 
                    ? '<span>👁️ إظهار المعاني</span>' 
                    : '<span>👁️ إخفاء المعنى للاختبار الذاتي</span>';
            });

            // Allow clicking individual blurred sections to reveal them
            document.addEventListener('click', (e) => {
                if (!document.body.classList.contains('self-study-active')) return;
                const blurredSection = e.target.closest('.simple-explain-box, .practical-example-box, .card-body > div:first-child');
                if (blurredSection) {
                    blurredSection.classList.toggle('revealed');
                }
            });
        }
    }

    function init() {
        document.body.classList.add('app-page');
        if (typeof window.initAudio === 'function') {
            document.body.addEventListener('pointerdown', window.initAudio, { once: true });
            document.body.addEventListener('click', window.initAudio, { once: true });
        }
        attachSoundListeners();
        initStageFilters();
        initDashboardSearch();
        initLessonTrackingAndResume();
        initVocabStudyTools();

        // Run auto BiDi typography formatter if available
        if (window.BiDi && typeof window.BiDi.autoFormatDOM === 'function') {
            window.BiDi.autoFormatDOM(document.body);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})(typeof window !== 'undefined' ? window : this);
