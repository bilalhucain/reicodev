import Link from 'next/link';
import type { Testimonial } from '@/lib/testimonials';
import ReviewCard from './ReviewCard';
import ScrollReveal from './ScrollReveal';
import styles from './ReviewsGrid.module.css';

interface Props {
  items: Testimonial[];
  locale: string;
  page: number;
  totalPages: number;
  totalItems: number;
  repeatClientLabel: string;
  heading: string;
  prevLabel: string;
  nextLabel: string;
  pageLabel: string; // pre-formatted, e.g. "Page 1 of 29"
}

export default function ReviewsGrid({
  items, locale, page, totalPages, totalItems,
  repeatClientLabel, heading, prevLabel, nextLabel, pageLabel,
}: Props) {
  const basePath = `/${locale}/reviews`;

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.heading}>{heading}</h2>
          <p className={styles.count}>{pageLabel} · {totalItems}</p>
        </div>

        <ScrollReveal>
          <div className={styles.grid}>
            {items.map(review => (
              <ReviewCard key={review.id} review={review} locale={locale} repeatClientLabel={repeatClientLabel} />
            ))}
          </div>
        </ScrollReveal>

        {totalPages > 1 && (
          <nav className={styles.pagination} aria-label="Reviews pagination">
            <Link
              href={page <= 1 ? '#' : `${basePath}?page=${page - 1}`}
              aria-disabled={page <= 1}
              className={`${styles.pageLink} ${page <= 1 ? styles.pageLinkDisabled : ''}`}
            >
              ← {prevLabel}
            </Link>
            <span className={styles.pageIndicator}>{page} / {totalPages}</span>
            <Link
              href={page >= totalPages ? '#' : `${basePath}?page=${page + 1}`}
              aria-disabled={page >= totalPages}
              className={`${styles.pageLink} ${page >= totalPages ? styles.pageLinkDisabled : ''}`}
            >
              {nextLabel} →
            </Link>
          </nav>
        )}
      </div>
    </section>
  );
}
