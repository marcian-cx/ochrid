import Link from "next/link";

export const metadata = {
  title: "About - OCHRID",
  description: "About OCHRID - A Daily Orthodox Companion",
};

export default function AboutPage() {
  return (
    <div className="w-full md:w-3/5 mx-auto px-4 md:px-0">
      <h1 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide text-sm">About</h1>
      
      <div className="space-y-8 text-base leading-normal text-ink">
        <p>
          A friend recently sent me the link to the Prologue of Ohrid on the Australian ROCOR site. 
          When I clicked on the link, I found that the experience and visual design left much to be desired, 
          as it is hosted on the web archive. Being a software engineer by trade, I decided to rehost 
          this content to make it available to the Orthodox faithful in a simple, accessible, and focused way. 
          I have also elected to include the daily readings. I hope this will be useful for my brothers 
          and sisters in Christ.
        </p>

        <p>
          The Prologue from Ohrid is a collection of lives of saints and homilies for every day 
          of the year, compiled by St. Nikolai Velimirović (1880-1956), Bishop of Ohrid 
          and Žiča. This treasury of Orthodox wisdom has been a beloved companion to the faithful for 
          generations, offering daily spiritual nourishment through the examples of the saints, beautiful 
          hymns, profound reflections, and instructive homilies.
        </p>

        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide text-sm">
            What This Site Provides
          </h2>
          
          <div className="space-y-3">
            <p>
              <strong>Daily Prologue Readings</strong> — The complete entry for each day of the year, 
              including lives of saints, hymns of praise, reflections, contemplations, and homilies from the{' '}
              <a href="https://web.archive.org/web/20161104160610/http://westserbdio.org/en/prologue" target="_blank" rel="noopener" className="text-burgundy hover:text-gold underline">web archive</a>
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
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide text-sm">
            Source Material
          </h2>
          <p>
            Prologue passages provided from the internet archive. Scripture 
            readings and calendar information are provided through the Orthocal API.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide text-sm">
            Technical Details
          </h2>
          <p>
            This site is built with modern web technologies to provide 
            a fast, clean, and reverent reading experience. The entire site is designed to 
            be simple, accessible, and focused on the content.
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

