import React, { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  src: string;
  /** Peak opacity. Deliberately low — this is texture, not content. */
  intensity?: number;
  style?: React.CSSProperties;
}

/**
 * Ambient background loop for the hero.
 *
 * Kept far back in the mix: desaturated, softened, blended into the green
 * wash, and faded up only once the first frames are ready so it never pops in.
 * Skipped entirely for reduced-motion users and when the file is unavailable.
 */
const HeroVideo = ({ src, intensity = 0.16, style }: HeroVideoProps) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Skip on small screens too: it is a multi-megabyte download for a layer
    // that is barely perceptible on a phone-sized hero.
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const wide = window.matchMedia('(min-width: 1024px)');
    const sync = () => setAllowed(!calm.matches && wide.matches);
    sync();
    calm.addEventListener('change', sync);
    wide.addEventListener('change', sync);
    return () => {
      calm.removeEventListener('change', sync);
      wide.removeEventListener('change', sync);
    };
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !allowed) return;
    // Some browsers reject autoplay even when muted; failing is fine here.
    void video.play().catch(() => undefined);
  }, [allowed]);

  if (!allowed || failed) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={style}
    >
      <video
        ref={ref}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setReady(true)}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
        style={{
          opacity: ready ? intensity : 0,
          transition: 'opacity 1200ms ease',
          filter: 'saturate(0.45) contrast(1.05) blur(1.5px)',
          mixBlendMode: 'soft-light',
        }}
      />
      {/* Scrim keeps the headline legible over any frame of the loop. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, hsl(191 15% 10% / 0.86) 0%, hsl(191 15% 10% / 0.68) 55%, hsl(191 15% 10% / 0.78) 100%)',
        }}
      />
    </div>
  );
};

export default HeroVideo;
