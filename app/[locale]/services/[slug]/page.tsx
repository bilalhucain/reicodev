// app/[locale]/services/[slug]/page.tsx
// Drop into: app/[locale]/services/[slug]/page.tsx
//
// Renders all 5 service pages from lib/services-data.ts via a shared client
// template. Handles metadata + FAQPage JSON-LD server-side.
//
// INTEGRATION NOTES:
// 1. If next-intl pathnames config maps localized slugs per-locale, add
//    entries for '/services/[slug]' there so /fi and /es resolve correctly.
//    Until then this works as one canonical English slug across locales.
// 2. Swap `localizeHref` import below for your actual helper path/name if it
//    differs from i18n/config.ts's localizeHref().
// 3. Case-study `href` values in services-data.ts point at best-guess
//    /our-work/[slug] routes — verify these against your real project slugs
//    before shipping.

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICE_SLUGS, getServiceContent } from "@/lib/services-data";
import ServicesPageClient from "@/components/sections/services/ServicesPageClient";
import { localizeHref, type Locale } from "@/i18n/config";

interface PageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

import { locales } from "@/i18n/config";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    SERVICE_SLUGS.map((slug) => ({
      locale,
      slug,
    }))
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const content = getServiceContent(slug);
  if (!content) return {};

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: {
      canonical: `/services/${content.slug}`,
    },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      type: "website",
    },
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const content = getServiceContent(slug);

  if (!content) {
    notFound();
  }

  const quoteHref = localizeHref("/get-a-quote", locale);
  const contactHref = localizeHref("/contact", locale);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "/services" },
      { "@type": "ListItem", position: 3, name: content.eyebrow, item: `/services/${content.slug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServicesPageClient content={content} quoteHref={quoteHref} contactHref={contactHref} />
    </>
  );
}
