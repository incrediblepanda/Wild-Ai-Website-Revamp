import React from 'react';
import { Quote } from 'lucide-react';
import SpotlightCard from '@/components/motion/SpotlightCard';
import Reveal from '@/components/motion/Reveal';

// NOTE: Placeholder quotes - replace with real attendee testimonials.
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
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <p className="eyebrow mb-5">
            <Quote /> Word of mouth
          </p>
          <h2 className="section-title">What people say</h2>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.attribution} delay={i * 80}>
              <SpotlightCard className="flex h-full flex-col p-7">
                <Quote className="mb-5 h-6 w-6 text-accent/50" />
                <p className="flex-1 font-display text-lg leading-relaxed text-foreground">
                  {q.quote}
                </p>
                <p className="mt-6 flex items-center gap-2.5 border-t border-border pt-5 text-sm text-muted-foreground">
                  <span className="h-px w-5 bg-accent/60" />
                  {q.attribution}
                </p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
