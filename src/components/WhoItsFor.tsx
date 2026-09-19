import React from 'react';
import { Button } from '@/components/ui/button';

const audience = [
  'Builders & founders shipping AI products',
  'Researchers & data scientists',
  'Engineers exploring AI in their stack',
  'Curious newcomers to the field',
];

const reasons = [
  'Find collaborators and co-founders',
  'Discover early-stage AI products',
  'Get feedback on your AI project',
  'Meet local AI leaders in person',
  'Stay ahead of what is shipping',
];

const WhoItsFor = () => {
  return (
    <section className="py-10 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title text-center">WHO_IT'S_FOR</h2>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-secondary p-6 rounded-lg cyberpunk-border">
              <h3 className="text-xl font-bold mb-4 font-mono">WHO IT'S FOR</h3>
              <ul className="space-y-4">
                {audience.map((a) => (
                  <li key={a} className="flex items-start">
                    <span className="text-wildai-mint mr-2">→</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-wildai-mint/20 to-accent/20 p-6 rounded-lg cyberpunk-border">
              <h3 className="text-xl font-bold mb-4 font-mono">WHY ATTEND</h3>
              <ul className="space-y-4">
                {reasons.map((r) => (
                  <li key={r} className="flex items-start">
                    <span className="text-wildai-mint mr-2">→</span>
                    <span>{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <a href="#register">
              <Button
                size="lg"
                className="bg-wildai-mint hover:bg-wildai-mint/90 text-wildai-teal text-lg"
              >
                REGISTER NOW
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
