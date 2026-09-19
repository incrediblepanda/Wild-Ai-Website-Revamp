import React from 'react';
import { Button } from '@/components/ui/button';

const audience = [
  'Builders & founders shipping AI products',
  'Researchers & data scientists',
  'Engineers exploring AI in their stack',
  'Curious newcomers to the field',
];

const reasons = [
  'Find collaborators and co-founders',
  'Discover early-stage AI products',
  'Get feedback on your AI project',
  'Meet local AI leaders in person',
  'Stay ahead of what is shipping',
];

const columns = [
  { key: 'Who it\u2019s for', items: audience, tone: 'bg-secondary/50' },
  { key: 'Why attend', items: reasons, tone: 'bg-primary/25' },
];

const WhoItsFor = () => {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <p className="signal-label mb-5">The room</p>
        <h2 className="section-title max-w-2xl">Who shows up, and why they keep coming back</h2>

        <div className="grid md:grid-cols-2 gap-6 mt-10 mb-10">
          {columns.map((col) => (
            <div key={col.key} className={`cyberpunk-border p-7 ${col.tone}`}>
              <h3 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent mb-6">
                {col.key}
              </h3>
              <ul className="space-y-4">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed">
                    <span className="mt-2 h-px w-3 flex-shrink-0 bg-accent/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <a href="#register">
          <Button size="lg">Register now</Button>
        </a>
      </div>
    </section>
  );
};

export default WhoItsFor;
