import os
import json

MONTHS = {
    7: ("July", 31),
    8: ("August", 31),
    9: ("September", 30),
    10: ("October", 31),
    11: ("November", 30),
    12: ("December", 31)
}

def check_file_exists(month, day):
    folder = f"../data/entries/{month:02d}"
    filename = f"{folder}/{month:02d}-{day:02d}.json"
    return os.path.exists(filename)

def create_blank_entry(month, day, month_name):
    folder = f"../data/entries/{month:02d}"
    os.makedirs(folder, exist_ok=True)
    
    filename = f"{folder}/{month:02d}-{day:02d}.json"
    
    template = f"""PASTE ENTRY HERE FOR {month_name.upper()} {day}

Instructions:
1. Copy the entire entry from the web archive
2. Replace this text with the pasted content
3. Run the parser script to convert to JSON

DO NOT EDIT THE STRUCTURE BELOW - IT WILL BE AUTO-GENERATED
"""
    
    with open(filename, 'w', encoding='utf-8') as f:
        f.write(template)
    
    return filename

created_count = 0
skipped_count = 0

print("\n" + "="*60)
print("CREATING BLANK ENTRY FILES")
print("="*60 + "\n")

for month, (month_name, days_in_month) in MONTHS.items():
    print(f"\n{month_name}:")
    for day in range(1, days_in_month + 1):
        if check_file_exists(month, day):
            print(f"  ✓ {month:02d}-{day:02d} already exists")
            skipped_count += 1
        else:
            filename = create_blank_entry(month, day, month_name)
            print(f"  + Created {filename}")
            created_count += 1

print("\n" + "="*60)
print(f"COMPLETE! Created {created_count} files, skipped {skipped_count}")
print("="*60 + "\n")

