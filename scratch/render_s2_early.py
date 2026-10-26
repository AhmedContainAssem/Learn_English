import fitz
import os

out_dir = r"scratch\tocs"
doc2 = fitz.open(r"G:\ME\المعاصر_انجليزي_2ث_بكالوريا_الترم_الاول_2027.pdf")
for p in range(0, 5):
    pix = doc2[p].get_pixmap(dpi=150)
    pix.save(os.path.join(out_dir, f"s2_p{p}.png"))
print("Sec 2 Pages 0-4 saved!")
