import os
import json
import re

def format_hymn(hymn_text):
    if not hymn_text or hymn_text.strip() == "":
        return hymn_text
    
    lines = hymn_text.split('\n')
    
    cleaned_lines = []
    for line in lines:
        stripped = line.strip()
        if stripped:
            cleaned_lines.append(stripped)
    
    if not cleaned_lines:
        return hymn_text
    
    header = None
    hymn_lines = cleaned_lines
    
    if cleaned_lines[0].isupper() or (len(cleaned_lines[0]) > 10 and cleaned_lines[0].upper() == cleaned_lines[0]):
        header = cleaned_lines[0]
        hymn_lines = cleaned_lines[1:]
    
    formatted_parts = []
    
    if header:
        formatted_parts.append(header)
        formatted_parts.append("")
    
    for i, line in enumerate(hymn_lines):
        formatted_parts.append(line)
        
        if (i + 1) % 4 == 0 and i < len(hymn_lines) - 1:
            formatted_parts.append("")
    
    return '\n'.join(formatted_parts)

def process_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except:
            return False
    
    if 'hymns' not in data or not data['hymns']:
        return False
    
    original_hymn = data['hymns']
    formatted_hymn = format_hymn(original_hymn)
    
    if original_hymn == formatted_hymn:
        return False
    
    data['hymns'] = formatted_hymn
    
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    return True

MONTHS = {
    1: ("January", 31),
    2: ("February", 29),
    3: ("March", 31),
    4: ("April", 30),
    5: ("May", 31),
    6: ("June", 30),
    7: ("July", 31),
    8: ("August", 31),
    9: ("September", 30),
    10: ("October", 31),
    11: ("November", 30),
    12: ("December", 31)
}

print("\n" + "="*60)
print("FORMATTING HYMNS - STANZA STRUCTURE")
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
            continue
        
        try:
            result = process_file(filename)
            if result:
                print(f"  ✅ {month:02d}-{day:02d} formatted")
                processed += 1
            else:
                skipped += 1
        except Exception as e:
            print(f"  ❌ {month:02d}-{day:02d} error: {str(e)}")
            errors += 1

print("\n" + "="*60)
print(f"COMPLETE! Formatted: {processed}, Skipped: {skipped}, Errors: {errors}")
print("="*60 + "\n")

