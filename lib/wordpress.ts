// lib/wordpress.ts — All WordPress REST API functions

const WP_URL = process.env.NEXT_PUBLIC_WP_URL || 'http://localhost/reicodev-cms';

function authHeader(): HeadersInit {
  const u = process.env.WP_APP_USERNAME;
  const p = process.env.WP_APP_PASSWORD;
  if (!u || !p) return {};
  return { Authorization: `Basic ${Buffer.from(`${u}:${p}`).toString('base64')}` };
}

async function wpFetch<T>(path: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(`${WP_URL}/wp-json${path}`, {
    next: { revalidate: 60 },
    ...opts,
    headers: { 'Content-Type': 'application/json', ...authHeader(), ...opts?.headers },
  });
  if (!res.ok) throw new Error(`WP API ${res.status} — ${path}`);
  return res.json();
}

export interface WPPage {
  id: number; slug: string;
  title: { rendered: string };
  content: { rendered: string };
  acf?: Record<string, string | number | boolean | null>;
}
export interface WPPost {
  id: number; slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: { 'wp:featuredmedia'?: Array<{ source_url: string; alt_text: string }> };
}

export async function getPage(slug: string): Promise<WPPage | null> {
  try {
    const pages = await wpFetch<WPPage[]>(`/wp/v2/pages?slug=${slug}&_embed=1`);
    return pages[0] ?? null;
  } catch { return null; }
}

export async function getPosts(perPage = 10, page = 1): Promise<WPPost[]> {
  try {
    return await wpFetch<WPPost[]>(`/wp/v2/posts?per_page=${perPage}&page=${page}&_embed=1&status=publish`);
  } catch { return []; }
}

export async function getPost(slug: string): Promise<WPPost | null> {
  try {
    const posts = await wpFetch<WPPost[]>(`/wp/v2/posts?slug=${slug}&_embed=1`);
    return posts[0] ?? null;
  } catch { return null; }
}

// Contact form — sends to the custom plugin endpoint
export async function submitContactForm(data: {
  name: string; email: string; subject?: string; service?: string; message: string;
}): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${WP_URL}/wp-json/reicodev/v1/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    return { success: json.success === true, message: json.message || '' };
  } catch {
    return { success: false, message: 'Server error' };
  }
}
