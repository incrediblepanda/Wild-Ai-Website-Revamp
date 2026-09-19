import React from 'react';

// NOTE: Placeholder quotes — replace with real attendee testimonials.
const quotes = [
  {
    quote: 'My best AI collab started at a Wild AI meetup.',
    attribution: 'Past attendee',
  },
  {
    quote: 'This is where I found my technical co-founder.',
    attribution: 'Founder, Minneapolis',
  },
  {
    quote: 'Best signal-to-noise of any AI event in the Twin Cities.',
    attribution: 'AI researcher',
  },
];

const Testimonials = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center">WHAT_PEOPLE_SAY</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {quotes.map((q) => (
              <div
                key={q.attribution}
                className="bg-secondary/50 p-6 rounded-lg cyberpunk-border flex flex-col"
              >
                <p className="text-lg leading-relaxed mb-4 flex-1">
                  <span className="text-wildai-mint mr-1">“</span>
                  {q.quote}
                  <span className="text-wildai-mint ml-1">”</span>
                </p>
                <p className="text-sm font-mono text-muted-foreground">
                  — {q.attribution}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
