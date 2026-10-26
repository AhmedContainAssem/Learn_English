import re
import json

def extract_dialogue_from_html(html_path):
    with open(html_path, 'r', encoding='utf-8') as f:
        html = f.read()
    
    idx = html.find('id="dialogue"')
    if idx == -1:
        return None
    
    # End before quiz or next section
    end_idx = html.find('id="quiz"', idx)
    if end_idx == -1:
        end_idx = html.find('<!-- Tab 4:', idx)
    if end_idx == -1:
        end_idx = idx + 10000
    
    section = html[idx:end_idx]
    
    # Title
    t_m = re.search(r'class="section-title">([^<]+)<', section)
    title = t_m.group(1).strip() if t_m else "Interactive Dialogue"
    
    # Description
    d_m = re.search(r'class="section-hint"[^>]*>(.*?)<\/p>', section, re.DOTALL)
    desc = re.sub(r'<[^>]+>', '', d_m.group(1)).strip() if d_m else ""
    
    # Turns
    boxes = re.findall(r'<div class="dialogue-box"[^>]*>(.*?)<\/div>\s*(?:<button[^>]*>.*?<\/button>\s*)?<\/div>', section, re.DOTALL)
    turns = []
    for b in boxes:
        speaker_m = re.search(r'class="speaker-name"[^>]*>(.*?)<\/div>', b, re.DOTALL)
        en_m = re.search(r'class="en-text"[^>]*>(.*?)<\/div>', b, re.DOTALL)
        ar_m = re.search(r'class="arabic-text"[^>]*>(.*?)<\/div>', b, re.DOTALL)
        
        if speaker_m and en_m:
            speaker = re.sub(r'<[^>]+>', '', speaker_m.group(1)).strip().rstrip(':')
            en = re.sub(r'<[^>]+>', '', en_m.group(1)).strip()
            ar = re.sub(r'<[^>]+>', '', ar_m.group(1)).strip().strip('()') if ar_m else ""
            turns.append({
                "speaker": speaker,
                "en": en,
                "ar": ar
            })
    
    return {
        "title": title,
        "description": desc,
        "turns": turns
    }

for file_info in [
    ('Sec_1/unit-1/lesson-1.html.bak', 'Sec_1/unit-1/lesson-1.data.js'),
    ('Sec_1/unit-1/lesson-4-5.html.bak', 'Sec_1/unit-1/lesson-4-5.data.js'),
    ('Sec_2/unit-2/lesson-2-1.html.bak', 'Sec_2/unit-2/lesson-2-1.data.js')
]:
    diag = extract_dialogue_from_html(file_info[0])
    if diag and diag["turns"]:
        print(f"Extracted {len(diag['turns'])} turns for {file_info[1]}")
        with open('scratch/diag_' + file_info[1].replace('/', '_').replace('\\', '_') + '.json', 'w', encoding='utf-8') as out:
            json.dump(diag, out, ensure_ascii=False, indent=2)
    else:
        print(f"No turns found for {file_info[0]}")
