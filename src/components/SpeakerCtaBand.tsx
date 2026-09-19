import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic2 } from 'lucide-react';

/** Full-width speaker recruitment band. */
const SpeakerCtaBand = () => (
  <section className="py-10 md:py-14">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto bg-gradient-to-br from-wildai-mint/20 to-accent/20 rounded-lg cyberpunk-border p-8 md:p-12 text-center">
        <Mic2 className="w-10 h-10 text-wildai-mint mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold font-mono mb-3">
          WANT TO <span className="text-gradient">DEMO</span>?
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          We're always looking for builders, researchers, and tinkerers to give 5-minute,
          no-slides fire talks at any chapter. Show the community what you're working on.
        </p>
        <Link to="/speak">
          <Button size="lg" className="bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal">
            SUBMIT A DEMO
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default SpeakerCtaBand;
