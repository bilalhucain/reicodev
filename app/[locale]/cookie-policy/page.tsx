import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('cookieTitle'),
    description: t('cookieDesc'),
    alternates: { canonical: `https://reicodev.com/${locale}/cookie-policy` },
  };
}

const CONTENT = {
  fi: {
    title: 'Evästekäytäntö',
    updated: 'Päivitetty viimeksi: 20. kesäkuuta 2026',
    intro: 'Tämä evästekäytäntö selittää, miten Reicodev käyttää evästeitä ja vastaavia teknologioita verkkosivustollaan (reicodev.com). Käytämme evästeitä parantaaksemme verkkosivuston toimivuutta, analysoidaksemme liikennettä ja tarjotaksemme sinulle paremman käyttökokemuksen.',
    sections: [
      {
        heading: '1. Mitä evästeet ovat?',
        body: 'Evästeet ovat pieniä tekstitiedostoja, jotka tallennetaan laitteellesi, kun vierailet verkkosivustolla. Ne auttavat verkkosivustoa muistamaan tietoja vierailustasi, kuten kieliasetuksesi ja muut asetukset.',
      },
      {
        heading: '2. Käyttämämme evästeet',
        body: '',
        table: [
          { name: 'Välttämättömät evästeet', purpose: 'Varmistavat verkkosivuston perustoiminnot. Ilman niitä sivusto ei toimi kunnolla.', duration: 'Istunto / 1 vuosi', basis: 'Oikeutettu etu' },
          { name: 'Analytiikkaevästeet (Google Analytics)', purpose: 'Keräävät anonymisoitua tietoa siitä, miten kävijät käyttävät sivustoa. Auttavat meitä parantamaan sivustoa.', duration: '26 kuukautta', basis: 'Suostumus' },
          { name: 'Toiminnalliset evästeet', purpose: 'Muistavat valintasi (esim. kieliasetukset) parantaaksemme käyttökokemustasi.', duration: '1 vuosi', basis: 'Suostumus' },
        ],
      },
      {
        heading: '3. Google Analytics',
        body: 'Käytämme Google Analytics -palvelua verkkosivustomme liikenteen analysointiin. Google Analytics käyttää evästeitä anonymisoitujen tietojen keräämiseen kävijöistä. Tiedot siirretään Googlen palvelimille, jotka voivat sijaita Yhdysvalloissa. Olemme ottaneet käyttöön IP-anonymisoinnin. Voit kieltäytyä Google Analytics -seurannasta osoitteessa: tools.google.com/dlpage/gaoptout',
      },
      {
        heading: '4. Evästeiden hallinta',
        body: 'Voit hallita ja poistaa evästeitä selaimesi asetuksista. Huomaa, että evästeiden poistaminen käytöstä voi vaikuttaa verkkosivuston toiminnallisuuteen.\n\nSelainkohtaiset ohjeet:\n• Chrome: Asetukset → Tietosuoja ja turvallisuus → Evästeet\n• Firefox: Asetukset → Tietosuoja & turvallisuus → Evästeet\n• Safari: Asetukset → Tietosuoja → Evästeet\n• Edge: Asetukset → Tietosuoja, haku ja palvelut → Evästeet',
      },
      {
        heading: '5. Suostumus',
        body: 'EU:n tietosuoja-asetuksen (GDPR) ja sähköisen viestinnän direktiivin mukaisesti pyydämme suostumuksesi ei-välttämättömien evästeiden käyttöön ensimmäisellä vierailullasi. Voit peruuttaa suostumuksesi milloin tahansa selaimen asetuksista.',
      },
      {
        heading: '6. Muutokset tähän käytäntöön',
        body: 'Saatamme päivittää tätä evästekäytäntöä ajoittain. Ilmoitamme merkittävistä muutoksista verkkosivustollamme.',
      },
      {
        heading: '7. Yhteystiedot',
        body: 'Evästeitä koskevissa kysymyksissä ota yhteyttä: info@reicodev.com',
      },
    ],
  },
  en: {
    title: 'Cookie Policy',
    updated: 'Last updated: 20 June 2026',
    intro: 'This Cookie Policy explains how Reicodev uses cookies and similar technologies on its website (reicodev.com). We use cookies to improve the website\'s functionality, analyse traffic and provide you with a better user experience.',
    sections: [
      {
        heading: '1. What are cookies?',
        body: 'Cookies are small text files stored on your device when you visit a website. They help the website remember information about your visit, such as your language preference and other settings.',
      },
      {
        heading: '2. Cookies we use',
        body: '',
        table: [
          { name: 'Strictly necessary cookies', purpose: 'Enable core website functions. The website cannot work properly without them.', duration: 'Session / 1 year', basis: 'Legitimate interest' },
          { name: 'Analytics cookies (Google Analytics)', purpose: 'Collect anonymised data about how visitors use the website. Help us improve the site.', duration: '26 months', basis: 'Consent' },
          { name: 'Functional cookies', purpose: 'Remember your preferences (e.g. language settings) to improve your experience.', duration: '1 year', basis: 'Consent' },
        ],
      },
      {
        heading: '3. Google Analytics',
        body: 'We use Google Analytics to analyse website traffic. Google Analytics uses cookies to collect anonymised visitor data. Data is transferred to Google servers, which may be located in the United States. We have enabled IP anonymisation. You can opt out of Google Analytics tracking at: tools.google.com/dlpage/gaoptout',
      },
      {
        heading: '4. Managing cookies',
        body: 'You can manage and delete cookies through your browser settings. Please note that disabling cookies may affect website functionality.\n\nBrowser-specific instructions:\n• Chrome: Settings → Privacy and security → Cookies\n• Firefox: Preferences → Privacy & Security → Cookies\n• Safari: Preferences → Privacy → Cookies\n• Edge: Settings → Privacy, search and services → Cookies',
      },
      {
        heading: '5. Consent',
        body: 'In accordance with GDPR and the ePrivacy Directive, we request your consent for non-essential cookies on your first visit. You can withdraw your consent at any time through your browser settings.',
      },
      {
        heading: '6. Changes to this policy',
        body: 'We may update this Cookie Policy periodically. We will notify you of significant changes on our website.',
      },
      {
        heading: '7. Contact',
        body: 'For cookie-related questions, contact: info@reicodev.com',
      },
    ],
  },
};

export default async function CookiePolicyPage({ params }: Props) {
  const { locale } = await params;
  const c = CONTENT[locale as 'fi' | 'en'] ?? CONTENT.en;

  return (
    <main style={{ paddingTop: 120, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div className="eyebrow" style={{ justifyContent: 'flex-start', marginBottom: 16 }}>
            <span className="eyebrow-line" />
            {locale === 'fi' ? 'Tietosuoja' : 'Legal'}
          </div>
          <h1 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 900, color: 'var(--c-txt)', letterSpacing: '-1px', marginBottom: 12 }}>
            {c.title}
          </h1>
          <p style={{ fontSize: 14, color: 'var(--c-dim)' }}>{c.updated}</p>
          <div style={{ width: 48, height: 3, background: 'var(--c-p1)', borderRadius: 2, marginTop: 20 }} />
        </div>

        <p style={{ fontSize: 14, color: 'var(--c-muted)', lineHeight: 1.8, marginBottom: 48 }}>{c.intro}</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {c.sections.map((s) => (
            <section key={s.heading}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--c-txt)', marginBottom: 12 }}>{s.heading}</h2>
              {s.body && (
                <div style={{ fontSize: 14, color: 'var(--c-muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{s.body}</div>
              )}
              {'table' in s && s.table && (
                <div style={{ overflowX: 'auto', marginTop: 16 }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                    <thead>
                      <tr style={{ background: 'var(--c-bg2)' }}>
                        {[locale === 'fi' ? 'Eväste' : 'Cookie',
                          locale === 'fi' ? 'Tarkoitus' : 'Purpose',
                          locale === 'fi' ? 'Kesto' : 'Duration',
                          locale === 'fi' ? 'Oikeusperuste' : 'Legal basis'].map(h => (
                          <th key={h} style={{ padding: '10px 14px', textAlign: 'left', color: 'var(--c-txt)', fontWeight: 700, borderBottom: '1px solid var(--c-border)' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {s.table.map((row, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--c-border)' }}>
                          <td style={{ padding: '10px 14px', color: 'var(--c-txt)', fontWeight: 600, verticalAlign: 'top' }}>{row.name}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--c-muted)', verticalAlign: 'top' }}>{row.purpose}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--c-muted)', verticalAlign: 'top', whiteSpace: 'nowrap' }}>{row.duration}</td>
                          <td style={{ padding: '10px 14px', color: 'var(--c-muted)', verticalAlign: 'top' }}>{row.basis}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        <div style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid var(--c-border)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href={`/${locale}/privacy-policy`} style={{ fontSize: 13, color: 'var(--c-p1)' }}>
            {locale === 'fi' ? '→ Tietosuojakäytäntö' : '→ Privacy Policy'}
          </Link>
          <Link href={`/${locale}/terms-of-service`} style={{ fontSize: 13, color: 'var(--c-p1)' }}>
            {locale === 'fi' ? '→ Käyttöehdot' : '→ Terms of Service'}
          </Link>
          <Link href={`/${locale}`} style={{ fontSize: 13, color: 'var(--c-dim)' }}>
            {locale === 'fi' ? '← Etusivulle' : '← Back to Home'}
          </Link>
        </div>
      </div>
    </main>
  );
}
