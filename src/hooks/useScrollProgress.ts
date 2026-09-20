import { useEffect, useState } from 'react';

/**
 * Returns how far the page has scrolled through `spanRatio` viewport heights,
 * clamped to 0..1.
 *
 * The value is damped toward the real scroll position rather than tracking it
 * exactly, so wheel clicks - which arrive as coarse jumps - still read as one
 * continuous glide. `smoothing` is the fraction of the remaining distance
 * closed each frame; lower is slower and looser.
 */
export const useScrollProgress = (spanRatio = 1, smoothing = 0.12) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    let current = 0;
    let target = 0;

    const readTarget = () => {
      const span = window.innerHeight * spanRatio;
      target = span > 0 ? Math.min(window.scrollY / span, 1) : 0;
    };

    const tick = () => {
      current += (target - current) * smoothing;
      if (Math.abs(target - current) < 0.0004) current = target;
      setProgress(current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      readTarget();
      if (!frame && current !== target) frame = requestAnimationFrame(tick);
    };

    // Land on the true value immediately on mount - no opening slide.
    readTarget();
    current = target;
    setProgress(target);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [spanRatio, smoothing]);

  return progress;
};

/** Smoothstep easing - no hard starts or stops. */
export const smoothstep = (t: number) => {
  const c = Math.min(Math.max(t, 0), 1);
  return c * c * (3 - 2 * c);
};

/** Remaps `value` from [inMin, inMax] onto 0..1 before smoothing. */
export const ramp = (value: number, inMin: number, inMax: number) =>
  smoothstep((value - inMin) / (inMax - inMin));
