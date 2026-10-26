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
            if (!data) return;

            // 1. Secondary Writing Skills (Essay / Blog Post / Comprehensive)
            if (data.writingSkills) {
                const container = document.getElementById('writing') || 
                                  document.getElementById('writing-skills') || 
                                  document.getElementById('writing-skill') || 
                                  document.getElementById('tab-writing');
                if (container) {
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

                    
                    if (ws.skimming) {
                        html += `
                            <div style="background: rgba(0, 243, 255, 0.08); border: 1.5px solid rgba(0, 243, 255, 0.35); border-radius: 12px; padding: 18px; margin-top: 14px;">
                                <h3 style="color: #00f3ff; margin-top: 0; font-size: 1.15rem;">${UI.escapeHTML(ws.skimming.title)}</h3>
                                <p style="color: #e2e8f0; font-weight: 600; direction: ltr; text-align: left; margin: 8px 0;">"${UI.escapeHTML(ws.skimming.definition)}"</p>
                                <p style="color: #94a3b8; font-size: 0.92rem; margin-bottom: 0;">${UI.escapeHTML(ws.skimming.arabicDefinition)}</p>
                            </div>
                        `;
                    }
                    if (ws.storyWritingSteps && ws.storyWritingSteps.length > 0) {
                        html += `
                            <div style="margin-top: 25px;">
                                <h3 class="section-subtitle">📝 خطوات كتابة قصة متميزة:</h3>
                                <div style="display: grid; gap: 12px; margin-top: 14px;">
                                    ${ws.storyWritingSteps.map(s => `
                                        <div class="writing-step-card" style="display: flex; gap: 14px; background: rgba(11, 19, 43, 0.7); border: 1px solid rgba(0, 243, 255, 0.3); border-radius: 10px; padding: 14px;">
                                            <div class="writing-step-icon" style="font-size: 1.8rem;">${s.icon}</div>
                                            <div>
                                                <strong style="color: var(--accent-primary); font-size: 1.05rem; display: block; margin-bottom: 4px;">${UI.escapeHTML(s.step)}</strong>
                                                <div style="color: #cbd5e1; font-size: 0.92rem;">${UI.escapeHTML(s.rule)}</div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }
                    if (ws.wildlifeSnapshotProject) {
                        html += `
                            <div style="margin-top: 25px; background: rgba(16, 185, 129, 0.1); border: 1.5px solid rgba(16, 185, 129, 0.4); border-radius: 12px; padding: 18px;">
                                <h3 style="color: #34d399; margin-top: 0; font-size: 1.15rem;">${UI.escapeHTML(ws.wildlifeSnapshotProject.title)}</h3>
                                <div style="display: grid; gap: 8px; margin-top: 10px;">
                                    ${ws.wildlifeSnapshotProject.steps.map(step => `
                                        <div style="color: #e2e8f0; font-size: 0.95rem;">• ${UI.escapeHTML(step)}</div>
                                    `).join('')}
                                </div>
                            </div>
                        `;
                    }
container.innerHTML = html;
                }
            }

            // 2. Primary / Prep Writing Skill (Informal Email, Letter, Story, etc.)
            const singleWs = data.writingSkill;
            if (singleWs) {
                const wContainer = document.getElementById('writing') || 
                                  document.getElementById('writing-skill') || 
                                  document.getElementById('writing-skills') || 
                                  document.getElementById('tab-writing');
                if (wContainer) {
                    let wHtml = `
                        <div class="section-title">✍️ ${UI.escapeHTML(singleWs.title || 'مهارة الكتابة (Writing Skill)')}</div>
                        ${singleWs.definition ? `<div class="lesson-desc-display">${UI.escapeHTML(singleWs.definition)}</div>` : ''}
                    `;

                    const items = singleWs.features || singleWs.components;
                    if (items && items.length > 0) {
                        wHtml += `
                            <div class="cards-grid grid-cards" style="margin-top: 20px;">
                                ${items.map(f => `
                                    <div class="card" onclick="if(typeof playSound==='function') playSound('click')">
                                        <div class="card-header">
                                            <span class="tag-badge" style="background: rgba(0, 243, 255, 0.15); color: var(--accent-primary);">عنصر أساسي</span>
                                            <div class="word-en font-bold" style="font-size: 1.15rem;">${UI.escapeHTML(f.name || f.part)}</div>
                                        </div>
                                        <div class="card-body">
                                            <p style="margin-bottom: 10px; line-height: 1.6;">${UI.escapeHTML(f.description || f.function || '')}</p>
                                            ${f.functionAr ? `<p style="margin-bottom: 10px; color: #94a3b8; font-size: 0.9rem;">${UI.escapeHTML(f.functionAr)}</p>` : ''}
                                            ${f.example ? `
                                                <div class="details-box" style="direction: ltr; text-align: left; font-size: 0.9rem;">
                                                    <div>• ${UI.escapeHTML(f.example)}</div>
                                                </div>
                                            ` : ''}
                                            ${f.examples ? `
                                                <div class="details-box" style="direction: ltr; text-align: left; font-size: 0.9rem;">
                                                    ${f.examples.map(ex => `<div>• ${UI.escapeHTML(ex)}</div>`).join('')}
                                                </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    }

                    if (singleWs.formalVsInformal && singleWs.formalVsInformal.length > 0) {
                        wHtml += `
                            <h3 class="section-subtitle" style="margin-top: 35px; color: var(--accent-secondary);">⚖️ جدول مقارنة: التعبيرات الرسمية مقابل الودية (Formal vs Informal)</h3>
                            <div class="table-responsive" style="margin-top: 15px;">
                                <table class="curriculum-table">
                                    <thead>
                                        <tr>
                                            <th>المعنى بالعربية</th>
                                            <th>تعبير رسمي (Formal)</th>
                                            <th>تعبير ودي / غير رسمي (Informal)</th>
                                            <th>نطق واستماع</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${singleWs.formalVsInformal.map(item => `
                                            <tr>
                                                <td><strong>${UI.escapeHTML(item.meaning)}</strong></td>
                                                <td style="direction: ltr; text-align: left;"><span class="badge" style="background: rgba(255,255,255,0.08);">${UI.escapeHTML(item.formal)}</span></td>
                                                <td style="direction: ltr; text-align: left;"><span class="badge badge-gold font-bold">${UI.escapeHTML(item.informal)}</span></td>
                                                <td>
                                                    <button type="button" class="audio-btn" onclick="if(typeof speakText==='function') speakText('${UI.escapeJS(item.informal + ', formal: ' + item.formal)}', this);" title="استمع للكلمتين">🔊</button>
                                                </td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        `;
                    }

                    if (singleWs.modelEmail) {
                        const m = singleWs.modelEmail;
                        wHtml += `
                            <h3 class="section-subtitle" style="margin-top: 35px; color: var(--accent-primary);">📬 نموذج استرشادي: ${UI.escapeHTML(m.subject || 'Model Informal Email')}</h3>
                            <div class="card" style="margin-top: 15px; border-right: 4px solid var(--accent-primary); padding: 20px; direction: ltr; text-align: left;">
                                <div style="font-family: monospace; font-size: 0.95rem; margin-bottom: 12px; color: var(--accent-primary); border-bottom: 1px dashed rgba(255,255,255,0.2); padding-bottom: 8px;">
                                    ${m.to ? `<div><strong>To:</strong> ${UI.escapeHTML(m.to)}</div>` : ''}
                                    ${m.from ? `<div><strong>From:</strong> ${UI.escapeHTML(m.from)}</div>` : ''}
                                    ${m.subject ? `<div><strong>Subject:</strong> ${UI.escapeHTML(m.subject)}</div>` : ''}
                                </div>
                                <div style="font-size: 1.05rem; line-height: 1.8; color: var(--text-primary); white-space: pre-line;">${UI.escapeHTML(m.body)}</div>
                                <div style="margin-top: 15px; direction: rtl; text-align: right;">
                                    <button type="button" class="audio-btn" onclick="if(typeof speakText==='function') speakText('${UI.escapeJS(m.body)}', this);" title="استمع لنموذج الإيميل">🔊 استمع لقراءة الإيميل كاملاً</button>
                                </div>
                            </div>
                        `;
                    }

                    wContainer.innerHTML = wHtml;
                }
            }

            // 3. Poster Project / Think & Create
            if (data.posterProject) {
                const pContainer = document.getElementById('poster') || 
                                  document.getElementById('tab-poster') || 
                                  document.getElementById('project');
                if (pContainer) {
                    const pp = data.posterProject;
                    let pHtml = `
                        <div class="section-title">🎨 ${UI.escapeHTML(pp.title || 'فكر وأبدع (Think & Create)')}</div>
                        ${pp.description ? `<div class="lesson-desc-display">${UI.escapeHTML(pp.description)}</div>` : ''}
                    `;
                    if (pp.aspects && pp.aspects.length > 0) {
                        pHtml += `
                            <div class="cards-grid grid-cards" style="margin-top: 20px;">
                                ${pp.aspects.map(a => `
                                    <div class="card" onclick="if(typeof playSound==='function') playSound('click')">
                                        <div class="card-header">
                                            <div style="font-size: 1.8rem;">${a.icon || '📌'}</div>
                                            <div class="word-en font-bold" style="font-size: 1.15rem; color: var(--accent-secondary);">${UI.escapeHTML(a.title)}</div>
                                            <button type="button" class="audio-btn" onclick="event.stopPropagation(); if(typeof speakText==='function') speakText('${UI.escapeJS(a.english)}', this);" title="استمع للجملة">🔊</button>
                                        </div>
                                        <div class="card-body">
                                            <div style="direction: ltr; text-align: left; font-size: 1.05rem; font-weight: 600; margin-bottom: 8px; color: var(--accent-primary);">
                                                "${UI.escapeHTML(a.english)}"
                                            </div>
                                            <div style="color: var(--text-secondary); font-size: 0.95rem;">
                                                ${UI.escapeHTML(a.arabic)}
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        `;
                    }
                    pContainer.innerHTML = pHtml;
                }
            }

            // 4. Biography / General Writing Guide
            if (data.writingGuide) {
                const gData = data.writingGuide;
                const gContainer = document.getElementById('writing-content') || document.getElementById('writing') || document.getElementById('tab-writing');
                if (gContainer && gData.steps) {
                    let gHtml = `
                        <div style="background: rgba(56, 189, 248, 0.08); border: 1.5px solid rgba(56, 189, 248, 0.35); border-radius: 12px; padding: 18px; margin-bottom: 20px;">
                            <h3 style="color: #38bdf8; margin-top: 0; font-size: 1.15rem;">📌 ${UI.escapeHTML(gData.title)}</h3>
                            <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 0;">${UI.escapeHTML(gData.description)}</p>
                        </div>
                        <div style="display: grid; gap: 14px;">
                            ${gData.steps.map(s => `
                                <div class="writing-card" style="display: flex; gap: 14px; background: rgba(11, 19, 43, 0.7); border: 1px solid rgba(0, 243, 255, 0.3); border-radius: 10px; padding: 14px;">
                                    <div class="writing-icon-badge" style="font-size: 1.8rem;">${s.icon}</div>
                                    <div style="flex: 1;">
                                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                                            <strong style="color: #38bdf8; font-size: 1.05rem;">الخطوة ${s.number}: ${UI.escapeHTML(s.name)}</strong>
                                        </div>
                                        <p style="color: #e2e8f0; font-size: 0.92rem; margin: 0 0 6px 0;">${UI.escapeHTML(s.content)}</p>
                                        <div class="writing-example-box" style="direction: ltr; text-align: left; background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
                                            <strong style="color: #38bdf8;">Example: </strong>"${UI.escapeHTML(s.example)}"
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    `;
                    gContainer.innerHTML = gHtml;
                }
            }
        }
    };

    window.WritingRenderer = WritingRenderer;

})(typeof window !== 'undefined' ? window : this);
