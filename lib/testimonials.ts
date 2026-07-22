// lib/testimonials.ts
//
// Typed access layer over the real 865-review dataset (lib/testimonials.json).
// This is the single source of truth for both the homepage carousel and the
// /reviews page — nothing here is mock data.

import raw from './testimonials.json';

export interface Testimonial {
  id: number;
  name: string;
  initial: string;
  countryEn: string;
  countryFi: string;
  /** lowercase ISO 3166-1 alpha-2 — matches flag-icons' `fi-{code}` classes */
  countryCode: string;
  rating: number;
  repeatClient: boolean;
  textEn: string;
  textFi: string | null;
}

interface RawTestimonial {
  id: number;
  name: string;
  initial: string;
  avatar_url: string | null;
  country_en: string;
  country_fi: string;
  country_code: string;
  country_flag_url: string;
  rating: number;
  repeat_client: boolean;
  review_text_en: string;
  review_text_fi: string | null;
  flag_emoji: string;
}

/*
 * Deliberately dropped fields:
 *  - avatar_url: only 423/865 rows have one, and they all point at Fiverr's
 *    Cloudinary CDN — same hotlinking risk that ruled out country_flag_url.
 *    We use the initials avatar uniformly instead, which is already the
 *    brand's visual language and never breaks.
 *  - country_flag_url / flag_emoji: replaced by the `flag-icons` package
 *    (real SVG, renders identically on every OS — see HomeTestimonials.tsx).
 */
const ALL: Testimonial[] = (raw as RawTestimonial[]).map(r => ({
  id: r.id,
  name: r.name,
  initial: r.initial,
  countryEn: r.country_en,
  countryFi: r.country_fi,
  countryCode: r.country_code.toLowerCase(),
  rating: r.rating,
  repeatClient: r.repeat_client,
  textEn: r.review_text_en,
  textFi: r.review_text_fi,
}));

export const ALL_TESTIMONIALS = ALL;

/** No Finnish review translations exist yet (review_text_fi is null on all
 *  865 rows) — falls back to the original English text rather than showing
 *  nothing. */
export function getTestimonialText(t: Testimonial, locale: string): string {
  return (locale === 'fi' && t.textFi) ? t.textFi : t.textEn;
}

export function getTestimonialCountry(t: Testimonial, locale: string): string {
  return locale === 'fi' ? t.countryFi : t.countryEn;
}

/** Hand-picked for the homepage carousel: priority markets (Nordics/EU/US/CA),
 *  a spread of ten different countries, decent review length, and one
 *  repeat-client example. Edit this array to swap featured reviews —
 *  no other code needs to change. */
const FEATURED_IDS = [345, 406, 423, 87, 9, 4, 841, 288, 336, 814];

export const FEATURED_TESTIMONIALS: Testimonial[] = FEATURED_IDS
  .map(id => ALL.find(t => t.id === id))
  .filter((t): t is Testimonial => Boolean(t));

/** Hand-picked for the /reviews page's 3D sphere: broader country spread
 *  than the homepage (24 markets), one repeat-client example. This is a
 *  deliberately curated, capped set — we never mount all 865 reviews as
 *  live 3D DOM objects at once (see ReviewsSphere.tsx). Edit this array to
 *  change which reviews appear in the sphere. */
const ORBIT_IDS = [
  345, 602, 406, 423, 87, 9, 371, 841, 288, 29, 336, 352,
  814, 820, 49, 771, 642, 4, 367, 315, 515, 361, 57, 595,
];

export const ORBIT_TESTIMONIALS: Testimonial[] = ORBIT_IDS
  .map(id => ALL.find(t => t.id === id))
  .filter((t): t is Testimonial => Boolean(t));

/** Real aggregate stats, derived from the dataset — never hand-typed. */
export const TESTIMONIAL_STATS = {
  count: ALL.length,
  countries: new Set(ALL.map(t => t.countryCode)).size,
  // floored to 1 decimal so we never display a rating higher than the
  // true average (true avg is currently ~4.97)
  avgRating: Math.floor(
    (ALL.reduce((sum, t) => sum + t.rating, 0) / ALL.length) * 10
  ) / 10,
};

export function getPaginatedTestimonials(page: number, perPage = 24) {
  const start = (page - 1) * perPage;
  return {
    items: ALL_TESTIMONIALS.slice(start, start + perPage),
    totalPages: Math.ceil(ALL_TESTIMONIALS.length / perPage),
    total: ALL_TESTIMONIALS.length,
  };
}
