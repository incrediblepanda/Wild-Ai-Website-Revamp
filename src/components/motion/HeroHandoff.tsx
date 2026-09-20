import React from 'react';
import { useScrollProgress, ramp } from '@/hooks/useScrollProgress';

/**
 * Wraps the page body so it lags behind the scroll at first, then catches up.
 * Paired with the hero sinking away, the content reads as rising out of it.
 */
const HeroHandoff = ({ children }: { children: React.ReactNode }) => {
  const progress = useScrollProgress(1.25);
  const settled = progress >= 1;

  /* 1 = still tucked behind the hero, 0 = fully in place. */
  const lag = 1 - ramp(progress, 0.02, 0.86);

  /* Opacity resolves well before the travel does, so the content is solid by
     the time it owns the viewport and only cross-dissolves at the handoff. */
  const solid = ramp(progress, 0.06, 0.5);

  return (
    <div
      className="relative z-10 shadow-[0_-40px_90px_-30px_hsl(191_40%_3%/0.95)]"
      style={
        settled
          ? undefined
          : {
              transform:
                'translate3d(0, ' + lag * 12 + 'vh, 0) scale(' + (1 - lag * 0.02) + ')',
              opacity: 0.3 + 0.7 * solid,
            }
      }
    >
      {/* Lit edge so the panel reads as a distinct plane leaving the hero. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(to right, transparent, hsl(172 18% 76% / ' +
            (0.5 * lag).toFixed(3) +
            '), transparent)',
        }}
      />
      {children}
    </div>
  );
};

export default HeroHandoff;
