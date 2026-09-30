import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import PageHero from '@/components/PageHero';
import Footer from '@/components/Footer';
import EmailCapture from '@/components/EmailCapture';
import NotFound from '@/pages/NotFound';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  CalendarDays,
  Clock,
  Users,
  ArrowRight,
  Rocket,
  Mic2,
  ExternalLink,
  Navigation,
} from 'lucide-react';
import {
  useChapter,
  useChapterOrganizers,
  useChapterEvents,
  isUpcoming,
  formatDate,
  formatTime,
} from '@/hooks/useChapters';

const ChapterPage = () => {
  const { city } = useParams<{ city: string }>();
  const { data: chapter, isLoading, isError } = useChapter(city);
  const { data: organizers } = useChapterOrganizers(chapter?.id);
  const { data: events } = useChapterEvents(chapter);

  if (!isLoading && !chapter) return <NotFound />;

  const sorted = (events ?? []).slice().sort((a, b) => b.event_date.localeCompare(a.event_date));
  const next = sorted.filter((e) => isUpcoming(e.event_date)).pop();
  const past = sorted.filter((e) => !isUpcoming(e.event_date));

  if (isLoading || !chapter) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="pt-32 pb-20 flex-grow container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="h-40 bg-secondary/50 rounded-lg animate-pulse" />
            <div className="h-64 bg-secondary/50 rounded-lg animate-pulse" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Wild AI {chapter.city} - AI meetup & demo nights</title>
        <meta
          name="description"
          content={`Wild AI ${chapter.city}: ${chapter.tagline ?? 'monthly AI meetups with fire talks and networking'}. See the next event and RSVP.`}
        />
        <meta property="og:title" content={`Wild AI ${chapter.city}`} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Navbar />

      <main className="pb-20 flex-grow">
        <PageHero
          eyebrow={`Wild AI - ${chapter.city}${chapter.status === 'launching' ? ' - Launching soon' : ''}`}
          icon={MapPin}
          title={
            next ? (
              <>
                Next up: <span>{formatDate(next.event_date)}</span>
              </>
            ) : (
              chapter.tagline ?? <span>{chapter.city}</span>
            )
          }
          lede={chapter.tagline}
        >
          {next ? (
            <a href={`/events/${next.slug}`}>
              <Button size="lg">RSVP NOW</Button>
            </a>
          ) : (
            <a href="#chapter-signup">
              <Button size="lg">GET LAUNCH UPDATES</Button>
            </a>
          )}
          <Link to="/chapters">
            <Button variant="outline" size="lg">
              ALL CHAPTERS
            </Button>
          </Link>
        </PageHero>

        {/* Next event + cadence */}
        <section className="container mx-auto px-4 mb-14 pt-12 md:pt-16">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className="p-6 surface">
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent mb-5">NEXT EVENT</h2>
              {next ? (
                <>
                  <Link to={`/events/${next.slug}`} className="text-2xl font-bold text-wildai-mint mb-2 block hover:underline">
                    {next.title}
                  </Link>
                  <p className="text-muted-foreground mb-3 flex items-center gap-2">
                    <CalendarDays className="w-4 h-4" /> {formatDate(next.event_date)}
                  </p>
                  <p className="text-muted-foreground mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" /> {formatTime(next.start_time)}
                    {next.end_time ? ` – ${formatTime(next.end_time)}` : ''}
                  </p>
                  <p className="font-medium mb-1">{next.venue_name}</p>
                  <p className="text-muted-foreground mb-4">{next.venue_address}</p>
                  <a href={`/events/${next.slug}`}>
                    <Button >
                      EVENT DETAILS <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </a>
                </>
              ) : (
                <>
                  <p className="text-lg font-bold text-wildai-mint mb-2">Dates announced at launch</p>
                  <p className="text-muted-foreground mb-4">
                    We're locking in the venue and the first fire-talk lineup. Subscribe below and
                    you'll be first to know.
                  </p>
                  {chapter.cadence && (
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <CalendarDays className="w-4 h-4" /> Planned cadence: {chapter.cadence}
                    </p>
                  )}
                </>
              )}
            </div>
            <div className="bg-primary/25 p-6 surface">
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-accent mb-5">THE CADENCE</h2>
              <p className="text-lg mb-3 flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-wildai-mint" /> {chapter.cadence ?? 'Monthly'}
              </p>
              <ul className="space-y-3 text-muted-foreground text-sm">
                <li className="flex items-start"><span className="text-wildai-mint mr-2">→</span> 40 minutes of social hour</li>
                <li className="flex items-start"><span className="text-wildai-mint mr-2">→</span> 20 minutes of fire talks - 5 min, no slides</li>
                <li className="flex items-start"><span className="text-wildai-mint mr-2">→</span> An hour of open networking</li>
              </ul>
              <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
                <Users className="w-4 h-4 text-wildai-mint" />
                {chapter.member_count ?? 0}+ members and growing
              </div>
            </div>
          </div>
        </section>

        {/* About this chapter */}
        <section className="container mx-auto px-4 mb-14">
          <div className="max-w-4xl mx-auto surface p-6 md:p-8">
            <h2 className="section-title">ABOUT THIS CHAPTER</h2>
            <p className="text-muted-foreground leading-relaxed">{chapter.about_text}</p>
          </div>
        </section>

        {/* Organizers */}
        <section className="container mx-auto px-4 mb-14">
          <div className="max-w-4xl mx-auto">
            <h2 className="section-title text-center">ORGANIZERS</h2>
            <p className="text-center text-muted-foreground mb-8">
              The people who make {chapter.city} happen. Say hi at the next event.
            </p>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {(organizers ?? []).length === 0 && (
                <p className="text-center text-muted-foreground sm:col-span-2">
                  Organizers announced at launch.
                </p>
              )}
              {(organizers ?? []).map((o) => (
                <div key={o.id} className="surface p-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center overflow-hidden">
                    {o.photo_url ? (
                      <img src={o.photo_url} alt={o.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-2xl font-mono text-wildai-mint">
                        {o.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold">{o.name}</h3>
                  {o.role && <p className="text-xs text-muted-foreground mb-2">{o.role}</p>}
                  {o.bio && <p className="text-sm text-muted-foreground mb-3">{o.bio}</p>}
                  {o.contact_email && (
                    <a
                      href={`mailto:${o.contact_email}`}
                      className="text-xs text-wildai-mint hover:underline"
                    >
                      Contact
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Past events gallery */}
        {past.length > 0 && (
          <section className="container mx-auto px-4 mb-14">
            <div className="max-w-4xl mx-auto">
              <h2 className="section-title text-center">PAST EVENTS</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {past.slice(0, 6).map((e) => (
                  <Link
                    key={e.id}
                    to={`/events/${e.slug}`}
                    className="surface surface-interactive p-5 transition-colors group"
                  >
                    <p className="text-xs text-muted-foreground font-mono mb-1">
                      {formatDate(e.event_date)}
                      {e.attendee_count ? ` · ${e.attendee_count} attendees` : ''}
                    </p>
                    <h3 className="font-display font-semibold group-hover:text-wildai-mint transition-colors">
                      {e.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{e.description}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs text-wildai-mint">
                      VIEW RECAP <ArrowRight className="w-3 h-3" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Venue / location */}
        {chapter.venue_name && (
          <section className="container mx-auto px-4 mb-14">
            <div className="max-w-4xl mx-auto surface p-6 md:p-8">
              <h2 className="section-title">VENUE</h2>
              {chapter.venue_name === 'TBA' ? (
                <p className="text-muted-foreground">
                  {chapter.venue_notes ?? 'Venue announced at launch.'}
                </p>
              ) : (
                <>
                  <p className="font-bold text-lg mb-1">{chapter.venue_name}</p>
                  <p className="text-muted-foreground mb-2">{chapter.venue_address}</p>
                  {chapter.venue_notes && <p className="text-sm text-muted-foreground mb-4">{chapter.venue_notes}</p>}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(chapter.venue_address ?? chapter.venue_name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-wildai-mint hover:underline"
                  >
                    <Navigation className="w-4 h-4" /> Get directions
                  </a>
                </>
              )}
            </div>
          </section>
        )}

        {/* Local speaker CTA */}
        <section className="container mx-auto px-4 mb-14">
          <div className="max-w-4xl mx-auto bg-primary/25 surface p-6 md:p-8 text-center">
            <Mic2 className="w-8 h-8 text-wildai-mint mx-auto mb-3" />
            <h2 className="text-xl font-display font-semibold mb-2">
              DEMO AT WILD AI {chapter.city.toUpperCase()}
            </h2>
            <p className="text-muted-foreground mb-5 max-w-xl mx-auto">
              Have something to show? Submit to give a 5-minute fire talk at this chapter.
            </p>
            <Link to="/speak">
              <Button >
                SUBMIT A DEMO <ExternalLink className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Local email capture */}
        <section id="chapter-signup" className="container mx-auto px-4">
          <div className="max-w-xl mx-auto">
            <EmailCapture
              source="chapter"
              chapterId={chapter.id}
              title={`JOIN WILD AI ${chapter.city.toUpperCase()}`}
              description={`Get every ${chapter.city} event invite, speaker lineup, and recap.`}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ChapterPage;
