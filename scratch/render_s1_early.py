import fitz
import os

out_dir = r"scratch\tocs"
doc1 = fitz.open(r"G:\ME\المعاصر_انجليزي_1ث_الترم_الاول_2027_المتميزون.pdf")
for p in range(0, 5):
    pix = doc1[p].get_pixmap(dpi=150)
    pix.save(os.path.join(out_dir, f"s1_p{p}.png"))
print("Pages 0-4 saved!")
