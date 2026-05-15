import { MetadataRoute } from 'next';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://reicodev.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [

    // ── Core pages ───────────────────────────────────────────────
    { url: BASE,                  lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/about`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/services`,    lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/our-work`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE}/contact`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/get-a-quote`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },

    // ── Category pages ───────────────────────────────────────────
    { url: `${BASE}/our-work/wordpress-projects`,   lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/our-work/woocommerce-projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/our-work/shopify-projects`,     lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/our-work/seo-projects`,         lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/our-work/branding-projects`,    lastModified: now, changeFrequency: 'weekly', priority: 0.7 },

    // ── Legal pages ──────────────────────────────────────────────
    { url: `${BASE}/privacy-policy`,   lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/cookie-policy`,    lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms-of-service`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },

    // ── Project detail pages ──────────────────────────────────────
    // None active yet. When a project page is ready, add its URL here.
  ];
}
