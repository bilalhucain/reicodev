import type { Metadata } from 'next';
import { SERVICES } from "@/lib/data";
import QuotePageClient from './QuotePageClient';

export const metadata: Metadata = {
  title: 'Get a Free Quote — WordPress, WooCommerce & SEO Projects',
  description: 'Get a free, no-obligation quote for your WordPress, WooCommerce, Shopify, SEO or branding project. Response within 24 hours. 1,440+ projects delivered.',
  keywords: ['get a quote web development', 'WordPress development quote', 'WooCommerce quote', 'SEO service quote', 'free website quote'],
  alternates: { canonical: 'https://reicodev.com/get-a-quote' },
  openGraph: {
    title: 'Get a Free Quote | Reicodev',
    description: 'Free, no-obligation quote for your project. Response within 24 hours. 1,440+ projects delivered.',
    url: 'https://reicodev.com/get-a-quote',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Get a Quote — Reicodev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Get a Free Quote | Reicodev',
    images: ['/images/og-image.jpg'],
  },
};

export default function GetAQuotePage() {
  return <QuotePageClient />;
}
