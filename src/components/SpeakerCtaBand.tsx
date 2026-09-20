import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic2, ArrowRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

/** Full-width speaker recruitment band. */
const SpeakerCtaBand = () => (
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-4">
      <Reveal>
        <div className="surface relative overflow-hidden p-8 md:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow mb-5">
                <Mic2 /> Open call
              </p>
              <h2 className="section-title max-w-xl text-balance">Want to demo?</h2>
              <p className="section-lede">
                We&apos;re always looking for builders, researchers, and tinkerers to give 5-minute,
                no-slides fire talks at any chapter. Show the community what you&apos;re working on.
              </p>
            </div>
            <Link to="/speak" className="flex-shrink-0">
              <Button size="lg" className="group">
                Submit a demo
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

export default SpeakerCtaBand;
