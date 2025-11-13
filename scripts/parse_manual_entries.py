#!/usr/bin/env python3

import json
import os
import re

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
INPUT_FILE = os.path.join(SCRIPT_DIR, '..', 'data', 'entries', '.json')
OUTPUT_DIR = os.path.join(SCRIPT_DIR, '..', 'data', 'entries')

MONTH_MAP = {
    'january': '01', 'february': '02', 'march': '03', 'april': '04',
    'may': '05', 'june': '06', 'july': '07', 'august': '08',
    'september': '09', 'october': '10', 'november': '11', 'december': '12'
}

def parse_entries(content):
    entries = content.split('----')
    
    parsed_entries = []
    
    for entry_text in entries:
        entry_text = entry_text.strip()
        if not entry_text or len(entry_text) < 50:
            continue
        
        lines = entry_text.split('\n')
        
        title_line = None
        for i, line in enumerate(lines[:5]):
            line = line.strip()
            if line and not line.startswith('Print') and not line.startswith('Email'):
                for month_name in MONTH_MAP.keys():
                    if month_name.lower() in line.lower():
                        title_line = line
                        break
                if title_line:
                    break
        
        if not title_line:
            continue
        
        month_name = None
        day = None
        for month in MONTH_MAP.keys():
            if month.lower() in title_line.lower():
                month_name = month
                match = re.search(r'\d+', title_line)
                if match:
                    day = int(match.group())
                break
        
        if not month_name or not day:
            continue
        
        entry = {
            "title": title_line.strip(),
            "saints": "",
            "hymns": "",
            "reflection": "",
            "contemplation": "",
            "homily": ""
        }
        
        current_section = "saints"
        buffer = []
        
        for line in lines:
            line_stripped = line.strip()
            
            if not line_stripped:
                continue
            
            if 'Print' in line_stripped and 'Email' in line_stripped:
                continue
            
            if line_stripped == title_line.strip():
                continue
            
            line_lower = line_stripped.lower()
            
            if 'hymn of praise' in line_lower:
                if buffer:
                    entry[current_section] = '\n\n'.join(buffer)
                current_section = "hymns"
                buffer = []
                continue
            elif line_lower in ['reflection', 'relfection']:
                if buffer:
                    entry[current_section] = '\n\n'.join(buffer)
                current_section = "reflection"
                buffer = []
                continue
            elif line_lower == 'contemplation':
                if buffer:
                    entry[current_section] = '\n\n'.join(buffer)
                current_section = "contemplation"
                buffer = []
                continue
            elif line_lower == 'homily':
                if buffer:
                    entry[current_section] = '\n\n'.join(buffer)
                current_section = "homily"
                buffer = []
                continue
            
            if line_stripped:
                buffer.append(line_stripped)
        
        if buffer:
            entry[current_section] = '\n\n'.join(buffer)
        
        date_key = f"{MONTH_MAP[month_name]}-{day:02d}"
        parsed_entries.append((date_key, entry))
    
    return parsed_entries

def main():
    print("=" * 70)
    print("📜 PARSING MANUAL ENTRIES")
    print("=" * 70)
    print()
    
    if not os.path.exists(INPUT_FILE):
        print(f"❌ Input file not found: {INPUT_FILE}")
        return
    
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        content = f.read()
    
    print(f"📖 Read {len(content)} characters from .json file")
    
    entries = parse_entries(content)
    
    print(f"✅ Parsed {len(entries)} entries\n")
    
    success_count = 0
    
    for date_key, entry in entries:
        output_file = os.path.join(OUTPUT_DIR, f"{date_key}.json")
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(entry, f, ensure_ascii=False, indent=2)
        
        print(f"  ✅ Created {date_key}.json - {entry['title']}")
        success_count += 1
    
    print("\n" + "=" * 70)
    print("🎉 CONVERSION COMPLETE!")
    print("=" * 70)
    print(f"✅ Successfully created {success_count} JSON files")
    print(f"📁 Saved to: {OUTPUT_DIR}")
    print("=" * 70)

if __name__ == "__main__":
    main()

