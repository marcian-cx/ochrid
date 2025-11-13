#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup
import re
import json

INDEX_URL = "https://web.archive.org/web/20170502034310/http://westserbdio.org/en/prologue"

response = requests.get(INDEX_URL, timeout=15)
soup = BeautifulSoup(response.content, 'html.parser')

url_map = {}

for link in soup.find_all('a', href=True):
    href = link['href']
    match = re.search(r'/prologue/(\d+)-(january|february|march|april|may|june|july|august|september|october|november|december)-(\d+)', href.lower())
    if match:
        article_id = match.group(1)
        month_name = match.group(2)
        day = int(match.group(3))
        
        month_num = {
            'january': 1, 'february': 2, 'march': 3, 'april': 4,
            'may': 5, 'june': 6, 'july': 7, 'august': 8,
            'september': 9, 'october': 10, 'november': 11, 'december': 12
        }[month_name]
        
        date_key = f"{month_num:02d}-{day:02d}"
        
        url_map[date_key] = {
            'article_id': article_id,
            'url': f"https://web.archive.org/web/20170502034310/http://westserbdio.org{href}",
            'month': month_name.capitalize(),
            'day': day
        }

print(json.dumps(url_map, indent=2))
print(f"\n\nTotal URLs found: {len(url_map)}")

