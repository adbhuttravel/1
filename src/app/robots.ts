
import { MetadataRoute } from 'next'
 
export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  // In a real app, you would get this from an environment variable
  const siteUrl = 'https://adbhuttravel.com'; 

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/planner/'], // Disallow crawling of the temporary planner page
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
