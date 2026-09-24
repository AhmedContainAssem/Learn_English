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
        }

        updateDOM() {
            const pages = this.storyPages.length > 0 ? this.storyPages : (window.lessonData?.storyPages || []);
            if (!pages || pages.length === 0) return;

            if (this.currentPage >= pages.length) this.currentPage = pages.length - 1;
            if (this.currentPage < 0) this.currentPage = 0;

            const page = pages[this.currentPage] || {};
            const total = pages.length;

            const pageBadge = document.getElementById('storyPageBadge');
            const pageArtworkImg = document.getElementById('storyArtworkImg');
            const pageCaption = document.getElementById('storyCaption');
            const pageCounter = document.getElementById('storyPageCounter');
            const pageTitle = document.getElementById('storyTitle');
            const pageText = document.getElementById('storyText');
            const pageTrans = document.getElementById('storyTranslation');
            const pageVocab = document.getElementById('storyVocab');
            const prevBtn = document.getElementById('storyPrevBtn');
            const nextBtn = document.getElementById('storyNextBtn');
            const progressDots = document.getElementById('storyProgressDots');

            if (pageBadge) pageBadge.textContent = '🖼️ Scene ' + (this.currentPage + 1) + ' of ' + total;
            if (pageArtworkImg) {
                if (page.imageUrl) {
                    pageArtworkImg.classList.remove('hidden');
                    pageArtworkImg.src = page.imageUrl;
                    pageArtworkImg.style.display = 'block';
                } else {
                    pageArtworkImg.style.display = 'none';
                }
            }
            if (pageCaption) pageCaption.textContent = page.caption || '';
            if (pageCounter) pageCounter.textContent = 'Page ' + (this.currentPage + 1) + ' / ' + total;
            if (pageTitle) pageTitle.textContent = page.title || ('Chapter ' + (this.currentPage + 1));
            if (pageText) {
                pageText.textContent = page.textEn || '';
                pageText.className = 'story-paragraph' + (this.isPlaying ? ' reading-active' : '');
                if (!this.isPlaying) {
                    this.applyInteractiveGlosses(pageText);
                }
            }
            if (pageTrans) {
                if (page.textAr) {
                    pageTrans.style.display = 'block';
                    pageTrans.innerHTML = '<span class="translation-tag">💡 الترجمة:</span> ' + page.textAr;
                } else {
                    pageTrans.style.display = 'none';
                }
            }
            if (pageVocab) {
                if (page.vocabNotes) {
                    pageVocab.style.display = 'flex';
                    let chips = [];
                    if (Array.isArray(page.vocabNotes)) {
                        chips = page.vocabNotes.map(item => {
                            if (typeof item === 'object' && item !== null) {
                                return (item.en || '') + (item.ar ? ' (' + item.ar + ')' : '');
                            }
                            return String(item);
                        });
                    } else if (typeof page.vocabNotes === 'string') {
                        chips = page.vocabNotes.split('•').map(chip => chip.trim());
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
            const btn = document.getElementById('storytellerBtn');
            if (btn) {
                btn.classList.add('playing');
                btn.innerHTML = '⏸️ إيقاف القارئ (Stop Storyteller)';
            }
            this.updateDOM();

            const curPage = pages[this.currentPage];
            const textToRead = curPage ? curPage.textEn : '';
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
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
            const btn = document.getElementById('storytellerBtn');
            if (btn) {
                btn.classList.remove('playing');
                btn.innerHTML = '▶️ القارئ التلقائي (Auto Storyteller)';
            }
            this.updateDOM();
        }

        speakCurrentPage() {
            const pages = this.storyPages.length > 0 ? this.storyPages : (window.lessonData?.storyPages || []);
            const text = pages[this.currentPage]?.textEn;
            if (text && typeof window.speakText === 'function') {
                window.speakText(text);
            }
        }

        // ==========================================
        // 2. Sentence Bubbles Management
        // ==========================================
        loadStory(lines) {
            this.storyLines = Array.isArray(lines) ? lines : [];
            this.currentIndex = 0;
            this.stop();
        }

        highlightBubble(lineId) {
            const bubbles = document.querySelectorAll('.story-line-bubble');
            bubbles.forEach(b => {
                b.classList.remove('active-reading');
            });

            const target = document.getElementById('story-line-' + lineId);
            if (target) {
                target.classList.add('active-reading');
                target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        }

        speakLine(text, lineId) {
            this.stop();
            if (lineId !== undefined) {
                this.highlightBubble(lineId);
            }
            if (typeof window.speakText === 'function') {
                window.speakText(text);
            }
        }

        playAll(startIndex = 0) {
            if (!this.storyLines || this.storyLines.length === 0) return;
            this.isPlaying = true;
            this.currentIndex = startIndex;

            const playBtn = document.getElementById('play-all-btn');
            if (playBtn) {
                playBtn.classList.add('playing');
                playBtn.innerHTML = '<span>⏸️</span> جاري القراءة التفاعلية...';
            }

            const self = this;
            function step(idx) {
                if (!self.isPlaying || idx >= self.storyLines.length) {
                    self.stop();
                    return;
                }

                self.currentIndex = idx;
                const item = self.storyLines[idx];
                self.highlightBubble(item.id);

                if (typeof window.speakText === 'function') {
                    window.speakText(item.text);
                }

                const wordCount = (item.text || '').split(' ').length;
                const duration = Math.max(self.config.minDurationMs, (wordCount * self.config.wordSpeedMs) + self.config.basePauseMs);

                self.playbackTimer = setTimeout(() => {
                    step(idx + 1);
                }, duration);
            }

            step(startIndex);
        }

        stop() {
            this.isPlaying = false;
            if (this.playbackTimer) {
                clearTimeout(this.playbackTimer);
                this.playbackTimer = null;
            }
            if (window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }

            const playBtn = document.getElementById('play-all-btn');
            if (playBtn) {
                playBtn.classList.remove('playing');
                playBtn.innerHTML = '<span>▶️</span> تشغيل القراءة كاملة';
            }

            document.querySelectorAll('.story-line-bubble').forEach(b => {
                b.classList.remove('active-reading');
            });
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
        // 3. Interactive Reading Glosses (TreeWalker)
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
            const currentPage = (this.storyPages && this.storyPages[this.currentPage]) || {};
            if (Array.isArray(currentPage.vocabNotes)) {
                currentPage.vocabNotes.forEach(item => {
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

                // Build a combined regex matching any of the vocab terms (with common suffixes: s, es, ed, ing, d)
                const patterns = sortedKeys.map(k => {
                    const esc = (window.AssemUtils && window.AssemUtils.escapeRegExp) ? window.AssemUtils.escapeRegExp(k) : k;
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
                        const esc = (window.AssemUtils && window.AssemUtils.escapeRegExp) ? window.AssemUtils.escapeRegExp(k) : k;
                        return new RegExp(`^${esc}(?:s|es|ed|ing|d)?$`, 'i').test(matchedText);
                    }) || matchedText.toLowerCase();

                    const vocabData = vocabMap.get(matchedKey) || { en: matchedText, ar: '' };

                    const glossBtn = document.createElement('button');
                    glossBtn.type = 'button';
                    glossBtn.className = 'story-gloss-term';
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
                    if (!popover.contains(e.target) && !e.target.classList.contains('story-gloss-term')) {
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
            popover.querySelector('.gloss-audio-btn').onclick = (e) => {
                e.stopPropagation();
                if (typeof window.playSound === 'function') window.playSound('click');
                if (typeof window.speakText === 'function') window.speakText(word);
            };

            // Dismiss button
            popover.querySelector('.gloss-dismiss-btn').onclick = (e) => {
                e.stopPropagation();
                popover.style.display = 'none';
            };

            // Practice Bank Add button
            const saveBtn = popover.querySelector('.gloss-save-practice-btn');
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
    StoryEngine.init = function(data) {
        if (storyEngine) {
            if (Array.isArray(data)) {
                storyEngine.loadPages(data);
            } else if (data && Array.isArray(data.storyPages)) {
                storyEngine.loadPages(data.storyPages);
            } else if (data) {
                storyEngine.loadPages(data);
            }
        }
    };
    StoryEngine.loadPages = function(data) {
        if (storyEngine) storyEngine.loadPages(data);
    };
    StoryEngine.prevPage = function() {
        if (storyEngine) storyEngine.changePage(-1);
    };
    StoryEngine.nextPage = function() {
        if (storyEngine) storyEngine.changePage(1);
    };
    StoryEngine.toggleAutoPlay = function() {
        if (storyEngine) storyEngine.toggleStoryteller();
    };
    StoryEngine.toggleStoryteller = function() {
        if (storyEngine) storyEngine.toggleStoryteller();
    };
    StoryEngine.speakCurrentPage = function() {
        if (storyEngine) storyEngine.speakCurrentPage();
    };

    // Prototype aliases for flexibility
    StoryEngine.prototype.init = function(data) {
        if (Array.isArray(data)) {
            this.loadPages(data);
        } else if (data && Array.isArray(data.storyPages)) {
            this.loadPages(data.storyPages);
        } else if (data) {
            this.loadPages(data);
        }
    };
    StoryEngine.prototype.prevPage = function() {
        this.changePage(-1);
    };
    StoryEngine.prototype.nextPage = function() {
        this.changePage(1);
    };
    StoryEngine.prototype.toggleAutoPlay = function() {
        this.toggleStoryteller();
    };

    window.StoryEngine = StoryEngine;
    window.storyEngine = storyEngine;

    // Public Universal API & Backward Compatibility Helpers
    window.updateStorybookDOM = () => storyEngine.updateDOM();
    window.changeStoryPage = (dir) => storyEngine.changePage(dir);
    window.toggleStoryteller = () => storyEngine.toggleStoryteller();
    window.startStoryteller = () => storyEngine.startStoryteller();
    window.stopStoryteller = () => storyEngine.stopStoryteller();
    window.speakCurrentStoryPage = () => storyEngine.speakCurrentPage();

    window.highlightStoryBubble = (id) => storyEngine.highlightBubble(id);
    window.speakStoryLine = (text, id) => storyEngine.speakLine(text, id);
    window.playAllStory = (startIdx) => storyEngine.playAll(startIdx);
    window.stopStorySpeech = () => storyEngine.stop();
    window.checkStoryAnswer = (btn, isCorrect, msg) => storyEngine.checkAnswer(btn, isCorrect, msg);

    // Auto-initialize if DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.lessonData?.storyPages) {
                storyEngine.loadPages(window.lessonData.storyPages);
            }
        });
    } else {
        if (window.lessonData?.storyPages) {
            storyEngine.loadPages(window.lessonData.storyPages);
        }
    }

})(typeof window !== 'undefined' ? window : this);
