"use client";

import { useCalendar } from "@/lib/CalendarContext";
import { OrthocalDay } from "@/lib/orthocal";

type FastingBannerProps = {
  data: OrthocalDay | null;
  hasSerbianContent?: boolean;
};

function formatFastException(desc: string): string {
  if (!desc || desc === "No overrides") return "strict fast";
  if (desc === "Fast Free") return "fast free";
  if (desc === "Wine is Allowed") return "wine";
  if (desc === "Wine and Oil are Allowed") return "wine and oil";
  if (desc === "Wine, Oil and Caviar are Allowed") return "wine, oil and caviar";
  if (desc === "Fish, Wine and Oil are Allowed") return "fish, wine and oil";
  return desc.toLowerCase();
}

function getMobileDisplay(data: OrthocalDay): string {
  const level = data.fast_level_desc.toLowerCase();
  if (level === "no fast") return "no fast";
  return formatFastException(data.fast_exception_desc);
}

function getDesktopDisplay(data: OrthocalDay): string {
  const level = data.fast_level_desc.toLowerCase();
  const exception = formatFastException(data.fast_exception_desc);
  
  if (level === "no fast") return "no fast";
  
  return `${level} · ${exception}`;
}

export default function FastingBanner({ data, hasSerbianContent = false }: FastingBannerProps) {
  const { language, setLanguage } = useCalendar();

  if (!data) {
    return null;
  }

  return (
    <div className="w-full md:w-4/5 lg:w-3/5 mx-auto px-4 md:px-0 flex items-center justify-between mb-6 pb-1 border-b border-ink/10">
      <span className="text-xs uppercase tracking-wide text-burgundy/80 font-semibold md:hidden">{getMobileDisplay(data)}</span>
      <span className="text-xs uppercase tracking-wide text-burgundy/80 font-semibold hidden md:block">{getDesktopDisplay(data)}</span>
      <div className="flex items-center gap-3">
        <div className="flex sm:hidden items-center gap-1 border border-burgundy/30 rounded-md p-0.5">
          <button
            onClick={() => setLanguage("english")}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              language === "english"
                ? "bg-burgundy text-parchment"
                : "text-burgundy hover:bg-burgundy/10"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage("serbian")}
            disabled={!hasSerbianContent}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              language === "serbian"
                ? "bg-burgundy text-parchment"
                : hasSerbianContent
                ? "text-burgundy hover:bg-burgundy/10"
                : "text-burgundy/30 cursor-not-allowed"
            }`}
          >
            Српски
          </button>
        </div>
        <span className="text-xs text-ink/50 hidden lg:block">{data.summary_title}</span>
      </div>
    </div>
  );
}
