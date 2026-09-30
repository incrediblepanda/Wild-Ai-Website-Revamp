import React, { useCallback, useEffect, useRef, useState } from 'react';
import { LOGO_SRC } from '@/components/Logo';

/**
 * Module scope on purpose: survives client-side navigation so the curtain
 * plays once per real page load, and resets only on a browser refresh.
 */
let hasPlayed = false;

/** The route this page load started on - the curtain is for direct landings only. */
const ENTRY_PATH = typeof window === 'undefined' ? '/' : window.location.pathname;

/** How long the mark sits centred before it takes off. */
const HOLD_MS = 2000;
/** Long enough to read as a deliberate glide rather than a cut. */
const FLIGHT_MS = 1500;

const Intro = () => {
  const [active] = useState(() => !hasPlayed && ENTRY_PATH === '/');
  const [leaving, setLeaving] = useState(false);
  const [done, setDone] = useState(false);
  const logoRef = useRef<HTMLImageElement>(null);
  const leavingRef = useRef(false);

  /*
   * Measures the real navbar mark and glides the intro mark onto it, so when
   * the overlay clears the two are the same size in the same place.
   *
   * Driven by the Web Animations API rather than a CSS transition: the entry
   * keyframes have to be cancelled in the same frame the flight starts, and a
   * transition fired at that moment is unreliable - it tends to snap. Explicit
   * keyframes make the start and end states unambiguous.
   */
  const depart = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);

    const logo = logoRef.current;
    const target = document.querySelector<HTMLElement>('[data-nav-logo]');

    if (logo) {
      // Settle the entry animation so the measurement is of the resting mark.
      logo.getAnimations().forEach((animation) => animation.finish());

      let destination = 'translate(-38vw, -36vh) scale(0.1)';
      if (target) {
        const from = logo.getBoundingClientRect();
        const to = target.getBoundingClientRect();
        if (from.width > 0 && to.width > 0) {
          const scale = to.width / from.width;
          const dx = to.left + to.width / 2 - (from.left + from.width / 2);
          const dy = to.top + to.height / 2 - (from.top + from.height / 2);
          destination = 'translate(' + dx + 'px, ' + dy + 'px) scale(' + scale + ')';
        }
      }

      logo.getAnimations().forEach((animation) => animation.cancel());
      logo.animate(
        [{ transform: 'translate(0px, 0px) scale(1)' }, { transform: destination }],
        {
          duration: FLIGHT_MS,
          easing: 'cubic-bezier(0.62, 0.01, 0.2, 1)',
          fill: 'forwards',
        },
      );
    }

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

  /*
   * Hold the page still for the whole sequence. Hiding the overflow also hides
   * the scrollbar, which widens the viewport and slides every centred layout
   * sideways, so the reclaimed width is handed back as padding.
   */
  useEffect(() => {
    if (!active || done) return;
    const root = document.documentElement;
    const previousOverflow = document.body.style.overflow;
    const gap = window.innerWidth - root.clientWidth;

    root.style.setProperty('--scroll-lock-gap', gap + 'px');
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      root.style.removeProperty('--scroll-lock-gap');
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
      <img ref={logoRef} src={LOGO_SRC} alt="Wild AI" className="intro-logo" />
    </div>
  );
};

export default Intro;
