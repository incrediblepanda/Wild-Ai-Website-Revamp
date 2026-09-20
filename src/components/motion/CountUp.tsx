import React, { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** Any display string, e.g. "500+", "~70%", "12+". Digits animate, the rest stays put. */
  value: string;
  duration?: number;
  className?: string;
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Counts the numeric portion of a label up from zero once it scrolls into view. */
const CountUp = ({ value, duration = 1100, className }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const match = value.match(/\d+/);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!match || prefersReduced) return;

    const target = Number(match[0]);
    setDisplay(value.replace(match[0], '0'));

    if (typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const current = Math.round(easeOut(progress) * target);
          setDisplay(value.replace(match[0], String(current)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default CountUp;
