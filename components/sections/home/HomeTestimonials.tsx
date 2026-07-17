'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TESTIMONIALS } from '@/lib/data';
import styles from './HomeTestimonials.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AUTO_INTERVAL = 6000;
const DRAG_THRESHOLD = 50;

/* ─── Hardcoded light-text styles for the always-dark center card ───
   Inline styles bypass CSS Modules scoping and global theme overrides. */
const S = {
  cardCenterBg: { background: '#1a1b2e' } as const,
  quoteIcon: {
    fontSize: 80, fontFamily: 'Georgia, serif',
    color: 'rgba(108,75,255,0.85)', lineHeight: 0.6,
    marginBottom: 16, opacity: 0.8, display: 'block', userSelect: 'none' as const,
  },
  stars:  { fontSize: 18, color: '#f59e0b', letterSpacing: 3, marginBottom: 20 },
  text:   { fontSize: 17, color: 'rgba(255,255,255,0.92)', lineHeight: 1.8, marginBottom: 32, fontStyle: 'italic' as const },
  author: { display: 'flex', alignItems: 'center', gap: 14, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.12)' },
  avatar: { width: 48, height: 48, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: '#fff', flexShrink: 0, letterSpacing: -0.5, background: 'linear-gradient(135deg, #6c4bff, #06b6d4)' },
  authorInfo: { flex: 1 },
  name:   { fontSize: 15, fontWeight: 800, color: '#fff', marginBottom: 2 },
  role:   { fontSize: 12, color: 'rgba(255,255,255,0.5)' },
} as const;

export default function HomeTestimonials() {
  const t        = useTranslations('home');
  const ref      = useRef<HTMLElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const dragging   = useRef(false);   // true once threshold crossed

  const leftSlotRef   = useRef<HTMLDivElement>(null);
  const centerSlotRef = useRef<HTMLDivElement>(null);
  const rightSlotRef  = useRef<HTMLDivElement>(null);
  const trustRatingRef = useRef<HTMLSpanElement>(null);

  const [cur, setCur] = useState(0);
  const total = TESTIMONIALS.length;

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = ref.current;
    if (!section) return;

    const header = section.querySelector('.sec-head');

    if (reduced) return; // natural, settled state — no motion, no count-up

    gsap.set(header, { opacity: 0, y: 18 });
    gsap.set(centerSlotRef.current, { opacity: 0, scale: 0.9, y: 20 });
    gsap.set(leftSlotRef.current, { opacity: 0, x: -60, rotateY: 0 });
    gsap.set(rightSlotRef.current, { opacity: 0, x: 60, rotateY: 0 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .to(header, { opacity: 1, y: 0, duration: 0.55 })
          .to(centerSlotRef.current, { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: 'back.out(1.4)' }, '-=0.25')
          .to([leftSlotRef.current, rightSlotRef.current], { opacity: 0.65, x: 0, duration: 0.6 }, '-=0.4');

        // Trust rating counts up from 0 to 4.9 — a small satisfying
        // detail that reads as "real, measured" rather than static copy.
        if (trustRatingRef.current) {
          const counter = { val: 0 };
          gsap.to(counter, {
            val: 4.9,
            duration: 1.1,
            delay: 0.3,
            ease: 'power2.out',
            onUpdate: () => { trustRatingRef.current!.textContent = counter.val.toFixed(1); },
          });
        }
      },
    });

    return () => st.kill();
  }, []);

  const safeIdx = useCallback((i: number) => ((i % total) + total) % total, [total]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setCur(c => (c + 1) % total), AUTO_INTERVAL);
  }, [total]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const handlePrev = useCallback(() => { setCur(c => safeIdx(c - 1)); resetTimer(); }, [safeIdx, resetTimer]);
  const handleNext = useCallback(() => { setCur(c => safeIdx(c + 1)); resetTimer(); }, [safeIdx, resetTimer]);

  /* ── Drag on the row div ── */
  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragStartX.current = e.clientX;
    dragStartY.current = e.clientY;
    dragging.current   = false;
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const dx = Math.abs(e.clientX - dragStartX.current);
    const dy = Math.abs(e.clientY - (dragStartY.current ?? 0));
    if (dx > 8 && dx > dy) dragging.current = true;
  }, []);

  const onMouseUp = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const delta = e.clientX - dragStartX.current;
    dragStartX.current = null;
    dragStartY.current = null;
    if (!dragging.current) return;
    dragging.current = false;
    if (delta < -DRAG_THRESHOLD) handleNext();
    else if (delta > DRAG_THRESHOLD) handlePrev();
  }, [handleNext, handlePrev]);

  // Touch
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    dragStartY.current = e.touches[0].clientY;
    dragging.current   = false;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const dx = Math.abs(e.touches[0].clientX - dragStartX.current);
    const dy = Math.abs(e.touches[0].clientY - (dragStartY.current ?? 0));
    if (dx > 8 && dx > dy) dragging.current = true;
  }, []);

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    if (dragStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - dragStartX.current;
    dragStartX.current = null;
    if (!dragging.current) return;
    dragging.current = false;
    if (delta < -DRAG_THRESHOLD) handleNext();
    else if (delta > DRAG_THRESHOLD) handlePrev();
  }, [handleNext, handlePrev]);

  /* Wing click — only fires if it wasn't a drag */
  const wingClick = useCallback((fn: () => void) => () => {
    if (!dragging.current) fn();
  }, []);

  const prevIdx    = safeIdx(cur - 1);
  const nextIdx    = safeIdx(cur + 1);
  const centerTest = TESTIMONIALS[cur];

  return (
    <section className={`section section-dark2 ${styles.section}`} ref={ref}>
      <div className="container">

        <div className="sec-head">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {t('testimonialsSectionLabel')}
          </div>
          <h2 className="sec-title">
            {t('testimonialsHeading').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="sec-accent">{t('testimonialsHeading').split(' ').slice(-1)}</span>
          </h2>
          <p className="sec-sub">{t('testimonialsSubtitle')}</p>
          <div className="sec-line" />
        </div>

        <div className={styles.stage}>
          <div className={styles.glow} aria-hidden />

          <div
            className={styles.carouselRow}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Left wing */}
            <div
              ref={leftSlotRef}
              className={`${styles.cardSlot} ${styles.cardSlotLeft1}`}
              onClick={wingClick(handlePrev)}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handlePrev()}
              aria-label="Previous review"
            >
              <div className={`${styles.card} ${styles.cardWing}`}>
                <GhostCard test={TESTIMONIALS[prevIdx]} styles={styles} />
              </div>
            </div>

            {/* Center — all text via inline styles to beat any theme override */}
            <div className={`${styles.cardSlot} ${styles.cardSlotCenter}`} ref={centerSlotRef}>
              <div className={`${styles.card} ${styles.cardCenter}`} style={S.cardCenterBg}>
                <div style={S.quoteIcon} aria-hidden>"</div>
                <div style={S.stars}>{'★'.repeat(centerTest.rating)}</div>
                <p style={S.text}>&ldquo;{centerTest.text}&rdquo;</p>
                <div style={S.author}>
                  <div style={S.avatar}>{centerTest.initials}</div>
                  <div style={S.authorInfo}>
                    <div style={S.name}>{centerTest.name}</div>
                    <div style={S.role}>{centerTest.role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right wing */}
            <div
              ref={rightSlotRef}
              className={`${styles.cardSlot} ${styles.cardSlotRight1}`}
              onClick={wingClick(handleNext)}
              role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && handleNext()}
              aria-label="Next review"
            >
              <div className={`${styles.card} ${styles.cardWing}`}>
                <GhostCard test={TESTIMONIALS[nextIdx]} styles={styles} />
              </div>
            </div>
          </div>

          {/* Nav */}
          <div className={styles.nav}>
            <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div className={styles.dots}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} className={`${styles.dot} ${i === cur ? styles.dotActive : ''}`}
                  onClick={() => { setCur(i); resetTimer(); }} aria-label={`Review ${i + 1}`} />
              ))}
            </div>
            <button className={`${styles.navBtn} ${styles.navBtnFilled}`} onClick={handleNext} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>

          {/* Trust bar */}
          <div className={styles.trustBar}>
            <span className={styles.trustRating} ref={trustRatingRef}>0.0</span>
            <span className={styles.trustStars}>★★★★★</span>
            <span className={styles.trustLabel}>average rating · 879+ verified reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function GhostCard({ test, styles }: { test: typeof TESTIMONIALS[0]; styles: Record<string, string> }) {
  return (
    <div className={styles.ghostInner}>
      <div className={styles.ghostStars}>{'★'.repeat(test.rating)}</div>
      <p className={styles.ghostText}>&ldquo;{test.text}&rdquo;</p>
      <div className={styles.ghostAuthor}>
        <div className={styles.ghostAvatar}>{test.initials}</div>
        <div>
          <div className={styles.ghostName}>{test.name}</div>
          <div className={styles.ghostRole}>{test.role}</div>
        </div>
      </div>
    </div>
  );
}
