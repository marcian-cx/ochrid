import { useCalendar } from "@/lib/CalendarContext";

type MarkdownEntryProps = {
  content: string;
  currentDate: string;
  dateDisplay: string;
  subtitle?: string;
  hasSerbianContent: boolean;
};

export default function MarkdownEntry({ content, dateDisplay, subtitle = "Пролог из Охрида", hasSerbianContent }: MarkdownEntryProps) {
  const { language, setLanguage } = useCalendar();
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
          const subtitle = lines[0];
          const text = lines.slice(1).join('\n').trim();
          
          return (
            <div key={partIdx} className={partIdx > 0 ? "mt-6" : ""}>
              <p className="text-sm uppercase tracking-wider text-burgundy/90 mb-3 font-semibold">{subtitle}</p>
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
    <div className="hidden lg:flex items-center gap-1 border border-burgundy/30 rounded-md p-0.5">
      <button
        onClick={() => setLanguage("english")}
        className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded transition-colors ${
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
        className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded transition-colors ${
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
    <article className="w-full md:w-3/5 mx-auto px-4 md:px-0">
      <div className="mb-12">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-burgundy mb-0">{subtitle}</h1>
            <p className="text-xs uppercase tracking-widest text-burgundy/50">{dateDisplay}</p>
          </div>
          <LanguageToggle />
        </div>
      </div>

      {sections.map((section, idx) => {
        const lines = section.trim().split('\n');
        const heading = lines[0];
        const body = lines.slice(1).join('\n').trim();
        const headingLower = heading.toLowerCase();
        const isHymn = headingLower.includes('химна') || headingLower.includes('hymn');
        
        return (
          <section key={idx} className={isHymn ? "mb-12 pl-6 border-l-2 border-burgundy/20" : "mb-12"}>
            <h2 className="text-base font-bold mb-4 text-burgundy uppercase tracking-wider">
              {heading}
            </h2>
            {renderBody(body, isHymn)}
          </section>
        );
      })}
    </article>
  );
}
