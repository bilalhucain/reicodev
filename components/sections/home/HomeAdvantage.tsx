'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ADVANTAGES_META } from '@/lib/data';
import styles from './HomeAdvantage.module.css';

export default function HomeAdvantage() {
  const t = useTranslations('home');
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
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          <div className={`${styles.left} reveal from-left`}>
            <div className="eyebrow"><span className="eyebrow-line" />{t('whySectionLabel')}</div>
            <h2 className="sec-title" style={{ textAlign: 'left', margin: 0 }}>
              {t('whyHeading').split(' ').slice(0, -1).join(' ')}{' '}
              <span className="sec-accent">{t('whyHeading').split(' ').slice(-1)}</span>
            </h2>
            <p style={{ fontSize: 15, color: 'var(--c-muted)', lineHeight: 1.75, marginTop: 14, maxWidth: 380 }}>
              {t('whySubtitle')}
            </p>
          </div>
          <div className={styles.grid}>
            {ADVANTAGES_META.map((a, i) => (
              <div key={a.key} className={`card ${styles.card} reveal`} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className={styles.icon}>{a.icon}</div>
                <h3 className={styles.title}>{t(`advantages.${a.key}.title`)}</h3>
                <p className={styles.desc}>{t(`advantages.${a.key}.desc`)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
