import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Clock, Calendar, Users, ExternalLink, PartyPopper, Laptop } from 'lucide-react';
import ShowAndTellForm from '@/components/ShowAndTellForm';
import { Helmet } from 'react-helmet-async';

const speakers = [
  { name: "Speaker TBA", title: "To be announced" },
  { name: "Speaker TBA", title: "To be announced" },
  { name: "Speaker TBA", title: "To be announced" },
];

const EventMarch2026 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Wild AI Meetup — March 16, 2026 | Anniversary Show & Tell</title>
        <meta name="description" content="Celebrate Wild AI's anniversary on March 16, 2026! Bring your AI projects for show & tell and hear from amazing speakers." />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient font-mono">MARCH 2026 MEETUP</h1>
            <PartyPopper className="w-7 h-7 text-wildai-mint flex-shrink-0" />
          </div>
          <p className="text-muted-foreground mb-10">Anniversary Edition — Show & Tell</p>

          {/* Anniversary Banner */}
          <div className="bg-gradient-to-r from-wildai-mint/10 via-accent/10 to-wildai-mint/10 border border-wildai-mint/30 p-5 rounded-lg mb-10 text-center">
            <p className="font-mono text-wildai-mint text-sm mb-1">🎉 ANNIVERSARY CELEBRATION 🎉</p>
            <p className="text-foreground">
              Builders — bring your projects! We're hosting a <span className="font-bold text-wildai-mint">Show & Tell</span> before and after the speaker sessions.
            </p>
          </div>

          {/* Date & Time */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4 bg-secondary/50 p-5 rounded-lg">
              <Calendar className="w-6 h-6 text-wildai-mint flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1">Date</h3>
                <p>Monday, March 16, 2026</p>
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

          {/* Show & Tell */}
          <div className="bg-secondary/50 p-6 rounded-lg mb-10 cyberpunk-border">
            <h2 className="text-xl font-bold font-mono mb-4 flex items-center gap-2">
              <Laptop className="w-5 h-5 text-wildai-mint" />
              SHOW & TELL
            </h2>
            <p className="text-muted-foreground mb-3">
              In celebration of our anniversary, we're inviting builders to showcase their AI projects! Whether it's a side project, a startup MVP, or a creative experiment — bring it and share it with the community.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-wildai-mint">→</span>
                <span>Demo slots available before and after the speaker sessions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-wildai-mint">→</span>
                <span>No slides required — just show what you've built</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-wildai-mint">→</span>
                <span>All skill levels welcome</span>
              </li>
            </ul>
          </div>

          {/* Show & Tell Sign-Up Form */}
          <ShowAndTellForm />
          <div className="mb-10" />

          {/* Speakers */}
          <h2 className="text-xl font-bold font-mono mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-wildai-mint" />
            SPEAKERS
          </h2>
          <div className="grid gap-4 mb-10">
            {speakers.map((speaker, index) => (
              <div key={index} className="bg-secondary/50 p-5 rounded-lg flex items-center gap-4">
                {/* Profile picture placeholder */}
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-wildai-mint/40 flex items-center justify-center flex-shrink-0 bg-wildai-mint/5">
                  <Users className="w-5 h-5 text-wildai-mint/40" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-muted-foreground">{speaker.name}</h3>
                  <p className="text-muted-foreground/60 text-sm">{speaker.title}</p>
                </div>
              </div>
            ))}
            <p className="text-sm text-muted-foreground text-center mt-2 font-mono">
              Speakers will be announced soon — stay tuned!
            </p>
          </div>

          {/* Schedule */}
          <h2 className="text-xl font-bold font-mono mb-6">SCHEDULE</h2>
          <div className="space-y-4 mb-10">
            <div className="flex gap-4">
              <span className="font-mono text-wildai-mint w-28 flex-shrink-0">6:00 PM</span>
              <span>Arrival, drinks & <span className="text-wildai-mint font-medium">Show & Tell</span></span>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-wildai-mint w-28 flex-shrink-0">6:40 PM</span>
              <span>Speaker sessions (5-minute talks, no slides)</span>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-wildai-mint w-28 flex-shrink-0">7:00 PM</span>
              <span>Open networking & <span className="text-wildai-mint font-medium">Show & Tell</span></span>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-wildai-mint/20 to-accent/20 p-8 rounded-lg cyberpunk-border text-center">
            <h2 className="text-2xl font-bold font-mono mb-3">JOIN US</h2>
            <p className="text-muted-foreground mb-6">Celebrate our anniversary, show off your projects, and connect with the Wild AI community.</p>
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

export default EventMarch2026;
