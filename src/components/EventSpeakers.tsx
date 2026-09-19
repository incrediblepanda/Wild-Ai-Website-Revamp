import React, { useEffect, useState } from 'react';
import { Linkedin, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Speaker {
  id: string;
  name: string;
  linkedin_url: string | null;
  description: string | null;
  what_building: string | null;
  image_url: string | null;
}

interface Props {
  /** YYYY-MM-DD date used to look up the event */
  eventDate: string;
  /** Fallback message when no speakers are assigned yet */
  emptyMessage?: React.ReactNode;
}

const EventSpeakers = ({ eventDate, emptyMessage }: Props) => {
  const [speakers, setSpeakers] = useState<Speaker[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: ev } = await supabase
        .from('events').select('id').eq('event_date', eventDate).maybeSingle();
      if (!ev?.id) { if (!cancelled) setSpeakers([]); return; }
      const { data } = await supabase
        .from('speakers')
        .select('id, name, linkedin_url, description, what_building, image_url')
        .eq('event_id', ev.id)
        .eq('status', 'assigned')
        .order('created_at', { ascending: true });
      if (!cancelled) setSpeakers((data || []) as Speaker[]);
    })();
    return () => { cancelled = true; };
  }, [eventDate]);

  if (speakers === null) return null;

  if (speakers.length === 0) {
    return (
      <div className="bg-secondary/50 p-5 rounded-lg mb-10">
        {emptyMessage || (
          <p className="text-muted-foreground">
            Speaker lineup coming soon. Want to speak?{' '}
            <a href="/#speak" className="text-wildai-mint hover:underline">Apply here</a>.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-4 mb-10">
      {speakers.map((s) => (
        <div key={s.id} className="bg-secondary/50 rounded-lg p-5 border border-border">
          <div className="flex items-start gap-4">
            {s.image_url ? (
              <img src={s.image_url} alt={s.name} className="w-20 h-20 rounded-lg object-cover flex-shrink-0" />
            ) : (
              <div className="w-20 h-20 rounded-lg bg-wildai-mint/10 flex items-center justify-center flex-shrink-0">
                <Users className="w-8 h-8 text-wildai-mint" />
              </div>
            )}
            <div className="flex-1 min-w-0 space-y-2">
              <h3 className="font-bold text-lg">{s.name}</h3>
              {s.description && (
                <p className="text-sm text-foreground/80">{s.description}</p>
              )}
              {s.what_building && (
                <p className="text-sm text-muted-foreground">
                  <span className="text-wildai-mint font-mono text-xs uppercase mr-1">Demoing:</span>
                  {s.what_building}
                </p>
              )}
              {s.linkedin_url && (
                <a href={s.linkedin_url} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-wildai-mint text-sm hover:underline">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventSpeakers;
