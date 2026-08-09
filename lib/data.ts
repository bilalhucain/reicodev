// lib/data.ts — Single source of truth for all NON-TEXT site data
// All visible text strings have been moved to messages/en.json and messages/fi.json
// This file only contains: slugs, hrefs, image paths, colors, numbers, icons

// ── GLOBAL STATS ──────────────────────────────────────────
export const STATS = {
  projects:      '1,440+',
  reviews:       '879+',
  clients:       '488+',
  countries:     '61+',
  years:         '10+',
  rating:        '4.9',
  fiverr_orders: '1,432',
};

// ── NAVIGATION HREFS ──────────────────────────────────────
// Labels come from translations. Only hrefs live here.
export const NAV_LINKS = [
  { key: 'home',     href: '/' },
  { key: 'about',   href: '/about' },
  {
    key:  'ourWork',
    href: '/our-work',
    children: [
      { key: 'wordpressProjects',   href: '/our-work/wordpress-projects' },
      { key: 'woocommerceProjects', href: '/our-work/woocommerce-projects' },
      { key: 'shopifyProjects',     href: '/our-work/shopify-projects' },
      { key: 'seoProjects',         href: '/our-work/seo-projects' },
      { key: 'brandingProjects',    href: '/our-work/branding-projects' },
    ],
  },
  { key: 'services', href: '/services' },
  { key: 'reviews',  href: '/reviews' },
  { key: 'contact',  href: '/contact' },
];

// ── FOOTER COLUMN HREFS ───────────────────────────────────
// Headings and link labels come from translations. Only keys and hrefs live here.
export const FOOTER_COLUMNS = [
  {
    key: 'services',
    links: [
      { key: 'wpDevelopment',   href: '/services#wordpress' },
      { key: 'wooStores',       href: '/services#woocommerce' },
      { key: 'shopifyStores',   href: '/services#shopify' },
      { key: 'seoOptimization', href: '/services#seo' },
      { key: 'brandingServices',href: '/services#branding' },
      { key: 'bugFixes',        href: '/services#bug-fixes' },
    ],
  },
  {
    key: 'company',
    links: [
      { key: 'aboutUs', href: '/about' },
      { key: 'ourWork', href: '/our-work' },
      { key: 'reviews', href: '/reviews' },
      { key: 'contact', href: '/contact' },
    ],
  },
  {
    key: 'support',
    links: [
      { key: 'helpCenter',     href: '/contact' },
      { key: 'privacyPolicy',  href: '/privacy-policy' },
      { key: 'cookiePolicy',   href: '/cookie-policy' },
      { key: 'termsOfService', href: '/terms-of-service' },
      { key: 'getAQuote',      href: '/get-a-quote' },
    ],
  },
];

// ── PROJECT DATA ──────────────────────────────────────────
export type ProjectCategory = 'wordpress' | 'woocommerce' | 'shopify' | 'seo' | 'branding';

export interface ProjectCard {
  slug:          string;
  category:      ProjectCategory;
  liveUrl:       string;
  hasDetailPage: boolean;
  featured?:     boolean;
  screenshot?:   string;
  tags:          string[];
  tagColors:     string[];
}

// Text fields (title, categoryLabel, description) are in messages JSON under projects.[slug]
export const PROJECTS: ProjectCard[] = [

  // ── WORDPRESS (6) ──────────────────────────────────────────────────────────
  {
    slug:          'safari-world-tours',
    category:      'wordpress',
    liveUrl:       'https://safariworldtours.com',
    hasDetailPage: false,
    featured:      true,
    screenshot:    '/images/safariworldtours.webp',
    tags:          ['WordPress', 'Travel', 'Booking'],
    tagColors:     ['tag-purple', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'clearconnect-tv',
    category:      'wordpress',
    liveUrl:       'https://clearconnecttv.com',
    hasDetailPage: false,
    screenshot:    '/images/clearconnecttv.webp',
    tags:          ['WordPress', 'Streaming', 'Membership'],
    tagColors:     ['tag-purple', 'tag-amber', 'tag-dim'],
  },
  {
    slug:          'asal-sports',
    category:      'wordpress',
    liveUrl:       'https://asalsports.org',
    hasDetailPage: false,
    screenshot:    '/images/asalsports.webp',
    tags:          ['WordPress', 'Sports', 'Community'],
    tagColors:     ['tag-purple', 'tag-green', 'tag-dim'],
  },
  {
    slug:          'meaningful-analytics',
    category:      'wordpress',
    liveUrl:       'https://yourmeaningfulanalytics.com',
    hasDetailPage: false,
    screenshot:    '/images/yourmeaninfulanalyrics.webp',
    tags:          ['WordPress', 'Healthcare', 'Services'],
    tagColors:     ['tag-purple', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'sipsentials',
    category:      'wordpress',
    liveUrl:       'https://sipsentials.ca',
    hasDetailPage: false,
    screenshot:    '/images/sipsentials.webp',
    tags:          ['WordPress', 'eCommerce', 'Food'],
    tagColors:     ['tag-purple', 'tag-green', 'tag-dim'],
  },
  {
    slug:          'nuhaus-structures',
    category:      'wordpress',
    liveUrl:       'https://nuhausstructures.dreamhosters.com',
    hasDetailPage: false,
    screenshot:    '/images/nuhausstructures.dreamhosters.webp',
    tags:          ['WordPress', 'Construction', 'Business'],
    tagColors:     ['tag-purple', 'tag-amber', 'tag-dim'],
  },
  {
    slug:          'pretty-calm-planning',
    category:      'wordpress',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/prettycalmplanning.webp',
    tags:          ['WordPress', 'Membership', 'Digital Products'],
    tagColors:     ['tag-purple', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'bereave',
    category:      'wordpress',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/bereave.webp',
    tags:          ['WordPress', 'App Landing Page', 'Business'],
    tagColors:     ['tag-purple', 'tag-amber', 'tag-dim'],
  },
  {
    slug:          'asap-visa',
    category:      'wordpress',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/asapavisa.webp',
    tags:          ['WordPress', 'Consulting', 'Business'],
    tagColors:     ['tag-purple', 'tag-cyan', 'tag-dim'],
  },

  // ── WOOCOMMERCE (3) ────────────────────────────────────────────────────────
  {
    slug:          'occhio-house',
    category:      'woocommerce',
    liveUrl:       'https://occhiohouse.com',
    hasDetailPage: false,
    screenshot:    '/images/occhiohouse.webp',
    tags:          ['WooCommerce', 'Fashion', 'Retail'],
    tagColors:     ['tag-green', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'tc-productions',
    category:      'woocommerce',
    liveUrl:       'https://tcproductions.co.za',
    hasDetailPage: false,
    screenshot:    '/images/tcproductions.webp',
    tags:          ['WooCommerce', 'Photography', 'Services'],
    tagColors:     ['tag-green', 'tag-purple', 'tag-dim'],
  },
  {
    slug:          'tryckt-val',
    category:      'woocommerce',
    liveUrl:       'https://trycktval.se',
    hasDetailPage: false,
    screenshot:    '/images/httpstrycktval.webp',
    tags:          ['WooCommerce', 'B2B', 'Sweden'],
    tagColors:     ['tag-green', 'tag-amber', 'tag-dim'],
  },
  {
    slug:          'hyb-skincare',
    category:      'woocommerce',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/hyb.webp',
    tags:          ['WooCommerce', 'CBD & Wellness', 'eCommerce'],
    tagColors:     ['tag-green', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'tonder-farver',
    category:      'woocommerce',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/tonderfarver.webp',
    tags:          ['WooCommerce', 'Retail', 'Denmark'],
    tagColors:     ['tag-green', 'tag-amber', 'tag-dim'],
  },
  {
    slug:          'mood-shop',
    category:      'woocommerce',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/moodshop.webp',
    tags:          ['WooCommerce', 'Fashion Retail', 'Sportswear'],
    tagColors:     ['tag-green', 'tag-purple', 'tag-dim'],
  },
  {
    slug:          'sol-and-sahara',
    category:      'woocommerce',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/solandsahara.webp',
    tags:          ['WooCommerce', 'Bakery', 'Food & Beverage'],
    tagColors:     ['tag-green', 'tag-amber', 'tag-dim'],
  },
  {
    slug:          'bluerock24',
    category:      'woocommerce',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/Bluerock24.webp',
    tags:          ['WooCommerce', 'Medical Equipment', 'Germany'],
    tagColors:     ['tag-green', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'cardsynk',
    category:      'woocommerce',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/cardsynk.webp',
    tags:          ['WooCommerce', 'Design Agency', 'Print & Web'],
    tagColors:     ['tag-green', 'tag-purple', 'tag-dim'],
  },
  {
    slug:          'lowcost-wheels',
    category:      'woocommerce',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/lowcostwheels.webp',
    tags:          ['WooCommerce', 'Automotive', 'Retail'],
    tagColors:     ['tag-green', 'tag-amber', 'tag-dim'],
  },

  // ── SHOPIFY (1) ────────────────────────────────────────────────────────────
  {
    slug:          'blissful-bula',
    category:      'shopify',
    liveUrl:       'https://blissfulbula.com.au',
    hasDetailPage: false,
    screenshot:    '/images/blissfulbula.webp',
    tags:          ['Shopify', 'Wellness', 'eCommerce'],
    tagColors:     ['tag-cyan', 'tag-green', 'tag-dim'],
  },

  // ── SEO (3) ────────────────────────────────────────────────────────────────
  {
    slug:          'half-price-packaging',
    category:      'seo',
    liveUrl:       'https://www.halfpricepackaging.com',
    hasDetailPage: false,
    screenshot:    '/images/halfpricepackaging.webp',
    tags:          ['SEO', 'eCommerce', 'Packaging'],
    tagColors:     ['tag-amber', 'tag-purple', 'tag-dim'],
  },
  {
    slug:          'marham-pharmacy',
    category:      'seo',
    liveUrl:       'https://trycktval.se/',
    hasDetailPage: false,
    screenshot:    '/images/marhampharmacy.webp',
    tags:          ['SEO', 'B2B', 'Technical SEO'],
    tagColors:     ['tag-amber', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'toys-uae',
    category:      'seo',
    liveUrl:       'https://www.toysuae.com',
    hasDetailPage: false,
    screenshot:    '/images/toysuae.webp',
    tags:          ['SEO', 'eCommerce', 'UAE'],
    tagColors:     ['tag-amber', 'tag-green', 'tag-dim'],
  },

  // ── BRANDING (3) ───────────────────────────────────────────────────────────
  {
    slug:          'taschen-bags',
    category:      'branding',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/The_Taschen_Bags.webp',
    tags:          ['Branding', 'Packaging', 'Design'],
    tagColors:     ['tag-purple', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'american-mascot',
    category:      'branding',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/American_Mascot.webp',
    tags:          ['Branding', 'Illustration', 'Mascot'],
    tagColors:     ['tag-purple', 'tag-amber', 'tag-dim'],
  },
  {
    slug:          'ivf-center',
    category:      'branding',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/IVF_Center_Social_Media_Kit.webp',
    tags:          ['Branding', 'Social Media', 'Healthcare'],
    tagColors:     ['tag-purple', 'tag-cyan', 'tag-dim'],
  },
];

// ── TESTIMONIALS ──────────────────────────────────────────
// text is hardcoded (client quotes, do not translate)
export const TESTIMONIALS = [
  {
    initials: 'G',
    name:     'Goagoseb - Namibia',
    role:     'https://safariworldtours.com/',
    rating:   5,
    text:     'Great and excellent Job. New tour Website done with excellent features. Great and fast service. I keep on ordering',
  },
  {
    initials: 'J',
    name:     'Jonathan - Australia',
    role:     'https://blissfulbula.com.au/',
    rating:   5,
    text:     'this gentleman really is special at what he does, a very trustworthy person and a professional in every aspect.',
  },
  {
    initials: 'C',
    name:     'ClearConnect - United States',
    role:     'https://clearconnecttv.com/',
    rating:   5,
    text:     'Bilal is my only go to web-tech... I am always fully satisfied & never been disappointed! Bilal is the best!',
  },
  {
    initials: 'D',
    name:     'Dylan - United States',
    role:     'https://nuhausstructures.dreamhosters.com/home/',
    rating:   5,
    text:     'Bilal Hussain truly exceeded expectations in our website development project, delivering flawless, expert-level project.',
  },
];

// ── HOME SERVICES — icon/color/image only, text in JSON ───
export const SERVICES_META = [
  { key: 'wordpress',   icon: '🌐', color: '#6C4BFF', img: '/images/home-service-wordpress-icon.svg' },
  { key: 'woocommerce', icon: '🛒', color: '#10B981', img: '/images/home-service-woocommerce-icon.svg' },
  { key: 'seo',         icon: '📈', color: '#F59E0B', img: '/images/home-service-seo-icon.svg' },
  { key: 'branding',    icon: '🎨', color: '#8B5CFF', img: '/images/home-service-branding-icon.svg' },
];

// ── PROCESS STEPS — icon/num only, text in JSON ───────────
export const PROCESS_STEPS_META = [
  { num: '01', icon: '🔍', key: 'discovery' },
  { num: '02', icon: '📋', key: 'strategy' },
  { num: '03', icon: '🎨', key: 'design' },
  { num: '04', icon: '⚡', key: 'development' },
  { num: '05', icon: '🚀', key: 'optimization' },
];

// ── ADVANTAGE POINTS — icon only, text in JSON ────────────
export const ADVANTAGES_META = [
  { icon: '🏆', key: 'expertise' },
  { icon: '📊', key: 'resultDriven' },
  { icon: '🤝', key: 'clientCentric' },
  { icon: '⏰', key: 'reliable' },
];

// ── WHY CHOOSE US — icon only, text in JSON ───────────────
export const WHY_CHOOSE_META = [
  { icon: '🎯', key: 'conversionFocused' },
  { icon: '⚡', key: 'fastLoading' },
  { icon: '📌', key: 'seoReady' },
  { icon: '🔧', key: 'easyBackend' },
];
