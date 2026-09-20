import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowDown } from 'lucide-react';
import { LOGO_SRC } from '@/components/Logo';

const meta = [
  { k: 'Cadence', v: 'Every third Monday' },
  { k: 'Format', v: '5 minute fire talks' },
  { k: 'Rule', v: 'No slides' },
];

const tracks = ['Under the hood', 'Tools people built', 'Live demos'];

/**
 * Full-viewport opening stage. It is sticky, so the rest of the page
 * scrolls up over it while the hero eases back.
 */
const Hero = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const span = window.innerHeight;
      setProgress(Math.min(window.scrollY / span, 1));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const eased = progress * progress;

  return (
    <section className="hero-stage" aria-label="Wild AI">
      <div className="hero-wash" aria-hidden="true" />
      <div className="hero-grain" aria-hidden="true" />

      {/* Oversized ghosted mark anchors the composition. */}
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -right-[22%] top-1/2 hidden w-[58%] -translate-y-1/2 opacity-[0.028] lg:block"
        style={{ transform: `translateY(-50%) translateX(${progress * 8}%)` }}
      />

      <div
        className="container relative mx-auto px-4"
        style={{
          opacity: 1 - eased * 1.35,
          transform: `translateY(${-progress * 8}vh) scale(${1 - eased * 0.06})`,
        }}
      >
        <div className="grid items-end gap-12 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <div className="line-mask">
              <p className="rise kicker" style={{ ['--rise-delay' as string]: '120ms' }}>
                Wild AI — Minneapolis
              </p>
            </div>

            <h1 className="display-title mt-7">
              <span className="line-mask">
                <span className="rise" style={{ ['--rise-delay' as string]: '260ms' }}>
                  The room where
                </span>
              </span>
              <span className="line-mask">
                <span className="rise" style={{ ['--rise-delay' as string]: '380ms' }}>
                  <span className="-mx-1 inline-block bg-primary px-3 pb-1 text-primary-foreground">
                    AI builders
                  </span>
                </span>
              </span>
              <span className="line-mask">
                <span className="rise" style={{ ['--rise-delay' as string]: '500ms' }}>
                  show their work.
                </span>
              </span>
            </h1>

            <div
              className="rise hero-rule mt-9 max-w-sm"
              style={{ ['--rise-delay' as string]: '640ms' }}
            />

            <p
              className="rise mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground"
              style={{ ['--rise-delay' as string]: '720ms' }}
            >
              Hear from local AI leaders. Network with researchers and builders. Share ideas that
              shape what&apos;s next.
            </p>

            <div
              className="rise mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ ['--rise-delay' as string]: '820ms' }}
            >
              <a href="#register">
                <Button size="lg" className="group w-full sm:w-auto">
                  Register now
                  <ArrowRight className="transition-transform group-hover:translate-x-1" />
                </Button>
              </a>
              <Link to="/events">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Explore events
                </Button>
              </Link>
            </div>
          </div>

          <div
            className="rise hidden lg:block"
            style={{ ['--rise-delay' as string]: '900ms' }}
          >
            <ul className="flex flex-col">
              {tracks.map((track, i) => (
                <li
                  key={track}
                  className="flex items-baseline gap-5 border-t border-border/70 py-4 last:border-b"
                >
                  <span className="font-mono text-[0.625rem] text-muted-foreground">
                    0{i + 1}
                  </span>
                  <span className="text-base text-foreground">{track}</span>
                </li>
              ))}
            </ul>

            <dl className="mt-10 space-y-4">
              {meta.map((m) => (
                <div key={m.k} className="flex items-baseline justify-between gap-6">
                  <dt className="kicker">{m.k}</dt>
                  <dd className="text-sm text-foreground">{m.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-8 flex justify-center"
        style={{ opacity: 1 - progress * 2.5 }}
        aria-hidden="true"
      >
        <span className="rise flex items-center gap-2 kicker" style={{ ['--rise-delay' as string]: '1100ms' }}>
          Scroll
          <ArrowDown className="h-3.5 w-3.5 animate-bounce" />
        </span>
      </div>
    </section>
  );
};

export default Hero;
