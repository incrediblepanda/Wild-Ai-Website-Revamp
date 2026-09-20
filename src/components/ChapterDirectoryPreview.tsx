import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Rocket } from 'lucide-react';
import { useChapters } from '@/hooks/useChapters';
import SpotlightCard from '@/components/motion/SpotlightCard';
import Reveal from '@/components/motion/Reveal';

/** Home page chapter directory preview: cards for every chapter + "more coming". */
const ChapterDirectoryPreview = () => {
  const { data: chapters, isLoading } = useChapters();

  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <p className="eyebrow mb-5">
            <MapPin /> Network
          </p>
          <h2 className="section-title max-w-2xl text-balance">Find your chapter</h2>
          <p className="section-lede">
            Wild AI is one community with local chapters. Same format, same energy - in your city.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {isLoading
            ? [0, 1, 2].map((i) => (
                <div key={i} className="surface h-56 animate-pulse" />
              ))
            : (chapters ?? []).map((c, i) => (
                <Reveal key={c.id} delay={i * 80}>
                  <SpotlightCard as={Link} to={`/${c.slug}`} className="group block h-full p-6">
                    <div className="flex h-full flex-col">
                      <div className="mb-5 flex items-start justify-between gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/25 bg-accent/10 text-accent">
                          <MapPin className="h-4 w-4" />
                        </span>
                        {c.status === 'launching' ? (
                          <span className="chip chip-ember">
                            <Rocket className="h-3 w-3" /> Launching
                          </span>
                        ) : (
                          <span className="chip chip-accent">
                            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> Active
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-xl font-semibold">{c.city}</h3>
                      <p className="mt-0.5 text-xs text-muted-foreground">{c.region}</p>
                      <p className="mt-3 flex-grow text-sm leading-relaxed text-muted-foreground">
                        {c.tagline}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                        Go to chapter
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </SpotlightCard>
                </Reveal>
              ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-10 flex flex-col items-start gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Don&apos;t see your city? <span className="text-accent">More coming soon.</span>
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link to="/chapters">
                <Button variant="outline" className="w-full sm:w-auto">
                  All chapters
                </Button>
              </Link>
              <Link to="/start-a-chapter">
                <Button className="w-full sm:w-auto">Start a chapter</Button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ChapterDirectoryPreview;
