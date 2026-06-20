'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { SERVICES_META } from '@/lib/data';
import styles from './HomeServices.module.css';

const SERVICE_TAGS: Record<string, string[]> = {
  wordpress:   ['WordPress', 'Elementor', 'WP Rocket'],
  woocommerce: ['WooCommerce', 'Stripe', 'ShipStation'],
  seo:         ['On-Page SEO', 'Technical SEO', 'Analytics'],
  branding:    ['Logo Design', 'Brand Guidelines', 'Figma'],
};

function ServiceIcon({ iconPath, fallback, color }: { iconPath: string; fallback: string; color: string }) {
  return (
    <div className={styles.iconWrap} style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
      <img
        src={iconPath}
        alt="service icon"
        className={styles.iconImg}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = 'none';
          const sib = e.currentTarget.nextElementSibling as HTMLElement | null;
          if (sib) sib.style.display = 'flex';
        }}
      />
      <div className={styles.iconFallback} style={{ display: 'none', fontSize: '24px' }}>{fallback}</div>
    </div>
  );
}

export default function HomeServices() {
  const t = useTranslations('home');
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

  const SERVICES_DISPLAY = SERVICES_META.map((s, i) => ({
    ...s,
    category: t(`service${i + 1}Category`),
    title:    t(`service${i + 1}Title`),
    desc:     t(`service${i + 1}Description`),
    tags:     SERVICE_TAGS[s.key] ?? [],
  }));

  return (
    <section className={`section section-dark ${styles.section}`} ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('servicesSectionLabel')}</div>
          <h2 className="sec-title">{t('servicesHeading').split(' ').slice(0, -1).join(' ')} <span className="sec-accent">{t('servicesHeading').split(' ').slice(-1)}</span></h2>
          <p className="sec-sub">{t('servicesSubtitle')}</p>
          <div className="sec-line" />
        </div>

        <div className={styles.grid}>
          {SERVICES_DISPLAY.map((s) => (
            <div key={s.key} className={`${styles.card} reveal`}>
              <div className={styles.cardTop}>
                <ServiceIcon iconPath={s.img} fallback={s.icon} color={s.color} />
                <span className={styles.label} style={{ color: s.color }}>{s.category}</span>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.desc}>{s.desc}</p>
              </div>
              <div className={styles.cardFoot}>
                <div className={styles.tags}>
                  {s.tags.map(tag => <span key={tag} className="tag tag-dim">{tag}</span>)}
                </div>
                <Link href="/services" className={styles.link}>
                  {t('exploreService')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.cta} reveal`}>
          <Link href="/services" className="btn btn-ghost">{t('viewAllServices')}</Link>
        </div>
      </div>
    </section>
  );
}
