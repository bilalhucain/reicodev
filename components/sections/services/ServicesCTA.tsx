'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function ServicesCTA() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),{ threshold:0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  },[]);
  return (
    <section className="section section-dark2" ref={ref}>
      <div className="container">
        <div className="cta-section reveal">
          <div className="cta-orb" style={{ width:400,height:400,background:'rgba(108,75,255,0.13)',top:-150,right:-100 }} aria-hidden/>
          <div className="cta-orb" style={{ width:300,height:300,background:'rgba(94,233,255,0.07)',bottom:-100,left:-60 }} aria-hidden/>
          <div className="pill" style={{ marginBottom:18 }}><span className="pill-dot"/>Not sure which service you need?</div>
          <h2 className="cta-title">Let&apos;s Find the Perfect Solution<br/><span className="sec-accent">for Your Business</span></h2>
          <p className="cta-sub">Share your goals and we&apos;ll recommend the best approach. Free consultation, no commitment.</p>
          <div className="cta-btns">
            <Link href="/contact" className="btn btn-primary btn-lg">Book a Free Call</Link>
            <Link href="/get-a-quote" className="btn btn-ghost btn-lg">Get a Quote</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
