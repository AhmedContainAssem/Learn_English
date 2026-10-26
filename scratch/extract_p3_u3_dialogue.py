with open('Prep_3/unit-3/lesson-1.html.bak', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = list(re.finditer(r'<div class="dialogue-turn-box">', text))
print('Count of dialogue turns in backup:', len(matches))
if matches:
    pos = matches[0].start()
    print(text[pos:pos+1500])
