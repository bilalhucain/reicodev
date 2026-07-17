'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Rocket, Star, Globe2, Briefcase, type LucideIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { STATS } from '@/lib/data';
import styles from './AboutMilestones.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

export default function AboutMilestones() {
  const t = useTranslations('about');
  const ref = useRef<HTMLElement>(null);
  const numRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const ITEMS: { Icon: LucideIcon; num: string; labelKey: string }[] = [
    { Icon: Rocket,   num: STATS.projects, labelKey: 'ms1Label' },
    { Icon: Star,     num: STATS.reviews,  labelKey: 'ms2Label' },
    { Icon: Globe2,   num: STATS.clients,  labelKey: 'ms3Label' },
    { Icon: Briefcase, num: STATS.years,   labelKey: 'ms4Label' },
  ];

  // GSAP: count up each stat from 0 to its target once the band
  // scrolls into view, preserving any non-numeric suffix (e.g. "+").
  useEffect(() => {
    const ctx = gsap.context(() => {
      numRefs.current.forEach((el) => {
        if (!el) return;
        const raw = el.dataset.value ?? '0';
        const match = raw.match(/[\d,]+/);
        if (!match) return;
        const target = parseInt(match[0].replace(/,/g, ''), 10);
        const suffix = raw.slice(match.index! + match[0].length);
        const prefix = raw.slice(0, match.index);
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          onUpdate: () => {
            el.textContent = `${prefix}${Math.floor(counter.val).toLocaleString()}${suffix}`;
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section className="section section-dark" ref={ref}>
      <div className="container">
        <div className={`${styles.band} reveal`}>
          <div className={styles.bgGlow} aria-hidden />
          <div className={styles.left}>
            <h2 className={styles.title}>
              {t('milestonesHeading').split('<br>').map((line, i, arr) => (
                <span key={i}>
                  {i === arr.length - 1
                    ? <span className={styles.accent}>{line}</span>
                    : <>{line}<br /></>
                  }
                </span>
              ))}
            </h2>
            <p className={styles.sub}>{t('milestonesSubtitle')}</p>
            <div className={styles.line} />
          </div>
          <div className={styles.grid}>
            {ITEMS.map((it, i) => (
              <div key={it.labelKey} className={styles.item}>
                <div className={styles.icon}><it.Icon size={26} strokeWidth={1.8} /></div>
                <div
                  className={styles.num}
                  ref={el => { numRefs.current[i] = el; }}
                  data-value={it.num}
                >
                  0
                </div>
                <div className={styles.label}>{t(it.labelKey)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
