import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import AmbientField from '@/components/motion/AmbientField';

const FinalCtaBand = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <AmbientField className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
      <div className="container relative mx-auto px-4">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-6 justify-center">Last call</p>
            <h2 className="display-title mb-6 text-balance text-4xl md:text-5xl lg:text-6xl">
              Come meet the people <em>building AI</em>.
            </h2>
            <p className="mx-auto mb-9 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Seats are limited and most events fill up. Lock in your spot for the next meetup.
            </p>
            <a href="#register">
              <Button size="lg" className="group">
                Register now
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default FinalCtaBand;
