'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

/*
  JS-driven marquee — no CSS `animation-duration` juggling.

  Why the old version flashed on scroll: it kept the CSS keyframe
  animation running and just reassigned `animation-duration` every
  frame. Changing the duration of an already-running CSS animation
  forces the browser to recompute playback position as
  (elapsedTime / duration) — which visibly snaps/jumps the track
  forward. That snap is the "flash" you were seeing, not the speed
  change itself.

  Fix: stop using CSS keyframes for the moving part entirely. We
  drive `translateX` ourselves via requestAnimationFrame, so a speed
  change is just a bigger per-frame step — there's no discontinuity,
  only smooth acceleration/deceleration. The 1-2s settle behavior you
  liked is preserved (same easing idea), it just can't glitch anymore.
*/
export default function HomeMarquee() {
  const t = useTranslations('home');
  // Comma-separated list in JSON: "WordPress Development,WooCommerce Stores,..."
  const items = t('marqueeItems').split(',').map(s => s.trim());
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Respect reduced-motion fully: no movement at all, not just "base speed".
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Track renders [...items, ...items] below, so half the scrollWidth
    // is exactly one seamless loop.
    const loopWidth = track.scrollWidth / 2;
    if (!loopWidth) return;

    // Hand off from the CSS fallback animation (globals.css) now that JS
    // is taking over positioning — prevents the two fighting each other.
    track.style.animation = 'none';

    const BASE_DURATION = 30; // seconds per full loop at rest — matches globals.css
    const basePxPerSec = loopWidth / BASE_DURATION;
    const MAX_MULT = 2.2; // ceiling so a hard flick never turns into an unreadable blur
    const SPEED_EASE = 0.08;  // how quickly current speed chases target (per frame)
    const RELAX_EASE = 0.05;  // how quickly target relaxes back to 1x when scrolling stops

    let offset = 0;
    let currentMult = 1;
    let targetMult = 1;
    let lastY = window.scrollY;
    let lastFrame = performance.now();
    let idleTimer: ReturnType<typeof setTimeout> | null = null;
    let raf = 0;

    const onScroll = () => {
      const dy = Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      // Accumulate rather than instantly set from raw velocity — a single
      // big wheel-flick can no longer spike the multiplier in one jump.
      targetMult = Math.min(MAX_MULT, targetMult + dy * 0.02);
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => { targetMult = 1; }, 250);
    };

    const tick = (now: number) => {
      // Clamp dt so a stalled tab (or dev-tools pause) doesn't cause a
      // giant one-time jump when the frame loop resumes.
      const dt = Math.min(now - lastFrame, 50);
      lastFrame = now;

      currentMult += (targetMult - currentMult) * SPEED_EASE;
      targetMult += (1 - targetMult) * RELAX_EASE;

      offset -= (basePxPerSec * currentMult * dt) / 1000;
      if (offset <= -loopWidth) offset += loopWidth;
      track.style.transform = `translateX(${offset}px)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (idleTimer) clearTimeout(idleTimer);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="marquee-wrap">
      <div className="marquee-track" ref={trackRef}>
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />{item}
          </span>
        ))}
      </div>
    </div>
  );
}
