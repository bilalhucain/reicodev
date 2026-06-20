import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import ContactPageClient from './ContactPageClient';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('contactTitle'),
    description: t('contactDescription'),
    alternates: {
      canonical: `https://reicodev.com/${locale}/contact`,
      languages: {
        'fi': 'https://reicodev.com/fi/contact',
        'en': 'https://reicodev.com/en/contact',
      },
    },
    openGraph: {
      title: t('contactTitle'),
      description: t('contactDescription'),
      url: `https://reicodev.com/${locale}/contact`,
      images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Contact Reicodev' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('contactTitle'),
      images: ['/images/og-image.jpg'],
    },
  };
}

export default function ContactPage() {
  return <ContactPageClient />;
}
