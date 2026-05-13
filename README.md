# Reicodev — Headless WordPress Frontend
### Next.js 14 App Router · TypeScript · CSS Modules · Dark/Light Theme

---

## 🗂️ Pages Included

| Page | Route | Status |
|------|-------|--------|
| Home | `/` | ✅ 10 sections |
| About | `/about` | ✅ 7 sections |
| Services | `/services` | ✅ 6 sections |
| Our Work | `/our-work` | ✅ Filterable portfolio |
| WordPress Projects | `/our-work/wordpress-projects` | ✅ Category page |
| WooCommerce Projects | `/our-work/woocommerce-projects` | ✅ Category page |
| Shopify Projects | `/our-work/shopify-projects` | ✅ Category page |
| SEO Projects | `/our-work/seo-projects` | ✅ Category page |
| Branding Projects | `/our-work/branding-projects` | ✅ Category page |
| Safari World Tours | `/our-work/safari-world-tours` | ✅ Full case study |
| ClearConnect TV | `/our-work/clearconnect-tv` | ✅ Full case study |
| AsalSports | `/our-work/asal-sports` | ✅ Full case study |
| Jamaican Products | `/our-work/jamaican-products` | ✅ Full case study |
| Blissful Kava | `/our-work/blissful-kava` | ✅ Full case study |
| Half Price Packaging (SEO) | `/our-work/half-price-packaging-seo` | ✅ Full case study |
| Safari Brand | `/our-work/branding-safari` | ✅ Full case study |
| ElevatedYou Brand | `/our-work/branding-elevatedyou` | ✅ Full case study |
| Contact | `/contact` | ✅ Form + FAQ |
| Get a Quote | `/get-a-quote` | ✅ 3-step form |

---

## 🚀 Quick Start

### 1. Install

```bash
cd reicodev-v2
npm install
```

### 2. Set environment variables

```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### 3. Run

```bash
npm run dev        # development → http://localhost:3000
npm run build      # production build
npm run start      # start production server
```

---

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_WP_URL` | WordPress backend URL (no trailing slash) | Yes |
| `CF7_FORM_ID` | Contact Form 7 form ID (find in WP Admin) | For contact form |
| `REVALIDATE_SECRET` | Secret for WP webhook revalidation | For live sync |
| `NEXT_PUBLIC_SITE_URL` | Your site URL for sitemap | For sitemap |

---

## 📸 Adding Your Photos

### Founder Photo (About page)

The About page has an image element with `src="#"` and `data-acf-key="founder_photo"`.

**To add your photo:**

**Option A — Static file (quickest):**
1. Put your photo at `/public/images/bilal.jpg`
2. In `components/sections/about/AboutHero.tsx`, replace:
   ```tsx
   <img src="#" alt="Bilal Hussain…" …/>
   ```
   with:
   ```tsx
   import Image from 'next/image';
   <Image src="/images/bilal.jpg" alt="Bilal Hussain — Reicodev" fill style={{ objectFit:'cover', objectPosition:'top' }} />
   ```

**Option B — WordPress ACF (recommended for CMS control):**
1. In WordPress → Custom Fields, create an Image field:
   - Field Label: Founder Photo
   - Field Name: `founder_photo`
   - Return Value: Image URL
   - Assign to: Options page (or About page)
2. Fetch it in `lib/wordpress.ts` and pass the URL to the component.

---

### Project Screenshots

Every project card and project detail page has a screenshot placeholder with a unique ACF key.

**ACF keys follow this pattern:**
```
project_{slug}_screenshot     → for card thumbnail
project_{slug}_hero           → for detail page hero image
project_{slug}_gallery_1      → for gallery images
```

**Example for Safari World Tours:**
- Thumbnail: `project_safari-world-tours_screenshot`
- Hero: `project_safari-world-tours_hero`
- Gallery: `project_safari-world-tours_gallery_1`, `_gallery_2`, `_gallery_3`

**To add screenshots:**
1. In WordPress → Custom Fields, create an Image field with each key.
2. Update the individual project page files in `app/our-work/[slug]/page.tsx`.
3. Pass the image URL to `<PlaceholderImage>` or replace with `<Image>`.

---

## 🎨 Theme & Design

### Dark / Light Toggle
- Theme toggle button is fixed bottom-right (☀️/🌙).
- Preference saved to `localStorage` as `rdv-theme`.
- Default: dark mode.
- All colours reference CSS variables from `app/globals.css`.

### Design System (globals.css)
```css
--c-p1      → Brand purple  #6C4BFF
--c-p2      → Purple light  #8B5CFF
--c-green   → Green         #10B981
--c-amber   → Amber         #F59E0B
--c-cyan    → Cyan          #5EE9FF
--c-bg      → Dark bg       #0B1020
--c-txt     → Text          #E2E8F0
--c-muted   → Muted text    #94A3B8
--font      → Plus Jakarta Sans
```

### Global Utility Classes
```
.btn             → base button
.btn-primary     → purple filled button
.btn-ghost       → transparent outlined button
.btn-lg / .btn-sm
.pill            → badge/chip with dot
.eyebrow         → small label text
.sec-title       → section heading
.sec-accent      → purple gradient text
.stat-strip      → 4-column stats grid
.tag             → tag chip
.tag-purple/cyan/green/amber/dim
.form-input      → styled input/select/textarea
.reveal          → scroll animation (add .in to show)
.from-left       → slide from left on reveal
.from-right      → slide from right on reveal
```

---

## 🔌 WordPress Connection

### REST API (lib/wordpress.ts)

The file includes functions for:
- `getPage(slug)` — fetch page data by slug
- `getAcfFields(postId)` — fetch ACF fields for a page/post
- `getPosts(params)` — fetch blog posts
- `getPost(slug)` — fetch single post

### Contact Form 7 Integration

1. Install **Contact Form 7** + **Contact Form 7 REST API** plugin in WordPress
2. Create a form and note its **ID** (e.g. `123`)
3. Set `CF7_FORM_ID=123` in `.env.local`
4. The API route at `/api/contact` will forward form submissions to CF7

CF7 form tag names expected:
```
your-name, your-email, your-phone, your-service,
your-budget, your-timeline, your-website, your-message
```

### Revalidation (WP Webhooks)

1. Install **WP Webhooks** plugin
2. Set up a webhook trigger: `save_post`, `acf/save_post`
3. Webhook URL: `https://reicodev.com/api/revalidate`
4. Add header: `x-revalidate-secret: your-secret`
5. Set same secret in `.env.local` as `REVALIDATE_SECRET`

---

## 📈 SEO

### Built-in (Next.js Metadata API)
Every page has:
- `<title>` and `<meta name="description">`
- Open Graph tags
- Canonical URLs (via `NEXT_PUBLIC_SITE_URL`)

### Recommended: Rank Math SEO (WordPress)
Rank Math is the recommended WordPress SEO plugin. It will manage:
- XML sitemap (sitemaps.xml)
- robots.txt
- Schema markup (LocalBusiness, Person, Service, FAQ, BreadcrumbList)
- Open Graph for WordPress-sourced content

**Connect Rank Math REST API** to pull SEO meta for dynamic content:
```
GET /wp-json/rankmath/v1/getHead?url={page-url}
```

### Local Business Schema (add to layout.tsx)
```tsx
<script type="application/ld+json">{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Reicodev",
  "description": "WordPress, WooCommerce, Shopify, SEO & Branding",
  "url": "https://reicodev.com",
  "founder": { "@type": "Person", "name": "Bilal Hussain" },
  "areaServed": "Worldwide",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "879" }
})}</script>
```

---

## 💬 WhatsApp Chat Button

1. Install **WP Social Chat** (formerly WhatsApp Chat) plugin in WordPress.
2. Set your WhatsApp number in the plugin settings.
3. The plugin injects the button automatically — no code changes needed.

**Alternative — manual button (add to layout.tsx):**
```tsx
<a
  href="https://wa.me/YOUR_NUMBER"
  target="_blank"
  rel="noopener noreferrer"
  style={{
    position:'fixed', bottom:24, right:24, zIndex:999,
    background:'#25D366', color:'#fff', borderRadius:'50%',
    width:56, height:56, display:'flex', alignItems:'center', justifyContent:'center',
    boxShadow:'0 4px 20px rgba(0,0,0,0.3)', fontSize:26,
  }}
  aria-label="Chat on WhatsApp"
>
  💬
</a>
```
Replace `YOUR_NUMBER` with country code + number (e.g. `358401234567` for Finland).

---

## 📦 Deploy to Production

### Recommended: Vercel

```bash
npm install -g vercel
vercel
```

Set env vars in Vercel dashboard → Project → Settings → Environment Variables.

### Self-hosted

```bash
npm run build
npm run start   # port 3000, put Nginx in front
```

---

## 📂 Project Structure

```
reicodev-v2/
├── app/
│   ├── page.tsx              → Home
│   ├── about/page.tsx        → About
│   ├── services/page.tsx     → Services
│   ├── contact/              → Contact page + CSS + client
│   ├── get-a-quote/          → Quote page + CSS + client
│   ├── our-work/
│   │   ├── page.tsx          → Portfolio hub
│   │   ├── wordpress-projects/page.tsx
│   │   ├── woocommerce-projects/page.tsx
│   │   ├── shopify-projects/page.tsx
│   │   ├── seo-projects/page.tsx
│   │   ├── branding-projects/page.tsx
│   │   ├── safari-world-tours/page.tsx
│   │   ├── clearconnect-tv/page.tsx
│   │   ├── asal-sports/page.tsx
│   │   ├── jamaican-products/page.tsx
│   │   ├── blissful-kava/page.tsx
│   │   ├── half-price-packaging-seo/page.tsx
│   │   ├── branding-safari/page.tsx
│   │   └── branding-elevatedyou/page.tsx
│   ├── api/
│   │   ├── contact/route.ts  → CF7 proxy
│   │   └── revalidate/route.ts → WP webhook
│   ├── globals.css           → Design system (single source of truth)
│   └── layout.tsx            → Root layout
├── components/
│   ├── ThemeProvider.tsx
│   ├── layout/
│   │   ├── Navbar.tsx + .module.css
│   │   └── Footer.tsx + .module.css
│   ├── ui/
│   │   ├── PlaceholderImage.tsx + .module.css
│   │   └── ThemeToggle.tsx
│   └── sections/
│       ├── home/             → HomeHero, HomeStats, HomeServices, …
│       ├── about/            → AboutHero, AboutJourney, …
│       ├── services/         → ServicesHero, ServicesGrid, …
│       ├── ourwork/          → OurWorkPage + CSS
│       ├── category/         → CategoryPage + CSS
│       └── project/          → ProjectPage + CSS
├── lib/
│   ├── data.ts               → All site data (stats, projects, etc.)
│   └── wordpress.ts          → WP REST API helpers
├── .env.example              → Copy to .env.local
├── next.config.js
├── package.json
└── tsconfig.json
```

---

## 📞 Support

Built by: **Bilal Hussain — Reicodev**  
Email: bilal@reicodev.com  
Fiverr: fiverr.com/reicodev
