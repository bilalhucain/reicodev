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
