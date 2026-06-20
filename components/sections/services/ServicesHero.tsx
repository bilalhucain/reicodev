'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { STATS } from '@/lib/data';

export default function ServicesHero() {
  const ref = useRef<HTMLElement>(null);
  const t   = useTranslations('services');
  const locale = useLocale();

  const localePath = (href: string) => `/${locale}${href}`;

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),
      { threshold: 0.08 }
    );
    els.forEach(el => { obs.observe(el); setTimeout(() => el.classList.add('in'), 100); });
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ background: 'var(--c-bg)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }} ref={ref}>
      <div style={{ position: 'absolute', width: 500, height: 500, borderRadius: '50%', background: 'rgba(108,75,255,0.14)', filter: 'blur(120px)', top: -200, right: -120, pointerEvents: 'none' }} />
      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <div className="pill reveal" style={{ marginBottom: 20, display: 'inline-flex' }}>
          <span className="pill-dot" />{t('sectionLabel')}
        </div>
        <h1 className="sec-title reveal" style={{ fontSize: 'clamp(38px,6vw,58px)', marginBottom: 18 }}>
          {t('heroTitle').split('to Win Online')[0]}
          <br /><span className="sec-accent">to Win Online</span>
        </h1>
        <p className="sec-sub reveal" style={{ fontSize: 17, marginBottom: 32 }}>
          {t('heroDescription')}
        </p>
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }} className="reveal">
          <Link href={localePath('/get-a-quote')} className="btn btn-primary btn-lg">{t('heroCtaPrimary')}</Link>
          <Link href={localePath('/our-work')}    className="btn btn-ghost btn-lg">{t('heroCtaSecondary')}</Link>
        </div>
        <div className="stat-strip reveal" style={{ gridTemplateColumns: 'repeat(4,1fr)', marginTop: 52 }}>
          <div className="stat-item"><div className="stat-num">{STATS.projects}</div><div className="stat-label">{t('stat1Label')}</div></div>
          <div className="stat-item"><div className="stat-num">{STATS.clients}</div><div className="stat-label">{t('stat2Label')}</div></div>
          <div className="stat-item"><div className="stat-num">{STATS.countries}</div><div className="stat-label">{t('stat3Label')}</div></div>
          <div className="stat-item"><div className="stat-num">{STATS.years}</div><div className="stat-label">{t('stat4Label')}</div></div>
        </div>
      </div>
    </section>
  );
}
