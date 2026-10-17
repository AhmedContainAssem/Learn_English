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

            const imageUrl = page.imageUrl || page.img || page.image || '';
            const textEn = page.textEn || page.text || '';
            const textAr = page.textAr || page.translation || page.trans || '';
            const vocabNotes = page.vocabNotes || page.vocab || page.chips || null;

            if (pageBadge) pageBadge.textContent = '🖼️ Scene ' + (this.currentPage + 1) + ' of ' + total;
            if (pageArtworkImg) {
                if (imageUrl) {
                    pageArtworkImg.classList.remove('hidden');
                    pageArtworkImg.src = imageUrl;
                    pageArtworkImg.style.display = 'block';
                } else {
                    pageArtworkImg.style.display = 'none';
                }
            }
            if (pageCaption) pageCaption.textContent = page.caption || '';
            if (pageCounter) pageCounter.textContent = 'Page ' + (this.currentPage + 1) + ' / ' + total;
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
            const btn = document.getElementById('storytellerBtn');
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
            const btn = document.getElementById('storytellerBtn');
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

        // 3. Interactive Reading Glosses (Delegated to StoryGlossEngine)
        applyInteractiveGlosses(pageText) {
            if (window.StoryGlossEngine && typeof window.StoryGlossEngine.applyGlosses === 'function') {
                window.StoryGlossEngine.applyGlosses(pageText, this.storyPages, this.currentPage);
            }
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
    window.toggleStoryteller = () => storyEngine.toggleStoryteller();
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
        }
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPages);
    } else {
        initPages();
    }

})(typeof window !== 'undefined' ? window : this);
