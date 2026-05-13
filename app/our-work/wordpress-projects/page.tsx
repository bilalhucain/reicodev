// WordPress Category Page
import type { Metadata } from 'next';
import CategoryPage from '@/components/sections/category/CategoryPage';

export const metadata: Metadata = {
  title: 'WordPress Projects — Custom Websites Built for Performance & Growth',
  description: 'See our WordPress development portfolio — booking platforms, community sites, streaming services and business websites. 40+ WordPress projects across 12+ countries.',
  keywords: ['WordPress projects', 'WordPress portfolio', 'custom WordPress website', 'WordPress developer portfolio', 'WordPress case studies'],
  alternates: { canonical: 'https://reicodev.com/our-work/wordpress-projects' },
  openGraph: {
    title: 'WordPress Projects — Custom Websites | Reicodev',
    description: 'WordPress portfolio — booking platforms, streaming services, community sites and business websites across 12+ countries.',
    url: 'https://reicodev.com/our-work/wordpress-projects',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WordPress Projects — Reicodev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WordPress Projects — Custom Websites | Reicodev',
    images: ['/images/og-image.jpg'],
  },
};

const CONFIG = {
  slug: 'wordpress',
  title: 'Custom WordPress Websites Built for Performance & Growth',
  accent: 'Performance & Growth',
  badge: 'WordPress Development',
  description: 'We build fast, secure and scalable WordPress websites that help businesses attract, engage and convert their ideal customers.',
  stats: [
    { icon:'🌐', num:'40+', label:'WordPress Projects' },
    { icon:'🌍', num:'12+', label:'Countries Served' },
    { icon:'⚡', num:'90+', label:'PageSpeed Score' },
    { icon:'✅', num:'100%', label:'Client Satisfaction' },
  ],
  tech: [
    { icon:'🔵', name:'WordPress' }, { icon:'🟦', name:'Elementor Pro' }, { icon:'🔥', name:'WP Rocket' },
    { icon:'📷', name:'ACF Pro' }, { icon:'🔒', name:'Cloudflare' }, { icon:'📧', name:'Contact Form 7' },
    { icon:'🗃️', name:'MySQL / MariaDB' }, { icon:'🐘', name:'PHP 8.x' }, { icon:'🌐', name:'WP Super Cache' },
    { icon:'🖼️', name:'Smush Pro' }, { icon:'🔍', name:'RankMath SEO' }, { icon:'⚙️', name:'WooCommerce' },
  ],
  whyUs: [
    { icon:'🎯', title:'Purpose-Built Designs', desc:'Every layout is designed to convert visitors into leads — not just look good.' },
    { icon:'⚡', title:'90+ PageSpeed Guaranteed', desc:'We guarantee fast-loading websites optimised for Core Web Vitals.' },
    { icon:'📱', title:'Mobile-First Approach', desc:'All websites are designed for mobile first, then scaled to desktop.' },
    { icon:'🔐', title:'Security Built-In', desc:'SSL, firewall, and hardening included — protecting your site from day one.' },
  ],
};

export default function WordPressProjectsPage() {
  return <CategoryPage config={CONFIG} />;
}
