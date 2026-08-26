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
        }, { capture: true, passive: true });
    }

    function init() {
        document.body.classList.add('app-page');
        if (typeof window.initAudio === 'function') {
            document.body.addEventListener('pointerdown', window.initAudio, { once: true });
            document.body.addEventListener('click', window.initAudio, { once: true });
        }
        attachSoundListeners();

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
