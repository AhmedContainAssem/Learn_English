import re

files_to_clean = [
    'Grade_6/unit-2/lesson-3.html',
    'Grade_6/unit-2/lesson-4-5.html',
    'Grade_6/unit-3/lesson-3.html',
    'Grade_6/unit-3/lesson-4-5.html'
]

clean_bootstrap = '''    <script>
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

for file_path in files_to_clean:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # If it's a lesson-4-5 file, ensure writing-renderer.js is included
    if 'lesson-4-5' in file_path and 'writing-renderer.js' not in content:
        content = content.replace(
            '<script src="../../assets/js/renderers/lexicon-renderer.js"></script>',
            '<script src="../../assets/js/renderers/lexicon-renderer.js"></script>\n    <script src="../../assets/js/renderers/writing-renderer.js"></script>'
        )

    # Replace the final script tag
    pattern = r'<script>\s*document\.addEventListener\(\'DOMContentLoaded\'.*?</body>\s*</html>'
    content = re.sub(pattern, clean_bootstrap.strip(), content, flags=re.DOTALL)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"{file_path}: {len(content.splitlines())} lines")
