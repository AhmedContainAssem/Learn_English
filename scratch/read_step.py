import json

log_path = r'C:\Users\Al700t\.gemini\antigravity-ide\brain\8facbcd8-ebbd-4342-af33-3ff24bdabb59\.system_generated\logs\transcript_full.jsonl'
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        data = json.loads(line)
        idx = data.get('step_index', 0)
        if 9650 <= idx <= 9675:
            calls = data.get('tool_calls', [])
            content = data.get('content', '')
            thinking = data.get('thinking', '')
            print(f"--- STEP {idx} (source: {data.get('source')}, type: {data.get('type')}) ---")
            if calls:
                print("Calls:", [c.get('name') for c in calls])
            if thinking:
                print("Thinking preview:", thinking[:300])
            if content:
                print("Content preview:", content[:300])
