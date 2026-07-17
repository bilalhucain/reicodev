import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { getTranslations } from 'next-intl/server';
import AboutHero            from '@/components/sections/about/AboutHero';
import AboutRegionalHero    from '@/components/sections/about/AboutRegionalHero';
import AboutRegionalJourney from '@/components/sections/about/AboutRegionalJourney';
import AboutFounders        from '@/components/sections/about/AboutFounders';
import AboutWhyLocal        from '@/components/sections/about/AboutWhyLocal';
import AboutJourney         from '@/components/sections/about/AboutJourney';
import AboutMilestones      from '@/components/sections/about/AboutMilestones';
import AboutWhatIDo         from '@/components/sections/about/AboutWhatIDo';
import AboutApproach        from '@/components/sections/about/AboutApproach';
import AboutQuote           from '@/components/sections/about/AboutQuote';
import AboutTrustedBy       from '@/components/sections/about/AboutTrustedBy';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// Countries that get the dedicated regional page — decided by IP, not
// by which language/locale the visitor happens to be browsing in.
const REGIONAL_COUNTRIES = ['FI', 'ES'];

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

export default async function AboutPage({ searchParams }: Props) {
  // Same header Vercel's edge network injects in middleware — still
  // present on the request by the time it reaches this server component.
  const headersList = await headers();
  let country = headersList.get('x-vercel-ip-country');

  // DEV-ONLY override: visit e.g. localhost:3000/en/about?debug_country=ES
  // to preview the regional page locally, where x-vercel-ip-country is
  // never actually present (no Vercel edge network in front of dev).
  // The NODE_ENV check means this branch is dead code in production —
  // it cannot be triggered on the live site no matter what's in the URL.
  if (process.env.NODE_ENV !== 'production') {
    const sp = await searchParams;
    const debugCountry = sp?.debug_country;
    if (typeof debugCountry === 'string' && debugCountry.length > 0) {
      country = debugCountry.toUpperCase();
    }
  }

  const isRegional = !!country && REGIONAL_COUNTRIES.includes(country);

  // Finland / Spain IPs get a dedicated page built around the two
  // people actually doing the work — no generic services/process/
  // history sections. Everyone else keeps the standard About page,
  // completely untouched.
  if (isRegional) {
    return (
      <>
        <AboutRegionalHero />
        <AboutRegionalJourney />
        <AboutFounders />
        <AboutWhyLocal />
        <AboutMilestones />
        <AboutTrustedBy />
        <AboutQuote />
      </>
    );
  }

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

