"use client";

import { useState, useRef } from "react";
import { Prayer, NestedPrayer } from "@/lib/types";

type PrayerSection = {
  key: string;
  title: string;
  description: string;
  audioFile: string;
  audio: boolean;
};

const PRAYER_SECTIONS: PrayerSection[] = [
  {
    key: "morning",
    title: "Morning Prayers",
    description: "Traditional Orthodox morning prayers to begin the day",
    audioFile: "/morning_prayers.mp3",
    audio: true
  },
  {
    key: "evening",
    title: "Evening Prayers",
    description: "Traditional Orthodox evening prayers before rest",
    audioFile: "/evening_prayers.mp3",
    audio: false
  }
];

function isNestedPrayer(prayer: Prayer): prayer is NestedPrayer {
  return "prayers" in prayer;
}

function hasNumberedList(text: string): boolean {
  return /\n\d+\.\s/.test(text);
}

function renderPrayerText(text: string) {
  if (!hasNumberedList(text)) {
    return <p className="mb-4 whitespace-pre-line leading-relaxed">{text}</p>;
  }

  const parts = text.split(/\n(?=\d+\.\s)/);
  const intro = parts[0].trim();
  const listItems = parts.slice(1);

  return (
    <div className="mb-4">
      {intro && <p className="mb-4 whitespace-pre-line leading-relaxed">{intro}</p>}
      <ol className="list-decimal list-inside space-y-3 leading-relaxed">
        {listItems.map((item, idx) => {
          const itemText = item.replace(/^\d+\.\s/, '').trim();
          return <li key={idx} className="pl-2">{itemText}</li>;
        })}
      </ol>
    </div>
  );
}

export default function PrayersClient({ prayers }: { prayers: Record<string, Prayer[]> }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [playingSection, setPlayingSection] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const audioRefs = useRef<Record<string, HTMLAudioElement | null>>({});

  const toggleSection = (key: string) => {
    setExpandedSection(expandedSection === key ? null : key);
  };

  const startAudio = (key: string, audioFile: string) => {
    const audio = audioRefs.current[key];
    
    if (!audio) {
      const newAudio = new Audio(audioFile);
      audioRefs.current[key] = newAudio;
      
      newAudio.onended = () => {
        setPlayingSection(null);
        setIsPaused(false);
        setCurrentTime(0);
      };
      
      newAudio.ontimeupdate = () => {
        setCurrentTime(newAudio.currentTime);
      };
      
      newAudio.onloadedmetadata = () => {
        setDuration(newAudio.duration);
      };
      
      newAudio.play();
      setPlayingSection(key);
      setIsPaused(false);
    } else {
      audio.currentTime = 0;
      audio.play();
      setPlayingSection(key);
      setIsPaused(false);
    }
  };

  const togglePlayPause = (key: string) => {
    const audio = audioRefs.current[key];
    if (!audio) return;
    
    if (audio.paused) {
      audio.play();
      setIsPaused(false);
    } else {
      audio.pause();
      setIsPaused(true);
    }
  };

  const skipTime = (key: string, seconds: number) => {
    const audio = audioRefs.current[key];
    if (!audio) return;
    
    audio.currentTime = Math.max(0, audio.currentTime + seconds);
  };

  const stopAudio = (key: string) => {
    const audio = audioRefs.current[key];
    if (!audio) return;
    
    audio.pause();
    audio.currentTime = 0;
    setPlayingSection(null);
    setIsPaused(false);
    setCurrentTime(0);
    setDuration(0);
  };

  const seekTo = (key: string, time: number) => {
    const audio = audioRefs.current[key];
    if (!audio) return;
    
    audio.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const renderPrayer = (prayer: Prayer, idx: number) => {
    if (isNestedPrayer(prayer)) {
      return (
        <div key={idx}>
          <h2 className="font-semibold text-burgundy uppercase tracking-wide text-sm border-b border-gold pb-2 mt-0 mb-4">
            {prayer.title}
          </h2>
          <div className="space-y-6">
            {prayer.prayers.map((subPrayer, subIdx) => (
              <div key={subIdx}>
                {subPrayer.title && (
                  <h3 className="text-base font-semibold text-burgundy mb-2">
                    {subPrayer.title}
                  </h3>
                )}
                {renderPrayerText(subPrayer.prayer)}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div key={idx} className={!prayer.title && idx > 0 ? "mt-8" : ""}>
        {prayer.title && (
          <h2 className="font-semibold text-burgundy uppercase tracking-wide text-sm border-b border-gold pb-2 mt-8 mb-4 first:mt-0">
            {prayer.title}
          </h2>
        )}
        {renderPrayerText(prayer.prayer)}
      </div>
    );
  };

  return (
    <div className="w-full md:w-3/5 mx-auto px-4 md:px-0">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-1 text-burgundy">Orthodox Prayers</h1>
        <p className="text-xs uppercase tracking-widest text-burgundy/50">Traditional Morning and Evening Prayers</p>
      </div>

      <div className="space-y-4">
        {PRAYER_SECTIONS.map((section) => (
          <div key={section.key} className="border border-burgundy/20 rounded-sm">
            <div className="px-6 py-2 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-burgundy mb-0.5 mt-3">{section.title}</h2>
                <p className="text-sm text-burgundy/70">{section.description}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:items-start w-full xl:w-auto">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="flex items-center justify-center gap-2 px-4 py-2 border border-burgundy/30 rounded hover:bg-burgundy/5 transition-colors text-burgundy h-9 w-full md:w-1/2 xl:w-auto"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm">Read</span>
                </button>
                
                {playingSection === section.key ? (
                  <div className="flex flex-col gap-1.5 w-full md:w-1/2 xl:w-auto">
                    <div className="flex border border-burgundy/30 rounded overflow-hidden h-9">
                      <div className="flex justify-around gap-2 w-full px-1.5">
                      <button
                        onClick={() => skipTime(section.key, -15)}
                        className="flex items-center justify-center w-9 h-9 hover:bg-burgundy/5 transition-colors text-burgundy"
                        title="Rewind 15 seconds"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.333 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => togglePlayPause(section.key)}
                        className="flex items-center justify-center w-9 h-9 hover:bg-burgundy/5 transition-colors text-burgundy"
                        title="Play/Pause"
                      >
                        {isPaused ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => skipTime(section.key, 15)}
                        className="flex items-center justify-center w-9 h-9 hover:bg-burgundy/5 transition-colors text-burgundy"
                        title="Fast forward 15 seconds"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
                        </svg>
                      </button>
                      </div>
                      <div className="flex w-[10px] border-l border-burgundy/40">
                      <button
                        onClick={() => stopAudio(section.key)}
                        className="flex items-center justify-center w-9 h-9 hover:bg-burgundy/5 transition-colors text-burgundy"
                        title="Stop"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-burgundy">
                      <span className="tabular-nums">{formatTime(currentTime)}</span>
                      <div 
                        className="flex-1 h-1 bg-burgundy/20 rounded-full cursor-pointer relative group"
                        onClick={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const percent = (e.clientX - rect.left) / rect.width;
                          seekTo(section.key, percent * duration);
                        }}
                      >
                        <div 
                          className="absolute top-0 left-0 h-full bg-burgundy rounded-full transition-all"
                          style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="tabular-nums">{formatTime(duration)}</span>
                    </div>
                  </div>
                ) : (
                  <div className="relative group w-full md:w-1/2 xl:w-auto">
                    <button
                      onClick={() => section.audio && startAudio(section.key, section.audioFile)}
                      disabled={!section.audio}
                      className={`flex items-center justify-center gap-2 px-4 py-2 border rounded transition-colors h-9 w-full ${
                        section.audio 
                          ? 'border-burgundy/30 text-burgundy hover:bg-burgundy/5' 
                          : 'border-burgundy/20 text-burgundy/40'
                      }`}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm">Listen</span>
                    </button>
                    {!section.audio && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-ink text-parchment text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        Audio coming soon
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            {expandedSection === section.key && (
              <div className="px-6 py-6 border-t border-burgundy/20 bg-parchment">
                <article className="text-base leading-normal text-ink">
                  {prayers[section.key]?.map(renderPrayer)}
                </article>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

