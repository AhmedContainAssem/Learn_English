import os, glob

results = []
for sec in ['Sec_1', 'Sec_2', 'Sec_3']:
    for html in sorted(glob.glob(f'{sec}/**/*.html', recursive=True)):
        if 'index.html' in html: continue
        with open(html, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
        is_modern = 'class="tabs-container"' in content and 'switchTab(' in content
        has_nav_tab = 'class="nav-tab' in content or 'data-tab=' in content
        has_tab_btn = 'class="tab-btn' in content
        print(f'{html}: modern={is_modern}, has_tab_btn={has_tab_btn}, has_nav_tab={has_nav_tab}')
