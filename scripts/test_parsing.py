import requests
from bs4 import BeautifulSoup
import re

url = "https://web.archive.org/web/20170502034310/http://westserbdio.org/en/prologue/557-july-2"

response = requests.get(url, timeout=30)
soup = BeautifulSoup(response.content, 'html.parser')

content_div = soup.find('div', class_='item-page')
all_paragraphs = content_div.find_all('p')

print(f"Found {len(all_paragraphs)} paragraphs\n")

full_text = '\n\n'.join([p.get_text(strip=True) for p in all_paragraphs if p.get_text(strip=True)])

print(f"Full text length: {len(full_text)} characters\n")
print("="*60)
print("FULL TEXT:")
print("="*60)
print(full_text[:2000])
print("\n... (truncated)")
print("="*60)

# Check for section markers
markers = ['HYMN OF PRAISE', 'REFLECTION', 'CONTEMPLATION', 'HOMILY']
print("\nSection markers found:")
for marker in markers:
    if marker in full_text:
        pos = full_text.index(marker)
        print(f"  ✅ {marker} at position {pos}")
    else:
        print(f"  ❌ {marker} NOT FOUND")

