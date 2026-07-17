'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Globe, ShoppingCart, TrendingUp, Palette, ArrowUpRight, type LucideIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutWhatIDo.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/*
  SEO and Branding are two distinct disciplines with their own
  deliverables — kept as separate cards instead of one combined
  "SEO & Branding" tile.
*/
const SERVICES_META: {
  Icon: LucideIcon;
  color: string;
  titleKey: string;
  items: string[];
}[] = [
  {
    Icon: Globe,
    color: 'var(--c-p1)',
    titleKey: 's1Title',
    items: ['s1f1', 's1f2', 's1f3', 's1f4'],
  },
  {
    Icon: ShoppingCart,
    color: 'var(--c-green)',
    titleKey: 's2Title',
    items: ['s2f1', 's2f2', 's2f3', 's2f4'],
  },
  {
    Icon: TrendingUp,
    color: 'var(--c-amber)',
    titleKey: 's3Title', // "SEO"
    items: ['s3f1', 's3f2', 's3f3', 's3f4'],
  },
  {
    Icon: Palette,
    color: '#ec4899',
    titleKey: 's4Title', // "Branding"
    items: ['s4f1', 's4f2', 's4f3', 's4f4'],
  },
];

export default function AboutWhatIDo() {
  const t = useTranslations('about');
  const ref = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

  // GSAP: staggered card entrance + icon pop, driven by scroll position
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  // Interactive hover: subtle tilt + icon nudge, cleaned up per-card
  const bindHover = (el: HTMLDivElement | null) => {
    if (!el) return;
    const icon = el.querySelector<HTMLElement>(`.${styles.cardIcon}`);
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateX: py * -4, rotateY: px * 6, duration: 0.4, ease: 'power2.out', transformPerspective: 700 });
      gsap.to(icon, { x: px * 6, y: py * 6, duration: 0.4, ease: 'power2.out' });
    };
    const onLeave = () => {
      gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power3.out' });
      gsap.to(icon, { x: 0, y: 0, duration: 0.5, ease: 'power3.out' });
    };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
  };

  return (
    <section className="section section-dark2" ref={ref}>
      {/* Ambient background — keeps the section from feeling flat */}
      <div className={styles.bgLayer} aria-hidden>
        <div className={styles.bgGrid} />
        <div className={styles.bgGlow} />
      </div>

      <div className="container">
        <div className={styles.inner}>
          <div className={`${styles.left} reveal from-left`}>
            <div className="eyebrow">
              <span className="eyebrow-line" />{t('servicesSectionLabel')}
            </div>
            <h2 className="sec-title" style={{ textAlign: 'left', margin: 0 }}>
              {t('servicesHeading').split('<br>').map((line, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1
                    ? <span className="sec-accent">{line}</span>
                    : <>{line}<br /></>
                  }
                </span>
              ))}
            </h2>
            <p style={{ fontSize: 14, color: 'var(--c-dim)', lineHeight: 1.75, marginTop: 14, maxWidth: 380 }}>
              {t('servicesSubtitle')}
            </p>
            <Link href="/services" className="btn btn-primary" style={{ marginTop: 24 }}>
              {t('exploreServices')}
            </Link>
          </div>

          <div className={styles.right}>
            {SERVICES_META.map((s, i) => (
              <div
                key={s.titleKey}
                ref={el => { cardsRef.current[i] = el; bindHover(el); }}
                className={`card ${styles.card}`}
              >
                <div className={styles.cardHead}>
                  <div
                    className={styles.cardIcon}
                    style={{ background: `${s.color}18`, border: `1px solid ${s.color}35`, color: s.color }}
                  >
                    <s.Icon size={22} strokeWidth={2} />
                  </div>
                  <div>
                    <div className={styles.cardTitle}>{t(s.titleKey)}</div>
                  </div>
                  <ArrowUpRight size={16} className={styles.cardArrow} style={{ color: s.color }} />
                </div>
                <ul className={styles.cardList}>
                  {s.items.map(itemKey => (
                    <li key={itemKey} className={styles.cardItem}>
                      <span className={styles.cardCheck} style={{ color: s.color }}>✓</span>
                      {t(itemKey)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
