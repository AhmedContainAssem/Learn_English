/**
 * Gamified Quiz Engine Module (quiz-engine.js)
 * Manages question state, options rendering, score tallying, audio feedback, and results view.
 */

(function (window) {
    'use strict';

    /**
     * Universal Fisher-Yates Shuffle Utility
     * Exported globally as window.shuffleArray and window.shuffle
     */
    function shuffleArray(array) {
        if (!Array.isArray(array)) return array;
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    /**
     * BiDi Text Helper for questions, options, and feedback messages
     */
    function formatBidi(text) {
        if (window.BiDi && typeof window.BiDi.format === 'function') {
            return window.BiDi.format(text);
        }
        if (typeof window.formatBiDiText === 'function') {
            return window.formatBiDiText(text);
        }
        return text || '';
    }

    class QuizEngine {
        constructor(config = {}) {
            this.config = {
                shuffleQuestions: true,
                shuffleOptions: true,
                ...config
            };
            this.rawQuestionsData = null;
            this.questions = [];
            this.currentIndex = 0;
            this.score = 0;
            this.answered = false;
            this.page = {};
            this.refreshElements();
        }

        static shuffle(array) {
            return shuffleArray(array);
        }

        refreshElements() {
            this.page = {
                titleElement: document.getElementById('title') || document.querySelector('.title'),
                descriptionElement: document.getElementById('description') || document.querySelector('.subtitle'),
                currentElement: document.getElementById('current-q') || document.getElementById('q-current'),
                totalElement: document.getElementById('total-q') || document.getElementById('q-total'),
                scoreElement: document.getElementById('score') || document.getElementById('quiz-score'),
                emojiElement: document.getElementById('emoji'),
                questionElement: document.getElementById('question') || document.getElementById('question-text') || document.getElementById('question-box'),
                optionsContainer: document.getElementById('options') || document.getElementById('options-container') || document.getElementById('options-box') || document.querySelector('.options'),
                feedbackElement: document.getElementById('feedback') || document.getElementById('quiz-feedback') || document.getElementById('quiz-result'),
                nextButton: document.getElementById('next-btn') || document.getElementById('next-q-btn'),
                cardElement: document.querySelector('.question-card') || document.querySelector('.quiz-card') || document.getElementById('quiz-body')
            };
        }

        normalizeQuestions(rawData) {
            if (!rawData) return [];

            // Case 1: Already an array
            if (Array.isArray(rawData)) {
                return rawData;
            }

            // Case 2: Object with title / description
            if (typeof rawData === 'object') {
                this.refreshElements();
                if (rawData.title && this.page.titleElement) {
                    this.page.titleElement.textContent = rawData.title;
                }
                if (rawData.description && this.page.descriptionElement) {
                    this.page.descriptionElement.textContent = rawData.description;
                }

                // Subcase 2a: Contains sections
                if (Array.isArray(rawData.sections)) {
                    const allQuestions = [];
                    rawData.sections.forEach(section => {
                        if (Array.isArray(section.questions)) {
                            allQuestions.push(...section.questions);
                        }
                    });
                    return allQuestions;
                }

                // Subcase 2b: Contains questions directly
                if (Array.isArray(rawData.questions)) {
                    return rawData.questions;
                }
            }

            return [];
        }

        loadQuestions(questionsData) {
            this.refreshElements();
            this.rawQuestionsData = questionsData;
            const normalized = this.normalizeQuestions(questionsData);
            
            // Automatic Question Shuffling Inheritance: Every lesson/page gets randomized questions
            if (this.config.shuffleQuestions !== false) {
                this.questions = shuffleArray(normalized);
            } else {
                this.questions = [...normalized];
            }

            this.currentIndex = 0;
            this.score = 0;
            this.correctCount = 0;
            this.wrongCount = 0;
            this.answered = false;

            this.totalPossibleScore = this.questions.reduce((acc, q) => {
                const pts = typeof q.points === 'number' ? q.points : 10;
                return acc + pts;
            }, 0);

            if (this.page.totalElement) {
                this.page.totalElement.textContent = this.questions.length;
            }
            if (this.page.scoreElement) {
                this.page.scoreElement.textContent = '0';
            }

            if (this.questions.length > 0) {
                this.renderQuestion();
            } else if (this.page.questionElement) {
                this.page.questionElement.innerHTML = '<span style="color: var(--accent-orange, #ffb703);">لا توجد أسئلة متوفرة حالياً.</span>';
            }
        }

        renderQuestion() {
            this.refreshElements();
            const question = this.questions[this.currentIndex];
            if (!question) {
                this.showResults();
                return;
            }

            if (this.page.currentElement) {
                this.page.currentElement.textContent = this.currentIndex + 1;
            }
            if (this.page.totalElement) {
                this.page.totalElement.textContent = this.questions.length;
            }
            if (this.page.emojiElement) {
                this.page.emojiElement.textContent = question.emoji || '🎯';
            }

            if (this.page.questionElement) {
                const qText = question.question || '';
                const formattedQ = formatBidi(qText);
                this.page.questionElement.innerHTML = `
                    <span class="q-main-text" style="vertical-align:middle; display: inline-block;">${formattedQ}</span>
                    <button class="audio-btn" style="margin-right: 10px; display: inline-flex; vertical-align: middle; cursor: pointer;" title="استمع للسؤال" type="button">🔊</button>
                `;
                const qAudioBtn = this.page.questionElement.querySelector('.audio-btn');
                if (qAudioBtn) {
                    qAudioBtn.onclick = (e) => {
                        e.stopPropagation();
                        if (typeof window.playSound === 'function') window.playSound('click');
                        if (typeof window.speakText === 'function') window.speakText(qText);
                    };
                }
            }

            this.setFeedbackText('');
            this.setFeedbackState('');
            this.setNextButtonVisibility(false);
            this.renderOptions(question);
        }

        renderOptions(question) {
            this.refreshElements();
            if (!this.page.optionsContainer) return;
            this.page.optionsContainer.innerHTML = '';

            const rawOptions = Array.isArray(question.options) ? question.options : [];
            // Automatic Option Shuffling: randomize choice order for fair testing
            const optionsList = (this.config.shuffleOptions !== false) ? shuffleArray(rawOptions) : rawOptions;

            optionsList.forEach(option => {
                // Support both { text: "...", isCorrect: true } and string options with question.answer
                const isObject = typeof option === 'object' && option !== null;
                const optionText = isObject ? (option.text || '') : String(option);
                const isCorrect = isObject 
                    ? (option.isCorrect === true) 
                    : (optionText.trim().toLowerCase() === String(question.answer || '').trim().toLowerCase());

                const button = document.createElement('button');
                button.type = 'button';
                button.className = 'quiz-option-btn';
                button.style.display = 'flex';
                button.style.alignItems = 'center';
                button.style.justifyContent = 'space-between';
                button.style.gap = '10px';

                const txtSpan = document.createElement('span');
                txtSpan.className = 'quiz-option-text';
                txtSpan.innerHTML = formatBidi(optionText);
                button.appendChild(txtSpan);

                const audioSpan = document.createElement('span');
                audioSpan.className = 'audio-btn';
                audioSpan.style.cssText = 'font-size: 1rem; flex-shrink: 0; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%;';
                audioSpan.innerHTML = '🔊';
                audioSpan.title = 'استمع للخيار';
                audioSpan.onclick = (e) => {
                    e.stopPropagation();
                    if (typeof window.playSound === 'function') window.playSound('click');
                    if (typeof window.speakText === 'function') window.speakText(optionText);
                };
                button.appendChild(audioSpan);

                button.onclick = () => {
                    if (typeof window.playSound === 'function') {
                        window.playSound('click');
                    }
                    this.handleAnswer({ text: optionText, isCorrect: isCorrect }, button, question);
                };
                this.page.optionsContainer.appendChild(button);
            });
        }

        handleAnswer(option, button, question) {
            if (this.answered) return;
            this.answered = true;

            const isCorrect = option.isCorrect === true;
            const points = typeof question.points === 'number' ? question.points : 10;

            if (isCorrect) {
                this.correctCount += 1;
                button.classList.add('correct');
                this.score += points;
                if (this.page.scoreElement) {
                    this.page.scoreElement.textContent = this.score;
                }
                setTimeout(() => {
                    if (typeof window.playCorrectFX === 'function') {
                        window.playCorrectFX();
                    }
                }, 60);
                this.setFeedbackText(question.correctMsg || `إجابة صحيحة! أحسنت 🎯 (+${points} نقاط)`);
                this.setFeedbackState('success');
            } else {
                this.wrongCount += 1;
                button.classList.add('wrong');
                this.disableOptions(button);
                setTimeout(() => {
                    if (typeof window.playWrongFX === 'function') {
                        window.playWrongFX();
                    }
                }, 60);
                this.setFeedbackText(question.wrongMsg || 'إجابة غير صحيحة، ركز في المحاولة القادمة!');
                this.setFeedbackState('error');
                this.markCorrectOption(question);
            }

            this.setNextButtonVisibility(true);
        }

        disableOptions(selectedButton) {
            this.refreshElements();
            if (!this.page.optionsContainer) return;
            const buttons = Array.from(this.page.optionsContainer.querySelectorAll('button'));
            buttons.forEach(btn => {
                btn.disabled = true;
                if (btn !== selectedButton) {
                    btn.style.opacity = '0.75';
                }
            });
        }

        markCorrectOption(currentQuestion) {
            this.refreshElements();
            if (!this.page.optionsContainer) return;
            const buttons = Array.from(this.page.optionsContainer.querySelectorAll('button'));
            buttons.forEach(button => {
                const optText = button.querySelector('span')?.textContent || button.textContent;
                if (Array.isArray(currentQuestion.options)) {
                    const optObj = currentQuestion.options.find(o => (typeof o === 'object' ? o.text : o) === optText.trim());
                    const isRight = typeof optObj === 'object' ? optObj?.isCorrect : (optText.trim() === String(currentQuestion.answer || '').trim());
                    if (isRight) {
                        button.classList.add('correct');
                    }
                }
            });
        }

        setNextButtonVisibility(visible) {
            this.refreshElements();
            if (this.page.nextButton) {
                this.page.nextButton.style.display = visible ? 'inline-flex' : 'none';
            }
        }

        setFeedbackText(text) {
            this.refreshElements();
            if (this.page.feedbackElement) {
                this.page.feedbackElement.innerHTML = formatBidi(text);
            }
        }

        setFeedbackState(state) {
            this.refreshElements();
            if (!this.page.feedbackElement) return;
            this.page.feedbackElement.className = 'feedback quiz-feedback';
            if (state) {
                this.page.feedbackElement.classList.add(state);
            }
        }

        nextQuestion() {
            if (typeof window.playSound === 'function') {
                window.playSound('click');
            }
            this.currentIndex += 1;
            this.answered = false;
            if (this.currentIndex < this.questions.length) {
                this.renderQuestion();
            } else {
                this.showResults();
            }
        }

        showResults() {
            this.refreshElements();
            if (!this.page.cardElement) return;
            
            const totalScore = this.totalPossibleScore > 0 ? this.totalPossibleScore : (this.questions.length * 10);
            const percentage = totalScore > 0 ? Math.round((this.score / totalScore) * 100) : 0;
            
            let gradeBadge = '';
            let gradeColor = 'var(--accent-primary, #00f3ff)';
            let trophyEmoji = '🏆';

            if (percentage >= 90) {
                gradeBadge = '🌟 ممتاز مع مرتبة الشرف (Outstanding)';
                gradeColor = 'var(--accent-green, #10b981)';
                trophyEmoji = '🏆👑';
            } else if (percentage >= 75) {
                gradeBadge = '🎯 جيد جداً (Very Good)';
                gradeColor = 'var(--accent-primary, #00f3ff)';
                trophyEmoji = '🎯✨';
            } else if (percentage >= 50) {
                gradeBadge = '👍 جيد ومحاولة طيبة (Good Effort)';
                gradeColor = 'var(--accent-orange, #ffb703)';
                trophyEmoji = '👏';
            } else {
                gradeBadge = '💪 تدرب أكثر وستتفوق في المحاولة القادمة!';
                gradeColor = 'var(--accent-red, #ef4444)';
                trophyEmoji = '📚💡';
            }

            if (typeof window.playSound === 'function') {
                window.playSound(percentage >= 50 ? 'success' : 'click');
            }

            this.page.cardElement.innerHTML = `
                <div style="text-align: center; padding: 28px;">
                    <div style="font-size: 3.5rem; margin-bottom: 12px; filter: drop-shadow(0 0 15px rgba(0,243,255,0.4));">${trophyEmoji}</div>
                    <h2 style="color: ${gradeColor}; margin-bottom: 10px;">${gradeBadge}</h2>
                    <p style="font-size: 1.2rem; margin: 16px 0; color: var(--text-main, #f8fafc); line-height: 1.7;">
                        لقد حصلت على 
                        <strong style="color: var(--accent-orange, #ffb703); font-size: 1.6rem;">${this.score}</strong> 
                        من إجمالي <strong>${totalScore}</strong> نقطة 
                        <span style="display: block; font-size: 1rem; color: var(--text-muted); margin-top: 4px;">
                            (النسبة المئوية: <strong style="color: ${gradeColor}; font-size: 1.15rem;">${percentage}%</strong> | ✅ الإجابات الصحيحة: ${this.correctCount} من ${this.questions.length})
                        </span>
                    </p>
                    <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap; margin-top: 25px;">
                        <button onclick="quizEngine.restartQuiz()" class="action-btn" style="cursor: pointer;">🔄 إعادة الاختبار (أسئلة عشوائية)</button>
                        <a href="./index.html" class="action-btn secondary" style="text-decoration:none; display: inline-flex; align-items: center;">⬅ العودة لقائمة الدروس</a>
                    </div>
                </div>
            `;
        }

        restartQuiz() {
            if (typeof window.playSound === 'function') {
                window.playSound('click');
            }
            if (this.rawQuestionsData) {
                this.loadQuestions(this.rawQuestionsData);
            } else {
                location.reload();
            }
        }
    }

    // Singleton global instance
    const globalQuizEngine = new QuizEngine();

    function nextQuestion() {
        globalQuizEngine.nextQuestion();
    }

    // Attach to global window for universal inheritance
    window.shuffleArray = shuffleArray;
    window.shuffle = shuffleArray;
    window.QuizEngine = QuizEngine;
    window.quizEngine = globalQuizEngine;
    window.nextQuestion = nextQuestion;
    window.nextQuizQuestion = nextQuestion;

})(typeof window !== 'undefined' ? window : this);
