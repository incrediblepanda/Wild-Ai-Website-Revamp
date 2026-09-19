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

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <ScarcityCountdown />
        <Hero />
        <StatsBand />
        <LogoCarousel />
        <WhoItsFor />
        <ChapterDirectoryPreview />
        <UpcomingEvents />
        <PastHighlights />
        <EventDetails />
        <Testimonials />
        <SpeakerCtaBand />
        <SponsorCtaBand />
        <RsvpForm />
        <SpeakerForm />
        <FinalCtaBand />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
