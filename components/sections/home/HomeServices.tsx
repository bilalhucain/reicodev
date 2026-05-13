'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { SERVICES } from '@/lib/data';
import styles from './HomeServices.module.css';

// Renders local image or falls back to emoji if the image path is broken
function ServiceIcon({ iconPath, fallback, color }: { iconPath: string; fallback: string; color: string }) {
  return (
    <div className={styles.iconWrap} style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
      <img 
        src={iconPath} 
        alt="service icon" 
        className={styles.iconImg} 
        onError={(e) => {
          // Hide image and show fallback if file is not found
          (e.target as HTMLImageElement).style.display = 'none';
          if (e.currentTarget.nextElementSibling) {
            (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'flex';
          }
        }}
      />
      {/* Hidden by default, shown via the onError handler above */}
      <div className={styles.iconFallback} style={{ display: 'none', fontSize: '24px' }}>
        {fallback}
      </div>
    </div>
  );
}

export default function HomeServices() {
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
    <section className={`section section-dark ${styles.section}`} ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />What We Do</div>
          <h2 className="sec-title">Our Core <span className="sec-accent">Services</span></h2>
          <p className="sec-sub">End-to-end digital solutions to help your brand grow online.</p>
          <div className="sec-line" />
        </div>

        <div className={styles.grid}>
          {SERVICES?.map((s, idx) => (
            <div key={idx} className={`${styles.card} reveal`}>
              <div className={styles.cardTop}>
                <ServiceIcon 
                  iconPath={s.href} 
                  fallback={s.icon} 
                  color={s.color} 
                />
                <span className={styles.label} style={{ color: s.color }}>{s.label}</span>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.desc}>{s.desc}</p>
              </div>

              <div className={styles.cardFoot}>
                <div className={styles.tags}>
                  {s.tags.map(t => (
                    <span key={t} className="tag tag-dim">{t}</span>
                  ))}
                </div>
                <Link href="/services" className={styles.link}>
                  Explore Service
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.cta} reveal`}>
          <Link href="/services" className="btn btn-ghost">View All Services →</Link>
        </div>
      </div>
    </section>
  );
}