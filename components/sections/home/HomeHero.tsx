'use client';

import Link from 'next/link';
import { useEffect, useState, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import HeroBackground from './HeroBackground';
import styles from './HomeHero.module.css';

const AUTO_INTERVAL = 6000;
const TYPE_SPEED   = 75;   // ms per char typed
const DELETE_SPEED = 38;   // ms per char deleted
const PAUSE_FULL   = 1500; // ms pause at full word
const PAUSE_EMPTY  = 260;  // ms pause before next word

/* ── Magnetic hover: pulls an element gently toward the cursor ──
   Pure GSAP quickTo, no React state — fully passive until hovered,
   and it always eases back to (0,0) on mouse-leave. */
function useMagnetic(ref: React.RefObject<HTMLElement>, strength = 0.35) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const relX = e.clientX - (r.left + r.width / 2);
      const relY = e.clientY - (r.top + r.height / 2);
      xTo(relX * strength);
      yTo(relY * strength);
    };
    const onLeave = () => { xTo(0); yTo(0); };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [ref, strength]);
}

export default function HomeHero() {
  // Use generic translations
  const tHome = useTranslations('home');
  const tProjects = useTranslations('projects');

  // ── Typing effect ──────────────────────────────
  const rawTitle: string = tHome('heroTitle');
  const chunks = rawTitle.split(/\.\s+/);
  const firstSpaceIdx = chunks[0].indexOf(' ');
  const titlePrefix  = firstSpaceIdx > -1 ? chunks[0].slice(0, firstSpaceIdx)  : chunks[0];
  const firstWord    = firstSpaceIdx > -1 ? chunks[0].slice(firstSpaceIdx + 1) + '.' : '';
  const restWords    = chunks.slice(1).map((w, i, arr) =>
    w + (i < arr.length - 1 ? '.' : (w.endsWith('.') ? '' : '.'))
  );
  const typingWords: string[] = [firstWord, ...restWords].filter(Boolean);

  const [wordIdx, setWordIdx]       = useState(0);
  const [typedText, setTypedText]   = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorOn, setCursorOn]     = useState(true);

  useEffect(() => {
    const id = setInterval(() => setCursorOn(c => !c), 530);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const target = typingWords[wordIdx];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && typedText === target) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_FULL);
    } else if (isDeleting && typedText === '') {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIdx(i => (i + 1) % typingWords.length);
      }, PAUSE_EMPTY);
    } else {
      const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED;
      timeout = setTimeout(() => {
        setTypedText(isDeleting
          ? target.slice(0, typedText.length - 1)
          : target.slice(0, typedText.length + 1)
        );
      }, speed);
    }
    return () => clearTimeout(timeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typedText, wordIdx, isDeleting]);

  // ── Project switcher ───────────────────────────
  const PROJECTS = [
    {
      key: 'occhiohouse',
      name: tProjects('occhio-house.title'),
      category: tProjects('occhio-house.categoryLabel'),
      laptop: '/images/hero/occhiohouse.png',
      tablet: '/images/hero/tablet-occhiohouse.png',
      mobile: '/images/hero/mobile-occhiohouse.png',
      bg:     '/images/hero/occhiohouse.png',
      glow:   '180,10,20',
    },
    {
      key: 'safariworldtours',
      name: tProjects('safari-world-tours.title'),
      category: tProjects('safari-world-tours.categoryLabel'),
      laptop: '/images/hero/safariworldtours.png',
      tablet: '/images/hero/tablet-safariworldtours.png',
      mobile: '/images/hero/mobile-safariworldtours.png',
      bg:     '/images/hero/safariworldtours.png',
      glow:   '220,130,20',
    },
    {
      key: 'yourmeaningfulanalytics',
      name: tProjects('meaningful-analytics.title'),
      category: tProjects('meaningful-analytics.categoryLabel'),
      laptop: '/images/hero/yourmeaningfulanalytics.png',
      tablet: '/images/hero/tablet-yourmeaningfulanalytics.png',
      mobile: '/images/hero/mobile-yourmeaningfulanalytics.png',
      bg:     '/images/hero/yourmeaningfulanalytics.png',
      glow:   '80,130,210',
    },
    {
      key: 'nuhausstructures',
      name: tProjects('nuhaus-structures.title'),
      category: tProjects('nuhaus-structures.categoryLabel'),
      laptop: '/images/hero/nuhausstructures.dreamhosters.png',
      tablet: '/images/hero/tablet-nuhausstructures.dreamhosters.png',
      mobile: '/images/hero/mobile-nuhausstructures.dreamhosters.png',
      bg:     '/images/hero/nuhausstructures.dreamhosters.png',
      glow:   '60,160,80',
    },
    {
      key: 'tcproductions',
      name: tProjects('tc-productions.title'),
      category: tProjects('tc-productions.categoryLabel'),
      laptop: '/images/hero/astheria.png',
      tablet: '/images/hero/tablet-astheria.png',
      mobile: '/images/hero/mobile-astheria.png',
      bg:     '/images/hero/astheria.png',
      glow:   '200,80,160',
    },
  ];

  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const timerRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const heroRef   = useRef<HTMLElement>(null);
  const logo1Ref  = useRef<HTMLDivElement>(null);
  const logo2Ref  = useRef<HTMLDivElement>(null);
  const logo3Ref  = useRef<HTMLDivElement>(null);
  const logo4Ref  = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const targetX   = useRef(0);
  const targetY   = useRef(0);
  const currentX  = useRef(0);
  const currentY  = useRef(0);

  // Magnetic CTAs
  const btnPrimaryRef = useRef<HTMLAnchorElement>(null);
  const btnGhostRef   = useRef<HTMLAnchorElement>(null);
  useMagnetic(btnPrimaryRef, 0.28);
  useMagnetic(btnGhostRef, 0.28);

  // 3-D tilt on the device cluster, driven by cursor position over .visual
  const visualRef       = useRef<HTMLDivElement>(null);
  const devicesBlockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const visual = visualRef.current;
    const block  = devicesBlockRef.current;
    if (!visual || !block) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rotX = gsap.quickTo(block, 'rotateX', { duration: 0.6, ease: 'power3.out' });
    const rotY = gsap.quickTo(block, 'rotateY', { duration: 0.6, ease: 'power3.out' });

    const onMove = (e: MouseEvent) => {
      const r = visual.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width  - 0.5;
      const py = (e.clientY - r.top)  / r.height - 0.5;
      rotY(px * 9);
      rotX(-py * 7);
    };
    const onLeave = () => { rotX(0); rotY(0); };

    visual.addEventListener('mousemove', onMove);
    visual.addEventListener('mouseleave', onLeave);
    return () => {
      visual.removeEventListener('mousemove', onMove);
      visual.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const goTo = useCallback((idx: number) => {
    if (transitioning || idx === cur) return;
    setTransitioning(true);
    setPrev(cur);
    setCur(idx);
    setTimeout(() => { setPrev(null); setTransitioning(false); }, 750);
  }, [cur, transitioning]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCur(c => {
        const next = (c + 1) % PROJECTS.length;
        setPrev(c);
        setTransitioning(true);
        setTimeout(() => { setPrev(null); setTransitioning(false); }, 750);
        return next;
      });
    }, AUTO_INTERVAL);
  }, [PROJECTS.length]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  /* Mouse parallax — each logo moves at its own depth */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const depths = [28, 18, 22, 14];
    const refs   = [logo1Ref, logo2Ref, logo3Ref, logo4Ref];

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      targetX.current = ((e.clientX - r.left)  / r.width  - 0.5) * 2;
      targetY.current = ((e.clientY - r.top)   / r.height - 0.5) * 2;
    };
    const onLeave = () => { targetX.current = 0; targetY.current = 0; };

    const tick = () => {
      currentX.current += (targetX.current - currentX.current) * 0.06;
      currentY.current += (targetY.current - currentY.current) * 0.06;
      refs.forEach((ref, i) => {
        if (!ref.current) return;
        ref.current.style.transform =
          `translate(${(currentX.current * depths[i]).toFixed(2)}px, ${(currentY.current * depths[i]).toFixed(2)}px)`;
      });
      rafRef.current = requestAnimationFrame(tick);
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const project = PROJECTS[cur];
  const prevProject = prev !== null ? PROJECTS[prev] : null;

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* ── BACKGROUND: aurora (dark) / clean (light) + interactive particle net ── */}
      <div className={styles.bgWrap} aria-hidden>
        <div className={styles.bgOrb3} />
        <div className={styles.bgOrb4} />
        <div className={styles.bgNoise} />
        <div className={styles.gridPattern} />
        <div className={styles.bgVignette} />
        <div className={styles.bgOverlay} />
        <div className={styles.ambientLightingOrb} />

        {/* Cursor-reactive particle network — sits between the ambient glow and the logos */}
        <HeroBackground containerRef={heroRef} className={styles.particleLayer} />

        {/* ── FLOATING LOGOS — full colour, mouse parallax ── */}
        <div className={styles.bgLogos} aria-hidden>
          <div ref={logo1Ref} className={`${styles.bgLogoWrap} ${styles.bgLogoWrap1}`}>
            <img src="/images/home-service-wordpress-icon.svg"   alt="" className={`${styles.bgLogoImg} ${styles.bgLogo1}`} />
          </div>
          <div ref={logo2Ref} className={`${styles.bgLogoWrap} ${styles.bgLogoWrap2}`}>
            <img src="/images/home-service-woocommerce-icon.svg" alt="" className={`${styles.bgLogoImg} ${styles.bgLogo2}`} />
          </div>
          <div ref={logo3Ref} className={`${styles.bgLogoWrap} ${styles.bgLogoWrap3}`}>
            <img src="/images/home-service-seo-icon.svg"         alt="" className={`${styles.bgLogoImg} ${styles.bgLogo3}`} />
          </div>
          <div ref={logo4Ref} className={`${styles.bgLogoWrap} ${styles.bgLogoWrap4}`}>
            <img src="/images/home-service-shopify-icon.svg"     alt="" className={`${styles.bgLogoImg} ${styles.bgLogo4}`} />
          </div>
        </div>
      </div>

      <div className={`container ${styles.inner}`}>
        {/* ══ LEFT PACKAGED COLUMN ══ */}
        <div className={styles.textCol}>
          <div className={`${styles.badge} ${styles.ani1}`}>
            <span className={styles.badgeDot} />
            {tHome('heroBadge')}
          </div>

          <h1 className={`${styles.h1} ${styles.ani2}`}>
            <span className={styles.typingLine}>
              <span className={styles.typingPrefix}>{titlePrefix}&nbsp;</span>
              <span className={styles.typingWord}>{typedText}</span>
              <span className={`${styles.typingCursor} ${cursorOn ? styles.typingCursorOn : ''}`}>|</span>
            </span>
            <br />
            <span className={styles.accent}>{tHome('heroSubtitle')}</span>
          </h1>

          <p className={`${styles.desc} ${styles.ani3}`}>{tHome('heroDescription')}</p>

          <div className={`${styles.btns} ${styles.ani4}`}>
            <Link ref={btnPrimaryRef} href="/get-a-quote" className={styles.btnPrimary}>{tHome('heroCtaPrimary')}</Link>
            <Link ref={btnGhostRef} href="/our-work" className={styles.btnGhost}>{tHome('heroCtaSecondary')}</Link>
          </div>
        </div>

        {/* ══ RIGHT PACKAGED COLUMN (VISUAL STAGE) ══ */}
        <div className={`${styles.visual} ${styles.ani6}`} ref={visualRef}>
          <div className={styles.devicesBlock} ref={devicesBlockRef}>

            <div className={styles.devicesLinearRow}>
              {/* 1. COMPACT LAPTOP */}
              <div className={styles.mockLaptop}>
                <div className={styles.mockLaptopLid}>
                  <div className={styles.mockLaptopViewport}>
                    {prevProject && (
                      <img key={`lap-x-${prev}`} src={prevProject.laptop} className={`${styles.screenImg} ${styles.imgExit}`} alt="" aria-hidden />
                    )}
                    <img key={`lap-${cur}`} src={project.laptop} className={`${styles.screenImg} ${styles.imgEnter} ${styles.imgLaptop}`} style={{ '--scroll-depth': '-560px' } as React.CSSProperties} alt="" />
                  </div>
                </div>
                <div className={styles.mockLaptopBase} />
              </div>

              {/* 2. MAJESTIC CORE IMAC DESKTOP MONITOR */}
              <div className={styles.mockMonitor}>
                <div className={styles.mockMonitorBody}>
                  <div className={styles.mockMonitorViewport}>
                    {prevProject && (
                      <img key={`desk-x-${prev}`} src={prevProject.laptop} className={`${styles.screenImg} ${styles.imgExit}`} alt="" aria-hidden />
                    )}
                    <img key={`desk-${cur}`} src={project.laptop} className={`${styles.screenImg} ${styles.imgEnter} ${styles.imgLaptop}`} style={{ '--scroll-depth': '-560px' } as React.CSSProperties} alt="" />
                  </div>
                  <div className={styles.mockMonitorChin} />
                </div>
                <div className={styles.mockMonitorNeck} />
                <div className={styles.mockMonitorFoot} />
              </div>

              {/* 3. SHARP EDGE-TO-EDGE TABLET */}
              <div className={styles.mockTablet}>
                <div className={styles.mockTabletViewport}>
                  {prevProject && (
                    <img key={`tab-x-${prev}`} src={prevProject.tablet} className={`${styles.screenImg} ${styles.imgExit}`} alt="" aria-hidden />
                  )}
                  <img key={`tab-${cur}`} src={project.tablet} className={`${styles.screenImg} ${styles.imgEnter} ${styles.imgTablet}`} style={{ '--scroll-depth': '-130px' } as React.CSSProperties} alt="" />
                </div>
              </div>

              {/* 4. EDGE-TO-EDGE MOBILE OVERLAPPING ON TOP OF TABLET */}
              <div className={styles.mockMobile}>
                <div className={styles.mockMobileViewport}>
                  {prevProject && (
                    <img key={`mob-x-${prev}`} src={prevProject.mobile} className={`${styles.screenImg} ${styles.imgExit}`} alt="" aria-hidden />
                  )}
                  <img key={`mob-${cur}`} src={project.mobile} className={`${styles.screenImg} ${styles.imgEnter} ${styles.imgMobile}`} style={{ '--scroll-depth': '-80px' } as React.CSSProperties} alt="" />
                </div>
              </div>
            </div>

            {/* SHOWCASE LIVE VIEW CONTROL HARNESS */}
            <div className={styles.showcase}>
              <div className={styles.showcaseInfo}>
                <div className={styles.showcaseName} key={`n-${cur}`}>{project.name}</div>
                <div className={styles.showcaseCat}  key={`c-${cur}`}>{project.category}</div>
              </div>

              <div className={styles.showcaseDivider} />

              <div className={styles.thumbStrip}>
                <button type="button" className={styles.thumbNav} onClick={() => { goTo((cur - 1 + PROJECTS.length) % PROJECTS.length); resetTimer(); }} aria-label="Previous">‹</button>
                <div className={styles.thumbList}>
                  {PROJECTS.map((p, i) => {
                    const dist = Math.min(Math.abs(i - cur), Math.abs(i - cur + PROJECTS.length), Math.abs(i - cur - PROJECTS.length));
                    return (
                      <button key={p.key}
                        type="button"
                        className={`${styles.thumbBtn} ${i === cur ? styles.thumbActive : ''} ${dist === 1 ? styles.thumbAdj : ''} ${dist >= 2 ? styles.thumbFar : ''}`}
                        onClick={() => { goTo(i); resetTimer(); }}
                        aria-label={`Show ${p.name}`} title={p.name}>
                        <img src={p.laptop} alt={p.name} className={styles.thumbImg} />
                      </button>
                    );
                  })}
                </div>
                <button type="button" className={styles.thumbNav} onClick={() => { goTo((cur + 1) % PROJECTS.length); resetTimer(); }} aria-label="Next">›</button>
              </div>

              <div className={styles.dotRow}>
                {PROJECTS.map((_, i) => (
                  <button type="button" key={i} className={`${styles.dot} ${i === cur ? styles.dotActive : ''}`} onClick={() => { goTo(i); resetTimer(); }} aria-label={`Project ${i + 1}`} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
