import type { MetadataRoute } from 'next';
export default function manifest(): MetadataRoute.Manifest { return { name: 'Jiko Kitchen', short_name: 'Jiko', description: 'East African food, delivered in Nairobi.', start_url: '/', display: 'standalone', background_color: '#FFF8F0', theme_color: '#1B4332', icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }] }; }
