export type EventHistorySpeaker = {
  id: string;
  name: string;
  role?: string;
  topic: string;
};

export type EventHistoryEntry = {
  id: string;
  date: string;
  displayDate: string;
  venue: string;
  attendeeCount?: number;
  note?: string;
  speakers: EventHistorySpeaker[];
};

export const eventHistory2026: EventHistoryEntry[] = [
  {
    id: '2026-09-21',
    date: '2026-09-21',
    displayDate: 'September 21, 2026',
    venue: 'Dangerous Man Brewing',
    speakers: [
      {
        id: 'matthew-rein',
        name: 'Matthew Rein',
        topic:
          'Monitoring for voice AI agents built on LiveKit: catching odd pauses, interruptions and talk-over, and judging whether an agent is actually doing a good job.',
      },
      {
        id: 'jester-dapper-dan',
        name: 'Jester Dapper Dan',
        role: 'PhD in chemistry, University of Minnesota',
        topic:
          'Altruistic Intelligence: using persistent context, clear roles and decision gates to turn scattered AI use into one system.',
      },
      {
        id: 'seth-kinneman',
        name: 'Seth Kinneman',
        role: 'Systems engineer',
        topic: 'First release of his tool for planning GPU fleets and workflows.',
      },
    ],
  },
  {
    id: '2026-08-17',
    date: '2026-08-17',
    displayDate: 'August 17, 2026',
    venue: 'Dangerous Man Brewing',
    attendeeCount: 52,
    speakers: [
      {
        id: 'justin-trantham',
        name: 'Justin Trantham',
        role: 'FlowDevs',
        topic:
          "Live demo of FlowRMM: an AI agent that runs tasks on its own across a fleet of PCs, connected through MCP. The goal is full autonomy across FlowDevs' machines.",
      },
      {
        id: 'gabriel-krieshok',
        name: 'Gabriel Krieshok',
        role: 'Ovicounter AI',
        topic:
          "An offline app that counts mosquito eggs from a phone photo. He's working with the University of Lisbon to improve its accuracy.",
      },
      {
        id: 'francisco-arechiga',
        name: 'Francisco Arechiga',
        topic:
          'A platform where parents create personalized learning games for each child, built with AI. He also covered where AI still struggles: word logic, scenario logic and math.',
      },
    ],
  },
  {
    id: '2026-07-20',
    date: '2026-07-20',
    displayDate: 'July 20, 2026',
    venue: 'Dangerous Man Brewing — back room',
    note: 'The only published post was a same-day reminder; no speaker lineup was listed.',
    speakers: [],
  },
  {
    id: '2026-06-19',
    date: '2026-06-19',
    displayDate: 'June 19, 2026',
    venue: 'Improving office',
    speakers: [
      {
        id: 'pierce-rhine',
        name: 'Pierce Rhine',
        topic: 'How Lovable uses AI hallucinations as its “secret sauce.”',
      },
      {
        id: 'darsh-garg',
        name: 'Darsh Garg',
        topic:
          'Tortus, a graph-based search engine that finds connected evidence across documents.',
      },
      {
        id: 'liban-kano',
        name: 'Liban Kano',
        role: 'Founder, CareSupport',
        topic:
          'An AI assistant in iMessage and SMS that reorganizes family caregiving when plans change. He filled in for Anton Priborkin, who was moved to a later month.',
      },
      {
        id: 'tom-oneill',
        name: "Tom O'Neill",
        topic: 'The good, the bad and the ugly of building 30 products in 30 days.',
      },
    ],
  },
  {
    id: '2026-05-18',
    date: '2026-05-18',
    displayDate: 'May 18, 2026',
    venue: 'Improving office',
    speakers: [
      {
        id: 'yaniv-ben-ami',
        name: 'Yaniv Ben-Ami',
        topic:
          'Live demos of GPT Realtime 2: real-time AI that can hold a conversation and handle more than just text.',
      },
      {
        id: 'lyndon-carlson',
        name: 'Lyndon Carlson',
        role: 'Founding CTO, ChatLPO',
        topic:
          "The infrastructure behind AI-first education at scale. ChatLPO is one of Chile's most widely used AI learning platforms.",
      },
      {
        id: 'jimmy-famelia',
        name: 'Jimmy',
        role: 'Chief AI Officer, Famelia; early ML engineer at 3M',
        topic: 'A full Mario Kart 64 VR motion simulator built entirely with AI tools.',
      },
      {
        id: 'joanna-may',
        name: 'Joanna May',
        role: 'Founder, Chickensoft',
        topic: 'Cow, her open source tool for running AI models and workflows locally.',
      },
    ],
  },
];

export const pastEventHistory2026 = eventHistory2026.filter(
  (event) => event.date < '2026-09-19',
);

export const pastSpeakers2026 = pastEventHistory2026.flatMap((event) =>
  event.speakers.map((speaker) => ({ ...speaker, eventDate: event.displayDate })),
);

export const getEventHistoryByDate = (date: string) =>
  eventHistory2026.find((event) => event.date === date);