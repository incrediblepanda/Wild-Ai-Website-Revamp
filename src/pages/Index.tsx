import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoCarousel from '@/components/LogoCarousel';
import EventDetails from '@/components/EventDetails';
import RsvpForm from '@/components/RsvpForm';
import SpeakerForm from '@/components/SpeakerForm';
import StatsBand from '@/components/StatsBand';
import WhoItsFor from '@/components/WhoItsFor';
import PastHighlights from '@/components/PastHighlights';
import Testimonials from '@/components/Testimonials';
import ScarcityCountdown from '@/components/ScarcityCountdown';
import FinalCtaBand from '@/components/FinalCtaBand';
import ChapterDirectoryPreview from '@/components/ChapterDirectoryPreview';
import UpcomingEvents from '@/components/UpcomingEvents';
import SpeakerCtaBand from '@/components/SpeakerCtaBand';
import SponsorCtaBand from '@/components/SponsorCtaBand';
import Footer from '@/components/Footer';

interface BandProps {
  tone?: 'slate' | 'paper' | 'deep';
  children: React.ReactNode;
}

/** A themed horizontal band. Paper bands re-scope the colour tokens. */
const Band = ({ tone = 'slate', children }: BandProps) => (
  <div
    className={`band ${tone === 'deep' ? 'band-deep' : ''}`}
    data-surface={tone === 'paper' ? 'paper' : undefined}
  >
    {children}
  </div>
);

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <Hero />

        {/* Scrolls up over the sticky hero. */}
        <div className="relative z-10 shadow-[0_-40px_80px_-30px_hsl(191_40%_3%/0.9)]">
          <Band tone="deep">
            <ScarcityCountdown />
            <StatsBand />
          </Band>

          <Band tone="paper">
            <LogoCarousel />
            <WhoItsFor />
            <ChapterDirectoryPreview />
          </Band>

          <Band>
            <UpcomingEvents />
            <PastHighlights />
          </Band>

          <Band tone="paper">
            <EventDetails />
          </Band>

          <Band>
            <Testimonials />
            <SpeakerCtaBand />
            <SponsorCtaBand />
          </Band>

          <Band tone="paper">
            <RsvpForm />
            <SpeakerForm />
          </Band>

          <Band tone="deep">
            <FinalCtaBand />
          </Band>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
