'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function HomeCTA() {
  const t = useTranslations('home');
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className="cta-section reveal">
          <div className="cta-orb" style={{ width:400, height:400, background:'rgba(108,75,255,0.14)', top:-150, right:-100 }} aria-hidden />
          <div className="cta-orb" style={{ width:300, height:300, background:'rgba(94,233,255,0.07)', bottom:-100, left:-80 }} aria-hidden />
          <div className="pill" style={{ marginBottom: 20 }}>
            <span className="pill-dot" />{t('ctaSectionLabel')}
          </div>
          <h2 className="cta-title">
            {t('ctaHeading').split('?')[0]}?<br />
            <span className="sec-accent">{t('ctaHeadingAccent')}</span>
          </h2>
          <p className="cta-sub">{t('ctaSubtitle')}</p>
          <div className="cta-btns">
            <Link href="/get-a-quote" className="btn btn-primary btn-lg">{t('ctaPrimary')}</Link>
            <Link href="/contact" className="btn btn-ghost btn-lg">{t('ctaSecondary')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
