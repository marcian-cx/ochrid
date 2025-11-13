#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup
import json
import time
import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
URL_MAP_FILE = os.path.join(SCRIPT_DIR, 'url_map.json')
OUTPUT_DIR = os.path.join(SCRIPT_DIR, '..', 'data', 'entries')

os.makedirs(OUTPUT_DIR, exist_ok=True)

def clean_text(text):
    skip_phrases = [
        'Print', 'Email', 'Twitter', 'You are here:', 'Western American Diocese',
        'Home', 'Latest News', 'Events', 'Learn', 'Give', 'Ministries',
        'Sebastian Press', 'Calendar', 'Directory', 'Connect', 'Back to top',
        'Site map', 'Window', 'Mobile', 'Copyright', 'All Rights Reserved',
        'westsrbdio.org'
    ]
    
    lines = text.split('\n')
    cleaned = []
    
    for line in lines:
        line = line.strip()
        if line and len(line) > 2 and not any(skip in line for skip in skip_phrases):
            cleaned.append(line)
    
    return '\n'.join(cleaned)

def scrape_entry(url, month_name, day):
    try:
        response = requests.get(url, timeout=12)
        
        if response.status_code != 200:
            return None
            
        soup = BeautifulSoup(response.content, 'html.parser')
        content_area = soup.find('div', class_='item-page')
        
        if not content_area:
            return None
        
        text = content_area.get_text(separator='\n', strip=True)
        text = clean_text(text)
        
        if len(text) < 200:
            return None
        
        entry = {
            "title": f"{month_name} {day}",
            "saints": "",
            "hymns": "",
            "reflection": "",
            "contemplation": "",
            "homily": ""
        }
        
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        
        current_section = "saints"
        buffer = []
        
        for line in lines:
            lower = line.lower()
            
            if 'hymn of praise' in lower:
                if buffer:
                    entry[current_section] = '\n\n'.join(buffer)
                current_section = "hymns"
                buffer = []
                if 'hymn of praise' not in lower or len(line) > 20:
                    buffer.append(line)
                continue
            elif lower == 'reflection':
                if buffer:
                    entry[current_section] = '\n\n'.join(buffer)
                current_section = "reflection"
                buffer = []
                continue
            elif lower == 'contemplation':
                if buffer:
                    entry[current_section] = '\n\n'.join(buffer)
                current_section = "contemplation"
                buffer = []
                continue
            elif lower == 'homily':
                if buffer:
                    entry[current_section] = '\n\n'.join(buffer)
                current_section = "homily"
                buffer = []
                continue
            
            if line and len(line) > 1:
                buffer.append(line)
        
        if buffer:
            entry[current_section] = '\n\n'.join(buffer)
        
        has_content = any(entry[key] and len(entry[key]) > 50 for key in ['saints', 'hymns', 'reflection', 'homily'])
        
        return entry if has_content else None
        
    except Exception as e:
        return None

def save_entry(date_key, entry):
    filename = os.path.join(OUTPUT_DIR, f"{date_key}.json")
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(entry, f, ensure_ascii=False, indent=2)

def main():
    print("=" * 70)
    print("📜 PROLOGUE of Ochrid - INDIVIDUAL FILES SCRAPER")
    print("=" * 70)
    print()
    
    if not os.path.exists(URL_MAP_FILE):
        print("❌ URL map not found. Run get_urls.py first!")
        sys.exit(1)
    
    with open(URL_MAP_FILE, 'r') as f:
        url_map = json.load(f)
    
    print(f"✅ Loaded {len(url_map)} URLs from map\n")
    
    existing_files = set(f.replace('.json', '') for f in os.listdir(OUTPUT_DIR) if f.endswith('.json'))
    print(f"📂 Found {len(existing_files)} existing entries\n")
    
    sorted_dates = sorted(url_map.keys())
    total = len(sorted_dates)
    success_count = 0
    error_count = 0
    skipped = 0
    
    print(f"🎯 Scraping {total} entries to individual files...")
    print(f"📊 Progress:\n")
    
    for i, date_key in enumerate(sorted_dates, 1):
        if date_key in existing_files:
            skipped += 1
            print(f"[{i:3d}/{total}] {date_key} ⏭️  ", flush=True)
            continue
        
        url_info = url_map[date_key]
        entry = scrape_entry(url_info['url'], url_info['month'], url_info['day'])
        
        if entry:
            save_entry(date_key, entry)
            success_count += 1
            print(f"[{i:3d}/{total}] {date_key} ✅", flush=True)
        else:
            error_count += 1
            print(f"[{i:3d}/{total}] {date_key} ❌", flush=True)
        
        time.sleep(0.7)
    
    total_files = len(os.listdir(OUTPUT_DIR))
    
    print("\n" + "=" * 70)
    print("🎉 SCRAPING COMPLETE!")
    print("=" * 70)
    print(f"📊 Statistics:")
    print(f"   ✅ New entries: {success_count}")
    print(f"   ⏭️  Skipped: {skipped}")
    print(f"   ❌ Failed: {error_count}")
    print(f"   📁 Total files: {total_files}")
    print(f"   📂 Directory: {OUTPUT_DIR}")
    print("=" * 70)
    
    coverage = (total_files / 366) * 100
    print(f"\n📈 Coverage: {coverage:.1f}% of year ({total_files}/366 days)")

if __name__ == "__main__":
    main()
