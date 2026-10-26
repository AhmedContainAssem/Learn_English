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
        /**
         * 1. Conjugation of Verbs
         */
        renderVerbs: function (data) {
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

            function renderVerbCards(list, defaultTag) {
                return list.map(v => {
                    const word = v.word || v.v1 || v.present || '';
                    const past = v.past || v.v2 || '';
                    const pp = v.pp || v.p_p || v.v3 || '';
                    const forms = v.forms || (past && pp ? `${past} / ${pp}` : past);
                    const audio = v.audio || (forms ? `${word} ${forms}` : word);
                    const meaning = v.meaning || v.ar || v.arabic || v.translation || '';
                    const tag = v.type ? (v.type === 'irregular' ? 'Irregular' : 'Regular') : defaultTag;
                    return UI.renderCard({
                        tag: tag,
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
                <h3 class="section-subtitle" style="color: var(--accent-secondary); margin-top: 25px;">⚡ تصريف الأفعال غير المنتظمة (Irregular Verbs) - ${irregularVerbs.length} أفعال:</h3>
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

            // Only append expressions if there is no dedicated tab for collocations, prepositions, or affixes
            const hasCollocTab = document.getElementById('collocations') || document.getElementById('tab-collocations') || document.getElementById('prepositions');
            const hasAffixTab = document.getElementById('affixes') || document.getElementById('tab-affixes') || document.getElementById('notes-affixes');
            if (data.expressions && data.expressions.length > 0 && !hasCollocTab && !hasAffixTab) {
                html += `
                <h3 class="section-subtitle" style="color: var(--accent-secondary); margin-top: 30px; margin-bottom: 15px;">💬 تعبيرات وحروف جر هامة (Important Expressions):</h3>
                <div class="cards-grid grid-cards">
                    ${data.expressions.map(e => `
                        <div class="card" onclick="if(typeof playSound==='function') playSound('click')">
                            <div class="card-header">
                                <div class="word-en font-bold" style="font-size: 1.2rem;">${UI.escapeHTML(e.phrase || e.word || '')}</div>
                                <button type="button" class="audio-btn" onclick="event.stopPropagation(); if(typeof speakText==='function') speakText('${UI.escapeJS(e.phrase || e.word || '')}', this);" title="استمع للتعبير">🔊</button>
                            </div>
                            <div class="card-body">
                                <div><strong>المعنى:</strong> ${UI.escapeHTML(e.meaning || e.arabic || e.translation || '')}</div>
                                ${e.note ? `<div class="details-box" style="margin-top: 8px; font-size: 0.88rem;">📌 ${UI.escapeHTML(e.note)}</div>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>`;
            }

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
                <div class="cards-grid grid-cards">
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

            const hasCollocTab = document.getElementById('collocations') || document.getElementById('tab-collocations') || document.getElementById('prepositions');
            if (!hasCollocTab) {
                if (data.expressions && data.expressions.length > 0) {
                    html += `
                    <h3 class="section-subtitle" style="margin-top: 30px;">💬 التعبيرات الهامة (Important Expressions):</h3>
                    <div class="cards-grid grid-cards">
                        ${data.expressions.map(exp => UI.renderCard({
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
                        ${data.prepositions.map(p => UI.renderCard({
                            title: p.en || p.phrase || p.verb || p.word,
                            meaning: p.ar || p.meaning || p.translation || p.arabic,
                            audioText: p.en || p.phrase || p.verb || p.word
                        })).join('')}
                    </div>`;
                }
            }

            container.innerHTML = html;
        },

        /**
         * 3. Definitions, Synonyms, and Antonyms
         */
        renderDefinitions: function (data) {
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
                        const rawWord = d.word || '';
                        let word = rawWord;
                        let ar = d.meaning || d.translation || d.ar || d.arabic || d.meaningAr || d.defAr || d.arabicMeaning || '';
                        
                        // Extract Arabic in parentheses from word if ar is not yet resolved
                        const parenMatch = rawWord.match(/^(.*?)\s*[\(\[]([\u0600-\u06FF\s\/\-\،\.\…]+)[\)\]]$/);
                        if (parenMatch) {
                            word = parenMatch[1].trim();
                            if (!ar) ar = parenMatch[2].trim();
                        }

                        const defText = d.definition || d.def || d.meaningEn || d.defEn || '';
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

            if (data.placesInEgypt && data.placesInEgypt.length > 0) {
                defHtml += `
                <h3 class="section-subtitle" style="margin-top: 30px; color: var(--accent-secondary);">📍 أماكن ومحافظات مصر الحرفية (Places in Egypt):</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 30px;">
                    ${data.placesInEgypt.map(p => `
                        <div class="card" onclick="if(typeof playSound==='function') playSound('click')">
                            <div class="card-header">
                                <div>
                                    <span class="tag-badge">${UI.escapeHTML(p.governorate)}</span>
                                    <div class="word-en font-bold">${UI.escapeHTML(p.name)}</div>
                                </div>
                                <button type="button" class="audio-btn" onclick="event.stopPropagation(); if(typeof speakText==='function') speakText('${UI.escapeJS(p.name + '. ' + p.governorate)}', this);" title="استمع للنطق">🔊</button>
                            </div>
                            <div class="card-body">
                                <div><strong>المكان:</strong> ${UI.escapeHTML(p.arabic)}</div>
                                <div class="details-box" style="margin-top: 8px;"><strong>الميزة:</strong> ${UI.escapeHTML(p.specialty)}</div>
                            </div>
                        </div>
                    `).join('')}
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
                    UI.escapeHTML(item.word),
                    UI.escapeHTML(item.ar || '-'),
                    UI.escapeHTML(item.synText),
                    UI.escapeHTML(item.antText)
                ]);

                synHtml += `
                <h3 class="section-subtitle" style="color: var(--accent-green); ${synContainer ? '' : 'margin-top: 30px;'}">🔄 المرادفات والمتضادات (Synonyms &amp; Antonyms) - ${rows.length} كلمة:</h3>
                <p class="section-hint" style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 16px;">
                    💡 جدول شامل للمترادفات اللغوية والتضاد لتعزيز حصيلتك المعجمية في الامتحانات:
                </p>
                ${UI.renderTable({ headers, rows })}`;
            }

            // Target Assignment:
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
        },

        renderSynonyms: function (data) {
            const synContainer = document.getElementById('synonyms') || document.getElementById('tab-synonyms') || document.getElementById('synonyms-antonyms');
            if (synContainer && (!synContainer.innerHTML || synContainer.innerHTML.trim() === '')) {
                this.renderDefinitions(data);
            }
        },

        /**
         * 4. Collocations, Expressions & Prepositions Tab
         */
        renderCollocations: function (data) {
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
                        return UI.renderCard({
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
                <h3 class="section-subtitle" style="${html ? 'margin-top: 30px;' : ''} color: var(--accent-secondary);">💬 تعبيرات لغوية هامة (Important Expressions) - ${exprList.length} تعبيرات:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${exprList.map(e => {
                        const title = getTitle(e);
                        const meaning = getMeaning(e);
                        const details = getDetails(e);
                        return UI.renderCard({
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
                <h3 class="section-subtitle" style="${html ? 'margin-top: 30px;' : ''} color: var(--accent-primary);">📍 حروف الجر الهامة (Prepositions) - ${prepList.length} حروف جر:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${prepList.map(p => {
                        const title = getTitle(p);
                        const meaning = getMeaning(p);
                        const details = getDetails(p);
                        return UI.renderCard({
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
                <h3 class="section-subtitle" style="${html ? 'margin-top: 30px;' : ''}">⚡ أفعال وحروف جر (Verbs & Prepositions) - ${data.verbPrepositions.length}:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.verbPrepositions.map(vp => {
                        const title = getTitle(vp);
                        const meaning = getMeaning(vp);
                        const details = getDetails(vp);
                        return UI.renderCard({
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
                                <div class="note-title-en" style="font-size: 1.15rem; font-weight: 800; color: var(--accent-primary);">${UI.escapeHTML(d.rootEn || d.rootWord || d.root || d.title || d.word || '')}</div>
                                <div class="note-title-ar" style="font-weight: 700; color: #94a3b8;">${UI.escapeHTML(d.rootAr || d.rootWordAr || d.arabic || '')}</div>
                            </div>
                            <div class="cards-grid grid-cards">
                                ${(d.items || []).map(item => `
                                    <div class="card" style="padding: 12px; background: rgba(11, 15, 25, 0.6); border: 1px solid rgba(56, 189, 248, 0.2);">
                                        <div style="font-weight: 700; color: var(--accent-primary); display: flex; justify-content: space-between; align-items: center;">
                                            <span>${UI.escapeHTML(item.form || item.word || item.term || '')} ${item.pos ? `<span style="font-size: 0.8rem; color: #94a3b8;">(${item.pos})</span>` : ''}</span>
                                            <button type="button" class="audio-btn" onclick="if(typeof speakText==='function'){speakText('${UI.escapeJS((item.form || item.word || item.term || '') + '. ' + (item.example || ''))}');}if(typeof playSound==='function'){playSound('click');}" style="width: 28px; height: 28px; font-size: 0.8rem;" title="استمع للنطق">🔊</button>
                                        </div>
                                        ${item.arabic || item.meaning ? `<div style="font-size: 0.9rem; color: #94a3b8; margin-top: 4px;">${UI.escapeHTML(item.arabic || item.meaning)}</div>` : ''}
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
                            UI.escapeHTML(rootName || '-'),
                            UI.escapeHTML(verb || '-'),
                            UI.escapeHTML(noun || '-'),
                            UI.escapeHTML(adj || '-')
                        ];
                    });

                    html += `
                    <h3 class="section-subtitle">🧬 المشتقات (Derivatives):</h3>
                    ${UI.renderTable({ headers, rows })}`;
                }
            }

            // 2. Clear the Confusion (Structured or Flat)
            const confusionList = data.confusionNotes || data.clearConfusion;
            if (confusionList && confusionList.length > 0) {
                const isStructured = confusionList[0].items || confusionList[0].titleEn;

                if (isStructured) {
                    html += `
                    <h3 class="section-subtitle" style="margin-top: 35px; color: var(--accent-orange, #f59e0b);">⚡ 2. Clear the Confusion (لاحظ الفرق الدقيق):</h3>
                    ${confusionList.map(n => `
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
                        ${confusionList.map(n => UI.renderCard({
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
            const container = document.getElementById('grammar') || 
                              document.getElementById('tab-grammar') || 
                              document.getElementById('grammar-tab') || 
                              document.getElementById('grammar-video') || 
                              document.getElementById('tab-grammar-video');
            if (!container) return;

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
                                        <div class="video-lesson-title">🎥 ${UI.escapeHTML(lec.title || 'المحاضرة المرئية الكاملة')}</div>
                                        <div style="color: var(--text-muted); font-size: 0.88rem; margin-top: 4px;">✨ ${UI.escapeHTML(lec.subtitle || 'شرح شامل ومفصل مع مستر أحمد عاصم')}</div>
                                    </div>
                                    ${lec.url ? `<a href="${lec.url}" target="_blank" rel="noopener noreferrer" class="badge badge-active video-external-link">▶️ YouTube</a>` : ''}
                                </div>
                                <div class="video-responsive-wrapper">
                                    <iframe src="${embedUrl}" title="${UI.escapeHTML(lec.title || 'Lecture')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                </div>
                            </div>
                            ${lec.note ? `<div style="margin-top: 14px; padding: 10px 14px; background: rgba(0, 243, 255, 0.08); border: 1px solid rgba(0, 243, 255, 0.2); border-radius: 12px; font-size: 0.85rem; color: #cbd5e1;">💡 ${UI.escapeHTML(lec.note)}</div>` : ''}
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
                                        <div class="video-lesson-title">⚡ ${UI.escapeHTML(sh.title || 'لمحة سريعة في دقيقة')}</div>
                                        <div style="color: var(--text-muted); font-size: 0.88rem; margin-top: 4px;">🎯 كبسولة إنجليزية سريعة ومركزة</div>
                                    </div>
                                    ${sh.url ? `<a href="${sh.url}" target="_blank" rel="noopener noreferrer" class="badge badge-gold video-external-link">⚡ Short</a>` : ''}
                                </div>
                                <div class="video-shorts-wrapper">
                                    <iframe src="${embedShort}" title="${UI.escapeHTML(sh.title || 'Short')}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
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

            if (data.grammarSlides && Array.isArray(data.grammarSlides) && data.grammarSlides.length > 0) {
                const slides = data.grammarSlides;
                const total = slides.length;

                html += `
                    <div class="section-title">⚡ ${UI.escapeHTML(data.grammarTitle || 'شرح القواعد التفاعلية (Grammar Slides)')}</div>
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
            } else if (html) {
                container.innerHTML = html;
            }
        },

        /**
         * 7. Pronunciation Lab Renderer
         */
        renderPronunciation: function (data) {
            const container = document.getElementById('pronunciation') || document.getElementById('tab-pronunciation') || document.getElementById('phonics') || document.getElementById('tab-phonics');
            if (!container || !data.pronunciation) return;

            const p = data.pronunciation;
            let html = `
                <div class="section-title">🗣️ ${UI.escapeHTML(p.title || 'معمل الصوتيات التفاعلي (Pronunciation Lab)')}</div>
                ${p.hint ? `<p class="section-hint">${UI.escapeHTML(p.hint)}</p>` : ''}
            `;
            // Support for soundE vs soundI
            if (p.soundE && p.soundI) {
                html += `
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
                        <!-- Sound /e/ Section -->
                        <div class="phonics-card" style="border-top: 4px solid #f87171; background: rgba(11, 19, 43, 0.7); border-radius: 12px; padding: 16px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                <h3 style="color: #f87171; margin: 0; font-size: 1.2rem;">🔴 ${UI.escapeHTML(p.soundE.label)} (${UI.escapeHTML(p.soundE.symbol)})</h3>
                                <span class="phonics-badge-e badge badge-active">${p.soundE.words.length} كلمات</span>
                            </div>
                            <p style="color: #cbd5e1; font-size: 0.92rem; margin-bottom: 14px;">${UI.escapeHTML(p.soundE.arabicRule)}</p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
                                ${p.soundE.words.map(w => `
                                    <div class="card" onclick="if(typeof speakText==='function') speakText('${UI.escapeJS(w.word)}', this);" style="cursor: pointer; padding: 10px; text-align: center;">
                                        <div style="font-weight: 800; font-size: 1.15rem; color: #f87171;">${UI.escapeHTML(w.word)}</div>
                                        <div style="font-size: 0.85rem; color: #94a3b8;">${UI.escapeHTML(w.phonetic)}</div>
                                        <div style="font-size: 0.85rem; color: #e2e8f0; margin-top: 4px;">${UI.escapeHTML(w.arabic)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <!-- Sound /ɪ/ Section -->
                        <div class="phonics-card" style="border-top: 4px solid #38bdf8; background: rgba(11, 19, 43, 0.7); border-radius: 12px; padding: 16px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                <h3 style="color: #38bdf8; margin: 0; font-size: 1.2rem;">🔵 ${UI.escapeHTML(p.soundI.label)} (${UI.escapeHTML(p.soundI.symbol)})</h3>
                                <span class="phonics-badge-i badge badge-active">${p.soundI.words.length} كلمات</span>
                            </div>
                            <p style="color: #cbd5e1; font-size: 0.92rem; margin-bottom: 14px;">${UI.escapeHTML(p.soundI.arabicRule)}</p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
                                ${p.soundI.words.map(w => `
                                    <div class="card" onclick="if(typeof speakText==='function') speakText('${UI.escapeJS(w.word)}', this);" style="cursor: pointer; padding: 10px; text-align: center;">
                                        <div style="font-weight: 800; font-size: 1.15rem; color: #38bdf8;">${UI.escapeHTML(w.word)}</div>
                                        <div style="font-size: 0.85rem; color: #94a3b8;">${UI.escapeHTML(w.phonetic)}</div>
                                        <div style="font-size: 0.85rem; color: #e2e8f0; margin-top: 4px;">${UI.escapeHTML(w.arabic)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }

            // Support for Syllable Stress
            if (p.oneSyllable || p.twoSyllablesFirst) {
                const renderCard = (sec, borderCol) => {
                    if (!sec) return '';
                    let items = sec.words.map(w => `
                        <div class="phonics-word-item" style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.06);">
                            <div>
                                <strong style="font-size: 1.05rem; color: #fff;">${w.stressPart ? w.word.replace(w.stressPart, `<span style="color: ${borderCol}; font-weight: 900;">${w.stressPart}</span>`) : w.word}</strong>
                                <span style="color: #94a3b8; font-size: 0.85rem; margin-right: 8px;">${w.phonetic || ''}</span>
                                <div style="color: var(--accent-primary); font-size: 0.85rem;">${w.translation || ''}</div>
                            </div>
                            <button type="button" class="audio-btn" onclick="speakText('${UI.escapeJS(w.word.replace('-', ''))}')" title="استمع للنطق">🔊</button>
                        </div>
                    `).join('');
                    return `
                        <div class="phonics-card" style="border-top: 4px solid ${borderCol}; background: rgba(11, 19, 43, 0.7); border-radius: 12px; padding: 16px;">
                            <h4 style="color: ${borderCol}; margin-bottom: 8px; font-weight: 700;">${UI.escapeHTML(sec.title)}</h4>
                            <p style="color: #94a3b8; font-size: 0.88rem; margin-bottom: 14px;">${UI.escapeHTML(sec.note || '')}</p>
                            <div>${items}</div>
                        </div>
                    `;
                };

                html += `
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-top: 20px;">
                        ${renderCard(p.oneSyllable, '#38bdf8')}
                        ${renderCard(p.twoSyllablesFirst, '#4ade80')}
                        ${renderCard(p.twoSyllablesSecond, '#fbbf24')}
                        ${renderCard(p.threeSyllables, '#f472b6')}
                    </div>
                `;
            }


            if (p.outcomes) {
                html += `
                <div class="learning-outcomes-box" style="margin-bottom: 25px;">
                    <div style="font-weight: 800; font-size: 1.15rem; color: var(--accent-primary); margin-bottom: 8px;">
                        🎯 ${UI.escapeHTML(p.outcomes.title || 'كيف يظهر الصوت في الكلمات؟')}
                    </div>
                    <div style="color: #cbd5e1; line-height: 1.6;">
                        ${p.outcomes.patterns || ''}
                    </div>
                </div>`;
            }

            if (p.words && p.words.length > 0) {
                html += `
                <div class="cards-grid grid-cards" style="margin-bottom: 30px;">
                    ${p.words.map(w => `
                        <div class="card" onclick="if(typeof playSound==='function') playSound('click')">
                            <div class="card-header">
                                <div>
                                    <span class="tag-badge" style="background: rgba(0, 243, 255, 0.15); color: var(--accent-primary);">${UI.escapeHTML(w.phonetic || '')}</span>
                                    <div class="word-en font-bold" style="font-size: 1.25rem;">${UI.escapeHTML(w.word)}</div>
                                </div>
                                <button type="button" class="audio-btn" onclick="event.stopPropagation(); if(typeof speakText==='function') speakText('${UI.escapeJS(w.word)}', this);" title="نطق الكلمة">🔊</button>
                            </div>
                            <div class="card-body">
                                <div><strong>المعنى:</strong> ${UI.escapeHTML(w.arabic || w.meaning || '')}</div>
                                ${w.example ? `
                                    <div class="en-example" style="margin-top: 6px; font-size: 0.9rem; direction: ltr; text-align: left;">
                                        e.g. ${UI.escapeHTML(w.example)}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>`;
            }

            if (p.practiceSentences && p.practiceSentences.length > 0) {
                html += `
                <h3 class="section-subtitle" style="margin-top: 25px;">💬 جمل تطبيقية للتدرّب:</h3>
                <div class="cards-grid grid-cards">
                    ${p.practiceSentences.map(s => `
                        <div class="card" onclick="if(typeof playSound==='function') playSound('click')">
                            <div class="card-header">
                                <div class="en-text font-bold" style="direction: ltr; text-align: left; font-size: 1.05rem;">"${UI.escapeHTML(s.text)}"</div>
                                <button type="button" class="audio-btn" onclick="event.stopPropagation(); if(typeof speakText==='function') speakText('${UI.escapeJS(s.text)}', this);">🔊</button>
                            </div>
                            <div class="card-body" style="font-size: 0.88rem; color: var(--accent-primary);">
                                ✨ ${UI.escapeHTML(s.note || s.highlight || '')}
                            </div>
                        </div>
                    `).join('')}
                </div>`;
            }

            container.innerHTML = html;
        }
    };

    window.LexiconRenderer = LexiconRenderer;

})(typeof window !== 'undefined' ? window : this);
