import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Support the Prologue from Ochrid Translation Project",
  description: "Support the free English translation of the Prologue from Ochrid. Help keep this Orthodox daily reading resource available to all.",
  openGraph: {
    title: "Support the Prologue from Ochrid",
    description: "Help keep the free Prologue from Ochrid translation available to all.",
    url: "https://ochrid.com/donate",
  },
  alternates: {
    canonical: "https://ochrid.com/donate",
  },
};

export default function DonatePage() {
  return (
    <div className="w-full md:w-3/5 mx-auto px-4 md:px-0">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-1 text-burgundy">Join the Mission</h1>
        <p className="text-xs uppercase tracking-widest text-burgundy/50">Help Keep St. Nikolai's Wisdom Free for All</p>
      </div>
      
      <div className="space-y-8 text-base leading-normal text-ink">
        <p className="text-lg text-burgundy/90 font-serif italic border-l-4 border-gold pl-4">
          You're reading the first faithful, uncensored English translation of the Prologue from Ochrid—absolutely free. 
          No paywalls. No subscriptions. No censorship.
        </p>

        <p>
          For decades, this spiritual treasure has been locked behind copyright and altered in translation. 
          Now, through this project, St. Nikolai's complete words reach thousands of Orthodox Christians daily, 
          freely accessible to parishes, families, and seekers worldwide.
        </p>

        <section className="my-8 p-6 pb-2.5 bg-burgundy/5 border border-burgundy/20 rounded-md">
          <h2 className="text-base font-semibold mb-3 text-burgundy uppercase tracking-wide border-0 pb-0 mt-0">
            Your Support Makes This Possible
          </h2>
          <div className="space-y-1 text-sm mb-5">
            <p className="mb-0">✦ <strong>$5/month</strong> — Covers hosting for 50 daily visitors</p>
            <p>✦ <strong>$15/month</strong> — Funds verification of 10 translated days</p>
            <p>✦ <strong>$30/month</strong> — Supports new features and mobile improvements</p>
            <p>✦ <strong>$50/month</strong> — Helps complete the remaining 200+ translations</p>
          </div>
          <div className="text-center pt-3 border-t border-burgundy/20">
            <a
              href="https://buymeacoffee.com/ochrid"
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-block border border-burgundy/30 text-burgundy px-6 py-2.5 font-semibold rounded hover:border-gold hover:text-gold hover:bg-burgundy/5 transition-all"
            >
              Support This Mission →
            </a>
          </div>
        </section>

        <p>
          Every contribution—whether $3 or $30—helps preserve St. Nikolai's unaltered words for future generations. 
          You're not just donating to a website. You're participating in a spiritual work that serves the Church.
        </p>

        <section className="my-10 p-6 bg-parchment border border-burgundy/20 rounded-md">
          <h2 className="text-base font-semibold mb-4 text-burgundy uppercase tracking-wide border-0 pb-0 mt-0">
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
            <div className="flex-1 text-sm space-y-3">
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
            </div>
          </div>
        </section>

        <section className="my-12 py-8 text-center border-y border-gold">
          <h2 className="text-xl font-bold mb-4 text-burgundy uppercase tracking-wide border-0 pb-0 mt-0">
            Become a Supporter Today
          </h2>
          <p className="text-center mb-6 text-burgundy/80 max-w-md mx-auto">
            Join those who are making this uncensored translation possible for everyone, everywhere
          </p>
          <a
            href="https://buymeacoffee.com/ochrid"
            target="_blank"
            rel="noopener noreferrer"
            className="btn inline-block border border-burgundy/30 text-burgundy px-8 py-3 font-semibold rounded hover:border-gold hover:text-gold hover:bg-burgundy/5 transition-all"
          >
            Support This Mission →
          </a>
          <p className="mt-4 text-xs text-burgundy/60 text-center">One-time or monthly • Cancel anytime • Secure payment</p>
        </section>

        <section className="mt-12 bg-parchment border border-burgundy/10 rounded-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide border-0 pb-0 mt-0">
            Can't Donate? You Can Still Help
          </h2>
          
          <div className="space-y-3">
            <p>
              <strong>Share with your parish</strong> — Many Orthodox communities don't know this exists yet
            </p>
            <p>
              <strong>Pray for this work</strong> — By the prayers of St. Nikolai Velimirović, may this continue
            </p>
            <p>
              <strong>Report any errors</strong> — Help us maintain the highest fidelity to the Serbian original
            </p>
            <p>
              <strong>Spread the word online</strong> — Post about it, link to it, help others discover it
            </p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t border-gold/30">
          <p className="text-center italic text-burgundy text-lg font-serif mb-4">
            "Give, and it will be given to you. A good measure, pressed down, shaken together 
            and running over, will be poured into your lap."
          </p>
          <p className="text-center text-burgundy/70 text-sm">— Luke 6:38</p>
        </div>

        <p className="text-center text-sm text-burgundy/60 mt-8">
          This project is a labor of love, made possible by people like you who believe St. Nikolai's complete words 
          should be free for all to read. Thank you for considering.
        </p>
      </div>
    </div>
  );
}
