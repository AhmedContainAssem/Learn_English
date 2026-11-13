/**
 * Lexicon & Grammar Renderer (lexicon-renderer.js)
 * Clean Architecture & Inheritance:
 * Extends BaseRenderer to handle Verbs, Definitions, Synonyms, Collocations, Affixes, Language Notes, and Grammar.
 * Fully supports bilingual notes, BiDi isolation, and structured example sentences with audio.
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

    class LexiconRenderer extends ParentClass {
        constructor() {
            super('LexiconRenderer');
        }

        /**
         * Delegate to specialized NotesRenderer if requested through LexiconRenderer
         */
        normalizeNote(n) {
            return window.NotesRenderer ? window.NotesRenderer.normalizeNote(n) : n;
        }

        renderConfusionCard(n) {
            return window.NotesRenderer ? window.NotesRenderer.renderConfusionCard(n) : '';
        }

        /**
         * 1. Conjugation of Verbs
         */
        renderVerbs(data) {
            const container = document.getElementById('tab-verbs') || document.getElementById('verbs') || document.getElementById('vocab');
            if (!container || !data.verbs) return;

            let regularVerbs = [];
            let irregularVerbs = [];
            let isStructured = false;

            if (Array.isArray(data.verbs)) {
                if (data.verbs.length === 0) return;
                regularVerbs = data.verbs.filter(v => v.type === 'regular');
                irregularVerbs = data.verbs.filter(v => v.type === 'irregular');
                if (regularVerbs.length === 0 && irregularVerbs.length === 0) {
                    regularVerbs = data.verbs;
                } else {
                    isStructured = true;
                }
            } else if (typeof data.verbs === 'object') {
                regularVerbs = Array.isArray(data.verbs.regular) ? data.verbs.regular : [];
                irregularVerbs = Array.isArray(data.verbs.irregular) ? data.verbs.irregular : [];
                isStructured = true;
            }

            const self = this;
            function renderVerbCards(list, defaultTag) {
                return list.map(v => {
                    const word = v.word || v.v1 || v.present || v.base || '';
                    const past = v.past || v.v2 || '';
                    const pp = v.pp || v.p_p || v.v3 || '';
                    const forms = v.forms || (past && pp ? `${past} / ${pp}` : past);
                    const audio = v.audio || (forms ? `${word} ${forms}` : word);
                    const meaning = v.meaning || v.ar || v.arabic || v.translation || '';
                    const tag = v.type ? (v.type === 'irregular' ? 'Irregular' : 'Regular') : defaultTag;
                    return self.renderCard({
                        tag: tag,
                        tagType: tag === 'Irregular' ? 'active' : 'default',
                        title: word,
                        audioText: audio,
                        meaning: meaning,
                        details: forms,
                        detailsLabel: 'الماضي والتصريف',
                        extraClass: 'verb-card'
                    });
                }).join('');
            }

            let html = '';
            if (isStructured && regularVerbs.length > 0 && irregularVerbs.length > 0) {
                html += `
                <h3 class="section-subtitle">🟢 تصريف الأفعال المنتظمة (Regular Verbs) - ${regularVerbs.length} أفعال:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 30px;">
                    ${renderVerbCards(regularVerbs, 'Regular')}
                </div>
                <h3 class="section-subtitle" style="color: var(--accent-secondary, #38bdf8); margin-top: 25px;">⚡ تصريف الأفعال غير المنتظمة (Irregular Verbs) - ${irregularVerbs.length} أفعال:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 30px;">
                    ${renderVerbCards(irregularVerbs, 'Irregular')}
                </div>`;
            } else {
                const combined = regularVerbs.concat(irregularVerbs);
                html += `
                <h3 class="section-subtitle">⚡ تصريف الأفعال وتصريفاتها (Conjugation of Verbs) - ${combined.length} أفعال:</h3>
                <div class="cards-grid grid-cards">
                    ${renderVerbCards(combined, 'Verb')}
                </div>`;
            }

            // Append expressions if there is no dedicated tab for collocations, prepositions, or affixes
            const hasCollocTab = document.getElementById('collocations') || document.getElementById('tab-collocations') || document.getElementById('prepositions');
            const hasAffixTab = document.getElementById('affixes') || document.getElementById('tab-affixes') || document.getElementById('notes-affixes');
            if (data.expressions && data.expressions.length > 0 && !hasCollocTab && !hasAffixTab) {
                html += `
                <h3 class="section-subtitle" style="color: var(--accent-secondary, #38bdf8); margin-top: 30px; margin-bottom: 15px;">💬 تعبيرات وحروف جر هامة (Important Expressions):</h3>
                <div class="cards-grid grid-cards">
                    ${data.expressions.map(e => this.renderCard({
                        tag: 'Expression',
                        title: e.phrase || e.word || e.en || '',
                        meaning: e.meaning || e.arabic || e.translation || e.ar || '',
                        details: e.note || e.example || '',
                        detailsLabel: e.note ? 'ملاحظة' : 'مثال'
                    })).join('')}
                </div>`;
            }

            container.innerHTML = html;
        }

        /**
         * 2. Affixes & Expressions
         */
        renderAffixes(data) {
            const container = document.getElementById('tab-affixes') || document.getElementById('affixes') || document.getElementById('notes-affixes');
            if (!container) return;

            const list = data.prefixes || data.suffixes || data.affixes || [];
            let html = '';
            if (list.length > 0) {
                html += `
                <h3 class="section-subtitle">🔤 البوادئ واللواحق (Prefixes &amp; Suffixes):</h3>
                <div class="cards-grid grid-cards">
                    ${list.map(a => {
                        const title = a.affix || a.word || a.type || '';
                        const desc = a.role || a.meaning || a.function || a.desc || '';
                        const example = a.examples || a.example || '';
                        const audioText = title.replace(/\([^)]*\)/g, '').trim() + (example ? ' ' + example.replace(/\([^)]*\)/g, '').trim() : '');
                        return this.renderCard({
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

            const hasCollocTab = document.getElementById('collocations') || document.getElementById('tab-collocations') || document.getElementById('prepositions');
            if (!hasCollocTab) {
                if (data.expressions && data.expressions.length > 0) {
                    html += `
                    <h3 class="section-subtitle" style="margin-top: 30px;">💬 التعبيرات الهامة (Important Expressions):</h3>
                    <div class="cards-grid grid-cards">
                        ${data.expressions.map(exp => this.renderCard({
                            title: exp.en || exp.phrase || exp.word,
                            meaning: exp.ar || exp.meaning || exp.translation || exp.arabic,
                            audioText: exp.en || exp.phrase || exp.word
                        })).join('')}
                    </div>`;
                }

                if (data.prepositions && data.prepositions.length > 0) {
                    html += `
                    <h3 class="section-subtitle" style="margin-top: 30px;">📍 حروف الجر الهامة (Prepositions):</h3>
                    <div class="cards-grid grid-cards">
                        ${data.prepositions.map(p => this.renderCard({
                            title: p.en || p.phrase || p.verb || p.word,
                            meaning: p.ar || p.meaning || p.translation || p.arabic,
                            audioText: p.en || p.phrase || p.verb || p.word
                        })).join('')}
                    </div>`;
                }
            }

            container.innerHTML = html;
        }

        /**
         * 3. Definitions, Synonyms, and Antonyms
         */
        renderDefinitions(data) {
            const defContainer = document.getElementById('definitions') || document.getElementById('tab-definitions');
            const synContainer = document.getElementById('synonyms') || document.getElementById('tab-synonyms') || document.getElementById('synonyms-antonyms');
            const combinedContainer = document.getElementById('definitions-container') || document.getElementById('definitions-syn-ant') || (!defContainer && !synContainer ? document.getElementById('collocations') : null);

            let defHtml = '';

            // Definitions
            if (data.definitions && data.definitions.length > 0) {
                defHtml += `
                <h3 class="section-subtitle">📚 التعريفات المنهجية المعتمدة (Definitions) - ${data.definitions.length} تعريفاً</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.definitions.map(d => {
                        const rawWord = d.word || d.term || '';
                        let word = rawWord;
                        let ar = d.meaning || d.translation || d.ar || d.arabic || d.meaningAr || d.defAr || d.arabicMeaning || '';

                        const parenMatch = rawWord.match(/^(.*?)\s*[\(\[]([\u0600-\u06FF\s\/\-\،\.\…]+)[\)\]]$/);
                        if (parenMatch) {
                            word = parenMatch[1].trim();
                            if (!ar) ar = parenMatch[2].trim();
                        }

                        const defText = d.definition || d.def || d.meaningEn || d.defEn || '';
                        return this.renderCard({
                            tag: 'Definition',
                            title: word,
                            audioText: word + '. ' + defText,
                            meaning: ar,
                            customBody: `
                                <div class="simple-explain-box" style="direction: ltr; text-align: left; margin-top: 8px; background: rgba(0,0,0,0.25); padding: 8px 12px; border-radius: 8px; border-left: 3px solid var(--accent-primary, #00f3ff);">
                                    <strong style="color: var(--accent-primary, #00f3ff);">${this.escapeHTML(word)}:</strong> ${this.escapeHTML(defText)}
                                </div>`
                        });
                    }).join('')}
                </div>`;
            }

            if (data.placesInEgypt && data.placesInEgypt.length > 0) {
                defHtml += `
                <h3 class="section-subtitle" style="margin-top: 30px; color: var(--accent-secondary, #38bdf8);">📍 أماكن ومحافظات مصر الحرفية (Places in Egypt):</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 30px;">
                    ${data.placesInEgypt.map(p => this.renderCard({
                        tag: p.governorate,
                        title: p.name,
                        audioText: p.name + '. ' + p.governorate,
                        meaning: p.arabic,
                        details: p.specialty,
                        detailsLabel: 'الميزة والمجال'
                    })).join('')}
                </div>`;
            }

            // Synonyms & Antonyms Normalization
            let synHtml = '';
            const hasSynData = (data.synonyms && data.synonyms.length > 0) || (data.antonyms && data.antonyms.length > 0);
            if (hasSynData) {
                const parseWordAndAr = (rawWord, explicitAr) => {
                    let w = String(rawWord || '').trim();
                    let a = String(explicitAr || '').trim();
                    const pm = w.match(/^(.*?)\s*[\(\[]([\u0600-\u06FF\s\/\-\،\.\…]+)[\)\]]$/);
                    if (pm) {
                        w = pm[1].trim();
                        if (!a) a = pm[2].trim();
                    }
                    return { word: w, ar: a };
                };

                const synMap = new Map();
                (data.synonyms || []).forEach(s => {
                    const parsed = parseWordAndAr(s.word, s.arabic || s.meaning || s.ar || s.translation);
                    const word = parsed.word;
                    const synText = Array.isArray(s.syns) ? s.syns.join(' • ') : (s.synonym || s.synonyms || s.syn || '-');
                    const antText = Array.isArray(s.ants) ? s.ants.join(' • ') : (s.antonym || s.antonyms || s.ant || '-');
                    const ar = parsed.ar;
                    synMap.set(word.toLowerCase(), { word, ar, synText, antText });
                });

                (data.antonyms || []).forEach(a => {
                    const parsed = parseWordAndAr(a.word, a.arabic || a.meaning || a.ar || a.translation);
                    const word = parsed.word;
                    const key = word.toLowerCase();
                    const antText = Array.isArray(a.ants) ? a.ants.join(' • ') : (a.antonym || a.antonyms || a.ant || '-');
                    const ar = parsed.ar;
                    if (synMap.has(key)) {
                        const entry = synMap.get(key);
                        if (entry.antText === '-' || !entry.antText) entry.antText = antText;
                        if (!entry.ar && ar) entry.ar = ar;
                    } else {
                        synMap.set(key, { word, ar, synText: '-', antText });
                    }
                });

                const headers = ['الكلمة (Word)', 'المعنى العربي', 'المرادف (Synonym)', 'المضاد (Antonym)'];
                const rows = Array.from(synMap.values()).map(item => [
                    this.escapeHTML(item.word),
                    this.escapeHTML(item.ar || '-'),
                    this.escapeHTML(item.synText),
                    this.escapeHTML(item.antText)
                ]);

                synHtml += `
                <h3 class="section-subtitle" style="color: var(--accent-green, #10b981); ${synContainer ? '' : 'margin-top: 30px;'}">🔄 المرادفات والمتضادات (Synonyms &amp; Antonyms) - ${rows.length} كلمة:</h3>
                <p class="section-hint" style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 16px;">
                    💡 جدول شامل للمترادفات اللغوية والتضاد لتعزيز حصيلتك المعجمية في الامتحانات:
                </p>
                ${this.renderTable({ headers, rows })}`;
            }

            if (synContainer && hasSynData) {
                synContainer.innerHTML = synHtml;
                if (defContainer) {
                    defContainer.innerHTML = defHtml;
                } else if (combinedContainer) {
                    combinedContainer.innerHTML = defHtml;
                }
            } else {
                const target = defContainer || combinedContainer;
                if (target) {
                    target.innerHTML = defHtml + synHtml;
                }
            }
        }

        renderSynonyms(data) {
            const synContainer = document.getElementById('synonyms') || document.getElementById('tab-synonyms') || document.getElementById('synonyms-antonyms');
            if (synContainer && (!synContainer.innerHTML || synContainer.innerHTML.trim() === '')) {
                this.renderDefinitions(data);
            }
        }

        /**
         * 4. Collocations, Expressions & Prepositions Tab
         */
        renderCollocations(data) {
            const container = document.getElementById('collocations') || document.getElementById('tab-collocations') || document.getElementById('prepositions') || document.getElementById('collocations-study');
            if (!container) return;

            let html = '';

            const getTitle = item => item.collocation || item.phrase || item.en || item.word || item.expression || item.verb || '';
            const getMeaning = item => item.meaningAr || item.arabic || item.ar || item.meaning || item.translation || '';
            const getDetails = item => item.meaningEn || item.example || item.note || '';

            // 1. Collocations
            if (data.collocations && data.collocations.length > 0) {
                html += `
                <h3 class="section-subtitle">🔗 المتلازمات اللفظية (Collocations) - ${data.collocations.length} تعبيرات:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.collocations.map(c => {
                        const title = getTitle(c);
                        const meaning = getMeaning(c);
                        const details = getDetails(c);
                        return this.renderCard({
                            tag: 'Collocation',
                            title: title,
                            meaning: meaning,
                            audioText: title,
                            details: details,
                            detailsLabel: c.meaningEn ? 'الشرح بالإنجليزي' : (c.example ? 'مثال' : 'ملاحظة')
                        });
                    }).join('')}
                </div>`;
            }

            // 2. Expressions
            const exprList = data.expressions || (data.expressionsAndPrepositions ? data.expressionsAndPrepositions.filter(x => !x.verb && !x.isPrep) : null);
            if (exprList && exprList.length > 0) {
                html += `
                <h3 class="section-subtitle" style="${html ? 'margin-top: 30px;' : ''} color: var(--accent-secondary, #38bdf8);">💬 تعبيرات لغوية هامة (Important Expressions) - ${exprList.length} تعبيرات:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${exprList.map(e => {
                        const title = getTitle(e);
                        const meaning = getMeaning(e);
                        const details = getDetails(e);
                        return this.renderCard({
                            tag: 'Expression',
                            title: title,
                            meaning: meaning,
                            audioText: title,
                            details: details,
                            detailsLabel: e.meaningEn ? 'الشرح بالإنجليزي' : (e.example ? 'مثال' : 'ملاحظة')
                        });
                    }).join('')}
                </div>`;
            }

            // 3. Prepositions
            const prepList = data.prepositions || (data.expressionsAndPrepositions ? data.expressionsAndPrepositions.filter(x => x.verb || x.isPrep) : null);
            if (prepList && prepList.length > 0) {
                html += `
                <h3 class="section-subtitle" style="${html ? 'margin-top: 30px;' : ''} color: var(--accent-primary, #00f3ff);">📍 حروف الجر الهامة (Prepositions) - ${prepList.length} حروف جر:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${prepList.map(p => {
                        const title = getTitle(p);
                        const meaning = getMeaning(p);
                        const details = getDetails(p);
                        return this.renderCard({
                            tag: 'Preposition',
                            title: title,
                            meaning: meaning,
                            audioText: title,
                            details: details,
                            detailsLabel: p.meaningEn ? 'الشرح بالإنجليزي' : (p.example ? 'مثال' : 'ملاحظة')
                        });
                    }).join('')}
                </div>`;
            }

            // 4. Verb Prepositions
            if (data.verbPrepositions && data.verbPrepositions.length > 0) {
                html += `
                <h3 class="section-subtitle" style="${html ? 'margin-top: 30px;' : ''}">⚡ أفعال وحروف جر (Verbs &amp; Prepositions) - ${data.verbPrepositions.length}:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.verbPrepositions.map(vp => {
                        const title = getTitle(vp);
                        const meaning = getMeaning(vp);
                        const details = getDetails(vp);
                        return this.renderCard({
                            tag: 'Verb + Prep',
                            title: title,
                            meaning: meaning,
                            audioText: title,
                            details: details,
                            detailsLabel: 'مثال'
                        });
                    }).join('')}
                </div>`;
            }

            container.innerHTML = html;
        }

        /**
         * 5. Language Notes & Derivatives (Delegated to NotesRenderer)
         */
        renderLanguageNotes(data) {
            if (window.NotesRenderer && typeof window.NotesRenderer.renderLanguageNotes === 'function') {
                return window.NotesRenderer.renderLanguageNotes(data);
            }
        }

        /**
         * 6. Grammar & Slide Decks (Delegated to GrammarRenderer)
         */
        renderGrammar(data) {
            if (window.GrammarRenderer && typeof window.GrammarRenderer.renderGrammar === 'function') {
                return window.GrammarRenderer.renderGrammar(data);
            }
        }

        /**
         * 7. Pronunciation Lab (Delegated to PhonicsRenderer)
         */
        renderPronunciation(data) {
            if (window.PhonicsRenderer && typeof window.PhonicsRenderer.renderPronunciation === 'function') {
                return window.PhonicsRenderer.renderPronunciation(data);
            }
        }
    }

    const lexiconInstance = new LexiconRenderer();

    // Export both instance facade and constructor
    window.LexiconRendererClass = LexiconRenderer;
    window.LexiconRenderer = lexiconInstance;

})(typeof window !== 'undefined' ? window : this);
