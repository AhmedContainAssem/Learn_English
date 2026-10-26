import fitz
import os

out_dir = r"scratch\tocs"
os.makedirs(out_dir, exist_ok=True)

# Sec 1
doc1 = fitz.open(r"G:\ME\المعاصر_انجليزي_1ث_الترم_الاول_2027_المتميزون.pdf")
for p in range(5, 10):
    pix = doc1[p].get_pixmap(dpi=150)
    pix.save(os.path.join(out_dir, f"s1_p{p}.png"))

# Sec 2
doc2 = fitz.open(r"G:\ME\المعاصر_انجليزي_2ث_بكالوريا_الترم_الاول_2027.pdf")
for p in range(5, 10):
    pix = doc2[p].get_pixmap(dpi=150)
    pix.save(os.path.join(out_dir, f"s2_p{p}.png"))

print("TOC pages saved!")
