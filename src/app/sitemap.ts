import type { MetadataRoute } from 'next';
import { getAllProjectSlugs } from '@/lib/content/projects';

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL,              lastModified: now, 
                                  changeFrequency: 'yearly',
                                  priority: 1.0 },
    { url: `${BASE_URL}/profile`, lastModified: now, 
                                  changeFrequency: 'monthly', 
                                  priority: 0.8 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug: string) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}