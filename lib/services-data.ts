// lib/services-data.ts
// Drop into: lib/services-data.ts
// Content source for the 5 dynamic service pages at app/[locale]/services/[slug]/page.tsx
// Icons referenced by name below map to lucide-react components inside ServicesPageClient.tsx

export type ServiceSlug =
  | "wordpress-development"
  | "woocommerce-development"
  | "shopify-development"
  | "branding-design"
  | "seo-services";

export interface ServiceDeliverable {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface ServiceFAQItem {
  question: string;
  answer: string;
}

export interface ServiceCaseStudyRef {
  title: string;
  tag: string;
  href: string; // adjust to the real /our-work/[slug] route once verified
  imageAlt: string;
  imageSrc: string; // drop a real screenshot at this path later
}

export interface ServiceContent {
  slug: ServiceSlug;
  signatureType: "terminal" | "swatch";
  terminalCommand?: string;
  terminalOutput?: string[];
  eyebrow: string;
  h1: string;
  subhead: string;
  heroStats: { value: string; label: string }[];
  metaTitle: string;
  metaDescription: string;
  includedIntro: string;
  deliverables: ServiceDeliverable[];
  stack: string[];
  process: ServiceProcessStep[];
  caseStudies: ServiceCaseStudyRef[];
  faqs: ServiceFAQItem[];
  ctaHeadline: string;
  ctaSubhead: string;
}

export const SERVICES: Record<ServiceSlug, ServiceContent> = {
  "wordpress-development": {
    slug: "wordpress-development",
    signatureType: "terminal",
    terminalCommand: "wp scaffold post-type case_study --label='Case Studies'",
    terminalOutput: [
      "Generating post type files...",
      "Registering custom fields via ACF...",
      "Done. 0 conflicts, 0 deprecated hooks.",
    ],
    eyebrow: "WordPress Development",
    h1: "WordPress builds that hold up after handoff",
    subhead:
      "Custom themes, clean plugin architecture, and page-builder setups your team can actually edit without breaking the layout six months from now.",
    heroStats: [
      { value: "40+", label: "WordPress builds shipped" },
      { value: "<2.5s", label: "Typical LCP after launch" },
      { value: "0", label: "Plugin conflicts we leave behind" },
    ],
    metaTitle: "WordPress Development Services | Reicode",
    metaDescription:
      "Custom WordPress theme development, Elementor and ACF builds, migrations, and ongoing maintenance from a team that documents what it ships.",
    includedIntro:
      "Every WordPress project starts with an audit of what's already there, not a template dropped on top of it.",
    deliverables: [
      {
        icon: "Code2",
        title: "Custom theme development",
        description:
          "Hand-built themes when a page builder would slow the site down, with clean, documented template files.",
      },
      {
        icon: "Layers",
        title: "Elementor & ACF builds",
        description:
          "Flexible page-builder setups with custom fields your team can update without touching code.",
      },
      {
        icon: "RefreshCw",
        title: "Migrations, zero downtime",
        description:
          "Moving off Wix, Squarespace, or an aging WordPress install without losing rankings or content.",
      },
      {
        icon: "Puzzle",
        title: "Plugin conflict resolution",
        description:
          "Tracing down the plugin that's breaking checkout, slowing queries, or fighting your theme.",
      },
      {
        icon: "Gauge",
        title: "Performance optimization",
        description:
          "Image pipelines, caching, and query cleanup aimed at Core Web Vitals, not just a Lighthouse score.",
      },
      {
        icon: "ShieldCheck",
        title: "Maintenance retainers",
        description:
          "Monthly updates, backups, and security monitoring so the site stays yours to worry about less.",
      },
    ],
    stack: [
      "WordPress",
      "Elementor Pro",
      "ACF Pro",
      "WooCommerce",
      "WP Engine",
      "Cloudways",
      "Query Monitor",
      "PageSpeed Insights",
    ],
    process: [
      {
        title: "Audit & scope",
        description:
          "We review your current site (or brief) and flag what's structural versus cosmetic before quoting anything.",
      },
      {
        title: "Build in staging",
        description:
          "Theme, fields, and content structure get built on a staging environment you can watch take shape.",
      },
      {
        title: "Content & QA pass",
        description:
          "Real content goes in, then we test across devices, browsers, and form submissions before sign-off.",
      },
      {
        title: "Launch",
        description:
          "DNS, redirects, and analytics get handled on launch day so nothing breaks in the switch.",
      },
      {
        title: "Support window",
        description:
          "A 30-day buffer after launch to catch anything real usage turns up that staging didn't.",
      },
    ],
    caseStudies: [
      {
        title: "Safari World Tours",
        tag: "WordPress · Travel",
        href: "/our-work/safari-world-tours",
        imageAlt: "Safari World Tours website preview",
        imageSrc: "/images/services/case-safari-world-tours.jpg",
      },
      {
        title: "Half Price Packaging",
        tag: "WordPress · SEO",
        href: "/our-work/half-price-packaging-seo",
        imageAlt: "Half Price Packaging website preview",
        imageSrc: "/images/services/case-half-price-packaging.jpg",
      },
      {
        title: "Blissful Kava",
        tag: "WordPress · eCommerce",
        href: "/our-work/blissful-kava",
        imageAlt: "Blissful Kava website preview",
        imageSrc: "/images/services/case-blissful-kava.jpg",
      },
    ],
    faqs: [
      {
        question: "Do you build with a page builder or custom code?",
        answer:
          "Whichever the project actually needs. Marketing-heavy sites your team will edit often do well on Elementor with ACF. Performance-critical or highly custom layouts get hand-built themes. We'll tell you which one before we quote.",
      },
      {
        question: "Can you migrate my existing site without losing rankings?",
        answer:
          "Yes. We map every existing URL to its new destination, carry over metadata, and keep the old site live until the new one is verified in Search Console.",
      },
      {
        question: "What if my site is already built and just needs fixes?",
        answer:
          "That's most of our WordPress work. Send us admin access and a list of what's wrong; we'll come back with a scoped fix list before touching anything live.",
      },
      {
        question: "Do you offer ongoing maintenance after launch?",
        answer:
          "Yes, as a monthly retainer covering core and plugin updates, backups, and uptime monitoring. It's optional, not bundled into every project.",
      },
      {
        question: "How long does a typical WordPress build take?",
        answer:
          "Content-driven marketing sites: 2-4 weeks. Custom-themed builds with bespoke functionality: 4-8 weeks depending on scope and how fast content comes in from your side.",
      },
    ],
    ctaHeadline: "Have a WordPress site that needs to work harder?",
    ctaSubhead: "Tell us what it's doing wrong. We'll tell you what it'd take to fix.",
  },

  "woocommerce-development": {
    slug: "woocommerce-development",
    signatureType: "terminal",
    terminalCommand: "wp wc shipping_zone create --name='EU Express'",
    terminalOutput: [
      "Creating shipping zone...",
      "Attaching flat-rate + free-shipping methods...",
      "Zone active for 27 countries.",
    ],
    eyebrow: "WooCommerce Development",
    h1: "WooCommerce stores built for the order volume you're growing into",
    subhead:
      "Custom checkout flows, shipping logic that matches how you actually ship, and catalogs that stay fast past a thousand SKUs.",
    heroStats: [
      { value: "25+", label: "WooCommerce stores launched" },
      { value: "6", label: "Payment gateways integrated" },
      { value: "1,000+", label: "SKU catalogs handled" },
    ],
    metaTitle: "WooCommerce Development Services | Reicode",
    metaDescription:
      "Custom WooCommerce builds covering checkout, shipping logic, subscriptions, multi-currency, and performance for growing catalogs.",
    includedIntro:
      "Most WooCommerce problems aren't the platform, they're shipping rules and plugins fighting each other at checkout.",
    deliverables: [
      {
        icon: "ShoppingCart",
        title: "Custom checkout & cart flows",
        description:
          "Streamlined checkout with the fields, upsells, and trust signals your conversion data actually supports.",
      },
      {
        icon: "Truck",
        title: "Flexible shipping logic",
        description:
          "Table rates, zones, and carrier-calculated shipping set up to match your real fulfillment process.",
      },
      {
        icon: "RefreshCw",
        title: "Subscriptions & recurring billing",
        description:
          "Recurring products, membership tiers, and dunning flows for failed payments handled properly.",
      },
      {
        icon: "Globe",
        title: "Multi-currency & multi-region",
        description:
          "Regional pricing and currency switching for stores selling across borders.",
      },
      {
        icon: "CreditCard",
        title: "Payment gateway integration",
        description:
          "Stripe, PayPal, and regional gateways wired in and tested against real failure cases, not just the happy path.",
      },
      {
        icon: "Gauge",
        title: "Catalog performance tuning",
        description:
          "Query and image optimization so category pages stay fast as your SKU count climbs.",
      },
    ],
    stack: [
      "WooCommerce",
      "WordPress",
      "WooCommerce Subscriptions",
      "Stripe",
      "PayPal",
      "Table Rate Shipping",
      "Elementor",
      "Query Monitor",
    ],
    process: [
      {
        title: "Map the fulfillment logic",
        description:
          "Shipping zones, tax rules, and payment methods get defined before any theme work starts.",
      },
      {
        title: "Build the store",
        description:
          "Theme, product structure, and checkout get built in staging against real product data.",
      },
      {
        title: "Test transactions",
        description:
          "Every payment method and shipping rule gets tested with real test transactions, not just a preview mode.",
      },
      {
        title: "Launch",
        description:
          "We go live during a low-traffic window and watch the first orders come through in real time.",
      },
      {
        title: "Support window",
        description:
          "30 days post-launch to handle whatever real customers surface that testing didn't.",
      },
    ],
    caseStudies: [
      {
        title: "Asal Sports",
        tag: "WooCommerce · Sporting Goods",
        href: "/our-work/asal-sports",
        imageAlt: "Asal Sports website preview",
        imageSrc: "/images/services/case-asal-sports.jpg",
      },
      {
        title: "Blissful Kava",
        tag: "WooCommerce · Food & Beverage",
        href: "/our-work/blissful-kava",
        imageAlt: "Blissful Kava website preview",
        imageSrc: "/images/services/case-blissful-kava.jpg",
      },
      {
        title: "Half Price Packaging",
        tag: "WooCommerce · B2B",
        href: "/our-work/half-price-packaging-seo",
        imageAlt: "Half Price Packaging website preview",
        imageSrc: "/images/services/case-half-price-packaging.jpg",
      },
    ],
    faqs: [
      {
        question: "Can you fix shipping rates that are calculating wrong?",
        answer:
          "This is one of the most common fixes we get called in for. Send us a few example orders that priced incorrectly and we'll trace it to the zone, class, or plugin conflict causing it.",
      },
      {
        question: "Do you handle subscriptions and recurring billing?",
        answer:
          "Yes, including failed-payment retry logic and dunning emails, which is where most subscription setups fall short.",
      },
      {
        question: "Can WooCommerce handle a catalog our size?",
        answer:
          "Yes, with the right hosting and query optimization. We've handled catalogs past 1,000 SKUs without category pages slowing down; it comes down to how the store is built, not the platform's ceiling.",
      },
      {
        question: "Do you integrate with our existing ERP or inventory system?",
        answer:
          "Often, yes, depending on the system. Tell us what you're running and we'll confirm feasibility before scoping.",
      },
      {
        question: "How long does a WooCommerce build take?",
        answer:
          "4-8 weeks for most stores, depending on catalog size, payment/shipping complexity, and how quickly product data is ready.",
      },
    ],
    ctaHeadline: "Checkout losing orders it shouldn't be?",
    ctaSubhead: "Send us your store. We'll tell you what's actually costing you sales.",
  },

  "shopify-development": {
    slug: "shopify-development",
    signatureType: "terminal",
    terminalCommand: "shopify theme dev --store=your-store.myshopify.com",
    terminalOutput: [
      "Connecting to store...",
      "Watching for local file changes...",
      "Preview server running at localhost:9292",
    ],
    eyebrow: "Shopify Development",
    h1: "Shopify builds for brands that outgrew a template",
    subhead:
      "Custom Liquid themes, checkout customization, and app integrations that don't slow the storefront down to load.",
    heroStats: [
      { value: "18+", label: "Shopify stores built" },
      { value: "<2s", label: "Typical storefront load time" },
      { value: "12+", label: "App integrations shipped" },
    ],
    metaTitle: "Shopify Development Services | Reicode",
    metaDescription:
      "Custom Shopify theme development, app integrations, checkout customization, and platform migrations for growing DTC brands.",
    includedIntro:
      "A theme-store template gets you live fast. It rarely survives contact with a real growth plan.",
    deliverables: [
      {
        icon: "Palette",
        title: "Custom Liquid theme development",
        description:
          "Hand-coded sections and templates built around your brand, not a modified theme-store starting point.",
      },
      {
        icon: "Blocks",
        title: "App integrations",
        description:
          "Klaviyo, loyalty, reviews, and subscription apps wired in without bloating page weight.",
      },
      {
        icon: "CreditCard",
        title: "Checkout customization",
        description:
          "Checkout Extensibility work within what Shopify Plus and standard checkout allow.",
      },
      {
        icon: "RefreshCw",
        title: "Platform migrations",
        description:
          "Moving from WooCommerce, Squarespace, or Magento to Shopify without losing product data or SEO equity.",
      },
      {
        icon: "Globe",
        title: "Multi-currency & markets",
        description:
          "Shopify Markets setup for regional pricing, currency, and localized storefronts.",
      },
      {
        icon: "Gauge",
        title: "Storefront performance",
        description:
          "Image and script optimization aimed at Shopify's own speed benchmarks, not just Lighthouse.",
      },
    ],
    stack: [
      "Shopify Liquid",
      "Shopify CLI",
      "Shopify Plus",
      "Hydrogen",
      "Klaviyo",
      "Checkout Extensibility",
      "Shopify Markets",
    ],
    process: [
      {
        title: "Discovery & theme architecture",
        description:
          "We plan sections and templates around your merchandising needs before writing any Liquid.",
      },
      {
        title: "Build in a development store",
        description:
          "Theme and app integrations get built and previewed in a private Shopify dev store.",
      },
      {
        title: "Content & QA",
        description:
          "Products, collections, and checkout paths get tested end to end, including on mobile.",
      },
      {
        title: "Launch",
        description:
          "Domain cutover and app go-live handled together so nothing lapses mid-switch.",
      },
      {
        title: "Support window",
        description:
          "30 days post-launch to tune anything real traffic and orders reveal.",
      },
    ],
    caseStudies: [
      {
        title: "Custom Wheel Offset",
        tag: "Shopify · Automotive",
        href: "/our-work/shopify-projects",
        imageAlt: "Custom Wheel Offset website preview",
        imageSrc: "/images/services/case-custom-wheel-offset.jpg",
      },
      {
        title: "Toys UAE",
        tag: "Shopify · Retail",
        href: "/our-work/shopify-projects",
        imageAlt: "Toys UAE website preview",
        imageSrc: "/images/services/case-toys-uae.jpg",
      },
      {
        title: "Sipsentials",
        tag: "Shopify · Food & Beverage",
        href: "/our-work/shopify-projects",
        imageAlt: "Sipsentials website preview",
        imageSrc: "/images/services/case-sipsentials.jpg",
      },
    ],
    faqs: [
      {
        question: "Do you work with Shopify Plus?",
        answer:
          "Yes, including Checkout Extensibility customization and script migration for stores that moved off Plus's legacy checkout.liquid.",
      },
      {
        question: "Can you migrate our store from WooCommerce or Magento?",
        answer:
          "Yes. We migrate products, customer data, and order history, and rebuild redirects so existing SEO rankings carry over.",
      },
      {
        question: "Will a custom theme slow down our app installs?",
        answer:
          "It's usually the opposite. Most Shopify speed problems come from unmanaged app scripts, not the theme. We audit every app's performance cost before it goes live.",
      },
      {
        question: "Do you build on Hydrogen or standard Liquid themes?",
        answer:
          "Standard Liquid for most stores, since it's faster to ship and easier for your team to maintain. Hydrogen only when a fully custom storefront actually calls for it.",
      },
      {
        question: "How long does a Shopify build take?",
        answer:
          "3-6 weeks for most stores, longer for Plus stores with deep checkout customization or complex app ecosystems.",
      },
    ],
    ctaHeadline: "Outgrowing your current Shopify theme?",
    ctaSubhead: "Tell us what's slowing the storefront down. We'll scope a fix.",
  },

  "branding-design": {
    slug: "branding-design",
    signatureType: "swatch",
    eyebrow: "Branding & Design",
    h1: "Brand identities built to survive contact with a real website",
    subhead:
      "Logo, color, and type systems designed alongside the site that has to carry them, not handed off as a PDF and hoped for the best.",
    heroStats: [
      { value: "30+", label: "Brand identities designed" },
      { value: "100%", label: "Delivered with web-ready systems" },
      { value: "5+", label: "Industries covered" },
    ],
    metaTitle: "Branding & Design Services | Reicode",
    metaDescription:
      "Logo design, visual identity systems, and brand guidelines built to translate directly into a real website, not just a PDF deck.",
    includedIntro:
      "A logo that only works on a business card isn't a brand system. Ours are built to hold up on a real screen.",
    deliverables: [
      {
        icon: "PenTool",
        title: "Logo & visual identity",
        description:
          "Primary and secondary marks, built with the web, print, and social in mind from the first sketch.",
      },
      {
        icon: "Palette",
        title: "Color & type systems",
        description:
          "A defined palette and type scale that translates directly into CSS variables for your site.",
      },
      {
        icon: "BookOpen",
        title: "Brand guidelines",
        description:
          "A reference document your team and future vendors can actually follow without guessing.",
      },
      {
        icon: "Package",
        title: "Packaging & social kits",
        description:
          "Templated assets for packaging, social profiles, and ad creative that stay on-brand without a redesign each time.",
      },
      {
        icon: "MonitorSmartphone",
        title: "Web-ready design system",
        description:
          "Components and tokens handed off in a format your developer, or ours, can build from directly.",
      },
      {
        icon: "FileStack",
        title: "Figma handoff",
        description:
          "Organized, commented Figma files, not a flattened export you can't edit six months later.",
      },
    ],
    stack: ["Figma", "Adobe Illustrator", "Adobe Photoshop", "Design Tokens", "Elementor"],
    process: [
      {
        title: "Discovery",
        description:
          "We learn the business, the audience, and what the current brand (if any) is failing to communicate.",
      },
      {
        title: "Direction & concepts",
        description:
          "Two to three distinct directions, not ten diluted ones, presented with real-world mockups.",
      },
      {
        title: "Refinement",
        description:
          "The chosen direction gets refined against your feedback until it's ready to build on.",
      },
      {
        title: "System build-out",
        description:
          "Full guidelines, color and type tokens, and templated assets get finalized and documented.",
      },
      {
        title: "Handoff",
        description:
          "Organized files and a walkthrough call so your team knows exactly how to use what we built.",
      },
    ],
    caseStudies: [
      {
        title: "Bluerock24",
        tag: "Branding · Corporate",
        href: "/our-work/branding-projects",
        imageAlt: "Bluerock24 brand identity preview",
        imageSrc: "/images/services/case-bluerock24.jpg",
      },
      {
        title: "Netfarver",
        tag: "Branding · eCommerce",
        href: "/our-work/branding-projects",
        imageAlt: "Netfarver brand identity preview",
        imageSrc: "/images/services/case-netfarver.jpg",
      },
      {
        title: "Occhio House",
        tag: "Branding · Lifestyle",
        href: "/our-work/branding-projects",
        imageAlt: "Occhio House brand identity preview",
        imageSrc: "/images/services/case-occhio-house.jpg",
      },
    ],
    faqs: [
      {
        question: "Do you design logos only, or full brand systems?",
        answer:
          "Full systems by default: logo, color, type, and usage guidelines. A logo on its own rarely solves the problem that brought someone to us.",
      },
      {
        question: "Can you rebrand an existing business without starting over?",
        answer:
          "Yes. Most of our branding work is refinement, not a ground-up rebuild. We keep whatever equity your current mark already has and fix what's not working.",
      },
      {
        question: "Do you also build the website that uses the new brand?",
        answer:
          "We can, and it's often the better outcome since the system gets built knowing exactly how it'll be used on-screen. It's not required though; we hand off web-ready files either way.",
      },
      {
        question: "How many logo concepts do we get to choose from?",
        answer:
          "Two to three genuinely distinct directions, not ten minor variations of one idea. We'd rather you choose between real options.",
      },
      {
        question: "How long does a branding project take?",
        answer:
          "2-4 weeks for a full identity system, depending on revision rounds and how quickly feedback comes back.",
      },
    ],
    ctaHeadline: "Brand not matching where the business is headed?",
    ctaSubhead: "Show us what you've got. We'll tell you what's worth keeping.",
  },

  "seo-services": {
    slug: "seo-services",
    signatureType: "terminal",
    terminalCommand: "curl -I https://yoursite.com | grep -i cache-control",
    terminalOutput: [
      "HTTP/2 200",
      "cache-control: public, max-age=31536000",
      "Schema markup: valid (0 errors)",
    ],
    eyebrow: "SEO Services",
    h1: "SEO that's built into the site, not bolted on after",
    subhead:
      "Technical fixes, schema markup, and content structure aimed at rankings that hold, not a report full of green checkmarks nobody acts on.",
    heroStats: [
      { value: "50+", label: "Technical SEO audits run" },
      { value: "100%", label: "Sites with schema implemented" },
      { value: "90+", label: "Typical Core Web Vitals score" },
    ],
    metaTitle: "SEO Services | Technical & On-Page SEO | Reicode",
    metaDescription:
      "Technical SEO audits, schema markup, Core Web Vitals fixes, and on-page optimization built directly into the site, not a bolt-on report.",
    includedIntro:
      "Most SEO reports list what's wrong. We're the ones who also fix it, because we built the site it's wrong on.",
    deliverables: [
      {
        icon: "FileSearch",
        title: "Technical SEO audits",
        description:
          "Crawl errors, indexation issues, and structural problems, prioritized by what's actually costing you rankings.",
      },
      {
        icon: "Braces",
        title: "Schema markup implementation",
        description:
          "LocalBusiness, Product, FAQPage, and Review schema implemented and validated, not just recommended.",
      },
      {
        icon: "Gauge",
        title: "Core Web Vitals fixes",
        description:
          "Real fixes to LCP, CLS, and INP at the code level, since we're the ones who can touch it.",
      },
      {
        icon: "TrendingUp",
        title: "On-page optimization",
        description:
          "Title tags, headings, and internal linking structured around how people actually search.",
      },
      {
        icon: "MapPin",
        title: "Local SEO",
        description:
          "Google Business Profile optimization and local schema for service-area and multi-location businesses.",
      },
      {
        icon: "PenTool",
        title: "Content & keyword strategy",
        description:
          "A content plan built around search intent and what your site can realistically compete for.",
      },
    ],
    stack: [
      "Google Search Console",
      "Screaming Frog",
      "Schema.org",
      "PageSpeed Insights",
      "Google Analytics 4",
      "Ahrefs",
    ],
    process: [
      {
        title: "Full technical audit",
        description:
          "Crawl, indexation, and Core Web Vitals data pulled and prioritized by ranking impact.",
      },
      {
        title: "Fix plan",
        description:
          "A scoped list of what gets fixed first, and why, before any work starts.",
      },
      {
        title: "Implementation",
        description:
          "Fixes go directly into the codebase since we build the sites we audit, not just report on them.",
      },
      {
        title: "Schema & content pass",
        description:
          "Structured data and on-page content updates go live and get validated against Google's own tools.",
      },
      {
        title: "Monitoring",
        description:
          "Rankings and Core Web Vitals tracked post-launch so we know what's actually moving.",
      },
    ],
    caseStudies: [
      {
        title: "Half Price Packaging",
        tag: "SEO · B2B",
        href: "/our-work/half-price-packaging-seo",
        imageAlt: "Half Price Packaging SEO case study preview",
        imageSrc: "/images/services/case-half-price-packaging.jpg",
      },
      {
        title: "American Mascot",
        tag: "SEO · eCommerce",
        href: "/our-work/seo-projects",
        imageAlt: "American Mascot SEO case study preview",
        imageSrc: "/images/services/case-american-mascot.jpg",
      },
      {
        title: "Low Cost Wheels",
        tag: "SEO · Automotive",
        href: "/our-work/seo-projects",
        imageAlt: "Low Cost Wheels SEO case study preview",
        imageSrc: "/images/services/case-low-cost-wheels.jpg",
      },
    ],
    faqs: [
      {
        question: "Do you only work on sites you built?",
        answer:
          "No, we take on SEO for existing sites on any platform. We just can't promise the same turnaround on fixes if we don't have direct code access.",
      },
      {
        question: "How long until we see ranking movement?",
        answer:
          "Technical fixes (speed, indexation) can show up in weeks. Competitive keyword rankings realistically take 3-6 months, and we'll say so upfront instead of promising faster.",
      },
      {
        question: "Do you guarantee first-page rankings?",
        answer:
          "No, and any agency that does isn't being straight with you. We commit to the technical and content work being done right, which is what actually drives rankings.",
      },
      {
        question: "Is this a one-time audit or ongoing work?",
        answer:
          "Both are available. A one-time audit gets you a prioritized fix list; ongoing retainers cover implementation, content, and monthly reporting.",
      },
      {
        question: "Do you write the content too, or just structure it?",
        answer:
          "We handle both, or just the technical/structural side if you've already got a content team in place.",
      },
    ],
    ctaHeadline: "Ranking lower than a site this good should?",
    ctaSubhead: "Send us the URL. We'll tell you what's actually holding it back.",
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICES) as ServiceSlug[];

export function getServiceContent(slug: string): ServiceContent | undefined {
  return SERVICES[slug as ServiceSlug];
}
