'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { PROCESS_STEPS_META } from '@/lib/data';

export default function HomeProcess() {
  const t = useTranslations('home');
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
    <section className="section section-dark2" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('processSectionLabel')}</div>
          <h2 className="sec-title">{t('processHeading').split(' ').slice(0, -1).join(' ')} <span className="sec-accent">{t('processHeading').split(' ').slice(-1)}</span></h2>
          <p className="sec-sub">{t('processSubtitle')}</p>
          <div className="sec-line" />
        </div>
        <div className="process-steps reveal">
          {PROCESS_STEPS_META.map((s, i) => (
            <div key={s.num} className="process-step" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="process-icon">{s.icon}</div>
              <div className="process-num">{s.num}</div>
              <div className="process-title">{t(`process.${s.key}.title`)}</div>
              <div className="process-desc">{t(`process.${s.key}.desc`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
