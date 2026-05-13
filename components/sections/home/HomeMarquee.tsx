// HomeMarquee.tsx
'use client';
const ITEMS = ['WordPress Development','WooCommerce Stores','SEO Optimization','Brand Identity','Shopify Stores','Speed Optimization','Custom Plugins','Headless WordPress','UI/UX Design','Performance Audits'];
export default function HomeMarquee() {
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...ITEMS,...ITEMS].map((item,i)=>(
          <span key={i} className="marquee-item">
            <span className="marquee-dot"/>{item}
          </span>
        ))}
      </div>
    </div>
  );
}
