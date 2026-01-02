import Link from "next/link";
import { getTodayKey } from "@/utils/date";

export default function Home() {
  const todayKey = getTodayKey();

  return (
    <div className="w-full md:w-4/5 lg:w-3/5 mx-auto px-4 md:px-0">
      <section className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-burgundy mb-2">
          The Prologue from Ochrid
        </h1>
        <p className="text-base text-burgundy/80 mb-1">
          by St. Nikolai Velimirović
        </p>
        <p className="text-sm text-ink/70 mb-6">
          The first faithful, uncensored, and free English translation
        </p>
        
        <Link 
          href={`/readings/${todayKey}`}
          className="btn inline-block border border-burgundy/30 text-burgundy px-8 py-3 font-semibold rounded hover:border-gold hover:text-gold hover:bg-burgundy/5 transition-all"
        >
          Read Today's Entry →
        </Link>
      </section>

      <section className="mb-12">
        <h2 className="text-base font-bold text-burgundy uppercase tracking-wider mb-4 border-b border-gold pb-2">
          What is the Prologue from Ochrid?
        </h2>
        
        <div className="space-y-4 text-base leading-normal text-ink">
          <p>
            The <strong>Prologue from Ochrid</strong> (also known as the <em>Prologue of Ochrid</em> or <em>Prologue from Ohrid</em>) 
            is a treasury of Orthodox wisdom compiled by <strong>St. Nikolai Velimirović</strong> (1880-1956), 
            Bishop of Ohrid and Žiča. For every day of the year, it offers:
          </p>

          <div className="grid md:grid-cols-2 gap-3 my-6">
            <div className="p-3 border-l-2 border-burgundy/30 bg-burgundy/5">
              <h3 className="text-sm font-semibold text-burgundy mb-1 uppercase tracking-wider">Lives of the Saints</h3>
              <p className="text-sm">Daily commemorations and inspiring stories of Orthodox saints</p>
            </div>
            <div className="p-3 border-l-2 border-burgundy/30 bg-burgundy/5">
              <h3 className="text-sm font-semibold text-burgundy mb-1 uppercase tracking-wider">Hymns of Praise</h3>
              <p className="text-sm">Beautiful poetic prayers honoring the saints of the day</p>
            </div>
            <div className="p-3 border-l-2 border-burgundy/30 bg-burgundy/5">
              <h3 className="text-sm font-semibold text-burgundy mb-1 uppercase tracking-wider">Reflections</h3>
              <p className="text-sm">Spiritual insights and meditations for daily life</p>
            </div>
            <div className="p-3 border-l-2 border-burgundy/30 bg-burgundy/5">
              <h3 className="text-sm font-semibold text-burgundy mb-1 uppercase tracking-wider">Homilies</h3>
              <p className="text-sm">Profound teachings on Scripture and Orthodox faith</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-base font-bold text-burgundy uppercase tracking-wider mb-4 border-b border-gold pb-2">
          Why This Translation?
        </h2>
        
        <div className="space-y-4 text-base leading-normal text-ink">
          <div className="flex gap-3 items-start">
            <span className="text-burgundy flex-shrink-0 text-xs mt-1">✦</span>
            <div>
              <h3 className="text-sm font-semibold text-burgundy mb-1 uppercase tracking-wider">Faithful & Uncensored</h3>
              <p className="text-sm">
                Translated directly from the original Serbian text by St. Nikolai, preserving every word he wrote. 
                No censorship, no alterations.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 items-start">
            <span className="text-burgundy flex-shrink-0 text-xs mt-1">✦</span>
            <div>
              <h3 className="text-sm font-semibold text-burgundy mb-1 uppercase tracking-wider">Completely Free</h3>
              <p className="text-sm">
                No paywalls, no subscriptions, no copyright restrictions. Licensed under Creative Commons (CC BY-SA 4.0) 
                for free use and sharing.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 items-start">
            <span className="text-burgundy flex-shrink-0 text-xs mt-1">✦</span>
            <div>
              <h3 className="text-sm font-semibold text-burgundy mb-1 uppercase tracking-wider">Daily Updates</h3>
              <p className="text-sm">
                Includes both Julian (Old Calendar) and Gregorian (New Calendar) dates, 
                plus daily Scripture readings and fasting information.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="grid md:grid-cols-3 gap-4">
          <Link 
            href="/about"
            className="p-4 border border-burgundy/30 rounded hover:border-gold transition-colors group"
          >
            <h3 className="text-sm font-semibold text-burgundy mb-1 uppercase tracking-wider group-hover:text-gold transition-colors">
              About This Translation
            </h3>
            <p className="text-xs text-ink/70">
              Learn about the project, translation progress, and licensing
            </p>
          </Link>

          <Link 
            href="/prayers"
            className="p-4 border border-burgundy/30 rounded hover:border-gold transition-colors group"
          >
            <h3 className="text-sm font-semibold text-burgundy mb-1 uppercase tracking-wider group-hover:text-gold transition-colors">
              Daily Prayers
            </h3>
            <p className="text-xs text-ink/70">
              Traditional Orthodox morning and evening prayers
            </p>
          </Link>

          <Link 
            href="/support"
            className="p-4 bg-burgundy/5 border border-burgundy/30 rounded hover:border-gold transition-colors group"
          >
            <h3 className="text-sm font-semibold text-burgundy mb-1 uppercase tracking-wider group-hover:text-gold transition-colors">
              Support This Work
            </h3>
            <p className="text-xs text-ink/70">
              Help keep this resource free and accessible to all
            </p>
          </Link>
        </div>
      </section>

      <section className="mt-12 pt-8 border-t border-gold/30 text-center">
        <blockquote className="mb-6">
          <p className="text-base italic text-burgundy mb-2">
            "The saints are cleansed mirrors in which the beauty and might of the majestic person of Christ is seen. They are the fruit on the Tree of Life; the Tree is Christ and the fruit are the saints."
          </p>
          <footer className="text-xs text-burgundy/70">— St. Nikolai Velimirović, Preface to the Prologue from Ochrid</footer>
        </blockquote>

        <Link 
          href={`/readings/${todayKey}`}
          className="btn inline-block border border-burgundy/30 text-burgundy px-8 py-3 font-semibold rounded hover:border-gold hover:text-gold hover:bg-burgundy/5 transition-all"
        >
          Begin Reading Today
        </Link>
      </section>
    </div>
  );
}
