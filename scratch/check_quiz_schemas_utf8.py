import os
import re

out_lines = []

def check_questions_in_dir(target_dir):
    out_lines.append(f"\n==========================================")
    out_lines.append(f"CHECKING QUIZ DATA IN: {target_dir}")
    out_lines.append(f"==========================================")
    
    for root, dirs, files in os.walk(target_dir):
        for f in files:
            if f.endswith('.data.js'):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8') as fp:
                    content = fp.read()
                
                # Check for quiz or questions
                q_match = re.search(r'["\']?(?:quiz|questions)["\']?\s*:\s*(\[.*?\]\s*(?:,\s*["\']|\s*\}))', content, re.DOTALL)
                if not q_match:
                    out_lines.append(f"- {path}: NO QUIZ OR QUESTIONS KEY FOUND!")
                    continue
                
                # Check sample question keys
                sample_match = re.search(r'\{\s*["\']?(?:id|question)["\']?\s*:\s*.*?\}(?=\s*,\s*\{|\s*\])', q_match.group(1), re.DOTALL)
                if sample_match:
                    sample = sample_match.group(0)
                    keys = re.findall(r'["\']?([a-zA-Z0-9_]+)["\']?\s*:', sample)
                    has_answer = 'answer' in keys
                    has_correct = 'correct' in keys
                    has_correctAnswer = 'correctAnswer' in keys
                    has_options = 'options' in keys
                    has_choices = 'choices' in keys
                    out_lines.append(f"- {path}: keys = {set(keys)} | opts:{has_options}, choices:{has_choices}, ans:{has_answer}, correct:{has_correct}, correctAns:{has_correctAnswer}")
                else:
                    out_lines.append(f"- {path}: Could not match sample question!")

check_questions_in_dir('Sec_3/unit-3')
check_questions_in_dir('Sec_2/unit-3')
check_questions_in_dir('Sec_2/unit-4')
check_questions_in_dir('Grade_6')

with open('scratch/quiz_schemas_clean.txt', 'w', encoding='utf-8') as f:
    f.write('\n'.join(out_lines))
print("Done writing scratch/quiz_schemas_clean.txt")
