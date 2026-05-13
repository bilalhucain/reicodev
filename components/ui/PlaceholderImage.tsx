import styles from './PlaceholderImage.module.css';

interface PlaceholderImageProps {
  label?:    string;
  acfKey?:   string;
  ratio?:    '1:1' | '16:9' | '4:3' | '3:2' | '21:9';
  className?: string;
  isBrowser?: boolean; // wrap in browser chrome
  url?:       string;  // shown in browser address bar
}

const ratioMap: Record<string, string> = {
  '1:1':  '100%',
  '16:9': '56.25%',
  '4:3':  '75%',
  '3:2':  '66.66%',
  '21:9': '42.85%',
};

/**
 * Screenshot / image placeholder.
 *
 * HOW TO REPLACE WITH REAL IMAGE (via ACF):
 * ─────────────────────────────────────────
 * 1. In WordPress, create an Image ACF field with the key shown below.
 * 2. Fetch the field value from WP REST API (see lib/wordpress.ts).
 * 3. Replace this component with next/image pointing to the ACF URL.
 *
 * Example:
 *   const imgUrl = pageData?.acf?.project_safari_world_tours_hero;
 *   <Image src={imgUrl} alt="…" fill />
 */
export default function PlaceholderImage({
  label    = 'Website Screenshot',
  acfKey,
  ratio    = '16:9',
  className = '',
  isBrowser = false,
  url       = 'reicodev.com',
}: PlaceholderImageProps) {
  const displayUrl = url.replace('https://','').replace('http://','');

  const inner = (
    <div className={styles.inner}>
      {/* Minimal SVG icon — not an emoji */}
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className={styles.svg}>
        <rect x="2" y="3" width="20" height="18" rx="2"/>
        <path d="M8 21h8M12 17v4"/>
        <path d="M2 13h20"/>
      </svg>
      <span className={styles.lbl}>{label}</span>
      {acfKey && (
        <span className={styles.key}>
          WordPress ACF key: <code>{acfKey}</code>
        </span>
      )}
    </div>
  );

  if (isBrowser) {
    return (
      <div className={`${styles.browser} ${className}`}>
        <div className={styles.browserBar}>
          <span className={styles.dot} style={{ background:'#EF4444' }}/>
          <span className={styles.dot} style={{ background:'#F59E0B' }}/>
          <span className={styles.dot} style={{ background:'#10B981' }}/>
          <span className={styles.urlBar}>{displayUrl}</span>
        </div>
        <div className={styles.browserBody} style={{ paddingTop: ratioMap[ratio] }}>
          {inner}
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.wrap} ${className}`} style={{ paddingTop: ratioMap[ratio] }}>
      {inner}
    </div>
  );
}
