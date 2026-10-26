with open('Sec_1/unit-1/lesson-1.html.bak', 'r', encoding='utf-8') as f:
    c = f.read()
idx = c.find('id="dialogue"')
end_idx = c.find('id="quiz"', idx)
if idx != -1 and end_idx != -1:
    with open('scratch/full_dialogue_lesson1.txt', 'w', encoding='utf-8') as out:
        out.write(c[idx:end_idx])
    print('Wrote full dialogue to scratch/full_dialogue_lesson1.txt')
else:
    print('Could not find boundaries')
