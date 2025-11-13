import requests
from bs4 import BeautifulSoup
import json
import os
import time

BASE_URL = "https://web.archive.org/web/20170502034310/http://westserbdio.org/en/prologue/"

def scrape_entry(article_id, day):
    url = f"{BASE_URL}{article_id}-july-{day}"
    
    try:
        print(f"  Fetching: {url}")
        time.sleep(2)
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.content, 'html.parser')
        
        content_div = soup.find('div', class_='item-page')
        if not content_div:
            print(f"  ⚠️  No item-page div found")
            article = soup.find('article')
            if article:
                content_div = article
                print(f"  ℹ️  Using article tag instead")
            else:
                print(f"  ❌ No content container found")
                return None
        
        title = f"July {day}"
        
        saints = ""
        hymns = ""
        reflection = ""
        contemplation = ""
        homily = ""
        
        all_text = content_div.get_text()
        print(f"  ℹ️  Found {len(all_text)} characters of text")
        
        current_section = None
        current_text = []
        
        for element in content_div.find_all(['h3', 'h4', 'p', 'div']):
            if element.name in ['h3', 'h4']:
                if current_section and current_text:
                    text = '\n\n'.join(current_text)
                    if current_section == 'saints':
                        saints = text
                    elif current_section == 'hymns':
                        hymns = text
                    elif current_section == 'reflection':
                        reflection = text
                    elif current_section == 'contemplation':
                        contemplation = text
                    elif current_section == 'homily':
                        homily = text
                    current_text = []
                
                header_text = element.get_text(strip=True).lower()
                if 'saint' in header_text or 'venerable' in header_text or 'holy' in header_text or 'hieromartyr' in header_text or 'martyr' in header_text:
                    current_section = 'saints'
                    print(f"    Found saints section")
                elif 'hymn' in header_text:
                    current_section = 'hymns'
                    print(f"    Found hymns section")
                elif 'reflection' in header_text:
                    current_section = 'reflection'
                    print(f"    Found reflection section")
                elif 'contemplation' in header_text:
                    current_section = 'contemplation'
                    print(f"    Found contemplation section")
                elif 'homily' in header_text:
                    current_section = 'homily'
                    print(f"    Found homily section")
            
            elif element.name == 'p' and current_section:
                text = element.get_text(strip=True)
                if text and len(text) > 10:
                    current_text.append(text)
        
        if current_section and current_text:
            text = '\n\n'.join(current_text)
            if current_section == 'saints':
                saints = text
            elif current_section == 'hymns':
                hymns = text
            elif current_section == 'reflection':
                reflection = text
            elif current_section == 'contemplation':
                contemplation = text
            elif current_section == 'homily':
                homily = text
        
        entry = {
            "title": title,
            "saints": saints,
            "hymns": hymns,
            "reflection": reflection,
            "contemplation": contemplation,
            "homily": homily
        }
        
        if not saints and not hymns and not reflection:
            print(f"  ⚠️  Entry appears empty, skipping...")
            return None
        
        return entry
        
    except requests.exceptions.RequestException as e:
        print(f"  ❌ Error fetching {url}: {str(e)}")
        return None

def save_entry(entry, day):
    month_folder = "../data/entries/07"
    os.makedirs(month_folder, exist_ok=True)
    
    filename = f"{month_folder}/07-{day:02d}.json"
    
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(entry, f, indent=2, ensure_ascii=False)
    
    print(f"  ✅ Saved {filename}")

print("\n" + "="*60)
print("SCRAPING JULY 2-28")
print("="*60 + "\n")

article_id = 557

for day in range(2, 29):
    print(f"\n📅 Scraping July {day} (Article {article_id})...")
    
    entry = scrape_entry(article_id, day)
    
    if entry:
        save_entry(entry, day)
    
    article_id += 1
    
    if day == 10:
        print(f"\n⏸️  Pausing for 1 minute after July 10...\n")
        time.sleep(60)
    elif day == 20:
        print(f"\n⏸️  Pausing for 1 minute after July 20...\n")
        time.sleep(60)

print("\n" + "="*60)
print("✅ JULY SCRAPING COMPLETED!")
print("="*60)

