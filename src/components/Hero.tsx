import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { useScrollProgress, ramp } from '@/hooks/useScrollProgress';
import HeroCountdown from '@/components/HeroCountdown';

/**
 * Full-viewport opening stage. It is sticky, so the rest of the page
 * scrolls up over it while the hero sinks away underneath.
 */
const Hero = () => {
  /* Stretched past one viewport so the exit never feels rushed. */
  const progress = useScrollProgress(1.25);

  /* Holds still for a beat, then sinks and dissolves. */
  const exit = ramp(progress, 0.04, 0.84);
  const spent = progress >= 1;

  return (
    <section className="hero-stage" aria-label="Wild AI" aria-hidden={spent}>
      <div
        className="hero-wash"
        aria-hidden="true"
        style={{
          transform: 'translate3d(0, ' + exit * 8 + 'vh, 0)',
          opacity: 1 - exit * 0.6,
        }}
      />
      <div className="hero-grain" aria-hidden="true" />

      <div
        className="container relative mx-auto px-4"
        style={{
          opacity: 1 - exit,
          transform: 'translate3d(0, ' + exit * 20 + 'vh, 0) scale(' + (1 - exit * 0.07) + ')',
          filter: exit > 0.01 ? 'blur(' + exit * 6 + 'px)' : undefined,
          visibility: spent ? 'hidden' : undefined,
          willChange: spent ? undefined : 'transform, opacity',
        }}
      >
        <div className="grid items-center gap-8 lg:gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <div className="line-mask">
              <p className="rise kicker" style={{ ['--rise-delay' as string]: '120ms' }}>
                Wild AI - Minneapolis
              </p>
            </div>

            <h1 className="display-title mt-4 md:mt-7">
              <span className="line-mask">
                <span className="rise" style={{ ['--rise-delay' as string]: '260ms' }}>
                  The room where
                </span>
              </span>
              <span className="line-mask">
                <span className="rise text-gradient" style={{ ['--rise-delay' as string]: '380ms' }}>
                  AI builders
                </span>
              </span>
              <span className="line-mask">
                <span className="rise" style={{ ['--rise-delay' as string]: '500ms' }}>
                  show their work.
                </span>
              </span>
            </h1>

            <div
              className="rise hero-rule mt-9 hidden max-w-sm md:block"
              style={{ ['--rise-delay' as string]: '640ms' }}
            />

            <p
              className="rise mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:mt-7 md:text-lg"
              style={{ ['--rise-delay' as string]: '720ms' }}
            >
              Hear from local AI leaders. Network with researchers and builders. Share ideas that
              shape what&apos;s next.
            </p>

            <div
              className="rise mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-row md:mt-9"
              style={{ ['--rise-delay' as string]: '820ms' }}
            >
              <a href="#register">
                <Button size="lg" className="group w-full px-4 sm:w-auto sm:px-7" tabIndex={spent ? -1 : undefined}>
                  Register now
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <Link to="/events" tabIndex={spent ? -1 : undefined}>
                <Button variant="outline" size="lg" className="w-full px-4 sm:w-auto sm:px-7">
                  Explore events
                </Button>
              </Link>
            </div>
          </div>

          <div className="rise" style={{ ['--rise-delay' as string]: '900ms' }}>
            <HeroCountdown spent={spent} />
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-8 hidden justify-center md:flex"
        style={{
          opacity: 1 - ramp(progress, 0, 0.16),
          visibility: spent ? 'hidden' : undefined,
        }}
        aria-hidden="true"
      >
        <span
          className="rise flex items-center gap-2 kicker"
          style={{ ['--rise-delay' as string]: '1100ms' }}
        >
          Scroll
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </span>
      </div>
    </section>
  );
};

export default Hero;
