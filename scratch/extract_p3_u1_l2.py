import re

with open('Prep_3/unit-1/lesson-2.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Let's inspect what classes are used for slides
classes = set(re.findall(r'class="([^"]*slide[^"]*)"', html, re.IGNORECASE))
print("Slide classes found:", classes)

# Also let's find the IDs of slides
ids = set(re.findall(r'id="([^"]*slide[^"]*)"', html, re.IGNORECASE))
print("Slide IDs found:", ids)
