import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import { MEETUP_START_TIME, nextMeetupDate } from '@/lib/meetupSchedule';

/** Animated two-digit cell - the digit slides when its value changes. */
const Digit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface-deep/70 px-3 py-3 md:px-5 md:py-4 min-w-[3.5rem] md:min-w-[4.5rem]">
      <span
        key={value}
        className="block text-center font-mono text-2xl md:text-4xl font-medium tabular-nums text-foreground"
        style={{ animation: 'fade-in 0.35s ease' }}
      >
        {String(value).padStart(2, '0')}
      </span>
    </div>
    <span className="kicker">{label}</span>
  </div>
);

const ScarcityCountdown = () => {
  const diff = useCountdown(new Date(`${nextMeetupDate()}T${MEETUP_START_TIME}:00`));

  const tiles = diff
    ? [
        { label: 'Days', value: diff.days },
        { label: 'Hrs', value: diff.hrs },
        { label: 'Min', value: diff.min },
        { label: 'Sec', value: diff.sec },
      ]
    : null;

  return (
    <section className="pt-14 md:pt-20 pb-6">
      <div className="container mx-auto px-4">
        <div className="surface overflow-hidden">
          {/* Sheen sweep signals "live" without shouting. */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <div className="absolute inset-y-0 w-1/3 animate-sheen bg-gradient-to-r from-transparent via-accent/[0.06] to-transparent" />
          </div>

          <div className="relative grid gap-6 p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:p-7">
            <div>
              <p className="eyebrow mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Next event starts in
              </p>
              {tiles ? (
                <div className="flex gap-2.5 md:gap-3">
                  {tiles.map((t) => (
                    <Digit key={t.label} value={t.value} label={t.label} />
                  ))}
                </div>
              ) : (
                <p className="font-display text-2xl md:text-3xl text-foreground">
                  Doors opening soon
                </p>
              )}
            </div>

            <div className="md:border-l md:border-border md:pl-10">
              <p className="text-[0.9375rem] text-muted-foreground leading-relaxed max-w-md">
                RSVP and we&apos;ll email you event details, the speaker lineup, and a reminder the
                day before.
              </p>
              <p className="mt-3 inline-flex chip chip-ember">Most events fill up - RSVP early</p>
            </div>

            <Link
              to="/join"
              className="group inline-flex items-center gap-2 self-start rounded-full border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/20 md:self-auto"
            >
              RSVP
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScarcityCountdown;
