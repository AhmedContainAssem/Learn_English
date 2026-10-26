with open('Grade_6/unit-1/lesson-4-5.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Tab 2, Tab 4, Tab 5 with clean semantic containers
# Tab 2:
content = content.replace('<div id="verbs" class="tab-content">\n            <div id="expressions-container" style="margin-top: 30px;"></div>\n        </div>', '<div id="verbs" class="tab-content"></div>')

# Tab 4 & 5:
writing_start = '<!-- Tab 4: Writing Skill (Informal Email) -->'
quiz_start = '<!-- Tab 6: QuizEngine Contract -->'

pos_w = content.find(writing_start)
pos_q = content.find(quiz_start)

if pos_w != -1 and pos_q != -1:
    clean_w_p = '''<!-- Tab 4: Writing Skill (Informal Email) -->
        <div id="writing" class="tab-content"></div>

        <!-- Tab 5: Think & Create (Beni Suef Poster) -->
        <div id="poster" class="tab-content"></div>

        '''
    content = content[:pos_w] + clean_w_p + content[pos_q:]

# Ensure writing-renderer.js is loaded in sub-renderers
if 'writing-renderer.js' not in content:
    content = content.replace(
        '<script src="../../assets/js/renderers/dialogue-player.js"></script>',
        '<script src="../../assets/js/renderers/dialogue-player.js"></script>\n    <script src="../../assets/js/renderers/writing-renderer.js"></script>'
    )

# Replace script at bottom with pure bootstrap
script_marker = '<!-- Story Engine & TTS Helpers -->'
pos_script = content.find(script_marker)

clean_bootstrap = '''<!-- Story Engine & TTS Helpers -->
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

        document.addEventListener('DOMContentLoaded', () => {
            if (window.CurriculumRenderer && typeof window.CurriculumRenderer.init === 'function') {
                window.CurriculumRenderer.init();
            }
            if (typeof loadQuestion === 'function' && document.getElementById('question')) {
                loadQuestion();
            }
            if (window.storyEngine && window.lessonData && window.lessonData.storyPages) {
                window.storyEngine.loadPages(window.lessonData.storyPages);
            }
        });
    </script>
</body>
</html>
'''

if pos_script != -1:
    content = content[:pos_script] + clean_bootstrap

with open('Grade_6/unit-1/lesson-4-5.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Refactored Grade 6 Unit 1 Lesson 4-5! New line count: {len(content.splitlines())}")
