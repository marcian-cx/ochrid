import os
import json

def parse_entry(text, month, day):
    month_names = ["", "January", "February", "March", "April", "May", "June", 
                   "July", "August", "September", "October", "November", "December"]
    
    title = f"{month_names[month]} {day}"
    
    saints = ""
    hymns = ""
    reflection = ""
    contemplation = ""
    homily = ""
    
    hymn_marker = "HYMN OF PRAISE"
    reflection_marker = "REFLECTION"
    contemplation_marker = "CONTEMPLATION"
    homily_marker = "HOMILY"
    
    hymn_pos = text.find(hymn_marker)
    reflection_pos = text.find(reflection_marker)
    contemplation_pos = text.find(contemplation_marker)
    homily_pos = text.find(homily_marker)
    
    positions = []
    if hymn_pos != -1:
        positions.append(('hymn', hymn_pos, hymn_marker))
    if reflection_pos != -1:
        positions.append(('reflection', reflection_pos, reflection_marker))
    if contemplation_pos != -1:
        positions.append(('contemplation', contemplation_pos, contemplation_marker))
    if homily_pos != -1:
        positions.append(('homily', homily_pos, homily_marker))
    
    positions.sort(key=lambda x: x[1])
    
    if positions:
        saints = text[:positions[0][1]].strip()
        
        for i in range(len(positions)):
            section_type, start_pos, marker = positions[i]
            
            if i + 1 < len(positions):
                end_pos = positions[i + 1][1]
            else:
                end_pos = len(text)
            
            section_text = text[start_pos:end_pos]
            
            marker_end = start_pos + len(marker)
            section_content = text[marker_end:end_pos].strip()
            
            if section_type == 'hymn':
                hymns = section_content
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
