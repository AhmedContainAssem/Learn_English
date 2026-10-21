/**
 * Vocab Renderer (vocab-renderer.js)
 * Single Responsibility: Vocabulary, Flashcards, Word Tokens, and Pop Quiz rendering.
 */

(function (window) {
    'use strict';

    const UI = window.CurriculumUIPrimitives || {
        escapeHTML: str => String(str || ''),
        escapeJS: str => String(str || '').replace(/'/g, "\\'")
    };

    const VocabRenderer = {
        renderCard: function (v) {
            const pos = v.pos || v.type || v.partOfSpeech || 'Vocab';
            const word = v.word || '';
            const meaning = (v.meaning || v.ar || v.arabic || '') + (v.past ? ` (${v.past})` : '');
            const audioText = v.audio || (v.past ? `${word} ${v.past}` : word);

            let customBody = '';
            if (v.explain) {
                customBody += `
                <div class="simple-explain-box" style="margin-top: 8px;">
                    <div class="box-title">💡 التوضيح ببساطة:</div>
                    ${UI.escapeHTML(v.explain)}
                </div>`;
            }
            if (v.example) {
                customBody += `
                <div class="practical-example-box" style="margin-top: 8px;">
                    <div class="box-title">💬 مثال عملي:</div>
                    <div class="en-example">${UI.escapeHTML(v.example)}</div>
                    ${v.exampleAr ? `<div style="color: var(--text-muted); font-size: 0.88rem; margin-top: 3px;">${UI.escapeHTML(v.exampleAr)}</div>` : ''}
                </div>`;
            }

            return UI.renderCard({
                tag: pos,
                title: word,
                audioText: audioText,
                meaning: meaning,
                customBody: customBody
            });
        },

        render: function (data) {
            const keyContainer = document.getElementById('key-vocab');
            const impContainer = document.getElementById('important-vocab');
            const combinedContainer = document.getElementById('vocab-container') || document.getElementById('vocab');

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

            // Learning Outcomes
            if (data.learningOutcomes && data.learningOutcomes.length > 0) {
                html += `
                <div class="learning-outcomes-box" style="background: rgba(19, 27, 46, 0.85); border: 1px solid var(--accent-primary); border-radius: 16px; padding: 22px; margin-bottom: 30px; box-shadow: 0 4px 20px rgba(0, 243, 255, 0.1);">
                    <div style="font-size: 1.2rem; font-weight: 800; color: var(--accent-primary); margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
                        🎯 مخرجات التعلم الوزارية (${data.unit || 'Learning Outcomes'}):
                    </div>
                    <div class="cards-grid grid-cards" style="margin-top: 10px;">
                        ${data.learningOutcomes.map(item => `
                            <div class="card" style="padding: 14px; background: rgba(11, 15, 25, 0.6); border: 1px solid rgba(56, 189, 248, 0.3);">
                                <strong style="color: var(--accent-secondary);">${UI.escapeHTML(item.type)}:</strong> ${UI.escapeHTML(item.text)}
                            </div>
                        `).join('')}
                    </div>
                </div>`;
            }

            // Key Vocabulary
            if (data.keyVocabulary && data.keyVocabulary.length > 0) {
                html += `
                <div class="section-title">🌟 1. المفردات اللغوية الأساسية موضع الامتحان (Key Vocabulary) - ${data.keyVocabulary.length} كلمة</div>
                <p class="section-hint">المفردات الأساسية المعتمدة كما وردت في كتاب الطالب (${data.sbPages || ''}) مع النطق الصوتي التفاعلي والشرح الدقيق:</p>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.keyVocabulary.map(v => this.renderCard(v)).join('')}
                </div>`;
            }

            // Key Idioms
            if (data.keyIdioms && data.keyIdioms.length > 0) {
                html += `
                <div class="section-title" style="color: var(--accent-orange);">🔥 2. التعبيرات الاصطلاحية والأمثال (Key Idioms & Proverbs) - ${data.keyIdioms.length} مصطلحات</div>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.keyIdioms.map(idm => UI.renderCard({
                        tag: 'Idiom',
                        title: idm.word,
                        meaning: idm.meaning,
                        audioText: idm.word,
                        details: idm.example ? 'e.g. ' + idm.example : '',
                        extraClass: 'idiom-card'
                    })).join('')}
                </div>`;
            }

            // Interactive Pop Quiz Box
            if (data.popQuiz && data.popQuiz.questions && data.popQuiz.questions.length > 0) {
                const words = data.popQuiz.wordsBank || [];
                html += `
                <div class="pop-quiz-box">
                    <div class="pop-quiz-header">
                        <div class="pop-quiz-title">
                            <span>⏱️ Pop Quiz</span>
                            <span class="badge badge-active">تدريب تلقائي يهدف لإتقان المفردات اللغوية</span>
                        </div>
                        <button class="play-btn" style="padding: 6px 16px; font-size: 0.9rem;" onclick="checkPopQuizAnswers()">✅ تحقق من الإجابات</button>
                    </div>
                    <p style="margin-bottom: 12px; font-weight: 700;">• Complete the following sentences using the words in the box :</p>
                    <div class="words-bank">
                        ${words.map(w => `<span class="word-token" onclick="if(typeof speakText==='function') speakText('${UI.escapeJS(w)}');">${UI.escapeHTML(w)} 🔊</span>`).join('')}
                    </div>
                    <div class="pop-exercise-list">
                        ${data.popQuiz.questions.map((q, idx) => `
                        <div class="pop-exercise-item" id="pop-q${idx + 1}">
                            <span>${UI.escapeHTML(q.prefix)}</span>
                            <select id="pop-ans-${idx + 1}" data-correct="${UI.escapeHTML(q.correct)}">
                                <option value="">-- اختر الكلمة --</option>
                                ${words.map(w => `<option value="${UI.escapeHTML(w)}">${UI.escapeHTML(w)}</option>`).join('')}
                            </select>
                            <span>${UI.escapeHTML(q.suffix)}</span>
                            <button class="audio-btn" onclick="if(typeof speakText==='function') speakText('${UI.escapeJS(q.fullSentence || (q.prefix + ' ' + q.correct + ' ' + q.suffix))}');" title="استمع للجملة">🔊</button>
                            <span class="pop-feedback-status"></span>
                        </div>`).join('')}
                    </div>
                </div>`;

                if (typeof window.checkPopQuizAnswers !== 'function') {
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
                            if (val === correct) {
                                select.className = 'correct';
                                if (feedback) {
                                    feedback.textContent = '✅ إجابة صحيحة!';
                                    feedback.style.color = '#10b981';
                                }
                                score++;
                            } else if (val === '') {
                                select.className = '';
                                if (feedback) {
                                    feedback.textContent = '⚠️ الرجاء اختيار كلمة';
                                    feedback.style.color = '#f59e0b';
                                }
                            } else {
                                select.className = 'wrong';
                                if (feedback) {
                                    feedback.textContent = '❌ إجابة خاطئة (الصحيح: ' + correct + ')';
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
                }
            }

            // Split Lesson 5 / Lesson 6 Vocabulary
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

            // Accumulative / Lesson Vocabulary
            const accumList = data.lessonVocabulary || data.accumulativeVocabulary || data.importantVocabulary || [];
            if (accumList.length > 0) {
                html += `
                <div class="section-title">📝 مفردات الدرس التكميلية (Lesson Vocabulary) - ${accumList.length} كلمة</div>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${accumList.map(v => this.renderCard(v)).join('')}
                </div>`;
            }

            // Countries & Nationalities
            if (data.countries && data.countries.length > 0) {
                html += `
                <h3 class="section-subtitle" style="margin-top: 36px;">🌍 الدول والجنسيات (Countries & Nationalities) - ${data.countries.length} دول:</h3>
                <div class="cards-grid grid-cards" style="margin-bottom: 35px;">
                    ${data.countries.map(c => UI.renderCard({
                        tag: 'Country & Nationality',
                        title: `${c.country} ➔ ${c.nationality}`,
                        audioText: `${c.country}. ${c.nationality}.`,
                        meaning: `${c.arCountry} ➔ ${c.arNationality}`
                    })).join('')}
                </div>`;
            }

            combinedContainer.innerHTML = html;
        }
    };

    window.VocabRenderer = VocabRenderer;

})(typeof window !== 'undefined' ? window : this);
