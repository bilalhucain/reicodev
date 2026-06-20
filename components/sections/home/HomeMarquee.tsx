'use client';
import { useTranslations } from 'next-intl';

export default function HomeMarquee() {
  const t = useTranslations('home');
  // Comma-separated list in JSON: "WordPress Development,WooCommerce Stores,..."
  const items = t('marqueeItems').split(',').map(s => s.trim());

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="marquee-item">
            <span className="marquee-dot" />{item}
          </span>
        ))}
      </div>
    </div>
  );
}
