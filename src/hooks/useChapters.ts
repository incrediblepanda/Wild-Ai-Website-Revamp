import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  MEETUP_CADENCE,
  MEETUP_VENUE,
  meetupTitle,
  scheduledMeetups,
} from '@/lib/meetupSchedule';

export interface Chapter {
  id: string;
  slug: string;
  city: string;
  region: string | null;
  status: 'active' | 'launching';
  tagline: string | null;
  about_text: string | null;
  cadence: string | null;
  venue_name: string | null;
  venue_address: string | null;
  venue_notes: string | null;
  member_count: number | null;
  sort_order: number | null;
}

export interface ChapterOrganizer {
  id: string;
  chapter_id: string;
  name: string;
  role: string | null;
  photo_url: string | null;
  bio: string | null;
  contact_email: string | null;
  sort_order: number | null;
}

export interface ChapterEvent {
  id: string;
  chapter_id: string;
  slug: string;
  title: string;
  event_date: string;
  start_time: string | null;
  end_time: string | null;
  venue_name: string | null;
  venue_address: string | null;
  description: string | null;
  agenda: { time: string; label: string }[];
  speakers: { name: string; company?: string; topic?: string; photo_url?: string }[];
  recap_url: string | null;
  meetup_url: string | null;
  attendee_count: number | null;
  chapter?: Chapter;
}

const HOME_CHAPTER = 'minneapolis';

/** The recurring venue lives in code, so every surface agrees on it. */
const withMeetupVenue = (chapter: Chapter): Chapter =>
  chapter.slug === HOME_CHAPTER
    ? {
        ...chapter,
        cadence: MEETUP_CADENCE,
        venue_name: MEETUP_VENUE.name,
        venue_address: MEETUP_VENUE.address,
      }
    : chapter;

/** Fills months that have no stored event with the standing third-Monday meetup. */
const withScheduledMeetups = (events: ChapterEvent[], chapter: Chapter): ChapterEvent[] => {
  const named = events.map((e) =>
    isUpcoming(e.event_date) ? { ...e, title: meetupTitle(e.event_date) } : e
  );
  const filled = new Set(named.map((e) => e.event_date.slice(0, 7)));
  const generated = scheduledMeetups(chapter).filter(
    (m) => !filled.has(m.event_date.slice(0, 7))
  );
  return [...generated, ...named];
};

export const useChapters = () =>
  useQuery({
    queryKey: ['chapters'],
    queryFn: async (): Promise<Chapter[]> => {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .order('sort_order');
      if (error) throw error;
      return (data as Chapter[]).map(withMeetupVenue);
    },
  });

export const useChapter = (slug: string | undefined) =>
  useQuery({
    queryKey: ['chapter', slug],
    enabled: !!slug,
    queryFn: async (): Promise<Chapter | null> => {
      const { data, error } = await supabase
        .from('chapters')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      if (error) throw error;
      return data ? withMeetupVenue(data as Chapter) : null;
    },
  });

export const useChapterOrganizers = (chapterId: string | undefined) =>
  useQuery({
    queryKey: ['chapter-organizers', chapterId],
    enabled: !!chapterId,
    queryFn: async (): Promise<ChapterOrganizer[]> => {
      const { data, error } = await supabase
        .from('chapter_organizers')
        .select('*')
        .eq('chapter_id', chapterId!)
        .order('sort_order');
      if (error) throw error;
      return data as ChapterOrganizer[];
    },
  });

export const useChapterEvents = (chapter: Chapter | null | undefined) =>
  useQuery({
    queryKey: ['chapter-events', chapter?.id],
    enabled: !!chapter,
    queryFn: async (): Promise<ChapterEvent[]> => {
      const { data, error } = await supabase
        .from('chapter_events')
        .select('*')
        .eq('chapter_id', chapter!.id)
        .order('event_date', { ascending: false });
      if (error) throw error;
      const events = data as unknown as ChapterEvent[];
      return chapter!.slug === HOME_CHAPTER ? withScheduledMeetups(events, chapter!) : events;
    },
  });

// All events across chapters with their chapter info
export const useAllEvents = () =>
  useQuery({
    queryKey: ['all-chapter-events'],
    queryFn: async (): Promise<ChapterEvent[]> => {
      const [eventsResult, chaptersResult] = await Promise.all([
        supabase
          .from('chapter_events')
          .select('*, chapter:chapters(*)')
          .order('event_date', { ascending: false }),
        supabase.from('chapters').select('*').eq('slug', HOME_CHAPTER).maybeSingle(),
      ]);
      if (eventsResult.error) throw eventsResult.error;

      const events = eventsResult.data as unknown as ChapterEvent[];
      const home = chaptersResult.data as Chapter | null;
      return home ? withScheduledMeetups(events, withMeetupVenue(home)) : events;
    },
  });

export const isUpcoming = (dateIso: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dateIso + 'T00:00:00') >= today;
};

export const formatDate = (dateIso: string) =>
  new Date(dateIso + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

export const formatTime = (t?: string | null) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, '0')} ${ampm}`;
};
