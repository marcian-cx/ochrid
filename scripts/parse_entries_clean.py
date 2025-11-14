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
    
    lines = text.split('\n')
    
    hymn_idx = None
    reflection_idx = None
    contemplation_idx = None
    homily_idx = None
    
    for i, line in enumerate(lines):
        if line.strip() == "HYMN OF PRAISE":
            hymn_idx = i
        elif line.strip() == "REFLECTION":
            reflection_idx = i
        elif line.strip() == "CONTEMPLATION":
            contemplation_idx = i
        elif line.strip() == "HOMILY":
            homily_idx = i
    
    indices = []
    if hymn_idx is not None:
        indices.append(('hymn', hymn_idx))
    if reflection_idx is not None:
        indices.append(('reflection', reflection_idx))
    if contemplation_idx is not None:
        indices.append(('contemplation', contemplation_idx))
    if homily_idx is not None:
        indices.append(('homily', homily_idx))
    
    indices.sort(key=lambda x: x[1])
    
    if indices:
        saints = '\n'.join(lines[:indices[0][1]]).strip()
        
        for i in range(len(indices)):
            section_type, start_idx = indices[i]
            
            if i + 1 < len(indices):
                end_idx = indices[i + 1][1]
            else:
                end_idx = len(lines)
            
            section_lines = lines[start_idx+1:end_idx]
            
            while section_lines and not section_lines[0].strip():
                section_lines.pop(0)
            while section_lines and not section_lines[-1].strip():
                section_lines.pop()
            
            section_content = '\n'.join(section_lines)
            
            if section_type == 'hymn':
                if section_lines and not section_lines[0].strip().startswith('1.'):
                    section_lines.pop(0)
                hymns = '\n'.join(section_lines)
            elif section_type == 'reflection':
                reflection = section_content
            elif section_type == 'contemplation':
                contemplation = section_content
            elif section_type == 'homily':
                homily = section_content
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
            existing_json = json.loads(content)
            if (existing_json.get("contemplation") and 
                existing_json.get("homily") and 
                existing_json.get("contemplation") != "" and 
                existing_json.get("homily") != ""):
                return None
        except:
            pass
    
    entry = parse_entry(content, month, day)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(entry, f, indent=2, ensure_ascii=False)
    
    return filepath

MONTHS = {
    11: ("November", 30),
    12: ("December", 31)
}

print("\n" + "="*60)
print("PARSING MANUAL ENTRIES - CLEAN VERSION")
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
                print(f"  ⏭️  {month:02d}-{day:02d} skipped (already parsed)")
                skipped += 1
        except Exception as e:
            print(f"  ❌ {month:02d}-{day:02d} error: {str(e)}")
            errors += 1

print("\n" + "="*60)
print(f"COMPLETE! Processed: {processed}, Skipped: {skipped}, Errors: {errors}")
print("="*60 + "\n")

