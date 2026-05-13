'use client';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/data';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [dropOpen,    setDropOpen]    = useState(false);
  const pathname = usePathname();
  const dropRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); setDropOpen(false); }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

const LogoContent = () => (
  <>
    <Image
      src="/images/reicodev-logo-dark-version.png"
      alt="Reicodev"
      className={`${styles.logoImg} ${styles.logoImgDark}`}
      width={160}
      height={38}
      priority
    />
    <Image
      src="/images/reicodev-logo-light-version.png"
      alt="Reicodev"
      className={`${styles.logoImg} ${styles.logoImgLight}`}
      width={160}
      height={38}
      priority
    />
  </>
);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>

        {/* Logo — fetched from WordPress ACF */}
        <Link href="/" className={styles.logo}>
          <LogoContent />
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.nav} aria-label="Main navigation">
          {NAV_LINKS.map(link => (
            link.children ? (
              <div key={link.href} className={styles.dropWrap} ref={dropRef}>
                <button
                  className={`${styles.link} ${pathname.startsWith('/our-work') ? styles.active : ''}`}
                  onClick={() => setDropOpen(o => !o)}
                  aria-expanded={dropOpen}
                >
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ transition:'transform 0.2s', transform:dropOpen?'rotate(180deg)':'none' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {dropOpen && (
                  <div className={styles.dropdown}>
                    <Link href={link.href} className={styles.dropAll}>View All Work →</Link>
                    <div className={styles.dropDivider} />
                    {link.children.map(c => (
                      <Link key={c.href} href={c.href} className={`${styles.dropItem} ${pathname === c.href ? styles.dropActive : ''}`}>
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.link} ${pathname === link.href ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        {/* CTA */}
        <Link href="/get-a-quote" className={`btn btn-primary btn-sm ${styles.cta}`}>
          Get a Quote
        </Link>

        {/* Hamburger */}
        <button className={styles.burger} onClick={() => setMobileOpen(o => !o)} aria-label="Toggle menu">
          <span className={`${styles.bar} ${mobileOpen ? styles.bar1open : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.bar2open : ''}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.bar3open : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobile}>
          {NAV_LINKS.map(link => (
            <div key={link.href}>
              <Link href={link.href} className={`${styles.mobileLink} ${pathname === link.href ? styles.mobileActive : ''}`}>
                {link.label}
              </Link>
              {link.children?.map(c => (
                <Link key={c.href} href={c.href} className={styles.mobileSub}>
                  {c.label}
                </Link>
              ))}
            </div>
          ))}
          <Link href="/get-a-quote" className={`btn btn-primary ${styles.mobileCta}`}>
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  );
}
