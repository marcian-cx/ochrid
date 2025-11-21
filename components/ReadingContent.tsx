"use client";

import { useState } from "react";
import MarkdownEntry from "./MarkdownEntry";

type ReadingContentProps = {
  englishContent: string;
  serbianContent: string | null;
  currentDate: string;
};

export default function ReadingContent({ englishContent, serbianContent, currentDate }: ReadingContentProps) {
  const [language, setLanguage] = useState<"english" | "serbian">("english");

  const LanguageToggle = ({ activeLanguage }: { activeLanguage: "english" | "serbian" }) => (
    <div className="inline-flex items-center gap-1 border border-burgundy/30 rounded-md p-0.5">
      <button
        onClick={() => setLanguage("english")}
        className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded transition-colors ${
          activeLanguage === "english"
            ? "bg-burgundy text-parchment"
            : "text-burgundy hover:bg-burgundy/10"
        }`}
      >
        English
      </button>
      <button
        onClick={() => setLanguage("serbian")}
        disabled={!serbianContent}
        className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded transition-colors ${
          activeLanguage === "serbian"
            ? "bg-burgundy text-parchment"
            : serbianContent
            ? "text-burgundy hover:bg-burgundy/10"
            : "text-burgundy/30 cursor-not-allowed"
        }`}
      >
        Српски
      </button>
    </div>
  );

  if (language === "english") {
    return (
      <MarkdownEntry
        content={englishContent}
        currentDate={currentDate}
        subtitle="Prologue from Ochrid"
        languageToggle={<LanguageToggle activeLanguage="english" />}
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
        subtitle="Пролог из Охрида"
        languageToggle={<LanguageToggle activeLanguage="serbian" />}
      />
    );
  }

  return null;
}
