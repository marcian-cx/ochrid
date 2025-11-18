"use client";

import { useState } from "react";
import Entry from "./Entry";
import MarkdownEntry from "./MarkdownEntry";

type PrologueEntry = {
  title: string;
  saints?: string;
  hymns?: string;
  reflection?: string;
  homily?: string;
  contemplation?: string;
};

type ReadingContentProps = {
  englishEntry: PrologueEntry;
  english2Content: string | null;
  serbianContent: string | null;
  currentDate: string;
};

export default function ReadingContent({ englishEntry, english2Content, serbianContent, currentDate }: ReadingContentProps) {
  const [language, setLanguage] = useState<"english" | "english2" | "serbian">("english");

  const LanguageToggle = ({ activeLanguage }: { activeLanguage: "english" | "english2" | "serbian" }) => (
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
        onClick={() => setLanguage("english2")}
        disabled={!english2Content}
        className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded transition-colors ${
          activeLanguage === "english2"
            ? "bg-burgundy text-parchment"
            : english2Content
            ? "text-burgundy hover:bg-burgundy/10"
            : "text-burgundy/30 cursor-not-allowed"
        }`}
      >
        English 2
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
    return <Entry entry={englishEntry} currentDate={currentDate} languageToggle={<LanguageToggle activeLanguage="english" />} />;
  }

  if (language === "english2") {
    if (!english2Content) {
      return (
        <div className="w-full md:w-3/5 mx-auto px-4 md:px-0">
          <p className="text-burgundy/70">English 2 translation not available for this date.</p>
        </div>
      );
    }
    return (
      <MarkdownEntry
        content={english2Content}
        currentDate={currentDate}
        subtitle="Prologue from Ochrid"
        languageToggle={<LanguageToggle activeLanguage="english2" />}
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
