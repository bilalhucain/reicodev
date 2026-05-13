import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';

/**
 * Revalidation endpoint — called by WordPress via WP Webhooks plugin
 * whenever a post, page or ACF field is updated.
 *
 * Env var required:
 *   REVALIDATE_SECRET  — a random string set in WordPress webhook headers
 *
 * Example WP Webhooks config:
 *   URL: https://reicodev.com/api/revalidate
 *   Headers: { "x-revalidate-secret": "your-secret-here" }
 *   Trigger: publish_post, save_post, acf/save_post
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get('x-revalidate-secret');

  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { path, tag } = body as { path?: string; tag?: string };

    if (tag) {
      revalidateTag(tag);
      return NextResponse.json({ revalidated: true, tag });
    }

    if (path) {
      revalidatePath(path);
      return NextResponse.json({ revalidated: true, path });
    }

    // Default: revalidate all common paths
    const paths = ['/', '/about', '/services', '/our-work', '/contact', '/get-a-quote'];
    paths.forEach(p => revalidatePath(p));

    return NextResponse.json({ revalidated: true, paths });
  } catch (err) {
    console.error('[Revalidate] Error:', err);
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');

  if (process.env.REVALIDATE_SECRET && secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }

  const path = req.nextUrl.searchParams.get('path') ?? '/';
  revalidatePath(path);
  return NextResponse.json({ revalidated: true, path });
}
