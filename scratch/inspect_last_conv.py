import json
import sys

sys.stdout.reconfigure(encoding='utf-8')
log_path = r'C:\Users\Al700t\.gemini\antigravity-ide\brain\8facbcd8-ebbd-4342-af33-3ff24bdabb59\.system_generated\logs\transcript_full.jsonl'

with open(log_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for l in lines:
    obj = json.loads(l)
    s_idx = obj.get('step_index')
    if s_idx and s_idx >= 10027:
        content = obj.get('content')
        tool_calls = obj.get('tool_calls')
        if content or tool_calls:
            print(f"=== Step {s_idx} [{obj.get('type')}] ===")
            if content:
                print("CONTENT:\n", content[:800])
            if tool_calls:
                print("TOOLS:\n", json.dumps(tool_calls, ensure_ascii=False, indent=2)[:500])
            print("="*50)
