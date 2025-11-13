# 📜 Prologue from Ohrid

A clean, fast, devotional site hosting daily readings from the *Prologue from Ohrid* by St. Nikolai Velimirović.

---

## ✨ Features

- **Daily Readings**: Automatic redirect to today's entry
- **Beautiful UI**: Reverent design with parchment tones and elegant typography
- **Fast & Static**: Built with Next.js 14 for optimal performance
- **Navigation**: Easy previous/next day browsing
- **Responsive**: Perfect on desktop, tablet, and mobile
- **Support Button**: Integrated Ko-fi/Buy Me a Coffee donation link

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data**: Static JSON
- **Deployment**: Vercel (recommended) or Netlify

---

## 🚀 Quick Start

### 1. Install Dependencies

\`\`\`bash
npm install
\`\`\`

### 2. Scrape the Prologue Data

First, install Python dependencies:

\`\`\`bash
pip install -r requirements.txt
\`\`\`

Then run the scraper:

\`\`\`bash
cd scripts
python3 scrape_prologue.py
\`\`\`

This will populate `data/prologue.json` with all daily entries from the archived ROCOR website.

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see the site.

### 4. Build for Production

\`\`\`bash
npm run build
\`\`\`

---

## 📁 Project Structure

\`\`\`
ochrid/
├── app/
│   ├── [date]/
│   │   └── page.tsx          # Dynamic daily entry pages
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home (redirects to today)
│   └── not-found.tsx          # 404 page
├── components/
│   ├── DateNavigator.tsx      # Prev/Next navigation
│   ├── Entry.tsx              # Entry display component
│   ├── Footer.tsx             # Footer with support button
│   └── Header.tsx             # Site header
├── data/
│   └── prologue.json          # All daily entries (generated)
├── scripts/
│   └── scrape_prologue.py     # Python scraper
├── utils/
│   └── date.ts                # Date utility functions
└── public/
    └── favicon.ico            # Site icon
\`\`\`

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy!

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Set build command: `npm run build`
5. Set publish directory: `out`
6. Deploy!

---

## 🎨 Customization

### Update Support Link

Edit `components/Footer.tsx` and replace the Buy Me a Coffee URL with your own:

\`\`\`tsx
<a href="https://buymeacoffee.com/YOUR_USERNAME" ...>
\`\`\`

### Customize Colors

Edit `tailwind.config.ts` to change the color scheme:

\`\`\`ts
colors: {
  parchment: "#f5f0e8",  // Background
  ink: "#2c2416",        // Text
  gold: "#d4af37",       // Accent
  burgundy: "#6b2a2a",   // Primary
}
\`\`\`

---

## 🕯️ Future Enhancements

- [ ] Orthocal API integration for commemorations
- [ ] Search functionality by saint name
- [ ] Daily email digests
- [ ] Saint iconography
- [ ] PDF export of daily entries
- [ ] Yearly print edition

---

## 🙏 Credits

Content: **St. Nikolai Velimirović** (1880-1956)

Original source: ROCOR archived website

---

**Soli Deo gloria** ✝

