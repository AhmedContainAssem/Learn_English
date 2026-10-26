import json

log_path = r'C:\Users\Al700t\.gemini\antigravity-ide\brain\8facbcd8-ebbd-4342-af33-3ff24bdabb59\.system_generated\logs\transcript_full.jsonl'
out_path = r'C:\Users\Al700t\OneDrive\Desktop\Learn_English\scratch\transcript_sec2_u3_steps.txt'

with open(log_path, 'r', encoding='utf-8') as f, open(out_path, 'w', encoding='utf-8') as out:
    for line in f:
        data = json.loads(line)
        idx = data.get('step_index', 0)
        if 9620 <= idx <= 9700:
            out.write(f"\n=================== STEP {idx} (source: {data.get('source')}, type: {data.get('type')}) ===================\n")
            if data.get('tool_calls'):
                out.write(f"TOOL CALLS: {json.dumps(data.get('tool_calls'), ensure_ascii=False, indent=2)}\n")
            if data.get('thinking'):
                out.write(f"THINKING:\n{data.get('thinking')}\n")
            if data.get('content') and data.get('type') != 'VIEW_FILE':
                out.write(f"CONTENT:\n{data.get('content')[:1000]}\n")

print("Done dumping steps to transcript_sec2_u3_steps.txt")
