import React from 'react';
import { Button } from '@/components/ui/button';

const FinalCtaBand = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center bg-secondary/50 p-8 md:p-12 rounded-lg cyberpunk-border">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
            Come Meet the People <span className="text-gradient">Building AI</span>.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Seats are limited and most events fill up. Lock in your spot for the
            next meetup.
          </p>
          <a href="#register">
            <Button
              size="lg"
              className="bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal text-lg"
            >
              REGISTER NOW
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaBand;
