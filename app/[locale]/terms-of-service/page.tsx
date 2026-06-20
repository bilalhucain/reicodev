import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('termsTitle'),
    description: t('termsDesc'),
    alternates: { canonical: `https://reicodev.com/${locale}/terms-of-service` },
  };
}

const CONTENT = {
  fi: {
    title: 'Käyttöehdot',
    updated: 'Päivitetty viimeksi: 20. kesäkuuta 2026',
    intro: 'Nämä käyttöehdot koskevat Reicodev-verkkosivuston (reicodev.com) ja palveluiden käyttöä. Käyttämällä verkkosivustoamme hyväksyt nämä ehdot. Jos et hyväksy ehtoja, älä käytä verkkosivustoa.',
    sections: [
      {
        heading: '1. Palveluntarjoaja',
        body: 'Palveluntarjoaja on Reicodev (Bilal Hussain). Yhteystiedot: info@reicodev.com',
      },
      {
        heading: '2. Palvelut',
        body: 'Reicodev tarjoaa seuraavia digitaalisia palveluja:\n\n• WordPress-verkkosivujen kehitys\n• WooCommerce-verkkokauppojen kehitys\n• Shopify-kauppojen kehitys\n• SEO-optimointi\n• Brändi-identiteetin suunnittelu\n• Verkkosivustojen ylläpito ja nopeusoptimointi\n\nYksityiskohtaiset palveluehdot sovitaan erikseen kunkin projektin sopimuksessa.',
      },
      {
        heading: '3. Sopimuksen syntyminen',
        body: 'Sopimus syntyy, kun:\n\n• Asiakas hyväksyy tarjouksen kirjallisesti (sähköposti tai viesti)\n• Asiakas suorittaa ensimmäisen maksun tai ennakkomaksun\n\nKaikki sopimukset ovat kirjallisia. Suullisilla sopimuksilla ei ole sitovuutta.',
      },
      {
        heading: '4. Maksu ja hinnoittelu',
        body: 'Maksuehdot:\n\n• Ennakkomaksu (tyypillisesti 50%) vaaditaan ennen projektin aloittamista\n• Loppumaksu suoritetaan projektin valmistumisen jälkeen\n• Hinnat sovitaan tarjouksessa ja ovat sidottuja projektin laajuuteen\n• Ylimääräisistä töistä (scope creep) sovitaan erikseen\n\nHyväksytyt maksutavat: PayPal, Wise, pankkisiirto.',
      },
      {
        heading: '5. Toimitus ja aikataulu',
        body: 'Toimitusajat sovitaan tarjouksessa. Aikataulut ovat arvioita ja voivat muuttua, jos:\n\n• Asiakas ei toimita tarvittavia materiaaleja ajoissa\n• Projektin laajuus muuttuu asiakkaan pyynnöstä\n• Odottamattomat tekniset ongelmat ilmenevät\n\nIlmoitamme viivästyksistä etukäteen.',
      },
      {
        heading: '6. Muutokset ja revisiot',
        body: 'Jokaiseen projektiin sisältyy sovittu määrä revisioita (mainittu tarjouksessa). Ylimääräiset revisiot tai muutokset, jotka ylittävät sovitun laajuuden, laskutetaan erikseen.',
      },
      {
        heading: '7. Immateriaalioikeudet',
        body: 'Projektin valmistumisen ja täyden maksun suorittamisen jälkeen:\n\n• Asiakas saa täydet oikeudet lopputuotteeseen\n• Reicodev pidättää oikeuden käyttää projektia portfoliossa ellei erikseen sovita muuta\n• Avoimen lähdekoodin komponentit pysyvät niiden omien lisenssien alaisina\n\nKehitysaikana kaikki koodi pysyy Reicodev:n omistuksessa.',
      },
      {
        heading: '8. Takuu ja ylläpito',
        body: 'Reicodev tarjoaa 30 päivän takuun projektin julkaisun jälkeen. Takuu kattaa toimituksessa havaitut virheet, jotka johtuvat Reicodev:n kehitystyöstä. Takuu ei kata:\n\n• Asiakkaan tekemiä muutoksia\n• Kolmansien osapuolien lisäosien tai teemojen virheitä\n• Hostingpalveluihin liittyviä ongelmia',
      },
      {
        heading: '9. Vastuunrajoitus',
        body: 'Reicodev ei ole vastuussa välillisistä vahingoista, kuten menetetyistä tuloista tai liiketoiminnan keskeytymisestä. Vastuumme on rajattu kyseisestä projektista maksettuun summaan.\n\nEmme takaa hakukonesijoituksia, muuntumisasteita tai liiketoiminnan tuloksia.',
      },
      {
        heading: '10. Peruutukset',
        body: 'Asiakkaan peruuttaessa projektin:\n\n• Ennen aloitusta: ennakkomaksu palautetaan kokonaan\n• Projektin aikana: maksetaan tehdyn työn osuus, ennakkomaksua ei palauteta\n• Valmiin projektin jälkeen: peruutukset eivät ole mahdollisia\n\nReicodev pidättää oikeuden peruuttaa projektin, jos asiakas rikkoo näitä ehtoja.',
      },
      {
        heading: '11. Sovellettava laki',
        body: 'Näihin ehtoihin sovelletaan Suomen lakia. Mahdolliset riidat pyritään ensisijaisesti ratkaisemaan neuvottelemalla. Jos sovintoon ei päästä, riidat ratkaistaan Helsingin käräjäoikeudessa.',
      },
      {
        heading: '12. Muutokset ehtoihin',
        body: 'Reicodev pidättää oikeuden muuttaa näitä käyttöehtoja. Merkittävistä muutoksista ilmoitetaan verkkosivustolla. Jatkamalla palvelun käyttöä muutosten jälkeen hyväksyt uudet ehdot.',
      },
    ],
  },
  en: {
    title: 'Terms of Service',
    updated: 'Last updated: 20 June 2026',
    intro: 'These Terms of Service govern the use of the Reicodev website (reicodev.com) and services. By using our website, you accept these terms. If you do not accept the terms, please do not use the website.',
    sections: [
      {
        heading: '1. Service Provider',
        body: 'The service provider is Reicodev (Bilal Hussain). Contact: info@reicodev.com',
      },
      {
        heading: '2. Services',
        body: 'Reicodev provides the following digital services:\n\n• WordPress website development\n• WooCommerce store development\n• Shopify store development\n• SEO optimisation\n• Brand identity design\n• Website maintenance and speed optimisation\n\nDetailed service terms are agreed separately in each project agreement.',
      },
      {
        heading: '3. Formation of Agreement',
        body: 'An agreement is formed when:\n\n• The client accepts the quote in writing (email or message)\n• The client makes the first payment or deposit\n\nAll agreements are in writing. Verbal agreements are not binding.',
      },
      {
        heading: '4. Payment and Pricing',
        body: 'Payment terms:\n\n• A deposit (typically 50%) is required before project commencement\n• Final payment is due upon project completion\n• Prices are agreed in the quote and tied to the project scope\n• Additional work (scope creep) is agreed separately\n\nAccepted payment methods: PayPal, Wise, bank transfer.',
      },
      {
        heading: '5. Delivery and Timeline',
        body: 'Delivery times are agreed in the quote. Timelines are estimates and may change if:\n\n• The client does not provide required materials on time\n• The project scope changes at the client\'s request\n• Unexpected technical issues arise\n\nWe will notify you of delays in advance.',
      },
      {
        heading: '6. Revisions',
        body: 'Each project includes an agreed number of revisions (stated in the quote). Additional revisions or changes exceeding the agreed scope will be charged separately.',
      },
      {
        heading: '7. Intellectual Property',
        body: 'Upon project completion and receipt of full payment:\n\n• The client receives full ownership rights to the final product\n• Reicodev retains the right to use the project in its portfolio unless otherwise agreed\n• Open-source components remain under their respective licences\n\nDuring development, all code remains the property of Reicodev.',
      },
      {
        heading: '8. Warranty and Maintenance',
        body: 'Reicodev provides a 30-day warranty after project launch. The warranty covers defects found in the delivered work caused by Reicodev\'s development. The warranty does not cover:\n\n• Changes made by the client\n• Errors in third-party plugins or themes\n• Hosting-related issues',
      },
      {
        heading: '9. Limitation of Liability',
        body: 'Reicodev is not liable for indirect damages such as lost revenue or business interruption. Our liability is limited to the amount paid for the project in question.\n\nWe do not guarantee search engine rankings, conversion rates or business results.',
      },
      {
        heading: '10. Cancellations',
        body: 'If the client cancels a project:\n\n• Before commencement: deposit refunded in full\n• During the project: payment for work completed to date; deposit not refunded\n• After project completion: cancellations are not possible\n\nReicodev reserves the right to cancel a project if the client breaches these terms.',
      },
      {
        heading: '11. Governing Law',
        body: 'These terms are governed by Finnish law. Disputes will be resolved through negotiation in the first instance. If no settlement is reached, disputes will be resolved in the District Court of Helsinki.',
      },
      {
        heading: '12. Changes to Terms',
        body: 'Reicodev reserves the right to update these Terms of Service. Significant changes will be notified on the website. Continuing to use the service after changes constitutes acceptance of the new terms.',
      },
    ],
  },
};

export default async function TermsOfServicePage({ params }: Props) {
  const { locale } = await params;
  const c = CONTENT[locale as 'fi' | 'en'] ?? CONTENT.en;

  return (
    <main style={{ paddingTop: 120, paddingBottom: 80 }}>
      <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <div className="eyebrow" style={{ justifyContent: 'flex-start', marginBottom: 16 }}>
            <span className="eyebrow-line" />
            {locale === 'fi' ? 'Juridiikka' : 'Legal'}
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
              <div style={{ fontSize: 14, color: 'var(--c-muted)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>{s.body}</div>
            </section>
          ))}
        </div>

        <div style={{ marginTop: 60, paddingTop: 32, borderTop: '1px solid var(--c-border)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <Link href={`/${locale}/privacy-policy`} style={{ fontSize: 13, color: 'var(--c-p1)' }}>
            {locale === 'fi' ? '→ Tietosuojakäytäntö' : '→ Privacy Policy'}
          </Link>
          <Link href={`/${locale}/cookie-policy`} style={{ fontSize: 13, color: 'var(--c-p1)' }}>
            {locale === 'fi' ? '→ Evästekäytäntö' : '→ Cookie Policy'}
          </Link>
          <Link href={`/${locale}`} style={{ fontSize: 13, color: 'var(--c-dim)' }}>
            {locale === 'fi' ? '← Etusivulle' : '← Back to Home'}
          </Link>
        </div>
      </div>
    </main>
  );
}
