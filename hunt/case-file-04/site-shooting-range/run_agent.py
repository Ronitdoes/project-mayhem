import os
import json
import urllib.request
import subprocess

API_URL = "http://localhost:1234/v1/chat/completions"
MODEL_NAME = "google/gemma-4-12b-qat"

def get_workspace_tree():
    files_list = []
    for root, dirs, files in os.walk('.'):
        if 'node_modules' in root or '.next' in root or '.git' in root:
            continue
        for file in files:
            rel_path = os.path.relpath(os.path.join(root, file), '.')
            if rel_path != "run_agent.py":
                files_list.append(rel_path)
    return files_list

def ask_local_model(user_prompt):
    current_files = get_workspace_tree()
    
    SYSTEM_PROMPT = f"""You are an elite full-stack autonomous software engineer building modern web frameworks (Next.js, TypeScript, React, Tailwind).
You manipulate the workspace directories on the user's hard drive by outputting a precise JSON sequence array.

Your current directory contents: {json.dumps(current_files)}

You MUST ONLY reply with a valid raw JSON array inside a markdown block. Do not write text summaries, descriptions, or explanations outside the JSON block.

Available Command Blueprint Formats:
1. Read file contents: {{"action": "read", "filename": "src/app/page.tsx"}}
2. Create/Overwrite a file: {{"action": "write", "filename": "src/components/Button.tsx", "content": "export const Button = () => ..."}}
3. Delete an unwanted file: {{"action": "delete", "filename": "old-file.js"}}
4. Run standard shell scripts: {{"action": "run", "command": "npm run build"}}

Example response format:
```json
[
  {{"action": "write", "filename": "test.txt", "content": "Hello World"}}
]
```"""

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.1
    }
    
    req = urllib.request.Request(API_URL, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'})
    try:
        with urllib.request.urlopen(req, timeout=600) as response:
            res = json.loads(response.read().decode('utf-8'))
            # Safe extraction validation layer to prevent script crashes
            if isinstance(res, dict) and 'choices' in res and len(res['choices']) > 0:
                return res['choices'][0]['message']['content']
            return str(res)
    except Exception as e:
        return f"API Error: {e}"

def execute_actions(response_text):
    if "API Error:" in response_text:
        print(f"[Network Warning] {response_text}")
        return
        
    try:
        raw_json = response_text.strip()
        if "```json" in raw_json:
            raw_json = raw_json.split("```json")[1].split("```")[0].strip()
        elif "```" in raw_json:
            raw_json = raw_json.split("```")[1].split("```")[0].strip()
            
        start_idx = raw_json.find('[')
        end_idx = raw_json.rfind(']') + 1
        if start_idx != -1 and end_idx != 0:
            raw_json = raw_json[start_idx:end_idx]
            
        actions = json.loads(raw_json)
        if isinstance(actions, dict):
            actions = [actions]
            
        for act in actions:
            filename = act.get("filename")
            action_type = act.get("action")
            
            if action_type == "read" and filename:
                if os.path.exists(filename):
                    print(f"[Agent Reading] Inspecting: {filename}")
                    with open(filename, "r", encoding="utf-8") as f:
                        file_content = f.read()
                    follow_up = ask_local_model(f"The contents of the file '{filename}' are:\n{file_content}\nComplete modifications.")
                    execute_actions(follow_up)
            
            elif action_type == "write" and filename:
                parent_dir = os.path.dirname(filename)
                if parent_dir and not os.path.exists(parent_dir):
                    os.makedirs(parent_dir, exist_ok=True)
                with open(filename, "w", encoding="utf-8") as f:
                    f.write(act.get("content", ""))
                print(f"[Agent Success] Written Code File: {filename}")
                
            elif action_type == "delete" and filename:
                if os.path.exists(filename):
                    os.remove(filename)
                    print(f"[Agent Success] Deleted Target File: {filename}")
                    
            elif action_type == "run":
                cmd_to_run = act.get("command")
                if cmd_to_run:
                    print(f"[Executing Build Shell] > {cmd_to_run}")
                    result = subprocess.run(cmd_to_run, shell=True, capture_output=True, text=True)
                    if result.returncode != 0:
                        fix_prompt = f"The command '{cmd_to_run}' failed with error:\n{result.stderr}\nFix it."
                        execute_actions(ask_local_model(fix_prompt))
                        
    except Exception as e:
        print(f"Failed to parse text action plan. Error: {e}")

if __name__ == "__main__":
    print("=== Advanced Local Full-Stack Web Agent Ready ===")
    print("Type 'exit' to quit.")
    while True:
        user_input = input("\nEnter Web Build Instruction > ")
        if user_input.lower() == 'exit':
            break
        if not user_input.strip():
            continue
            
        print("Processing Architecture Tree (Syncing with Gemma 4)...")
        ai_response = ask_local_model(user_input)
        execute_actions(ai_response)