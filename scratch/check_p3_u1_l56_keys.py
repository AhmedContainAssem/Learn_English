with open('Prep_3/unit-1/lesson-5-6.data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
keys = set(re.findall(r'^    "?([a-zA-Z0-9_]+)"?\s*:', text, re.MULTILINE))
print('Keys in Prep 3 Unit 1 Lesson 5-6 data:', keys)
