import React, { useEffect, useMemo, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Pencil, Loader2, Linkedin, Users } from 'lucide-react';

interface EventRow {
  id?: string;
  event_date: string; // YYYY-MM-DD
  location: string | null;
  speakers: string | null;
  start_time: string | null;
  end_time: string | null;
  linkedin_event_created: boolean;
  meetup_event_created: boolean;
  notes: string | null;
}

// Compute the third Monday for a given (year, monthIndex 0-11)
const thirdMonday = (year: number, month: number): Date => {
  const first = new Date(year, month, 1);
  const offset = (1 - first.getDay() + 7) % 7; // days until first Monday
  return new Date(year, month, 1 + offset + 14);
};

const toYMD = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

const fmtDate = (ymd: string) => {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });
};

const fmtTime = (t: string | null) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, '0')} ${ampm}`;
};

const EventsPanel = () => {
  const [stored, setStored] = useState<EventRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EventRow | null>(null);
  const [form, setForm] = useState<EventRow | null>(null);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('events').select('*').order('event_date', { ascending: true });
    if (error) toast.error(error.message);
    else setStored((data || []) as EventRow[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  // Build a 12-month rolling window of third-Monday slots, merged with any stored rows
  const rows = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const slots: EventRow[] = [];
    for (let i = 0; i < 12; i++) {
      const d = thirdMonday(today.getFullYear(), today.getMonth() + i);
      const ymd = toYMD(d);
      // If a stored event already exists in the same calendar month, use it instead of the auto third-Monday slot
      const storedInMonth = stored.find((s) => {
        const [sy, sm] = s.event_date.split('-').map(Number);
        return sy === d.getFullYear() && sm === d.getMonth() + 1;
      });
      if (storedInMonth) {
        slots.push(storedInMonth);
        continue;
      }
      const isMay = d.getMonth() === 4;
      slots.push({
        event_date: ymd,
        location: isMay ? 'Improving' : 'Dangerous Man Brewing',
        speakers: null,
        start_time: '18:00',
        end_time: null,
        linkedin_event_created: false,
        meetup_event_created: false,
        notes: null,
      });
    }
    // Append any stored rows whose month isn't represented in the 12-month window
    const usedMonths = new Set(slots.map((s) => s.event_date.slice(0, 7)));
    const extras = stored.filter((s) => !usedMonths.has(s.event_date.slice(0, 7)));
    return [...extras, ...slots];
  }, [stored]);

  const openEdit = (r: EventRow) => { setEditing(r); setForm({ ...r }); };

  const quickToggle = async (r: EventRow, field: 'linkedin_event_created' | 'meetup_event_created', value: boolean) => {
    const payload = { ...r, [field]: value };
    const { error } = await supabase.from('events').upsert(
      {
        event_date: payload.event_date,
        location: payload.location,
        speakers: payload.speakers,
        start_time: payload.start_time,
        end_time: payload.end_time,
        linkedin_event_created: payload.linkedin_event_created,
        meetup_event_created: payload.meetup_event_created,
        notes: payload.notes,
      },
      { onConflict: 'event_date' }
    );
    if (error) return toast.error(error.message);
    load();
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    const { error } = await supabase.from('events').upsert(
      {
        event_date: form.event_date,
        location: form.location || null,
        speakers: form.speakers || null,
        start_time: form.start_time || null,
        end_time: form.end_time || null,
        linkedin_event_created: form.linkedin_event_created,
        meetup_event_created: form.meetup_event_created,
        notes: form.notes || null,
      },
      { onConflict: 'event_date' }
    );
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success('Saved');
    setEditing(null);
    setForm(null);
    load();
  };

  return (
    <div className="bg-secondary/40 rounded-lg cyberpunk-border p-5">
      <div className="mb-4">
        <h2 className="text-lg font-mono text-wildai-mint">Monthly Events</h2>
        <p className="text-sm text-muted-foreground">
          Auto-generated for the third Monday of every month for the next 12 months. Fill in details as they're confirmed.
        </p>
      </div>

      {loading ? <div className="py-12 text-center"><Loader2 className="w-6 h-6 animate-spin inline text-wildai-mint" /></div> : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Speakers</TableHead>
                <TableHead className="text-center"><Linkedin className="w-4 h-4 inline" /> LinkedIn</TableHead>
                <TableHead className="text-center"><Users className="w-4 h-4 inline" /> Meetup</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.event_date}>
                  <TableCell className="font-medium whitespace-nowrap">{fmtDate(r.event_date)}</TableCell>
                  <TableCell className="text-xs whitespace-nowrap">
                    {r.start_time || r.end_time
                      ? `${fmtTime(r.start_time)}${r.end_time ? ' – ' + fmtTime(r.end_time) : ''}`
                      : <span className="text-muted-foreground">—</span>}
                  </TableCell>
                  <TableCell className="text-sm">{r.location || <span className="text-muted-foreground">—</span>}</TableCell>
                  <TableCell className="text-sm max-w-[260px] truncate">{r.speakers || <span className="text-muted-foreground">—</span>}</TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={r.linkedin_event_created}
                      onCheckedChange={(v) => quickToggle(r, 'linkedin_event_created', !!v)}
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <Checkbox
                      checked={r.meetup_event_created}
                      onCheckedChange={(v) => quickToggle(r, 'meetup_event_created', !!v)}
                    />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(r)}><Pencil className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => { if (!o) { setEditing(null); setForm(null); } }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Event · {form && fmtDate(form.event_date)}</DialogTitle>
          </DialogHeader>
          {form && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Start time</Label>
                  <Input type="time" value={form.start_time || ''} onChange={(e) => setForm({ ...form, start_time: e.target.value || null })} />
                </div>
                <div>
                  <Label>End time</Label>
                  <Input type="time" value={form.end_time || ''} onChange={(e) => setForm({ ...form, end_time: e.target.value || null })} />
                </div>
              </div>
              <div>
                <Label>Location</Label>
                <Input value={form.location || ''} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="Loon Cafe, Minneapolis" />
              </div>
              <div>
                <Label>Speakers</Label>
                <Textarea value={form.speakers || ''} onChange={(e) => setForm({ ...form, speakers: e.target.value })} placeholder="Comma-separated speaker names" />
              </div>
              <div>
                <Label>Notes</Label>
                <Textarea value={form.notes || ''} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={form.linkedin_event_created} onCheckedChange={(v) => setForm({ ...form, linkedin_event_created: !!v })} />
                  <span className="text-sm">LinkedIn event created</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={form.meetup_event_created} onCheckedChange={(v) => setForm({ ...form, meetup_event_created: !!v })} />
                  <span className="text-sm">Meetup event created</span>
                </label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => { setEditing(null); setForm(null); }}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsPanel;
