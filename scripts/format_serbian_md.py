import re
from pathlib import Path

def format_serbian_markdown(raw_text):
    lines = raw_text.strip().split('\n')
    
    lines = [line for line in lines if not re.match(r'^\d+\.\s+[А-Ша-ш]+\s*$', line)]
    
    full_text = '\n'.join(lines)
    
    marker_idx = full_text.find('(Житија Светих за данас)')
    
    if marker_idx == -1:
        saints_section = full_text
        rest_section = ""
    else:
        saints_section = full_text[:marker_idx]
        rest_section = full_text[marker_idx:]
    
    result = ["## Животи Светих", ""]
    
    saint_pattern = re.compile(r'(\d+)\.\s+([^.]+\.)', re.MULTILINE)
    
    saints = []
    for match in saint_pattern.finditer(saints_section):
        num = match.group(1)
        title = match.group(2).rstrip('.')
        start = match.end()
        
        next_match = saint_pattern.search(saints_section, start)
        if next_match:
            body = saints_section[start:next_match.start()]
        else:
            body = saints_section[start:]
        
        body = re.sub(r'\s+', ' ', body).strip()
        
        saints.append((num, title, body))
    
    for num, title, body in saints:
        result.append(f"### {num}. {title.upper()}")
        result.append("")
        result.append(body)
        result.append("")
    
    result.append("## Химна Похвале")
    result.append("")
    
    if rest_section:
        parts = re.split(r'\n(РАСУЂИВАЊЕ|СОЗЕРЦАЊЕ|БЕСЕДА)\n', rest_section)
        
        hymn_text = parts[0]
        hymn_text = hymn_text.replace('(Житија Светих за данас)', '').strip()
        
        hymn_lines = [line.strip() for line in hymn_text.split('\n') if line.strip()]
        
        i = 0
        current_saint = None
        verses = []
        
        while i < len(hymn_lines):
            line = hymn_lines[i]
            
            if re.match(r'^[А-ШЂŽČĆŠŽ\s,\.]+$', line) and len(line) > 15 and not re.match(r'^[А-Ша-ш].*[а-ш].*[а-ш].*[а-ш]', line):
                if current_saint and verses:
                    result.append(f"### {current_saint}")
                    result.append("")
                    result.extend(verses)
                    result.append("")
                    verses = []
                current_saint = line.strip()
            else:
                verses.append(line)
            i += 1
        
        if current_saint and verses:
            result.append(f"### {current_saint}")
            result.append("")
            result.extend(verses)
            result.append("")
        elif verses:
            result.extend(verses)
            result.append("")
        
        sections = {
            'РАСУЂИВАЊЕ': 'Размишљање',
            'СОЗЕРЦАЊЕ': 'Созерцање',
            'БЕСЕДА': 'Беседа'
        }
        
        i = 1
        while i < len(parts):
            if parts[i] in sections:
                section_name = sections[parts[i]]
                section_content = parts[i + 1] if i + 1 < len(parts) else ""
                
                section_content = re.sub(r'\s+', ' ', section_content).strip()
                
                result.append(f"## {section_name}")
                result.append("")
                result.append(section_content)
                result.append("")
                
                i += 2
            else:
                i += 1
    
    return '\n'.join(result).strip() + '\n'

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        raw_text = f.read()
    
    formatted_text = format_serbian_markdown(raw_text)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(formatted_text)
    
    print(f"Formatted: {file_path}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) > 1:
        file_path = Path(sys.argv[1])
        if file_path.exists():
            process_file(file_path)
        else:
            print(f"File not found: {file_path}")
    else:
        print("Usage: python3 format_serbian_md.py <path_to_md_file>")
        print("Example: python3 format_serbian_md.py data/serbian/01/01-02.md")
