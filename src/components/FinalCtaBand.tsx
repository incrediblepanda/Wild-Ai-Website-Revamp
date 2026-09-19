import React from 'react';
import { Button } from '@/components/ui/button';

const FinalCtaBand = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl">
          <p className="signal-label mb-6">Last call</p>
          <h2 className="display-title text-4xl md:text-5xl lg:text-6xl mb-6">
            Come meet the people <em>building AI</em>.
          </h2>
          <p className="text-lg text-muted-foreground mb-9 max-w-xl leading-relaxed">
            Seats are limited and most events fill up. Lock in your spot for the next meetup.
          </p>
          <a href="#register">
            <Button size="lg">Register now</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaBand;
