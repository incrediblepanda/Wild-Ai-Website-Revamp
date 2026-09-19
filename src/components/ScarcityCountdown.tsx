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
    <section className="pt-24 md:pt-28 pb-10 md:pb-14">
      <div className="container mx-auto px-4">
        <div className="panel panel--notched p-6 md:p-8">
            <div className="flex items-center gap-2.5 mb-6">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-accent animate-pulse-slow" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-accent">
                Next event starts in
              </p>
            </div>

            {tiles ? (
              <div className="grid grid-cols-4 border-l border-t border-border mb-7">
                {tiles.map((t) => (
                  <div key={t.label} className="border-r border-b border-border px-3 py-5 md:py-7">
                    <p className="font-mono text-3xl md:text-5xl font-medium text-foreground leading-none tabular-nums">
                      {String(t.value).padStart(2, '0')}
                    </p>
                    <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground mt-3">
                      {t.label}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-display text-2xl md:text-3xl text-foreground mb-7">
                Doors opening soon
              </p>
            )}

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pt-1">
              <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
                RSVP and we&apos;ll email you event details, the speaker lineup, and a reminder the
                day before.
              </p>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent/80 whitespace-nowrap">
                Most events fill up — RSVP early
              </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default ScarcityCountdown;
