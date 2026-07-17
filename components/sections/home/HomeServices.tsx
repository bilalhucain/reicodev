'use client';
import Link from 'next/link';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { SERVICES_META } from '@/lib/data';
import styles from './HomeServices.module.css';

const SERVICE_TAGS: Record<string, string[]> = {
  wordpress:   ['WordPress', 'Elementor', 'WP Rocket'],
  woocommerce: ['WooCommerce', 'Stripe', 'ShipStation'],
  seo:         ['On-Page SEO', 'Technical SEO', 'Analytics'],
  branding:    ['Logo Design', 'Brand Guidelines', 'Figma'],
};

const REDUCED_MOTION = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FINE_POINTER = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

function ServiceIcon({ iconPath, fallback, color }: { iconPath: string; fallback: string; color: string }) {
  return (
    <div className={styles.iconWrap} style={{ background: `${color}18`, border: `1.5px solid ${color}35` }}>
      <img
        src={iconPath}
        alt="service icon"
        className={styles.iconImg}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
          const sib = e.currentTarget.nextElementSibling as HTMLElement | null;
          if (sib) sib.style.display = 'flex';
        }}
      />
      <div className={styles.iconFallback} style={{ display: 'none', fontSize: '24px' }}>{fallback}</div>
    </div>
  );
}

function ReicoBird() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="52" height="32" aria-label="Reicodev">
      <defs>
        <linearGradient id="orbBirdGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a78bfa"/>
          <stop offset="100%" stopColor="#6c4bff"/>
        </linearGradient>
      </defs>
      <g fill="url(#orbBirdGrad)">
        <path d="M520 120 C610 120 680 180 700 230 L620 260 C590 330 540 400 470 450 C380 510 270 470 240 390 L410 390 C425 390 435 380 435 365 C435 350 425 340 410 340 L200 340 C175 320 160 295 150 270 L520 270 C535 270 545 260 545 245 C545 230 535 220 520 220 L110 220 C120 180 150 145 190 120 L520 120 Z"/>
        <path d="M180 220 L500 220 C520 220 530 205 530 190 C530 175 520 160 500 160 L140 160 C130 185 145 205 180 220 Z" fill="#a78bfa"/>
        <circle cx="560" cy="185" r="8" fill="#ffffff"/>
      </g>
    </svg>
  );
}

/* ── Single service card ──
   Local 3-D tilt lives here: subtle rotateX/rotateY + lift toward the
   cursor, GSAP quickTo so it always eases smoothly regardless of how
   fast the mouse moves. Skipped entirely on touch/coarse pointers and
   when the OS asks for reduced motion.

   Wrapped in React.memo (see export below) so hovering card #1 doesn't
   re-render cards #2–4 — previously the whole row re-rendered on every
   hover change, which is exactly the kind of thing that shows up as a
   distracting flash if you have React DevTools' "Highlight updates"
   turned on. `index` + the parent's stable onEnter/onLeave keep the
   prop identity steady so memo actually has something to compare. */
function ServiceCardImpl({
  s, index, badgeSide, isHovered, onEnter, onLeave, exploreLabel,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  s: any;
  index: number;
  badgeSide: 'left' | 'right';
  isHovered: boolean;
  onEnter: (i: number) => void;
  onLeave: () => void;
  exploreLabel: string;
}) {
  const skinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = skinRef.current;
    if (!el || !FINE_POINTER() || REDUCED_MOTION()) return;

    const rotX = gsap.quickTo(el, 'rotateX', { duration: 0.5, ease: 'power3.out' });
    const rotY = gsap.quickTo(el, 'rotateY', { duration: 0.5, ease: 'power3.out' });
    const lift = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      rotY(px * 7);
      rotX(-py * 7);
    };
    const onEnterLocal = () => lift(-4);
    const onLeaveLocal = () => { rotX(0); rotY(0); lift(0); };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseenter', onEnterLocal);
    el.addEventListener('mouseleave', onLeaveLocal);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseenter', onEnterLocal);
      el.removeEventListener('mouseleave', onLeaveLocal);
    };
  }, []);

  return (
    <div
      className={`${styles.cardWrap} reveal ${badgeSide === 'right' ? styles.cardWrapLeft : styles.cardWrapRight}`}
      onMouseEnter={() => onEnter(index)}
      onMouseLeave={onLeave}
      data-hovered={isHovered ? 'true' : 'false'}
    >
      {/* Badge — sibling of .card. Its own accent border comes from the
          service color, but the number itself always uses a fixed
          high-contrast ink color so it never washes out on a light
          card background regardless of how pale that accent is. */}
      <span
        className={`${styles.numBadge} ${badgeSide === 'right' ? styles.numBadgeRight : styles.numBadgeLeft}`}
        style={{ borderColor: `${s.color}70` }}
      >
        {s.num}
      </span>

      {/* Card — badge + card fade/slide in together as one unit */}
      <div className={styles.card}>
        <div className={styles.cardSkin} ref={skinRef}>
          <div className={styles.cardTop}>
            <div className={styles.cardHeader}>
              <ServiceIcon iconPath={s.img} fallback={s.icon} color={s.color} />
              <div>
                <span className={styles.label} style={{ color: s.color }}>{s.category}</span>
                <h3 className={styles.title}>{s.title}</h3>
              </div>
            </div>
            <p className={styles.desc}>{s.desc}</p>
          </div>
          <div className={styles.cardFoot}>
            <div className={styles.tags}>
              {s.tags.map((tag: string) => (
                <span key={tag} className="tag tag-dim">{tag}</span>
              ))}
            </div>
            <Link href="/services" className={styles.link}>
              {exploreLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
const ServiceCard = memo(ServiceCardImpl);

/* Connector path definitions — shared between the rendered <path>
   elements and the GSAP point-along-path math below. */
const PATH_D = [
  'M 0 140 Q 150 140 150 280',
  'M 0 420 Q 150 420 150 280',
  'M 300 140 Q 150 140 150 280',
  'M 300 420 Q 150 420 150 280',
];
const DOT_START = [
  { cx: 0, cy: 140 },
  { cx: 0, cy: 420 },
  { cx: 300, cy: 140 },
  { cx: 300, cy: 420 },
];

export default function HomeServices() {
  const t   = useTranslations('home');
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const pathRefs      = useRef<(SVGPathElement | null)[]>([]);
  const idleDotRefs    = useRef<(SVGCircleElement | null)[]>([]);
  const burstDotRefs   = useRef<(SVGCircleElement | null)[]>([]);
  const idleTweens     = useRef<(gsap.core.Tween | null)[]>([]);
  const shockRef       = useRef<HTMLDivElement>(null);

  /* Scroll-in reveal for the whole section (heading, each card+badge
     unit, the CTA). Animates directly via GSAP rather than toggling a
     class that depends on some external stylesheet defining the
     transition — that dependency is exactly what made the entrance
     feel like "nothing happens" if that global CSS wasn't wired up.
     This effect is fully self-contained: it works whether or not any
     other .reveal convention exists elsewhere on the page. */
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els || els.length === 0) return;

    if (REDUCED_MOTION()) {
      els.forEach(el => { el.style.opacity = '1'; el.style.transform = 'none'; });
      return;
    }

    const list = Array.from(els);
    list.forEach(el => gsap.set(el, { opacity: 0, y: 26 }));

    const obs = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const idx = list.indexOf(entry.target as HTMLElement);
        gsap.to(entry.target, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: Math.max(idx, 0) * 0.07,
        });
        obs.unobserve(entry.target);
      }),
      { threshold: 0.12 }
    );
    list.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Ambient traveling dot on every connector — slow, always-on,
     staggered so the four lines don't pulse in lockstep. */
  useEffect(() => {
    if (REDUCED_MOTION()) return;
    pathRefs.current.forEach((path, i) => {
      const dot = idleDotRefs.current[i];
      if (!path || !dot) return;
      const total = path.getTotalLength();
      const obj = { t: 0 };
      idleTweens.current[i] = gsap.to(obj, {
        t: 1,
        duration: 2.8,
        delay: i * 0.5,
        repeat: -1,
        ease: 'none',
        onUpdate: () => {
          const pt = path.getPointAtLength(obj.t * total);
          dot.setAttribute('cx', String(pt.x));
          dot.setAttribute('cy', String(pt.y));
        },
      });
    });
    return () => idleTweens.current.forEach(tw => tw?.kill());
  }, []);

  /* On hover: fire one bright pulse racing from that card toward the
     orb, and a quick shockwave ring on the orb itself — a visual
     handshake that reinforces "this service feeds the core". */
  useEffect(() => {
    if (hovered === null || REDUCED_MOTION()) return;
    const path = pathRefs.current[hovered];
    const dot  = burstDotRefs.current[hovered];
    if (path && dot) {
      const total = path.getTotalLength();
      const obj = { t: 0 };
      gsap.set(dot, { opacity: 1 });
      gsap.to(obj, {
        t: 1,
        duration: 0.55,
        ease: 'power2.out',
        onUpdate: () => {
          const pt = path.getPointAtLength(obj.t * total);
          dot.setAttribute('cx', String(pt.x));
          dot.setAttribute('cy', String(pt.y));
        },
        onComplete: () => gsap.to(dot, { opacity: 0, duration: 0.3 }),
      });
    }
    if (shockRef.current) {
      gsap.fromTo(
        shockRef.current,
        { scale: 0.6, opacity: 0.55 },
        { scale: 1.9, opacity: 0, duration: 0.85, ease: 'power2.out' }
      );
    }
  }, [hovered]);

  const SERVICES_DISPLAY = useMemo(() => SERVICES_META.map((s, i) => ({
    ...s,
    num:      String(i + 1).padStart(2, '0'),
    category: t(`service${i + 1}Category`),
    title:    t(`service${i + 1}Title`),
    desc:     t(`service${i + 1}Description`),
    tags:     SERVICE_TAGS[s.key] ?? [],
  })), [t]);

  // Stable references — required for React.memo on ServiceCard to
  // actually skip re-rendering the three cards that *aren't* hovered.
  const handleEnter = useCallback((i: number) => setHovered(i), []);
  const handleLeave = useCallback(() => setHovered(null), []);

  const left  = SERVICES_DISPLAY.slice(0, 2);
  const right = SERVICES_DISPLAY.slice(2, 4);
  const exploreLabel = t('exploreService');

  return (
    <section className={`section section-dark ${styles.section}`} ref={ref}>
      <div className="container">

        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('servicesSectionLabel')}</div>
          <h2 className="sec-title">
            {t('servicesHeading').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="sec-accent">{t('servicesHeading').split(' ').slice(-1)}</span>
          </h2>
          <p className="sec-sub">{t('servicesSubtitle')}</p>
          <div className="sec-line" />
        </div>

        <div className={styles.radial}>

          {/* Left column — badges poke RIGHT toward center */}
          <div className={styles.colLeft}>
            {left.map((s, i) => (
              <ServiceCard
                key={s.key}
                s={s}
                index={i}
                badgeSide="right"
                isHovered={hovered === i}
                onEnter={handleEnter}
                onLeave={handleLeave}
                exploreLabel={exploreLabel}
              />
            ))}
          </div>

          {/* Center orb */}
          <div className={styles.centerCol} aria-hidden="true">
            <svg className={styles.connSvg} viewBox="0 0 300 560" xmlns="http://www.w3.org/2000/svg">
              {PATH_D.map((d, i) => (
                <path
                  key={`path-${i}`}
                  d={d}
                  ref={(el) => { pathRefs.current[i] = el; }}
                  className={`${styles.connPath} ${hovered === i ? styles.connPathLit : ''}`}
                />
              ))}
              {DOT_START.map((p, i) => (
                <circle key={`base-${i}`} cx={p.cx} cy={p.cy} r="5" className={`${styles.connDotSvg} ${hovered === i ? styles.connDotLit : ''}`} />
              ))}
              {/* Ambient slow travel dots */}
              {DOT_START.map((p, i) => (
                <circle key={`idle-${i}`} cx={p.cx} cy={p.cy} r="3" className={styles.connIdleDot} ref={(el) => { idleDotRefs.current[i] = el; }} />
              ))}
              {/* Bright one-shot burst dots, fired on hover */}
              {DOT_START.map((p, i) => (
                <circle key={`burst-${i}`} cx={p.cx} cy={p.cy} r="4" className={styles.connBurstDot} ref={(el) => { burstDotRefs.current[i] = el; }} />
              ))}
            </svg>
            <div className={styles.orb}>
              <div className={styles.orbShock} ref={shockRef} />
              <div className={styles.orbRingOuter} />
              <div className={styles.orbRingMid}   />
              <div className={styles.orbCore}>
                <ReicoBird />
              </div>
            </div>
          </div>

          {/* Right column — badges poke LEFT toward center */}
          <div className={styles.colRight}>
            {right.map((s, i) => (
              <ServiceCard
                key={s.key}
                s={s}
                index={i + 2}
                badgeSide="left"
                isHovered={hovered === i + 2}
                onEnter={handleEnter}
                onLeave={handleLeave}
                exploreLabel={exploreLabel}
              />
            ))}
          </div>

        </div>

        <div className={`${styles.cta} reveal`}>
          <Link href="/services" className={styles.ctaBtn}>
            <span className={styles.ctaBtnIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M17 7H7M17 7v10"/>
              </svg>
            </span>
            {t('viewAllServices')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
