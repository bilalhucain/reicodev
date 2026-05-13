import type { Metadata } from 'next';
import ProjectPage, { type ProjectPageData } from '@/components/sections/project/ProjectPage';

export const metadata: Metadata = {
  title: 'Jamaican Products — WooCommerce Caribbean eCommerce Case Study',
  description: 'How we built a full WooCommerce eCommerce store for authentic Jamaican products with international shipping and multi-currency support.',
};

const DATA: ProjectPageData = {
  slug:     'jamaican-products',
  title:    'Jamaican Products',
  category: 'woocommerce',
  industry: 'Food & Beverage / eCommerce',
  location: 'Global Shipping',
  liveUrl:  'https://www.jamaican-product.com',
  duration: '2 Weeks',
  role:     'Full WooCommerce Development',
  tags:     ['WooCommerce', 'eCommerce', 'Caribbean'],
  tagColors:['tag-green', 'tag-purple', 'tag-dim'],
  overview: 'Jamaican Products is an online store selling authentic Caribbean goods to customers across the world. The client needed a fully functional WooCommerce store with international shipping, multi-currency checkout, product management and a high-conversion shopping experience.',
  services: [
    { icon:'🛒', title:'WooCommerce Store Setup',        desc:'Full WooCommerce configuration with product catalogue and categories.' },
    { icon:'💳', title:'Payment Gateway Integration',    desc:'PayPal and Stripe with multi-currency support for global shoppers.' },
    { icon:'📦', title:'Shipping & Fulfilment',         desc:'International shipping zones with calculated rates for all countries.' },
    { icon:'🏷️', title:'Product Management System',     desc:'Easy-to-manage product listings, variants, pricing and inventory.' },
    { icon:'📧', title:'Order Notification Emails',     desc:'Custom branded order confirmation and shipping update emails.' },
  ],
  technologies: ['WordPress','WooCommerce','PayPal','Stripe','WP Rocket','Cloudflare','ACF Pro','Mailchimp','YITH WooCommerce Plugins'],
  features: [
    { icon:'🛍️', title:'Product Catalogue',         desc:'Beautifully organised product categories with search and filter.' },
    { icon:'🌍', title:'Global Shipping',            desc:'International shipping to 50+ countries with calculated rates.' },
    { icon:'💱', title:'Multi-Currency Checkout',   desc:'Automatic currency conversion for seamless global shopping.' },
    { icon:'⭐', title:'Product Reviews',            desc:'Verified buyer reviews to build social proof and trust.' },
    { icon:'🏷️', title:'Coupon & Discount System', desc:'Promotional codes and bulk discount management.' },
    { icon:'📊', title:'Sales Analytics Dashboard', desc:'WooCommerce reporting for revenue, top products and customer data.' },
  ],
  challenges: [
    'No online store — all sales made through social media messages manually',
    'No automated payment system — bank transfers only',
    'No way to manage international shipping rates fairly and efficiently',
    'High cart abandonment with slow website performance',
  ],
  solutions: [
    'Built a full WooCommerce store with 50+ products, categories and variant management',
    'Integrated PayPal and Stripe with automatic order processing and confirmation emails',
    'Set up WooCommerce Shipping zones with real-time international rate calculation',
    'Achieved 2.1s load time with WP Rocket and image optimisation — reducing abandonment',
  ],
  results: [
    { num:'3×', label:'Revenue in Month 1',    sub:'vs manual social media sales' },
    { num:'2.1s', label:'Load Time',           sub:'Optimised with WP Rocket + CDN' },
    { num:'-34%', label:'Cart Abandonment',    sub:'Via checkout optimisation' },
    { num:'50+', label:'Countries Shipping',   sub:'Set up from day one' },
  ],
  galleryCount: 3,
};

export default function JamaicanProductsPage() {
  return <ProjectPage data={DATA} />;
}
