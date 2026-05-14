// lib/data.ts — Single source of truth for all site data

// ── GLOBAL STATS ──────────────────────────────────────────
export const STATS = {
  projects:   '1,440+',
  reviews:    '879+',
  clients:    '488+',
  countries:  '61+',
  years:      '10+',
  rating:     '4.9',
  fiverr_orders: '1,432',
};

// ── NAVIGATION ────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  {
    label: 'Our Work',
    href:  '/our-work',
    children: [
      { label: 'WordPress Projects',   href: '/our-work/wordpress-projects' },
      { label: 'WooCommerce Projects', href: '/our-work/woocommerce-projects' },
      { label: 'Shopify Projects',     href: '/our-work/shopify-projects' },
      { label: 'SEO Projects',         href: '/our-work/seo-projects' },
      { label: 'Branding Projects',    href: '/our-work/branding-projects' },
    ],
  },
  { label: 'Services', href: '/services' },
  { label: 'Contact',  href: '/contact' },
];

// ── FOOTER LINKS ──────────────────────────────────────────
export const FOOTER = {
  tagline: 'Strategy. Focus. Growth.',
  columns: [
    {
      heading: 'Services',
      links: [
        { label: 'WordPress Development', href: '/services' },
        { label: 'WooCommerce Stores',    href: '/services' },
        { label: 'Shopify Stores',        href: '/services' },
        { label: 'SEO Optimization',      href: '/services' },
        { label: 'Branding Services',     href: '/services' },
        { label: 'Bug Fixes',             href: '/services' },
      ],
    },
    {
      heading: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Work', href: '/our-work' },
        { label: 'Blog',     href: '/blog' },
        { label: 'Contact',  href: '/contact' },
      ],
    },
    {
      heading: 'Support',
      links: [
        { label: 'Help Center',       href: '/contact' },
        { label: 'Privacy Policy',    href: '/privacy-policy' },
        { label: 'Terms & Conditions',href: '/terms' },
        { label: 'Get a Quote',       href: '/get-a-quote' },
      ],
    },
  ],
  social: [
    { label: 'Facebook',  href: '#', icon: 'fb' },
    { label: 'X',         href: '#', icon: 'x' },
    { label: 'YouTube',   href: '#', icon: 'yt' },
    { label: 'LinkedIn',  href: '#', icon: 'li' },
    { label: 'WhatsApp',  href: '#', icon: 'wa' },
  ],
};

// ── PROJECT DATA ──────────────────────────────────────────
export type ProjectCategory = 'wordpress' | 'woocommerce' | 'shopify' | 'seo' | 'branding';

export interface ProjectCard {
  slug:          string;
  title:         string;
  category:      ProjectCategory;
  categoryLabel: string;
  industry:      string;
  location:      string;
  description:   string;
  liveUrl:       string;
  hasDetailPage: boolean;
  featured?:     boolean;
  screenshot?:   string;   // path to /public/images/ — static, no WordPress needed
  tags:          string[];
  tagColors:     string[];
}

export const PROJECTS: ProjectCard[] = [

  // ── WORDPRESS (6) ──────────────────────────────────────────────────────────
  {
    slug:          'safari-world-tours',
    title:         'Safari World Tours',
    category:      'wordpress',
    categoryLabel: 'WordPress • Booking Platform',
    industry:      'Travel & Tourism',
    location:      'Namibia',
    description:   'A complete tour booking website with PayPal integration, advanced destination filtering and global performance optimisation.',
    liveUrl:       'https://safariworldtours.com',
    hasDetailPage: false,
    featured:      true,
    screenshot:    '/images/safariworldtours.webp',
    tags:          ['WordPress', 'Travel', 'Booking'],
    tagColors:     ['tag-purple', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'clearconnect-tv',
    title:         'ClearConnect TV',
    category:      'wordpress',
    categoryLabel: 'WordPress • Streaming Platform',
    industry:      'Entertainment',
    location:      'USA',
    description:   'Professional streaming service website with subscription tiers, customer accounts and CDN-optimised video delivery.',
    liveUrl:       'https://clearconnecttv.com',
    hasDetailPage: false,
    screenshot:    '/images/clearconnecttv.webp',
    tags:          ['WordPress', 'Streaming', 'Membership'],
    tagColors:     ['tag-purple', 'tag-amber', 'tag-dim'],
  },
  {
    slug:          'asal-sports',
    title:         'AsalSports',
    category:      'wordpress',
    categoryLabel: 'WordPress • Community Platform',
    industry:      'Sports & Recreation',
    location:      'Global',
    description:   'Community-driven sports platform with player profiles, tournament listings, team management and photo galleries.',
    liveUrl:       'https://asalsports.org',
    hasDetailPage: false,
    screenshot:    '/images/asalsports.webp',
    tags:          ['WordPress', 'Sports', 'Community'],
    tagColors:     ['tag-purple', 'tag-green', 'tag-dim'],
  },
  {
    slug:          'meaningful-analytics',
    title:         'Meaningful Analytics',
    category:      'wordpress',
    categoryLabel: 'WordPress • Healthcare',
    industry:      'Behavioral Health',
    location:      'USA',
    description:   'Behavioral health practice website with service pages, provider profiles, client portal links and appointment booking.',
    liveUrl:       'https://yourmeaningfulanalytics.com',
    hasDetailPage: false,
    screenshot:    '/images/yourmeaninfulanalyrics.webp',
    tags:          ['WordPress', 'Healthcare', 'Services'],
    tagColors:     ['tag-purple', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'sipsentials',
    title:         'Sipsentials',
    category:      'wordpress',
    categoryLabel: 'WordPress • eCommerce',
    industry:      'Food & Beverage',
    location:      'Canada',
    description:   'WooCommerce cocktail emporium with custom product categories, beverage bundles and a seamless shopping experience.',
    liveUrl:       'https://sipsentials.ca',
    hasDetailPage: false,
    screenshot:    '/images/sipsentials.webp',
    tags:          ['WordPress', 'eCommerce', 'Food'],
    tagColors:     ['tag-purple', 'tag-green', 'tag-dim'],
  },
  {
    slug:          'nuhaus-structures',
    title:         'NuHaus Structures',
    category:      'wordpress',
    categoryLabel: 'WordPress • Business',
    industry:      'Construction',
    location:      'USA',
    description:   'Outdoor structures company website with product catalogue, custom shed designer tool and multi-location dealer pages.',
    liveUrl:       'https://nuhausstructures.dreamhosters.com',
    hasDetailPage: false,
    screenshot:    '/images/nuhausstructures.dreamhosters.webp',
    tags:          ['WordPress', 'Construction', 'Business'],
    tagColors:     ['tag-purple', 'tag-amber', 'tag-dim'],
  },

  // ── WOOCOMMERCE (3) ────────────────────────────────────────────────────────
  {
    slug:          'occhio-house',
    title:         'Occhio House',
    category:      'woocommerce',
    categoryLabel: 'WooCommerce • Fashion Retail',
    industry:      'Fashion & Accessories',
    location:      'Europe',
    description:   'Premium eyewear boutique with WooCommerce shop, product shape navigator, newsletter integration and subscription discounts.',
    liveUrl:       'https://occhiohouse.com',
    hasDetailPage: false,
    screenshot:    '/images/occhiohouse.webp',
    tags:          ['WooCommerce', 'Fashion', 'Retail'],
    tagColors:     ['tag-green', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'tc-productions',
    title:         'TC Productions',
    category:      'woocommerce',
    categoryLabel: 'WooCommerce • Photography',
    industry:      'Photography & Film',
    location:      'South Africa',
    description:   'Wedding and corporate photography studio with WooCommerce packages, portfolio gallery and online booking system.',
    liveUrl:       'https://tcproductions.co.za',
    hasDetailPage: false,
    screenshot:    '/images/tcproductions.webp',
    tags:          ['WooCommerce', 'Photography', 'Services'],
    tagColors:     ['tag-green', 'tag-amber', 'tag-dim'],
  },
  {
    slug:          'tryckt-val',
    title:         'Tryckt Val',
    category:      'woocommerce',
    categoryLabel: 'WooCommerce • B2B',
    industry:      'Promotional Products',
    location:      'Sweden',
    description:   'Swedish B2B promotional products store with WooCommerce, brand configurator, bulk ordering and live chat support.',
    liveUrl:       'https://trycktval.se',
    hasDetailPage: false,
    screenshot:    '/images/httpstrycktval.webp',
    tags:          ['WooCommerce', 'B2B', 'Sweden'],
    tagColors:     ['tag-green', 'tag-purple', 'tag-dim'],
  },

  // ── SHOPIFY (1) ────────────────────────────────────────────────────────────
  {
    slug:          'blissful-kava',
    title:         'Blissful Bula',
    category:      'shopify',
    categoryLabel: 'Shopify • Health & Wellness',
    industry:      'Health & Wellness',
    location:      'Australia',
    description:   'Premium kava and wellness products Shopify store with custom theme, subscription model and loyalty rewards programme.',
    liveUrl:       'https://blissfulbula.com.au',
    hasDetailPage: false,
    screenshot:    '/images/blissfulbula.webp',
    tags:          ['Shopify', 'Wellness', 'eCommerce'],
    tagColors:     ['tag-cyan', 'tag-green', 'tag-dim'],
  },

  // ── SEO (3) ────────────────────────────────────────────────────────────────
  {
    slug:          'half-price-packaging',
    title:         'Half Price Packaging',
    category:      'seo',
    categoryLabel: 'SEO • eCommerce',
    industry:      'Packaging & Manufacturing',
    location:      'USA',
    description:   'Full SEO campaign for a custom packaging company — keyword strategy, on-page optimisation and technical audit driving 5,000+ customers.',
    liveUrl:       'https://www.halfpricepackaging.com',
    hasDetailPage: false,
    screenshot:    '/images/halfpricepackaging.webp',
    tags:          ['SEO', 'eCommerce', 'Packaging'],
    tagColors:     ['tag-amber', 'tag-purple', 'tag-dim'],
  },
  {
    slug:          'marham-pharmacy',
    title:         'Tryckt Val',
    category:      'seo',
    categoryLabel: 'SEO • B2B',
    industry:      'Healthcare & Pharmacy',
    location:      'Swedish',
    description:   'Swedish B2B promotional products store whre we fixed technical SEO issues for this store and improved the site health',
    liveUrl:       'https://trycktval.se/',
    hasDetailPage: false,
    screenshot:    '/images/marhampharmacy.webp',
    tags:          ['SEO', 'B2B', 'Technical SEO'],
    tagColors:     ['tag-amber', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'toys-uae',
    title:         'Toys UAE',
    category:      'seo',
    categoryLabel: 'SEO • eCommerce',
    industry:      'Toys & Children',
    location:      'UAE',
    description:   'eCommerce SEO for a UAE-based toy retailer — product page optimisation, category structure and Arabic/English keyword targeting.',
    liveUrl:       'https://www.toysuae.com',
    hasDetailPage: false,
    screenshot:    '/images/toysuae.webp',
    tags:          ['SEO', 'eCommerce', 'UAE'],
    tagColors:     ['tag-amber', 'tag-green', 'tag-dim'],
  },

  // ── BRANDING (3) ───────────────────────────────────────────────────────────
  {
    slug:          'taschen-bags',
    title:         'The Taschen Bags',
    category:      'branding',
    categoryLabel: 'Branding • Packaging Design',
    industry:      'Packaging & Consumer Goods',
    location:      'Global',
    description:   'Complete brand identity and packaging design for an eco-friendly bag product line — logo, colour system, typography and print-ready packaging.',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/The_Taschen_Bags.webp',
    tags:          ['Branding', 'Packaging', 'Design'],
    tagColors:     ['tag-purple', 'tag-cyan', 'tag-dim'],
  },
  {
    slug:          'american-mascot',
    title:         'American Mascot',
    category:      'branding',
    categoryLabel: 'Branding • Illustration',
    industry:      'Food & Restaurant',
    location:      'USA',
    description:   'Custom mascot illustration and brand identity for an American restaurant — character design, brand guidelines and social media assets.',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/American_Mascot.webp',
    tags:          ['Branding', 'Illustration', 'Mascot'],
    tagColors:     ['tag-purple', 'tag-amber', 'tag-dim'],
  },
  {
    slug:          'ivf-center',
    title:         'Saqib IVF Centre',
    category:      'branding',
    categoryLabel: 'Branding • Social Media',
    industry:      'Healthcare & Fertility',
    location:      'Pakistan',
    description:   'Social media brand kit and campaign design for a fertility clinic — post templates, story designs and consistent visual identity across platforms.',
    liveUrl:       '#',
    hasDetailPage: false,
    screenshot:    '/images/IVF_Center_Social_Media_Kit.webp',
    tags:          ['Branding', 'Social Media', 'Healthcare'],
    tagColors:     ['tag-purple', 'tag-cyan', 'tag-dim'],
  },
];

export const TESTIMONIALS = [
  {
    initials: 'G',
    name: 'Goagoseb - Namibia',
    role: 'https://safariworldtours.com/',
    rating: 5,
    text: 'Great and excellent Job. New tour Website done with excellent features. Great and fast service. I keep on ordering',
  },
  {
    initials: 'J',
    name: 'Jonathan - Australia',
    role: 'https://blissfulbula.com.au/',
    rating: 5,
    text: 'this gentleman really is special at what he does, a very trustworthy person and a professional in every aspect.',
  },
  {
    initials: 'C',
    name: 'ClearConnect - United States',
    role: 'https://clearconnecttv.com/',
    rating: 5,
    text: 'Bilal is my only go to web-tech... I am always fully satisfied & never been disappointed! Bilal is the best!',
  },
  {
    initials: 'D',
    name: 'Dylan - United States',
    role: 'https://nuhausstructures.dreamhosters.com/home/',
    rating: 5,
    text: 'Bilal Hussain truly exceeded expectations in our website development project, delivering flawless, expert-level project.',
  },
];

// ── HOME SERVICES ─────────────────────────────────────────
export const SERVICES = [
  {
    icon: '🌐',
    color: '#6C4BFF',
    label: 'Development',
    title: 'WordPress Development',
    desc: 'Fast, secure and scalable websites built with the power of WordPress — from landing pages to custom wordpress designs.',
    tags: ['Custom Themes', 'Elementor', 'Speed'],
    href: '/images/home-service-wordpress-icon.svg',
  },
  {
    icon: '🛒',
    color: '#10B981',
    label: 'eCommerce',
    title: 'WooCommerce Stores',
    desc: 'High-converting online stores built on WooCommerce — payment gateways, shipping, and full catalogue management.',
    tags: ['WooCommerce', 'Stripe', 'PayPal'],
    href: '/images/home-service-woocommerce-icon.svg',
  },
  {
    icon: '📈',
    color: '#F59E0B',
    label: 'SEO & Growth',
    title: 'SEO Optimization',
    desc: 'Rank higher on Google and grow your organic traffic with data-driven strategies that deliver measurable results.',
    tags: ['On-Page SEO', 'Technical', 'Link Building'],
    href: '/images/home-service-seo-icon.svg',
  },
  {
    icon: '🎨',
    color: '#8B5CFF',
    label: 'Branding',
    title: 'Brand Identity Design',
    desc: 'Memorable brand identities — logo, colour palette, typography, and brand guidelines — that make you stand out.',
    tags: ['Logo Design', 'Guidelines', 'Social Kit'],
    href: '/images/home-service-branding-icon.svg',
  },
];

// ── PROCESS STEPS ─────────────────────────────────────────
export const PROCESS_STEPS = [
  { num: '01', icon: '🔍', title: 'Discovery',      desc: 'Understanding your goals, audience and competitive landscape.' },
  { num: '02', icon: '📋', title: 'Strategy',       desc: 'A clear roadmap and strategy aligned with your objectives.' },
  { num: '03', icon: '🎨', title: 'Design',         desc: 'Beautiful, conversion-focused UI approved before any build.' },
  { num: '04', icon: '⚡', title: 'Development',    desc: 'Clean, fast, scalable build with regular progress updates.' },
  { num: '05', icon: '🚀', title: 'Optimization',  desc: 'Speed, SEO and conversion improvements for long-term growth.' },
];

// ── ADVANTAGE POINTS ──────────────────────────────────────
export const ADVANTAGES = [
  { icon: '🏆', title: 'Proven Expertise',      desc: 'Over 10 years of delivering real results for businesses worldwide.' },
  { icon: '📊', title: 'Result-Driven',         desc: 'Every decision measured against the outcome it produces for you.' },
  { icon: '🤝', title: 'Client-Centric',        desc: 'Your goals come first — transparent at every stage, no surprises.' },
  { icon: '⏰', title: 'Reliable & On-Time',    desc: 'We set realistic timelines and stick to them. No radio silence.' },
];

// ── WHY CHOOSE US ─────────────────────────────────────────
export const WHY_CHOOSE = [
  { icon: '🎯', title: 'Conversion-Focused Design',    desc: 'Every layout is built to generate leads and sales — not just look good.' },
  { icon: '⚡', title: 'Fast Loading Websites',        desc: 'Performance optimisation is included in project we deliver.' },
  { icon: '📌', title: 'SEO-Ready Structure',          desc: 'Technical SEO fundamentals built into every page and template.' },
  { icon: '🔧', title: 'Easy To Manage Backend',       desc: 'Clients can manage their content without needing a developer.' },
];
