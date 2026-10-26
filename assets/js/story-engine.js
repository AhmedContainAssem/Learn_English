/**
 * Interactive Story & Dialogue Engine Module (story-engine.js)
 * Manages sentence highlighting, automatic story reading playback,
 * interactive 3D storybook pagination, speech synthesis, and mini-comprehension checks.
 */

(function (window) {
    'use strict';

    class StoryEngine {
        constructor(config = {}) {
            this.config = {
                wordSpeedMs: 340,
                basePauseMs: 1200,
                minDurationMs: 2800,
                speechRate: 0.92,
                ...config
            };
            this.storyLines = [];
            this.storyPages = [];
            this.currentPage = 0;
            this.currentIndex = 0;
            this.isPlaying = false;
            this.playbackTimer = null;
            this.storyUtterance = null;
        }

        // ==========================================
        // 1. Storybook Pages Management
        // ==========================================
        loadPages(pages) {
            this.storyPages = Array.isArray(pages) ? pages : [];
            this.currentPage = 0;
            this.stop();
            this.updateDOM();
            this.initTouchGestures();
        }

        initTouchGestures() {
            const container = document.querySelector('.storybook-wrapper') || document.querySelector('.storybook-book');
            if (!container || container._hasTouchSwipe) return;
            container._hasTouchSwipe = true;

            let touchStartX = 0;
            let touchStartY = 0;

            container.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches[0]) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }
            }, { passive: true });

            container.addEventListener('touchend', (e) => {
                if (e.changedTouches && e.changedTouches[0]) {
                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;
                    const deltaX = touchEndX - touchStartX;
                    const deltaY = touchEndY - touchStartY;

                    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
                        if (deltaX < 0) {
                            this.changePage(1);
                        } else {
                            this.changePage(-1);
                        }
                    }
                }
            }, { passive: true });
        }

        updateDOM() {
            const pages = this.storyPages.length > 0 ? this.storyPages : (window.lessonData?.storyPages || []);
            if (!pages || pages.length === 0) {
                const staticStoryText = document.getElementById('storyText');
                if (staticStoryText && !staticStoryText.querySelector('.story-gloss-term')) {
                    this.applyInteractiveGlosses(staticStoryText);
                }
                return;
            }

            if (this.currentPage >= pages.length) this.currentPage = pages.length - 1;
            if (this.currentPage < 0) this.currentPage = 0;

            const page = pages[this.currentPage] || {};
            const total = pages.length;

            const pageBadge = document.getElementById('storyPageBadge') || document.getElementById('storyBadge');
            const pageArtworkImg = document.getElementById('storyArtworkImg') || document.getElementById('storyImg');
            const pageCaption = document.getElementById('storyCaption');
            const pageCounter = document.getElementById('storyPageCounter');
            const currentPageNum = document.getElementById('currentPageNum');
            const totalPagesNum = document.getElementById('totalPagesNum');
            const pageTitle = document.getElementById('storyTitle');
            const pageText = document.getElementById('storyText') || document.getElementById('storyEn');
            const pageTrans = document.getElementById('storyTranslation') || document.getElementById('storyAr');
            const pageVocab = document.getElementById('storyVocab') || document.getElementById('storyVocabNotes');
            const prevBtn = document.getElementById('storyPrevBtn') || document.getElementById('prevPageBtn') || document.getElementById('prevStoryBtn');
            const nextBtn = document.getElementById('storyNextBtn') || document.getElementById('nextPageBtn') || document.getElementById('nextStoryBtn');
            const progressDots = document.getElementById('storyProgressDots');

            const imageUrl = page.imageUrl || page.img || page.image || '';
            const textEn = page.textEn || page.text || '';
            const textAr = page.textAr || page.translation || page.trans || '';
            const vocabNotes = page.vocabNotes || page.vocab || page.chips || page.vocabulary || null;

            if (pageBadge) pageBadge.textContent = page.badge || ('🖼️ Scene ' + (this.currentPage + 1) + ' of ' + total);
            const placeholderEl = document.getElementById('storyArtworkPlaceholder');
            if (pageArtworkImg) {
                pageArtworkImg.onerror = () => {
                    pageArtworkImg.style.display = 'none';
                    if (placeholderEl) {
                        placeholderEl.style.display = 'flex';
                    } else if (pageArtworkImg.parentNode) {
                        let autoPh = pageArtworkImg.parentNode.querySelector('.auto-story-placeholder');
                        if (!autoPh) {
                            autoPh = document.createElement('div');
                            autoPh.className = 'auto-story-placeholder';
                            autoPh.style.cssText = 'display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:220px; padding:20px; background:linear-gradient(135deg, rgba(14,165,233,0.12), rgba(99,102,241,0.15)); border-radius:12px; border:1px dashed var(--border-color); text-align:center; width:100%; box-sizing:border-box;';
                            const titleSafe = (page.title || 'Interactive StoryBook').replace(/</g, '&lt;');
                            autoPh.innerHTML = '<span style="font-size:2.4rem; margin-bottom:8px;">📖</span><div style="font-weight:700; color:var(--accent-primary); font-size:1.05rem;">' + titleSafe + '</div><div style="font-size:0.85rem; color:#94a3b8; margin-top:4px;">Mr. Ahmed Assem • Easy Peasy Ya Englezeey</div>';
                            pageArtworkImg.parentNode.appendChild(autoPh);
                        }
                        autoPh.style.display = 'flex';
                    }
                };

                if (imageUrl) {
                    pageArtworkImg.classList.remove('hidden');
                    pageArtworkImg.src = imageUrl;
                    pageArtworkImg.style.display = 'block';
                    if (placeholderEl) placeholderEl.style.display = 'none';
                    const existingAutoPh = pageArtworkImg.parentNode ? pageArtworkImg.parentNode.querySelector('.auto-story-placeholder') : null;
                    if (existingAutoPh) existingAutoPh.style.display = 'none';
                } else {
                    pageArtworkImg.style.display = 'none';
                    if (placeholderEl) placeholderEl.style.display = 'flex';
                }
            }
            if (pageCaption) pageCaption.textContent = page.caption || '';
            if (pageCounter) pageCounter.textContent = 'Page ' + (this.currentPage + 1) + ' / ' + total;
            if (currentPageNum) currentPageNum.textContent = String(this.currentPage + 1);
            if (totalPagesNum) totalPagesNum.textContent = String(total);
            if (pageTitle) pageTitle.textContent = page.title || ('Chapter ' + (this.currentPage + 1));
            if (pageText) {
                pageText.textContent = textEn;
                pageText.className = 'story-paragraph' + (this.isPlaying ? ' reading-active' : '');
                if (!this.isPlaying) {
                    this.applyInteractiveGlosses(pageText);
                }
            }
            if (pageTrans) {
                if (textAr) {
                    pageTrans.style.display = 'block';
                    pageTrans.innerHTML = '<span class="translation-tag">💡 الترجمة:</span> ' + textAr;
                } else {
                    pageTrans.style.display = 'none';
                }
            }
            if (pageVocab) {
                if (vocabNotes) {
                    pageVocab.style.display = 'flex';
                    let chips = [];
                    if (Array.isArray(vocabNotes)) {
                        chips = vocabNotes.map(item => {
                            if (typeof item === 'object' && item !== null) {
                                return (item.en || '') + (item.ar ? ' (' + item.ar + ')' : '');
                            }
                            return String(item);
                        });
                    } else if (typeof vocabNotes === 'string') {
                        chips = vocabNotes.split('•').map(chip => chip.trim());
                    }
                    pageVocab.innerHTML = chips.filter(Boolean).map(chip => '<span class="vocab-chip">' + chip + '</span>').join('');
                } else {
                    pageVocab.style.display = 'none';
                }
            }

            if (prevBtn) {
                prevBtn.disabled = (this.currentPage === 0);
                prevBtn.style.opacity = (this.currentPage === 0) ? '0.4' : '1';
                prevBtn.style.cursor = (this.currentPage === 0) ? 'not-allowed' : 'pointer';
            }
            if (nextBtn) {
                nextBtn.disabled = (this.currentPage === total - 1);
                nextBtn.style.opacity = (this.currentPage === total - 1) ? '0.4' : '1';
                nextBtn.style.cursor = (this.currentPage === total - 1) ? 'not-allowed' : 'pointer';
            }

            if (progressDots) {
                progressDots.innerHTML = pages.map((_, i) => '<span class="dot ' + (i === this.currentPage ? 'active' : '') + '"></span>').join('');
            }
            const progressText = document.getElementById('storyPageProgressText');
            if (progressText) {
                progressText.textContent = 'Page ' + (this.currentPage + 1) + ' of ' + total;
            }
        }

        changePage(direction) {
            if (typeof window.playSound === 'function') window.playSound('click');
            this.stopStoryteller();
            const pages = this.storyPages.length > 0 ? this.storyPages : (window.lessonData?.storyPages || []);
            const newIdx = this.currentPage + direction;
            if (newIdx >= 0 && newIdx < pages.length) {
                this.currentPage = newIdx;
                this.updateDOM();
            }
        }

        toggleStoryteller() {
            if (this.isPlaying) {
                this.stopStoryteller();
            } else {
                this.startStoryteller();
            }
        }

        startStoryteller() {
            if (!('speechSynthesis' in window)) {
                console.warn('Audio speech is not supported in this browser.');
                return;
            }
            const pages = this.storyPages.length > 0 ? this.storyPages : (window.lessonData?.storyPages || []);
            if (pages.length === 0) return;

            window.speechSynthesis.cancel();
            this.isPlaying = true;
            const btn = document.getElementById('storytellerBtn') || document.getElementById('playAllStoryBtn');
            if (btn) {
                btn.classList.add('playing');
                btn.innerHTML = '⏸️ إيقاف القارئ (Stop Storyteller)';
            }
            this.updateDOM();

            const curPage = pages[this.currentPage];
            const textToRead = curPage ? (curPage.textEn || curPage.text || '') : '';
            if (!textToRead) {
                this.stopStoryteller();
                return;
            }

            this.storyUtterance = new SpeechSynthesisUtterance(textToRead);
            this.storyUtterance.lang = 'en-US';
            this.storyUtterance.rate = this.config.speechRate;

            const self = this;
            this.storyUtterance.onend = () => {
                if (!self.isPlaying) return;
                if (self.currentPage < pages.length - 1) {
                    self.currentPage++;
                    self.updateDOM();
                    setTimeout(() => {
                        if (self.isPlaying) self.startStoryteller();
                    }, 600);
                } else {
                    self.stopStoryteller();
                    if (typeof window.playSound === 'function') window.playSound('correct');
                }
            };

            this.storyUtterance.onerror = () => {
                self.stopStoryteller();
            };

            window.speechSynthesis.speak(this.storyUtterance);
        }

        stopStoryteller() {
            this.isPlaying = false;
            if (typeof window.stopTTS === 'function') {
                window.stopTTS();
            } else if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
            const btn = document.getElementById('storytellerBtn') || document.getElementById('playAllStoryBtn');
            if (btn) {
                btn.classList.remove('playing');
                btn.innerHTML = '▶️ القارئ التلقائي (Auto Storyteller)';
            }
            this.updateDOM();
        }

        speakCurrentPage(triggerBtn) {
            const pages = this.storyPages.length > 0 ? this.storyPages : (window.lessonData?.storyPages || []);
            const page = pages[this.currentPage];
            const text = page?.textEn || page?.text;
            if (!text) return;

            const btn = triggerBtn || document.querySelector('.story-page-content .audio-btn') || document.getElementById('storyAudioBtn');
            if (typeof window.speakText === 'function') {
                window.speakText(text, btn);
            }
        }

        // 2. Sentence Bubbles Management (Delegated to StorytellerController)
        loadStory(lines) {
            if (!this.storyteller) this.storyteller = new StorytellerController(this.config);
            this.storyteller.loadStory(lines);
            this.storyLines = this.storyteller.storyLines;
        }

        highlightBubble(lineId) {
            if (this.storyteller) this.storyteller.highlightBubble(lineId);
        }

        speakLine(text, lineId) {
            if (this.storyteller) this.storyteller.speakLine(text, lineId);
            else if (typeof window.speakText === 'function') window.speakText(text);
        }

        playAll(startIndex = 0) {
            if (!this.storyteller) this.storyteller = new StorytellerController(this.config);
            this.storyteller.playAll(startIndex);
        }

        stop() {
            if (this.storyteller) this.storyteller.stop();
        }
        checkAnswer(button, isCorrect, feedbackMsg) {
            if (!button) return;
            const parent = button.closest('.options-grid') || button.parentElement;
            if (parent) {
                parent.querySelectorAll('button').forEach(b => {
                    b.disabled = true;
                    b.style.opacity = '0.6';
                });
            }

            button.style.opacity = '1';
            if (isCorrect) {
                button.classList.add('correct-choice');
                if (typeof window.playCorrectFX === 'function') window.playCorrectFX();
            } else {
                button.classList.add('wrong-choice');
                if (typeof window.playWrongFX === 'function') window.playWrongFX();
            }

            const container = button.closest('.story-check-card') || parent.parentElement;
            let feedback = container.querySelector('.story-feedback');
            if (!feedback) {
                feedback = document.createElement('div');
                feedback.className = 'story-feedback';
                container.appendChild(feedback);
            }
            feedback.textContent = feedbackMsg;
            feedback.className = 'story-feedback ' + (isCorrect ? 'correct' : 'wrong');
        }

        // ==========================================
        // 3. Interactive Reading Glosses (DOM TreeWalker)
        // ==========================================
        applyInteractiveGlosses(pageText) {
            if (!pageText || !pageText.textContent) return;

            // 1. Gather vocabulary definitions from cards or story page
            const vocabMap = new Map();

            // From DOM cards on page
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                const enElem = card.querySelector('.word-en');
                if (!enElem) return;
                const rawEn = (enElem.textContent || '').trim();
                const cleanKey = (window.AssemUtils && typeof window.AssemUtils.cleanWordKey === 'function')
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

            // From window.lessonData vocabulary definitions
            const lessonVocab = [
                ...(Array.isArray(window.lessonData?.keyVocabulary) ? window.lessonData.keyVocabulary : []),
                ...(Array.isArray(window.lessonData?.vocabulary) ? window.lessonData.vocabulary : []),
                ...(Array.isArray(window.lessonData?.words) ? window.lessonData.words : [])
            ];
            lessonVocab.forEach(item => {
                if (item && item.word) {
                    const cleanKey = (window.AssemUtils && typeof window.AssemUtils.cleanWordKey === 'function')
                        ? window.AssemUtils.cleanWordKey(item.word)
                        : item.word.toLowerCase().replace(/[^a-z0-9]/g, '');
                    if (cleanKey && cleanKey.length >= 3 && !vocabMap.has(cleanKey)) {
                        vocabMap.set(cleanKey, { en: item.word, ar: item.meaning || item.translation || item.explain || '' });
                    }
                }
            });

            // From story vocab chips
            const chips = document.querySelectorAll('.story-vocab-chips .vocab-chip, #storyVocab .vocab-chip');
            chips.forEach(chip => {
                const text = chip.textContent || '';
                const m = text.match(/^([a-zA-Z\s-]+)\s*(?:\(([^)]+)\))?/);
                if (m && m[1]) {
                    const enWord = m[1].trim();
                    const cleanKey = (window.AssemUtils && typeof window.AssemUtils.cleanWordKey === 'function')
                        ? window.AssemUtils.cleanWordKey(enWord)
                        : enWord.toLowerCase().replace(/[^a-z0-9]/g, '');
                    if (cleanKey && cleanKey.length >= 3 && !vocabMap.has(cleanKey)) {
                        vocabMap.set(cleanKey, { en: enWord, ar: m[2] ? m[2].trim() : '' });
                    }
                }
            });

            // Also from page.vocabNotes if present
            const curPageObj = (this.storyPages && this.storyPages[this.currentPage]) || {};
            if (Array.isArray(curPageObj.vocabNotes)) {
                curPageObj.vocabNotes.forEach(item => {
                    if (typeof item === 'object' && item && item.en) {
                        const cleanKey = (window.AssemUtils && typeof window.AssemUtils.cleanWordKey === 'function')
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

                // Build combined regex matching vocab terms with common suffixes (s, es, ed, ing, d)
                const patterns = sortedKeys.map(k => {
                    const esc = (window.AssemUtils && typeof window.AssemUtils.escapeRegExp === 'function')
                        ? window.AssemUtils.escapeRegExp(k)
                        : k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    return `\\b(${esc}(?:s|es|ed|ing|d)?)\\b`;
                });

                const regex = new RegExp(patterns.join('|'), 'gi');
                if (!regex.test(nodeVal)) return;

                regex.lastIndex = 0;
                const frag = document.createDocumentFragment();
                let lastIdx = 0;
                let match;

                while ((match = regex.exec(nodeVal)) !== null) {
                    const matchStart = match.index;
                    const matchedText = match[0];

                    if (matchStart > lastIdx) {
                        frag.appendChild(document.createTextNode(nodeVal.substring(lastIdx, matchStart)));
                    }

                    const matchedKey = sortedKeys.find(k => {
                        const esc = (window.AssemUtils && typeof window.AssemUtils.escapeRegExp === 'function')
                            ? window.AssemUtils.escapeRegExp(k)
                            : k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        return new RegExp(`^${esc}(?:s|es|ed|ing|d)?$`, 'i').test(matchedText);
                    }) || matchedText.toLowerCase();

                    const vocabData = vocabMap.get(matchedKey) || { en: matchedText, ar: '' };

                    const glossBtn = document.createElement('button');
                    glossBtn.type = 'button';
                    glossBtn.className = 'story-gloss-term interactive-gloss-word';
                    glossBtn.textContent = matchedText;
                    glossBtn.dataset.word = vocabData.en || matchedText;
                    glossBtn.dataset.trans = vocabData.ar || '';
                    glossBtn.title = `انقر لعرض ترجمة (${vocabData.en || matchedText}) وسماع نطقها`;

                    glossBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        this.showGlossPopover(glossBtn, vocabData);
                    });

                    frag.appendChild(glossBtn);
                    lastIdx = matchStart + matchedText.length;
                }

                if (lastIdx < nodeVal.length) {
                    frag.appendChild(document.createTextNode(nodeVal.substring(lastIdx)));
                }

                if (textNode.parentNode) {
                    textNode.parentNode.replaceChild(frag, textNode);
                }
            });
        }

        showGlossPopover(targetElem, vocabData) {
            let popover = document.getElementById('storyGlossPopover');
            if (!popover) {
                popover = document.createElement('div');
                popover.id = 'storyGlossPopover';
                popover.className = 'story-gloss-popover';
                popover.setAttribute('role', 'dialog');
                popover.setAttribute('aria-label', 'شرح الكلمة التفاعلي');
                document.body.appendChild(popover);

                document.addEventListener('click', (e) => {
                    if (!popover.contains(e.target) && !e.target.closest('.story-gloss-term, .interactive-gloss-word')) {
                        popover.style.display = 'none';
                    }
                });

                window.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape') popover.style.display = 'none';
                });
            }

            const word = vocabData.en || targetElem.dataset.word || targetElem.textContent;
            const trans = vocabData.ar || targetElem.dataset.trans || '';

            popover.innerHTML = `
                <div class="gloss-popover-header">
                    <span class="gloss-word-text">${word}</span>
                    <button type="button" class="gloss-audio-btn" title="استمع لنطق الكلمة">🔊</button>
                    <button type="button" class="gloss-dismiss-btn" title="إغلاق">✕</button>
                </div>
                ${trans ? `<div class="gloss-trans-text">${trans}</div>` : ''}
                <div class="gloss-popover-footer">
                    <button type="button" class="gloss-save-practice-btn">⭐ أضف لقائمة المراجعة</button>
                </div>
            `;

            // Audio button
            const audioBtn = popover.querySelector('.gloss-audio-btn');
            if (audioBtn) {
                audioBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (typeof window.playSound === 'function') window.playSound('click');
                    if (typeof window.speakText === 'function') window.speakText(word);
                };
            }

            // Dismiss button
            const dismissBtn = popover.querySelector('.gloss-dismiss-btn');
            if (dismissBtn) {
                dismissBtn.onclick = (e) => {
                    e.stopPropagation();
                    popover.style.display = 'none';
                };
            }

            // Practice Bank Add button
            const saveBtn = popover.querySelector('.gloss-save-practice-btn');
            if (saveBtn) {
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
            }

            // Position popover near target element
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
    // Global Instance
    const storyEngine = new StoryEngine();

    // Universal Static Bridge & Factory API on StoryEngine class
    StoryEngine.init = (data) => storyEngine?.loadPages(Array.isArray(data) ? data : (data?.storyPages || data));
    StoryEngine.loadPages = (data) => storyEngine?.loadPages(data);
    StoryEngine.prevPage = () => storyEngine?.changePage(-1);
    StoryEngine.nextPage = () => storyEngine?.changePage(1);
    StoryEngine.toggleAutoPlay = () => storyEngine?.toggleStoryteller();
    StoryEngine.toggleStoryteller = () => storyEngine?.toggleStoryteller();
    StoryEngine.speakCurrentPage = () => storyEngine?.speakCurrentPage();

    // Prototype aliases for flexibility
    StoryEngine.prototype.init = function(data) {
        this.loadPages(Array.isArray(data) ? data : (data?.storyPages || data));
    };
    StoryEngine.prototype.prevPage = function() { this.changePage(-1); };
    StoryEngine.prototype.nextPage = function() { this.changePage(1); };
    StoryEngine.prototype.toggleAutoPlay = function() { this.toggleStoryteller(); };

    window.StoryEngine = StoryEngine;
    window.storyEngine = storyEngine;

    // Public Universal API & Backward Compatibility Helpers
    window.updateStorybookDOM = () => storyEngine.updateDOM();
    window.changeStoryPage = (dir) => storyEngine.changePage(dir);
    window.prevStoryPage = () => storyEngine.changePage(-1);
    window.nextStoryPage = () => storyEngine.changePage(1);
    window.toggleStoryteller = () => storyEngine.toggleStoryteller();
    window.togglePlayAllStory = (btn) => storyEngine.toggleStoryteller(btn);
    window.startStoryteller = () => storyEngine.startStoryteller();
    window.stopStoryteller = () => storyEngine.stopStoryteller();
    window.speakCurrentStoryPage = (btn) => storyEngine.speakCurrentPage(btn);

    window.highlightStoryBubble = (id) => storyEngine.highlightBubble(id);
    window.speakStoryLine = (text, id) => storyEngine.speakLine(text, id);
    window.playAllStory = (startIdx) => storyEngine.playAll(startIdx);
    window.stopStorySpeech = () => storyEngine.stop();
    window.checkStoryAnswer = (btn, isCorrect, msg) => storyEngine.checkAnswer(btn, isCorrect, msg);

    // Auto-initialize if DOM ready
    const initPages = () => {
        if (window.lessonData?.storyPages) {
            storyEngine.loadPages(window.lessonData.storyPages);
        } else {
            // Apply glosses to static story if present in DOM
            setTimeout(() => {
                const storyText = document.getElementById('storyText');
                if (storyText && !storyText.querySelector('.story-gloss-term')) {
                    storyEngine.applyInteractiveGlosses(storyText);
                }
            }, 100);
        }
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPages);
    } else {
        initPages();
    }

})(typeof window !== 'undefined' ? window : this);
