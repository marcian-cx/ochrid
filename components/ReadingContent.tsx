"use client";

import MarkdownEntry from "./MarkdownEntry";
import { useCalendar } from "@/lib/CalendarContext";
import { formatDateDisplay } from "@/utils/date";
import { OrthocalDay } from "@/lib/orthocal";

type ReadingContentProps = {
  gregorianDate: string;
  julianDate: string;
  julianEnglish: string | null;
  julianSerbian: string | null;
  gregorianEnglish: string | null;
  gregorianSerbian: string | null;
  orthocalData: OrthocalDay | null;
};

export default function ReadingContent({ 
  gregorianDate,
  julianDate,
  julianEnglish, 
  julianSerbian,
  gregorianEnglish,
  gregorianSerbian,
  orthocalData,
}: ReadingContentProps) {
  const { mode, language } = useCalendar();

  const englishContent = mode === "julian" ? julianEnglish : gregorianEnglish;
  const serbianContent = mode === "julian" ? julianSerbian : gregorianSerbian;
  const currentDate = mode === "julian" ? julianDate : gregorianDate;
  const dateDisplay = formatDateDisplay(currentDate);
  const hasSerbianContent = !!serbianContent;

  if (!englishContent) {
    return (
      <div className="w-full md:w-3/5 mx-auto px-4 md:px-0">
        <div className="mb-12">
          <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-burgundy mb-0">Prologue from Ochrid</h1>
          <p className="text-xs uppercase tracking-widest text-burgundy/50">{dateDisplay}</p>
        </div>
        <div className="text-center py-12">
          <p className="text-lg text-burgundy/70 mb-2">Translation in progress</p>
          <p className="text-sm text-ink/60">This entry has not yet been translated. Please check back later.</p>
        </div>
      </div>
    );
  }

  if (language === "english") {
    return (
      <MarkdownEntry
        content={englishContent}
        currentDate={currentDate}
        dateDisplay={dateDisplay}
        subtitle="Prologue from Ochrid"
        hasSerbianContent={hasSerbianContent}
        orthocalData={orthocalData}
      />
    );
  }

  if (language === "serbian") {
    if (!serbianContent) {
      return (
        <div className="w-full md:w-3/5 mx-auto px-4 md:px-0">
          <p className="text-burgundy/70">Serbian translation not available for this date.</p>
        </div>
      );
    }
    return (
      <MarkdownEntry
        content={serbianContent}
        currentDate={currentDate}
        dateDisplay={dateDisplay}
        subtitle="Пролог из Охрида"
        hasSerbianContent={hasSerbianContent}
        orthocalData={orthocalData}
      />
    );
  }

  return null;
}
