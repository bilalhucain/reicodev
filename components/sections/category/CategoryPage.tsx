'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { PROJECTS, type ProjectCard } from '@/lib/data';
import styles from './CategoryPage.module.css';

interface CategoryConfig {
  slug:        string;
  title:       string;
  accent:      string;
  badge:       string;
  description: string;
  stats:       { icon:string; num:string; label:string }[];
  tech:        { icon:string; name:string }[];
  whyUs:       { icon:string; title:string; desc:string }[];
}

interface CategoryPageProps {
  config: CategoryConfig;
}

export default function CategoryPage({ config }: CategoryPageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const projects = PROJECTS.filter(p => p.category === config.slug);
  const featured = projects.find(p => p.featured) ?? projects[0];

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),{ threshold:0.06 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  },[]);

  return (
    <div ref={ref}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={`${styles.orb} ${styles.orb1}`} aria-hidden/>
        <div className={`${styles.orb} ${styles.orb2}`} aria-hidden/>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <div className="pill reveal" style={{ marginBottom:20 }}>
              <span className="pill-dot"/>{config.badge}
            </div>
            <h1 className={`${styles.heroH1} reveal`}>
              {config.title.split(new RegExp(`(${config.accent})`,'i')).map((part, i) =>
                part.toLowerCase() === config.accent.toLowerCase()
                  ? <span key={i} className="sec-accent">{part}</span>
                  : part
              )}
            </h1>
            <p className={`${styles.heroDesc} reveal`}>{config.description}</p>
            <div className="reveal" style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
              <Link href="/get-a-quote" className="btn btn-primary btn-lg">Start Your Project</Link>
              <Link href="/contact" className="btn btn-ghost btn-lg">Free Consultation</Link>
            </div>
          </div>
        </div>
        {/* Stats strip */}
        <div className="container" style={{ marginTop:48 }}>
          <div className="stat-strip reveal" style={{ gridTemplateColumns:`repeat(${config.stats.length},1fr)` }}>
            {config.stats.map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-icon">{s.icon}</div>
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECT ── */}
      {featured && (
        <section className="section section-dark2">
          <div className="container">
            <div className="sec-head reveal">
              <div className="eyebrow"><span className="eyebrow-line"/>Featured Project</div>
              <h2 className="sec-title">Highlighted <span className="sec-accent">Case Study</span></h2>
              <div className="sec-line"/>
            </div>
            <div className={`${styles.featCard} card reveal`}>
              <div className={styles.featImg}>
                {featured.screenshot ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={featured.screenshot} alt={featured.title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top', borderRadius:'var(--r-xl)', display:'block' }}/>
                ) : (
                  <div style={{ width:'100%', height:'100%', background:'var(--c-bg2)', borderRadius:'var(--r-xl)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:8 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" style={{opacity:0.3}}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                    <span style={{fontSize:12,color:'var(--c-dim)'}}>Screenshot coming soon</span>
                  </div>
                )}
              </div>
              <div className={styles.featInfo}>
                <div style={{ display:'flex', gap:6, marginBottom:14, flexWrap:'wrap' }}>
                  {featured.tags.map((t,i) => <span key={t} className={`tag ${featured.tagColors[i]||'tag-dim'}`}>{t}</span>)}
                </div>
                <h3 className={styles.featTitle}>{featured.title}</h3>
                <p className={styles.featDesc}>{featured.description}</p>
                <div className={styles.featMeta}>
                  <div><span className={styles.metaLabel}>Industry</span><span className={styles.metaVal}>{featured.industry}</span></div>
                  <div><span className={styles.metaLabel}>Location</span><span className={styles.metaVal}>{featured.location}</span></div>
                </div>
                {featured.hasDetailPage
                  ? <Link href={`/our-work/${featured.slug}`} className="btn btn-primary">View Full Case Study →</Link>
                  : <a href={featured.liveUrl !== '#' ? featured.liveUrl : undefined} target="_blank" rel="noopener noreferrer" className="btn btn-primary">View Live Project →</a>
                }
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── ALL PROJECTS ── */}
      <section className="section section-dark">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow"><span className="eyebrow-line"/>All {config.slug.charAt(0).toUpperCase()+config.slug.slice(1)} Projects</div>
            <h2 className="sec-title">Our <span className="sec-accent">Recent Work</span></h2>
            <div className="sec-line"/>
          </div>
          <div className={styles.projGrid}>
            {projects.map((p, i) => (
              <div key={p.slug} className={`card proj-card reveal`} style={{ transitionDelay:`${i*0.07}s` }}>
                <div className="proj-card-img">
                  {p.screenshot ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.screenshot} alt={p.title} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'top center', display:'block', transition:'transform 0.5s ease' }} />
                  ) : (
                    <div style={{ width:'100%', height:'100%', background:'var(--c-bg2)', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:6 }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" style={{opacity:0.3}}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
                      <span style={{fontSize:10,color:'var(--c-dim)'}}>Coming soon</span>
                    </div>
                  )}
                </div>
                <div className="proj-card-body">
                  <div className="proj-card-tags">
                    {p.tags.map((t,ti) => <span key={t} className={`tag ${p.tagColors[ti]||'tag-dim'}`}>{t}</span>)}
                  </div>
                  <div className="proj-card-title">{p.title}</div>
                  <div className="proj-card-desc">{p.description}</div>
                  <div className="proj-card-footer">
                    <span className="proj-card-cat">{p.location}</span>
                    {p.hasDetailPage
                      ? <Link href={`/our-work/${p.slug}`} className="proj-card-link">Case Study →</Link>
                      : <a href={p.liveUrl !== '#' ? p.liveUrl : undefined} target="_blank" rel="noopener noreferrer" className="proj-card-link">Live Site →</a>
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNOLOGIES ── */}
      <section className="section section-dark2">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow"><span className="eyebrow-line"/>Tech Stack</div>
            <h2 className="sec-title">Tools &amp; <span className="sec-accent">Technologies</span></h2>
            <div className="sec-line"/>
          </div>
          <div className="tech-grid reveal">
            {config.tech.map(t => (
              <div key={t.name} className="tech-item">
                <span className="tech-icon">{t.icon}</span>{t.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="section section-dark">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow"><span className="eyebrow-line"/>Why Choose Reicodev</div>
            <h2 className="sec-title">Our <span className="sec-accent">Advantages</span></h2>
            <div className="sec-line"/>
          </div>
          <div className={styles.whyGrid}>
            {config.whyUs.map((w, i) => (
              <div key={w.title} className={`card reveal`} style={{ padding:28, transitionDelay:`${i*0.08}s` }}>
                <div style={{ fontSize:28, marginBottom:12 }}>{w.icon}</div>
                <h3 style={{ fontSize:16, fontWeight:900, color:'var(--c-txt)', marginBottom:8 }}>{w.title}</h3>
                <p style={{ fontSize:13, color:'var(--c-muted)', lineHeight:1.7 }}>{w.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign:'center', marginTop:40 }} className="reveal">
            <Link href="/get-a-quote" className="btn btn-primary btn-lg">Start Your {config.slug.charAt(0).toUpperCase()+config.slug.slice(1)} Project →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
