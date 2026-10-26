import os

def check_bak(f_bak):
    if os.path.exists(f_bak):
        with open(f_bak, 'r', encoding='utf-8') as f:
            c = f.read()
        idx = c.find('id="dialogue"')
        if idx != -1:
            print(f"FOUND dialogue in {f_bak}: {c[idx:idx+400]}")
        else:
            print(f"No id='dialogue' in {f_bak}")
    else:
        print(f"File not found: {f_bak}")

check_bak('Sec_1/unit-1/lesson-4-5.html.bak')
check_bak('Sec_2/unit-2/lesson-2-1.html.bak')
