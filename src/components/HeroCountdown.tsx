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
  <div className="flex flex-col items-center gap-2">
    <span className="w-full rounded-lg border border-border/70 bg-surface-deep/60 py-3 text-center font-mono text-2xl font-medium tabular-nums text-foreground md:text-3xl">
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
    <div className="surface mx-auto w-full max-w-sm p-6 text-center lg:mx-0">
      <p className="eyebrow justify-center">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        Next meetup in
      </p>

      {cells ? (
        <div className="mt-6 grid grid-cols-4 gap-2.5">
          {cells.map((c) => (
            <Cell key={c.label} value={c.value} label={c.label} />
          ))}
        </div>
      ) : (
        <p className="mt-6 font-display text-2xl text-foreground">Doors are open</p>
      )}

      <p className="mt-6 font-display text-lg font-semibold">{meetupTitle(date)}</p>
      <p className="mt-2 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
        <CalendarDays className="h-3.5 w-3.5" /> {formatDate(date)} · 6:00 PM
      </p>
      <p className="mt-1 flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="h-3.5 w-3.5" /> {MEETUP_VENUE.name}
      </p>

      <Link
        to={`/events/${meetupSlug(date)}`}
        tabIndex={spent ? -1 : undefined}
        className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent"
      >
        Event details
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

export default HeroCountdown;
