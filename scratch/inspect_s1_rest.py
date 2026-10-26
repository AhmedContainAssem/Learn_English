for path in ['Sec_1/unit-1/lesson-3.html', 'Sec_1/unit-1/lesson-4-5.html']:
    with open(path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    print(f"=== {path} ({len(lines)} lines) ===")
    for i, l in enumerate(lines):
        if '<div id=' in l or '<script' in l or 'class="tab-content' in l:
            print(f"Line {i+1}: {l.strip()[:80]}")
