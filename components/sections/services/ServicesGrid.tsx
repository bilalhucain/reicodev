'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import styles from './ServicesGrid.module.css';

// Only non-text data lives here — text comes from translations
const SERVICES_META = [
  { id: 'wordpress',   img: '/images/home-service-wordpress-icon.svg',   alt: 'WordPress',   color: '#6C4BFF', badge: true,  titleKey: 's1Title', descKey: 's1Description', features: ['s1f1','s1f2','s1f3','s1f4','s1f5','s1f6'] },
  { id: 'woocommerce', img: '/images/home-service-woocommerce-icon.svg', alt: 'WooCommerce', color: '#10B981', badge: false, titleKey: 's2Title', descKey: 's2Description', features: ['s2f1','s2f2','s2f3','s2f4','s2f5','s2f6'] },
  { id: 'shopify',     img: '/images/home-service-shopify-icon.svg',     alt: 'Shopify',     color: '#5EE9FF', badge: false, titleKey: 's3Title', descKey: 's3Description', features: ['s3f1','s3f2','s3f3','s3f4','s3f5','s3f6'] },
  { id: 'bug-fixes',   img: '/images/service-bug-fix-icon.svg',          alt: 'Bug Fix',     color: '#F59E0B', badge: false, titleKey: 's4Title', descKey: 's4Description', features: ['s4f1','s4f2','s4f3','s4f4','s4f5','s4f6'] },
  { id: 'maintenance', img: '/images/service-maintenance-icon.svg',      alt: 'Maintenance', color: '#8B5CFF', badge: false, titleKey: 's5Title', descKey: 's5Description', features: ['s5f1','s5f2','s5f3','s5f4','s5f5','s5f6'] },
  { id: 'speed',       img: '/images/service-speed-icon.svg',            alt: 'Speed',       color: '#EF4444', badge: false, titleKey: 's6Title', descKey: 's6Description', features: ['s6f1','s6f2','s6f3','s6f4','s6f5','s6f6'] },
  { id: 'seo',         img: '/images/home-service-seo-icon.svg',         alt: 'SEO',         color: '#F59E0B', badge: false, titleKey: 's7Title', descKey: 's7Description', features: ['s7f1','s7f2','s7f3','s7f4','s7f5','s7f6'] },
  { id: 'branding',    img: '/images/home-service-branding-icon.svg',    alt: 'Branding',    color: '#8B5CFF', badge: false, titleKey: 's8Title', descKey: 's8Description', features: ['s8f1','s8f2','s8f3','s8f4','s8f5','s8f6'] },
];

export default function ServicesGrid() {
  const ref    = useRef<HTMLElement>(null);
  const t      = useTranslations('services');
  const locale = useLocale();

  const localePath = (href: string) => `/${locale}${href}`;

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),
      { threshold: 0.06 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className={`section section-dark ${styles.section}`} ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('coreSectionLabel')}</div>
          <h2 className="sec-title">{t('coreHeading').split('Core Services')[0]}<span className="sec-accent">Core Services</span></h2>
          <p className="sec-sub">{t('coreSubtitle')}</p>
          <div className="sec-line" />
        </div>
        <div className={styles.grid}>
          {SERVICES_META.map((s, i) => (
            <div key={s.id} id={s.id} className={`card ${styles.card} reveal`} style={{ transitionDelay: `${i * 0.06}s` }}>
              <div className={styles.cardBody}>
                {s.badge && <div className={styles.badge}>{t('mostPopular')}</div>}
                <div className={styles.iconWrap} style={{ background: `${s.color}18`, border: `1px solid ${s.color}28` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt={s.alt} className={styles.iconImg} />
                </div>
                <h3 className={styles.title}>{t(s.titleKey)}</h3>
                <p className={styles.desc}>{t(s.descKey)}</p>
                <ul className={styles.includes}>
                  {s.features.map(fk => (
                    <li key={fk} className={styles.includeItem}>
                      <span className={styles.check}>✓</span>{t(fk)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.cardFoot}>
                <Link href={localePath('/get-a-quote')} className="btn btn-primary btn-sm">
                  {t('getQuote')}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
