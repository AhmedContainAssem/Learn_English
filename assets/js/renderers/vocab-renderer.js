/**
 * Vocab Renderer (vocab-renderer.js)
 * Clean Architecture & Inheritance:
 * Extends BaseRenderer to handle vocabulary lists, categories, flashcards, and Pop Quiz.
 * Adheres strictly to DRY, Single Responsibility, and Arabic Translation completeness.
 */

(function (window) {
    'use strict';

    const ParentClass = window.BaseRenderer || class {
        escapeHTML(s) { return String(s || ''); }
        escapeJS(s) { return String(s || '').replace(/'/g, "\\'"); }
        wrapBidi(s) { return String(s || ''); }
        renderAudioButton() { return ''; }
        renderCard(opts) { return window.CurriculumUIPrimitives ? window.CurriculumUIPrimitives.renderCard(opts) : ''; }
        renderSectionHeader(t, s, i) { return `<h3>${t}</h3>`; }
    };

    class VocabRenderer extends ParentClass {
        constructor() {
            super('VocabRenderer');
        }

        /**
         * Polymorphic Word Card Renderer
         * Normalizes both flat words {en, ar, pos, example, exampleAr}
         * and legacy {word, meaning, pos, past, explain}.
         */
        renderCard(v) {
            if (!v) return '';

            // If item is a category envelope, delegate to renderCategoryGroup
            if (v.category && Array.isArray(v.words)) {
                return this.renderCategoryGroup(v);
            }

            const word = v.word || v.en || v.term || '';
            const pos = v.pos || v.type || v.partOfSpeech || 'Vocab';
            const meaning = (v.meaning || v.ar || v.translation || v.arabic || v.meaningAr || '') + (v.past ? ` (${v.past})` : '');
            const audioText = v.audio || (v.past ? `${word} ${v.past}` : word);

            let customBody = '';
            const explain = v.explain || v.explanation || v.note;
            if (explain) {
                customBody += `
                <div class="simple-explain-box" style="margin-top: 8px; background: rgba(0, 243, 255, 0.05); border: 1px dashed rgba(0, 243, 255, 0.3); border-radius: 8px; padding: 8px 12px;">
                    <div class="box-title" style="font-weight: 700; color: var(--accent-primary, #00f3ff); font-size: 0.85rem; margin-bottom: 3px;">💡 التوضيح ببساطة:</div>
                    <div style="color: #cbd5e1; font-size: 0.92rem;">${this.wrapBidi(explain)}</div>
                </div>`;
            }

            // Normalizing example sentences
            let examples = [];
            if (v.example || v.enExample) {
                examples.push({
                    en: v.example || v.enExample,
                    ar: v.exampleAr || v.arExample || v.translationAr || ''
                });
            } else if (v.examples) {
                examples = this.normalizeExamples(v.examples);
            }

            return super.renderCard({
                tag: pos,
                tagType: 'vocab',
                title: word,
                audioText: audioText,
                meaning: meaning,
                examples: examples,
                customBody: customBody,
                extraClass: 'vocab-learning-card'
            });
        }

        /**
         * Render a categorized group of words with subheader and counter badge
         */
        renderCategoryGroup(cat) {
            const catName = cat.category || cat.title || 'مفردات الدرس';
            const words = cat.words || cat.items || [];
            if (!words || words.length === 0) return '';

            return `
            <div class="vocab-category-block" style="margin-bottom: 36px;">
                <div class="section-subtitle" style="font-size: 1.18rem; font-weight: 800; color: var(--accent-secondary, #38bdf8); margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid rgba(56, 189, 248, 0.25); padding-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span>📚</span>
                        <span>${this.escapeHTML(catName)}</span>
                    </div>
                    <span class="badge" style="font-size: 0.82rem; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); border-radius: 20px; padding: 3px 12px; font-weight: 700;">
                        ${words.length} كلمات
                    </span>
                </div>
                <div class="cards-grid grid-cards">
                    ${words.map(w => this.renderCard(w)).join('')}
                </div>
            </div>`;
        }

        /**
         * Interactive Pop Quiz Box Renderer
         * Flawlessly handles boxWords / wordsBank, splits {blank} in sentences,
         * provides sentence audio, instant feedback, and sound effects.
         */
        renderPopQuiz(quizData) {
            if (!quizData) return '';
            const rawQuestions = quizData.questions || [];
            if (rawQuestions.length === 0) return '';

            // Word bank: supports boxWords, wordsBank, words, or dynamically extracted from options
            let words = [...(quizData.boxWords || quizData.wordsBank || quizData.words || [])];

            // Question parsing & normalization
            const questions = rawQuestions.map((q, idx) => {
                let prefix = q.prefix || '';
                let suffix = q.suffix || '';
                
                // Safely determine correct answer text
                let correct = '';
                if (typeof q.answer === 'number' && Array.isArray(q.options) && q.options[q.answer] !== undefined) {
                    correct = String(q.options[q.answer]).trim();
                } else if (typeof q.correctAnswer === 'number' && Array.isArray(q.options) && q.options[q.correctAnswer] !== undefined) {
                    correct = String(q.options[q.correctAnswer]).trim();
                } else {
                    correct = String(q.answer !== undefined ? q.answer : (q.correct !== undefined ? q.correct : '')).trim();
                }

                const sentence = String(q.sentence || q.fullSentence || q.question || q.q || '').trim();
                const ar = String(q.ar || q.translation || q.meaning || q.hint || '').trim();

                // If question has options array, add options to words list if not already present
                if (Array.isArray(q.options)) {
                    q.options.forEach(opt => {
                        const optStr = String(opt).trim();
                        if (optStr && !words.some(w => w.toLowerCase() === optStr.toLowerCase())) {
                            words.push(optStr);
                        }
                    });
                }

                if (!prefix && !suffix && sentence) {
                    const blankRegex = /\{blank\}|______|\.\.\.\.\.\.|\[blank\]|\.{3,}/i;
                    if (blankRegex.test(sentence)) {
                        const parts = sentence.split(blankRegex);
                        prefix = parts[0];
                        suffix = parts.slice(1).join('');
                    } else if (correct && sentence.includes(correct)) {
                        const idxCor = sentence.indexOf(correct);
                        prefix = sentence.substring(0, idxCor);
                        suffix = sentence.substring(idxCor + correct.length);
                    } else {
                        prefix = sentence;
                    }
                }

                // If word bank is missing this correct answer, ensure it exists in options
                if (correct && !words.some(w => w.toLowerCase() === correct.toLowerCase())) {
                    words.push(correct);
                }

                const fullSentence = q.fullSentence || (sentence ? sentence.replace(/\{blank\}|______/gi, correct) : `${prefix} ${correct} ${suffix}`);

                return {
                    id: q.id || idx + 1,
                    prefix: prefix.trim(),
                    suffix: suffix.trim(),
                    correct: correct,
                    fullSentence: fullSentence.trim(),
                    ar: ar
                };
            });

            const html = `
            <div class="pop-quiz-box" style="background: rgba(19, 27, 46, 0.85); border: 1px solid var(--accent-primary, #00f3ff); border-radius: 16px; padding: 22px; margin-bottom: 35px; box-shadow: 0 4px 20px rgba(0, 243, 255, 0.08);">
                <div class="pop-quiz-header" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(0, 243, 255, 0.2); padding-bottom: 12px; margin-bottom: 16px;">
                    <div class="pop-quiz-title" style="display: flex; align-items: center; gap: 10px;">
                        <span style="font-size: 1.25rem; font-weight: 800; color: var(--accent-primary, #00f3ff);">⏱️ Pop Quiz:</span>
                        <span class="badge badge-active" style="background: rgba(16, 185, 129, 0.2); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.4); padding: 3px 10px; border-radius: 12px; font-size: 0.85rem; font-weight: 700;">
                            تدريب تلقائي يهدف لإتقان المفردات اللغوية
                        </span>
                    </div>
                    <button type="button" class="play-btn" style="padding: 8px 18px; font-size: 0.95rem; font-weight: 700; cursor: pointer;" onclick="checkPopQuizAnswers()">
                        ✅ تحقق من الإجابات
                    </button>
                </div>

                <div style="margin-bottom: 14px; font-weight: 700; color: #f8fafc; font-size: 1rem;">
                    • Complete the following sentences using the words in the box (أكمل الجمل التالية مستخدماً الكلمات من الصندوق):
                </div>

                <div class="words-bank" style="display: flex; flex-wrap: wrap; gap: 10px; padding: 14px; background: rgba(11, 15, 25, 0.6); border: 1px dashed var(--accent-secondary, #38bdf8); border-radius: 12px; margin-bottom: 22px;">
                    ${words.map(w => `
                        <span class="word-token" style="cursor: pointer; user-select: none; display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.35); border-radius: 8px; color: #38bdf8; font-weight: 700;" 
                            onclick="if(typeof speakText==='function') speakText('${this.escapeJS(w)}'); if(typeof playSound==='function') playSound('click');">
                            ${this.escapeHTML(w)} 🔊
                        </span>
                    `).join('')}
                </div>

                <div class="pop-exercise-list" style="display: flex; flex-direction: column; gap: 14px;">
                    ${questions.map((q, idx) => `
                    <div class="pop-exercise-item" id="pop-q${idx + 1}" style="background: rgba(11, 15, 25, 0.6); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 8px;">
                        <div style="display: flex; align-items: center; flex-wrap: wrap; gap: 8px; direction: ltr; text-align: left; font-size: 1.02rem; color: #f1f5f9; font-weight: 600;">
                            <span style="color: var(--accent-secondary, #38bdf8); font-weight: 800;">${idx + 1}.</span>
                            <span>${this.escapeHTML(q.prefix)}</span>
                            <select id="pop-ans-${idx + 1}" data-correct="${this.escapeHTML(q.correct)}" style="padding: 6px 12px; border-radius: 6px; font-weight: 700; background: #0f172a; color: #00f3ff; border: 1px solid #38bdf8; font-size: 0.95rem; cursor: pointer;">
                                <option value="">-- اختر الكلمة --</option>
                                ${words.map(w => `<option value="${this.escapeHTML(w)}">${this.escapeHTML(w)}</option>`).join('')}
                            </select>
                            <span>${this.escapeHTML(q.suffix)}</span>
                            ${this.renderAudioButton(q.fullSentence, { size: 'small', title: 'استمع للجملة كاملة' })}
                        </div>
                        ${q.ar ? `
                            <div class="pop-sentence-ar" style="font-size: 0.88rem; color: #94a3b8; direction: rtl; text-align: right; margin-top: 2px;">
                                💡 الترجمة: ${this.escapeHTML(q.ar)}
                            </div>
                        ` : ''}
                        <div class="pop-feedback-status" style="font-size: 0.9rem; font-weight: 700; min-height: 20px;"></div>
                    </div>`).join('')}
                </div>
            </div>`;

            // Global Pop Quiz Answer Checker
            window.checkPopQuizAnswers = function() {
                const items = document.querySelectorAll('.pop-exercise-item');
                let total = items.length;
                let score = 0;
                items.forEach((item) => {
                    const select = item.querySelector('select');
                    const feedback = item.querySelector('.pop-feedback-status');
                    if (!select) return;
                    const val = select.value.trim().toLowerCase();
                    const correct = (select.getAttribute('data-correct') || '').trim().toLowerCase();

                    if (val === correct && val !== '') {
                        select.style.borderColor = '#10b981';
                        select.style.color = '#10b981';
                        if (feedback) {
                            feedback.textContent = '✅ إجابة صحيحة ومتقنة!';
                            feedback.style.color = '#10b981';
                        }
                        score++;
                    } else if (val === '') {
                        select.style.borderColor = '#f59e0b';
                        select.style.color = '#f59e0b';
                        if (feedback) {
                            feedback.textContent = '⚠️ الرجاء اختيار كلمة للإجابة';
                            feedback.style.color = '#f59e0b';
                        }
                    } else {
                        select.style.borderColor = '#ef4444';
                        select.style.color = '#ef4444';
                        if (feedback) {
                            feedback.textContent = '❌ إجابة خاطئة (الصحيح هو: ' + correct + ')';
                            feedback.style.color = '#ef4444';
                        }
                    }
                });

                if (typeof window.playSound === 'function') {
                    if (score === total && total > 0) window.playSound('cheer');
                    else if (score > 0) window.playSound('correct');
                    else window.playSound('wrong');
                }
            };

            return html;
        }

        /**
         * Main render entrypoint coordinating all vocabulary tabs and sections
         */
        render(data) {
            const keyContainer = document.getElementById('key-vocab');
            const impContainer = document.getElementById('important-vocab');
            const combinedContainer = document.getElementById('vocab-container') || document.getElementById('vocab');

            // Handle split two-column legacy templates
            if (keyContainer || impContainer) {
                if (keyContainer && data.keyVocabulary && data.keyVocabulary.length > 0) {
                    keyContainer.innerHTML = `
                    <div class="section-notice">
                        <span style="font-size: 1.1rem; margin-inline-end: 8px;">📌</span>
                        <strong>المفردات اللغوية الأساسية موضع الامتحان [كما وردت في كتاب الطالب]</strong>
                    </div>
                    <div class="grid-cards">
                        ${data.keyVocabulary.map(v => this.renderCard(v)).join('')}
                    </div>`;
                }

                if (impContainer) {
                    const list = data.importantVocabulary || data.accumulativeVocabulary || [];
                    if (list.length > 0) {
                        impContainer.innerHTML = `
                        <h3 class="section-subtitle">📝 مفردات هامة (Important Vocabulary):</h3>
                        <div class="grid-cards">
                            ${list.map(v => this.renderCard(v)).join('')}
                        </div>`;
                    }
                }
                return;
            }

            if (!combinedContainer) return;

            let html = '';

            // 1. Learning Outcomes
            if (data.learningOutcomes && data.learningOutcomes.length > 0) {
                html += `
                <div class="learning-outcomes-box" style="background: rgba(19, 27, 46, 0.85); border: 1px solid var(--accent-primary, #00f3ff); border-radius: 16px; padding: 22px; margin-bottom: 30px; box-shadow: 0 4px 20px rgba(0, 243, 255, 0.1);">
                    <div style="font-size: 1.2rem; font-weight: 800; color: var(--accent-primary, #00f3ff); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                        🎯 مخرجات التعلم الوزارية (${data.unit || 'Learning Outcomes'}):
                    </div>
                    <div class="cards-grid grid-cards" style="margin-top: 10px;">
                        ${data.learningOutcomes.map(item => `
                            <div class="card" style="padding: 14px; background: rgba(11, 15, 25, 0.6); border: 1px solid rgba(56, 189, 248, 0.3);">
                                <strong style="color: var(--accent-secondary, #38bdf8);">${this.escapeHTML(item.type)}:</strong> ${this.escapeHTML(item.text)}
                            </div>
                        `).join('')}
                    </div>
                </div>`;
            }

            // 2. Key Vocabulary
            if (data.keyVocabulary && data.keyVocabulary.length > 0) {
                html += `
                <div class="section-title">🌟 1. المفردات اللغوية الأساسية موضع الامتحان (Key Vocabulary) - ${data.keyVocabulary.length} كلمة</div>
                <p class="section-hint">المفردات الأساسية المعتمدة كما وردت في كتاب الطالب (${data.sbPages || ''}) مع النطق الصوتي التفاعلي والشرح الدقيق:</p>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.keyVocabulary.map(v => this.renderCard(v)).join('')}
                </div>`;
            }

            // 3. Key Idioms & Expressions
            if (data.keyIdioms && data.keyIdioms.length > 0) {
                html += `
                <div class="section-title" style="color: var(--accent-orange, #f59e0b);">🔥 2. التعبيرات الاصطلاحية والأمثال (Key Idioms &amp; Proverbs) - ${data.keyIdioms.length} مصطلحات</div>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.keyIdioms.map(idm => super.renderCard({
                        tag: 'Idiom',
                        tagType: 'idiom',
                        title: idm.word,
                        meaning: idm.meaning,
                        audioText: idm.word,
                        details: idm.example ? 'e.g. ' + idm.example : '',
                        extraClass: 'idiom-card'
                    })).join('')}
                </div>`;
            }

            // 4. Split Lesson 5 / Lesson 6 Vocabulary
            if (data.lesson5Vocab && data.lesson5Vocab.length > 0) {
                html += `
                <h3 class="section-subtitle">📝 مفردات الدرس الخامس (Lesson 5) - ${data.lesson5Vocab.length} كلمة:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.lesson5Vocab.map(v => this.renderCard(v)).join('')}
                </div>`;
            }

            if (data.lesson6Vocab && data.lesson6Vocab.length > 0) {
                html += `
                <h3 class="section-subtitle">📝 مفردات الدرس السادس (Lesson 6) - ${data.lesson6Vocab.length} كلمة:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.lesson6Vocab.map(v => this.renderCard(v)).join('')}
                </div>`;
            }

            // 5. Categorized or Flat Lesson Vocabulary
            const accumList = data.lessonVocabulary || data.accumulativeVocabulary || data.importantVocabulary || [];
            if (accumList.length > 0) {
                const isCategorized = Boolean(accumList[0] && accumList[0].category && Array.isArray(accumList[0].words));
                if (isCategorized) {
                    html += `
                    <div class="section-title" style="margin-top: 35px; margin-bottom: 20px;">
                        📝 مفردات الدروس التكميلية والتفصيلية (Detailed Lesson Vocabulary):
                    </div>
                    ${accumList.map(cat => this.renderCategoryGroup(cat)).join('')}`;
                } else {
                    html += `
                    <div class="section-title" style="margin-top: 35px; margin-bottom: 20px;">
                        📝 مفردات الدرس التكميلية (Lesson Vocabulary) - ${accumList.length} كلمة
                    </div>
                    <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                        ${accumList.map(v => this.renderCard(v)).join('')}
                    </div>`;
                }
            }

            // 6. Countries & Nationalities
            if (data.countries && data.countries.length > 0) {
                html += `
                <h3 class="section-subtitle" style="margin-top: 36px;">🌍 الدول والجنسيات (Countries &amp; Nationalities) - ${data.countries.length} دول:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.countries.map(c => super.renderCard({
                        tag: 'Country & Nationality',
                        title: `${c.country} ➔ ${c.nationality}`,
                        audioText: `${c.country}. ${c.nationality}.`,
                        meaning: `${c.arCountry || ''} ➔ ${c.arNationality || ''}`
                    })).join('')}
                </div>`;
            }

            // 7. Interactive Pop Quiz Box (يأتي بعد مذاكرة المفردات لاختبار الحفظ والتطبيق)
            if (data.popQuiz) {
                html += this.renderPopQuiz(data.popQuiz);
            }

            combinedContainer.innerHTML = html;
        }
    }

    const vocabInstance = new VocabRenderer();

    // Export both instance facade and constructor
    window.VocabRendererClass = VocabRenderer;
    window.VocabRenderer = vocabInstance;

})(typeof window !== 'undefined' ? window : this);
