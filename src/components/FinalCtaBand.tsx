import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

const FinalCtaBand = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="max-w-3xl">
            <p className="eyebrow mb-7">Last call</p>
            <h2 className="display-title text-balance text-[2.5rem] md:text-5xl lg:text-6xl">
              Come meet the people <em>building AI</em>.
            </h2>
            <div className="hero-rule mt-9 max-w-sm" />
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Seats are limited and most events fill up. Lock in your spot for the next meetup.
            </p>
            <a href="#register" className="mt-9 inline-block">
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
