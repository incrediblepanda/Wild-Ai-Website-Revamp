import React from 'react';
import RsvpForm from '@/components/RsvpForm';
import SpeakerForm from '@/components/SpeakerForm';
import Reveal from '@/components/motion/Reveal';

/** Two ways into the room, side by side: take a seat or take the mic. */
const RegisterBand = () => (
  <section id="register" className="py-14 md:py-20">
    <div className="container mx-auto px-4">
      <Reveal>
        <p className="eyebrow mb-5">Join the next one</p>
        <h2 className="section-title max-w-2xl text-balance">Register, or get on the stage</h2>
        <p className="section-lede">
          Grab a seat at the next meetup, or pitch the thing you have been building.
        </p>
      </Reveal>

      <div id="speak" className="mt-10 grid items-stretch gap-5 lg:grid-cols-2">
        <Reveal className="h-full">
          <RsvpForm />
        </Reveal>
        <Reveal delay={90} className="h-full">
          <SpeakerForm />
        </Reveal>
      </div>
    </div>
  </section>
);

export default RegisterBand;
