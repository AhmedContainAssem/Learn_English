import json, re, glob

def check_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    # find top level keys:
    # Look for lines like "key": [ or "key": {
    keys = re.findall(r'^\s{4}"([a-zA-Z0-9_]+)"\s*:', content, re.MULTILINE)
    return set(keys)

print("Sec 1 u2 l45 keys:")
print(check_file('Sec_1/unit-2/lesson-4-5.data.js'))

print("Sec 2 u3 l34 keys:")
print(check_file('Sec_2/unit-3/lesson-3-4.data.js'))

print("Sec 3 u2 l45 keys:")
print(check_file('Sec_3/unit-2/lesson-4-5.data.js'))
