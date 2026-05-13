// WooCommerce Category Page
import type { Metadata } from 'next';
import CategoryPage from '@/components/sections/category/CategoryPage';

export const metadata: Metadata = {
  title: 'WooCommerce Projects — eCommerce Stores That Convert Visitors into Customers',
  description: 'See our WooCommerce development portfolio — fashion boutiques, photography studios and B2B promotional stores. High-converting online stores built for growth.',
  keywords: ['WooCommerce projects', 'WooCommerce portfolio', 'eCommerce development portfolio', 'WooCommerce store examples', 'online store development'],
  alternates: { canonical: 'https://reicodev.com/our-work/woocommerce-projects' },
  openGraph: {
    title: 'WooCommerce Projects — eCommerce Stores | Reicodev',
    description: 'WooCommerce portfolio — fashion boutiques, photography studios and B2B promotional stores built for growth.',
    url: 'https://reicodev.com/our-work/woocommerce-projects',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'WooCommerce Projects — Reicodev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WooCommerce Projects — eCommerce Stores | Reicodev',
    images: ['/images/og-image.jpg'],
  },
};

const CONFIG = {
  slug: 'woocommerce',
  title: 'WooCommerce Stores That Convert Visitors into Customers',
  accent: 'Convert Visitors into Customers',
  badge: 'WooCommerce Development',
  description: 'We build full-featured WooCommerce stores optimised for conversions, speed and easy management — so you can focus on selling.',
  stats: [
    { icon:'🛒', num:'15+', label:'WooCommerce Stores' },
    { icon:'💳', num:'5+', label:'Payment Gateways' },
    { icon:'📦', num:'100%', label:'On-Time Delivery' },
    { icon:'⭐', num:'4.9★', label:'Average Rating' },
  ],
  tech: [
    { icon:'🛒', name:'WooCommerce' }, { icon:'💳', name:'Stripe' }, { icon:'🅿️', name:'PayPal' },
    { icon:'📦', name:'ShipStation' }, { icon:'📬', name:'Mailchimp' }, { icon:'📊', name:'Google Analytics' },
    { icon:'🏷️', name:'YITH Plugins' }, { icon:'🔐', name:'SSL / Cloudflare' }, { icon:'⚡', name:'WP Rocket' },
    { icon:'📷', name:'ACF Pro' }, { icon:'🔍', name:'RankMath SEO' }, { icon:'📱', name:'Elementor Pro' },
  ],
  whyUs: [
    { icon:'💰', title:'Conversion-Focused Stores', desc:'Every element is optimised to turn visitors into paying customers.' },
    { icon:'📦', title:'Inventory Management', desc:'Easy-to-manage product catalogues, categories and stock tracking.' },
    { icon:'🌍', title:'International Shipping', desc:'Multi-currency, multi-language and international shipping support.' },
    { icon:'📈', title:'Analytics & Reporting', desc:'Built-in analytics to track sales, revenue and customer behaviour.' },
  ],
};

export default function WooCommerceProjectsPage() {
  return <CategoryPage config={CONFIG} />;
}
