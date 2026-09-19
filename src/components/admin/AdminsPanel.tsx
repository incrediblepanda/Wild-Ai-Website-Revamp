import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Loader2, Trash2, ShieldPlus } from 'lucide-react';

interface Row { user_id: string; role: 'admin' | 'super_admin'; email?: string; display_name?: string; }
interface PendingUser { user_id: string; email?: string; display_name?: string; }

const AdminsPanel = ({ currentRole }: { currentRole: 'admin' | 'super_admin' | null }) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [pending, setPending] = useState<PendingUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [promotingId, setPromotingId] = useState<string | null>(null);

  const isSuper = currentRole === 'super_admin';

  const load = async () => {
    setLoading(true);
    const [{ data: roles, error }, { data: profiles }] = await Promise.all([
      supabase.from('user_roles').select('user_id, role'),
      supabase.from('profiles').select('user_id, email, display_name'),
    ]);
    if (error) { toast.error(error.message); setLoading(false); return; }
    const merged: Row[] = (roles || []).map((r) => {
      const p = profiles?.find((x) => x.user_id === r.user_id);
      return { user_id: r.user_id, role: r.role as any, email: p?.email, display_name: p?.display_name };
    });
    const adminIds = new Set((roles || []).map((r) => r.user_id));
    const pendingUsers: PendingUser[] = (profiles || [])
      .filter((p) => !adminIds.has(p.user_id))
      .map((p) => ({ user_id: p.user_id, email: p.email, display_name: p.display_name }));
    setRows(merged);
    setPending(pendingUsers);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handlePromote = async (userId: string) => {
    setPromotingId(userId);
    const { error } = await supabase.from('user_roles').insert({ user_id: userId, role: 'admin' });
    if (error) { setPromotingId(null); return toast.error(error.message); }
    const { error: emailErr } = await supabase.functions.invoke('notify-new-admin', { body: { user_id: userId } });
    setPromotingId(null);
    if (emailErr) toast.warning('Admin granted, but email notification failed');
    else toast.success('Admin granted — notification email sent');
    load();
  };

  const handleRevoke = async (r: Row) => {
    if (!confirm(`Revoke ${r.role} from ${r.email}?`)) return;
    const { error } = await supabase.from('user_roles').delete().eq('user_id', r.user_id).eq('role', r.role);
    if (error) return toast.error(error.message);
    toast.success('Revoked');
    load();
  };

  return (
    <div className="bg-secondary/40 rounded-lg cyberpunk-border p-5 space-y-6">
      <p className="text-sm text-muted-foreground">{isSuper ? 'Manage who has admin access.' : 'Only super admins can change roles.'}</p>

      {loading ? <Loader2 className="w-6 h-6 animate-spin text-wildai-mint mx-auto" /> : (
        <>
          <div>
            <h3 className="text-sm font-semibold mb-2 font-mono text-wildai-mint">CURRENT ADMINS</h3>
            <Table>
              <TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Role</TableHead><TableHead></TableHead></TableRow></TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={`${r.user_id}-${r.role}`}>
                    <TableCell>{r.email || r.user_id}</TableCell>
                    <TableCell><Badge className={r.role === 'super_admin' ? 'bg-wildai-mint/20 text-wildai-mint border-wildai-mint/30' : ''}>{r.role}</Badge></TableCell>
                    <TableCell className="text-right">
                      {isSuper && r.role !== 'super_admin' && (
                        <Button variant="ghost" size="sm" onClick={() => handleRevoke(r)}><Trash2 className="w-4 h-4" /></Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {isSuper && (
            <div>
              <h3 className="text-sm font-semibold mb-2 font-mono text-wildai-mint">SIGNED-UP USERS ({pending.length})</h3>
              {pending.length === 0 ? (
                <p className="text-sm text-muted-foreground">No pending users. Anyone who signs in will appear here.</p>
              ) : (
                <Table>
                  <TableHeader><TableRow><TableHead>Email</TableHead><TableHead>Name</TableHead><TableHead></TableHead></TableRow></TableHeader>
                  <TableBody>
                    {pending.map((p) => (
                      <TableRow key={p.user_id}>
                        <TableCell>{p.email || p.user_id}</TableCell>
                        <TableCell className="text-muted-foreground">{p.display_name || '—'}</TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" onClick={() => handlePromote(p.user_id)} disabled={promotingId === p.user_id}>
                            {promotingId === p.user_id ? <Loader2 className="w-4 h-4 animate-spin" /> : (<><ShieldPlus className="w-4 h-4" /> Grant Admin</>)}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminsPanel;
