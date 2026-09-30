import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import {
  MEETUP_START_TIME,
  MEETUP_VENUE,
  meetupSlug,
  meetupTitle,
  nextMeetupDate,
} from '@/lib/meetupSchedule';
import { formatDate } from '@/hooks/useChapters';

const Cell = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center gap-1.5 md:gap-2">
    <span className="w-full rounded-lg border border-border/70 bg-surface-deep/60 py-3 text-center font-mono text-2xl font-medium md:py-4 tabular-nums text-foreground md:text-4xl">
      {String(value).padStart(2, '0')}
    </span>
    <span className="kicker">{label}</span>
  </div>
);

const HeroCountdown = ({ spent }: { spent?: boolean }) => {
  const date = nextMeetupDate();
  const diff = useCountdown(new Date(`${date}T${MEETUP_START_TIME}:00`));

  const cells = diff && [
    { label: 'Days', value: diff.days },
    { label: 'Hrs', value: diff.hrs },
    { label: 'Min', value: diff.min },
    { label: 'Sec', value: diff.sec },
  ];

  return (
    <div className="mx-auto w-full max-w-md text-center lg:mx-0">
      <p className="eyebrow justify-center">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        Next meetup in
      </p>

      {cells ? (
        <div className="mt-4 grid grid-cols-4 gap-2 md:mt-6 md:gap-2.5">
          {cells.map((c) => (
            <Cell key={c.label} value={c.value} label={c.label} />
          ))}
        </div>
      ) : (
        <p className="mt-6 font-display text-2xl text-foreground">Doors are open</p>
      )}

      <p className="mt-5 font-display text-lg font-semibold md:mt-7 md:text-xl">{meetupTitle(date)}</p>
      <p className="mt-2.5 flex items-center justify-center gap-2 text-[0.9375rem] text-muted-foreground">
        <CalendarDays className="h-4 w-4" /> {formatDate(date)} · 6:00 PM
      </p>
      <p className="hero-compact-hide mt-1.5 flex items-center justify-center gap-2 text-[0.9375rem] text-muted-foreground">
        <MapPin className="h-4 w-4" /> {MEETUP_VENUE.name}
      </p>

      <Link
        to={`/events/${meetupSlug(date)}`}
        tabIndex={spent ? -1 : undefined}
        className="group mt-4 inline-flex md:mt-7 items-center gap-2 text-[0.9375rem] font-semibold text-accent"
      >
        Event details
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default HeroCountdown;
