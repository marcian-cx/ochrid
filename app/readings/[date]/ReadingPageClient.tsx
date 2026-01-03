"use client";

import { useEffect, useState } from "react";
import { CalendarProvider, useCalendar } from "@/lib/CalendarContext";
import DateNavigator from "@/components/DateNavigator";
import FastingBanner from "@/components/FastingBanner";
import ReadingContent from "@/components/ReadingContent";
import { OrthocalDay, fetchOrthocalClient } from "@/lib/orthocal";
import { TranslationStatus } from "@/utils/translationProgress";

type ReadingPageClientProps = {
  gregorianDate: string;
  julianDate: string;
  julianEnglish: string | null;
  julianSerbian: string | null;
  gregorianEnglish: string | null;
  gregorianSerbian: string | null;
  initialOrthocal: OrthocalDay | null;
  julianTranslationStatus: TranslationStatus;
  gregorianTranslationStatus: TranslationStatus;
};

export default function ReadingPageClient(props: ReadingPageClientProps) {
  return (
    <CalendarProvider>
      <ReadingPageContent {...props} />
    </CalendarProvider>
  );
}

function ReadingPageContent({
  gregorianDate,
  julianDate,
  julianEnglish,
  julianSerbian,
  gregorianEnglish,
  gregorianSerbian,
  initialOrthocal,
  julianTranslationStatus,
  gregorianTranslationStatus,
}: ReadingPageClientProps) {
  const { mode, getFromCache, setInCache } = useCalendar();
  const [orthocalData, setOrthocalData] = useState<OrthocalDay | null>(initialOrthocal);

  const serbianContent = mode === "julian" ? julianSerbian : gregorianSerbian;
  const hasSerbianContent = !!serbianContent;

  useEffect(() => {
    if (mode === "julian") {
      setOrthocalData(initialOrthocal);
      return;
    }

    const cacheKey = `gregorian-${gregorianDate}`;
    const cached = getFromCache(cacheKey);
    
    if (cached !== undefined) {
      setOrthocalData(cached);
      return;
    }

    fetchOrthocalClient(gregorianDate, true).then((data) => {
      setInCache(cacheKey, data);
      setOrthocalData(data);
    });
  }, [mode, gregorianDate, initialOrthocal, getFromCache, setInCache]);

  return (
    <div>
      <DateNavigator currentDate={gregorianDate} />
      <FastingBanner data={orthocalData} hasSerbianContent={hasSerbianContent} />
      <ReadingContent
        gregorianDate={gregorianDate}
        julianDate={julianDate}
        julianEnglish={julianEnglish}
        julianSerbian={julianSerbian}
        gregorianEnglish={gregorianEnglish}
        gregorianSerbian={gregorianSerbian}
        orthocalData={orthocalData}
        julianTranslationStatus={julianTranslationStatus}
        gregorianTranslationStatus={gregorianTranslationStatus}
      />
    </div>
  );
}
