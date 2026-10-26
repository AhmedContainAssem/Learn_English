import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open('Sec_3/unit-1/lesson-4-5.data.js', 'r', encoding='utf-8') as f:
    text = f.read()

keys = re.findall(r'^\s*\"([a-zA-Z0-9_]+)\"\s*:', text, re.MULTILINE)
print("Keys:", sorted(set(keys)))
