import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('privacyTitle'),
    description: t('privacyDesc'),
    alternates: { canonical: `https://reicodev.com/${locale}/privacy-policy` },
  };
}

const CONTENT = {
  fi: {
    title: 'Tietosuojakäytäntö',
    updated: 'Päivitetty viimeksi: 20. kesäkuuta 2026',
    controller: 'Rekisterinpitäjä',
    sections: [
      {
        heading: '1. Rekisterinpitäjä',
        body: `Reicodev (jäljempänä "me", "meillä" tai "Reicodev") toimii tämän verkkosivuston rekisterinpitäjänä.\n\nYhteystiedot: info@reicodev.com`,
      },
      {
        heading: '2. Kerättävät henkilötiedot',
        body: `Keräämme seuraavia henkilötietoja, kun käytät verkkosivustoamme tai otat meihin yhteyttä:\n\n• Nimi ja sähköpostiosoite (yhteydenottolomake ja tarjouspyyntö)\n• Puhelinnumero / WhatsApp (valinnainen)\n• Projektin tiedot ja budjetti\n• IP-osoite ja selaustiedot (analytiikka)\n• Evästetiedot (ks. evästekäytäntömme)`,
      },
      {
        heading: '3. Tietojen käyttötarkoitus ja oikeusperuste',
        body: `Käsittelemme henkilötietojasi seuraaviin tarkoituksiin:\n\n• Tiedusteluihin ja tarjouspyyntöihin vastaaminen — oikeusperuste: sopimuksen täytäntöönpano (GDPR art. 6(1)(b))\n• Palveluidemme toimittaminen — oikeusperuste: sopimuksen täytäntöönpano (GDPR art. 6(1)(b))\n• Verkkosivuston analytiikka ja parantaminen — oikeusperuste: oikeutettu etu (GDPR art. 6(1)(f))\n• Lakisääteisten velvoitteiden täyttäminen — oikeusperuste: lakisääteinen velvoite (GDPR art. 6(1)(c))`,
      },
      {
        heading: '4. Tietojen säilytysaika',
        body: `Säilytämme henkilötietojasi seuraavasti:\n\n• Yhteydenottolomakkeen tiedot: 2 vuotta viimeisestä yhteydenotosta\n• Asiakastiedot: 5 vuotta palvelusuhteen päättymisestä (kirjanpitovelvoite)\n• Analytiikkatiedot: 26 kuukautta (Google Analytics -asetus)\n\nTietojen säilytysajan päätyttyä tiedot poistetaan tai anonymisoidaan.`,
      },
      {
        heading: '5. Tietojen jakaminen',
        body: `Emme myy, vuokraa tai jaa henkilötietojasi kolmansille osapuolille kaupallisiin tarkoituksiin. Saatamme jakaa tietoja:\n\n• Palveluntarjoajille, kuten hostingpalvelut (Vercel), sähköpostipalvelut ja analytiikkapalvelut — yksinomaan palvelun toimittamiseksi\n• Viranomaistoimiin vastaamiseksi lain edellyttämällä tavalla\n\nKaikki kolmannet osapuolet on velvoitettu käsittelemään tietojasi turvallisesti ja luottamuksellisesti.`,
      },
      {
        heading: '6. Kansainväliset siirrot',
        body: `Jotkut palveluntarjoajamme voivat sijaita EU:n ja ETA:n ulkopuolella. Tällaisissa tapauksissa varmistamme tietosuojan asianmukaisin suojakeinoin, kuten EU:n vakiosopimuslausekkeilla (SCC).`,
      },
      {
        heading: '7. Rekisteröidyn oikeudet (GDPR)',
        body: `Sinulla on seuraavat oikeudet henkilötietojesi suhteen:\n\n• Oikeus saada pääsy tietoihin (art. 15)\n• Oikeus tietojen oikaisemiseen (art. 16)\n• Oikeus tietojen poistamiseen ("oikeus tulla unohdetuksi") (art. 17)\n• Oikeus käsittelyn rajoittamiseen (art. 18)\n• Oikeus siirtää tiedot järjestelmästä toiseen (art. 20)\n• Oikeus vastustaa käsittelyä (art. 21)\n\nVoit käyttää oikeuksiasi ottamalla yhteyttä: info@reicodev.com\n\nSinulla on myös oikeus tehdä valitus valvontaviranomaiselle. Suomessa tämä on Tietosuojavaltuutetun toimisto (tietosuoja.fi).`,
      },
      {
        heading: '8. Tietoturva',
        body: `Suojaamme henkilötietojasi asianmukaisin teknisin ja organisatorisin toimin, kuten SSL-salaus, palomuurit ja pääsynhallinta. Vaikka pyrimme suojaamaan tietojasi parhaalla mahdollisella tavalla, mikään internetin kautta tapahtuva tiedonsiirto ei ole täysin turvallista.`,
      },
      {
        heading: '9. Muutokset tietosuojakäytäntöön',
        body: `Pidätämme oikeuden päivittää tätä tietosuojakäytäntöä. Merkittävistä muutoksista ilmoitamme verkkosivustollamme. Suosittelemme tarkistamaan tämän sivun säännöllisesti.`,
      },
      {
        heading: '10. Yhteystiedot',
        body: `Tietosuojaa koskevissa kysymyksissä ota yhteyttä:\n\nSähköposti: info@reicodev.com\nVastaamisaika: 30 päivän kuluessa pyynnön vastaanottamisesta (GDPR:n mukainen).`,
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated: 20 June 2026',
    sections: [
      {
        heading: '1. Data Controller',
        body: `Reicodev ("we", "us" or "Reicodev") is the data controller for this website.\n\nContact: info@reicodev.com`,
      },
      {
        heading: '2. Personal Data We Collect',
        body: `We collect the following personal data when you use our website or contact us:\n\n• Name and email address (contact form and quote requests)\n• Phone number / WhatsApp (optional)\n• Project details and budget\n• IP address and browsing data (analytics)\n• Cookie data (see our Cookie Policy)`,
      },
      {
        heading: '3. Purpose and Legal Basis for Processing',
        body: `We process your personal data for the following purposes:\n\n• Responding to enquiries and quote requests — legal basis: performance of a contract (GDPR Art. 6(1)(b))\n• Delivering our services — legal basis: performance of a contract (GDPR Art. 6(1)(b))\n• Website analytics and improvement — legal basis: legitimate interests (GDPR Art. 6(1)(f))\n• Compliance with legal obligations — legal basis: legal obligation (GDPR Art. 6(1)(c))`,
      },
      {
        heading: '4. Data Retention',
        body: `We retain your personal data as follows:\n\n• Contact form data: 2 years from last contact\n• Client data: 5 years after end of service relationship (accounting obligations)\n• Analytics data: 26 months (Google Analytics default)\n\nAfter the retention period, data is deleted or anonymised.`,
      },
      {
        heading: '5. Data Sharing',
        body: `We do not sell, rent or share your personal data with third parties for commercial purposes. We may share data with:\n\n• Service providers such as hosting (Vercel), email and analytics — solely for service delivery\n• Authorities as required by law\n\nAll third parties are bound to handle your data securely and confidentially.`,
      },
      {
        heading: '6. International Transfers',
        body: `Some of our service providers may be located outside the EU/EEA. In such cases we ensure appropriate safeguards, such as EU Standard Contractual Clauses (SCCs).`,
      },
      {
        heading: '7. Your Rights (GDPR)',
        body: `You have the following rights regarding your personal data:\n\n• Right of access (Art. 15)\n• Right to rectification (Art. 16)\n• Right to erasure ("right to be forgotten") (Art. 17)\n• Right to restriction of processing (Art. 18)\n• Right to data portability (Art. 20)\n• Right to object to processing (Art. 21)\n\nTo exercise your rights, contact: info@reicodev.com\n\nYou also have the right to lodge a complaint with a supervisory authority. In Finland: Tietosuojavaltuutetun toimisto (tietosuoja.fi). In your country: your national data protection authority.`,
      },
      {
        heading: '8. Security',
        body: `We protect your personal data with appropriate technical and organisational measures including SSL encryption, firewalls and access controls. While we take every precaution, no internet transmission is completely secure.`,
      },
      {
        heading: '9. Changes to This Policy',
        body: `We reserve the right to update this Privacy Policy. We will notify you of significant changes on our website. We recommend reviewing this page periodically.`,
      },
      {
        heading: '10. Contact',
        body: `For privacy-related questions, contact:\n\nEmail: info@reicodev.com\nResponse time: within 30 days of receiving your request (as required by GDPR).`,
      },
    ],
  },
};

export default async function PrivacyPolicyPage({ params }: Props) {
  const { locale } = await params;
  const c = CONTENT[locale as 'fi' | 'en'] ?? CONTENT.en;

  return (
    <main style={{ paddingTop: 120, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
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

        {/* GDPR badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '14px 20px',
          background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)',
          borderRadius: 'var(--r-lg)', marginBottom: 48,
        }}>
          <span style={{ fontSize: 20 }}>🛡️</span>
          <p style={{ fontSize: 13, color: 'var(--c-txt)', margin: 0 }}>
            {locale === 'fi'
              ? 'Tämä tietosuojakäytäntö on laadittu EU:n yleisen tietosuoja-asetuksen (GDPR) 2016/679 mukaisesti.'
              : 'This Privacy Policy is prepared in accordance with EU General Data Protection Regulation (GDPR) 2016/679.'}
          </p>
        </div>

        {/* Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {c.sections.map((s) => (
            <section key={s.heading}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--c-txt)', marginBottom: 12 }}>{s.heading}</h2>
              <div style={{ fontSize: 14, color: 'var(--c-muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                {s.body}
              </div>
            </section>
          ))}
        </div>

        {/* Back links */}
        <div style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid var(--c-border)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href={`/${locale}/cookie-policy`} style={{ fontSize: 13, color: 'var(--c-p1)' }}>
            {locale === 'fi' ? '→ Evästekäytäntö' : '→ Cookie Policy'}
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
