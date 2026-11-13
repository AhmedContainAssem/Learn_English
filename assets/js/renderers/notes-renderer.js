/**
 * Language Notes & Derivatives Renderer (notes-renderer.js)
 * Clean Architecture & Inheritance:
 * Extends BaseRenderer to handle derivatives, word families, clear the confusion,
 * and linguistic notes with full Arabic translations and audio.
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
        normalizeExamples(ex) { return []; }
        renderExamplesList(ex) { return ''; }
    };

    class NotesRenderer extends ParentClass {
        constructor() {
            super('NotesRenderer');
        }

        render(data) {
            this.renderLanguageNotes(data);
        }

        /**
         * Normalize a confusion or language note item across all data schema formats
         */
        normalizeNote(n) {
            let titleEn = n.titleEn || '';
            let titleAr = n.titleAr || '';
            const rawTitle = (n.title || n.pair || '').trim();

            if (!titleEn && !titleAr && rawTitle) {
                if (/[\u0600-\u06FF]/.test(rawTitle) && /[a-zA-Z]/.test(rawTitle)) {
                    titleAr = rawTitle;
                } else if (/[\u0600-\u06FF]/.test(rawTitle)) {
                    titleAr = rawTitle;
                } else {
                    titleEn = rawTitle;
                }
            }

            const explanation = (n.rule || n.note || n.notes || n.explanation || n.meaning || '').trim();

            let rawExamples = [];
            if (Array.isArray(n.examples)) {
                rawExamples = n.examples;
            } else if (typeof n.examples === 'string') {
                rawExamples = n.examples.split(/•|\n/).map(s => s.trim()).filter(Boolean);
            } else if (n.example) {
                rawExamples = typeof n.example === 'string' ? n.example.split(/•|\n/).map(s => s.trim()).filter(Boolean) : [n.example];
            }

            const examples = this.normalizeExamples(rawExamples);

            return {
                titleEn,
                titleAr: titleAr || rawTitle,
                rawTitle,
                explanation,
                examples,
                items: n.items || []
            };
        }

        /**
         * Render a single confusion / language note card with complete Arabic translation
         */
        renderConfusionCard(n) {
            const norm = this.normalizeNote(n);

            // 1. Structured sub-items format (as in Prep 3 Unit 3)
            if (norm.items && norm.items.length > 0) {
                return `
                <div class="note-card" style="background: rgba(19, 27, 46, 0.85); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 14px; padding: 18px; margin-bottom: 22px; box-shadow: 0 4px 20px rgba(245, 158, 11, 0.08);">
                    <div class="note-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(245, 158, 11, 0.3); padding-bottom: 10px; margin-bottom: 14px;">
                        <div class="note-title-en" style="font-size: 1.15rem; font-weight: 800; color: #f59e0b;">
                            ${this.escapeHTML(norm.titleEn || norm.rawTitle)}
                        </div>
                        <div class="note-title-ar" style="font-weight: 700; color: #94a3b8;">
                            ${this.wrapBidi(norm.titleAr)}
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${norm.items.map(item => `
                            <div style="background: rgba(11, 15, 25, 0.6); border: 1px solid var(--border-color); border-radius: 10px; padding: 14px;">
                                <div style="font-weight: 700; color: var(--accent-secondary, #38bdf8); font-size: 1.05rem; display: flex; justify-content: space-between; align-items: center;">
                                    <span>🔹 ${this.escapeHTML(item.term || '')} ${item.meaning ? `<span style="color: #cbd5e1; font-size: 0.95rem; font-weight: 500;">(${this.wrapBidi(item.meaning)})</span>` : ''}</span>
                                    ${this.renderAudioButton(item.term || item.example, { size: 'small' })}
                                </div>
                                ${(item.examples || item.example) ? this.renderExamplesList(item.examples || item.example) : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>`;
            }

            // 2. Standard format with explanation and examples
            return `
            <div class="note-card" style="background: rgba(19, 27, 46, 0.85); border: 1px solid var(--border-color); border-radius: 14px; padding: 18px; margin-bottom: 22px;">
                <div class="note-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 14px;">
                    <div class="note-title-en" style="font-size: 1.15rem; font-weight: 800; color: var(--accent-orange, #f59e0b);">
                        ${this.escapeHTML(norm.titleEn || norm.rawTitle)}
                    </div>
                    <div class="note-title-ar" style="font-weight: 700; color: #94a3b8;">
                        ${this.wrapBidi(norm.titleAr)}
                    </div>
                </div>
                ${norm.explanation ? `
                    <div class="note-explanation" style="font-size: 1rem; color: #e2e8f0; line-height: 1.7; margin-bottom: 12px;">
                        ${this.wrapBidi(norm.explanation)}
                    </div>
                ` : ''}
                ${norm.examples.length > 0 ? this.renderExamplesList(norm.examples) : ''}
            </div>`;
        }

        /**
         * Render full Language Notes & Derivatives section
         */
        renderLanguageNotes(data) {
            const container = document.getElementById('notes') || document.getElementById('tab-notes') || document.getElementById('notes-container') || document.getElementById('language-notes');
            if (!container) return;

            let html = `
                <div class="section-title">💡 IV. DERIVATIVES &amp; CLEAR THE CONFUSION (المشتقات ودراسة الفروق)</div>
                <p class="section-hint">دراسة عائلات الكلمات (Derivatives) مع الجمل وسياقاتها الامتحانية، وقسم (لاحظ الفرق) لحسم الفروق الدقيقة مع الترجمة الكاملة:</p>
            `;

            // Normalize derivatives list across all schema variants
            const derivList = data.derivatives || data.derivativeRoots || data.wordFamilies;

            if (derivList && derivList.length > 0) {
                const first = derivList[0];
                const hasDetailedSentenceItems = (first.items && first.items.length > 0 && (first.items[0].example || first.items[0].term || first.items[0].form)) || (first.rootEn && first.items);

                if (hasDetailedSentenceItems) {
                    html += `
                    <h3 class="section-subtitle">🧬 1. Derivatives (المشتقات وسياقاتها في جمل منهجية) - ${derivList.length} عائلات لغوية:</h3>
                    ${derivList.map(d => `
                        <div class="note-card" style="background: rgba(19, 27, 46, 0.85); border: 1px solid var(--border-color); border-radius: 14px; padding: 18px; margin-bottom: 22px;">
                            <div class="note-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); padding-bottom: 10px; margin-bottom: 14px;">
                                <div class="note-title-en" style="font-size: 1.15rem; font-weight: 800; color: var(--accent-primary, #00f3ff);">${this.escapeHTML(d.rootEn || d.rootWord || d.root || d.title || d.word || '')}</div>
                                <div class="note-title-ar" style="font-weight: 700; color: #94a3b8;">${this.wrapBidi(d.rootAr || d.rootWordAr || d.arabic || '')}</div>
                            </div>
                            <div class="cards-grid grid-cards">
                                ${(d.items || []).map(item => `
                                    <div class="card" style="padding: 12px; background: rgba(11, 15, 25, 0.6); border: 1px solid rgba(56, 189, 248, 0.2);">
                                        <div style="font-weight: 700; color: var(--accent-primary, #00f3ff); display: flex; justify-content: space-between; align-items: center;">
                                            <span>${this.escapeHTML(item.form || item.word || item.term || '')} ${item.pos ? `<span style="font-size: 0.8rem; color: #94a3b8;">(${item.pos})</span>` : ''}</span>
                                            ${this.renderAudioButton((item.form || item.word || item.term || '') + '. ' + (item.example || ''), { size: 'small' })}
                                        </div>
                                        ${item.arabic || item.meaning ? `<div style="font-size: 0.9rem; color: #94a3b8; margin-top: 4px;">${this.wrapBidi(item.arabic || item.meaning)}</div>` : ''}
                                        ${item.example ? `
                                            <div style="color: #cbd5e1; font-size: 0.95rem; margin-top: 6px; direction: ltr; text-align: left;">
                                                • ${this.escapeHTML(item.example)}
                                            </div>
                                        ` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}`;
                } else {
                    const getWordsByPos = (subList, posFilter) => {
                        if (!subList || !Array.isArray(subList)) return '';
                        const matches = subList.filter(f => {
                            const p = String(f.pos || f.partOfSpeech || f.type || '').toLowerCase();
                            return posFilter.some(target => p === target || p.startsWith(target + ' ') || p.includes('/' + target) || p.includes(target + '/'));
                        });
                        return matches.map(f => f.word || f.form || f.text || f.term || '').filter(Boolean).join(', ');
                    };

                    const headers = ['الكلمة الأساسية', 'الفعل (Verb)', 'الاسم (Noun)', 'الصفة (Adjective)'];
                    const rows = derivList.map(d => {
                        const subList = d.forms || d.words || d.items;
                        let rootName = d.base || d.word || d.root || d.rootWord || d.rootEn || '';
                        let verb = d.verb;
                        let noun = d.noun;
                        let adj = d.adj || d.adjective;

                        if (subList && Array.isArray(subList)) {
                            if (!verb) verb = getWordsByPos(subList, ['v', 'verb']);
                            if (!noun) noun = getWordsByPos(subList, ['n', 'noun']);
                            if (!adj) adj = getWordsByPos(subList, ['adj', 'adjective']);
                        }

                        if (!verb && !noun && !adj && d.pos) {
                            const p = String(d.pos).toLowerCase();
                            if (p.includes('v')) verb = d.word;
                            if (p.includes('n')) noun = d.word;
                            if (p.includes('adj')) adj = d.word;
                        }

                        return [
                            this.escapeHTML(rootName || '-'),
                            this.escapeHTML(verb || '-'),
                            this.escapeHTML(noun || '-'),
                            this.escapeHTML(adj || '-')
                        ];
                    });

                    html += `
                    <h3 class="section-subtitle">🧬 المشتقات (Derivatives):</h3>
                    ${this.renderTable({ headers, rows })}`;
                }
            }

            // 2. Clear the Confusion (Structured or Flat)
            const confusionList = data.confusionNotes || data.clearConfusion || [];
            if (confusionList.length > 0) {
                html += `
                <h3 class="section-subtitle" style="margin-top: 35px; color: var(--accent-orange, #f59e0b);">
                    ⚡ لاحظ الفروق الدقيقة وحسم الالتباس (Clear the Confusion):
                </h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${confusionList.map(n => this.renderConfusionCard(n)).join('')}
                </div>`;
            }

            // 3. Additional Language Notes
            const langNotes = data.languageNotes || [];
            if (langNotes.length > 0) {
                html += `
                <h3 class="section-subtitle" style="margin-top: 35px; color: var(--accent-cyan, #00f3ff);">
                    📝 ملحوظات لغوية إضافية وقواعد استخدام (Language Notes):
                </h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${langNotes.map(n => this.renderConfusionCard(n)).join('')}
                </div>`;
            }

            container.innerHTML = html;
        }
    }

    const notesInstance = new NotesRenderer();

    window.NotesRendererClass = NotesRenderer;
    window.NotesRenderer = notesInstance;

})(typeof window !== 'undefined' ? window : this);
