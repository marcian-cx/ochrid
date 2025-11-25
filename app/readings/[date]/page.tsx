import { notFound } from "next/navigation";
import { readdir, readFile } from "fs/promises";
import { join } from "path";
import ReadingContent from "@/components/ReadingContent";
import DateNavigator from "@/components/DateNavigator";
import OrthocalInfo from "@/components/OrthocalInfo";
import FastingBanner from "@/components/FastingBanner";
import { fetchOrthocalByDate } from "@/lib/orthocal";
import { getJulianDateKey, formatJulianGregorianDisplay } from "@/utils/date";

async function getEnglishContent(gregorianDate: string): Promise<string | null> {
  try {
    const julianDate = getJulianDateKey(gregorianDate);
    const [month, day] = julianDate.split('-');
    
    const filePathWithExt = join(process.cwd(), 'data', 'english', month, `${julianDate}.md`);
    try {
      const fileContent = await readFile(filePathWithExt, 'utf-8');
      return fileContent;
    } catch {
      const filePathWithoutExt = join(process.cwd(), 'data', 'english', month, julianDate);
      const fileContent = await readFile(filePathWithoutExt, 'utf-8');
      return fileContent;
    }
  } catch {
    return null;
  }
}

async function getSerbianContent(gregorianDate: string): Promise<string | null> {
  try {
    const julianDate = getJulianDateKey(gregorianDate);
    const [month, day] = julianDate.split('-');
    
    const filePathWithExt = join(process.cwd(), 'data', 'serbian', month, `${julianDate}.md`);
    try {
      const fileContent = await readFile(filePathWithExt, 'utf-8');
      return fileContent;
    } catch {
      const filePathWithoutExt = join(process.cwd(), 'data', 'serbian', month, julianDate);
      const fileContent = await readFile(filePathWithoutExt, 'utf-8');
      return fileContent;
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
  const englishContent = await getEnglishContent(params.date);
  const serbianContent = await getSerbianContent(params.date);
  const orthocalData = await fetchOrthocalByDate(params.date);

  return (
    <div>
      <DateNavigator currentDate={params.date} />
      <FastingBanner data={orthocalData} />
      {englishContent ? (
        <ReadingContent 
          englishContent={englishContent}
          serbianContent={serbianContent}
          currentDate={params.date}
        />
      ) : (
        <div className="w-full md:w-3/5 mx-auto px-4 md:px-0">
          <div className="mb-12">
            <h1 className="text-2xl font-bold uppercase tracking-wide text-burgundy">Prologue from Ochrid</h1>
          </div>
          <div className="text-center py-12">
            <p className="text-lg text-burgundy/70 mb-2">Translation in progress</p>
            <p className="text-sm text-ink/60">This entry has not yet been translated. Please check back later.</p>
          </div>
        </div>
      )}
      <OrthocalInfo data={orthocalData} />
    </div>
  );
}

export async function generateMetadata({ params }: { params: { date: string } }) {
  const content = await getEnglishContent(params.date);
  
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

