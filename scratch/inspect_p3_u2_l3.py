with open('Prep_3/unit-2/lesson-3.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if '<div id=' in l or '<section id=' in l or '<script' in l or 'class="tab-content' in l:
        print(f"Line {i+1}: {l.strip()[:80]}")
