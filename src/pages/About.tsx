import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useChapters } from '@/hooks/useChapters';
import { Flame, Users, Mic2, ArrowRight } from 'lucide-react';

const values = [
  {
    icon: Flame,
    title: 'SHOW, DON\u2019T TELL',
    text: 'No vendor keynotes. No slide decks. Every talk is five minutes of real work — a demo, a lesson, a war story from shipping with AI.',
  },
  {
    icon: Users,
    title: 'BUILDER FIRST',
    text: 'The room is the product. We optimize for the engineers and founders doing the work, not the loudest sponsor or the biggest logo.',
  },
  {
    icon: Mic2,
    title: 'EVERYONE ON STAGE',
    text: 'First-time speakers get the same mic as veterans. The best talks at Wild AI have come from people presenting a side project for the first time.',
  },
];

const About = () => {
  const { data: chapters } = useChapters();

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>About Wild AI — The AI meetup for people who ship</title>
        <meta
          name="description"
          content="Wild AI is a community-run meetup network for AI builders. Our story, values, team, and code of conduct."
        />
        <meta property="og:title" content="About Wild AI" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Navbar />

      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4">
          {/* Manifesto hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              WE BELIEVE THE BEST AI CONVERSATIONS HAPPEN{' '}
              <span className="text-gradient">IN A CROWDED ROOM</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Wild AI is a community-run meetup network for people who actually build with AI.
              We started in Minneapolis and are growing city by city — one fire talk, one demo
              night, one crowded bar at a time.
            </p>
          </div>

          {/* Origin story */}
          <div className="max-w-3xl mx-auto bg-secondary/40 rounded-lg cyberpunk-border p-8 mb-16">
            <h2 className="section-title">THE ORIGIN STORY</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The first Wild AI meetup was a handful of engineers in a Minneapolis office,
                passing a microphone around and showing each other what they'd built that month.
                No tickets, no sponsors, no agenda beyond "show the weird thing you made."
              </p>
              <p>
                It kept filling up. The format stayed deliberately simple — five-minute fire
                talks, no slides, then hours of open networking — because everything we tried to
                add made the room worse. Four years and hundreds of demos later, the formula
                still holds.
              </p>
              <p>
                Now we're taking the model to new cities, run by local organizers who care about
                their local AI scene — not a franchise, a network.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="section-title text-center">WHAT WE STAND FOR</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map((v) => (
                <div key={v.title} className="bg-secondary/50 rounded-lg cyberpunk-border p-6 text-center">
                  <v.icon className="w-8 h-8 text-wildai-mint mx-auto mb-3" />
                  <h3 className="font-bold font-mono mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team */}
          <div className="max-w-3xl mx-auto bg-secondary/40 rounded-lg cyberpunk-border p-8 mb-16">
            <h2 className="section-title">THE TEAM</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Wild AI is run by a core crew of organizers in Minneapolis, plus chapter leads in
              every launching city. Organizers plan the events, recruit speakers, and keep the
              rooms welcoming — if you want to meet the people behind it, come to a meetup and
              find whoever is holding the mic.
            </p>
            <p className="text-sm text-muted-foreground">
              Want to join the crew?{' '}
              <Link to="/start-a-chapter" className="text-wildai-mint hover:underline">
                Apply to organize a chapter →
              </Link>
            </p>
          </div>

          {/* Network */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="section-title text-center">THE NETWORK</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {(chapters ?? []).map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  className="bg-secondary/50 rounded-lg cyberpunk-border p-5 text-center hover:bg-secondary/80 transition-colors group"
                >
                  <p className="font-bold font-mono group-hover:text-wildai-mint transition-colors">
                    {c.city.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground mb-2">{c.region}</p>
                  <span className="text-[10px] font-mono text-wildai-mint">
                    {c.status === 'active' ? 'ACTIVE' : 'LAUNCHING'} · {c.member_count ?? 0}+ members
                  </span>
                </Link>
              ))}
              <Link
                to="/chapters"
                className="bg-secondary/30 rounded-lg cyberpunk-border p-5 text-center hover:bg-secondary/80 transition-colors flex flex-col items-center justify-center"
              >
                <p className="font-bold font-mono text-wildai-mint mb-1">MORE CITIES</p>
                <p className="text-xs text-muted-foreground">See the full directory</p>
              </Link>
            </div>
          </div>

          {/* Code of conduct */}
          <div id="conduct" className="max-w-3xl mx-auto bg-secondary/40 rounded-lg cyberpunk-border p-8 mb-16 scroll-mt-28">
            <h2 className="section-title">CODE OF CONDUCT</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Wild AI exists so builders can share real work in a room they trust. That trust
                is non-negotiable. We are inclusive of all backgrounds, experience levels, and
                technologies. Harassment, discrimination, or hostile behavior toward anyone in
                the community — at events or online — results in removal and a ban.
              </p>
              <p>
                Demos are judged on the work, not the person. Recruiters are welcome as
                attendees and sponsors, but the room is never a pitch stage. If you see or
                experience anything that violates this, tell any organizer — we take it
                seriously and act on it.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold font-mono mb-4">COME TO A MEETUP</h2>
            <p className="text-muted-foreground mb-6">
              The fastest way to understand Wild AI is to stand in one of our rooms.
            </p>
            <Link to="/chapters">
              <Button className="bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal">
                FIND YOUR CITY <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
