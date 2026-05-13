'use client';
import { useEffect, useRef } from 'react';
import { TESTIMONIALS } from '@/lib/data';
import styles from './HomeTestimonials.module.css';

export default function HomeTestimonials() {
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
          <div className="eyebrow"><span className="eyebrow-line"/>Testimonials</div>
          <h2 className="sec-title">What Our Clients <span className="sec-accent">Say</span></h2>
          <p className="sec-sub">Real results from real businesses we&apos;ve helped grow online — 879+ five-star reviews.</p>
          <div className="sec-line"/>
        </div>
        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`card testi-card reveal`} style={{ transitionDelay:`${i*0.08}s` }}>
              <div className="testi-stars">{'★'.repeat(t.rating)}</div>
              <p className="testi-text">&ldquo;{t.text}&rdquo;</p>
              <div className="testi-author">
                <div className="testi-avatar">{t.initials}</div>
                <div>
                  <div className="testi-name">{t.name}</div>
                  <div className="testi-role">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
