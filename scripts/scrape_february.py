#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup
import json
import time
import os

BASE_URL = "https://web.archive.org/web/20170502034310/http://westserbdio.org/en/prologue"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
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

def scrape_entry(article_id, day):
    url = f"{BASE_URL}/{article_id}-february-{day}"
    date_key = f"02-{day:02d}"
    
    print(f"[{day}/29] Fetching {date_key} from article {article_id}...")
    
    try:
        response = requests.get(url, timeout=12)
        
        if response.status_code != 200:
            print(f"    ✗ Status {response.status_code}")
            return None
            
        soup = BeautifulSoup(response.content, 'html.parser')
        content_area = soup.find('div', class_='item-page')
        
        if not content_area:
            print(f"    ✗ No content area found")
            return None
        
        text = content_area.get_text(separator='\n', strip=True)
        text = clean_text(text)
        
        if len(text) < 200:
            print(f"    ⚠️  Content too short")
            return None
        
        entry = {
            "title": f"February {day}",
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
        
        if has_content:
            output_file = os.path.join(OUTPUT_DIR, f"{date_key}.json")
            with open(output_file, 'w', encoding='utf-8') as f:
                json.dump(entry, f, ensure_ascii=False, indent=2)
            print(f"    ✅ Saved to {date_key}.json")
            return entry
        else:
            print(f"    ⚠️  No substantial content found")
            return None
        
    except Exception as e:
        print(f"    ✗ Error: {e}")
        return None

def main():
    print("=" * 70)
    print("📜 SCRAPING FEBRUARY 2-29 FROM PROLOGUE")
    print("=" * 70)
    print()
    
    success_count = 0
    error_count = 0
    
    start_article_id = 447
    
    for day in range(2, 30):
        article_id = start_article_id + (day - 2)
        
        entry = scrape_entry(article_id, day)
        
        if entry:
            success_count += 1
        else:
            error_count += 1
        
        time.sleep(1)
    
    print("\n" + "=" * 70)
    print("🎉 SCRAPING COMPLETE!")
    print("=" * 70)
    print(f"✅ Successfully scraped: {success_count}/28 entries")
    print(f"❌ Failed: {error_count}/28 entries")
    print(f"📁 Saved to: {OUTPUT_DIR}")
    print("=" * 70)

if __name__ == "__main__":
    main()

