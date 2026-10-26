/**
 * AssemPlatform Global Practice Hub & Flashcard Review System (practice-hub.js)
 * Modular Subsystem: Manages the smart review bank modal, flashcard flip deck,
 * audio pronunciation, and localStorage persistence for student mastery.
 */

(function (window) {
    'use strict';

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
                                            <button type="button" class="audio-btn flashcard-audio-btn" id="flashcardAudioBtn" onclick="event.stopPropagation(); if(window.speakPracticeWord) window.speakPracticeWord();" title="استمع للكلمة">🔊</button>
                                        </div>
                                        <div class="flashcard-face flashcard-back">
                                            <span class="flashcard-prompt">الترجمة العربية • انقر للعودة 🔄</span>
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
            modal.style.display = 'flex';
            modal.style.visibility = 'visible';
            modal.style.opacity = '1';
            document.body.style.overflow = 'hidden';
            if (typeof window.playSound === 'function') window.playSound('click');
            try {
                updateBadge();
                renderHubContent();
            } catch (err) {
                console.error('[PracticeHub] Error rendering content:', err);
            }
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

                let translation = currentItem.translation;
                if (!translation || translation === '—' || translation === 'لا توجد ترجمة مسجلة') {
                    if (window.lessonData) {
                        const vocabs = (window.lessonData.keyVocabulary || window.lessonData.vocabulary || [])
                            .concat(window.lessonData.importantVocabulary || window.lessonData.accumulativeVocabulary || [])
                            .concat(window.lessonData.definitions || [])
                            .concat(window.lessonData.synonyms || []);
                        const match = vocabs.find(v => (v.word || v.infinitive || '').toLowerCase().trim() === currentItem.word.toLowerCase().trim());
                        if (match) {
                            translation = match.meaning || match.translation || match.ar || match.arabic || match.meaningAr || translation;
                            currentItem.translation = translation;
                        }
                    }
                }

                if (counter) {
                    counter.textContent = `بطاقة ${flashcardIndex + 1} من ${bank.length}`;
                    counter.dataset.index = flashcardIndex;
                }
                if (frontWord) frontWord.textContent = currentItem.word;
                if (backTrans) backTrans.textContent = translation || 'لا توجد ترجمة مسجلة';

                if (box) {
                    box.classList.remove('is-flipped', 'flipped');
                    const front = box.querySelector('.flashcard-front');
                    const back = box.querySelector('.flashcard-back');
                    const inner = box.querySelector('.flashcard-inner');
                    if (inner) inner.style.transform = 'rotateY(0deg)';
                    if (front) {
                        front.style.opacity = '1';
                        front.style.visibility = 'visible';
                        front.style.pointerEvents = 'auto';
                        front.style.zIndex = '2';
                    }
                    if (back) {
                        back.style.opacity = '0';
                        back.style.visibility = 'hidden';
                        back.style.pointerEvents = 'none';
                        back.style.zIndex = '1';
                        back.style.transform = 'rotateY(180deg)';
                    }
                }
            }
        }

        window.openPracticeHub = openModal;
        window.closePracticeHub = closeModal;

        // Trigger Click via direct listener and global event delegation
        triggerBtn.addEventListener('click', openModal);
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('#practiceHubBtn, .practice-hub-trigger, .practice-hub-floating-btn, .blitz-btn');
            if (trigger) {
                e.preventDefault();
                openModal();
            }
        });

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

        // Flashcard Global Interaction Handlers
        let lastToggleTime = 0;
        window.togglePracticeFlashcard = function (explicitState) {
            const now = Date.now();
            if (now - lastToggleTime < 180) return; // Prevent double toggle from bubbling
            lastToggleTime = now;

            const b = document.getElementById('practiceFlashcardBox');
            if (!b) return;

            const isCurrentlyFlipped = b.classList.contains('is-flipped') || b.classList.contains('flipped');
            const nextState = (typeof explicitState === 'boolean') ? explicitState : !isCurrentlyFlipped;

            b.classList.toggle('is-flipped', nextState);
            b.classList.toggle('flipped', nextState);

            const inner = b.querySelector('.flashcard-inner');
            const front = b.querySelector('.flashcard-front');
            const back = b.querySelector('.flashcard-back');

            if (inner) {
                inner.style.transform = nextState ? 'rotateY(180deg)' : 'rotateY(0deg)';
            }
            if (front) {
                front.style.opacity = nextState ? '0' : '1';
                front.style.visibility = nextState ? 'hidden' : 'visible';
                front.style.pointerEvents = nextState ? 'none' : 'auto';
                front.style.zIndex = nextState ? '1' : '2';
            }
            if (back) {
                back.style.opacity = nextState ? '1' : '0';
                back.style.visibility = nextState ? 'visible' : 'hidden';
                back.style.pointerEvents = nextState ? 'auto' : 'none';
                back.style.zIndex = nextState ? '2' : '1';
                back.style.transform = 'rotateY(180deg)';
            }

            if (typeof window.playSound === 'function') {
                window.playSound('click');
            }
        };

        window.speakPracticeWord = function (explicitWord) {
            let wordToSpeak = explicitWord;
            if (!wordToSpeak) {
                const frontEl = document.getElementById('flashcardFrontWord');
                if (frontEl && frontEl.textContent && frontEl.textContent.trim() !== 'Word') {
                    wordToSpeak = frontEl.textContent.trim();
                } else {
                    const bank = (window.AssemStorage && typeof window.AssemStorage.getPracticeBank === 'function')
                        ? window.AssemStorage.getPracticeBank() : [];
                    const counterEl = document.getElementById('flashcardCounter');
                    let idx = flashcardIndex;
                    if (counterEl && counterEl.dataset.index) {
                        idx = parseInt(counterEl.dataset.index, 10);
                    }
                    if (bank && bank[idx] && bank[idx].word) {
                        wordToSpeak = bank[idx].word;
                    }
                }
            }
            if (!wordToSpeak || wordToSpeak === 'Word') return;

            const audioBtn = document.getElementById('flashcardAudioBtn');
            if (audioBtn) {
                audioBtn.classList.add('is-playing');
                setTimeout(() => audioBtn.classList.remove('is-playing'), 650);
            }

            if (typeof window.speakText === 'function') {
                window.speakText(wordToSpeak, audioBtn);
            } else if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
                if (window.speechSynthesis.paused) window.speechSynthesis.resume();
                const u = new SpeechSynthesisUtterance(wordToSpeak);
                u.lang = 'en-US';
                u.rate = 0.92;
                const voices = window.speechSynthesis.getVoices();
                if (voices && voices.length) {
                    const enVoice = voices.find(v => v.lang && (v.lang.startsWith('en') || v.lang.includes('US') || v.lang.includes('GB'))) ||
                                    voices.find(v => v.name && v.name.toLowerCase().includes('english'));
                    if (enVoice) u.voice = enVoice;
                }
                window.speechSynthesis.speak(u);
            }
        };

        // Delegated Global Handlers for Flashcard interactions
        document.addEventListener('click', (e) => {
            const audioBtn = e.target.closest('#flashcardAudioBtn, .flashcard-audio-btn');
            if (audioBtn) {
                e.stopPropagation();
                window.speakPracticeWord();
                return;
            }

            const box = e.target.closest('#practiceFlashcardBox, .flashcard-box');
            if (box && !e.target.closest('button, .audio-btn, a')) {
                window.togglePracticeFlashcard();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const box = document.activeElement && document.activeElement.closest('#practiceFlashcardBox, .flashcard-box');
                if (box && !document.activeElement.closest('button, .audio-btn')) {
                    e.preventDefault();
                    window.togglePracticeFlashcard();
                }
            }
        });

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
            if (typeof window.initLessonTrackingAndResume === 'function') {
                window.initLessonTrackingAndResume();
            }
        });

        // Initial badge sync
        updateBadge();
    }

    window.initGlobalPracticeHub = initGlobalPracticeHub;

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGlobalPracticeHub);
    } else {
        initGlobalPracticeHub();
    }

})(typeof window !== 'undefined' ? window : this);
