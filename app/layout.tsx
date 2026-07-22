import { Analytics }     from '@vercel/analytics/react';
import { SpeedInsights }  from '@vercel/speed-insights/next';
import type { Metadata }  from 'next';
import 'flag-icons/css/flag-icons.min.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://reicodev.com'),
  title: {
    default:  'Reicodev — WordPress, WooCommerce & SEO Expert | 1,440+ Projects',
    template: '%s | Reicodev',
  },
  description: 'Expert WordPress, WooCommerce, Shopify, SEO and branding services. 1,440+ projects delivered, 879+ five-star reviews, clients in 61+ countries. Get a free quote today.',
  keywords: ['WordPress developer', 'WooCommerce expert', 'SEO specialist', 'web design', 'Shopify developer', 'brand identity designer', 'freelance web developer'],
  authors: [{ name: 'Bilal Hussain', url: 'https://reicodev.com' }],
  creator: 'Bilal Hussain',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://reicodev.com',
    siteName: 'Reicodev',
    title: 'Reicodev — WordPress, WooCommerce & SEO Expert',
    description: 'Expert WordPress, WooCommerce, Shopify, SEO and branding services. 1,440+ projects, 879+ reviews, 61+ countries.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Reicodev — Web Development & SEO Agency' }],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@reicodev',
    title: 'Reicodev — WordPress, WooCommerce & SEO Expert',
    description: 'Expert WordPress, WooCommerce, Shopify, SEO and branding. 1,440+ projects, 879+ reviews.',
    images: ['/images/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const SCHEMA_BUSINESS = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': 'https://reicodev.com/#business',
  name: 'Reicodev',
  url: 'https://reicodev.com',
  description: 'WordPress, WooCommerce, Shopify, SEO and branding. 1,440+ projects across 61+ countries.',
  founder: { '@type': 'Person', name: 'Bilal Hussain', jobTitle: 'WordPress Developer & SEO Specialist', url: 'https://reicodev.com/about' },
  areaServed: 'Worldwide',
  priceRange: '$$',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', bestRating: '5', reviewCount: '879' },
  sameAs: ['https://fiverr.com/reicodev'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fi" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('rdv-theme');if(t==='light')document.documentElement.setAttribute('data-theme','light');}catch(e){}` }} />
        {/* Schema markup */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SCHEMA_BUSINESS) }} />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
