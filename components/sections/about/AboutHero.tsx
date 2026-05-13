'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { STATS } from '@/lib/data';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import styles from './AboutHero.module.css';

const FEATURES = [
  { icon:'🎯', title:'Client-First Approach',   sub:'Your goals are my top priority from day one.' },
  { icon:'⚡', title:'Clean & Modern Design',   sub:'Beautiful, functional and conversion-focused.' },
  { icon:'🚀', title:'Performance Focused',      sub:'Fast, secure and optimised for the best results.' },
  { icon:'🤝', title:'Reliable & Transparent',  sub:'Clear communication and on-time delivery.' },
];

export default function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),{ threshold:0.08 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  },[]);

  return (
    <section className={styles.hero} ref={ref}>
      <div className={`${styles.orb} ${styles.orb1}`} aria-hidden/>
      <div className={`${styles.orb} ${styles.orb2}`} aria-hidden/>

      <div className={`container ${styles.inner}`}>

        {/* LEFT — text */}
        <div className={`${styles.left} reveal from-left`}>
          <div className="pill" style={{ marginBottom:20 }}>
            <span className="pill-dot"/>About Reicodev
          </div>
          <h1 className={styles.h1}>
            My Journey.<br/>My Passion.<br/>
            <span className={styles.accent}>Your Success.</span>
          </h1>
          <p className={styles.desc}>
            I&apos;m not just building websites — I build digital solutions that help businesses grow. Every project I take is personal, because I believe your success is my success.
          </p>
          <div className={styles.sig}>
            <div className={styles.sigName}>Bilal Hussain</div>
            <div className={styles.sigRole}>Founder &amp; Lead Developer — Reicodev</div>
          </div>
          <div className={styles.fiverrStrip}>
            <span className={styles.fiverrLogo}>fiverr</span>
            <span className={styles.fiverrSep}/>
            <div className={styles.fiverrStat}>
              <span className={styles.fiverrNum}>4.9★</span>
              <span className={styles.fiverrLabel}>Rating</span>
            </div>
            <span className={styles.fiverrSep}/>
            <div className={styles.fiverrStat}>
              <span className={styles.fiverrNum}>{STATS.fiverr_orders}</span>
              <span className={styles.fiverrLabel}>Orders</span>
            </div>
            <span className={styles.fiverrSep}/>
            <div className={styles.fiverrStat}>
              <span className={styles.fiverrNum}>{STATS.reviews}</span>
              <span className={styles.fiverrLabel}>Reviews</span>
            </div>
          </div>
          <div className={styles.btns}>
            <Link href="/get-a-quote" className="btn btn-primary">Start a Project</Link>
            <Link href="/services" className="btn btn-ghost">View Services</Link>
          </div>
        </div>

        {/* CENTER — photo placeholder */}
        <div className={`${styles.center} reveal`}>
          <div className={styles.photoRing}>
            <div className={styles.photoInner}>
              {/*
                PHOTO PLACEHOLDER
                ─────────────────
                This <img> currently shows nothing (src="#").
                To add your photo:
                  Option A — WordPress ACF:
                    Wire the ACF field "founder_photo" (Image field, return URL)
                    and replace src="#" with your ACF image URL fetched from WP REST API.
                  Option B — Static asset:
                    Put your photo at /public/images/bilal.jpg
                    and change to <Image src="/images/bilal.jpg" …/>
              */}
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
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span style={{ fontSize: 11, color: 'var(--c-dim)', textAlign: 'center', lineHeight: 1.4 }}>
                    Add photo via WordPress<br/>
                    <code style={{ fontSize: 10 }}>ACF: founder_photo</code>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.badge}>
            <div className={styles.badgeIcon}>🛡️</div>
            <div>
              <div className={styles.badgeText}>I take care of your project as my own.</div>
            </div>
          </div>

          <div className={styles.miniStats}>
            <div className={styles.miniStat}>
              <span className={styles.miniNum}>{STATS.clients}</span>
              <span className={styles.miniLabel}>Clients</span>
            </div>
            <div className={styles.miniSep}/>
            <div className={styles.miniStat}>
              <span className={styles.miniNum}>{STATS.projects}</span>
              <span className={styles.miniLabel}>Projects</span>
            </div>
            <div className={styles.miniSep}/>
            <div className={styles.miniStat}>
              <span className={styles.miniNum}>{STATS.countries}</span>
              <span className={styles.miniLabel}>Countries</span>
            </div>
          </div>
        </div>

        {/* RIGHT — features */}
        <div className={`${styles.right} reveal from-right`}>
          {FEATURES.map(f => (
            <div key={f.title} className={styles.feat}>
              <div className={styles.featIcon}>{f.icon}</div>
              <div>
                <div className={styles.featTitle}>{f.title}</div>
                <div className={styles.featSub}>{f.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
