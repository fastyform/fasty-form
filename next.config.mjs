import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  redirects: async () => [{ source: '/register', destination: '/register/client', permanent: false }],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'veknudpszbrjutmcmrwk.supabase.co',
        port: '',
      },
      ...(process.env.NODE_ENV === 'development'
        ? [{ hostname: 'localhost' }, { hostname: '127.0.0.1' }, { hostname: 'picsum.photos' }]
        : []),
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withNextIntl(withMDX(nextConfig));
