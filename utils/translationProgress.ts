import fs from "fs";
import path from "path";

export interface DayProgress {
  month: string;
  day: number;
  serbianPulled: boolean;
  serbianFormatted: boolean;
  englishTranslated: boolean;
  englishVerified: boolean;
}

export interface ProgressStats {
  totalDays: number;
  translatedCount: number;
  verifiedCount: number;
  daysByMonth: Record<string, DayProgress[]>;
}

const MONTH_MAP: Record<string, string> = {
  "Jan": "Jan",
  "Feb": "Feb",
  "Mar": "Mar",
  "Apr": "Apr",
  "May": "May",
  "Jun": "Jun",
  "Jul": "Jul",
  "Aug": "Aug",
  "Sep": "Sep",
  "Oct": "Oct",
  "Nov": "Nov",
  "Dec": "Dec",
};

function parseCheckbox(value: string): boolean {
  const trimmed = value.trim().toLowerCase();
  return trimmed === "[x]";
}

export function parseTranslationProgress(): ProgressStats {
  const filePath = path.join(process.cwd(), "data/english/translation_support/translation_progress.md");
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const days: DayProgress[] = [];

  for (const line of lines) {
    if (!line.startsWith("|") || line.includes("Day") || line.includes("---")) {
      continue;
    }

    const parts = line.split("|").map((p) => p.trim()).filter(Boolean);
    if (parts.length < 5) continue;

    const dayPart = parts[0];
    const monthMatch = dayPart.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d+)/);
    
    if (!monthMatch) continue;

    const month = MONTH_MAP[monthMatch[1]];
    const day = parseInt(monthMatch[2], 10);

    days.push({
      month,
      day,
      serbianPulled: parseCheckbox(parts[1]),
      serbianFormatted: parseCheckbox(parts[2]),
      englishTranslated: parseCheckbox(parts[3]),
      englishVerified: parseCheckbox(parts[4]),
    });
  }

  const daysByMonth: Record<string, DayProgress[]> = {};
  for (const d of days) {
    if (!daysByMonth[d.month]) {
      daysByMonth[d.month] = [];
    }
    daysByMonth[d.month].push(d);
  }

  for (const month in daysByMonth) {
    daysByMonth[month].sort((a, b) => a.day - b.day);
  }

  const translatedCount = days.filter((d) => d.englishTranslated || d.englishVerified).length;
  const verifiedCount = days.filter((d) => d.englishVerified).length;

  return {
    totalDays: days.length,
    translatedCount,
    verifiedCount,
    daysByMonth,
  };
}

export type TranslationStatus = "verified" | "translated" | null;

const MONTH_TO_NUM: Record<string, string> = {
  "Jan": "01",
  "Feb": "02",
  "Mar": "03",
  "Apr": "04",
  "May": "05",
  "Jun": "06",
  "Jul": "07",
  "Aug": "08",
  "Sep": "09",
  "Oct": "10",
  "Nov": "11",
  "Dec": "12",
};

export function getTranslationStatus(dateKey: string): TranslationStatus {
  const progress = parseTranslationProgress();
  const [monthNum, dayNum] = dateKey.split("-");
  
  const monthName = Object.entries(MONTH_TO_NUM).find(([, num]) => num === monthNum)?.[0];
  if (!monthName) return null;
  
  const dayProgress = progress.daysByMonth[monthName]?.find(d => d.day === parseInt(dayNum, 10));
  if (!dayProgress) return null;
  
  if (dayProgress.englishVerified) return "verified";
  if (dayProgress.englishTranslated) return "translated";
  return null;
}

