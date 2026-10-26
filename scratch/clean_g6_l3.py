with open('Grade_6/unit-1/lesson-3.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace hardcoded pronunciation tab with clean container
p_start = '<!-- Tab 5: Pronunciation Lab (/er/ sound) -->'
q_start = '<!-- Tab 6: Interactive Practice Quiz -->'

pos_p = content.find(p_start)
pos_q = content.find(q_start)

if pos_p != -1 and pos_q != -1:
    clean_p = '''<!-- Tab 5: Pronunciation Lab (/er/ sound) -->
        <div id="pronunciation" class="tab-content"></div>

        '''
    content = content[:pos_p] + clean_p + content[pos_q:]

# Update speakCurrentStoryPage to pass btn
content = content.replace('onclick="speakCurrentStoryPage()"', 'onclick="speakCurrentStoryPage(this)"')

# Update script to pure clean bootstrap
script_start = '<script>\n        document.addEventListener(\'DOMContentLoaded\''
pos_s = content.find(script_start)

if pos_s != -1:
    clean_script = '''<script>
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
    content = content[:pos_s] + clean_script

with open('Grade_6/unit-1/lesson-3.html', 'w', encoding='utf-8') as f:
    f.write(content)

print(f"Refactored Grade 6 Unit 1 Lesson 3! New line count: {len(content.splitlines())}")
