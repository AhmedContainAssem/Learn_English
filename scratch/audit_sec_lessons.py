import os, glob

for sec in ['Sec_1', 'Sec_2', 'Sec_3']:
    print(f'=== {sec} ===')
    for html in sorted(glob.glob(f'{sec}/**/*.html', recursive=True)):
        if 'index.html' in html: continue
        data_file = html.replace('.html', '.data.js')
        has_data = os.path.exists(data_file)
        with open(html, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        uses_curriculum_renderer = 'curriculum-renderer.js' in content
        print(f'{html}: has_data={has_data}, uses_renderer={uses_curriculum_renderer}, lines={len(content.splitlines())}')
