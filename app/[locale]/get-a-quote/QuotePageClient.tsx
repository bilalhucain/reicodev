'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './quote.module.css';

const SERVICE_ICONS: Record<string, string> = {
  wordpress:   '/images/home-service-wordpress-icon.svg',
  woocommerce: '/images/home-service-woocommerce-icon.svg',
  shopify:     '/images/home-service-shopify-icon.svg',
  bugfix:      '/images/service-bug-fix-icon.svg',
  maintenance: '/images/service-maintenance-icon.svg',
  speed:       '/images/service-speed-icon.svg',
  seo:         '/images/home-service-seo-icon.svg',
  branding:    '/images/home-service-branding-icon.svg',
};

export default function QuotePageClient() {
  const t = useTranslations('quote');
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    service: '', budget: '', timeline: '', name: '', email: '', phone: '', website: '', details: '',
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');

  const SERVICES = [
    { id: 'wordpress',   title: t('serviceWP'),         desc: t('serviceWPDesc') },
    { id: 'woocommerce', title: t('serviceWoo'),         desc: t('serviceWooDesc') },
    { id: 'shopify',     title: t('serviceShopify'),     desc: t('serviceShopifyDesc') },
    { id: 'bugfix',      title: t('serviceBugFix'),      desc: t('serviceBugFixDesc') },
    { id: 'maintenance', title: t('serviceMaintenance'), desc: t('serviceMaintenanceDesc') },
    { id: 'speed',       title: t('serviceSpeed'),       desc: t('serviceSpeedDesc') },
    { id: 'seo',         title: t('serviceSEO'),         desc: t('serviceSEODesc') },
    { id: 'branding',    title: t('serviceBranding'),    desc: t('serviceBrandingDesc') },
  ];

  const BUDGETS = [
    { label: t('budget1'), value: 'under-300' },
    { label: t('budget2'), value: '300-600' },
    { label: t('budget3'), value: '600-1500' },
    { label: t('budget4'), value: '1500-5000' },
    { label: t('budget5'), value: '5000plus' },
    { label: t('budget6'), value: 'not-sure' },
  ];

  const TIMELINES = [
    { label: t('timeline1'), value: 'asap' },
    { label: t('timeline2'), value: '2-4-weeks' },
    { label: t('timeline3'), value: '1-2-months' },
    { label: t('timeline4'), value: 'flexible' },
  ];

  const STEPS = [t('step1Label'), t('step2Label'), t('step3Label')];

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;
    const obs = new IntersectionObserver(
      e => e.forEach(x => x.isIntersecting && x.target.classList.add('in')),
      { threshold: 0.06 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const pick = (key: string, val: string) => setForm(p => ({ ...p, [key]: val }));
  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, type: 'quote' }),
      });
      setStatus(res.ok ? 'ok' : 'err');
    } catch {
      setStatus('err');
    } finally {
      setSending(false);
    }
  }

  const canNext1 = !!form.service;
  const canNext2 = !!form.budget && !!form.timeline;

  if (status === 'ok') {
    const chosen = SERVICES.find(s => s.id === form.service)?.title;
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: 'var(--c-bg)' }}>
        <div style={{ textAlign: 'center', maxWidth: 500 }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 14, color: 'var(--c-txt)' }}>{t('successTitle')}</h1>
          <p style={{ fontSize: 16, color: 'var(--c-muted)', lineHeight: 1.7, marginBottom: 28 }}>
            {t('successDescriptionPart1')} <strong style={{ color: 'var(--c-txt)' }}>{form.name}</strong>
            {t('successDescriptionPart2')} <strong style={{ color: 'var(--c-p1)' }}>{chosen}</strong>
            {t('successDescriptionPart3')}
          </p>
          <Link href="/" className="btn btn-primary">{t('backToHomeButton')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div ref={ref}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.orb} aria-hidden />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div className="pill reveal" style={{ display: 'inline-flex', marginBottom: 20 }}>
            <span className="pill-dot" />{t('sectionLabel')}
          </div>
          <h1 className={`${styles.h1} reveal`}>
            {t('heroTitle').split(' ').slice(0, -2).join(' ')}<br />
            <span className="sec-accent">{t('heroTitle').split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className={`${styles.desc} reveal`}>{t('heroDescription')}</p>
        </div>
      </section>

      {/* Form */}
      <section className={styles.formSection}>
        <div className="container">
          <div className={styles.formWrap}>

            {/* Progress */}
            <div className={`${styles.progress} reveal`}>
              {STEPS.map((s, i) => (
                <div key={s} className={`${styles.stepItem} ${step > i + 1 ? styles.done : ''} ${step === i + 1 ? styles.active : ''}`}>
                  <div className={styles.stepCircle}>{step > i + 1 ? '✓' : i + 1}</div>
                  <span className={styles.stepLabel}>{s}</span>
                  {i < STEPS.length - 1 && <div className={styles.stepLine} />}
                </div>
              ))}
            </div>

            <div className={`${styles.card} reveal`}>

              {/* Step 1: Service */}
              {step === 1 && (
                <div>
                  <h2 className={styles.stepTitle}>{t('step1Heading')}</h2>
                  <p className={styles.stepDesc}>{t('step1Subtitle')}</p>
                  <div className={styles.serviceGrid}>
                    {SERVICES.map(s => (
                      <button
                        key={s.id}
                        className={`${styles.serviceCard} ${form.service === s.id ? styles.serviceActive : ''}`}
                        onClick={() => pick('service', s.id)}
                        type="button"
                      >
                        <img src={SERVICE_ICONS[s.id]} alt={s.title} className={styles.serviceIcon} />
                        <span className={styles.serviceTitle}>{s.title}</span>
                        <span className={styles.serviceDesc}>{s.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className={styles.actions}>
                    <div />
                    <button className="btn btn-primary btn-lg" onClick={() => setStep(2)} disabled={!canNext1} type="button">
                      {t('continueButton')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Budget & Timeline */}
              {step === 2 && (
                <div>
                  <h2 className={styles.stepTitle}>{t('step2Heading')}</h2>
                  <p className={styles.stepDesc}>{t('step2Subtitle')}</p>

                  <div className={styles.sectionLabel}>{t('budgetSectionLabel')}</div>
                  <div className={styles.optGrid}>
                    {BUDGETS.map(b => (
                      <button
                        key={b.value}
                        className={`${styles.optBtn} ${form.budget === b.value ? styles.optActive : ''}`}
                        onClick={() => pick('budget', b.value)}
                        type="button"
                      >
                        {b.label}
                      </button>
                    ))}
                  </div>

                  <div className={styles.sectionLabel} style={{ marginTop: 24 }}>{t('timelineSectionLabel')}</div>
                  <div className={styles.optGrid}>
                    {TIMELINES.map(tl => (
                      <button
                        key={tl.value}
                        className={`${styles.optBtn} ${form.timeline === tl.value ? styles.optActive : ''}`}
                        onClick={() => pick('timeline', tl.value)}
                        type="button"
                      >
                        {tl.label}
                      </button>
                    ))}
                  </div>

                  <div className={styles.actions}>
                    <button className="btn btn-ghost" onClick={() => setStep(1)} type="button">{t('backButton')}</button>
                    <button className="btn btn-primary btn-lg" onClick={() => setStep(3)} disabled={!canNext2} type="button">
                      {t('continueButton')}
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <form onSubmit={submit}>
                  <h2 className={styles.stepTitle}>{t('step3Heading')}</h2>
                  <p className={styles.stepDesc}>{t('step3Subtitle')}</p>

                  <div className={styles.fieldGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>{t('fieldName')}</label>
                      <input name="name" value={form.name} onChange={change} required placeholder={t('fieldNamePlaceholder')} className="form-input" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>{t('fieldEmail')}</label>
                      <input name="email" type="email" value={form.email} onChange={change} required placeholder={t('fieldEmailPlaceholder')} className="form-input" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>{t('fieldPhone')}</label>
                      <input name="phone" value={form.phone} onChange={change} placeholder={t('fieldPhonePlaceholder')} className="form-input" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>{t('fieldWebsite')}</label>
                      <input name="website" value={form.website} onChange={change} placeholder={t('fieldWebsitePlaceholder')} className="form-input" />
                    </div>
                  </div>

                  <div className={styles.field} style={{ marginTop: 16 }}>
                    <label className={styles.label}>{t('fieldDetails')}</label>
                    <textarea
                      name="details"
                      value={form.details}
                      onChange={change}
                      rows={4}
                      placeholder={t('fieldDetailsPlaceholder')}
                      className="form-input"
                      style={{ resize: 'vertical', minHeight: 110 }}
                    />
                  </div>

                  {status === 'err' && (
                    <div style={{ padding:'12px 16px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'var(--r-md)', fontSize:14, color:'var(--c-txt)', marginTop:12 }}>
                      {t('errorMessage')} <a href="mailto:info@reicodev.com" style={{ color:'var(--c-p1)' }}>info@reicodev.com</a>
                    </div>
                  )}

                  <div className={styles.actions} style={{ marginTop: 24 }}>
                    <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>{t('backButton')}</button>
                    <button type="submit" disabled={sending} className="btn btn-primary btn-lg">
                      {sending ? t('sendingButton') : t('submitButton')}
                    </button>
                  </div>

                  <p style={{ fontSize:12, color:'var(--c-dim)', textAlign:'center', marginTop:12 }}>{t('privacyNote')}</p>
                </form>
              )}
            </div>

            {/* Trust bar */}
            <div className={`${styles.trust} reveal`}>
              {[
                { emoji: '⚡', text: t('badge1') },
                { emoji: '✅', text: t('badge2') },
                { emoji: '🌍', text: t('badge3') },
                { emoji: '⭐', text: t('badge4') },
              ].map(b => (
                <div key={b.text} className={styles.trustItem}>
                  <span>{b.emoji}</span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
