import os, glob

stages = ['Grade_6', 'Prep_1', 'Prep_2', 'Prep_3', 'Sec_1', 'Sec_2', 'Sec_3']
results = []

for stage in stages:
    if not os.path.exists(stage):
        continue
    for html_file in glob.glob(f'{stage}/**/*.html', recursive=True):
        if os.path.basename(html_file) == 'index.html':
            continue
        try:
            with open(html_file, 'r', encoding='utf-8') as f:
                content = f.read()
        except:
            continue
        lines = len(content.splitlines())
        has_studio_payload = 'studio-payload' in content
        has_data_script = '.data.js' in content
        data_file = html_file.replace('.html', '.data.js')
        data_exists = os.path.exists(data_file)
        results.append((stage, html_file, lines, has_studio_payload, has_data_script, data_exists))

print(f"Total lesson HTML files scanned: {len(results)}")
over_250 = [r for r in results if r[2] > 250]
print(f"Files over 250 lines: {len(over_250)}")

for stage in stages:
    stage_files = [r for r in results if r[0] == stage]
    stage_over = [r for r in stage_files if r[2] > 250]
    print(f"\n=== {stage} === Total: {len(stage_files)} | Over 250 lines: {len(stage_over)}")
    for r in sorted(stage_over, key=lambda x: -x[2]):
        print(f"   {r[1]:50} | Lines: {r[2]:5} | Payload: {r[3]} | DataRef: {r[4]} | DataExists: {r[5]}")
