import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useChapters } from '@/hooks/useChapters';
import { CheckCircle2, Rocket, Users, Map } from 'lucide-react';

const StartAChapter = () => {
  const { data: chapters } = useChapters();
  const [form, setForm] = useState({ city: '', name: '', email: '', background: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error: err } = await supabase.from('chapter_applications').insert({
      city: form.city,
      name: form.name,
      email: form.email,
      background: form.background || null,
      message: form.message || null,
    });
    if (err) {
      setError('Something went wrong — please try again in a moment.');
    } else {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Start a Wild AI Chapter — Bring AI meetups to your city</title>
        <meta
          name="description"
          content="Bring Wild AI to your city. We provide the playbook, brand, and network — you provide the local energy. Apply to start a chapter."
        />
        <meta property="og:title" content="Start a Wild AI Chapter" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Navbar />

      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Rocket className="w-10 h-10 text-wildai-mint mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              START A <span className="text-gradient">CHAPTER</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              You bring the local energy. We bring the playbook, the brand, the organizer network,
              and four years of lessons about what makes AI meetups actually good.
            </p>
          </div>

          {/* The pitch + expectations */}
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-secondary/50 rounded-lg cyberpunk-border p-8">
              <h2 className="text-xl font-bold font-mono text-wildai-mint mb-4">WHAT YOU GET</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start"><Users className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />A proven format: fire talks, demo nights, real networking</li>
                <li className="flex items-start"><Map className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />Brand, event templates, and a page on this site for your city</li>
                <li className="flex items-start"><Users className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />A network of organizers who've done it before, on call</li>
              </ul>
            </div>
            <div className="bg-secondary/50 rounded-lg cyberpunk-border p-8">
              <h2 className="text-xl bold font-bold font-mono text-wildai-mint mb-4">WHAT WE EXPECT</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start"><Rocket className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />You live in (or near) the city you want to launch</li>
                <li className="flex items-start"><Rocket className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />A co-organizer or two — this is a team sport</li>
                <li className="flex items-start"><Rocket className="w-4 h-4 text-wildai-mint mr-3 mt-1 flex-shrink-0" />Commitment to a monthly cadence for at least 6 months</li>
              </ul>
            </div>
          </div>

          {/* Current + launching chapters */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="section-title text-center">WHERE WE ARE NOW</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {(chapters ?? []).map((c) => (
                <Link
                  key={c.slug}
                  to={`/${c.slug}`}
                  className="bg-secondary/50 rounded-lg cyberpunk-border p-5 text-center hover:bg-secondary/80 transition-colors"
                >
                  <p className="font-bold font-mono mb-1">{c.city.toUpperCase()}</p>
                  <p className="text-xs text-muted-foreground mb-3">{c.region}</p>
                  <span
                    className={`text-[10px] font-mono rounded px-2 py-0.5 ${
                      c.status === 'active'
                        ? 'text-wildai-mint'
                        : 'text-wildai-mint border border-wildai-mint/40'
                    }`}
                  >
                    {c.status === 'active' ? 'ACTIVE' : 'LAUNCHING'}
                  </span>
                </Link>
              ))}
              <div className="bg-secondary/30 rounded-lg cyberpunk-border p-5 text-center flex flex-col items-center justify-center">
                <p className="font-bold font-mono text-wildai-mint mb-1">YOUR CITY</p>
                <p className="text-xs text-muted-foreground">Next on the map?</p>
              </div>
            </div>
          </div>

          {/* Application form */}
          <div className="max-w-xl mx-auto mb-16">
            <h2 className="section-title text-center">APPLY TO ORGANIZE</h2>
            <p className="text-center text-muted-foreground mb-8">
              Tell us about your city and why you want to build its AI community.
            </p>
            {submitted ? (
              <div className="bg-secondary/50 rounded-lg cyberpunk-border p-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-wildai-mint mx-auto mb-3" />
                <p className="font-bold mb-2">Application received.</p>
                <p className="text-sm text-muted-foreground">
                  We review applications weekly and will reach out about next steps.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-secondary/40 rounded-lg cyberpunk-border p-8 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="ac-city">City you want to launch</Label>
                  <Input
                    id="ac-city"
                    required
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    placeholder="Austin"
                    className="bg-wildai-teal"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="ac-name">Your name</Label>
                    <Input
                      id="ac-name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Alex Kim"
                      className="bg-wildai-teal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ac-email">Email</Label>
                    <Input
                      id="ac-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="alex@example.com"
                      className="bg-wildai-teal"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ac-background">Your background</Label>
                  <Input
                    id="ac-background"
                    value={form.background}
                    onChange={(e) => setForm({ ...form, background: e.target.value })}
                    placeholder="Engineer, founder, community organizer…"
                    className="bg-wildai-teal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ac-message">Why your city?</Label>
                  <Textarea
                    id="ac-message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="What does the AI scene look like there today?"
                    className="bg-wildai-teal min-h-[100px]"
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal"
                >
                  {submitting ? 'SENDING…' : 'SUBMIT APPLICATION'}
                </Button>
              </form>
            )}
          </div>

          {/* What happens next */}
          <div className="max-w-2xl mx-auto">
            <h2 className="section-title text-center">WHAT HAPPENS NEXT</h2>
            <div className="space-y-4">
              {[
                { step: '01', text: 'We review applications weekly and reply within two weeks.' },
                { step: '02', text: 'A 30-minute call: your city, your co-organizers, your first venue.' },
                { step: '03', text: 'We set up your chapter page, email list, and launch plan together.' },
                { step: '04', text: 'Launch night — we help promote, you run the room.' },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-4 bg-secondary/40 rounded-lg cyberpunk-border p-5">
                  <span className="font-mono text-wildai-mint text-lg">{s.step}</span>
                  <p className="text-muted-foreground">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StartAChapter;
