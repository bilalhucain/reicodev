import Link from 'next/link';
import { FOOTER, STATS } from '@/lib/data';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Brand column - Logo replaced Tagline here */}
        <div className={styles.brand}>
<Link href="/" className={styles.logo}>
  <img
    src="/images/reicodev-logo-light-version.png"
    alt="Reicodev"
    className="logo-light"
  />
  <img
    src="/images/reicodev-logo-dark-version.png"
    alt="Reicodev"
    className="logo-dark"
  />
</Link>
          <p className={styles.desc}>
            We design, build and optimise digital experiences that help businesses grow online — backed by {STATS.projects} projects.
          </p>
          <div className="pill pill-green" style={{ width: 'fit-content', marginTop: 16 }}>
            <span className="pill-dot" />
            Available for new projects
          </div>
        </div>

        {/* Link columns (Services, Company, Support) */}
        {FOOTER.columns.map(col => (
          <div key={col.heading} className={styles.col}>
            <h4 className={styles.colHead}>{col.heading}</h4>
            {col.links.map(l => (
              <Link key={l.label} href={l.href} className={styles.colLink}>{l.label}</Link>
            ))}
          </div>
        ))}

        {/* Replaced Newsletter with Get a Quote Section */}
        <div className={styles.col}>
          <h4 className={styles.colHead}>Ready to Start?</h4>
          <p className={styles.nlDesc}>Have a project in mind? Let's build something great together.</p>
          <Link href="/get-a-quote" className="footer-cta-btn">
            Get a Quote
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copy}>
            © {new Date().getFullYear()} Reicodev. All rights reserved.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy-policy" className={styles.bottomLink}>Privacy Policy</Link>
            <Link href="/terms-of-service" className={styles.bottomLink}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}