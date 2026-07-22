import Image from 'next/image';
import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { FOOTER_COLUMNS, STATS } from '@/lib/data';
import { localizeHref, type Locale } from '@/i18n/config';
import styles from './Footer.module.css';

export default async function Footer() {
  const t      = await getTranslations('footer');
  const locale = await getLocale();

  const localePath = (href: string) =>
    `/${locale}${href === '/' ? '' : localizeHref(href, locale as Locale)}`;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Brand column */}
        <div className={styles.brand}>
          <Link href={localePath('/')} className={styles.logo}>
            <Image
              src="/images/reicodev-logo-light-version.png"
              alt="Reicodev"
              width={160}
              height={38}
              className="logo-light"
            />
            <Image
              src="/images/reicodev-logo-dark-version.png"
              alt="Reicodev"
              width={160}
              height={38}
              className="logo-dark"
            />
          </Link>
          <p className={styles.desc}>
            {t('tagline', { projects: STATS.projects })}
          </p>
          <div className="pill pill-green" style={{ width: 'fit-content', marginTop: 16 }}>
            <span className="pill-dot" />
            {t('available')}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLUMNS.map(col => (
          <div key={col.key} className={styles.col}>
            <h4 className={styles.colHead}>{t(`${col.key}Heading`)}</h4>
            {col.links.map(l => (
              <Link key={l.key} href={localePath(l.href)} className={styles.colLink}>
                {t(l.key)}
              </Link>
            ))}
          </div>
        ))}

        {/* Get a Quote CTA */}
        <div className={styles.col}>
          <h4 className={styles.colHead}>{t('readyHeading')}</h4>
          <p className={styles.nlDesc}>{t('readyText')}</p>
          <Link href={localePath('/get-a-quote')} className="footer-cta-btn">
            {t('getAQuote')}
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copy}>
            {t('copyright', { year: new Date().getFullYear() })}
          </p>
          <div className={styles.bottomLinks}>
            <Link href={localePath('/privacy-policy')}  className={styles.bottomLink}>{t('privacyPolicy')}</Link>
            <Link href={localePath('/cookie-policy')}   className={styles.bottomLink}>{t('cookiePolicy')}</Link>
            <Link href={localePath('/terms-of-service')} className={styles.bottomLink}>{t('termsOfService')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
