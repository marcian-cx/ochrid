import Link from "next/link";
import Image from "next/image";
import TranslationProgress from "@/components/TranslationProgress";
import { parseTranslationProgress } from "@/utils/translationProgress";

export const metadata = {
  title: "About the Prologue from Ochrid - Free English Translation",
  description: "Learn about the first faithful, uncensored, and free English translation of the Prologue from Ochrid by St. Nikolai Velimirović. A daily Orthodox companion with lives of saints, hymns, and homilies.",
  keywords: [
    "What is the Prologue from Ochrid",
    "Prologue from Ochrid about",
    "St. Nikolai Velimirovic biography",
    "Prologue of Ochrid English translation",
    "Orthodox daily readings free",
    "Lives of the Saints Orthodox",
  ],
  openGraph: {
    title: "About the Prologue from Ochrid",
    description: "The first faithful, uncensored English translation of the Prologue from Ochrid by St. Nikolai Velimirović. Free for all to use and share.",
    url: "https://ochrid.com/about",
  },
  alternates: {
    canonical: "https://ochrid.com/about",
  },
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
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-1 text-burgundy">About</h1>
        <p className="text-xs uppercase tracking-widest text-burgundy/50">About This Project</p>
      </div>
      
      <div className="space-y-8 text-base leading-normal text-ink">
        <p>
          OCHRID.COM presents the first ever faithful, uncensored, and free to use and share English translation of the Prologue from 
          Ochrid by St. Nikolai Velimirović. This translation is made directly from the original Serbian text, 
          preserving every word St. Nikolai wrote, with only minor tweaks for clarity, <strong>never meaning.</strong>
        </p>

        <p>
          The most widely available English edition is under copyright and can therefore not be reproduced or distributed without permission.
          It also contains cases of <Link href="/censorship" className="text-burgundy hover:text-gold underline">censorship</Link>. Other lesser known translations exist but are not available online, and cost several hundred dollars to purchase. This translation exists to preserve the original text written 
          by St. Nikolai and make it available to the faithful without cost barriers and for all uses.
           We believe the faithful deserve access to this treasure of a text with no restrictions.
        </p>

        <p>
          This work is licensed under{' '}
          <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="text-burgundy hover:text-gold underline">
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
              provided through integration with <a href="https://orthocal.info" target="_blank" rel="noopener noreferrer" className="text-burgundy hover:text-gold underline">Orthocal.info</a>
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
            <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer" className="text-burgundy hover:text-gold underline">
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
            Who's Behind This?
          </h2>
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="flex-shrink-0">
              <Image 
                src="/family_photo.png" 
                alt="Rdr. Marcian Sakarya and family"
                width={192}
                height={192}
                className="w-48 h-48 object-cover rounded-md border-2 border-burgundy/30"
              />
            </div>
            <div className="flex-1 space-y-3">
              <p>
                I'm <strong>Rdr. Marcian Sakarya</strong>, a Reader in the Russian Orthodox Church Outside of Russia. 
                I live in North Carolina with my wife and daughter.
              </p>
              <p>
                When I discovered that the standard English translation of the Prologue from Ochrid contained censorship 
                and was locked behind copyright, I felt that St. Nikolai, whose work has profoundly influenced me, deserved better. St. Nikolai's complete words, unaltered 
                and unfiltered, deserve to be freely accessible to every Orthodox Christian.
              </p>
              <p>
                Over <strong>200+ hours</strong> have gone into this translation and development work so far, with hundreds more ahead. 
                This is a labor of love, but your support helps cover hosting, development, and the time needed to 
                complete the remaining translations with the care they deserve.
              </p>
              <a 
                href="mailto:rdr.marcian@proton.me" 
                className="mt-2 inline-flex items-center gap-2 px-4 py-2 border border-burgundy/30 rounded text-burgundy hover:text-gold hover:border-gold/50 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                rdr.marcian@proton.me
              </a>
            </div>
          </div>
        </section>

        <div className="mt-16 pt-8 border-t border-ink/10">
          <p className="text-center text-sm text-burgundy/80">
            Lord Jesus Christ, Son of God, by the prayers of St. Nikolai Velimirović and all the saints, have mercy on us.
          </p>
        </div>
      </div>
    </div>
  );
}
