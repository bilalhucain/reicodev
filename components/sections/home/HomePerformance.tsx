'use client';
import { useEffect, useRef } from 'react';
import styles from './HomePerformance.module.css';

const METRICS = [
  { label:'Total Revenue',  val:'$44,396',  change:'+18%',    color:'var(--c-green)' },
  { label:'Monthly Visitors',val:'20,803K',  change:'+12%',    color:'var(--c-p1)' },
  { label:'SEO Score',       val:'98 / 100', change:'Excellent',color:'var(--c-cyan)' },
];
const BARS = [38,55,44,72,60,88,74];

export default function HomePerformance() {
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
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line"/>Live Performance</div>
          <h2 className="sec-title">Results You Can <span className="sec-accent">Actually See</span></h2>
          <p className="sec-sub">Real-time dashboards built into every project so you always know what&apos;s working.</p>
          <div className="sec-line"/>
        </div>

        <div className={`${styles.card} reveal`}>
          <div className={styles.metrics}>
            {METRICS.map(m => (
              <div key={m.label} className={styles.metric}>
                <div className={styles.mLabel}>{m.label}</div>
                <div className={styles.mVal}>{m.val}</div>
                <div className={styles.mChange} style={{ color:m.color }}>{m.change}</div>
              </div>
            ))}
          </div>
          <div className={styles.chart}>
            <div className={styles.chartBars}>
              {BARS.map((h,i) => <div key={i} className={styles.bar} style={{ height:`${h}%`, opacity:i===5?1:0.25+i*0.08 }} />)}
            </div>
            <div className={styles.chartLabels}>
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d => <span key={d} className={styles.chartLabel}>{d}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
