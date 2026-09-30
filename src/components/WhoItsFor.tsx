import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

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
  { key: 'Who it\u2019s for', items: audience },
  { key: 'Why attend', items: reasons },
];

const WhoItsFor = () => (
  <section className="py-14 md:py-20">
    <div className="container mx-auto px-4">
      <Reveal>
        <p className="eyebrow mb-5">The room</p>
        <h2 className="section-title max-w-2xl text-balance">
          Who shows up, and why they keep coming back
        </h2>
        <p className="section-lede">
          Whether you train models for a living or just installed your first library last weekend,
          there is a seat here.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {columns.map((col, colIndex) => (
          <Reveal key={col.key} delay={colIndex * 100}>
            <div className="glass h-full p-7 md:p-8">
              <div className="flex items-baseline justify-between gap-4 border-b border-border/60 pb-4">
                <h3 className="font-display text-lg font-semibold">{col.key}</h3>
                <span className="kicker">
                  {String(col.items.length).padStart(2, '0')}
                </span>
              </div>
              <ul className="mt-2">
                {col.items.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-5 border-b border-border/40 py-3.5 text-[0.9375rem] leading-relaxed last:border-b-0"
                  >
                    <span className="font-mono text-[0.625rem] text-muted-foreground">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={150} className="mt-10">
        <a href="#register">
          <Button size="lg" className="group">
            Register now
            <ArrowRight className="transition-transform group-hover:translate-x-1" />
          </Button>
        </a>
      </Reveal>
    </div>
  </section>
);

export default WhoItsFor;
