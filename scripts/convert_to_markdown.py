import os
import json
import re

serbian_dir = '../data/serbian'

def parse_serbian_text(text):
    lines = text.strip().split('\n')
    
    sections = []
    current_section = None
    current_content = []
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        if re.match(r'^\d+\.', line):
            if current_section:
                sections.append({
                    'heading': current_section,
                    'content': '\n'.join(current_content).strip()
                })
            current_section = line
            current_content = []
        else:
            current_content.append(line)
    
    if current_section:
        sections.append({
            'heading': current_section,
            'content': '\n'.join(current_content).strip()
        })
    
    return sections

for month_folder in sorted(os.listdir(serbian_dir)):
    month_path = os.path.join(serbian_dir, month_folder)
    
    if not os.path.isdir(month_path) or month_folder.startswith('.'):
        continue
    
    for filename in sorted(os.listdir(month_path)):
        if not filename.endswith('.json'):
            continue
        
        filepath = os.path.join(month_path, filename)
        
        with open(filepath, 'r', encoding='utf-8') as f:
            text = f.read()
        
        sections = parse_serbian_text(text)
        
        md_content = []
        for section in sections:
            md_content.append(f"## {section['heading']}\n")
            md_content.append(f"{section['content']}\n")
        
        md_filepath = filepath.replace('.json', '.md')
        with open(md_filepath, 'w', encoding='utf-8') as f:
            f.write('\n'.join(md_content))
        
        os.remove(filepath)
        
        print(f"Converted {filename} to markdown")

print("Conversion complete!")

