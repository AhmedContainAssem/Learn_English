import os
import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

for name in ['connect', 'connect_plus']:
    for p in range(10):
        img_path = f"scratch/tocs_prep3/{name}_p{p}.png"
        if not os.path.exists(img_path):
            continue
        cmd = ["powershell", "-ExecutionPolicy", "Bypass", "-File", "scratch/test_ocr.ps1", "-ImagePath", img_path]
        res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='ignore')
        txt = res.stdout
        if any(w in txt.lower() for w in ['unit', 'content', 'index', 'module']):
            print(f"=== {name} Page {p} ===")
            print(txt.strip()[:600])
            print("-" * 40)
