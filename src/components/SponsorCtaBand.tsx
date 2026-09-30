import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Handshake, ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

/** Full-width sponsorship band. */
const SponsorCtaBand = () => (
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-4">
      <Reveal>
        <div className="surface relative overflow-hidden p-6 md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-ember/10 blur-3xl"
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow mb-5 text-ember">
                <Handshake /> Partners
              </p>
              <h2 className="section-title max-w-xl text-balance">Reach AI builders</h2>
              <p className="section-lede">
                Sponsor a Wild AI chapter and put your brand in front of hundreds of engineers,
                founders, and researchers who ship. Sponsorships fund venues, food, and growth.
              </p>
            </div>
            <Link to="/sponsor" className="flex-shrink-0">
              <Button size="lg" variant="outline" className="group">
                Become a sponsor
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default SponsorCtaBand;
