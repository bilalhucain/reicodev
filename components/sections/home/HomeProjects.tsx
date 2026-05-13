'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { PROJECTS, type ProjectCard, type ProjectCategory } from '@/lib/data';
import styles from './HomeProjects.module.css';

type Filter = 'all' | ProjectCategory;

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'All Work',    value: 'all' },
  { label: 'WordPress',   value: 'wordpress' },
  { label: 'WooCommerce', value: 'woocommerce' },
  { label: 'Shopify',     value: 'shopify' },
  { label: 'SEO',         value: 'seo' },
  { label: 'Branding',    value: 'branding' },
];

function Card({ p, i, active }: { p: ProjectCard; i: number; active: string }) {
  return (
    <div
      className={`${styles.card} card-glow reveal`}
      style={{ transitionDelay: `${i * 0.05}s` }}
    >
      <div className={styles.cardImg}>
        {p.screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.screenshot}
            alt={p.title}
            className={styles.screenshot}
            loading="lazy"
          />
        ) : (
          <div className={styles.screenshotPlaceholder}>
            <div className={styles.screenshotBar}>
              <span className={styles.dot} style={{ background: '#EF4444' }} />
              <span className={styles.dot} style={{ background: '#F59E0B' }} />
              <span className={styles.dot} style={{ background: '#10B981' }} />
              <span className={styles.barUrl}>
                {p.liveUrl !== '#' ? p.liveUrl.replace('https://', '') : p.slug}
              </span>
            </div>
            <div className={styles.screenshotContent}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35 }}>
                <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
              </svg>
              <span style={{ fontSize: 11, color: 'var(--c-dim)' }}>Screenshot coming soon</span>
            </div>
          </div>
        )}

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
                Visit Website ↗
              </a>
            ) : (
              <span className={styles.overlayBtnGhost}>View Project</span>
            )}
          </div>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardCat}>{p.categoryLabel}</div>
        <div className={styles.cardTitle}>{p.title}</div>
        <div className={styles.cardDesc}>{p.description}</div>
        <div className={styles.cardTags}>
          {p.tags.map((t, ti) => (
            <span key={t} className={`tag ${p.tagColors[ti] || 'tag-dim'}`}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomeProjects() {
  const [active, setActive] = useState<Filter>('all');
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      gridRef.current?.querySelectorAll<HTMLElement>('.reveal').forEach(el => el.classList.add('in'));
    }, 50);
    return () => clearTimeout(timer);
  }, [active]);

  const shown = (
    active === 'all' ? PROJECTS : PROJECTS.filter(p => p.category === active)
  ).slice(0, 3);

  return (
    <section className={`section section-dark2 ${styles.section}`}>
      <div className="container">
        <div className="sec-head">
          <div className="eyebrow"><span className="eyebrow-line" />Portfolio</div>
          <h2 className="sec-title">Recent <span className="sec-accent">Projects</span></h2>
          <p className="sec-sub">
            A selection of work across WordPress, WooCommerce, Shopify, SEO and branding.{' '}
            Browse by category or{' '}
            <Link href="/our-work" style={{ color: 'var(--c-p2)', fontWeight: 600 }}>view everything →</Link>
          </p>
          <div className="sec-line" />
        </div>

        <div className={styles.filters}>
          {FILTERS.map(f => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${active === f.value ? styles.active : ''}`}
              onClick={() => setActive(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.grid} ref={gridRef}>
          {shown.length === 0 && (
            <div className={styles.empty}>No projects in this category yet.</div>
          )}
          {shown.map((p, i) => (
            <Card key={`${active}-${p.slug}`} p={p} i={i} active={active} />
          ))}
        </div>

        <div className={styles.cta}>
          <Link href="/our-work" className="btn btn-primary btn-lg">
            View All Projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
