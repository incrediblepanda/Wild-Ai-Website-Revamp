import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CheckCircle2, Upload } from 'lucide-react';

const SpeakerForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', linkedin_url: '',
    description: '', what_building: '',
  });

  const update = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(r.result as string);
      r.onerror = reject;
      r.readAsDataURL(file);
    });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return toast.error('Name required');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return toast.error('Valid email required');
    if (!form.description.trim()) return toast.error('Description required');
    if (!form.what_building.trim()) return toast.error("Tell us what you're building");
    if (imageFile && imageFile.size > 5 * 1024 * 1024) return toast.error('Image must be under 5 MB');

    setSubmitting(true);
    try {
      let image_base64: string | undefined;
      let image_name: string | undefined;
      if (imageFile) {
        image_base64 = await fileToBase64(imageFile);
        image_name = imageFile.name;
      }
      const { data, error } = await supabase.functions.invoke('submit-speaker', {
        body: { ...form, image_base64, image_name },
      });
      if (error) throw error;
      if ((data as any)?.error) throw new Error((data as any).error);
      setDone(true);
      toast.success('Application submitted!');
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || 'Submission failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <section id="speak" className="py-10 md:py-20 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-secondary/40 rounded-lg cyberpunk-border p-10 text-center">
            <CheckCircle2 className="w-14 h-14 text-wildai-mint mx-auto mb-4" />
            <h2 className="text-2xl font-bold font-mono mb-3">APPLICATION RECEIVED</h2>
            <p className="text-muted-foreground">
              Thanks for applying to speak at Wild AI. We've sent a confirmation to your email
              and the team will review your application shortly.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="speak" className="py-10 md:py-20 bg-secondary/20">
      <div className="container mx-auto px-4 max-w-2xl">
        <h2 className="section-title">SPEAK_AT_WILD_AI</h2>

        <div className="text-center mb-8">
          <p className="text-lg mb-3">Have an AI project, experiment, or insight to share?</p>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Our lightning talks are 5 minutes, no slides — just you sharing who you are,
            what you're working on, and why it's important.
          </p>
        </div>

        <form onSubmit={submit} className="bg-secondary/40 rounded-lg cyberpunk-border p-6 md:p-8 space-y-5">
          <h3 className="text-xl font-bold font-mono text-wildai-mint text-center mb-2">APPLY TO SPEAK</h3>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} required maxLength={200} />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required maxLength={255} />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} maxLength={40} />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input id="linkedin" type="url" value={form.linkedin_url} onChange={(e) => update('linkedin_url', e.target.value)} placeholder="https://linkedin.com/in/…" maxLength={500} />
            </div>
          </div>

          <div>
            <Label htmlFor="description">About you *</Label>
            <Textarea id="description" value={form.description} onChange={(e) => update('description', e.target.value)} rows={4} required maxLength={5000}
              placeholder="A short bio — who you are and what you do." />
          </div>

          <div>
            <Label htmlFor="building">What are you building? *</Label>
            <Textarea id="building" value={form.what_building} onChange={(e) => update('what_building', e.target.value)} rows={4} required maxLength={5000}
              placeholder="The project, idea, or experiment you'd like to share." />
          </div>

          <div>
            <Label htmlFor="image">Photo of you</Label>
            <div className="flex items-center gap-3 mt-1">
              <label className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-md cursor-pointer hover:bg-secondary text-sm">
                <Upload className="w-4 h-4" />
                <span>{imageFile ? imageFile.name : 'Choose file'}</span>
                <input id="image" type="file" accept="image/*" className="hidden"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              </label>
              {imageFile && (
                <Button type="button" variant="ghost" size="sm" onClick={() => setImageFile(null)}>Clear</Button>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Optional. Max 5 MB.</p>
          </div>

          <Button type="submit" disabled={submitting} className="w-full bg-wildai-mint text-background hover:bg-wildai-mint/90 font-bold py-6 text-base">
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SUBMIT APPLICATION'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SpeakerForm;
