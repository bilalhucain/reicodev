// ServicesWhyUs.tsx
'use client';
import { useEffect, useRef } from 'react';
import { WHY_CHOOSE } from '@/lib/data';

export default function ServicesWhyUs() {
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
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line"/>Why Reicodev</div>
          <h2 className="sec-title">Why Clients <span className="sec-accent">Choose Us</span></h2>
          <div className="sec-line"/>
        </div>
        <div className="why-us-grid">
          {WHY_CHOOSE.map((w,i) => (
            <div key={w.title} className="card reveal" style={{ padding:26, transitionDelay:`${i*0.08}s` }}>
              <div style={{ fontSize:28, marginBottom:14 }}>{w.icon}</div>
              <h3 style={{ fontSize:15, fontWeight:900, color:'var(--c-txt)', marginBottom:8 }}>{w.title}</h3>
              <p style={{ fontSize:12, color:'var(--c-muted)', lineHeight:1.7 }}>{w.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
