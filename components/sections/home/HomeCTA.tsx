'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HomeCTA() {
  const t = useTranslations('home');
  const sectionRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section) return;

    if (reduced) return; // everything renders in its natural, settled state

    const ctx = gsap.context(() => {
      // Entrance — cascades once, the moment the section is ~75% into view.
      gsap.set([pillRef.current, titleRef.current, subRef.current], { opacity: 0, y: 22 });
      gsap.set(btnsRef.current, { opacity: 0, y: 16, scale: 0.96 });

      ScrollTrigger.create({
        trigger: section,
        start: 'top 75%',
        once: true,
        onEnter: () => {
          gsap.timeline({ defaults: { ease: 'power3.out' } })
            .to(pillRef.current, { opacity: 1, y: 0, duration: 0.5 })
            .to(titleRef.current, { opacity: 1, y: 0, duration: 0.65 }, '-=0.3')
            .to(subRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.4')
            .to(btnsRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: 'back.out(1.6)' }, '-=0.25');
        },
      });

      // Parallax — the two ambient orbs drift at different speeds as you
      // scroll through the section, a cheap but effective sense of depth.
      gsap.to(orb1Ref.current, {
        y: 70,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
      gsap.to(orb2Ref.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-dark" ref={sectionRef}>
      <div className="container">
        <div className="cta-section">
          <div ref={orb1Ref} className="cta-orb" style={{ width: 400, height: 400, background: 'rgba(108,75,255,0.14)', top: -150, right: -100 }} aria-hidden />
          <div ref={orb2Ref} className="cta-orb" style={{ width: 300, height: 300, background: 'rgba(94,233,255,0.07)', bottom: -100, left: -80 }} aria-hidden />
          <div ref={pillRef} className="pill" style={{ marginBottom: 20 }}>
            <span className="pill-dot" />{t('ctaSectionLabel')}
          </div>
          <h2 ref={titleRef} className="cta-title">
            {t('ctaHeading').split('?')[0]}?<br />
            <span className="sec-accent">{t('ctaHeadingAccent')}</span>
          </h2>
          <p ref={subRef} className="cta-sub">{t('ctaSubtitle')}</p>
          <div ref={btnsRef} className="cta-btns">
            <Link href="/get-a-quote" className="btn btn-primary btn-lg">{t('ctaPrimary')}</Link>
            <Link href="/contact" className="btn btn-ghost btn-lg">{t('ctaSecondary')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
