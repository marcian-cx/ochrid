"use client";

import { useEffect, useState } from "react";
import { CalendarProvider, useCalendar } from "@/lib/CalendarContext";
import DateNavigator from "@/components/DateNavigator";
import FastingBanner from "@/components/FastingBanner";
import ReadingContent from "@/components/ReadingContent";
import OrthocalInfo from "@/components/OrthocalInfo";
import { OrthocalDay, fetchOrthocalClient } from "@/lib/orthocal";

type ReadingPageClientProps = {
  gregorianDate: string;
  julianDate: string;
  julianEnglish: string | null;
  julianSerbian: string | null;
  gregorianEnglish: string | null;
  gregorianSerbian: string | null;
  initialOrthocal: OrthocalDay | null;
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
}: ReadingPageClientProps) {
  const { mode, getFromCache, setInCache } = useCalendar();
  const [orthocalData, setOrthocalData] = useState<OrthocalDay | null>(initialOrthocal);

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

  const serbianContent = mode === "julian" ? julianSerbian : gregorianSerbian;

  return (
    <div>
      <DateNavigator currentDate={gregorianDate} />
      <FastingBanner data={orthocalData} hasSerbianContent={!!serbianContent} />
      <ReadingContent
        gregorianDate={gregorianDate}
        julianDate={julianDate}
        julianEnglish={julianEnglish}
        julianSerbian={julianSerbian}
        gregorianEnglish={gregorianEnglish}
        gregorianSerbian={gregorianSerbian}
        orthocalData={orthocalData}
      />
    </div>
  );
}
