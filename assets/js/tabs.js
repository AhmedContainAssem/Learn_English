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
