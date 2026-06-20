'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import styles from './AboutWhatIDo.module.css';

const SERVICES_META = [
  {
    icon: '🌐',
    color: 'var(--c-p1)',
    titleKey: 's1Title',
    items: ['s1f1', 's1f2', 's1f3', 's1f4'],
  },
  {
    icon: '🛒',
    color: 'var(--c-green)',
    titleKey: 's2Title',
    items: ['s2f1', 's2f2', 's2f3', 's2f4'],
  },
  {
    icon: '📈',
    color: 'var(--c-amber)',
    titleKey: 's3Title',
    items: ['s3f1', 's3f2', 's3f3', 's3f4'],
    noteKey: null, // title already includes "(Our Team)" in translation
  },
];

export default function AboutWhatIDo() {
  const t = useTranslations('about');
  const ref = useRef<HTMLElement>(null);

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

  return (
    <section className="section section-dark2" ref={ref}>
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
                className={`card ${styles.card} reveal`}
                style={{ transitionDelay: `${i * 0.08}s` }}
              >
                <div className={styles.cardHead}>
                  <div
                    className={styles.cardIcon}
                    style={{ background: `${s.color}18`, border: `1px solid ${s.color}28` }}
                  >
                    {s.icon}
                  </div>
                  <div>
                    <div className={styles.cardTitle}>{t(s.titleKey)}</div>
                  </div>
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
