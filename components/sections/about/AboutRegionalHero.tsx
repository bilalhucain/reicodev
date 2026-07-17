'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutRegionalHero.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/*
  Background photo — optional. Drop a file at:
    public/images/about-hero-bg.jpg
  A dark, moody workspace/laptop shot with soft purple-blue ambient
  light works best against this palette. If the file isn't there,
  this falls back to the existing gradient/orb background — nothing
  breaks either way.
*/

type Copy = {
  eyebrow: string;
  heading: string;
  headingAccent: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const COPY: Record<string, Copy> = {
  fi: {
    eyebrow: 'NÄIN TYÖSKENTELEMME',
    heading: 'Työskentele suoraan',
    headingAccent: 'projektiasi johtavien ihmisten kanssa.',
    sub: 'Kun otat yhteyttä, puhut Bilalin, perustajan ja pääkehittäjän, tai Annan, joka vastaa asiakassuhteista — ei tukijonon kanssa.',
    ctaPrimary: 'Pyydä tarjous',
    ctaSecondary: 'Ota yhteyttä',
  },
  es: {
    eyebrow: 'CÓMO TRABAJAMOS',
    heading: 'Trabaja directamente',
    headingAccent: 'con las personas que lideran tu proyecto.',
    sub: 'Cuando nos contactas, hablas con Bilal, fundador y desarrollador principal, o con Anna, que gestiona la relación con los clientes — no con una cola de soporte.',
    ctaPrimary: 'Solicitar presupuesto',
    ctaSecondary: 'Contáctanos',
  },
  en: {
    eyebrow: 'HOW WE WORK',
    heading: 'Work directly',
    headingAccent: 'with the people leading your project.',
    sub: 'When you reach out, you\u2019re talking to Bilal, founder and lead developer, or Anna, who manages client relationships — not a support queue.',
    ctaPrimary: 'Get a Quote',
    ctaSecondary: 'Contact Us',
  },
};

export default function AboutRegionalHero() {
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const copy = COPY[locale] ?? COPY.en;

  // Entrance: a real sequence, not a uniform stagger — each element gets
  // motion that suits its role (pill scales in, heading slides up,
  // buttons arrive last with a slight stagger).
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo(`.${styles.pill}`, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 })
        .fromTo(`.${styles.h1line}`, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, '-=0.2')
        .fromTo(`.${styles.desc}`, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo(`.${styles.btns} > *`, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08 }, '-=0.3');

      // Scroll-scrubbed parallax on the background photo/orbs — moves
      // slower than the page, the classic parallax read.
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: 18,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.4 },
        });
      }
    }, ref);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section className={styles.hero} ref={ref}>
      <div className={styles.bgLayer} ref={bgRef}>
        <div className={styles.bgPhoto} aria-hidden />
        <div className={`${styles.orb} ${styles.orb1}`} aria-hidden />
        <div className={`${styles.orb} ${styles.orb2}`} aria-hidden />
        <div className={styles.gridPattern} aria-hidden />
      </div>

      <div className={`container ${styles.inner}`}>
        <div className={styles.pill}>
          <span className="pill-dot" />{copy.eyebrow}
        </div>

        <h1 className={styles.h1}>
          <span className={styles.h1line}>{copy.heading}</span>
          <span className={`${styles.h1line} ${styles.accent}`}>{copy.headingAccent}</span>
        </h1>

        <p className={styles.desc}>{copy.sub}</p>

        <div className={styles.btns}>
          <Link href="/get-a-quote" className="btn btn-primary btn-lg">{copy.ctaPrimary}</Link>
          <Link href="/contact" className="btn btn-ghost btn-lg">{copy.ctaSecondary}</Link>
        </div>
      </div>
    </section>
  );
}
