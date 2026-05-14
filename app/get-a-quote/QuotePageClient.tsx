'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './quote.module.css';

const SERVICES = [
  { id:'wordpress',    emoji:'🌐', title:'WordPress Website',     desc:'Custom-designed, fast and secure website' },
  { id:'woocommerce',  emoji:'🛒', title:'WooCommerce Store',     desc:'Full eCommerce store with payment gateways' },
  { id:'shopify',      emoji:'🛍️', title:'Shopify Store',         desc:'High-converting Shopify store setup' },
  { id:'bugfix',       emoji:'🔧', title:'WordPress Bug Fix',     desc:'Fast fix for any WordPress issue' },
  { id:'maintenance',  emoji:'🛡️', title:'WordPress Maintenance', desc:'Monthly care plan for your website' },
  { id:'speed',        emoji:'⚡', title:'Speed Optimisation',    desc:'90+ PageSpeed score guaranteed' },
  { id:'seo',          emoji:'📈', title:'SEO Campaign',          desc:'Rank higher and grow organic traffic' },
  { id:'branding',     emoji:'🎨', title:'Brand Identity',        desc:'Logo, colours, typography and guidelines' },
];

const BUDGETS = [
  { label: 'Under $300',    value: 'under-300' },
  { label: '$300 – $600',   value: '300-600' },
  { label: '$600 – $1,500', value: '600-1500' },
  { label: '$1,500 – $5K',  value: '1500-5000' },
  { label: '$5,000+',       value: '5000plus' },
  { label: 'Not sure yet',  value: 'not-sure' },
];

const TIMELINES = [
  { label: 'ASAP',           value: 'asap' },
  { label: '2–4 Weeks',      value: '2-4-weeks' },
  { label: '1–2 Months',     value: '1-2-months' },
  { label: 'Not Urgent',     value: 'flexible' },
];

export default function QuotePageClient() {
  const ref = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    service: '',
    budget: '',
    timeline: '',
    name: '',
    email: '',
    phone: '',
    website: '',
    details: '',
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');

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

  const STEPS = ['Service', 'Budget & Timeline', 'Your Details'];
  const canNext1 = !!form.service;
  const canNext2 = !!form.budget && !!form.timeline;

  if (status === 'ok') {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', background: 'var(--c-bg)' }}>
        <div style={{ textAlign: 'center', maxWidth: 500 }}>
          <div style={{ fontSize: 56, marginBottom: 20 }}>🎉</div>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 14, color: 'var(--c-txt)' }}>Quote Request Received!</h1>
          <p style={{ fontSize: 16, color: 'var(--c-muted)', lineHeight: 1.7, marginBottom: 28 }}>
            Thank you, <strong style={{ color: 'var(--c-txt)' }}>{form.name}</strong>! I&apos;ve received your quote request for <strong style={{ color: 'var(--c-p1)' }}>{SERVICES.find(s => s.id === form.service)?.title}</strong>. I&apos;ll review your details and send a personalised quote within 24 hours.
          </p>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
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
            <span className="pill-dot" />Free Quote — No Obligation
          </div>
          <h1 className={`${styles.h1} reveal`}>
            Let&apos;s Get Your<br />
            <span className="sec-accent">Project Started</span>
          </h1>
          <p className={`${styles.desc} reveal`}>
            Answer 3 quick questions and we&apos;ll send you a personalised quote within 24 hours.
          </p>
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
                  <h2 className={styles.stepTitle}>What do you need?</h2>
                  <p className={styles.stepDesc}>Select the service that best fits your project.</p>
                  <div className={styles.serviceGrid}>
                    {SERVICES.map(s => (
                      <button
                        key={s.id}
                        className={`${styles.serviceCard} ${form.service === s.id ? styles.serviceActive : ''}`}
                        onClick={() => pick('service', s.id)}
                        type="button"
                      >
                        <span className={styles.serviceEmoji}>{s.emoji}</span>
                        <span className={styles.serviceTitle}>{s.title}</span>
                        <span className={styles.serviceDesc}>{s.desc}</span>
                      </button>
                    ))}
                  </div>
                  <div className={styles.actions}>
                    <div />
                    <button
                      className="btn btn-primary btn-lg"
                      onClick={() => setStep(2)}
                      disabled={!canNext1}
                    >
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Budget & Timeline */}
              {step === 2 && (
                <div>
                  <h2 className={styles.stepTitle}>Budget & Timeline</h2>
                  <p className={styles.stepDesc}>Helps us recommend the right solution for you.</p>

                  <div className={styles.sectionLabel}>Estimated Budget</div>
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

                  <div className={styles.sectionLabel} style={{ marginTop: 24 }}>Preferred Timeline</div>
                  <div className={styles.optGrid}>
                    {TIMELINES.map(t => (
                      <button
                        key={t.value}
                        className={`${styles.optBtn} ${form.timeline === t.value ? styles.optActive : ''}`}
                        onClick={() => pick('timeline', t.value)}
                        type="button"
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  <div className={styles.actions}>
                    <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
                    <button className="btn btn-primary btn-lg" onClick={() => setStep(3)} disabled={!canNext2}>
                      Continue →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Details */}
              {step === 3 && (
                <form onSubmit={submit}>
                  <h2 className={styles.stepTitle}>Your Details</h2>
                  <p className={styles.stepDesc}>Almost done — where should we send the quote?</p>

                  <div className={styles.fieldGrid}>
                    <div className={styles.field}>
                      <label className={styles.label}>Full Name *</label>
                      <input name="name" value={form.name} onChange={change} required placeholder="Your full name" className="form-input" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={change} required placeholder="your@email.com" className="form-input" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Phone / WhatsApp</label>
                      <input name="phone" value={form.phone} onChange={change} placeholder="+1 234 567 890" className="form-input" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Current Website (if any)</label>
                      <input name="website" value={form.website} onChange={change} placeholder="https://yoursite.com" className="form-input" />
                    </div>
                  </div>

                  <div className={styles.field} style={{ marginTop: 16 }}>
                    <label className={styles.label}>Project Details</label>
                    <textarea
                      name="details"
                      value={form.details}
                      onChange={change}
                      rows={4}
                      placeholder="Tell us more about your project — what do you need, what are your goals, any specific requirements?"
                      className="form-input"
                      style={{ resize: 'vertical', minHeight: 110 }}
                    />
                  </div>

                  {status === 'err' && (
                    <div style={{ padding:'12px 16px', background:'rgba(239,68,68,0.1)', border:'1px solid rgba(239,68,68,0.3)', borderRadius:'var(--r-md)', fontSize:14, color:'var(--c-txt)', marginTop:12 }}>
                      Something went wrong. Please email <a href="mailto:bilal@reicodev.com" style={{ color:'var(--c-p1)' }}>bilal@reicodev.com</a>
                    </div>
                  )}

                  <div className={styles.actions} style={{ marginTop: 24 }}>
                    <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>← Back</button>
                    <button type="submit" disabled={sending} className="btn btn-primary btn-lg">
                      {sending ? 'Sending…' : '🚀 Get My Free Quote'}
                    </button>
                  </div>

                  <p style={{ fontSize:12, color:'var(--c-dim)', textAlign:'center', marginTop:12 }}>
                    🔒 Your details are private and never shared.
                  </p>
                </form>
              )}
            </div>

            {/* Trust bar */}
            <div className={`${styles.trust} reveal`}>
              {[
                { emoji:'⚡', text:'Response within 24 hours' },
                { emoji:'✅', text:'No obligation, free quote' },
                { emoji:'🌍', text:'Clients in 61+ countries' },
                { emoji:'⭐', text:'4.9 / 5 average rating' },
              ].map(t => (
                <div key={t.text} className={styles.trustItem}>
                  <span>{t.emoji}</span>
                  <span>{t.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
