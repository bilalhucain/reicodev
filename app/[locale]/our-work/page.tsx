import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import OurWorkPage from '@/components/sections/ourwork/OurWorkPage';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('ourWorkTitle'),
    description: t('ourWorkDescription'),
    alternates: {
      canonical: `https://reicodev.com/${locale}/our-work`,
      languages: {
        'fi': 'https://reicodev.com/fi/our-work',
        'en': 'https://reicodev.com/en/our-work',
      },
    },
    openGraph: {
      title: t('ourWorkTitle'),
      description: t('ourWorkDescription'),
      url: `https://reicodev.com/${locale}/our-work`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Reicodev Portfolio' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ourWorkTitle'),
      images: ['/images/og-image.jpg'],
    },
  };
}

export default function OurWork() {
  return <OurWorkPage />;
}
