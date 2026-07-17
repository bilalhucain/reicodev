import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CategoryPage from '@/components/sections/category/CategoryPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: locale === 'fi'
      ? 'WordPress-projektit — Räätälöidyt verkkosivustot | Reicodev'
      : 'WordPress Projects — Custom Websites Built for Performance & Growth',
    description: locale === 'fi'
      ? 'Tutustu WordPress-kehitysportfolioomme — varausplatformit, yhteisösivustot ja yrityssivustot. 40+ WordPress-projektia yli 12 maassa.'
      : 'See our WordPress development portfolio — booking platforms, community sites, streaming services and business websites. 40+ WordPress projects across 12+ countries.',
    alternates: {
      canonical: `https://reicodev.com/${locale}/our-work/wordpress-projects`,
      languages: {
        'fi': 'https://reicodev.com/fi/our-work/wordpress-projects',
        'en': 'https://reicodev.com/en/our-work/wordpress-projects',
      },
    },
    openGraph: {
      url: `https://reicodev.com/${locale}/our-work/wordpress-projects`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WordPress Projects — Reicodev' }],
    },
  };
}

export default async function WordPressProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories.wordpress' });
  const tCat = await getTranslations({ locale, namespace: 'categories' });

  const config = {
    slug: 'wordpress',
    title: t('title'),
    accent: locale === 'fi' ? 'suorituskyvylle ja kasvulle' : 'Performance & Growth',
    badge: t('badge'),
    description: t('description'),
    stats: [
      { icon: 'globe', num: t('stat1Num'), label: t('stat1Label') },
      { icon: 'earth', num: t('stat2Num'), label: t('stat2Label') },
      { icon: 'zap', num: t('stat3Num'), label: t('stat3Label') },
      { icon: 'badge-check', num: t('stat4Num'), label: t('stat4Label') },
    ],
    tech: [
      { icon: 'globe', name: 'WordPress' }, { icon: 'layout-template', name: 'Elementor Pro' }, { icon: 'rocket', name: 'WP Rocket' },
      { icon: 'list-tree', name: 'ACF Pro' }, { icon: 'shield-check', name: 'Cloudflare' }, { icon: 'mail', name: 'Contact Form 7' },
      { icon: 'database', name: 'MySQL / MariaDB' }, { icon: 'file-code', name: 'PHP 8.x' }, { icon: 'gauge', name: 'WP Super Cache' },
      { icon: 'image', name: 'Smush Pro' }, { icon: 'search-check', name: 'RankMath SEO' }, { icon: 'shopping-cart', name: 'WooCommerce' },
    ],
    whyUs: [
      { icon: 'target', title: t('why1Title'), desc: t('why1Desc') },
      { icon: 'zap', title: t('why2Title'), desc: t('why2Desc') },
      { icon: 'smartphone', title: t('why3Title'), desc: t('why3Desc') },
      { icon: 'lock', title: t('why4Title'), desc: t('why4Desc') },
    ],
    i18n: {
      highlightedCaseStudy: t('highlightedCaseStudy'),
      recentWork: t('recentWork'),
      toolsHeading: t('toolsHeading'),
      advantagesHeading: t('advantagesHeading'),
      ctaButton: t('ctaButton'),
      viewLiveProject: tCat('viewLiveProject'),
    },
  };

  return <CategoryPage config={config} />;
}
