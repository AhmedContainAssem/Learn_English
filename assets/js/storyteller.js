/**
 * Sentence Bubbles & Audio Narration Controller (storyteller.js)
 * Single Responsibility: Manages sequential dialogue sentence bubbles, highlight tracking, and audio step playback.
 */

(function (window) {
    'use strict';

    class StorytellerController {
        constructor(config = {}) {
            this.config = {
                wordSpeedMs: 250,
                basePauseMs: 700,
                minDurationMs: 1400,
                ...config
            };
            this.storyLines = [];
            this.currentIndex = 0;
            this.isPlaying = false;
            this.playbackTimer = null;
        }

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
    }

    window.StorytellerController = StorytellerController;

})(typeof window !== 'undefined' ? window : this);
