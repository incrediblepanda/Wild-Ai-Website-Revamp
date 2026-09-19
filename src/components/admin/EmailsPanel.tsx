import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Loader2, Plus, Trash2, Send, Eye } from 'lucide-react';

interface Template { id: string; name: string; subject: string; html: string; created_at: string; }
interface Campaign { id: string; subject: string; recipient_count: number; success_count: number; error_count: number; sent_at: string; }
interface Attendee { id: string; name: string; email: string; subscribed: boolean; events_attended: string[]; }

const fmtDateLong = (ymd: string) => {
  const [y, m, d] = ymd.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};
const fmtTime = (t: string | null | undefined) => {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hh = ((h + 11) % 12) + 1;
  return `${hh}:${String(m).padStart(2, '0')} ${ampm}`;
};

const useNextEventVars = () => {
  const [vars, setVars] = useState<Record<string, string> | null>(null);
  const [eventDate, setEventDate] = useState<string | null>(null);
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    supabase.from('events').select('*').gte('event_date', today).order('event_date', { ascending: true }).limit(1)
      .then(({ data }) => {
        const ev = (data && data[0]) || null;
        if (!ev) {
          setVars({
            event_date: '(no upcoming event)', event_date_long: '(no upcoming event)',
            event_location: 'TBD', event_start_time: '', event_end_time: '', event_time_range: '', event_speakers: 'TBA',
          });
          return;
        }
        setEventDate(ev.event_date);
        setVars({
          event_date: ev.event_date,
          event_date_long: fmtDateLong(ev.event_date),
          event_location: ev.location || 'TBD',
          event_start_time: fmtTime(ev.start_time),
          event_end_time: fmtTime(ev.end_time),
          event_time_range: `${fmtTime(ev.start_time)}${ev.end_time ? ' – ' + fmtTime(ev.end_time) : ''}`,
          event_speakers: ev.speakers || 'TBA',
        });
      });
  }, []);
  return { vars, eventDate };
};

const renderTokens = (s: string, vars: Record<string, string> | null) =>
  vars ? s.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, k) => vars[k] ?? `{{${k}}}`) : s;

const EmailsPanel = () => {
  return (
    <div className="space-y-4">
      <PostmarkTester />
      <Tabs defaultValue="compose">
        <TabsList className="mb-4">
          <TabsTrigger value="compose">Compose & Send</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="compose"><Composer /></TabsContent>
        <TabsContent value="automations"><Automations /></TabsContent>
        <TabsContent value="templates"><Templates /></TabsContent>
        <TabsContent value="history"><History /></TabsContent>
      </Tabs>
    </div>
  );
};

const PostmarkTester = () => {
  const [to, setTo] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => { if (data.user?.email) setTo(data.user.email); });
  }, []);

  const send = async () => {
    setResult(null);
    setSending(true);
    const { data, error } = await supabase.functions.invoke('send-test-postmark', { body: { to } });
    setSending(false);
    if (error) {
      setResult({ ok: false, error: error.message });
      toast.error(error.message);
      return;
    }
    setResult(data);
    if (data?.ok) toast.success(`Sent to ${data.to}`);
    else toast.error(data?.postmark?.Message || data?.error || 'Postmark rejected the send');
  };

  return (
    <div className="bg-secondary/40 rounded-lg cyberpunk-border p-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[220px]">
          <Label className="text-xs">Postmark test recipient</Label>
          <Input value={to} onChange={(e) => setTo(e.target.value)} placeholder="you@example.com" />
        </div>
        <Button size="sm" onClick={send} disabled={sending || !to}>
          {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send test</>}
        </Button>
      </div>
      {result && (
        <pre className={`mt-3 text-xs p-3 rounded bg-background/60 overflow-auto max-h-48 ${result.ok ? 'text-wildai-mint' : 'text-red-400'}`}>
{JSON.stringify(result, null, 2)}
        </pre>
      )}
    </div>
  );
};

const Templates = () => {
  const [rows, setRows] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Template | null>(null);
  const [form, setForm] = useState({ name: '', subject: '', html: '' });
  const [saving, setSaving] = useState(false);
  const [previewing, setPreviewing] = useState<Template | null>(null);
  const { vars: previewVars, eventDate: previewEventDate } = useNextEventVars();

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('email_templates').select('*').order('created_at', { ascending: false });
    if (error) toast.error(error.message); else setRows(data as Template[]);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm({ name: '', subject: '', html: '' }); setOpen(true); };
  const openEdit = (t: Template) => { setEditing(t); setForm({ name: t.name, subject: t.subject, html: t.html }); setOpen(true); };

  const save = async () => {
    setSaving(true);
    const { error } = editing
      ? await supabase.from('email_templates').update(form).eq('id', editing.id)
      : await supabase.from('email_templates').insert(form);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success('Saved'); setOpen(false); load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete template?')) return;
    const { error } = await supabase.from('email_templates').delete().eq('id', id);
    if (error) return toast.error(error.message);
    load();
  };

  return (
    <div className="bg-secondary/40 rounded-lg cyberpunk-border p-5">
      <div className="flex justify-between mb-4">
        <p className="text-sm text-muted-foreground">Reusable HTML templates for marketing emails.</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button size="sm" onClick={openNew}><Plus className="w-4 h-4" /> New Template</Button></DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader><DialogTitle>{editing ? 'Edit' : 'New'} Template</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
              <div><Label>Subject</Label><Input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
              <div><Label>HTML</Label><Textarea rows={14} value={form.html} onChange={(e) => setForm({ ...form, html: e.target.value })} className="font-mono text-xs" /></div>
              <div className="text-xs text-muted-foreground bg-background/50 rounded p-3 space-y-1">
                <p className="font-mono text-wildai-mint">Available placeholders (auto-filled per event):</p>
                <p><code>{'{{event_date_long}}'}</code> — e.g. "Monday, May 18, 2026"</p>
                <p><code>{'{{event_date}}'}</code> — ISO date, e.g. "2026-05-18"</p>
                <p><code>{'{{event_location}}'}</code> — location from the event</p>
                <p><code>{'{{event_start_time}}'}</code> · <code>{'{{event_end_time}}'}</code> · <code>{'{{event_time_range}}'}</code></p>
                <p><code>{'{{event_speakers}}'}</code> — speakers (or "TBA" if blank)</p>
              </div>
            </div>
            <DialogFooter><Button onClick={save} disabled={saving || !form.name || !form.subject}>{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {loading ? <Loader2 className="w-6 h-6 animate-spin text-wildai-mint mx-auto" /> : (
        <Table>
          <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Subject</TableHead><TableHead></TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.length === 0 && <TableRow><TableCell colSpan={3} className="text-center py-8 text-muted-foreground">No templates yet.</TableCell></TableRow>}
            {rows.map((t) => (
              <TableRow key={t.id}>
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell className="text-sm">{t.subject}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm" onClick={() => setPreviewing(t)}><Eye className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(t)}>Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => remove(t.id)}><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={!!previewing} onOpenChange={(o) => !o && setPreviewing(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{previewing && renderTokens(previewing.name, previewVars)} — {previewing && renderTokens(previewing.subject, previewVars)}</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground -mt-2">
            Personalization tokens filled from next upcoming event{previewEventDate ? ` (${previewEventDate})` : ''}.
          </p>
          <iframe srcDoc={renderTokens(previewing?.html || '', previewVars)} className="w-full h-[600px] bg-white rounded" title="template-preview" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Composer = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [subject, setSubject] = useState('');
  const [html, setHtml] = useState('');
  const [filter, setFilter] = useState('all'); // all, subscribed, event:<key>
  const [eventKeys, setEventKeys] = useState<string[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [sendingTest, setSendingTest] = useState(false);
  const [myEmail, setMyEmail] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => { if (data.user?.email) setMyEmail(data.user.email); }); }, []);
  const { vars: previewVars, eventDate: previewEventDate } = useNextEventVars();

  useEffect(() => {
    supabase.from('email_templates').select('*').order('created_at', { ascending: false }).then(({ data }) => setTemplates((data as Template[]) || []));
    supabase.from('attendees').select('id, name, email, subscribed, events_attended').then(({ data }) => {
      const list = (data as Attendee[]) || [];
      setAttendees(list);
      const keys = Array.from(new Set(list.flatMap((a) => a.events_attended || []))).sort();
      setEventKeys(keys);
    });
  }, []);

  const visibleAttendees = attendees.filter((a) => {
    if (filter === 'all') return true;
    if (filter === 'subscribed') return a.subscribed;
    if (filter.startsWith('event:')) return (a.events_attended || []).includes(filter.slice(6));
    return true;
  });

  const allChecked = visibleAttendees.length > 0 && visibleAttendees.every((a) => selected[a.id]);
  const toggleAll = () => {
    const next = { ...selected };
    if (allChecked) visibleAttendees.forEach((a) => delete next[a.id]);
    else visibleAttendees.forEach((a) => next[a.id] = true);
    setSelected(next);
  };

  const applyTemplate = (id: string) => {
    const t = templates.find((x) => x.id === id);
    if (t) { setSubject(t.subject); setHtml(t.html); }
  };

  const sendTest = async () => {
    if (!subject.trim() || !html.trim()) return toast.error('Subject and HTML are required');
    if (!myEmail) return toast.error('Could not determine your email');
    setSendingTest(true);
    const { data, error } = await supabase.functions.invoke('send-marketing-email', {
      body: { subject, html, test_to: myEmail },
    });
    setSendingTest(false);
    if (error || data?.error) return toast.error(error?.message || data?.error || 'Failed');
    if (data?.ok) toast.success(`Test sent to ${myEmail}`);
    else toast.error('Postmark rejected the test send');
  };

  const send = async () => {
    const ids = Object.entries(selected).filter(([, v]) => v).map(([k]) => k);
    if (ids.length === 0) return toast.error('Select at least one recipient');
    if (!subject.trim() || !html.trim()) return toast.error('Subject and HTML are required');
    if (!confirm(`Send to ${ids.length} recipient(s)?`)) return;
    setSending(true);
    const { data, error } = await supabase.functions.invoke('send-marketing-email', {
      body: { subject, html, attendee_ids: ids },
    });
    setSending(false);
    if (error || data?.error) return toast.error(error?.message || data?.error || 'Failed');
    toast.success(`Sent to ${data.success_count} of ${data.recipient_count}`);
    setSelected({});
  };

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="bg-secondary/40 rounded-lg cyberpunk-border p-5 space-y-3">
        <div>
          <Label>Load template (optional)</Label>
          <select className="w-full bg-background border border-border rounded-md h-10 px-3 text-sm" onChange={(e) => e.target.value && applyTemplate(e.target.value)}>
            <option value="">— pick a template —</option>
            {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div><Label>Subject</Label><Input value={subject} onChange={(e) => setSubject(e.target.value)} /></div>
        <div>
          <Label>HTML</Label>
          <Textarea rows={16} value={html} onChange={(e) => setHtml(e.target.value)} className="font-mono text-xs" />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline" size="sm" onClick={() => setShowPreview(true)} disabled={!html}><Eye className="w-4 h-4" /> Preview</Button>
          <Button variant="outline" size="sm" onClick={sendTest} disabled={sendingTest || !html || !subject}>
            {sendingTest ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send test to me{myEmail ? ` (${myEmail})` : ''}</>}
          </Button>
          <Button size="sm" onClick={send} disabled={sending} className="ml-auto">{sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send</>}</Button>
        </div>
      </div>

      <div className="bg-secondary/40 rounded-lg cyberpunk-border p-5">
        <div className="flex items-center gap-2 mb-3">
          <Label className="mb-0">Recipients</Label>
          <select className="bg-background border border-border rounded-md h-9 px-2 text-sm ml-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All ({attendees.length})</option>
            <option value="subscribed">Subscribed only</option>
            {eventKeys.map((k) => <option key={k} value={`event:${k}`}>Attended: {k}</option>)}
          </select>
        </div>
        <div className="max-h-[500px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"><input type="checkbox" checked={allChecked} onChange={toggleAll} /></TableHead>
                <TableHead>Name</TableHead><TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleAttendees.map((a) => (
                <TableRow key={a.id}>
                  <TableCell><input type="checkbox" checked={!!selected[a.id]} onChange={(e) => setSelected({ ...selected, [a.id]: e.target.checked })} /></TableCell>
                  <TableCell>{a.name}</TableCell>
                  <TableCell className="text-xs">{a.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{Object.values(selected).filter(Boolean).length} selected</p>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Preview — {renderTokens(subject, previewVars)}</DialogTitle>
          </DialogHeader>
          <p className="text-xs text-muted-foreground -mt-2">
            Personalization tokens filled from next upcoming event{previewEventDate ? ` (${previewEventDate})` : ''}.
          </p>
          <iframe srcDoc={renderTokens(html, previewVars)} className="w-full h-[600px] bg-white rounded" title="preview" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const History = () => {
  const [rows, setRows] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('email_campaigns').select('*').order('sent_at', { ascending: false }).then(({ data, error }) => {
      if (error) toast.error(error.message); else setRows(data as Campaign[]);
      setLoading(false);
    });
  }, []);
  return (
    <div className="bg-secondary/40 rounded-lg cyberpunk-border p-5">
      {loading ? <Loader2 className="w-6 h-6 animate-spin text-wildai-mint mx-auto" /> : (
        <Table>
          <TableHeader><TableRow><TableHead>Sent</TableHead><TableHead>Subject</TableHead><TableHead>Recipients</TableHead><TableHead>OK</TableHead><TableHead>Errors</TableHead></TableRow></TableHeader>
          <TableBody>
            {rows.length === 0 && <TableRow><TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No campaigns sent yet.</TableCell></TableRow>}
            {rows.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="text-xs">{new Date(c.sent_at).toLocaleString()}</TableCell>
                <TableCell>{c.subject}</TableCell>
                <TableCell>{c.recipient_count}</TableCell>
                <TableCell className="text-wildai-mint">{c.success_count}</TableCell>
                <TableCell className={c.error_count ? 'text-red-400' : ''}>{c.error_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

interface Automation {
  id: string;
  name: string;
  template_id: string | null;
  offset_days: number;
  send_time: string;
  audience: 'all' | 'subscribed' | 'event_attendees';
  enabled: boolean;
}

const Automations = () => {
  const [rows, setRows] = useState<Automation[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Automation | null>(null);
  const [form, setForm] = useState<{ name: string; template_id: string; timing: 'before' | 'after'; days: number; send_time: string; audience: 'all' | 'subscribed' | 'event_attendees'; enabled: boolean }>({
    name: '', template_id: '', timing: 'before', days: 3, send_time: '09:00', audience: 'subscribed', enabled: true,
  });
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [testingId, setTestingId] = useState<string | null>(null);

  const sendTest = async (r: Automation) => {
    setTestingId(r.id);
    const { data, error } = await supabase.functions.invoke('send-automation-test', {
      body: { automation_id: r.id, to: 'mosborn@skail.ai' },
    });
    setTestingId(null);
    if (error) return toast.error(error.message);
    if (data?.ok) toast.success(`Test sent to mosborn@skail.ai (event ${data.event_date})`);
    else toast.error(data?.postmark?.Message || data?.error || 'Postmark rejected the send');
  };

  const load = async () => {
    setLoading(true);
    const [{ data: a, error }, { data: t }] = await Promise.all([
      supabase.from('email_automations').select('*').order('offset_days', { ascending: true }),
      supabase.from('email_templates').select('*').order('name'),
    ]);
    if (error) toast.error(error.message); else setRows((a as Automation[]) || []);
    setTemplates((t as Template[]) || []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ name: '', template_id: '', timing: 'before', days: 3, send_time: '09:00', audience: 'subscribed', enabled: true });
    setOpen(true);
  };
  const openEdit = (r: Automation) => {
    setEditing(r);
    setForm({
      name: r.name,
      template_id: r.template_id || '',
      timing: r.offset_days < 0 ? 'before' : 'after',
      days: Math.abs(r.offset_days),
      send_time: (r.send_time || '09:00').slice(0, 5),
      audience: r.audience,
      enabled: r.enabled,
    });
    setOpen(true);
  };

  const save = async () => {
    if (!form.name.trim() || !form.template_id) return toast.error('Name and template are required');
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      template_id: form.template_id,
      offset_days: form.timing === 'before' ? -Math.abs(form.days) : Math.abs(form.days),
      send_time: form.send_time || '09:00',
      audience: form.audience,
      enabled: form.enabled,
    };
    const { error } = editing
      ? await supabase.from('email_automations').update(payload).eq('id', editing.id)
      : await supabase.from('email_automations').insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success('Saved'); setOpen(false); load();
  };

  const remove = async (id: string) => {
    if (!confirm('Delete automation?')) return;
    const { error } = await supabase.from('email_automations').delete().eq('id', id);
    if (error) return toast.error(error.message);
    load();
  };

  const toggle = async (r: Automation) => {
    const { error } = await supabase.from('email_automations').update({ enabled: !r.enabled }).eq('id', r.id);
    if (error) return toast.error(error.message);
    load();
  };

  const runNow = async () => {
    if (!confirm('Run all enabled automations whose timing matches today?')) return;
    setRunning(true);
    const { data, error } = await supabase.functions.invoke('run-email-automations', { body: { force: true } });
    setRunning(false);
    if (error || data?.error) return toast.error(error?.message || data?.error || 'Failed');
    const fired = (data?.triggered || []).length;
    toast.success(fired ? `Triggered ${fired} automation${fired === 1 ? '' : 's'}` : 'Nothing scheduled for today');
  };

  const describeTiming = (offset: number) => {
    if (offset === 0) return 'on event day';
    return offset < 0 ? `${Math.abs(offset)} day${offset === -1 ? '' : 's'} before` : `${offset} day${offset === 1 ? '' : 's'} after`;
  };
  const describeAudience = (a: string) =>
    a === 'all' ? 'All attendees' : a === 'subscribed' ? 'Subscribed only' : 'Event attendees';

  return (
    <div className="bg-secondary/40 rounded-lg cyberpunk-border p-5">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div>
          <h3 className="text-lg font-mono text-wildai-mint">Event Automations</h3>
          <p className="text-sm text-muted-foreground">
            Send a template automatically X days before or after each event. Each rule runs once per event.
          </p>
        </div>
        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="sm" onClick={runNow} disabled={running}>
            {running ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Run today's now</>}
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button size="sm" onClick={openNew}><Plus className="w-4 h-4" /> New Automation</Button></DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>{editing ? 'Edit Automation' : 'New Automation'}</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div><Label>Name</Label><Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="3-day reminder" /></div>
                <div>
                  <Label>Template</Label>
                  <select className="w-full bg-background border border-border rounded-md h-10 px-3 text-sm"
                    value={form.template_id} onChange={(e) => setForm({ ...form, template_id: e.target.value })}>
                    <option value="">— select a template —</option>
                    {templates.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                  <p className="text-xs text-muted-foreground mt-1">Use <code className="text-wildai-mint">{'{{event_date}}'}</code> in the subject or HTML for dynamic content.</p>
                </div>
                <div className="grid grid-cols-3 gap-3 items-end">
                  <div>
                    <Label>Days</Label>
                    <Input type="number" min={0} value={form.days} onChange={(e) => setForm({ ...form, days: parseInt(e.target.value || '0', 10) })} />
                  </div>
                  <div className="col-span-2">
                    <Label>Timing</Label>
                    <select className="w-full bg-background border border-border rounded-md h-10 px-3 text-sm"
                      value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value as any })}>
                      <option value="before">Before the event</option>
                      <option value="after">After the event</option>
                    </select>
                  </div>
                </div>
                <div>
                  <Label>Send time (Central)</Label>
                  <Input type="time" value={form.send_time} onChange={(e) => setForm({ ...form, send_time: e.target.value })} />
                  <p className="text-xs text-muted-foreground mt-1">The rule fires on the next automation run that occurs at or after this time on the scheduled day.</p>
                </div>
                <div>
                  <Label>Audience</Label>
                  <select className="w-full bg-background border border-border rounded-md h-10 px-3 text-sm"
                    value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value as any })}>
                    <option value="subscribed">Subscribed attendees</option>
                    <option value="all">All attendees</option>
                    <option value="event_attendees">Only people who attended that event</option>
                  </select>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.enabled} onChange={(e) => setForm({ ...form, enabled: e.target.checked })} />
                  <span className="text-sm">Enabled</span>
                </label>
              </div>
              <DialogFooter>
                <Button onClick={save} disabled={saving}>{saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? <Loader2 className="w-6 h-6 animate-spin text-wildai-mint mx-auto" /> : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead><TableHead>Template</TableHead><TableHead>Timing</TableHead><TableHead>Time (CT)</TableHead>
              <TableHead>Audience</TableHead><TableHead>On</TableHead><TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 && <TableRow><TableCell colSpan={7} className="text-center py-8 text-muted-foreground">No automations yet.</TableCell></TableRow>}
            {rows.map((r) => (
              <TableRow key={r.id}>
                <TableCell className="font-medium">{r.name}</TableCell>
                <TableCell className="text-sm">{templates.find((t) => t.id === r.template_id)?.name || <span className="text-red-400">missing</span>}</TableCell>
                <TableCell className="text-sm">{describeTiming(r.offset_days)}</TableCell>
                <TableCell className="text-xs">{(r.send_time || '09:00').slice(0, 5)}</TableCell>
                <TableCell className="text-xs">{describeAudience(r.audience)}</TableCell>
                <TableCell>
                  <input type="checkbox" checked={r.enabled} onChange={() => toggle(r)} />
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  <Button variant="ghost" size="sm" onClick={() => sendTest(r)} disabled={testingId === r.id}>
                    {testingId === r.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Test</>}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => openEdit(r)}>Edit</Button>
                  <Button variant="ghost" size="sm" onClick={() => remove(r.id)}><Trash2 className="w-4 h-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default EmailsPanel;
