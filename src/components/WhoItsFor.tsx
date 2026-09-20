import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus, Compass } from 'lucide-react';
import SpotlightCard from '@/components/motion/SpotlightCard';
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
  { key: 'Who it\u2019s for', icon: UserPlus, items: audience, accent: 'accent' as const },
  { key: 'Why attend', icon: Compass, items: reasons, accent: 'ember' as const },
];

const WhoItsFor = () => {
  return (
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
              <SpotlightCard className="h-full p-7">
                <div className="mb-6 flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                      col.accent === 'accent'
                        ? 'border-accent/30 bg-accent/10 text-accent'
                        : 'border-ember/30 bg-ember/10 text-ember'
                    }`}
                  >
                    <col.icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{col.key}</h3>
                </div>
                <ul className="space-y-1">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-start gap-3 rounded-lg px-3 py-2.5 text-[0.9375rem] leading-relaxed transition-colors hover:bg-secondary/60"
                    >
                      <span
                        className={`mt-[0.6rem] h-1.5 w-1.5 flex-shrink-0 rounded-full transition-transform group-hover:scale-150 ${
                          col.accent === 'accent' ? 'bg-accent/70' : 'bg-ember/70'
                        }`}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
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
};

export default WhoItsFor;
