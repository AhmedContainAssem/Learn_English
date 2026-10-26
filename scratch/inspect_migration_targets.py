import os, re, json

targets = [
    'Sec_1/unit-4/lesson-4-5.html',
    'Sec_1/unit-5/lesson-1.html',
    'Sec_1/unit-5/lesson-3.html',
    'Sec_1/unit-5/lesson-4-5.html',
    'Sec_1/unit-6/lesson-1.html',
    'Sec_1/unit-6/lesson-3.html',
    'Sec_1/unit-6/lesson-4-5.html'
]

for t in targets:
    data_path = t.replace('.html', '.data.js')
    if os.path.exists(data_path):
        with open(data_path, 'r', encoding='utf-8') as f:
            d_content = f.read()
        m_title = re.search(r'"title"\s*:\s*"(.*?)"', d_content)
        m_desc = re.search(r'"description"\s*:\s*"(.*?)"', d_content)
        has_writing = '"writingSkills"' in d_content or '"writingSkill"' in d_content
        print(f"=== {t} ===")
        print("Title:", m_title.group(1) if m_title else "N/A")
        print("Has writing:", has_writing)
