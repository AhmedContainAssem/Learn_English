import json

with open('Prep_3/unit-1/lesson-5-6.data.js', 'r', encoding='utf-8') as f:
    text = f.read()

pos = text.find('"storyLines":')
if pos != -1:
    print(text[pos:pos+800])
