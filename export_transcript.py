import sqlite3
import os
import re

def export_conversation(db_path, output_md_path):
    conn = sqlite3.connect(os.path.expanduser(db_path))
    cursor = conn.cursor()
    cursor.execute('SELECT idx, step_type, status, step_payload FROM steps ORDER BY idx ASC;')
    rows = cursor.fetchall()
    
    with open(output_md_path, 'w', encoding='utf-8') as f:
        f.write(f"# Antigravity Conversation Dump: {os.path.basename(db_path)}\n\n")
        
        for idx, st_type, status, payload in rows:
            if not payload:
                continue
            text = payload.decode('utf-8', errors='ignore')
            
            # Filter non-printable control chars except newlines and tabs
            cleaned = "".join(ch if (ch == '\n' or ch == '\t' or 32 <= ord(ch) <= 126 or ord(ch) > 127) else " " for ch in text)
            
            # Extract meaningful text segments
            lines = [l.strip() for l in cleaned.split('\n') if len(l.strip()) > 3]
            filtered = []
            for l in lines:
                if any(x in l for x in ['sessionID', 'cloudcode-pa', 'TraceID', 'Content-Type', 'X-Cloudaicompanion', 'ESF', 'Server-Timing']):
                    continue
                filtered.append(l)
                
            if filtered:
                block = "\n".join(filtered)
                f.write(f"## Step {idx}\n\n```text\n{block[:3000]}\n```\n\n---\n\n")
                
    print(f"Transcript written to: {output_md_path}")

if __name__ == '__main__':
    export_conversation(
        '~/.gemini/antigravity-cli/conversations/084352cd-2f68-4bcf-8f62-4e1b6f6e8f89.db',
        '/Users/cesar/Downloads/Agy Testing/SESSION_084352cd_DUMP.md'
    )
    export_conversation(
        '~/.gemini/antigravity-cli/conversations/f4e96540-d9c8-459d-b828-d3721dc9cf4c.db',
        '/Users/cesar/Downloads/Agy Testing/SESSION_f4e96540_DUMP.md'
    )
