import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import QuotePageClient from './QuotePageClient';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('quoteTitle'),
    description: t('quoteDescription'),
    alternates: {
      canonical: `https://reicodev.com/${locale}/get-a-quote`,
      languages: {
        'fi': 'https://reicodev.com/fi/get-a-quote',
        'en': 'https://reicodev.com/en/get-a-quote',
      },
    },
    openGraph: {
      title: t('quoteTitle'),
      description: t('quoteDescription'),
      url: `https://reicodev.com/${locale}/get-a-quote`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Get a Quote — Reicodev' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('quoteTitle'),
      images: ['/images/og-image.jpg'],
    },
  };
}

export default function GetAQuotePage() {
  return <QuotePageClient />;
}
