import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Wrench, Sparkles } from 'lucide-react';
import NetworkField from '@/components/NetworkField';
import AmbientField from '@/components/motion/AmbientField';
import Reveal from '@/components/motion/Reveal';

const meta = [
  { k: 'Cadence', v: 'Every third Monday' },
  { k: 'Format', v: '5 minute fire talks' },
  { k: 'Rule', v: 'No slides' },
];

const tracks = [
  { icon: Terminal, label: 'Under the hood' },
  { icon: Wrench, label: 'Tools people built' },
  { icon: Sparkles, label: 'Live demos' },
];

const Hero = () => {
  return (
    <section className="editorial-hero relative overflow-hidden">
      <AmbientField className="pointer-events-none absolute inset-0 h-full w-full opacity-70" />

      <div className="container relative mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1.1fr_.9fr] gap-12 lg:gap-16 items-center">
          <div className="relative z-10">
            <Reveal>
              <p className="eyebrow mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Wild AI // Minneapolis
              </p>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display-title mb-7 text-balance">
                The room where <em>AI builders</em> show their work.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
                Hear from local AI leaders. Network with researchers and builders. Share ideas that
                shape what&apos;s next.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mb-9 flex flex-wrap gap-2">
                {tracks.map((t) => (
                  <span key={t.label} className="chip">
                    <t.icon className="h-3 w-3" /> {t.label}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#register">
                  <Button size="lg" className="group w-full sm:w-auto">
                    Register now
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </a>
                <Link to="/events">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore events
                  </Button>
                </Link>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-px overflow-hidden rounded-xl border border-border bg-border">
                {meta.map((m) => (
                  <div key={m.k} className="bg-background/60 px-5 py-4 backdrop-blur-sm">
                    <dt className="kicker mb-1.5 text-accent/90">{m.k}</dt>
                    <dd className="text-sm text-foreground">{m.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative z-10">
            <NetworkField />
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Hero;
