import type { Metadata } from 'next';
import OurWorkPage from '@/components/sections/ourwork/OurWorkPage';

export const metadata: Metadata = {
  title: 'Our Work — 1,440+ WordPress, WooCommerce & SEO Projects',
  description: 'Browse 1,440+ completed projects across WordPress, WooCommerce, Shopify, SEO and branding. Real results for real businesses in 61+ countries.',
  keywords: ['WordPress portfolio', 'WooCommerce projects', 'web design portfolio', 'SEO case studies', 'Shopify portfolio', 'branding portfolio'],
  alternates: { canonical: 'https://reicodev.com/our-work' },
  openGraph: {
    title: 'Our Work — 1,440+ Projects | Reicodev',
    description: 'Browse 1,440+ completed projects across WordPress, WooCommerce, Shopify, SEO and branding. Real results in 61+ countries.',
    url: 'https://reicodev.com/our-work',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Reicodev Portfolio' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work — 1,440+ Projects | Reicodev',
    images: ['/images/og-image.jpg'],
  },
};

export default function OurWork() {
  return <OurWorkPage />;
}
