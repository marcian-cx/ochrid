import { notFound } from "next/navigation";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import ReadingContent from "@/components/ReadingContent";
import DateNavigator from "@/components/DateNavigator";
import OrthocalInfo from "@/components/OrthocalInfo";
import FastingBanner from "@/components/FastingBanner";
import { fetchOrthocalByDate } from "@/lib/orthocal";
import { getJulianDateKey, formatJulianGregorianDisplay } from "@/utils/date";

type PrologueEntry = {
  title: string;
  saints?: string;
  hymns?: string;
  reflection?: string;
  homily?: string;
  contemplation?: string;
};

async function getEnglishEntry(gregorianDate: string): Promise<PrologueEntry | null> {
  try {
    const julianDate = getJulianDateKey(gregorianDate);
    const [month, day] = julianDate.split('-');
    const filePath = join(process.cwd(), 'data', 'entries', month, `${julianDate}.json`);
    const fileContent = await readFile(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch {
    return null;
  }
}

async function getEnglish2Content(gregorianDate: string): Promise<string | null> {
  try {
    const julianDate = getJulianDateKey(gregorianDate);
    const [month, day] = julianDate.split('-');
    const filePath = join(process.cwd(), 'data', 'english', month, `${julianDate}.md`);
    const fileContent = await readFile(filePath, 'utf-8');
    return fileContent;
  } catch {
    return null;
  }
}

async function getSerbianContent(gregorianDate: string): Promise<string | null> {
  try {
    const julianDate = getJulianDateKey(gregorianDate);
    const [month, day] = julianDate.split('-');
    const filePath = join(process.cwd(), 'data', 'serbian', month, `${julianDate}.md`);
    const fileContent = await readFile(filePath, 'utf-8');
    return fileContent;
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const entriesDir = join(process.cwd(), 'data', 'entries');
    const months = await readdir(entriesDir);
    const allDates: { date: string }[] = [];
    
    for (const month of months) {
      if (month.startsWith('.')) continue;
      
      const monthPath = join(entriesDir, month);
      const files = await readdir(monthPath);
      
      files
        .filter(file => file.endsWith('.json'))
        .forEach(file => {
          allDates.push({ date: file.replace('.json', '') });
        });
    }
    
    return allDates;
  } catch {
    return [];
  }
}

export default async function DayPage({ params }: { params: { date: string } }) {
  const englishEntry = await getEnglishEntry(params.date);
  const english2Content = await getEnglish2Content(params.date);
  const serbianContent = await getSerbianContent(params.date);

  if (!englishEntry) {
    notFound();
  }

  const orthocalData = await fetchOrthocalByDate(params.date);

  return (
    <div>
      <DateNavigator currentDate={params.date} />
      <FastingBanner data={orthocalData} />
      <ReadingContent 
        englishEntry={englishEntry}
        english2Content={english2Content}
        serbianContent={serbianContent}
        currentDate={params.date}
      />
      <OrthocalInfo data={orthocalData} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { date: string } }) {
  const entry = await getEnglishEntry(params.date);
  
  if (!entry) {
    return {
      title: "Not Found",
    };
  }

  const displayDate = formatJulianGregorianDisplay(params.date);

  return {
    title: `${displayDate} - OCHRID`,
    description: entry.saints?.substring(0, 160) || "Daily Orthodox reading from OCHRID",
  };
}

