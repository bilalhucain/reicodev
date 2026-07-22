'use client';

import dynamic from 'next/dynamic';
import type { Testimonial } from '@/lib/testimonials';
import styles from './ReviewsHero.module.css';

/*
 * next/dynamic with ssr:false is what keeps Three.js + the CSS3DRenderer
 * out of every other route's bundle — it's only fetched when someone
 * actually lands on /reviews. This wrapper has to be a Client Component
 * for ssr:false to be legal in the App Router; the actual translated
 * strings/data still come from the server-rendered page above it.
 */
const ReviewsSphere = dynamic(() => import('./ReviewsSphere'), {
  ssr: false,
  loading: () => <div className={styles.sceneLoading} aria-hidden="true" />,
});

interface Props {
  items: Testimonial[];
  locale: string;
  repeatClientLabel: string;
  closeLabel: string;
  viewReviewLabel: string;
  eyebrow: string;
  heading: string;
  statsLabel: string;
  avgRating: number;
}

export default function ReviewsHero({
  items, locale, repeatClientLabel, closeLabel, viewReviewLabel,
  eyebrow, heading, statsLabel, avgRating,
}: Props) {
  return (
    <section className={`section section-dark2 ${styles.stage}`}>
      <div className={styles.intro}>
        <div className="eyebrow">
          <span className="eyebrow-line" />
          {eyebrow}
        </div>
        <h1 className={styles.heading}>{heading}</h1>
        <div className={styles.stat}>
          <span className={styles.statRating}>{avgRating.toFixed(1)}</span>
          <span className={styles.statStars} aria-hidden="true">★★★★★</span>
          <span className={styles.statLabel}>{statsLabel}</span>
        </div>
      </div>

      <div className={styles.scene}>
        <ReviewsSphere
          items={items}
          locale={locale}
          repeatClientLabel={repeatClientLabel}
          closeLabel={closeLabel}
          viewReviewLabel={viewReviewLabel}
        />
      </div>
    </section>
  );
}
