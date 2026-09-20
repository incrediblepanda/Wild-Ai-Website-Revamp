import React from 'react';
import { cn } from '@/lib/utils';

interface MarqueeProps {
  children: React.ReactNode;
  /** Seconds for one full loop. */
  speed?: number;
  className?: string;
}

/** Seamless horizontal loop. Children are rendered twice; pauses on hover. */
const Marquee = ({ children, speed = 44, className }: MarqueeProps) => (
  <div className={cn('group relative overflow-hidden mask-fade-x', className)}>
    <div
      className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
      style={{ animationDuration: `${speed}s` }}
    >
      <div className="flex shrink-0 items-center">{children}</div>
      <div className="flex shrink-0 items-center" aria-hidden="true">
        {children}
      </div>
    </div>
  </div>
);

export default Marquee;
