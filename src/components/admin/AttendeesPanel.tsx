import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from 'sonner';
import { Plus, Trash2, Pencil, Download, Upload, Loader2 } from 'lucide-react';

// Minimal CSV parser supporting quoted fields with commas/newlines and escaped quotes ("")
const parseCsv = (text: string): string[][] => {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { field += c; }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = '';
        if (row.some((v) => v !== '')) rows.push(row);
        row = [];
      } else field += c;
    }
  }
  if (field !== '' || row.length) { row.push(field); if (row.some((v) => v !== '')) rows.push(row); }
  return rows;
};

const norm = (s: string) => s.trim().toLowerCase().replace(/[\s_-]+/g, '');
const HEADER_MAP: Record<string, string> = {
  name: 'name', fullname: 'name',
  firstname: 'first_name', first: 'first_name', givenname: 'first_name',
  lastname: 'last_name', last: 'last_name', surname: 'last_name', familyname: 'last_name',
  email: 'email', emailaddress: 'email',
  phone: 'phone', phonenumber: 'phone', mobile: 'phone',
  company: 'company', organization: 'company', org: 'company',
  notes: 'notes', note: 'notes',
  source: 'source',
  events: 'events_attended', eventsattended: 'events_attended', event: 'events_attended',
  subscribed: 'subscribed',
};

interface Attendee {
  id: string;
  name: string;
  first_name?: string | null;
  last_name?: string | null;
  email: string;
  phone?: string | null;
  company?: string | null;
  notes?: string | null;
  source: string;
  events_attended: string[];
  subscribed: boolean;
  created_at: string;
}

const empty = { first_name: '', last_name: '', email: '', phone: '', company: '', notes: '', events_attended: '', source: 'manual', subscribed: true };

const AttendeesPanel = () => {
  const [rows, setRows] = useState<Attendee[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Attendee | null>(null);
  const [form, setForm] = useState<any>(empty);
  const [saving, setSaving] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [importPreview, setImportPreview] = useState<{ rows: any[]; skipped: number; fileName: string } | null>(null);
  const [importing, setImporting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChosen = async (file: File) => {
    const text = await file.text();
    const parsed = parseCsv(text);
    if (parsed.length < 2) return toast.error('CSV is empty or has no rows');
    const rawHeaders = parsed[0].map((h) => HEADER_MAP[norm(h)] || '');
    const hasName = rawHeaders.includes('name') || rawHeaders.includes('first_name') || rawHeaders.includes('last_name');
    if (!rawHeaders.includes('email') || !hasName) {
      return toast.error('CSV must have "email" and a name column (name, or first_name/last_name)');
    }
    const out: any[] = [];
    let skipped = 0;
    for (let i = 1; i < parsed.length; i++) {
      const r: any = { source: 'csv', subscribed: true, events_attended: [] };
      parsed[i].forEach((val, idx) => {
        const key = rawHeaders[idx];
        if (!key) return;
        const v = (val || '').trim();
        if (key === 'events_attended') r.events_attended = v ? v.split(/[|,]/).map((s) => s.trim()).filter(Boolean) : [];
        else if (key === 'subscribed') r.subscribed = !['false', '0', 'no', 'n'].includes(v.toLowerCase());
        else r[key] = v;
      });
      // Derive missing pieces between name / first_name / last_name
      if (!r.first_name && !r.last_name && r.name) {
        const parts = r.name.trim().split(/\s+/);
        r.first_name = parts.shift() || '';
        r.last_name = parts.join(' ') || null;
      }
      if (!r.name && (r.first_name || r.last_name)) {
        r.name = [r.first_name, r.last_name].filter(Boolean).join(' ').trim();
      }
      if (!r.name || !r.email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(r.email)) { skipped++; continue; }
      r.email = r.email.toLowerCase();
      out.push(r);
    }
    setImportPreview({ rows: out, skipped, fileName: file.name });
    setImportOpen(true);
  };

  const handleImport = async () => {
    if (!importPreview) return;
    setImporting(true);
    const { error, count } = await supabase
      .from('attendees')
      .upsert(importPreview.rows, { onConflict: 'email', ignoreDuplicates: false, count: 'exact' });
    setImporting(false);
    if (error) return toast.error(error.message);
    toast.success(`Imported ${count ?? importPreview.rows.length} attendees${importPreview.skipped ? ` (${importPreview.skipped} skipped)` : ''}`);
    setImportOpen(false);
    setImportPreview(null);
    if (fileRef.current) fileRef.current.value = '';
    load();
  };

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('attendees').select('*').order('created_at', { ascending: false });
    if (error) toast.error(error.message);
    else setRows(data as Attendee[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setEditing(null); setForm(empty); setOpen(true); };
  const openEdit = (a: Attendee) => {
    setEditing(a);
    const parts = (a.name || '').trim().split(/\s+/);
    const fallbackFirst = parts.shift() || '';
    const fallbackLast = parts.join(' ');
    setForm({
      ...a,
      first_name: a.first_name ?? fallbackFirst,
      last_name: a.last_name ?? fallbackLast,
      events_attended: (a.events_attended || []).join(', '),
    });
    setOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const first = (form.first_name || '').trim();
    const last = (form.last_name || '').trim();
    const payload = {
      first_name: first || null,
      last_name: last || null,
      name: [first, last].filter(Boolean).join(' '),
      email: form.email.trim().toLowerCase(),
      phone: form.phone || null,
      company: form.company || null,
      notes: form.notes || null,
      source: form.source || 'manual',
      subscribed: form.subscribed,
      events_attended: String(form.events_attended || '').split(',').map((s: string) => s.trim()).filter(Boolean),
    };
    const { error } = editing
      ? await supabase.from('attendees').update(payload).eq('id', editing.id)
      : await supabase.from('attendees').insert(payload);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success(editing ? 'Updated' : 'Added');
    setOpen(false);
    load();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this attendee?')) return;
    const { error } = await supabase.from('attendees').delete().eq('id', id);
    if (error) return toast.error(error.message);
    toast.success('Deleted');
    load();
  };

  const exportCsv = () => {
    const headers = ['first_name', 'last_name', 'email', 'phone', 'company', 'source', 'events_attended', 'subscribed', 'notes', 'created_at'];
    const escape = (v: any) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const csv = [headers.join(',')].concat(
      rows.map((r) => headers.map((h) => escape((r as any)[h] && Array.isArray((r as any)[h]) ? (r as any)[h].join('|') : (r as any)[h])).join(','))
    ).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'attendees.csv'; a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = rows.filter((r) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (r.first_name || '').toLowerCase().includes(q)
      || (r.last_name || '').toLowerCase().includes(q)
      || (r.name || '').toLowerCase().includes(q)
      || r.email.toLowerCase().includes(q)
      || (r.company || '').toLowerCase().includes(q);
  });

  return (
    <div className="bg-secondary/40 rounded-lg cyberpunk-border p-5">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Input placeholder="Search by name, email, company…" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-xs" />
        <div className="ml-auto flex gap-2">
          <input
            ref={fileRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileChosen(f); }}
          />
          <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()}><Upload className="w-4 h-4" /> Import CSV</Button>
          <Button variant="outline" size="sm" onClick={exportCsv}><Download className="w-4 h-4" /> Export CSV</Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" onClick={openNew}><Plus className="w-4 h-4" /> Add Attendee</Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader><DialogTitle>{editing ? 'Edit Attendee' : 'New Attendee'}</DialogTitle></DialogHeader>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>First name</Label><Input value={form.first_name} onChange={(e) => setForm({ ...form, first_name: e.target.value })} /></div>
                  <div><Label>Last name</Label><Input value={form.last_name} onChange={(e) => setForm({ ...form, last_name: e.target.value })} /></div>
                </div>
                <div><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><Label>Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
                  <div><Label>Company</Label><Input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} /></div>
                </div>
                <div><Label>Events attended (comma-separated)</Label><Input value={form.events_attended} onChange={(e) => setForm({ ...form, events_attended: e.target.value })} placeholder="april-2026, march-2026" /></div>
                <div><Label>Notes</Label><Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="sub" checked={form.subscribed} onChange={(e) => setForm({ ...form, subscribed: e.target.checked })} />
                  <Label htmlFor="sub" className="cursor-pointer">Subscribed to marketing emails</Label>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSave} disabled={saving || !form.first_name || !form.email}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? <div className="py-12 text-center"><Loader2 className="w-6 h-6 animate-spin inline text-wildai-mint" /></div> : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>First name</TableHead><TableHead>Last name</TableHead><TableHead>Email</TableHead><TableHead>Company</TableHead>
                <TableHead>Events</TableHead><TableHead>Source</TableHead><TableHead>Sub</TableHead><TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No attendees yet.</TableCell></TableRow>}
              {filtered.map((a) => {
                const parts = (a.name || '').trim().split(/\s+/);
                const first = a.first_name || parts[0] || '';
                const last = a.last_name || parts.slice(1).join(' ');
                return (
                <TableRow key={a.id}>
                  <TableCell className="font-medium">{first || '—'}</TableCell>
                  <TableCell className="font-medium">{last || '—'}</TableCell>
                  <TableCell>{a.email}</TableCell>
                  <TableCell>{a.company || '—'}</TableCell>
                  <TableCell className="text-xs">{(a.events_attended || []).join(', ') || '—'}</TableCell>
                  <TableCell className="text-xs">{a.source}</TableCell>
                  <TableCell className="text-xs">{a.subscribed ? '✓' : '—'}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(a)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(a.id)}><Trash2 className="w-4 h-4" /></Button>
                  </TableCell>
                </TableRow>
              );})}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={importOpen} onOpenChange={(o) => { setImportOpen(o); if (!o && fileRef.current) fileRef.current.value = ''; }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Import CSV</DialogTitle></DialogHeader>
          {importPreview && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                <span className="text-wildai-mint font-mono">{importPreview.fileName}</span> · {importPreview.rows.length} valid rows
                {importPreview.skipped > 0 && <> · {importPreview.skipped} skipped (missing/invalid name or email)</>}
              </p>
              <p className="text-xs text-muted-foreground">
                Existing attendees with matching email will be updated. Recognized columns: first_name, last_name (or name), email, phone, company, notes, source, events_attended (pipe or comma separated), subscribed.
              </p>
              <div className="max-h-[300px] overflow-auto border border-border rounded">
                <Table>
                  <TableHeader><TableRow><TableHead>First name</TableHead><TableHead>Last name</TableHead><TableHead>Email</TableHead><TableHead>Company</TableHead><TableHead>Events</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {importPreview.rows.slice(0, 20).map((r, i) => (
                      <TableRow key={i}>
                        <TableCell>{r.first_name || '—'}</TableCell>
                        <TableCell>{r.last_name || '—'}</TableCell>
                        <TableCell className="text-xs">{r.email}</TableCell>
                        <TableCell className="text-xs">{r.company || '—'}</TableCell>
                        <TableCell className="text-xs">{(r.events_attended || []).join(', ') || '—'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {importPreview.rows.length > 20 && (
                  <p className="text-xs text-muted-foreground text-center py-2">…and {importPreview.rows.length - 20} more</p>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setImportOpen(false)}>Cancel</Button>
            <Button onClick={handleImport} disabled={importing || !importPreview?.rows.length}>
              {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : `Import ${importPreview?.rows.length || 0}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AttendeesPanel;
