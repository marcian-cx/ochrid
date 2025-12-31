import Link from "next/link";

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
        <h1 className="text-4xl font-bold mb-1 text-burgundy">Support</h1>
        <p className="text-xs uppercase tracking-widest text-burgundy/50">Help This Project Continue</p>
      </div>
      
      <div className="space-y-8 text-base leading-normal text-ink">
        <p>
          This website is provided free of charge as a service to the Orthodox faithful 
          and all who seek spiritual nourishment from the Prologue from Ochrid.
        </p>

        <p>
          If you find this resource valuable and would like to support its continued availability and 
          development, you can make a contribution through the link below. Your donations support
          development costs, hosting, domain costs, translation work, and other expenses.
        </p>

        <section className="my-12 py-8 text-center border-y border-gold/30">
          <h2 className="text-lg font-semibold mb-6 text-burgundy uppercase tracking-wide border-0 pb-0 mt-0">
            Make a Donation
          </h2>
          <p className="text-center mb-6 text-burgundy/70 text-sm">
            Your support helps keep this resource freely available
          </p>
          <a
            href="https://buymeacoffee.com/ochrid"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-burgundy !text-parchment px-8 py-3 font-semibold rounded hover:bg-gold hover:!text-ink transition-colors"
          >
            Support via Buy Me a Coffee
          </a>
        </section>

        <section className="mt-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide border-0 pb-0 mt-0">
            Other Ways to Help
          </h2>
          
          <p className="mb-4">
            If you're unable to make a financial contribution, you can still support this project:
          </p>

          <div className="space-y-3">
            <p>
              <strong>Share this website</strong> with your parish, friends, and family
            </p>
            <p>
              <strong>Pray</strong> for the continued success of this ministry
            </p>
            <p>
              <strong>Provide feedback</strong> on how we can improve the site
            </p>
            <p>
              <strong>Report errors</strong> if you find any mistakes in the texts
            </p>
          </div>
        </section>

        <div className="mt-16 pt-8 border-t border-ink/10">
          <p className="text-center italic text-burgundy/80 text-sm">
            Give, and it will be given to you. A good measure, pressed down, shaken together 
            and running over, will be poured into your lap. — Luke 6:38
          </p>
        </div>
      </div>
    </div>
  );
}
