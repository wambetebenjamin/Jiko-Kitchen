import type { MetadataRoute } from 'next';
export default function sitemap(): MetadataRoute.Sitemap { return [{ url: 'https://jikokitchen.co.ke', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 }]; }
