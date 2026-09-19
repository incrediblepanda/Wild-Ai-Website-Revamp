import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EmailCapture from '@/components/EmailCapture';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarDays, MapPin, ArrowRight, CalendarPlus } from 'lucide-react';
import { useChapters, useAllEvents, isUpcoming, formatDate, formatTime } from '@/hooks/useChapters';

const Events = () => {
  const { data: chapters } = useChapters();
  const { data: events, isLoading } = useAllEvents();
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [timeFilter, setTimeFilter] = useState<'upcoming' | 'past'>('upcoming');

  const sorted = (events ?? [])
    .filter((e) => (cityFilter === 'all' ? true : e.chapter?.slug === cityFilter))
    .sort((a, b) => b.event_date.localeCompare(a.event_date));
  const filtered = sorted.filter((e) =>
    timeFilter === 'upcoming' ? isUpcoming(e.event_date) : !isUpcoming(e.event_date)
  );
  const past = sorted.filter((e) => !isUpcoming(e.event_date));
  const showPastFallback = timeFilter === 'upcoming' && filtered.length === 0 && past.length > 0;
  const displayList = showPastFallback ? past : filtered;

  const googleCalUrl =
    'https://calendar.google.com/calendar/u/0?cid=d2lsZGFpLnVzXzQ0OGc0MzRnODA5cDN0aGw0b2Qyb2Nkb2cxQGdyb3VwLmNhbGVuZGFyLmdvb2dsZS5jb20';

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Wild AI Events — Upcoming AI meetups & demo nights</title>
        <meta
          name="description"
          content="All upcoming and past Wild AI events across Minneapolis, San Francisco, and Toronto. Fire talks, demo nights, and networking."
        />
        <meta property="og:title" content="Wild AI Events" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              WILD AI <span className="text-gradient">EVENTS</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Every gathering, every city — upcoming and archived.
            </p>
          </div>

          {/* Filter bar */}
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-3 mb-10">
            <Select value={cityFilter} onValueChange={setCityFilter}>
              <SelectTrigger className="w-full sm:w-52 bg-secondary border-border">
                <SelectValue placeholder="All cities" />
              </SelectTrigger>
              <SelectContent className="bg-wildai-teal border-secondary">
                <SelectItem value="all">All cities</SelectItem>
                {(chapters ?? []).map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={timeFilter === 'upcoming' ? 'default' : 'outline'}
                onClick={() => setTimeFilter('upcoming')}
                className={timeFilter === 'upcoming' ? 'bg-wildai-mint text-wildai-teal hover:bg-wildai-mint/90' : ''}
              >
                UPCOMING
              </Button>
              <Button
                variant={timeFilter === 'past' ? 'default' : 'outline'}
                onClick={() => setTimeFilter('past')}
                className={timeFilter === 'past' ? 'bg-wildai-mint text-wildai-teal hover:bg-wildai-mint/90' : ''}
              >
                PAST
              </Button>
            </div>
            <a href={googleCalUrl} target="_blank" rel="noopener noreferrer" className="sm:ml-auto">
              <Button variant="outline" className="w-full sm:w-auto">
                <CalendarPlus className="w-4 h-4 mr-1" /> SUBSCRIBE
              </Button>
            </a>
          </div>

          {/* Event list */}
          <div className="max-w-3xl mx-auto space-y-4 mb-16">
            {isLoading && <div className="bg-secondary/50 rounded-lg cyberpunk-border p-6 h-28 animate-pulse" />}
            {!isLoading && filtered.length === 0 && !showPastFallback && (
              <p className="text-center text-muted-foreground py-10">
                {timeFilter === 'upcoming'
                  ? 'No upcoming events in this city yet — check back soon.'
                  : 'No past events for this filter yet.'}
              </p>
            )}
            {showPastFallback && (
              <>
                <p className="text-center text-muted-foreground py-4">
                  Nothing scheduled right now — here's what the community has done so far:
                </p>
                <h2 className="section-title text-center pt-4">PAST EVENTS</h2>
              </>
            )}
            {displayList.map((e) => (
              <Link
                key={e.id}
                to={`/events/${e.slug}`}
                className="block bg-secondary/50 rounded-lg cyberpunk-border p-6 hover:bg-secondary/80 transition-colors group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-1 flex-wrap">
                      <span className="text-wildai-mint">{e.chapter?.city.toUpperCase()}</span>
                      <span>·</span>
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>{formatDate(e.event_date)}</span>
                      {e.start_time && (
                        <>
                          <span>·</span>
                          <span>{formatTime(e.start_time)}</span>
                        </>
                      )}
                      {e.attendee_count ? (
                        <>
                          <span>·</span>
                          <span>{e.attendee_count} attendees</span>
                        </>
                      ) : null}
                    </div>
                    <h2 className="text-lg font-bold font-mono group-hover:text-wildai-mint transition-colors">
                      {e.title}
                    </h2>
                    {e.venue_name && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5" /> {e.venue_name}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-wildai-mint group-hover:gap-2 transition-all whitespace-nowrap">
                    {isUpcoming(e.event_date) ? 'RSVP' : 'RECAP'} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="max-w-xl mx-auto">
            <EmailCapture
              source="events"
              title="NEVER MISS AN EVENT"
              description="New event announcements for every chapter, straight to your inbox."
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
