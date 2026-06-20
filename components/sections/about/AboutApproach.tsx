'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

const STEPS_META = [
  { num: '01', icon: '🔍', titleKey: 'approach1Title', descKey: 'approach1Description' },
  { num: '02', icon: '📋', titleKey: 'approach2Title', descKey: 'approach2Description' },
  { num: '03', icon: '⚡', titleKey: 'approach3Title', descKey: 'approach3Description' },
  { num: '04', icon: '💬', titleKey: 'approach4Title', descKey: 'approach4Description' },
  { num: '05', icon: '🚀', titleKey: 'approach5Title', descKey: 'approach5Description' },
];

export default function AboutApproach() {
  const t = useTranslations('about');
  const ref = useRef<HTMLElement>(null);

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
          <div className="eyebrow"><span className="eyebrow-line" />{t('approachSectionLabel')}</div>
          <h2 className="sec-title">
            {t('approachHeading').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="sec-accent">{t('approachHeading').split(' ').slice(-1)}</span>
          </h2>
          <div className="sec-line" />
        </div>
        <div className="process-steps reveal">
          {STEPS_META.map((s, i) => (
            <div key={s.num} className="process-step" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="process-icon">{s.icon}</div>
              <div className="process-num">{s.num}</div>
              <div className="process-title">{t(s.titleKey)}</div>
              <div className="process-desc">{t(s.descKey)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
