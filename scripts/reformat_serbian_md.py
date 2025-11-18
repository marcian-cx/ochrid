import os
import re

serbian_dir = '../data/serbian'

def reformat_markdown(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    lines = content.strip().split('\n')
    
    new_content = []
    i = 0
    
    while i < len(lines):
        line = lines[i].strip()
        
        if line.startswith('## ') and re.match(r'## \d+\.\s+\w+', line):
            i += 1
            continue
        
        if line.startswith('## ') and re.match(r'## \d+\.', line):
            heading = line[3:].strip()
            new_content.append(f"### {heading}\n")
            i += 1
            continue
        
        new_content.append(lines[i])
        i += 1
    
    section_markers = {
        'Животи Светих': 'Животи Светих',
        'Химна': 'Химна Похвале',
        'Размишљање': 'Размишљање',
        'Созерцање': 'Созерцање',
        'Беседа': 'Беседа',
        'Поука': 'Поука'
    }
    
    final_content = []
    has_lives_header = False
    
    for line in new_content:
        if line.startswith('###') and not has_lives_header:
            final_content.append('## Животи Светих\n')
            final_content.append('\n')
            has_lives_header = True
        final_content.append(line)
    
    return '\n'.join(final_content)

for month_folder in sorted(os.listdir(serbian_dir)):
    month_path = os.path.join(serbian_dir, month_folder)
    
    if not os.path.isdir(month_path) or month_folder.startswith('.'):
        continue
    
    for filename in sorted(os.listdir(month_path)):
        if not filename.endswith('.md'):
            continue
        
        filepath = os.path.join(month_path, filename)
        
        reformatted = reformat_markdown(filepath)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(reformatted)
        
        print(f"Reformatted {filename}")

print("Reformatting complete!")

