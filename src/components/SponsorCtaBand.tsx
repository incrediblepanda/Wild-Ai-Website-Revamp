import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Handshake } from 'lucide-react';

/** Full-width sponsorship band. */
const SponsorCtaBand = () => (
  <section className="py-10 md:py-14">
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto bg-secondary/50 rounded-lg cyberpunk-border p-8 md:p-12 text-center">
        <Handshake className="w-10 h-10 text-wildai-mint mx-auto mb-4" />
        <h2 className="text-2xl md:text-3xl font-bold font-mono mb-3">
          REACH AI <span className="text-gradient">BUILDERS</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-6">
          Sponsor a Wild AI chapter and put your brand in front of hundreds of engineers,
          founders, and researchers who ship. Sponsorships fund venues, food, and growth.
        </p>
        <Link to="/sponsor">
          <Button size="lg" className="bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal">
            BECOME A SPONSOR
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

export default SponsorCtaBand;
