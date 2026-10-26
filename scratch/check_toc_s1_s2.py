import fitz

doc_s1 = fitz.open(r"G:\ME\المعاصر_انجليزي_1ث_الترم_الاول_2027_المتميزون.pdf")
print("=== Sec 1 TOC Pages ===")
for p in range(4, 12):
    txt = doc_s1[p].get_text()
    if txt.strip():
        print(f"--- Page {p} ---")
        print(txt[:400])

doc_s2 = fitz.open(r"G:\ME\المعاصر_انجليزي_2ث_بكالوريا_الترم_الاول_2027.pdf")
print("\n=== Sec 2 TOC Pages ===")
for p in range(4, 12):
    txt = doc_s2[p].get_text()
    if txt.strip():
        print(f"--- Page {p} ---")
        print(txt[:400])
