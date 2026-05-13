// AboutJourney.tsx
'use client';
import { useEffect, useRef } from 'react';
import styles from './AboutJourney.module.css';

const STEPS = [
  { year:'2013', icon:'💻', title:'The Beginning',      desc:'Received my first laptop through a government scholarship — first step into the digital world.', active:false },
  { year:'2015', icon:'🌐', title:'First Website',      desc:'Self-learned HTML, CSS and PHP from YouTube, then built my first WordPress website.', active:false },
  { year:'2016', icon:'🎓', title:'Final Year Project', desc:'Developed a Career Counselling website to help students discover the right career path.', active:false },
  { year:'2016', icon:'💼', title:'Freelancing Start',  desc:'Started on Fiverr. Completed my first project for $5 — it was more than earnings, it was belief.', active:false },
  { year:'2020', icon:'🔥', title:'Full-Time Focus',    desc:'Left my job and decided to focus entirely on freelancing and building my career independently.', active:false },
  { year:'Today',icon:'🏆', title:'Reicodev',          desc:`${1440}+ projects, 879+ reviews across the globe. Built a team and expanded into SEO and branding.`, active:true },
];

export default function AboutJourney() {
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
        <div className={styles.head}>
          <div className="eyebrow"><span className="eyebrow-line"/>My Story</div>
          <h2 className="sec-title">My <span className="sec-accent">Journey</span></h2>
          <p className={styles.sub}>A self-taught developer&apos;s journey of learning, building, failing, learning again, and never giving up.</p>
        </div>
        <div className={styles.timeline}>
          <div className={styles.line} aria-hidden/>
          {STEPS.map((s, i) => (
            <div key={`${s.year}-${i}`} className={`${styles.step} ${s.active ? styles.active:''} reveal`} style={{ transitionDelay:`${i*0.08}s` }}>
              <div className={styles.iconWrap}>{s.icon}</div>
              <div className={styles.year}>{s.year}</div>
              <div className={styles.title}>{s.title}</div>
              <div className={styles.desc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
