"use client";

import Link from "next/link";
import { getNextDate, getPrevDate, formatJulianGregorianDisplay } from "@/utils/date";

type DateNavigatorProps = {
  currentDate: string;
};

export default function DateNavigator({ currentDate }: DateNavigatorProps) {
  const prevDate = getPrevDate(currentDate);
  const nextDate = getNextDate(currentDate);

  return (
    <div className="w-full md:w-3/5 mx-auto px-4 md:px-0 flex justify-between items-center pb-6">
      <Link
        href={`/readings/${prevDate}`}
        className="text-sm text-burgundy hover:text-gold transition-colors flex items-center gap-1"
      >
        <span>←</span>
        <span className="hidden sm:inline">Previous</span>
      </Link>

      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-burgundy/50 mb-1">Reading for</p>
        <p className="font-semibold text-burgundy">{formatJulianGregorianDisplay(currentDate)}</p>
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

