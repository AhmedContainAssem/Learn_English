import json, re

with open('Sec_1/unit-5/lesson-4-5.data.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'"writingSkill"\s*:', text)
print("Direct writingSkill:", bool(m))

m2 = re.search(r'"writingSkills"\s*:', text)
print("Direct writingSkills:", bool(m2))

with open('Sec_1/unit-6/lesson-4-5.data.js', 'r', encoding='utf-8') as f:
    text6 = f.read()

m6 = re.search(r'"writingSkill"\s*:', text6)
print("Direct writingSkill in u6 l45:", bool(m6))
m6_2 = re.search(r'"writingSkills"\s*:', text6)
print("Direct writingSkills in u6 l45:", bool(m6_2))
