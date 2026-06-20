'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { STATS } from '@/lib/data';
import styles from './AboutMilestones.module.css';

export default function AboutMilestones() {
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

  const ITEMS = [
    { icon: '🚀', num: STATS.projects, labelKey: 'ms1Label' },
    { icon: '⭐', num: STATS.reviews,  labelKey: 'ms2Label' },
    { icon: '🌍', num: STATS.clients,  labelKey: 'ms3Label' },
    { icon: '💼', num: STATS.years,    labelKey: 'ms4Label' },
  ];

  return (
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className={`${styles.band} reveal`}>
          <div className={styles.left}>
            <h2 className={styles.title}>
              {t('milestonesHeading').split('<br>').map((line, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1
                    ? <span className={styles.accent}>{line}</span>
                    : <>{line}<br /></>
                  }
                </span>
              ))}
            </h2>
            <p className={styles.sub}>{t('milestonesSubtitle')}</p>
            <div className={styles.line} />
          </div>
          <div className={styles.grid}>
            {ITEMS.map(it => (
              <div key={it.labelKey} className={styles.item}>
                <div className={styles.icon}>{it.icon}</div>
                <div className={styles.num}>{it.num}</div>
                <div className={styles.label}>{t(it.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
