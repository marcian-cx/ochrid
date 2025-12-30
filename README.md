# 📜 Prologue from Ochrid

A clean, fast, devotional site hosting daily readings from the *Prologue from Ochrid* by St. Nikolai Velimirović.

---

## ✨ Features

- **Daily Readings**: Lives of Saints, Hymns, Reflections, and Homilies for every day of the year
- **Scripture Integration**: Daily scripture readings via Orthocal.info API
- **Dual Calendar Support**: Toggle between Julian (Old Calendar) and Gregorian (New Calendar) dates
- **Bilingual Content**: English translations with Serbian originals
- **Morning & Evening Prayers**: Traditional Orthodox prayer cycles with audio
- **Beautiful UI**: Reverent design with parchment tones and elegant typography
- **Fast & Static**: Built with Next.js 14 for optimal performance
- **Responsive**: Perfect on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data**: Markdown files, JSON
- **External API**: Orthocal.info for liturgical calendar data
- **Deployment**: Netlify

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the site.

### 3. Build for Production

```bash
npm run build
```

This generates a static export in the `out/` directory.

---

## 📁 Project Structure

```
ochrid/
├── app/
│   ├── about/                 # About page with translation progress
│   ├── donate/                # Support page
│   ├── prayers/               # Morning & evening prayers
│   ├── readings/[date]/       # Dynamic daily reading pages
│   ├── globals.css            # Global styles
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home (redirects to today)
│   └── not-found.tsx          # 404 page
├── components/
│   ├── DateNavigator.tsx      # Date navigation & calendar toggle
│   ├── FastingBanner.tsx      # Fasting information display
│   ├── Footer.tsx             # Site footer
│   ├── Header.tsx             # Site header
│   ├── MarkdownEntry.tsx      # Prologue entry renderer
│   ├── OrthocalInfo.tsx       # Scripture readings & commemorations
│   ├── ReadingContent.tsx     # Reading display logic
│   ├── TranslationProgress.tsx # Translation calendar view
│   └── WhatsNewModal.tsx      # Changelog modal
├── data/
│   ├── changes/               # Version changelog markdown files
│   ├── english/               # English Prologue translations (markdown)
│   ├── serbian/               # Serbian Prologue originals (markdown)
│   ├── prayers/               # Morning & evening prayer JSON
│   └── references/            # Reference materials
├── lib/
│   ├── CalendarContext.tsx    # Calendar mode state management
│   └── orthocal.ts            # Orthocal API integration
├── utils/
│   ├── changelog.ts           # Changelog utilities
│   ├── date.ts                # Date utility functions
│   └── translationProgress.ts # Translation tracking
└── public/
    ├── ochrid_favicon.png     # Site icon
    └── morning_prayers.mp3    # Audio prayer file
```

---

## 🌐 Deployment

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Import your repository
4. Set build command: `npm run build`
5. Set publish directory: `out`
6. Deploy!

The site is configured for static export and includes redirects for SPA routing.

---

## 🎨 Customization

### Customize Colors

Edit `tailwind.config.ts` to change the color scheme:

```ts
colors: {
  parchment: "#0a0a0a",    // Dark background
  ink: "#e8e8e8",          // Light text
  gold: "#e6c458",         // Accent gold
  burgundy: "#d4a5a5",     // Primary burgundy
}
```

### Adjust Responsive Breakpoints

Edit the `screens` configuration in `tailwind.config.ts`:

```ts
screens: {
  'toggle': '1024px',  // Toggle text breakpoint
}
```

---

## 📖 Content Management

### Adding/Editing Translations

Daily entries are stored as markdown files in:
- `data/english/[month]/[month]-[day].md`
- `data/serbian/[month]/[month]-[day].md`

Each file follows this structure:

```markdown
## 1. SAINT NAME

Saint biography and life story...

## HYMN OF PRAISE

Poetic hymn...

## REFLECTION

Spiritual reflection...

## CONTEMPLATION

Contemplative thoughts...

## HOMILY

Homiletical teaching...
```

### Adding Changelog Entries

Create a new markdown file in `data/changes/` following the format `[major]_[minor].md`:

```markdown
# Version X.Y

- Feature or change description
- Another change
```

---

## 🕯️ Future Enhancements

- [ ] Search functionality by saint name or date
- [ ] Audio recordings of daily readings
- [ ] Daily email/push notifications
- [ ] Print-friendly layouts
- [ ] Additional prayer collections
- [ ] Saint iconography integration

---

## 🙏 Credits

**Content**: St. Nikolai Velimirović (1880-1956)

**Translation**: Direct from Serbian original

**Liturgical Data**: [Orthocal.info](https://orthocal.info)

**License**: Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)

---

**Soli Deo gloria** ✝
