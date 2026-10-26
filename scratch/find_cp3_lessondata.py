import sys
sys.stdout.reconfigure(encoding='utf-8')

with open('Prep_3/unit-1/connect-plus-lesson-3.data.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('window.lessonData = {')
if pos != -1:
    snippet = text[pos:pos+1500]
    print(snippet)
