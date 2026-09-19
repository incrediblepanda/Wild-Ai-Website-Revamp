import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Check, X, ExternalLink, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Submission {
  id: string;
  name: string;
  project_name: string;
  description: string;
  linkedin_url: string;
  email: string;
  image_url: string | null;
  status: string;
  created_at: string;
}

const AdminShowAndTell = () => {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [storedPassword, setStoredPassword] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const handleLogin = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke('admin-show-and-tell', {
      body: { password },
    });

    if (error || data?.error) {
      toast.error('Invalid password');
      setLoading(false);
      return;
    }

    setStoredPassword(password);
    setSubmissions(data.submissions || []);
    setAuthenticated(true);
    setLoading(false);
  };

  const handleAction = async (id: string, action: 'approve' | 'deny') => {
    setActionLoading(id);
    const { data, error } = await supabase.functions.invoke('admin-show-and-tell', {
      body: { password: storedPassword, action, id },
    });

    if (error || data?.error) {
      toast.error('Action failed');
    } else {
      toast.success(`Submission ${action === 'approve' ? 'approved' : 'denied'}`);
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, status: data.status } : s))
      );
    }
    setActionLoading(null);
  };

  const statusColor = (status: string) => {
    if (status === 'approved') return 'bg-green-500/20 text-green-400 border-green-500/30';
    if (status === 'denied') return 'bg-red-500/20 text-red-400 border-red-500/30';
    return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Admin — Show & Tell — Wild AI</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl font-bold text-gradient font-mono mb-8">ADMIN — SHOW & TELL</h1>

          {!authenticated ? (
            <div className="max-w-sm mx-auto space-y-4">
              <p className="text-muted-foreground text-center">Enter the admin password to continue.</p>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
              <Button onClick={handleLogin} className="w-full" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Login'}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {submissions.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">No submissions found.</p>
              ) : (
                submissions.map((s) => (
                  <div key={s.id} className="bg-secondary/50 rounded-lg cyberpunk-border p-5 flex flex-col sm:flex-row gap-4">
                    {s.image_url && (
                      <img src={s.image_url} alt={s.project_name} className="w-20 h-20 object-contain rounded flex-shrink-0" />
                    )}
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="font-bold font-mono">{s.project_name}</h3>
                        <Badge className={statusColor(s.status)}>{s.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{s.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{s.name}</span>
                        <span>{s.email}</span>
                        <a href={s.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-wildai-mint hover:underline inline-flex items-center gap-1">
                          LinkedIn <ExternalLink className="w-3 h-3" />
                        </a>
                        <span>{new Date(s.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    {s.status === 'pending' && (
                      <div className="flex gap-2 flex-shrink-0 items-start">
                        <Button
                          size="sm"
                          onClick={() => handleAction(s.id, 'approve')}
                          disabled={actionLoading === s.id}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          {actionLoading === s.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleAction(s.id, 'deny')}
                          disabled={actionLoading === s.id}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminShowAndTell;
