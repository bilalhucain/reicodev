/* ═══════════════════════════════════════════════════════
   processAnimations — pure GSAP timeline factories.
   Every function takes a DOM container (the icon wrapper)
   and returns a gsap.core.Timeline. Nothing here touches
   React; nothing in the components imports GSAP directly
   except this file and the orchestrator in HomeProcess.tsx.
   ═══════════════════════════════════════════════════════ */
import { gsap } from 'gsap';

const EASE = 'power2.out';
const EASE_SOFT = 'power2.inOut';

function parts(container: Element, name: string): Element[] {
  return Array.from(container.querySelectorAll(`[data-part~="${name}"]`));
}
function part(container: Element, name: string): Element | null {
  return container.querySelector(`[data-part~="${name}"]`);
}

/* ── Idle: shared subtle float + breathing, looped ──
   Applied to the whole icon wrapper (not the svg internals),
   so it works identically for every step. */
export function idleTimeline(container: Element): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
  tl.to(container, { y: -3, scale: 1.015, duration: 2.8 });
  return tl;
}

/* 01 — Discovery: Telescope scans, lens brightens */
export function playTelescope(container: Element): gsap.core.Timeline {
  const scope = part(container, 'scope');
  const lens = part(container, 'lens');
  const tl = gsap.timeline();
  if (scope) {
    gsap.set(scope, { transformOrigin: '30% 78%' });
    tl.to(scope, { rotate: -13, duration: 0.6, ease: EASE })
      .to(scope, { rotate: 9, duration: 0.85, ease: EASE_SOFT })
      .to(scope, { rotate: 0, duration: 0.5, ease: EASE }, '-=0.05');
  }
  if (lens) {
    tl.to(lens, { opacity: 1, scale: 2, transformOrigin: 'center', duration: 0.35, ease: EASE }, 0.35)
      .to(lens, { opacity: 0.55, scale: 1, duration: 0.55, ease: EASE_SOFT }, 0.85);
  }
  return tl;
}

/* 02 — Strategy: route draws itself, dot travels, endpoint pulses */
export function playRoute(container: Element): gsap.core.Timeline {
  const segments = parts(container, 'path');
  const travelDot = part(container, 'travelDot');
  const endDot = part(container, 'endDot');
  const tl = gsap.timeline();

  segments.forEach((seg) => gsap.set(seg, { strokeDasharray: 100, strokeDashoffset: 100 }));
  tl.to(segments, { strokeDashoffset: 0, duration: 0.9, ease: EASE, stagger: 0 });

  if (travelDot) {
    // Move the travel dot along the same two path definitions it mirrors,
    // using a matched motion so it looks like it's riding the line.
    const paths = segments as SVGPathElement[];
    const dot = travelDot as SVGCircleElement;
    const obj = { t: 0 };
    tl.to(
      obj,
      {
        t: 1,
        duration: 0.9,
        ease: EASE,
        onUpdate: () => {
          const total = paths.reduce((s, p) => s + p.getTotalLength(), 0);
          let target = obj.t * total;
          for (const p of paths) {
            const len = p.getTotalLength();
            if (target <= len) {
              const pt = p.getPointAtLength(target);
              dot.setAttribute('cx', String(pt.x));
              dot.setAttribute('cy', String(pt.y));
              break;
            }
            target -= len;
          }
        },
      },
      0
    );
  }
  if (endDot) {
    tl.to(endDot, { scale: 1.5, fill: 'currentColor', transformOrigin: 'center', duration: 0.25, ease: EASE }, 0.85)
      .to(endDot, { scale: 1, duration: 0.4, ease: EASE_SOFT }, 1.1);
  }
  return tl;
}

/* 03 — Design: pencil draws a line, sparkles appear then fade */
export function playPencil(container: Element): gsap.core.Timeline {
  const drawline = part(container, 'drawline');
  const big = part(container, 'sparkleBig');
  const small = part(container, 'sparkleSmall');
  const pencil = part(container, 'pencil');
  const tl = gsap.timeline();

  if (drawline) gsap.set(drawline, { strokeDasharray: 100, strokeDashoffset: 100 });
  [big, small].forEach((s) => s && gsap.set(s, { opacity: 0, scale: 0.4, transformOrigin: 'center' }));

  if (pencil) tl.to(pencil, { rotate: -4, transformOrigin: '20% 90%', duration: 0.3, ease: EASE }, 0);
  if (drawline) tl.to(drawline, { strokeDashoffset: 0, duration: 0.7, ease: EASE }, 0.05);
  if (big) tl.to(big, { opacity: 1, scale: 1, duration: 0.3, ease: EASE }, 0.55);
  if (small) tl.to(small, { opacity: 1, scale: 1, duration: 0.25, ease: EASE }, 0.72);
  if (big) tl.to(big, { opacity: 0, duration: 0.4, ease: EASE_SOFT }, 1.05);
  if (small) tl.to(small, { opacity: 0, duration: 0.35, ease: EASE_SOFT }, 1.1);
  if (pencil) tl.to(pencil, { rotate: 0, duration: 0.35, ease: EASE }, 1.05);
  if (drawline) tl.to(drawline, { opacity: 0.35, duration: 0.4, ease: EASE_SOFT }, 1.15);
  return tl;
}

/* 04 — Development: grid cells appear in sequence, check draws, success pulse */
export function playGrid(container: Element): gsap.core.Timeline {
  const cells = parts(container, 'cell');
  const check = part(container, 'check');
  const tl = gsap.timeline();

  gsap.set(cells, { opacity: 0.35, scale: 0.85, transformOrigin: 'center' });
  if (check) gsap.set(check, { strokeDasharray: 100, strokeDashoffset: 100, opacity: 0 });

  tl.to(cells, { opacity: 1, scale: 1, duration: 0.28, ease: EASE, stagger: 0.09 });
  if (check) {
    tl.to(check, { opacity: 1, duration: 0.01 }, '-=0.05')
      .to(check, { strokeDashoffset: 0, duration: 0.45, ease: EASE }, '<');
  }
  tl.to(container, { filter: 'brightness(1.25)', duration: 0.18, ease: EASE }, '-=0.1')
    .to(container, { filter: 'brightness(1)', duration: 0.4, ease: EASE_SOFT });
  return tl;
}

/* 05 — Optimization: gauge needle sweeps to ~90%, glow intensifies, pulses */
export function playGauge(container: Element): gsap.core.Timeline {
  const arc = part(container, 'arc');
  const needle = part(container, 'needleGroup') || part(container, 'needle');
  const tl = gsap.timeline();

  if (arc) gsap.set(arc, { strokeDasharray: 100, strokeDashoffset: 100 });
  if (needle) gsap.set(needle, { rotate: -78, transformOrigin: '12px 16px' });

  if (arc) tl.to(arc, { strokeDashoffset: 10, duration: 0.75, ease: EASE }, 0);
  if (needle) tl.to(needle, { rotate: 60, duration: 0.75, ease: EASE }, 0);
  tl.to(
    container,
    { filter: 'brightness(1.3)', duration: 0.2, ease: EASE },
    0.6
  ).to(container, { filter: 'brightness(1)', duration: 0.5, ease: EASE_SOFT }, 0.85);
  return tl;
}

export const PROCESS_ANIMATIONS = [
  playTelescope,
  playRoute,
  playPencil,
  playGrid,
  playGauge,
] as const;
