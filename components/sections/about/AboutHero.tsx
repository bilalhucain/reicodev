'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Target, Zap, Rocket, Handshake, ShieldCheck, Code2, Sparkles, LayoutGrid, type LucideIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { STATS } from '@/lib/data';
import styles from './AboutHero.module.css';

const FEATURE_KEYS: { Icon: LucideIcon; titleKey: string; subKey: string }[] = [
  { Icon: Target,    titleKey: 'value1Title', subKey: 'value1Description' },
  { Icon: Zap,       titleKey: 'value2Title', subKey: 'value2Description' },
  { Icon: Rocket,    titleKey: 'value3Title', subKey: 'value3Description' },
  { Icon: Handshake, titleKey: 'value4Title', subKey: 'value4Description' },
];

export default function AboutHero() {
  const t = useTranslations('about');
  const ref = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const bgIconRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // GSAP entrance sequence for the left column — a single orchestrated
  // moment on load rather than scattered per-element effects.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!leftRef.current) return;
      const items = leftRef.current.querySelectorAll(`.${styles.animItem}`);
      gsap.fromTo(
        items,
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12, delay: 0.1 }
      );
      if (photoRef.current) {
        gsap.fromTo(
          photoRef.current,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out', delay: 0.2 }
        );
      }
    }, ref);
    return () => ctx.revert();
  }, []);

  // Mouse-driven parallax for the faint background icons — same depth
  // trick used on the homepage hero, kept subtle here.
  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    const depths = [18, 26, 14];
    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { target.x = 0; target.y = 0; };
    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      bgIconRefs.current.forEach((el, i) => {
        if (!el) return;
        el.style.transform = `translate(${(current.x * depths[i]).toFixed(1)}px, ${(current.y * depths[i]).toFixed(1)}px)`;
      });
      raf = requestAnimationFrame(tick);
    };
    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  const onPhotoEnter = () => gsap.to(photoRef.current, { scale: 1.03, duration: 0.4, ease: 'power2.out' });
  const onPhotoLeave = () => gsap.to(photoRef.current, { scale: 1, duration: 0.5, ease: 'power3.out' });

  return (
    <section className={styles.hero} ref={ref}>
      <div className={`${styles.orb} ${styles.orb1}`} aria-hidden />
      <div className={`${styles.orb} ${styles.orb2}`} aria-hidden />

      {/* Faint floating icons for depth — purely decorative */}
      <div className={styles.bgIcons} aria-hidden>
        <div ref={el => { bgIconRefs.current[0] = el; }} className={`${styles.bgIcon} ${styles.bgIconA}`}><Code2 size={34} /></div>
        <div ref={el => { bgIconRefs.current[1] = el; }} className={`${styles.bgIcon} ${styles.bgIconB}`}><Sparkles size={28} /></div>
        <div ref={el => { bgIconRefs.current[2] = el; }} className={`${styles.bgIcon} ${styles.bgIconC}`}><LayoutGrid size={30} /></div>
      </div>

      <div className={`container ${styles.inner}`}>

        {/* LEFT — text */}
        <div className={`${styles.left} reveal from-left`} ref={leftRef}>
          <div className={`pill ${styles.animItem}`} style={{ marginBottom: 20 }}>
            <span className="pill-dot" />{t('sectionLabel')}
          </div>
          <h1 className={`${styles.h1} ${styles.animItem}`}>
            {t('heroTitle').split('.').filter(Boolean).map((line, i, arr) => (
              <span key={i}>
                {i === arr.length - 1
                  ? <span className={styles.accent}>{line.trim()}.</span>
                  : <>{line.trim()}.<br /></>
                }
              </span>
            ))}
          </h1>
          <p className={`${styles.desc} ${styles.animItem}`}>{t('heroDescription')}</p>
          <div className={`${styles.sig} ${styles.animItem}`}>
            <div className={styles.sigName}>{t('founderName')}</div>
            <div className={styles.sigRole}>{t('founderTitle')}</div>
          </div>
          <div className={`${styles.btns} ${styles.animItem}`}>
            <Link href="/get-a-quote" className="btn btn-primary">{t('ctaPrimary')}</Link>
            <Link href="/services" className="btn btn-ghost">{t('ctaSecondary')}</Link>
          </div>
        </div>

        {/* CENTER — photo */}
        <div className={`${styles.center} reveal`}>
          <div
            ref={photoRef}
            className={styles.photoRing}
            onMouseEnter={onPhotoEnter}
            onMouseLeave={onPhotoLeave}
          >
            <div className={styles.photoInner}>
              <div className={styles.photoPlaceholder}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/bilal.jpg"
                  alt="Bilal Hussain — Founder of Reicodev"
                  className={styles.photoImg}
                  data-acf-key="founder_photo"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className={styles.photoFallback}>
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--c-dim)', opacity: 0.5 }}>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span style={{ fontSize: 11, color: 'var(--c-dim)', textAlign: 'center', lineHeight: 1.4 }}>
                    Add photo via WordPress<br />
                    <code style={{ fontSize: 10 }}>ACF: founder_photo</code>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.badge}>
            <div className={styles.badgeIcon}><ShieldCheck size={20} strokeWidth={2} /></div>
            <div>
              <div className={styles.badgeText}>{t('careBadge')}</div>
            </div>
          </div>

          <div className={styles.miniStats}>
            <div className={styles.miniStat}>
              <span className={styles.miniNum}>{STATS.clients}</span>
              <span className={styles.miniLabel}>{t('stat1Label')}</span>
            </div>
            <div className={styles.miniSep} />
            <div className={styles.miniStat}>
              <span className={styles.miniNum}>{STATS.projects}</span>
              <span className={styles.miniLabel}>{t('stat2Label')}</span>
            </div>
            <div className={styles.miniSep} />
            <div className={styles.miniStat}>
              <span className={styles.miniNum}>{STATS.countries}</span>
              <span className={styles.miniLabel}>{t('stat3Label')}</span>
            </div>
          </div>
        </div>

        {/* RIGHT — features */}
        <div className={`${styles.right} reveal from-right`}>
          {FEATURE_KEYS.map(f => (
            <div key={f.titleKey} className={styles.feat}>
              <div className={styles.featIcon}>
                <f.Icon size={20} strokeWidth={2} />
              </div>
              <div>
                <div className={styles.featTitle}>{t(f.titleKey)}</div>
                <div className={styles.featSub}>{t(f.subKey)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
