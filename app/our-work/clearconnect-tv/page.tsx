import type { Metadata } from 'next';
import ProjectPage, { type ProjectPageData } from '@/components/sections/project/ProjectPage';

export const metadata: Metadata = {
  title: 'ClearConnectTV — WordPress Streaming Platform Case Study',
  description: 'How we built a professional streaming service website with subscription tiers and video delivery optimisation for ClearConnectTV.',
};

const DATA: ProjectPageData = {
  slug:     'clearconnect-tv',
  title:    'ClearConnectTV',
  category: 'wordpress',
  industry: 'Entertainment / Streaming',
  location: 'USA',
  liveUrl:  'https://clearconnecttv.com',
  duration: '4 Weeks',
  role:     'Full WordPress Development',
  tags:     ['WordPress', 'Streaming', 'Membership'],
  tagColors:['tag-purple', 'tag-amber', 'tag-dim'],
  overview: 'ClearConnectTV is a US-based IPTV streaming service that needed a professional WordPress website with subscription management, plan tiers and an optimised checkout experience to grow their subscriber base.',
  services: [
    { icon:'📺', title:'Streaming Platform Website',    desc:'Professional service landing page with plan comparison and CTA optimisation.' },
    { icon:'👤', title:'Customer Account Dashboard',   desc:'Members-only area with subscription management and billing history.' },
    { icon:'💳', title:'Subscription Checkout',        desc:'Stripe and PayPal integration with recurring billing support.' },
    { icon:'⚡', title:'CDN & Speed Optimisation',     desc:'Cloudflare CDN setup for fast delivery to US and global audiences.' },
    { icon:'📧', title:'Email Automation',             desc:'Automated welcome emails, renewal reminders and support ticketing.' },
  ],
  technologies: ['WordPress','MemberPress','Stripe','PayPal','Elementor Pro','WP Rocket','Cloudflare','ACF Pro','Contact Form 7'],
  features: [
    { icon:'📋', title:'Plan Comparison Table',   desc:'Interactive pricing comparison to help visitors choose the right plan.' },
    { icon:'🔑', title:'Member Portal',           desc:'Secure customer login area with subscription details and billing history.' },
    { icon:'💳', title:'Recurring Billing',       desc:'Stripe + PayPal recurring subscription with automatic renewal handling.' },
    { icon:'📺', title:'Channel Listings',        desc:'Structured channel guides categorised by genre and region.' },
    { icon:'📱', title:'Mobile-First Design',     desc:'Optimised for streaming on mobile, tablet and desktop.' },
    { icon:'🛡️', title:'Anti-Piracy Protection', desc:'Content protection and user authentication to prevent unauthorised access.' },
  ],
  challenges: [
    'No subscription management — plans were sold manually with no automation',
    'Poor website performance causing high bounce rates',
    'No secure member portal for customers to manage their accounts',
    'Inconsistent branding and outdated website design',
    'No email automation for onboarding or renewal reminders',
  ],
  solutions: [
    'Built MemberPress-powered subscription system with 3 plan tiers',
    'Achieved sub-2 second load times with WP Rocket and Cloudflare CDN',
    'Developed a full customer portal with subscription and billing management',
    'Complete website redesign with modern, professional UI consistent with their brand',
    'Set up Mailchimp email sequences for welcome, trial expiry and renewal campaigns',
  ],
  results: [
    { num:'+65%', label:'Subscriber Growth',   sub:'First 90 days post-launch' },
    { num:'<2s',  label:'Page Load Time',      sub:'Achieved with Cloudflare CDN' },
    { num:'-45%', label:'Churn Reduction',     sub:'Via automated renewal reminders' },
    { num:'4.8★', label:'Customer Rating',     sub:'Post-launch satisfaction score' },
  ],
  galleryCount: 3,
};

export default function ClearConnectTVPage() {
  return <ProjectPage data={DATA} />;
}
