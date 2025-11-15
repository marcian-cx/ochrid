# 🕯️ Orthocal API Integration

This document explains how the Orthocal.info API integration works in the Prologue from Ochrid website.

---

## Overview

The Orthocal API provides daily Orthodox Christian calendar data including:
- **Fasting guidelines** (No Fast, Wine & Oil, Fish Allowed, Xerophagy, Strict Fast)
- **Scripture readings** (Daily Epistle and Gospel readings with full text)
- **Commemorations** (Saints and feast days)
- **Stories** (Hagiographies and feast descriptions)

---

## Service Layer (`lib/orthocal.ts`)

### Functions

#### `fetchOrthocalToday()`
Fetches today's Orthodox calendar data.

```typescript
const today = await fetchOrthocalToday();
```

#### `fetchOrthocalByDate(dateKey: string)`
Fetches calendar data for a specific date (MM-DD format).

```typescript
const data = await fetchOrthocalByDate("01-01");
```

#### `fetchOrthocalDay(year?, month?, day?)`
Low-level function to fetch data for any date.

```typescript
const data = await fetchOrthocalDay(2024, 12, 25);
```

### Helper Functions

#### `getFastingEmoji(fastLevel: number)`
Returns emoji representation of fasting level.

```typescript
const emoji = getFastingEmoji(4);
```

#### `getFastingColor(fastLevel: number)`
Returns color code for fasting level visualization.

```typescript
const color = getFastingColor(2);
```

---

## Component (`components/OrthocalInfo.tsx`)

The `OrthocalInfo` component displays the fetched Orthocal data in a beautiful, reverent format.

### Features

- **Fasting Level Display**: Shows current fasting guidelines with color coding
- **Commemorations List**: Lists all saints and feasts for the day
- **Scripture Readings**: Displays abbreviated readings (first 3 verses) with full reference
- **Saints & Feasts**: Shows stories and hagiographies (first 2, with count of remaining)

### Usage

```typescript
import OrthocalInfo from "@/components/OrthocalInfo";
import { fetchOrthocalByDate } from "@/lib/orthocal";

const orthocalData = await fetchOrthocalByDate("12-25");

<OrthocalInfo data={orthocalData} />
```

---

## Data Types

### `OrthocalDay`

```typescript
{
  date: string;
  year: number;
  month: number;
  day: number;
  summary_title: string;
  fast_level: number;
  fast_level_desc: FastingLevel;
  fast_exception_desc: string;
  commemorations: string[];
  readings: Reading[];
  stories: Story[];
}
```

### `Reading`

```typescript
{
  display: string;
  short: string;
  source: string;
  passage: Array<{
    verse: string;
    content: string;
  }>;
}
```

### `Story`

```typescript
{
  title: string;
  story: string;
  icon?: string;
  feast_name?: string;
  feast_level?: number;
}
```

---

## API Details

### Base URL
```
https://orthocal.info/api/julian
```

### Endpoints

- **Today's data**: `GET /api/julian/`
- **Specific date**: `GET /api/julian/{year}/{month}/{day}/`
- **RSS Feed**: `GET /api/feed/julian/`
- **iCal Feed**: `GET /api/julian/ical/`

### Julian Calendar

The application uses the Julian calendar (Old Calendar) for all Orthodox readings and commemorations. When displaying dates, both Julian and Gregorian dates are shown (e.g., "October 31 / November 13").

### Caching

The service uses Next.js built-in caching with 1-hour revalidation:

```typescript
fetch(url, {
  next: { revalidate: 3600 }
})
```

---

## Integration in Daily Pages

Each daily Prologue page (`app/[date]/page.tsx`) automatically fetches and displays:

1. **Prologue from Ochrid** entry (saints, hymns, reflection, homily)
2. **Orthocal calendar data** (fasting, readings, commemorations)

This provides a complete Orthodox devotional experience for each day.

---

## Example Response

```json
{
  "date": "2024-11-13",
  "summary_title": "St. John Chrysostom",
  "fast_level": 1,
  "fast_level_desc": "Wine & Oil",
  "fast_exception_desc": "Wine and oil are allowed.",
  "commemorations": [
    "St. John Chrysostom, Archbishop of Constantinople",
    "Venerable Nikon the Metanoeite"
  ],
  "readings": [
    {
      "display": "Hebrews 7:26-8:2",
      "passage": [
        {
          "verse": "7:26",
          "content": "For such a high priest was fitting for us..."
        }
      ]
    }
  ]
}
```

---

## Error Handling

The service gracefully handles errors:
- Returns `null` if API is unavailable
- Component only renders if data is present
- User sees Prologue content even if Orthocal data fails

---

**Soli Deo gloria** ✝

