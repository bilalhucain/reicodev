import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

const COOKIE_NAME = 'NEXT_LOCALE';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
  pathnames: {
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
  },
});

// Country → locale mapping for geo-detection. Only Finland gets its own
// locale redirect for now — Spain's locale exists in the codebase but
// isn't public yet, so it must NOT trigger a /es redirect here.
const COUNTRY_LOCALE_MAP: Record<string, (typeof locales)[number]> = {
  FI: 'fi',
};
const GEO_FALLBACK_LOCALE: (typeof locales)[number] = 'en';

export default function middleware(request: NextRequest) {
  // If the URL already has an explicit locale prefix (/fi/..., /en/..., /es/...),
  // the person navigated there directly or clicked a link — respect it as-is.
  const pathnameHasLocale = locales.some(
    (locale) => request.nextUrl.pathname === `/${locale}` || request.nextUrl.pathname.startsWith(`/${locale}/`)
  );

  // If the person has already chosen/seen a locale before, respect their cookie
  // and never override it with geo-detection again.
  const hasLocaleCookie = request.cookies.has(COOKIE_NAME);

  if (!pathnameHasLocale && !hasLocaleCookie) {
    // Vercel automatically injects this header with the visitor's ISO country code.
    // Other hosts (Netlify, Cloudflare, custom servers) inject similar headers —
    // see notes below if you're not on Vercel.
    const country = request.headers.get('x-vercel-ip-country');

    const detectedLocale = (country && COUNTRY_LOCALE_MAP[country]) || GEO_FALLBACK_LOCALE;

    // Redirect to the detected locale's root if we're at the bare domain root.
    if (request.nextUrl.pathname === '/') {
      const url = request.nextUrl.clone();
      url.pathname = `/${detectedLocale}`;
      const redirectResponse = NextResponse.redirect(url);
      redirectResponse.cookies.set(COOKIE_NAME, detectedLocale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
      });
      return redirectResponse;
    }

    const response = intlMiddleware(request);
    response.cookies.set(COOKIE_NAME, detectedLocale, {
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    return response;
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
