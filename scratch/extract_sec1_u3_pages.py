import fitz
import os

pdf_path = r"G:\ME\المعاصر_انجليزي_1ث_الترم_الاول_2027_المتميزون.pdf"
out_dir = r"scratch\sec1_u3_all"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total PDF pages: {len(doc)}")

# Unit 3 starts around page 133/134. Let's extract pages 134 to 175.
start_page = 134
end_page = min(175, len(doc))

zoom = 2.0  # high resolution
mat = fitz.Matrix(zoom, zoom)

for pno in range(start_page, end_page):
    page = doc[pno]
    pix = page.get_pixmap(matrix=mat)
    out_file = os.path.join(out_dir, f"pdf_{pno}.png")
    pix.save(out_file)
    print(f"Saved {out_file}")

print("Extraction completed!")
