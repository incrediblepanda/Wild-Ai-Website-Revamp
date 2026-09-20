import React from 'react';
import CountUp from '@/components/motion/CountUp';
import Reveal from '@/components/motion/Reveal';

// NOTE: Placeholder numbers — replace with real metrics when available.
const stats = [
  { value: '500+', label: 'Attendees so far' },
  { value: '12+', label: 'Events hosted' },
  { value: '40+', label: 'Speakers & builders' },
  { value: '~70%', label: 'Return for another event' },
];

const StatsBand = () => {
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 70}
              className="group relative bg-background/70 p-6 backdrop-blur-sm transition-colors hover:bg-secondary/50 md:p-8"
            >
              <p className="font-display text-3xl md:text-[2.5rem] font-semibold tabular-nums text-foreground">
                <CountUp value={s.value} />
              </p>
              <p className="mt-2 text-[0.8125rem] text-muted-foreground leading-snug">{s.label}</p>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-accent/70 transition-all duration-500 group-hover:w-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBand;
