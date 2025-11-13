#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup

url = "https://web.archive.org/web/20170502034310/http://westserbdio.org/en/prologue/395-april-11"

print(f"Testing URL: {url}\n")

try:
    response = requests.get(url, timeout=15)
    print(f"Status: {response.status_code}")
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        title = soup.find('title')
        if title:
            print(f"Title: {title.get_text()}\n")
        
        content_area = soup.find('div', class_='item-page')
        if content_area:
            print("Found content area!")
            text = content_area.get_text(separator='\n', strip=True)
            print(f"\nFirst 500 chars:\n{text[:500]}\n")
        else:
            print("No content area found, trying body...")
            body = soup.find('body')
            if body:
                text = body.get_text(separator='\n', strip=True)
                print(f"\nFirst 500 chars:\n{text[:500]}\n")
                
except Exception as e:
    print(f"Error: {e}")

