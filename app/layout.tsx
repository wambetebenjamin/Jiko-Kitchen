import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Jiko Kitchen | Real Food. Real Flavour. Real Nairobi.',
  description: 'Authentic East African and fusion cuisine, delivered across Nairobi.',
  manifest: '/manifest.webmanifest',
  openGraph: { title: 'Jiko Kitchen', description: 'Real Food. Real Flavour. Real Nairobi.', type: 'website' },
};
export const viewport: Viewport = { themeColor: '#1B4332', colorScheme: 'light' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const restaurantSchema = { '@context': 'https://schema.org', '@type': 'Restaurant', name: 'Jiko Kitchen', servesCuisine: ['East African', 'Kenyan', 'Fusion'], priceRange: '$$', telephone: '+254112272061', address: { '@type': 'PostalAddress', streetAddress: 'Kilimani, Ngong Road', addressLocality: 'Nairobi', addressCountry: 'KE' }, openingHours: 'Mo-Su 07:00-23:00' };
  return <html lang="en"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />{children}</body></html>;
}
