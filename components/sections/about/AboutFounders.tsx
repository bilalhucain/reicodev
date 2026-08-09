'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Code2, Handshake, Quote, ArrowUpRight, User } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutFounders.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/*
  Visibility for this section is decided by the page (server-side, via
  the visitor's geo-IP country — see app/[locale]/about/page.tsx), NOT
  by locale. A Spain or Finland IP sees this section no matter which
  language they've switched to, so copy has a variant per locale the
  site actually ships (fi / en / es) rather than gating on locale.
*/

type Copy = {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  sub: string;
  quoteLabel: string;
  connectLabel: string;
};

const COPY: Record<string, Copy> = {
  fi: {
    eyebrow: 'TIIMIMME',
    heading: 'Ihmiset',
    headingAccent: 'Reicodevin takana',
    sub: 'Suora yhteys projektiasi johtaviin ihmisiin — ei välikäsiä.',
    quoteLabel: 'Lempilause',
    connectLabel: 'Ota yhteyttä',
  },
  es: {
    eyebrow: 'NUESTRO EQUIPO',
    heading: 'Las personas',
    headingAccent: 'detrás de Reicodev',
    sub: 'Acceso directo a las personas que lideran tu proyecto — sin intermediarios.',
    quoteLabel: 'Cita favorita',
    connectLabel: 'Contáctanos',
  },
  en: {
    eyebrow: 'OUR TEAM',
    heading: 'The people',
    headingAccent: 'behind Reicodev',
    sub: 'Direct access to the people leading your project — no middlemen.',
    quoteLabel: 'Favourite quote',
    connectLabel: 'Get in touch',
  },
};

const PEOPLE = [
  {
    key: 'bilal',
    name: 'Bilal Hussain',
    role: 'Founder & Lead Developer',
    org: 'Reicodev',
    photo: '/images/bilal.jpg',
    Icon: Code2,
    quote: 'No matter how difficult life may seem, there is always something you can do and succeed at.',
    accent: '#6c4bff',
  },
  {
    key: 'anna',
    name: 'Anna Ilona Korte',
    role: 'Business Development & Client Communications',
    org: 'Reicodev',
    photo: '/images/annaabout.jpg',
    Icon: Handshake,
    quote: 'When you do something, do it with joy.',
    accent: '#06b6d4',
  },
];

function PersonCard({
  p, copy, index, cardRef, bindTilt, photoRef,
}: {
  p: typeof PEOPLE[number];
  copy: Copy;
  index: number;
  cardRef: (el: HTMLDivElement | null) => void;
  bindTilt: (el: HTMLDivElement | null) => void;
  photoRef: (el: HTMLDivElement | null) => void;
}) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div
      ref={el => { cardRef(el); bindTilt(el); }}
      className={styles.card}
      style={{ '--accent': p.accent } as React.CSSProperties}
    >
      <div className={styles.cardGlow} aria-hidden />

      <div className={styles.photoWrap} ref={photoRef}>
        <div className={styles.photoRing}>
          <div className={styles.photoInner}>
            {imgOk ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={p.photo}
                alt={p.name}
                className={styles.photoImg}
                onError={() => setImgOk(false)}
              />
            ) : (
              <div className={styles.photoFallback}>
                <User size={44} strokeWidth={1.3} />
                <span>{p.name.split(' ')[0]}&rsquo;s photo</span>
              </div>
            )}
          </div>
        </div>
        <div className={styles.roleBadge}>
          <p.Icon size={17} strokeWidth={2.2} />
        </div>
      </div>

      <div className={styles.name}>{p.name}</div>
      <div className={styles.role}>{p.role}<span className={styles.roleOrg}> — {p.org}</span></div>

      <div className={styles.quoteBlock}>
        <Quote size={20} strokeWidth={1.8} className={styles.quoteIcon} />
        <p className={styles.quoteText}>&ldquo;{p.quote}&rdquo;</p>
        <span className={styles.quoteLabel}>{copy.quoteLabel}</span>
      </div>

      <Link href="/contact" className={styles.connectLink}>
        {copy.connectLabel}
        <ArrowUpRight size={15} strokeWidth={2.4} />
      </Link>
    </div>
  );
}

export default function AboutFounders() {
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);

  const copy = COPY[locale] ?? COPY.en;

  // The sec-head heading uses the shared "reveal" class, which starts
  // at opacity:0 and needs a scroll observer to add "in". Other
  // components on this page handle that locally — this one didn't,
  // which is why the eyebrow/heading above the cards was invisible.
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Entrance: both cards rise together, mirrored from center — equal
  // weight, equal timing, no one "leads."
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRefs.current,
        { opacity: 0, y: 36, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.75,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rowRef.current, start: 'top 75%', once: true },
        }
      );
      // slow ambient idle float, offset so the two never sync
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: i === 0 ? -8 : 8,
          duration: 3.4 + i * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1 + i * 0.6,
        });
      });
      // Scroll-scrubbed portrait drift — each photo moves at a slightly
      // different rate/direction as the section scrolls past, a subtle
      // depth cue rather than a one-shot animation.
      photoRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          yPercent: i === 0 ? -6 : 6,
          rotate: i === 0 ? -2 : 2,
          ease: 'none',
          scrollTrigger: { trigger: rowRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Background orb parallax on mouse move — subtle depth for the section
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const depths = [22, 34];
    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const r = section.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { target.x = 0; target.y = 0; };
    const tick = () => {
      current.x += (target.x - current.x) * 0.05;
      current.y += (target.y - current.y) * 0.05;
      orbRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translate(${(current.x * depths[i]).toFixed(1)}px, ${(current.y * depths[i]).toFixed(1)}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    section.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  // 3-D tilt + glow-follow on hover — applied identically to both cards
  const bindTilt = (el: HTMLDivElement | null) => {
    if (!el) return;
    const glow = el.querySelector<HTMLElement>(`.${styles.cardGlow}`);
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      gsap.to(el, {
        rotateX: (0.5 - py) * 6,
        rotateY: (px - 0.5) * 8,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 900,
      });
      if (glow) {
        glow.style.setProperty('--mx', `${px * 100}%`);
        glow.style.setProperty('--my', `${py * 100}%`);
        gsap.to(glow, { opacity: 1, duration: 0.25 });
      }
    };
    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'power3.out' });
      if (glow) gsap.to(glow, { opacity: 0, duration: 0.4 });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  };

  return (
    <section className={`section section-dark2 ${styles.section}`} ref={ref}>
      {/* Original abstract backdrop — dual-tone wave field plus floating
          parallax orbs, evoking two horizons meeting without leaning on
          literal flags or borrowed stock photography */}
      <div className={styles.bgArt} aria-hidden>
        <div ref={el => { orbRefs.current[0] = el; }} className={`${styles.orb} ${styles.orbA}`} />
        <div ref={el => { orbRefs.current[1] = el; }} className={`${styles.orb} ${styles.orbB}`} />
        <svg className={styles.bgWaves} viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path d="M0,180 C240,260 420,80 720,140 C1020,200 1200,60 1440,140 L1440,400 L0,400 Z" fill="url(#waveGradA)" />
          <path d="M0,240 C260,180 480,320 760,260 C1040,200 1220,300 1440,240 L1440,400 L0,400 Z" fill="url(#waveGradB)" />
          <defs>
            <linearGradient id="waveGradA" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6c4bff" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.10" />
            </linearGradient>
            <linearGradient id="waveGradB" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#6c4bff" stopOpacity="0.12" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{copy.eyebrow}</div>
          <h2 className="sec-title">
            {copy.heading} <span className="sec-accent">{copy.headingAccent}</span>
          </h2>
          <p className="sec-sub">{copy.sub}</p>
          <div className="sec-line" />
        </div>

        <div className={styles.duo} ref={rowRef}>
          {PEOPLE.map((p, i) => (
            <PersonCard
              key={p.key}
              p={p}
              copy={copy}
              index={i}
              cardRef={el => { cardRefs.current[i] = el; }}
              bindTilt={bindTilt}
              photoRef={el => { photoRefs.current[i] = el; }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
