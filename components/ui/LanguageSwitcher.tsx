'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale   = useLocale();
  const router   = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    // pathname is e.g. /fi/palvelut or /en/services
    // replace the first segment (locale) with the new one
    const segments  = pathname.split('/');
    segments[1]     = newLocale;
    router.push(segments.join('/'));
  };

  const langs = [
    { code: 'fi', label: 'FI' },
    { code: 'en', label: 'EN' },
    // { code: 'es', label: 'ES' }, // uncomment when Spanish is ready
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: 600 }}>
      {langs.map((lang, index) => (
        <span key={lang.code} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <button
            onClick={() => switchLocale(lang.code)}
            style={{
              background:    'none',
              border:        'none',
              cursor:        'pointer',
              padding:       '2px 4px',
              color:         locale === lang.code ? '#ffffff' : '#9ca3af',
              fontWeight:    locale === lang.code ? 700 : 500,
              textDecoration: locale === lang.code ? 'underline' : 'none',
              textUnderlineOffset: '3px',
              transition:    'color 0.2s',
              fontSize:      '13px',
            }}
            aria-label={`Switch to ${lang.label}`}
          >
            {lang.label}
          </button>
          {index < langs.length - 1 && (
            <span style={{ color: '#4b5563' }}>|</span>
          )}
        </span>
      ))}
    </div>
  );
}
