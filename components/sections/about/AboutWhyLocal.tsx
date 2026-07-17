'use client';
import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { UserCheck, ShieldCheck, Repeat, type LucideIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutWhyLocal.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

type Item = { num: string; Icon: LucideIcon; title: string; desc: string };
type Copy = { eyebrow: string; heading: string; headingAccent: string; items: Item[] };

/*
  Replaces the old "same timezone / same language" messaging with a
  numbered process track (same visual language as the "How I Build
  Every Project" section: connecting line, icon rings, staggered
  reveal) but focused on why working with us directly is better —
  no timezone or language framing.
*/
const COPY: Record<string, Copy> = {
  fi: {
    eyebrow: 'MIKSI MEIDÄT',
    heading: 'Pieni tiimi,',
    headingAccent: 'suuri sitoutuminen',
    items: [
      { num: '01', Icon: UserCheck, title: 'Ei välikäsiä', desc: 'Puhut suoraan perustajan tai projektistasi vastaavan henkilön kanssa, ei tukipalvelun kanssa.' },
      { num: '02', Icon: ShieldCheck, title: 'Läpinäkyvä prosessi', desc: 'Näet aina missä projektisi menee — selkeät päivitykset ilman yllätyksiä tai piilokuluja.' },
      { num: '03', Icon: Repeat, title: 'Pitkäaikainen tuki', desc: 'Emme katoa julkaisun jälkeen — autamme myös sivuston ylläpidossa ja jatkokehityksessä.' },
    ],
  },
  es: {
    eyebrow: 'POR QUÉ NOSOTROS',
    heading: 'Un equipo pequeño,',
    headingAccent: 'totalmente implicado',
    items: [
      { num: '01', Icon: UserCheck, title: 'Sin intermediarios', desc: 'Hablas directamente con el fundador o la persona responsable de tu proyecto, no con soporte técnico.' },
      { num: '02', Icon: ShieldCheck, title: 'Proceso transparente', desc: 'Siempre sabes en qué punto está tu proyecto — actualizaciones claras, sin sorpresas ni costes ocultos.' },
      { num: '03', Icon: Repeat, title: 'Soporte a largo plazo', desc: 'No desaparecemos tras el lanzamiento — te ayudamos con el mantenimiento y las mejoras futuras.' },
    ],
  },
  en: {
    eyebrow: 'WHY US',
    heading: 'A small team,',
    headingAccent: 'fully invested',
    items: [
      { num: '01', Icon: UserCheck, title: 'No middlemen', desc: 'You speak directly with the founder or the person actually running your project — never a support queue.' },
      { num: '02', Icon: ShieldCheck, title: 'A transparent process', desc: 'You always know where your project stands — clear updates along the way, no surprises or hidden costs.' },
      { num: '03', Icon: Repeat, title: 'Support that continues', desc: 'We don\u2019t disappear after launch — we\u2019re here for maintenance and whatever comes next.' },
    ],
  },
};

export default function AboutWhyLocal() {
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copy = COPY[locale] ?? COPY.en;

  // Same motion language as the "How I Build Every Project" track: a
  // progress line grows behind the steps as they scroll into view,
  // and each icon pops in with a stagger.
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
        stepRefs.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.12,
          scrollTrigger: { trigger: trackRef.current, start: 'top 78%', once: true },
        }
      );

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
  }, [locale]);

  const bindHover = (el: HTMLDivElement | null) => {
    if (!el) return;
    const ring = el.querySelector<HTMLElement>(`.${styles.iconRing}`);
    el.addEventListener('mouseenter', () => gsap.to(ring, { y: -6, scale: 1.08, duration: 0.35, ease: 'power2.out' }));
    el.addEventListener('mouseleave', () => gsap.to(ring, { y: 0, scale: 1, duration: 0.4, ease: 'power3.out' }));
  };

  return (
    <section className="section section-dark" ref={ref}>
      <div className={styles.bgGlow} aria-hidden />

      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{copy.eyebrow}</div>
          <h2 className="sec-title">
            {copy.heading} <span className="sec-accent">{copy.headingAccent}</span>
          </h2>
          <div className="sec-line" />
        </div>

        <div className={styles.track} ref={trackRef}>
          <div className={styles.lineTrack} aria-hidden>
            <div className={styles.lineFill} ref={lineFillRef} />
          </div>

          <div className={styles.steps}>
            {copy.items.map((it, i) => (
              <div
                key={it.title}
                ref={el => { stepRefs.current[i] = el; bindHover(el); }}
                className={styles.step}
              >
                <div className={styles.iconRing}>
                  <it.Icon size={24} strokeWidth={2} />
                </div>
                <div className={styles.num}>{it.num}</div>
                <div className={styles.title}>{it.title}</div>
                <p className={styles.desc}>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
