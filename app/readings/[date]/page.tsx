import { readFile } from "fs/promises";
import { join } from "path";
import ReadingPageClient from "./ReadingPageClient";
import { fetchOrthocalByDate } from "@/lib/orthocal";
import { getJulianDateKey, formatJulianGregorianDisplay } from "@/utils/date";

async function getContentForDate(dateKey: string, language: "english" | "serbian"): Promise<string | null> {
  try {
    const [month] = dateKey.split('-');
    const filePath = join(process.cwd(), 'data', language, month, `${dateKey}.md`);
    try {
      return await readFile(filePath, 'utf-8');
    } catch {
      const filePathWithoutExt = join(process.cwd(), 'data', language, month, dateKey);
      return await readFile(filePathWithoutExt, 'utf-8');
    }
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  const allDates: { date: string }[] = [];
  const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
  for (let month = 1; month <= 12; month++) {
    const monthStr = month.toString().padStart(2, '0');
    for (let day = 1; day <= daysInMonth[month - 1]; day++) {
      const dayStr = day.toString().padStart(2, '0');
      allDates.push({ date: `${monthStr}-${dayStr}` });
    }
  }
  
  return allDates;
}

export default async function DayPage({ params }: { params: { date: string } }) {
  const gregorianDate = params.date;
  const julianDate = getJulianDateKey(gregorianDate);

  const [julianEnglish, julianSerbian, gregorianEnglish, gregorianSerbian, julianOrthocal] = await Promise.all([
    getContentForDate(julianDate, "english"),
    getContentForDate(julianDate, "serbian"),
    getContentForDate(gregorianDate, "english"),
    getContentForDate(gregorianDate, "serbian"),
    fetchOrthocalByDate(gregorianDate),
  ]);

  return (
    <ReadingPageClient
      gregorianDate={gregorianDate}
      julianDate={julianDate}
      julianEnglish={julianEnglish}
      julianSerbian={julianSerbian}
      gregorianEnglish={gregorianEnglish}
      gregorianSerbian={gregorianSerbian}
      initialOrthocal={julianOrthocal}
    />
  );
}

export async function generateMetadata({ params }: { params: { date: string } }) {
  const julianDate = getJulianDateKey(params.date);
  const content = await getContentForDate(julianDate, "english");
  
  if (!content) {
    return {
      title: "Reading Not Found",
    };
  }

  const displayDate = formatJulianGregorianDisplay(params.date);
  
  const lines = content.split('\n');
  const firstHeading = lines.find(line => line.startsWith('## '))?.replace('## ', '') || '';
  const saintName = firstHeading.replace(/^\d+\.\s*/, '');
  
  const preview = content.substring(0, 200).replace(/[#*\n]/g, ' ').replace(/\s+/g, ' ').trim();

  const title = saintName 
    ? `${displayDate} - ${saintName} | Prologue from Ochrid`
    : `${displayDate} | Prologue from Ochrid - St. Nikolai Velimirović`;
    
  const description = `Prologue from Ochrid for ${displayDate}. ${preview.substring(0, 150)}...`;

  return {
    title,
    description,
    keywords: [
      "Prologue from Ochrid",
      displayDate,
      saintName,
      "St. Nikolai Velimirovic",
      "Orthodox daily reading",
      "Lives of the Saints",
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://ochrid.com/readings/${params.date}`,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    alternates: {
      canonical: `https://ochrid.com/readings/${params.date}`,
    },
  };
}
