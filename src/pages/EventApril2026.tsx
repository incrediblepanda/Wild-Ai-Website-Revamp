import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Clock, Calendar, Users, ExternalLink, Linkedin } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const speakers = [
  {
    name: "Kaushik Suresh",
    title: "AI for kidney disease modeling, endorsed by Mayo Clinic",
    linkedin: "https://www.linkedin.com/in/kaushiksuresh2110/",
    image: "/lovable-uploads/kaushik-suresh.jpg",
    initials: "KS",
  },
  {
    name: "Joe LaChance",
    title: "79.2% token reduction, better context, lower latency at Satori",
    linkedin: "https://www.linkedin.com/in/jlachance1/",
    image: "/lovable-uploads/joe-lachance.jpg",
    initials: "JL",
  },
  {
    name: "Mamady Konneh",
    title: "Agentic AI that takes action across tools and workflows",
    linkedin: "https://www.linkedin.com/in/mamadykonneh/",
    image: "/lovable-uploads/mamady-konneh.jpg",
    initials: "MK",
  },
];

const EventApril2026 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Wild AI Meetup — April 20, 2026 | Improving Minneapolis</title>
        <meta name="description" content="Wild AI on April 20, 2026 at Improving Minneapolis (6–8 PM). Talks from Kaushik Suresh, Joe LaChance, and Mamady Konneh." />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient font-mono mb-10">APRIL 2026 MEETUP</h1>

          {/* Date & Time */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4 bg-secondary/50 p-5 rounded-lg">
              <Calendar className="w-6 h-6 text-wildai-mint flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1">Date</h3>
                <p>Monday, April 20, 2026</p>
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
            <div className="flex-1">
              <h3 className="font-bold mb-1">Location</h3>
              <p className="font-medium">Improving Minneapolis</p>
              <p className="text-muted-foreground">Lakeside Center, 2nd floor — right next to Bde Maka Ska</p>
              <p className="text-muted-foreground">3033 Excelsior Boulevard, Suite 180</p>
              <p className="text-muted-foreground">Minneapolis, Minnesota 55416</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Improving+Minneapolis+3033+Excelsior+Boulevard+Suite+180+Minneapolis+MN+55416"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-wildai-mint hover:underline text-sm mt-2"
              >
                View on Google Maps <ExternalLink className="w-3 h-3" />
              </a>
              <p className="text-sm text-muted-foreground/80 mt-3 italic">
                Hosted by Emily McCarthy and the Improving team — thank you!
              </p>
            </div>
          </div>

          {/* Speakers */}
          <h2 className="text-xl font-bold font-mono mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-wildai-mint" />
            SPEAKERS
          </h2>
          <div className="grid gap-4 mb-10">
            {speakers.map((speaker, index) => (
              <div key={index} className="bg-secondary/50 p-5 rounded-lg flex items-center gap-4">
                <Avatar className="w-12 h-12 flex-shrink-0">
                  {speaker.image && <AvatarImage src={speaker.image} alt={speaker.name} />}
                  <AvatarFallback className="bg-wildai-mint/10 text-wildai-mint font-mono text-sm">
                    {speaker.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg">{speaker.name}</h3>
                  <p className="text-muted-foreground text-sm">{speaker.title}</p>
                </div>
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${speaker.name}'s LinkedIn`}
                  className="text-wildai-mint hover:opacity-70 transition-opacity flex-shrink-0"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            ))}
          </div>

          {/* Schedule */}
          <h2 className="text-xl font-bold font-mono mb-6">SCHEDULE</h2>
          <div className="space-y-4 mb-10">
            <div className="flex gap-4">
              <span className="font-mono text-wildai-mint w-28 flex-shrink-0">6:00 PM</span>
              <span>Arrival & drinks</span>
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
            <p className="text-muted-foreground mb-6">Connect with the Wild AI community.</p>
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

export default EventApril2026;
