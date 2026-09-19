import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MapPin, Clock, Calendar, Users, ExternalLink, Car, Ticket, Presentation, FlaskConical, Rocket } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const GopherAIConference = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Gopher AI Demo Night — April 9, 2026 | UMN x Wild AI</title>
        <meta name="description" content="Gopher AI Demo Night on April 9, 2026 at CMU Mississippi Room. See demos from students, researchers, and local startups. Free and open to the public." />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Hero */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-6 md:gap-10 mb-8">
              <div className="flex-1 flex items-center justify-end">
                <img
                  src="/lovable-uploads/umn-logo.svg"
                  alt="University of Minnesota logo"
                  className="w-36 md:w-52 h-auto"
                />
              </div>
              <span className="text-4xl md:text-6xl flex-shrink-0">🤝</span>
              <div className="flex-1 flex items-center justify-start">
                <img
                  src="/lovable-uploads/wildai-w-logo.png"
                  alt="Wild AI Logo"
                  className="w-24 md:w-36 h-auto"
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-mono mb-4">
              GOPHER AI<br />DEMO NIGHT
            </h1>
            <p className="text-lg text-muted-foreground mb-6">Startups, Research, & Technical Systems</p>
            <div className="inline-block bg-wildai-mint/10 border border-wildai-mint/30 rounded-lg px-6 py-3">
              <p className="font-mono text-wildai-mint font-bold">FREE & OPEN TO THE PUBLIC</p>
            </div>
          </div>

          {/* Date, Time, Location */}
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="flex items-start gap-4 bg-secondary/50 p-5 rounded-lg">
              <Calendar className="w-6 h-6 text-wildai-mint flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1">Date</h3>
                <p>Wednesday, April 9, 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-secondary/50 p-5 rounded-lg">
              <Clock className="w-6 h-6 text-wildai-mint flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold mb-1">Time</h3>
                <p>5:00 PM — 9:00 PM</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4 bg-secondary/50 p-5 rounded-lg mb-10">
            <MapPin className="w-6 h-6 text-wildai-mint flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold mb-1">Location</h3>
              <p className="font-medium">CMU Mississippi Room</p>
              <p className="text-muted-foreground">Coffman Memorial Union, University of Minnesota</p>
              <p className="text-muted-foreground">300 Washington Ave SE, Minneapolis, MN 55455</p>
              <a
                href="https://maps.google.com/?q=Coffman+Memorial+Union+300+Washington+Ave+SE+Minneapolis+MN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-wildai-mint text-sm mt-2 hover:underline"
              >
                View on Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Parking */}
          <div className="flex items-start gap-4 bg-secondary/50 p-5 rounded-lg mb-10">
            <Car className="w-6 h-6 text-wildai-mint flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold mb-1">Parking</h3>
              <p className="text-muted-foreground mb-2">
                The closest parking ramp is the <span className="font-medium text-foreground">East River Road Garage</span>, located right next to Coffman Memorial Union.
              </p>
              <p className="text-muted-foreground text-sm mb-2">
                Evening rates are typically reduced. Metered street parking is also available nearby.
              </p>
              <a
                href="https://maps.google.com/?q=East+River+Road+Garage+Minneapolis+MN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-wildai-mint text-sm hover:underline"
              >
                East River Road Garage on Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* What to Expect */}
          <div className="bg-gradient-to-br from-wildai-mint/10 to-accent/10 p-6 rounded-lg mb-10 cyberpunk-border">
            <h2 className="text-xl font-bold font-mono mb-5">WHAT TO EXPECT</h2>
            <p className="text-muted-foreground mb-6">
              Come see live demos from students, researchers, and local startups. Meet engineers, founders, and fellow AI enthusiasts from across the Twin Cities.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-background/50 rounded-lg">
                <Rocket className="w-8 h-8 text-wildai-mint mb-2" />
                <h4 className="font-bold text-sm mb-1">Startups</h4>
                <p className="text-xs text-muted-foreground">Innovative AI startups presenting live</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-background/50 rounded-lg">
                <FlaskConical className="w-8 h-8 text-wildai-mint mb-2" />
                <h4 className="font-bold text-sm mb-1">Research</h4>
                <p className="text-xs text-muted-foreground">Research prototypes from UMN and beyond</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-background/50 rounded-lg">
                <Presentation className="w-8 h-8 text-wildai-mint mb-2" />
                <h4 className="font-bold text-sm mb-1">Technical Systems</h4>
                <p className="text-xs text-muted-foreground">Real systems being actively built</p>
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className="mb-10">
            <h2 className="text-xl font-bold font-mono mb-5">SCHEDULE</h2>
            <div className="divide-y divide-border">
              {[
                ['Registration', '5:00 PM'],
                ['Opening Session', '5:20 PM'],
                ['Presentations', '5:40 PM'],
                ['Socials and Networking', '7:00 PM'],
                ['Prizes', '7:30 PM'],
                ['Socials and Networking', '8:00 PM'],
              ].map(([activity, time], i) => (
                <div key={i} className="flex justify-between items-center py-4">
                  <span className="font-medium">{activity}</span>
                  <span className="text-wildai-mint font-mono">{time}</span>
                </div>
              ))}
            </div>
          </div>


          {/* CTA */}
          <div className="bg-gradient-to-br from-wildai-mint/20 to-accent/20 p-8 rounded-lg cyberpunk-border text-center">
            <h2 className="text-2xl font-bold font-mono mb-3">JOIN US</h2>
            <p className="text-muted-foreground mb-2">Free and open to the public — no ticket required.</p>
            <p className="text-muted-foreground mb-6">Just show up and experience the future of AI in Minnesota.</p>
            <p className="font-mono text-wildai-mint text-lg font-bold">April 9 · 5–9 PM · CMU Mississippi Room</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GopherAIConference;
