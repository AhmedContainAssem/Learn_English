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

    function initCollapsibleSections() {
        if (window.AssemDashboard && typeof window.AssemDashboard.initCollapsibleSections === 'function') {
            return window.AssemDashboard.initCollapsibleSections();
        }
    }

    function initStageFilters() {
        if (window.AssemDashboard && typeof window.AssemDashboard.initStageFilters === 'function') {
            return window.AssemDashboard.initStageFilters();
        }
    }

    function initDashboardSearch() {
        if (window.AssemDashboard && typeof window.AssemDashboard.initDashboardSearch === 'function') {
            return window.AssemDashboard.initDashboardSearch();
        }
    }

    function initLessonTrackingAndResume() {
        // Track current lesson if on lesson page
        const isLessonPage = document.querySelector('.cards-grid, .tab-content, .quiz-container-card');
        if (isLessonPage) {
            try {
                const titleElem = document.querySelector('h1, .teacher-title, title');
                const cleanTitle = (titleElem ? titleElem.textContent : document.title)
                    .replace(/\|.*$/, '')
                    .replace(/Mr\.\s*Ahmed\s*Assem/gi, '')
                    .trim();

                if (cleanTitle && cleanTitle.length > 2) {
                    const payload = {
                        title: cleanTitle,
                        url: window.location.href,
                        time: Date.now()
                    };
                    if (window.AssemStorage && typeof window.AssemStorage.set === 'function') {
                        window.AssemStorage.set('assem_recent_lesson', payload);
                    } else {
                        localStorage.setItem('assem_recent_lesson', JSON.stringify(payload));
                    }
                }
            } catch (e) {}
            return;
        }

        if (window.AssemDashboard && typeof window.AssemDashboard.initLessonTrackingAndResume === 'function') {
            window.AssemDashboard.initLessonTrackingAndResume();
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

    function initGlobalPracticeHub() {
        if (typeof window.initGlobalPracticeHub === 'function') {
            window.initGlobalPracticeHub();
        }
    }

    // Slide Lightbox Viewer
    window.openSlideLightbox = function(imgSrc, title) {
        let lightbox = document.getElementById('slide-global-lightbox');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'slide-global-lightbox';
            lightbox.className = 'slide-lightbox-backdrop';
            lightbox.innerHTML = `
                <div class="slide-lightbox-container">
                    <button class="slide-lightbox-close" onclick="closeSlideLightbox()" title="إغلاق (Esc)">✕</button>
                    <img id="slide-lightbox-img" class="slide-lightbox-img" src="" alt="Full Slide Preview">
                    <div id="slide-lightbox-title" class="slide-lightbox-title"></div>
                </div>
            `;
            document.body.appendChild(lightbox);
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) window.closeSlideLightbox();
            });
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') window.closeSlideLightbox();
            });
        }

        const img = document.getElementById('slide-lightbox-img');
        const titleEl = document.getElementById('slide-lightbox-title');
        if (img) img.src = imgSrc;
        if (titleEl) titleEl.textContent = title || '';

        lightbox.classList.add('active');
        if (typeof window.playSound === 'function') window.playSound('click');
    };

    window.closeSlideLightbox = function() {
        const lightbox = document.getElementById('slide-global-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
        }
    };

    function init() {
        document.body.classList.add('app-page');
        if (typeof window.initAudio === 'function') {
            document.body.addEventListener('pointerdown', window.initAudio, { once: true });
            document.body.addEventListener('click', window.initAudio, { once: true });
        }
        attachSoundListeners();
        initCollapsibleSections();
        initStageFilters();
        initDashboardSearch();
        initLessonTrackingAndResume();
        initVocabStudyTools();
        initGlobalPracticeHub();

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
