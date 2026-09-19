import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic2 } from 'lucide-react';

/** Full-width speaker recruitment band. */
const SpeakerCtaBand = () => (
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-4">
      <div className="cyberpunk-border bg-primary/25 p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-8 md:items-end">
        <div>
          <p className="signal-label mb-5">
            <Mic2 /> Open call
          </p>
          <h2 className="section-title mb-4 max-w-xl">Want to demo?</h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            We&apos;re always looking for builders, researchers, and tinkerers to give 5-minute,
            no-slides fire talks at any chapter. Show the community what you&apos;re working on.
          </p>
        </div>
        <Link to="/speak" className="flex-shrink-0">
          <Button size="lg">Submit a demo</Button>
        </Link>
      </div>
    </div>
  </section>
);

export default SpeakerCtaBand;
