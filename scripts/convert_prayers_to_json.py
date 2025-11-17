import json
import re

def parse_prayer_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    prayers = []
    current_title = None
    current_prayer = []
    
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
    
    def is_header(line):
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
    
    def save_current():
        if current_title and current_prayer:
            prayer_text = '\n'.join(current_prayer).strip()
            if prayer_text:
                prayers.append({
                    "title": current_title,
                    "prayer": prayer_text
                })
    
    i = 0
    while i < len(lines):
        line = lines[i].strip()
        
        if is_header(line):
            save_current()
            current_title = line
            current_prayer = []
        elif line:
            current_prayer.append(lines[i])
        elif current_prayer:
            current_prayer.append('')
        
        i += 1
    
    save_current()
    
    return prayers

morning_prayers = parse_prayer_file('../data/prayers/01_morning_prayers.md')
evening_prayers = parse_prayer_file('../data/prayers/01_evening_prayers.md')

with open('../data/prayers/morning_prayers.json', 'w', encoding='utf-8') as f:
    json.dump(morning_prayers, f, indent=2, ensure_ascii=False)

with open('../data/prayers/evening_prayers.json', 'w', encoding='utf-8') as f:
    json.dump(evening_prayers, f, indent=2, ensure_ascii=False)

print(f"Morning prayers: {len(morning_prayers)} sections")
print(f"Evening prayers: {len(evening_prayers)} sections")
print("Done!")

