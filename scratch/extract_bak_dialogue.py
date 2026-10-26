with open('Sec_1/unit-1/lesson-1.html.bak', 'r', encoding='utf-8') as f:
    c = f.read()
idx = c.find('id="dialogue"')
if idx != -1:
    with open('scratch/extracted_dialogue.txt', 'w', encoding='utf-8') as out:
        out.write(c[idx:idx+4000])
    print('Wrote dialogue snippet to scratch/extracted_dialogue.txt')
else:
    print('Not found')
