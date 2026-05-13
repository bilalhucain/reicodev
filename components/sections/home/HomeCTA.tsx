'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function HomeCTA() {
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
        <div className="cta-section reveal">
          <div className="cta-orb" style={{ width:400,height:400,background:'rgba(108,75,255,0.14)',top:-150,right:-100 }} aria-hidden />
          <div className="cta-orb" style={{ width:300,height:300,background:'rgba(94,233,255,0.07)',bottom:-100,left:-80 }} aria-hidden />
          <div className="pill" style={{ marginBottom:20 }}>
            <span className="pill-dot"/>
            Limited spots available
          </div>
          <h2 className="cta-title">
            Ready to Take Your Business<br />
            <span className="sec-accent">to the Next Level?</span>
          </h2>
          <p className="cta-sub">
            Let&apos;s create something extraordinary together. Tell us about your project and we&apos;ll get back to you within 24 hours.
          </p>
          <div className="cta-btns">
            <Link href="/get-a-quote" className="btn btn-primary btn-lg">Start Your Project</Link>
            <Link href="/contact" className="btn btn-ghost btn-lg">Schedule a Call</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
