import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CheckCircle2, Mail } from 'lucide-react';

interface EmailCaptureProps {
  /** Where the signup came from: 'join' | 'footer' | 'chapter' | 'notify' | 'events' */
  source: string;
  chapterId?: string;
  cityRequested?: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

/**
 * Reusable email capture form. Writes to the chapter_subscribers table.
 * Duplicate emails for the same source are treated as already subscribed.
 */
const EmailCapture = ({
  source,
  chapterId,
  cityRequested,
  title = 'JOIN THE COMMUNITY',
  description = 'Event invites, speaker lineups, and recaps. No spam, unsubscribe anytime.',
  compact = false,
}: EmailCaptureProps) => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast.error('Please enter a valid email');
      return;
    }
    setSubmitting(true);
    try {
      const { error } = await supabase.from('chapter_subscribers').insert({
        email: email.trim().toLowerCase(),
        chapter_id: chapterId ?? null,
        source,
        city_requested: cityRequested ?? null,
      });
      if (error && error.code !== '23505') throw error;
      setDone(true);
      toast.success(
        error?.code === '23505' ? "You're already on the list!" : "You're on the list!"
      );
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Signup failed — please try again');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className={`bg-secondary/40 rounded-lg cyberpunk-border ${compact ? 'p-6' : 'p-10'} text-center`}>
        <CheckCircle2 className="w-10 h-10 text-wildai-mint mx-auto mb-3" />
        <p className="font-mono font-bold text-wildai-mint">YOU'RE ON THE LIST</p>
        <p className="text-sm text-muted-foreground mt-2">Watch your inbox for the next event.</p>
      </div>
    );
  }

  return (
    <div className={`bg-secondary/40 rounded-lg cyberpunk-border ${compact ? 'p-6' : 'p-8'}`}>
      <div className="flex items-center gap-2 mb-3">
        <Mail className="w-5 h-5 text-wildai-mint" />
        <h3 className="text-lg font-bold font-mono text-wildai-mint">{title}</h3>
      </div>
      <p className="text-sm text-muted-foreground mb-4">{description}</p>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
        <Input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow"
          maxLength={255}
          required
        />
        <Button
          type="submit"
          disabled={submitting}
          className="bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal font-bold whitespace-nowrap"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'SUBSCRIBE'}
        </Button>
      </form>
      <p className="text-xs text-muted-foreground mt-3">
        By subscribing you agree to receive chapter emails. Unsubscribe anytime.
      </p>
    </div>
  );
};

export default EmailCapture;
