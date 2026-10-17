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
