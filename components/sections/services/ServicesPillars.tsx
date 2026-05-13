// ServicesPillars.tsx
'use client';
import { useEffect, useRef } from 'react';

const PILLARS = [
  { icon:'🌐', color:'var(--c-p1)', label:'Pillar 01', title:'Design & Development', desc:'We create modern, mobile-responsive websites that are built for performance, security and long-term growth.' },
  { icon:'📈', color:'var(--c-amber)', label:'Pillar 02', title:'Visibility & Marketing', desc:'We make sure the right people find you online — search engines, social media and organic traffic strategies.' },
  { icon:'🔧', color:'var(--c-green)', label:'Pillar 03', title:'Fix, Maintain & Optimise', desc:'Ongoing support to keep your website running fast, secure and up-to-date long after launch day.' },
];

export default function ServicesPillars() {
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
          <div className="eyebrow"><span className="eyebrow-line"/>Our Approach</div>
          <h2 className="sec-title">Three Pillars of <span className="sec-accent">Digital Success</span></h2>
          <div className="sec-line"/>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:20 }}>
          {PILLARS.map((p,i) => (
            <div key={p.title} className="card reveal" style={{ padding:32, transitionDelay:`${i*0.08}s` }}>
              <div style={{ width:60,height:60,borderRadius:'var(--r-md)',background:`${p.color}18`,border:`1px solid ${p.color}28`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:28,marginBottom:20 }}>{p.icon}</div>
              <div style={{ fontSize:11,fontWeight:800,color:'var(--c-dim)',letterSpacing:'1.5px',textTransform:'uppercase',marginBottom:8 }}>{p.label}</div>
              <h3 style={{ fontSize:20,fontWeight:900,color:'var(--c-txt)',marginBottom:10,letterSpacing:'-0.3px' }}>{p.title}</h3>
              <p style={{ fontSize:13,color:'var(--c-muted)',lineHeight:1.75 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
