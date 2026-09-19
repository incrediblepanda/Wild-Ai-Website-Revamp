import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Clock, Calendar, Users, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const speakers = [
  {
    name: "Blaise Thomas",
    title: "Director of Solutions Engineering at Agora",
    linkedin: "https://www.linkedin.com/in/blaisethomas/",
  },
  {
    name: "Jason Haupt",
    title: "Former Chief Data Scientist at Optum",
    linkedin: "https://www.linkedin.com/in/jasonahaupt/",
  },
  {
    name: "Ahmet Ersin A.",
    title: "Associate Lecturer — University of Wisconsin-River Falls",
    linkedin: "https://www.linkedin.com/in/ahmet-ersin-a-2908161/",
  },
];

const EventFebruary2026 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Wild AI Meetup — February 16, 2026</title>
        <meta name="description" content="Join us February 16, 2026 for an evening of AI talks and networking with Blaise Thomas, Jason Haupt, and Ahmet Ersin A." />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient font-mono">FEBRUARY 2026 MEETUP</h1>
          <p className="text-muted-foreground mb-10">Monthly Wild AI gathering</p>

          {/* Date & Time */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4 bg-secondary/50 p-5 rounded-lg">
              <Calendar className="w-6 h-6 text-wildai-mint flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1">Date</h3>
                <p>Monday, February 16, 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-secondary/50 p-5 rounded-lg">
              <Clock className="w-6 h-6 text-wildai-mint flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1">Time</h3>
                <p>6:00 PM — 8:00 PM</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4 bg-secondary/50 p-5 rounded-lg mb-10">
            <MapPin className="w-6 h-6 text-wildai-mint flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold mb-1">Location</h3>
               <p className="font-medium">TBD</p>
               <p className="text-muted-foreground">Location to be announced</p>
            </div>
          </div>

          {/* Speakers */}
          <h2 className="text-xl font-bold font-mono mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-wildai-mint" />
            SPEAKERS
          </h2>
          <div className="grid gap-4 mb-10">
            {speakers.map((speaker) => (
              <div key={speaker.name} className="bg-secondary/50 p-5 rounded-lg flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-lg">{speaker.name}</h3>
                  <p className="text-muted-foreground text-sm">{speaker.title}</p>
                </div>
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-wildai-mint hover:underline text-sm flex-shrink-0 ml-4"
                >
                  LinkedIn
                </a>
              </div>
            ))}
          </div>

          {/* Schedule */}
          <h2 className="text-xl font-bold font-mono mb-6">SCHEDULE</h2>
          <div className="space-y-4 mb-10">
            <div className="flex gap-4">
              <span className="font-mono text-wildai-mint w-28 flex-shrink-0">6:00 PM</span>
              <span>Arrival, mingling, and drinks</span>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-wildai-mint w-28 flex-shrink-0">6:40 PM</span>
              <span>Speaker sessions (5-minute talks, no slides)</span>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-wildai-mint w-28 flex-shrink-0">7:00 PM</span>
              <span>Open networking</span>
            </div>
          </div>
          {/* CTA */}
          <div className="bg-gradient-to-br from-wildai-mint/20 to-accent/20 p-8 rounded-lg cyberpunk-border text-center">
            <h2 className="text-2xl font-bold font-mono mb-3">JOIN US</h2>
            <p className="text-muted-foreground mb-6">Grab a drink, meet fellow AI enthusiasts, and hear from incredible speakers.</p>
            <a
              href="/#register"
              className="inline-block bg-wildai-mint text-background font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
            >
              Register Now
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventFebruary2026;
