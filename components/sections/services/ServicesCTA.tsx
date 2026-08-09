'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export default function ServicesCTA() {
  const ref    = useRef<HTMLElement>(null);
  const t      = useTranslations('services');
  const locale = useLocale();

  const localePath = (href: string) => `/${locale}${href}`;

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
    <section className="section section-dark2" ref={ref}>
      <div className="container">
        <div className="cta-section reveal">
          <div className="cta-orb" style={{ width: 400, height: 400, background: 'rgba(108,75,255,0.13)', top: -150, right: -100 }} aria-hidden />
          <div className="cta-orb" style={{ width: 300, height: 300, background: 'rgba(94,233,255,0.07)', bottom: -100, left: -60 }} aria-hidden />
          <div className="pill" style={{ marginBottom: 18 }}>
            <span className="pill-dot" />{t('ctaSectionLabel')}
          </div>
          <h2 className="cta-title">
            {t('ctaHeadingMain')}
            <br /><span className="sec-accent">{t('ctaHeadingAccent')}</span>
          </h2>
          <p className="cta-sub">{t('ctaSubtitle')}</p>
          <div className="cta-btns">
            <Link href={localePath('/contact')}     className="btn btn-primary btn-lg">{t('ctaPrimary')}</Link>
            <Link href={localePath('/get-a-quote')} className="btn btn-ghost btn-lg">{t('ctaSecondary')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
