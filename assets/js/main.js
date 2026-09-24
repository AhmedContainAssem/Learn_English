/**
 * Master Application Bootstrap (main.js)
 * Automatically detects quiz datasets across all formats,
 * bootstraps decoupled architectural subsystems dynamically,
 * and maintains universal inheritance across 100% of existing lessons.
 */

(function (window) {
    'use strict';

    function getScriptBasePath() {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            const src = scripts[i].src || '';
            if (src.includes('assets/js/main.js')) {
                return src.substring(0, src.lastIndexOf('/') + 1);
            }
        }
        return '';
    }

    function loadScript(src, callback) {
        if (!src) {
            if (callback) callback();
            return;
        }
        if (document.querySelector(`script[src="${src}"]`)) {
            if (callback) callback();
            return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => { if (callback) callback(); };
        script.onerror = () => {
            console.warn('AssemPlatform: Non-critical subsystem failed to load:', src);
            if (callback) callback();
        };
        document.head.appendChild(script);
    }

    function bootstrapSubsystems() {
        const basePath = getScriptBasePath();
        if (!basePath) return;

        // Step 1: Ensure AssemUtils is loaded
        const ensureUtils = (next) => {
            if (window.AssemUtils) return next();
            loadScript(`${basePath}utils.js`, next);
        };

        // Step 2: Ensure AssemStorage is loaded
        const ensureStorage = (next) => {
            if (window.AssemStorage) return next();
            loadScript(`${basePath}storage.js`, next);
        };

        // Step 3: Ensure Vocab Mastery is loaded if page contains vocabulary cards
        const ensureVocabMastery = () => {
            const hasVocabCards = document.querySelector('.card, .flashcard, .word-en');
            if (hasVocabCards && !window.AssemVocabMastery) {
                loadScript(`${basePath}vocab-mastery.js`, () => {
                    if (window.AssemVocabMastery && typeof window.AssemVocabMastery.init === 'function') {
                        window.AssemVocabMastery.init();
                    }
                });
            } else if (window.AssemVocabMastery && typeof window.AssemVocabMastery.init === 'function') {
                window.AssemVocabMastery.init();
            }
        };

        ensureUtils(() => {
            ensureStorage(() => {
                ensureVocabMastery();
            });
        });
    }

    function initLessonApp() {
        // 1. Collect and mount quiz question data across all legacy and current formats
        const questionsData = 
            window.lessonQuestions ||
            window.lessonData ||
            window.questions ||
            window.quizData ||
            window.quizQuestions ||
            window.prep3Unit1Lesson1Part1Questions ||
            window.prep3Unit1Lesson1Part2Questions ||
            null;

        if (window.quizEngine && questionsData) {
            window.quizEngine.loadQuestions(questionsData);
        }

        // 2. Initialize and coordinate progressive subsystems
        bootstrapSubsystems();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLessonApp);
    } else {
        initLessonApp();
    }

    // Export helper for manual trigger if needed
    window.initLessonApp = initLessonApp;

})(typeof window !== 'undefined' ? window : this);
