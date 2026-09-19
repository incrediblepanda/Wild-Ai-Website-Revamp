import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotFound from '@/pages/NotFound';
import { Button } from '@/components/ui/button';
import {
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Navigation,
  Share2,
  ArrowRight,
  Handshake,
} from 'lucide-react';
import {
  useAllEvents,
  isUpcoming,
  formatDate,
  formatTime,
} from '@/hooks/useChapters';
import { getEventHistoryByDate } from '@/data/eventHistory2026';

const EventDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: events, isLoading } = useAllEvents();
  const event = (events ?? []).find((e) => e.slug === slug);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="pt-32 pb-20 container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="h-40 bg-secondary/50 rounded-lg animate-pulse" />
            <div className="h-64 bg-secondary/50 rounded-lg animate-pulse" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!event) return <NotFound />;

  const upcoming = isUpcoming(event.event_date);
  const verifiedHistory = getEventHistoryByDate(event.event_date);
  const displayedSpeakers = (event.speakers ?? []).length > 0
    ? event.speakers
    : (verifiedHistory?.speakers ?? []).map((speaker) => ({
        name: speaker.name,
        company: speaker.role,
        topic: speaker.topic,
      }));
  const all = (events ?? [])
    .filter((e) => isUpcoming(e.event_date) && e.id !== event.id)
    .sort((a, b) => a.event_date.localeCompare(b.event_date));
  const related = all.find((e) => e.chapter_id === event.chapter_id) ?? all[0];

  const startDate = `${event.event_date}T${event.start_time ?? '18:00'}:00`;
  const endDate = `${event.event_date}T${event.end_time ?? '20:00'}:00`;
  const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.title
  )}&dates=${startDate.replace(/[-:]/g, '')}/${endDate.replace(/[-:]/g, '')}&location=${encodeURIComponent(
    `${event.venue_name ?? ''} ${event.venue_address ?? ''}`
  )}&details=${encodeURIComponent(event.description ?? '')}`;

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>{event.title} — Wild AI {event.chapter?.city}</title>
        <meta name="description" content={event.description ?? undefined} />
        <meta property="og:title" content={event.title} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Navbar />

      <main className="pt-24 pb-20 flex-grow">
        {/* Event hero */}
        <section className="container mx-auto px-4 mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to={`/${event.chapter?.slug ?? 'chapters'}`}
              className="inline-block px-4 py-2 bg-secondary/60 rounded-lg mb-6 text-sm font-mono text-wildai-mint hover:bg-secondary transition-colors"
            >
              WILD AI {event.chapter?.city.toUpperCase()}
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{event.title}</h1>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-muted-foreground mb-8">
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-wildai-mint" /> {formatDate(event.event_date)}
              </span>
              {event.start_time && (
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-wildai-mint" /> {formatTime(event.start_time)}
                  {event.end_time ? ` – ${formatTime(event.end_time)}` : ''}
                </span>
              )}
              {event.venue_name && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-wildai-mint" /> {event.venue_name}
                </span>
              )}
            </div>
            {upcoming ? (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                {event.meetup_url && (
                  <a href={event.meetup_url} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal text-lg">
                      RSVP NOW
                    </Button>
                  </a>
                )}
                <a href={gcalUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg">
                    <CalendarDays className="w-4 h-4 mr-2" /> ADD TO CALENDAR
                  </Button>
                </a>
              </div>
            ) : (
              <p className="text-sm font-mono text-muted-foreground">
                {event.attendee_count ? `${event.attendee_count} attended` : 'This event has concluded'}
              </p>
            )}
          </div>
        </section>

        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-10">
            {/* Description */}
            <div className="bg-secondary/40 rounded-lg cyberpunk-border p-8">
              <h2 className="section-title">ABOUT THIS EVENT</h2>
              <p className="text-muted-foreground leading-relaxed">{event.description}</p>
            </div>

            {/* Agenda */}
            {(event.agenda ?? []).length > 0 && (
              <div className="bg-secondary/40 rounded-lg cyberpunk-border p-8">
                <h2 className="section-title">RUN OF SHOW</h2>
                <ul className="space-y-4">
                  {(event.agenda ?? []).map((a, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <span className="text-wildai-mint font-mono text-sm w-20 flex-shrink-0">{a.time}</span>
                      <span className="text-muted-foreground">{a.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Speakers / demo lineup */}
            {displayedSpeakers.length > 0 ? (
              <div className="bg-secondary/40 rounded-lg cyberpunk-border p-8">
                <h2 className="section-title">SPEAKER LINEUP</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {displayedSpeakers.map((s, i) => (
                    <div key={i} className="bg-secondary/50 rounded-lg p-4">
                      <p className="font-bold font-mono">{s.name}</p>
                      {s.company && <p className="text-sm text-wildai-mint">{s.company}</p>}
                      {s.topic && <p className="text-sm text-muted-foreground mt-1">{s.topic}</p>}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-secondary/40 rounded-lg cyberpunk-border p-8">
                <h2 className="section-title">SPEAKER LINEUP</h2>
                <p className="text-muted-foreground">
                  Fire talks are 5 minutes, no slides — the lineup is announced the week of the event.
                  Want to demo?{' '}
                  <Link to="/speak" className="text-wildai-mint hover:underline">
                    Submit a demo →
                  </Link>
                </p>
              </div>
            )}

            {/* Venue + map */}
            {event.venue_name && (
              <div className="bg-secondary/40 rounded-lg cyberpunk-border p-8">
                <h2 className="section-title">VENUE</h2>
                <p className="font-bold text-lg mb-1">{event.venue_name}</p>
                <p className="text-muted-foreground mb-4">{event.venue_address}</p>
                {event.venue_address && (
                  <div className="cyberpunk-border rounded-lg overflow-hidden h-[280px] mb-4">
                    <iframe
                      src={`https://www.google.com/maps?q=${encodeURIComponent(event.venue_address)}&output=embed`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      title={`${event.venue_name} map`}
                    />
                  </div>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue_address ?? event.venue_name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-wildai-mint hover:underline"
                >
                  <Navigation className="w-4 h-4" /> Get directions
                </a>
              </div>
            )}

            {/* Share + related */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-secondary/40 rounded-lg cyberpunk-border p-6 flex flex-col justify-center">
                <h3 className="font-bold font-mono text-wildai-mint mb-2 flex items-center gap-2">
                  <Share2 className="w-4 h-4" /> SHARE THIS EVENT
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Know a builder who should be in the room? Send them the details.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({ title: event.title, url: window.location.href }).catch(() => {});
                    } else {
                      navigator.clipboard.writeText(window.location.href).catch(() => {});
                    }
                  }}
                  className="w-fit"
                >
                  COPY LINK
                </Button>
              </div>
              {related && (
                <Link
                  to={`/events/${related.slug}`}
                  className="bg-secondary/40 rounded-lg cyberpunk-border p-6 hover:bg-secondary/80 transition-colors group flex flex-col justify-center"
                >
                  <h3 className="font-bold font-mono text-wildai-mint mb-2">NEXT UP</h3>
                  <p className="text-xs text-muted-foreground font-mono mb-1">
                    {formatDate(related.event_date)} · {related.chapter?.city.toUpperCase()}
                  </p>
                  <p className="font-bold group-hover:text-wildai-mint transition-colors">{related.title}</p>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm text-wildai-mint">
                    DETAILS <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              )}
            </div>

            {/* Sponsors */}
            <div className="bg-secondary/40 rounded-lg cyberpunk-border p-8 text-center">
              <Handshake className="w-8 h-8 text-wildai-mint mx-auto mb-3" />
              <h3 className="font-bold font-mono mb-2">THIS EVENT IS POWERED BY OUR SPONSORS</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Want your logo here? Sponsors fund venues, food, and the community.
              </p>
              <Link to="/sponsor">
                <Button variant="outline">BECOME A SPONSOR</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetail;
