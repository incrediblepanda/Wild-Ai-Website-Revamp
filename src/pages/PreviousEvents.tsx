import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PastEventsList from '@/components/PreviousEventsList';
import PastSpeakers from '@/components/PastSpeakers';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { pastEventHistory2026 } from '@/data/eventHistory2026';

const PreviousEvents = () => {
  const pastEvents = [
    ...pastEventHistory2026.map((event) => ({
      id: event.id,
      date: event.displayDate,
      venue: event.venue,
      attendeeCount: event.attendeeCount,
      note: event.note,
      speakers: event.speakers,
      youtubeLink: '',
      youtubeEmbedId: '',
    })),
    {
      id: -2,
      date: "April 20, 2026",
      speakers: [
        { id: 1, name: "Kaushik Suresh", linkedin: "https://www.linkedin.com/in/kaushiksuresh2110/" },
        { id: 2, name: "Joe LaChance", linkedin: "https://www.linkedin.com/in/jlachance1/" },
        { id: 3, name: "Mamady Konneh", linkedin: "https://www.linkedin.com/in/mamadykonneh/" }
      ],
      youtubeLink: "",
      youtubeEmbedId: ""
    },
    {
      id: -1,
      date: "March 16, 2026",
      speakers: [],
      youtubeLink: "",
      youtubeEmbedId: ""
    },
    {
      id: 0,
      date: "February 16, 2026",
      speakers: [
        { id: 1, name: "Blaise Thomas", linkedin: "https://www.linkedin.com/in/blaisethomas/" },
        { id: 2, name: "Jason Haupt", linkedin: "https://www.linkedin.com/in/jasonahaupt/" },
        { id: 3, name: "Ahmet Ersin A.", linkedin: "https://www.linkedin.com/in/ahmet-ersin-a-2908161/" }
      ],
      youtubeLink: "",
      youtubeEmbedId: ""
    },
    {
      id: 1,
      date: "January 19, 2026",
      speakers: [
        { id: 1, name: "Urbas Ekka", linkedin: "https://www.linkedin.com/in/urbas-ekka/" },
        { id: 2, name: "Sarah Antier-Farfar", linkedin: "https://www.linkedin.com/in/sarah-antier-farfar-09a896a9/" },
        { id: 3, name: "Andrew Dahlberg", linkedin: "https://www.linkedin.com/in/andrewdahlberg/" }
      ],
      youtubeLink: "https://www.youtube.com/watch?v=IljclDTgpO8",
      youtubeEmbedId: "IljclDTgpO8"
    },
    {
      id: 2,
      date: "December 15, 2025",
      speakers: [
        { id: 1, name: "Phillip Demro", linkedin: "https://www.linkedin.com/in/phillipdemro/" },
        { id: 2, name: "Ross Graba", linkedin: "https://www.linkedin.com/in/rossgraba/" },
        { id: 3, name: "Zin Khant", linkedin: "https://www.linkedin.com/in/zin-khant-993055216/" },
        { id: 4, name: "Clinton Kunhardt", linkedin: "https://www.linkedin.com/in/clinton-kunhardt/" }
      ],
      youtubeLink: "https://www.youtube.com/watch?v=igbBxpqhdVw",
      youtubeEmbedId: "igbBxpqhdVw"
    },
    {
      id: 3,
      date: "November 17, 2025",
      speakers: [
        { id: 1, name: "Eric Lealos", linkedin: "https://www.linkedin.com/in/ericlealos/" },
        { id: 2, name: "Kedgard Cordero", linkedin: "https://www.linkedin.com/in/kedgard-cordero/" },
        { id: 3, name: "Joshua Kellner", linkedin: "https://www.linkedin.com/in/joshuakellner/" },
        { id: 4, name: "Tim Lane", linkedin: "https://www.linkedin.com/in/tim-lane-78bb0448/" }
      ],
      youtubeLink: "https://www.youtube.com/live/WF6GFjT8dZ4",
      youtubeEmbedId: "WF6GFjT8dZ4"
    },
    {
      id: 4,
      date: "October 20, 2025",
      speakers: [
        { id: 1, name: "Andre Smith", linkedin: "https://www.linkedin.com/in/andre-smith-mental-health/" },
        { id: 2, name: "Anushka B", linkedin: "https://www.linkedin.com/in/anushka-b-9a253998/" },
        { id: 3, name: "Mamady Konneh", linkedin: "https://www.linkedin.com/in/mamadykonneh/" }
      ],
      youtubeLink: "https://www.youtube.com/live/Dm2QPv4jW-0",
      youtubeEmbedId: "Dm2QPv4jW-0"
    },
    {
      id: 5,
      date: "September 15, 2025",
      speakers: [
        { id: 1, name: "Kate Kuehl", linkedin: "https://www.linkedin.com/in/katekuehl/" },
        { id: 2, name: "Alex Bangs", linkedin: "https://www.linkedin.com/in/alexbangs/" },
        { id: 3, name: "David M Montecalvo", linkedin: "https://www.linkedin.com/in/david-m-montecalvo-068a9811a/" }
      ],
      youtubeLink: "https://www.youtube.com/live/QIbY5SlHopY?si=RKS36WcatZCUgYO7",
      youtubeEmbedId: "QIbY5SlHopY"
    },
    {
      id: 6,
      date: "August 18, 2025",
      speakers: [
        { id: 1, name: "Colin Hirdman", linkedin: "https://www.linkedin.com/in/colinhirdman/" },
        { id: 2, name: "Zin Khant", linkedin: "https://www.linkedin.com/in/zin-khant-993055216/" },
        { id: 3, name: "Benjamin Scharf", linkedin: "https://www.linkedin.com/in/benjaminscharf/" }
      ],
      youtubeLink: "https://www.youtube.com/live/QIbY5SlHopY?si=RKS36WcatZCUgYO7",
      youtubeEmbedId: "QIbY5SlHopY"
    },
    {
      id: 7,
      date: "July 21, 2025",
      speakers: [
        { id: 1, name: "Benjamin Long", linkedin: "https://www.linkedin.com/in/benjamin-long-31165616b/" },
        { id: 2, name: "Weldon M", linkedin: "https://www.linkedin.com/in/weldon-m-50b88a2b2/" },
        { id: 3, name: "Ian Bicking", linkedin: "https://www.linkedin.com/in/ianbicking/" }
      ],
      youtubeLink: "",
      youtubeEmbedId: ""
    },
    {
      id: 8,
      date: "June 16, 2025",
      speakers: [
        { id: 1, name: "Matt Josborn", linkedin: "https://www.linkedin.com/in/mattjosborn/" },
        { id: 2, name: "Abhishek A", linkedin: "https://www.linkedin.com/in/abhishek-a-95328613b/" },
        { id: 3, name: "Samuel Goff", linkedin: "https://www.linkedin.com/in/samuel-goff-15359612/" }
      ],
      youtubeLink: "",
      youtubeEmbedId: ""
    },
    {
      id: 9,
      date: "May 15, 2025",
      speakers: [
        { id: 1, name: "Matt Phillips, PhD", linkedin: "https://www.linkedin.com/in/mattphillipsneuroscience/" },
        { id: 2, name: "Vivek Bhide", linkedin: "https://www.linkedin.com/in/vivek-bhide-9864384/" },
        { id: 3, name: "Mark Collier, PhD", linkedin: "https://www.linkedin.com/in/mark-collier-809282113/" }
      ],
      youtubeLink: "",
      youtubeEmbedId: ""
    },
    {
      id: 10,
      date: "April 17, 2025",
      speakers: [
        { id: 1, name: "Ryan Peters", linkedin: "https://www.linkedin.com/in/ryant-peters/" },
        { id: 2, name: "James Mooney", linkedin: "https://www.linkedin.com/in/james-mooney-45b420105/" },
        { id: 3, name: "Adam Terlson", linkedin: "https://www.linkedin.com/in/adamterlson/" },
        { id: 4, name: "Aaron J Olson", linkedin: "https://www.linkedin.com/in/aaronjolson/" }
      ],
      youtubeLink: "",
      youtubeEmbedId: ""
    },
    {
      id: 11,
      date: "March 20, 2025",
      speakers: [
        { id: 1, name: "Victor Hofstetter", linkedin: "https://www.linkedin.com/in/victor-hofstetter/" },
        { id: 2, name: "Serhii Zatsarynin, PhD", linkedin: "https://www.linkedin.com/in/serhii-zatsarynin/" },
        { id: 3, name: "Joel Huber", linkedin: "https://www.linkedin.com/in/hellojoelhuber/" },
        { id: 4, name: "Lukas Valine", linkedin: "https://www.linkedin.com/in/lvaline/" }
      ],
      youtubeLink: "https://youtu.be/orLK9LCWBS4?feature=shared",
      youtubeEmbedId: "orLK9LCWBS4"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gradient font-mono">PAST EVENTS</h1>
          
          <div className="mb-10">
            <p className="text-lg text-muted-foreground mb-6">
              Check out our previous meetups and their speakers.
            </p>
            
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <Collapsible key={event.id} className="border border-border rounded-lg overflow-hidden">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-secondary/50 hover:bg-secondary/70 transition-colors">
                    <div className="text-left">
                      <h3 className="font-bold text-lg">{event.date}</h3>
                      {'venue' in event && event.venue && (
                        <p className="text-xs font-mono text-muted-foreground mt-1">
                          {event.venue}{'attendeeCount' in event && event.attendeeCount ? ` · ${event.attendeeCount} attendees` : ''}
                        </p>
                      )}
                    </div>
                    <ChevronDown className="h-5 w-5 transition-transform ui-open:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 bg-secondary/20">
                    <Tabs defaultValue="speakers" className="w-full">
                      <TabsList className="w-full mb-4">
                        <TabsTrigger value="speakers" className="flex-1">Speakers</TabsTrigger>
                        <TabsTrigger value="recording" className="flex-1">Recording</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="speakers" className="mt-0">
                        {'note' in event && event.note && (
                          <p className="text-sm text-muted-foreground mb-4">{event.note}</p>
                        )}
                        <PastSpeakers speakers={event.speakers} />
                      </TabsContent>
                      
                      <TabsContent value="recording" className="mt-0">
                        {event.youtubeEmbedId ? (
                          <div className="aspect-video w-full rounded-lg overflow-hidden">
                            <iframe 
                              className="w-full h-full"
                              src={`https://www.youtube.com/embed/${event.youtubeEmbedId}`}
                              title="YouTube video player"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No recording available for this event.</p>
                        )}
                      </TabsContent>
                    </Tabs>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
            
            <div className="mt-12">
              <PastEventsList />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PreviousEvents;
