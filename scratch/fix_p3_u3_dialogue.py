import re
import json

with open('Prep_3/unit-3/lesson-1.html.bak', 'r', encoding='utf-8') as f:
    text = f.read()

pos_d_start = text.find('id="dialogue-speaking"')
pos_d_end = text.find('id="grammar"')

dialogue_turns = []
if pos_d_start != -1 and pos_d_end != -1:
    d_html = text[pos_d_start:pos_d_end]
    # split by dialogue-turn-box
    boxes = d_html.split('<div class="dialogue-turn-box">')[1:]
    for b in boxes:
        m_av = re.search(r'<div class="dialogue-avatar">([^<]+)</div>', b)
        m_sp = re.search(r'<strong[^>]*>([^<]+)</strong>', b)
        m_en = re.search(r'<div class="en-text"[^>]*>(.*?)</div>', b, re.DOTALL)
        m_ar = re.search(r'<div[^>]*dir="rtl"[^>]*>\s*\((.*?)\)\s*</div>', b, re.DOTALL)

        av = m_av.group(1).strip() if m_av else '🗣️'
        sp_full = m_sp.group(1).strip() if m_sp else 'Speaker'
        sp_en = sp_full.split('(')[0].strip()
        sp_ar = sp_full.split('(')[1].replace(')', '').strip() if '(' in sp_full else sp_full
        en = m_en.group(1).strip() if m_en else ''
        ar = m_ar.group(1).strip() if m_ar else ''

        dialogue_turns.append({
            "speaker": sp_en,
            "speakerAr": sp_ar,
            "avatar": av,
            "textEn": en,
            "textAr": ar
        })

print(f"Extracted {len(dialogue_turns)} turns!")

# Update Prep_3/unit-3/lesson-1.data.js
with open('Prep_3/unit-3/lesson-1.data.js', 'r', encoding='utf-8') as f:
    data_js = f.read()

dialogue_obj = {
    "title": "حوار لينا وأدهم حول الذكاء الاصطناعي والإبداع (SB page 44)",
    "turns": dialogue_turns
}

# Replace or insert dialogue
if '"dialogue":' in data_js:
    data_js = re.sub(r'"dialogue":\s*\{[^}]*\},', '"dialogue": ' + json.dumps(dialogue_obj, ensure_ascii=False, indent=8) + ',', data_js)
else:
    pos_end = data_js.rfind('};')
    extra_json = ',\n    "dialogue": ' + json.dumps(dialogue_obj, ensure_ascii=False, indent=8) + '\n'
    data_js = data_js[:pos_end] + extra_json + data_js[pos_end:]

with open('Prep_3/unit-3/lesson-1.data.js', 'w', encoding='utf-8') as f:
    f.write(data_js)

print("Saved dialogue to Prep_3/unit-3/lesson-1.data.js!")
