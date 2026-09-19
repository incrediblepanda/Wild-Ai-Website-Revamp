import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useChapters } from '@/hooks/useChapters';
import { CheckCircle2, Mail, Sparkles, CalendarDays } from 'lucide-react';

const Join = () => {
  const { data: chapters } = useChapters();
  const [email, setEmail] = useState('');
  const [city, setCity] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error' | 'duplicate'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const chapter = (chapters ?? []).find((c) => c.slug === city);
    const { error } = await supabase.from('chapter_subscribers').insert({
      email: email.toLowerCase().trim(),
      source: 'join',
      chapter_id: chapter?.id ?? null,
      city_requested: city || null,
    });
    // 23505 = already subscribed with this email + source; treat as success
    if (error && error.code !== '23505') {
      setStatus('error');
    } else {
      setStatus('done');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Join Wild AI — Get AI meetup invites for your city</title>
        <meta
          name="description"
          content="Join the Wild AI community: event invites, speaker lineups, and recaps for Minneapolis, San Francisco, and Toronto."
        />
        <meta property="og:title" content="Join Wild AI" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
      </Helmet>
      <Navbar />

      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              JOIN <span className="text-gradient">WILD AI</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              One email per event. No spam, no cringe — just fire-talk lineups, demo nights, and
              recaps from the builders around you.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            {/* Signup form */}
            <div className="bg-secondary/40 rounded-lg cyberpunk-border p-8">
              {status === 'done' ? (
                <div className="text-center py-10">
                  <CheckCircle2 className="w-12 h-12 text-wildai-mint mx-auto mb-4" />
                  <h2 className="text-xl font-bold font-mono mb-2">YOU'RE IN</h2>
                  <p className="text-muted-foreground mb-6">
                    Watch your inbox — the next event invite for your city lands there first.
                  </p>
                  <Link to="/chapters">
                    <Button variant="outline">BROWSE CHAPTERS</Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="text-xl font-bold font-mono text-wildai-mint">SIGN UP</h2>
                  <div className="space-y-2">
                    <Label htmlFor="join-email">Email</Label>
                    <Input
                      id="join-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="bg-wildai-teal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Your city</Label>
                    <Select value={city} onValueChange={setCity}>
                      <SelectTrigger className="bg-wildai-teal">
                        <SelectValue placeholder="Choose a chapter" />
                      </SelectTrigger>
                      <SelectContent className="bg-wildai-teal border-secondary">
                        {(chapters ?? []).map((c) => (
                          <SelectItem key={c.slug} value={c.slug}>
                            {c.city}
                            {c.status === 'launching' ? ' (launching)' : ''}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Somewhere else</SelectItem>
                      </SelectContent>
                    </Select>
                    {city === 'other' && (
                      <p className="text-xs text-muted-foreground">
                        No chapter near you yet — we'll notify you as new cities launch.
                      </p>
                    )}
                  </div>
                  {status === 'error' && (
                    <p className="text-sm text-destructive">
                      Something went wrong — please try again.
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal"
                  >
                    {status === 'submitting' ? 'JOINING…' : 'JOIN THE LIST'}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Already on the list? You won't get duplicates — this just updates your city.
                  </p>
                </form>
              )}
            </div>

            {/* What you get */}
            <div className="space-y-4">
              <div className="bg-secondary/50 rounded-lg cyberpunk-border p-6">
                <Mail className="w-6 h-6 text-wildai-mint mb-3" />
                <h3 className="font-bold font-mono mb-1">EVENT INVITES FIRST</h3>
                <p className="text-sm text-muted-foreground">
                  Subscribers get the invite days before public announcements — matters when the
                  room fills up.
                </p>
              </div>
              <div className="bg-secondary/50 rounded-lg cyberpunk-border p-6">
                <Sparkles className="w-6 h-6 text-wildai-mint mb-3" />
                <h3 className="font-bold font-mono mb-1">SPEAKER LINEUPS & RECAPS</h3>
                <p className="text-sm text-muted-foreground">
                  Who's demoing, what they showed, and the links — even if you had to miss it.
                </p>
              </div>
              <div className="bg-secondary/50 rounded-lg cyberpunk-border p-6">
                <CalendarDays className="w-6 h-6 text-wildai-mint mb-3" />
                <h3 className="font-bold font-mono mb-1">CITY-BY-CITY UPDATES</h3>
                <p className="text-sm text-muted-foreground">
                  New chapters, launch dates, and venue changes for the city you pick — and only
                  that city.
                </p>
              </div>
              <div className="bg-gradient-to-br from-wildai-mint/20 to-accent/20 rounded-lg cyberpunk-border p-6">
                <h3 className="font-bold font-mono text-wildai-mint mb-1">WANT TO DO MORE THAN ATTEND?</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Fire talks and chapter organizing are open to everyone on the list.
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Link to="/speak">
                    <Button size="sm" variant="outline">GIVE A TALK</Button>
                  </Link>
                  <Link to="/start-a-chapter">
                    <Button size="sm" variant="outline">START A CHAPTER</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Join;
