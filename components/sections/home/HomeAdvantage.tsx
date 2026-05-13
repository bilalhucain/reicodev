'use client';
import { useEffect, useRef } from 'react';
import { ADVANTAGES } from '@/lib/data';
import styles from './HomeAdvantage.module.css';

export default function HomeAdvantage() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),{ threshold:0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  },[]);

  return (
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          <div className={`${styles.left} reveal from-left`}>
            <div className="eyebrow"><span className="eyebrow-line"/>The Reicodev Advantage</div>
            <h2 className="sec-title" style={{ textAlign:'left', margin:0 }}>
              Why Choose <span className="sec-accent">Reicodev</span>
            </h2>
            <p style={{ fontSize:15, color:'var(--c-muted)', lineHeight:1.75, marginTop:14, maxWidth:380 }}>
              We combine creativity, technology and strategy to deliver digital experiences that make a lasting impact on your business.
            </p>
          </div>
          <div className={styles.grid}>
            {ADVANTAGES.map((a,i) => (
              <div key={a.title} className={`card ${styles.card} reveal`} style={{ transitionDelay:`${i*0.08}s` }}>
                <div className={styles.icon}>{a.icon}</div>
                <h3 className={styles.title}>{a.title}</h3>
                <p className={styles.desc}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
