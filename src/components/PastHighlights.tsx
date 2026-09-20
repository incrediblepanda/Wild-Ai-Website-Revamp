import React from 'react';
import { Youtube, PlayCircle, ArrowUpRight } from 'lucide-react';
import SpotlightCard from '@/components/motion/SpotlightCard';
import Reveal from '@/components/motion/Reveal';

// NOTE: Placeholder highlights — swap with real past-event data.
const highlights = [
  {
    date: 'May 2026',
    title: 'AI Agents in Production',
    highlight: 'Live demos from 4 local startups shipping agent workflows.',
  },
  {
    date: 'April 2026',
    title: 'Foundation Models & Fine-Tuning',
    highlight: 'Deep dive on cost-effective fine-tuning strategies.',
  },
  {
    date: 'March 2026',
    title: 'AI in Healthcare',
    highlight: 'Researchers and operators on clinical AI deployment.',
  },
  {
    date: 'February 2026',
    title: 'Builders Night',
    highlight: 'Six rapid-fire demos from Minneapolis AI builders.',
  },
];

const PastHighlights = () => {
  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <p className="eyebrow mb-5">
            <PlayCircle /> The archive
          </p>
          <h2 className="section-title">Past events</h2>
          <p className="section-lede">
            Every month is a different corner of the stack — from research deep dives to weekend
            side projects.
          </p>
        </Reveal>

        {/* Timeline rail: each entry hangs off a shared vertical line. */}
        <div className="relative mt-10 md:pl-8">
          <span
            aria-hidden="true"
            className="absolute left-0 top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-accent/40 via-border to-transparent md:block"
          />
          <div className="grid gap-5 md:grid-cols-2">
            {highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 70}>
                <SpotlightCard className="group relative h-full p-6">
                  <span
                    aria-hidden="true"
                    className="absolute -left-8 top-8 hidden h-2 w-2 -translate-x-1/2 rounded-full bg-accent/60 ring-4 ring-background transition-transform group-hover:scale-125 md:block"
                  />
                  <p className="kicker mb-3 text-accent/90">{h.date}</p>
                  <h3 className="font-display text-lg font-semibold">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {h.highlight}
                  </p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={120} className="mt-10">
          <a
            href="https://www.youtube.com/@WildAI-US"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-border bg-secondary/50 py-3 pl-4 pr-5 text-sm font-medium transition-colors hover:border-accent/40 hover:bg-secondary"
          >
            <Youtube className="h-5 w-5 text-accent" />
            <span>Watch past events on YouTube</span>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default PastHighlights;
