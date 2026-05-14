'use client';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import styles from './contact.module.css';

const SERVICES = [
  'WordPress Website',
  'WooCommerce Store',
  'Shopify Store',
  'WordPress Bug Fix',
  'WordPress Maintenance',
  'Speed Optimisation',
  'SEO Campaign',
  'Brand Identity',
  'Other / Not Sure',
];

const INFO = [
  {
    emoji: '📧',
    label: 'Email Us',
    value: 'info@reicodev.com',
    href: 'mailto:info@reicodev.com',
    color: 'var(--c-p1)',
  },
  {
    emoji: '🕐',
    label: 'Response Time',
    value: 'Within 24 hours',
    href: null,
    color: 'var(--c-amber)',
  },
];

const FAQS = [
  { q: 'How long does a website take?', a: 'Most WordPress websites are delivered in 1–3 weeks depending on complexity. WooCommerce stores typically take 2–4 weeks.' },
  { q: 'Do you offer revisions?', a: 'Yes — all projects include revision rounds until you are 100% satisfied with the result.' },
  { q: 'What information do I need to provide?', a: 'Just your business details, goals, any branding (or we can create it), and reference sites you like. We handle the rest.' },
  { q: 'Do you work with international clients?', a: 'Absolutely — we work with clients in 61+ countries and are comfortable across all time zones.' },
];

export default function ContactPageClient() {
  const ref = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', budget: '', message: '',
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'ok' : 'err');
    } catch {
      setStatus('err');
    } finally {
      setSending(false);
    }
  }

  return (
    <div ref={ref}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.orb} aria-hidden />
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div className="pill reveal" style={{ display: 'inline-flex', marginBottom: 20 }}>
            <span className="pill-dot" />Let&apos;s Talk
          </div>
          <h1 className={`${styles.h1} reveal`}>
            Tell Us About<br />
            <span className="sec-accent">Your Project</span>
          </h1>
          <p className={`${styles.desc} reveal`}>
            Whether you have a detailed brief or just an idea — reach out. We&apos;ll respond within 24 hours with a clear plan.
          </p>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section className={styles.main}>
        <div className={`container ${styles.grid}`}>

          {/* Left — Info */}
          <div className={styles.info}>
            <h2 className={`${styles.infoTitle} reveal`}>Get in Touch</h2>
            <p className={`${styles.infoDesc} reveal`}>
              Prefer to reach out directly? Use any of the channels below.
            </p>

            <div className={styles.infoCards}>
              {INFO.map((it, i) => (
                <div key={it.label} className={`${styles.infoCard} reveal`} style={{ animationDelay: `${i * 0.07}s` }}>
                  <div className={styles.infoEmoji} style={{ background: `${it.color}18`, color: it.color }}>
                    {it.emoji}
                  </div>
                  <div className={styles.infoContent}>
                    <div className={styles.infoLabel}>{it.label}</div>
                    {it.href ? (
                      <a href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer" className={styles.infoValue} style={{ color: it.color }}>
                        {it.value}
                      </a>
                    ) : (
                      <span className={styles.infoValue} style={{ color: it.color }}>{it.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Guarantee */}
            <div className={`${styles.guarantee} reveal`}>
              <div className={styles.guaranteeIcon}>✅</div>
              <div>
                <div className={styles.guaranteeTitle}>Free Consultation Included</div>
                <div className={styles.guaranteeDesc}>Every enquiry gets a detailed response — no obligations, no sales pressure.</div>
              </div>
            </div>

            {/* FAQ */}
            <div className={`${styles.faqWrap} reveal`}>
              <div className={styles.faqTitle}>Frequently Asked Questions</div>
              {FAQS.map((f, i) => (
                <div key={i} className={styles.faqItem}>
                  <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                    {f.q}
                    <svg style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  {openFaq === i && <div className={styles.faqA}>{f.a}</div>}
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className={`${styles.formWrap} reveal`}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Send a Message</h2>
                <p className={styles.formSub}>We&apos;ll get back to you within 24 hours.</p>
              </div>

              {status === 'ok' ? (
                <div className={styles.successBox}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: 'var(--c-txt)' }}>Message Received!</h3>
                  <p style={{ color: 'var(--c-muted)', fontSize: 15 }}>
                    Thank you for reaching out. I&apos;ll review your project and reply within 24 hours.
                  </p>
                  <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => { setStatus('idle'); setForm({ name:'',email:'',phone:'',service:'',budget:'',message:'' }); }}>
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className={styles.form}>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Full Name *</label>
                      <input name="name" value={form.name} onChange={change} required placeholder="Your full name" className="form-input" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Email Address *</label>
                      <input name="email" type="email" value={form.email} onChange={change} required placeholder="your@email.com" className="form-input" />
                    </div>
                  </div>

                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>Phone / WhatsApp</label>
                      <input name="phone" value={form.phone} onChange={change} placeholder="+1 234 567 890" className="form-input" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Service Needed *</label>
                      <select name="service" value={form.service} onChange={change} required className="form-input">
                        <option value="">Select a service…</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Estimated Budget</label>
                    <select name="budget" value={form.budget} onChange={change} className="form-input">
                      <option value="">Select a budget range…</option>
                      <option value="Under 300">Under €300</option>
                      <option value="300–600">€300 - €600</option>
                      <option value="600–1,500">€600 - €1,500</option>
                      <option value="1,500–5,000">€1,500 - €5,000</option>
                      <option value="5,000+">€5,000+</option>
                      <option value="Not sure">Not sure yet</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Project Details *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={change}
                      required
                      rows={5}
                      placeholder="Tell us about your project, goals, timeline, and anything else that's relevant…"
                      className="form-input"
                      style={{ resize: 'vertical', minHeight: 120 }}
                    />
                  </div>

                  {status === 'err' && (
                    <div className={styles.errBox}>
                      Something went wrong. Please email us directly at <a href="mailto:info@reicodev.com" style={{ color: 'var(--c-p1)' }}>info@reicodev.com</a>
                    </div>
                  )}

                  <button type="submit" disabled={sending} className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
                    {sending ? 'Sending…' : 'Send Message →'}
                  </button>

                  <p className={styles.formNote}>
                    🔒 Your details are kept private and never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
