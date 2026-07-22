'use client';
import { useTheme } from "@/components/ThemeProvider";
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { NAV_LINKS } from '@/lib/data';
import { localizeHref, type Locale } from '@/i18n/config';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const pathname = usePathname();
  const dropRef = useRef<HTMLDivElement>(null);
  const lastY = useRef(0);

  const t = useTranslations("nav");
  const locale = useLocale();

  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Build a locale-prefixed, locale-TRANSLATED href: '/services' + fi →
  // '/fi/palvelut', not the literal '/fi/services'. See localizeHref's
  // doc comment in i18n/config.ts for why this step is necessary.
  const localePath = (href: string) =>
    `/${locale}${href === '/' ? '' : localizeHref(href, locale as Locale)}`;

  useEffect(() => {
    lastY.current = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 24);

        const delta = y - lastY.current;
        if (y < 80) {
          setHidden(false);               // always visible near the top
        } else if (delta > 4) {
          setHidden(true);                // scrolling down — hide
        } else if (delta < -4) {
          setHidden(false);               // scrolling up — reveal
        }
        lastY.current = y;
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropOpen(false); }, [pathname]);
  useEffect(() => { if (mobileOpen) setHidden(false); }, [mobileOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

const LogoContent = () => (
  <Image
    src={
      theme === "dark"
        ? "/images/reicodev-logo-dark-version.png"
        : "/images/reicodev-logo-light-version.png"
    }
    alt="Reicodev"
    width={797}
    height={193}
    className={styles.logoImg}
    priority
  />
);
  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${hidden && !mobileOpen ? styles.hidden : ''}`}>
      <div className={`container ${styles.inner}`}>

        {/* Logo — id is used by <ReiJourney> to measure this element's
            screen position (launch/landing point) and to fade this
            header bird out while the journey bird is flying. */}
        <Link href={localePath('/')} className={styles.logo} id="site-logo">
          <LogoContent />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            link.children ? (
              <div key={link.key} className={styles.dropWrap} ref={dropRef}>
                <button
                  className={`${styles.link} ${pathname.includes('/our-work') ? styles.active : ''}`}
                  onClick={() => setDropOpen(o => !o)}
                  aria-expanded={dropOpen}
                >
                  {t(link.key)}
                  <svg
                    width="12" height="12" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ transition: 'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'none' }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {dropOpen && (
                  <div className={styles.dropdown}>
                    <Link href={localePath(link.href)} className={styles.dropAll}>
                      {t('viewAllWork')} →
                    </Link>
                    <div className={styles.dropDivider} />
                    {link.children.map(c => (
                      <Link
                        key={c.key}
                        href={localePath(c.href)}
                        className={`${styles.dropItem} ${pathname === localePath(c.href) ? styles.dropActive : ''}`}
                      >
                        {t(c.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.key}
                href={localePath(link.href)}
                className={`${styles.link} ${pathname === localePath(link.href) ? styles.active : ''}`}
              >
                {t(link.key)}
              </Link>
            )
          ))}
        </nav>

        {/* Right side: Language Switcher + CTA */}
        <div className={styles.rightSide}>
          <LanguageSwitcher />
          <Link href={localePath('/get-a-quote')} className={`btn btn-primary btn-sm ${styles.cta}`}>
            {t('getAQuote')}
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className={styles.burger}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${mobileOpen ? styles.bar1open : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.bar2open : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.bar3open : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobile}>
          {NAV_LINKS.map(link => (
            <div key={link.key}>
              <Link
                href={localePath(link.href)}
                className={`${styles.mobileLink} ${pathname === localePath(link.href) ? styles.mobileActive : ''}`}
              >
                {t(link.key)}
              </Link>
              {link.children?.map(c => (
                <Link key={c.key} href={localePath(c.href)} className={styles.mobileSub}>
                  {t(c.key)}
                </Link>
              ))}
            </div>
          ))}
          <div style={{ padding: '12px 20px' }}>
            <LanguageSwitcher />
          </div>
          <Link href={localePath('/get-a-quote')} className={`btn btn-primary ${styles.mobileCta}`}>
            {t('getAQuote')}
          </Link>
        </div>
      )}
    </header>
  );
}
