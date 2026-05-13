import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — Reicodev',
  description: 'Terms and conditions for Reicodev web development and digital marketing services.',
};

const SECTIONS = [
  { title:'1. Agreement', body:`By engaging Reicodev services, you agree to these Terms. They apply to all clients and visitors of reicodev.com.` },
  { title:'2. Services', body:`Reicodev provides web development, eCommerce, SEO, and branding services. Project scope is defined in a separate proposal agreed before work begins.` },
  { title:'3. Payment Terms', body:`• A 50% deposit is required before work begins\n• Final payment is due before delivery\n• Payments are non-refundable once work has commenced\n• Late payments may pause the project` },
  { title:'4. Revisions & Scope', body:`• Projects include revision rounds as stated in the proposal\n• Additional revisions may incur extra charges\n• Scope changes require a new written agreement` },
  { title:'5. Intellectual Property', body:`• You own all final deliverables upon full payment\n• We retain the right to display work in our portfolio unless you request otherwise in writing\n• Third-party assets remain under their own licences` },
  { title:'6. Warranties & Limitations', body:`• Work is delivered with reasonable skill and care\n• We do not guarantee specific search rankings or revenue figures\n• Liability is limited to the amount paid for the specific service` },
  { title:'7. Confidentiality', body:`Both parties keep confidential any sensitive business information shared during the project. This continues after project completion.` },
  { title:'8. Termination', body:`Either party may terminate with 14 days written notice. Payment is due for all work completed to that date.` },
  { title:'9. Governing Law', body:`These terms are governed by Finnish law. Disputes will be resolved in Finnish courts unless otherwise agreed.` },
  { title:'10. Contact', body:`For questions about these terms:\nbilal@reicodev.com` },
];

export default function TermsPage() {
  return (
    <div style={{ background:'var(--c-bg)', minHeight:'100vh', padding:'80px 0 100px' }}>
      <div className="container" style={{ maxWidth:760 }}>
        <Link href="/" style={{ fontSize:13, color:'var(--c-dim)', textDecoration:'none' }}>← Back to Home</Link>
        <h1 style={{ fontSize:'clamp(28px,5vw,42px)', fontWeight:900, color:'var(--c-txt)', letterSpacing:'-1.5px', margin:'24px 0 8px', lineHeight:1.1 }}>Terms of Service</h1>
        <p style={{ fontSize:14, color:'var(--c-dim)', marginBottom:52 }}>Last updated: May 2026</p>
        {SECTIONS.map(s => (
          <div key={s.title} style={{ marginBottom:40 }}>
            <h2 style={{ fontSize:20, fontWeight:800, color:'var(--c-txt)', marginBottom:12 }}>{s.title}</h2>
            <div style={{ fontSize:14, color:'var(--c-muted)', lineHeight:1.9, whiteSpace:'pre-line' }}>{s.body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
