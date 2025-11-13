import requests
from bs4 import BeautifulSoup

url = "https://web.archive.org/web/20170502034310/http://westserbdio.org/en/prologue/557-july-2"

print(f"Testing URL: {url}\n")

try:
    response = requests.get(url, timeout=30)
    print(f"Status Code: {response.status_code}")
    
    soup = BeautifulSoup(response.content, 'html.parser')
    
    print(f"\nPage title: {soup.title.string if soup.title else 'No title'}")
    
    content_div = soup.find('div', class_='item-page')
    if content_div:
        print(f"\nFound item-page div!")
        print(f"Content length: {len(content_div.get_text())} characters")
        print(f"\nFirst 500 characters:")
        print(content_div.get_text()[:500])
    else:
        print("\nNo item-page div found")
        
    article = soup.find('article')
    if article:
        print(f"\nFound article tag!")
        print(f"Content length: {len(article.get_text())} characters")
        print(f"\nFirst 500 characters:")
        print(article.get_text()[:500])
    else:
        print("\nNo article tag found")
    
    h3_tags = soup.find_all('h3')
    print(f"\n\nFound {len(h3_tags)} h3 tags:")
    for h3 in h3_tags[:10]:
        print(f"  - {h3.get_text(strip=True)}")
    
    p_tags = soup.find_all('p')
    print(f"\nFound {len(p_tags)} p tags")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()

