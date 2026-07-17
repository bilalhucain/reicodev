'use client';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { PROJECTS, type ProjectCard, type ProjectCategory } from '@/lib/data';
import styles from './CategoryProjects.module.css';

const AUTO_INTERVAL = 12000;
const DRAG_THRESHOLD = 60; // px drag needed to trigger slide
const MIN_SLOTS = 5;       // coverflow always wants 5 slots to look right

/* If a category has fewer than MIN_SLOTS projects (even just 1),
   cycle through what exists to pad the array out. Duplicates are fine —
   every place that maps over this array uses the index as the key,
   never the slug, so there's no key-collision risk. */
function padProjects(list: ProjectCard[], min = MIN_SLOTS): ProjectCard[] {
  if (list.length === 0 || list.length >= min) return list;
  const out: ProjectCard[] = [];
  let i = 0;
  while (out.length < min) {
    out.push(list[i % list.length]);
    i++;
  }
  return out;
}

interface CategoryProjectsProps {
  /** Which category to show — 'wordpress' | 'woocommerce' | 'shopify' | 'seo' | 'branding' */
  category: ProjectCategory;
  /** Label for the CTA button under the carousel (pass your already-translated string) */
  ctaLabel: string;
  /** Where the CTA button links — defaults to the quote page */
  ctaHref?: string;
}

export default function CategoryProjects({
  category,
  ctaLabel,
  ctaHref = '/get-a-quote',
}: CategoryProjectsProps) {
  const t     = useTranslations('home');
  const tProj = useTranslations('projects');

  const shown = padProjects(PROJECTS.filter(p => p.category === category));

  const [cur, setCur]                           = useState(0);
  const [infoPanelVisible, setInfoPanelVisible] = useState(true);
  const [infoPanelKey, setInfoPanelKey]         = useState(0);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStart = useRef<number | null>(null);
  const isDragging = useRef(false);

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
    if (shown.length <= 1) return; // nothing to auto-rotate
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

  if (shown.length === 0) return null; // category has no projects at all — render nothing

  const center = shown[cur];

  return (
    <div className={styles.stage}>
      <div className={styles.stageGlow} />

      <div
        className={styles.carouselRow}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => { dragStart.current = null; }}
      >
        {/* Far-left */}
        {shown.length > 4 && (
          <div
            className={`${styles.cardSlot} ${styles.cardSlotLeft2}`}
            onClick={handlePrev}
            aria-hidden
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
          </div>
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
        <div className={`${styles.cardSlot} ${styles.cardSlotCenter}`}>
          <div className={`${styles.card} ${styles.cardCenter}`}>
            <CardInner
              key={`center-${cur}`}
              p={center}
              tProj={tProj} t={t}
              scrollDepth="-520px"
              showOverlay
              isCenter
            />
          </div>
        </div>

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
          <div
            className={`${styles.cardSlot} ${styles.cardSlotRight2}`}
            onClick={handleNext}
            aria-hidden
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
          </div>
        )}
      </div>

      {/* Info panel */}
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

      {/* Nav */}
      {shown.length > 1 && (
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
      )}

      <div className={styles.cta}>
        <Link href={ctaHref} className="btn btn-primary btn-lg">
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   CardInner — screenshot + browser chrome + hover overlay
   Identical to the homepage version.
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
