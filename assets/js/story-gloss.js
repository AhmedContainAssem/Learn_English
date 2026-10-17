/**
 * Interactive Vocabulary Glossing Engine (story-gloss.js)
 * Single Responsibility: Performs DOM TreeWalker text scanning, term detection, and popover rendering.
 */

(function (window) {
    'use strict';

    class StoryGlossEngine {
        static applyGlosses(pageText, storyPages = [], currentPage = 0) {
            if (!pageText || !pageText.textContent) return;

            // 1. Gather vocabulary definitions from cards or story page
            const vocabMap = new Map();

            // From DOM cards on page
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                const enElem = card.querySelector('.word-en');
                if (!enElem) return;
                const rawEn = (enElem.textContent || '').trim();
                const cleanKey = (window.AssemUtils && window.AssemUtils.cleanWordKey) 
                    ? window.AssemUtils.cleanWordKey(rawEn) 
                    : rawEn.toLowerCase().replace(/[^a-z0-9]/g, '');

                if (!cleanKey || cleanKey.length < 3) return;

                // Extract Arabic translation
                let ar = '';
                const body = card.querySelector('.card-body');
                if (body) {
                    const strong = body.querySelector('strong');
                    if (strong && strong.nextSibling) {
                        ar = (strong.nextSibling.textContent || '').replace(/^[:\s/]+/, '').trim();
                    }
                    if (!ar) ar = (body.textContent || '').substring(0, 40).trim();
                }

                vocabMap.set(cleanKey, { en: rawEn, ar: ar });
            });

            // Also from page.vocabNotes if present
            const pageObj = (storyPages && storyPages[currentPage]) || {};
            if (Array.isArray(pageObj.vocabNotes)) {
                pageObj.vocabNotes.forEach(item => {
                    if (typeof item === 'object' && item.en) {
                        const cleanKey = (window.AssemUtils && window.AssemUtils.cleanWordKey) 
                            ? window.AssemUtils.cleanWordKey(item.en) 
                            : item.en.toLowerCase().trim();
                        if (cleanKey && cleanKey.length >= 3 && !vocabMap.has(cleanKey)) {
                            vocabMap.set(cleanKey, { en: item.en, ar: item.ar || '' });
                        }
                    }
                });
            }

            if (vocabMap.size === 0) return;

            // Sort terms by word length descending so compound words match first
            const sortedKeys = Array.from(vocabMap.keys()).sort((a, b) => b.length - a.length);

            // Safe DOM TreeWalker replacement
            const walker = document.createTreeWalker(pageText, NodeFilter.SHOW_TEXT, null, false);
            const textNodes = [];
            let n;
            while ((n = walker.nextNode())) {
                textNodes.push(n);
            }

            textNodes.forEach(textNode => {
                const nodeVal = textNode.nodeValue;
                if (!nodeVal || !nodeVal.trim()) return;

                const escapedKeys = sortedKeys.map(k => (window.AssemUtils && window.AssemUtils.escapeRegExp) ? window.AssemUtils.escapeRegExp(k) : k);
                const pattern = new RegExp(`\\b(${escapedKeys.join('|')})(s|es|ed|ing|d)?\\b`, 'gi');

                if (!pattern.test(nodeVal)) return;

                pattern.lastIndex = 0;
                const frag = document.createDocumentFragment();
                let lastIdx = 0;
                let match;

                while ((match = pattern.exec(nodeVal)) !== null) {
                    if (match.index > lastIdx) {
                        frag.appendChild(document.createTextNode(nodeVal.substring(lastIdx, match.index)));
                    }

                    const matchedText = match[0];
                    const baseWord = match[1].toLowerCase();
                    const vocabData = vocabMap.get(baseWord);

                    if (vocabData) {
                        const span = document.createElement('span');
                        span.className = 'interactive-gloss-word';
                        span.textContent = matchedText;
                        span.setAttribute('role', 'button');
                        span.setAttribute('tabindex', '0');
                        span.setAttribute('title', 'انقر للاستماع والترجمة والحفظ');

                        span.addEventListener('click', (e) => {
                            e.stopPropagation();
                            StoryGlossEngine.showGlossPopover(span, vocabData.en, vocabData.ar);
                            if (typeof window.playSound === 'function') window.playSound('click');
                            if (typeof window.speakText === 'function') window.speakText(vocabData.en);
                        });

                        frag.appendChild(span);
                    } else {
                        frag.appendChild(document.createTextNode(matchedText));
                    }

                    lastIdx = pattern.lastIndex;
                }

                if (lastIdx < nodeVal.length) {
                    frag.appendChild(document.createTextNode(nodeVal.substring(lastIdx)));
                }

                textNode.parentNode.replaceChild(frag, textNode);
            });
        }

        static showGlossPopover(targetElem, word, trans) {
            let popover = document.getElementById('storyGlossPopover');
            if (!popover) {
                popover = document.createElement('div');
                popover.id = 'storyGlossPopover';
                popover.className = 'story-gloss-popover';
                popover.innerHTML = `
                    <div class="popover-inner">
                        <div class="popover-header">
                            <span class="popover-word" id="glossPopWord">Word</span>
                            <button type="button" class="audio-btn" id="glossPopAudioBtn">🔊</button>
                        </div>
                        <div class="popover-trans" id="glossPopTrans">الترجمة</div>
                        <div class="popover-actions">
                            <button type="button" class="popover-action-save" id="glossPopSaveBtn">⭐ حفظ للمراجعة</button>
                            <button type="button" class="popover-close-btn" id="glossPopCloseBtn">✕</button>
                        </div>
                    </div>
                `;
                document.body.appendChild(popover);

                document.getElementById('glossPopCloseBtn').onclick = () => {
                    popover.style.display = 'none';
                };

                document.addEventListener('click', (e) => {
                    if (!popover.contains(e.target) && !e.target.classList.contains('interactive-gloss-word')) {
                        popover.style.display = 'none';
                    }
                });
            }

            document.getElementById('glossPopWord').textContent = word;
            document.getElementById('glossPopTrans').textContent = trans || '—';

            document.getElementById('glossPopAudioBtn').onclick = (e) => {
                e.stopPropagation();
                if (typeof window.speakText === 'function') window.speakText(word);
            };

            const saveBtn = document.getElementById('glossPopSaveBtn');
            saveBtn.textContent = '⭐ حفظ للمراجعة';
            saveBtn.disabled = false;
            saveBtn.style.opacity = '1';

            saveBtn.onclick = (e) => {
                e.stopPropagation();
                if (window.AssemStorage && typeof window.AssemStorage.addToPracticeBank === 'function') {
                    window.AssemStorage.addToPracticeBank({
                        word: word,
                        translation: trans,
                        lessonUrl: window.location.href
                    });
                    if (typeof window.playSound === 'function') window.playSound('click');
                    saveBtn.textContent = '✅ مضافة للمراجعة';
                    saveBtn.disabled = true;
                    saveBtn.style.opacity = '0.7';
                }
            };

            popover.style.display = 'block';
            const rect = targetElem.getBoundingClientRect();
            const popWidth = 260;
            let left = rect.left + (rect.width / 2) - (popWidth / 2);
            if (left < 10) left = 10;
            if (left + popWidth > window.innerWidth - 10) left = window.innerWidth - popWidth - 10;

            let top = rect.bottom + window.scrollY + 8;
            if (rect.bottom + 160 > window.innerHeight) {
                top = rect.top + window.scrollY - 130;
            }

            popover.style.left = `${left}px`;
            popover.style.top = `${top}px`;
        }
    }

    window.StoryGlossEngine = StoryGlossEngine;

})(typeof window !== 'undefined' ? window : this);
