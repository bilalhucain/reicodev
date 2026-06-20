import type { Metadata } from 'next';
import ProjectPage, { type ProjectPageData } from '@/components/sections/project/ProjectPage';

export const metadata: Metadata = {
  title: 'Safari World Tours — WordPress Booking Platform Case Study',
  description: 'How we built a high-converting WordPress booking website for Safari World Tours — a Namibia-based safari tour company.',
};

const DATA: ProjectPageData = {
  slug:     'safari-world-tours',
  title:    'Safari World Tours',
  category: 'wordpress',
  industry: 'Travel & Tourism',
  location: 'Namibia',
  liveUrl:  'https://safariworldtours.com',
  duration: '3 Weeks',
  role:     'Full WordPress Development',
  tags:     ['WordPress', 'Travel', 'Booking Platform'],
  tagColors:['tag-purple', 'tag-cyan', 'tag-dim'],
  overview: 'Safari World Tours is a premium Namibia-based safari tour operator. They needed a high-performance WordPress website with an integrated booking system, tour listings and a PayPal payment gateway — capable of handling visitors from across the globe.',
  services: [
    { icon:'🌐', title:'Custom WordPress Theme Development', desc:'Built a bespoke WordPress theme tailored to the travel industry brand.' },
    { icon:'📅', title:'Tour Booking System',               desc:'Integrated a tour booking calendar with availability management.' },
    { icon:'💳', title:'PayPal Payment Integration',        desc:'Fully functional PayPal checkout for secure, global bookings.' },
    { icon:'⚡', title:'Speed & Performance Optimisation',  desc:'Achieved 90+ PageSpeed score with image compression and caching.' },
    { icon:'🔍', title:'SEO Foundation Setup',              desc:'On-page SEO, schema markup and sitemap for organic discoverability.' },
  ],
  technologies: ['WordPress','Elementor Pro','WP Rocket','ACF Pro','PayPal API','Cloudflare','Contact Form 7','RankMath SEO','Smush Pro'],
  features: [
    { icon:'🗺️', title:'Interactive Tour Listings',    desc:'Searchable, filterable tour catalogue with detailed pages for each safari package.' },
    { icon:'📅', title:'Booking Calendar',             desc:'Real-time availability calendar integrated with the admin panel.' },
    { icon:'💳', title:'PayPal Checkout',              desc:'Secure, global PayPal integration with order confirmation and email receipts.' },
    { icon:'📱', title:'Mobile Responsive',            desc:'Pixel-perfect across all screen sizes — built mobile-first.' },
    { icon:'⚡', title:'90+ PageSpeed Score',          desc:'Achieved with WP Rocket, Cloudflare CDN and optimised image delivery.' },
    { icon:'🔐', title:'SSL & Security Hardening',     desc:'Cloudflare protection, SSL and WordPress hardening for full security.' },
  ],
  challenges: [
    'The client had an outdated, slow website with poor user experience',
    'No online booking system — all bookings taken manually via email',
    'No payment gateway — clients had to transfer money via bank',
    'Website not mobile-friendly — poor experience for mobile visitors',
    'No SEO foundation — completely invisible on Google',
  ],
  solutions: [
    'Built a modern, fast WordPress website with professional design',
    'Integrated a full booking system with tour calendar and availability management',
    'Implemented PayPal checkout with order confirmation and email automation',
    'Designed mobile-first for seamless experience on all devices',
    'Set up RankMath SEO, schema markup and Google Search Console',
  ],
  results: [
    { num:'95%', label:'Increase in Enquiries',  sub:'First month after launch' },
    { num:'4s→1.2s', label:'Load Time Reduction', sub:'90+ PageSpeed achieved' },
    { num:'3×', label:'More Tour Bookings',       sub:'Compared to email-only bookings' },
    { num:'Top 10', label:'Google Ranking',       sub:'For key Namibia safari terms' },
  ],
  galleryCount: 3,
};

export default function SafariWorldToursPage() {
  return <ProjectPage data={DATA} />;
}
