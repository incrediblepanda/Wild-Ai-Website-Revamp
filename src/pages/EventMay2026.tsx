import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Clock, Calendar, Users, ExternalLink } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import EventSpeakers from '@/components/EventSpeakers';
import { getEventHistoryByDate } from '@/data/eventHistory2026';

const EventMay2026 = () => {
  const mayHistory = getEventHistoryByDate('2026-05-18');
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Wild AI — May 18, 2026 | Live Demos at Improving Minneapolis</title>
        <meta name="description" content="Wild AI is back May 18, 2026 (6 PM) at the Improving office in Minneapolis. Quick, snappy 10-minute demos from Yaniv Ben-Ami, Lyndon Carlson, Jimmy, and Joanna May." />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-gradient font-mono mb-6">MAY 2026 MEETUP</h1>

          {/* Intro */}
          <div className="bg-secondary/40 cyberpunk-border rounded-lg p-6 mb-10 space-y-4">
            <p className="text-lg">
              Wild AI is back, <span className="text-wildai-mint font-semibold">6pm May 18th</span> at the Improving office in Minneapolis. 🚀
            </p>
            <p className="text-muted-foreground">
              This month we're bringing things back toward our technical roots. We've gotten a lot
              of feedback that people want more live demos, real systems, and technical builds — so
              we're leaning hard in that direction.
            </p>
            <p className="text-muted-foreground">
              The format stays the same: quick, snappy <span className="text-foreground font-medium">10-minute demos</span> with
              plenty of time afterward to meet attendees, talk with demoers, and go deeper technically. 💻⚡
            </p>
          </div>

          {/* Date & Time */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4 bg-secondary/50 p-5 rounded-lg">
              <Calendar className="w-6 h-6 text-wildai-mint flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1">Date</h3>
                <p>Monday, May 18, 2026</p>
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

          {/* Demos */}
          <h2 className="text-xl font-bold font-mono mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-wildai-mint" />
            THIS MONTH'S DEMOS
          </h2>
          <EventSpeakers
            eventDate="2026-05-18"
            emptyMessage={
              <div className="grid sm:grid-cols-2 gap-4">
                {(mayHistory?.speakers ?? []).map((speaker) => (
                  <div key={speaker.id} className="border border-border p-4">
                    <h3 className="font-bold font-mono">{speaker.name}</h3>
                    {speaker.role && <p className="text-xs text-wildai-mint mt-1">{speaker.role}</p>}
                    <p className="text-sm text-muted-foreground mt-3">{speaker.topic}</p>
                  </div>
                ))}
              </div>
            }
          />

          {/* Schedule */}
          <h2 className="text-xl font-bold font-mono mb-6">SCHEDULE</h2>
          <div className="space-y-4 mb-10">
            <div className="flex gap-4">
              <span className="font-mono text-wildai-mint w-28 flex-shrink-0">6:00 PM</span>
              <span>Arrival & drinks</span>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-wildai-mint w-28 flex-shrink-0">6:30 PM</span>
              <span>Demo sessions (10-minute live demos)</span>
            </div>
            <div className="flex gap-4">
              <span className="font-mono text-wildai-mint w-28 flex-shrink-0">7:15 PM</span>
              <span>Open networking & deeper technical conversations</span>
            </div>
          </div>

          <p className="text-muted-foreground italic mb-10">
            Big thanks to Improving for hosting us this month. 🙏
          </p>

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

export default EventMay2026;
