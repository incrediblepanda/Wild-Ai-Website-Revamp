import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, ArrowRight, Clock } from 'lucide-react';
import { useAllEvents, isUpcoming, formatDate, formatTime } from '@/hooks/useChapters';
import SpotlightCard from '@/components/motion/SpotlightCard';
import Reveal from '@/components/motion/Reveal';

/** Home page: next 3 upcoming events across all chapters. */
const UpcomingEvents = () => {
  const { data: events, isLoading } = useAllEvents();
  const upcoming = (events ?? [])
    .filter((e) => isUpcoming(e.event_date))
    .sort((a, b) => a.event_date.localeCompare(b.event_date))
    .slice(0, 3);

  return (
    <section className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow mb-5">
                <CalendarDays /> On the calendar
              </p>
              <h2 className="section-title">Upcoming events</h2>
              <p className="section-lede">The next gatherings across every Wild AI chapter.</p>
            </div>
            <Link to="/events" className="hidden sm:block">
              <Button variant="outline" className="group">
                All events
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </Reveal>

        <div className="mt-10 space-y-4">
          {isLoading && <div className="surface h-28 animate-pulse" />}

          {!isLoading && upcoming.length === 0 && (
            <Reveal>
              <div className="surface flex flex-col items-start gap-4 p-6 md:p-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-muted-foreground">
                  New dates are being scheduled - join the list below to hear first.
                </p>
                <Link to="/join">
                  <Button className="group">
                    Join the list
                    <ArrowRight className="transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </Reveal>
          )}

          {upcoming.map((e, i) => (
            <Reveal key={e.id} delay={i * 80}>
              <SpotlightCard as={Link} to={`/events/${e.slug}`} className="group block p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex-grow">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <span className="chip chip-accent">
                        {e.chapter?.city ?? 'Wild AI'}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {formatDate(e.event_date)}
                      </span>
                      {e.start_time && (
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {formatTime(e.start_time)}
                          {e.end_time ? ` – ${formatTime(e.end_time)}` : ''}
                        </span>
                      )}
                    </div>
                    <h3 className="font-display text-lg font-semibold">{e.title}</h3>
                    {e.venue_name && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" /> {e.venue_name}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-accent">
                    Details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link to="/events">
            <Button variant="outline" className="w-full">
              All events <ArrowRight />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
