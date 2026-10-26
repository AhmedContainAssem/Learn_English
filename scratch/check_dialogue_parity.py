import os
import re

for stage in ['Sec_1', 'Sec_2', 'Sec_3']:
    for root, dirs, files in os.walk(stage):
        for f in files:
            if f.endswith('.html') and f != 'index.html':
                html_path = os.path.join(root, f)
                data_path = html_path.replace('.html', '.data.js')
                if not os.path.exists(data_path):
                    continue
                with open(html_path, 'r', encoding='utf-8') as hf:
                    h_code = hf.read()
                with open(data_path, 'r', encoding='utf-8') as df:
                    d_code = df.read()
                
                has_dialogue_tab = 'switchTab(\'dialogue\'' in h_code or 'switchTab("dialogue"' in h_code or 'id="dialogue"' in h_code
                has_dialogue_data = 'dialogue:' in d_code or '"dialogue":' in d_code or 'speakingDialogue:' in d_code or '"speakingDialogue":' in d_code
                
                if has_dialogue_tab and not has_dialogue_data:
                    print(f"MISSING DIALOGUE DATA: {html_path}")
                elif not has_dialogue_tab and has_dialogue_data:
                    print(f"HAS DATA BUT NO TAB: {html_path}")
