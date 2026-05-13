export default function Loading() {
  return (
    <div style={{ minHeight:'60vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--c-bg)' }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
        <div style={{ width:40, height:40, border:'3px solid var(--c-bdr)', borderTopColor:'var(--c-p1)', borderRadius:'50%', animation:'spin 0.8s linear infinite' }}/>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <span style={{ fontSize:13, color:'var(--c-dim)', fontWeight:600 }}>Loading…</span>
      </div>
    </div>
  );
}
