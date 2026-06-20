'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

const PILLARS_META = [
  { icon: '🌐', color: 'var(--c-p1)',   labelKey: 'pillar1Label', titleKey: 'pillar1Title', descKey: 'pillar1Description' },
  { icon: '📈', color: 'var(--c-amber)', labelKey: 'pillar2Label', titleKey: 'pillar2Title', descKey: 'pillar2Description' },
  { icon: '🔧', color: 'var(--c-green)', labelKey: 'pillar3Label', titleKey: 'pillar3Title', descKey: 'pillar3Description' },
];

export default function ServicesPillars() {
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
    <section className="section section-dark2" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('pillarsSectionLabel')}</div>
          <h2 className="sec-title">{t('pillarsHeading').split('Digital Success')[0]}<span className="sec-accent">Digital Success</span></h2>
          <div className="sec-line" />
        </div>
        <div className="pillars-grid">
          {PILLARS_META.map((p, i) => (
            <div key={p.titleKey} className="card reveal" style={{ padding: 32, transitionDelay: `${i * 0.08}s` }}>
              <div style={{ width: 60, height: 60, borderRadius: 'var(--r-md)', background: `${p.color}18`, border: `1px solid ${p.color}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, marginBottom: 20 }}>
                {p.icon}
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--c-dim)', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 8 }}>
                {t(p.labelKey)}
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 900, color: 'var(--c-txt)', marginBottom: 10, letterSpacing: '-0.3px' }}>
                {t(p.titleKey)}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.75 }}>
                {t(p.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
