"use client";

import { OrthocalDay } from "@/lib/orthocal";

type FastingBannerProps = {
  data: OrthocalDay | null;
};

export default function FastingBanner({ data }: FastingBannerProps) {
  if (!data) {
    return null;
  }

  return (
    <div className="w-full md:w-3/5 mx-auto px-4 md:px-0 flex items-baseline justify-between mb-8 pb-3 border-b border-ink/10">
      <div className="flex items-baseline gap-3">
        <span className="text-xs uppercase tracking-wide text-burgundy/80 font-semibold">{data.fast_level_desc}</span>
      </div>
      <div className="text-xs text-ink/50 hidden sm:block">
        {data.summary_title}
      </div>
    </div>
  );
}

