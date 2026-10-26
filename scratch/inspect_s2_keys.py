import re

files = [
    'Sec_2/unit-1/lesson-1-3.data.js',
    'Sec_2/unit-1/lesson-1-4-5.data.js',
    'Sec_2/unit-1/lesson-1-part-1.data.js',
    'Sec_2/unit-1/lesson-1-part-2.data.js',
    'Sec_2/unit-2/lesson-2-1.data.js'
]

for f in files:
    with open(f, 'r', encoding='utf-8') as fl:
        text = fl.read()
    keys = set(re.findall(r'^    "?([a-zA-Z0-9_]+)"?\s*:', text, re.MULTILINE))
    print(f"{f}: {keys}")
