import json

log_path = r'C:\Users\Al700t\.gemini\antigravity-ide\brain\8facbcd8-ebbd-4342-af33-3ff24bdabb59\.system_generated\logs\transcript_full.jsonl'
with open(log_path, 'r', encoding='utf-8') as f, open('scratch/all_thinking_sec2_u3.txt', 'w', encoding='utf-8') as out:
    for line in f:
        data = json.loads(line)
        idx = data.get('step_index', 0)
        if 9580 <= idx <= 9675:
            th = data.get('thinking')
            if th:
                out.write(f"\n--- STEP {idx} THINKING ---\n{th}\n")

print("Done dumping thinking")
