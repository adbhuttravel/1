
import { MetadataRoute } from 'next'
 
export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  // In a real app, you would get this from an environment variable
  const siteUrl = 'https://adbhuttravel.com'; 
  
  const staticPages = [
    '/',
    '/about',
    '/services',
    '/mice',
    '/career',
    '/contact',
    '/offers',
    '/trademarks',
    '/affiliations',
    '/north-cab',
    '/legal',
    '/terms-of-service',
    '/cancellation-policy',
    '/updates',
    '/blogs',
    '/investment',
    '/csr',
  ];

  const staticPageEntries = staticPages.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1.0 : 0.8,
  }));

  return [
    ...staticPageEntries
  ]
}
