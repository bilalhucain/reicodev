'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { Target, Gauge, SearchCheck, Settings } from 'lucide-react';
import { WHY_CHOOSE_META } from '@/lib/data';

/* Order matches WHY_CHOOSE_META: Conversion-Focused Design, Fast Loading
   Websites, SEO-Ready Structure, Easy To Manage Backend. */
const WHY_ICONS = [Target, Gauge, SearchCheck, Settings];
const WHY_COLORS = ['var(--c-p1)', 'var(--c-amber)', 'var(--c-green)', 'var(--c-p1)'];

export default function ServicesWhyUs() {
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
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('whySectionLabel')}</div>
          <h2 className="sec-title">{t('whyHeadingMain')}<span className="sec-accent">{t('whyHeadingAccent')}</span></h2>
          <div className="sec-line" />
        </div>
        <div className="why-us-grid">
          {WHY_CHOOSE_META.map((w, i) => {
            const Icon = WHY_ICONS[i] ?? Target;
            const color = WHY_COLORS[i] ?? 'var(--c-p1)';
            return (
              <div key={w.key} className="card reveal" style={{ padding: 26, transitionDelay: `${i * 0.08}s` }}>
                <div
                  data-part="icon-wrap"
                  onMouseEnter={handleEnter}
                  onMouseLeave={handleLeave}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 14, willChange: 'transform',
                  }}
                >
                  <Icon size={28} color={color} strokeWidth={2} />
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 900, color: 'var(--c-txt)', marginBottom: 8 }}>
                  {t(`why.${w.key}.title`)}
                </h3>
                <p style={{ fontSize: 12, color: 'var(--c-muted)', lineHeight: 1.7 }}>
                  {t(`why.${w.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
