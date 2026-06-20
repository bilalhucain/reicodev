import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CategoryPage from '@/components/sections/category/CategoryPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fi'
      ? 'SEO-projektit — Todelliset sijoitukset, todellinen liikenne | Reicodev'
      : 'SEO Projects — Real Rankings, Real Traffic, Real Results',
    description: locale === 'fi'
      ? 'Tutustu SEO-portfolioomme — pakkausyritykset, apteekit ja verkkokaupat sijoittuvat korkeammalle Googlessa dataohjattujen kampanjoiden avulla.'
      : 'See our SEO portfolio — packaging companies, pharmacies and eCommerce retailers ranking higher on Google. Data-driven campaigns with measurable results.',
    alternates: {
      canonical: `https://reicodev.com/${locale}/our-work/seo-projects`,
      languages: {
        'fi': 'https://reicodev.com/fi/our-work/seo-projects',
        'en': 'https://reicodev.com/en/our-work/seo-projects',
      },
    },
    openGraph: {
      url: `https://reicodev.com/${locale}/our-work/seo-projects`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'SEO Projects — Reicodev' }],
    },
  };
}

export default async function SEOProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories.seo' });
  const tCat = await getTranslations({ locale, namespace: 'categories' });

  const config = {
    slug: 'seo',
    title: t('title'),
    accent: locale === 'fi' ? 'todellisia tuloksia' : 'Real Results',
    badge: t('badge'),
    description: t('description'),
    stats: [
      { icon: '📈', num: t('stat1Num'), label: t('stat1Label') },
      { icon: '🔑', num: t('stat2Num'), label: t('stat2Label') },
      { icon: '🚀', num: t('stat3Num'), label: t('stat3Label') },
      { icon: '✅', num: t('stat4Num'), label: t('stat4Label') },
    ],
    tech: [
      { icon: '🔍', name: 'Google Search Console' }, { icon: '📊', name: 'Google Analytics 4' }, { icon: '🔬', name: 'Ahrefs' },
      { icon: '📋', name: 'SEMrush' }, { icon: '⚡', name: 'PageSpeed Insights' }, { icon: '🏆', name: 'RankMath SEO' },
      { icon: '🔗', name: 'Link Building Tools' }, { icon: '📝', name: 'Surfer SEO' }, { icon: '🗺️', name: 'Screaming Frog' },
      { icon: '🌐', name: 'Moz Pro' }, { icon: '📉', name: 'Majestic SEO' }, { icon: '🗂️', name: 'SERanking' },
    ],
    whyUs: [
      { icon: '📊', title: t('why1Title'), desc: t('why1Desc') },
      { icon: '🎯', title: t('why2Title'), desc: t('why2Desc') },
      { icon: '🔧', title: t('why3Title'), desc: t('why3Desc') },
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
