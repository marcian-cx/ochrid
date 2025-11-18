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
  serbianContent: string | null;
  currentDate: string;
};

export default function ReadingContent({ englishEntry, serbianContent, currentDate }: ReadingContentProps) {
  const [language, setLanguage] = useState<"english" | "serbian">("english");

  return (
    <>
      {language === "english" ? (
        <Entry entry={englishEntry} currentDate={currentDate} languageToggle={
          <div className="inline-flex items-center gap-1 border border-burgundy/30 rounded-md p-0.5">
            <button
              onClick={() => setLanguage("english")}
              className="px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded bg-burgundy text-parchment"
            >
              English
            </button>
            <button
              onClick={() => setLanguage("serbian")}
              disabled={!serbianContent}
              className={`px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded transition-colors ${
                serbianContent
                  ? "text-burgundy hover:bg-burgundy/10"
                  : "text-burgundy/30 cursor-not-allowed"
              }`}
            >
              Српски
            </button>
          </div>
        } />
      ) : serbianContent ? (
        <MarkdownEntry content={serbianContent} currentDate={currentDate} languageToggle={
          <div className="inline-flex items-center gap-1 border border-burgundy/30 rounded-md p-0.5">
            <button
              onClick={() => setLanguage("english")}
              className="px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded text-burgundy hover:bg-burgundy/10 transition-colors"
            >
              English
            </button>
            <button
              onClick={() => setLanguage("serbian")}
              className="px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm rounded bg-burgundy text-parchment"
            >
              Српски
            </button>
          </div>
        } />
      ) : (
        <div className="w-full md:w-3/5 mx-auto px-4 md:px-0">
          <p className="text-burgundy/70">Serbian translation not available for this date.</p>
        </div>
      )}
    </>
  );
}

