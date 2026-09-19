import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CalendarDays, MapPin, ArrowRight } from 'lucide-react';
import { useAllEvents, isUpcoming, formatDate, formatTime } from '@/hooks/useChapters';

/** Home page: next 3 upcoming events across all chapters. */
const UpcomingEvents = () => {
  const { data: events, isLoading } = useAllEvents();
  const upcoming = (events ?? [])
    .filter((e) => isUpcoming(e.event_date))
    .sort((a, b) => a.event_date.localeCompare(b.event_date))
    .slice(0, 3);

  return (
    <section className="py-10 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center">UPCOMING EVENTS</h2>
          <p className="text-center text-muted-foreground mb-10">
            The next gatherings across every Wild AI chapter.
          </p>

          <div className="space-y-4 max-w-3xl mx-auto">
            {isLoading && (
              <div className="bg-secondary/50 rounded-lg cyberpunk-border p-6 h-28 animate-pulse" />
            )}
            {!isLoading && upcoming.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                New dates are being scheduled — join the list below to hear first.
              </p>
            )}
            {upcoming.map((e) => (
              <Link
                key={e.id}
                to={`/events/${e.slug}`}
                className="block bg-secondary/50 rounded-lg cyberpunk-border p-6 hover:bg-secondary/80 transition-colors group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono mb-1">
                      <span className="text-wildai-mint">{e.chapter?.city.toUpperCase() ?? 'WILD AI'}</span>
                      <span>·</span>
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>{formatDate(e.event_date)}</span>
                      {e.start_time && (
                        <>
                          <span>·</span>
                          <span>{formatTime(e.start_time)}{e.end_time ? ` – ${formatTime(e.end_time)}` : ''}</span>
                        </>
                      )}
                    </div>
                    <h3 className="text-lg font-bold font-mono">{e.title}</h3>
                    {e.venue_name && (
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                        <MapPin className="w-3.5 h-3.5" /> {e.venue_name}
                      </p>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm text-wildai-mint group-hover:gap-2 transition-all whitespace-nowrap">
                    DETAILS <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/events">
              <Button variant="outline">
                ALL EVENTS <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
