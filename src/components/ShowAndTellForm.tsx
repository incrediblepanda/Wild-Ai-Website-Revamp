import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const ShowAndTellForm = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState({
    name: '',
    projectName: '',
    description: '',
    linkedinUrl: '',
    email: '',
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.projectName || !form.description || !form.email || !form.linkedinUrl) {
      toast({ title: "Please fill in all fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('submit-show-and-tell', {
        body: {
          name: form.name,
          projectName: form.projectName,
          description: form.description,
          email: form.email,
          linkedinUrl: form.linkedinUrl,
          imageBase64: preview,
          imageName: imageFile?.name || 'image.png',
        },
      });

      if (error) throw error;

      setSubmitted(true);
      toast({ title: "You're in!", description: "We'll save a spot for your Show & Tell." });
    } catch (err) {
      console.error('Submission error:', err);
      toast({ title: "Something went wrong", description: "Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-secondary/50 p-8 rounded-lg cyberpunk-border text-center">
        <CheckCircle className="w-10 h-10 text-wildai-mint mx-auto mb-3" />
        <h3 className="text-xl font-bold font-mono mb-2">YOU'RE IN!</h3>
        <p className="text-muted-foreground">We'll have a spot ready for your Show & Tell. See you March 16th!</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-secondary/50 p-6 rounded-lg cyberpunk-border space-y-5">
      <div>
        <h3 className="text-lg font-bold font-mono mb-1">SIGN UP FOR SHOW & TELL</h3>
        <p className="text-muted-foreground text-sm">Reserve your spot to show off what you've built.</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sat-name">Your Name</Label>
        <Input
          id="sat-name"
          placeholder="Jane Doe"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sat-linkedin">LinkedIn URL</Label>
        <Input
          id="sat-linkedin"
          type="url"
          placeholder="https://linkedin.com/in/janedoe"
          value={form.linkedinUrl}
          onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
          maxLength={255}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sat-project">Project Name</Label>
        <Input
          id="sat-project"
          placeholder="My Awesome AI Project"
          value={form.projectName}
          onChange={(e) => setForm({ ...form, projectName: e.target.value })}
          maxLength={100}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sat-desc">Short Description</Label>
        <Input
          id="sat-desc"
          placeholder="What does your project do?"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value.slice(0, 150) })}
          maxLength={150}
        />
        <p className="text-xs text-muted-foreground text-right">{form.description.length}/150</p>
      </div>

      <div className="space-y-2">
        <Label>Project Image / Logo</Label>
        <div
          className="border-2 border-dashed border-wildai-mint/30 rounded-lg p-4 text-center cursor-pointer hover:border-wildai-mint/60 transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          {preview ? (
            <img src={preview} alt="Project preview" className="max-h-24 mx-auto rounded" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload className="w-6 h-6 text-wildai-mint/50" />
              <span className="text-sm">Click to upload an image</span>
            </div>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sat-email">Email</Label>
        <Input
          id="sat-email"
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          maxLength={255}
        />
      </div>

      <Button
        type="submit"
        disabled={submitting}
        className="w-full bg-wildai-mint text-background hover:opacity-90 font-bold"
      >
        {submitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</> : "Reserve My Spot"}
      </Button>
    </form>
  );
};

export default ShowAndTellForm;
