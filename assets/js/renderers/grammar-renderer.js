/**
 * Grammar & Lecture Deck Renderer (grammar-renderer.js)
 * Clean Architecture & Inheritance:
 * Extends BaseRenderer to handle grammar slides, interactive slideshows,
 * video lectures, and comparative grammar capsules.
 * Adheres strictly to Separation of Concerns (SoC), DRY, and NO GOD FILES.
 */

(function (window) {
    'use strict';

    const ParentClass = window.BaseRenderer || class {
        escapeHTML(s) { return String(s || ''); }
        escapeJS(s) { return String(s || '').replace(/'/g, "\\'"); }
        wrapBidi(s) { return String(s || ''); }
        renderAudioButton() { return ''; }
        renderCard(opts) { return window.CurriculumUIPrimitives ? window.CurriculumUIPrimitives.renderCard(opts) : ''; }
        renderTable(opts) { return window.CurriculumUIPrimitives ? window.CurriculumUIPrimitives.renderTable(opts) : ''; }
        renderSectionHeader(t, s, i) { return `<h3>${t}</h3>`; }
    };

    class GrammarRenderer extends ParentClass {
        constructor() {
            super('GrammarRenderer');
        }

        render(data) {
            this.renderGrammar(data);
        }

        /**
         * Render complete Grammar Tab (Slides + Video Lectures + Comparison Cards + HTML)
         */
        renderGrammar(data) {
            if (!data) return;

            const candidateIds = ['grammar', 'grammar-video', 'tab-grammar', 'grammar-tab', 'tab-grammar-video'];
            const targetContainers = [];
            const seen = new Set();
            
            candidateIds.forEach(id => {
                const el = document.getElementById(id);
                if (el && !seen.has(el)) {
                    seen.add(el);
                    targetContainers.push(el);
                }
            });

            if (targetContainers.length === 0) return;

            let html = '';

            // 1. Dual Video Section (Lecture + Short)
            if (data.youtubeLecture || data.youtubeShorts || data.videoLessons) {
                const lec = data.youtubeLecture || (data.videoLessons && data.videoLessons.lecture);
                const sh = data.youtubeShorts || (data.videoLessons && data.videoLessons.short);

                html += `<div class="video-dual-grid" style="margin-bottom: 25px;">`;
                if (lec) {
                    const embedUrl = lec.embedUrl || (lec.url ? lec.url.replace('watch?v=', 'embed/').replace('youtu.be/', 'www.youtube-nocookie.com/embed/') : '');
                    html += `
                        <div class="video-lesson-card" style="margin: 0; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div class="video-header-bar">
                                    <div>
                                        <div class="video-lesson-title">🎥 ${this.escapeHTML(lec.title || 'المحاضرة المرئية الكاملة')}</div>
                                        <div style="color: var(--text-muted); font-size: 0.88rem; margin-top: 4px;">✨ ${this.escapeHTML(lec.subtitle || 'شرح شامل ومفصل مع مستر أحمد عاصم')}</div>
                                    </div>
                                    ${lec.url ? `<a href="${lec.url}" target="_blank" rel="noopener noreferrer" class="badge badge-active video-external-link">▶️ YouTube</a>` : ''}
                                </div>
                                <div class="video-responsive-wrapper">
                                    <iframe src="${embedUrl}" title="${this.escapeHTML(lec.title || 'Lecture')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </div>
                            ${lec.note ? `<div style="margin-top: 14px; padding: 10px 14px; background: rgba(0, 243, 255, 0.08); border: 1px solid rgba(0, 243, 255, 0.2); border-radius: 12px; font-size: 0.85rem; color: #cbd5e1;">💡 ${this.escapeHTML(lec.note)}</div>` : ''}
                        </div>
                    `;
                }
                if (sh) {
                    const embedShort = sh.embedUrl || (sh.url ? sh.url.replace('shorts/', 'embed/').split('?')[0].replace('youtu.be/', 'www.youtube-nocookie.com/embed/') : '');
                    html += `
                        <div class="video-lesson-card" style="margin: 0; height: 100%; display: flex; flex-direction: column; justify-content: space-between;">
                            <div>
                                <div class="video-header-bar">
                                    <div>
                                        <div class="video-lesson-title">⚡ ${this.escapeHTML(sh.title || 'لمحة سريعة في دقيقة')}</div>
                                        <div style="color: var(--text-muted); font-size: 0.88rem; margin-top: 4px;">🎯 كبسولة إنجليزية سريعة ومركزة</div>
                                    </div>
                                    ${sh.url ? `<a href="${sh.url}" target="_blank" rel="noopener noreferrer" class="badge badge-gold video-external-link">⚡ Short</a>` : ''}
                                </div>
                                <div class="video-shorts-wrapper">
                                    <iframe src="${embedShort}" title="${this.escapeHTML(sh.title || 'Short')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </div>
                            <div style="margin-top: 14px; padding: 10px 14px; background: rgba(255, 183, 3, 0.08); border: 1px solid rgba(255, 183, 3, 0.25); border-radius: 12px; font-size: 0.85rem; color: #ffd166; text-align: center;">
                                ✨ <em>Easy Peasy Ya Englezeey • كبسولة القواعد في ثوانٍ</em>
                            </div>
                        </div>
                    `;
                }
                html += `</div>`;
            }

            // 2. Grammar Slides Deck (grammarSlides / grammarDeck / grammarLessons / grammar.slides)
            const slides = (data.grammarSlides && Array.isArray(data.grammarSlides) && data.grammarSlides.length > 0) ? data.grammarSlides :
                           (data.grammarDeck && Array.isArray(data.grammarDeck) && data.grammarDeck.length > 0) ? data.grammarDeck :
                           (data.grammarLessons && Array.isArray(data.grammarLessons) && data.grammarLessons.length > 0) ? data.grammarLessons :
                           (data.grammar && Array.isArray(data.grammar.slides)) ? data.grammar.slides : [];

            if (slides.length > 0) {
                const total = slides.length;

                html += `
                    <div class="section-title">⚡ ${this.escapeHTML(data.grammarTitle || 'شرح القواعد التفاعلية (Grammar Deck)')}</div>
                    <div class="lesson-desc-display" style="text-align: right; margin-bottom: 20px;">
                        💡 <strong>شرائح مستر أحمد عاصم التفاعلية:</strong> تصفح القواعد والأمثلة التفصيلية مع خيارات عرض الشرائح أو القائمة الكاملة.
                    </div>

                    <!-- Slide Control Toolbar -->
                    <div class="slide-control-toolbar">
                        <div class="slide-nav-buttons">
                            <button type="button" class="action-btn next-btn" id="grammarPrevSlideBtn" onclick="changeGrammarSlide(-1)">➔ الشريحة السابقة</button>
                            <span class="slide-counter-badge" id="grammarSlideCounter">شريحة 1 من ${total}</span>
                            <button type="button" class="action-btn next-btn" id="grammarNextSlideBtn" onclick="changeGrammarSlide(1)">الشريحة التالية ⬅</button>
                        </div>
                        <div class="view-mode-toggle">
                            <button type="button" class="view-mode-btn active" id="viewModeSlideBtn" onclick="setGrammarViewMode('slide')">📱 عرض الشرائح</button>
                            <button type="button" class="view-mode-btn" id="viewModeListBtn" onclick="setGrammarViewMode('list')">📜 عرض القائمة الكاملة</button>
                        </div>
                    </div>

                    <!-- Quick Slide Pills -->
                    <div class="slide-quick-pills" id="grammarSlidePills">
                        ${slides.map((s, idx) => `
                            <button type="button" class="slide-pill-item ${idx === 0 ? 'active' : ''}" onclick="jumpToGrammarSlide(${idx + 1})">
                                ${s.pillTitle || ((idx + 1) + '. ' + (s.title ? s.title.split('(')[0].trim() : 'Slide ' + (idx + 1)))}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Slides Deck Container -->
                    <div class="grammar-slides-deck" id="grammarSlidesDeck">
                        ${slides.map((s, idx) => `
                            <div class="grammar-slide-card ${idx > 0 ? 'hide-in-slide-mode' : ''}" id="grammar-slide-${idx + 1}">
                                <div class="slide-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,243,255,0.25); padding-bottom: 10px;">
                                    <span class="badge badge-active">🧠 المفهوم الأساسي</span>
                                    <h3 style="color: #00f3ff; margin: 0; font-size: 1.15rem;">${this.escapeHTML(s.title || '')}</h3>
                                    <span style="color: #94a3b8; font-size: 0.85rem;">شريحة ${idx + 1} من ${total}</span>
                                </div>
                                <div class="grammar-slide-body" style="padding-top: 12px;">
                                    ${(s.image || s.imageUrl) ? `
                                        <div class="grammar-slide-image-box" style="text-align: center; margin-bottom: 14px;">
                                            <img src="${s.image || s.imageUrl}" alt="${this.escapeHTML(s.title || '')}" style="max-width: 100%; border-radius: 12px; border: 1.5px solid rgba(0, 243, 255, 0.35); box-shadow: 0 8px 25px rgba(0,0,0,0.5);" />
                                        </div>
                                    ` : ''}
                                    ${s.lead ? `<p style="color: #38bdf8; font-weight: 600; font-size: 1.05rem; margin-bottom: 12px;">${this.escapeHTML(s.lead)}</p>` : ''}
                                    ${s.content || s.contentHtml || ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            // 3. Static Grammar Content / HTML Capsules
            const staticHtml = data.grammarContentHtml || (data.grammar && typeof data.grammar === 'object' && (data.grammar.html || data.grammar.contentHtml));
            if (staticHtml) {
                html += `
                    <div class="grammar-static-section" style="margin-top: 25px;">
                        ${staticHtml}
                    </div>
                `;
            }

            // 4. Grammar Comparison Cards
            const compCards = data.grammarComparisonCards || (data.grammar && data.grammar.comparisonCards);
            if (compCards && Array.isArray(compCards) && compCards.length > 0) {
                html += `
                    <div class="section-title" style="margin-top: 30px;">⚖️ بطاقات المقارنة والفروق الدقيقة (Grammar Comparisons)</div>
                    <div class="grammar-comparisons-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 16px;">
                        ${compCards.map(c => `
                            <div class="glass-card" style="padding: 18px; border-radius: 14px; border: 1px solid rgba(0, 243, 255, 0.25);">
                                <h4 style="color: #00f3ff; margin-bottom: 8px;">${this.escapeHTML(c.title || '')}</h4>
                                <div style="color: #f8fafc; font-size: 0.95rem; line-height: 1.6;">${c.content || c.html || ''}</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            if (!html.trim()) {
                html = `
                    <div style="text-align: center; padding: 45px 20px; background: rgba(19, 27, 46, 0.65); border: 1.5px dashed rgba(0, 243, 255, 0.3); border-radius: 18px; margin: 30px auto; max-width: 650px;">
                        <div style="font-size: 2.4rem; margin-bottom: 12px;">🌉</div>
                        <h3 style="color: #00f3ff; font-size: 1.25rem; margin-bottom: 8px;">شرح القواعد متكامل ومكثف</h3>
                        <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6; margin: 0;">
                            تطبيقات وقواعد هذا الدرس مدمجة تفاعلياً داخل أقسام المفردات والقراءة والاختبار الشامل للدرس.
                        </p>
                    </div>
                `;
            }

            targetContainers.forEach(container => {
                container.innerHTML = html;
            });

            if (window.grammarSlidesEngine && typeof window.grammarSlidesEngine.init === 'function') {
                window.grammarSlidesEngine.init();
            }
        }
    }

    const grammarInstance = new GrammarRenderer();

    window.GrammarRendererClass = GrammarRenderer;
    window.GrammarRenderer = grammarInstance;

})(typeof window !== 'undefined' ? window : this);
