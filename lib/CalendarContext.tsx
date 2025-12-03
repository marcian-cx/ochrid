"use client";

import { createContext, useContext, useState, useRef, useCallback, ReactNode } from "react";
import { OrthocalDay } from "./orthocal";

type CalendarMode = "julian" | "gregorian";
type Language = "english" | "serbian";

type CalendarContextType = {
  mode: CalendarMode;
  setMode: (mode: CalendarMode) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  getFromCache: (key: string) => OrthocalDay | null | undefined;
  setInCache: (key: string, data: OrthocalDay | null) => void;
};

const CalendarContext = createContext<CalendarContextType | null>(null);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<CalendarMode>("julian");
  const [language, setLanguage] = useState<Language>("english");
  const cacheRef = useRef<Record<string, OrthocalDay | null>>({});

  const getFromCache = useCallback((key: string) => {
    return cacheRef.current[key];
  }, []);

  const setInCache = useCallback((key: string, data: OrthocalDay | null) => {
    cacheRef.current[key] = data;
  }, []);

  return (
    <CalendarContext.Provider value={{ mode, setMode, language, setLanguage, getFromCache, setInCache }}>
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendar() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("useCalendar must be used within a CalendarProvider");
  }
  return context;
}
