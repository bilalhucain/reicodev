// AboutApproach.tsx
'use client';
import { useEffect, useRef } from 'react';

const STEPS = [
  { num:'01', title:'Deep Discovery',         desc:'Before writing a single line of code, I take time to understand your business goals, audience and competition.' },
  { num:'02', title:'Strategic Planning',     desc:'I create a clear roadmap — pages, features, timeline and goals — so there are no surprises during the build.' },
  { num:'03', title:'Clean Development',      desc:'I write clean, well-structured code that is fast, secure and easy to maintain or scale in the future.' },
  { num:'04', title:'Continuous Updates',     desc:'You get daily progress updates throughout the build. No radio silence, no guessing on your end.' },
  { num:'05', title:'Launch & Optimisation',  desc:'I test across all devices, optimise for speed, handle SEO foundations and ensure a flawless launch.' },
];

export default function AboutApproach() {
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
          <div className="eyebrow"><span className="eyebrow-line"/>My Approach</div>
          <h2 className="sec-title">How I Build Every <span className="sec-accent">Project</span></h2>
          <div className="sec-line"/>
        </div>
        <div className="process-steps reveal">
          {STEPS.map((s,i) => (
            <div key={s.num} className="process-step" style={{ transitionDelay:`${i*0.08}s` }}>
              <div className="process-icon">{['🔍','📋','⚡','💬','🚀'][i]}</div>
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
