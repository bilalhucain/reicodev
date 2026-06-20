'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './HomeHero.module.css';

const BARS = [35,55,42,70,62,85,58,90,75,95,80,100];

export default function HomeHero() {
  const t = useTranslations('home');

  return (
    <section className={styles.hero}>
      <div className={styles.gridPattern} aria-hidden />
      <div className={`${styles.orb} ${styles.orb1}`} aria-hidden />
      <div className={`${styles.orb} ${styles.orb2}`} aria-hidden />
      <div className={`${styles.orb} ${styles.orb3}`} aria-hidden />

      <div className={`container ${styles.inner}`}>

        {/* LEFT: TEXT */}
        <div className={styles.textCol}>
          <div className={`pill ${styles.ani1}`}>
            <span className="pill-dot" />{t('heroBadge')}
          </div>

          <h1 className={`${styles.h1} ${styles.ani2}`}>
            {t('heroTitle')}<br />
            <span className={styles.accent}>{t('heroSubtitle')}</span>
          </h1>

          <p className={`${styles.desc} ${styles.ani3}`}>{t('heroDescription')}</p>

          <div className={`${styles.btns} ${styles.ani4}`}>
            <Link href="/get-a-quote" className={styles.btnPrimary}>
              {t('heroCtaPrimary')}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Link>
            <Link href="/our-work" className={styles.btnGhost}>{t('heroCtaSecondary')}</Link>
          </div>

          <div className={`${styles.trust} ${styles.ani5}`}>
            <div className={styles.trustItem}>
              <span className={styles.trustStar}>★★★★★</span>
              <span className={styles.trustNum}>4.9</span>
              <span className={styles.trustLabel}>{t('stat1Label')}</span>
            </div>
            <div className={styles.trustDiv} />
            <div className={styles.trustItem}>
              <span className={styles.trustStar}>★★★★★</span>
              <span className={styles.trustNum}>879+</span>
              <span className={styles.trustLabel}>{t('stat2Label')}</span>
            </div>
            <div className={styles.trustDiv} />
            <div className={styles.trustItem}>
              <span className={styles.trustStar}>★★★★★</span>
              <span className={styles.trustNum}>1,440+</span>
              <span className={styles.trustLabel}>{t('stat3Label')}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: VISUAL — unchanged, no translatable text */}
        <div className={`${styles.visual} ${styles.ani6}`}>
          <div className={styles.ring1} aria-hidden />
          <div className={styles.ring2} aria-hidden />

          <div className={`${styles.serviceOrb} ${styles.orbTop}`}>
            <img src="/images/home-service-wordpress-icon.svg" alt="WordPress Development" width={32} height={32} />
            <span className={styles.orbLabel}>WordPress</span>
          </div>
          <div className={`${styles.serviceOrb} ${styles.orbRight}`}>
            <img src="/images/home-service-woocommerce-icon.svg" alt="WooCommerce" width={36} height={22} />
            <span className={styles.orbLabel}>WooCommerce</span>
          </div>
          <div className={`${styles.serviceOrb} ${styles.orbBottom}`}>
            <img src="/images/home-service-seo-icon.svg" alt="SEO" width={32} height={32} />
            <span className={styles.orbLabel}>SEO</span>
          </div>
          <div className={`${styles.serviceOrb} ${styles.orbLeft}`}>
            <img src="/images/home-service-branding-icon.svg" alt="Branding" width={22} height={32} />
            <span className={styles.orbLabel}>Branding</span>
          </div>

          <div className={styles.devices}>
            <div className={styles.tabletWrap}>
              <div className={styles.tabletBody}>
                <div className={styles.deviceNav}>
                  <div className={styles.deviceNavDots}>
                    <span style={{ background:'#EF4444' }} /><span style={{ background:'#F59E0B' }} /><span style={{ background:'#10B981' }} />
                  </div>
                </div>
                <div className={styles.deviceContent}>
                  <div className={styles.miniHero}>
                    <div className={`${styles.miniH1} ${styles.miniH1Sm}`}>We Design.<br /><span>You Grow.</span></div>
                    <div className={styles.miniBtnSm}>Get a Quote</div>
                  </div>
                  <div className={styles.miniServiceGrid}>
                    {['WP','Woo','SEO','Brand'].map((s,i) => (
                      <div key={s} className={styles.miniServiceCard}>
                        <div className={styles.miniServiceIcon} style={{ background:['rgba(33,117,155,0.2)','rgba(155,92,143,0.2)','rgba(26,115,232,0.15)','rgba(162,89,255,0.15)'][i] }}/>
                        <span className={styles.miniServiceLbl}>{s}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.miniProjects}>
                    <div className={styles.miniProjCard} />
                    <div className={styles.miniProjCard} style={{ background:'linear-gradient(135deg,rgba(16,185,129,0.2),rgba(16,185,129,0.06))' }}/>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.laptopWrap}>
              <div className={styles.laptopScreen}>
                <div className={styles.deviceNav}>
                  <div className={styles.deviceNavDots}>
                    <span style={{ background:'#EF4444' }} /><span style={{ background:'#F59E0B' }} /><span style={{ background:'#10B981' }} />
                  </div>
                  <div className={styles.deviceNavUrl}>reicodev.com</div>
                </div>
                <div className={styles.deviceContent}>
                  <div className={styles.miniHero}>
                    <div className={styles.miniHeroText}>
                      <div className={styles.miniPill}>488+ Clients</div>
                      <div className={styles.miniH1}>We Design. Build.<br/><span>You Grow.</span></div>
                      <div className={styles.miniDesc}>WordPress · WooCommerce · SEO · Branding</div>
                      <div className={styles.miniBtns}>
                        <div className={styles.miniBtnPrimary}>Get a Quote</div>
                        <div className={styles.miniBtnGhost}>Our Work</div>
                      </div>
                    </div>
                    <div className={styles.miniDash}>
                      <div className={styles.miniDashTop}>
                        <div className={styles.miniDashMetric}>
                          <span className={styles.miniDashLbl}>Projects</span>
                          <span className={styles.miniDashVal} style={{ color:'var(--c-p1)' }}>1,440+</span>
                        </div>
                        <div className={styles.miniDashMetric}>
                          <span className={styles.miniDashLbl}>Clients</span>
                          <span className={styles.miniDashVal} style={{ color:'var(--c-green)' }}>488+</span>
                        </div>
                      </div>
                      <div className={styles.miniDashBars}>
                        {BARS.map((h,i) => <div key={i} className={styles.miniDashBar} style={{ height:`${h}%`, opacity:i<6?0.4:0.9 }} />)}
                      </div>
                    </div>
                  </div>
                  <div className={styles.miniServiceRow}>
                    {[
                      { label:'WordPress', bg:'rgba(33,117,155,0.15)' },
                      { label:'WooCommerce', bg:'rgba(155,92,143,0.15)' },
                      { label:'SEO', bg:'rgba(26,115,232,0.15)' },
                      { label:'Branding', bg:'rgba(162,89,255,0.15)' },
                    ].map(s => (
                      <div key={s.label} className={styles.miniSvcItem}>
                        <div className={styles.miniSvcIcon} style={{ background:s.bg }} />
                        <span className={styles.miniSvcLbl}>{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className={styles.miniProjRow}>
                    {[
                      { cat:'WordPress', title:'Safari World Tours', bg:'rgba(108,75,255,0.15)' },
                      { cat:'WordPress', title:'ClearConnect TV', bg:'rgba(16,185,129,0.15)' },
                      { cat:'SEO', title:'Half Price Pkg.', bg:'rgba(245,158,11,0.15)' },
                    ].map(p => (
                      <div key={p.title} className={styles.miniProjItem}>
                        <div className={styles.miniProjImg} style={{ background:`linear-gradient(135deg,${p.bg},rgba(0,0,0,0.1))` }} />
                        <div className={styles.miniProjBody}>
                          <div className={styles.miniProjCat}>{p.cat}</div>
                          <div className={styles.miniProjTitle}>{p.title}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.laptopChin} />
              <div className={styles.laptopBase} />
            </div>

            <div className={styles.mobileWrap}>
              <div className={styles.mobileBody}>
                <div className={styles.mobileNotch} />
                <div className={styles.deviceContent}>
                  <div className={styles.miniHero} style={{ padding:'4px' }}>
                    <div className={styles.miniPill} style={{ fontSize:3, padding:'1px 4px', marginBottom:2 }}>488+ Clients</div>
                    <div className={`${styles.miniH1} ${styles.miniH1Xs}`}>We Design.<br/><span>You Grow.</span></div>
                    <div className={styles.miniBtnXs}>Get a Quote</div>
                  </div>
                  <div className={styles.mobileSvcList}>
                    {['WordPress','WooCommerce','SEO','Branding'].map((s,i) => (
                      <div key={s} className={styles.mobileSvcRow}>
                        <div className={styles.mobileSvcIcon} style={{ background:['rgba(33,117,155,0.2)','rgba(155,92,143,0.2)','rgba(26,115,232,0.15)','rgba(162,89,255,0.15)'][i] }}/>
                        <span className={styles.mobileSvcLbl}>{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.statCard} ${styles.sc1}`}>
            <div className={styles.statIcon} style={{ background:'rgba(108,75,255,0.15)' }}>🚀</div>
            <div><div className={styles.statNum}>1,440+</div><div className={styles.statLbl}>Projects</div></div>
          </div>
          <div className={`${styles.statCard} ${styles.sc2}`}>
            <div className={styles.statIcon} style={{ background:'rgba(245,158,11,0.15)' }}>⭐</div>
            <div><div className={styles.statNum}>4.9/5</div><div className={styles.statLbl}>Rating</div></div>
          </div>
          <div className={`${styles.statCard} ${styles.sc3}`}>
            <div className={styles.statIcon} style={{ background:'rgba(16,185,129,0.15)' }}>🌍</div>
            <div><div className={styles.statNum}>61+</div><div className={styles.statLbl}>Countries</div></div>
          </div>

          <div className={styles.respBadge}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            100% Responsive
          </div>
        </div>
      </div>
    </section>
  );
}
