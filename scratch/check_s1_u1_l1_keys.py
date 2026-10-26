with open('Sec_1/unit-1/lesson-1.data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
keys = set(re.findall(r'^    "?([a-zA-Z0-9_]+)"?\s*:', text, re.MULTILINE))
print('Keys in Sec 1 Unit 1 Lesson 1 data:', keys)
