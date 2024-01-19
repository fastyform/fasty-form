import { MetadataRoute } from 'next';
import { ALLOWED_ROUTES_FOR_INDEXING, PRODUCTION_ORIGIN_URL, PROTECTED_ROUTES } from '@/utils/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ALLOWED_ROUTES_FOR_INDEXING,
      disallow: PROTECTED_ROUTES,
    },
    sitemap: `${PRODUCTION_ORIGIN_URL}/sitemap.xml`,
  };
}
