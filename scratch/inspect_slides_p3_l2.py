with open('Prep_3/unit-1/lesson-2.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
slides = re.findall(r'<div class="grammar-slide-card[^"]*".*?id="grammar-slide-(\d+)".*?<h3[^>]*>(.*?)</h3>', text, re.DOTALL)
print(f"Found {len(slides)} slides in lesson-2.html:")
for num, title in slides:
    print(f"Slide {num}: {title.strip()}")
