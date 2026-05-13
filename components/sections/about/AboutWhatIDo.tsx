'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './AboutWhatIDo.module.css';

const SERVICES = [
  {
    icon:'🌐', color:'var(--c-p1)',
    title:'WordPress Development',
    items:['Custom WordPress Websites','Landing Pages That Convert','Speed & Performance Optimization','Secure & Scalable Solutions'],
  },
  {
    icon:'🛒', color:'var(--c-green)',
    title:'WooCommerce Development',
    items:['WooCommerce Stores','Custom Checkout Solutions','Product Management','Payment & Shipping Integration'],
  },
  {
    icon:'📈', color:'var(--c-amber)',
    title:'SEO & Branding',
    note:'(Our Team)',
    items:['SEO Strategy & Optimization','On-Page & Technical SEO','Brand Identity Design','Logo, Guidelines & More'],
  },
];

export default function AboutWhatIDo() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),{ threshold:0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  },[]);

  return (
    <section className="section section-dark2" ref={ref}>
      <div className="container">
        <div className={styles.inner}>
          <div className={`${styles.left} reveal from-left`}>
            <div className="eyebrow"><span className="eyebrow-line"/>What I Do</div>
            <h2 className="sec-title" style={{ textAlign:'left',margin:0 }}>Complete Digital Solutions<br/><span className="sec-accent">for Your Business Growth</span></h2>
            <p style={{ fontSize:14,color:'var(--c-dim)',lineHeight:1.75,marginTop:14,maxWidth:380 }}>
              At Reicodev, I provide end-to-end digital solutions. While I personally handle WordPress and WooCommerce, I have a dedicated team for SEO and branding to deliver the best results.
            </p>
            <Link href="/services" className="btn btn-primary" style={{ marginTop:24 }}>Explore My Services →</Link>
          </div>
          <div className={styles.right}>
            {SERVICES.map((s, i) => (
              <div key={s.title} className={`card ${styles.card} reveal`} style={{ transitionDelay:`${i*0.08}s` }}>
                <div className={styles.cardHead}>
                  <div className={styles.cardIcon} style={{ background:`${s.color}18`,border:`1px solid ${s.color}28` }}>{s.icon}</div>
                  <div>
                    <div className={styles.cardTitle}>{s.title} {s.note && <span className={styles.cardNote}>{s.note}</span>}</div>
                  </div>
                </div>
                <ul className={styles.cardList}>
                  {s.items.map(it => (
                    <li key={it} className={styles.cardItem}>
                      <span className={styles.cardCheck} style={{ color:s.color }}>✓</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
