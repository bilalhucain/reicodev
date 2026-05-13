import type { Metadata } from 'next';
import ProjectPage, { type ProjectPageData } from '@/components/sections/project/ProjectPage';

export const metadata: Metadata = {
  title: 'Half Price Packaging — SEO Campaign Case Study | Reicodev',
  description: 'How we delivered a comprehensive SEO campaign for a US custom packaging company — improving rankings, organic traffic and leads.',
};

const DATA: ProjectPageData = {
  slug:     'half-price-packaging-seo',
  title:    'Half Price Packaging — SEO Campaign',
  category: 'seo',
  industry: 'Custom Packaging / Manufacturing',
  location: 'United States',
  liveUrl:  'https://www.halfpricepackaging.com',
  duration: '6 Months',
  role:     'Full SEO Strategy & Execution',
  tags:     ['SEO', 'eCommerce SEO', 'USA'],
  tagColors:['tag-amber', 'tag-green', 'tag-dim'],
  overview: 'Half Price Packaging is a US-based custom packaging company serving 5,000+ customers — including major brands. Despite having an excellent product catalogue, their organic visibility was limited. We designed and executed a comprehensive SEO strategy covering technical fixes, content optimisation and link building to grow their organic reach.',
  services: [
    { icon:'🔬', title:'Full Technical SEO Audit',      desc:'Site crawl, Core Web Vitals analysis and structured data audit with fix recommendations.' },
    { icon:'🔑', title:'Keyword Strategy',              desc:'Research and mapping of 200+ target keywords across all packaging product categories.' },
    { icon:'📝', title:'On-Page Content Optimisation',  desc:'Optimising product, category and landing pages with targeted keyword content.' },
    { icon:'🔗', title:'Link Building Campaign',        desc:'Outreach-driven backlink acquisition from relevant industry and business publications.' },
    { icon:'📊', title:'Monthly Reporting & Strategy', desc:'Transparent monthly reports with ranking movements, traffic data and next-step strategy.' },
  ],
  technologies: ['Google Search Console','Google Analytics 4','Ahrefs','SEMrush','Surfer SEO','Screaming Frog','RankMath','Google PageSpeed Insights','SERanking'],
  features: [
    { icon:'🔍', title:'Keyword-to-Page Mapping',    desc:'Matched every key search term to the optimal existing or new page for maximum relevance.' },
    { icon:'📋', title:'Schema Markup Implementation', desc:'Product, Organisation and FAQ schema markup added for rich snippet eligibility.' },
    { icon:'⚡', title:'Core Web Vitals Fixes',       desc:'LCP, CLS and FID improvements to pass Google PageSpeed requirements.' },
    { icon:'📝', title:'Content Gap Analysis',        desc:'Identified missing content opportunities and created optimised pages for new keywords.' },
    { icon:'🔗', title:'Authority Link Building',     desc:'Earned high-DA backlinks from packaging, manufacturing and business authority sites.' },
    { icon:'📍', title:'Local SEO Setup',             desc:'Google Business Profile optimisation and local citation building for US market presence.' },
  ],
  challenges: [
    'Competitive US packaging market dominated by established brands',
    'Thin category and product page content — not competitive for target keywords',
    'Technical issues: slow load times, missing meta data and crawl errors',
    'Few high-authority backlinks pointing to the domain',
    'No clear keyword strategy — pages targeting broad, unfocused terms',
  ],
  solutions: [
    'Identified 40+ low-competition, high-intent keywords with clear conversion potential',
    'Rewrote and expanded key category pages with benefit-led, keyword-rich content',
    'Fixed all technical issues: canonicals, 404s, image compression and meta data',
    'Executed targeted outreach resulting in 35+ new referring domains within 6 months',
    'Created a detailed keyword map with primary and secondary term assignments per page',
  ],
  results: [
    { num:'+285%', label:'Organic Traffic Growth',   sub:'Over the 6-month campaign period' },
    { num:'Top 5', label:'Keywords in Top 5',         sub:'For "custom packaging" and related terms' },
    { num:'35+', label:'New Backlinks Earned',         sub:'From high-authority sites' },
    { num:'+68%', label:'Organic Leads Increase',     sub:'Qualified enquiries from search' },
  ],
  galleryCount: 2,
};

export default function HalfPricePackagingPage() {
  return <ProjectPage data={DATA} />;
}
