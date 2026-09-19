import React, { useEffect, useState } from 'react';

// TODO: Wire to events data — currently hardcoded to match EventDetails.tsx.
const EVENT_DATE = new Date('2026-08-17T18:00:00-05:00');

function getDiff(target: Date) {
  const ms = target.getTime() - Date.now();
  if (ms <= 0) return null;
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const min = Math.floor((ms / (1000 * 60)) % 60);
  const sec = Math.floor((ms / 1000) % 60);
  return { days, hrs, min, sec };
}

const ScarcityCountdown = () => {
  const [diff, setDiff] = useState(() => getDiff(EVENT_DATE));

  useEffect(() => {
    const id = setInterval(() => setDiff(getDiff(EVENT_DATE)), 1000);
    return () => clearInterval(id);
  }, []);

  const tiles = diff
    ? [
        { label: 'Days', value: diff.days },
        { label: 'Hrs', value: diff.hrs },
        { label: 'Min', value: diff.min },
        { label: 'Sec', value: diff.sec },
      ]
    : null;

  return (
    <section className="pt-24 md:pt-28 pb-8 md:pb-12 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs md:text-sm font-mono text-wildai-mint mb-4 uppercase tracking-[0.3em]">
            ◢ Next Event Starts In ◣
          </p>

          {tiles ? (
            <div className="flex justify-center gap-3 md:gap-6 mb-8">
              {tiles.map((t) => (
                <div
                  key={t.label}
                  className="bg-secondary cyberpunk-border rounded-xl px-5 py-5 md:px-10 md:py-7 min-w-[88px] md:min-w-[140px] shadow-[0_0_40px_-10px_hsl(var(--wildai-mint)/0.5)]"
                >
                  <p className="text-4xl md:text-7xl font-bold font-mono text-wildai-mint leading-none drop-shadow-[0_0_12px_hsl(var(--wildai-mint)/0.6)]">
                    {String(t.value).padStart(2, '0')}
                  </p>
                  <p className="text-[11px] md:text-sm text-muted-foreground font-mono uppercase mt-2 tracking-widest">
                    {t.label}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-2xl md:text-3xl font-mono text-wildai-mint mb-8">
              Doors opening soon
            </p>
          )}

          <p className="text-lg md:text-xl text-foreground mb-2">
            RSVP and we'll email you event details, the speaker lineup, and a reminder the day before.
          </p>
          <p className="text-sm md:text-base font-mono text-wildai-mint uppercase tracking-wide">
            ⚡ Most events fill up — RSVP early ⚡
          </p>
        </div>
      </div>
    </section>
  );
};

export default ScarcityCountdown;
