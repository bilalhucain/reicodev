'use client';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { TESTIMONIALS } from '@/lib/data';
import styles from './HomeTestimonials.module.css';

export default function HomeTestimonials() {
  const t = useTranslations('home');
  const ref = useRef<HTMLElement>(null);

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

  return (
    <section className="section section-dark2" ref={ref}>
      <div className="container">
        <div className="sec-head reveal">
          <div className="eyebrow"><span className="eyebrow-line" />{t('testimonialsSectionLabel')}</div>
          <h2 className="sec-title">
            {t('testimonialsHeading').split(' ').slice(0, -1).join(' ')}{' '}
            <span className="sec-accent">{t('testimonialsHeading').split(' ').slice(-1)}</span>
          </h2>
          <p className="sec-sub">{t('testimonialsSubtitle')}</p>
          <div className="sec-line" />
        </div>
        <div className={styles.grid}>
          {TESTIMONIALS.map((test, i) => (
            <div key={test.name} className="card testi-card reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
              <div className="testi-stars">{'★'.repeat(test.rating)}</div>
              {/* Client quotes stay in original language — do not translate */}
              <p className="testi-text">&ldquo;{test.text}&rdquo;</p>
              <div className="testi-author">
                <div className="testi-avatar">{test.initials}</div>
                <div>
                  <div className="testi-name">{test.name}</div>
                  <div className="testi-role">{test.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
