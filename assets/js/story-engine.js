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
                    pageVocab.innerHTML = page.vocabNotes.split('•').map(chip => '<span class="vocab-chip">' + chip.trim() + '</span>').join('');
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
    }

    // Global Instance
    const storyEngine = new StoryEngine();
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
