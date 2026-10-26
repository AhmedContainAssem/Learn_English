/**
 * Grammar Slides & Presentation Gallery Engine (slides-engine.js)
 * Pure Architectural Inheritance for grammar slideshows, expression carousels, and image lightboxes.
 * Adheres strictly to Separation of Concerns (SoC) and DRY.
 */

(function (window) {
    'use strict';

    // ==========================================
    // 1. LIGHTBOX SUBSYSTEM
    // ==========================================
    function ensureLightboxDOM() {
        let lightbox = document.getElementById('slideLightboxModal');
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.id = 'slideLightboxModal';
            lightbox.className = 'slide-lightbox-overlay';
            lightbox.style.display = 'none';
            lightbox.setAttribute('role', 'dialog');
            lightbox.setAttribute('aria-modal', 'true');
            lightbox.innerHTML = `
                <div class="slide-lightbox-container" onclick="event.stopPropagation();">
                    <button type="button" class="slide-lightbox-close" onclick="closeSlideLightbox()" aria-label="Close Lightbox">✕</button>
                    <img id="slideLightboxImg" class="slide-lightbox-img" src="" alt="Slide Preview">
                    <div id="slideLightboxCaption" class="slide-lightbox-caption"></div>
                </div>
            `;
            lightbox.onclick = closeSlideLightbox;
            document.body.appendChild(lightbox);
        }
        return lightbox;
    }

    function openSlideLightbox(imgUrl, captionText) {
        if (!imgUrl) return;
        ensureLightboxDOM();
        const modal = document.getElementById('slideLightboxModal');
        const img = document.getElementById('slideLightboxImg');
        const cap = document.getElementById('slideLightboxCaption');

        if (img) img.src = imgUrl;
        if (cap) cap.textContent = captionText || '';
        if (modal) {
            modal.style.display = 'flex';
            document.body.classList.add('lightbox-open');
        }
        if (typeof window.playSound === 'function') window.playSound('click');
    }

    function closeSlideLightbox() {
        const modal = document.getElementById('slideLightboxModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('lightbox-open');
        }
        if (typeof window.playSound === 'function') window.playSound('click');
    }

    // Keyboard ESC listener for lightbox
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSlideLightbox();
    });

    // ==========================================
    // 2. GRAMMAR SLIDES ENGINE
    // ==========================================
    class GrammarSlidesEngine {
        constructor() {
            this.currentSlide = 1;
            this.totalSlides = 0;
            this.viewMode = 'slide'; // 'slide' or 'list'
            this.init();
        }

        init() {
            const slideElements = document.querySelectorAll('[id^="grammar-slide-"]');
            this.totalSlides = slideElements.length;
            if (this.totalSlides > 0) {
                this.updateUI();
                this.initTouchSwipe();
            }
        }

        initTouchSwipe() {
            const deck = document.getElementById('grammarSlidesDeck') || document.getElementById('grammarSlidesContainer');
            if (!deck || deck.dataset.swipeBound) return;
            deck.dataset.swipeBound = "true";

            let touchStartX = 0;
            let touchStartY = 0;

            deck.addEventListener('touchstart', (e) => {
                if (e.touches && e.touches[0]) {
                    touchStartX = e.touches[0].clientX;
                    touchStartY = e.touches[0].clientY;
                }
            }, { passive: true });

            deck.addEventListener('touchend', (e) => {
                if (this.viewMode !== 'slide') return;
                if (e.changedTouches && e.changedTouches[0]) {
                    const touchEndX = e.changedTouches[0].clientX;
                    const touchEndY = e.changedTouches[0].clientY;
                    const deltaX = touchEndX - touchStartX;
                    const deltaY = touchEndY - touchStartY;

                    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.35) {
                        if (deltaX < 0) {
                            this.changeSlide(1);
                        } else {
                            this.changeSlide(-1);
                        }
                    }
                }
            }, { passive: true });
        }

        updateUI() {
            const counter = document.getElementById('grammarSlideCounter');
            const prevBtn = document.getElementById('grammarPrevSlideBtn');
            const nextBtn = document.getElementById('grammarNextSlideBtn');
            const pills = document.querySelectorAll('#grammarSlidePills .slide-pill-item');

            if (counter) {
                counter.innerText = `شريحة ${this.currentSlide} من ${this.totalSlides}`;
            }
            if (prevBtn) prevBtn.disabled = (this.currentSlide === 1);
            if (nextBtn) nextBtn.disabled = (this.currentSlide === this.totalSlides);

            // Update navigation pill markers
            pills.forEach((pill, idx) => {
                if (idx + 1 === this.currentSlide) {
                    pill.classList.add('active');
                    if (typeof pill.scrollIntoView === 'function') {
                        pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                } else {
                    pill.classList.remove('active');
                }
            });

            // Update slide visibility
            for (let i = 1; i <= this.totalSlides; i++) {
                const slide = document.getElementById(`grammar-slide-${i}`);
                if (!slide) continue;

                if (this.viewMode === 'list') {
                    slide.classList.remove('hide-in-slide-mode');
                } else {
                    if (i === this.currentSlide) {
                        slide.classList.remove('hide-in-slide-mode');
                    } else {
                        slide.classList.add('hide-in-slide-mode');
                    }
                }
            }
        }

        changeSlide(delta) {
            const next = this.currentSlide + delta;
            if (next >= 1 && next <= this.totalSlides) {
                this.currentSlide = next;
                this.updateUI();
                if (typeof window.playSound === 'function') window.playSound('click');
                const activeSlide = document.getElementById(`grammar-slide-${this.currentSlide}`);
                if (activeSlide && this.viewMode === 'slide') {
                    activeSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }

        jumpToSlide(index) {
            if (index >= 1 && index <= this.totalSlides) {
                this.currentSlide = index;
                this.updateUI();
                if (typeof window.playSound === 'function') window.playSound('click');
                const targetSlide = document.getElementById(`grammar-slide-${this.currentSlide}`);
                if (targetSlide) {
                    targetSlide.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }

        setViewMode(mode) {
            this.viewMode = mode;
            const slideBtn = document.getElementById('viewModeSlideBtn');
            const listBtn = document.getElementById('viewModeListBtn');

            if (mode === 'slide') {
                if (slideBtn) slideBtn.classList.add('active');
                if (listBtn) listBtn.classList.remove('active');
            } else {
                if (listBtn) listBtn.classList.add('active');
                if (slideBtn) slideBtn.classList.remove('active');
            }
            this.updateUI();
            if (typeof window.playSound === 'function') window.playSound('click');
        }
    }

    // ==========================================
    // 3. EXPRESSION CAROUSEL ENGINE
    // ==========================================
    class ExpressionCarouselEngine {
        constructor() {
            this.currentIndex = 0;
            this.data = [];
        }

        loadData(data) {
            if (Array.isArray(data)) {
                this.data = data;
                this.currentIndex = 0;
                this.updateUI();
            }
        }

        updateUI() {
            const data = this.data[this.currentIndex];
            if (!data) return;

            const img = document.getElementById('expressionMainImg');
            const enTitle = document.getElementById('expressionEnTitle');
            const arMeaning = document.getElementById('expressionArMeaning');
            const tagBadge = document.getElementById('expressionTagBadge');
            const explainText = document.getElementById('expressionExplainText');
            const exampleText = document.getElementById('expressionExampleText');
            const exampleTrans = document.getElementById('expressionExampleTrans');
            const counterBadge = document.getElementById('exprCounterBadge');
            const prevBtn = document.getElementById('exprPrevBtn');
            const nextBtn = document.getElementById('exprNextBtn');
            const pills = document.querySelectorAll('#expressionPills .expression-pill-item');

            if (img && data.img) img.src = data.img;
            if (enTitle) enTitle.textContent = data.en || '';
            if (arMeaning) arMeaning.textContent = data.ar || '';
            if (tagBadge) tagBadge.textContent = `📸 تعبير مصور ${data.id || (this.currentIndex + 1)} من ${this.data.length}`;
            if (explainText) explainText.textContent = data.explain || '';
            if (exampleText) exampleText.innerHTML = data.exampleEn || '';
            if (exampleTrans) exampleTrans.textContent = data.exampleAr || '';
            if (counterBadge) counterBadge.textContent = `${data.id || (this.currentIndex + 1)} / ${this.data.length}`;

            if (prevBtn) prevBtn.disabled = (this.currentIndex === 0);
            if (nextBtn) nextBtn.disabled = (this.currentIndex === this.data.length - 1);

            pills.forEach((pill, idx) => {
                if (idx === this.currentIndex) {
                    pill.classList.add('active');
                    if (typeof pill.scrollIntoView === 'function') {
                        pill.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                    }
                } else {
                    pill.classList.remove('active');
                }
            });
        }

        changeExpression(delta) {
            const next = this.currentIndex + delta;
            if (next >= 0 && next < this.data.length) {
                this.currentIndex = next;
                this.updateUI();
                if (typeof window.playSound === 'function') window.playSound('click');
            }
        }

        jumpToExpression(num) {
            const targetIdx = num - 1;
            if (targetIdx >= 0 && targetIdx < this.data.length) {
                this.currentIndex = targetIdx;
                this.updateUI();
                const card = document.getElementById('expressionShowcaseCard');
                if (card && typeof card.scrollIntoView === 'function') {
                    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        }

        speakActive() {
            const item = this.data[this.currentIndex];
            if (item && item.en && typeof window.speakText === 'function') {
                window.speakText(item.en);
                if (typeof window.playSound === 'function') window.playSound('click');
            }
        }

        openLightbox() {
            const item = this.data[this.currentIndex];
            if (item && item.img) {
                openSlideLightbox(item.img, `${item.id || (this.currentIndex + 1)}. ${item.en} (${item.ar})`);
            }
        }
    }

    // Singleton Instances
    const globalGrammarEngine = new GrammarSlidesEngine();
    const globalExpressionEngine = new ExpressionCarouselEngine();

    // Attach backwards-compatible global APIs
    window.openSlideLightbox = openSlideLightbox;
    window.closeSlideLightbox = closeSlideLightbox;

    window.updateGrammarSlideUI = () => globalGrammarEngine.updateUI();
    window.changeGrammarSlide = (delta) => globalGrammarEngine.changeSlide(delta);
    window.jumpToGrammarSlide = (index) => globalGrammarEngine.jumpToSlide(index);
    window.setGrammarViewMode = (mode) => globalGrammarEngine.setViewMode(mode);

    window.updateExpressionUI = () => globalExpressionEngine.updateUI();
    window.changeExpression = (delta) => globalExpressionEngine.changeExpression(delta);
    window.jumpToExpression = (num) => globalExpressionEngine.jumpToExpression(num);
    window.speakActiveExpression = () => globalExpressionEngine.speakActive();
    window.openActiveExpressionLightbox = () => globalExpressionEngine.openLightbox();

    window.GrammarSlidesEngine = GrammarSlidesEngine;
    window.grammarSlidesEngine = globalGrammarEngine;
    window.ExpressionCarouselEngine = ExpressionCarouselEngine;
    window.expressionCarouselEngine = globalExpressionEngine;

    // Auto-bootstrap on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
        globalGrammarEngine.init();
        if (window.expressionsData && Array.isArray(window.expressionsData)) {
            globalExpressionEngine.loadData(window.expressionsData);
        }
    });

})(typeof window !== 'undefined' ? window : this);
