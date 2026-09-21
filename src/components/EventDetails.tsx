import React from 'react';
import { Clock, Users, MessageSquare, Youtube, CalendarDays, MapPin, ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import { MEETUP_VENUE, meetupTitle, nextMeetupDate } from '@/lib/meetupSchedule';
import { formatDate } from '@/hooks/useChapters';

const expectations = [
  'Cutting-edge AI discussions',
  'Connect with local AI professionals',
  'Share your projects and ideas',
  'Casual, inclusive environment',
];

const schedule = [
  { icon: Clock, time: '6:00 PM', detail: 'Arrival, mingling, and drinks.' },
  {
    icon: MessageSquare,
    time: '6:40 - 7:00 PM',
    detail: 'Speaker sessions begin (5-minute talks, no slides).',
  },
  {
    icon: Users,
    time: '7:00 - 8:00 PM',
    detail: 'Open networking, connecting with speakers and fellow innovators.',
  },
];

const EventDetails = () => {
  const nextDate = nextMeetupDate();

  return (
    <section id="event" className="py-14 md:py-20">
      <div className="container mx-auto px-4">
        <Reveal>
          <p className="eyebrow mb-5">
            <CalendarDays /> Next up
          </p>
          <h2 className="section-title">Event details</h2>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div className="glass h-full p-7 md:p-8">
              <p className="kicker mb-4">{meetupTitle(nextDate)}</p>
              <p className="font-display text-3xl font-semibold text-foreground">
                {formatDate(nextDate)}
              </p>
              <p className="mt-1 text-muted-foreground">
                6:00 PM - third Monday of every month
              </p>

              <div className="mt-6 flex items-start gap-3 border-t border-border/60 pt-6">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <div>
                  <p className="font-medium">{MEETUP_VENUE.name}</p>
                  <p className="text-sm text-muted-foreground">{MEETUP_VENUE.street}</p>
                  <p className="text-sm text-muted-foreground">{MEETUP_VENUE.cityState}</p>
                </div>
              </div>

              <div className="mt-6 border-t border-border/60 pt-6">
                <p className="kicker mb-4">What to expect</p>
                <ul className="space-y-2.5">
                  {expectations.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[0.9375rem]">
                      <span className="mt-[0.55rem] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent/70" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="glass h-full p-7 md:p-8">
              <p className="kicker mb-7">Meetup schedule</p>

              <ol className="relative space-y-7 border-l border-border/60 pl-8">
                {schedule.map((slot) => (
                  <li key={slot.time} className="relative">
                    <span className="absolute -left-[3.05rem] flex h-9 w-9 items-center justify-center rounded-full border border-accent/25 bg-surface-deep text-accent">
                      <slot.icon className="h-4 w-4" />
                    </span>
                    <h4 className="font-display text-lg font-semibold">{slot.time}</h4>
                    <p className="mt-1 text-muted-foreground">{slot.detail}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 rounded-xl border border-accent/20 bg-accent/[0.06] p-5">
                <p className="font-display text-base font-semibold">
                  First time? Don&apos;t worry - we&apos;re a friendly bunch.
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  Just show up, grab a drink, and start chatting about what excites you in AI.
                </p>
              </div>

              <a
                href="https://www.youtube.com/@WildAI-US"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 inline-flex items-center gap-3 rounded-full border border-border/70 bg-foreground/[0.04] py-2.5 pl-4 pr-5 text-sm font-medium transition-colors hover:border-accent/40 hover:bg-foreground/[0.08]"
              >
                <Youtube className="h-5 w-5 text-accent" />
                <span>Check out our past events on YouTube</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
