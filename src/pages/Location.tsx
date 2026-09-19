import React, { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, ExternalLink, Mic, Search } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { wildAiEvents, groupByVenue, type WildAiEvent } from '@/data/wildAiEvents';

const LocationHero = () => (
  <section className="pt-28 md:pt-32 pb-10 md:pb-14">
    <div className="container mx-auto px-4 max-w-5xl">
      <p className="font-mono text-wildai-mint text-xs md:text-sm tracking-[0.3em] mb-4">
        // WILD_AI / LOCATIONS
      </p>
      <h1 className="text-4xl md:text-6xl font-mono font-bold leading-tight mb-5">
        Wild AI <span className="text-wildai-mint">Locations</span>
      </h1>
      <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
        A historical view of where Wild AI has met — the rooms, breweries, and stages
        where local builders, founders, researchers, and curious minds gather around AI.
      </p>
    </div>
  </section>
);

const LocationStats = ({ events }: { events: WildAiEvent[] }) => {
  const venues = new Set(events.map((e) => e.venueName)).size;
  const cities = new Set(events.map((e) => `${e.city}, ${e.state ?? ''}`));
  const primary = Array.from(cities)[0];
  const totalAttendees = events.reduce((sum, e) => sum + (e.attendeeCount ?? 0), 0);

  const stats = [
    { label: 'Past events', value: events.length },
    { label: 'Unique venues', value: venues },
    { label: 'Primary region', value: primary?.replace(/, $/, '') ?? '—' },
    { label: 'RSVPs (recorded)', value: totalAttendees },
  ];

  return (
    <section className="pb-10 md:pb-14">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-secondary/40 cyberpunk-border rounded-lg p-5"
            >
              <div className="text-2xl md:text-3xl font-mono font-bold text-wildai-mint">
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground mt-1 font-mono uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const VenueGroupList = ({ events }: { events: WildAiEvent[] }) => {
  const groups = useMemo(() => groupByVenue(events), [events]);
  return (
    <section className="py-10 md:py-14">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="section-title">WHERE_WILD_AI_HAS_MET</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {groups.map((g) => (
            <div
              key={g.venueName}
              className="bg-secondary/40 cyberpunk-border rounded-lg p-6 flex flex-col"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-xl font-bold font-mono leading-snug">
                  {g.venueName}
                </h3>
                <Badge className="bg-wildai-mint text-wildai-teal hover:bg-wildai-mint/90 shrink-0">
                  {g.eventCount} event{g.eventCount === 1 ? '' : 's'}
                </Badge>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                <MapPin className="w-4 h-4 mr-1.5 text-wildai-mint" />
                {g.city}
                {g.state ? `, ${g.state}` : ''}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {g.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const PastEventCard = ({ event }: { event: WildAiEvent }) => {
  const d = new Date(event.date);
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = d.getDate();
  const year = d.getFullYear();

  return (
    <article className="group bg-secondary/40 cyberpunk-border rounded-lg overflow-hidden hover:bg-secondary/60 hover:border-wildai-mint/60 transition-all">
      <div className="flex flex-col md:flex-row">
        {/* Date block */}
        <div className="md:w-32 shrink-0 bg-wildai-mint/10 border-b md:border-b-0 md:border-r border-wildai-mint/20 flex md:flex-col items-center justify-center gap-2 md:gap-0 py-4 md:py-6 px-4">
          <div className="font-mono text-xs tracking-[0.2em] text-wildai-mint">{month}</div>
          <div className="font-mono text-3xl md:text-4xl font-bold text-foreground leading-none">{day}</div>
          <div className="font-mono text-xs text-muted-foreground">{year}</div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-5 md:p-6 flex flex-col gap-4">
          {/* Key facts row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <div className="flex items-center text-foreground/90">
              <MapPin className="w-4 h-4 mr-1.5 text-wildai-mint shrink-0" />
              <span className="font-medium">{event.venueName}</span>
              <span className="text-muted-foreground ml-1.5">
                · {event.city}{event.state ? `, ${event.state}` : ''}
              </span>
            </div>
            {event.attendeeCount !== undefined && (
              <div className="flex items-center text-foreground/90">
                <Users className="w-4 h-4 mr-1.5 text-wildai-mint" />
                <span className="font-medium">{event.attendeeCount}</span>
                <span className="text-muted-foreground ml-1">attendees</span>
              </div>
            )}
          </div>

          {/* Speaker / Format — highlighted */}
          <div className="flex items-start gap-3 bg-wildai-mint/5 border border-wildai-mint/20 rounded-md px-4 py-3">
            <Mic className="w-4 h-4 mt-0.5 text-wildai-mint shrink-0" />
            <div className="min-w-0">
              <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-wildai-mint mb-0.5">
                Speakers
              </div>
              {event.speakerInfo.hasSpeakerDetails && event.speakerInfo.format ? (
                <div className="text-sm font-semibold text-foreground">
                  {event.speakerInfo.format}
                </div>
              ) : (
                <div className="text-sm text-muted-foreground italic">
                  Speaker details not publicly listed.
                </div>
              )}
            </div>
          </div>

          {/* Footer link */}
          <div className="flex justify-end">
            <a
              href={event.meetupUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-wildai-mint hover:text-wildai-mint/80 font-mono"
            >
              View on Meetup
              <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

const Location = () => {
  const [query, setQuery] = useState('');
  const [year, setYear] = useState<'all' | string>('all');

  const years = useMemo(() => {
    const ys = Array.from(
      new Set(wildAiEvents.map((e) => new Date(e.date).getFullYear().toString()))
    ).sort((a, b) => Number(b) - Number(a));
    return ys;
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return wildAiEvents
      .filter((e) => {
        if (year !== 'all' && !e.date.startsWith(year)) return false;
        if (!q) return true;
        return (
          e.title.toLowerCase().includes(q) ||
          e.venueName.toLowerCase().includes(q) ||
          e.city.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [query, year]);

  // Group filtered events by venue for display
  const grouped = useMemo(() => {
    const map = new Map<string, WildAiEvent[]>();
    for (const e of filtered) {
      const arr = map.get(e.venueName) ?? [];
      arr.push(e);
      map.set(e.venueName, arr);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <div className="min-h-screen bg-wildai-teal text-foreground">
      <Helmet>
        <title>Wild AI Locations — Past Venues & Events in Minneapolis</title>
        <meta
          name="description"
          content="A historical view of every venue Wild AI has met at — past events, locations, and speaker formats from the Minneapolis AI community."
        />
        <link rel="canonical" href="https://wildai.us/location" />
      </Helmet>

      <Navbar />

      <main>
        <LocationHero />
        <LocationStats events={wildAiEvents} />
        <VenueGroupList events={wildAiEvents} />

        <section id="archive" className="py-10 md:py-14">
          <div className="container mx-auto px-4 max-w-5xl">
            <h2 className="section-title">PAST_EVENTS_BY_LOCATION</h2>

            {/* Filters */}
            <div className="sticky top-16 z-30 -mx-4 px-4 py-4 mb-8 bg-wildai-teal/90 backdrop-blur-sm border-b border-secondary">
              <div className="flex flex-col md:flex-row gap-3 md:items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search venue, city, or event title…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="pl-9 bg-secondary/60 border-secondary"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  <Button
                    type="button"
                    variant={year === 'all' ? 'default' : 'secondary'}
                    onClick={() => setYear('all')}
                    className={
                      year === 'all'
                        ? 'bg-wildai-mint text-wildai-teal hover:bg-wildai-mint/90'
                        : ''
                    }
                    size="sm"
                  >
                    All years
                  </Button>
                  {years.map((y) => (
                    <Button
                      key={y}
                      type="button"
                      variant={year === y ? 'default' : 'secondary'}
                      onClick={() => setYear(y)}
                      className={
                        year === y
                          ? 'bg-wildai-mint text-wildai-teal hover:bg-wildai-mint/90'
                          : ''
                      }
                      size="sm"
                    >
                      {y}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-secondary/30 rounded-lg cyberpunk-border">
                <p className="font-mono text-muted-foreground">
                  No events match those filters. Try clearing the search or picking a
                  different year.
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {grouped.map(([venue, evs]) => (
                  <div key={venue}>
                    <div className="flex items-center gap-3 mb-5">
                      <h3 className="text-xl md:text-2xl font-mono font-bold text-wildai-mint">
                        {venue}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground">
                        {evs.length} event{evs.length === 1 ? '' : 's'}
                      </span>
                    </div>
                    <div className="space-y-4">
                      {evs.map((e) => (
                        <PastEventCard key={e.id} event={e} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-12 text-center text-sm text-muted-foreground">
              Looking for what's next?{' '}
              <Link to="/" className="text-wildai-mint hover:underline">
                See upcoming events →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Location;
