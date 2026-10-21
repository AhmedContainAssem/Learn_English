/**
 * Lexicon & Grammar Renderer (lexicon-renderer.js)
 * Single Responsibility: Verbs, Definitions, Synonyms, Collocations, Affixes, Language Notes, and Grammar.
 */

(function (window) {
    'use strict';

    const UI = window.CurriculumUIPrimitives || {
        escapeHTML: str => String(str || ''),
        escapeJS: str => String(str || '').replace(/'/g, "\\'"),
        renderCard: () => '',
        renderTable: () => '',
        renderSectionHeader: () => ''
    };

    const LexiconRenderer = {
        /**
         * 1. Conjugation of Verbs
         */
        renderVerbs: function (data) {
            const container = document.getElementById('tab-verbs') || document.getElementById('verbs') || document.getElementById('vocab');
            if (!container || !data.verbs || data.verbs.length === 0) return;

            let html = `
            <h3 class="section-subtitle">⚡ تصريف الأفعال وتصريفاتها (Conjugation of Verbs):</h3>
            <div class="grid-cards">
                ${data.verbs.map(v => {
                    const word = v.word || v.v1 || v.present || '';
                    const forms = v.forms || (v.past && v.pp ? `${v.past} / ${v.pp}` : v.past || '');
                    const audio = v.audio || (forms ? `${word} ${forms}` : word);
                    const meaning = v.meaning || v.ar || v.arabic || '';
                    return UI.renderCard({
                        tag: v.type ? (v.type === 'irregular' ? 'Irregular' : 'Regular') : 'Present (V1)',
                        title: word,
                        audioText: audio,
                        meaning: meaning,
                        details: forms,
                        detailsLabel: 'الماضي والتصريف',
                        extraClass: 'verb-card'
                    });
                }).join('')}
            </div>`;

            container.innerHTML = html;
        },

        /**
         * 2. Affixes & Expressions
         */
        renderAffixes: function (data) {
            const container = document.getElementById('tab-affixes') || document.getElementById('affixes') || document.getElementById('notes-affixes');
            if (!container) return;

            const list = data.prefixes || data.suffixes || data.affixes || [];
            let html = '';
            if (list.length > 0) {
                html += `
                <h3 class="section-subtitle">🔤 البوادئ واللواحق (Prefixes & Suffixes):</h3>
                <div class="grid-cards">
                    ${list.map(a => {
                        const title = a.affix || a.word || a.type || '';
                        const desc = a.role || a.meaning || a.function || a.desc || '';
                        const example = a.examples || a.example || '';
                        const audioText = title.replace(/\([^)]*\)/g, '').trim() + (example ? ' ' + example.replace(/\([^)]*\)/g, '').trim() : '');
                        return UI.renderCard({
                            tag: 'Affix',
                            title: title,
                            audioText: audioText,
                            meaning: desc,
                            details: example,
                            detailsLabel: 'أمثلة'
                        });
                    }).join('')}
                </div>`;
            }

            if (data.expressions && data.expressions.length > 0) {
                html += `
                <h3 class="section-subtitle" style="margin-top: 30px;">💬 التعبيرات الهامة (Important Expressions):</h3>
                <div class="grid-cards">
                    ${data.expressions.map(exp => UI.renderCard({
                        title: exp.en || exp.phrase,
                        meaning: exp.ar || exp.meaning,
                        audioText: exp.en || exp.phrase
                    })).join('')}
                </div>`;
            }

            if (data.prepositions && data.prepositions.length > 0) {
                html += `
                <h3 class="section-subtitle" style="margin-top: 30px;">📍 حروف الجر الهامة (Prepositions):</h3>
                <div class="grid-cards">
                    ${data.prepositions.map(p => UI.renderCard({
                        title: p.en || p.phrase,
                        meaning: p.ar || p.meaning,
                        audioText: p.en || p.phrase
                    })).join('')}
                </div>`;
            }

            container.innerHTML = html;
        },

        /**
         * 3. Definitions, Synonyms, and Antonyms
         */
        renderDefinitions: function (data) {
            const defContainer = document.getElementById('definitions');
            const synContainer = document.getElementById('synonyms') || document.getElementById('synonyms-antonyms');
            const combinedContainer = document.getElementById('definitions-container') || document.getElementById('definitions-syn-ant') || document.getElementById('collocations');

            let html = '';

            // Definitions
            if (data.definitions && data.definitions.length > 0) {
                html += `
                <h3 class="section-subtitle">📚 1. Definitions (التعريفات المنهجية المعتمدة) - ${data.definitions.length} تعريفاً</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.definitions.map(d => {
                        const word = d.word || '';
                        const defText = d.definition || d.def || d.meaningEn || '';
                        const ar = d.meaning || d.ar || d.arabic || d.meaningAr || '';
                        return UI.renderCard({
                            tag: 'Definition',
                            title: word,
                            audioText: word + '. ' + defText,
                            meaning: ar,
                            customBody: `
                                <div class="simple-explain-box" style="direction: ltr; text-align: left; margin-top: 8px;">
                                    <strong style="color: var(--accent-primary);">${UI.escapeHTML(word)}:</strong> ${UI.escapeHTML(defText)}
                                </div>`
                        });
                    }).join('')}
                </div>`;
            }

            // Synonyms & Antonyms Table
            if (data.synonyms && data.synonyms.length > 0) {
                const headers = ['الكلمة (Word)', 'المعنى العربي', 'المرادف (Synonym)', 'المضاد (Antonym)'];
                const rows = data.synonyms.map(s => [
                    UI.escapeHTML(s.word),
                    UI.escapeHTML(s.arabic || s.meaning || ''),
                    UI.escapeHTML(s.synonym || s.synonyms || '-'),
                    UI.escapeHTML(s.antonym || s.antonyms || '-')
                ]);
                html += `
                <h3 class="section-subtitle" style="color: var(--accent-green); margin-top: 30px;">2. Synonyms &amp; Antonyms (المرادفات والمضاد)</h3>
                ${UI.renderTable({ headers, rows })}`;
            }

            const target = defContainer || combinedContainer;
            if (target) {
                target.innerHTML = html;
            }
        },

        /**
         * 4. Collocations & Prepositions Tab
         */
        renderCollocations: function (data) {
            const container = document.getElementById('collocations') || document.getElementById('tab-collocations') || document.getElementById('collocations-study');
            if (!container) return;

            let html = container.innerHTML || '';

            if (data.collocations && data.collocations.length > 0) {
                html += `
                <h3 class="section-subtitle">🔗 المتلازمات اللفظية (Collocations) - ${data.collocations.length} تعبيرات:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.collocations.map(c => UI.renderCard({
                        tag: 'Collocation',
                        title: c.en || c.phrase || c.word,
                        meaning: c.ar || c.meaning,
                        audioText: c.en || c.phrase || c.word
                    })).join('')}
                </div>`;
            }

            if (data.verbPrepositions && data.verbPrepositions.length > 0) {
                html += `
                <h3 class="section-subtitle" style="margin-top: 30px;">⚡ أفعال وحروف جر (Verbs & Prepositions):</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.verbPrepositions.map(vp => UI.renderCard({
                        tag: 'Verb + Prep',
                        title: vp.en || vp.phrase,
                        meaning: vp.ar || vp.meaning,
                        audioText: vp.en || vp.phrase
                    })).join('')}
                </div>`;
            }

            container.innerHTML = html;
        },

        /**
         * 5. Language Notes & Derivatives
         */
        renderLanguageNotes: function (data) {
            const container = document.getElementById('notes') || document.getElementById('tab-notes') || document.getElementById('notes-container') || document.getElementById('language-notes');
            if (!container) return;

            let html = `
                <div class="section-title">💡 IV. DERIVATIVES &amp; CLEAR THE CONFUSION (المشتقات ودراسة الفروق)</div>
                <p class="section-hint">دراسة عائلات الكلمات (Derivatives) مع الجمل وسياقاتها الامتحانية، وقسم (لاحظ الفرق) لحسم الفروق الدقيقة:</p>
            `;

            // 1. Derivatives (Rich Family Cards or Table)
            if (data.derivatives && data.derivatives.length > 0) {
                const isFamilyFormat = data.derivatives[0].rootEn || data.derivatives[0].items;

                if (isFamilyFormat) {
                    html += `
                    <h3 class="section-subtitle">🧬 1. Derivatives (المشتقات وسياقاتها في جمل منهجية) - ${data.derivatives.length} عائلات لغوية:</h3>
                    ${data.derivatives.map(d => `
                        <div class="note-card" style="background: rgba(19, 27, 46, 0.85); border: 1px solid var(--border-color); border-radius: 14px; padding: 18px; margin-bottom: 22px;">
                            <div class="note-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 14px;">
                                <div class="note-title-en" style="font-size: 1.15rem; font-weight: 800; color: var(--accent-primary);">${UI.escapeHTML(d.rootEn || d.root || d.title || '')}</div>
                                <div class="note-title-ar" style="font-weight: 700; color: #94a3b8;">${UI.escapeHTML(d.rootAr || d.arabic || '')}</div>
                            </div>
                            <div class="cards-grid grid-cards">
                                ${(d.items || []).map(item => `
                                    <div class="card" style="padding: 12px; background: rgba(11, 15, 25, 0.6); border: 1px solid rgba(56, 189, 248, 0.2);">
                                        <div style="font-weight: 700; color: var(--accent-primary); display: flex; justify-content: space-between; align-items: center;">
                                            <span>${UI.escapeHTML(item.form || item.word || '')}</span>
                                            <button type="button" class="audio-btn" onclick="if(typeof speakText==='function'){speakText('${UI.escapeJS((item.form || '') + '. ' + (item.example || ''))}');}if(typeof playSound==='function'){playSound('click');}" style="width: 28px; height: 28px; font-size: 0.8rem;" title="استمع للنطق">🔊</button>
                                        </div>
                                        ${item.example ? `
                                            <div style="color: #cbd5e1; font-size: 0.95rem; margin-top: 6px; direction: ltr; text-align: left;">
                                                • ${UI.escapeHTML(item.example)}
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}`;
                } else {
                    const headers = ['الكلمة الأساسية', 'الفعل (Verb)', 'الاسم (Noun)', 'الصفة (Adjective)'];
                    const rows = data.derivatives.map(d => [
                        UI.escapeHTML(d.base || d.word),
                        UI.escapeHTML(d.verb || '-'),
                        UI.escapeHTML(d.noun || '-'),
                        UI.escapeHTML(d.adj || d.adjective || '-')
                    ]);
                    html += `
                    <h3 class="section-subtitle">🧬 المشتقات (Derivatives):</h3>
                    ${UI.renderTable({ headers, rows })}`;
                }
            }

            // 2. Clear the Confusion (Structured or Flat)
            if (data.confusionNotes && data.confusionNotes.length > 0) {
                const isStructured = data.confusionNotes[0].items || data.confusionNotes[0].titleEn;

                if (isStructured) {
                    html += `
                    <h3 class="section-subtitle" style="margin-top: 35px; color: var(--accent-orange, #f59e0b);">⚡ 2. Clear the Confusion (لاحظ الفرق الدقيق):</h3>
                    ${data.confusionNotes.map(n => `
                        <div class="note-card" style="background: rgba(19, 27, 46, 0.85); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 14px; padding: 18px; margin-bottom: 22px;">
                            <div class="note-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(245, 158, 11, 0.3); padding-bottom: 10px; margin-bottom: 14px;">
                                <div class="note-title-en" style="font-size: 1.15rem; font-weight: 800; color: #f59e0b;">${UI.escapeHTML(n.titleEn || n.title || '')}</div>
                                <div class="note-title-ar" style="font-weight: 700; color: #94a3b8;">${UI.escapeHTML(n.titleAr || '')}</div>
                            </div>
                            <div style="display: flex; flex-direction: column; gap: 12px;">
                                ${(n.items || []).map(item => `
                                    <div style="background: rgba(11, 15, 25, 0.6); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px;">
                                        <div style="font-weight: 700; color: var(--accent-secondary); font-size: 1.05rem;">
                                            🔹 ${UI.escapeHTML(item.term || '')} ${item.meaning ? `<span style="color: #94a3b8; font-size: 0.95rem;">(${UI.escapeHTML(item.meaning)})</span>` : ''}
                                        </div>
                                        ${item.example ? `
                                            <div style="color: #e2e8f0; font-size: 0.95rem; margin-top: 6px; direction: ltr; text-align: left; padding: 8px 12px; background: rgba(0, 0, 0, 0.25); border-radius: 6px; border-left: 3px solid #38bdf8;">
                                                ${item.example}
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}`;
                } else {
                    html += `
                    <h3 class="section-subtitle" style="margin-top: 30px;">⚠️ ملحوظات لغوية وتفريق بين الكلمات:</h3>
                    <div class="cards-grid grid-cards">
                        ${data.confusionNotes.map(n => UI.renderCard({
                            tag: 'Notice',
                            title: n.title || n.pair,
                            meaning: n.explanation || n.notes,
                            details: n.examples || '',
                            detailsLabel: 'أمثلة توضيحية'
                        })).join('')}
                    </div>`;
                }
            }

            container.innerHTML = html;
        },

        /**
         * 6. Grammar & Slide Decks (Dynamic Generator)
         */
        renderGrammar: function (data) {
            const container = document.getElementById('grammar') || document.getElementById('tab-grammar') || document.getElementById('grammar-tab');
            if (!container) return;

            if (data.grammarSlides && Array.isArray(data.grammarSlides) && data.grammarSlides.length > 0) {
                const slides = data.grammarSlides;
                const total = slides.length;

                let html = `
                    <div class="section-title">⚡ ${data.grammarTitle || 'شرح القواعد التفاعلية (Grammar Slides)'}</div>
                    <div class="lesson-desc-display" style="text-align: right; margin-bottom: 20px;">
                        💡 <strong>شرائح مستر أحمد عاصم التفاعلية:</strong> استمتع بتصفح القواعد والأمثلة مع التكبير والتنقل السلس.
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
                                ${s.pillTitle || ((idx + 1) + '. ' + s.title.split('(')[0].trim())}
                            </button>
                        `).join('')}
                    </div>

                    <!-- Slides Deck Container -->
                    <div class="grammar-slides-deck" id="grammarSlidesDeck">
                        ${slides.map((s, idx) => `
                            <div class="grammar-slide-card ${idx > 0 ? 'hide-in-slide-mode' : ''}" id="grammar-slide-${idx + 1}">
                                <div class="slide-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0,243,255,0.25); padding-bottom: 10px;">
                                    <span class="badge badge-active">🧠 المفهوم الأساسي</span>
                                    <h3 style="color: #00f3ff; margin: 0; font-size: 1.15rem;">${UI.escapeHTML(s.title)}</h3>
                                    <span style="color: #94a3b8; font-size: 0.85rem;">شريحة ${idx + 1} من ${total}</span>
                                </div>
                                <div class="grammar-slide-body" style="padding-top: 12px;">
                                    ${(s.image || s.imageUrl) ? `
                                        <div class="grammar-slide-image-box" style="text-align: center; margin-bottom: 14px;">
                                            <img src="${s.image || s.imageUrl}" alt="${UI.escapeHTML(s.title)}" style="max-width: 100%; border-radius: 12px; border: 1.5px solid rgba(0, 243, 255, 0.35); box-shadow: 0 8px 25px rgba(0,0,0,0.5);" />
                                        </div>
                                    ` : ''}
                                    ${s.lead ? `<p style="color: #38bdf8; font-weight: 600; font-size: 1.05rem; margin-bottom: 12px;">${UI.escapeHTML(s.lead)}</p>` : ''}
                                    ${s.content || s.contentHtml || ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
                container.innerHTML = html;

                if (window.grammarSlidesEngine && typeof window.grammarSlidesEngine.init === 'function') {
                    window.grammarSlidesEngine.init();
                }
            }
        }
    };

    window.LexiconRenderer = LexiconRenderer;

})(typeof window !== 'undefined' ? window : this);
