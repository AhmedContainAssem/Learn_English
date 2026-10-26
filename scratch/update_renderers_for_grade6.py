# Update WritingRenderer
with open('assets/js/renderers/writing-renderer.js', 'r', encoding='utf-8') as f:
    w_code = f.read()

# Add skimming / storyWritingSteps / wildlifeSnapshotProject in writingSkills
marker_ws = 'container.innerHTML = html;'
if 'ws.skimming' not in w_code:
    ws_extras = '''
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
'''
    pos = w_code.find(marker_ws)
    if pos != -1:
        w_code = w_code[:pos] + ws_extras + w_code[pos:]

# Add writingGuide support
if 'data.writingGuide' not in w_code:
    guide_code = '''
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
'''
    pos_end = w_code.rfind('};')
    if pos_end != -1:
        w_code = w_code[:pos_end] + guide_code + w_code[pos_end:]

with open('assets/js/renderers/writing-renderer.js', 'w', encoding='utf-8') as f:
    f.write(w_code)

print("Updated writing-renderer.js!")

# Update LexiconRenderer for sound comparisons and syllables
with open('assets/js/renderers/lexicon-renderer.js', 'r', encoding='utf-8') as f:
    l_code = f.read()

phonics_marker = "const p = data.pronunciation;"
phonics_extras = '''
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
'''

# Also support container id="phonics"
l_code = l_code.replace(
    "const container = document.getElementById('pronunciation') || document.getElementById('tab-pronunciation');",
    "const container = document.getElementById('pronunciation') || document.getElementById('tab-pronunciation') || document.getElementById('phonics') || document.getElementById('tab-phonics');"
)

pos_ph = l_code.find(phonics_marker)
if pos_ph != -1 and 'p.soundE' not in l_code:
    idx = l_code.find('`', pos_ph)
    idx_end = l_code.find('`;', idx) + 2
    l_code = l_code[:idx_end] + phonics_extras + l_code[idx_end:]

with open('assets/js/renderers/lexicon-renderer.js', 'w', encoding='utf-8') as f:
    f.write(l_code)

print("Updated lexicon-renderer.js!")
