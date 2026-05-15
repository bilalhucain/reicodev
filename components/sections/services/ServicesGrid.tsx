'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import styles from './ServicesGrid.module.css';

// id field maps to the anchor hash used in the footer links in lib/data.ts
const SERVICES = [
  { id: 'wordpress',   img: '/images/home-service-wordpress-icon.svg',   alt: 'WordPress',   color:'#6C4BFF',  badge:'Most Popular', title:'WordPress Website Development',  desc:'Custom-designed WordPress websites optimised for speed, security and conversions.', includes:['Custom Design','Mobile Responsive','Speed Optimised','Contact Form','1 Year Support','SEO Foundations'] },
  { id: 'woocommerce', img: '/images/home-service-woocommerce-icon.svg', alt: 'WooCommerce', color:'#10B981',  badge:'',             title:'WooCommerce Store Development',  desc:'Fully functional eCommerce stores that convert visitors into paying customers.', includes:['Full Store Setup','Payment Gateways','Product Management','Shipping Config','Cart Optimisation','1 Year Support'] },
  { id: 'shopify',     img: '/images/home-service-shopify-icon.svg',     alt: 'Shopify',     color:'#5EE9FF',  badge:'',             title:'Shopify Store Development',      desc:'High-converting Shopify stores with custom themes and full feature integration.', includes:['Theme Customisation','Product Uploads','Payment Setup','App Integration','Speed Optimisation','Post-Launch Support'] },
  { id: 'bug-fixes',   img: '/images/service-bug-fix-icon.svg',          alt: 'Bug Fix',     color:'#F59E0B',  badge:'',             title:'WordPress Bug Fixes',            desc:'Fast, reliable fixes for any WordPress issue — errors, conflicts and more.',  includes:['Quick Diagnosis','Fix Report','Plugin Conflicts','PHP & DB Issues','Same-Day Service','No Fix = No Charge'] },
  { id: 'maintenance', img: '/images/service-maintenance-icon.svg',      alt: 'Maintenance', color:'#8B5CFF',  badge:'',             title:'WordPress Maintenance',          desc:'Ongoing monthly care plan to keep your website running perfectly and securely.', includes:['Daily Backups','Core + Plugin Updates','Uptime Monitoring','Speed Checks','Security Scanning','Monthly Report'] },
  { id: 'speed',       img: '/images/service-speed-icon.svg',            alt: 'Speed',       color:'#EF4444',  badge:'',             title:'WordPress Speed Optimisation',   desc:'We turbocharge your website to achieve 90+ PageSpeed scores.', includes:['PageSpeed Audit','Image Optimisation','CDN Setup','Caching Config','Database Optimisation','GTmetrix Report'] },
  { id: 'seo',         img: '/images/home-service-seo-icon.svg',         alt: 'SEO',         color:'#F59E0B',  badge:'',             title:'SEO & Digital Marketing',        desc:'Rank higher on Google and grow organic traffic with data-driven strategies.', includes:['Keyword Research','On-Page SEO','Technical SEO','Monthly Reports','Link Building','Google Analytics'] },
  { id: 'branding',    img: '/images/home-service-branding-icon.svg',    alt: 'Branding',    color:'#8B5CFF',  badge:'',             title:'Brand Identity Design',          desc:'Memorable brand identities — logo, colours, typography and guidelines.', includes:['Logo Design','Colour Palette','Typography','Brand Guidelines','Business Card','Social Media Kit'] },
];

export default function ServicesGrid() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')), { threshold: 0.06 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className={`section section-dark ${styles.section}`} ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line"/>All Services</div>
          <h2 className="sec-title">Our <span className="sec-accent">Core Services</span></h2>
          <p className="sec-sub">Every service is designed to solve a real problem and deliver measurable value for your business.</p>
          <div className="sec-line"/>
        </div>
        <div className={styles.grid}>
          {SERVICES.map((s, i) => (
            // id="wordpress" etc. — matches the anchor hashes in lib/data.ts FOOTER service links
            <div key={s.title} id={s.id} className={`card ${styles.card} reveal`} style={{ transitionDelay:`${i*0.06}s` }}>
              <div className={styles.cardBody}>
                {s.badge && <div className={styles.badge}>{s.badge}</div>}
                <div className={styles.iconWrap} style={{ background:`${s.color}18`, border:`1px solid ${s.color}28` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={s.img} alt={s.alt} className={styles.iconImg} />
                </div>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.desc}>{s.desc}</p>
                <ul className={styles.includes}>
                  {s.includes.map(it => (
                    <li key={it} className={styles.includeItem}>
                      <span className={styles.check}>✓</span>{it}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={styles.cardFoot}>
                <Link href="/get-a-quote" className="btn btn-primary btn-sm">Get a Quote</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
