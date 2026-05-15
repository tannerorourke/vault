import type { MetadataRoute } from 'next';
import { getAllProjectSlugs } from '@/lib/utils/project-content';

const BASE_URL = 'https://tannerorourke.dev';

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

  const projectRoutes: MetadataRoute.Sitemap = getAllProjectSlugs().map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}