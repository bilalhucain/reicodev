// AboutMilestones.tsx
'use client';
import { useEffect, useRef } from 'react';
import { STATS } from '@/lib/data';
import styles from './AboutMilestones.module.css';

const ITEMS = [
  { icon:'🚀', num: STATS.projects,  label:'Projects Completed' },
  { icon:'⭐', num: STATS.reviews,   label:'Happy Reviews' },
  { icon:'🌍', num: STATS.clients,   label:'Global Clients' },
  { icon:'💼', num: `${STATS.years}`, label:'Years Experience' },
];

export default function AboutMilestones() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),{ threshold:0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  },[]);

  return (
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className={`${styles.band} reveal`}>
          <div className={styles.left}>
            <h2 className={styles.title}>Milestones That<br/><span className={styles.accent}>Build Trust</span></h2>
            <p className={styles.sub}>Numbers are not everything, but they reflect the trust and satisfaction of amazing clients I&apos;ve worked with.</p>
            <div className={styles.line}/>
          </div>
          <div className={styles.grid}>
            {ITEMS.map(it => (
              <div key={it.label} className={styles.item}>
                <div className={styles.icon}>{it.icon}</div>
                <div className={styles.num}>{it.num}</div>
                <div className={styles.label}>{it.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
