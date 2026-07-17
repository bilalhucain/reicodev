'use client';
import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { Mail, Clock3, BadgeCheck, FileText, Earth, MessageCircleMore } from 'lucide-react';
import styles from './contact.module.css';

const INFO_META = [
  { icon: Mail,   valueKey: 'email',    href: 'mailto:info@reicodev.com', color: 'var(--c-p1)' },
  { icon: Clock3, valueKey: 'response', href: null,                       color: 'var(--c-amber)' },
];

/* Order matches FAQS below: Website Timeline, Revisions, Information Needed, International Clients */
const FAQ_ICONS = [Clock3, FileText, FileText, Earth];

export default function ContactPageClient() {
  const t = useTranslations('contact');
  const ref = useRef<HTMLDivElement>(null);

  const SERVICES = [
    t('serviceWP'), t('serviceWoo'), t('serviceShopify'), t('serviceBugFix'),
    t('serviceMaintenance'), t('serviceSpeed'), t('serviceSEO'), t('serviceBranding'), t('serviceOther'),
  ];

  const FAQS = [
    { q: t('faq1Question'), a: t('faq1Answer') },
    { q: t('faq2Question'), a: t('faq2Answer') },
    { q: t('faq3Question'), a: t('faq3Answer') },
    { q: t('faq4Question'), a: t('faq4Answer') },
  ];

  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', budget: '', message: '',
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'ok' | 'err'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const section = ref.current;
    const els = section?.querySelectorAll<HTMLElement>('.reveal');
    if (!els) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const obs = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        if (reduced) return;
        const icons = entry.target.querySelectorAll<HTMLElement>('[data-part="icon-wrap"]');
        if (icons.length) {
          gsap.fromTo(
            icons,
            { scale: 0.6, rotate: -10, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 0.5, ease: 'back.out(2)', stagger: 0.06 }
          );
        }
      }),
      { threshold: 0.06 }
    );
    els.forEach(el => obs.observe(el));

    // Subtle continuous float — cheap, GPU-only transform
    let floatTweens: gsap.core.Tween[] = [];
    if (!reduced && section) {
      const icons = section.querySelectorAll<HTMLElement>('[data-part="icon-wrap"]');
      floatTweens = Array.from(icons).map((el, i) =>
        gsap.to(el, {
          y: -3,
          duration: 2.4 + (i % 4) * 0.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: (i % 4) * 0.15,
        })
      );
    }

    return () => {
      obs.disconnect();
      floatTweens.forEach(tw => tw.kill());
    };
  }, []);

  const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const icon = e.currentTarget.querySelector<HTMLElement>('[data-part="icon-wrap"]');
    if (icon) gsap.to(icon, { scale: 1.1, rotate: 6, duration: 0.25, ease: 'power2.out' });
  };
  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const icon = e.currentTarget.querySelector<HTMLElement>('[data-part="icon-wrap"]');
    if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
  };
  const handleBtnEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const icon = e.currentTarget.querySelector<HTMLElement>('[data-part="icon-wrap"]');
    if (icon) gsap.to(icon, { scale: 1.15, rotate: 8, duration: 0.25, ease: 'power2.out' });
  };
  const handleBtnLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const icon = e.currentTarget.querySelector<HTMLElement>('[data-part="icon-wrap"]');
    if (icon) gsap.to(icon, { scale: 1, rotate: 0, duration: 0.3, ease: 'power2.out' });
  };

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
            <span className="pill-dot" />{t('sectionLabel')}
          </div>
          <h1 className={`${styles.h1} reveal`}>
            {t('heroTitle').split(' ').slice(0, -2).join(' ')}<br />
            <span className="sec-accent">{t('heroTitle').split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className={`${styles.desc} reveal`}>{t('heroDescription')}</p>
        </div>
      </section>

      {/* ── MAIN ── */}
      <section className={styles.main}>
        <div className={`container ${styles.grid}`}>

          {/* Left — Info */}
          <div className={styles.info}>
            <h2 className={`${styles.infoTitle} reveal`}>{t('getInTouchHeading')}</h2>
            <p className={`${styles.infoDesc} reveal`}>{t('getInTouchSubtitle')}</p>

            <div className={styles.infoCards}>
              {INFO_META.map((it, i) => {
                const label = it.valueKey === 'email' ? t('emailLabel') : t('responseLabel');
                const value = it.valueKey === 'email' ? 'info@reicodev.com' : t('responseValue');
                const Icon = it.icon;
                return (
                  <div
                    key={it.valueKey}
                    className={`${styles.infoCard} reveal`}
                    style={{ animationDelay: `${i * 0.07}s` }}
                    onMouseEnter={handleCardEnter}
                    onMouseLeave={handleCardLeave}
                  >
                    <div className={styles.infoEmoji} style={{ background: `${it.color}18`, color: it.color }}>
                      <span data-part="icon-wrap" style={{ display: 'inline-flex', willChange: 'transform' }}>
                        <Icon size={20} color={it.color} strokeWidth={2} />
                      </span>
                    </div>
                    <div className={styles.infoContent}>
                      <div className={styles.infoLabel}>{label}</div>
                      {it.href ? (
                        <a href={it.href} className={styles.infoValue} style={{ color: it.color }}>{value}</a>
                      ) : (
                        <span className={styles.infoValue} style={{ color: it.color }}>{value}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Guarantee */}
            <div className={`${styles.guarantee} reveal`}>
              <div className={styles.guaranteeIcon}>
                <span data-part="icon-wrap" style={{ display: 'inline-flex', willChange: 'transform' }}>
                  <BadgeCheck size={22} color="var(--c-green)" strokeWidth={2} />
                </span>
              </div>
              <div>
                <div className={styles.guaranteeTitle}>{t('freeConsultLabel')}</div>
                <div className={styles.guaranteeDesc}>{t('freeConsultDescription')}</div>
              </div>
            </div>

            {/* FAQ */}
            <div className={`${styles.faqWrap} reveal`}>
              <div className={styles.faqTitle}>{t('faqHeading')}</div>
              {FAQS.map((f, i) => {
                const FaqIcon = FAQ_ICONS[i] ?? FileText;
                return (
                  <div key={i} className={styles.faqItem}>
                    <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)} type="button">
                      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span data-part="icon-wrap" style={{ display: 'inline-flex', color: 'var(--c-p1)', willChange: 'transform' }}>
                          <FaqIcon size={16} strokeWidth={2} />
                        </span>
                        {f.q}
                      </span>
                      <svg style={{ transform: openFaq === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s', flexShrink: 0 }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </button>
                    {openFaq === i && <div className={styles.faqA}>{f.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — Form */}
          <div className={`${styles.formWrap} reveal`}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>{t('formHeading')}</h2>
                <p className={styles.formSub}>{t('formSubtitle')}</p>
              </div>

              {status === 'ok' ? (
                <div className={styles.successBox}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>✅</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: 'var(--c-txt)' }}>{t('successTitle')}</h3>
                  <p style={{ color: 'var(--c-muted)', fontSize: 15 }}>{t('successDescription')}</p>
                  <button
                    className="btn btn-primary"
                    style={{ marginTop: 24 }}
                    onClick={() => { setStatus('idle'); setForm({ name:'',email:'',phone:'',service:'',budget:'',message:'' }); }}
                    type="button"
                  >
                    {t('sendAnotherButton')}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className={styles.form}>
                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>{t('fieldNameRequired')}</label>
                      <input name="name" value={form.name} onChange={change} required placeholder={t('fieldName')} className="form-input" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>{t('fieldEmailRequired')}</label>
                      <input name="email" type="email" value={form.email} onChange={change} required placeholder={t('fieldEmail')} className="form-input" />
                    </div>
                  </div>

                  <div className={styles.row2}>
                    <div className={styles.field}>
                      <label className={styles.label}>{t('fieldPhone')}</label>
                      <input name="phone" value={form.phone} onChange={change} placeholder="+1 234 567 890" className="form-input" />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>{t('fieldServiceRequired')}</label>
                      <select name="service" value={form.service} onChange={change} required className="form-input">
                        <option value="">{t('fieldServicePlaceholder')}</option>
                        {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>{t('fieldBudget')}</label>
                    <select name="budget" value={form.budget} onChange={change} className="form-input">
                      <option value="">{t('fieldBudgetPlaceholder')}</option>
                      <option value="Under 300">{t('budget1')}</option>
                      <option value="300–600">{t('budget2')}</option>
                      <option value="600–1,500">{t('budget3')}</option>
                      <option value="1,500–5,000">{t('budget4')}</option>
                      <option value="5,000+">{t('budget5')}</option>
                      <option value="Not sure">{t('budget6')}</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>{t('fieldDetailsRequired')}</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={change}
                      required
                      rows={5}
                      placeholder={t('fieldDetails')}
                      className="form-input"
                      style={{ resize: 'vertical', minHeight: 120 }}
                    />
                  </div>

                  {status === 'err' && (
                    <div className={styles.errBox}>
                      {t('errorMessage')} <a href="mailto:info@reicodev.com" style={{ color: 'var(--c-p1)' }}>info@reicodev.com</a>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="btn btn-primary btn-lg"
                    style={{ width: '100%', justifyContent: 'center', display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    onMouseEnter={handleBtnEnter}
                    onMouseLeave={handleBtnLeave}
                  >
                    <span data-part="icon-wrap" style={{ display: 'inline-flex', willChange: 'transform' }}>
                      <MessageCircleMore size={18} strokeWidth={2} />
                    </span>
                    {sending ? t('sendingButton') : t('submitButton')}
                  </button>

                  <p className={styles.formNote}>🔒 {t('privacyNote')}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
