import { MetadataRoute } from 'next';
import { ALLOWED_ROUTES_FOR_INDEXING, PRODUCTION_ORIGIN_URL } from '@/utils/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  return ALLOWED_ROUTES_FOR_INDEXING.map((route) => ({
    url: `${PRODUCTION_ORIGIN_URL}${route}`,
    lastModified: new Date(),
  }));
}
