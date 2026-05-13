// Shopify Category Page
import type { Metadata } from 'next';
import CategoryPage from '@/components/sections/category/CategoryPage';

export const metadata: Metadata = {
  title: 'Shopify Projects — Custom Shopify Stores Built for Sales',
  description: 'See our Shopify development portfolio — health and wellness stores with custom themes, subscription models and loyalty programmes. Built to convert.',
  keywords: ['Shopify projects', 'Shopify portfolio', 'Shopify store development', 'custom Shopify theme', 'Shopify developer portfolio'],
  alternates: { canonical: 'https://reicodev.com/our-work/shopify-projects' },
  openGraph: {
    title: 'Shopify Projects — Custom Stores | Reicodev',
    description: 'Shopify portfolio — health and wellness stores with custom themes, subscription models and loyalty programmes.',
    url: 'https://reicodev.com/our-work/shopify-projects',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Shopify Projects — Reicodev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shopify Projects — Custom Stores | Reicodev',
    images: ['/images/og-image.jpg'],
  },
};

const SHOPIFY_CONFIG = {
  slug: 'shopify',
  title: 'Shopify Stores Designed to Sell More, Every Day',
  accent: 'Sell More, Every Day',
  badge: 'Shopify Development',
  description: 'We build Shopify stores with custom design, app integrations and conversion optimisation — helping product brands sell more online.',
  stats: [
    { icon:'🛍️', num:'8+', label:'Shopify Stores' },
    { icon:'🌏', num:'4+', label:'Countries' },
    { icon:'💳', num:'99.9%', label:'Uptime' },
    { icon:'⭐', num:'4.9★', label:'Client Rating' },
  ],
  tech: [
    { icon:'🛍️', name:'Shopify' }, { icon:'🎨', name:'Dawn Theme' }, { icon:'💳', name:'Shopify Payments' },
    { icon:'📊', name:'Shopify Analytics' }, { icon:'📧', name:'Klaviyo' }, { icon:'🔄', name:'ReCharge Subscriptions' },
    { icon:'📦', name:'ShipBob' }, { icon:'⭐', name:'Okendo Reviews' }, { icon:'🔍', name:'SEO Suite' },
    { icon:'📱', name:'Shopify Mobile App' }, { icon:'🌐', name:'Shopify Markets' }, { icon:'📈', name:'GA4' },
  ],
  whyUs: [
    { icon:'🎨', title:'Custom Brand Experience', desc:'Your Shopify store will look unique and reflect your brand identity perfectly.' },
    { icon:'📱', title:'Mobile-First Commerce', desc:'Optimised for mobile shoppers — where 70%+ of purchases happen today.' },
    { icon:'🔄', title:'Subscription Support', desc:'We integrate subscription billing for recurring revenue business models.' },
    { icon:'📧', title:'Email & Retention', desc:'Klaviyo flows, abandoned cart emails and loyalty programmes configured.' },
  ],
};

export default function ShopifyProjectsPage() {
  return <CategoryPage config={SHOPIFY_CONFIG} />;
}
