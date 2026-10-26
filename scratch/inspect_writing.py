import json, re

def inspect_writing(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    print(f"=== {path} ===")
    for key in ['writingSkills', 'writingSkill', 'posterProject']:
        pattern = rf'"{key}"\s*:\s*(\{{.*?\}})(?:,\s*"[a-zA-Z0-9_]+"|\s*\}};\s*$)'
        m = re.search(rf'"{key}"\s*:\s*(\{{)', content)
        if m:
            print(f"Found key: {key}")

inspect_writing('Sec_1/unit-2/lesson-4-5.data.js')
inspect_writing('Sec_2/unit-3/lesson-3-4.data.js')
inspect_writing('Sec_3/unit-2/lesson-4-5.data.js')
