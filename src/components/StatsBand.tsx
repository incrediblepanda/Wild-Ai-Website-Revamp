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
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 border-l border-t border-border">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-background p-5 md:p-7 border-r border-b border-border text-center"
            >
              <p className="text-3xl md:text-4xl font-semibold text-primary mb-1">
                {s.value}
              </p>
              <p className="text-xs md:text-sm text-muted-foreground">
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
