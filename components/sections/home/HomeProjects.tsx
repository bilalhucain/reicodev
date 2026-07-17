'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PROJECTS, type ProjectCategory } from '@/lib/data';
import styles from './HomeProjects.module.css';

type Filter = 'all' | ProjectCategory;

const AUTO_INTERVAL = 12000;
const DRAG_THRESHOLD = 60; // px drag needed to trigger slide

export default function HomeProjects() {
  const t     = useTranslations('home');
  const tProj = useTranslations('projects');

  const [active, setActive]               = useState<Filter>('all');
  const [cur, setCur]                     = useState(0);
  const [infoPanelVisible, setInfoPanelVisible] = useState(true);
  const [infoPanelKey, setInfoPanelKey]   = useState(0);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);

  // ── GSAP entrance (purely additive — nothing above ever depends on
  // this loading; if it fails for any reason the section still
  // renders normally via plain CSS/React, just without the flourish). ──
  const sectionRef     = useRef<HTMLElement>(null);
  const carouselRowRef = useRef<HTMLDivElement>(null);
  const enteredRef     = useRef(false);

  useEffect(() => {
    let alive = true;
    let io: IntersectionObserver | null = null;

    (async () => {
      try {
        const gsapMod = await import('gsap');
        const gsap = gsapMod.gsap ?? gsapMod.default;
        if (!alive) return;

        const el = sectionRef.current;
        if (!el) return;

        io = new IntersectionObserver(
          entries => {
            if (!entries[0]?.isIntersecting || enteredRef.current) return;
            enteredRef.current = true;

            const slots = carouselRowRef.current
              ? Array.from(carouselRowRef.current.getElementsByClassName(styles.cardSlot))
              : [];

            if (slots.length) {
              gsap.fromTo(
                slots,
                { opacity: 0, y: 46, scale: 0.92 },
                { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12 }
              );
            }

            const rest = el.querySelectorAll('.sec-head, .' + styles.filters + ', .' + styles.navRow + ', .' + styles.cta);
            if (rest.length) {
              gsap.fromTo(
                rest,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08 }
              );
            }

            io?.disconnect();
          },
          { threshold: 0.15 }
        );
        io.observe(el);
      } catch {
        // GSAP failed to load — no problem, the section is already
        // fully visible via normal CSS, just without the entrance motion.
      }
    })();

    return () => { alive = false; io?.disconnect(); };
  }, []);

  const FILTERS: { label: string; value: Filter }[] = [
    { label: t('portfolioFilterAll'),      value: 'all' },
    { label: 'WordPress',                  value: 'wordpress' },
    { label: 'WooCommerce',                value: 'woocommerce' },
    { label: 'Shopify',                    value: 'shopify' },
    { label: 'SEO',                        value: 'seo' },
    { label: t('portfolioFilterBranding'), value: 'branding' },
  ];

  const shown = active === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === active);

  useEffect(() => {
    setCur(0);
    setInfoPanelKey(k => k + 1);
    setInfoPanelVisible(true);
  }, [active]);

  const fadePanel = useCallback(() => {
    setInfoPanelVisible(false);
    setTimeout(() => { setInfoPanelVisible(true); setInfoPanelKey(k => k + 1); }, 700);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (idx === cur) return;
    fadePanel();
    setCur(idx);
  }, [cur, fadePanel]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCur(c => {
        const next = (c + 1) % shown.length;
        fadePanel();
        return next;
      });
    }, AUTO_INTERVAL);
  }, [shown.length, fadePanel]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const safeIdx = (i: number) => ((i % shown.length) + shown.length) % shown.length;
  const prevIdx = safeIdx(cur - 1);
  const nextIdx = safeIdx(cur + 1);

  const handlePrev = useCallback(() => { goTo(prevIdx); resetTimer(); }, [goTo, prevIdx, resetTimer]);
  const handleNext = useCallback(() => { goTo(nextIdx); resetTimer(); }, [goTo, nextIdx, resetTimer]);

  /* ── Drag / swipe handlers ── */
  const onPointerDown = (e: React.PointerEvent) => {
    dragStart.current = e.clientX;
    isDragging.current = false;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    if (Math.abs(e.clientX - dragStart.current) > 8) isDragging.current = true;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragStart.current === null) return;
    const delta = e.clientX - dragStart.current;
    dragStart.current = null;
    if (!isDragging.current) return;
    if (delta < -DRAG_THRESHOLD) { handleNext(); }
    else if (delta > DRAG_THRESHOLD) { handlePrev(); }
    isDragging.current = false;
  };

  const center = shown[cur] ?? null;

  return (
    <section className={`section section-dark2 ${styles.section}`} ref={sectionRef}>
      <div className="container">

        {/* ── Header ── */}
        <div className="sec-head">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {t('portfolioSectionLabel')}
          </div>
          <h2 className="sec-title">
            {t('portfolioHeading').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="sec-accent">{t('portfolioHeading').split(' ').slice(-1)}</span>
          </h2>
          <p className="sec-sub">
            {t('portfolioSubtitle')}{' '}
            <Link href="/our-work" style={{ color: 'var(--c-p2)', fontWeight: 600 }}>
              {t('portfolioSubtitleLink')}
            </Link>
          </p>
          <div className="sec-line" />
        </div>

        {/* ── Filters ── */}
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

        {/* ── Carousel ── */}
        {shown.length === 0 ? (
          <div className={styles.empty}>{t('portfolioEmpty')}</div>
        ) : (
          <div className={styles.stage}>
            <div className={styles.stageGlow} />

            {/*
              Fixed-slot coverflow layout.
              We always render exactly 5 slots: far-left | left | CENTER | right | far-right.
              Each slot maps to a project index relative to `cur`.
              When `cur` changes, CSS transitions on each slot's transform/opacity/filter
              make them smoothly shift between their visual roles — this IS the slide effect.
              No track translation needed; the slots themselves move via CSS transition.
            */}
            <div
              className={styles.carouselRow}
              ref={carouselRowRef}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={() => { dragStart.current = null; }}
            >
              {/* Far-left */}
              {shown.length > 4 && (
                <SlotWrapper
                  role="farLeft"
                  onClick={handlePrev}
                  aria-hidden
                  className={`${styles.cardSlot} ${styles.cardSlotLeft2}`}
                >
                  <div className={`${styles.card} ${styles.cardFar}`}>
                    <CardInner
                      p={shown[safeIdx(cur - 2)]}
                      tProj={tProj} t={t}
                      scrollDepth="-160px"
                      showOverlay={false}
                      isCenter={false}
                    />
                  </div>
                </SlotWrapper>
              )}

              {/* Left wing */}
              <div
                className={`${styles.cardSlot} ${styles.cardSlotLeft1}`}
                onClick={handlePrev}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && handlePrev()}
                aria-label={tProj(`${shown[prevIdx].slug}.title`)}
              >
                <div className={`${styles.card} ${styles.cardWing}`}>
                  <CardInner
                    p={shown[prevIdx]}
                    tProj={tProj} t={t}
                    scrollDepth="-200px"
                    showOverlay={false}
                    isCenter={false}
                  />
                </div>
              </div>

              {/* Center */}
              {center && (
                <div className={`${styles.cardSlot} ${styles.cardSlotCenter}`}>
                  <div className={`${styles.card} ${styles.cardCenter}`}>
                    <CardInner
                      key={`center-${center.slug}`}
                      p={center}
                      tProj={tProj} t={t}
                      scrollDepth="-520px"
                      showOverlay
                      isCenter
                    />
                  </div>
                </div>
              )}

              {/* Right wing */}
              <div
                className={`${styles.cardSlot} ${styles.cardSlotRight1}`}
                onClick={handleNext}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && handleNext()}
                aria-label={tProj(`${shown[nextIdx].slug}.title`)}
              >
                <div className={`${styles.card} ${styles.cardWing}`}>
                  <CardInner
                    p={shown[nextIdx]}
                    tProj={tProj} t={t}
                    scrollDepth="-200px"
                    showOverlay={false}
                    isCenter={false}
                  />
                </div>
              </div>

              {/* Far-right */}
              {shown.length > 4 && (
                <SlotWrapper
                  role="farRight"
                  onClick={handleNext}
                  aria-hidden
                  className={`${styles.cardSlot} ${styles.cardSlotRight2}`}
                >
                  <div className={`${styles.card} ${styles.cardFar}`}>
                    <CardInner
                      p={shown[safeIdx(cur + 2)]}
                      tProj={tProj} t={t}
                      scrollDepth="-160px"
                      showOverlay={false}
                      isCenter={false}
                    />
                  </div>
                </SlotWrapper>
              )}
            </div>

            {/* Info panel */}
            {center && (
              <div
                key={infoPanelKey}
                className={`${styles.infoPanel} ${!infoPanelVisible ? styles.infoPanelHide : ''}`}
              >
                <div className={styles.infoCat}>{tProj(`${center.slug}.categoryLabel`)}</div>
                <div className={styles.infoTitle}>{tProj(`${center.slug}.title`)}</div>
                <div className={styles.infoDesc}>{tProj(`${center.slug}.description`)}</div>
                <div className={styles.infoTags}>
                  {center.tags.map((tag, ti) => (
                    <span key={tag} className={`tag ${center.tagColors[ti] || 'tag-dim'}`}>{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Nav */}
            <div className={styles.navRow}>
              <button className={styles.navArrow} onClick={handlePrev} aria-label="Previous project">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <div className={styles.dotRow}>
                {shown.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === cur ? styles.dotActive : ''}`}
                    onClick={() => { goTo(i); resetTimer(); }}
                    aria-label={`Project ${i + 1}`}
                  />
                ))}
              </div>
              <button className={styles.navArrow} onClick={handleNext} aria-label="Next project">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        )}

        <div className={styles.cta}>
          <Link href="/our-work" className="btn btn-primary btn-lg">
            {t('viewAllProjects')}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* Thin wrapper to avoid inline complex JSX for far wings */
function SlotWrapper({
  children, className, onClick, role: _role, 'aria-hidden': ah,
}: {
  children: React.ReactNode;
  className: string;
  onClick: () => void;
  role?: string;
  'aria-hidden'?: boolean;
}) {
  return (
    <div className={className} onClick={onClick} aria-hidden={ah}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CardInner — screenshot + browser chrome + hover overlay
   key prop on the img resets the scroll animation when
   a new project becomes center.
   ───────────────────────────────────────────────────────── */
function CardInner({
  p, tProj, t, scrollDepth, showOverlay, isCenter = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  p: any; tProj: any; t: any;
  scrollDepth: string;
  showOverlay: boolean;
  isCenter?: boolean;
}) {
  return (
    <div className={styles.cardInner}>
      {/* Browser chrome bar */}
      <div className={styles.browserBar}>
        <span className={styles.bDot} style={{ background: '#EF4444' }} />
        <span className={styles.bDot} style={{ background: '#F59E0B' }} />
        <span className={styles.bDot} style={{ background: '#10B981' }} />
        <span className={styles.bUrl}>
          {p.liveUrl && p.liveUrl !== '#' ? p.liveUrl.replace(/^https?:\/\//, '') : p.slug}
        </span>
        {p.liveUrl && p.liveUrl !== '#' && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.4, flexShrink: 0 }}>
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
        )}
      </div>

      {/* Screenshot */}
      <div className={styles.screenshotWrap}>
        {p.screenshot ? (
          // key on img forces remount → animation restarts from top every time
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.slug}
            src={p.screenshot}
            alt={tProj(`${p.slug}.title`)}
            className={`${styles.screenshot} ${isCenter ? styles.screenshotScroll : ''}`}
            style={{ '--scroll-depth': scrollDepth } as React.CSSProperties}
            loading="lazy"
          />
        ) : (
          <div className={styles.screenshotPlaceholder}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" style={{ opacity: 0.3 }}>
              <rect x="3" y="3" width="18" height="18" rx="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
            <span className={styles.placeholderText}>Screenshot coming soon</span>
          </div>
        )}

        {/* Hover overlay — center card only */}
        {showOverlay && (
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
        )}
      </div>
    </div>
  );
}
