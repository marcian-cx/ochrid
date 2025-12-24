"use client";

import Link from "next/link";
import { getNextDate, getPrevDate, getJulianDateKey, formatDateDisplay } from "@/utils/date";
import { useCalendar } from "@/lib/CalendarContext";

type DateNavigatorProps = {
  currentDate: string;
};

export default function DateNavigator({ currentDate }: DateNavigatorProps) {
  const prevDate = getPrevDate(currentDate);
  const nextDate = getNextDate(currentDate);
  const { mode, setMode } = useCalendar();

  const julianDate = getJulianDateKey(currentDate);
  const julianDisplay = formatDateDisplay(julianDate);
  const gregorianDisplay = formatDateDisplay(currentDate);

  return (
    <div className="w-full md:w-4/5 toggle:w-3/5 mx-auto px-4 md:px-0 flex justify-between items-center pb-2">
      <Link
        href={`/readings/${prevDate}`}
        className="text-sm text-burgundy hover:text-gold transition-colors flex items-center gap-1"
      >
        <span>←</span>
        <span className="hidden sm:inline">Previous</span>
      </Link>

      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-burgundy/50 mb-1">Reading for</p>
        <p className="font-semibold text-burgundy">
          <span
            onClick={() => setMode("julian")}
            className={`cursor-pointer transition-all ${
              mode === "julian"
                ? "text-burgundy"
                : "text-burgundy/40 hover:text-burgundy/60"
            }`}
            style={mode === "julian" ? { textShadow: "0 0 8px rgba(212, 165, 165, 0.4)" } : {}}
          >
            {julianDisplay}
          </span>
          {" / "}
          <span
            onClick={() => setMode("gregorian")}
            className={`cursor-pointer transition-all ${
              mode === "gregorian"
                ? "text-burgundy"
                : "text-burgundy/40 hover:text-burgundy/60"
            }`}
            style={mode === "gregorian" ? { textShadow: "0 0 8px rgba(212, 165, 165, 0.4)" } : {}}
          >
            {gregorianDisplay}
          </span>
        </p>
      </div>

      <Link
        href={`/readings/${nextDate}`}
        className="text-sm text-burgundy hover:text-gold transition-colors flex items-center gap-1"
      >
        <span className="hidden sm:inline">Next</span>
        <span>→</span>
      </Link>
    </div>
  );
}
