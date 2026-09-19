import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { toast } from 'sonner';
import { Loader2, LogOut } from 'lucide-react';
import AttendeesPanel from '@/components/admin/AttendeesPanel';
import AdminsPanel from '@/components/admin/AdminsPanel';
import EmailsPanel from '@/components/admin/EmailsPanel';
import EventsPanel from '@/components/admin/EventsPanel';
import SpeakersPanel from '@/components/admin/SpeakersPanel';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, role, isAdmin, loading, refreshRole } = useAdminAuth();
  const [claiming, setClaiming] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate('/admin/login');
  }, [loading, user, navigate]);

  const handleClaim = async () => {
    setClaiming(true);
    const { data, error } = await supabase.rpc('claim_first_admin');
    setClaiming(false);
    if (error) return toast.error(error.message);
    if (data) {
      toast.success('You are now super admin!');
      refreshRole();
    } else {
      toast.error('Admin already exists. Ask a super admin for access.');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-wildai-mint" /></div>;
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="pt-24 pb-20 flex-grow">
          <div className="container mx-auto px-4 max-w-md">
            <div className="bg-secondary/50 rounded-lg cyberpunk-border p-8 text-center">
              <h1 className="text-2xl font-bold font-mono mb-4">ACCESS PENDING</h1>
              <p className="text-muted-foreground mb-6">
                Signed in as <span className="text-wildai-mint">{user?.email}</span>. You don't have admin access yet.
              </p>
              <Button onClick={handleClaim} disabled={claiming} className="w-full mb-3">
                {claiming ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Claim First Admin'}
              </Button>
              <p className="text-xs text-muted-foreground mb-4">Only works if no admins exist yet.</p>
              <Button variant="outline" onClick={handleLogout} className="w-full"><LogOut className="w-4 h-4" /> Sign Out</Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Admin Dashboard — Wild AI</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gradient font-mono">ADMIN CONSOLE</h1>
              <p className="text-sm text-muted-foreground">{user?.email} · {role}</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}><LogOut className="w-4 h-4" /> Sign Out</Button>
          </div>

          <Tabs defaultValue="crm">
            <TabsList className="mb-6">
              <TabsTrigger value="crm">CRM</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="speakers">Speakers</TabsTrigger>
              <TabsTrigger value="emails">Marketing Emails</TabsTrigger>
              <TabsTrigger value="admins">Admins</TabsTrigger>
            </TabsList>
            <TabsContent value="crm"><AttendeesPanel /></TabsContent>
            <TabsContent value="events"><EventsPanel /></TabsContent>
            <TabsContent value="speakers"><SpeakersPanel /></TabsContent>
            <TabsContent value="emails"><EmailsPanel /></TabsContent>
            <TabsContent value="admins"><AdminsPanel currentRole={role} /></TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
