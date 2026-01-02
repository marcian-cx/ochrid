import { useCalendar } from "@/lib/CalendarContext";
import { OrthocalDay } from "@/lib/orthocal";
import { useState } from "react";
import OrthocalInfo from "./OrthocalInfo";

type MarkdownEntryProps = {
  content: string;
  currentDate: string;
  dateDisplay: string;
  hasSerbianContent: boolean;
  orthocalData: OrthocalDay | null;
};

export default function MarkdownEntry({ content, dateDisplay, hasSerbianContent, orthocalData }: MarkdownEntryProps) {
  const { language, setLanguage } = useCalendar();
  const subtitle = language === "english" ? "Prologue from Ochrid" : "Пролог из Охрида";
  const subtitleShort = language === "english" ? "Prologue" : "Пролог";
  const [activeView, setActiveView] = useState<"prologue" | "scripture">("prologue");
  const sections = content.split(/^## /m).filter(Boolean);
  
  const parseInlineMarkdown = (text: string): React.ReactNode[] => {
    const elements: React.ReactNode[] = [];
    let keyCounter = 0;
    
    const boldRegex = /\*\*(.+?)\*\*/g;
    const italicRegex = /\*(.+?)\*/g;
    
    const parts = text.split(boldRegex);
    
    parts.forEach((part, i) => {
      if (i % 2 === 1) {
        elements.push(<strong key={`b-${keyCounter++}`}>{part}</strong>);
      } else {
        const italicParts = part.split(italicRegex);
        italicParts.forEach((iPart, j) => {
          if (j % 2 === 1) {
            elements.push(<em key={`i-${keyCounter++}`}>{iPart}</em>);
          } else if (iPart) {
            elements.push(iPart);
          }
        });
      }
    });
    
    return elements;
  };
  
  const renderBody = (body: string, isHymn: boolean = false) => {
    const hasSubsections = body.trim().startsWith('###');
    const parts = body.split(/^### /m).filter(Boolean);
    
    if (parts.length === 1 && !hasSubsections) {
      if (isHymn) {
        return (
          <div className="text-base leading-snug">
            <p className="whitespace-pre-line italic text-ink/90">{parseInlineMarkdown(parts[0].trim())}</p>
          </div>
        );
      }
      return (
        <div className="text-base leading-normal text-ink space-y-4">
          {parts[0].split('\n\n').map((paragraph, pIdx) => (
            <p key={pIdx} className="whitespace-pre-line">{parseInlineMarkdown(paragraph)}</p>
          ))}
        </div>
      );
    }
    
    return (
      <div className="text-base leading-normal text-ink">
        {parts.map((part, partIdx) => {
          const lines = part.trim().split('\n');
          const subsectionTitle = lines[0];
          const text = lines.slice(1).join('\n').trim();
          
          return (
            <div key={partIdx} className={partIdx > 0 ? "mt-6" : ""}>
              <p className="text-sm uppercase tracking-wider text-burgundy/90 mb-3 font-semibold">{subsectionTitle}</p>
              {text && (
                <div className="space-y-4">
                  {text.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="whitespace-pre-line">{parseInlineMarkdown(paragraph)}</p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const LanguageToggle = () => (
    <div className="hidden sm:flex items-center gap-1 border border-burgundy/30 rounded-md p-0.5 ml-4 flex-shrink-0 relative bottom-1">
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
  );
  
  return (
    <article className="w-full md:w-4/5 lg:w-3/5 mx-auto px-4 md:px-0">
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-burgundy mb-1 border-0">
          {dateDisplay}
        </h1>
        <div className="flex items-center justify-between">
          <span 
            onClick={() => setActiveView("prologue")}
            className={`text-sm font-medium uppercase tracking-wider cursor-pointer transition-all ${
              activeView === "prologue" 
                ? "text-burgundy" 
                : "text-burgundy/40 hover:text-burgundy/60"
            }`}
            style={activeView === "prologue" ? { textShadow: "0 0 6px rgba(212, 165, 165, 0.2)" } : {}}
          >
            <span className="hidden sm:inline">{subtitle}</span>
            <span className="sm:hidden">{subtitleShort}</span>
          </span>
          <span 
            onClick={() => setActiveView("scripture")}
            className={`text-sm font-medium uppercase tracking-wider cursor-pointer transition-all ${
              activeView === "scripture" 
                ? "text-burgundy" 
                : "text-burgundy/40 hover:text-burgundy/60"
            }`}
            style={activeView === "scripture" ? { textShadow: "0 0 6px rgba(212, 165, 165, 0.2)" } : {}}
          >
            <span className="hidden sm:inline">Scripture Reading</span>
            <span className="sm:hidden">Scripture</span>
          </span>
        </div>
      </div>

      {activeView === "prologue" && sections.map((section, idx) => {
        const lines = section.trim().split('\n');
        const heading = lines[0];
        const body = lines.slice(1).join('\n').trim();
        const headingLower = heading.toLowerCase();
        const isHymn = headingLower.includes('химна') || headingLower.includes('hymn');
        
        return (
          <section key={idx} className={isHymn ? "mb-12 pl-6 border-l-2 border-burgundy/20" : "mb-12"}>
            <div className="flex items-center justify-between border-b border-gold mb-4">
              <h2 className="text-base font-bold text-burgundy uppercase tracking-wider mt-0 mb-0 border-0">
                {heading}
              </h2>
              {idx === 0 && <LanguageToggle />}
            </div>
            {renderBody(body, isHymn)}
          </section>
        );
      })}

      {activeView === "scripture" && (
        <div className="mb-12">
          <OrthocalInfo data={orthocalData} />
        </div>
      )}
    </article>
  );
}
