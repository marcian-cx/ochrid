import os
import json
import re

def parse_entry(text, month, day):
    month_names = ["", "January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December"]
    
    title = f"{month_names[month]} {day}"
    
    saints = ""
    hymns = ""
    reflection = ""
    contemplation = ""
    homily = ""
    
    hymn_pattern = r'HYMN OF PRAISE'
    reflection_pattern = r'REFLECTION'
    contemplation_pattern = r'To contemplate'
    homily_pattern = r'About '
    
    hymn_match = re.search(hymn_pattern, text, re.IGNORECASE)
    reflection_match = re.search(reflection_pattern, text, re.IGNORECASE)
    contemplation_match = re.search(contemplation_pattern, text)
    homily_match = re.search(homily_pattern, text)
    
    markers = []
    if hymn_match:
        markers.append(('hymns', hymn_match.start(), 'HYMN OF PRAISE'))
    if reflection_match:
        markers.append(('reflection', reflection_match.start(), 'REFLECTION'))
    if contemplation_match:
        markers.append(('contemplation', contemplation_match.start(), None))
    if homily_match:
        markers.append(('homily', homily_match.start(), None))
    
    markers.sort(key=lambda x: x[1])
    
    if markers:
        saints = text[:markers[0][1]].strip()
        
        for i, (section_name, start_pos, header) in enumerate(markers):
            if i + 1 < len(markers):
                end_pos = markers[i + 1][1]
                section_text = text[start_pos:end_pos].strip()
            else:
                section_text = text[start_pos:].strip()
            
            if header:
                section_text = re.sub(f'^{re.escape(header)}\\s*', '', section_text, flags=re.IGNORECASE).strip()
            
            if section_name == 'hymns':
                hymns = section_text
            elif section_name == 'reflection':
                reflection = section_text
            elif section_name == 'contemplation':
                contemplation = section_text
            elif section_name == 'homily':
                homily = section_text
    else:
        saints = text.strip()
    
    return {
        "title": title,
        "saints": saints,
        "hymns": hymns,
        "reflection": reflection,
        "contemplation": contemplation,
        "homily": homily
    }

def process_file(filepath, month, day):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if content.startswith("PASTE ENTRY HERE"):
        return None
    
    if content.strip().startswith("{"):
        try:
            json.loads(content)
            return None
        except:
            pass
    
    entry = parse_entry(content, month, day)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(entry, f, indent=2, ensure_ascii=False)
    
    return filepath

MONTHS = {
    7: ("July", 31),
    8: ("August", 31),
    9: ("September", 30),
    10: ("October", 31),
    11: ("November", 30),
    12: ("December", 31)
}

print("\n" + "="*60)
print("PARSING MANUAL ENTRIES")
print("="*60 + "\n")

processed = 0
skipped = 0
errors = 0

for month, (month_name, days_in_month) in MONTHS.items():
    print(f"\n{month_name}:")
    for day in range(1, days_in_month + 1):
        folder = f"../data/entries/{month:02d}"
        filename = f"{folder}/{month:02d}-{day:02d}.json"
        
        if not os.path.exists(filename):
            print(f"  ⚠️  {month:02d}-{day:02d} missing file")
            errors += 1
            continue
        
        try:
            result = process_file(filename, month, day)
            if result:
                print(f"  ✅ {month:02d}-{day:02d} parsed")
                processed += 1
            else:
                print(f"  ⏭️  {month:02d}-{day:02d} skipped (blank or already JSON)")
                skipped += 1
        except Exception as e:
            print(f"  ❌ {month:02d}-{day:02d} error: {str(e)}")
            errors += 1

print("\n" + "="*60)
print(f"COMPLETE! Processed: {processed}, Skipped: {skipped}, Errors: {errors}")
print("="*60 + "\n")

