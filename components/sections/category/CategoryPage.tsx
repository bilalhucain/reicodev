'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { PROJECTS } from '@/lib/data';
import styles from './CategoryPage.module.css';

interface I18nStrings {
  highlightedCaseStudy: string;
  recentWork:           string;
  toolsHeading:         string;
  advantagesHeading:    string;
  ctaButton:            string;
  viewLiveProject:      string;
}

interface CategoryConfig {
  slug:        string;
  title:       string;
  accent:      string;
  badge:       string;
  description: string;
  stats:       { icon: string; num: string; label: string }[];
  tech:        { icon: string; name: string }[];
  whyUs:       { icon: string; title: string; desc: string }[];
  i18n?:       I18nStrings;
}

interface CategoryPageProps {
  config: CategoryConfig;
}

export default function CategoryPage({ config }: CategoryPageProps) {
  const ref    = useRef<HTMLDivElement>(null);
  const tProj  = useTranslations('projects');
  const tCat   = useTranslations('categories');
  const locale = useLocale();

  const projects = PROJECTS.filter(p => p.category === config.slug);
  const featured = projects.find(p => p.featured) ?? projects[0];

  // i18n strings — use passed-in strings if available, otherwise fall back to tCat
  const i18n: I18nStrings = config.i18n ?? {
    highlightedCaseStudy: tCat(`${config.slug}.highlightedCaseStudy`),
    recentWork:           tCat(`${config.slug}.recentWork`),
    toolsHeading:         tCat(`${config.slug}.toolsHeading`),
    advantagesHeading:    tCat(`${config.slug}.advantagesHeading`),
    ctaButton:            tCat(`${config.slug}.ctaButton`),
    viewLiveProject:      tCat('viewLiveProject'),
  };

  // Eyebrow label e.g. "All WordPress Projects"
  const allProjectsLabel = tCat('allProjectsLabel').replace(
    '{category}',
    config.slug.charAt(0).toUpperCase() + config.slug.slice(1)
  );

  // Button labels
  const startProject  = locale === 'fi' ? 'Aloita projektisi' : 'Start Your Project';
  const freeConsult   = locale === 'fi' ? 'Ilmainen konsultaatio' : 'Free Consultation';
  const techStackLabel = locale === 'fi' ? 'Teknologiapino' : 'Tech Stack';
  const whyChooseLabel = locale === 'fi' ? 'Miksi valita Reicodev' : 'Why Choose Reicodev';
  const featuredLabel  = locale === 'fi' ? 'Esitelty projekti' : 'Featured Project';
  const industryLabel  = tCat('industryLabel');
  const locationLabel  = tCat('locationLabel');
  const liveSiteLabel  = locale === 'fi' ? 'Live-sivusto →' : 'Live Site →';
  const caseStudyLabel = locale === 'fi' ? 'Tapaustutkimus →' : 'Case Study →';

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
    <div ref={ref}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={`${styles.orb} ${styles.orb1}`} aria-hidden />
        <div className={`${styles.orb} ${styles.orb2}`} aria-hidden />
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <div className="pill reveal" style={{ marginBottom: 20 }}>
              <span className="pill-dot" />{config.badge}
            </div>
            <h1 className={`${styles.heroH1} reveal`}>
              {config.title.split(new RegExp(`(${config.accent})`, 'i')).map((part, i) =>
                part.toLowerCase() === config.accent.toLowerCase()
                  ? <span key={i} className="sec-accent">{part}</span>
                  : part
              )}
            </h1>
            <p className={`${styles.heroDesc} reveal`}>{config.description}</p>
            <div className="reveal" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/get-a-quote" className="btn btn-primary btn-lg">{startProject}</Link>
              <Link href="/contact" className="btn btn-ghost btn-lg">{freeConsult}</Link>
            </div>
          </div>
        </div>
        {/* Stats strip */}
        <div className="container" style={{ marginTop: 48 }}>
          <div className="stat-strip reveal" style={{ gridTemplateColumns: `repeat(${config.stats.length},1fr)` }}>
            {config.stats.map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECT ── */}
      {featured && (
        <section className="section section-dark2">
          <div className="container">
            <div className="sec-head reveal">
              <div className="eyebrow"><span className="eyebrow-line" />{featuredLabel}</div>
              <h2 className="sec-title">
                {i18n.highlightedCaseStudy.includes(' ')
                  ? <>
                      {i18n.highlightedCaseStudy.split(' ').slice(0, -2).join(' ')}{' '}
                      <span className="sec-accent">{i18n.highlightedCaseStudy.split(' ').slice(-2).join(' ')}</span>
                    </>
                  : <span className="sec-accent">{i18n.highlightedCaseStudy}</span>
                }
              </h2>
              <div className="sec-line" />
            </div>
            <div className={`${styles.featCard} card reveal`}>
              <div className={styles.featImg}>
                {featured.screenshot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={featured.screenshot}
                    alt={tProj(`${featured.slug}.title`)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', borderRadius: 'var(--r-xl)', display: 'block' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: 'var(--c-bg2)', borderRadius: 'var(--r-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" style={{ opacity: 0.3 }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                    <span style={{ fontSize: 12, color: 'var(--c-dim)' }}>Screenshot coming soon</span>
                  </div>
                )}
              </div>
              <div className={styles.featInfo}>
                <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                  {featured.tags.map((tag, i) => (
                    <span key={tag} className={`tag ${featured.tagColors[i] || 'tag-dim'}`}>{tag}</span>
                  ))}
                </div>
                <h3 className={styles.featTitle}>{tProj(`${featured.slug}.title`)}</h3>
                <p className={styles.featDesc}>{tProj(`${featured.slug}.description`)}</p>
                <div className={styles.featMeta}>
                  <div>
                    <span className={styles.metaLabel}>{industryLabel}</span>
                    <span className={styles.metaVal}>{tProj(`${featured.slug}.categoryLabel`)}</span>
                  </div>
                </div>
                {featured.hasDetailPage
                  ? <Link href={`/our-work/${featured.slug}`} className="btn btn-primary">{caseStudyLabel}</Link>
                  : <a href={featured.liveUrl !== '#' ? featured.liveUrl : undefined} target="_blank" rel="noopener noreferrer" className="btn btn-primary">{i18n.viewLiveProject}</a>
                }
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ALL PROJECTS ── */}
      <section className="section section-dark">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow"><span className="eyebrow-line" />{allProjectsLabel}</div>
            <h2 className="sec-title">
              {i18n.recentWork.includes(' ')
                ? <>
                    {i18n.recentWork.split(' ').slice(0, -1).join(' ')}{' '}
                    <span className="sec-accent">{i18n.recentWork.split(' ').slice(-1)}</span>
                  </>
                : <span className="sec-accent">{i18n.recentWork}</span>
              }
            </h2>
            <div className="sec-line" />
          </div>
          <div className={styles.projGrid}>
            {projects.map((p, i) => (
              <div key={p.slug} className="card proj-card reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="proj-card-img">
                  {p.screenshot ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={p.screenshot}
                      alt={tProj(`${p.slug}.title`)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block', transition: 'transform 0.5s ease' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--c-bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" style={{ opacity: 0.3 }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>
                      <span style={{ fontSize: 10, color: 'var(--c-dim)' }}>Coming soon</span>
                    </div>
                  )}
                </div>
                <div className="proj-card-body">
                  <div className="proj-card-tags">
                    {p.tags.map((tag, ti) => (
                      <span key={tag} className={`tag ${p.tagColors[ti] || 'tag-dim'}`}>{tag}</span>
                    ))}
                  </div>
                  <div className="proj-card-title">{tProj(`${p.slug}.title`)}</div>
                  <div className="proj-card-desc">{tProj(`${p.slug}.description`)}</div>
                  <div className="proj-card-footer">
                    <span className="proj-card-cat">{tProj(`${p.slug}.categoryLabel`)}</span>
                    {p.hasDetailPage
                      ? <Link href={`/our-work/${p.slug}`} className="proj-card-link">{caseStudyLabel}</Link>
                      : <a href={p.liveUrl !== '#' ? p.liveUrl : undefined} target="_blank" rel="noopener noreferrer" className="proj-card-link">{liveSiteLabel}</a>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGIES ── */}
      <section className="section section-dark2">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow"><span className="eyebrow-line" />{techStackLabel}</div>
            <h2 className="sec-title">
              {i18n.toolsHeading.includes('&')
                ? <>{i18n.toolsHeading.split('&')[0].trim()} &amp; <span className="sec-accent">{i18n.toolsHeading.split('&')[1].trim()}</span></>
                : i18n.toolsHeading.split(' ').length > 1
                  ? <>{i18n.toolsHeading.split(' ').slice(0, -1).join(' ')} <span className="sec-accent">{i18n.toolsHeading.split(' ').slice(-1)}</span></>
                  : <span className="sec-accent">{i18n.toolsHeading}</span>
              }
            </h2>
            <div className="sec-line" />
          </div>
          <div className="tech-grid reveal">
            {config.tech.map(t => (
              <div key={t.name} className="tech-item">
                <span className="tech-icon">{t.icon}</span>{t.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section section-dark">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow"><span className="eyebrow-line" />{whyChooseLabel}</div>
            <h2 className="sec-title">
              {i18n.advantagesHeading.split(' ').length > 1
                ? <>{i18n.advantagesHeading.split(' ').slice(0, -1).join(' ')} <span className="sec-accent">{i18n.advantagesHeading.split(' ').slice(-1)}</span></>
                : <span className="sec-accent">{i18n.advantagesHeading}</span>
              }
            </h2>
            <div className="sec-line" />
          </div>
          <div className={styles.whyGrid}>
            {config.whyUs.map((w, i) => (
              <div key={w.title} className="card reveal" style={{ padding: 28, transitionDelay: `${i * 0.08}s` }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{w.icon}</div>
                <h3 style={{ fontSize: 16, fontWeight: 900, color: 'var(--c-txt)', marginBottom: 8 }}>{w.title}</h3>
                <p style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.7 }}>{w.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }} className="reveal">
            <Link href="/get-a-quote" className="btn btn-primary btn-lg">{i18n.ctaButton}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
