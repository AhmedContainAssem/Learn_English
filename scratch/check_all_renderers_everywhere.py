import os

required_renderers = [
    'ui-primitives.js',
    'vocab-renderer.js',
    'lexicon-renderer.js',
    'writing-renderer.js',
    'dialogue-player.js',
    'curriculum-renderer.js'
]

for stage in ['Grade_6', 'Prep_1', 'Prep_2', 'Prep_3', 'Sec_1', 'Sec_2', 'Sec_3']:
    if not os.path.exists(stage):
        continue
    for root, dirs, files in os.walk(stage):
        for f in files:
            if f.endswith('.html') and f != 'index.html':
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8') as hf:
                    c = hf.read()
                
                # If it's a dynamic lesson using curriculum-renderer or data.js
                is_dynamic = '.data.js' in c or 'curriculum-renderer.js' in c
                if is_dynamic:
                    missing = [r for r in required_renderers if r not in c]
                    if missing:
                        print(f"FILE {path} is missing renderers: {missing}")
