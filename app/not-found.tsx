import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: '404 — Page Not Found | Reicodev' };

export default function NotFound() {
  return (
    <div style={{ background:'var(--c-bg)', minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center', padding:'60px 20px' }}>
      <div style={{ textAlign:'center', maxWidth:520 }}>
        <div style={{ fontSize:'clamp(80px,15vw,120px)', fontWeight:900, background:'linear-gradient(135deg,var(--c-p1),var(--c-p2))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', lineHeight:1, marginBottom:16 }}>404</div>
        <h1 style={{ fontSize:'clamp(22px,4vw,30px)', fontWeight:800, color:'var(--c-txt)', marginBottom:14, letterSpacing:'-0.8px' }}>Page Not Found</h1>
        <p style={{ fontSize:15, color:'var(--c-muted)', lineHeight:1.75, marginBottom:36 }}>
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>
        <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
          <Link href="/" className="btn btn-primary btn-lg">← Back to Home</Link>
          <Link href="/contact" className="btn btn-ghost btn-lg">Contact Us</Link>
        </div>
        <div style={{ marginTop:48, display:'flex', gap:20, justifyContent:'center', flexWrap:'wrap' }}>
          {[['Our Work','/our-work'],['Services','/services'],['About','/about'],['Get a Quote','/get-a-quote']].map(([label,href]) => (
            <Link key={href} href={href} style={{ fontSize:13, color:'var(--c-p2)', textDecoration:'none', fontWeight:600 }}>{label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
