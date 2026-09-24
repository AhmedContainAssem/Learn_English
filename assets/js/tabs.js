/**
 * Tabs & Flashcards Module (tabs.js)
 * Manages tab transitions and interactive flashcard 3D flips across all educational templates.
 */

(function (window) {
    'use strict';

    function switchTab(tabId, button) {
        if (!tabId) return;

        const cleanId = String(tabId).replace(/^tab-/, '');
        const tabs = document.querySelectorAll('.tab-content');
        let matched = false;

        tabs.forEach(tab => {
            const currentCleanId = tab.id.replace(/^tab-/, '');
            const isMatch = (currentCleanId === cleanId) || (tab.id === tabId);
            
            if (isMatch) {
                tab.style.display = 'block';
                tab.classList.add('active');
                matched = true;
            } else {
                tab.style.display = 'none';
                tab.classList.remove('active');
            }
        });

        // Update active tab buttons
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(tabBtn => {
            const onclickAttr = tabBtn.getAttribute('onclick') || '';
            const isBtnMatch = button ? (tabBtn === button) : (onclickAttr.includes(`'${cleanId}'`) || onclickAttr.includes(`"${cleanId}"`));
            
            if (isBtnMatch) {
                tabBtn.classList.add('active');
            } else {
                tabBtn.classList.remove('active');
            }
        });

        if (typeof window.playSound === 'function') {
            window.playSound('click');
        }

        // Ensure newly visible or deferred cards inherit mastery buttons
        if (window.AssemVocabMastery && typeof window.AssemVocabMastery.init === 'function') {
            window.AssemVocabMastery.init();
        }

        // Synchronize Quiz Engine if switching to quiz tab
        if ((cleanId === 'quiz' || cleanId.includes('quiz')) && window.quizEngine) {
            if (typeof window.quizEngine.refreshElements === 'function') {
                window.quizEngine.refreshElements();
            }
            if (window.quizEngine.questions && window.quizEngine.questions.length > 0 && window.quizEngine.page && (!window.quizEngine.page.questionElement || !window.quizEngine.page.questionElement.innerHTML.trim())) {
                window.quizEngine.displayQuestion();
            }
        }

        // Synchronize Story Engine if switching to reading/story tab
        if ((cleanId === 'reading' || cleanId === 'story' || cleanId.includes('story')) && window.storyEngine) {
            if (typeof window.storyEngine.updateDOM === 'function') {
                window.storyEngine.updateDOM();
            }
        }

        try {
            window.dispatchEvent(new CustomEvent('assem:tab-switched', { detail: { tabId: cleanId, originalId: tabId } }));
        } catch (e) {}
    }

    function flipCard(cardElement) {
        if (!cardElement) return;
        if (typeof window.playSound === 'function') {
            window.playSound('click');
        }
        cardElement.classList.toggle('flipped');
    }

    // Attach to global window
    window.switchTab = switchTab;
    window.flipCard = flipCard;

})(typeof window !== 'undefined' ? window : this);
