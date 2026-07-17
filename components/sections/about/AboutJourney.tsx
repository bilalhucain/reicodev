'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Laptop, Globe2, GraduationCap, Briefcase, Flame, Trophy, type LucideIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS } from '@/lib/data';
import styles from './AboutJourney.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const STEPS: { milestoneKey: string; year: string; Icon: LucideIcon; active: boolean }[] = [
  { milestoneKey: '2013',  year: '2013',  Icon: Laptop,         active: false },
  { milestoneKey: '2015',  year: '2015',  Icon: Globe2,         active: false },
  { milestoneKey: '2016a', year: '2016',  Icon: GraduationCap,  active: false },
  { milestoneKey: '2016b', year: '2016',  Icon: Briefcase,      active: false },
  { milestoneKey: '2020',  year: '2020',  Icon: Flame,          active: false },
  { milestoneKey: 'today', year: 'Today', Icon: Trophy,         active: true  },
];

export default function AboutJourney() {
  const t = useTranslations('about');
  const ref = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
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

  // GSAP: the connecting line draws left-to-right as the timeline
  // scrolls into view, then each icon pops in with an elastic ease —
  // order matters here, so the motion reinforces chronology.
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: 'left center',
            ease: 'none',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 78%',
              end: 'bottom 55%',
              scrub: 0.6,
            },
          }
        );
      }
      gsap.fromTo(
        stepRefs.current.map(el => el?.querySelector(`.${styles.iconWrap}`)),
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: 'elastic.out(1, 0.6)',
          stagger: 0.1,
          scrollTrigger: { trigger: timelineRef.current, start: 'top 75%', once: true },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  const bindHover = (el: HTMLDivElement | null) => {
    if (!el) return;
    const icon = el.querySelector<HTMLElement>(`.${styles.iconWrap}`);
    el.addEventListener('mouseenter', () => gsap.to(icon, { scale: 1.12, duration: 0.3, ease: 'power2.out' }));
    el.addEventListener('mouseleave', () => gsap.to(icon, { scale: 1, duration: 0.4, ease: 'power3.out' }));
  };

  return (
    <section className="section section-dark2" ref={ref}>
      <div className="container">
        <div className={styles.head}>
          <div className="eyebrow"><span className="eyebrow-line" />{t('journeySectionLabel')}</div>
          <h2 className="sec-title">{t('journeyHeading').split(' ').map((w, i) =>
            i === t('journeyHeading').split(' ').length - 1
              ? <span key={i} className="sec-accent">{w}</span>
              : <span key={i}>{w} </span>
          )}</h2>
          <p className={styles.sub}>{t('journeySubtitle')}</p>
        </div>
        <div className={styles.timeline} ref={timelineRef}>
          <div className={styles.line} aria-hidden>
            <div className={styles.lineFill} ref={lineRef} />
          </div>
          {STEPS.map((s, i) => (
            <div
              key={`${s.milestoneKey}-${i}`}
              ref={el => { stepRefs.current[i] = el; bindHover(el); }}
              className={`${styles.step} ${s.active ? styles.active : ''} reveal`}
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <div className={styles.iconWrap}>
                <s.Icon size={26} strokeWidth={1.8} />
              </div>
              <div className={styles.year}>{s.milestoneKey === 'today' ? t('milestones.today.title') && s.year : s.year}</div>
              <div className={styles.title}>{t(`milestones.${s.milestoneKey}.title`)}</div>
              <div className={styles.desc}>
                {s.milestoneKey === 'today'
                  ? t('milestones.today.desc').replace('{projects}', STATS.projects).replace('{reviews}', STATS.reviews)
                  : t(`milestones.${s.milestoneKey}.desc`)
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
