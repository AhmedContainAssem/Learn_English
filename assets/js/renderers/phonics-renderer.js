/**
 * Phonics & Pronunciation Lab Renderer (phonics-renderer.js)
 * Clean Architecture & Inheritance:
 * Extends BaseRenderer to handle phonics contrast cards, audio pronunciation grids,
 * phonetic symbols, and audio practice.
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

    class PhonicsRenderer extends ParentClass {
        constructor() {
            super('PhonicsRenderer');
        }

        render(data) {
            this.renderPronunciation(data);
        }

        renderPronunciation(data) {
            const container = document.getElementById('pronunciation') || 
                              document.getElementById('tab-pronunciation') || 
                              document.getElementById('phonics') || 
                              document.getElementById('tab-phonics');
            if (!container || !data.pronunciation) return;

            const p = data.pronunciation;
            let html = `
                <div class="section-title">🗣️ ${this.escapeHTML(p.title || 'معمل الصوتيات التفاعلي (Pronunciation Lab)')}</div>
                ${p.hint ? `<p class="section-hint">${this.escapeHTML(p.hint)}</p>` : ''}
            `;

            if (p.soundE && p.soundI) {
                html += `
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px;">
                        <div class="phonics-card" style="border-top: 4px solid #f87171; background: rgba(11, 19, 43, 0.7); border-radius: 12px; padding: 16px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                <h3 style="color: #f87171; margin: 0; font-size: 1.2rem;">🔴 ${this.escapeHTML(p.soundE.label)} (${this.escapeHTML(p.soundE.symbol)})</h3>
                                <span class="phonics-badge-e badge badge-active">${p.soundE.words.length} كلمات</span>
                            </div>
                            <p style="color: #cbd5e1; font-size: 0.92rem; margin-bottom: 14px;">${this.escapeHTML(p.soundE.arabicRule)}</p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
                                ${p.soundE.words.map(w => `
                                    <div class="card" onclick="if(typeof speakText==='function') speakText('${this.escapeJS(w.word)}', this);" style="cursor: pointer; padding: 10px; text-align: center;">
                                        <div style="font-weight: 800; font-size: 1.15rem; color: #f87171;">${this.escapeHTML(w.word)}</div>
                                        <div style="font-size: 0.85rem; color: #94a3b8;">${this.escapeHTML(w.phonetic)}</div>
                                        <div style="font-size: 0.85rem; color: #e2e8f0; margin-top: 4px;">${this.escapeHTML(w.arabic)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="phonics-card" style="border-top: 4px solid #38bdf8; background: rgba(11, 19, 43, 0.7); border-radius: 12px; padding: 16px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                <h3 style="color: #38bdf8; margin: 0; font-size: 1.2rem;">🔵 ${this.escapeHTML(p.soundI.label)} (${this.escapeHTML(p.soundI.symbol)})</h3>
                                <span class="phonics-badge-i badge badge-active">${p.soundI.words.length} كلمات</span>
                            </div>
                            <p style="color: #cbd5e1; font-size: 0.92rem; margin-bottom: 14px;">${this.escapeHTML(p.soundI.arabicRule)}</p>
                            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px;">
                                ${p.soundI.words.map(w => `
                                    <div class="card" onclick="if(typeof speakText==='function') speakText('${this.escapeJS(w.word)}', this);" style="cursor: pointer; padding: 10px; text-align: center;">
                                        <div style="font-weight: 800; font-size: 1.15rem; color: #38bdf8;">${this.escapeHTML(w.word)}</div>
                                        <div style="font-size: 0.85rem; color: #94a3b8;">${this.escapeHTML(w.phonetic)}</div>
                                        <div style="font-size: 0.85rem; color: #e2e8f0; margin-top: 4px;">${this.escapeHTML(w.arabic)}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                `;
            }

            if (p.categories && Array.isArray(p.categories)) {
                html += `
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 20px; margin-bottom: 30px;">
                        ${p.categories.map(cat => `
                            <div class="phonics-card" style="border-top: 4px solid ${cat.color || 'var(--accent-primary)'}; background: rgba(11, 19, 43, 0.7); border-radius: 12px; padding: 16px;">
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                                    <h3 style="color: ${cat.color || 'var(--accent-primary)'}; margin: 0; font-size: 1.2rem;">${cat.icon || '🔊'} ${this.escapeHTML(cat.label)} (${this.escapeHTML(cat.symbol)})</h3>
                                    <span class="badge badge-active">${(cat.words || []).length} كلمات</span>
                                </div>
                                <p style="color: #cbd5e1; font-size: 0.92rem; margin-bottom: 14px;">${this.escapeHTML(cat.arabicRule || cat.rule || '')}</p>
                                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px;">
                                    ${(cat.words || []).map(w => `
                                        <div class="card" onclick="if(typeof speakText==='function') speakText('${this.escapeJS(w.word)}', this);" style="cursor: pointer; padding: 10px; text-align: center;">
                                            <div style="font-weight: 800; font-size: 1.15rem; color: ${cat.color || 'var(--accent-primary)'};">${this.escapeHTML(w.word)}</div>
                                            <div style="font-size: 0.85rem; color: #94a3b8;">${this.escapeHTML(w.ending || w.phonetic || '')}</div>
                                            <div style="font-size: 0.85rem; color: #e2e8f0; margin-top: 4px;">${this.escapeHTML(w.arabic)}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            if (p.words && p.words.length > 0) {
                html += `
                <div class="cards-grid grid-cards" style="margin-bottom: 30px;">
                    ${p.words.map(w => this.renderCard({
                        tag: w.phonetic,
                        title: w.word,
                        audioText: w.word,
                        meaning: w.arabic || w.meaning || '',
                        details: w.example ? 'e.g. ' + w.example : ''
                    })).join('')}
                </div>`;
            }

            container.innerHTML = html;
        }
    }

    const phonicsInstance = new PhonicsRenderer();

    window.PhonicsRendererClass = PhonicsRenderer;
    window.PhonicsRenderer = phonicsInstance;

})(typeof window !== 'undefined' ? window : this);
