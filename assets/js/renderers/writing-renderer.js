/**
 * Writing Skills Renderer (writing-renderer.js)
 * Single Responsibility: Hydrates and renders comprehensive writing skills,
 * essay guides, thesis building, transitions, and model samples for Thanawiya Amma.
 * Adheres strictly to Separation of Concerns and Clean Architecture.
 */

(function (window) {
    'use strict';

    const UI = window.CurriculumUIPrimitives || {
        escapeHTML: str => String(str || ''),
        escapeJS: str => String(str || '').replace(/'/g, "\\'")
    };

    const WritingRenderer = {
        render: function (data) {
            const container = document.getElementById('writing-skills') || 
                              document.getElementById('tab-writing') || 
                              document.getElementById('writing');
            if (!container || !data || !data.writingSkills) return;

            const ws = data.writingSkills;
            let html = `
                <div class="section-title">✍️ ${UI.escapeHTML(ws.arabicTitle || ws.title || 'دليل مهارات الكتابة')}</div>
            `;

            // 1. Overview / Definition Card
            if (ws.overview) {
                html += `
                <div class="card" style="border-right: 4px solid var(--accent-primary); margin-bottom: 25px; padding: 22px;">
                    <h3 style="color: var(--accent-primary); margin-bottom: 12px; font-size: 1.3rem;">
                        💡 ${UI.escapeHTML(ws.overview.title || 'ما هو المقال / الموضوع؟')}
                    </h3>
                    ${ws.overview.definition ? `
                        <p style="font-size: 1.1rem; line-height: 1.8; color: #f8fafc; margin-bottom: 14px;">
                            ${ws.overview.definition}
                        </p>
                    ` : ''}
                    ${ws.overview.keyFeatures && ws.overview.keyFeatures.length > 0 ? `
                        <div class="cards-grid grid-cards" style="margin-top: 14px;">
                            ${ws.overview.keyFeatures.map((f, i) => {
                                const colors = ['var(--accent-primary)', 'var(--accent-green)', 'var(--accent-orange)', 'var(--accent-secondary)'];
                                const c = colors[i % colors.length];
                                return `
                                    <div class="card" style="background: rgba(11, 15, 25, 0.7); border: 1px solid ${c};">
                                        <strong style="color: ${c}; font-size: 1.05rem;">${UI.escapeHTML(f.title)}</strong><br>
                                        <span style="font-size: 0.95rem; color: #cbd5e1; line-height: 1.6;">${f.desc}</span>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    ` : ''}
                </div>`;
            }

            // 2. Structural Breakdown (The Parts of the Essay)
            if (ws.structure && ws.structure.length > 0) {
                html += `
                <div class="section-title" style="margin-top: 30px;">🧱 هيكل ومنظومة البناء (Structural Blueprint)</div>
                <div class="cards-grid grid-cards" style="margin-bottom: 30px;">
                    ${ws.structure.map((part, idx) => `
                        <div class="card" style="border-top: 3px solid var(--accent-primary);">
                            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                                <span class="tag-badge">الجزء ${idx + 1}</span>
                                <div class="word-en" style="color: var(--accent-primary); font-weight: 700;">${UI.escapeHTML(part.name || part.part)}</div>
                            </div>
                            <div class="card-body" style="padding-top: 10px;">
                                ${part.purpose ? `<div style="margin-bottom: 10px; color: #e2e8f0; font-size: 0.95rem;"><strong>الغرض:</strong> ${part.purpose}</div>` : ''}
                                ${part.details ? `<p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6;">${part.details}</p>` : ''}
                                ${part.components && part.components.length > 0 ? `
                                    <div style="margin-top: 12px; display: flex; flex-direction: column; gap: 8px;">
                                        ${part.components.map(comp => `
                                            <div style="background: rgba(0,0,0,0.3); padding: 10px; border-radius: 8px; border-right: 3px solid var(--accent-secondary);">
                                                <strong style="color: var(--accent-secondary); font-size: 0.95rem;">${UI.escapeHTML(comp.name)}</strong>
                                                <div style="color: #cbd5e1; font-size: 0.88rem; margin-top: 4px;">${comp.desc || comp.purpose}</div>
                                                ${comp.examples && comp.examples.length > 0 ? `
                                                    <div dir="ltr" style="direction: ltr; text-align: left; margin-top: 6px; font-family: monospace; font-size: 0.85rem; color: #38bdf8;">
                                                        ${comp.examples.map(ex => `• "${UI.escapeHTML(ex)}"`).join('<br>')}
                                                    </div>
                                                ` : ''}
                                            </div>
                                        `).join('')}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>`;
            }

            // 3. Linking Words & Transitions Table / Cards
            if (ws.linkingWords && ws.linkingWords.length > 0) {
                html += `
                <div class="section-title" style="margin-top: 30px;">🔗 الروابط والانتقالات الجوهرية (Key Transitional Signals)</div>
                <div class="grid-cards" style="margin-bottom: 30px;">
                    ${ws.linkingWords.map(lw => `
                        <div class="card" style="border-right: 4px solid var(--accent-green);">
                            <div class="card-header">
                                <span class="tag-badge" style="background: rgba(0, 255, 157, 0.2); color: var(--accent-green);">${UI.escapeHTML(lw.category)}</span>
                                <span style="color: #94a3b8; font-size: 0.85rem;">${UI.escapeHTML(lw.functionAr || '')}</span>
                            </div>
                            <div class="card-body" style="margin-top: 10px;">
                                <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px;">
                                    ${(lw.words || []).map(w => `
                                        <span class="vocab-chip" style="font-size: 0.88rem; background: rgba(0, 243, 255, 0.1); border-color: rgba(0, 243, 255, 0.3);">${UI.escapeHTML(w)}</span>
                                    `).join('')}
                                </div>
                                ${lw.example ? `
                                    <div style="background: rgba(0,0,0,0.25); padding: 8px 12px; border-radius: 6px; margin-top: 8px; font-size: 0.88rem;">
                                        <div dir="ltr" style="direction: ltr; text-align: left; color: #38bdf8; font-family: monospace;">"${UI.escapeHTML(lw.example)}"</div>
                                        ${lw.exampleAr ? `<div style="color: #94a3b8; margin-top: 4px;">${UI.escapeHTML(lw.exampleAr)}</div>` : ''}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>`;
            }

            // 4. Model Sample Essay / Text
            if (ws.sampleEssay) {
                const s = ws.sampleEssay;
                html += `
                <div class="section-title" style="margin-top: 30px;">📖 نموذج مقالي تطبيقي معتمد (Model Essay)</div>
                <div class="card" style="border: 1.5px solid rgba(0, 243, 255, 0.4); background: rgba(15, 23, 42, 0.8); margin-bottom: 30px; padding: 22px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; margin-bottom: 16px;">
                        <h4 style="color: var(--accent-primary); font-size: 1.25rem; margin: 0;">${UI.escapeHTML(s.title)}</h4>
                        <span class="badge badge-gold">نموذج كتاب الوزارة والمعاصر</span>
                    </div>
                    ${s.paragraphs ? `
                        <div style="display: flex; flex-direction: column; gap: 16px;">
                            ${s.paragraphs.map(p => `
                                <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: 10px; border-right: 3px solid var(--accent-secondary);">
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                                        <strong style="color: var(--accent-secondary); font-size: 0.95rem;">${UI.escapeHTML(p.type || p.title)}</strong>
                                        ${p.note ? `<span style="color: var(--accent-orange); font-size: 0.82rem;">💡 ${UI.escapeHTML(p.note)}</span>` : ''}
                                    </div>
                                    <p dir="ltr" style="direction: ltr; text-align: left; font-size: 1rem; line-height: 1.8; color: #f1f5f9; margin-bottom: 8px;">
                                        ${p.textEn}
                                    </p>
                                    ${p.textAr ? `
                                        <div style="color: #94a3b8; font-size: 0.92rem; line-height: 1.6; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 8px;">
                                            ${p.textAr}
                                        </div>
                                    ` : ''}
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>`;
            }

            // 5. Exam Pitfalls & Multiple Choice Secrets
            if (ws.examTips && ws.examTips.length > 0) {
                html += `
                <div class="section-title" style="margin-top: 30px;">⚠️ أسرار أسئلة مهارات الكتابة في الامتحان (Exam Tips & Traps)</div>
                <div class="cards-grid grid-cards" style="margin-bottom: 30px;">
                    ${ws.examTips.map((tip, i) => `
                        <div class="card" style="border-right: 4px solid var(--accent-orange); background: rgba(255, 183, 3, 0.05);">
                            <strong style="color: var(--accent-orange); font-size: 1.05rem;">💡 نقطة امتحانية (${i + 1}): ${UI.escapeHTML(tip.title || tip.trap || 'قاعدة هامة')}</strong>
                            <p style="color: #f1f5f9; font-size: 0.95rem; line-height: 1.7; margin-top: 8px;">${tip.rule || tip.tip || tip.desc}</p>
                            ${tip.example ? `
                                <div dir="ltr" style="direction: ltr; text-align: left; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px; margin-top: 8px; color: #38bdf8; font-family: monospace; font-size: 0.88rem;">
                                    ${UI.escapeHTML(tip.example)}
                                </div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>`;
            }

            container.innerHTML = html;
        }
    };

    window.WritingRenderer = WritingRenderer;

})(typeof window !== 'undefined' ? window : this);
