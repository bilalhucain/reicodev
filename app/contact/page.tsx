import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact — Get in Touch With Reicodev',
  description: 'Have a project in mind? Get in touch with Bilal Hussain at Reicodev. Fast response within 24 hours. WordPress, WooCommerce, SEO and branding enquiries welcome.',
  keywords: ['contact Reicodev', 'hire WordPress developer', 'web development enquiry', 'get in touch', 'freelance developer contact'],
  alternates: { canonical: 'https://reicodev.com/contact' },
  openGraph: {
    title: 'Contact Reicodev — Get in Touch',
    description: 'Have a project in mind? Get in touch with Reicodev. Fast response within 24 hours.',
    url: 'https://reicodev.com/contact',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Contact Reicodev' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Reicodev — Get in Touch',
    images: ['/images/og-image.jpg'],
  },
};

export default function ContactPage() {
  return <ContactPageClient />;
}
