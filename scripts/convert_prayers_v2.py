import json
import re

def parse_prayer_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    prayers = []
    lines = content.split('\n')
    
    header_patterns = [
        r'^Prayer of',
        r'^Prayers? to',
        r'^First Prayer',
        r'^Second Prayer',
        r'^Third Prayer',
        r'^Fourth Prayer',
        r'^Fifth Prayer',
        r'^Sixth Prayer',
        r'^Seventh Prayer',
        r'^The Troparia',
        r'^The Creed',
        r'^Psalm \d+',
        r'^Troparia\.',
        r'^INTERCESSION',
        r'^For Those Departed',
        r'^Daily Confession',
        r'^Midnight Song',
        r'^Prayerful Invocation',
        r'^Prayer for',
        r'^The Troparion',
    ]
    
    subheading_patterns = [
        r'^Day$',
        r'^Night$',
        r'^Prayer$',
    ]
    
    def is_main_header(line):
        stripped = line.strip()
        
        if not stripped:
            return False
        
        if re.match(r'^[A-Z][A-Z\s,\-()]+$', stripped) and len(stripped) < 100:
            special_words = ['Amen', 'Glory', 'Lord']
            if any(word in stripped for word in special_words):
                return False
            return True
        
        for pattern in header_patterns:
            if re.match(pattern, stripped, re.IGNORECASE):
                return True
        
        return False
    
    def is_subheading(line):
        stripped = line.strip()
        for pattern in subheading_patterns:
            if re.match(pattern, stripped):
                return True
        return False
    
    def is_to_line(line):
        stripped = line.strip()
        return re.match(r'^to (the |our )', stripped, re.IGNORECASE) is not None
    
    def clean_title(title, to_line=None):
        if title.lower() == 'prayer our lord jesus christ':
            return 'Prayer to Our Lord Jesus Christ'
        
        if to_line:
            title = f"{title} {to_line}"
        
        return title
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        if is_main_header(line):
            current_title = line
            i += 1
            
            to_line = None
            if i < len(lines) and is_to_line(lines[i].strip()):
                to_line = lines[i].strip()
                i += 1
            
            current_title = clean_title(current_title, to_line)
            
            current_prayer = []
            sub_prayers = []
            
            while i < len(lines) and not is_main_header(lines[i].strip()):
                stripped = lines[i].strip()
                
                if is_subheading(stripped):
                    if current_prayer:
                        text = '\n'.join(current_prayer).strip()
                        if not text.startswith('('):
                            sub_prayers.append({
                                "title": "Introduction",
                                "prayer": text
                            })
                        current_prayer = []
                    
                    sub_title = stripped
                    i += 1
                    sub_content = []
                    
                    while i < len(lines) and not is_main_header(lines[i].strip()) and not is_subheading(lines[i].strip()):
                        if lines[i].strip() or sub_content:
                            sub_content.append(lines[i])
                        i += 1
                    
                    sub_text = '\n'.join(sub_content).strip()
                    if sub_text:
                        if sub_title == "Prayer" and is_to_line(sub_text.split('\n')[0]):
                            first_line = sub_text.split('\n')[0]
                            remaining = '\n'.join(sub_text.split('\n')[1:]).strip()
                            sub_title = clean_title(sub_title, first_line)
                            sub_text = remaining
                        
                        sub_prayers.append({
                            "title": sub_title,
                            "prayer": sub_text
                        })
                    continue
                
                if stripped or current_prayer:
                    current_prayer.append(lines[i])
                
                i += 1
            
            if sub_prayers:
                intro_text = '\n'.join(current_prayer).strip()
                if intro_text and intro_text.startswith('(') and intro_text.endswith(')'):
                    prayers.append({
                        "title": current_title,
                        "description": intro_text,
                        "prayers": sub_prayers
                    })
                elif intro_text:
                    sub_prayers.insert(0, {
                        "title": "Introduction",
                        "prayer": intro_text
                    })
                    prayers.append({
                        "title": current_title,
                        "prayers": sub_prayers
                    })
                else:
                    prayers.append({
                        "title": current_title,
                        "prayers": sub_prayers
                    })
            else:
                prayer_text = '\n'.join(current_prayer).strip()
                if prayer_text:
                    prayers.append({
                        "title": current_title,
                        "prayer": prayer_text
                    })
        else:
            i += 1
    
    return prayers

morning_prayers = parse_prayer_file('../data/prayers/01_morning_prayers.md')
evening_prayers = parse_prayer_file('../data/prayers/01_evening_prayers.md')

with open('../data/prayers/morning_prayers.json', 'w', encoding='utf-8') as f:
    json.dump(morning_prayers, f, indent=2, ensure_ascii=False)

with open('../data/prayers/evening_prayers.json', 'w', encoding='utf-8') as f:
    json.dump(evening_prayers, f, indent=2, ensure_ascii=False)

print(f"Morning prayers: {len(morning_prayers)} sections")
print(f"Evening prayers: {len(evening_prayers)} sections")

for i, p in enumerate(morning_prayers):
    if 'prayers' in p:
        print(f"  Morning {i+1}: {p['title']} - {len(p['prayers'])} sub-prayers")

for i, p in enumerate(evening_prayers):
    if 'prayers' in p:
        print(f"  Evening {i+1}: {p['title']} - {len(p['prayers'])} sub-prayers")

print("Done!")

