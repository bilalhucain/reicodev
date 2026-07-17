import type { Metadata } from 'next';
import HomeHero        from '@/components/sections/home/HomeHero';
import HomeMarquee     from '@/components/sections/home/HomeMarquee';
import HomeServices    from '@/components/sections/home/HomeServices';
import HomeProjects    from '@/components/sections/home/HomeProjects';
import HomeProcess     from '@/components/sections/home/HomeProcess';
import HomeAdvantage   from '@/components/sections/home/HomeAdvantage';
import HomeTestimonials from '@/components/sections/home/HomeTestimonials';
import HomeCTA         from '@/components/sections/home/HomeCTA';

export const metadata: Metadata = {
  title: 'Reicodev — WordPress, WooCommerce & SEO Expert | 1,440+ Projects',
  description: 'Expert WordPress developer with 1,440+ projects, 879+ five-star reviews and clients in 61+ countries. WordPress, WooCommerce, Shopify, SEO and branding. Free quote in 24 hours.',
  keywords: ['WordPress developer', 'WooCommerce expert', 'SEO specialist', 'web development agency', 'Shopify developer', 'brand identity designer', 'freelance web developer Fiverr'],
  alternates: { canonical: 'https://reicodev.com' },
  openGraph: {
    title: 'Reicodev — WordPress, WooCommerce & SEO Expert | 1,440+ Projects',
    description: 'Expert WordPress developer with 1,440+ projects, 879+ five-star reviews and clients in 61+ countries. Free quote in 24 hours.',
    url: 'https://reicodev.com',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Reicodev — Web Development & SEO Expert' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reicodev — WordPress, WooCommerce & SEO Expert | 1,440+ Projects',
    description: 'Expert WordPress developer with 1,440+ projects, 879+ reviews, 61+ countries.',
    images: ['/images/og-image.jpg'],
  },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeMarquee />
      <div className="section-accent-strip" />
      <div id="services">
        <HomeServices />
      </div>
      <div id="projects">
        <HomeProjects />
      </div>
      <div id="process">
        <HomeProcess />
      </div>
      <div id="advantage">
        <HomeAdvantage />
      </div>
      <div className="section-accent-strip" />
      <div id="testimonials">
        <HomeTestimonials />
      </div>
      <HomeCTA />
    </>
  );
}
