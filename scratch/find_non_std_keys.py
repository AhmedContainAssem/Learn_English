import os, glob, re

for sec in ['Sec_1', 'Sec_2', 'Sec_3']:
    for fpath in sorted(glob.glob(f'{sec}/**/*.data.js', recursive=True)):
        with open(fpath, 'r', encoding='utf-8') as f:
            text = f.read()
        non_std_keys = []
        for k in ['storyBook', 'speakingDialogue', 'derivativeRoots', 'clearConfusion', 'expressionsAndPrepositions', 'wordFamilies']:
            if f'"{k}"' in text:
                non_std_keys.append(k)
        if non_std_keys:
            print(f'{fpath}: has {non_std_keys}')
