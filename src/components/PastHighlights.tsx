import React from 'react';
import { Youtube } from 'lucide-react';

// NOTE: Placeholder highlights — swap with real past-event data.
const highlights = [
  {
    date: 'May 2026',
    title: 'AI Agents in Production',
    highlight: 'Live demos from 4 local startups shipping agent workflows.',
  },
  {
    date: 'April 2026',
    title: 'Foundation Models & Fine-Tuning',
    highlight: 'Deep dive on cost-effective fine-tuning strategies.',
  },
  {
    date: 'March 2026',
    title: 'AI in Healthcare',
    highlight: 'Researchers and operators on clinical AI deployment.',
  },
  {
    date: 'February 2026',
    title: 'Builders Night',
    highlight: 'Six rapid-fire demos from Minneapolis AI builders.',
  },
];

const PastHighlights = () => {
  return (
    <section className="py-10 md:py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="section-title text-center">PAST_EVENTS</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="bg-secondary/50 p-6 rounded-lg cyberpunk-border"
              >
                <p className="text-sm font-mono text-wildai-mint mb-2">
                  {h.date}
                </p>
                <h3 className="text-lg font-bold mb-2">{h.title}</h3>
                <p className="text-muted-foreground">{h.highlight}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <a
              href="https://www.youtube.com/@WildAI-US"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 py-3 px-6 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors text-foreground"
            >
              <Youtube className="w-5 h-5 text-wildai-mint" />
              <span>Watch past events on YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastHighlights;
