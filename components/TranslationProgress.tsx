"use client";

import { useState } from "react";

const MONTHS = [
  { name: "Jan", days: 31 },
  { name: "Feb", days: 29 },
  { name: "Mar", days: 31 },
  { name: "Apr", days: 30 },
  { name: "May", days: 31 },
  { name: "Jun", days: 30 },
  { name: "Jul", days: 31 },
  { name: "Aug", days: 31 },
  { name: "Sep", days: 30 },
  { name: "Oct", days: 31 },
  { name: "Nov", days: 30 },
  { name: "Dec", days: 31 },
];

interface DayStatus {
  translated: boolean;
  verified: boolean;
}

interface TranslationProgressProps {
  totalDays: number;
  translatedCount: number;
  verifiedCount: number;
  dayStatuses: Record<string, Record<number, DayStatus>>;
}

function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  const [show, setShow] = useState(false);

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-ink text-parchment text-[10px] leading-relaxed rounded shadow-lg whitespace-normal w-48 z-10 text-left normal-case tracking-normal">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink" />
        </div>
      )}
    </div>
  );
}

export default function TranslationProgress({ 
  totalDays, 
  translatedCount, 
  verifiedCount, 
  dayStatuses 
}: TranslationProgressProps) {
  const progressPercent = Math.round((translatedCount / totalDays) * 100);

  function getDayStatus(month: string, day: number): "verified" | "translated" | "pending" {
    const monthData = dayStatuses[month];
    if (!monthData) return "pending";
    const dayData = monthData[day];
    if (!dayData) return "pending";
    if (dayData.verified) return "verified";
    if (dayData.translated) return "translated";
    return "pending";
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="text-burgundy font-medium">{translatedCount} of {totalDays} days translated</span>
          <span className="text-burgundy/60">({progressPercent}%)</span>
        </div>
      </div>

      <div className="relative h-2 bg-burgundy/10 rounded-full overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full bg-burgundy/70 rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-4 sm:gap-3">
        {MONTHS.map((month) => (
          <div key={month.name} className="space-y-1">
            <div className="text-[10px] uppercase tracking-wider text-burgundy/60 font-medium text-center">
              {month.name}
            </div>
            <div className="grid grid-cols-7 gap-[2px]">
              {Array.from({ length: month.days }, (_, i) => {
                const day = i + 1;
                const status = getDayStatus(month.name, day);
                return (
                  <div
                    key={day}
                    className={`
                      w-[6px] h-[6px] rounded-[1px] transition-colors
                      ${status === "verified" ? "bg-burgundy" : ""}
                      ${status === "translated" ? "bg-burgundy/50" : ""}
                      ${status === "pending" ? "bg-burgundy/10" : ""}
                    `}
                    title={`${month.name} ${day}: ${status}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-6 text-[10px] uppercase tracking-wider text-burgundy/60 pt-2">
        <Tooltip text="A close reading has been performed for syntactic awkwardness and natural, hagiographic English style.">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-burgundy" />
            <span className="border-b border-dotted border-burgundy/40">Verified ({verifiedCount})</span>
          </div>
        </Tooltip>
        <Tooltip text="Translation is 95% complete but may include awkward phrases, sentence fragments, or other minor aesthetic issues.">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm bg-burgundy/50" />
            <span className="border-b border-dotted border-burgundy/40">Translated ({translatedCount - verifiedCount})</span>
          </div>
        </Tooltip>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-sm bg-burgundy/10" />
          <span>Pending</span>
        </div>
      </div>
    </div>
  );
}
