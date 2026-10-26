import fitz

def check_pdf(pdf_path, name):
    print(f"=== {name} ===")
    doc = fitz.open(pdf_path)
    print("Page count:", len(doc))
    toc = doc.get_toc()
    if toc:
        print("TOC entries (first 30):")
        for item in toc[:30]:
            print(" ", item)
    else:
        print("No internal TOC, searching first 15 pages for Table of Contents...")
        for i in range(min(15, len(doc))):
            text = doc[i].get_text()
            if "Unit 1" in text or "Unit 2" in text or "Contents" in text or "المحتويات" in text:
                print(f"--- Page {i+1} ---")
                for line in text.splitlines()[:25]:
                    print("  ", line)

check_pdf(r'G:\ME\المعاصر_انجليزي_1ث_الترم_الاول_2027_المتميزون.pdf', 'Sec 1 El-Moasser')
check_pdf(r'G:\ME\المعاصر_انجليزي_2ث_بكالوريا_الترم_الاول_2027.pdf', 'Sec 2 El-Moasser')
