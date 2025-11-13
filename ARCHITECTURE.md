Here’s your lean, high-impact launch plan in Markdown format—optimized for speed, simplicity, and cleanliness:

⸻


# 📜 ochrid.com — Build Instructions

A clean, fast, devotional site to host the *Prologue from Ohrid* with optional Orthocal integration and a support button.

---

## ✅ Overview

- **Goal**: Serve daily *Prologue* entries in a beautiful, fast, no-bloat format.
- **Stack**: 
  - Frontend: Next.js (or Astro if preferred)
  - Hosting: Vercel (or Netlify)
  - Data: Static JSON (`prologue.json`)
  - Optional API: Orthocal.info (for readings + commemorations)
- **Monetization**: Single `Support this project` button via Buy Me a Coffee or Ko-fi

---

## 📁 Folder Structure

ochrid.com/
│
├── public/
│   └── favicon.ico
│
├── data/
│   └── prologue.json
│
├── pages/
│   ├── index.tsx              # Redirect to today
│   └── [date].tsx             # Daily view (e.g. /01-01)
│
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Entry.tsx              # Renders one day’s entry
│
├── utils/
│   └── date.ts                # Get today’s MM-DD
│
├── .env.local                 # Optional: Orthocal API key
├── package.json
└── README.md

---

## ⚙️ Step-by-Step Build

### ~~1. 🧱 Scaffold the Project~~ ✅

~~```bash
npx create-next-app@latest ochrid.com --typescript
cd ochrid.com
npm install~~

~~Or use Astro or SvelteKit if you prefer a leaner static site.~~

⸻

### ~~2. 📜 Scrape & Structure the Prologue~~ ✅

~~Use Python + BeautifulSoup to scrape from:
https://web.archive.org/web/20230606062113/https://www.rocor.org/files/Ochrid/index.html~~

~~Structure result as:~~

~~{
  "01-01": {
    "title": "January 1",
    "saints": "...",
    "hymns": "...",
    "reflection": "...",
    "homily": "..."
  },
  ...
}~~

~~Save to data/prologue.json.~~ **SCRAPING IN PROGRESS...**

⸻

### ~~3. 🧠 Add Utility Functions~~ ✅

// utils/date.ts
export function getTodayKey(): string {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  return `${mm}-${dd}`;
}


⸻

### ~~4. 🌅 Daily Entry Page~~ ✅

// pages/[date].tsx
import data from '../data/prologue.json';
import { useRouter } from 'next/router';

export default function DayPage() {
  const { query } = useRouter();
  const entry = data[query.date as string];

  if (!entry) return <p>Not found.</p>;

  return (
    <main>
      <h1>{entry.title}</h1>
      <section><h2>Saints</h2><p>{entry.saints}</p></section>
      <section><h2>Hymns</h2><p>{entry.hymns}</p></section>
      <section><h2>Reflection</h2><p>{entry.reflection}</p></section>
      <section><h2>Homily</h2><p>{entry.homily}</p></section>
    </main>
  );
}


⸻

### ~~5. 🔁 Redirect / to today~~ ✅

// pages/index.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getTodayKey } from '../utils/date';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`/${getTodayKey()}`);
  }, []);
  return null;
}


⸻

### ~~6. 💸 Add Support Button~~ ✅

Use Ko-fi or BuyMeACoffee:

// components/Footer.tsx
export default function Footer() {
  return (
    <footer>
      <a href="https://buymeacoffee.com/yourname" target="_blank" rel="noopener noreferrer">
        Support this project ☕
      </a>
    </footer>
  );
}


⸻

### 7. 🌐 Deploy It
	•	Push to GitHub
	•	Deploy via Vercel or Netlify
	•	Connect domain: ochrid.com

⸻

🕯️ Optional Enhancements (Post-launch)
	•	~~🔄 Orthocal API (commemorations, readings)~~ ✅ **COMPLETED**
	•	🔍 Add lightweight fuzzy search by saint name or phrase
	•	📥 Daily email digests (use Resend, ConvertKit, or Buttondown)
	•	🖼️ Add iconography for each major saint
	•	📦 Export daily entry as PDF
	•	📖 Yearly physical print edition of all entries

⸻

🙏 Final Notes
	•	Make it load instantly.
	•	Make it beautiful and reverent.
	•	Make it feel like opening an old, well-loved prayer book.

⸻

Soli Deo gloria.