import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CategoryPage from '@/components/sections/category/CategoryPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fi'
      ? 'Shopify-projektit — Räätälöidyt Shopify-kaupat | Reicodev'
      : 'Shopify Projects — Custom Shopify Stores Built for Sales',
    description: locale === 'fi'
      ? 'Tutustu Shopify-kehitysportfolioomme — terveys- ja hyvinvointikaupat räätälöidyillä teemoilla ja tilausmalleilla.'
      : 'See our Shopify development portfolio — health and wellness stores with custom themes, subscription models and loyalty programmes. Built to convert.',
    alternates: {
      canonical: `https://reicodev.com/${locale}/our-work/shopify-projects`,
      languages: {
        'fi': 'https://reicodev.com/fi/our-work/shopify-projects',
        'en': 'https://reicodev.com/en/our-work/shopify-projects',
      },
    },
    openGraph: {
      url: `https://reicodev.com/${locale}/our-work/shopify-projects`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Shopify Projects — Reicodev' }],
    },
  };
}

export default async function ShopifyProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories.shopify' });
  const tCat = await getTranslations({ locale, namespace: 'categories' });

  const config = {
    slug: 'shopify',
    title: t('title'),
    accent: locale === 'fi' ? 'myymään enemmän joka päivä' : 'Sell More, Every Day',
    badge: t('badge'),
    description: t('description'),
    stats: [
      { icon: 'shopping-bag', num: t('stat1Num'), label: t('stat1Label') },
      { icon: 'earth', num: t('stat2Num'), label: t('stat2Label') },
      { icon: 'credit-card', num: t('stat3Num'), label: t('stat3Label') },
      { icon: 'star', num: t('stat4Num'), label: t('stat4Label') },
    ],
    tech: [
      { icon: 'shopping-bag', name: 'Shopify' }, { icon: 'palette', name: 'Dawn Theme' }, { icon: 'credit-card', name: 'Shopify Payments' },
      { icon: 'bar-chart', name: 'Shopify Analytics' }, { icon: 'mail', name: 'Klaviyo' }, { icon: 'refresh-cw', name: 'ReCharge Subscriptions' },
      { icon: 'package', name: 'ShipBob' }, { icon: 'star', name: 'Okendo Reviews' }, { icon: 'search-check', name: 'SEO Suite' },
      { icon: 'smartphone', name: 'Shopify Mobile App' }, { icon: 'globe', name: 'Shopify Markets' }, { icon: 'trending-up', name: 'GA4' },
    ],
    whyUs: [
      { icon: 'palette', title: t('why1Title'), desc: t('why1Desc') },
      { icon: 'smartphone', title: t('why2Title'), desc: t('why2Desc') },
      { icon: 'refresh-cw', title: t('why3Title'), desc: t('why3Desc') },
      { icon: 'mail', title: t('why4Title'), desc: t('why4Desc') },
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
