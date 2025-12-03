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
      title: "Not Found",
    };
  }

  const displayDate = formatJulianGregorianDisplay(params.date);
  const preview = content.substring(0, 160).replace(/[#*\n]/g, ' ').trim();

  return {
    title: `${displayDate} - OCHRID`,
    description: preview || "Daily Orthodox reading from OCHRID",
  };
}
