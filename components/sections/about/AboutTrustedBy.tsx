'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import styles from './AboutTrustedBy.module.css';

const LOGOS = [
  'Safari World Tours', 'ClearConnectTV', 'AsalSports', 'Blissful Kava',
  'Jamaican Products', 'SimChimp', 'Nuhaus Structures', 'Sipsentials',
];

export default function AboutTrustedBy() {
  const t = useTranslations('about');
  const ref = useRef<HTMLElement>(null);

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

  return (
    <section className="section section-dark" ref={ref}>
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
        <div className={`${styles.grid} reveal`}>
          {LOGOS.map(name => (
            <div key={name} className={styles.logo}>
              <span className={styles.logoText}>{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
