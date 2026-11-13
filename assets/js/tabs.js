/**
 * Tabs & Flashcards Module (tabs.js)
 * Manages tab transitions and interactive flashcard 3D flips across all educational templates.
 */

var switchTab;
var flipCard;

(function (window) {
    'use strict';

    const TAB_ALIASES = {
        'grammar': ['grammar-video', 'tab-grammar', 'grammar-tab', 'tab-grammar-video'],
        'grammar-video': ['grammar', 'tab-grammar', 'grammar-tab', 'tab-grammar-video'],
        'reading': ['story', 'storybook', 'tab-reading', 'tab-story', 'reading-room'],
        'story': ['reading', 'storybook', 'tab-reading', 'tab-story', 'reading-room'],
        'storybook': ['reading', 'story', 'tab-reading', 'tab-story'],
        'dialogue': ['dialogues', 'conversation', 'tab-dialogue', 'dialogue-room'],
        'dialogues': ['dialogue', 'conversation', 'tab-dialogue'],
        'vocab': ['key-vocab', 'vocabulary', 'tab-vocab', 'important-vocab'],
        'verbs': ['verb-conjugation', 'tab-verbs', 'irregular-verbs'],
        'definitions': ['defs', 'tab-definitions'],
        'synonyms': ['antonyms', 'synonyms-antonyms', 'tab-synonyms'],
        'affixes': ['prefixes', 'suffixes', 'tab-affixes'],
        'collocations': ['expressions', 'tab-collocations', 'prepositions'],
        'quiz': ['exam', 'questions', 'tab-quiz', 'test']
    };

    function switchTab(tabId, button) {
        if (!tabId) return;

        const cleanId = String(tabId).replace(/^tab-/, '');
        const candidateIds = [cleanId, tabId, ...(TAB_ALIASES[cleanId] || []), ...(TAB_ALIASES[tabId] || [])];
        const tabs = document.querySelectorAll('.tab-content');
        let matched = false;

        tabs.forEach(tab => {
            const currentCleanId = tab.id.replace(/^tab-/, '');
            const isMatch = candidateIds.includes(tab.id) || candidateIds.includes(currentCleanId);
            
            if (isMatch) {
                tab.style.display = 'block';
                tab.classList.add('active');
                matched = true;

                // Fail-Safe Re-Hydration if tab is visually empty
                const isVisuallyEmpty = !tab.children.length || !tab.innerText.trim();
                if (isVisuallyEmpty) {
                    if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {
                        window.CurriculumRenderer.init();
                    }
                    if (!tab.children.length || !tab.innerText.trim()) {
                        tab.innerHTML = `
                            <div style="text-align: center; padding: 45px 20px; background: rgba(19, 27, 46, 0.65); border: 1.5px dashed rgba(0, 243, 255, 0.3); border-radius: 18px; margin: 30px auto; max-width: 650px;">
                                <div style="font-size: 2.2rem; margin-bottom: 12px;">🌟</div>
                                <h3 style="color: #00f3ff; font-size: 1.25rem; margin-bottom: 8px;">محتوى هذا القسم متكامل ضمن الأقسام الأخرى</h3>
                                <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0;">
                                    تم دمج تدريبات وتطبيقات هذا الموضوع بأسلوب مكثف داخل أقسام المفردات والقراءة والاختبار الشامل للدرس لضمان أعلى فائدة تعليمية.
                                </p>
                            </div>
                        `;
                    }
                }
            } else {
                tab.style.display = 'none';
                tab.classList.remove('active');
            }
        });

        // Update active tab buttons
        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(tabBtn => {
            const onclickAttr = tabBtn.getAttribute('onclick') || '';
            const isBtnMatch = button ? (tabBtn === button) : candidateIds.some(cid => onclickAttr.includes(`'${cid}'`) || onclickAttr.includes(`"${cid}"`));
            
            if (isBtnMatch) {
                tabBtn.classList.add('active');
                if (typeof tabBtn.scrollIntoView === 'function') {
                    tabBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            } else {
                tabBtn.classList.remove('active');
            }
        });

        if (typeof window.playSound === 'function') {
            window.playSound('click');
        }

        // Synchronize Grammar Slides Engine if switching to grammar tab
        if ((cleanId === 'grammar' || cleanId === 'grammar-video' || cleanId.includes('grammar')) && window.grammarSlidesEngine) {
            if (typeof window.grammarSlidesEngine.init === 'function') {
                window.grammarSlidesEngine.init();
            }
            if (typeof window.grammarSlidesEngine.updateUI === 'function') {
                window.grammarSlidesEngine.updateUI();
            }
        }

        // Refresh StoryEngine if switching to storybook tab
        if ((cleanId === 'storybook' || cleanId.includes('reading')) && window.storyEngine) {
            window.storyEngine.updateDOM();
        }

        // Ensure newly visible or deferred cards inherit mastery buttons
        if (window.AssemVocabMastery && typeof window.AssemVocabMastery.init === 'function') {
            window.AssemVocabMastery.init();
        }

        // Ensure Vocab Mastery Tracker is strictly scoped to vocabulary tab
        const tracker = document.getElementById('vocabMasteryTracker');
        if (tracker) {
            const isVocabTab = (cleanId === 'vocab' || cleanId === 'key-vocab');
            tracker.style.display = isVocabTab ? '' : 'none';
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

    function flipCard(cardElement, evt) {
        const e = evt || window.event;
        if (e && e.target && e.target.closest('button, .audio-btn, .speak-btn, a, input, select, [data-prevent-flip]')) {
            return;
        }
        if (!cardElement) return;
        const now = Date.now();
        if (cardElement._lastFlip && (now - cardElement._lastFlip < 140)) {
            return;
        }
        cardElement._lastFlip = now;
        cardElement.classList.toggle('flipped');
        if (typeof window.playSound === 'function') {
            window.playSound('click');
        }
    }

    function selectStoryDeck(idx) {
        const decks = window.readingDecks || (window.lessonData && window.lessonData.readingDecks);
        if (decks && decks[idx] && window.storyEngine) {
            for (let i = 0; i < decks.length; i++) {
                const btn = document.getElementById('storyTabBtn-' + i);
                if (btn) {
                    btn.className = (i === idx) ? 'badge badge-active story-select-btn' : 'badge badge-gold story-select-btn';
                    btn.style.opacity = (i === idx) ? '1' : '0.85';
                }
            }
            window.storyEngine.loadPages(decks[idx].pages || decks[idx].scenes || []);
            if (typeof window.playSound === 'function') window.playSound('click');
        }
    }

    // Attach to global window
    switchTab = window.switchTab = switchTab;
    flipCard = window.flipCard = flipCard;
    window.selectStoryDeck = selectStoryDeck;

})(typeof window !== 'undefined' ? window : this);
