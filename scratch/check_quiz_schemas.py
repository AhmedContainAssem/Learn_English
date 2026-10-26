import os
import re

def check_questions_in_dir(target_dir):
    print(f"\n==========================================")
    print(f"CHECKING QUIZ DATA IN: {target_dir}")
    print(f"==========================================")
    
    for root, dirs, files in os.walk(target_dir):
        for f in files:
            if f.endswith('.data.js'):
                path = os.path.join(root, f)
                with open(path, 'r', encoding='utf-8') as fp:
                    content = fp.read()
                
                # Look for quiz questions
                q_match = re.search(r'["\']?(?:quiz|questions)["\']?\s*:\s*(\[.*?\])', content, re.DOTALL)
                if not q_match:
                    print(f"- {path}: NO QUIZ OR QUESTIONS KEY FOUND!")
                    continue
                
                # Check sample question keys
                sample_match = re.search(r'\{\s*["\']?(?:id|question)["\']?\s*:\s*.*?\}(?=\s*,\s*\{|\s*\])', q_match.group(1), re.DOTALL)
                if sample_match:
                    sample = sample_match.group(0)
                    keys = re.findall(r'["\']?([a-zA-Z0-9_]+)["\']?\s*:', sample)
                    print(f"- {path}: question keys = {set(keys)}")
                    
                    # Check how correct answer is identified
                    has_answer = 'answer' in keys
                    has_correct = 'correct' in keys
                    has_correctAnswer = 'correctAnswer' in keys
                    has_options = 'options' in keys
                    has_choices = 'choices' in keys
                    print(f"  options: {has_options}, choices: {has_choices}, answer: {has_answer}, correct: {has_correct}, correctAnswer: {has_correctAnswer}")
                    
                    # Print first 200 chars of sample
                    clean_sample = ' '.join(sample[:250].split())
                    print(f"  sample snippet: {clean_sample}")

check_questions_in_dir('Sec_3/unit-3')
check_questions_in_dir('Sec_2/unit-3')
check_questions_in_dir('Sec_2/unit-4')
check_questions_in_dir('Grade_6')
