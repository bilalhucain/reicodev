import type { Metadata } from 'next';
import CategoryPage from '@/components/sections/category/CategoryPage';

export const metadata: Metadata = {
  title: 'Branding Projects — Logo Design, Brand Identity & Social Media Kits',
  description: 'See our branding portfolio — packaging design, mascot illustration and social media brand kits. Memorable brand identities that make businesses stand out.',
  keywords: ['branding portfolio', 'logo design portfolio', 'brand identity projects', 'packaging design', 'social media kit', 'mascot illustration'],
  alternates: { canonical: 'https://reicodev.com/our-work/branding-projects' },
  openGraph: {
    title: 'Branding Projects — Logo & Brand Identity | Reicodev',
    description: 'Branding portfolio — packaging design, mascot illustration and social media brand kits for businesses worldwide.',
    url: 'https://reicodev.com/our-work/branding-projects',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Branding Projects — Reicodev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Branding Projects — Logo & Brand Identity | Reicodev',
    images: ['/images/og-image.jpg'],
  },
};

const BRANDING_CONFIG = {
  slug: 'branding',
  title: 'Meaningful Brands That Inspire Trust and Create Impact',
  accent: 'Inspire Trust and Create Impact',
  badge: 'Brand Identity Design',
  description: 'We create memorable brand identities — logos, colour palettes, typography and guidelines — that make your business stand out and build lasting trust.',
  stats: [
    { icon:'🎨', num:'20+', label:'Brand Identities' },
    { icon:'🏆', title:'100%', num:'100%', label:'Client Satisfaction' },
    { icon:'🌍', num:'10+', label:'Industries' },
    { icon:'📦', num:'5+', label:'Deliverables Per Project' },
  ],
  tech: [
    { icon:'🎨', name:'Adobe Illustrator' }, { icon:'📐', name:'Adobe InDesign' }, { icon:'🖼️', name:'Figma' },
    { icon:'📸', name:'Adobe Photoshop' }, { icon:'🎭', name:'Brand Archetypes' }, { icon:'🎨', name:'Coolors' },
    { icon:'✍️', name:'Google Fonts' }, { icon:'📦', name:'Brand Guidelines' }, { icon:'📱', name:'Social Media Kit' },
  ],
  whyUs: [
    { icon:'🧠', title:'Strategy-First Approach', desc:'We start with your audience, values and market before drawing a single line.' },
    { icon:'🎯', title:'Unique & Memorable', desc:'Every logo and identity is custom-designed — never templated or generic.' },
    { icon:'📦', title:'Complete Brand Package', desc:'You get everything you need: logo, fonts, colours, icons and full guidelines.' },
    { icon:'♾️', title:'Scalable Across All Media', desc:'Your brand looks perfect whether on a business card or a billboard.' },
  ],
};

export default function BrandingProjectsPage() {
  return <CategoryPage config={BRANDING_CONFIG} />;
}
