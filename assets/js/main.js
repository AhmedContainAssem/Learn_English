/**
 * Master Application Bootstrap (main.js)
 * Automatically detects quiz datasets across all formats and initializes modular systems.
 */

(function (window) {
    'use strict';

    function initLessonApp() {
        // Collect question data from all possible global names
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
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLessonApp);
    } else {
        initLessonApp();
    }

    // Export helper for manual trigger if needed
    window.initLessonApp = initLessonApp;

})(typeof window !== 'undefined' ? window : this);
