import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy — Reicodev',
  description: 'Learn about the cookies Reicodev uses and how to manage your cookie preferences.',
};

const SECTIONS = [
  { title:'What Are Cookies?', body:`Cookies are small text files placed on your device when you visit a website. They help websites work, remember preferences, and provide information to site owners.` },
  { title:'Cookies We Use', body:`🔒 Necessary (always active)\n• rdv-theme — remembers dark/light mode preference\n• rdv-cookie-consent — remembers your cookie choices\n• Session cookies — basic site functionality\n\n📊 Analytics (optional — requires consent)\n• Google Analytics: _ga, _gid, _gat\n• Duration: up to 2 years\n• Purpose: understanding how visitors use our site\n\n📣 Marketing (optional — currently not active)` },
  { title:'Managing Cookies', body:`You can manage preferences at any time:\n\n• Use the cookie banner when you first visit\n• Clear cookies in your browser settings\n\nDisabling necessary cookies may break some site functionality.` },
  { title:'Browser Settings', body:`• Chrome: Settings → Privacy and Security → Cookies\n• Firefox: Settings → Privacy & Security\n• Safari: Preferences → Privacy\n• Edge: Settings → Cookies and Site Permissions` },
  { title:'Third-Party Cookies', body:`Google Analytics cookies are set by Google. See: policies.google.com/privacy` },
];

export default function CookiePolicyPage() {
  return (
    <div style={{ background:'var(--c-bg)', minHeight:'100vh', padding:'80px 0 100px' }}>
      <div className="container" style={{ maxWidth:760 }}>
        <Link href="/" style={{ fontSize:13, color:'var(--c-dim)', textDecoration:'none' }}>← Back to Home</Link>
        <h1 style={{ fontSize:'clamp(28px,5vw,42px)', fontWeight:900, color:'var(--c-txt)', letterSpacing:'-1.5px', margin:'24px 0 8px', lineHeight:1.1 }}>Cookie Policy</h1>
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
