'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CookieBanner.module.css';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    const consent = localStorage.getItem('rdv-cookie-consent');
    if (!consent) setVisible(true);
  }, []);

  const accept = (all: boolean) => {
    const value = all
      ? JSON.stringify({ necessary: true, analytics: true, marketing: true })
      : JSON.stringify({ necessary: true, ...prefs });
    localStorage.setItem('rdv-cookie-consent', value);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Cookie consent">
      <div className={styles.banner}>
        <div className={styles.icon} aria-hidden>🍪</div>
        <div className={styles.content}>
          <h2 className={styles.title}>We use cookies</h2>
          {!showSettings ? (
            <>
              <p className={styles.desc}>
                We use essential cookies to make our site work. With your consent, we may also use analytics cookies to improve your experience. See our{' '}
                <Link href="/cookie-policy" className={styles.link}>Cookie Policy</Link> and{' '}
                <Link href="/privacy-policy" className={styles.link}>Privacy Policy</Link>.
              </p>
              <div className={styles.btns}>
                <button className="btn btn-primary" onClick={() => accept(true)}>Accept All</button>
                <button className="btn btn-ghost" onClick={() => setShowSettings(true)}>Manage Preferences</button>
                <button className={styles.necessaryBtn} onClick={() => accept(false)}>Necessary Only</button>
              </div>
            </>
          ) : (
            <>
              <div className={styles.settings}>
                <label className={styles.toggle}>
                  <span className={styles.toggleLabel}>
                    <strong>Necessary</strong>
                    <span>Required for the website to function. Cannot be disabled.</span>
                  </span>
                  <input type="checkbox" checked disabled readOnly />
                  <span className={`${styles.toggleSlider} ${styles.alwaysOn}`}/>
                </label>
                <label className={styles.toggle}>
                  <span className={styles.toggleLabel}>
                    <strong>Analytics</strong>
                    <span>Help us understand how visitors use our site (e.g. Google Analytics).</span>
                  </span>
                  <input type="checkbox" checked={prefs.analytics} onChange={e => setPrefs(p => ({ ...p, analytics: e.target.checked }))} />
                  <span className={styles.toggleSlider}/>
                </label>
                <label className={styles.toggle}>
                  <span className={styles.toggleLabel}>
                    <strong>Marketing</strong>
                    <span>Used to show relevant ads and track campaign effectiveness.</span>
                  </span>
                  <input type="checkbox" checked={prefs.marketing} onChange={e => setPrefs(p => ({ ...p, marketing: e.target.checked }))} />
                  <span className={styles.toggleSlider}/>
                </label>
              </div>
              <div className={styles.btns}>
                <button className="btn btn-primary" onClick={() => accept(false)}>Save Preferences</button>
                <button className="btn btn-ghost" onClick={() => accept(true)}>Accept All</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
