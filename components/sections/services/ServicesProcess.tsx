// ServicesProcess.tsx
'use client';
import { useEffect, useRef } from 'react';
import { PROCESS_STEPS } from '@/lib/data';

export default function ServicesProcess() {
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
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line"/>How We Work</div>
          <h2 className="sec-title">Our Simple <span className="sec-accent">Process</span></h2>
          <p className="sec-sub">We follow a streamlined process to deliver your project efficiently — without compromising quality.</p>
          <div className="sec-line"/>
        </div>
        <div className="process-steps reveal">
          {PROCESS_STEPS.map((s,i) => (
            <div key={s.num} className="process-step" style={{ transitionDelay:`${i*0.08}s` }}>
              <div className="process-icon">{s.icon}</div>
              <div className="process-num">{s.num}</div>
              <div className="process-title">{s.title}</div>
              <div className="process-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
