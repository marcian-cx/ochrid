import json
import re

def restructure_evening_prayers(prayers):
    new_prayers = []
    
    for prayer in prayers:
        title = prayer['title']
        content = prayer['prayer']
        
        if title == "Prayer of St. John Chrysostom":
            lines = content.split('\n')
            description = ""
            if lines[0].startswith('('):
                description = lines[0]
                lines = lines[1:]
            
            day_start = None
            night_start = None
            prayer_start = None
            
            for i, line in enumerate(lines):
                if line.strip() == "Day":
                    day_start = i
                elif line.strip() == "Night":
                    night_start = i
                elif line.strip() == "Prayer":
                    prayer_start = i
            
            sub_prayers = []
            
            if day_start is not None and night_start is not None:
                day_content = '\n'.join(lines[day_start+1:night_start]).strip()
                sub_prayers.append({
                    "title": "Day",
                    "prayer": day_content
                })
                
                if prayer_start is not None:
                    night_content = '\n'.join(lines[night_start+1:prayer_start]).strip()
                    sub_prayers.append({
                        "title": "Night",
                        "prayer": night_content
                    })
                    
                    prayer_title_line = lines[prayer_start+1].strip()
                    prayer_content = '\n'.join(lines[prayer_start+2:]).strip()
                    
                    if prayer_title_line.lower() in ['our lord jesus christ', 'to our lord jesus christ']:
                        prayer_title_line = "Prayer to Our Lord Jesus Christ"
                    else:
                        prayer_title_line = f"Prayer {prayer_title_line}"
                    
                    sub_prayers.append({
                        "title": prayer_title_line,
                        "prayer": prayer_content
                    })
                else:
                    night_content = '\n'.join(lines[night_start+1:]).strip()
                    sub_prayers.append({
                        "title": "Night",
                        "prayer": night_content
                    })
            
            new_prayers.append({
                "title": title,
                "prayers": sub_prayers
            })
        
        elif title == "Prayer of St. Macarius the Great" and content.startswith('to God the Father'):
            new_title = f"{title} to God the Father"
            new_content = content.replace('to God the Father\n', '', 1)
            new_prayers.append({
                "title": new_title,
                "prayer": new_content
            })
        
        elif title == "Prayer of St. Antioch" and content.startswith('to our Lord Jesus Christ'):
            new_title = f"{title} to Our Lord Jesus Christ"
            new_content = content.replace('to our Lord Jesus Christ\n', '', 1)
            new_prayers.append({
                "title": new_title,
                "prayer": new_content
            })
        
        elif title == "Prayer of St. Ephrem the Syrian":
            lines = content.split('\n')
            first_line = lines[0]
            
            if first_line.startswith('to the'):
                new_title = f"{title} {first_line}"
                lines = lines[1:]
            else:
                new_title = title
            
            text = '\n'.join(lines)
            
            prayer_sections = re.split(r'\n(Prayer)\n', text)
            
            if len(prayer_sections) > 1:
                main_prayer = prayer_sections[0].strip()
                sub_prayers = [{
                    "title": new_title,
                    "prayer": main_prayer
                }]
                
                for i in range(1, len(prayer_sections), 2):
                    if i+1 < len(prayer_sections):
                        sub_prayer_content = prayer_sections[i+1].strip()
                        sub_prayers.append({
                            "title": "Prayer",
                            "prayer": sub_prayer_content
                        })
                
                new_prayers.append({
                    "title": title,
                    "prayers": sub_prayers
                })
            else:
                new_prayers.append({
                    "title": new_title,
                    "prayer": text
                })
        
        elif title == "Prayer of Intercession":
            lines = content.split('\n')
            first_line = lines[0]
            
            if first_line.startswith('to '):
                new_title = f"{title} {first_line}"
                new_content = '\n'.join(lines[1:])
                new_prayers.append({
                    "title": new_title,
                    "prayer": new_content
                })
            else:
                new_prayers.append(prayer)
        
        else:
            new_prayers.append(prayer)
    
    return new_prayers

def restructure_morning_prayers(prayers):
    new_prayers = []
    
    for prayer in prayers:
        title = prayer['title']
        content = prayer['prayer']
        
        if title.lower() == 'prayer our lord jesus christ':
            new_prayers.append({
                "title": "Prayer to Our Lord Jesus Christ",
                "prayer": content
            })
        else:
            new_prayers.append(prayer)
    
    return new_prayers

with open('../data/prayers/evening_prayers.json', 'r', encoding='utf-8') as f:
    evening = json.load(f)

with open('../data/prayers/morning_prayers.json', 'r', encoding='utf-8') as f:
    morning = json.load(f)

evening_restructured = restructure_evening_prayers(evening)
morning_restructured = restructure_morning_prayers(morning)

with open('../data/prayers/evening_prayers.json', 'w', encoding='utf-8') as f:
    json.dump(evening_restructured, f, indent=2, ensure_ascii=False)

with open('../data/prayers/morning_prayers.json', 'w', encoding='utf-8') as f:
    json.dump(morning_restructured, f, indent=2, ensure_ascii=False)

print(f"Evening prayers: {len(evening_restructured)} sections")
for i, p in enumerate(evening_restructured):
    if 'prayers' in p:
        print(f"  {i+1}. {p['title']} - {len(p['prayers'])} sub-prayers")

print(f"\nMorning prayers: {len(morning_restructured)} sections")
for i, p in enumerate(morning_restructured):
    if 'prayers' in p:
        print(f"  {i+1}. {p['title']} - {len(p['prayers'])} sub-prayers")

print("\nDone!")

