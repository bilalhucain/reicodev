'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { STATS } from '@/lib/data';
import styles from './AboutJourney.module.css';

const STEPS = [
  { milestoneKey: '2013',  year: '2013',  icon: '💻', active: false },
  { milestoneKey: '2015',  year: '2015',  icon: '🌐', active: false },
  { milestoneKey: '2016a', year: '2016',  icon: '🎓', active: false },
  { milestoneKey: '2016b', year: '2016',  icon: '💼', active: false },
  { milestoneKey: '2020',  year: '2020',  icon: '🔥', active: false },
  { milestoneKey: 'today', year: 'Today', icon: '🏆', active: true  },
];

export default function AboutJourney() {
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
        <div className={styles.head}>
          <div className="eyebrow"><span className="eyebrow-line" />{t('journeySectionLabel')}</div>
          <h2 className="sec-title">{t('journeyHeading').split(' ').map((w, i) =>
            i === t('journeyHeading').split(' ').length - 1
              ? <span key={i} className="sec-accent">{w}</span>
              : <span key={i}>{w} </span>
          )}</h2>
          <p className={styles.sub}>{t('journeySubtitle')}</p>
        </div>
        <div className={styles.timeline}>
          <div className={styles.line} aria-hidden />
          {STEPS.map((s, i) => (
            <div
              key={`${s.milestoneKey}-${i}`}
              className={`${styles.step} ${s.active ? styles.active : ''} reveal`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={styles.iconWrap}>{s.icon}</div>
              <div className={styles.year}>{s.milestoneKey === 'today' ? t('milestones.today.title') && s.year : s.year}</div>
              <div className={styles.title}>{t(`milestones.${s.milestoneKey}.title`)}</div>
              <div className={styles.desc}>
                {s.milestoneKey === 'today'
                  ? t('milestones.today.desc').replace('{projects}', STATS.projects).replace('{reviews}', STATS.reviews)
                  : t(`milestones.${s.milestoneKey}.desc`)
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
