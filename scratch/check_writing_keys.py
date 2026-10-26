import re

files = [
    'Sec_1/unit-4/lesson-4-5.data.js',
    'Sec_1/unit-5/lesson-4-5.data.js',
    'Sec_1/unit-6/lesson-4-5.data.js'
]

for fpath in files:
    with open(fpath, 'r', encoding='utf-8') as f:
        text = f.read()
    keys = re.findall(r'^\s{2,4}"([a-zA-Z0-9_]+)"\s*:', text, re.MULTILINE)
    print(f"=== {fpath} ===")
    print("Keys:", list(dict.fromkeys(keys)))
