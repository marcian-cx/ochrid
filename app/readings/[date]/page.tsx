import { notFound } from "next/navigation";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import Entry from "@/components/Entry";
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

async function getEntry(gregorianDate: string): Promise<PrologueEntry | null> {
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
  const entry = await getEntry(params.date);

  if (!entry) {
    notFound();
  }

  const orthocalData = await fetchOrthocalByDate(params.date);

  return (
    <div>
      <DateNavigator currentDate={params.date} />
      <FastingBanner data={orthocalData} />
      <Entry entry={entry} currentDate={params.date} />
      <OrthocalInfo data={orthocalData} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { date: string } }) {
  const entry = await getEntry(params.date);
  
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

