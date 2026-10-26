import re, json

with open('Sec_2/unit-2/lesson-2-4.data.js', 'r', encoding='utf-8') as f:
    text = f.read()

keys = re.findall(r'^\s{4}"([a-zA-Z0-9_]+)"\s*:', text, re.MULTILINE)
print('Sec 2 u2 l24 keys:', keys)

match = re.search(r'"definitions"\s*:\s*\[(.*?)\](?=,\s*"[a-zA-Z0-9_]+"|\s*\}\;)', text, re.DOTALL)
if match:
    print('definitions length in chars:', len(match.group(1)))
    try:
        defs = json.loads('[' + match.group(1) + ']')
        print('Parsed definitions count:', len(defs))
        print('First item:', defs[0])
    except Exception as e:
        print('JSON error:', e)
        print('Snippet:', match.group(1)[:200])
else:
    print('definitions pattern not matched!')
