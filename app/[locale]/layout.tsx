import { NextIntlClientProvider } from 'next-intl';
import { notFound }               from 'next/navigation';
import { getMessages }            from 'next-intl/server';
import { locales }                from '@/i18n/config';
import { ThemeProvider }          from '@/components/ThemeProvider';
import Navbar                     from '@/components/layout/Navbar';
import Footer                     from '@/components/layout/Footer';
import ThemeToggle                from '@/components/ui/ThemeToggle';
import CookieBanner               from '@/components/ui/CookieBanner';
import CursorTrail                from '@/components/ui/CursorTrail';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
      
        <Navbar />
        <main id="main-content" style={{ paddingTop: '70px' }}>
          {children}
        </main>
        <Footer />
        <ThemeToggle />
        <CookieBanner />
        <CursorTrail />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
