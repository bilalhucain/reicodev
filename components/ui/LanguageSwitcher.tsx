'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { locales, type Locale } from '@/i18n/config';

const LOCALE_META: Record<Locale, { label: string; flag: string }> = {
  fi: {
    label: 'FI',
    flag: '/images/flags/finland-flag.svg',
  },
  en: {
    label: 'EN',
    flag: '/images/flags/US-flag.svg',
  },
  es: {
    label: 'ES',
    flag: '/images/flags/US-flag.svg', // temporary placeholder
  },
};

// Languages visible in switcher
const VISIBLE_LOCALES: Locale[] = ['fi', 'en'];

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', onClickOutside);

    return () => {
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  function switchTo(newLocale: Locale) {
    setOpen(false);

    if (newLocale === locale) return;

    const segments = pathname.split('/');

    if (segments.length > 1) {
      segments[1] = newLocale;
    }

    const newPath = segments.join('/') || `/${newLocale}`;

    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}`;

    router.push(newPath);
  }

  const current =
    LOCALE_META[locale] ||
    LOCALE_META.en;

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        display: 'inline-block',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        type="button"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'none',
          border: 'none',
          color: 'var(--c-txt)',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          padding: '4px 6px',
        }}
      >
        <Image
          src={current.flag}
          alt={current.label}
          width={20}
          height={14}
          style={{
            borderRadius: 2,
            objectFit: 'cover',
          }}
        />

        <span>{current.label}</span>

        <svg
          width="10"
          height="10"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ opacity: 0.6 }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: 8,
            background: 'var(--c-bg2)',
            border: '1px solid var(--c-border)',
            borderRadius: 'var(--r-md)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            zIndex: 50,
            minWidth: 120,
          }}
        >
          {VISIBLE_LOCALES.map((l) => (
            <button
              key={l}
              role="option"
              aria-selected={l === locale}
              onClick={() => switchTo(l)}
              type="button"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                width: '100%',
                padding: '10px 14px',
                background:
                  l === locale
                    ? 'var(--c-bg3)'
                    : 'transparent',
                border: 'none',
                color: 'var(--c-txt)',
                fontSize: 13,
                fontWeight: l === locale ? 700 : 500,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              <Image
                src={LOCALE_META[l].flag}
                alt={LOCALE_META[l].label}
                width={20}
                height={14}
                style={{
                  borderRadius: 2,
                  objectFit: 'cover',
                }}
              />

              <span>{LOCALE_META[l].label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}