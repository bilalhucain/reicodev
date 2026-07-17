'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS_META } from '@/lib/data';
import { PROCESS_ICONS } from './ProcessIcons';
import { PROCESS_ANIMATIONS, idleTimeline } from './processAnimations';
import styles from './HomeProcess.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* Violet → cyan sweep across the five steps.
   Encodes the journey itself: cool discovery blue-violet
   warms toward the bright cyan of a shipped, optimized product. */
const STEP_ACCENTS = ['#8b5cf6', '#7c73f2', '#6c8ef5', '#3fb3ea', '#22d3ee'];

export default function HomeProcess() {
  const t = useTranslations('home');
  const sectionRef = useRef<HTMLElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const idleTweens = useRef<(gsap.core.Timeline | null)[]>([]);
  const activeTweens = useRef<(gsap.core.Timeline | null)[]>([]);
  const played = useRef<Set<number>>(new Set());

  const [activeIndex, setActiveIndex] = useState(-1);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const playStep = useCallback((index: number) => {
    const el = iconRefs.current[index];
    if (!el) return;
    const build = PROCESS_ANIMATIONS[index];
    if (!build) return;
    activeTweens.current[index]?.kill();
    activeTweens.current[index] = build(el);
    played.current.add(index);
  }, []);

  const handleEnter = useCallback((index: number) => {
    setActiveIndex(index);
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(index);
      return next;
    });
    if (!played.current.has(index)) playStep(index);
  }, [playStep]);

  const handleHover = useCallback((index: number) => {
    playStep(index);
  }, [playStep]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const journey = journeyRef.current;
    if (!section || !journey) return;

    if (reduced) {
      // Static, fully-revealed state — no motion, no ScrollTrigger.
      setActiveIndex(PROCESS_STEPS_META.length - 1);
      setCompleted(
  new Set(
    Array.from({ length: PROCESS_STEPS_META.length }, (_, i) => i)
  )
);
      if (lineRef.current) {
        lineRef.current.style.strokeDashoffset = '0';
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Idle floating for every icon wrapper — paused until in view.
      iconRefs.current.forEach((el, i) => {
        if (!el) return;
        const tl = idleTimeline(el);
        tl.pause();
        idleTweens.current[i] = tl;
      });

      ScrollTrigger.create({
        trigger: journey,
        start: 'top 82%',
        onEnter: () => idleTweens.current.forEach((tl) => tl?.play()),
        onLeave: () => idleTweens.current.forEach((tl) => tl?.pause()),
        onEnterBack: () => idleTweens.current.forEach((tl) => tl?.play()),
        onLeaveBack: () => idleTweens.current.forEach((tl) => tl?.pause()),
      });

      // Each step activates independently as it scrolls into view —
      // works identically whether the grid is 5, 3, 2 or 1 columns wide.
      // A small index-based delay makes steps in the same row cascade
      // left-to-right instead of firing all at once.
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => {
            gsap.delayedCall(i * 0.16, () => handleEnter(i));
          },
        });
      });

      // Connector line — continuous scrub reveal across the journey row.
      if (lineRef.current) {
        gsap.set(lineRef.current, { strokeDasharray: 100, strokeDashoffset: 100 });
        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: journey,
            start: 'top 80%',
            end: 'bottom 40%',
            scrub: 0.6,
          },
        });
      }
    }, section);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleEnter]);

  return (
    <section className={`section section-dark2 ${styles.processSection}`} ref={sectionRef}>
      <div className="container">

        <div className="sec-head">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            {t('processSectionLabel')}
          </div>

          <h2 className="sec-title">
            {t('processHeading').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="sec-accent">{t('processHeading').split(' ').slice(-1)}</span>
          </h2>

          <p className="sec-sub">{t('processSubtitle')}</p>

          <div className="sec-line" />
        </div>

        <div className={styles.processJourney} ref={journeyRef}>

          <svg className={styles.processPath} viewBox="0 0 1200 120" preserveAspectRatio="none" aria-hidden>
            {/* Ambient, always-flowing dashed guide — decorative, cheap */}
            <path
              className={styles.processPathGhost}
              d="M0,60 C100,10 140,110 240,60 S380,10 480,60 S620,110 720,60 S860,10 960,60 S1100,110 1200,60"
            />
            {/* Progress line — revealed via scroll-scrubbed stroke-dashoffset */}
            <path
              ref={lineRef}
              className={styles.processPathLive}
              pathLength="100"
              d="M0,60 C100,10 140,110 240,60 S380,10 480,60 S620,110 720,60 S860,10 960,60 S1100,110 1200,60"
            />
          </svg>

          {PROCESS_STEPS_META.map((step, index) => {
            const Icon = PROCESS_ICONS[index] ?? PROCESS_ICONS[0];
            const isActive = activeIndex === index;
            const isDone = completed.has(index);
            const accent = STEP_ACCENTS[index] ?? STEP_ACCENTS[0];

            return (
              <div
                key={step.num}
                className={styles.step}
                data-active={isActive}
                data-done={isDone}
                ref={(el) => { stepRefs.current[index] = el; }}
              >
                <div className={styles.number}>{step.num}</div>
                <div className={styles.arrow}>⌄</div>

                <div
                  className={styles.iconCircle}
                  ref={(el) => { iconRefs.current[index] = el; }}
                  onMouseEnter={() => handleHover(index)}
                  onFocus={() => handleHover(index)}
                  tabIndex={0}
                  role="img"
                  aria-label={t(`process.${step.key}.title`)}
                  style={{ '--step-accent': accent } as React.CSSProperties}
                >
                  <Icon className={styles.icon} />
                </div>

                <h3 className={styles.title}>{t(`process.${step.key}.title`)}</h3>

                <div className={styles.divider} style={{ background: `linear-gradient(90deg, ${accent}, ${STEP_ACCENTS[Math.min(index + 1, STEP_ACCENTS.length - 1)]})` }} />

                <p className={styles.description}>{t(`process.${step.key}.desc`)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
