import subprocess
import sys

sys.stdout.reconfigure(encoding='utf-8')

for p in range(110, 145):
    img = f"scratch/prep3_u3_scan/p{p}.png"
    cmd = ["powershell", "-ExecutionPolicy", "Bypass", "-File", "scratch/test_ocr.ps1", "-ImagePath", img]
    res = subprocess.run(cmd, capture_output=True, text=True, encoding='utf-8', errors='ignore')
    txt = res.stdout
    for line in txt.split('\n'):
        line_clean = line.strip().lower()
        if 'lesson' in line_clean or 'unit three' in line_clean:
            print(f"p{p}: {line.strip()}")
