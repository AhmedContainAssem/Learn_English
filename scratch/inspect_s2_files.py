files = [
    'Sec_2/unit-1/lesson-1-3.html',
    'Sec_2/unit-1/lesson-1-4-5.html',
    'Sec_2/unit-1/lesson-1-part-1.html',
    'Sec_2/unit-1/lesson-1-part-2.html',
    'Sec_2/unit-2/lesson-2-1.html'
]

for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    print(f"=== {path} ({len(lines)} lines) ===")
    for i, l in enumerate(lines):
        if '<div id=' in l or '<script' in l or 'class="tab-content' in l:
            print(f"Line {i+1}: {l.strip()[:80]}")
