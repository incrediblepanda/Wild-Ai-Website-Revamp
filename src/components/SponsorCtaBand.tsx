import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Handshake } from 'lucide-react';

/** Full-width sponsorship band. */
const SponsorCtaBand = () => (
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-4">
      <div className="cyberpunk-border bg-secondary/50 p-8 md:p-12 grid md:grid-cols-[1fr_auto] gap-8 md:items-end">
        <div>
          <p className="signal-label mb-5">
            <Handshake /> Partners
          </p>
          <h2 className="section-title mb-4 max-w-xl">Reach AI builders</h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Sponsor a Wild AI chapter and put your brand in front of hundreds of engineers,
            founders, and researchers who ship. Sponsorships fund venues, food, and growth.
          </p>
        </div>
        <Link to="/sponsor" className="flex-shrink-0">
          <Button size="lg" variant="outline">
            Become a sponsor
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default SponsorCtaBand;
