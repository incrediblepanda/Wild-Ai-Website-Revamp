import React from 'react';

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
        <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-border">
          {stats.map((s) => (
            <div key={s.label} className="p-6 md:p-8 border-r border-b border-border">
              <p className="font-mono text-3xl md:text-4xl font-medium text-foreground mb-2 tabular-nums">
                {s.value}
              </p>
              <p className="font-mono text-[0.625rem] uppercase tracking-[0.18em] text-muted-foreground leading-relaxed">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBand;
