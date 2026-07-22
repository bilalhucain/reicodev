import type { Testimonial } from '@/lib/testimonials';
import { getTestimonialText, getTestimonialCountry } from '@/lib/testimonials';
import styles from './ReviewCard.module.css';

interface Props {
  review: Testimonial;
  locale: string;
  repeatClientLabel: string;
  /** Smaller, more clamped variant used inside the 3D sphere. */
  compact?: boolean;
}

/**
 * Pure, stateless, no event handlers. This lets us reuse the exact same
 * markup + CSS-module classes in two very different rendering contexts:
 *  - directly as JSX in <ReviewsGrid>
 *  - as a static HTML string (via react-dom/server's renderToStaticMarkup)
 *    inside <ReviewsSphere>, where Three.js's CSS3DRenderer needs to own
 *    a plain DOM node rather than a live React tree.
 */
export default function ReviewCard({ review, locale, repeatClientLabel, compact = false }: Props) {
  const text    = getTestimonialText(review, locale);
  const country = getTestimonialCountry(review, locale);
  const stars   = Math.round(review.rating);

  return (
    <article className={`${styles.card} ${compact ? styles.compact : ''}`}>
      <div className={styles.stars} aria-hidden="true">
        {'★'.repeat(stars)}{'☆'.repeat(5 - stars)}
      </div>
      <p className={styles.text}>&ldquo;{text}&rdquo;</p>
      <div className={styles.author}>
        <div className={styles.avatar}>{review.initial}</div>
        <div className={styles.authorInfo}>
          <div className={styles.name}>
            {review.name}
            {review.repeatClient && <span className={styles.repeatPill}>{repeatClientLabel}</span>}
          </div>
          <div className={styles.role}>
            <span className={`fi fi-${review.countryCode} ${styles.flag}`} aria-hidden="true" />
            {country}
          </div>
        </div>
      </div>
    </article>
  );
}
