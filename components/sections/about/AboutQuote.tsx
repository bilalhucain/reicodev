'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function AboutQuote() {
  const t = useTranslations('about');
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
    <section className="section section-dark2" ref={ref}>
      <div className="container">
        <div className="cta-section reveal" style={{ maxWidth: 800, margin: '0 auto' }}>
          <div
            className="cta-orb"
            style={{ width: 400, height: 400, background: 'rgba(108,75,255,0.14)', top: -180, right: -100 }}
            aria-hidden
          />
          <div style={{
            fontSize: 60, color: 'var(--c-p1)', opacity: 0.4,
            fontFamily: 'Georgia,serif', lineHeight: 1, marginBottom: 16,
            position: 'relative', zIndex: 1
          }}>
            &ldquo;
          </div>
          <h2 style={{
            fontSize: 'clamp(22px,3.5vw,34px)', fontWeight: 900, color: 'var(--c-txt)',
            letterSpacing: '-1.2px', lineHeight: 1.3, maxWidth: 600,
            margin: '0 auto 16px', position: 'relative', zIndex: 1
          }}>
            {t('quoteText')}
          </h2>
          <p style={{ fontSize: 14, color: 'var(--c-dim)', position: 'relative', zIndex: 1, marginBottom: 28 }}>
            {t('quoteAuthor')}
          </p>
          <div style={{
            display: 'flex', gap: 12, justifyContent: 'center',
            flexWrap: 'wrap', position: 'relative', zIndex: 1
          }}>
            <Link href="/get-a-quote" className="btn btn-primary btn-lg">{t('quoteCta1')}</Link>
            <Link href="/contact" className="btn btn-ghost btn-lg">{t('quoteCta2')}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
