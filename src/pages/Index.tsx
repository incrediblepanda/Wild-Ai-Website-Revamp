import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import LogoCarousel from '@/components/LogoCarousel';
import EventDetails from '@/components/EventDetails';
import RegisterBand from '@/components/RegisterBand';
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
import Intro from '@/components/Intro';
import HeroHandoff from '@/components/motion/HeroHandoff';

interface BandProps {
  tone?: 'slate' | 'paper' | 'deep';
  glow?: boolean;
  children: React.ReactNode;
}

/** A themed horizontal band. Paper bands re-scope the colour tokens. */
const Band = ({ tone = 'slate', glow = false, children }: BandProps) => (
  <div
    className={`band ${tone === 'deep' ? 'band-deep' : ''} ${glow ? 'band-glow' : ''}`}
    data-surface={tone === 'paper' ? 'paper' : undefined}
  >
    {children}
  </div>
);

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Intro />
      <Navbar />
      <main>
        <Hero />

        {/* Rises up out of the sticky hero. */}
        <HeroHandoff>
          <Band tone="deep">
            <ScarcityCountdown />
            <StatsBand />
            <LogoCarousel />
          </Band>

          <Band tone="deep" glow>
            <WhoItsFor />
            <ChapterDirectoryPreview />
          </Band>

          <Band>
            <UpcomingEvents />
            <PastHighlights />
          </Band>

          <Band tone="deep" glow>
            <EventDetails />
          </Band>

          <Band>
            <Testimonials />
            <SpeakerCtaBand />
            <SponsorCtaBand />
          </Band>

          <Band tone="deep" glow>
            <RegisterBand />
          </Band>

          <Band tone="deep">
            <FinalCtaBand />
          </Band>
        </HeroHandoff>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
