import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Rocket } from 'lucide-react';
import { useChapters } from '@/hooks/useChapters';

/** Home page chapter directory preview: cards for every chapter + "more coming". */
const ChapterDirectoryPreview = () => {
  const { data: chapters, isLoading } = useChapters();

  return (
    <section className="py-10 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center">Find your chapter</h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Wild AI is one community with local chapters. Same format, same energy — in your city.
          </p>

          <div className="grid md:grid-cols-3 border-l border-t border-border">
            {isLoading
              ? [0, 1, 2].map((i) => (
                  <div key={i} className="bg-secondary/30 border-r border-b border-border p-6 h-52 animate-pulse" />
                ))
              : (chapters ?? []).map((c) => (
                  <Link
                    key={c.id}
                    to={`/${c.slug}`}
                    className="bg-secondary/20 border-r border-b border-border p-6 flex flex-col hover:bg-secondary/60 transition-colors group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <MapPin className="w-6 h-6 text-wildai-mint" />
                      {c.status === 'launching' ? (
                        <span className="text-[10px] font-mono text-wildai-mint border border-wildai-mint/40 rounded px-2 py-0.5 flex items-center gap-1">
                          <Rocket className="w-3 h-3" /> LAUNCHING
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-wildai-mint">ACTIVE</span>
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{c.city}</h3>
                    <p className="text-xs text-muted-foreground mb-3">{c.region}</p>
                    <p className="text-sm text-muted-foreground flex-grow">{c.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-wildai-mint group-hover:gap-2 transition-all">
                      Go to chapter <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
          </div>

          <div className="text-center mt-10 space-y-4">
            <p className="text-sm text-muted-foreground">
              Don't see your city? <span className="text-wildai-mint">More coming soon.</span>
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/chapters">
                <Button variant="outline" className="w-full sm:w-auto">
                  All chapters
                </Button>
              </Link>
              <Link to="/start-a-chapter">
                <Button className="w-full sm:w-auto">
                  Start a chapter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChapterDirectoryPreview;
