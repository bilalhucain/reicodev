import Link from 'next/link';
import { FOOTER, STATS } from '@/lib/data';
import styles from './Footer.module.css';

function SocialIcon({ icon }: { icon: string }) {
  const icons: Record<string, string> = {
    fb: 'f', x: '𝕏', yt: '▶', li: 'in', wa: '📱',
  };
  return <span>{icons[icon] || icon}</span>;
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>

        {/* Brand column */}
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>⚡</span>
            <div>
              <span className={styles.logoText}>Reico<span className={styles.accent}>dev</span></span>
              <span className={styles.tagline}>{FOOTER.tagline}</span>
            </div>
          </Link>
          <p className={styles.desc}>
            We design, build and optimise digital experiences that help businesses grow online — backed by {STATS.projects} projects and {STATS.reviews} positive reviews.
          </p>
          <div className="pill pill-green" style={{ width: 'fit-content', marginTop: 16 }}>
            <span className="pill-dot" />
            Available for new projects
          </div>

          {/* Social icons */}
          <div className={styles.socials}>
            {FOOTER.social.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                 aria-label={s.label} className={styles.socialIcon}>
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {FOOTER.columns.map(col => (
          <div key={col.heading} className={styles.col}>
            <h4 className={styles.colHead}>{col.heading}</h4>
            {col.links.map(l => (
              <Link key={l.label} href={l.href} className={styles.colLink}>{l.label}</Link>
            ))}
          </div>
        ))}

        {/* Newsletter */}
        <div className={styles.col}>
          <h4 className={styles.colHead}>Newsletter</h4>
          <p className={styles.nlDesc}>Get the latest content and insights straight to your inbox.</p>
          <div className={styles.nlForm}>
            <input type="email" placeholder="your@email.com" className={styles.nlInput} />
            <button className={`btn btn-primary btn-sm ${styles.nlBtn}`}>Subscribe</button>
          </div>
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
            <Link href="/cookie-policy" className={styles.bottomLink}>Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
