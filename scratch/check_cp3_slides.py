with open('Prep_3/unit-1/connect-plus-lesson-3.data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
pos_slides = text.find('"grammarSlides"')
if pos_slides != -1:
    print("Found grammarSlides in connect-plus-lesson-3.data.js!")
    snippet = text[pos_slides:pos_slides+800]
    print(snippet)
else:
    print("Not found under key grammarSlides")
