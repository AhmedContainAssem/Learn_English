import os, glob, json, re

for sec in ['Sec_1', 'Sec_2', 'Sec_3']:
    for fpath in sorted(glob.glob(f'{sec}/**/*.data.js', recursive=True)):
        with open(fpath, 'r', encoding='utf-8') as f:
            content = f.read()
        m = re.search(r'"(?:derivatives|wordFamilies)"\s*:\s*\[(.*?)\](?=,\s*"[a-zA-Z0-9_]+"|\s*\};)', content, re.DOTALL)
        if m:
            snippet = m.group(1).strip()
            # find first object
            m_obj = re.search(r'\{(.*?)\}', snippet, re.DOTALL)
            if m_obj:
                obj_text = m_obj.group(1)
                keys = re.findall(r'"([a-zA-Z0-9_]+)"\s*:', obj_text)
                print(f'{fpath}: keys in first item: {keys[:6]}')
