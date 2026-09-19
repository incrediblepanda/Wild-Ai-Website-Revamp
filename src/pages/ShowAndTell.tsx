import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, Laptop } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Submission {
  id: string;
  name: string;
  project_name: string;
  description: string;
  linkedin_url: string;
  image_url: string | null;
}

const ShowAndTell = () => {
  const [projects, setProjects] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApproved = async () => {
      const { data, error } = await supabase
        .from('show_and_tell_submissions')
        .select('id, name, project_name, description, linkedin_url, image_url')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (!error && data) setProjects(data);
      setLoading(false);
    };
    fetchApproved();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Show & Tell — Wild AI</title>
        <meta name="description" content="Check out AI projects built by the Wild AI community. From side projects to startup MVPs, see what builders are creating." />
      </Helmet>
      <Navbar />
      <main className="pt-24 pb-20 flex-grow">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gradient font-mono">SHOW & TELL</h1>
            <Laptop className="w-7 h-7 text-wildai-mint flex-shrink-0" />
          </div>
          <p className="text-muted-foreground mb-10">Projects from the Wild AI community</p>

          {loading ? (
            <div className="text-center py-20 text-muted-foreground">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">No approved projects yet — be the first!</p>
              <a
                href="/events/march-2026"
                className="inline-block bg-wildai-mint text-background font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-opacity"
              >
                Submit Your Project
              </a>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-secondary/50 rounded-lg cyberpunk-border overflow-hidden">
                  {project.image_url && (
                    <div className="aspect-video bg-background/50 flex items-center justify-center p-4">
                      <img
                        src={project.image_url}
                        alt={project.project_name}
                        className="max-h-full max-w-full object-contain rounded"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="text-xl font-bold font-mono mb-1">{project.project_name}</h3>
                    <a
                      href={project.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-wildai-mint text-sm hover:underline inline-flex items-center gap-1 mb-3"
                    >
                      {project.name} <ExternalLink className="w-3 h-3" />
                    </a>
                    <p className="text-muted-foreground text-sm">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShowAndTell;
