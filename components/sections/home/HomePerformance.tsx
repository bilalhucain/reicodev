'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import styles from './HomePerformance.module.css';

const BARS = [38,55,44,72,60,88,74];

export default function HomePerformance() {
  const t = useTranslations('home');
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

  // Metrics use real values — labels translated
  const METRICS = [
    { labelKey: 'perfMetric1Label', val: '$44,396',  change: '+18%',     color: 'var(--c-green)' },
    { labelKey: 'perfMetric2Label', val: '20,803K',  change: '+12%',     color: 'var(--c-p1)' },
    { labelKey: 'perfMetric3Label', val: '98 / 100', change: 'Excellent', color: 'var(--c-cyan)' },
  ];

  return (
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('perfSectionLabel')}</div>
          <h2 className="sec-title">{t('perfHeading').split(' ').slice(0,-2).join(' ')} <span className="sec-accent">{t('perfHeading').split(' ').slice(-2).join(' ')}</span></h2>
          <p className="sec-sub">{t('perfSubtitle')}</p>
          <div className="sec-line" />
        </div>
        <div className={`${styles.card} reveal`}>
          <div className={styles.metrics}>
            {METRICS.map(m => (
              <div key={m.labelKey} className={styles.metric}>
                <div className={styles.mLabel}>{t(m.labelKey)}</div>
                <div className={styles.mVal}>{m.val}</div>
                <div className={styles.mChange} style={{ color: m.color }}>{m.change}</div>
              </div>
            ))}
          </div>
          <div className={styles.chart}>
            <div className={styles.chartBars}>
              {BARS.map((h, i) => (
                <div key={i} className={styles.bar} style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.25 + i * 0.08 }} />
              ))}
            </div>
            <div className={styles.chartLabels}>
              {t('perfDayLabels').split(',').map(d => (
                <span key={d} className={styles.chartLabel}>{d.trim()}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
