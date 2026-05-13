import type { Metadata } from 'next';
import AboutHero      from '@/components/sections/about/AboutHero';
import AboutJourney   from '@/components/sections/about/AboutJourney';
import AboutMilestones from '@/components/sections/about/AboutMilestones';
import AboutWhatIDo   from '@/components/sections/about/AboutWhatIDo';
import AboutApproach  from '@/components/sections/about/AboutApproach';
import AboutQuote     from '@/components/sections/about/AboutQuote';
import AboutTrustedBy from '@/components/sections/about/AboutTrustedBy';

export const metadata: Metadata = {
  title: 'About Bilal Hussain — WordPress & WooCommerce Developer',
  description: 'Meet Bilal Hussain, a WordPress and WooCommerce expert with 10+ years of experience. 1,440+ projects delivered across 61+ countries with a 4.9 Fiverr rating.',
  keywords: ['Bilal Hussain', 'WordPress developer', 'WooCommerce expert', 'freelance web developer', 'Fiverr top seller', 'web development expert'],
  alternates: { canonical: 'https://reicodev.com/about' },
  openGraph: {
    title: 'About Bilal Hussain — WordPress & WooCommerce Developer',
    description: 'Meet Bilal Hussain, WordPress and WooCommerce expert with 10+ years experience, 1,440+ projects and a 4.9 Fiverr rating.',
    url: 'https://reicodev.com/about',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Bilal Hussain — WordPress Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Bilal Hussain — WordPress & WooCommerce Developer',
    images: ['/images/og-image.jpg'],
  },
};

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
