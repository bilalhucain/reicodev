'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Building2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutTrustedBy.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const LOGOS = [
  'Safari World Tours', 'ClearConnectTV', 'AsalSports', 'Blissful Kava',
  'Jamaican Products', 'SimChimp', 'Nuhaus Structures', 'Sipsentials',
];

export default function AboutTrustedBy() {
  const t = useTranslations('about');
  const ref = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRefs.current,
        { opacity: 0, y: 16, scale: 0.94 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: gridRef.current, start: 'top 85%', once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const bindHover = (el: HTMLDivElement | null) => {
    if (!el) return;
    el.addEventListener('mouseenter', () => gsap.to(el, { y: -4, duration: 0.25, ease: 'power2.out' }));
    el.addEventListener('mouseleave', () => gsap.to(el, { y: 0, duration: 0.35, ease: 'power3.out' }));
  };

  return (
    <section className="section section-dark" ref={ref}>
      <div className={styles.bgDots} aria-hidden />
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('clientsSectionLabel')}</div>
          <h2 className="sec-title">
            {t('clientsHeading').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="sec-accent">{t('clientsHeading').split(' ').slice(-1)}</span>
          </h2>
          <p className="sec-sub">{t('clientsSubtitle')}</p>
          <div className="sec-line" />
        </div>
        <div className={styles.grid} ref={gridRef}>
          {LOGOS.map((name, i) => (
            <div
              key={name}
              ref={el => { logoRefs.current[i] = el; bindHover(el); }}
              className={styles.logo}
            >
              <Building2 size={16} className={styles.logoIcon} aria-hidden />
              <span className={styles.logoText}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
