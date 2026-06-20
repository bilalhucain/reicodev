'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PROJECTS, STATS, type ProjectCard, type ProjectCategory } from '@/lib/data';
import styles from './OurWorkPage.module.css';

type Filter = 'all' | ProjectCategory;

const CAT_LINKS_META = [
  { img: '/images/home-service-wordpress-icon.svg',   key: 'catLinksWP',       href: '/our-work/wordpress-projects',   color: 'var(--c-p1)',    count: '6' },
  { img: '/images/home-service-woocommerce-icon.svg', key: 'catLinksWoo',      href: '/our-work/woocommerce-projects', color: 'var(--c-green)', count: '3' },
  { img: '/images/home-service-shopify-icon.svg',     key: 'catLinksShopify',  href: '/our-work/shopify-projects',     color: 'var(--c-cyan)',  count: '1' },
  { img: '/images/home-service-seo-icon.svg',         key: 'catLinksSEO',      href: '/our-work/seo-projects',         color: 'var(--c-amber)', count: '3' },
  { img: '/images/home-service-branding-icon.svg',    key: 'catLinksBranding', href: '/our-work/branding-projects',    color: 'var(--c-p2)',    count: '3' },
];

function ProjectImage({ p, title }: { p: ProjectCard; title: string }) {
  if (p.screenshot) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={p.screenshot} alt={title} className={styles.screenshot} loading="lazy" />
    );
  }
  const displayUrl = p.liveUrl !== '#'
    ? p.liveUrl.replace('https://', '').replace('http://', '')
    : p.slug;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div className={styles.screenshotBar}>
        <span className={styles.dot} style={{ background: '#EF4444' }} />
        <span className={styles.dot} style={{ background: '#F59E0B' }} />
        <span className={styles.dot} style={{ background: '#10B981' }} />
        <span className={styles.barUrl}>{displayUrl}</span>
      </div>
      <div className={styles.screenshotContent}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
        </svg>
        <span style={{ fontSize: 11 }}>Screenshot coming soon</span>
      </div>
    </div>
  );
}

export default function OurWorkPage() {
  const t      = useTranslations('ourWork');
  const tProj  = useTranslations('projects');
  const [active, setActive] = useState<Filter>('all');
  const gridRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const FILTERS: { label: string; value: Filter }[] = [
    { label: t('categoryAll'),      value: 'all' },
    { label: t('categoryWP'),       value: 'wordpress' },
    { label: t('categoryWoo'),      value: 'woocommerce' },
    { label: t('categoryShopify'),  value: 'shopify' },
    { label: t('categorySEO'),      value: 'seo' },
    { label: t('categoryBranding'), value: 'branding' },
  ];

  useEffect(() => {
    const els = heroRef.current?.querySelectorAll<HTMLElement>('.reveal-once');
    if (!els) return;
    const obs = new IntersectionObserver(
      e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),
      { threshold: 0.06 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      gridRef.current?.querySelectorAll<HTMLElement>('.reveal').forEach(el => el.classList.add('in'));
    }, 50);
    return () => clearTimeout(timer);
  }, [active]);

  const shown = active === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === active);

  return (
    <div ref={heroRef}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.orb} aria-hidden />
        <div className={`container ${styles.heroInner}`}>
          <div className="pill reveal-once" style={{ display: 'inline-flex', marginBottom: 20 }}>
            <span className="pill-dot" />{t('sectionLabel')}
          </div>
          <h1 className={`${styles.h1} reveal-once`}>
            {STATS.projects} {t('heroTitlePart1')} {STATS.countries} {t('heroTitlePart2')}<br />
            <span className="sec-accent">{t('heroTitleAccent')}</span>
          </h1>
          <p className={`${styles.desc} reveal-once`}>{t('heroDescription')}</p>
          <div className={`stat-strip ${styles.stats} reveal-once`} style={{ gridTemplateColumns: 'repeat(4,1fr)' }}>
            <div className="stat-item"><div className="stat-num">{STATS.projects}</div><div className="stat-label">{t('stat1Label')}</div></div>
            <div className="stat-item"><div className="stat-num">{STATS.clients}</div><div className="stat-label">{t('stat2Label')}</div></div>
            <div className="stat-item"><div className="stat-num">{STATS.reviews}</div><div className="stat-label">{t('stat3Label')}</div></div>
            <div className="stat-item"><div className="stat-num">{STATS.countries}</div><div className="stat-label">{t('stat4Label')}</div></div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY LINKS ── */}
      <section className={styles.catSection}>
        <div className="container">
          <div className={styles.catGrid}>
            {CAT_LINKS_META.map(c => (
              <Link
                key={c.href}
                href={c.href}
                className={`${styles.catCard} reveal-once`}
                style={{ '--accent-color': c.color } as React.CSSProperties}
              >
                <div className={styles.catIcon} style={{ background: `${c.color}18` }}>
                  <img src={c.img} alt={t(c.key)} className={styles.catIconImg} />
                </div>
                <span style={{ fontWeight: 600, fontSize: 14, textAlign: 'center', lineHeight: 1.3 }}>
                  {t(c.key)}
                </span>
                <span className={styles.catCount} style={{ color: c.color }}>
                  {c.count} {t('projectsSuffix')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── ALL PROJECTS ── */}
      <section className={styles.portfolioSection}>
        <div className="container">
          <div className={`${styles.secHead} reveal-once`}>
            <h2 className={styles.secTitle}>{t('allProjectsHeading')}</h2>
            <p className={styles.secDesc}>{t('allProjectsSubtitle')}</p>
          </div>

          {/* Filters */}
          <div className={`${styles.filters} reveal-once`}>
            {FILTERS.map(f => (
              <button
                key={f.value}
                className={`${styles.filterBtn} ${active === f.value ? styles.active : ''}`}
                onClick={() => setActive(f.value)}
                type="button"
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className={styles.projGrid} ref={gridRef}>
            {shown.length === 0 && (
              <div className={styles.noResults}>{t('noResultsMessage')}</div>
            )}
            {shown.map((p, i) => {
              const title = tProj(`${p.slug}.title`);
              return (
                <div
                  key={`${active}-${p.slug}`}
                  className={`${styles.card} card-glow reveal`}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {/* Screenshot */}
                  <div className={styles.cardImg}>
                    <ProjectImage p={p} title={title} />
                    <div className={styles.cardOverlay}>
                      <div className={styles.overlayBtns}>
                        {p.liveUrl && p.liveUrl !== '#' ? (
                          <a
                            href={p.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.overlayBtnGhost}
                            onClick={e => e.stopPropagation()}
                          >
                            {t('visitWebsite')}
                          </a>
                        ) : (
                          <span className={styles.overlayBtnGhost}>{t('viewProject')}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className={styles.cardBody}>
                    <div className={styles.cardCat}>{tProj(`${p.slug}.categoryLabel`)}</div>
                    <div className={styles.cardTitle}>{title}</div>
                    <div className={styles.cardDesc}>{tProj(`${p.slug}.description`)}</div>
                    <div className={styles.cardTags}>
                      {p.tags.map((tag, ti) => (
                        <span key={tag} className={`tag ${p.tagColors[ti] || 'tag-dim'}`}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <div className="container">
          <h2 className={`${styles.ctaTitle} reveal-once`}>
            {t('ctaHeadingMain')} <span className="sec-accent">{t('ctaHeadingAccent')}</span>
          </h2>
          <p className={`${styles.ctaDesc} reveal-once`}>{t('ctaSubtitle')}</p>
          <div className={`${styles.ctaBtns} reveal-once`}>
            <Link href="/get-a-quote" className="btn btn-primary btn-lg">{t('ctaPrimary')}</Link>
            <Link href="/contact" className="btn btn-ghost btn-lg">{t('ctaSecondary')}</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
