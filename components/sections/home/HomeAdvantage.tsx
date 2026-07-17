'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CircleStar, FolderKanban, Globe, CalendarClock, type LucideIcon } from 'lucide-react';
import { ADVANTAGES_META } from '@/lib/data';
import styles from './HomeAdvantage.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ── Stats shown in the left column ── */
const STATS: { icon: LucideIcon; value: string; label: string; stars: boolean }[] = [
  { icon: CircleStar,   value: '879+',  label: '5-Star Reviews',     stars: true },
  { icon: FolderKanban, value: '1440+', label: 'Projects Completed', stars: false },
  { icon: Globe,        value: '61+',   label: 'Countries Served',   stars: false },
  { icon: CalendarClock, value: '10+',  label: 'Years Experience',   stars: false },
];

/* ═══════════════════════════════════════════════════════
   GSAP micro-animations — one builder per slide.
   Every element it targets already exists in the SVG below,
   tagged via data-part. Entrance uses gsap.from() against the
   SVG's own static (final) geometry, so reduced-motion users
   just see the normal settled illustration with zero JS.
   ═══════════════════════════════════════════════════════ */
const EASE = 'power2.out';

function animateExpertise(container: Element) {
  const shield = container.querySelector('[data-part="shield"]');
  const chart  = container.querySelector('[data-part="chart"]');
  const bars   = container.querySelectorAll('[data-part="bar"]');
  const badge  = container.querySelector('[data-part="badge"]');
  const tl = gsap.timeline();
  if (shield) tl.from(shield, { opacity: 0, scale: 0.92, transformOrigin: '160px 115px', duration: 0.5, ease: EASE }, 0);
  if (chart)  tl.from(chart,  { opacity: 0, y: 10, duration: 0.45, ease: EASE }, 0.15);
  if (bars.length) tl.from(bars, { scaleY: 0, transformOrigin: '50% 100%', duration: 0.45, ease: EASE, stagger: 0.07 }, 0.3);
  if (badge)  tl.from(badge,  { opacity: 0, scale: 0.7, transformOrigin: '266px 158px', duration: 0.4, ease: 'back.out(2.4)' }, 0.55);
  if (shield) tl.to(shield, { scale: 1.035, transformOrigin: '160px 115px', duration: 2.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  return tl;
}

function animateResult(container: Element) {
  const needle = container.querySelector('[data-part="needle"]');
  const chips  = container.querySelectorAll('[data-part="chip"]');
  const pct    = container.querySelector('[data-part="pct"]');
  const tl = gsap.timeline();
  if (pct)    tl.from(pct, { opacity: 0, scale: 0.85, transformOrigin: '160px 155px', duration: 0.4, ease: EASE }, 0);
  if (needle) tl.from(needle, { rotate: -55, transformOrigin: '160px 170px', duration: 0.75, ease: 'power3.out' }, 0.1);
  if (chips.length) tl.from(chips, { opacity: 0, y: 12, duration: 0.4, ease: EASE, stagger: 0.1 }, 0.45);
  if (needle) tl.to(needle, { rotate: '+=3', transformOrigin: '160px 170px', duration: 1.8, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  return tl;
}

function animateClient(container: Element) {
  const b1    = container.querySelector('[data-part="bubble1"]');
  const b2    = container.querySelector('[data-part="bubble2"]');
  const check = container.querySelector('[data-part="check"]');
  const tl = gsap.timeline();
  if (b1)    tl.from(b1, { opacity: 0, x: -14, duration: 0.4, ease: EASE }, 0);
  if (b2)    tl.from(b2, { opacity: 0, x: 14, duration: 0.4, ease: EASE }, 0.15);
  if (check) tl.from(check, { opacity: 0, scale: 0.7, transformOrigin: '160px 218px', duration: 0.4, ease: 'back.out(2)' }, 0.4);
  if (check) tl.to(check, { scale: 1.04, transformOrigin: '160px 218px', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  return tl;
}

function animateReliable(container: Element) {
  const calendar = container.querySelector('[data-part="calendar"]');
  const clock    = container.querySelector('[data-part="clock"]');
  const hands    = container.querySelectorAll('[data-part="hand"]');
  const tick     = container.querySelector('[data-part="tick"]');
  const tl = gsap.timeline();
  if (calendar) tl.from(calendar, { opacity: 0, y: -8, duration: 0.45, ease: EASE }, 0);
  if (clock)    tl.from(clock, { opacity: 0, scale: 0.9, transformOrigin: '240px 110px', duration: 0.4, ease: EASE }, 0.15);
  if (hands.length) tl.from(hands, { rotate: -40, transformOrigin: '240px 110px', duration: 0.6, ease: 'power3.out', stagger: 0.08 }, 0.3);
  if (tick)     tl.from(tick, { opacity: 0, scale: 0.6, transformOrigin: '268px 80px', duration: 0.35, ease: 'back.out(2.2)' }, 0.65);
  if (tick)     tl.to(tick, { scale: 1.08, transformOrigin: '268px 80px', duration: 1.6, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  return tl;
}

const SLIDE_ANIMATIONS = [animateExpertise, animateResult, animateClient, animateReliable];

/* ── Visual illustration per advantage (pure CSS/SVG, no external images) ── */
function SlideIllustration({ index, active }: { index: number; active: boolean }) {
  const illustrations = [
    /* 01 Proven Expertise — shield + chart */
    <svg key="expertise" viewBox="0 0 320 260" className={`${styles.illSvg} ${active ? styles.illActive : ''}`}>
      <defs>
        <linearGradient id="shieldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6c4bff" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="chartGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#6c4bff"/>
          <stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
        <filter id="glow1"><feGaussianBlur stdDeviation="6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Shield */}
      <g data-part="shield">
        <path d="M160 30 L220 55 L220 130 Q220 175 160 200 Q100 175 100 130 L100 55 Z" fill="url(#shieldGrad)" filter="url(#glow1)" opacity="0.85"/>
        <path d="M160 50 L205 70 L205 130 Q205 165 160 185 Q115 165 115 130 L115 70 Z" fill="none" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5"/>
        {/* Bird mark inside shield */}
        <g transform="translate(135,100) scale(0.055)" fill="#c4b5fd">
          <path d="M520 120 C610 120 680 180 700 230 L620 260 C590 330 540 400 470 450 C380 510 270 470 240 390 L410 390 C425 390 435 380 435 365 C435 350 425 340 410 340 L200 340 C175 320 160 295 150 270 L520 270 C535 270 545 260 545 245 C545 230 535 220 520 220 L110 220 C120 180 150 145 190 120 L520 120 Z"/>
        </g>
      </g>
      {/* Chart card */}
      <g data-part="chart">
        <rect x="192" y="148" width="110" height="80" rx="10" fill="rgba(15,12,40,0.9)" stroke="rgba(108,75,255,0.3)" strokeWidth="1"/>
        <rect data-part="bar" x="206" y="188" width="12" height="28" rx="3" fill="url(#chartGrad)" opacity="0.6"/>
        <rect data-part="bar" x="224" y="175" width="12" height="41" rx="3" fill="url(#chartGrad)" opacity="0.8"/>
        <rect data-part="bar" x="242" y="162" width="12" height="54" rx="3" fill="url(#chartGrad)"/>
        <rect data-part="bar" x="260" y="170" width="12" height="46" rx="3" fill="url(#chartGrad)" opacity="0.9"/>
        <path d="M206 188 L218 175 L236 162 L254 170" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
      </g>
      {/* 10+ badge */}
      <g data-part="badge">
        <rect x="230" y="140" width="72" height="36" rx="8" fill="rgba(15,12,40,0.95)" stroke="rgba(108,75,255,0.4)" strokeWidth="1"/>
        <text x="266" y="160" textAnchor="middle" fontSize="13" fontWeight="800" fill="#fff">10+</text>
        <text x="266" y="171" textAnchor="middle" fontSize="8" fill="#a78bfa">Years</text>
      </g>
    </svg>,

    /* 02 Result-Driven — gauge + metrics */
    <svg key="result" viewBox="0 0 320 260" className={`${styles.illSvg} ${active ? styles.illActive : ''}`}>
      <defs>
        <linearGradient id="gaugeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06b6d4"/><stop offset="100%" stopColor="#6c4bff"/>
        </linearGradient>
        <filter id="glow2"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Gauge arc background */}
      <path d="M80 170 A 90 90 0 0 1 240 170" fill="none" stroke="rgba(108,75,255,0.15)" strokeWidth="18" strokeLinecap="round"/>
      {/* Gauge arc fill ~80% */}
      <path d="M80 170 A 90 90 0 0 1 222 110" fill="none" stroke="url(#gaugeGrad)" strokeWidth="18" strokeLinecap="round" filter="url(#glow2)"/>
      {/* Needle */}
      <g data-part="needle">
        <line x1="160" y1="170" x2="205" y2="108" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
        <circle cx="160" cy="170" r="8" fill="#6c4bff" filter="url(#glow2)"/>
      </g>
      {/* Center text */}
      <g data-part="pct">
        <text x="160" y="148" textAnchor="middle" fontSize="22" fontWeight="900" fill="var(--c-txt)">98%</text>
        <text x="160" y="163" textAnchor="middle" fontSize="9" fill="var(--c-p2)">Client Satisfaction</text>
      </g>
      {/* Metric chips */}
      <g data-part="chip">
        <rect x="50" y="195" width="90" height="42" rx="8" fill="rgba(15,12,40,0.92)" stroke="rgba(108,75,255,0.4)" strokeWidth="1"/>
        <text x="95" y="214" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">+340%</text>
        <text x="95" y="228" textAnchor="middle" fontSize="9" fill="#a78bfa">Avg. ROI</text>
      </g>
      <g data-part="chip">
        <rect x="178" y="195" width="90" height="42" rx="8" fill="rgba(15,12,40,0.92)" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
        <text x="223" y="214" textAnchor="middle" fontSize="16" fontWeight="800" fill="#fff">4.9/5</text>
        <text x="223" y="228" textAnchor="middle" fontSize="9" fill="#06b6d4">Rating</text>
      </g>
    </svg>,

    /* 03 Client-Centric — conversation bubbles */
    <svg key="client" viewBox="0 0 320 260" className={`${styles.illSvg} ${active ? styles.illActive : ''}`}>
      <defs>
        <linearGradient id="bubbleGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6c4bff"/><stop offset="100%" stopColor="#a78bfa"/>
        </linearGradient>
        <filter id="glow3"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Bubble 1 — client */}
      <g data-part="bubble1">
        <rect x="40" y="55" width="160" height="52" rx="14" fill="rgba(15,12,40,0.92)" stroke="rgba(108,75,255,0.4)" strokeWidth="1"/>
        <text x="120" y="78" textAnchor="middle" fontSize="11" fill="#c4b5fd">We need a fast, modern</text>
        <text x="120" y="94" textAnchor="middle" fontSize="11" fill="#c4b5fd">eCommerce store.</text>
        <circle cx="56" cy="57" r="14" fill="url(#bubbleGrad)" filter="url(#glow3)" opacity="0.7"/>
        <text x="56" y="62" textAnchor="middle" fontSize="10" fill="#fff">👤</text>
      </g>
      {/* Bubble 2 — Reicodev */}
      <g data-part="bubble2">
        <rect x="118" y="128" width="162" height="52" rx="14" fill="rgba(15,12,40,0.92)" stroke="rgba(6,182,212,0.4)" strokeWidth="1"/>
        <text x="199" y="151" textAnchor="middle" fontSize="11" fill="#a5f3fc">Absolutely. Here's our</text>
        <text x="199" y="167" textAnchor="middle" fontSize="11" fill="#a5f3fc">plan tailored for you.</text>
        <circle cx="265" cy="130" r="14" fill="rgba(6,182,212,0.5)" filter="url(#glow3)"/>
        <g transform="translate(255,120) scale(0.018)" fill="#fff">
          <path d="M520 120 C610 120 680 180 700 230 L620 260 C590 330 540 400 470 450 C380 510 270 470 240 390 L410 390 C425 390 435 380 435 365 C435 350 425 340 410 340 L200 340 C175 320 160 295 150 270 L520 270 C535 270 545 260 545 245 C545 230 535 220 520 220 L110 220 C120 180 150 145 190 120 L520 120 Z"/>
        </g>
      </g>
      {/* Checkmark badge */}
      <g data-part="check">
        <circle cx="160" cy="218" r="24" fill="rgba(108,75,255,0.2)" stroke="rgba(108,75,255,0.4)" strokeWidth="1.5" filter="url(#glow3)"/>
        <path d="M149 218 L157 226 L171 210" stroke="#6c4bff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        <text x="160" y="250" textAnchor="middle" fontSize="9" fill="var(--c-p2)">Goals First</text>
      </g>
    </svg>,

    /* 04 Reliable & On-Time — calendar + clock */
    <svg key="reliable" viewBox="0 0 320 260" className={`${styles.illSvg} ${active ? styles.illActive : ''}`}>
      <defs>
        <linearGradient id="calGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6c4bff"/><stop offset="100%" stopColor="#06b6d4"/>
        </linearGradient>
        <filter id="glow4"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      {/* Calendar card */}
      <g data-part="calendar">
        <rect x="55" y="45" width="150" height="160" rx="14" fill="rgba(15,12,40,0.9)" stroke="rgba(108,75,255,0.3)" strokeWidth="1"/>
        <rect x="55" y="45" width="150" height="38" rx="14" fill="url(#calGrad)" opacity="0.8"/>
        <rect x="55" y="69" width="150" height="14" rx="0" fill="url(#calGrad)" opacity="0.8"/>
        <text x="130" y="68" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">June 2026</text>
        {/* Calendar grid */}
        {[0,1,2,3,4,5,6].map(d => (
          <text key={d} x={72 + d*20} y={100} textAnchor="middle" fontSize="8" fill="rgba(167,139,250,0.6)">{['M','T','W','T','F','S','S'][d]}</text>
        ))}
        {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21].map((d, i) => {
          const row = Math.floor(i / 7);
          const col = i % 7;
          const isDeadline = d === 15;
          const isDone = d < 15;
          return (
            <g key={d}>
              {isDeadline && <circle cx={72 + col*20} cy={116 + row*22} r="9" fill="url(#calGrad)" filter="url(#glow4)"/>}
              <text x={72 + col*20} y={119 + row*22} textAnchor="middle" fontSize="9" fontWeight={isDeadline ? '800' : '400'} fill={isDeadline ? '#fff' : isDone ? 'rgba(167,139,250,0.9)' : 'rgba(255,255,255,0.3)'}>{d}</text>
              {isDone && !isDeadline && <text x={72 + col*20} y={123 + row*22} textAnchor="middle" fontSize="5" fill="#6c4bff">✓</text>}
            </g>
          );
        })}
      </g>
      {/* Clock */}
      <g data-part="clock">
        <circle cx="240" cy="110" r="44" fill="rgba(15,12,40,0.95)" stroke="rgba(6,182,212,0.35)" strokeWidth="1.5" filter="url(#glow4)"/>
        <circle cx="240" cy="110" r="38" fill="none" stroke="rgba(108,75,255,0.12)" strokeWidth="1"/>
        <line data-part="hand" x1="240" y1="110" x2="240" y2="80" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round"/>
        <line data-part="hand" x1="240" y1="110" x2="258" y2="120" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="240" cy="110" r="4" fill="#fff"/>
        <text x="240" y="165" textAnchor="middle" fontSize="10" fill="#a78bfa">On-Time</text>
      </g>
      {/* Green tick */}
      <g data-part="tick">
        <circle cx="268" cy="80" r="14" fill="rgba(16,185,129,0.2)" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5"/>
        <path d="M261 80 L266 85 L275 74" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>
    </svg>,
  ];
  return illustrations[index] ?? illustrations[0];
}

export default function HomeAdvantage() {
  const t   = useTranslations('home');
  const ref = useRef<HTMLElement>(null);
  const [cur, setCur] = useState(0);
  const [animating, setAnimating] = useState(false);
  const total = ADVANTAGES_META.length;
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const illWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = ref.current;
    if (!section) return;

    const header    = section.querySelector('.sec-head');
    const statRows  = section.querySelectorAll(`.${styles.statRow}`);
    const slideCard = section.querySelector(`.${styles.slideCard}`);
    const tabs      = section.querySelectorAll(`.${styles.tab}`);

    if (reduced) {
      // Nothing to animate — elements render in their natural, settled state.
      return;
    }

    gsap.set(header, { opacity: 0, y: 18 });
    gsap.set(statRows, { opacity: 0, x: -26 });
    gsap.set(slideCard, { opacity: 0, y: 24, scale: 0.98 });
    gsap.set(tabs, { opacity: 0, y: 12 });

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.to(header, { opacity: 1, y: 0, duration: 0.6 })
          .to(statRows, { opacity: 1, x: 0, duration: 0.55, stagger: 0.1 }, '-=0.3')
          .to(slideCard, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' }, '-=0.35')
          .to(tabs, { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 }, '-=0.3');
      },
    });

    return () => st.kill();
  }, []);

  const go = useCallback((next: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCur(next); setAnimating(false); }, 320);
  }, [animating]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCur(c => (c + 1) % total);
    }, 5000);
  }, [total]);

  useEffect(() => { resetTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [resetTimer]);

  /* GSAP entrance + idle micro-animation for whichever slide is now active.
     Fires once per real slide change (cur only updates once the 320ms
     crossfade settles, so this never overlaps the CSS fade). Skipped
     entirely under prefers-reduced-motion — the SVG's static JSX values
     already are the finished, settled illustration. */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const container = illWrapRef.current;
    if (reduced || !container) return;
    const ctx = gsap.context(() => {
      SLIDE_ANIMATIONS[cur]?.(container);
    }, container);
    return () => ctx.revert();
  }, [cur]);

  const handlePrev = () => { go((cur - 1 + total) % total); resetTimer(); };
  const handleNext = () => { go((cur + 1) % total); resetTimer(); };

  const adv = ADVANTAGES_META[cur];

  return (
    <section className={`section section-dark ${styles.section}`} ref={ref}>
      <div className="container">

        {/* ── Header — centred ── */}
        <div className={`sec-head ${styles.header}`}>
          <div className="eyebrow"><span className="eyebrow-line" />{t('whySectionLabel')}<span className="eyebrow-line" /></div>
          <h2 className="sec-title">
            {t('whyHeading').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="sec-accent">{t('whyHeading').split(' ').slice(-1)}</span>
          </h2>
          <p className={`sec-sub ${styles.headerSub}`}>{t('whySubtitle')}</p>
          <div className="sec-line" />
        </div>

        {/* ── Two-column body ── */}
        <div className={styles.body}>

          {/* Left — stats */}
          <div className={styles.statsCol}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.statRow}>
                <div className={styles.statIcon}>
                  <s.icon size={20} strokeWidth={2} color="var(--c-p1)" />
                </div>
                <div className={styles.statText}>
                  <div className={styles.statValue}>{s.value}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                  {s.stars && (
                    <div className={styles.stars}>{'★★★★★'}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right — slide card */}
          <div className={styles.slideCard}>

            {/* Counter */}
            <div className={styles.counter}>
              <span className={styles.counterCur}>
                {String(cur + 1).padStart(2, '0')}
              </span>
              <span className={styles.counterSep}> / </span>
              <span className={styles.counterTotal}>{String(total).padStart(2, '0')}</span>
            </div>

            {/* Content area */}
            <div className={`${styles.slideContent} ${animating ? styles.slideOut : styles.slideIn}`}>
              <div className={styles.slideLeft}>
                <h3 className={styles.slideTitle}>
                  {t(`advantages.${adv.key}.title`).split(' ').slice(0, 1).join(' ')}<br/>
                  <span className={styles.slideTitleAccent}>{t(`advantages.${adv.key}.title`).split(' ').slice(1).join(' ')}</span>
                </h3>
                <div className={styles.slideDivider} />
                <p className={styles.slideDesc}>{t(`advantages.${adv.key}.desc`)}</p>
              </div>

              {/* Illustration */}
              <div className={styles.slideIll} ref={illWrapRef}>
                <SlideIllustration index={cur} active={!animating} />
              </div>
            </div>

            {/* Navigation */}
            <div className={styles.nav}>
              <button className={styles.navBtn} onClick={handlePrev} aria-label="Previous">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>

              <div className={styles.dots}>
                {ADVANTAGES_META.map((_, i) => (
                  <button
                    key={i}
                    className={`${styles.dot} ${i === cur ? styles.dotActive : ''}`}
                    onClick={() => { go(i); resetTimer(); }}
                    aria-label={`Slide ${i + 1}`}
                  />
                ))}
              </div>

              <button className={`${styles.navBtn} ${styles.navBtnActive}`} onClick={handleNext} aria-label="Next">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div className={styles.tabs}>
          {ADVANTAGES_META.map((a, i) => (
            <button
              key={a.key}
              className={`${styles.tab} ${i === cur ? styles.tabActive : ''}`}
              onClick={() => { go(i); resetTimer(); }}
            >
              <span className={styles.tabNum}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.tabLabel}>{t(`advantages.${a.key}.title`)}</span>
              {i === cur && <div className={styles.tabLine} />}
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
