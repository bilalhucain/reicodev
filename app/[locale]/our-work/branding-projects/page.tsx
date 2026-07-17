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
      { icon: 'palette', num: t('stat1Num'), label: t('stat1Label') },
      { icon: 'trophy', num: t('stat2Num'), label: t('stat2Label') },
      { icon: 'leaf', num: t('stat3Num'), label: t('stat3Label') },
      { icon: 'package', num: t('stat4Num'), label: t('stat4Label') },
    ],
    tech: [
      { icon: 'palette', name: 'Adobe Illustrator' }, { icon: 'file-text', name: 'Adobe InDesign' }, { icon: 'monitor', name: 'Figma' },
      { icon: 'image', name: 'Adobe Photoshop' }, { icon: 'tag', name: 'Brand Archetypes' }, { icon: 'palette', name: 'Coolors' },
      { icon: 'type', name: 'Google Fonts' }, { icon: 'clipboard-list', name: 'Brand Guidelines' }, { icon: 'smartphone', name: 'Social Media Kit' },
    ],
    whyUs: [
      { icon: 'brain', title: t('why1Title'), desc: t('why1Desc') },
      { icon: 'target', title: t('why2Title'), desc: t('why2Desc') },
      { icon: 'package', title: t('why3Title'), desc: t('why3Desc') },
      { icon: 'ruler', title: t('why4Title'), desc: t('why4Desc') },
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
