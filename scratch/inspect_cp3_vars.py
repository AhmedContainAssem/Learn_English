with open('Prep_3/unit-1/connect-plus-lesson-3.data.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'window\.([a-zA-Z0-9_]+)\s*=', text)
print("Global variables in connect-plus-lesson-3.data.js:", matches)
