import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LOGO_SRC } from '@/components/Logo';

/**
 * Module scope on purpose: survives client-side navigation so the curtain
 * plays once per real page load, and resets only on a browser refresh.
 */
let hasPlayed = false;

/** The route this page load started on — the curtain is for direct landings only. */
const ENTRY_PATH = typeof window === 'undefined' ? '/' : window.location.pathname;

const EXIT_MS = 900;

const Intro = () => {
  const [active] = useState(() => !hasPlayed && ENTRY_PATH === '/');
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const leavingRef = useRef(false);

  const dismiss = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    window.setTimeout(() => setDone(true), EXIT_MS);
  }, []);

  useEffect(() => {
    hasPlayed = true;
  }, []);

  // Hold the page still until the curtain is fully gone, so scroll momentum
  // from the dismissing gesture cannot carry past the hero.
  useEffect(() => {
    if (!active || done) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active, done]);

  // Pause the hero entrance until the curtain starts lifting, so the hero
  // animates in behind the fade rather than playing out of sight.
  useEffect(() => {
    if (!active || leaving) return;
    const root = document.documentElement;
    root.setAttribute('data-intro', 'active');
    return () => root.removeAttribute('data-intro');
  }, [active, leaving]);

  useEffect(() => {
    if (!active || leaving) return;

    const onKeyDown = (event: KeyboardEvent) => {
      const keys = [' ', 'Enter', 'Escape', 'ArrowDown', 'PageDown', 'End'];
      if (keys.includes(event.key)) {
        event.preventDefault();
        dismiss();
      }
    };

    window.addEventListener('wheel', dismiss, { passive: true });
    window.addEventListener('touchmove', dismiss, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('wheel', dismiss);
      window.removeEventListener('touchmove', dismiss);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [active, leaving, dismiss]);

  if (!active || done) return null;

  return (
    <div className="intro-overlay" data-leaving={leaving} onClick={dismiss} role="presentation">
      <div className="intro-glow" aria-hidden="true" />

      <img src={LOGO_SRC} alt="Wild AI" className="intro-logo" />

      <button
        type="button"
        onClick={dismiss}
        className="intro-prompt"
        aria-label="Enter the site"
      >
        <span className="kicker">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </button>
    </div>
  );
};

export default Intro;
