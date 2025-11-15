import { formatJulianGregorianDisplay } from "@/utils/date";

type EntryProps = {
  entry: {
    title: string;
    saints?: string;
    hymns?: string;
    reflection?: string;
    homily?: string;
    contemplation?: string;
  };
  currentDate: string;
};

export default function Entry({ entry, currentDate }: EntryProps) {
  return (
    <article className="w-full md:w-3/5 mx-auto px-4 md:px-0">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-1 text-burgundy">{formatJulianGregorianDisplay(currentDate)}</h1>
        <p className="text-xs uppercase tracking-widest text-burgundy/50">Prologue from Ochrid</p>
      </div>

      {entry.saints && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide text-sm">
            The Lives of the Saints
          </h2>
          <div className="text-base leading-normal text-ink space-y-4">
            <p className="whitespace-pre-line">{entry.saints}</p>
          </div>
        </section>
      )}

      {entry.hymns && (
        <section className="mb-12 pl-6 border-l-2 border-burgundy/20">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide text-sm">
            Hymn of Praise
          </h2>
          <div className="text-base leading-snug">
            <p className="whitespace-pre-line italic text-ink/90">{entry.hymns}</p>
          </div>
        </section>
      )}

      {entry.reflection && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide text-sm">
            Reflection
          </h2>
          <div className="text-base leading-normal text-ink space-y-4">
            <p className="whitespace-pre-line">{entry.reflection}</p>
          </div>
        </section>
      )}

      {entry.contemplation && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide text-sm">
            Contemplation
          </h2>
          <div className="text-base leading-normal text-ink space-y-4">
            <p className="whitespace-pre-line">{entry.contemplation}</p>
          </div>
        </section>
      )}

      {entry.homily && (
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-4 text-burgundy uppercase tracking-wide text-sm">
            Homily
          </h2>
          <div className="text-base leading-normal text-ink space-y-4">
            <p className="whitespace-pre-line">{entry.homily}</p>
          </div>
        </section>
      )}
    </article>
  );
}

