import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Newspaper, Download, Mail, Quote } from 'lucide-react';

const mentions = [
  {
    outlet: 'Example Tech Weekly',
    quote:
      'The most refreshingly unpolished AI event in the Twin Cities — and that is exactly why the best builders show up.',
    date: '2026',
  },
  {
    outlet: 'Example Startup Beat',
    quote:
      'Wild AI demo nights have quietly become the place where the local AI scene actually happens.',
    date: '2025',
  },
];

const facts = [
  ['Founded', '2021, Minneapolis'],
  ['Format', '5-minute fire talks + open networking, monthly'],
  ['Chapters', 'Minneapolis (active), San Francisco & Toronto (launching 2026)'],
  ['Community', '790+ members across chapters'],
  ['Typical attendance', '80–120 builders per event'],
];

const Press = () => (
  <div className="flex flex-col min-h-screen">
    <Helmet>
      <title>Press — Wild AI</title>
      <meta
        name="description"
        content="Press resources for Wild AI: brand assets, boilerplate, fact sheet, and media contact."
      />
      <meta property="og:title" content="Wild AI Press" />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary" />
    </Helmet>
    <Navbar />

    <main className="pt-24 pb-20 flex-grow">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Newspaper className="w-10 h-10 text-wildai-mint mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            WILD AI <span className="text-gradient">PRESS</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to cover Wild AI — logos, boilerplate, facts, and a real human
            to talk to.
          </p>
        </div>

        {/* Brand assets */}
        <div className="max-w-3xl mx-auto bg-secondary/40 rounded-lg cyberpunk-border p-8 mb-10">
          <h2 className="section-title">BRAND ASSETS</h2>
          <p className="text-muted-foreground mb-4">
            The Wild AI wordmark and flame icon on transparent backgrounds, in light and dark
            versions. Please don't recolor or distort the logo.
          </p>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" /> DOWNLOAD MEDIA KIT (ZIP)
          </Button>
          <p className="text-xs text-muted-foreground mt-3">
            Placeholder link — the media kit file is being packaged.
          </p>
        </div>

        {/* Boilerplate */}
        <div className="max-w-3xl mx-auto bg-secondary/40 rounded-lg cyberpunk-border p-8 mb-10">
          <h2 className="section-title">BOILERPLATE</h2>
          <blockquote className="border-l-2 border-wildai-mint pl-4 text-muted-foreground leading-relaxed">
            Wild AI is a community-run meetup network for people who build with AI. Founded in
            Minneapolis in 2021, its events pair rapid-fire five-minute demos ("fire talks") with
            hours of open networking — no vendor keynotes, no slide decks. With active and
            launching chapters across North America, Wild AI is where local AI scenes actually
            happen.
          </blockquote>
        </div>

        {/* Mentions */}
        <div className="max-w-3xl mx-auto mb-10">
          <h2 className="section-title text-center">IN THE WILD</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {mentions.map((m) => (
              <div key={m.outlet} className="bg-secondary/50 rounded-lg cyberpunk-border p-6">
                <Quote className="w-5 h-5 text-wildai-mint mb-3" />
                <p className="text-sm text-muted-foreground mb-4">"{m.quote}"</p>
                <p className="text-xs font-mono text-wildai-mint">
                  {m.outlet} · {m.date}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            Example mentions shown — live coverage links coming soon.
          </p>
        </div>

        {/* Fact sheet */}
        <div className="max-w-3xl mx-auto bg-secondary/40 rounded-lg cyberpunk-border p-8 mb-10">
          <h2 className="section-title">FACT SHEET</h2>
          <dl className="space-y-3">
            {facts.map(([k, v]) => (
              <div key={k} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <dt className="font-mono text-sm text-wildai-mint w-44 flex-shrink-0">{k.toUpperCase()}</dt>
                <dd className="text-muted-foreground text-sm">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Media contact */}
        <div className="max-w-2xl mx-auto bg-secondary/40 rounded-lg cyberpunk-border p-8 text-center">
          <Mail className="w-8 h-8 text-wildai-mint mx-auto mb-3" />
          <h2 className="text-xl font-bold font-mono mb-2">MEDIA CONTACT</h2>
          <p className="text-muted-foreground mb-4">
            Interview requests, speaker bios, and event photography access.
          </p>
          <a href="mailto:press@wildai.us">
            <Button className="bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal">
              press@wildai.us
            </Button>
          </a>
          <p className="text-xs text-muted-foreground mt-4">
            Placeholder address — confirm the real press inbox before launch.
          </p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Press;
