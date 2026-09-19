import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

export type AdminRole = 'admin' | 'super_admin' | null;

export const useAdminAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<AdminRole>(null);
  const [loading, setLoading] = useState(true);

  const loadRole = async (uid: string | undefined) => {
    if (!uid) { setRole(null); return; }
    const { data } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', uid);
    if (data?.some((r) => r.role === 'super_admin')) setRole('super_admin');
    else if (data?.some((r) => r.role === 'admin')) setRole('admin');
    else setRole(null);
  };

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      setTimeout(() => loadRole(sess?.user?.id), 0);
    });
    supabase.auth.getSession().then(({ data: { session: sess } }) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      loadRole(sess?.user?.id).finally(() => setLoading(false));
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, user, role, isAdmin: !!role, isSuperAdmin: role === 'super_admin', loading, refreshRole: () => loadRole(user?.id) };
};
