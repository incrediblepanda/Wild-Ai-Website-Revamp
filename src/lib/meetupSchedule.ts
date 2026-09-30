import type { Chapter, ChapterEvent } from '@/hooks/useChapters';

export const MEETUP_VENUE = {
  name: 'Dangerous Man Brewing',
  street: '861 E Hennepin Ave #100',
  cityState: 'Minneapolis, MN 55414',
  address: '861 E Hennepin Ave #100, Minneapolis, MN 55414',
};

export const MEETUP_START_TIME = '18:00';
export const MEETUP_END_TIME = '20:00';
export const MEETUP_CADENCE = 'Third Monday of every month at 6:00 PM';

const pad = (n: number) => String(n).padStart(2, '0');
const toYmd = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

const thirdMonday = (year: number, month: number) => {
  const first = new Date(year, month, 1);
  return new Date(year, month, 1 + ((8 - first.getDay()) % 7) + 14);
};

const monthName = (dateIso: string) =>
  new Date(dateIso + 'T00:00:00').toLocaleDateString('en-US', { month: 'long' });

export const meetupTitle = (dateIso: string) => `${monthName(dateIso)} Meetup - Wild AI`;

export const meetupSlug = (dateIso: string) =>
  `msp-${monthName(dateIso).toLowerCase()}-${dateIso.slice(0, 4)}`;

/** Next `count` third-Mondays, starting with today's month if it hasn't passed. */
export const upcomingMeetupDates = (count = 4, from = new Date()): string[] => {
  const today = new Date(from);
  today.setHours(0, 0, 0, 0);
  const dates: string[] = [];
  for (let i = 0; dates.length < count; i++) {
    const d = thirdMonday(today.getFullYear(), today.getMonth() + i);
    if (d >= today) dates.push(toYmd(d));
  }
  return dates;
};

export const nextMeetupDate = (from = new Date()) => upcomingMeetupDates(1, from)[0];

const agenda = [
  { time: '6:00 PM', label: 'Arrival, mingling, and drinks' },
  { time: '6:40 PM', label: 'Fire talks - five minutes, no slides' },
  { time: '7:00 PM', label: 'Open networking' },
];

/** Recurring meetups rendered alongside anything already stored for the chapter. */
export const scheduledMeetups = (chapter: Chapter, count = 4): ChapterEvent[] =>
  upcomingMeetupDates(count).map((date) => ({
    id: `scheduled-${date}`,
    chapter_id: chapter.id,
    slug: meetupSlug(date),
    title: meetupTitle(date),
    event_date: date,
    start_time: MEETUP_START_TIME,
    end_time: MEETUP_END_TIME,
    venue_name: MEETUP_VENUE.name,
    venue_address: MEETUP_VENUE.address,
    description:
      'Our monthly gathering of Minneapolis AI builders - five-minute fire talks, live demos, and an hour of open networking. Third Monday of every month at 6:00 PM.',
    agenda,
    speakers: [],
    recap_url: null,
    meetup_url: null,
    attendee_count: null,
    chapter,
  }));
