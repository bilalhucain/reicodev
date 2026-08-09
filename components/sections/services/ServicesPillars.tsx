'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { MonitorSmartphone, SearchCheck, Settings } from 'lucide-react';

const PILLARS_META = [
  { icon: MonitorSmartphone, color: 'var(--c-p1)',    labelKey: 'pillar1Label', titleKey: 'pillar1Title', descKey: 'pillar1Description' },
  { icon: SearchCheck,       color: 'var(--c-amber)',  labelKey: 'pillar2Label', titleKey: 'pillar2Title', descKey: 'pillar2Description' },
  { icon: Settings,          color: 'var(--c-green)',  labelKey: 'pillar3Label', titleKey: 'pillar3Title', descKey: 'pillar3Description' },
];

export default function ServicesPillars() {
  const ref = useRef<HTMLElement>(null);
  const t   = useTranslations('services');

  useEffect(() => {
    const section = ref.current;
    const els = section?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const obs = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        if (reduced) return;
        const icon = entry.target.querySelector<HTMLElement>('[data-part="icon-wrap"]');
        if (icon) {
          gsap.fromTo(
            icon,
            { scale: 0.6, rotate: -10, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.55, ease: 'back.out(2)' }
          );
        }
      }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));

    // Subtle continuous float on the icon wrappers — cheap, GPU-only transform
    let floatTweens: gsap.core.Tween[] = [];
    if (!reduced && section) {
      const icons = section.querySelectorAll<HTMLElement>('[data-part="icon-wrap"]');
      floatTweens = Array.from(icons).map((el, i) =>
        gsap.to(el, {
          y: -4,
          duration: 2.4 + i * 0.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: i * 0.15,
        })
      );
    }

    return () => {
      obs.disconnect();
      floatTweens.forEach(tw => tw.kill());
    };
  }, []);

  const handleEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { scale: 1.08, rotate: 4, duration: 0.25, ease: 'power2.out' });
  };
  const handleLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
  };

  return (
    <section className="section section-dark2" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('pillarsSectionLabel')}</div>
          <h2 className="sec-title">{t('pillarsHeadingMain')}<span className="sec-accent">{t('pillarsHeadingAccent')}</span></h2>
          <div className="sec-line" />
        </div>
        <div className="pillars-grid">
          {PILLARS_META.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={p.titleKey} className="card reveal" style={{ padding: 32, transitionDelay: `${i * 0.08}s` }}>
                <div
                  data-part="icon-wrap"
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                  style={{
                    width: 60, height: 60, borderRadius: 'var(--r-md)',
                    background: `${p.color}18`, border: `1px solid ${p.color}28`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20, willChange: 'transform',
                  }}
                >
                  <Icon size={28} color={p.color} strokeWidth={2} />
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
