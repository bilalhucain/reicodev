export const locales = ['fi', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fi';

// Finnish URL slug mappings (for use in Link components)
export const pathnames = {
  '/': '/',
  '/about': {
    fi: '/meista',
    en: '/about',
    es: '/sobre-nosotros',
  },
  '/services': {
    fi: '/palvelut',
    en: '/services',
    es: '/servicios',
  },
  '/reviews': {
    fi: '/arvostelut',
    en: '/reviews',
    es: '/resenas',
  },
  '/contact': {
    fi: '/yhteystiedot',
    en: '/contact',
    es: '/contacto',
  },
  '/get-a-quote': {
    fi: '/pyydä-tarjous',
    en: '/get-a-quote',
    es: '/solicitar-presupuesto',
  },
  '/our-work': {
    fi: '/tyomme',
    en: '/our-work',
    es: '/nuestro-trabajo',
  },
  '/our-work/wordpress-projects': {
    fi: '/tyomme/wordpress-projektit',
    en: '/our-work/wordpress-projects',
    es: '/nuestro-trabajo/proyectos-wordpress',
  },
  '/our-work/woocommerce-projects': {
    fi: '/tyomme/woocommerce-projektit',
    en: '/our-work/woocommerce-projects',
    es: '/nuestro-trabajo/proyectos-woocommerce',
  },
  '/our-work/shopify-projects': {
    fi: '/tyomme/shopify-projektit',
    en: '/our-work/shopify-projects',
    es: '/nuestro-trabajo/proyectos-shopify',
  },
  '/our-work/seo-projects': {
    fi: '/tyomme/seo-projektit',
    en: '/our-work/seo-projects',
    es: '/nuestro-trabajo/proyectos-seo',
  },
  '/our-work/branding-projects': {
    fi: '/tyomme/brandayprojektit',
    en: '/our-work/branding-projects',
    es: '/nuestro-trabajo/proyectos-branding',
  },
  '/privacy-policy': {
    fi: '/tietosuojakaytanto',
    en: '/privacy-policy',
    es: '/politica-de-privacidad',
  },
  '/cookie-policy': {
    fi: '/evastekäytäntö',
    en: '/cookie-policy',
    es: '/politica-de-cookies',
  },
  '/terms-of-service': {
    fi: '/kayttoehdot',
    en: '/terms-of-service',
    es: '/terminos-de-servicio',
  },
} as const;

/**
 * Resolves a canonical href (the keys above, e.g. '/services') to its
 * locale-specific slug (e.g. '/palvelut' for fi).
 *
 * Why this exists: Navbar.tsx / Footer.tsx build links with plain
 * next/link + a hand-rolled `${locale}${href}` prefix, NOT next-intl's own
 * locale-aware <Link> (from createNavigation()). The `pathnames` map above
 * is wired into the *middleware*, which only rewrites INCOMING request
 * URLs back to their canonical route — it does not retroactively localize
 * OUTGOING links built by plain next/link. Without this helper,
 * `/${locale}${href}` for href='/services' would literally produce
 * '/fi/services', not '/fi/palvelut', for every nav/footer link on the
 * site, not just the new /reviews one.
 *
 * Falls back to the raw href unchanged for anything not in the map
 * (e.g. dynamic project-detail slugs), matching prior behavior for those.
 */
export function localizeHref(href: string, locale: Locale): string {
  const entry = (pathnames as Record<string, string | Record<Locale, string>>)[href];
  if (!entry) return href;
  if (typeof entry === 'string') return entry;
  return entry[locale] ?? href;
}
