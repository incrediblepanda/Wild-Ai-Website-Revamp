import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import NetworkField from '@/components/NetworkField';

const meta = [
  { k: 'Cadence', v: 'Every third Monday' },
  { k: 'Format', v: '5 minute fire talks' },
  { k: 'Rule', v: 'No slides' },
];

const Hero = () => {
  return (
    <section className="editorial-hero relative overflow-hidden border-b border-border/60">
      <div className="container mx-auto px-4 py-14 md:py-24">
        <div className="grid lg:grid-cols-[1.08fr_.92fr] gap-12 lg:gap-16 items-center">
          <div className="relative z-10">
            <p className="signal-label mb-6">Wild AI // Minneapolis</p>
            <h1 className="display-title mb-7">
              The room where <em>AI builders</em> show their work.
            </h1>
            <p className="text-lg text-muted-foreground mb-9 max-w-xl leading-relaxed">
              Hear from local AI leaders. Network with researchers and builders. Share ideas that
              shape what&apos;s next.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a href="#register">
                <Button size="lg" className="w-full sm:w-auto">
                  Register now <ArrowRight />
                </Button>
              </a>
              <Link to="/events">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore events
                </Button>
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-1 sm:grid-cols-3 border-t border-border">
              {meta.map((m) => (
                <div key={m.k} className="py-4 sm:pr-6 border-b sm:border-b-0 border-border/70">
                  <dt className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent/80 mb-1.5">
                    {m.k}
                  </dt>
                  <dd className="text-sm text-muted-foreground">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <NetworkField />
        </div>
      </div>
    </section>
  );
};

export default Hero;
