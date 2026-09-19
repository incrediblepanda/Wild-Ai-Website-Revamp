
import React from 'react';
import { Radio } from 'lucide-react';
import { pastSpeakers2026 } from '@/data/eventHistory2026';

interface Speaker {
  id: number | string;
  name: string;
  linkedin?: string;
  role?: string;
  topic?: string;
  eventDate?: string;
}

interface PastSpeakersProps {
  speakers?: Speaker[];
}

const PastSpeakers = ({ speakers }: PastSpeakersProps) => {
  const speakersToShow = speakers ?? pastSpeakers2026;

  if (speakersToShow.length === 0) {
    return <p className="text-sm text-muted-foreground">No speaker lineup was published for this event.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        {speakersToShow.map((speaker) => (
          <div key={speaker.id} className="bg-secondary/50 rounded-lg p-5 border border-border hover:bg-secondary/70 transition-colors">
            <div className="flex items-start gap-3">
              <Radio className="h-4 w-4 mt-1 text-wildai-mint flex-shrink-0" />
              <div>
                <h3 className="font-bold font-mono text-base">{speaker.name}</h3>
                {speaker.role && <p className="text-xs text-wildai-mint mt-1">{speaker.role}</p>}
                {speaker.eventDate && <p className="text-[10px] font-mono text-muted-foreground mt-2">{speaker.eventDate}</p>}
                {speaker.topic && <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{speaker.topic}</p>}
                {speaker.linkedin && (
                  <a href={speaker.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block mt-3 text-xs text-wildai-mint hover:underline">
                    LinkedIn profile →
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PastSpeakers;
