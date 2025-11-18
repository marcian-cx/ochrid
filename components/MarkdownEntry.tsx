import { formatJulianGregorianDisplay } from "@/utils/date";

type MarkdownEntryProps = {
  content: string;
  currentDate: string;
};

export default function MarkdownEntry({ content, currentDate }: MarkdownEntryProps) {
  const sections = content.split(/^## /m).filter(Boolean);
  
  return (
    <article className="w-full md:w-3/5 mx-auto px-4 md:px-0">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-1 text-burgundy">{formatJulianGregorianDisplay(currentDate)}</h1>
        <p className="text-xs uppercase tracking-widest text-burgundy/50">Пролог из Охрида</p>
      </div>

      {sections.map((section, idx) => {
        const lines = section.trim().split('\n');
        const heading = lines[0];
        const body = lines.slice(1).join('\n').trim();
        
        return (
          <section key={idx} className="mb-12">
            <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide text-sm">
              {heading}
            </h2>
            <div className="text-base leading-normal text-ink space-y-4">
              {body.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="whitespace-pre-line">{paragraph}</p>
              ))}
            </div>
          </section>
        );
      })}
    </article>
  );
}

