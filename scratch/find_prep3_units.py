import sys
import fitz

sys.stdout.reconfigure(encoding='utf-8')

def find_units(pdf_path, name):
    doc = fitz.open(pdf_path)
    print(f"=== {name} (Total Pages: {len(doc)}) ===")
    
    # Search for UNIT headers in text of first 100 pages
    for page_num in range(min(120, len(doc))):
        text = doc[page_num].get_text()
        lines = [line.strip() for line in text.split('\n') if line.strip()]
        for line in lines:
            if any(k in line.lower() for k in ['unit 1', 'unit 2', 'unit 3', 'unit 4', 'unit 5', 'unit 6', 'contents']):
                if len(line) < 60:
                    print(f"  Page {page_num + 1}: {line}")

find_units('G:/ME/المعاصر_لغة_انجليزية_3_اعدادي_ترم_1_ذاكرولي.pdf', 'Connect (General)')
find_units('G:/ME/المعاصر الصف الثالث الاعدادي كونكت بلس.pdf', 'Connect Plus')
