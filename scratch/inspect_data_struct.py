import re

with open('Sec_2/unit-2/lesson-2-1.data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find top level keys of window.lessonData
print("Content length:", len(content))
lines = content.splitlines()
top_keys = []
for line in lines:
    m = re.match(r'^\s*"?([a-zA-Z0-9_]+)"?\s*:\s*(\[|\{)', line)
    if m:
        indent = len(line) - len(line.lstrip())
        if indent in (2, 4):
            top_keys.append((indent, m.group(1), m.group(2)))

for ind, k, t in top_keys[:30]:
    print(f"Indent {ind}: {k} -> {t}")
