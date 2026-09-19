import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LogoCarousel from '@/components/LogoCarousel';
import PastHighlights from '@/components/PastHighlights';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle2, Users, Megaphone, Handshake } from 'lucide-react';

const tiers = [
  {
    name: 'COMMUNITY',
    price: '$500 / event',
    perks: ['Logo on event page', 'Shoutout from the podium', '2 free passes'],
  },
  {
    name: 'SUPPORTING',
    price: '$1,500 / event',
    perks: ['Everything in Community', 'Booth table at the venue', 'Logo in recap emails'],
  },
  {
    name: 'HEADLINE',
    price: 'Custom',
    perks: [
      'Everything in Supporting',
      'Named demo-night sponsor',
      'Dedicated recruitment slot',
      'City-wide or network-wide exclusivity',
    ],
  },
];

const Sponsor = () => {
  const [form, setForm] = useState({ company: '', name: '', email: '', tier: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: err } = await supabase.from('sponsor_leads').insert({
      company: form.company,
      name: form.name,
      email: form.email,
      tier: form.tier || null,
      message: form.message || null,
    });
    if (err) {
      setError('Something went wrong — please email us directly instead.');
    } else {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Sponsor Wild AI — Reach working AI builders</title>
        <meta
          name="description"
          content="Put your brand in front of hundreds of active AI engineers and founders at Wild AI meetups in Minneapolis, San Francisco, and Toronto."
        />
        <meta property="og:title" content="Sponsor Wild AI" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Navbar />

      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Handshake className="w-10 h-10 text-wildai-mint mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              REACH AI <span className="text-gradient">BUILDERS</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Wild AI rooms are full of people who ship: engineers, founders, and researchers
              actively building with AI. Sponsors get their attention in person, not in a feed.
            </p>
          </div>

          {/* Audience data */}
          <div className="max-w-4xl mx-auto grid sm:grid-cols-3 gap-4 mb-16">
            {[
              { icon: Users, stat: '790+', label: 'members across three chapters' },
              { icon: Megaphone, stat: '60%+', label: 'of attendees are engineers or founders' },
              { icon: Handshake, stat: '4+ years', label: 'of consistently packed meetups' },
            ].map((s) => (
              <div key={s.label} className="bg-secondary/50 rounded-lg cyberpunk-border p-6 text-center">
                <s.icon className="w-6 h-6 text-wildai-mint mx-auto mb-2" />
                <p className="text-3xl font-bold font-mono text-wildai-mint mb-1">{s.stat}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Why sponsor */}
          <div className="max-w-4xl mx-auto bg-secondary/40 rounded-lg cyberpunk-border p-8 mb-16">
            <h2 className="section-title">WHY SPONSORS KEEP COMING BACK</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start"><span className="text-wildai-mint mr-2">→</span> Recruitment: meet your next AI hire in person, not in a pile of résumés</li>
              <li className="flex items-start"><span className="text-wildai-mint mr-2">→</span> Product feedback: demo to builders who will actually use (and break) your tool</li>
              <li className="flex items-start"><span className="text-wildai-mint mr-2">→</span> Brand trust: align with the community voice of local AI scenes, not a generic conference</li>
            </ul>
          </div>

          {/* Tiers */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="section-title text-center">SPONSORSHIP TIERS</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {tiers.map((t) => (
                <div key={t.name} className="bg-secondary/50 rounded-lg cyberpunk-border p-6 flex flex-col">
                  <h3 className="text-lg font-bold font-mono text-wildai-mint mb-1">{t.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t.price}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground flex-grow">
                    {t.perks.map((p) => (
                      <li key={p} className="flex items-start">
                        <CheckCircle2 className="w-4 h-4 text-wildai-mint mr-2 mt-0.5 flex-shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Placeholder pricing — final tiers are confirmed with sponsors directly.
            </p>
          </div>

          {/* Sponsors + photos */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="section-title text-center">TRUSTED BY</h2>
            <LogoCarousel />
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="section-title text-center">ROOMS WE PACK</h2>
            <PastHighlights />
          </div>

          {/* Lead form */}
          <div className="max-w-xl mx-auto">
            <h2 className="section-title text-center">GET THE SPONSOR DECK</h2>
            <p className="text-center text-muted-foreground mb-8">
              Tell us who you are and we'll send pricing, audience data, and available dates.
            </p>
            {submitted ? (
              <div className="bg-secondary/50 rounded-lg cyberpunk-border p-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-wildai-mint mx-auto mb-3" />
                <p className="font-bold">Thanks — we'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-secondary/40 rounded-lg cyberpunk-border p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-company">Company</Label>
                    <Input
                      id="sponsor-company"
                      required
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="Acme AI"
                      className="bg-wildai-teal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sponsor-name">Your name</Label>
                    <Input
                      id="sponsor-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="bg-wildai-teal"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsor-email">Work email</Label>
                  <Input
                    id="sponsor-email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="jane@acme.ai"
                    className="bg-wildai-teal"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tier of interest</Label>
                  <Select value={form.tier} onValueChange={(v) => setForm({ ...form, tier: v })}>
                    <SelectTrigger className="bg-wildai-teal">
                      <SelectValue placeholder="Choose a tier (optional)" />
                    </SelectTrigger>
                    <SelectContent className="bg-wildai-teal border-secondary">
                      <SelectItem value="community">Community</SelectItem>
                      <SelectItem value="supporting">Supporting</SelectItem>
                      <SelectItem value="headline">Headline</SelectItem>
                      <SelectItem value="unsure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sponsor-message">Message</Label>
                  <Textarea
                    id="sponsor-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What are you hoping to get out of sponsoring?"
                    className="bg-wildai-teal min-h-[100px]"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal"
                >
                  {submitting ? 'SENDING…' : 'REQUEST SPONSOR INFO'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sponsor;
