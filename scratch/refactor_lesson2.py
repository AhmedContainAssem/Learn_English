with open('Grade_6/unit-1/lesson-2.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace grammar-tab block
start_marker = '<!-- Tab 3: Interactive Grammar Slides -->'
end_marker = '<!-- Tab 4: Interactive 3D Storybook (Ras Mohamed) -->'

pos_start = content.find(start_marker)
pos_end = content.find(end_marker)

if pos_start == -1 or pos_end == -1:
    print('Error: markers not found')
    exit(1)

new_grammar_tab = '''<!-- Tab 3: Interactive Grammar Slides -->
        <div id="grammar-tab" class="tab-content"></div>

        '''

content = content[:pos_start] + new_grammar_tab + content[pos_end:]

# 2. Update audio button in storybook to pass this
content = content.replace('onclick="speakCurrentStoryPage()"', 'onclick="speakCurrentStoryPage(this)"')

# 3. Replace the script section at the bottom
script_marker = '<!-- Story & Slides Helpers -->'
pos_script = content.find(script_marker)
if pos_script == -1:
    print('Error: script_marker not found')
    exit(1)

new_scripts = '''<!-- Story Engine Helpers -->
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
            if (window.storyEngine && window.storyEngine.storyPages) {
                const cur = window.storyEngine.storyPages[window.storyEngine.currentPage];
                if (cur && cur.textEn && typeof speakText === 'function') {
                    speakText(cur.textEn, btn);
                }
            }
        }
    </script>

    <!-- Universal Framework Scripts -->
    <script src="../../assets/js/bidi.js"></script>
    <script src="../../assets/js/audio.js"></script>
    <script src="../../assets/js/tabs.js"></script>
    <script src="../../assets/js/quiz-engine.js"></script>
    <script src="../../assets/js/story-engine.js"></script>
    <script src="../../assets/js/slides-engine.js"></script>
    <script src="../../assets/js/ui.js?v=6"></script>

    <!-- Pure Decoupled Lesson Data Payload -->
    <script src="./lesson-2.data.js"></script>

    <!-- Submodules & Curriculum Renderer -->
    <script src="../../assets/js/renderers/ui-primitives.js"></script>
    <script src="../../assets/js/renderers/vocab-renderer.js"></script>
    <script src="../../assets/js/renderers/lexicon-renderer.js"></script>
    <script src="../../assets/js/curriculum-renderer.js"></script>
    <script src="../../assets/js/main.js"></script>

    <script>
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

content = content[:pos_script] + new_scripts

with open('Grade_6/unit-1/lesson-2.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Successfully refactored lesson-2.html! New line count: {len(content.splitlines())}")
