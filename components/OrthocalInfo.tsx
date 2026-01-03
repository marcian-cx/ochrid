import { OrthocalDay, Reading } from "@/lib/orthocal";

type OrthocalInfoProps = {
  data: OrthocalDay | null;
};

function isEpistleReading(reading: Reading): boolean {
  const epistleBooks = [
    "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
    "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
    "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
    "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude",
    "Acts", "Revelation"
  ];
  return epistleBooks.some(book => reading.display.startsWith(book));
}

export default function OrthocalInfo({ data }: OrthocalInfoProps) {
  if (!data) {
    return null;
  }

  const readings = data.abbreviated_reading_indices
    .map(index => data.readings[index])
    .filter(Boolean);

  const epistleReadings = readings.filter(isEpistleReading);
  const gospelReadings = readings.filter(r => !isEpistleReading(r));

  const renderReadings = (readingList: Reading[]) => (
    <div className="space-y-6">
      {readingList.map((reading, index) => (
        <div key={index}>
          <p className="text-sm uppercase tracking-wider text-burgundy/90 mb-3 font-semibold">
            {reading.display}
          </p>
          <div className="text-base leading-normal text-ink/90">
            {reading.passage.map((verse, vIndex) => (
              <p key={vIndex} className="mb-1 last:mb-0">
                <sup className="text-burgundy text-xs mr-1">{verse.verse}</sup>
                {verse.content}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      {epistleReadings.length > 0 && (
        <section className="mb-12">
          <h2 className="text-base font-bold text-burgundy uppercase tracking-wider border-b border-gold pb-2 mb-4">
            Epistle
          </h2>
          {renderReadings(epistleReadings)}
        </section>
      )}

      {gospelReadings.length > 0 && (
        <section className="mb-12">
          <h2 className="text-base font-bold text-burgundy uppercase tracking-wider border-b border-gold pb-2 mb-4">
            Gospel
          </h2>
          {renderReadings(gospelReadings)}
        </section>
      )}

      {data.commemorations && data.commemorations.length > 0 && (
        <section className="mb-12">
          <h2 className="text-base font-bold text-burgundy uppercase tracking-wider border-b border-gold pb-2 mb-4">
            Commemorations
          </h2>
          <ul className="space-y-2 text-sm text-ink/80">
            {data.commemorations.map((commemoration, index) => (
              <li key={index} className="pl-3 border-l border-burgundy/30">
                {commemoration}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

