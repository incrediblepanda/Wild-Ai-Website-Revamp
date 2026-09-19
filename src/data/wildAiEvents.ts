// Wild AI past events — seeded from the public Meetup archive
// Source: https://www.meetup.com/wild-ai/events/?type=past
// NOTE: Speaker names are intentionally NOT included. Meetup's public listings
// describe the speaker FORMAT (e.g., fire talks, demo nights) but do not
// publicly list individual speaker names. Do not fabricate them.

export type WildAiEvent = {
  id: string;
  title: string;
  date: string; // ISO date
  displayDate: string; // human-friendly
  venueName: string;
  address?: string;
  city: string;
  state?: string;
  meetupUrl: string;
  attendeeCount?: number;
  description: string;
  speakerInfo: {
    hasSpeakerDetails: boolean;
    format?: string;
    notes?: string;
  };
};

const fireTalkNotes =
  "No slides — concise, high-level introductions. Speakers share who they are, what they're working on, and why it matters in five minutes or less, setting the stage for the networking hour.";

export const wildAiEvents: WildAiEvent[] = [
  {
    id: "314668845",
    title: "Wild AI — May Meetup @ Improving",
    date: "2025-05-19",
    displayDate: "Mon, May 19, 2025",
    venueName: "Lake Calhoun Executive Center (Improving)",
    address: "3033 Excelsior Blvd",
    city: "Minneapolis",
    state: "MN",
    meetupUrl: "https://www.meetup.com/wild-ai/events/314668845/",
    attendeeCount: 41,
    description:
      "3rd Monday Monthly at Improving. 40 minutes of social, 20 minutes of fire talks by passionate innovators, and an hour of networking after.",
    speakerInfo: {
      hasSpeakerDetails: true,
      format: "Demo Night — 4 short-form demos",
      notes:
        "Four short-form demos from local builders, followed by open networking with the presenters.",
    },
  },
  {
    id: "314184693",
    title: "Wild AI — April Meetup @ Improving",
    date: "2025-04-21",
    displayDate: "Mon, Apr 21, 2025",
    venueName: "Lake Calhoun Executive Center (Improving)",
    address: "3033 Excelsior Blvd",
    city: "Minneapolis",
    state: "MN",
    meetupUrl: "https://www.meetup.com/wild-ai/events/314184693/",
    attendeeCount: 32,
    description:
      "3rd Monday Monthly at Improving. Social, fire talks, and an hour of open networking with speakers and fellow innovators.",
    speakerInfo: {
      hasSpeakerDetails: true,
      format: "Fire talks (5 min, no slides)",
      notes: fireTalkNotes,
    },
  },
  {
    id: "313611884",
    title: "Wild AI — March Meetup @ HeadFlyer",
    date: "2025-03-17",
    displayDate: "Mon, Mar 17, 2025",
    venueName: "HeadFlyer Brewing",
    address: "861 East Hennepin Avenue",
    city: "Minneapolis",
    state: "MN",
    meetupUrl: "https://www.meetup.com/wild-ai/events/313611884/",
    attendeeCount: 28,
    description:
      "3rd Monday Monthly at HeadFlyer Brewing. Social, fire talks, and an hour of networking.",
    speakerInfo: {
      hasSpeakerDetails: true,
      format: "Fire talks (5 min, no slides)",
      notes: fireTalkNotes,
    },
  },
  {
    id: "313236830",
    title: "Wild AI — February Meetup @ HeadFlyer Brewing",
    date: "2025-02-17",
    displayDate: "Mon, Feb 17, 2025",
    venueName: "HeadFlyer Brewing",
    address: "861 East Hennepin Avenue",
    city: "Minneapolis",
    state: "MN",
    meetupUrl: "https://www.meetup.com/wild-ai/events/313236830/",
    attendeeCount: 17,
    description:
      "3rd Monday Monthly at HeadFlyer Brewing. Tame the raw potential of AI alongside fellow innovators.",
    speakerInfo: {
      hasSpeakerDetails: true,
      format: "Fire talks (5 min, no slides)",
      notes: fireTalkNotes,
    },
  },
  {
    id: "312804335",
    title: "Wild AI — January Meetup @ HeadFlyer Brewing",
    date: "2025-01-20",
    displayDate: "Mon, Jan 20, 2025",
    venueName: "HeadFlyer Brewing",
    address: "861 East Hennepin Avenue",
    city: "Minneapolis",
    state: "MN",
    meetupUrl: "https://www.meetup.com/wild-ai/events/312804335/",
    attendeeCount: 21,
    description:
      "3rd Monday Monthly at HeadFlyer Brewing. Social, fire talks, and networking.",
    speakerInfo: {
      hasSpeakerDetails: true,
      format: "Fire talks (5 min, no slides)",
      notes: fireTalkNotes,
    },
  },
  {
    id: "312280323",
    title: "Wild AI — December Meetup @ HeadFlyer Brewing",
    date: "2024-12-16",
    displayDate: "Mon, Dec 16, 2024",
    venueName: "HeadFlyer Brewing",
    address: "861 East Hennepin Avenue",
    city: "Minneapolis",
    state: "MN",
    meetupUrl: "https://www.meetup.com/wild-ai/events/312280323/",
    attendeeCount: 47,
    description:
      "3rd Monday Monthly at HeadFlyer Brewing. A year-end gathering with fire talks and open networking.",
    speakerInfo: {
      hasSpeakerDetails: true,
      format: "Fire talks (5 min, no slides)",
      notes: fireTalkNotes,
    },
  },
  {
    id: "311953036",
    title: "Wild AI Networking Mixer & AI Innovations Showcase",
    date: "2024-11-18",
    displayDate: "Mon, Nov 18, 2024",
    venueName: "HeadFlyer Brewing",
    address: "861 East Hennepin Avenue",
    city: "Minneapolis",
    state: "MN",
    meetupUrl: "https://www.meetup.com/wild-ai/events/311953036/",
    attendeeCount: 27,
    description:
      "Networking mixer paired with an AI innovations showcase. Social, fire talks, and an hour of networking.",
    speakerInfo: {
      hasSpeakerDetails: true,
      format: "Fire talks + innovations showcase",
      notes: fireTalkNotes,
    },
  },
  {
    id: "311070792",
    title: "Wild AI Networking Mixer & AI Innovations Showcase",
    date: "2024-10-21",
    displayDate: "Mon, Oct 21, 2024",
    venueName: "HeadFlyer Brewing",
    address: "861 East Hennepin Avenue",
    city: "Minneapolis",
    state: "MN",
    meetupUrl: "https://www.meetup.com/wild-ai/events/311070792/",
    attendeeCount: 51,
    description:
      "Networking mixer with an AI innovations showcase from local builders and researchers.",
    speakerInfo: {
      hasSpeakerDetails: true,
      format: "Fire talks + innovations showcase",
      notes: fireTalkNotes,
    },
  },
  {
    id: "310599488",
    title: "Wild AI Networking Mixer & AI Innovations Showcase",
    date: "2024-09-16",
    displayDate: "Mon, Sep 16, 2024",
    venueName: "HeadFlyer Brewing",
    address: "861 East Hennepin Avenue",
    city: "Minneapolis",
    state: "MN",
    meetupUrl: "https://www.meetup.com/wild-ai/events/310599488/",
    attendeeCount: 52,
    description:
      "Networking mixer with an AI innovations showcase. Drinks, fire talks, and conversations across the local AI community.",
    speakerInfo: {
      hasSpeakerDetails: true,
      format: "Fire talks + innovations showcase",
      notes: fireTalkNotes,
    },
  },
  {
    id: "309096029",
    title: "Wild AI Networking Mixer & AI Innovations Showcase",
    date: "2024-08-19",
    displayDate: "Mon, Aug 19, 2024",
    venueName: "HeadFlyer Brewing",
    address: "861 East Hennepin Avenue",
    city: "Minneapolis",
    state: "MN",
    meetupUrl: "https://www.meetup.com/wild-ai/events/309096029/",
    attendeeCount: 68,
    description:
      "One of the largest Wild AI gatherings to date — networking mixer with an AI innovations showcase.",
    speakerInfo: {
      hasSpeakerDetails: true,
      format: "Fire talks + innovations showcase",
      notes: fireTalkNotes,
    },
  },
];

export type VenueGroup = {
  venueName: string;
  city: string;
  state?: string;
  address?: string;
  eventCount: number;
  description: string;
  events: WildAiEvent[];
};

const venueDescriptions: Record<string, string> = {
  "HeadFlyer Brewing":
    "The longtime home base for Wild AI — a Northeast Minneapolis brewery that hosted the bulk of the community's monthly mixers and innovation showcases.",
  "Lake Calhoun Executive Center (Improving)":
    "A modern office venue near Bde Maka Ska where Wild AI hosts its Improving series — including the recent demo night format.",
};

export function groupByVenue(events: WildAiEvent[]): VenueGroup[] {
  const map = new Map<string, VenueGroup>();
  for (const ev of events) {
    const key = ev.venueName;
    const existing = map.get(key);
    if (existing) {
      existing.eventCount += 1;
      existing.events.push(ev);
    } else {
      map.set(key, {
        venueName: ev.venueName,
        city: ev.city,
        state: ev.state,
        address: ev.address,
        eventCount: 1,
        description:
          venueDescriptions[ev.venueName] ??
          "A Wild AI gathering venue in the Minneapolis area.",
        events: [ev],
      });
    }
  }
  return Array.from(map.values()).sort((a, b) => b.eventCount - a.eventCount);
}
