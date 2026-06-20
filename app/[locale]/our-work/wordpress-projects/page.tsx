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
      { icon: '🌐', num: t('stat1Num'), label: t('stat1Label') },
      { icon: '🌍', num: t('stat2Num'), label: t('stat2Label') },
      { icon: '⚡', num: t('stat3Num'), label: t('stat3Label') },
      { icon: '✅', num: t('stat4Num'), label: t('stat4Label') },
    ],
    tech: [
      { icon: '🔵', name: 'WordPress' }, { icon: '🟦', name: 'Elementor Pro' }, { icon: '🔥', name: 'WP Rocket' },
      { icon: '📷', name: 'ACF Pro' }, { icon: '🔒', name: 'Cloudflare' }, { icon: '📧', name: 'Contact Form 7' },
      { icon: '🗃️', name: 'MySQL / MariaDB' }, { icon: '🐘', name: 'PHP 8.x' }, { icon: '🌐', name: 'WP Super Cache' },
      { icon: '🖼️', name: 'Smush Pro' }, { icon: '🔍', name: 'RankMath SEO' }, { icon: '⚙️', name: 'WooCommerce' },
    ],
    whyUs: [
      { icon: '🎯', title: t('why1Title'), desc: t('why1Desc') },
      { icon: '⚡', title: t('why2Title'), desc: t('why2Desc') },
      { icon: '📱', title: t('why3Title'), desc: t('why3Desc') },
      { icon: '🔐', title: t('why4Title'), desc: t('why4Desc') },
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
