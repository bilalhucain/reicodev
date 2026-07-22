import type { Metadata } from 'next';
import { getTranslations, getLocale } from 'next-intl/server';
import {
  ORBIT_TESTIMONIALS,
  TESTIMONIAL_STATS,
  getPaginatedTestimonials,
} from '@/lib/testimonials';
import ReviewsHero from '@/components/sections/reviews/ReviewsHero';
import ReviewsGrid from '@/components/sections/reviews/ReviewsGrid';

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('reviews');
  return { title: t('metaTitle'), description: t('metaDescription') };
}

export default async function ReviewsPage({ searchParams }: Props) {
  const locale = await getLocale();
  const t      = await getTranslations('reviews');
  const { page: pageParam } = await searchParams;

  const page = Math.max(1, Number.parseInt(pageParam ?? '1', 10) || 1);
  const { items, totalPages, total } = getPaginatedTestimonials(page);

  return (
    <>
      <ReviewsHero
        items={ORBIT_TESTIMONIALS}
        locale={locale}
        repeatClientLabel={t('repeatClient')}
        closeLabel={t('close')}
        viewReviewLabel={t('viewReview')}
        eyebrow={t('eyebrow')}
        heading={t('heading')}
        statsLabel={t('statsLabel', { count: TESTIMONIAL_STATS.count, countries: TESTIMONIAL_STATS.countries })}
        avgRating={TESTIMONIAL_STATS.avgRating}
      />
      <ReviewsGrid
        items={items}
        locale={locale}
        page={page}
        totalPages={totalPages}
        totalItems={total}
        repeatClientLabel={t('repeatClient')}
        heading={t('gridHeading')}
        prevLabel={t('prev')}
        nextLabel={t('next')}
        pageLabel={t('pageLabel', { page, totalPages })}
      />
    </>
  );
}
