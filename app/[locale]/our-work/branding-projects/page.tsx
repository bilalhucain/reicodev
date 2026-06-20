import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import CategoryPage from '@/components/sections/category/CategoryPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: locale === 'fi'
      ? 'Brändäysprojektit — Merkitykselliset brändit | Reicodev'
      : 'Branding Projects — Meaningful Brands That Inspire Trust',
    description: locale === 'fi'
      ? 'Tutustu brändäysportfolioomme — logot, väripaletit, typografia ja brändiohjeistukset, jotka tekevät yrityksestäsi erottuvan.'
      : 'See our branding portfolio — logos, colour palettes, typography and brand guidelines that make your business stand out.',
    alternates: {
      canonical: `https://reicodev.com/${locale}/our-work/branding-projects`,
      languages: {
        'fi': 'https://reicodev.com/fi/our-work/branding-projects',
        'en': 'https://reicodev.com/en/our-work/branding-projects',
      },
    },
    openGraph: {
      url: `https://reicodev.com/${locale}/our-work/branding-projects`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Branding Projects — Reicodev' }],
    },
  };
}

export default async function BrandingProjectsPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'categories.branding' });
  const tCat = await getTranslations({ locale, namespace: 'categories' });

  const config = {
    slug: 'branding',
    title: t('title'),
    accent: locale === 'fi' ? 'inspiroivat luottamusta ja luovat vaikutuksen' : 'Inspire Trust and Create Impact',
    badge: t('badge'),
    description: t('description'),
    stats: [
      { icon: '🎨', num: t('stat1Num'), label: t('stat1Label') },
      { icon: '🏆', num: t('stat2Num'), label: t('stat2Label') },
      { icon: '🌿', num: t('stat3Num'), label: t('stat3Label') },
      { icon: '📦', num: t('stat4Num'), label: t('stat4Label') },
    ],
    tech: [
      { icon: '🎨', name: 'Adobe Illustrator' }, { icon: '📄', name: 'Adobe InDesign' }, { icon: '🖥️', name: 'Figma' },
      { icon: '🖼️', name: 'Adobe Photoshop' }, { icon: '🏷️', name: 'Brand Archetypes' }, { icon: '🎨', name: 'Coolors' },
      { icon: '🔤', name: 'Google Fonts' }, { icon: '📋', name: 'Brand Guidelines' }, { icon: '📱', name: 'Social Media Kit' },
    ],
    whyUs: [
      { icon: '🧠', title: t('why1Title'), desc: t('why1Desc') },
      { icon: '🎯', title: t('why2Title'), desc: t('why2Desc') },
      { icon: '📦', title: t('why3Title'), desc: t('why3Desc') },
      { icon: '📐', title: t('why4Title'), desc: t('why4Desc') },
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
