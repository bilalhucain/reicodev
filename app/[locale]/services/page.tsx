import type { Metadata } from 'next';
import ServicesHero    from '@/components/sections/services/ServicesHero';
import ServicesPillars from '@/components/sections/services/ServicesPillars';
import ServicesGrid    from '@/components/sections/services/ServicesGrid';
import ServicesProcess from '@/components/sections/services/ServicesProcess';
import ServicesWhyUs   from '@/components/sections/services/ServicesWhyUs';
import ServicesCTA     from '@/components/sections/services/ServicesCTA';

export const metadata: Metadata = {
  title: 'Services — WordPress, WooCommerce, SEO & Branding',
  description: 'WordPress development, WooCommerce stores, Shopify, SEO campaigns, bug fixes, speed optimisation and brand identity design. Expert service, fast delivery, results guaranteed.',
  keywords: ['WordPress development service', 'WooCommerce store development', 'Shopify development', 'SEO service', 'bug fix WordPress', 'website speed optimisation', 'brand identity design'],
  alternates: { canonical: 'https://reicodev.com/services' },
  openGraph: {
    title: 'Services — WordPress, WooCommerce, SEO & Branding | Reicodev',
    description: 'WordPress development, WooCommerce stores, Shopify, SEO campaigns and brand identity design. Expert service, fast delivery.',
    url: 'https://reicodev.com/services',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Reicodev Services' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Services — WordPress, WooCommerce, SEO & Branding | Reicodev',
    images: ['/images/og-image.jpg'],
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesPillars />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesWhyUs />
      <ServicesCTA />
    </>
  );
}
