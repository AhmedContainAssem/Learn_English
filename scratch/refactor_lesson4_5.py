with open('Grade_6/unit-1/lesson-4-5.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace Quiz Tab with Golden QuizEngine Contract
old_quiz_start = '<!-- Tab 6: Comprehensive Quiz -->'
old_quiz_end = '<!-- Universal Framework Scripts -->'

pos_quiz_start = content.find(old_quiz_start)
pos_quiz_end = content.find(old_quiz_end)

if pos_quiz_start == -1 or pos_quiz_end == -1:
    print('Error: Quiz markers not found')
    exit(1)

new_quiz_html = '''<!-- Tab 6: QuizEngine Contract -->
        <div id="quiz" class="tab-content">
            <div class="score-board">
                <span>السؤال: <span id="current-q">1</span> / <span id="total-q">10</span></span>
                <span>النقاط: <span id="score">0</span> 🌟</span>
            </div>

            <div class="question-card">
                <span class="emoji-display" id="emoji">🎯</span>
                <div class="question-text" id="question">جاري تحميل السؤال...</div>
                <div class="options-grid" id="options"></div>
                <div class="feedback" id="feedback"></div>
            </div>

            <div class="center-row" style="margin-top: 20px;">
                <button type="button" class="action-btn next-btn" id="next-btn" onclick="nextQuestion()"
                    style="display: none;">السؤال التالي ➔</button>
            </div>
        </div>

        <!-- Bottom Return Controls -->
        <div class="nav-controls" style="margin-top: 36px;">
            <a href="./index.html" class="action-btn secondary" data-sound-click="click">⬅ العودة لقائمة دروس الوحدة الأولى</a>
            <a href="../index.html" class="action-btn secondary" data-sound-click="click">🏠 قائمة وحدات الصف السادس</a>
        </div>
    </div>

    '''

content = content[:pos_quiz_start] + new_quiz_html + content[pos_quiz_end:]

# 2. Replace the bottom script to remove the duplicate quiz engine
script_marker = '<!-- Story Engine & TTS Helpers -->'
pos_script = content.find(script_marker)

if pos_script == -1:
    print('Error: script_marker not found')
    exit(1)

new_script = '''<!-- Story Engine & TTS Helpers -->
    <script>
        function changeStoryPage(direction) {
            if (window.storyEngine && typeof window.storyEngine.changePage === 'function') {
                window.storyEngine.changePage(direction);
            }
        }

        function toggleStoryteller() {
            if (window.storyEngine && typeof window.storyEngine.toggleStoryteller === 'function') {
                window.storyEngine.toggleStoryteller();
            }
        }

        function speakCurrentStoryPage(btn) {
            if (window.storyEngine && typeof window.storyEngine.speakCurrentPage === 'function') {
                window.storyEngine.speakCurrentPage(btn);
            } else if (window.storyEngine && window.storyEngine.storyPages) {
                const cur = window.storyEngine.storyPages[window.storyEngine.currentPage];
                const textToSpeak = cur ? (cur.textEn || cur.text || '') : '';
                if (textToSpeak && typeof speakText === 'function') {
                    speakText(textToSpeak, btn);
                }
            }
        }

        function speakModelEmail() {
            if (typeof speakText === 'function' && window.lessonData && window.lessonData.writingSkill && window.lessonData.writingSkill.modelEmail) {
                speakText(window.lessonData.writingSkill.modelEmail.body);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {
                window.CurriculumRenderer.init();
            }

            // Render Expressions in Verbs Tab
            const expContainer = document.getElementById('expressions-container');
            if (expContainer && window.lessonData && window.lessonData.expressions) {
                expContainer.innerHTML = `
                    <h3 class="section-subtitle" style="color: var(--accent-secondary); margin-bottom: 15px;">💬 تعبيرات وحروف جر هامة (Important Expressions):</h3>
                    <div class="cards-grid grid-cards">
                        ${window.lessonData.expressions.map(e => `
                            <div class="card" onclick="if(typeof playSound==='function') playSound('click')">
                                <div class="card-header">
                                    <div class="word-en font-bold" style="font-size: 1.2rem;">${e.phrase}</div>
                                    <button type="button" class="audio-btn" onclick="event.stopPropagation(); if(typeof speakText==='function') speakText('${e.phrase}', this);" title="استمع للتعبير">🔊</button>
                                </div>
                                <div class="card-body">
                                    <div><strong>المعنى:</strong> ${e.meaning}</div>
                                    <div class="details-box" style="margin-top: 8px; font-size: 0.88rem;">📌 ${e.note}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            // Render Writing Features
            const wfGrid = document.getElementById('writing-features-grid');
            if (wfGrid && window.lessonData && window.lessonData.writingSkill) {
                wfGrid.innerHTML = window.lessonData.writingSkill.features.map(f => `
                    <div class="card" onclick="if(typeof playSound==='function') playSound('click')">
                        <div class="card-header">
                            <span class="tag-badge" style="background: rgba(0, 243, 255, 0.15); color: var(--accent-primary);">عنصر أساسي</span>
                            <div class="word-en font-bold" style="font-size: 1.15rem;">${f.name}</div>
                        </div>
                        <div class="card-body">
                            <p style="margin-bottom: 10px; line-height: 1.6;">${f.description}</p>
                            <div class="details-box" style="direction: ltr; text-align: left; font-size: 0.9rem;">
                                ${f.examples.map(ex => `<div>• ${ex}</div>`).join('')}
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            // Render Formal vs Informal Table
            const fiRows = document.getElementById('formal-informal-rows');
            if (fiRows && window.lessonData && window.lessonData.writingSkill) {
                fiRows.innerHTML = window.lessonData.writingSkill.formalVsInformal.map(item => `
                    <tr>
                        <td><strong>${item.meaning}</strong></td>
                        <td style="direction: ltr; text-align: left;"><span class="badge" style="background: rgba(255,255,255,0.08);">${item.formal}</span></td>
                        <td style="direction: ltr; text-align: left;"><span class="badge badge-gold font-bold">${item.informal}</span></td>
                        <td>
                            <button type="button" class="audio-btn" onclick="if(typeof speakText==='function') speakText('${item.informal}, formal: ${item.formal}', this);" title="استمع للكلمتين">🔊</button>
                        </td>
                    </tr>
                `).join('');
            }

            // Render Model Email Body
            const modelBodyEl = document.getElementById('model-email-body');
            if (modelBodyEl && window.lessonData && window.lessonData.writingSkill && window.lessonData.writingSkill.modelEmail) {
                modelBodyEl.textContent = window.lessonData.writingSkill.modelEmail.body;
            }

            // Render Beni Suef Poster Aspects
            const posterGrid = document.getElementById('poster-aspects-grid');
            if (posterGrid && window.lessonData && window.lessonData.posterProject) {
                posterGrid.innerHTML = window.lessonData.posterProject.aspects.map(a => `
                    <div class="card" onclick="if(typeof playSound==='function') playSound('click')">
                        <div class="card-header">
                            <div style="font-size: 1.8rem;">${a.icon}</div>
                            <div class="word-en font-bold" style="font-size: 1.15rem; color: var(--accent-secondary);">${a.title}</div>
                            <button type="button" class="audio-btn" onclick="event.stopPropagation(); if(typeof speakText==='function') speakText('${a.english}', this);" title="استمع للجملة">🔊</button>
                        </div>
                        <div class="card-body">
                            <div style="direction: ltr; text-align: left; font-size: 1.05rem; font-weight: 600; margin-bottom: 8px; color: var(--accent-primary);">
                                "${a.english}"
                            </div>
                            <div style="color: var(--text-secondary); font-size: 0.95rem;">
                                ${a.arabic}
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            // Init Storybook
            if (window.storyEngine && window.lessonData && window.lessonData.storyPages) {
                window.storyEngine.loadPages(window.lessonData.storyPages);
            }

            // Init Quiz via Universal Engine
            if (typeof loadQuestion === 'function' && document.getElementById('question')) {
                loadQuestion();
            }
        });
    </script>
</body>
</html>
'''

content = content[:pos_script] + new_script

with open('Grade_6/unit-1/lesson-4-5.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully refactored lesson-4-5.html! New line count: {len(content.splitlines())}")
