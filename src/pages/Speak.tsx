import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SpeakerForm from '@/components/SpeakerForm';
import PastSpeakers from '@/components/PastSpeakers';
import { Link } from 'react-router-dom';
import { Mic2, Clock, Sparkles } from 'lucide-react';

const faqs = [
  {
    q: 'What are fire talks?',
    a: 'Five minutes, no slides, one demo or one idea that made you sweat a little. If your talk needs 40 minutes and a laser pointer, this is not the stage.',
  },
  {
    q: 'Who should submit?',
    a: 'Engineers, founders, researchers, designers — anyone building or shipping with AI. First-time speakers are explicitly welcome; we coach you before you go on.',
  },
  {
    q: 'What do speakers get?',
    a: 'A spotlight in front of local AI builders, a recap feature on our channels, warm intros to sponsors and organizers, and (usually) free pizza.',
  },
  {
    q: 'When will I hear back?',
    a: 'We review submissions weekly. If we can slot you into an upcoming event, an organizer will reach out within two weeks.',
  },
];

const Speak = () => (
  <div className="flex flex-col min-h-screen">
    <Helmet>
      <title>Speak at Wild AI — Submit a fire talk or demo</title>
      <meta
        name="description"
        content="Demo your AI project at a Wild AI meetup. Five-minute fire talks, no slides, real builders in the room. Submit your talk for Minneapolis, San Francisco, or Toronto."
      />
      <meta property="og:title" content="Speak at Wild AI" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
    </Helmet>
    <Navbar />

    <main className="pt-24 pb-20 flex-grow">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Mic2 className="w-10 h-10 text-wildai-mint mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            DEMO AT <span className="text-gradient">WILD AI</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Fire talks are the heart of every meetup: five minutes, no slides, real work on the
            table. Submit yours — every city, every level of experience.
          </p>
        </div>

        {/* What we're looking for + what to expect */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-secondary/50 rounded-lg cyberpunk-border p-8">
            <h2 className="text-xl font-bold font-mono text-wildai-mint mb-4">WHAT WE'RE LOOKING FOR</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <Sparkles className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                A live demo of something you built — even half-built
              </li>
              <li className="flex items-start">
                <Sparkles className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                A hard-won lesson from shipping with AI
              </li>
              <li className="flex items-start">
                <Sparkles className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                Research or tooling our builder audience can actually use
              </li>
            </ul>
          </div>
          <div className="bg-secondary/50 rounded-lg cyberpunk-border p-8">
            <h2 className="text-xl font-bold font-mono text-wildai-mint mb-4">WHAT TO EXPECT</h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <Clock className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                5 minutes on stage, hard stop
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                A quick prep call with the chapter organizers
              </li>
              <li className="flex items-start">
                <Clock className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />
                A room of builders who ask great questions
              </li>
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="max-w-2xl mx-auto mb-16">
          <h2 className="section-title text-center">SUBMIT YOUR TALK</h2>
          <p className="text-center text-muted-foreground mb-8">
            Tell us what you're building and we'll match you with a city and a date.
          </p>
          <SpeakerForm />
        </div>

        {/* Past speakers */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="section-title text-center">PAST SPEAKERS</h2>
          <p className="text-center text-muted-foreground mb-8">
            The people who have stepped up to the mic so far.
          </p>
          <PastSpeakers />
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title text-center">FAQ</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="bg-secondary/40 rounded-lg cyberpunk-border p-5">
                <summary className="font-bold font-mono cursor-pointer text-sm">{f.q}</summary>
                <p className="text-muted-foreground text-sm mt-3">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Speak;
