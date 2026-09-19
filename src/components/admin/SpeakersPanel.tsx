import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Linkedin, Mail, Phone, Trash2, Eye } from 'lucide-react';

interface Speaker {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  linkedin_url: string | null;
  description: string | null;
  what_building: string | null;
  image_url: string | null;
  status: string;
  event_id: string | null;
  notes: string | null;
  created_at: string;
}

interface EventRow { id: string; event_date: string; location: string | null; }

const fmtDate = (ymd: string) => {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
};

const SpeakersPanel = () => {
  const [speakers, setSpeakers] = useState<Speaker[]>([]);
  const [events, setEvents] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState<Speaker | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'assigned' | 'declined'>('pending');

  const load = async () => {
    setLoading(true);
    const [{ data: spk, error: sErr }, { data: evs }] = await Promise.all([
      supabase.from('speakers').select('*').order('created_at', { ascending: false }),
      supabase.from('events').select('id, event_date, location').order('event_date', { ascending: true }),
    ]);
    if (sErr) toast.error(sErr.message);
    setSpeakers((spk || []) as Speaker[]);
    setEvents((evs || []) as EventRow[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const eventLabel = (id: string | null) => {
    if (!id) return '—';
    const e = events.find((x) => x.id === id);
    return e ? `${fmtDate(e.event_date)}${e.location ? ' · ' + e.location : ''}` : '—';
  };

  const filtered = useMemo(() => {
    if (filter === 'all') return speakers;
    return speakers.filter((s) => s.status === filter);
  }, [speakers, filter]);

  const upcoming = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10);
    return events.filter((e) => e.event_date >= today);
  }, [events]);

  const assignToEvent = async (speaker: Speaker, eventId: string | null) => {
    const status = eventId ? 'assigned' : 'pending';
    const { error } = await supabase.from('speakers')
      .update({ event_id: eventId, status }).eq('id', speaker.id);
    if (error) return toast.error(error.message);
    toast.success(eventId ? 'Speaker assigned' : 'Unassigned');
    if (viewing?.id === speaker.id) setViewing({ ...speaker, event_id: eventId, status });
    load();
  };

  const setStatus = async (speaker: Speaker, status: string) => {
    const patch: any = { status };
    if (status !== 'assigned') patch.event_id = null;
    const { error } = await supabase.from('speakers').update(patch).eq('id', speaker.id);
    if (error) return toast.error(error.message);
    toast.success(`Marked ${status}`);
    if (viewing?.id === speaker.id) setViewing({ ...speaker, ...patch });
    load();
  };

  const remove = async (speaker: Speaker) => {
    if (!confirm(`Delete ${speaker.name}'s application?`)) return;
    const { error } = await supabase.from('speakers').delete().eq('id', speaker.id);
    if (error) return toast.error(error.message);
    toast.success('Deleted');
    setViewing(null);
    load();
  };

  const statusBadge = (s: string) => {
    const map: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-300',
      assigned: 'bg-wildai-mint/20 text-wildai-mint',
      declined: 'bg-red-500/20 text-red-300',
    };
    return <Badge className={map[s] || ''}>{s}</Badge>;
  };

  return (
    <div className="bg-secondary/40 rounded-lg cyberpunk-border p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-mono text-wildai-mint">Speaker Applications</h2>
          <p className="text-sm text-muted-foreground">Review applications and assign speakers to upcoming events.</p>
        </div>
        <Select value={filter} onValueChange={(v: any) => setFilter(v)}>
          <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="assigned">Assigned</SelectItem>
            <SelectItem value="declined">Declined</SelectItem>
            <SelectItem value="all">All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="py-12 text-center"><Loader2 className="w-6 h-6 animate-spin inline text-wildai-mint" /></div>
      ) : filtered.length === 0 ? (
        <p className="py-10 text-center text-muted-foreground text-sm">No applications.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Building</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Event</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((s) => (
                <TableRow key={s.id}>
                  <TableCell>
                    {s.image_url
                      ? <img src={s.image_url} alt={s.name} className="w-10 h-10 rounded-full object-cover" />
                      : <div className="w-10 h-10 rounded-full bg-secondary" />}
                  </TableCell>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground max-w-[280px] truncate">{s.what_building}</TableCell>
                  <TableCell>{statusBadge(s.status)}</TableCell>
                  <TableCell className="text-sm">
                    <Select
                      value={s.event_id || 'none'}
                      onValueChange={(v) => assignToEvent(s, v === 'none' ? null : v)}
                    >
                      <SelectTrigger className="w-56 h-8 text-xs"><SelectValue placeholder="Assign…" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">— Unassigned —</SelectItem>
                        {upcoming.map((e) => (
                          <SelectItem key={e.id} value={e.id}>{fmtDate(e.event_date)}{e.location ? ' · ' + e.location : ''}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell className="text-xs whitespace-nowrap">{new Date(s.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => setViewing(s)}><Eye className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!viewing} onOpenChange={(o) => { if (!o) setViewing(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{viewing?.name}</DialogTitle></DialogHeader>
          {viewing && (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                {viewing.image_url
                  ? <img src={viewing.image_url} alt={viewing.name} className="w-32 h-32 rounded-lg object-cover" />
                  : <div className="w-32 h-32 rounded-lg bg-secondary" />}
                <div className="flex-1 space-y-2 text-sm">
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-wildai-mint" /><a href={`mailto:${viewing.email}`} className="hover:underline">{viewing.email}</a></div>
                  {viewing.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-wildai-mint" />{viewing.phone}</div>}
                  {viewing.linkedin_url && <div className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-wildai-mint" /><a href={viewing.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">{viewing.linkedin_url}</a></div>}
                  <div>{statusBadge(viewing.status)}</div>
                  <div className="text-muted-foreground">Event: {eventLabel(viewing.event_id)}</div>
                </div>
              </div>

              <div>
                <Label className="text-xs uppercase text-muted-foreground">About</Label>
                <p className="whitespace-pre-wrap text-sm mt-1">{viewing.description}</p>
              </div>
              <div>
                <Label className="text-xs uppercase text-muted-foreground">What they're building</Label>
                <p className="whitespace-pre-wrap text-sm mt-1">{viewing.what_building}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Assign to event</Label>
                  <Select
                    value={viewing.event_id || 'none'}
                    onValueChange={(v) => assignToEvent(viewing, v === 'none' ? null : v)}
                  >
                    <SelectTrigger><SelectValue placeholder="Pick an event…" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">— Unassigned —</SelectItem>
                      {upcoming.map((e) => (
                        <SelectItem key={e.id} value={e.id}>{fmtDate(e.event_date)}{e.location ? ' · ' + e.location : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={viewing.status} onValueChange={(v) => setStatus(viewing, v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="declined">Declined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" className="text-red-400 hover:text-red-300" onClick={() => viewing && remove(viewing)}>
              <Trash2 className="w-4 h-4" /> Delete
            </Button>
            <Button variant="outline" onClick={() => setViewing(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SpeakersPanel;
