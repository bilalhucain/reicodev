'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import PlaceholderImage from '@/components/ui/PlaceholderImage';
import styles from './ProjectPage.module.css';

export interface ProjectPageData {
  slug:      string;
  title:     string;
  category:  string;
  industry:  string;
  location:  string;
  liveUrl:   string;
  tags:      string[];
  tagColors: string[];
  overview:  string;
  role:      string;
  duration:  string;
  technologies: string[];
  services: { icon:string; title:string; desc:string }[];
  features:    { icon:string; title:string; desc:string }[];
  challenges:  string[];
  solutions:   string[];
  results:     { num:string; label:string; sub:string }[];
  galleryCount?: number; // number of placeholder gallery images
}

interface ProjectPageProps {
  data: ProjectPageData;
  children?: React.ReactNode; // extra content (e.g. branding palette)
}

export default function ProjectPage({ data, children }: ProjectPageProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),{ threshold:0.06 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  },[]);

  const galleryCount = data.galleryCount ?? 3;

  return (
    <div ref={ref}>
      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={`${styles.orb} ${styles.orb1}`} aria-hidden/>
        <div className="container">
          <div className={styles.heroCrumbs}>
            <Link href="/our-work" className={styles.crumb}>Our Work</Link>
            <span className={styles.crumbSep}>/</span>
            <Link href={`/our-work/${data.category}-projects`} className={styles.crumb}>{data.category.charAt(0).toUpperCase()+data.category.slice(1)} Projects</Link>
            <span className={styles.crumbSep}>/</span>
            <span className={styles.crumbCurrent}>{data.title}</span>
          </div>

          <div className={styles.heroGrid}>
            <div className={`${styles.heroText} reveal from-left`}>
              <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
                {data.tags.map((t,i) => <span key={t} className={`tag ${data.tagColors[i]||'tag-dim'}`}>{t}</span>)}
              </div>
              <h1 className={styles.heroH1}>{data.title}</h1>
              <p className={styles.heroDesc}>{data.overview}</p>
              <div className={styles.heroMeta}>
                <div className={styles.metaItem}><span className={styles.metaLabel}>Industry</span><span className={styles.metaVal}>{data.industry}</span></div>
                <div className={styles.metaSep}/>
                <div className={styles.metaItem}><span className={styles.metaLabel}>Location</span><span className={styles.metaVal}>{data.location}</span></div>
                <div className={styles.metaSep}/>
                <div className={styles.metaItem}><span className={styles.metaLabel}>Duration</span><span className={styles.metaVal}>{data.duration}</span></div>
                <div className={styles.metaSep}/>
                <div className={styles.metaItem}><span className={styles.metaLabel}>Role</span><span className={styles.metaVal}>{data.role}</span></div>
              </div>
              <div className={styles.heroBtns}>
                {data.liveUrl !== '#' && (
                  <a href={data.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    🔗 View Live Site
                  </a>
                )}
                <Link href="/get-a-quote" className="btn btn-ghost">Start Similar Project</Link>
              </div>
            </div>

            {/* Hero screenshot */}
            <div className={`${styles.heroImg} reveal from-right`}>
              <PlaceholderImage
                isBrowser
                url={data.liveUrl !== '#' ? data.liveUrl : `${data.slug}.com`}
                label={`${data.title} — Hero Screenshot`}
                acfKey={`project_${data.slug}_hero`}
                ratio="16:9"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES & TECH ── */}
      <section className="section section-dark2">
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, alignItems:'start' }}>
            <div>
              <div className="sec-head" style={{ textAlign:'left', marginBottom:28 }}>
                <div className="eyebrow"><span className="eyebrow-line"/>What We Did</div>
                <h2 className="sec-title" style={{ margin:0 }}>Services <span className="sec-accent">Delivered</span></h2>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                {data.services.map(s => (
                  <div key={s.title} className={`card ${styles.serviceCard} reveal`}>
                    <div className={styles.sIcon}>{s.icon}</div>
                    <div>
                      <div className={styles.sTitle}>{s.title}</div>
                      <div className={styles.sDesc}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="sec-head" style={{ textAlign:'left', marginBottom:28 }}>
                <div className="eyebrow"><span className="eyebrow-line"/>Stack</div>
                <h2 className="sec-title" style={{ margin:0 }}>Technologies <span className="sec-accent">Used</span></h2>
              </div>
              <div className="tech-grid reveal">
                {data.technologies.map(t => <div key={t} className="tech-item">💻 {t}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section className="section section-dark">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow"><span className="eyebrow-line"/>Features</div>
            <h2 className="sec-title">Key <span className="sec-accent">Features</span></h2>
            <div className="sec-line"/>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:18 }}>
            {data.features.map((f, i) => (
              <div key={f.title} className={`card ${styles.featCard} reveal`} style={{ transitionDelay:`${i*0.07}s` }}>
                <div className={styles.fIcon}>{f.icon}</div>
                <h3 className={styles.fTitle}>{f.title}</h3>
                <p className={styles.fDesc}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHALLENGES & SOLUTIONS ── */}
      <section className="section section-dark2">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow"><span className="eyebrow-line"/>Problem → Solution</div>
            <h2 className="sec-title">Challenges &amp; <span className="sec-accent">Solutions</span></h2>
            <div className="sec-line"/>
          </div>
          <div className="cs-grid reveal">
            <div className="cs-card cs-challenge">
              <div className="cs-label">⚠️ Challenges</div>
              <ul className="cs-list">
                {data.challenges.map(c => (
                  <li key={c} className="cs-item"><span className="cs-icon" style={{ color:'var(--c-red)' }}>✕</span>{c}</li>
                ))}
              </ul>
            </div>
            <div className="cs-card cs-solution">
              <div className="cs-label">✅ Our Solutions</div>
              <ul className="cs-list">
                {data.solutions.map(s => (
                  <li key={s} className="cs-item"><span className="cs-icon" style={{ color:'var(--c-green)' }}>✓</span>{s}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── RESULTS ── */}
      <section className="section section-dark">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow"><span className="eyebrow-line"/>Outcomes</div>
            <h2 className="sec-title">Project <span className="sec-accent">Results</span></h2>
            <div className="sec-line"/>
          </div>
          <div className={`results-grid reveal`}>
            {data.results.map(r => (
              <div key={r.label} className="result-card">
                <div className="result-num">{r.num}</div>
                <div className="result-label">{r.label}</div>
                <div className="result-sub">{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="section section-dark2">
        <div className="container">
          <div className="sec-head reveal">
            <div className="eyebrow"><span className="eyebrow-line"/>Gallery</div>
            <h2 className="sec-title">Project <span className="sec-accent">Screenshots</span></h2>
            <p className="sec-sub">Preview the design and features of the completed project.</p>
            <div className="sec-line"/>
          </div>
          {children}
          <div className={styles.gallery}>
            {Array.from({ length: galleryCount }).map((_, i) => (
              <div key={i} className={`reveal ${styles.galleryItem}`} style={{ transitionDelay:`${i*0.08}s` }}>
                <PlaceholderImage
                  isBrowser
                  url={data.liveUrl !== '#' ? data.liveUrl : 'project.com'}
                  label={`Screenshot ${i+1} — Add via ACF`}
                  acfKey={`project_${data.slug}_gallery_${i+1}`}
                  ratio={i === 0 ? '16:9' : '4:3'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section section-dark">
        <div className="container">
          <div className="cta-section reveal">
            <div className="cta-orb" style={{ width:400,height:400,background:'rgba(108,75,255,0.14)',top:-150,right:-100 }} aria-hidden/>
            <h2 className="cta-title">Want Similar Results<br/><span className="sec-accent">for Your Business?</span></h2>
            <p className="cta-sub">Let&apos;s discuss your project and create a custom solution that drives real growth.</p>
            <div className="cta-btns">
              <Link href="/get-a-quote" className="btn btn-primary btn-lg">Start Your Project</Link>
              <Link href="/our-work" className="btn btn-ghost btn-lg">View More Projects</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
