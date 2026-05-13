// SEO Category Page
import type { Metadata } from 'next';
import CategoryPage from '@/components/sections/category/CategoryPage';

export const metadata: Metadata = {
  title: 'SEO Projects — Real Rankings, Real Traffic, Real Results',
  description: 'See our SEO portfolio — packaging companies, pharmacies and eCommerce retailers ranking higher on Google. Data-driven campaigns with measurable results.',
  keywords: ['SEO portfolio', 'SEO case studies', 'SEO projects', 'eCommerce SEO', 'local SEO portfolio', 'search engine optimisation results'],
  alternates: { canonical: 'https://reicodev.com/our-work/seo-projects' },
  openGraph: {
    title: 'SEO Projects — Real Rankings & Traffic | Reicodev',
    description: 'SEO portfolio — packaging, healthcare and eCommerce clients ranking higher on Google with data-driven campaigns.',
    url: 'https://reicodev.com/our-work/seo-projects',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'SEO Projects — Reicodev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Projects — Real Rankings & Traffic | Reicodev',
    images: ['/images/og-image.jpg'],
  },
};

const SEO_CONFIG = {
  slug: 'seo',
  title: 'Data-Driven SEO Strategies That Deliver Real Results',
  accent: 'Real Results',
  badge: 'SEO Optimization',
  description: 'We build and execute SEO strategies grounded in data — improving your rankings, driving qualified traffic and growing your revenue organically.',
  stats: [
    { icon:'📈', num:'50+', label:'SEO Projects' },
    { icon:'🔑', num:'100+', label:'Keywords Ranked' },
    { icon:'🚀', num:'300%', label:'Avg Traffic Growth' },
    { icon:'✅', num:'95%', label:'Client Retention' },
  ],
  tech: [
    { icon:'🔍', name:'Google Search Console' }, { icon:'📊', name:'Google Analytics 4' }, { icon:'🔬', name:'Ahrefs' },
    { icon:'📋', name:'SEMrush' }, { icon:'⚡', name:'PageSpeed Insights' }, { icon:'🏆', name:'RankMath SEO' },
    { icon:'🔗', name:'Link Building Tools' }, { icon:'📝', name:'Surfer SEO' }, { icon:'🗺️', name:'Screaming Frog' },
    { icon:'🌐', name:'Moz Pro' }, { icon:'📉', name:'Majestic SEO' }, { icon:'🗂️', name:'SERanking' },
  ],
  whyUs: [
    { icon:'📊', title:'Data-Driven Strategy', desc:'Every recommendation is backed by data — not guesswork or generic templates.' },
    { icon:'🎯', title:'Targeted Keywords', desc:'We find the keywords your ideal customers are searching for and rank for them.' },
    { icon:'🔧', title:'Technical SEO Included', desc:'Core Web Vitals, site speed, structured data and crawlability all covered.' },
    { icon:'📈', title:'Transparent Reporting', desc:'Monthly reports showing exactly what we did, what moved and what is next.' },
  ],
};

export default function SEOProjectsPage() {
  return <CategoryPage config={SEO_CONFIG} />;
}
