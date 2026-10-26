import json

def inject_dialogue(data_path, json_path):
    with open(json_path, 'r', encoding='utf-8') as f:
        diag = json.load(f)
    
    with open(data_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    diag_str = "    \"dialogue\": " + json.dumps(diag, ensure_ascii=False, indent=4) + ",\n"
    
    # Insert right after "id": "..." or at start of lessonData object
    insert_marker = 'window.lessonData = {'
    if insert_marker in content:
        pos = content.find(insert_marker) + len(insert_marker)
        new_content = content[:pos] + "\n" + diag_str + content[pos:]
        with open(data_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Injected dialogue into {data_path}")
    else:
        print(f"Could not find insert marker in {data_path}")

inject_dialogue('Sec_1/unit-1/lesson-1.data.js', 'scratch/diag_Sec_1_unit-1_lesson-1.data.js.json')
inject_dialogue('Sec_1/unit-1/lesson-4-5.data.js', 'scratch/diag_Sec_1_unit-1_lesson-4-5.data.js.json')
inject_dialogue('Sec_2/unit-2/lesson-2-1.data.js', 'scratch/diag_Sec_2_unit-2_lesson-2-1.data.js.json')
