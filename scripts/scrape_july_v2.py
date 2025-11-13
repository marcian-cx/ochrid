import requests
from bs4 import BeautifulSoup
import json
import os
import time
import re

BASE_URL = "https://web.archive.org/web/20170502034310/http://westserbdio.org/en/prologue/"

def scrape_entry(article_id, day):
    url = f"{BASE_URL}{article_id}-july-{day}"
    
    try:
        print(f"\n📅 Scraping July {day} (Article {article_id})...")
        time.sleep(2)
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        content_div = soup.find('div', class_='item-page')
        if not content_div:
            print(f"  ❌ No content found")
            return None
        
        title = f"July {day}"
        
        all_paragraphs = content_div.find_all('p')
        
        if len(all_paragraphs) == 0:
            print(f"  ❌ No paragraphs found")
            return None
        
        full_text = '\n\n'.join([p.get_text(strip=True) for p in all_paragraphs if p.get_text(strip=True)])
        
        saints = ""
        hymns = ""
        reflection = ""
        contemplation = ""
        homily = ""
        
        hymns_match = re.search(r'HYMN OF PRAISE(.*?)(?=REFLECTION|CONTEMPLATION|HOMILY|$)', full_text, re.DOTALL | re.IGNORECASE)
        if hymns_match:
            hymns = hymns_match.group(1).strip()
        
        reflection_match = re.search(r'REFLECTION(.*?)(?=CONTEMPLATION|HOMILY|$)', full_text, re.DOTALL | re.IGNORECASE)
        if reflection_match:
            reflection = reflection_match.group(1).strip()
        
        contemplation_match = re.search(r'CONTEMPLATION(.*?)(?=HOMILY|$)', full_text, re.DOTALL | re.IGNORECASE)
        if contemplation_match:
            contemplation = contemplation_match.group(1).strip()
        
        homily_match = re.search(r'HOMILY(.*?)$', full_text, re.DOTALL | re.IGNORECASE)
        if homily_match:
            homily = homily_match.group(1).strip()
        
        saints_end_markers = ['HYMN OF PRAISE', 'REFLECTION', 'CONTEMPLATION', 'HOMILY']
        saints_text = full_text
        for marker in saints_end_markers:
            if marker in saints_text:
                saints = saints_text[:saints_text.index(marker)].strip()
                break
        
        entry = {
            "title": title,
            "saints": saints,
            "hymns": hymns,
            "reflection": reflection,
            "contemplation": contemplation,
            "homily": homily
        }
        
        if not saints or len(saints) < 50:
            print(f"  ⚠️  Entry seems incomplete (saints section too short)")
            print(f"  ℹ️  Saints length: {len(saints)}, Full text length: {len(full_text)}")
            return None
        
        print(f"  ✅ Successfully parsed entry")
        print(f"     Saints: {len(saints)} chars, Hymns: {len(hymns)} chars")
        print(f"     Reflection: {len(reflection)} chars, Contemplation: {len(contemplation)} chars")
        print(f"     Homily: {len(homily)} chars")
        
        return entry
        
    except Exception as e:
        print(f"  ❌ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return None

def save_entry(entry, day):
    month_folder = "../data/entries/07"
    os.makedirs(month_folder, exist_ok=True)
    
    filename = f"{month_folder}/07-{day:02d}.json"
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(entry, f, indent=2, ensure_ascii=False)
    
    print(f"  💾 Saved {filename}")

print("\n" + "="*60)
print("SCRAPING JULY 2-28")
print("="*60)

article_id = 557
success_count = 0
fail_count = 0

for day in range(2, 29):
    entry = scrape_entry(article_id, day)
    
    if entry:
        save_entry(entry, day)
        success_count += 1
    else:
        fail_count += 1
    
    article_id += 1
    
    if day == 10:
        print(f"\n{'='*60}")
        print(f"⏸️  Pausing for 1 minute after July 10...")
        print(f"{'='*60}\n")
        time.sleep(60)
    elif day == 20:
        print(f"\n{'='*60}")
        print(f"⏸️  Pausing for 1 minute after July 20...")
        print(f"{'='*60}\n")
        time.sleep(60)

print("\n" + "="*60)
print(f"✅ JULY SCRAPING COMPLETED!")
print(f"   Success: {success_count}, Failed: {fail_count}")
print("="*60)

