import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy — Reicodev',
  description: 'Learn how Reicodev collects, uses and protects your personal data in compliance with GDPR.',
};

const SECTIONS = [
  { title:'1. Who We Are', body:`Reicodev is a web development and digital marketing service operated by Bilal Hussain. We provide WordPress, WooCommerce, Shopify, SEO and branding services to clients worldwide.\n\nContact: bilal@reicodev.com` },
  { title:'2. What Data We Collect', body:`We collect the following personal data:\n\n• Name and email address (via contact and quote forms)\n• Phone number (if provided voluntarily)\n• Project details and budget information\n• IP address and browser type (automatically, via analytics)\n• Cookie and usage data (see our Cookie Policy)` },
  { title:'3. How We Use Your Data', body:`We use your data to:\n\n• Respond to enquiries and provide our services\n• Send project updates and communications\n• Improve our website and user experience\n• Comply with legal obligations\n\nWe do not sell or share your data with third parties for marketing purposes.` },
  { title:'4. Legal Basis (GDPR)', body:`We process your data on these legal bases:\n\n• Contractual necessity — to fulfil our service agreement\n• Legitimate interests — to respond to enquiries\n• Consent — for marketing and non-essential cookies\n• Legal obligation — where required by law` },
  { title:'5. Data Retention', body:`• Contact form data: up to 2 years\n• Client project data: up to 5 years\n• Analytics data: up to 26 months\n\nYou may request deletion at any time.` },
  { title:'6. Your Rights Under GDPR', body:`You have the right to:\n\n• Access your personal data\n• Correct inaccurate data\n• Request deletion ("right to be forgotten")\n• Restrict processing\n• Data portability\n• Object to processing\n• Withdraw consent at any time\n\nContact bilal@reicodev.com to exercise any right. We respond within 30 days.` },
  { title:'7. Cookies', body:`We use cookies to improve your experience. See our Cookie Policy for details.` },
  { title:'8. Security', body:`We take appropriate technical measures to protect your data. No method of internet transmission is 100% secure.` },
  { title:'9. Complaints', body:`If you are in the EU/EEA and unsatisfied with our response, you may contact your local data protection authority. In Finland: tietosuoja.fi (Office of the Data Protection Ombudsman).` },
  { title:'10. Changes', body:`We may update this policy periodically. The date at the top reflects the latest revision.` },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ background:'var(--c-bg)', minHeight:'100vh', padding:'80px 0 100px' }}>
      <div className="container" style={{ maxWidth:760 }}>
        <Link href="/" style={{ fontSize:13, color:'var(--c-dim)', textDecoration:'none' }}>← Back to Home</Link>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(108,75,255,0.1)', border:'1px solid rgba(108,75,255,0.2)', borderRadius:'var(--r-pill)', padding:'4px 14px', fontSize:11, fontWeight:700, color:'var(--c-p2)', letterSpacing:'1px', textTransform:'uppercase', margin:'20px 0 16px', width:'fit-content' }}>
          GDPR Compliant
        </div>
        <h1 style={{ fontSize:'clamp(28px,5vw,42px)', fontWeight:900, color:'var(--c-txt)', letterSpacing:'-1.5px', margin:'0 0 8px', lineHeight:1.1 }}>Privacy Policy</h1>
        <p style={{ fontSize:14, color:'var(--c-dim)', marginBottom:52 }}>Last updated: May 2026</p>
        {SECTIONS.map(s => (
          <div key={s.title} style={{ marginBottom:40 }}>
            <h2 style={{ fontSize:20, fontWeight:800, color:'var(--c-txt)', marginBottom:12 }}>{s.title}</h2>
            <div style={{ fontSize:14, color:'var(--c-muted)', lineHeight:1.9, whiteSpace:'pre-line' }}>{s.body}</div>
          </div>
        ))}
        <div style={{ marginTop:56, padding:'28px 32px', background:'var(--c-bg2)', border:'1px solid var(--c-bdr)', borderRadius:'var(--r-xl)' }}>
          <p style={{ fontSize:14, color:'var(--c-muted)', margin:'0 0 16px' }}>Questions about your data?</p>
          <Link href="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
