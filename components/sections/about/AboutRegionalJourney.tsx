'use client';
import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { Laptop, Briefcase, Users, Flag, type LucideIcon } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutRegionalJourney.module.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

/*
  This is the company's journey, not one person's — no names, no
  countries, just the arc from freelance beginnings to Reicodev.
*/
type Node = { year: string; title: string; desc: string; Icon: LucideIcon; gradient: string; milestone?: boolean };

type Copy = { eyebrow: string; heading: string; headingAccent: string; sub: string; nodes: Node[] };

const NODE_ICONS = { Laptop, Briefcase, Users, Flag };

const COPY: Record<string, Copy> = {
  fi: {
    eyebrow: 'MATKAMME',
    heading: 'Ensimmäisestä sivustosta',
    headingAccent: 'Reicodeviksi',
    sub: 'Lyhyt katsaus siihen, miten Reicodev syntyi.',
    nodes: [
      { year: '2013', title: 'Ensimmäinen verkkosivu', desc: 'Yksi asiakasprojekti — lähtökohta kaikelle, mitä siitä seurasi.', Icon: Laptop, gradient: 'blue' },
      { year: '2013–2025', title: 'Freelancerin vuodet', desc: 'Kokemusta kertyi WordPressistä, WooCommercesta ja SEO:sta — projekti kerrallaan.', Icon: Briefcase, gradient: 'amber' },
      { year: 'Matkan varrella', title: 'Tiimi alkoi muodostua', desc: 'Työn kasvaessa myös sen tekijät lisääntyivät — oikeat osaajat oikeisiin tehtäviin.', Icon: Users, gradient: 'green' },
      { year: '2026', title: 'Reicodev syntyy', desc: 'Freelance-työstä kasvoi studio — rakennettu palvelemaan asiakkaita suoraan.', Icon: Flag, gradient: 'purple', milestone: true },
    ],
  },
  es: {
    eyebrow: 'NUESTRO CAMINO',
    heading: 'De un primer sitio web',
    headingAccent: 'a Reicodev',
    sub: 'Un vistazo rápido a cómo llegó a existir Reicodev.',
    nodes: [
      { year: '2013', title: 'El primer sitio web', desc: 'Un único proyecto para un cliente — el punto de partida de todo lo que vino después.', Icon: Laptop, gradient: 'blue' },
      { year: '2013–2025', title: 'Años como freelance', desc: 'Construyendo experiencia en WordPress, WooCommerce y SEO — un proyecto a la vez.', Icon: Briefcase, gradient: 'amber' },
      { year: 'En el camino', title: 'Un equipo empezó a formarse', desc: 'A medida que crecía el trabajo, también lo hacían las personas detrás de él.', Icon: Users, gradient: 'green' },
      { year: '2026', title: 'Nace Reicodev', desc: 'El trabajo freelance se convirtió en un estudio — creado para atender directamente a los clientes.', Icon: Flag, gradient: 'purple', milestone: true },
    ],
  },
  en: {
    eyebrow: 'OUR JOURNEY',
    heading: 'From a first website',
    headingAccent: 'to Reicodev',
    sub: 'A quick look at how Reicodev came to be.',
    nodes: [
      { year: '2013', title: 'The first website', desc: 'A single client project — the starting point for everything that followed.', Icon: Laptop, gradient: 'blue' },
      { year: '2013 \u2013 2025', title: 'Years as a freelancer', desc: 'Building a track record across WordPress, WooCommerce and SEO \u2014 one client project at a time.', Icon: Briefcase, gradient: 'amber' },
      { year: 'Along the way', title: 'A team started to form', desc: 'As the work grew, so did the people behind it \u2014 bringing in the right specialists for the parts that needed more hands.', Icon: Users, gradient: 'green' },
      { year: '2026', title: 'Reicodev launches', desc: 'The freelance work became a proper studio \u2014 built to serve clients directly.', Icon: Flag, gradient: 'purple', milestone: true },
    ],
  },
};

export default function AboutRegionalJourney() {
  const locale = useLocale();
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const copy = COPY[locale] ?? COPY.en;

  // Same missing-observer bug as AboutFounders: the "sec-head reveal"
  // heading needs this to ever become visible.
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // The connecting line's height is tied directly to scroll
      // progress through the whole timeline — not a one-shot reveal.
      if (fillRef.current && trackRef.current) {
        gsap.fromTo(
          fillRef.current,
          { height: '0%' },
          {
            height: '100%',
            ease: 'none',
            scrollTrigger: {
              trigger: trackRef.current,
              start: 'top 65%',
              end: 'bottom 75%',
              scrub: 0.5,
            },
          }
        );
      }

      // Each node still gets its own reveal + icon pop as it arrives,
      // layered on top of the scrubbed line.
      nodeRefs.current.forEach((el) => {
        if (!el) return;
        const icon = el.querySelector(`.${styles.nodeIcon}`);
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
        gsap.fromTo(
          icon,
          { scale: 0, rotate: -90 },
          {
            scale: 1, rotate: 0, duration: 0.6, ease: 'elastic.out(1, 0.6)',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [locale]);

  return (
    <section className="section section-dark2" ref={ref}>
      <div className={styles.bgPattern} aria-hidden />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{copy.eyebrow}</div>
          <h2 className="sec-title">
            {copy.heading}<br /><span className="sec-accent">{copy.headingAccent}</span>
          </h2>
          <p className="sec-sub">{copy.sub}</p>
        </div>

        <div className={styles.timeline} ref={trackRef}>
          <div className={styles.line} aria-hidden>
            <div className={styles.lineFill} ref={fillRef} />
          </div>

          {copy.nodes.map((n, i) => (
            <div
              key={n.title}
              ref={el => { nodeRefs.current[i] = el; }}
              className={`${styles.node} ${n.milestone ? styles.milestone : ''}`}
            >
              <div className={`${styles.nodeIcon} ${styles[`grad${n.gradient}`]}`}>
                <n.Icon size={22} strokeWidth={2} />
              </div>
              <div className={styles.year}>{n.year}</div>
              <div className={styles.title}>{n.title}</div>
              <p className={styles.desc}>{n.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
