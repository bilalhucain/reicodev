import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CategoryPage from '@/components/sections/category/CategoryPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fi'
      ? 'WooCommerce-projektit — Verkkokaupat, jotka muuttavat kävijät asiakkaiksi | Reicodev'
      : 'WooCommerce Projects — eCommerce Stores That Convert Visitors into Customers',
    description: locale === 'fi'
      ? 'Tutustu WooCommerce-kehitysportfolioomme — muotiputiikit, valokuvasstudiot ja B2B-kaupat. Korkean konversion verkkokaupat.'
      : 'See our WooCommerce development portfolio — fashion boutiques, photography studios and B2B promotional stores. High-converting online stores built for growth.',
    alternates: {
      canonical: `https://reicodev.com/${locale}/our-work/woocommerce-projects`,
      languages: {
        'fi': 'https://reicodev.com/fi/our-work/woocommerce-projects',
        'en': 'https://reicodev.com/en/our-work/woocommerce-projects',
      },
    },
    openGraph: {
      url: `https://reicodev.com/${locale}/our-work/woocommerce-projects`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WooCommerce Projects — Reicodev' }],
    },
  };
}

export default async function WooCommerceProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories.woocommerce' });
  const tCat = await getTranslations({ locale, namespace: 'categories' });

  const config = {
    slug: 'woocommerce',
    title: t('title'),
    accent: locale === 'fi' ? 'muuttavat kävijät asiakkaiksi' : 'Convert Visitors into Customers',
    badge: t('badge'),
    description: t('description'),
    stats: [
      { icon: '🛒', num: t('stat1Num'), label: t('stat1Label') },
      { icon: '💳', num: t('stat2Num'), label: t('stat2Label') },
      { icon: '📦', num: t('stat3Num'), label: t('stat3Label') },
      { icon: '⭐', num: t('stat4Num'), label: t('stat4Label') },
    ],
    tech: [
      { icon: '🛒', name: 'WooCommerce' }, { icon: '💳', name: 'Stripe' }, { icon: '🅿️', name: 'PayPal' },
      { icon: '📦', name: 'ShipStation' }, { icon: '📬', name: 'Mailchimp' }, { icon: '📊', name: 'Google Analytics' },
      { icon: '🏷️', name: 'YITH Plugins' }, { icon: '🔐', name: 'SSL / Cloudflare' }, { icon: '⚡', name: 'WP Rocket' },
      { icon: '📷', name: 'ACF Pro' }, { icon: '🔍', name: 'RankMath SEO' }, { icon: '📱', name: 'Elementor Pro' },
    ],
    whyUs: [
      { icon: '💰', title: t('why1Title'), desc: t('why1Desc') },
      { icon: '📦', title: t('why2Title'), desc: t('why2Desc') },
      { icon: '🌍', title: t('why3Title'), desc: t('why3Desc') },
      { icon: '📈', title: t('why4Title'), desc: t('why4Desc') },
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
