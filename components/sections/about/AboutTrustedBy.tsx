'use client';
import { useEffect, useRef } from 'react';
import styles from './AboutTrustedBy.module.css';

const LOGOS = [
  'Safari World Tours','ClearConnectTV','AsalSports','Blissful Kava','Jamaican Products','SimChimp','Nuhaus Structures','Sipsentials',
];

export default function AboutTrustedBy() {
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
          <div className="eyebrow"><span className="eyebrow-line"/>Clients</div>
          <h2 className="sec-title">Trusted by Businesses <span className="sec-accent">Worldwide</span></h2>
          <p className="sec-sub">From individual entrepreneurs to established companies across 61+ countries — proud to have served them all.</p>
          <div className="sec-line"/>
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
