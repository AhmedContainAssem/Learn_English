/**
 * AssemVocabMastery - Leitner 3-Tier Vocabulary Mastery Engine
 * Provides interactive self-assessment on vocabulary cards,
 * sticky progress bar tracking, and decoupled quiz-to-vocab reverse binding.
 */

(function (window) {
    'use strict';

    let isInitialized = false;

    function getWordFromCard(card) {
        const wordElem = card.querySelector('.word-en');
        if (!wordElem) return null;
        const text = wordElem.textContent || '';
        return (window.AssemUtils && window.AssemUtils.cleanWordKey)
            ? window.AssemUtils.cleanWordKey(text)
            : text.toLowerCase().trim();
    }

    function getArabicTranslationFromCard(card) {
        const body = card.querySelector('.card-body');
        if (!body) return '';
        const strong = body.querySelector('strong');
        if (strong && strong.nextSibling) {
            return (strong.nextSibling.textContent || '').replace(/^[:\s/]+/, '').trim();
        }
        return (body.textContent || '').substring(0, 40).trim();
    }

    const AssemVocabMastery = {
        init: function () {
            const cards = document.querySelectorAll('.card, .flashcard');
            const vocabCards = Array.from(cards).filter(c => c.querySelector('.word-en'));
            if (vocabCards.length === 0) return;

            if (!isInitialized) {
                isInitialized = true;
                this.mountTracker(vocabCards);
                this.setupEventListeners();
            }

            this.mountCardActions(vocabCards);
            this.updateTracker();
        },

        mountTracker: function (vocabCards) {
            if (document.getElementById('vocabMasteryTracker')) return;

            // Find best insertion point (before first tab-content or above cards-grid)
            const firstVocabCard = vocabCards[0];
            const container = firstVocabCard.closest('.tab-content') || firstVocabCard.closest('.cards-grid') || firstVocabCard.parentElement;
            if (!container) return;

            const tracker = document.createElement('div');
            tracker.id = 'vocabMasteryTracker';
            tracker.className = 'vocab-mastery-tracker';
            tracker.setAttribute('role', 'region');
            tracker.setAttribute('aria-label', 'مؤشر إتقان الكلمات');

            tracker.innerHTML = `
                <div class="tracker-header">
                    <div class="tracker-info">
                        <span class="tracker-icon">🎯</span>
                        <span class="tracker-title">مؤشر إتقان الكلمات:</span>
                        <span class="tracker-stats"><strong id="masteryCount">0</strong> / <strong id="totalVocabCount">${vocabCards.length}</strong> (<span id="masteryPercentage">0%</span>)</span>
                    </div>
                    <div class="tracker-filters" role="group" aria-label="تصفية الكلمات حسب حالة الإتقان">
                        <button type="button" class="mastery-filter-pill active" data-filter="all">عرض الكل</button>
                        <button type="button" class="mastery-filter-pill pill-practice" data-filter="needs_practice">⭐ للمراجعة (<span id="practiceCount">0</span>)</button>
                        <button type="button" class="mastery-filter-pill pill-mastered" data-filter="mastered">✅ المتقنة (<span id="masteredFilterCount">0</span>)</button>
                    </div>
                </div>
                <div class="tracker-progress-track">
                    <div class="tracker-progress-fill" id="masteryProgressFill" style="width: 0%"></div>
                </div>
                <div class="tracker-demote-notice" id="trackerDemoteNotice" style="display:none;" aria-live="polite"></div>
            `;

            // Insert above the container or inside the first section
            container.parentElement.insertBefore(tracker, container);

            // Filter button listeners
            tracker.querySelectorAll('.mastery-filter-pill').forEach(pill => {
                pill.addEventListener('click', (e) => {
                    e.stopPropagation();
                    tracker.querySelectorAll('.mastery-filter-pill').forEach(p => p.classList.remove('active'));
                    pill.classList.add('active');
                    this.applyFilter(pill.dataset.filter);
                    if (typeof window.playSound === 'function') window.playSound('click');
                });
            });
        },

        mountCardActions: function (vocabCards) {
            const masteryData = (window.AssemStorage && typeof window.AssemStorage.getLessonMastery === 'function')
                ? window.AssemStorage.getLessonMastery()
                : {};

            vocabCards.forEach(card => {
                if (card.dataset.masteryMounted === 'true') return;
                card.dataset.masteryMounted = 'true';

                const wordKey = getWordFromCard(card);
                if (!wordKey) return;

                const wordState = masteryData[wordKey] || { status: 'in_progress' };
                this.applyCardVisualState(card, wordState.status);

                const bar = document.createElement('div');
                bar.className = 'vocab-card-mastery-bar';
                bar.setAttribute('role', 'group');
                bar.setAttribute('aria-label', `حالة حفظ كلمة ${wordKey}`);

                bar.innerHTML = `
                    <button type="button" class="mastery-action-btn btn-practice ${wordState.status === 'needs_practice' ? 'is-active' : ''}" 
                            data-action="needs_practice" title="تحديد الكلمة للمراجعة والتدريب">
                        <span class="btn-icon">⭐</span>
                        <span class="btn-text">للمراجعة</span>
                    </button>
                    <button type="button" class="mastery-action-btn btn-mastered ${wordState.status === 'mastered' ? 'is-active' : ''}" 
                            data-action="mastered" title="تأكيد إتقان الكلمة">
                        <span class="btn-icon">✅</span>
                        <span class="btn-text">أتقنتها</span>
                    </button>
                `;

                // Add click events with strict stopPropagation
                bar.querySelectorAll('.mastery-action-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        this.handleMasteryToggle(card, wordKey, btn.dataset.action);
                    });
                });

                // Attach bar to card
                const header = card.querySelector('.card-header') || card;
                header.appendChild(bar);
            });
        },

        handleMasteryToggle: function (card, wordKey, targetAction) {
            if (!window.AssemStorage) return;

            const currentMastery = window.AssemStorage.getLessonMastery();
            const existingState = currentMastery[wordKey] || { status: 'in_progress' };
            const isCurrentlyActive = existingState.status === targetAction;

            // If clicking active button, toggle back to in_progress
            const newStatus = isCurrentlyActive ? 'in_progress' : targetAction;
            window.AssemStorage.setWordMastery(wordKey, newStatus);

            // Synchronize Practice Bank
            if (newStatus === 'needs_practice') {
                const translation = getArabicTranslationFromCard(card);
                window.AssemStorage.addToPracticeBank({
                    word: wordKey,
                    translation: translation,
                    lessonUrl: window.location.href
                });
                if (typeof window.playSound === 'function') window.playSound('click');
            } else if (newStatus === 'mastered') {
                window.AssemStorage.removeFromPracticeBank(wordKey);
                if (typeof window.playSound === 'function') window.playSound('success');
            } else {
                window.AssemStorage.removeFromPracticeBank(wordKey);
                if (typeof window.playSound === 'function') window.playSound('click');
            }

            // Update DOM
            this.applyCardVisualState(card, newStatus);
            this.updateCardButtons(card, newStatus);
            this.updateTracker();

            // Re-apply active filter if needed
            const activeFilter = document.querySelector('.mastery-filter-pill.active');
            if (activeFilter && activeFilter.dataset.filter !== 'all') {
                this.applyFilter(activeFilter.dataset.filter);
            }
        },

        applyCardVisualState: function (card, status) {
            card.classList.remove('state-mastered', 'state-needs-practice');
            if (status === 'mastered') {
                card.classList.add('state-mastered');
            } else if (status === 'needs_practice') {
                card.classList.add('state-needs-practice');
            }
        },

        updateCardButtons: function (card, status) {
            const bar = card.querySelector('.vocab-card-mastery-bar');
            if (!bar) return;

            const practiceBtn = bar.querySelector('.btn-practice');
            const masteredBtn = bar.querySelector('.btn-mastered');

            if (practiceBtn) practiceBtn.classList.toggle('is-active', status === 'needs_practice');
            if (masteredBtn) masteredBtn.classList.toggle('is-active', status === 'mastered');
        },

        updateTracker: function () {
            const tracker = document.getElementById('vocabMasteryTracker');
            if (!tracker || !window.AssemStorage) return;

            const cards = document.querySelectorAll('.card[data-mastery-mounted="true"]');
            const total = cards.length;
            if (total === 0) return;

            const masteryData = window.AssemStorage.getLessonMastery();
            let masteredCount = 0;
            let practiceCount = 0;

            cards.forEach(card => {
                const word = getWordFromCard(card);
                if (!word) return;
                const state = masteryData[word];
                if (state && state.status === 'mastered') masteredCount++;
                if (state && state.status === 'needs_practice') practiceCount++;
            });

            const percent = total > 0 ? Math.round((masteredCount / total) * 100) : 0;

            const masteryCountElem = document.getElementById('masteryCount');
            const totalVocabElem = document.getElementById('totalVocabCount');
            const percentElem = document.getElementById('masteryPercentage');
            const fillElem = document.getElementById('masteryProgressFill');
            const practiceCountElem = document.getElementById('practiceCount');
            const masteredFilterElem = document.getElementById('masteredFilterCount');

            if (masteryCountElem) masteryCountElem.textContent = masteredCount;
            if (totalVocabElem) totalVocabElem.textContent = total;
            if (percentElem) percentElem.textContent = `${percent}%`;
            if (fillElem) fillElem.style.width = `${percent}%`;
            if (practiceCountElem) practiceCountElem.textContent = practiceCount;
            if (masteredFilterElem) masteredFilterElem.textContent = masteredCount;
        },

        applyFilter: function (filter) {
            const cards = document.querySelectorAll('.card[data-mastery-mounted="true"]');
            cards.forEach(card => {
                if (filter === 'all') {
                    card.style.display = '';
                } else if (filter === 'mastered') {
                    card.style.display = card.classList.contains('state-mastered') ? '' : 'none';
                } else if (filter === 'needs_practice') {
                    card.style.display = card.classList.contains('state-needs-practice') ? '' : 'none';
                }
            });
        },

        setupEventListeners: function () {
            // Decoupled listener for quiz wrong answers (Phase 2 integration)
            window.addEventListener('assem:quiz-wrong-answer', (event) => {
                const detail = event.detail;
                if (!detail || !detail.correctAnswer) return;

                this.handleQuizWrongAnswer(detail);
            });
        },

        handleQuizWrongAnswer: function (detail) {
            if (!window.AssemStorage) return;

            const correctAnswer = detail.correctAnswer || '';
            const questionText = detail.questionText || '';
            const cards = document.querySelectorAll('.card[data-mastery-mounted="true"]');
            const masteryData = window.AssemStorage.getLessonMastery();

            let demotedWord = null;

            cards.forEach(card => {
                const wordKey = getWordFromCard(card);
                if (!wordKey) return;

                // Match with strict word boundary
                const escaped = (window.AssemUtils && window.AssemUtils.escapeRegExp)
                    ? window.AssemUtils.escapeRegExp(wordKey)
                    : wordKey;
                const boundaryRegex = new RegExp(`\\b${escaped}\\b`, 'i');

                const isAnswerMatch = boundaryRegex.test(correctAnswer);
                const isQuestionDefinitionMatch = (questionText.includes(`"${wordKey}"`) || questionText.includes(`'${wordKey}'`));

                if (isAnswerMatch || isQuestionDefinitionMatch) {
                    const currentStatus = masteryData[wordKey] ? masteryData[wordKey].status : 'in_progress';
                    if (currentStatus === 'mastered') {
                        // Demote to needs_practice
                        window.AssemStorage.setWordMastery(wordKey, 'needs_practice', {
                            failedInQuizCount: ((masteryData[wordKey].failedInQuizCount || 0) + 1)
                        });
                        const translation = getArabicTranslationFromCard(card);
                        window.AssemStorage.addToPracticeBank({
                            word: wordKey,
                            translation: translation,
                            lessonUrl: window.location.href
                        });

                        this.applyCardVisualState(card, 'needs_practice');
                        this.updateCardButtons(card, 'needs_practice');
                        demotedWord = wordKey;
                    }
                }
            });

            if (demotedWord) {
                this.updateTracker();
                this.showDemoteNotification(demotedWord);
            }
        },

        showDemoteNotification: function (word) {
            const notice = document.getElementById('trackerDemoteNotice');
            if (!notice) return;

            notice.innerHTML = `⚠️ تمت إعادة كلمة <strong>(${word})</strong> لقائمة المراجعة لأنك أخطأت في سؤالها بالكويز.`;
            notice.style.display = 'block';
            setTimeout(() => {
                notice.style.display = 'none';
            }, 6000);
        }
    };

    window.AssemVocabMastery = AssemVocabMastery;

})(typeof window !== 'undefined' ? window : this);
