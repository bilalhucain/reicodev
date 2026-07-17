'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Search, ClipboardList, Zap, MessageCircle, Rocket, type LucideIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutApproach.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const STEPS_META: { num: string; Icon: LucideIcon; titleKey: string; descKey: string }[] = [
  { num: '01', Icon: Search,        titleKey: 'approach1Title', descKey: 'approach1Description' },
  { num: '02', Icon: ClipboardList, titleKey: 'approach2Title', descKey: 'approach2Description' },
  { num: '03', Icon: Zap,           titleKey: 'approach3Title', descKey: 'approach3Description' },
  { num: '04', Icon: MessageCircle, titleKey: 'approach4Title', descKey: 'approach4Description' },
  { num: '05', Icon: Rocket,        titleKey: 'approach5Title', descKey: 'approach5Description' },
];

export default function AboutApproach() {
  const t = useTranslations('about');
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  // GSAP: a progress line grows behind the steps as they scroll into
  // view, and each icon pops in with a stagger — this is a real
  // sequence (a 5-step process), so the motion should read as order.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineFillRef.current) {
        gsap.fromTo(
          lineFillRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            transformOrigin: 'left center',
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 80%',
              end: 'bottom 60%',
              scrub: 0.6,
            },
          }
        );
      }
      gsap.fromTo(
        stepRefs.current.map(el => el?.querySelector(`.${styles.iconRing}`)),
        { scale: 0, rotate: -90, opacity: 0 },
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'back.out(2)',
          stagger: 0.12,
          scrollTrigger: { trigger: trackRef.current, start: 'top 75%', once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const bindHover = (el: HTMLDivElement | null) => {
    if (!el) return;
    const ring = el.querySelector<HTMLElement>(`.${styles.iconRing}`);
    el.addEventListener('mouseenter', () => gsap.to(ring, { y: -6, scale: 1.08, duration: 0.35, ease: 'power2.out' }));
    el.addEventListener('mouseleave', () => gsap.to(ring, { y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }));
  };

  return (
    <section className="section section-dark" ref={ref}>
      {/* Ambient background element */}
      <div className={styles.bgGlow} aria-hidden />

      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('approachSectionLabel')}</div>
          <h2 className="sec-title">
            {t('approachHeading').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="sec-accent">{t('approachHeading').split(' ').slice(-1)}</span>
          </h2>
          <div className="sec-line" />
        </div>

        <div className={styles.track} ref={trackRef}>
          <div className={styles.lineTrack} aria-hidden>
            <div className={styles.lineFill} ref={lineFillRef} />
          </div>

          <div className="process-steps">
            {STEPS_META.map((s, i) => (
              <div
                key={s.num}
                ref={el => { stepRefs.current[i] = el; bindHover(el); }}
                className="process-step"
              >
                <div className={styles.iconRing}>
                  <s.Icon size={24} strokeWidth={2} />
                </div>
                <div className="process-num">{s.num}</div>
                <div className="process-title">{t(s.titleKey)}</div>
                <div className="process-desc">{t(s.descKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
