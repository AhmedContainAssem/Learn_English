with open('Prep_3/unit-1/lesson-3.data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
keys = re.findall(r'^    "?([a-zA-Z0-9_]+)"?\s*:', text, re.MULTILINE)
print('Keys in window.lessonData:', set(keys))
