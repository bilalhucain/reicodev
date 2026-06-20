import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import AboutHero       from '@/components/sections/about/AboutHero';
import AboutJourney    from '@/components/sections/about/AboutJourney';
import AboutMilestones from '@/components/sections/about/AboutMilestones';
import AboutWhatIDo    from '@/components/sections/about/AboutWhatIDo';
import AboutApproach   from '@/components/sections/about/AboutApproach';
import AboutQuote      from '@/components/sections/about/AboutQuote';
import AboutTrustedBy  from '@/components/sections/about/AboutTrustedBy';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('aboutTitle'),
    description: t('aboutDescription'),
    alternates: {
      canonical: `https://reicodev.com/${locale}/about`,
      languages: {
        'fi': 'https://reicodev.com/fi/about',
        'en': 'https://reicodev.com/en/about',
      },
    },
    openGraph: {
      title: t('aboutTitle'),
      description: t('aboutDescription'),
      url: `https://reicodev.com/${locale}/about`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Bilal Hussain — WordPress Developer' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('aboutTitle'),
      images: ['/images/og-image.jpg'],
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutJourney />
      <AboutMilestones />
      <AboutWhatIDo />
      <AboutApproach />
      <AboutQuote />
      <AboutTrustedBy />
    </>
  );
}
