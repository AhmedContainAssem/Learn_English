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
        if (window.AssemUtils && typeof window.AssemUtils.normalizeAr === 'function') {
            return window.AssemUtils.normalizeAr(str);
        }
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
            } catch (e) {
                // Ignore storage errors
            }
            return;
        }

        const resumeContainer = document.getElementById('dashboardResumeContainer');
        if (!resumeContainer) return;

        try {
            let data = null;
            if (window.AssemStorage && typeof window.AssemStorage.get === 'function') {
                data = window.AssemStorage.get('assem_recent_lesson', null);
            } else {
                const saved = localStorage.getItem('assem_recent_lesson');
                data = saved ? JSON.parse(saved) : null;
            }

            let resumeHtml = '';
            if (data && data.title && data.url) {
                resumeHtml = `
                    <div class="resume-learning-banner" role="complementary" aria-label="متابعة آخر درس">
                        <div class="resume-info">
                            <span class="resume-label">📖 تابع من حيث توقفت:</span>
                            <span class="resume-title">${data.title}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:10px;">
                            <a href="${data.url}" class="resume-btn">استئناف المذاكرة ←</a>
                            <button class="resume-dismiss" type="button" title="إخفاء" onclick="this.closest('.resume-learning-banner').remove(); if(window.AssemStorage) { window.AssemStorage.remove('assem_recent_lesson'); } else { localStorage.removeItem('assem_recent_lesson'); }">✕</button>
                        </div>
                    </div>
                `;
            }

            // Quick Blitz Widget for dashboard (Phase 4 integration)
            let blitzHtml = '';
            const practiceBank = (window.AssemStorage && typeof window.AssemStorage.getPracticeBank === 'function')
                ? window.AssemStorage.getPracticeBank()
                : [];

            if (practiceBank.length > 0) {
                blitzHtml = `
                    <div class="daily-blitz-banner" role="region" aria-label="تحدي المراجعة السريعة">
                        <div class="blitz-info">
                            <span class="blitz-icon">⚡</span>
                            <div>
                                <h3 class="blitz-title">تحدي المراجعة السريعة (Quick Blitz)</h3>
                                <p class="blitz-desc">لديك <strong>${practiceBank.length}</strong> كلمة جاهزة للمراجعة والتثبيت بالبطاقات التفاعلية.</p>
                            </div>
                        </div>
                        <button type="button" class="blitz-btn" onclick="const hubBtn = document.getElementById('practiceHubBtn'); if(hubBtn) hubBtn.click();">
                            <span>🚀 ابدأ المراجعة (3 دقائق)</span>
                        </button>
                    </div>
                `;
            }

            resumeContainer.innerHTML = resumeHtml + blitzHtml;
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

    function ensurePracticeHubDOM() {
        // Ensure Modal Container exists
        let modal = document.getElementById('practiceHubModal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'practiceHubModal';
            modal.className = 'practice-modal-backdrop';
            modal.style.display = 'none';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', 'practiceModalTitle');
            modal.innerHTML = `
                <div class="practice-modal-container">
                    <div class="practice-modal-header">
                        <div class="practice-modal-title-group">
                            <span class="practice-modal-icon">⭐</span>
                            <div>
                                <h2 id="practiceModalTitle" class="practice-modal-title">بنك المراجعة الذكي</h2>
                                <span class="practice-modal-subtitle">كلماتك المحفوظة للمراجعة من الدروس والكويزات</span>
                            </div>
                        </div>
                        <div class="practice-modal-actions">
                            <button type="button" class="modal-mode-toggle" id="practiceModeToggleBtn">🃏 وضع البطاقات</button>
                            <button type="button" class="practice-modal-close" id="practiceModalCloseBtn" aria-label="إغلاق النافذة">✕</button>
                        </div>
                    </div>

                    <div class="practice-modal-body">
                        <!-- List View Mode -->
                        <div id="practiceListView" class="practice-list-view">
                            <div id="practiceListContainer" class="practice-items-grid"></div>
                        </div>

                        <!-- Flashcard View Mode -->
                        <div id="practiceFlashcardView" class="practice-flashcard-view" style="display: none;">
                            <div class="practice-flashcard-wrapper">
                                <div class="flashcard-counter" id="flashcardCounter">بطاقة 1 من 1</div>
                                <div class="flashcard-box" id="practiceFlashcardBox" role="button" tabindex="0" title="انقر لقلب البطاقة">
                                    <div class="flashcard-inner">
                                        <div class="flashcard-face flashcard-front">
                                            <span class="flashcard-prompt">انقر لإظهار الترجمة 👆</span>
                                            <h3 class="flashcard-word" id="flashcardFrontWord">Word</h3>
                                            <button type="button" class="audio-btn flashcard-audio-btn" id="flashcardAudioBtn" title="استمع للكلمة">🔊</button>
                                        </div>
                                        <div class="flashcard-face flashcard-back">
                                            <span class="flashcard-prompt">الترجمة العربية</span>
                                            <div class="flashcard-trans" id="flashcardBackTrans">الترجمة</div>
                                        </div>
                                    </div>
                                </div>
                                <div class="flashcard-controls">
                                    <button type="button" class="flashcard-nav-btn" id="flashcardPrevBtn">السابق</button>
                                    <button type="button" class="flashcard-action-mastered" id="flashcardMasteredBtn">✅ أتقنتها (إزالة)</button>
                                    <button type="button" class="flashcard-nav-btn" id="flashcardNextBtn">التالي</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }

        // Check for trigger button. If not present (e.g. in lessons), create floating button.
        let triggerBtn = document.getElementById('practiceHubBtn');
        if (!triggerBtn) {
            triggerBtn = document.createElement('button');
            triggerBtn.type = 'button';
            triggerBtn.id = 'practiceHubBtn';
            triggerBtn.className = 'practice-hub-floating-btn';
            triggerBtn.title = 'فتح بنك المراجعة الذكي والبطاقات';
            triggerBtn.innerHTML = `⭐ بنك المراجعة <span id="practiceBankBadge" class="practice-hub-badge" style="display:none;">0</span>`;
            document.body.appendChild(triggerBtn);
        }

        return { modal, triggerBtn };
    }

    function initGlobalPracticeHub() {
        const { modal, triggerBtn } = ensurePracticeHubDOM();
        const badge = document.getElementById('practiceBankBadge');
        if (!triggerBtn || !modal) return;

        let activeMode = 'list'; // 'list' | 'flashcards'
        let flashcardIndex = 0;

        function updateBadge() {
            if (!badge || !window.AssemStorage) return;
            const bank = window.AssemStorage.getPracticeBank();
            const count = bank.length;
            if (count > 0) {
                badge.textContent = count;
                badge.style.display = 'inline-flex';
            } else {
                badge.style.display = 'none';
            }
        }

        function openModal() {
            updateBadge();
            renderHubContent();
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            if (typeof window.playSound === 'function') window.playSound('click');
        }

        function closeModal() {
            modal.style.display = 'none';
            document.body.style.overflow = '';
            updateBadge();
        }

        function renderHubContent() {
            if (!window.AssemStorage) return;
            const bank = window.AssemStorage.getPracticeBank();
            const listContainer = document.getElementById('practiceListContainer');
            const listView = document.getElementById('practiceListView');
            const flashcardView = document.getElementById('practiceFlashcardView');
            const modeToggleBtn = document.getElementById('practiceModeToggleBtn');

            if (activeMode === 'list') {
                if (listView) listView.style.display = 'block';
                if (flashcardView) flashcardView.style.display = 'none';
                if (modeToggleBtn) modeToggleBtn.textContent = '🃏 وضع البطاقات';

                if (!listContainer) return;
                listContainer.innerHTML = '';

                if (bank.length === 0) {
                    listContainer.innerHTML = `
                        <div class="practice-empty-state">
                            <span class="empty-icon">🎉</span>
                            <h3 class="empty-title">بنك المراجعة فارغ!</h3>
                            <p class="empty-desc">رائع، لا توجد كلمات تحتاج لمراجعة حالياً. عندما تضغط على "⭐ للمراجعة" في أي درس أو تخطئ في كويز، ستُحفظ هنا تلقائياً لتتدرب عليها.</p>
                        </div>
                    `;
                    return;
                }

                bank.forEach(item => {
                    const row = document.createElement('div');
                    row.className = 'practice-item-row';
                    row.innerHTML = `
                        <div class="practice-item-info">
                            <div class="practice-word-heading">
                                <span class="practice-en-word">${item.word}</span>
                                <button type="button" class="audio-btn practice-audio-btn" title="استمع للكلمة">🔊</button>
                            </div>
                            <div class="practice-ar-trans">${item.translation || '—'}</div>
                        </div>
                        <div class="practice-item-actions">
                            ${item.lessonUrl ? `<a href="${item.lessonUrl}" class="practice-lesson-link" title="الذهاب لدرس الكلمة">📖 الدرس</a>` : ''}
                            <button type="button" class="practice-remove-btn" title="أتقنت الكلمة وحذفها من البنك">✅ أتقنتها</button>
                        </div>
                    `;

                    row.querySelector('.practice-audio-btn').onclick = (e) => {
                        e.stopPropagation();
                        if (typeof window.playSound === 'function') window.playSound('click');
                        if (typeof window.speakText === 'function') window.speakText(item.word);
                    };

                    row.querySelector('.practice-remove-btn').onclick = (e) => {
                        e.stopPropagation();
                        window.AssemStorage.removeFromPracticeBank(item.word);
                        if (typeof window.playSound === 'function') window.playSound('success');
                        renderHubContent();
                    };

                    listContainer.appendChild(row);
                });
            } else {
                // Flashcards mode
                if (listView) listView.style.display = 'none';
                if (flashcardView) flashcardView.style.display = 'block';
                if (modeToggleBtn) modeToggleBtn.textContent = '📋 وضع القائمة';

                if (bank.length === 0) {
                    activeMode = 'list';
                    renderHubContent();
                    return;
                }

                if (flashcardIndex >= bank.length) flashcardIndex = bank.length - 1;
                if (flashcardIndex < 0) flashcardIndex = 0;

                const currentItem = bank[flashcardIndex];
                const counter = document.getElementById('flashcardCounter');
                const frontWord = document.getElementById('flashcardFrontWord');
                const backTrans = document.getElementById('flashcardBackTrans');
                const box = document.getElementById('practiceFlashcardBox');

                if (box) box.classList.remove('is-flipped');
                if (counter) counter.textContent = `بطاقة ${flashcardIndex + 1} من ${bank.length}`;
                if (frontWord) frontWord.textContent = currentItem.word;
                if (backTrans) backTrans.textContent = currentItem.translation || 'لا توجد ترجمة مسجلة';
            }
        }

        // Trigger Click
        triggerBtn.addEventListener('click', openModal);

        // Close handlers
        const closeBtn = document.getElementById('practiceModalCloseBtn');
        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display !== 'none') {
                closeModal();
            }
        });

        // Mode Toggle Button
        const modeToggleBtn = document.getElementById('practiceModeToggleBtn');
        if (modeToggleBtn) {
            modeToggleBtn.addEventListener('click', () => {
                activeMode = (activeMode === 'list') ? 'flashcards' : 'list';
                flashcardIndex = 0;
                renderHubContent();
                if (typeof window.playSound === 'function') window.playSound('click');
            });
        }

        // Flashcard Interactions
        const box = document.getElementById('practiceFlashcardBox');
        if (box) {
            box.addEventListener('click', () => {
                box.classList.toggle('is-flipped');
                if (typeof window.playSound === 'function') window.playSound('click');
            });
        }

        const audioBtn = document.getElementById('flashcardAudioBtn');
        if (audioBtn) {
            audioBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const bank = window.AssemStorage.getPracticeBank();
                if (bank[flashcardIndex]) {
                    if (typeof window.playSound === 'function') window.playSound('click');
                    if (typeof window.speakText === 'function') window.speakText(bank[flashcardIndex].word);
                }
            });
        }

        const nextBtn = document.getElementById('flashcardNextBtn');
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const bank = window.AssemStorage.getPracticeBank();
                if (bank.length === 0) return;
                flashcardIndex = (flashcardIndex + 1) % bank.length;
                renderHubContent();
                if (typeof window.playSound === 'function') window.playSound('click');
            });
        }

        const prevBtn = document.getElementById('flashcardPrevBtn');
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const bank = window.AssemStorage.getPracticeBank();
                if (bank.length === 0) return;
                flashcardIndex = (flashcardIndex - 1 + bank.length) % bank.length;
                renderHubContent();
                if (typeof window.playSound === 'function') window.playSound('click');
            });
        }

        const masteredBtn = document.getElementById('flashcardMasteredBtn');
        if (masteredBtn) {
            masteredBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const bank = window.AssemStorage.getPracticeBank();
                if (bank[flashcardIndex]) {
                    const word = bank[flashcardIndex].word;
                    window.AssemStorage.removeFromPracticeBank(word);
                    if (typeof window.playSound === 'function') window.playSound('success');
                    if (flashcardIndex >= bank.length - 1) flashcardIndex = Math.max(0, bank.length - 2);
                    renderHubContent();
                }
            });
        }

        // Listen for storage updates
        window.addEventListener('assem:practice-bank-updated', () => {
            updateBadge();
            if (modal.style.display === 'flex') {
                renderHubContent();
            }
            initLessonTrackingAndResume();
        });

        // Initial badge sync
        updateBadge();
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
