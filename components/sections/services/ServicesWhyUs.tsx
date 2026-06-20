'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { WHY_CHOOSE_META } from '@/lib/data';

export default function ServicesWhyUs() {
  const ref = useRef<HTMLElement>(null);
  const t   = useTranslations('services');

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('whySectionLabel')}</div>
          <h2 className="sec-title">{t('whyHeading').split('Choose Us')[0]}<span className="sec-accent">Choose Us</span></h2>
          <div className="sec-line" />
        </div>
        <div className="why-us-grid">
          {WHY_CHOOSE_META.map((w, i) => (
            <div key={w.key} className="card reveal" style={{ padding: 26, transitionDelay: `${i * 0.08}s` }}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{w.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 900, color: 'var(--c-txt)', marginBottom: 8 }}>
                {t(`why.${w.key}.title`)}
              </h3>
              <p style={{ fontSize: 12, color: 'var(--c-muted)', lineHeight: 1.7 }}>
                {t(`why.${w.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
