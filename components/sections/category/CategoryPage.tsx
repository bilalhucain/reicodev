'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { gsap } from 'gsap';
import {
  Globe, Earth, Zap, BadgeCheck, LayoutTemplate, Rocket, ListTree,
  ShieldCheck, Mail, Database, FileCode2, Gauge, Image as ImageIcon,
  SearchCheck, ShoppingCart, Target, Smartphone, Lock,
  CreditCard, Package, Star, BarChart3, Tag, ShoppingBag, Palette,
  RefreshCw, TrendingUp, KeyRound, Search, Microscope, ClipboardList,
  Trophy, Link2, FileText, Map, Network, ListChecks, Leaf, Monitor,
  Type, Brain, Ruler, Settings,
  type LucideIcon,
} from 'lucide-react';
import { PROJECTS, type ProjectCategory } from '@/lib/data';
import CategoryProjects from './CategoryProjects';
import styles from './CategoryPage.module.css';

/* Semantic icon keys → Lucide components. Config files pass a key string
   (e.g. "rocket") rather than a component, since this data also travels
   through Server Components where raw component references can't cross
   the boundary. Add new keys here as new category pages need them. */
const ICON_MAP: Record<string, LucideIcon> = {
  globe: Globe,
  earth: Earth,
  zap: Zap,
  'badge-check': BadgeCheck,
  'layout-template': LayoutTemplate,
  rocket: Rocket,
  'list-tree': ListTree,
  'shield-check': ShieldCheck,
  mail: Mail,
  database: Database,
  'file-code': FileCode2,
  gauge: Gauge,
  image: ImageIcon,
  'search-check': SearchCheck,
  'shopping-cart': ShoppingCart,
  target: Target,
  smartphone: Smartphone,
  lock: Lock,
  'credit-card': CreditCard,
  package: Package,
  star: Star,
  'bar-chart': BarChart3,
  tag: Tag,
  'shopping-bag': ShoppingBag,
  palette: Palette,
  'refresh-cw': RefreshCw,
  'trending-up': TrendingUp,
  key: KeyRound,
  search: Search,
  microscope: Microscope,
  'clipboard-list': ClipboardList,
  trophy: Trophy,
  link: Link2,
  'file-text': FileText,
  map: Map,
  network: Network,
  'list-checks': ListChecks,
  leaf: Leaf,
  monitor: Monitor,
  type: Type,
  brain: Brain,
  ruler: Ruler,
  settings: Settings,
};
const iconFor = (key: string): LucideIcon => ICON_MAP[key] ?? Globe;

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
    const section = ref.current;
    const els = section?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const obs = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        if (reduced) return;
        const icons = entry.target.querySelectorAll<HTMLElement>('[data-part="icon-wrap"]');
        if (icons.length) {
          gsap.fromTo(
            icons,
            { scale: 0.6, rotate: -10, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.05 }
          );
        }
      }),
      { threshold: 0.06 }
    );
    els.forEach(el => obs.observe(el));

    // Subtle continuous float — cheap, GPU-only transform
    let floatTweens: gsap.core.Tween[] = [];
    if (!reduced && section) {
      const icons = section.querySelectorAll<HTMLElement>('[data-part="icon-wrap"]');
      floatTweens = Array.from(icons).map((el, i) =>
        gsap.to(el, {
          y: -3,
          duration: 2.4 + (i % 12) * 0.12,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: (i % 12) * 0.08,
        })
      );
    }

    return () => {
      obs.disconnect();
      floatTweens.forEach(tw => tw.kill());
    };
  }, []);

  const handleIconEnter = (e: React.MouseEvent<HTMLElement>) => {
    const icon = e.currentTarget.querySelector<HTMLElement>('[data-part="icon-wrap"]');
    if (icon) gsap.to(icon, { scale: 1.12, rotate: 6, duration: 0.25, ease: 'power2.out' });
  };
  const handleIconLeave = (e: React.MouseEvent<HTMLElement>) => {
    const icon = e.currentTarget.querySelector<HTMLElement>('[data-part="icon-wrap"]');
    if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
  };

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
            {config.stats.map(s => {
              const Icon = iconFor(s.icon);
              return (
                <div key={s.label} className="stat-item">
                  <div
                    className="stat-icon"
                    data-part="icon-wrap"
                    onMouseEnter={handleIconEnter}
                    onMouseLeave={handleIconLeave}
                    style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', willChange: 'transform' }}
                  >
                    <Icon size={22} color="var(--c-p1)" strokeWidth={2} />
                  </div>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              );
            })}
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

          <CategoryProjects
            category={config.slug as ProjectCategory}
            ctaLabel={i18n.ctaButton}
          />
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
            {config.tech.map(t => {
              const Icon = iconFor(t.icon);
              return (
                <div key={t.name} className="tech-item" onMouseEnter={handleIconEnter} onMouseLeave={handleIconLeave}>
                  <span className="tech-icon" data-part="icon-wrap" style={{ display: 'inline-flex', alignItems: 'center', willChange: 'transform' }}>
                    <Icon size={18} color="var(--c-p1)" strokeWidth={2} />
                  </span>
                  {t.name}
                </div>
              );
            })}
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
            {config.whyUs.map((w, i) => {
              const Icon = iconFor(w.icon);
              return (
                <div
                  key={w.title}
                  className="card reveal"
                  style={{ padding: 28, transitionDelay: `${i * 0.08}s` }}
                  onMouseEnter={handleIconEnter}
                  onMouseLeave={handleIconLeave}
                >
                  <div data-part="icon-wrap" style={{ display: 'inline-flex', marginBottom: 12, willChange: 'transform' }}>
                    <Icon size={28} color="var(--c-p1)" strokeWidth={2} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 900, color: 'var(--c-txt)', marginBottom: 8 }}>{w.title}</h3>
                  <p style={{ fontSize: 13, color: 'var(--c-muted)', lineHeight: 1.7 }}>{w.desc}</p>
                </div>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }} className="reveal">
            <Link href="/get-a-quote" className="btn btn-primary btn-lg">{i18n.ctaButton}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
