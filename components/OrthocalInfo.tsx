import { OrthocalDay } from "@/lib/orthocal";

type OrthocalInfoProps = {
  data: OrthocalDay | null;
};

export default function OrthocalInfo({ data }: OrthocalInfoProps) {
  if (!data) {
    return null;
  }

  return (
    <div>
      {data.readings && data.readings.length > 0 && (
        <section className="mb-16">
          
          <div className="space-y-8">
            {data.abbreviated_reading_indices
              .map(index => data.readings[index])
              .filter(Boolean)
              .map((reading, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-burgundy mb-3 text-base">
                    {reading.display}
                  </h3>
                  <div className="space-y-1 text-base leading-normal text-ink/90">
                    {reading.passage.map((verse, vIndex) => (
                      <p key={vIndex}>
                        <sup className="text-burgundy text-xs mr-1">{verse.verse}</sup>
                        {verse.content}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {data.commemorations && data.commemorations.length > 0 && (
        <section className="mb-12">
          <h3 className="text-sm font-semibold mb-6 text-burgundy uppercase tracking-wide">
            Commemorations
          </h3>
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

