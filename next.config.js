import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig = {
  async rewrites() {
    return [
      // Finnish URL translations
      {
        source: '/fi/meista',
        destination: '/fi/about'
      },
      {
        source: '/fi/palvelut',
        destination: '/fi/services'
      },
      {
        source: '/fi/yhteystiedot',
        destination: '/fi/contact'
      },
      {
        source: '/fi/pyydä-tarjous',
        destination: '/fi/get-a-quote'
      },
      {
        source: '/fi/tyomme',
        destination: '/fi/our-work'
      },
      {
        source: '/fi/tyomme/wordpress-projektit',
        destination: '/fi/our-work/wordpress-projects'
      },
      {
        source: '/fi/tyomme/woocommerce-projektit',
        destination: '/fi/our-work/woocommerce-projects'
      },
      {
        source: '/fi/tyomme/shopify-projektit',
        destination: '/fi/our-work/shopify-projects'
      },
      {
        source: '/fi/tyomme/seo-projektit',
        destination: '/fi/our-work/seo-projects'
      },
      {
        source: '/fi/tyomme/brändi-projektit',
        destination: '/fi/our-work/branding-projects'
      },
      {
        source: '/fi/tietosuojakaytanto',
        destination: '/fi/privacy-policy'
      },
      {
        source: '/fi/evastekaytanto',
        destination: '/fi/cookie-policy'
      },
      {
        source: '/fi/kayttoehdot',
        destination: '/fi/terms-of-service'
      },
      // Spanish URL translations (structure ready, not live yet)
      {
        source: '/es/sobre-nosotros',
        destination: '/es/about'
      },
      {
        source: '/es/servicios',
        destination: '/es/services'
      },
      {
        source: '/es/contacto',
        destination: '/es/contact'
      },
      {
        source: '/es/solicitar-presupuesto',
        destination: '/es/get-a-quote'
      },
      {
        source: '/es/nuestro-trabajo',
        destination: '/es/our-work'
      },
      {
        source: '/es/nuestro-trabajo/proyectos-wordpress',
        destination: '/es/our-work/wordpress-projects'
      },
      {
        source: '/es/nuestro-trabajo/proyectos-woocommerce',
        destination: '/es/our-work/woocommerce-projects'
      },
      {
        source: '/es/nuestro-trabajo/proyectos-shopify',
        destination: '/es/our-work/shopify-projects'
      },
      {
        source: '/es/nuestro-trabajo/proyectos-seo',
        destination: '/es/our-work/seo-projects'
      },
      {
        source: '/es/nuestro-trabajo/proyectos-marca',
        destination: '/es/our-work/branding-projects'
      }
    ];
  }
};

export default withNextIntl(nextConfig);