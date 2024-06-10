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
      {
        hostname: process.env.NODE_ENV === 'development' ? 'localhost' : '',
      },
      {
        hostname: process.env.NODE_ENV === 'development' ? '127.0.0.1' : '',
      },
      {
        hostname: process.env.NODE_ENV === 'development' ? 'picsum.photos' : '',
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

export default withNextIntl(withMDX(nextConfig));
