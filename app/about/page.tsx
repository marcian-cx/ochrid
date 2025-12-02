import Link from "next/link";
import TranslationProgress from "@/components/TranslationProgress";
import { parseTranslationProgress } from "@/utils/translationProgress";

export const metadata = {
  title: "About - OCHRID",
  description: "About OCHRID - A Daily Orthodox Companion",
};

export default function AboutPage() {
  const progress = parseTranslationProgress();
  
  const dayStatuses: Record<string, Record<number, { translated: boolean; verified: boolean }>> = {};
  for (const [month, days] of Object.entries(progress.daysByMonth)) {
    dayStatuses[month] = {};
    for (const day of days) {
      dayStatuses[month][day.day] = {
        translated: day.englishTranslated,
        verified: day.englishVerified,
      };
    }
  }

  return (
    <div className="w-full md:w-3/5 mx-auto px-4 md:px-0">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-1 text-burgundy">About</h1>
        <p className="text-xs uppercase tracking-widest text-burgundy/50">About This Project</p>
      </div>
      
      <div className="space-y-8 text-base leading-normal text-ink">
        <p>
          A friend recently sent me the link to the Prologue from Ochrid on the Australian ROCOR diocese website. 
          When I clicked on the link, I found it led to a web archive version from an old serbian diocese website, which was both hard to use and ethically dubious. Being a software engineer by trade, I wanted to rehost 
          this content to make it available to the Orthodox faithful in a simple, accessible, and focused way. 

        </p>

        <p>
          However, I soon realized that the translation used across the web, here and elsewhere, is under the copyright of the Serbian 
          Orthodox Archdiocese. After they pulled it from their website, reproducing the web archive version 
          was not ethically defensible. This created a need for a new, open source translation with complete 
          fidelity to the original Serbian text, and an Orthodox flavor like the previous translation, but 
          that could be shared and used by the faithful without permission and at will.
        </p>

        <p>
          What you are reading now is a never before seen privately funded translation, made directly from the original 
          Serbian text by St. Nikolai. This translation is licensed under{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener" className="text-burgundy hover:text-gold underline">
            Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)
          </a>, 
          which means anyone can use, copy, and share it freely as long as they credit Rdr. Marcian Sakarya 
          and OCHRID.COM. This work is offered freely to the Church, that the wisdom of St. Nikolai might 
          be accessible to all who seek it.
        </p>

        <p>
          The Prologue from Ochrid is a collection of lives of saints and homilies for every day 
          of the year, compiled by St. Nikolai Velimirović (1880-1956), Bishop of Ochrid 
          and Žiča. This treasury of Orthodox wisdom has been a beloved companion to the faithful for 
          generations, offering daily spiritual nourishment through the examples of the saints, beautiful 
          hymns, profound reflections, and instructive homilies.
        </p>

        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide">
            What This Site Provides
          </h2>
          
          <div className="space-y-3">
            <p>
              <strong>Daily Prologue Readings</strong> — The complete entry for each day of the year, 
              including lives of saints, hymns of praise, reflections, contemplations, and homilies 
              translated directly from the original Serbian text
            </p>
            <p>
              <strong>Daily Scripture Readings</strong> — The appointed Scripture passages for each day, 
              provided through integration with <a href="https://orthocal.info" target="_blank" rel="noopener" className="text-burgundy hover:text-gold underline">Orthocal.info</a>
            </p>
            <p>
              <strong>Fasting Calendar</strong> — Information about the fasting rule for each day
            </p>
            <p>
              <strong>Commemorations</strong> — Saints and feasts celebrated on each day
            </p>
            <p>
              <strong>Calendar Toggle</strong> — Switch between Old Calendar (Julian) and New Calendar (Gregorian) dates by clicking on the date options at the top of the readings page.
            </p>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide">
            Translation Progress
          </h2>
          <p className="mb-6 text-sm text-burgundy/70">
            This translation is an ongoing work. The calendar below shows our progress through the year.
          </p>
          <TranslationProgress 
            totalDays={progress.totalDays}
            translatedCount={progress.translatedCount}
            verifiedCount={progress.verifiedCount}
            dayStatuses={dayStatuses}
          />
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide">
            Source Material & License
          </h2>
          <p>
            The Prologue translation is made directly from the original Serbian text by St. Nikolai Velimirović 
            and is licensed under{' '}
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener" className="text-burgundy hover:text-gold underline">
              CC BY-SA 4.0
            </a>. You are free to use, copy, and share 
            this translation as long as you credit Rdr. Marcian Sakarya and OCHRID.COM.
          </p>
          <p className="mt-3">
            Scripture readings and calendar information are provided through the Orthocal API.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide">
            About the Author
          </h2>
          <p>
            Rdr. Marcian Sakarya is a Reader of the Russian Orthodox Church Outside of Russia. 
            He lives in North Carolina with his wife and daughter.
          </p>
        </section>

        <div className="mt-16 pt-8 border-t border-ink/10">
          <p className="text-center text-sm text-burgundy/80">
            Lord Jesus Christ, by the prayers of St. Nikolai Velimirović and all the saints, have mercy on us.
          </p>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/" 
            className="text-burgundy hover:text-gold transition-colors text-sm uppercase tracking-wider"
          >
            Return to Daily Reading
          </Link>
        </div>
      </div>
    </div>
  );
}
