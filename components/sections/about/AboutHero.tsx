'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { STATS } from '@/lib/data';
import styles from './AboutHero.module.css';

const FEATURE_KEYS = [
  { icon: '🎯', titleKey: 'value1Title', subKey: 'value1Description' },
  { icon: '⚡', titleKey: 'value2Title', subKey: 'value2Description' },
  { icon: '🚀', titleKey: 'value3Title', subKey: 'value3Description' },
  { icon: '🤝', titleKey: 'value4Title', subKey: 'value4Description' },
];

export default function AboutHero() {
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
    <section className={styles.hero} ref={ref}>
      <div className={`${styles.orb} ${styles.orb1}`} aria-hidden />
      <div className={`${styles.orb} ${styles.orb2}`} aria-hidden />

      <div className={`container ${styles.inner}`}>

        {/* LEFT — text */}
        <div className={`${styles.left} reveal from-left`}>
          <div className="pill" style={{ marginBottom: 20 }}>
            <span className="pill-dot" />{t('sectionLabel')}
          </div>
          <h1 className={styles.h1}>
            {t('heroTitle').split('.').filter(Boolean).map((line, i, arr) => (
              <span key={i}>
                {i === arr.length - 1
                  ? <span className={styles.accent}>{line.trim()}.</span>
                  : <>{line.trim()}.<br /></>
                }
              </span>
            ))}
          </h1>
          <p className={styles.desc}>{t('heroDescription')}</p>
          <div className={styles.sig}>
            <div className={styles.sigName}>{t('founderName')}</div>
            <div className={styles.sigRole}>{t('founderTitle')}</div>
          </div>
          <div className={styles.fiverrStrip}>
            <span className={styles.fiverrLogo}>fiverr</span>
            <span className={styles.fiverrSep} />
            <div className={styles.fiverrStat}>
              <span className={styles.fiverrNum}>{STATS.rating}★</span>
              <span className={styles.fiverrLabel}>Rating</span>
            </div>
            <span className={styles.fiverrSep} />
            <div className={styles.fiverrStat}>
              <span className={styles.fiverrNum}>{STATS.fiverr_orders}</span>
              <span className={styles.fiverrLabel}>Orders</span>
            </div>
            <span className={styles.fiverrSep} />
            <div className={styles.fiverrStat}>
              <span className={styles.fiverrNum}>{STATS.reviews}</span>
              <span className={styles.fiverrLabel}>Reviews</span>
            </div>
          </div>
          <div className={styles.btns}>
            <Link href="/get-a-quote" className="btn btn-primary">{t('ctaPrimary')}</Link>
            <Link href="/services" className="btn btn-ghost">{t('ctaSecondary')}</Link>
          </div>
        </div>

        {/* CENTER — photo */}
        <div className={`${styles.center} reveal`}>
          <div className={styles.photoRing}>
            <div className={styles.photoInner}>
              <div className={styles.photoPlaceholder}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/bilal.jpg"
                  alt="Bilal Hussain — Founder of Reicodev"
                  className={styles.photoImg}
                  data-acf-key="founder_photo"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className={styles.photoFallback}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--c-dim)', opacity: 0.5 }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span style={{ fontSize: 11, color: 'var(--c-dim)', textAlign: 'center', lineHeight: 1.4 }}>
                    Add photo via WordPress<br />
                    <code style={{ fontSize: 10 }}>ACF: founder_photo</code>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.badge}>
            <div className={styles.badgeIcon}>🛡️</div>
            <div>
              <div className={styles.badgeText}>I take care of your project as my own.</div>
            </div>
          </div>

          <div className={styles.miniStats}>
            <div className={styles.miniStat}>
              <span className={styles.miniNum}>{STATS.clients}</span>
              <span className={styles.miniLabel}>{t('stat1Label')}</span>
            </div>
            <div className={styles.miniSep} />
            <div className={styles.miniStat}>
              <span className={styles.miniNum}>{STATS.projects}</span>
              <span className={styles.miniLabel}>{t('stat2Label')}</span>
            </div>
            <div className={styles.miniSep} />
            <div className={styles.miniStat}>
              <span className={styles.miniNum}>{STATS.countries}</span>
              <span className={styles.miniLabel}>{t('stat3Label')}</span>
            </div>
          </div>
        </div>

        {/* RIGHT — features */}
        <div className={`${styles.right} reveal from-right`}>
          {FEATURE_KEYS.map(f => (
            <div key={f.titleKey} className={styles.feat}>
              <div className={styles.featIcon}>{f.icon}</div>
              <div>
                <div className={styles.featTitle}>{t(f.titleKey)}</div>
                <div className={styles.featSub}>{t(f.subKey)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
