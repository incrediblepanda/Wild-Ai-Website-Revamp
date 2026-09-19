import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailCapture from '@/components/EmailCapture';
import { Button } from '@/components/ui/button';
import { MapPin, Users, CalendarDays, Rocket, ArrowRight } from 'lucide-react';
import { useChapters, useAllEvents, isUpcoming, formatDate } from '@/hooks/useChapters';
import NetworkField from '@/components/NetworkField';
import chaptersNight from '@/assets/wildai-chapters-night.jpg';

const Chapters = () => {
  const { data: chapters, isLoading } = useChapters();
  const { data: events } = useAllEvents();

  const nextEventFor = (chapterId: string) =>
    (events ?? [])
      .filter((e) => e.chapter_id === chapterId && isUpcoming(e.event_date))
      .sort((a, b) => a.event_date.localeCompare(b.event_date))[0];

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Find a Wild AI Chapter — Minneapolis, San Francisco, Toronto</title>
        <meta
          name="description"
          content="Wild AI meetups across Minneapolis, San Francisco, and Toronto. Find your city, meet local AI builders, and RSVP for the next event."
        />
        <meta property="og:title" content="Find a Wild AI Chapter" />
        <meta
          property="og:description"
          content="Wild AI meetups across Minneapolis, San Francisco, and Toronto. Find your city and RSVP."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Navbar />
      <main className="pt-20 pb-20 flex-grow chapters-page">
        <section className="chapters-hero">
          <img src={chaptersNight} alt="AI builders arriving at a city meetup at night" width={1920} height={1080} className="chapters-hero__image" />
          <div className="chapters-hero__veil" aria-hidden="true" />
          <div className="container mx-auto px-4 relative z-10 h-full flex items-end pb-10 md:pb-14">
            <div className="w-full grid lg:grid-cols-[1fr_250px] gap-10 items-end">
              <div className="max-w-4xl">
                <p className="signal-label mb-5">Wild AI chapters</p>
                <h1 className="chapters-hero__title">Find your<br /><span>community.</span></h1>
                <p className="text-base md:text-xl text-foreground/80 max-w-xl mt-5">
                  Meet local AI builders and find the next Wild AI event near you.
                </p>
              </div>
              <div className="chapters-hero__telemetry">
                <span>Across North America</span>
                <strong>{chapters?.length ?? 0} chapters</strong>
                <span>{(chapters ?? []).reduce((sum, chapter) => sum + (chapter.member_count ?? 0), 0)}+ members</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 max-w-7xl">
            <div className="py-8 lg:pr-8 lg:border-r border-border">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold">Our communities</h2>
              </div>
              <NetworkField compact />
            </div>
            <div className="py-8 lg:pl-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold">Chapter map</h2>
              </div>
              <div className="cyberpunk-border overflow-hidden h-[360px] grayscale contrast-125 opacity-80 hover:grayscale-0 transition-all duration-500">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-132.0%2C22.0%2C-52.0%2C56.0&layer=mapnik"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  title="Wild AI chapters map"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12 md:py-20 max-w-7xl">
          <div className="flex items-end justify-between gap-6 mb-8 border-b border-border pb-5">
              <h2 className="section-title mb-0">Chapter directory</h2>
          </div>
          <div className="grid md:grid-cols-3 border-l border-t border-border mb-16">
            {isLoading &&
              [0, 1, 2].map((i) => (
                <div key={i} className="bg-secondary/50 border-r border-b border-border p-6 h-72 animate-pulse" />
              ))}
            {(chapters ?? []).map((c, index) => {
              const next = nextEventFor(c.id);
              return (
                <div key={c.id} className="chapter-node bg-secondary/30 border-r border-b border-border p-6 flex flex-col min-h-72">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-muted-foreground">Chapter {index + 1}</span>
                    {c.status === 'launching' ? (
                      <span className="text-[10px] font-mono text-wildai-mint border border-wildai-mint/40 px-2 py-0.5 flex items-center gap-1">
                        <Rocket className="w-3 h-3" /> Launching
                      </span>
                    ) : (
                      <span className="text-xs text-primary">Active</span>
                    )}
                  </div>
                  <MapPin className="w-5 h-5 text-wildai-mint mb-4" />
                  <h3 className="text-2xl font-semibold mb-1">{c.city}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{c.region}</p>
                  <p className="text-sm text-muted-foreground mb-4 flex-grow">{c.tagline}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Users className="w-3.5 h-3.5 text-wildai-mint" />
                    <span>{c.member_count ?? 0}+ members</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-5">
                    <CalendarDays className="w-3.5 h-3.5 text-wildai-mint" />
                    {next ? (
                      <span>Next: {formatDate(next.event_date)}</span>
                    ) : (
                      <span>{c.cadence ?? 'Dates announced at launch'}</span>
                    )}
                  </div>
                  <Link to={`/${c.slug}`} className="mt-auto">
                    <Button className="w-full group">
                      View chapter <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Don't see your city + notify-me */}
          <div className="grid md:grid-cols-2 border-l border-t border-border">
            <div className="bg-secondary/30 border-r border-b border-border p-8 flex flex-col justify-center">
              <h2 className="text-xl font-semibold mb-2">Don't see your city?</h2>
              <p className="text-sm text-muted-foreground mb-5">
                We help passionate locals launch new Wild AI chapters — playbook, brand, and
                community included.
              </p>
              <Link to="/start-a-chapter">
                <Button variant="outline" className="w-full md:w-auto">
                  Start a chapter
                </Button>
              </Link>
            </div>
            <EmailCapture
              source="notify"
              title="Notify me"
              description="Get an email the moment a Wild AI chapter launches near you."
              compact
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Chapters;
