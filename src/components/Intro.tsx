import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LOGO_SRC } from '@/components/Logo';

/**
 * Module scope on purpose: survives client-side navigation so the curtain
 * plays once per real page load, and resets only on a browser refresh.
 */
let hasPlayed = false;

/** The route this page load started on — the curtain is for direct landings only. */
const ENTRY_PATH = typeof window === 'undefined' ? '/' : window.location.pathname;

/** How long the mark sits centred before it takes off. */
const HOLD_MS = 2000;
/** Must match the transform transition on .intro-logo. */
const FLIGHT_MS = 900;

/** Used if the navbar mark cannot be measured for any reason. */
const FALLBACK_FLIGHT = 'translate(-38vw, -36vh) scale(0.1)';

const Intro = () => {
  const [active] = useState(() => !hasPlayed && ENTRY_PATH === '/');
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const [flight, setFlight] = useState<string>();
  const logoRef = useRef<HTMLImageElement>(null);
  const leavingRef = useRef(false);

  /*
   * Measures the real navbar mark and moves the intro mark onto it exactly,
   * so when the overlay clears the two are the same size in the same place
   * and the handoff is invisible.
   */
  const depart = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;

    const logo = logoRef.current;
    const target = document.querySelector<HTMLElement>('[data-nav-logo]');

    if (logo && target) {
      const from = logo.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      if (from.width > 0 && to.width > 0) {
        const scale = to.width / from.width;
        const dx = to.left + to.width / 2 - (from.left + from.width / 2);
        const dy = to.top + to.height / 2 - (from.top + from.height / 2);
        setFlight('translate(' + dx + 'px, ' + dy + 'px) scale(' + scale + ')');
      }
    }

    setLeaving(true);
    window.setTimeout(() => setDone(true), FLIGHT_MS);
  }, []);

  useEffect(() => {
    hasPlayed = true;
  }, []);

  useEffect(() => {
    if (!active || done) return;
    const timer = window.setTimeout(depart, HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [active, done, depart]);

  // Hold the page still for the whole sequence.
  useEffect(() => {
    if (!active || done) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active, done]);

  /*
   * 'active' pauses the hero entrance and hides the navbar mark.
   * 'leaving' releases the hero but keeps the navbar mark hidden until the
   * flying mark has landed on it.
   */
  useEffect(() => {
    if (!active || done) return;
    const root = document.documentElement;
    root.setAttribute('data-intro', leaving ? 'leaving' : 'active');
    return () => root.removeAttribute('data-intro');
  }, [active, done, leaving]);

  if (!active || done) return null;

  return (
    <div className="intro-overlay" data-leaving={leaving} onClick={depart} role="presentation">
      <div className="intro-glow" aria-hidden="true" />
      <img
        ref={logoRef}
        src={LOGO_SRC}
        alt="Wild AI"
        className="intro-logo"
        style={flight ? { transform: flight } : undefined}
      />
    </div>
  );
};

export default Intro;
