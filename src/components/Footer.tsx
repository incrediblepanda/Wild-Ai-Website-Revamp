
import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Mail, Linkedin, Twitter } from 'lucide-react';
import EmailCapture from '@/components/EmailCapture';
import { useChapters } from '@/hooks/useChapters';

const Footer = () => {
  const { data: chapters } = useChapters();

  return (
    <footer className="site-footer border-t border-border bg-secondary/40 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[1.2fr_.8fr] gap-12 max-w-6xl mx-auto">
          <div>
            <div className="flex items-center mb-6">
              <img
                src="/lovable-uploads/4b758e76-3d87-4964-9506-d66b3fa83e25.png"
                alt="Wild AI Logo"
                className="h-8"
              />
            </div>

            <p className="text-muted-foreground mb-6 max-w-md">
              The AI meetup for people who ship. Fire talks, demo nights, and real networking —
              city by city across North America.
            </p>

            <div className="mb-8 max-w-sm">
              <EmailCapture
                source="footer"
                title="STAY IN THE LOOP"
                description="Event invites and recaps, one email per event."
                compact
              />
            </div>

            <div className="flex space-x-4">
              <a
                href="https://x.com/wildai_meetup"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on X"
                className="w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center hover:border-primary transition-colors"
              >
                <Twitter className="w-5 h-5 text-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/company/wild-ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on LinkedIn"
                className="w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center hover:border-primary transition-colors"
              >
                <Linkedin className="w-5 h-5 text-foreground" />
              </a>
              <a
                href="https://www.youtube.com/@WildAI-US"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wild AI on YouTube"
                className="w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center hover:border-primary transition-colors"
              >
                <Youtube className="w-5 h-5 text-foreground" />
              </a>
              <a
                href="mailto:jake@wildai.us"
                aria-label="Email Wild AI"
                className="w-10 h-10 rounded-md border border-border bg-background flex items-center justify-center hover:border-primary transition-colors"
              >
                <Mail className="w-5 h-5 text-foreground" />
              </a>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <h4 className="signal-label mb-4">Chapters</h4>
                <ul className="space-y-2">
                  {(chapters ?? []).map((c) => (
                    <li key={c.slug}>
                      <Link
                        to={`/${c.slug}`}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {c.city}
                        {c.status === 'launching' ? ' (launching)' : ''}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link to="/chapters" className="text-wildai-mint hover:underline transition-colors">
                      All chapters →
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="signal-label mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li>
                    <Link to="/events" className="text-muted-foreground hover:text-foreground transition-colors">
                      Events
                    </Link>
                  </li>
                  <li>
                    <Link to="/speak" className="text-muted-foreground hover:text-foreground transition-colors">
                      Speak
                    </Link>
                  </li>
                  <li>
                    <Link to="/sponsor" className="text-muted-foreground hover:text-foreground transition-colors">
                      Sponsor
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/start-a-chapter"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Start a chapter
                    </Link>
                  </li>
                  <li>
                    <Link to="/press" className="text-muted-foreground hover:text-foreground transition-colors">
                      Press
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/about#conduct"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Code of conduct
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="signal-label mb-4">Community</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://www.meetup.com/wild-ai/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Wild AI Meetup Page
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2026 Wild AI Meetup. All rights reserved.</p>
          <p className="mt-2 text-xs">
            Events held in the United States and Canada. Canadian chapters comply with PIPEDA
            for subscriber data.
          </p>
          <p className="mt-2">
            <Link
              to="/admin/login"
              className="text-muted-foreground/60 hover:text-wildai-mint transition-colors text-xs"
            >
              Admin Login
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
