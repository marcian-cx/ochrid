export const metadata = {
  title: "Censorship in the Prologue from Ochrid Translation",
  description: "Documented cases of censorship and alterations in the standard English translation of the Prologue from Ochrid by St. Nikolai Velimirović. See what was changed from the original Serbian text.",
  keywords: [
    "Prologue from Ochrid censorship",
    "Prologue of Ochrid original text",
    "St. Nikolai Velimirovic uncensored",
    "Serbian Orthodox Archdiocese translation",
  ],
  openGraph: {
    title: "Censorship in the Prologue from Ochrid",
    description: "Documented cases of censorship in the standard English translation vs. the original Serbian text.",
    url: "https://ochrid.com/censorship",
  },
  alternates: {
    canonical: "https://ochrid.com/censorship",
  },
};

interface CensorshipCase {
  id: number;
  date: string;
  section: string;
  changes: {
    original: string;
    alteration: string;
  }[];
  explanation: string;
}

const censorshipCases: CensorshipCase[] = [
  {
    id: 1,
    date: "December 13",
    section: "Contemplation",
    changes: [
      {
        original: "1. How the Japhethites (the white race) spread over the whole world;",
        alteration: "\"(the white race)\" — бела раса — removed",
      },
    ],
    explanation: "The original Serbian text uses \"Јафетити (бела раса)\" meaning \"Japhethites (the white race)\". This is a biblical reference to Genesis 9-10, where Noah's three sons become the ancestors of different peoples. The SAD translation removes the parenthetical.",
  },
  {
    id: 2,
    date: "December 13",
    section: "Contemplation",
    changes: [
      {
        original: "3. How the Hamitic tribes have remained to this day in a subjugated position.",
        alteration: "Entire point removed",
      },
    ],
    explanation: "The original Serbian text includes a third point about the Hamitic tribes. This references Genesis 9:25-27, Noah's prophecy concerning his sons. The SAD translation omits this third point entirely.",
  },
];

export default function CensorshipPage() {
  return (
    <div className="w-full md:w-3/5 mx-auto px-4 md:px-0">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-1 text-burgundy">Censorship</h1>
        <p className="text-xs uppercase tracking-widest text-burgundy/50">Cases of Alteration in the Standard Translation</p>
      </div>
      
      <div className="space-y-8 text-base leading-normal text-ink">
        <p>
          The standard English translation of the Prologue from Ochrid, published by the Serbian Orthodox Archdiocese, 
          contains instances where the original text written by St. Nikolai Velimirović has been altered or removed. 
          This page documents these cases of censorship to demonstrate why a faithful translation is necessary.
        </p>

        <p>
          Another english translation without censorship, copyright 1985 Lazarica Press, appears to exist but is not widely available.
        </p>

        <p>
          We present these cases not to criticize, but to preserve the integrity of St. Nikolai's original work. 
          Readers deserve to know what the saint actually wrote, even when his words may seem uncomfortable to modern sensibilities.
        </p>

        <div className="mt-12 space-y-8">
          {censorshipCases.map((caseItem) => (
            <div key={caseItem.id} className="border border-burgundy/20 rounded-lg overflow-hidden">
              <div className="bg-burgundy/5 px-4 py-2 border-b border-burgundy/20 flex items-center justify-between">
                <span className="text-sm font-semibold text-burgundy">#{caseItem.id}</span>
                <span className="text-xs text-burgundy/70">{caseItem.date} · {caseItem.section}</span>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="space-y-3">
                  {caseItem.changes.map((change, idx) => (
                    <div key={idx} className="grid md:grid-cols-2 gap-3">
                      <div className="bg-parchment border border-gold/50 rounded px-3 py-2">
                        <p className="text-sm text-ink">{change.original}</p>
                      </div>
                      <div className="bg-ink/5 border border-ink/20 rounded px-3 py-2 flex items-center">
                        <p className="text-sm text-ink/70 italic">{change.alteration}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <p className="text-sm text-ink/80">{caseItem.explanation}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-burgundy/60 italic mt-8">
          Additional cases of censorship will be documented as this translation work progresses.
        </p>

        <div className="mt-16 pt-8 border-t border-ink/10">
          <p className="text-center text-sm text-burgundy/80">
            Lord Jesus Christ, Son of God, by the prayers of St. Nikolai Velimirović and all the saints, have mercy on us.
          </p>
        </div>
      </div>
    </div>
  );
}

