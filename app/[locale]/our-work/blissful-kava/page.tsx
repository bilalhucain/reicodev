import type { Metadata } from 'next';
import ProjectPage, { type ProjectPageData } from '@/components/sections/project/ProjectPage';

export const metadata: Metadata = {
  title: 'Blissful Kava — Shopify Beverage Brand Store Case Study',
  description: 'How we built a premium Shopify store for an Australian Kava brand with custom checkout, age verification and subscription products.',
};

const DATA: ProjectPageData = {
  slug:     'blissful-kava',
  title:    'Blissful Kava',
  category: 'shopify',
  industry: 'Wellness Beverages',
  location: 'Australia',
  liveUrl:  'https://blissfulbula.com.au',
  duration: '2 Weeks',
  role:     'Shopify Store Development',
  tags:     ['Shopify', 'Beverage', 'Australia'],
  tagColors:['tag-purple', 'tag-green', 'tag-dim'],
  overview: 'Blissful Kava (Blissful Bula) is a premium Australian Kava and wellness beverage brand. They needed a sophisticated Shopify store with custom theme design, age verification (required by Australian law), subscription products and a checkout optimised for maximum conversions.',
  services: [
    { icon:'🛍️', title:'Shopify Store Design',       desc:'Custom Shopify theme tailored to the premium Kava beverage brand.' },
    { icon:'🔞', title:'Age Verification Gate',      desc:'Legal age gate required for Kava sales in Australia — fully integrated.' },
    { icon:'🔄', title:'Subscription Products',      desc:'ReCharge integration for monthly Kava subscription orders.' },
    { icon:'📧', title:'Klaviyo Email Integration',  desc:'Welcome series, abandoned cart recovery and retention email flows.' },
    { icon:'📱', title:'Mobile Commerce Optimisation', desc:'Mobile-first shopping experience for Australian mobile shoppers.' },
  ],
  technologies: ['Shopify','Dawn Theme (Custom)','ReCharge Subscriptions','Klaviyo','Shopify Payments','Google Analytics 4','Tidio Live Chat'],
  features: [
    { icon:'🌿', title:'Premium Product Showcase', desc:'Rich product pages with ingredient highlights and wellness benefits.' },
    { icon:'🔞', title:'Age Gate',               desc:'Compliant age verification at site entry as required by regulations.' },
    { icon:'🔄', title:'Subscribe & Save',        desc:'Monthly subscription with 10% discount — increases customer lifetime value.' },
    { icon:'⭐', title:'Reviews & Social Proof',  desc:'Okendo review widget with photo reviews for brand credibility.' },
    { icon:'🎁', title:'Bundle Builder',          desc:'Custom bundle pages allowing customers to mix their favourite flavours.' },
    { icon:'📦', title:'Real-Time Tracking',      desc:'Order status tracking page integrated with Australian logistics providers.' },
  ],
  challenges: [
    'Australian regulations require age verification for Kava products',
    'Complex subscription logic with multiple frequency options',
    'Brand wanted a premium feel without compromising conversion rate',
    'First-time Shopify setup — migrating from basic social media selling',
  ],
  solutions: [
    'Implemented a clean age gate with cookie persistence to avoid friction on return visits',
    'ReCharge configured with weekly, fortnightly and monthly subscription tiers',
    'Premium minimalist design with clear product photography spaces and benefit-focused copy',
    'Full Shopify setup from scratch — products, collections, payments, shipping and analytics',
  ],
  results: [
    { num:'+120%', label:'Online Revenue',        sub:'Month 1 vs social media sales' },
    { num:'28%', label:'Subscription Rate',       sub:'Of first-time buyers subscribe' },
    { num:'3.8×', label:'ROAS from Email',        sub:'Klaviyo flows driving revenue' },
    { num:'4.9★', label:'Client Review',          sub:'Fiverr project satisfaction' },
  ],
  galleryCount: 3,
};

export default function BlissfulKavaPage() {
  return <ProjectPage data={DATA} />;
}
